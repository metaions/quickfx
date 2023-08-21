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
import {Picker} from '@react-native-picker/picker';
import {Appbar, Paragraph} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
import { parse } from 'react-native-svg';
var DeviceInfo = require('react-native-device-info');
var arr = [];
const fontBoldItalic = 'RacingSansOne-Regular'
const fontBold = 'Khand-Bold'
const SuperBotScreenGold = ({navigation, route}) => {
  const{width, height} = Dimensions.get('window')
  const linkTo = useLinkTo();
  const {colors} = useTheme();
  const theme = useTheme();
  const [Data, setData] = React.useState('');
  const [Uid, setUid] = React.useState('');
  const [Started, setStarted] = React.useState('False');
  const [showLevel, setShowLevel] = React.useState(false);
  const [Amt, setAmt] = React.useState('');
  const [Num, setNum] = React.useState('');
  const [Btype, setBtype] = React.useState('gold');
  const {myjson,globalAcc, isMt5, hedge,AgreeSuperbot,setAgreeSuperbot} = React.useContext(jsonContext);
  const [conditionModal,setConditionModal] = React.useState(false)
  const [Bal, setBal] = React.useState(
   global.balance
  );//
    const[selectedRisk,setSelectedRisk] = React.useState('0')
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
    const [runningTrades,setRunningTrades] = React.useState({
      totalRunning:'0',
      running:'0'
    })
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isModalVisible2, setModalVisible2] = React.useState(false);
  const [timer, setTimer] = React.useState(6);
  const sym = route.params?.sym;
  // console.log("symboldis" + sym);
  const [Loading, setLoading] = React.useState(true);

  React.useEffect( () => {
  
      doit()
  }, []);

  async function doit() {
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
      global.BASE_URL + global.apiUsed+'/superbot/auto_settings.aspx?uid=' + global.uid+
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
        // console.log('-----------response of api:::::'+JSON.stringify(data));
        if (data.success === 'true') {
          setNum(data.auto_amt);
          if(isMt5){
            setSelectedRisk(data.risk)
            let val = {...runningTrades}
            val.totalRunning = data.total_trades
            val.running = data.run_trades
            console.log('imp vals ',data.run_trades, data.total_trades);
            setRunningTrades(val)

          }
          setTradeCap(data.capital==0?'500':data.capital);
          if (data.started !== 'True') {
            setTradeCap(global.balance)
          }
          setNumTrades(data.auto_num);
          setStarted(data.started);
          setBtype(data.auto_type)
          setLoading(false)
        }
      }
    )
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
          'SUPER AutoBot has Started. you will be redirected to Home now',
          ToastAndroid.LONG
        );
        navigation.goBack();
        // }            // setSeconds(60);
        // setCount(false)
        // setCanEmail(true)
      }
    }
  });
  // useFocusEffect(
  //   React.useCallback(() => {
  //     // console.log('in use focus of')
  //     if (Started === 'True') {
  //       setAmt(global.autoAmt);
  //       setNum(global.autoFamt);
  //       setTradeCap(global.tradeCapital==0?'500':global.tradeCapital)
  //       setNumTrades(global.autoNum);
  //       if (global.autotype === 'high') {
  //         setSelected1(true);
  //         setSelected2(false);
  //         setSelected3(false);
  //       } else if (global.autotype === 'low') {
  //         setSelected1(false);
  //         setSelected2(true);
  //         setSelected3(false);
  //       } else if (global.autotype === 'custom') {
  //         setSelected3(true);
  //         setSelected2(false);
  //         setSelected1(false);
  //       }
  //     }
  //   }, []),
  // );
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
    // if (!isNaN(parseFloat(tradeCap))) {
    //   if(parseFloat(tradeCap)< (1.2 * parseFloat(global.balance))) {
    //     console.log('val of imp ',tradeCap, (1.2 * parseFloat(global.balance)));
    //   }
    //   else{
    //     ToastAndroid.show('Entered Capital is higher than Account Balance.',ToastAndroid.SHORT)
    //     return
    //   }
    // }
    // else{
    //   ToastAndroid.show('Enter valid Trade Capital !',ToastAndroid.SHORT)
    //   return

    // }


    let token = await AsyncStorage.getItem('token');
    let mynum=globalAcc=='live'?parseFloat(Bal)>500?'2':'1':Num
    setBTN(false);

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
      global.apiUsed+ '/superbot/autobot.aspx?uid=' +
      Uid +
     
      '&num=' +
      numTrades +
      '&capital='+tradeCap+
      '&num1=0' +      
      '&mode=edit' +
      '&bal=' +
      Bal +'&a=a'+
      '&type=' +
      'gold' +
      '&risk=' +
      selectedRisk +
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
          console.log('entering here...................................')
          setBTN(true);
          return;
        }
        
        // myApi();
      })
      .catch(function (error) {
        // toggleModal()
        setLoading(false)
        
        navigation.goBack();
        console.log(' fetch error ' + error);
      });
  };

  const SelectRisk=(level)=>{
    setSelectedRisk(level)
  }
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
      global.BASE_URL + global.apiUsed+'/superbot/stopautobot.aspx?uid=' + Uid+
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
          console.log('entering here...................................')
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
    console.log('see ',tradeCap);
    // if (!isNaN(parseFloat(tradeCap))) {
    //   if(parseFloat(tradeCap)< (1.2 * parseFloat(global.balance))) {
    //     console.log('val of imp ',tradeCap, (1.2 * parseFloat(global.balance)));
    //   }
    //   else{
    //     ToastAndroid.show('Entered Capital is higher than Account Balance.',ToastAndroid.SHORT)
    //     return
    //   }
    // }
    // else{
    //   ToastAndroid.show('Enter valid Trade Capital !',ToastAndroid.SHORT)
    //   return

    // }
    let mynum=!isMt5?globalAcc=='live'?parseFloat(Bal)>500?'2':'1':Num:1
    let token = await AsyncStorage.getItem('token');
    setBTN(false);

    if (parseFloat(Amt) > parseFloat(Bal)) {
      ToastAndroid.show('Not Enough USDT Available', ToastAndroid.LONG);
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
      global.BASE_URL +global.apiUsed
      + '/superbot/autobot.aspx?uid=' +
      Uid +
     
      '&num=' +
      numTrades +
      '&risk='+selectedRisk+
      '&capital='+tradeCap+
      '&type=' +
      
      'gold' +'&account_mode='+globalAcc+
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
            console.log('entering here2..................................')
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
            console.log('entering here3...................................')
            ToastAndroid.show(Dta.msg, ToastAndroid.LONG);
          }

          // myApi();
        })
        .catch(function (error) {
          // toggleModal()
          setLoading(false)
          navigation.goBack()
          console.log(' fetch error ' + error);

          // const timer = setTimeout(() => {
          //   var currentDate = new Date();
          //   var minutesToAdd = 20;
          //   var futureDate = new Date(
          //     currentDate.getTime() - minutesToAdd * 60000,
          //   );
          //   global.autobot_time = futureDate;
          //   setStarted('True');
          //   global.autotype = Btype;
          //   toggleModal();
          //   setCount(true);
          // }, 3000);

          // console.log('.........................');
          // // if (Dta.success === 'true') {
          //   console.log('///////////////////////');
          //   var currentDate = new Date();
          //   var minutesToAdd = 20;
          //   var futureDate = new Date(
          //     currentDate.getTime() - minutesToAdd * 60000,
          //   );
          //   global.autobot_time = futureDate;
          //   setStarted('True');
          //   global.autotype = Btype;
          //   global.status = 'true';
          //   global.Coins = '';
          //   toggleModal();
          //   setCount(true);
          // } else {
          //   setBTN(true);
          //   console.log('entering here3...................................')
          //   ToastAndroid.show(Dta.msg, ToastAndroid.LONG);
          // }

        });
    }
  };

  async function Agreed(){
    // await AsyncStorage.setItem('superbotmodal','true');
    setConditionModal(false) 
    // setAgreeSuperbot('true')   
  }

  const [ph, setPh] = React.useState(false);
  const [ph2, setPh2] = React.useState(false);
  const [tradeCap, setTradeCap] = React.useState(global.tradeCapital==0?'500':global.tradeCapital);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible);
  };
  console.log(tradeCap);
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
  ) : 
