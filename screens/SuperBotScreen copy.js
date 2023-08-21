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
  useNavigation,
  useTheme,
  useLinkTo,
} from '@react-navigation/native';

import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';


import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import global from '../component/global';
import styles from '../component/styles';
import Modal from 'react-native-modal';
import {jsonContext} from '../context/GlobalState';
const green = '#3fc71d'
const green2 = '#208606'
const green3 = '#054815'
const yellow = '#fdfb51'
const yellow2 = '#f2c90d'
const yellow3 = '#fd821b'
const yellow4 = '#f89d06'//'#f2c90d', '#fd821b', '#f89d06']
var DeviceInfo = require('react-native-device-info');
var arr = [];
const SuperBotScreen = ({ route}) => {
  const navigation = useNavigation()
  const linkTo = useLinkTo();
  const {colors} = useTheme();
  const theme = useTheme();
  const [Data, setData] = React.useState('');
  const [Uid, setUid] = React.useState('');
  const [Started, setStarted] = React.useState('False');
  const [Amt, setAmt] = React.useState(''); 
  const [Num, setNum] = React.useState('');
  const [Btype, setBtype] = React.useState('0');
  const {myjson,globalAcc, setCallStore, hedge,AgreeSuperbot,setAgreeSuperbot} = React.useContext(jsonContext);
  const [conditionModal,setConditionModal] = React.useState(false)
  const [Bal, setBal] = React.useState(
    global.live
  );//globalAcc=='live'?global.livebal:

// console.log('in super bot----------------------------'+hedge)
  
  const [Strades, setStrades] = React.useState(0);
  const [ShowCoins, setShowCoins] = React.useState(0);
  const [BTN, setBTN] = React.useState(true);
  const [selected1, setSelected1] = React.useState(false);
  const [selected2, setSelected2] = React.useState(true);  
  const [selected3, setSelected3] = React.useState(false);
  const [numTrades, setNumTrades] = React.useState('1');
  const [isModalVisibleStop, setIsModalVisibleStop] = React.useState(false);
  const [isModalVisibleStop1, setIsModalVisibleStop1] = React.useState(false);
  const [ShowImg, setShowImg] = React.useState(false);

  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isModalVisible2, setModalVisible2] = React.useState(false);
  const [timer, setTimer] = React.useState(6);
  const sym = route.params?.sym;
  // console.log("symboldis" + sym);
  const [Loading, setLoading] = React.useState(true);

  React.useEffect( () => {
 setVals()
  }, []);
  async function setVals(){
   let uid = await AsyncStorage.getItem('user_id');
    setUid(uid);
    let token = await AsyncStorage.getItem('token');
    if (!hedge) {
      ToastAndroid.show('Please Enable Hedge Mode', ToastAndroid.LONG);

      navigation.goBack();
      return;
    }
    if (AgreeSuperbot!='true') {
      setConditionModal(true)
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
      global.BASE_URL + 'css_mob/superbot/auto_settings.aspx?uid=' + global.uid+
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
        console.log('-----------response of api:::::'+JSON.stringify(data));
        if (data.success === 'true') {
          setNum(data.auto_amt);
          setTradeCap(data.capital);
          setNumTrades(data.auto_num);
          setStarted(data.started);
          setBtype(data.auto_type)
          setLoading(false)
        }
      });
  }



  const show_image = () => {
    setShowImg(!ShowImg);
  };

  const [showSplash,setShowSplash] = React.useState(false)
  React.useEffect(()=>{
    setShowSplash(true)
    setTimeout(()=>{
      setShowSplash(false)
    },2500)
  },[])
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
          'INFINITY AutoBot has Started. you will be redirected to Home now',
          ToastAndroid.LONG
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
        setTradeCap(global.tradeCapital)
        setNumTrades(global.autoNum);
        if (global.autotype === 'high') {
          setSelected2(true);
          setSelected1(false);
          setSelected3(false);
        } else if (global.autotype === 'low') {
          setSelected1(false);
          setSelected2(false);
          setSelected3(true);
        } else if (global.autotype === 'no'){//'custom') {
          setSelected1(true);
          setSelected2(false);
          setSelected3(false);
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
    setNum(parseFloat(Bal)*0.008)
    setNumTrades(1)
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
    if( !isNaN(parseFloat(tradeCap))){
      if(parseFloat(tradeCap)>= 200)
      {
   if(parseFloat(tradeCap)<= parseFloat(global.livebal)//globalAcc!=='live'?global.demobal:global.livebal
      )
    {
      
      //yes can do it
    }
    else{
      // ToastAndroid.show("Trade capital can't exceed from Balance",ToastAndroid.SHORT)
      // return
    }
  }
  else{
        // ToastAndroid.show("Trade capital can't less than 200USDT",ToastAndroid.SHORT)
        // return

      }
  }
    else{
      setTradeCap('')
      ToastAndroid.show("Please Enter Amount in Trade Capital",ToastAndroid.SHORT)
      return
    }


    let token = await AsyncStorage.getItem('token');
    let mynum='0.01'//globalAcc=='live'?parseFloat(Bal)>500?'2':'1':Num
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
    global.tradeCapital = tradeCap
    let url =
      global.BASE_URL +
      'css_mob/superbot/autobot.aspx?uid=' +
      Uid +
      '&amt=' +
      mynum +
      '&num=' +
      numTrades +
      '&capital='+tradeCap+
      '&num1=0' +      
      '&mode=edit' +
      '&bal=' +
      Bal +
      '&type=' +
      Btype +
      '&token=' +
      token +'&account_mode='+globalAcc+
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
      global.BASE_URL + 'css_mob/superbot/stopautobot.aspx?uid=' + Uid+
      '&token=' +
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
        global.tradeCapital='0'
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
    if( !isNaN(parseFloat(tradeCap))){
      if(parseFloat(tradeCap)>= 200)
      {
   if(parseFloat(tradeCap)<= parseFloat(global.livebal)//globalAcc!=='live'?:global.livebal
      )
    {
      
      //yes can do it
    }
    else{
      // ToastAndroid.show("Trade capital can't exceed from Balance",ToastAndroid.SHORT)
      // return
    }
  }
  else{
        // ToastAndroid.show("Trade capital can't less than 200USDT",ToastAndroid.SHORT)
        // return

      }
  }
    else{
      setTradeCap('')
      ToastAndroid.show("Please Enter Amount in Trade Capital",ToastAndroid.SHORT)
      return
    }
    let mynum='0.01'//globalAcc=='live'?parseFloat(Bal)>500?'2':'1':Num
    let token = await AsyncStorage.getItem('token');
    setBTN(false);

    // if (parseFloat(Amt) > parseFloat(Bal)) {
    //   ToastAndroid.show('Not Enough USDT Available', ToastAndroid.LONG);
    //   return;
    // }
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
    global.tradeCapital=tradeCap
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
      'css_mob/superbot/autobot.aspx?uid=' +
      Uid +
      '&amt=' +
      mynum +
      '&num=' +
      numTrades +
      '&capital='+tradeCap+
      '&type=' +
      
      Btype +'&account_mode='+globalAcc+
      '&token=' +
      token +
      '&device=' +
      DeviceInfo.getUniqueId() +
      '&dname=' +
      DeviceInfo.getModel()+'&'+key_string;
    console.log(url);
    apihit();
    setStarted('True');
   
    // console.log(url);
    setCount(true);
    function apihit() {
      setCount()
      fetch(url)
        .then(item => item.json())
        .then(Dta => {
          console.log(Dta + '   ' + JSON.stringify(Dta));
          if (Dta.success !== 'true') {
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
          toggleModal()
          console.log(' fetch error ' + error);
        });
    }
  };

  async function Agreed(){
    await AsyncStorage.setItem('superbotmodal','true');
    setConditionModal(false) 
    setAgreeSuperbot('true')   
  }

  const [ph, setPh] = React.useState(false);
  const [ph2, setPh2] = React.useState(false);
  const [tradeCap, setTradeCap] = React.useState(global.tradeCapital);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible);
  };
  
  return showSplash ? (
    
  <ImageBackground
  source={require('../assets/cbg.png')} resizeMode={'stretch'} 
  style={{flex:1,height:'100%',width:'100%',}}>
  <Animatable.Image resizeMode={'stretch'}
   animation="fadeInDownBig"
    source={require('../assets/logo.png')} 
    
    style={{width:200,height:80,alignSelf:'center',marginTop:50}}
    />
    <Animatable.Image animation="rotate" iterationCount={'infinite'}  useNativeDriver easing={'ease-in'} duration={2000} resizeMode={'stretch'}
    source={require('../assets/botz/infi/circle_stone.png')}  
    style={{width:300,height:300,alignSelf:'center',marginTop:'15%'}}
    />
    {/* <Animatable.Image animation="zoomIn" delay={500} resizeMode={'stretch'}
    source={require('../assets/bot2.png')}  
    style={{width:'80%',height:'60%',position:'absolute',alignSelf:'center',top:'37%'}}
    /> */}
    <View style={{marginLeft:'5%',justifyContent:'flex-end',position:'absolute',
  bottom:20}}>
      
    <Animatable.Text
    animation="slideInLeft" delay={400}
    style={{color:'white',fontSize:26,textAlign:'left',fontFamily:'Tomorrow-Bold'}}>MetaFx
    </Animatable.Text>
    <Animatable.Text
    animation="slideInRight" delay={400}
    style={{color:'white',fontSize:15,textAlign:'left',fontFamily:'Tomorrow-Bold'}}>Loading Infinity Bot
    </Animatable.Text>
    </View>
  </ImageBackground>
      
    
    // <View
    //   style={{
    //     flexDirection: 'column',
    //     justifyContent: 'center',
    //     height: '100%',
    //     backgroundColor: colors.background,
    //   }}>
    //   <LottieView
    //     source={require('../assets/loading.json')}
    //     style={{width: 300, height: 200, alignSelf: 'center'}}
    //     autoPlay
    //     loop
    //   />
    // </View>
  ) : (
    <ImageBackground
      source={require('../assets/botz/infi/bg12.png')}//Started=='True'?require('../assets/sky.jpg'): 
      style={{flex: 1, width: '100%', height: '100%'}}
      resizeMode={Started=='True'?'cover':'stretch'}>
      <ScrollView style={[styles1.container]}>
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
                  }}>

                  </View>
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
          <View style={{flexDirection: 'row',flex:1}}>
          <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                paddingHorizontal: 15,
                width: '60%',                
                marginVertical: 15,
              }}>

                <Text
                style={{
                  color: yellow,
                  fontSize: 22,
                  fontFamily: 'LemonMilkProBold'
                  // textAlign: 'left',
                }}>   START THE</Text>
                <Text style={{color: green, fontSize: 28,fontFamily: 'LemonMilkProBold'}}>I    finity BOT</Text>
                <LottieView
        source={require('../assets/botz/game/infibot.json')}
        style={{width: 50, height: 50, alignSelf: 'center',position:'absolute',left:8,top:12,bottom:0,right:0}}
        autoPlay
        loop={true}
      />
                </View>
                <Image source={require('../assets/logofx.png')} style={{width: 140,height:45,marginTop:20}} />
                {/* <LottieView
        source={require('../assets/botz/game/beyond.json')}
        style={{width: 200, height: 200, alignSelf: 'center',position:'absolute',top:10,left:80,right:0,bottom:0}}
        autoPlay
        loop={false}
      /> */}
                 </View>

              <Modal
            statusBarTranslucent={true}
            deviceHeight={1000}
            isVisible={conditionModal}
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
               
                <Text
                  style={{
                    color: colors.binanceylw,
                    fontSize: 20,
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  #Note
                </Text>
                <Text
                  style={{
                    color: colors.selected,
                    fontSize: 14,lineHeight:20,textAlign: 'justify',
                    marginTop:5
                    // fontWeight: 'bold',
                  }}>
                    <Text style={{ color: colors.selected,
                    fontSize: 16,textDecorationLine:'underline'}}>

                    I Agree for the following Conditions{'\n'}{'\n'}
                    </Text>
                  1) I will not disturb or cancel any limit order manually in MT5 APP{'\n'}{'\n'}
                  2) I Confirm that i Have Met the neccessary requirements required to start infinity bot{'\n'}{'\n'}
                  3) I Confirm That I Have Checked This Bot On Demo Accounts Before Going to Live{'\n'}{'\n'}
                  4) I Confirm That i Understand the risk of the bot and after that i will start to live
                </Text>

                <TouchableOpacity
                  style={{marginTop: 10, width: 250, alignSelf: 'center'}}
                  onPress={() => {
                    Agreed()
                                      }}>
                  <LinearGradient
                    colors={[colors.binanceylw,colors.binanceylw2]}
                    style={{
                      width: '100%',
                      borderRadius: 30,
                      paddingHorizontal: 25,
                      paddingVertical: 5,marginTop:30
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 20,
                        textAlign: 'center',
                      }}>
                      I Agree
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

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
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-around',
                paddingHorizontal: 15,
                paddingVertical: 15,
                borderWidth: 0.5,
                borderColor: '#ffe36e',
                borderRadius: 10,
                paddingBottom: 10,
              }}>
              <View style={{justifyContent: 'center'}}>
                <LottieView
                  source={require('../assets/botz.json')}
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                    paddingVertical: 0,
                  }}
                  autoPlay
                  loop
                />
                {/* <View style={{borderRadius:5,padding:10,borderWidth:0.5,borderColor:colors.selected}}> */}
                <LinearGradient
                  colors={[global.appColor1, global.appColor1]}
                  style={{
                    borderRadius: 30,
                    paddingHorizontal: 25,
                    paddingVertical: 10,
                  }}
                  // start={{ x: 0, y: 1 }}
                  // end={{ x: 1, y: 1 }}
                >
                  <Text
                    style={{
                      color: '#4d0300',
                      fontSize: 17,
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}>
                    INFINITY Bot Initiated...
                  </Text>
                </LinearGradient>
                <Text
                  style={{
                    color: 'white',
                    alignSelf: 'center',
                    textAlign: 'center',
                    marginTop: 20,
                    marginBottom: 10,
                    borderRadius: 5,
                    padding: 10,
                    borderWidth: 0.5,
                    borderColor: colors.selected,
                  }}>
                  You will be Redirected to Home 
                </Text>
                {/* </View> */}
                <TouchableOpacity
                  style={{marginTop: 10, width: 250, alignSelf: 'center'}}
                  onPress={() => {
                    toggleModal(), navigation.goBack();
                  }}>
                  <LinearGradient
                    colors={[global.appColor1, global.appColor1]}
                    style={{
                      width: '100%',
                      borderRadius: 30,
                      paddingHorizontal: 25,
                      paddingVertical: 5,
                    }}>
                    {/* <Text
                      style={{
                        color: 'white',
                        fontSize: 20,
                        textAlign: 'center',
                      }}>
                      ({timer})
                    </Text> */}
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Modal
            statusBarTranslucent={true}
            deviceHeight={1000}
            onBackdropPress={() => {
              setIsModalVisibleStop1(false);
            }}
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
                height: 150,
                alignItems: 'center',
                borderWidth: 0.5,
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
                Are you sure ,you want to Edit Settings of INFINITY Bot?
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
            animationInTiming={0}
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
                Are you sure,you want to Stop the INFINITYBot?
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
             flexDirection: 'row',justifyContent: 'center',
            }}>
              
           {Started == 'True'?
           <View style={{position: 'absolute',bottom:170,alignSelf: 'center',}}>

           
       {/* <Image
        source={require('../assets/mining.gif')}
        style={{width: 300, height: 300, }}
        
      />  */}
       <LottieView
    source={require('../assets/botz/game/coinmine.json')}
    style={{width: 350, height: 350, alignSelf: 'center'}}
    autoPlay
    loop
  />
      
      <Text
                style={{
                  color: colors.selected,
                  fontSize: 22,
                  // fontWeight: 'bold',
                  textAlign: 'center',
                }}>Infinitybot is Currently Trading!</Text>
                
      </View>
           :
            null
            }
        
          { Started === 'True'?
            <View
              style={{
                // alignItems: 'center',
                alignItems: 'flex-start',
                width: '100%',
                height: 600,
              }}>
          
                </View>
          :
           <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                justifyContent:'center',
                height: 600,
                left: 0,
                
              }}>
                <Animatable.Image animation="pulse" iterationCount={'infinite'}  useNativeDriver easing={'ease-in'} duration={1000} resizeMode={'stretch'}
    source={require('../assets/botz/infi/stone1.png')}  
    style={{width:100,height:100,alignSelf:'center',position:'absolute',left:0,right:0,bottom:0,top:0}}
    />
    <Animatable.Image animation="pulse" iterationCount={'infinite'}  useNativeDriver easing={'ease-in'} duration={1000} resizeMode={'stretch'}
    source={require('../assets/botz/infi/stone2.png')}  
    style={{width:150,height:150,alignSelf:'flex-end',position:'absolute',left:160,right:0,bottom:0,top:0}}
    />
     <LottieView
    source={require('../assets/botz/game/moon.json')}
    style={{width: 400, height: 400, alignSelf: 'center',position:'absolute',left:0,right:0,top:30,bottom:0}}
    autoPlay
    loop
  />
              <View
                style={{position: 'relative', top: -30, paddingHorizontal: 5,backgroundColor:'transparent'
                ,width:200,borderRadius:20,height:300,}}>
                {/* <LinearGradient
                colors={["transparent","transparent"]}
                  style={{
                    justifyContent: 'center',
                    // backgroundColor:'red',
                    flexDirection: 'row',height:50,
                    borderTopLeftRadius:20,borderTopRightRadius:20
                  }}>
                
                
                    <Text
                      style={{
                        color: colors.selected,
                        fontSize: 17,
                        fontFamily: 'LemonMilkProBold',marginTop:0
                        // alignSelf: 'flex-start',
                      }}>
                      USD Balance
                    </Text>
                   
                  
                </LinearGradient> */}
                <View style={{alignSelf: 'center',marginTop:-25,backgroundColor:'transparent',width:130,height:130,borderRadius:65,alignItems:'center',justifyContent: 'center'}}>

                {/* <LinearGradient colors={["transparent","transparent"]} style={{width:120,height:120,borderRadius:60,alignItems: 'center',justifyContent: 'center',top:10}}>
                <Text
                      style={{
                        color: '#fff',
                        fontSize: 20,
                        fontFamily: 'LemonMilkProBold',
                     
                      }}>{global.livebal} 
                    </Text>
                <Text
                      style={{
                        color: '#fffa05',
                        fontSize: 20,
                        fontFamily: 'LemonMilkProBold',
                      
                      }}>USD
                    </Text>
                </LinearGradient> */}
                </View>
                <View>
                <Text
                  style={{
                    color: colors.selected,
                    fontSize: 15,
                    alignSelf: 'flex-start',
                    // marginLeft: 25,
                    marginTop:-25,
                    paddingVertical: 10,
                    // fontFamily: global.bold,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                  }}>{'Enter Trade Capital'.toUpperCase()}</Text>


                <View style={styles1.boxouter}>
                <TextInput
                                    placeholder={'Amount in USDT'}
                                    keyboardType="number-pad"
                                    maxLength={30}
                    value={tradeCap}

                                     style={{fontSize:15,fontFamily:'DigitalRegular'}}
                                    autoCapitalize="none"
                                    onChangeText={val => {
                                      setTradeCap(val)
                                      }}
                                    width={'100%'}

                                    placeholderTextColor={"#fff"}
                                    selectionColor={colors.binanceylw}
                                    color='#fff'

                                />
                </View>
                
     <Animatable.Image animation="pulse" iterationCount={'infinite'}  useNativeDriver easing={'ease-in'} duration={1000} resizeMode={'stretch'}
    source={require('../assets/botz/infi/stone6.png')}  
    style={{width:150,height:150,alignSelf:'flex-end',position:'absolute',left:-130,right:0,bottom:0,top:-30}}
    />
                </View>
                <Animatable.Image animation="pulse" iterationCount={'infinite'}  useNativeDriver easing={'ease-in'} duration={1000} resizeMode={'stretch'}
    source={require('../assets/botz/infi/stone3.png')}  
    style={{width:150,height:150,alignSelf:'flex-end',position:'absolute',left:170,right:0,bottom:0,top:0}}
    />
    
                <View style={{display:'none'}}>
                <Text
                  style={{
                    color: colors.selected,
                    fontSize: 15,
                    alignSelf: 'center',
                    marginVertical: 10,
                
                    fontFamily: global.bold,
                  }}>
                  Number of Trades
                </Text>

                <View
                  style={[
                    styles1.boxouter,
                    {backgroundColor: colors.selected, marginBottom: 10}
                  ]}>
         
                  <TextInput
                    placeholder={ph2 ? null : 'Eg 2'}
                    onFocus={() => {
                      setPh2(true);
                    }}
                    onBlur={() => {
                      setPh2(false);
                    }}
                    value={'1'}
                    maxLength={30}
                    editable={false}
                    style={
                      Started === 'True'
                        ? styles1.textInput2
                        : styles1.textInput
                    }
                    keyboardType="number-pad"
                    autoCapitalize="none"
                    onChangeText={val => {
                      let new_bal = parseFloat(global.livebal) / 10;//livebal
                      setNumTrades(val);
                      new_bal = Math.floor(new_bal / val);
               
                    }}
                
                    placeholderTextColor="#2b2b2b"
               
                    color={'black'}
                   
                    selectionColor={'black'} 
                  
                  />
                </View>

                <Text
                  style={{
                    color: colors.selected,
                    fontSize: 15,
                    alignSelf: 'flex-start',
                    // marginLeft: 25,
                    paddingVertical: 10,
                    fontFamily: global.bold,
                    alignSelf: 'center',
                  }}>First Order Amount</Text>


                <View style={styles1.boxouter}>
            
            
                  <TextInput
                    placeholder={ph ? null : 'Eg 11 USDT'}
                  
                    onFocus={() => {
                      setPh(true);
                    }}
                    keyboardType="number-pad"
                    maxLength={30}
                    value={globalAcc=='live'?parseFloat(Bal)>500?'2':'1':(parseFloat(Bal)*0.008).toFixed(4).toString()}
                    onBlur={() => {
                      setPh(false);
                    }}
                    editable={globalAcc!=='live'?true:false}
                    style={
                      Started === 'True'
                        ? styles1.textInput2
                        : styles1.textInput
                    }
                    autoCapitalize="none"
                    onChangeText={val => setNum(val)}
              
                    placeholderTextColor="#2b2b2b"
                    
                    selectionColor={'black'} 
             
                    color={'black'}
          
                  />
                </View>
                </View>
{/* till that point issue wala code */}
                <View
                  style={{
                    // display:'none',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 10, width:250,alignSelf: 'center'
                  }}>
               
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      setSelected2(false)
                        setSelected1(!selected1)
                        setSelected3(false)
                        setBtype('0')
                    }}>
                    <ImageBackground
                      source={
                        Btype=='0'
                          ? require('../assets/botz/bot1.png')
                          : require('../assets/botz/bot.png')
                      }
                      style={{
                        width: Btype=='0'? 70 : 60,
                        height:Btype=='0'? 70 : 80,
                        justifyContent: 'center',
                      }}
                      resizeMode={'contain'}>
                      <Text
                        style={{
                          color: Btype=='0'? colors.selected : '#000',
                          textAlign: 'center',
                          fontSize: 12,
                        }}>
                        Low{'\n'}Risk
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      setSelected3(false),
                        setSelected1(false),
                        setSelected2(!selected2),
                        setBtype('1');
                    }}
                    style={{marginHorizontal: 10}}>
                    <ImageBackground
                      source={
                        Btype=='1'?
                            require('../assets/botz/bot1.png')
                          : require('../assets/botz/bot.png')
                      }
                      style={{
                        width: Btype=='1'? 70 : 60,
                        height: Btype=='1'? 70 : 80,
                        justifyContent: 'center',
                      }}
                      resizeMode={'contain'}>
                      <Text
                        style={{
                          color: Btype=='1'? colors.selected : '#000',
                          textAlign: 'center',
                          fontSize: 12,
                        }}>
                        Medium{'\n'}Risk
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      setSelected2(false)
                        setSelected1(false)
                        setSelected3(!selected3)
                        setBtype('2')
                    }}>
                    <ImageBackground
                      source={
                        Btype=='2'
                          ? require('../assets/botz/bot1.png')
                          : require('../assets/botz/bot.png')
                      }
                      style={{
                        width: Btype=='2'? 70 : 60,
                        height:Btype=='2'? 70 : 80,
                        justifyContent: 'center',
                      }}
                      resizeMode={'contain'}>
                      <Text
                        style={{
                          color: Btype=='2'? colors.selected : '#000',
                          textAlign: 'center',
                          fontSize: 12,
                        }}>
                        High{'\n'}Risk
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                  
                </View>
              </View>
            </View>
}


          </View>
         
         
         
         
         
          <View
            style={{
              width: '100%',
              alignItems: 'baseline',
              position: 'relative',
              bottom: '15%',
              paddingHorizontal: '5%',
            }}>
            <Animatable.Image animation="pulse" iterationCount={'infinite'}  useNativeDriver easing={'ease-in'} duration={1000} resizeMode={'stretch'}
    source={require('../assets/botz/infi/stone5.png')}  
    style={{width:150,height:150,alignSelf:'flex-end',position:'absolute',left:0,right:0,bottom:0,top:0}}
    />
     <Animatable.Image animation="pulse" iterationCount={'infinite'}  useNativeDriver easing={'ease-in'} duration={1000} resizeMode={'stretch'}
    source={require('../assets/botz/infi/stone4.png')}  
    style={{width:150,height:150,alignSelf:'flex-end',position:'absolute',left:210,right:0,bottom:0,top:-80}}
    />

  
            <TouchableOpacity
              onPress={() => {
                global.AMT > 0
                  ? navigation.navigate('CoinProfitScreen_superbot', {from: 'superbot'})
                  : ToastAndroid.show(
                      'Please Activate Your Id First',
                      ToastAndroid.SHORT,
                    );
              }}
            style={{alignSelf: 'center'}}
           >
            <LinearGradient  colors={['#f2c90d', '#fd821b', '#f89d06']} 
            style={{ backgroundColor: colors.hgl,
              alignSelf: 'center',
              marginTop: 10,
              paddingHorizontal: 20,
              paddingVertical: 10,

              borderRadius: 10,}}
                  start={{x: 0.2, y: 0.1}} end={{x: 0.9, y: 0.7}}
                    locations={[0,2.5,0.6]}>

              <Text
                style={[
                  styles1.text,
                  {
                    color: colors.text,
                    textAlign: 'center',
                    fontFamily:'LemonMilkProBold',
                    fontSize: 20,
                  },
                ]}>
                PNL Report
              </Text>
                  </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => {
                global.AMT > 0
                  ? navigation.navigate('PoolScreen')
                  : ToastAndroid.show(
                      'Please Activate Your Id First',
                      ToastAndroid.SHORT,
                    );
              }}
            style={{alignSelf: 'center',}}//
           >
            <LinearGradient  colors={['#32a852', '#09de43', '#05fa48']} 
            style={{ backgroundColor: colors.hgl,
              alignSelf: 'center',
              marginTop: 10,
              paddingHorizontal: 20,
              paddingVertical: 10,

              borderRadius: 10,}}
                  start={{x: 0.2, y: 0.1}} end={{x: 0.9, y: 0.7}}
                    locations={[0,2.5,0.6]}>

              <Text
                style={[
                  styles1.text,
                  {
                    color: colors.text,
                    textAlign: 'center',
                    fontFamily:'LemonMilkProBold',
                    fontSize: 20,
                  },
                ]}>
               Join Pool
              </Text>
                  </LinearGradient>
            </TouchableOpacity>
          </View>



          
          <View style={{zIndex: 999, top: -80}}>
            {Started === 'True' ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setIsModalVisibleStop1(true);
                  }}
                  activeOpacity={0.9}
                  style={{paddingHorizontal: '10%'}}>
                  <View
                  
                    style={{
                      width: 130,
                      height: 45,
                      paddingHorizontal: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#686868',
                      borderRadius: 5,
                    }}
                 
                  >
                    <Text
                      style={{
                        color: colors.selected,
                        fontSize: 20,
                        fontFamily: global.bold,
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
                      borderRadius: 5,
                      backgroundColor: '#F23838',
                      // marginTop:20
                    }}
                    // start={{ x: 0, y: 1 }}
                    // end={{ x: 1, y: 1 }}
                  >
                    <Text
                      style={{
                        color: colors.selected,
                        fontSize: 20,
                        fontFamily: global.bold,
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
                          ToastAndroid.LONG
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
                        ToastAndroid.SHORT
                      );
                    }
                  }}
                  activeOpacity={0.9}
                  style={{paddingHorizontal: 0, marginTop: 0}}>
                 <LinearGradient
                 colors={[green2,green3]}
                  start={{x: 0.2, y: 0.1}} end={{x: 0.9, y: 0.7}}
                  // locations={[0,2.5,0.6]}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 230,
                      alignSelf: 'center',
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      borderRadius: 35,flexDirection:'row'
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        marginBottom: 5,
                        fontSize: 20,
                      }}>
                      START{' '}
                    </Text>
                    {BTN ? null : (
                        <ActivityIndicator size={'small'} color="#000" />
                      )}
                  </LinearGradient>
                </TouchableOpacity>
              </>
            )}
          {/* <Text style={{color:colors.losscolor,textAlign: 'center',marginTop:10}}>NOTE : SuperBot works on 1% TP and 2% SL with 0 margin  calls !</Text>
          <Text style={{color:colors.losscolor,textAlign: 'center',marginTop:10}}>To get 0 Losses you should maintain backup fund of 640 * First Order Amount</Text>
          <Text style={{color:colors.losscolor,textAlign: 'center',marginTop:10}}>If you don't have backup balance then loss may occur.</Text> */}
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
  );
};

export default SuperBotScreen;

const styles1 = StyleSheet.create({
  container: {
    flex: 1,    
    // paddingTop: 40,
  },
  risk:{
    alignItems: 'center',justifyContent: 'center',
    
  },
  textInput: {
    alignSelf: 'center',
    // backgroundColor: 'white',
    // borderWidth:0.5,
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'LemonMilkProBold',
    // paddingLeft: 10,
    width: 200,
    height: 45,
  },
  textInput2: {
    // backgroundColor: 'grey',
    // borderWidth:0.5,
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'LemonMilkProBold',
    alignSelf: 'center',
    // paddingLeft: 10,
    width: 200,
    height: 45,
  },
  boxouter: {
    flexDirection: 'row',
    width: 140,
    backgroundColor: 'grey',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
    marginLeft:30
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
