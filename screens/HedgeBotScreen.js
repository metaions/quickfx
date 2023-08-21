/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import {
  View,
  Text,
  Button,
  Dimensions,
  RefreshControl,
  TextInput,
  Linking,
  TouchableOpacity,
  BackHandler,
  StyleSheet,
  Image,
  StatusBar,
  FlatList,
  ActivityIndicator,
  ScrollView,
  TouchableHighlight,
  ToastAndroid,
  ImageBackground,
} from 'react-native';
import {
  ThemeProvider,
  useFocusEffect,
  useIsFocused,
  useTheme,
  useLinkTo,
} from '@react-navigation/native';
import {Appbar, Paragraph} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import global from '../component/global';
import styles from '../component/styles';
import Modal from 'react-native-modal';
import {jsonContext} from '../context/GlobalState';
import {set} from 'lodash';
var DeviceInfo = require('react-native-device-info');
var arr = [];
const green = '#3fc71d'
const green2 = '#208606'
const green3 = '#054815'
const yellow = '#fdfb51'
const yellow2 = '#f2c90d'
const yellow3 = '#fd821b'
const yellow4 = '#f89d06'
const HedgeBotScreen = ({navigation, route}) => {
  //colors

  const linkTo = useLinkTo();
  const {colors} = useTheme();
  const theme = useTheme();
  const [Data, setData] = React.useState('');
  const [Uid, setUid] = React.useState('');
  const [Started, setStarted] = React.useState('False');
  const [Amt, setAmt] = React.useState('');
  const [Num, setNum] = React.useState('');
  const [Btype, setBtype] = React.useState('low');
  const [Bal, setBal] = React.useState(
    global.AccMode == 'demo' ? global.demobal : global.livebal,
  );
  // const {myjson,globalAcc, setCallStore, hedge} = React.useContext(jsonContext);
  const {myjson, globalAcc, hedge} = React.useContext(jsonContext);
  const [Strades, setStrades] = React.useState(0);
  const [ShowCoins, setShowCoins] = React.useState(0);
  const [BTN, setBTN] = React.useState(true);
  const [selected1, setSelected1] = React.useState(false);
  const [selected2, setSelected2] = React.useState(true);

  const [selected3, setSelected3] = React.useState(false);
  const [numTrades, setNumTrades] = React.useState(0);
  const [isModalVisibleStop, setIsModalVisibleStop] = React.useState(false);
  const [isModalVisibleStop1, setIsModalVisibleStop1] = React.useState(false);
  const [ShowImg, setShowImg] = React.useState(false);
    // const [token,setToken] = React.useState('');
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isModalVisible2, setModalVisible2] = React.useState(false);
  const [timer, setTimer] = React.useState(6);
  const sym = route.params?.sym;
  // console.log("symboldis" + sym);
  const [Loading, setLoading] = React.useState(false);
  React.useEffect(() => {
   getVals()
  }, []);
  async function getVals() {
    let token = await AsyncStorage.getItem('token');

    if (!hedge) {
      ToastAndroid.show('Please Enable Hedge Mode', ToastAndroid.LONG);

      navigation.goBack();
      return;
    }
    function objToQueryString(obj) {
      const keyValuePairs = [];
      for (const key in obj){
        keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
      }
      return keyValuePairs.join('&');
    }   
    const key_string = objToQueryString({
      key:Uid+global.PWD+global.txnPassword      
 });  
    let url =
      global.BASE_URL + 'css_mob/autobot/auto_settings.aspx?uid=' + global.uid+
      '&token=' +
      token +
      '&device=' +
      DeviceInfo.getUniqueId() +
      '&dname=' +
      DeviceInfo.getModel()+'&'+key_string;
    console.log(url);
    fetch(url)
      .then(item => item.json())
      .then(data => {
        if (data.success === 'true') {
          if(data.auto_amt==''){
            setNum('0')
          }else{

            setNum(data.auto_amt);
          }
          if(data.auto_num==''){
            setNumTrades('0')
          }else{

            setNumTrades(data.auto_num);
          }
          // setNumTrades(data.auto_num);
          setStarted(data.started);
          setBtype(data.auto_type)
        }
      });
  }

  React.useEffect(() => {
    setTimeout(async () => {
      let uid;
      try {
        uid = await AsyncStorage.getItem('user_id');
        setUid(uid);
      } catch (e) {
        console.log(e);
      }
      // console.log('user token:', userToken);
    }, 1000);
  }, []);

  const show_image = () => {
    setShowImg(!ShowImg);
  };

  const [a, setA] = React.useState(0);
  const [Count, setCount] = React.useState(false);
  React.useEffect(() => {
    if (Count) {
      //   console.log('in use ihjdsjdhf')
      if (timer > 0) {
        setTimeout(() => setTimer(timer - 1), 1000);
        setA(1);
      } else {
        //   if(a==1){
        ToastAndroid.show(
          'Hedge AutoBot has Started. you will be redirected to Home now',
          ToastAndroid.LONG,
        );
        navigation.goBack();
        // }            // setSeconds(60);
        // setCount(false)
        // setCanEmail(true)
      }
    }
  });
  useFocusEffect(
    React.useCallback(() => {
      // console.log('in use focus of')
      if (Started === 'True') {
        setAmt(global.autoAmt);
        setNum(global.autoFamt);
        setNumTrades(global.autoNum);
        if (global.autotype === 'high') {
          setSelected1(true);
          setSelected2(false);
          setSelected3(false);
        } else if (global.autotype === 'low') {
          setSelected1(false);
          setSelected2(true);
          setSelected3(false);
        } else if (global.autotype === 'custom') {
          setSelected3(true);
          setSelected2(false);
          setSelected1(false);
        }
      }
    }, []),
  );
  const [fromEdit, setFromEdit] = React.useState(false);
  const CheckSort = DATA => {
    setData(DATA.sort((a, b) => parseFloat(a.pcp) < parseFloat(b.pcp)));
    (arr = DATA.sort((a, b) => parseFloat(a.pcp) < parseFloat(b.pcp))),
      (arr.length = 20);
  };
  React.useEffect(() => {
    let Bal = global.AccMode == 'demo' ? global.demobal : global.livebal;
    var numT = parseFloat(Num) * 10;
    if (numT !== '' && Bal !== '') {
      if (parseFloat(Bal) % parseFloat(numT) === 0) {
        setStrades(Math.floor(parseFloat(Bal) / parseFloat(numT)).toFixed(1));
      } else {
        setStrades(Math.floor(parseFloat(Bal) / parseFloat(numT)).toFixed(1));
      }
    }
    console.log('kkkkkkk');
  }, [Strades, Num]);

  const EditInvest = async () => {
    let token = await AsyncStorage.getItem('token');
    setBTN(false);

    if (parseInt(Num) < 5) {
      setBTN(true);
      ToastAndroid.show(
        'Minimum First Buy In Amount Is 5 USDT',
        ToastAndroid.LONG,
      );
      setLoading(false);
      return;
    }
    // if (numTrades>10)
    // {
    //     ToastAndroid.show('Maximum Number Of Trades Can be 10',ToastAndroid.LONG)
    //     return;

    // }

    toggleModal();
    function objToQueryString(obj) {
      const keyValuePairs = [];
      for (const key in obj){
        keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
      }
      return keyValuePairs.join('&');
    }   
    const key_string = objToQueryString({
      key:Uid+global.PWD+global.txnPassword      
 });  
    global.autoAmt = Amt;
    global.autoNum = numTrades;
    global.autoFamt = Num;
    let url =
      global.BASE_URL +
      'css_mob/autobot/autobot.aspx?uid=' +
      Uid +
      '&amt=' +
      Num +      
      '&num=' +
      numTrades +
      '&num1=0' +      
      '&mode=edit' +
      '&bal=' +
      Bal +
      '&type=' +
      Btype +
      '&token=' +
      token +
      '&device=' +
      DeviceInfo.getUniqueId() +
      '&dname=' +
      DeviceInfo.getModel()+'&'+key_string;
    setStarted('True');

    console.log(url);
    setCount(true);
    fetch(url)
      .then(item => item.json())
      .then(Dta => {
        console.log(Dta + '   ' + JSON.stringify(Dta));
        if (Dta.success !== 'true') {
          setBTN(true);
          return;
        }
        // myApi();
      })
      .catch(function (error) {
        // toggleModal()
        console.log(' fetch error ' + error);
      });
  };
  const EditInit = () => {
    setIsModalVisibleStop1(false);
    setStarted('False');
    setFromEdit(true);
  };
  const StopInvest = async () => {
    let token = await AsyncStorage.getItem('token');

    console.log('stop invest');
    setIsModalVisibleStop(false);
    setStarted('False');
    function objToQueryString(obj) {
      const keyValuePairs = [];
      for (const key in obj){
        keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
      }
      return keyValuePairs.join('&');
    }   
    const key_string = objToQueryString({
      key:Uid+global.PWD+global.txnPassword      
 });  
    let url =
      global.BASE_URL + 'css_mob/autobot/stopautobot.aspx?uid=' + Uid+'&token='+
      token +
      '&device=' +
      DeviceInfo.getUniqueId() +
      '&dname=' +
      DeviceInfo.getModel()+'&'+key_string;
    console.log(url);
    fetch(url)
      .then(item => item.json())
      .then(Dta => {
        global.autoAmt = 0;
        global.autoNum = 0;
        global.autoFamt = 0;

        console.log(Dta + '   ' + JSON.stringify(Dta));
        if (Dta.success !== 'true') {
          setBTN(true);
          return;
        }
        toggleModal2();
      })
      .catch(function (error) {
        toggleModal2();
        console.log(' fetch error ' + error);
      });
  };

  const Invest = async () => {
    let token = await AsyncStorage.getItem('token');
    setBTN(false);

    if (parseFloat(Amt) > parseFloat(Bal)) {
      ToastAndroid.show('Not Enough USDT Available', ToastAndroid.LONG);
      return;
    }
    if (parseInt(Num) < 10) {
      setBTN(true);
      ToastAndroid.show(
        'Minimum First Buy In Amount Is 10 USDT',
        ToastAndroid.LONG,
      );
      setLoading(false);
      return;
    }
    if (parseInt(numTrades) < 1) {
      ToastAndroid.show('Please Fill All Values', ToastAndroid.LONG);
      setLoading(false);
      return;
    }
    global.autoAmt = Amt;
    global.autoNum = numTrades;
    global.autoFamt = Num;
    function objToQueryString(obj) {
      const keyValuePairs = [];
      for (const key in obj){
        keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
      }
      return keyValuePairs.join('&');
    }   
    const key_string = objToQueryString({
      key:Uid+global.PWD+global.txnPassword      
 });  
    let url =
      global.BASE_URL +
      'css_mob/autobot/autobot.aspx?uid=' +
      Uid +
      '&amt=' +
      Num +
      '&num=' +
      numTrades +
      '&type=' +
      Btype +
      '&token=' +
      token +
      '&device=' +
      DeviceInfo.getUniqueId() +
      '&dname=' +
      DeviceInfo.getModel()+'&'+key_string;
    console.log(url);
    apihit();
    function apihit() {
      fetch(url)
        .then(item => item.json())
        .then(Dta => {
          console.log(Dta + '   ' + JSON.stringify(Dta));
          if (Dta.success !== 'true') {
            ToastAndroid.show(Dta.msg,ToastAndroid.SHORT)
            setBTN(true);
            return;
          }
          const timer = setTimeout(() => {
            var currentDate = new Date();
            var minutesToAdd = 20;
            var futureDate = new Date(
              currentDate.getTime() - minutesToAdd * 60000,
            );
            global.autobot_time = futureDate;
            setStarted('True');
            global.autotype = Btype;
            toggleModal();
            setCount(true);
          }, 3000);

          console.log('.........................');
          if (Dta.success === 'true') {
            console.log('///////////////////////');
            var currentDate = new Date();
            var minutesToAdd = 20;
            var futureDate = new Date(
              currentDate.getTime() - minutesToAdd * 60000,
            );
            global.autobot_time = futureDate;
            setStarted('True');
            global.autotype = Btype;
            global.status = 'true';
            global.Coins = '';
            toggleModal();
            setCount(true);
          } else {
            setBTN(true);
            ToastAndroid.show(Dta.msg, ToastAndroid.LONG);
          }

          // myApi();
        })
        .catch(function (error) {
          // toggleModal()
          console.log(' fetch error ' + error);
        });
    }
  };

  const [ph, setPh] = React.useState(false);
  const [ph2, setPh2] = React.useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible);
  };
  return Loading ? (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: colors.background,
      }}>
      <LottieView
        source={require('../assets/loading.json')}
        style={{width: 300, height: 200, alignSelf: 'center'}}
        autoPlay
        loop
      />
    </View>
  ) : (
    <View style={{backgroundColor: 'black',flex:1}}>
    <ImageBackground
      source={require('../assets/Fxbot/hedgebot/bg.png')}
      style={{flex: 1, width: '98%', height: '105%',alignSelf: 'center',
      position: 'absolute',
    left: 5,
    top: -10,
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
    }}
      
      resizeMode={'stretch'}
      >
      <ScrollView style={[styles1.container, {backgroundColor: 'transparent'}]}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
          }}>
          <View
            style={{
              width: '100%',
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
              paddingTop: 40,
            }}
            // start={{ x: 0, y: 1 }}
            // end={{ x: 1, y: 1 }}
          >
            {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 15,
                width: '100%',

                paddingVertical: 0,
                marginBottom: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 0,
                }}>
                <Text
                  style={[
                    styles.sheading,
                    {color: colors.selected, fontSize: 20},
                  ]}>
                  Welcome To {global.appName}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}></View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
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
              </View>
            </View> */}
          </View>
          <Modal
            statusBarTranslucent={true}
            deviceHeight={1000}
            isVisible={isModalVisible2}
            animationInTiming={100}
            useNativeDriver={true}
            backdropOpacity={1}
            animationOutTiming={100}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-around',
                paddingHorizontal: 15,
                paddingVertical: 15,
                borderWidth: 0.5,
                borderColor: global.appColor1,
                borderRadius: 10,
              }}>
              <View style={{justifyContent: 'center'}}>
                {/* <LottieView source={require('../assets/trade.json')} style={{width:'100%',alignSelf:'center',paddingVertical:0}} autoPlay loop  /> */}

                <Text
                  style={{
                    color: colors.selected,
                    fontSize: 20,
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  Bot Stopped Successfully. No New Trades Will Be Added
                  Automatically
                </Text>

                {/* <Text style={{color:'white',alignSelf:'center',textAlign: 'center',marginTop:20,marginBottom:10}}>You can proceed further. we will automatically choose best trades for you.</Text> */}
                <TouchableOpacity
                  style={{marginTop: 10, width: 250, alignSelf: 'center'}}
                  onPress={() => {
                    toggleModal2(), navigation.goBack();
                  }}>
                  <LinearGradient
                    colors={[global.appColor1, global.appColor1]}
                    style={{
                      width: '100%',
                      borderRadius: 30,
                      paddingHorizontal: 25,
                      paddingVertical: 5,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 20,
                        textAlign: 'center',
                      }}>
                      OK
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Modal
            statusBarTranslucent={true}
            deviceHeight={1000}
            isVisible={isModalVisible}
            animationInTiming={100}
            backdropOpacity={1}
            useNativeDriver={true}
            animationOutTiming={100}>
            <ImageBackground
            source={require('../assets/Fxbot/bg7.png')}
            resizeMode={'stretch'}
              style={{
                flexDirection: 'column',
                // justifyContent: 'space-around',
                width:'100%',height:'100%',//backgroundColor:'red'
                alignItems: 'center',
                justifyContent: 'flex-start'
              }}>
                <Image source={require('../assets/logofx.png')} 
                  style={{width:200,height:60,marginTop:50 }} resizeMode={'contain'}
                />
              <View style={{justifyContent: 'center'}}>
                {/* <LottieView
                  source={require('../assets/botz.json')}
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                    paddingVertical: 0,
                  }}
                  autoPlay
                  loop
                /> */}
                {/* <View style={{borderRadius:5,padding:10,borderWidth:0.5,borderColor:colors.selected}}> */}
             
                  <Text
                    style={{
                      color: green2,
                      fontSize: 30,marginTop:20,
                      textAlign: 'center',
                      fontFamily: 'LemonMilkProBold',
                    }}>
                    POSITION BOT
                  </Text>
                  <Text
                    style={{
                      color: '#ff8200',
                      fontSize: 30,
                      textAlign: 'center',
                      fontFamily: 'LemonMilkProBold',
                    }}>
                    INITIATED..
                  </Text>
               
                <Text
                  style={{
                    color: 'white',
                    alignSelf: 'center',
                    textAlign: 'center',
                    marginTop: 10,
                    marginBottom: 10,
                    fontFamily: 'LemonMilkProRegular',
                    fontSize:16,

                    padding: 10,
                    // borderWidth: 0.5,
                    // borderColor: colors.selected,
                  }}>
                  {'You will be Redirected to Home In'.toUpperCase()}
                </Text>
                {/* </View> */}
                <TouchableOpacity
                  style={{marginTop: 10, width: 100,height:100, alignSelf: 'center'}}
                  onPress={() => {
                    toggleModal(), navigation.goBack();
                  }}>
                  <LinearGradient
                    colors={['#000', '#000']}
                    style={{
                      width: 100,height:100,
                      borderRadius: 50,alignItems: 'center',justifyContent: 'center'
                      // paddingHorizontal: 25,
                      // paddingVertical: 5,
                    }}>
                    <Text
                      style={{
                        color: colors.yellow,
                        fontSize: 60,
                        textAlign: 'center',
                        fontFamily: 'LemonMilkProBold',
                      }}>
                      {timer}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </Modal>
          <Modal
            statusBarTranslucent={true}
            deviceHeight={1000}
            onBackdropPress={() => {
              setIsModalVisibleStop1(false);
            }}
            // style={{}}
            useNativeDriver={true}
            isVisible={isModalVisibleStop1}
            animationInTiming={100}
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
                backgroundColor: global.appColor2,
                height: 170,
                alignItems: 'center',
                elevation:10,
                borderWidth: 1,
                borderColor: '#ffe36e',
                borderRadius: 10,
                borderBottomWidth: 0,
                paddingBottom: 10,
              }}>
              <Text
                style={{
                  color: colors.selected,
                  fontSize: 17,
                  fontWeight: 'bold',
                }}>
                Are you sure ,you want to Edit Settings of Position Bot?
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
                    setIsModalVisibleStop1(false);
                  }}
                  style={{width: '40%', alignSelf: 'center'}}>
                  <View
                    style={{
                      marginTop: 5,
                      width: '80%',
                      height: 35,
                      backgroundColor: colors.appGrey,
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{color: '#fff', fontWeight: 'bold', fontSize: 17}}>
                      Cancel
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    EditInit();
                  }}
                  style={{width: '60%', alignSelf: 'center'}}>
                  <View
                    style={{
                      marginTop: 5,
                      width: '80%',
                      height: 35,
                      backgroundColor: colors.green1,
                      flexDirection: 'row',
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{color: '#fff', fontWeight: 'bold', fontSize: 17}}>
                      Yes
                    </Text>
                    {/* {renewClicked? <ActivityIndicator style={{left:5}} size='small' color='white' />:null} */}
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Modal
            statusBarTranslucent={true}
            deviceHeight={1000}
            onBackdropPress={() => {
              setIsModalVisibleStop(false);
            }}
            useNativeDriver={true}
            isVisible={isModalVisibleStop}
            animationInTiming={100}
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
                backgroundColor: colors.c1,
                height: 150,
                alignItems: 'center',
                // borderWidth: 0.5,
                // borderColor: '#ffe36e',
                borderRadius: 10,
                // borderBottomWidth: 0,
                paddingBottom: 10,
              }}>
              <Text
                style={{
                  color: colors.selected,
                  fontSize: 17,
                  fontWeight: 'bold',
                }}>
                Are you sure,you want to Stop the PositionBot?
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
                    setIsModalVisibleStop(false);
                  }}
                  style={{width: '40%', alignSelf: 'center'}}>
                  <View
                    style={{
                      marginTop: 5,
                      width: '80%',
                      height: 35,
                      backgroundColor: colors.appGrey,
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{color: '#fff', fontWeight: 'bold', fontSize: 17}}>
                      Cancel
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    StopInvest();
                  }}
                  style={{width: '60%', alignSelf: 'center'}}>
                  <View
                    style={{
                      marginTop: 5,
                      width: '80%',
                      height: 35,
                      backgroundColor: colors.green1,
                      flexDirection: 'row',
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{color: '#fff', fontWeight: 'bold', fontSize: 17}}>
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
              justifyContent: 'space-around',
              position: 'relative',
              paddingLeft: 35,
            }}>
            {/* <Animatable.Image
              animation={'fadeInLeft'}
              delay={500}
              useNativeDriver
              source={require('../assets/smartbot/glantern.png')}
              resizeMode={'stretch'}
              style={{width: 180, height: '70%'}}
            /> */}
            <View
              style={{
                alignItems: 'center',
                width: '100%',
                // height: 600,
              }}>
              <Text
                style={{
                  color: colors.selected,
                  fontSize: 25,fontFamily: 'LemonMilkProBold',
                  
                  textAlign: 'center',
                }}>
                {' '}
                START THE {'\n'}
                <Text style={{color: '#2ABD00', fontSize: 30,fontFamily: 'LemonMilkProBold'}}>POSITION BOT</Text>
              </Text>

                <View
                  style={{
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    flexDirection: 'row',
                    backgroundColor:'#1e2631',borderRadius:50,padding:5,width:250
                  }}>
                  <Image
                    source={require('../assets/Fxbot/hedgebot/dollar.png')}
                    style={{width: 25, height: 30,marginLeft:20, alignSelf: 'center'}}
                    resizeMode={'stretch'}
                  />
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                     marginLeft:10
                    }}>
                    <Text
                      style={{
                        color: colors.yellow2,
                        fontSize: 16,
                        fontFamily: 'LemonMilkProBold',
                        alignSelf: 'flex-start',

                      }}>
                      USD Balance
                    </Text>
                    <Text
                      style={{
                        color: colors.selected,
                        fontSize: 23,
                        fontFamily: 'LemonMilkProBold',
                        alignSelf: 'flex-start',
                      }}>
                      {' '}
                      {globalAcc!=='live'?global.demobal:global.livebal}
      
                    </Text>
                  </View>
                </View>
             
            </View>
          </View>
          <Image 
          source={require('../assets/Fxbot/hedgebot/circle.png')}
          style={{width:300,height:310,position:'absolute',left:40,top:360}}
          />
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              paddingHorizontal: '5%',marginTop: 200
            }}>
              <Image 
          source={require('../assets/logofx.png')}
          style={{width:95,height:30}}
          // resizeMode={'stretch'}
          />
               <View
                style={{width: '70%',}}>
                <Text
                  style={{
                    color: colors.selected,
                    fontSize: 13,
                    alignSelf: 'center',
                    marginVertical: 10,
                    // alignItems: 'center',
                    fontWeight:'bold'
                  }}>
                  NUMBER OF TRADES
                </Text>

                <View
                  style={[
                    styles1.boxouter,
                    {backgroundColor: '#272c2f', marginBottom: 10},
                  ]}>
                 
                  <TextInput
                    placeholder={ph2 ? null : 'Eg 2'}
                    onFocus={() => {
                      setPh2(true);
                    }}
                    onBlur={() => {
                      setPh2(false);
                    }}
                    value={numTrades}
                    maxLength={30}
                    editable={Started === 'True' ? false : true}
                    style={
                      Started === 'True'
                        ? styles1.textInput2
                        : styles1.textInput
                    }
                    keyboardType="number-pad"
                    autoCapitalize="none"
                    onChangeText={val => {
                      let new_bal = parseFloat(global.livebal) / 10;
                      setNumTrades(val);
                      new_bal = Math.floor(new_bal / val);
                      setNum(new_bal.toString());
                    }}
                    // width={'80%'}
                    // marginTop={10}
                    // borderRadius={5}
                    placeholderTextColor="#908c8c"
                    //'#808080'
                    // color={global.autoStatus=='True'?'white':'#4d0300'}//'#000'
                    color={colors.yellow}
                    // color={'#4d0300'}
                    selectionColor={colors.yellow} //{'#4d0300'}//'#808080'
                    // color={global.autoStatus=='True'?'white':'#4d0300'}//'#000'
                    // selectionColor={'transparent'}
                  />
                </View>

                <Text
                  style={{
                    color: colors.selected,
                    fontSize: 15,
                    alignSelf: 'flex-start',
                    // marginLeft: 25,
                    paddingVertical: 10,
                    fontWeight:'bold',
                    alignSelf: 'center',
                  }}>
                  FIRST ORDER AMOUNT
                </Text>
                <View style={styles1.boxouter}>
                  {/* <Image
              source={require('../assets/smartbot/white1.png')}
              style={styles1.boximg}
              resizeMode={'stretch'}
            /> */}
                  <TextInput
                    placeholder={ph ? null : 'Eg 11 USDT'}
                    // placeholderTextColor={ph?'transparent':}
                    onFocus={() => {
                      setPh(true);
                    }}
                    keyboardType="number-pad"
                    maxLength={30}
                    value={isFinite(Num) ? Num : 0}
                    onBlur={() => {
                      setPh(false);
                    }}
                    editable={Started === 'True' ? false : true}
                    style={
                      Started === 'True'
                        ? styles1.textInput2
                        : styles1.textInput
                    }
                    autoCapitalize="none"
                    onChangeText={val => setNum(val)}
                    // width={'80%'}
                    // marginTop={10}
                    // borderRadius={5}
                    placeholderTextColor="#908c8c"
                    // selectionColor={'#4d0300'}//'#808080'
                    // color={'#4d0300'}//'#000'
                    selectionColor={colors.yellow} //{global.autoStatus=='True'?'white':'#4d0300'}//'#808080'
                    // color={global.autoStatus=='True'?'white':''}//'#000'
                    color={colors.yellow}
                    // selectionColor={'transparent'}
                  />
                </View>


