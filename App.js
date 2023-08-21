/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';

import { View, Text, Button, ActivityIndicator, Easing, AppState, Animated, Image, StatusBar, Vibration, BackHandler, SafeAreaView, ImageBackground, ToastAndroid, Dimensions } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme, useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import theme from "./component/theme";
import Modal from 'react-native-modal';
import NetInfo from "@react-native-community/netinfo";
import GlobalFont from 'react-native-global-font'
import * as Animatable from 'react-native-animatable';
import TouchID from 'react-native-touch-id';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './component/context';
import { GlobalState } from './context/GlobalState';
import SplashScreen from './screens/Starting/SplashScreen';
import LottieView from 'lottie-react-native';
import RootStackScreen from './screens/RootStackScreen';
// import {MainLayout}  from './screens';
import AnimationTutorial from './screens/AnimationTutorial';
import { LogBox } from 'react-native';
import { ProgressBar, Provider as PaperProvider, DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme } from 'react-native-paper';
import NewsScreen from "./screens/NewsScreen";
import CopyTrading from './screens/CopyTrading';
import CopyTradingSecond from './screens/CopyTradingSecond';
import CircleScreen from "./screens/CircleScreen";
import TopEarners from "./screens/TopEarners"
import TopLeaders from './screens/TopLeaders'
import MessageScreen from "./screens/MessageScreen";
import MyAchievements from "./screens/MyAchievements";
import DepositScreen from "./screens/DepositScreen";
import WithdrawScreenPool from "./screens/WithdrawScreenPool";
import WithdrawScreenPoolProfit from "./screens/WithdrawScreenPoolProfit";
import TransferScreenPool from "./screens/TransferScreenPool";
import WithdrawScreen from "./screens/WithdrawScreen";
import PoolScreenSecond from "./screens/PoolScreenSecond";
import APIBindingScreen from "./screens/APIBindingScreen";
import RevenueScreen from "./screens/RevenueScreen";
import SuperBotScreen from "./screens/SuperBotScreen";
import CoinProfitScreen_superbot from "./screens/CoinProfitScreen_superbot";
import TransactionScreen from "./screens/TransactionScreen";
import PoolScreen from "./screens/PoolScreen";
import PoolProfitScreen from "./screens/PoolProfitScreen";
import ProfileDetails from "./screens/ProfileDetails";
import OrderHistory from "./screens/OrderHistory";
import InviteScreen from "./screens/InviteScreen";
import TopEarnersSuperbot from './screens/TopEarnersSuperbot';
import RewardDetails from "./screens/RewardDetails";
import CoinProfitScreen from "./screens/CoinProfitScreen";
import PoolDepositScreen from "./screens/PoolDepositScreen";
import MetaWallPost from "./screens/MetaWallPost";
import SignalTrading from "./screens/SignalTrading";
import MetaWall from "./screens/MetaWall";
import TransferAssetsToIncome from "./screens/TransferAssetsToIncome";
import TransferScreenSuper from "./screens/TransferScreenSuper";
import TransferScreen from "./screens/TransferScreen";
import TransferScreenOtherBot from "./screens/TransferScreenOtherBot";
import AssetScreen from "./screens/AssetScreen";
import PoolWallet from "./screens/PoolWallet";
import KYCScreen from "./screens/KYCScreen";
import KYCBefore from "./screens/KYCBefore";
import { MainLayout, QuantitativeScreen } from "./screens"
import WebScreen from "./screens/WebviewsScreen"
import EarningScreen from "./screens/EarningScreen"
import TransferAsset from './screens/transferAsset';
import PNLScreen from "./screens/PNLScreen"
import global from './component/global';
import ViewTicketScreen from './screens/ViewTicketScreen'
import AddTicketScreen from './screens/AddTicketScreen'
import ChangePassScreen from './screens/ChangePassScreen'
import ChangeTxnPassScreen from './screens/ChangeTxnPassScreen'
import ForgotPass from './screens/Starting/ForgotPassScreen';
import TradeReviewScreen from './screens/TradeReviewScreen'
import TradeSettingScreen from './screens/TradeSettingScreen'
import CopiersScreen from './screens/CopiersScreen'
import HisScreen from './screens/HisScreen'
import FullChart from './screens/FullChart'
import PositionMT from './screens/PositionMT'
import VersionControlScreen from './screens/VersionControlScreen'
import SuperBotScreenGold from './screens/SuperBotScreenGold'
import SuperBotScreenSafe from './screens/SuperBotScreenSafe'
import BindingScreen from './screens/BindingScreen'
import InvestScreen from './screens/InvestScreen'
import AllTradeSettings from './screens/AllTradeSettings'
import HedgeBotScreen from './screens/HedgeBotScreen'

