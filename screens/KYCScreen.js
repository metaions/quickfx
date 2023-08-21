/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles1 */
/* eslint-disable prettier/prettier */

import React, {useRef} from 'react';
import {ThemeProvider, useTheme} from '@react-navigation/native';
import {
  View,
  Text,
  Button,
  ImageBackground,
  TouchableOpacity,
  BackHandler,
  StyleSheet,
  Image,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  FlatList,
  ScrollView,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {Avatar, Card, Title, Paragraph} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ResetFn from './ResetFn';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import { jsonContext } from '../context/GlobalState';
import global from '../component/global';
import styles from '../component/styles';
import {AuthContext} from '../component/context';
import PhoneInput from 'react-native-phone-number-input';
var DeviceInfo = require('react-native-device-info');

const KYCScreen = ({navigation, route}) => {
  const { myjson,setCallStore,setMyjson } = React.useContext(jsonContext);
  const {colors} = useTheme();
  const theme = useTheme();
  const {signOut} = React.useContext(AuthContext);
  const phoneInput = useRef(null);
  const uid = route.params?.uid;
  const id = route.params?.id;
  const tkn = route.params?.tkn;
  const from = route.params?.from;  
  const [user_photo, setUserPhoto] = React.useState('Image');
  const [Uid, setUid] = React.useState('');
  const [Step1, setStep1] = React.useState(true);
  const [Step2, setStep2] = React.useState(false);
  const [Loc, setLoc] = React.useState('');
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [Loading, setLoading] = React.useState(false);
  const [Load, setLoad] = React.useState(true);
  const [Editable_name, setEditable_name] = React.useState(true);
  const [Editable_trc20, setEditable_trc20] = React.useState(true);
  const [Editable_mno, setEditable_mno] = React.useState(true);
  const {signIn} = React.useContext(AuthContext);
  const [data, setData] = React.useState({
    profile: '',
    cnt: '',
    sta: '',
    cty: '',
    name: '',
    mno: '',
    trc20: '',
  });

  React.useEffect( () => {
    
     settingVals()
    
  }, [Uid]);
   
  async function settingVals() {
    let uid;
    uid = null;
    uid = await AsyncStorage.getItem('user_id');
    console.log(from);
    console.log(uid);
    setUid(uid);
    getData(uid);
  }

  React.useEffect(() => {
    
    BackHandler.addEventListener('hardwareBackPress', backAction)

    return () =>    
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, [Step2, Step1]);

  const backAction = () => {    
     
      if (Step2) {
        setStep2(false);
        setStep1(true);
        return true;
      } else {
        if (from == 'home') {
          ToastAndroid.show("Complete your Kyc first", ToastAndroid.LONG);
          return true;
        }
        navigation.goBack();
        return true;
      }
    
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  React.useEffect(() => {
    setTimeout(async () => {
      callApi();
      console.log(uid);
    });
  }, []);

  const handleChange = (name, value) => {
    setData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getData = uid => {
    // console.log(uid,val,'asdasdasdasdasdasdasdasd')
    let url = global.BASE_URL + 'css_mob/get_profile.aspx?uid=' + uid;
    console.log(url);
    fetch(url)
      .then(item => item.json())
      .then(mobData => {
        console.log(mobData);

        if (mobData.success.toString().toLowerCase() === 'true') {
          console.log(
            mobData.name,
            mobData.photo,
            mobData.cnt,
            mobData.ct,
            mobData.st,
            mobData.mno,
          );
          handleChange('name', mobData.name);
          if(mobData.name!=''){
            setEditable_name(false)
          }
          if(mobData.addr){
            setEditable_trc20(false)
          }
          if(mobData.mno!=''){
            setEditable_mno(false)
          }
          handleChange('profile', mobData.photo);
          handleChange('cnt', mobData.cnt);
          handleChange('cty', mobData.ct);
          handleChange('sta', mobData.st);
          handleChange('mno', mobData.mno);
          handleChange('trc20', mobData.addr);
        }
        setLoad(false);
      });
  };

  const callApi = () => {
    // console.log(uid,val,'asdasdasdasdasdasdasdasd')
    fetch(global.BASE_URL + 'css_mob/countrylist.aspx')
      .then(item => item.json())
      .then(mobData => {
        setLoc(mobData);
      });
  };

  const OpenImagePicker = val => {
    // let imageList = [];
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
      compressImageQuality: 0.8,
      maxFiles: 1,
      mediaType: 'any',
      includeBase64: true,
    })
      .then(response => {
        // console.log(response)
        response.map(image => {
          if (val == 1) {
            handleChange('profile', image.data);
          }
        });
      })
      .catch(e => console.log('Error:', e.message));
  };

  const getApi = async () => {
    let token=await AsyncStorage.getItem('token')
    // setShouldUpdate(false);

    if (
      data.cnt != '' &&
      data.cty != '' &&
      data.sta != '' &&
      Uid != '' 
      // && 
      // data.trc20!=''
      // &&     
      // data.profile != ''
    ) {
      var url = global.BASE_URL + 'css_mob/KYC.aspx';
      console.log(url);
      var fdata = new FormData();
      fdata.append('uid', Uid);
      fdata.append('image1', data.profile);
      fdata.append('name', data.name);
      fdata.append('state', data.sta);
      fdata.append('cty', data.cty);
      fdata.append('cntr', data.cnt);
      fdata.append('mno', data.mno);
      fdata.append('addr', data.trc20);
      fdata.append('pwd', global.PWD);
      fdata.append('device', DeviceInfo.getUniqueId());
      fdata.append('dname',DeviceInfo.getModel());
      fdata.append('token', token);

      console.log(fdata)
      await axios
        .post(url, fdata, {headers: 
          // {contentType: 'application/x-www-form-urlencoded'}
         { Accept: 'application/json',
          'Content-Type': 'multipart/form-data'}
        })//"Content-Type": "application/x-www-form-urlencoded", Accept: "application/json"
        .then(function (response) {
          console.log('nav axios post' + JSON.stringify(response.data));
          // console.log(url,fdata);
          if (response.data.success) {
            try {
              if (id === 1) {
                signIn(uid, tkn);
              } else {
                setLoading(false)
                ToastAndroid.show(response.data.message, ToastAndroid.LONG);
                global.addr=data.trc20
                setCallStore(true)
                navigation.navigate('Home');
              }

              //user.banner = response.data.banner;
              console.log('error here no');
            } catch (exc) {
              console.log('error here: ' + exc);
            }
          } else {
            ToastAndroid.show(response.data.message, ToastAndroid.LONG);
            setLoading(false)
            // navigation.navigate("HomeDrawer")
          }
        })
        .catch(function (error) {
          setLoading(false)
          console.log(' axios post error ' + error);
        });
      setLoading(false);
    } else {
      setLoading(false)
      ToastAndroid.show('Please fill all the details ', ToastAndroid.SHORT);
    }
  };

  return Load ? (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
      }}>
      <LottieView
        source={require('../assets/loading.json')}
        style={{width: 350, height: 350, alignSelf: 'center'}}
        autoPlay
        loop
      />
     
    </View>
  ) : (
    <ImageBackground source={global.bgimg}
    resizeMode={'stretch'}
    style={[styles1.container, {backgroundColor: '#171E31'}]}>
      {/*  profile pic module start */}

      {/*  profile pic module end */}

      {/* Editable Module start */}
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
          marginBottom: 0,
        }}>
        <View
          // colors={[global.grad3, global.grad4]}
          style={{
            width: '100%',
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            paddingTop: 30,
          }}
          // start={{ x: 0, y: 1 }}
          // end={{ x: 1, y: 1 }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              paddingHorizontal: 15,
              width:'100%',
              paddingVertical: 5,
              marginBottom: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <View
                style={{alignItems: 'center', justifyContent: 'center'}}></View>
              {from != 'home' ? (
                <TouchableOpacity
                  onPress={() => {
                    // if (Step2) {
                    //   setStep2(false);
                    //   setStep1(true);
                    // } else {
                      navigation.goBack();
                    // }
                  }}
                  style={{padding: 10}}>
                  <Text style={{textAlign: 'right'}}>
                    <Ionicons
                      name="md-arrow-back"
                      size={22}
                      color={colors.selected}
                    />
                  </Text>
                </TouchableOpacity>
              ) : 
              <TouchableOpacity
              onPress={() => {
               
               
               
                 signOut();
               
              }}
              style={{padding: 10}}>
              <Text style={{textAlign: 'right'}}>
                <Ionicons
                  name="md-power-outline"
                  size={22}
                  color={colors.selected}
                />
              </Text>
            </TouchableOpacity>
              }
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                alignItems: 'center',justifyContent: 'center',
                paddingLeft: 50,
              }}>
              <Text style={[styles.sheading, {color: colors.profitcolor2,fontSize:24,alignSelf: 'center'}]}>
                Profile
              </Text>
      
            </View>
           
          </View>
        </View>
      </View>

      {/* {Step1 ? ( */}
        <SafeAreaView style={{height: '90%'}}>

          <ScrollView showsVerticalScrollIndicator={false} style={{marginHorizontal:10}}>
          {/* {console.log('what is my  profile pic' + data.profile)} */}
          <View style={{justifyContent: 'center',
           alignSelf:'center',
           alignItems:'center',
          width:'100%'}}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                OpenImagePicker(1);
              }}
              style={{alignItems: 'center',justifyContent: 'center',marginLeft:20,}}>
              {data.profile == ''  || data.profile.endsWith('user_photos/')? (
                <Image
                  source={require('../assets/no_image.jpg')}
                  style={styles1.img}
                  resizeMode={'stretch'}
                />
              ) : data.profile.includes('https') ? (
                <Image
                  source={{uri: data.profile}}
                  // style={{
                    style={styles1.img}
                    // alignSelf: 'flex-start',
                  // }}
                  resizeMode={'stretch'}
                  // resizeMode={'cover'}
                />
              ) : (
                <Image
                  source={{uri: 'data:image/png;base64,' + data.profile}}
                  style={styles1.img}
                  resizeMode={'stretch'}
                />
              )}
              <MaterialCommunityIcons
                name={'image-plus'}
                size={22}
                style={{
                  position: 'absolute',
                  // color: '#5B6A81',
                  top: 0,
                  right: 0,
                  // borderWidth: 1,
                  // borderColor: '#5B6A81',
                  elevation:5,
           backgroundColor:'#fff',
                  borderRadius: 50,
                  padding: 10,
                }}
              />
            </TouchableOpacity>
            <View style={{ alignSelf: 'center',justifyContent:'center',padding:5,paddingHorizontal:20,borderRadius:30
            ,marginTop:10,backgroundColor:colors.profitcolor2}}>
              <Text style={{color:'#000',fontSize:14,fontFamily:global.appFontM}}>USER ID 
               <Text style={{color: colors.appBlack,fontFamily:global.appFontB
                ,textTransform:'uppercase'}}>  {global.uid}</Text></Text>
              </View>
          </View>
          <View style={{justifyContent: 'center', marginTop: 5}}>
            {data.name==''?<Text
              style={{color: colors.selected, fontSize: 14, marginLeft: 10,lineHeight:20}}>
              Your personal details are not filled in yet. Please verify your account!
            </Text>:null}
            <Text
              style={{color: colors.selected, fontSize: 16, marginLeft: 10,lineHeight:20,
              marginVertical:0,fontFamily:global.appFontM}}>Name
            </Text>
            <View
              style={[
                {
                  width: '96%',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  alignSelf: 'center',
                  marginHorizontal:10,
                  
                
                },
              ]}>
              <TextInput
                placeholder="Please Enter Your Name"
                style={styles1.textInput}
                color={colors.selected}
                autoCapitalize="none"
                value={data.name}
                onChangeText={val => {
                  handleChange('name', val.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''));
                }}
                editable={Editable_name}
                width={'100%'}
                placeholderTextColor={colors.appGray}
              />
            </View>
           
              <Text
              style={{color: colors.selected, fontSize: 16, marginLeft: 10,marginVertical:10,marginTop:20
              ,fontFamily:global.appFontM}}>Mobile No.
               </Text>
              {!Editable_mno?
               <View  style={[
                {
                  width: '96%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  alignSelf: 'center',
                  borderBottomWidth:1,
                  borderColor:'#19dc51',
                  // backgroundColor: colors.appBluebg,
                  paddingVertical:2
                  // borderBottomWidth: 0.5,
                  // borderColor: colors.lgt_text,
                },
              ]}>
            
               <Text
              style={{color: colors.selected, fontSize: 14, marginLeft: 10,lineHeight:20,marginVertical:10}}>
              
                 {data.mno}
               </Text>
               <TouchableOpacity onPress={()=>{setEditable_mno(true)}}
                style={{padding:5,borderRadius:5,marginRight:10,backgroundColor:colors.profitcolor2,
                borderColor:colors.selected,borderWidth:1,paddingHorizontal:10}}>
                <Text style={{fontFamily:global.appFontM}}>EDIT</Text>
               </TouchableOpacity>
               </View>
            
            
            :
            
              <PhoneInput
              ref={phoneInput}              
              defaultCode="AE"              
              layout="second"
            //   withShadow
              // autoFocus
              
              onChangeCountry={item=>{console.log("    "+JSON.stringify(item.name), 
              handleChange('cnt', item.name))}}
              // onChangeText={item=>{console.log(item)}}
              containerStyle={{
                width: '96%',
                marginTop: 15,
                alignSelf: 'center',
                backgroundColor: 'transparent',
                elevation: 5,
                height: 50,
              }}              
              countryPickerButtonStyle={{
                // backgroundColor: colors.appBluebg,
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
              }}           
              disableArrowIcon   
              codeTextStyle={{fontWeight: 'bold',color:colors.selected}}              
              textInputStyle={{fontSize: 16,color:'#fff', borderBottomWidth:1,
              borderColor:'#19dc51', }}
              style={{
                        

              }}
              textContainerStyle={{
                paddingVertical: 0,                
                // backgroundColor: colors.appBlue,    
                backgroundColor:'transparent',            
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
              }}              
              onChangeFormattedText={text => {
                console.log(text);
                handleChange('mno', text);
              }}
            />
            }

