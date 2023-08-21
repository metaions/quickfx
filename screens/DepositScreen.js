import * as React from 'react';
import {ThemeProvider, useTheme} from '@react-navigation/native';
import {
  View,
  Text,
  Button,
  Dimensions,
  TouchableOpacity,
  Paragraph,
  ToastAndroid,
  Clipboard,
  RefreshControl,
  StyleSheet,
  Image,
  StatusBar,
  FlatList,
  ScrollView,
  TextInput,
  ActivityIndicator,
  ImageBackground
} from 'react-native';
import {Switch, Divider} from 'react-native-paper';
import Share from 'react-native-share';
import IonIcons from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../component/context';

import ImagePicker from 'react-native-image-crop-picker';
import theme from '../component/theme';
import styles, { wid } from '../component/styles';
import global from '../component/global';
const height = Dimensions.get('screen').height;

const DepositScreen = ({navigation, route}) => {
  // my_addr:addr,cur:Id,acc:AccName,img: Coin.image
  const img = route.params?.img;
  const cur = route.params?.cur;
  const acc = route.params?.acc;
  const {colors} = useTheme();
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const {App_Lock} = React.useContext(AuthContext);
  const [Loading, setLoading] = React.useState(true);
  const [LD, setLD] = React.useState(false);
  const [ERROR, setERROR] = React.useState(false);
  const [Addr, setAddr] = React.useState('');
  const [chk_click, setChk_click] = React.useState(false);
  const [Uid, setUid] = React.useState('');
  const [UImg, setUImg] = React.useState('');
  const [TXNid, setTXNid] = React.useState('');
  const [Data, setData] = React.useState([]);
  const [Clicked, setClicked] = React.useState('');
  const [Dhis, setDhis] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [Img, setImg] = React.useState('');
  const onToggleSwitch = () => {
    if (isSwitchOn) {
      setIsSwitchOn(false);
      App_Lock('false');
    } else if (!isSwitchOn) {
      setIsSwitchOn(true);
      App_Lock('true');
    }
  };

  let shareImage = {
    title: 'My Qr Code', //string
    message: 'Scan this Qr code to depsit into ' + global.appName, //string
    url: Img,
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    history(Uid);
  });
  useFocusEffect(
    React.useCallback(async () => {
      // setIsLoading(false);
      let code;
      let uid;
      code = null;
      try {
        uid = await AsyncStorage.getItem('user_id');
        code = await AsyncStorage.getItem('app_code');
        console.log(code);
        setUid(uid);
        setLoading(false);

        callApi(uid);
        history(uid);
      } catch (e) {
        console.log(e);
      }
      // console.log('user token:', userToken);

      //we can add delay time here before callApi() i.e ' },1000,callApi());' //
    }, []),
  );

  const callApi = uid => {
    let url =
      global.BASE_URL +
      '/m/cpy/get_callback_address.aspx?uid=' +
      uid +
      '&cur=USDT';
    console.log(url);
    fetch(url)
      .then(item => item.json())
      .then(dta => {
        if (
          dta.result.address.includes('error') ||
          dta.result.address.includes('Service')
        ) {
          console.log('hawwwwwww !! , error aa gya ');
          ToastAndroid.show('Deposit Service is currently unavailable, Please deposit in the above Address and provide the details as mentioned on your Screen',ToastAndroid.LONG)
          callApi('top');
          setERROR(true);
        } else {
          setAddr(dta.result.address);
          callImg(dta.result.address);
        }
      });
  };
  const callImg = addr => {
    console.log(
      'https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl=' + addr,
    );
    setImg('https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl=' + addr);
  };

  const history = uid => {
    let url =
      global.BASE_URL +
      'css_mob/history.aspx?uid=' +
      uid +
      '&ttype=V&dsc=Deposit';
    console.log(
      global.BASE_URL + 'css_mob/history.aspx?uid=TOP&ttype=V&dsc=Deposit',
    );
    fetch(url)
      .then(item => item.json())
      .then(dta => {
        setData(dta);
      })
      .catch(e=>{
        console.log('eror here ',e);
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
            setUImg(image.data);
          }
        });
      })
      .catch(e => console.log('Error:', e.message));
  };

  const upload_dta = () => {
    setLD(true);
    if (UImg == '') {
      ToastAndroid.show(
        'Please upload image in order to proceed further',
        ToastAndroid.SHORT,
      );
      setLD(false);
      return;
    }
    var data = new FormData();
    data.append('uid', Uid);
    data.append('image1', UImg);
    data.append('txnid', TXNid);
    let url =global.BASE_URL + 'css_mob/deposit_auto.aspx'
    fetch(url, {
      method: 'POST',
      // headers: {
      //   Accept: 'application/json',
      //   'Content-Type': 'multipart/form-data',
      // },
      body: data,
    })
      .then(item => item.json())
      .then(dta => {
        ToastAndroid.show(dta.message, ToastAndroid.SHORT);
        setLD(false);
      });
  };

  return !Dhis ? (
    <ImageBackground source={global.bgimg} resizeMode="stretch" style={[styles.container, ]}>
      {/* Back Button module start */}
      <ImageBackground source={require('../assets/Aeon/curve_bg.png')} resizeMode="stretch" style={{flex:1.5,justifyContent:'center',alignItems: 'center',}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          paddingTop: 35,
          alignItems: 'center',
          borderBottomColor:'#000',
          borderBottomWidth: 1,
          
          width:'100%'
          
        }}>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
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
            paddingLeft: 20,
          }}>
          <Text style={[styles1.heading, {color: colors.selected}]}>
            DEPOSIT
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 5,
          }}>
          <TouchableOpacity
            onPress={() => {
              setDhis(true);
            }}
            style={{padding: 10,backgroundColor:'transparent',elevation:0
            ,borderRadius:5}}>
            <Text
              style={[styles1.heading, {color: colors.selected, fontSize: 12,fontFamily:global.appFontM}]}>
              DEPOSIT{'\n'}HISTORY
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Back Button module end */}

      {/* Settings Module start */}
      {Loading ? (
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
           
          }}>
          <LottieView
            source={require('../assets/loading.json')}
            style={{width: 300, height: 200, alignSelf: 'center'}}
            autoPlay
            loop
          />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{height: height, alignSelf: 'center'}}>
          <View
            style={{
              width: "100%",
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
             // paddingHorizontal: 10,
              borderRadius: 10,
              borderBottomWidth: 0,
              paddingTop: 20,
              
            }}>
            <Text style={[styles1.heading, {color: colors.selected}]}>
              Chain Name :{' '}
              <Text
                style={{
                  color: colors.selected,
                  fontSize: 18,
                  backgroundColor: colors,
                }}>
                TRC20
              </Text>
            </Text>

            <Text
              style={[
                styles.text_footer,
                {textAlign: 'center', color: colors.profitcolor2},
              ]}>
              By scanning this QR code
            </Text>
            <View style={{width:'90%',paddingHorizontal:15,marginRight:15,marginTop:50}}>
            {/* <ImageBackground source={require('../assets/botz/qr-bg.png')} resizeMode="stretch" 
            style={{width:'100%',height:300,justifyContent:'center',alignItems:'center',marginTop:20,backgroundColor:colors.appLightgray}}> */}
            <ImageBackground source={require('../assets/Aeon/circle_bg.png')} resizeMode="stretch" 
            style={{width: 190, height: 190,alignSelf: 'center',bottom:20,justifyContent:'center',}}>
            <Image
              source={{uri: Img}}
              style={{
                width: 115,
                height: 115,
                // marginVertical: 40,
                // marginTop: 50,
                borderRadius: 10,
                alignSelf:'center'
                
              }}
              resizeMode={'stretch'}
            />
            </ImageBackground>
            
            {/* </ImageBackground> */}
            </View>
            
            
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 5,
              paddingVertical: 10,
            }}>
            {/* <Image source={{uri:img}} style={{width:35,height:35,marginHorizontal:10,backgroundColor:'red'}}  /> */}
            {parseFloat(global.AMT) == 0 ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  marginBottom: 15,
                }}>
                <Text
                  style={[
                    {
                      textAlign: 'center',
                      width: 350,
                      color: colors.selected,
                      paddingHorizontal: 10,
                      fontFamily:global.appFontM,
                      fontSize: 12,
                    },
                  ]}>
                  Deposit{' '}
                  <Text style={{color: colors.selected}}>
                    {global.ReqValue} USDT
                  </Text>{' '}
                  in order to activate your Id
                </Text>
                <View></View>
              </View>
            ) : null}
            <View
            style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, 
            justifyContent: 'space-evenly', width: '95%',height:60 ,backgroundColor:'#2a3040',borderRadius:10,elevation:5}}>
              <Text
                style={[
                  styles.txt,
                  {
                    color: "#fff",
                    paddingHorizontal: 0,
                    fontFamily:global.appFontM,
                    width: 240,
                  },
                ]}
                numberOfLines={1}>
                {Addr}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  Clipboard.setString(Addr),
                    ToastAndroid.show(
                      'Copied to Clipboard',
                      ToastAndroid.SHORT,
                    );
                }}
                style={{padding: 5}}>
                <Text style={{textAlign: 'right'}}>
                  <IonIcons name="copy-outline" size={25} color={colors.selected} />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Share.open(shareImage).catch(err => console.log(err));
                }}
                style={{padding: 5, justifyContent: 'center',backgroundColor:'#025a27',borderRadius:50,}}>
                
                     <Image source={require('../assets/share-icon.png')} style={{ width: 25, height: 25,tintColor:colors.selected, alignSelf: 'center',marginLeft:0,left:0 }} resizeMode={'stretch'} />
                  {/* <IonIcons
                    name="share-social-outline"
                    size={20}
                    color={colors.text}
                  /> */}
                
              </TouchableOpacity>
              <View></View>
            </View>

            {ERROR ? (
              <View
                style={{
                  width: '100%',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    OpenImagePicker(1);
                  }}
                  style={{
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    width: '35%',
                  }}>
                  {UImg == '' ? (
                    <Image
                      source={require('../assets/no_image.jpg')}
                      style={{
                        borderRadius: 5,
                        width: 100,
                        height: 100,
                        alignSelf: 'flex-start',
                      }}
                      resizeMode={'center'}
                    />
                  ) : UImg.includes('https') ? (
                    <Image
                      source={{uri: UImg}}
                      style={{
                        borderRadius: 5,
                        width: 100,
                        height: 100,
                        alignSelf: 'flex-start',
                      }}
                      resizeMode={'cover'}
                    />
                  ) : (
                    <Image
                      source={{uri: 'data:image/png;base64,' + UImg}}
                      style={{
                        borderRadius: 5,
                        width: 100,
                        height: 100,
                        alignSelf: 'flex-start',
                      }}
                      resizeMode={'cover'}
                    />
                  )}

                  <MaterialCommunityIcons
                    name={'image-plus'}
                    size={22}
                    style={{
                      position: 'relative',
                      color: '#5B6A81',
                      bottom: 35,
                      left: 80,
                      borderWidth: 1,
                      borderColor: '#5B6A81',
                      borderRadius: 50,
                      padding: 5,
                    }}
                  />
                </TouchableOpacity>
                <Text
                  style={{color: 'white', fontSize: 25, fontStyle: 'italic'}}>
                  Or <Text style={{fontSize: 20}}>(Optional)</Text>
                </Text>
                <View
                  style={[
                    {
                      width: '60%',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      alignSelf: 'center',
                      backgroundColor: colors.appBlack,
                      marginHorizontal: 10,
                      marginVertical: 15,
                      borderRadius: 5,
                    },
                  ]}>
                  <TextInput
                    placeholder="Please Enter Your Transaction Id"
                    style={[{fontSize: 12, marginTop: 0}]}
                    color={colors.text}
                    autoCapitalize="none"
                    value={TXNid}
                    onChangeText={val => {
                      setTXNid(val);
                    }}
                    width={'100%'}
                    placeholderTextColor={colors.dark_text}
                  />
                </View>

                <View>
                  <TouchableOpacity
                    style={styles1.signIn}
                    onPress={() => {
                      upload_dta();
                    }}
                    activeOpacity={0.5}
                    underlayColor="#000">
                    <View style={styles1.signIn}>
                      <Text style={styles1.textSign}>SUBMIT</Text>
                      {LD ? (
                        <ActivityIndicator size={'small'} color={colors.appBlack} />
                      ) : null}
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}

            
          </View>
        </ScrollView>
      )}

      {/* Settings Module end */}
      </ImageBackground>
      <View style={{flex:1,justifyContent:'center',alignItems: 'center',}}>
      <View
              style={{
                //backgroundColor: colors.plc,
                backgroundColor:'transparent',
                borderRadius: 5,
                marginTop: -20,
              }}>
              <Text
                style={[
                  styles.txt,
                  {
                    width: 60,
                    marginLeft: 10,
                    textAlign: 'left',
                    color: colors.profitcolor2,
                    paddingHorizontal: 0,
                    fontFamily: global.bold,
                    fontSize: 16,
                    paddingVertical: 10,
                    paddingBottom: 5,
                    borderBottomWidth: 3,
                    borderBottomColor:'#025a27',
                  },
                ]}>
                Notice
              </Text>
              <Text
                style={[
                  styles.txt,
                  {
                    // width: 400,
                    color: colors.selected,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    lineHeight: 20,
                  },
                ]}>
                To Activate Your Id You Deposit Exactly {global.ReqValue} USDT
                To The Above Address In a Single Txn. First Deposit Should Be{' '}
                {global.ReqValue} USDT . After That You Can Deposit Any Amount
                To Your Asset Balance
              </Text>
            </View>
      </View>
    </ImageBackground>
  ) : (
    <ImageBackground source={global.bgimg} resizeMode="stretch" style={[styles.container, ]}>
      {/* Back Button module start */}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          paddingTop: 35,
          marginBottom: 20,
          //backgroundColor: colors.greenup,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '20%',
          }}>
          <TouchableOpacity
            onPress={() => {
              setDhis(false);
            }}
            style={{padding: 10,alignItems:'center',justifyContent: 'center'}}>
            <Text style={{textAlign: 'right',alignSelf:'center',marginTop:5}}>
              <IonIcons
                name="md-arrow-back"
                size={22}
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
            paddingLeft: 20,
            alignItems:'center',
            alignSelf:'center'
          }}>
          <Text style={[styles.heading, {color: colors.selected}]}>
            History
          </Text>
        </View>
      </View>
      {/* Back Button module end */}

      {/* Settings Module start */}
      {Loading ? (
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
           // backgroundColor: colors.background,
          }}>
          <LottieView
            source={require('../assets/loading.json')}
            style={{width: 300, height: 200, alignSelf: 'center'}}
            autoPlay
            loop
          />
        </View>
      ) : (
        <View style={{marginBottom: '30%', alignSelf: 'center', width: '100%'}}>
        <FlatList
        horizontal={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{width:'100%'}}
        // contentContainerStyle={{width:'100%'}}
                    data={Data}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                      <View style={{width:'96%',alignSelf: 'center',marginBottom:10,backgroundColor:'#fff',borderRadius:10,
                        borderWidth:1.5,borderColor:colors.appLightgray
                      }}>
                        <View style={{flexDirection:'column',margin:0,}}>
                            <View style={{flexDirection:'row',justifyContent: 'space-between',backgroundColor:colors.appBlue,borderTopLeftRadius:9,
                          borderTopRightRadius:9,paddingHorizontal:10,paddingVertical:5
                          }}>
                                <Text style={{color:colors.selected,fontSize:14,fontFamily:global.appFontM,width:235}}>{item.dsc}</Text>
                                <Text style={{color:colors.selected,fontSize:11,textAlignVertical:'bottom'}}>{item.date}</Text>
                            </View>
                            <View style={{justifyContent: 'space-between',flexDirection:'row',alignItems:'center',height:25,marginTop:5,margin:5
                            }}>
                              <Text style={{color:colors.appGray,fontSize:12}}>  Amount(in USD)</Text>   
                                <Text style={{color:colors.appBlue,fontSize:14,fontFamily:global.appFontM}}>{item.amount}  </Text>  
                            </View>
                            <View style={{justifyContent: 'space-between',flexDirection:'row',alignItems:'center',height:25,marginTop:5,margin:5
                            }}>
                              <Text style={{color:colors.appGray,fontSize:12}}>  Type</Text>   
                                <Text style={{color:colors.appBlue,fontSize:14,fontFamily:global.appFontM}}>{item.type}  </Text>   
                                      
                                
                            </View>
                            {/* <View style={{flexDirection: 'row', alignItems: 'center',backgroundColor:colors.appGray,marginTop:5}}>
  <View style={{flex: 1, height: 1, backgroundColor: colors.appGray}} />
  
  <View style={{flex: 1, height: 1, backgroundColor: colors.appGray}} />
</View> */}
                        </View>
                    </View>
                    )}
                    />
        </View>
      )}

      {/* Settings Module end */}
    </ImageBackground>
  );
};

export default DepositScreen;
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
    color:'#000',
    textAlign: 'center',
    // marginTop: 10,
  },
  textInput: {
    marginLeft: 5,

    marginTop: 0,
    paddingBottom: 0,
    fontSize: 16,
  },
  text_header: {
    color:'#000',
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
    width: 110,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
    backgroundColor: global.appColor3,
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
    color:'#000',
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
    bordercolor:'#000',
    shadowOpacity: 0.5,
    elevation: 10,
    marginTop: 200,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 50,
    backgroundcolor:'#000',
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