// import { createStackNavigator } from "@react-navigation/stack";
// import { NavigationContainer } from '@react-navigation/native';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';

import SignUpScreenInner from './screens/Starting/SignUpScreenInner'
// import SignUpDetailInner from './screens/Starting/SignUpDetailInner'

import CustomDrawer from "./navigation/CustomDrawer";

// import {applyMiddleware,legacy_createStore as createStore} from "redux";
import { Provider } from "react-redux";

// import thunk from "redux-thunk";
// import rootReducer from "./stores/rootReducer"
import SignUpDetailInner from './screens/Starting/SignUpDetailInner';
// import SignUpDetail from './screens/Starting/SignUpDetail';
import codePush from "react-native-code-push";

const Stack = createStackNavigator();

const { width, height } = Dimensions.get('window');
// const store = createStore(
//     rootReducer,
//     applyMiddleware(thunk)
// )
var connection = true;

const ONE_SECOND_IN_MS = 500
const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  2 * ONE_SECOND_IN_MS,
  3 * ONE_SECOND_IN_MS
];

const randomSplash = 


parseInt(Math.random(1,10)*10);
console.log('random no is ' + randomSplash);

// const Drawer = createDrawerNavigator();
const NewStack = createStackNavigator();
LogBox.ignoreAllLogs();

