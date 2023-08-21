/* eslint-disable prettier/prettier */
import * as React from 'react';
import {ThemeProvider} from '@react-navigation/native';
import {
  View,
  Text,
  Button,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
  BackHandler,
  StatusBar,
  FlatList,
  ScrollView,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
  ImageBackground,
} from 'react-native';

import {useFocusEffect, useNavigation, useTheme} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IonIcons from 'react-native-vector-icons/Ionicons';

import {AuthContext} from '../component/context';
import Modal from 'react-native-modal';



import global from '../component/global';
import theme from '../component/theme';
import styles from '../component/styles';
var DeviceInfo = require('react-native-device-info');
const APIBindingScreen = ({ route}) => {
  const {colors} = useTheme();
  const theme = useTheme();
  const navigation = useNavigation()
  const [from, setFrom] = React.useState(route.params?.from);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [ReqPass, setReqPass] = React.useState(false);
  const [Uid, setUid] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  const [Loading, setLoading] = React.useState(true);
  const [Token, setToken] = React.useState(null);
  const [LgType, setLgType] = React.useState('');
  const {signOut} = React.useContext(AuthContext);

  React.useEffect(() => {
    if (from === 'tradereview') {
      const backAction = () => {
        navigation.navigate('Home');
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }
  }, []);
  useFocusEffect(
    React.useCallback(
      () => {
       
getvals()
        //we can add delay time here before callApi() i.e ' },1000,callApi());' //
      },
      [],
    ),
  );
  async function getvals(){
    setTimeout(async () => {
      // setIsLoading(false);

      let pass = null;
      let tp = null;
      let uid;
      let token;
      uid = null;

      try {
        console.log('more stack screen');
        pass = await AsyncStorage.getItem('req_pass');
        tp = await AsyncStorage.getItem('logintype');
        uid = await AsyncStorage.getItem('user_id');
        token = await AsyncStorage.getItem('token');
        var mypwd = await AsyncStorage.getItem('myPwd');
        console.log(tp);
        setToken(token);
        if (pass === 'true') {
          setReqPass(true);
        }
        setLgType(tp);
        setUid(uid);
        setPwd(mypwd);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
      // console.log('user token:', userToken);
    },400);
  }
  const [ld, setLD] = React.useState(false);
  const [delModal, setDelModal] = React.useState(false);
  async function delKey() {
    var url =
      global.BASE_URL +
      'css_mob/update_api_key.aspx?uid=' +
      Uid +
      '&key1=&key2=&mode=delete';
    console.log(url);
    setDelModal(false);
    setLD(false);
    fetch(url)
      .then(item => item.json())
      .then(dta => {
        console.log(dta);
        if (dta.success === 'true') {
          ToastAndroid.show(dta.msg, ToastAndroid.LONG);
          callApiBind();
          // setLD(false)
          // callApi(Uid)
          // global.api_key=API;
          // global.api_secret=Secret;
          // callApiBind()
          // navigation.navigate('HomeDrawer')
        } else {
          // setLD(false)
          ToastAndroid.show(dta.msg, ToastAndroid.LONG);
        }
      });
  }
  const callApiBind = () => {
    // let url =  global.BASE_URL + 'css_mob/api_key.aspx?uid=' + Uid + '&token=' + Token;
    const now = new Date();
      const tm = now.getTimezoneOffset() / 60;
    let url =
    global.BASE_URL +
    'css_mob/api_key.aspx?uid=' +
    Uid +
    '&pwd=' +
    pwd +
    '&zone=' +
    tm +
    '&token=' +
    Token+
    '&device=' +
    DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel();
    console.log(url);
    fetch(url)
      .then(item => item.json())
      .then(Vdta => {
        console.log('api_key ' + Vdta);
        if (parseFloat(Vdta.amt) > 0) {
          global.activeId = true;
        } else {
          global.activeId = false;
        }

        global.ReqValue = Vdta.reqvalue;
        global.autoStatus = Vdta.auto; //'False' or 'True'
        global.autoAmt = Vdta.auto_amt;
        global.autoNum = Vdta.auto_num;
        global.timeleft = Vdta.timeleft;
        global.refurlProm = Vdta.whatsapp;
        global.timeleft = Vdta.timeleft;
        // setAPI(Vdta.api_key)
        global.autoFamt = Vdta.auto_famt;
        // setSecret(Vdta.secret_key)
        global.NAME = Vdta.name;
        global.EMAIL = Vdta.eid;
        global.PWD = Vdta.pwd;
        global.AMT = Vdta.amt;
        global.CUR = Vdta.cur;
        global.dt = Vdta.dt;
        global.api_key = Vdta.api_key;
        if(Vdta.server_name.includes('MetaQuotes')){
          
          global.server_name = 'Exness-Demo';
        }
        else if(Vdta.server_name.includes('Vantage') || Vdta.server_name.includes('vantage')){
          
          global.server_name = 'Vantage';
        }
          else{
          global.server_name = Vdta.server_name;
        }
        global.api_secret = Vdta.secret_key;
        global.refurl = Vdta.refurl;
        const oldtoken = Vdta.ntoken;
        console.log('name is' + global.api_key);
        check();
        async function check() {
          await AsyncStorage.setItem('api_key', Vdta.api_key);
          await AsyncStorage.setItem('secret_key', Vdta.secret_key);
          var curName = '',
            curVal = '';
          curName = await AsyncStorage.getItem('cur_name');
          curVal = await AsyncStorage.getItem('cur_val');
          if (curName == null || curName == undefined) {
          } else {
            global.cur_name = curName;
          }
          if (curVal == null || curVal == undefined) {
          } else {
            global.cur_value = curVal;
          }
          setLD(false);
          //   navigation.navigate('HomeDrawer')
        }
        navigation.goBack();
      });
  };
  

  return Loading ? (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        // backgroundColor: colors.background,
      }}>
      <LottieView
        source={require('../assets/loading.json')}
        style={{width: 350, height: 350, alignSelf: 'center'}}
        autoPlay
        loop
      />
    </View>
  ) : (
    <ImageBackground source={global.bgimg}  resizeMode={'stretch'}style={[styles.container]}>
    {/* <ImageBackground style={[styles.container]}> */}
      <Modal
        statusBarTranslucent={true}
        deviceHeight={1000}
        onBackdropPress={() => {
          setDelModal(false);
        }}
        isVisible={delModal}
        animationInTiming={2500}
        animationOutTiming={0}
        animationOut={'bounceOut'}
        animationIn={'bounceIn'}
        backdropOpacity={0.8}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-around',
            paddingHorizontal: 15,
            paddingVertical: 15,
            backgroundColor: colors.appBlue,
            height: 150,
            alignItems: 'center',
            elevation:5,
            // borderWidth: 0.5,
            // borderColor: '#ffe36e',
            borderRadius: 10,
            // borderBottomWidth: 0,
            paddingBottom: 10,
          }}>
          <Text style={{color: colors.selected, fontSize: 17, fontFamily:global.appFontM}}>
            Do you really want to Delete Account ?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              padding: 5,
              paddingLeft: 20,
              position: 'relative',
              bottom: -10,
            }}>
            <TouchableOpacity
              onPress={() => {
                setDelModal(false), setLD(false);
              }}
              style={{width: '40%', alignSelf: 'center'}}>
              <View
                style={{
                  marginTop: 5,
                  width: '80%',
                  height: 35,
                  backgroundColor: colors.losscolor,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                }}>
                <Text style={{color: '#fff', fontFamily:global.appFontM, fontSize: 17}}>
                  Cancel
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                delKey();
              }}
              style={{width: '60%', alignSelf: 'center'}}>
              <View
                style={{
                  marginTop: 5,
                  width: '80%',
                  height: 35,
                  backgroundColor: colors.appSkyblue,
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                }}>
                <Text style={{color: '#fff', fontFamily:global.appFontM, fontSize: 17}}>
                  Yes
                </Text>
                {/* {renewClicked? <ActivityIndicator style={{left:5}} size='small' color='white' />:null} */}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View
       
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: 40,
          width: '100%',
          height: 90,
        }}>
          <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            // width: '30%',
            paddingTop: 5,
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{padding: 10}}>
            <Text style={{textAlign: 'right'}}>
              <IonIcons
                name="md-arrow-back"
                size={25}
                color={colors.selected}
              />
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '80%',
            paddingLeft: '10%',
          }}>
          <Text style={[styles1.heading, {color: colors.profitcolor2}]}>
            LINK ACCOUNT
          </Text>
        </View>
        
      </View>

      <View style={{flexDirection:'column',marginTop:50,justifyContent:'space-evenly',width:'100%',height:100,paddingTop:50}}>
        <ImageBackground
          style={{width: 380, height: 100, alignSelf: 'center',justifyContent:'center'}}
          source={require('../assets/Aeon/blue_shade.png')}
          resizeMode={'stretch'}>
            <TouchableOpacity onPress={() =>{navigation.navigate('BindingScreen')}} style={{}}>
          <View style={{flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',width:"100%",height:80}}>
          <Image
          style={{width: 80, height: 80, alignSelf: 'center',justifyContent:'center',bottom:6,right:-2}}
          source={require('../assets/Aeon/meta_tr.png')}
          resizeMode={'contain'}/>
           <Text style={{color:'#fff',fontWeight:'700',fontSize:20,}}>META TRADER 5</Text>
           {(global.api_key!=null && global.api_key!='' && global.api_key!==undefined)? (
                <TouchableOpacity
                  style={{
                    backgroundColor: 'red',
                    alignItems: 'center',
                    borderRadius: 20,
                    marginTop: 5,
                    width: '30%',paddingVertical:5,
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}
                  onPress={() => {
                    setLD(true), setDelModal(true);
                  }}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: 'white',
                      fontFamily:global.appFontM,
                      textAlign: 'center',
                      alignSelf: 'center',
                    }}>
                    Delete ACCOUNT
                  </Text>
                  {ld ? <ActivityIndicator size="small" color="white" /> : null}
                </TouchableOpacity>
              ) : <Text style={{color:'#fff',backgroundColor:'green',padding:10,fontSize:12,
              borderRadius:50,fontFamily:global.appFontM,paddingHorizontal:10}}>ADD ACCOUNT</Text>}
           
          </View>
        </TouchableOpacity>
        </ImageBackground>
        </View>
        {/* <View
          style={{
            flexDirection: 'row',
            width: '100%',
            position: 'absolute',
            top: '58%',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('BinanceBinding');
            }}
            activeOpacity={0.9}
            style={{
              width: '50%',
              height: 220,
              marginTop: 15,
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Image
              source={require('../assets/botz/ban1.png')}
              resizeMode={'stretch'}
              style={{width: '95%', height: '85%', borderRadius: 10}}></Image>
            <View
              style={[
                {
                  flexDirection: 'column',
                  marginTop: -85,
                  width: '80%',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
                global.api_key == ''
                  ? {alignItems: 'center', justifyContent: 'center'}
                  : null,
              ]}>
              <Text
                style={{
                  color: 'white',
                  fontFamily:global.appFontM,
                  textAlignVertical: 'center',
                  marginLeft: 0,
                }}>
                {global.api_key == '' ? 'ADD API KEY' : 'API KEY ADDED'}
              </Text>
              {global.api_key !== '' &&
              global.api_key !== null &&
              global.api_key !== undefined ? (
                <TouchableOpacity
                  style={{
                    backgroundColor: 'red',
                    alignItems: 'center',
                    borderRadius: 20,
                    marginTop: 5,
                    width: '80%',
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}
                  onPress={() => {
                    setLD(true), setDelModal(true);
                  }}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: 'white',
                      fontFamily:global.appFontM,
                      textAlign: 'center',
                      alignSelf: 'center',
                    }}>
                    Delete API KEY
                  </Text>
                  {ld ? <ActivityIndicator size="small" color="white" /> : null}
                </TouchableOpacity>
              ) : null}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={{
              width: '50%',
              height: 220,
              marginTop: 15,
              alignItems: 'center',
              alignSelf: 'center',
            }}
            onPress={() => {
              ToastAndroid.show('Coming Soon...', ToastAndroid.SHORT);
            }}>
            <Image
              source={require('../assets/botz/ban3.png')}
              resizeMode={'stretch'}
              style={{width: '95%', height: '85%', borderRadius: 10}}></Image>
             <Text style={{marginTop:-40,color:'white',fontSize:20,fontWeight:'bold',backgroundColor:'#0d1d41',width:'100%',textAlign:'center'}}>COMING SOON
</Text> 
          </TouchableOpacity>
        </View> */}
     

      {/* <View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            ToastAndroid.show('Coming Soon...', ToastAndroid.SHORT);
          }}
          style={{
            width: '50%',
            height: 220,
            marginTop: 85,
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Image
            source={require('../assets/botz/ban2.png')}
            resizeMode={'stretch'}
            style={{width: '95%', height: '85%', borderRadius: 10}}></Image>
        </TouchableOpacity>
      </View> */}
    </ImageBackground>
  );
};