{/* high risk */}
                <View
                  style={{
                    display:'none',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
               
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      setSelected2(!selected2),
                        setSelected1(false),
                        setSelected3(false),
                        setBtype('high');
                    }}>
                    <ImageBackground
                      source={
                        Btype=='high'
                          ? require('../assets/botz/bot1.png')
                          : require('../assets/botz/bot.png')
                      }
                      style={{
                        width: Btype=='high'? 70 : 60,
                        height:Btype=='high'? 70 : 80,
                        justifyContent: 'center',
                      }}
                      resizeMode={'contain'}>
                      <Text
                        style={{
                          color: Btype=='high'? colors.selected : '#000',
                          textAlign: 'center',
                          fontSize: 15,
                        }}>
                        High{'\n'}Risk
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      setSelected3(!selected3),
                        setSelected1(false),
                        setSelected2(false),
                        setBtype('low');
                    }}
                    style={{marginHorizontal: 10}}>
                    <ImageBackground
                      source={
                        Btype=='low'?
                            require('../assets/botz/bot1.png')
                          : require('../assets/botz/bot.png')
                      }
                      style={{
                        width: Btype=='low'? 70 : 60,
                        height: Btype=='low'? 70 : 80,
                        justifyContent: 'center',
                      }}
                      resizeMode={'contain'}>
                      <Text
                        style={{
                          color: Btype=='low'? colors.selected : '#000',
                          textAlign: 'center',
                          fontSize: 15,
                        }}>
                        Low{'\n'}Risk
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',marginVertical: 5,
                width: '100%',flex:1
              }}>
              <Text style={{color: colors.selected, fontSize: 15,flex:0.7}}>
                Maximum Risk/Trade
              </Text>
              {/* <Text style={{color: colors.selected, fontSize: 15}}>:</Text> */}
              {Num != '' ? (
                <Text style={{color: colors.selected, fontSize: 15,fontFamily: 'LemonMilkProBold',flex:0.3}}>
                  {parseFloat(Num) * 7.5} USD
                </Text>
              ) : (
                <ActivityIndicator color={colors.selected} size={'small'} />
              )}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                flex: 1,
              }}>
              <Text style={{color: colors.selected, fontSize: 15, flex: 0.7}}>
                Total Risk
              </Text>
              
              {numTrades != '' ? (
                <Text style={{color: colors.selected, fontSize: 15, flex: 0.3,fontFamily: 'LemonMilkProBold',}}>
                  {parseFloat(numTrades) * (parseFloat(Num) * 7.5)} USD
                </Text>
              ) : (
                <ActivityIndicator color={colors.selected} size={'small'} />
              )}
            </View>
            <TouchableOpacity
              onPress={() => {
                global.AMT > 0
                  ? navigation.navigate('CoinProfitScreen', {from: 'hedgebot'})
                  : ToastAndroid.show(
                      'Please Activate Your Id First',
                      ToastAndroid.SHORT,
                    );
              }}
              style={[
                {
                  alignSelf: 'center',
                  marginTop: 10,
                  paddingHorizontal: 20,
                  paddingVertical: 10,

                  borderRadius: 10,
                },
              ]}
              useNativeDriver={true}>
                <ImageBackground source={require('../assets/Fxbot/hedgebot/greenbtn.png')}
                style={{width:300,height:50,alignItems:'center',justifyContent: 'center'}} resizeMode={'stretch'}
                >

              <Text
                style={[
                  styles1.text,
                  {
                    color: colors.selected,
                    textAlign: 'center',
                    fontFamily: 'LemonMilkProBold',
                    fontSize: 18,
                  },
                ]}>
                PNL Report
              </Text>
                </ImageBackground>
            </TouchableOpacity>
          </View>
          <View style={{zIndex: 999, marginTop:25}}>
            {Started === 'True' ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor:colors.background,height:100,
                  width: '100%',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setIsModalVisibleStop1(true);
                  }}
                  activeOpacity={0.9}
                  style={{paddingHorizontal: '10%'}}>
                  <View
                    // source={require('../assets/smartbot/btn1.png')}
                    // resizeMode={'stretch'}
                    style={{
                      width: 130,
                      height: 45,
                      paddingHorizontal: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#000',
                      
                      borderRadius: 35,
                    }}
                    // start={{ x: 0, y: 1 }}
                    // end={{ x: 1, y: 1 }}
                  >
                    <Text
                      style={{
                        color: colors.selected,
                        fontSize: 18,
                        fontFamily: 'LemonMilkProBold',
                      }}>
                      EDIT
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsModalVisibleStop(true);
                  }}
                  activeOpacity={0.9}
                  style={{paddingHorizontal: '10%'}}>
                  <View
                    // source={require('../assets/smartbot/btn2.png')}
                    // resizeMode={'stretch'}
                    style={{
                      width: 130,
                      height: 45,
                      paddingHorizontal: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 35,
                      backgroundColor: colors.yellow2,
                      // marginTop:20
                    }}
                    // start={{ x: 0, y: 1 }}
                    // end={{ x: 1, y: 1 }}
                  >
                    <Text
                      style={{
                        color: colors.selectednew,
                        fontSize: 18,
                        fontFamily: 'LemonMilkProBold',
                      }}>
                      STOP
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <>
               
                <TouchableOpacity
                  onPress={() => {
                    if (Num != '') {
                      if (global.api_key === '') {
                        setBTN(true);
                        ToastAndroid.show(
                          'Please Link your API Address first!',
                          ToastAndroid.LONG,
                        );
                      } else {
                     
                        if (fromEdit && parseInt(numTrades) > 0) {
                       
                          EditInvest();
                         
                        } else if (!fromEdit && parseInt(numTrades) > 0) {
                         
                          Invest();
                         
                        } else {
                          setBTN(true);
                          ToastAndroid.show(
                            'Number of Trades should be greater than 0! ',
                            ToastAndroid.SHORT,
                          );
                        }
                      }
                    } else {
                      setBTN(true);
                      ToastAndroid.show(
                        'Enter the details first! ',
                        ToastAndroid.SHORT,
                      );
                    }
                  }}
                  activeOpacity={0.9}
                  style={{paddingHorizontal: 0, marginTop: 0}}>
                  <LinearGradient
                  colors={['#f2c90d', '#fd821b', '#f89d06']} 
                  start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
                    locations={[0,0.5,0.6]}

                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 200,
                      alignSelf: 'center',
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: 'bold',
                        marginBottom: 5,
                        fontSize: 20,
                      }}>
                      START{' '}
                      {BTN ? null : (
                        <ActivityIndicator size={'small'} color="#000" />
                      )}{' '}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                {/* <Text style={{color:colors.selected,textAlign: 'center',marginTop:15}}>Note : Upto 500$ Account Only 1 Trade Should Be Taken</Text>
                <Text style={{color:colors.selected,textAlign: 'center',marginTop:15}}>      High Asset Balance Is Required For Backup</Text> */}
              </>
            )}
          </View>          
        </View>
        <Modal
          onBackButtonPress={() => {
            setShowImg(false);
          }}
          statusBarTranslucent={true}
          deviceHeight={1000}
          onBackdropPress={() => {
            setShowImg(false);
          }}
          useNativeDriver={true}
          isVisible={ShowImg}
          animationInTiming={100}
          animationOutTiming={100}>
          <View
            style={{
              justifyContent: 'center',
              paddingHorizontal: 0,
              marginTop: 20,

              width: '100%',
            }}>
            <TouchableOpacity
              style={{position: 'absolute', right: 0, top: 70, zIndex: 9999}}
              onPress={() => {
                setShowImg(false);
              }}>
              <Image
                source={require('../assets/close2.png')}
                style={{width: 40, height: 40}}
              />
            </TouchableOpacity>
            <Image
              source={require('../assets/botz/referral.jpg')}
              resizeMode={'stretch'}
              style={{
                alignItems: 'center',
                borderRadius: 20,
                width: '100%',
                height: '70%',
                borderColor: global.grad3,
              }}
            />
          </View>
        </Modal>
      </ScrollView>
    </ImageBackground>
    </View>
  );
};