// const CODE_PUSH_OPTIONS={
//   checkFrequency:codePush.CheckFrequency.ON_APP_START
// }
let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };
function App(props) {
  // //console.log('------------------app.js----------------------------')
  const [progress, setProgress] = React.useState(false)
  const { color } = useTheme();
  const [Uid, setUid] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);
  const [isDarkTheme, setIsDarkTheme] = React.useState(true);
  const [Dark, setDark] = React.useState('');
  const [Internet, setInternet] = React.useState(true);
  ////***********state of app for minimize check 7/10/21 */
  const appState = React.useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = React.useState(appState.current);
  const [showModal, setShowModal] = React.useState(false)

  React.useEffect(() => {
    // codePush.sync({
    //   updateDialog: true,
    //   installMode: codePush.InstallMode.IMMEDIATE
    // },
    //   codePushStatusDidChange,
    //   codePushDownloadDidProgress
    // );
  
    setTimeout(async () => {
      setIsLoading(false);
    }, 1500)
    return () => {
      setIsLoading(false);
    }
  }, [])

  function codePushStatusDidChange(syncStatus) {
    // setShowModal(true)
    switch (syncStatus) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log('CHECKING_FOR_UPDATE');
        setProgress(true)
        // this.setState({ syncMessage: "Checking for update." });
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        setShowModal(true)
        console.log('DOWNLOADING_PACKAGE');
        // this.setState({ syncMessage: "Downloading package." });
        break;
      case codePush.SyncStatus.AWAITING_USER_ACTION:
        console.log('AWAITING_USER_ACTION');
        // this.setState({ syncMessage: "Awaiting user action." });
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log('INSTALLING_UPDATE');
        setProgress(false)
        // this.setState({ syncMessage: "Installing update." });
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        setProgress(false)
        // this.setState({ syncMessage: "App up to date.", progress: false });
        break;
      case codePush.SyncStatus.UPDATE_IGNORED:
        console.log('UPDATE_IGNORED');
        setProgress(false)
        // this.setState({ syncMessage: "Update cancelled by user.", progress: false });
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        setProgress(false)
        // this.setState({ syncMessage: "Update installed and will be applied on restart.", progress: false });
        break;
      case codePush.SyncStatus.UNKNOWN_ERROR:
        setProgress(false)
        // this.setState({ syncMessage: "An unknown error occurred.", progress: false });
        break;
    }
  }

  function codePushDownloadDidProgress(progress) {
    // if(showModal){
      // console.log('progress is',progress);
    setProgress(progress);
    // }

  }
  function showProgressView() {
   
  }
  React.useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        global.callStore = true
        ////console.log("Appstate:App has come to the foreground!" + global.dt);
        //can write code for coming back from background

        // if (global.dt === '' || global.dt === 0) {
        //   //callApi()
        // }

      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      //console.log("AppState:", appState.current);
    });

    return () => {
      try {
        subscription.remove();
      }
      catch (e) {

      }
    };
  }, []);


  ///************************end of minimize check */
  const initialLoginState = {
    isLoading: true,
    mobile: null,
    userToken: null,
  };

  const CustomDefaultTheme = {
    ...DefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      appBlue:'#2875CA',
      appBlueMid:'#098ed1',
      appSkyblue:'#16B5FF',
      appGray:'#717588',//'#3f3f3f',
      appLightgray:'#d3d3d3',
      appBlack:'#000',
      appLightestGray:'#f8f8f8',
      borderGray:'#E8e8e8',
      appDarkGray:'#e9e8e6',
      background: '#2a3040',//'#202B3F',
      plc: '#686869',//'#202B3F',
      plcbg: '#1D2538',//'#202B3F',
      text: '#333333',
      prim: '#007076',
      selected: '#fff',
      selectednew: '#4F6C8E',
      seco: '#012f43',
      bg: '#0A0B1D',
      dark_text: '#1f1e1e',//'#d0d0d0',
      vbg: '#959595',//'#3D3F70',
      hgl: '#FCD434',//'#165a05',
      inner_bg: '#f5f5f5f5',
      lgt: '#333333',
      lgt_text: '#8f8f8f',//'#d0d0d0',
      news: '#3D3F70',
      hdl: '#a73e69',
      hdl_new: '#ff0000',
      appGrey: '#96979a',
      profitcolor2: '#19dc51',//'#186DCF',
      profitcolor: '#2cd300',//'#2EBD85',
      losscolor: '#f6465d',
      profitcolor1: '#2EBD85',
      losscolor1: '#f6465d',
      binanceylw: '#2cd300',//'#E6AF17',
      binanceylw2: '#7bd75d',//'#FCD434',
      binanceylw3: '#2cd300',//'#FCD434',
      yellow: '#f3ef00',
      yellow2: '#fdcc03',
      appColor1: '#121c2f',
      appColor2: '#202b3f',
      green1: '#2ebd85'
      , red1: '#f23838',
      greenup: '#1b7705',
      c1: '#29313C',
      c2: '#1F2630',
      c3: '#171E26',

    }
  }
  const CustomDarkTheme = {
    ...DarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...DefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#1F2630',//'#202B3F',
      text: '#333333',
      prim: '#007076',
      selected: '#fff',
      seco: '#012f43',
      bg: '#0A0B1D',
      dark_text: '#d0d0d0',
      vbg: '#959595',
      hgl: '#FCD434',//'#165a05',
      inner_bg: '#f5f5f5f5',
      lgt: '#333333',
      lgt_text: '#d0d0d0',
      news: '#3D3F70',
      hdl: '#D33443',
      hdl_new: '#ff0000',
    }
  }
  var theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;









  const loginReducer = (prevState, action) => {
    //console.log('==========================loadin set')

    switch (action.type) {
      case 'Retrieve_Token': return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
      case 'LOGIN': return {
        ...prevState,
        mobile: action.id,
        userToken: action.token,
        isLoading: false,
      };
      case 'LOGOUT': return {
        ...prevState,
        mobile: null,
        userToken: null,
        isLoading: false,
      };
      case 'REGISTER': return {
        ...prevState,
        mobile: action.id,
        userToken: action.token,
        isLoading: false,
      };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState)

  const authContext = React.useMemo(() => ({
    App_Lock: async (val) => {
      // //console.log(val,"from app js")
      let app_code = val;
      try {
        //console.log("app lock true")
        await AsyncStorage.setItem('app_code', app_code);

      }
      catch (e) {
        //console.log(e);
      }

    },
    Req_pass: async (val) => {
      //console.log(val, "from app js")
      let pass = val;
      try {

        await AsyncStorage.setItem('req_pass', pass);

      }
      catch (e) {
        //console.log(e);
      }

    },

    signIn: async (id, apptype) => {
      // setUserToken('fgd');
      // setIsLoading(false);
      // let EmailId = email;
      let Id = id;

      let userToken;
      userToken = null;

      try {
        userToken = 'dfgdfg';
        await AsyncStorage.setItem('userToken', userToken)
        await AsyncStorage.setItem("main_cur", "USD")

        // await AsyncStorage.setItem('appmodal', 'true')

        await AsyncStorage.setItem('user_id', Id)
        // await AsyncStorage.setItem('startmodal', 'true')
        global.appmodal = true
        global.apptype = apptype
        global.uid = Id
      }
      catch (e) {
        //console.log(e);
      }

      // //console.log('user token:', userToken);
      dispatch({ type: 'LOGIN', id: Id, token: userToken });

    },
    signOut: async () => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        //console.log("sign data cleared")
        await AsyncStorage.removeItem('userToken', userToken)
        AsyncStorage.clear()
        await AsyncStorage.setItem('appmodal', 'false')
        await AsyncStorage.setItem('startmodal', 'false')

        // await AsyncStorage.removeItem('userToken')
      }
      catch (e) {
        //console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      setUserToken('fgd');
      setIsLoading(false);
    },
    toggleTheme: () => {
      setIsDarkTheme(isDarkTheme => !isDarkTheme)

    }
  }), []);
    // const customTextProps = {
    //   style: {
    //     fontFamily: "Arial,Sans-Serif"
    //   }
    // }
    // setCustomText(customTextProps);
    //console.log("customtextprops: " + JSON.stringify(customTextProps))
    React.useEffect(() => {
      let fontName = "aribau-grotesk-regular"
      GlobalFont.applyGlobal(fontName)
      //console.log('font set')
      // getCurrency()
    }, []);
  const getCurrency = async () => {
    console.log('getting currencies ',global.BASE_URL + "css_mob/currency.aspx");
    fetch(global.BASE_URL + "css_mob/currency.aspx")
      .then(item => item.json())
      .then(async Data => {
        let cur_name1 = await AsyncStorage.getItem('cur_name')
        // let mode = await AsyncStorage.getItem('mode');
        // if(mode!=undefined && mode!=null)
        // {

        //   global.AccMode = mode
        // }
        //console.log("my old values : " + cur_name1)
        if (cur_name1 == undefined || cur_name1 == null || cur_name1 == '') {

          //console.log("my rates", Data.conversion_rates.INR)
          global.cur_name = "USD"
          global.cur_value = Data.conversion_rates.USD
          await AsyncStorage.setItem('cur_name', 'USD')
          await AsyncStorage.setItem('cur_val', Data.conversion_rates.USD.toString())
        }
      })


  }
  React.useEffect(() => {
    NetInfo.addEventListener(state => {
      //console.log("Connection type", state.type);
      //console.log("Is connected?", state.isConnected);
      global.internet = state.isConnected;
      setInternet(state.isConnected)
    });
  }, []);

  const imgref = React.useRef();
  const anim = new Animated.Value(0);
  const zoomOut = {
    0: {
      opacity: 1,
      scale: 1,
    },
    0.5: {
      opacity: 1,
      scale: 1.5,
    },
    1: {
      opacity: 0,
      scale: 20,
    },
  };
  const zoomOutr = {
    0: {
      opacity: 0,
      scale: 0,
    },
    0.5: {
      opacity: 0.5,
      scale: 100,
    },
    1: {
      opacity: 1,
      scale: 250,
    },
  };

  const fadeIn = {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  };
  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 3000,
      delay: 6000,
      Easing: Easing,
      useNativeDriver: true
    }).start();

  }, [])

  // React.useEffect(()=>{
  //   imgref.current?.zoomOutr
  //             setTimeout(() =>{
  //                 imgref.current?.zoomOutr
  //             },5500)
  // },[])
  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [-(height * 2), 0]
  });
  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [-(height * 2), 0]
  });





  React.useEffect(() => {
    let isMounted = true
    const get_dta = async () => {
      if (!isMounted) {
        return
      }
      let drk = null;
      let uid = null;
      drk = await AsyncStorage.getItem('DarkMode')
      uid = await AsyncStorage.getItem('user_id')
      setUid(uid)
      //console.log('darkmode check   ', drk)
      if (drk === 'false') {
        setIsDarkTheme(true)
      } else if (drk === null) {
        setIsDarkTheme(false)
      }
      else if (drk === undefined) {
        setIsDarkTheme(false)
      }
      else if (drk == '') {
        setIsDarkTheme(false)
      } else {
        setIsDarkTheme(false)
      }

      // count(uid)
    }

    get_dta()
    getCurrency()
    return () => { isMounted = false }
  }, []);
  React.useEffect(() => {
    //console.log(Uid)
    setTimeout(async () => {
      // setIsLoading(false);      
      let userToken;
      userToken = null;
      let app_code;
      app_code = null;



      try {

        userToken = await AsyncStorage.getItem('userToken')
        app_code = await AsyncStorage.getItem('app_code')

        if (app_code === "true") {
          //console.log("app lock active")
          biometricCheck()
        } else {
          //console.log("app lock inactive")
        }
      }
      catch (e) {
        //console.log(e);
      }
      // //console.log('user token:', userToken);

      dispatch({ type: 'REGISTER', token: userToken });
    });
  }, []);


  const count = (uid) => {
    let url = global.BASE_URL + "css_mob/cnt_not.aspx?uid=" + uid
    //console.log(url)
    fetch(url)
      .then(item => item.json())
      .then(dta => {
        //console.log("welcome to Bot-Z", dta)
        if (parseFloat(dta.cnt) > 0) {
          global.notify_count = dta.cnt;
          global.notify_count1 = dta.cnt1;
          global.total_notify = parseFloat(dta.cnt) + parseFloat(dta.cnt1)

        }
      })
  }



  const [isBio, setIsBio] = React.useState(false);
  const optionalConfigObject = {
    title: 'Check your biometry', // Android
    imageColor: '#000', // Android
    imageErrorColor: '#ff0000', // Android
    sensorDescription: 'Touch the fingerprint sensor', // Android
    sensorErrorDescription: 'Failed', // Android
    cancelText: 'Cancel', // Android
    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.

  };
  // React.useEffect(()=>{

  // })
  const biometricCheck = () => {
    TouchID.isSupported().then((biometryType) => {
      if (biometryType === 'FaceID') {
        //console.log('FaceID is supported.');
      } else {
        //console.log('TouchID is supported.');
        if (isBio) {
          null;
        } else {

          TouchID.authenticate('', optionalConfigObject).then((success) => {
            //console.log('success', success)
            setIsBio(false)
          }).catch((err) => {
            BackHandler.exitApp();

          })
        }
      }
    }).catch((ex) => {
      //console.log('error in touch id: ' + ex)
      ToastAndroid.show('Please activate Fingerprint Lock for your phone!', ToastAndroid.LONG)
    })
    return (

      <View style={{ flex: 1 }}>

      </View>
    );

  }



  if (isLoading || progress ==true) {
    
      return (
        <ImageBackground source={require('./assets/Aeon/splashbg.png')} resizeMode="stretch"
          style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start',
           alignItems: 'center', }}>
         <StatusBar backgroundColor="transparent" translucent barStyle="light-content" />
             <Animatable.Image source={require('./assets/Aeon/logo.png')} resizeMode="stretch" 
             style={{ height: 100, width: 210, top: '40%' }} />
          {/* 
          <View style={{ flexDirection: 'row', top: 70 }}>

          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: '100%', top: 130 }}>
            <Animatable.Image animation="fadeInLeftBig" useNativeDriver={true} iterationCount={1} direction="alternate" delay={900} Easing='ease-in' source={require('./assets/splashnew/bullnew1.png')} resizeMode="stretch" style={{ height: 110, width: 140 }} />
            <Animatable.Image animation={zoomOut} useNativeDriver={true} iterationCount={1} direction="reverse" delay={500} Easing='linear' source={require('./assets/splashnew/vs1.png')} resizeMode="stretch" style={{ height: 110, width: 130, marginLeft: -30 }} />
            <Animatable.Image animation={zoomOutr} useNativeDriver={true} iterationCount={1} direction="alternate" delay={4292} Easing='linear' source={require('./assets/splashnew/vs1.png')} resizeMode="stretch" style={{ height: 110, width: 130, position: 'absolute', marginLeft: 125, zIndex: 99999 }} />
            <Animatable.Image animation="fadeInRightBig" useNativeDriver={true} iterationCount={1} direction="alternate" delay={900} Easing='ease-in' source={require('./assets/splashnew/bearbearred.png')} resizeMode="stretch" style={{ height: 130, width: 90 }} />
          </View> */}


        </ImageBackground>

      );
    

  }


  if(showModal) {
    return (
      <Modal isVisible={showModal} >
        <View style={{flex:1}}>
          <ImageBackground 
          source={require('./assets/Aeon/bigHist.png')}
          resizeMode="stretch"
        style={{ height:400,marginTop:150,width:'100%',  }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' ,color:'#fff',margin:15,marginTop:15}}>UPDATING</Text>
          <View style={{borderRadius: 8, padding: 16 }}>
            {/* <Text style={{ fontSize: 16, fontWeight: 'bold' ,color:'#000'}}>Downloading... Please Wait</Text> */}
            <View style={{ alignItems: 'center' }}>

              <LottieView
                source={require('./assets/downloading.json')}
                style={{
                  width: 600, height: 200,
                  alignSelf: 'center',
                }}
                autoPlay
                loop
              />
               <Text style={{color:'#000',fontWeight:'600',fontSize:16}}>{`${isNaN(Number((progress.receivedBytes)/1048576).toFixed(2))?'-':Number((progress.receivedBytes)/1048576).toFixed(2)}MB/${isNaN(Number((progress.totalBytes)/1048576).toFixed(2))?'-':Number((progress.totalBytes)/1048576).toFixed(2)}MB`}</Text>
              <Text style={{color:'#000',fontWeight:'600',fontSize:16}}>{isNaN(((Number(progress?.receivedBytes)/Number(progress?.totalBytes))*100).toFixed(0))?'-':((Number(progress?.receivedBytes)/Number(progress?.totalBytes))*100).toFixed(0)}%</Text>
              {/* <Text style={{ textAlign: 'center' ,color:'#000'}}> Please don't close the app, else downloading stops!</Text> */}
            </View>
            {/* <TouchableOpacity onPress={()=>{console.log('clicked on minimize'),setShowModal(false)}} style={{backgroundColor:'#E6AF17',padding:5,paddingHorizontal:8}}>
          <Text style={{color:'#fff'}}>Mininmize</Text>
        </TouchableOpacity> */}
          </View>
        </ImageBackground>
        </View>
        
      </Modal>
    )
  }

  return (
    <>
      <StatusBar backgroundColor={'transparent'} translucent={true} barStyle={theme.dark ? "light-content" : 'dark-content'} />
      <PaperProvider theme={theme} >
        <AuthContext.Provider value={authContext}>
        <StatusBar backgroundColor={'transparent'} translucent={true} barStyle={"dark-content"} />
          {/* {showModal ?

            showProgressView()
            : null} */}

          <GlobalState>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
              <NavigationContainer theme={theme}>



                {/* {!Internet ?


            <NetStackScreen />
            : */}

                {isBio ? biometricCheck() :



                  loginState.userToken !== null ?




                    (
                      <Stack.Navigator
                        screenOptions={{
                          headerShown: false,
                          transparentCard: true,
                          transitionConfig: () => ({
                            containerStyleLight: {},
                            containerStyleDark: {},
                          }),
                          containerStyleLight: {},
                          containerStyleDark: {},
                        }}

                        // initialRouteName={'Home'}
                      >
                        {/* <Stack.Screen
                          name="AnimTut"
                          component={AnimationTutorial}
                        /> */}
                        <Stack.Screen
                          name="Home"
                          component={MainLayout}
                        />
                        <Stack.Screen
                          name="NewsScreen"
                          component={NewsScreen}
                        />
                        <Stack.Screen
                          name="MessageScreen"
                          component={MessageScreen}
                        />
                        <Stack.Screen
                          name="MyAchievements"
                          component={MyAchievements}
                        />
                        <Stack.Screen
                          name="DepositScreen"
                          component={DepositScreen}
                        />
                        <Stack.Screen
                          name="Withdraw"
                          component={WithdrawScreen}
                        />
                        <Stack.Screen
                          name="WithdrawPool"
                          component={WithdrawScreenPool}
                        />
                        <Stack.Screen
                          name="WithdrawPoolProfit"
                          component={WithdrawScreenPoolProfit}
                        />
                        <Stack.Screen
                          name="APIBinding"
                          component={APIBindingScreen}
                        />
                        <Stack.Screen
                          name="Revenue"
                          component={RevenueScreen}
                        />
                        <Stack.Screen
                          name="TransactionScreen"
                          component={TransactionScreen}
                        />
                        <Stack.Screen
                          name="QuantitativeScreen"
                          component={QuantitativeScreen}
                        />
                        <Stack.Screen
                          name="ProfileDetails"
                          component={ProfileDetails}
                        />
                        <Stack.Screen
                          name="OrderHistory"
                          component={OrderHistory}
                        />
                        <Stack.Screen
                          name="Invite"
                          component={InviteScreen}
                        />
                        <Stack.Screen
                          name="RewardDetails"
                          component={RewardDetails}
                        />
                        <Stack.Screen
                          name="CoinProfitScreen"
                          component={CoinProfitScreen}
                        />
                        <Stack.Screen
                          name="CoinProfitScreen_superbot"
                          component={CoinProfitScreen_superbot}
                        />
                        <Stack.Screen
                          name="MetaWallPost"
                          component={MetaWallPost}
                        />
                        <Stack.Screen
                          name="MetaWall"
                          component={MetaWall}
                        />
                        <Stack.Screen
                          name="TransferAssetsToIncome"
                          component={TransferAssetsToIncome}
                        />
                        <Stack.Screen
                          name="TransferScreenSuper"
                          component={TransferScreenSuper}
                        />
                        <Stack.Screen
                          name="TransferScreen"
                          component={TransferScreen}
                        />
                        <Stack.Screen
                          name="TransferScreenPool"
                          component={TransferScreenPool}
                        />
                        <Stack.Screen
                          name="TransferScreenOtherBot"
                          component={TransferScreenOtherBot}
                        />
                        <Stack.Screen
                          name="TransferAsset"
                          component={TransferAsset}
                        />
                        <Stack.Screen
                          name="kyc"
                          component={KYCScreen}
                        />
                        <Stack.Screen
                          name="KYCBefore"
                          component={KYCBefore}
                        />
                        <Stack.Screen
                          name="Asset"
                          component={AssetScreen}
                        />
                        <Stack.Screen
                          name="PoolWallet"
                          component={PoolWallet}
                        />
                        <Stack.Screen
                          name="Web"
                          component={WebScreen}
                        />
                        <Stack.Screen
                          name="Earning"
                          component={EarningScreen}
                        />
                        <Stack.Screen
                          name="PNLScreen"
                          component={PNLScreen}
                        />
                        <Stack.Screen
                          name="ViewTicketScreen"
                          component={ViewTicketScreen}
                        />
                        <Stack.Screen
                          name="AddTicketScreen"
                          component={AddTicketScreen}
                        />
                        <Stack.Screen
                          name="ChangePass"
                          component={ChangePassScreen}
                        />
                        <Stack.Screen
                          name="ChangeTxnPass"
                          component={ChangeTxnPassScreen}
                        />
                        <Stack.Screen
                          name="ForgotPass"
                          component={ForgotPass}
                        />
                        <Stack.Screen
                          name="TradeReview"
                          component={TradeReviewScreen}
                        />
                        <Stack.Screen
                          name="TradeSetting"
                          component={TradeSettingScreen}
                        />
                        <Stack.Screen
                          name="CopiersScreen"
                          component={CopiersScreen}
                        />
                        <Stack.Screen
                          name="PoolScreen"
                          component={PoolScreen}
                        />
                        <Stack.Screen
                          name="PoolProfit"
                          component={PoolProfitScreen}
                        />
                        <Stack.Screen
                          name="Hist"
                          component={HisScreen}
                        />
                        <Stack.Screen
                          name="FullChart"
                          component={FullChart}
                        />
                        <Stack.Screen
                          name="Positions"
                          component={PositionMT}
                        />
                        <Stack.Screen
                          name="VersionControl"
                          component={VersionControlScreen}
                        />
                        <Stack.Screen
                          name="SuperBotScreenGold"
                          component={SuperBotScreenGold}
                        />
                        <Stack.Screen
                          name="SuperBotScreenSafe"
                          component={SuperBotScreenSafe}
                        />
                        <Stack.Screen
                          name="BindingScreen"
                          component={BindingScreen}
                        />
                        <Stack.Screen
                          name="Invest"
                          component={InvestScreen}
                        />
                        <Stack.Screen
                          name="SuperBotScreen"
                          component={SuperBotScreen}
                        />
                        <Stack.Screen
                          name="SignalTrading"
                          component={SignalTrading}
                        />
                        <Stack.Screen
                          name="AllTradeSettings"
                          component={AllTradeSettings}
                        />
                        <Stack.Screen
                          name="copytrading"
                          component={CopyTrading}
                        />
                        <Stack.Screen
                          name="copytradingsecond"
                          component={CopyTradingSecond}
                        />
                        <Stack.Screen
                          name="PoolScreenSecond"
                          component={PoolScreenSecond}
                        />
                        <Stack.Screen
                          name="PoolDepositScreen"
                          component={PoolDepositScreen}
                        />
                        <Stack.Screen
                          name="HedgeBot"
                          component={HedgeBotScreen}
                        />
                        <Stack.Screen
                          name="Circle"
                          component={CircleScreen}
                        />
                        <Stack.Screen
                          name="TopEarners"
                          component={TopEarners}
                        />
                        <Stack.Screen
                          name="TopEarnersSuperbot"
                          component={TopEarnersSuperbot}
                        />
                        <Stack.Screen
                          name="TopLeaders"
                          component={TopLeaders}
                        />
                        <Stack.Screen
                          name="SignUpInner"
                          component={SignUpScreenInner}
                        />
                        <Stack.Screen
                          name="SignUpDetailInner"
                          component={SignUpDetailInner}
                        />
                        {/* <Stack.Screen
                          name="SignUpDetail"
                          component={SignUpDetail}
                        /> */}


                      </Stack.Navigator>
                    )
                    :
                    <RootStackScreen />
                }
              </NavigationContainer>
            </SafeAreaView>
          </GlobalState>
        </AuthContext.Provider>
      </PaperProvider  >
    </>
  );



}

const styles = {
  circle: {
    width: height * 2,
    height: height * 2,
    borderRadius: height,
    backgroundColor: '#5d54ab',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flexGrow: 1,
  }
};


export default codePush(codePushOptions)(App);