<View>
            <View>
            <Text
              style={{color: colors.selected, fontSize: 16, marginLeft: 10,marginVertical:10,fontFamily:global.appFontM}}>Country
               </Text>
               <View
               style={{}}>

              <TouchableOpacity
               onPress={() => {
                toggleModal();
              }}
               style={[
                {
                  width: '96%',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  alignSelf: 'center',flexDirection: 'row',
                  // backgroundColor: colors.appBluebg,
                  paddingVertical:10,paddingRight:10,borderBottomWidth:1,
                  borderColor:'#19dc51', 
                  // borderBottomWidth: 0.5,
                  // borderColor: colors.lgt_text,
                },
              ]}>
                
                  <Text  style={[styles1.title, {color: colors.selected,}]}>
                  {data.cnt === '' ? " Country  ":data.cnt} 
                  </Text>
                  <MaterialIcons name={'keyboard-arrow-down'} size={18} color={colors.selected} />
                
              </TouchableOpacity>
                </View>
            </View>
            <Text
              style={{color: colors.selected, fontSize: 16, marginLeft: 10,marginVertical:10,fontFamily:global.appFontM}}>State
               </Text>
               <View
                  style={[
                {
                  width: '96%',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  alignSelf: 'center',flexDirection: 'row',
                  // backgroundColor: colors.appBluebg,
                  paddingRight:10
                  // borderBottomWidth: 0.5,
                  // borderColor: colors.lgt_text,
                }]}>
              <TextInput
                placeholder="State"
                style={[styles1.textInput, {color: colors.text}]}
                autoCapitalize="none"
                onChangeText={val => {
                  handleChange('sta', val.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''));
                }}
                value={data.sta}
                width={'100%'}
                color={colors.selected}
                placeholderTextColor={colors.lgt_text}
              />
            </View>
            <Text
              style={{color: colors.selected, fontSize: 16, marginLeft: 10,marginVertical:10,fontFamily:global.appFontM}}>City
               </Text>
               <View   style={[
                {
                  width: '96%',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  alignSelf: 'center',flexDirection: 'row',
                  // backgroundColor: colors.appBluebg,
                  paddingRight:10
                  // borderBottomWidth: 0.5,
                  // borderColor: colors.lgt_text,
                }]}>
              <TextInput
                placeholder="City"
                style={[styles1.textInput, {color: colors.text}]}
                autoCapitalize="none"
                onChangeText={val => {
                  handleChange('cty', val.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''));
                }}
                value={data.cty}
                width={'100%'}
                color={colors.selected}
                placeholderTextColor={colors.lgt_text}
              />
            </View>
            <Text
              style={{color: colors.selected, fontSize: 16, marginLeft: 10,lineHeight:20,marginVertical:10,fontFamily:global.appFontM}}>TRC20 USDT DEPOSIT Address
            </Text>
            <View
              style={[
                {
                  width: '96%',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  alignSelf: 'center',
                  // backgroundColor: colors.appBluebg,
                  marginHorizontal:10
                  // borderBottomWidth: 0.5,
                  // borderColor: colors.lgt_text,
                },
              ]}>
              <TextInput
                placeholder="Please Enter Your TRC20 UDST address"
                style={styles1.textInput}
                color={colors.selected}
                autoCapitalize="none"
                value={data.trc20}
                onChangeText={val => {
                  handleChange('trc20', val);
                }}
                editable={Editable_trc20}
                width={'100%'}
                placeholderTextColor={colors.border}
              />
            </View>
          </View>

          </View>

          <View style={{alignSelf: 'center',marginTop:50,marginBottom:81}}>
            <TouchableOpacity
              style={styles1.signIn}
              onPress={() => {
                setLoading(true), getApi();
              }}
              activeOpacity={0.8}
              underlayColor="#000">
              <View
                style={styles1.signIn}
                >
                <Text style={styles1.textSign}>SUBMIT</Text>
                {Loading ? (
                  <ActivityIndicator size={'small'} color="#fff" />
                ) : null}
              </View>
            </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
    

      <Modal
        onBackButtonPress={toggleModal}
        backdropOpacity={0.5}
        backdropColor="#fff"
        onBackdropPress={toggleModal}
        isVisible={isModalVisible}
        style={{alignSelf: 'center'}}
        animationInTiming={300}
        animationOutTiming={200}>
        <View
          style={{
            width: 350,
            height: '100%',
            alignSelf: 'center',
            backgroundColor: '#fff',
            flexDirection: 'column',
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <TouchableOpacity onPress={toggleModal}>
            <MaterialIcons
              name="cancel"
              size={35}
              color={'#000'}
              style={{paddingBottom: 20, alignSelf: 'flex-end'}}
            />
          </TouchableOpacity>
          <FlatList
            horizontal={false}
            // style={{ paddingHorizontal: 10 }}
            data={Loc}
            showsVerticalScrollIndicator={true}
            indicatorStyle={'white'}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => {
                  handleChange('cnt', item.country), toggleModal();
                }}
                style={{justifyContent: 'center', alignItems: 'center'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    paddingHorizontal: 15,
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'gray',
                    paddingVertical: 10,
                  }}>
                  <Text
                    style={[
                      styles1.text_footer,
                      {
                        textAlign: 'left',
                        color:
                          data.cnt === item.country ? colors.appBlue : colors.appGray,
                        fontSize: 20,
                        width: '100%',
                      },
                    ]}>
                    {item.country}
                  </Text>
                  <Text style={{textAlignVertical: 'center'}}>
                    {data.cnt === item.country ? (
                      <FontAwesome name={'check'} size={20} color={colors.appBlue} />
                    ) : null}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </ImageBackground>
  );
};