export default HedgeBotScreen;
const styles1 = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0B1725',
    // paddingTop: 40,
  },
  textInput: {
    alignSelf: 'center',
    // backgroundColor: 'white',
    // borderWidth:0.5,
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'LemonMilkProBold',
    // paddingLeft: 10,
    width: 200,
    height: 45,
    color:'#fff', 
  },
  textInput2: {
    // backgroundColor: 'grey',
    // borderWidth:0.5,
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'LemonMilkProBold',
    alignSelf: 'center',
    // paddingLeft: 10,
    width: 200,
    height: 45,
    color:'#fff', 
  },
  boxouter: {
    flexDirection: 'row',
    backgroundColor: '#272c2f',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
    // marginHorizontal:10
  },
  boximg: {
    height: 30,
    width: 30,
    marginHorizontal: 5,
    marginRight: 20,
    marginLeft: 20,
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
  text_Price: {
    color: '#13B34F',
    width: 100,
    textAlign: 'left',
    fontSize: 13,
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
    borderRadius: 50,
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    marginTop: 80,
  },
  title: {
    fontSize: 15,
    color: '#f5f5f5f5',
    fontWeight: 'bold',
  },
  textTime: {
    fontSize: 13,
    color: '#d0d0d0d0',
    width: 90,
    textAlign: 'left',
  },
  textVol: {
    fontSize: 15,
    color: '#d0d0d0d0',
    width: 100,
    textAlign: 'right',
  },
  sliderContainer: {
    height: 350,
    width: '96%',
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
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
    borderRadius: 4,
  },
  fitnessbox: {
    paddingHorizontal: 0,
    // borderWidth: 1,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 18,
    borderRadius: 20,
  },
  card_box: {
    borderRadius: 0,
    borderColor: '#fff',

    backgroundColor: '#fff',
  },
  text_card: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