<ImageBackground
    source={require('../assets/Aeon/superbot/goldbot_bg.png')}
     style={{flex: 1, width: '100%', height: '100%',}}>
      <View style={[styles1.container,{height: '100%', }]}>
        <ScrollView
          style={{
            flexDirection: 'column',
            // justifyContent: 'center',
            width: '100%',height:height,
          }}>
         
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 15,
                width: '100%',paddingTop:35,paddingBottom:10,
                marginBottom: 10,backgroundColor:'#000',
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
                  Welcome to {global.appName}
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
            </View>
         
          {/* <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                paddingHorizontal: 15,
                width: '100%',                
                marginVertical: 15,
              }}>
                </View> */}

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
                borderColor: colors.profitcolor2,
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
                    fontSize: 14,lineHeight:20,
                    textAlign: 'center',marginTop:5
                    // fontWeight: 'bold',
                  }}>
                  1) Keep high asset balance to keep {`${isMt5?'Super Bot':'Super Bot'}`} running all time{'\n'}{'\n'}
                  
                  2) If Any Trade Is Closed Manually Directly On MT5, Then You Will Have To Pay Extra Fee From Assets of 10$ or 50% of the Profit Amount\n\n3) Do Not Do Any Manual Trading On The Account Binded With Superbot'
                
                 
                </Text>

                <TouchableOpacity
                  style={{marginTop: 10, width: 250, alignSelf: 'center'}}
                  onPress={() => {
                    Agreed()
                                      }}>
                  <LinearGradient
                    colors={[colors.profitcolor2, colors.profitcolor2]}
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
            isVisible={showLevel}
            animationInTiming={100}
            useNativeDriver={true}
            backdropOpacity={0.7}
            animationOutTiming={100}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-around',
                paddingHorizontal: 15,
                paddingVertical: 15,
               backgroundColor:'#000',elevation:5,shadowColor:'#fff',
                borderRadius: 10,
              }}>
              <View style={{justifyContent: 'center'}}>
               
                {/* <Text
                  style={{
                    color: colors.binanceylw,
                    fontSize: 20,
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  #Note
                </Text> */}
                <Text
                  style={{
                    color: colors.binanceylw,
                    fontSize: 18,lineHeight:20,
                    textAlign: 'center',marginTop:5,fontFamily:global.kanitFont
                    // fontWeight: 'bold',
                  }}>
                    Returns Expectation
                 </Text>
                <Text
                  style={{
                    color: colors.selected,
                    fontSize: 14,lineHeight:20,marginTop:20,
                    textAlign: 'left',fontFamily:global.kanitFontR
                  }}>
                    Lvl 1  =  Return Upto 1% {'\t\t\t\t\t\t'}
                    Commission  =  20% {'\n'}
                 </Text>
                <Text
                  style={{
                    color: colors.selected,
                    fontSize: 14,lineHeight:20,marginTop:10,
                    textAlign: 'left',fontFamily:global.kanitFontR
                  }}>
                    Lvl 5  =  Return Upto 2% {'\t\t\t\t\t\t'}
                    Commission  =  30% {'\n'}
                 </Text>
                <Text
                  style={{
                    color: colors.selected,
                    fontSize: 14,lineHeight:20,marginTop:10,
                    textAlign: 'left',fontFamily:global.kanitFontR
                  }}>
                    Lvl 10  =  Return Upto 5% {'\t\t\t\t\t\t'}
                    Commission  =  45% {'\n'}
                 </Text>

                <TouchableOpacity
                  style={{marginTop: 10, width: 250, alignSelf: 'center'}}
                  onPress={() => {
                   setShowLevel(false)
                                      }}>
                  <LinearGradient
                    colors={[global.appColor1, global.appColor1]}
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
                {/* <LottieView source={require('../assets/Aeon/trade.json')} style={{width:'100%',alignSelf:'center',paddingVertical:0}} autoPlay loop  /> */}

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
                    SUPER Bot Initiated...
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
                  You will be Redirected to Home In
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
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 20,
                        textAlign: 'center',
                      }}>
                      ({timer})
                    </Text>
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
                Are you sure ,you want to Edit Settings of SUPER Bot?
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
                Are you sure,you want to Stop the {Btype=='low'?'SUPER BOT V2':Btype=='high'?'SUPER BOT V3':Btype=='gold'?'GOLD BOT':Btype=='safe'?'SAFE BOT':'SUPER BOT'}?
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
             width:'100%',
            }}>
           {Started == 'True'?
           <View style={{position: 'absolute',alignSelf: 'center',alignItems:'center',width:'100%',}}>

           
             <Text
                       style={{
                         color: colors.selected,
                         fontSize: 48,
                        // paddingBottom:5,
                        fontFamily:fontBoldItalic,
                        // fontWeight: 'bold',
                        textAlign: 'center',
                      }}>{Btype=='low'?'SUPER BOT V2':Btype=='high'?'SUPER BOT V3':Btype=='gold'?'GOLD BOT':Btype=='safe'?'SAFE BOT':'SUPER BOT'} IS</Text>
             <Text
                       style={{
                         color: 'green',
                         fontSize: 24,
                         fontFamily:fontBoldItalic,
                        paddingBottom:5,
                         // fontWeight: 'bold',
                         textAlign: 'center',
                       }}>CURRENTLY TRADING!</Text>
       <Image
        source={require('../assets/Aeon/superbot/gold_three.png')}
        style={{width: 200, height: 200, }}
        // resizeMode='stretch'
      /> 
       {/* <Image
        source={require('../assets/Aeon/mining.gif')}
        style={{width: 300, height: 300, }}
        
      />  */}
      <ImageBackground
       source={require('../assets/Aeon/superbot/blue1.png')}
       style={{width: '94%', height: 90,alignItems:'center',justifyContent: 'center',marginTop: 20}}
       resizeMode='stretch'
       > 

      <Text
                style={{
                  color: colors.selected,
                  fontSize: 16,textTransform:'uppercase',marginTop:5,
                  // fontFamily:fontBold,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>Total Active Trades</Text>
      <Text
                style={{
                  color: colors.selected,
                  fontSize: 40,
                  fontFamily:fontBold,
                  // fontWeight: 'bold',
                  textAlign: 'center',
                }}>{runningTrades.totalRunning}</Text>
       </ImageBackground>
      <ImageBackground
       source={require('../assets/Aeon/superbot/green1.png')}
       style={{width: '94%', height: 90,alignItems:'center',justifyContent: 'center',marginTop:20}}
       resizeMode='stretch'
       > 

      <Text
                style={{
                  color: colors.selected,
                  fontSize: 16,textTransform:'uppercase',marginTop:5,
                  // fontFamily:fontBold,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>Active Trades on my Account</Text>
      <Text
                style={{
                  color: colors.selected,
                  fontSize: 40,
                  fontFamily:fontBold,
                  // fontWeight: 'bold',
                  textAlign: 'center',
                }}>{runningTrades.running}</Text>
       </ImageBackground>
 
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
                height: 500,
              }}>
          
                </View>
          :
           <View
              style={{
                alignItems: 'center',
                width: '100%',
                
              }}>
              
              <Text
                style={{
                  color: colors.profitcolor2,
                  fontSize: 26,
                  fontFamily:fontBoldItalic,
                  textAlign: 'center'
                }}>
                {' '}
                START THE</Text>
              <Text
                style={{
                  color: colors.yellow2,
                  fontSize: 46,
                  fontFamily:fontBoldItalic,
                  textAlign: 'center',marginTop:-10
                }}>
                GOLD<Text
                style={{
                  color: colors.yellow2,
                  fontSize: 46,
                  fontFamily:fontBoldItalic,
                  textAlign: 'center',marginTop:-10
                }}>
                BOT</Text></Text>
           
                {/* <Image source={require('../assets/Aeon/hedgebotFX/superbot.png')}
                style={{position: 'relative', top: 0,width:220,height:30}} resizeMode="contain"/> */}

              <View 
                style={{position: 'relative', top: 0,width:'100%',
                }} >
                { Started!=='True'? 
                <ImageBackground
                animation={'slideInUp'}
                duration={1500}
                useNativeDriver={true}
                source={require('../assets/Aeon/superbot/gold_bot.png')}
                resizeMode={'stretch'}
                style={{width: 400, height: 510,marginTop:0,position:'relative'}}
              >
                  <View 
                style={{
                  marginTop:290,
                  flexDirection: 'column',
                  width:'100%',height:110,zIndex:9999,//backgroundColor:'red'
                }}>
               
               
                  <Text
                    style={{
                      color: colors.selected,
                      fontSize: 24,
                      fontFamily: fontBold,
                      alignSelf: 'center',textTransform:'uppercase',
                    }}>
                    USD Balance
                  </Text>
                  <Text
                    style={{
                      color: '#FFE300',
                      fontSize: global.balance.length>3?40:54,
                      fontFamily:fontBold,
                      alignSelf: 'center',marginTop:-10
                    }}>
                    {' '}
                    {global.balance}
                  </Text>
             
              </View>
              </ImageBackground>
              
              :null}
                {/* <ImageBackground source={require('../assets/Aeon/hedgebotFX/form_bg.png')}
                style={{width:'100%',height:140,marginTop:20,display:'none'}} resizeMode="stretch"
                >
                <Text
                  style={{
                    color: colors.selected,
                    fontSize: 15,
                    alignSelf: 'flex-start',
                    display:'none',
                    // marginLeft: 25,
                    paddingVertical: 10,marginTop:10,
                    fontWeight:'500',marginLeft:20,
                    textTransform:'uppercase'
                  }}>Enter Trade Capital</Text>


                <View style={{backgroundColor:Started === 'True'?'grey':'#373b44',width:'90%',height:50,display:'none',
                marginBottom:20,alignSelf:'flex-start',marginLeft:20,
                borderRadius:5}}>
                <Picker
                enabled={Started === 'True'?false:true}
                selectedValue={tradeCap}
                style={{color: '#fff'}}
                dropdownIconColor="#fff"
                onValueChange={(itemValue, itemIndex) =>{
                  console.log('val of itemvl:'+itemValue);
                  
                    setTradeCap(itemValue)
                
                }
                }
                >
                <Picker.Item label="500 - 1000" value="500" />
                <Picker.Item label="1000 - 3000" value="1000" />
                <Picker.Item label="3000 - 10,000" value="3000" />
                <Picker.Item label="10,000 - 30,000" value="10000" />
                <Picker.Item label="30,000+" value="30000" />
              </Picker>
            
               
                </View>
                </ImageBackground> */}
                {/* <View style={{flexDirection:'row',marginTop:30}}>
                  <Text style={{color:'#fff',fontFamily:global.kanitFont,fontSize:18}}>Superbot Level</Text>
                  <TouchableOpacity 
                  onPress={()=>setShowLevel(true)}
                  style={{marginLeft:'2%',marginTop:2}}>
                    <AntDesign name="questioncircle" size={18} color="#fff"/>
                  </TouchableOpacity>
                  </View>
                <View style={{flexDirection:'row',justifyContent: 'space-between',
                width:'80%',alignSelf: 'center',marginTop:10}}>
                  <TouchableOpacity onPress={()=>SelectRisk('0')} disabled={Started == 'True' ?true:false}
                  style={[ styles1.touchsuper,
                  {backgroundColor:selectedRisk=='0'?colors.binanceylw2:'#bbd0f2'}]}>
                    <Text style={styles1.txtsuper}>Lvl 0</Text>
                  </TouchableOpacity>
                  <TouchableOpacity  onPress={()=>SelectRisk('5')} disabled={Started == 'True' ?true:false}
                  style={[ styles1.touchsuper,
                  {backgroundColor:selectedRisk=='5'?colors.binanceylw2:'#bbd0f2'}]}>
                    <Text style={styles1.txtsuper}>Lvl 5</Text>
                  </TouchableOpacity>
                  <TouchableOpacity  onPress={()=>SelectRisk('10')} disabled={Started == 'True' ?true:false}
                  style={[ styles1.touchsuper,
                  {backgroundColor:selectedRisk=='10'?colors.binanceylw2:'#bbd0f2'}]}>
                    <Text style={styles1.txtsuper}>Lvl 10</Text>
                  </TouchableOpacity>
                </View> */}
                
              </View>
            </View>
}


          <View style={{zIndex: 999, width:'100%', alignSelf:'center',marginTop:40
              }}>
            {Started == 'True' ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '96%',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setIsModalVisibleStop1(true);
                  }}
                  activeOpacity={0.9}
                  style={{}}>
                  <ImageBackground
                    source={require('../assets/Aeon/superbot/edit.png')}
                    resizeMode='stretch'
                    style={{
                      width: 180,
                      height: 55,
                      // paddingHorizontal: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      // backgroundColor: '#686868',
                      // borderRadius: 5.
                    }}
                 
                  >
                    <Text
                      style={{
                        color: colors.selected,
                        fontSize: 20,
                        fontFamily: global.bold, marginLeft:10
                      }}>
                      EDIT
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsModalVisibleStop(true);
                  }}
                  activeOpacity={0.9}
                  style={{}}>
                  <ImageBackground
                    source={require('../assets/Aeon/superbot/stop.png')}
                    resizeMode='stretch'
                    style={{
                      width: 180,
                      height: 55,
                      // paddingHorizontal: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      // borderRadius: 5,
                      // backgroundColor: '#F23838',
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
                        marginLeft:10
                      }}>
                      STOP
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            ) : (
              <>
             
                <TouchableOpacity
                disabled={!BTN}
                  onPress={() => {
                    
                    console.log('its button clicked ',Num);
                    
                      if (global.apiUsed=='css_mob'?global.api_key === '':global.api_key_fx=='') {
                        console.log('entering here5...................................')
                        setBTN(true);
                        ToastAndroid.show(
                          'Please Link your API Address first!',
                          ToastAndroid.LONG
                        );
                        
                      } else {
                        console.log('its button clicked2');
                        if (fromEdit ) {//&& parseInt(numTrades) > 0
                          console.log('its button clicked3');
                          EditInvest();
                          
                          
                        } else if (!fromEdit) {// && parseInt(numTrades) > 0
                          console.log('its button clicked4');
                          Invest();
                         
                         
                        } else {
                          console.log('entering here6...................................')
                          setBTN(true);
                          ToastAndroid.show(
                            'Number of Trades should be greater than 0! ',
                            ToastAndroid.SHORT,
                          );
                          
                        }
                      }
                    
                    
                  }}
                  activeOpacity={0.9}
                  style={{alignSelf:'center',alignItems: 'center',width:'65%',position:'absolute',top:-100,zIndex:9999,}}>
                  <View
                    source={require('../assets/Aeon/start_btn.png')}
                    resizeMode={'stretch'}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '96%',
                      alignSelf: 'center',
                      marginLeft: 10,flexDirection:'row',
                     height:55
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontFamily:fontBold,
                        marginBottom: 0,
                        fontSize: 32,
                      }}>
                      START{' '}
                    </Text>
                    {BTN ? null : (
                        <ActivityIndicator size={'small'} color="#000" />
                      )}
                  </View>
                </TouchableOpacity>
              </>
            )}
          {/* <Text style={{color:colors.losscolor,textAlign: 'center',marginTop:10}}>NOTE : SuperBot works on 1% TP and 2% SL with 0 margin  calls !</Text>
          <Text style={{color:colors.losscolor,textAlign: 'center',marginTop:10}}>To get 0 Losses you should maintain backup fund of 640 * First Order Amount</Text>
          <Text style={{color:colors.losscolor,textAlign: 'center',marginTop:10}}>If you don't have backup balance then loss may occur.</Text> */}
          </View>
          {/* <View style={{ alignSelf: 'center', alignItems: 'flex-start', justifyContent: 'center', marginTop: Started=='True'?10:-30}}>
              <Text style={{ color: colors.selected, fontSize: 20, fontFamily: fontBold, textAlign: 'left' }}>Trade Capital</Text>
              <TextInput
                value={tradeCap}
                onChangeText={val => setTradeCap(val)}
                placeholder='Enter Trade Capital'
                placeholderTextColor={colors.plc}
                keyboardType='decimal-pad'
                selectionColor={'#fff'}
                editable={Started !== 'True'}
                style={{
                  backgroundColor: '#000', width: 200, textAlign: 'center',//marginTop:5,
                  fontSize: 22, color: 'white', fontFamily: fontBold, borderRadius: 10
                }}
              />
            </View> */}
          </View>
         

          <View
            style={{
              width: '100%',
              alignItems: 'baseline',
              // position: 'absolute',
              // bottom: '5%',
              marginTop:10,marginBottom:20,
              paddingHorizontal: '5%',
            }}>
            
            <TouchableOpacity
              onPress={() => {
                global.AMT > 0
                  ? navigation.navigate('CoinProfitScreen_superbot', {from: 'superbot'})
                  : ToastAndroid.show(
                      'Please Activate Your Id First',
                      ToastAndroid.SHORT,
                    );
              }}
              style={[
                {
                  // backgroundColor:   '#c61c1c',
                  alignSelf: 'center',
                  marginTop: 10,
                  paddingHorizontal: 15,
                  paddingVertical: 5,

                  borderRadius: 5,
                },
              ]}>
                <ImageBackground source={require('../assets/Aeon/superbot/pnl_btn.png')}
                resizeMode='stretch'
                style={{width:180,height:40,alignItems:'center',justifyContent: 'center'}}
                >

              <Text
                style={[
                  styles1.text,
                  {
                    color: colors.selected,
                    textAlign: 'center',
                    fontWeight: '500',
                    fontSize: 16,
                  },
                ]}>
                PNL REPORT
              </Text>
                </ImageBackground>
            </TouchableOpacity>
          
          </View>
        </ScrollView>
        
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
                source={require('../assets/Aeon/close2.png')}
                style={{width: 40, height: 40}}
              />
            </TouchableOpacity>
            <Image
              source={require('../assets/Aeon/refer.png')}
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
      </View>
    </ImageBackground>
   
};

export default SuperBotScreenGold;

const styles1 = StyleSheet.create({
  container: {
    flex: 1,    
    // paddingTop: 40,
  },
  touchsuper:{
    backgroundColor:'#bbd0f2',
    borderRadius:30,
    width:60,
    height:60
    ,alignItems:'center',
    justifyContent: 'center'
  },
  txtsuper:
  {
    color:'#000',
    fontFamily:global.kanitFont,
    fontSize:18
  },
  txtsuper2:
  {
    color:'#fff',
    fontFamily:global.kanitFontR,
    fontSize:16
  },
  textInput: {
    alignSelf: 'center',
    // backgroundColor: 'white',
    // borderWidth:0.5,
    textAlign: 'center',
    fontSize: 22,
    fontFamily: global.bold,
    // paddingLeft: 10,
    width: 200,
    height: 45,
  },
  textInput2: {
    // backgroundColor: 'grey',
    // borderWidth:0.5,
    textAlign: 'center',
    fontSize: 22,
    fontFamily: global.bold,
    alignSelf: 'center',
    // paddingLeft: 10,
    width: 200,
    height: 45,
  },
  boxouter: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 30,
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