export default APIBindingScreen;
const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  hour_box: {
    color: '#808080',
    borderBottomWidth: 0.5,
    width: '80%',
    paddingVertical: 5,
    paddingHorizontal: 0,
    marginHorizontal: 20,
  },
  heading: {
    fontSize: 25,
    fontFamily:global.appFontM,
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
  textInput: {
    marginLeft: 5,

    marginTop: 0,
    paddingBottom: 0,
    fontSize: 16,
  },
  text_header: {
    color: '#fff',
    fontFamily:global.appFontM,
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

  text: {
    color: theme.hgl,

    fontSize: 12,
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
    borderRadius: 50,
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    marginTop: 80,
  },
  title: {
    fontSize: 15,
    fontFamily:global.appFontM,
    color: '#d5d5d5',
    marginVertical: 15,
    marginLeft: 5,
  },
  textSign: {
    fontSize: 18,
    fontFamily:global.appFontM,
    color: '#fff',
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
    fontSize: 18,
    fontFamily:global.appFontM,
    marginBottom: 15,
  },
  card_box: {
    shadowOffset: {width: 20, height: 10},
    shadowColor: '#303030',
    borderRadius: 0,
    borderColor: '#fff',
    shadowOpacity: 0.5,
    elevation: 10,
    marginTop: 200,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 50,
    backgroundColor: '#fff',
  },
  text_card: {
    fontSize: 14,
    fontFamily:global.appFontM,
  },
});