export default KYCScreen;

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1725',
  },
  img:{
    borderRadius: 100,
    width: 150,
    height: 150,
    elevation:5,
    backgroundColor:'#fff',
    shadowColor:'#16B5FF',
    // shadowWidth:10
  },
  hour_box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: '#808080',
    borderBottomWidth: 0.5,
    borderBottomColor: '#80808080',
    width: '90%',
    paddingVertical: 5,
    paddingHorizontal: 0,
    marginHorizontal: 20,
    marginTop: 30,
  },
  doc: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#80808080',
    borderRadius: 10,
  },
  textInput: {
    marginLeft: 5,
    borderBottomWidth:1,
    borderColor:'#19dc51',
    fontSize: 16,
  },
  textInput1: {
    borderRadius: 5,
    fontSize: 15,
    width: 250,
    height: 50,
    textAlign: 'left',
    textAlignVertical: 'center',
    color: '#c5c5c5',
    fontWeight: 'bold',
    paddingLeft: 15,
    marginVertical: 15,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomWidth: 0.5,
    borderBottomColor: '#808080',
    marginTop: 15,
  },
  text_footer: {
    color: '#000',
    fontWeight: '400',
    fontSize: 15,
  },
  header: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 3,
    backgroundColor: '#ffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,

    paddingHorizontal: 40,
  },
  logo: {
    width: 250,
    maxHeight: 200,
  },
  signIn: {
    width: 320,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor:'#19dc51',
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 16,
    // fontWeight: 'bold',
    color: '#c9c9c9c9',
    marginLeft: 8,
  },
  textSign: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily:global.appFontM
  },
  sliderContainer: {
    height: 280,
    width: '90%',
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  slideImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  fitnessbox: {
    paddingHorizontal: 0,
    // borderWidth: 1,
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 20,
    borderRadius: 20,
  },
  box_heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  card_box: {
    shadowOffset: {width: 20, height: 10},
    shadowColor: '#303030',
    borderRadius: 0,
    borderColor: '#fff',
    shadowOpacity: 0.5,
    elevation: 50,
    backgroundColor: '#fff',
  },
  text_card: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