/* 


    <View >
           <TouchableOpacity  onPress={()=>{navigation.navigate('RestoreAcc')}} style={{backgroundColor:colors.vbg,width:'90%',height:90,borderRadius:10,alignItems: 'flex-start',alignSelf: 'center',borderLeftWidth:4,borderTopLeftRadius:5,borderBottomLeftRadius:5,borderLeftColor:"#F7931B",paddingLeft:10,paddingVertical:10,marginVertical:5}}>
            <View style={{flexDirection:'row',justifyContent:'space-around',alignItems: 'center'}}>
            <Text style={{textAlign:'center',width:30}}><MaterialIcons name="restore" size={25}  color={'#fff'}   /></Text>
            <View style={{flexDirection:'column',justifyContent:'space-around',paddingLeft:15}}>
                    <Text style={[styles.sheading,{textAlign:'left'}]}>RESTORE ACCOUNT</Text>
                    <Text style={[styles1.text,{width:200}]}>Restore your old wallet accounts.</Text>
            </View>
            </View>
            </TouchableOpacity>
    </View>
   <View >
           <TouchableOpacity onPress={()=>{navigation.navigate('ImportAcc')}} style={{backgroundColor:colors.vbg,width:'90%',height:90,borderRadius:10,alignItems: 'flex-start',alignSelf: 'center',borderLeftWidth:4,borderTopLeftRadius:5,borderBottomLeftRadius:5,borderLeftColor:"#F7931B",paddingLeft:10,paddingVertical:10,marginVertical:5}}>  
            <View style={{flexDirection:'row',justifyContent:'space-around',alignItems: 'center'}}>
            <Text style={{textAlign:'center',width:30}}><IonIcons name="md-download-outline" size={25}  color={'#fff'}   /></Text>
            <View style={{flexDirection:'column',justifyContent:'space-around',paddingLeft:15}}>
                    <Text style={[styles.sheading,{textAlign:'left'}]}>IMPORT WITH PRIVATE KEY</Text>
                    <Text style={[styles1.text,{width:200}]}>Use to import your external accounts using private key.</Text>
            </View>
            </View>
            </TouchableOpacity>
    </View>
    <View >
            <TouchableOpacity onPress={()=>{navigation.navigate('WatchMode')}} style={{backgroundColor:colors.vbg,width:'90%',height:90,borderRadius:10,alignItems: 'flex-start',alignSelf: 'center',borderLeftWidth:4,borderTopLeftRadius:5,borderBottomLeftRadius:5,borderLeftColor:"#F7931B",paddingLeft:10,paddingVertical:10,marginVertical:5}}>
            <View style={{flexDirection:'row',justifyContent:'space-around',alignItems: 'center'}}>
            <Text style={{textAlign:'center',width:30}}><IonIcons name="md-eye-outline" size={22}  color={'#fff'}   /></Text>
            <View style={{flexDirection:'column',justifyContent:'space-around',paddingLeft:15}}>
                    <Text style={[styles.sheading,{textAlign:'left'}]}>WATCH MODE</Text>
                    <Text style={[styles1.text,{width:250}]}>You will only have access to track the account.You will not be able to take any action with it. </Text>
            </View>
            </View>
            </TouchableOpacity> 
    </View>
  

*/
