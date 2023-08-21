/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable css_mob/jsx-no-duplicate-props */
/* eslint-disable css_mob/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import * as React from 'react';
import {
  ThemeProvider,
  useFocusEffect,
  useIsFocused,
  useTheme,
  useLinkTo,
  useNavigation,
} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
// import Aes from 'react-native-aes-crypto'
import {
  View,
  Text,
  Pressable,
  Dimensions,
  TouchableOpacity,
  Alert,
  BackHandler,
  StyleSheet,
  Linking,
  ScrollView,
  RefreshControl,
  Image,
  StatusBar,
  FlatList,    
  TextInput,
  ActivityIndicator, NativeModules, 
  ImageBackground,
  ToastAndroid,KeyboardAvoidingView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import {FAB, Menu, Button, Divider,List} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AuthContext} from '../../component/context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import ResetFn from '../ResetFn';
import Swiper from 'react-native-swiper';
// import TextTicker from 'react-native-text-ticker';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import global from '../../component/global';
import KlineChart2 from '../../component/KlineChart2';
import styles, {wid} from '../../component/styles';
import {indexOf, set} from 'lodash';
import {captureScreen, captureRef} from 'react-native-view-shot';
var RNFS = require('react-native-fs');
import Share from 'react-native-share';
import {jsonContext} from '../../context/GlobalState';
import Modal from 'react-native-modal';
import messaging from '@react-native-firebase/messaging';
import Slider from 'react-native-slider';

// import {
 
//   checkNotificationPermission,
// } from 'react-native-check-notification-permission';
var SendIntentAndroid = require("react-native-send-intent");
var DeviceInfo = require('react-native-device-info');
let arrIntervals = [];
var allcoins = '';
var symbol = '';

var iscalled = false;
var bg = '#111c2e';

var called1 = false;
var Aes = NativeModules.Aes;
var normalbg = '#202b3f';
let interval = '';
let interval2 = '';
var total_count=0
var total_count2=0
var open_count2=0
// global.AMT=1

import btc_img from'../../assets/temp/icon8.png'
import mainbg from'../../assets/temp/assets-box-bg.png'

const HomeScreen = props => {
var started_checking_rates=false;
const navigation = useNavigation()
const [keyboardStatus, setKeyboardStatus] = React.useState(false);
  
  const {colors} = useTheme();
  const AnimationRef = React.useRef(null);
  const [dur,setDur]=React.useState(500);  
  const {signOut} = React.useContext(AuthContext);
  
  const {
    setMyjson,
    callStore,
    setCallStore,
    setGlobalAcc,
    setUID,
    UID,
    earningmodal,
    setEarningmodal,
    setHedge,
    hedge,
    setSafeMode,setOtpMode,setAgreeSuperbot
    ,setAppVer
  } = React.useContext(jsonContext);
  const [sortStatus, setSortStatus] = React.useState(3);
  const [API_KEY, setAPI_KEY] = React.useState(false);
  const [API_K, setAPI_K] = React.useState();
  const [superData, setSuperData] = React.useState([]);
  const [notifPerm, setNotifPerm] = React.useState(true);
  const [signalData, setSignalData] = React.useState(null);
  const [signalData2, setSignalData2] = React.useState(null);
  
  const [signalVis, setSignalVis] = React.useState(false);
  const [MenuVisible, setMenuVisible] = React.useState(false);
  const [showTriggermodal,setShowTriggermodal]=React.useState(false)
  const [triggerData,setTriggerData]=React.useState()
  const [hideRefresh,setHideRefresh] = React.useState(-1)
  const [API, setAPI] = React.useState('');
  const [ShowData, setShowData] = React.useState('both');
  const [errorModal,setErrorModal] = React.useState(null);
  const [Uid, setUid] = React.useState(UID);
    const [listShow,setListShow] = React.useState(false);
    const [signalInterval,setSignalInterval] = React.useState('15');
  const [alert_type, setAlert_type] = React.useState('price');
  const [alert_direction, setAlert_direction] = React.useState('above');
  const [btcptp, setBTCPTP] = React.useState('0');
  const [btcrate, setBTCRATE] = React.useState('0');
  const [btcinr, setBTCINR] = React.useState('0');
  const [hideBlock, setHideBlock] = React.useState(false);
  const [coinStatus, setCoinStatus] = React.useState(false);
  const [CNFRM, setCNFRM] = React.useState(false);
  const [wait, setWait] = React.useState(false);
  const [Mode_all, setMode_all] = React.useState('Change All to Cycle');
  const [bnbptp, setBNBPTP] = React.useState('0');
  const [superClosedDouble, setSuperClosedDouble] = React.useState('false,-1');
  const [superClosed, setSuperClosed] = React.useState('false,-1');
  const [buyClosedDouble, setBuyClosedDouble] = React.useState('false,-1');
  const [buyClosed, setBuyClosed] = React.useState('false,-1');
  const [stopMarginBtnD, setStopMarginBtnD] = React.useState('false,-1');
  const [stopMarginBtn, setStopMarginBtn] = React.useState('false,-1');
  const [killBotBtnD, setKillBotBtnD] = React.useState('false,-1');
  const [killBotBtn, setKillBotBtn] = React.useState('false,-1');
  const [sellClosedDouble, setSellClosedDouble] = React.useState('false,-1');
  const [sellClosed, setSellClosed] = React.useState('false,-1');
  const [bnbrate, setBNBRATE] = React.useState('0');
  const [bnbinr, setBNBINR] = React.useState('0');
  const [ethptp, setETHPTP] = React.useState('0');
  const [imageURI, setImageURI] = React.useState('');
  const [tsl_arr, setTsl_arr] = React.useState([]);
  const [ethrate, setETHRATE] = React.useState('0');
  const [ethinr, setETHINR] = React.useState('0');
  const [seconds, setSeconds] = React.useState(60);
  const [Secret, setSecret] = React.useState('');
  const [appModal,setAppModal] = React.useState(false);
  const [cnt, setCnt] = React.useState('0');
  const [ScrollDta, setScrollDta] = React.useState(global.news);
  const [Search, setSearch] = React.useState(false);
  const [Bal, setBal] = React.useState('');
  const [Loading, setLoading] = React.useState(true);
  const [confirm_add_margin, setConfirm_add_margin] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const refRBSheet1 = React.useRef();
  const modalRef = React.useRef();
  const [Data, setData] = React.useState('');

  const [Cancelling, setCancelling] = React.useState(false);
  const [btn_disable, setBtn_disable] = React.useState(false);
  const [live, setLive] = React.useState(0);
  const [demo, setDemo] = React.useState(0);
  const [btclive, setBtcLive] = React.useState(0);
  const [vItem, setVItem] = React.useState(null);
  const [adjustModel, setAdjustModel] = React.useState(false);

  const [Data10, settop10Data] = React.useState('');

  const [My_Pwd, setMy_Pwd] = React.useState('');

  const [show, setShow] = React.useState(false);
  const [showDep, setShowDep] = React.useState(false);
  const [P_order, setP_order] = React.useState(false);
  const [Click_buy, setClick_buy] = React.useState(true);
  const [total_amount, setTotalAmount] = React.useState('0');
  const [FB_Data, setFB_Data] = React.useState('');
  const [TtlAcc, setTtlAcc] = React.useState('');
  const [Inp_txt, setInp_txt] = React.useState('');
  const [isModal1Visible, setModal1Visible] = React.useState(false);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isModalIpVisible, setModalIpVisible] = React.useState(false);
  const [isModalErrVisible, setModalErrVisible] = React.useState(false);
  const [MarginCallModal, setMarginCallModal] = React.useState(false);
  const [alert_pair, setAlert_pair] = React.useState(null);
  const [alert_side, setAlert_side] = React.useState(null);
  const [Alert_Modal, setAlert_Modal] = React.useState(false);
  const [ModalOTP, setModalOTP] = React.useState(false);
  const [OTP, setOTP] = React.useState('');
  const [TrialVisible, setTrialVisible] = React.useState(false);
  const [Popup_Visible, setPopup_Visible] = React.useState(false);
  const [Error_msg, setError_msg] = React.useState(null);
  const [ShowTPSL, setShowTPSL] = React.useState(null);
  const [TPSL_index, setTPSL_index] = React.useState(null);
  const [TPSL, setTPSL] = React.useState(0);
  const [PoupImg, setPoupImg] = React.useState('');
  const [Verify, setVerify] = React.useState('');
  const [ChangeImg, setChangeImg] = React.useState(true);
  const [Pwd, setPwd] = React.useState('');
  const [randomImage, setRandomImage] = React.useState();
  const [randomImage1, setRandomImage1] = React.useState();
  const [Fest, setFest] = React.useState(false);
  const [Fest_json, setFest_json] = React.useState('');
  const [randomImage2, setRandomImage2] = React.useState();
  const [randomImage3, setRandomImage3] = React.useState();
  const [randomImage4, setRandomImage4] = React.useState();
  const [randomImage5, setRandomImage5] = React.useState();
  const [Fdate, setFdate] = React.useState();
  const [Fmonth, setFmonth] = React.useState();
  const [Fyear, setFyear] = React.useState();
  const [chart, setChart] = React.useState('');
  const [showChart, setShowChart] = React.useState(true);

  
  const [btn_disableS, setBtn_disableS] = React.useState(false);
const [chartIndexS, setChartIndexS] = React.useState(-1);
const [showChartS, setShowChartS] = React.useState(true);

  const [canShowChart, setCanShowChart] = React.useState(false);
  const [chartIndex, setChartIndex] = React.useState(-1);
  const[addMoneyModel,setAddMoneyModal] = React.useState(false)
  const[addAmount,setAddAmount] = React.useState('')
  const[cparamsModal,setCparamsModal] = React.useState(false)
  const[superItem,setSuperItem] = React.useState(null)
  const [lastEarned, setLastEarned] = React.useState([
    {
      startprice: null,
      price: null,
      pair: null,
      img: null,
      profit: null,
      type: null,
      refercode: null,
    },
  ]);

  const [totalCount2,setTotalCount2] = React.useState(0)
  const [openCount2,setOpenCount2] = React.useState(0)
  const [totalCount,setTotalCount] = React.useState(0)
  const [newsModal, setNewsModal] = React.useState(false);
  const [Free_trial, setFree_trial] = React.useState(false);
  const [BinBal, setBinBal] = React.useState(false);
  const [positionPanel, setPositionPanel] = React.useState(true);
  const [OpenPanel, setOpenPanel] = React.useState(false);

  const [isloadedx, setisloadedx] = React.useState(false);
  const [closeClicked, setCloseClicked] = React.useState('false,-1');
  const [closeClicked1, setCloseClicked1] = React.useState('false,-1');
  
  const [Mode, setMode] = React.useState('');
  const [modeName, setModeName] = React.useState(global.AccMode);
  const [realBal, setRealbal] = React.useState(true);
  const [adjMargin, setAdjMargin] = React.useState('');

  const [noMoreHits, setNoMoreHits] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const [Count1, setCount1] = React.useState(0);
  let itsok = false;
    const [ld, setLd] = React.useState(true);
    const [ld2, setLd2] = React.useState(-1);
    const[symSignal,setSymSignal]= React.useState('')
  var date = new Date().getDate(); //To get the Current Date
  var month = new Date().getMonth() + 1; //To get the Current Month
  var year = new Date().getFullYear(); //To get the Current Year
  
  const [refVis, setRefVis] = React.useState(true);
  const [NewAvg, setNewAvg] = React.useState('0');

  const [Input1, setInput1] = React.useState('');
  const [Input2, setInput2] = React.useState('');
  const [Type, setType] = React.useState('cycle');
  const[avgMarginModal, setAvgMarginModal] = React.useState(false)
  const [MP, setMP] = React.useState(false);
  const [Strategy, setStrategy] = React.useState(global.strategy);
  const [CPrice, setLastPrice] = React.useState('0');
  const [NewAvg1, setNewAvg1] = React.useState('0');
  const[totalSuperMargin,setTotalSuperMargin] = React.useState(0)
  const[totalSuperPNL,setTotalSuperPNL] = React.useState(0)
  const [closeDoubleClicked, setCloseDoubleClicked] =
    React.useState('false,-1');
  const green_img = [
    require('../../assets/botz/chart1.png'),
    require('../../assets/botz/chart2.png'),
    require('../../assets/botz/chart3.png'),
  ];

  const red_img = [
    require('../../assets/botz/red1.png'),
    require('../../assets/botz/red2.png'),
    require('../../assets/botz/red3.png'),
  ];

  function decrypt(encryptedData, key) {
    console.log({encryptedData, key});
    return Aes.decrypt(
      encryptedData.cipher,
      key,
      encryptedData.iv,
      'aes-256-cbc',
    );
  };


  React.useEffect(() => {
    let ky= 'pOssg/wN624S5aM2p1v5fI3+Acvk7uaHLBqeQtQ7sdE='//Vdta.secret_key
    let iv=''
    let result = decrypt(ky, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ')
       console.log('key decrepted---------------'+ JSON.stringify(result) +' -----------------------------');
       // setDec(decrypted);
    
    // SendIntentAndroid.isAppInstalled("com.google.android.gm").then(isInstalled => {
    //   console.log('========================gaming installed-----------------------------------------------------'+isInstalled)
    // });
    if (Uid !== '' && Uid !== undefined && Uid !== null) {
      StoreApiNEW(Uid);
      if (global.dt === '') {
        callApi(Uid);
      }
    }
  }, [Uid]);

  React.useEffect(() => {
    if (
      date < parseFloat(global.fest_date) &&
      month === parseFloat(global.fest_month) &&
      year === parseFloat(global.fest_year)
    ) {
      fetch(global.BASE_URL + 'css_mob/' + global.fest_json)
        .then(item => item.json())
        .then(dta => {
          setFest_json(dta);
          toggleModal_Fest();
        });
    }
  }, [Fyear]);

  React.useEffect(() => {
    let totalMargin = 0  
    let totalPL = 0 
    // console.log('vals--------------------'+JSON.stringify(superData));
    if(superData.length>0){
        superData.map((item,index)=>{ 
          if(item.opens!='True'){

            let a=parseFloat(item.margin_buy)+parseFloat(item.margin_sell)
             totalMargin += a
           
            
              
              totalPL += calculate_pnl(item)
            
  
          }
          })
          // console.log(`========pnl2:  ${totalPL}`);
       
        setTotalSuperMargin(totalMargin)
        setTotalSuperPNL(totalPL)
      }
  },[superData])
  ///////////////
  useFocusEffect(
    React.useCallback(() => {
      let isMounted = true
      const get_dta=async () => {
      
        let uid;
        uid = null;
        let pass;
        pass = null;
        let api_key;
        let device;
        let my_pwd = null;
        if(!isMounted) {
          return
        }
        try {
          uid = await AsyncStorage.getItem('user_id');
          my_pwd = await AsyncStorage.getItem('myPwd');
          api_key = await AsyncStorage.getItem('api_key');
          global.askValue = await AsyncStorage.getItem('ask');  
          setMy_Pwd(my_pwd);
          if (global.callStore) {
           
            api_key_api(uid, 'call store');
           
          }
       
          if (uid !== '') {
            setUid(uid);
            global.uid = uid;
            setUID(uid)
          }        

          pass = await AsyncStorage.getItem('req_pass');
          device = await AsyncStorage.getItem('device_db');
        
          if (device === 'true') {
            toggleOTP();
          }
          if (global.status === 'true' || global.status === 'start') {
            
          }
          if (uid !== '') {
            if (Data === '' || Data.length == 0 || Data === '[]') {
             
            } else {
            }
          }
        } catch (e) {
          //console.log(e);
        }
      };
      get_dta()
      return  ()=>{
        isMounted=false
      }
    }, [global.status]),
  );
  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', backAction);
      setChartIndex(null);
     
      console.log('==before timeout==started checking rates-----------'+started_checking_rates)
       setTimeout(() => {
      if (!started_checking_rates)
      {
        console.log('====started checking rates-----------'+started_checking_rates)
        startinterval();
      }
      
       }, 9000);

    
      if (global.dt === '') {
        CallMe();
      }
      ///////////////

      if (!noMoreHits) {
       
        allcoins = global.Coins;

        if (allcoins != '' && allcoins) {
         
          setisloadedx(true);
          
          if(allcoins[0].success&&allcoins[0].success=='false'){
            global.Coins=''
            console.log('==========calling tradeapi in 1=========');
            tradeApi('',1);
          }else{
            console.log('==========calling tradeapi in 2=========');
            tradeApi(allcoins,1);
          }
          
        } else {
          if (Uid !== '') {
            console.log(`main root of issue1`);
              api_key_api(Uid, 'use focus effect');
         

          } else {
            console.log(`main root of issue2`);
            CallMe();
          }
       
          setLd(false);

        
        }

        return () => {
          console.log('-------------clearing intervals')
          clearInterval(interval);
          clearInterval(interval2);
          // arrIntervals.map((a) => {
          //   console.log(a)
          //   clearInterval(a);
          //   arrIntervals = [];
          // })
          setShowChart(true);
          BackHandler.removeEventListener('hardwareBackPress', backAction);
        
        };
      }
      
    }, []),
  );



  const backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to exit?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };  


  React.useEffect(() => {      

    async function appmodal(){
      let apm=await AsyncStorage.getItem('appmodal')
      let superbotModal = await AsyncStorage.getItem('superbotmodal');
      var token = await AsyncStorage.getItem('token'); 
      global.token=token 
      if(superbotModal!=undefined && superbotModal!=null){
        setAgreeSuperbot(superbotModal)
      }
      if(apm=='true'){
        setAppModal(true)        
      }
    }
    appmodal()  
  }, []);

  React.useEffect(() => {
    global.closesocket = 1;
    global.myprice = 0.0;
    global.mypcp = 0.0;

    if (Count1) {
      if (seconds > 0) {
        setTimeout(() => setSeconds(seconds - 1), 1000);
      } else {
        setSeconds(5);
        setCount(false);
      }
    }
  },[]);
  React.useEffect(() => {
  
    store_Call;
  }, [callStore]);



  React.useEffect(() => {
    let isMounted=true
    const get_dta=async () => {
     
      let uid;
      let api_key;
      let my_pwd = null;
      if(!isMounted){
        return
      }
      try {
        uid = await AsyncStorage.getItem('user_id');
        my_pwd = await AsyncStorage.getItem('myPwd');
        api_key = await AsyncStorage.getItem('api_key');
        global.askValue = await AsyncStorage.getItem('ask');  
       
        setMy_Pwd(my_pwd);

        setAPI_K(api_key);
        
        if (
          api_key != '' ||
          (api_key != null && secret_key != '') ||
          secret_key != null
        ) {
          setAPI_KEY(true);
          let url = '';
          global.closesocket = 1;

       
          url =
            global.BASE_URL +
            'css_mob/get_bin_bal.aspx?asset=USDT&api_key=' +
            global.api_key +
            '&api_secret=' +
            global.api_secret +
            '&uid=' +
            uid+
            '&token=' +
            global.token+
            '&device=' +
            DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel();;
            //consolefn(url,'start',new Date().toLocaleTimeString());
          fetch(url)
            .then(item => item.json())
            .then(dta => {
              //consolefn(url,'end',new Date().toLocaleTimeString());

              setBal(Math.round(dta.balance, 4));
             
              global.demobal = parseFloat(dta.dbalance).toFixed(2); //Math.round(dta.dbalance, 4)
              global.livebal = parseFloat(dta.balance).toFixed(2); //Math.round(dta.balance, 4)
              setLoading(false)
            }).catch(e=>{
              //console.log(e)
            })
        } else {
          setAPI_KEY(false);
        }
      } catch (e) {
        //console.log(e);
      }
    };
    get_dta()
    return  ()=>{
      isMounted=false
    }
  }, [BinBal]);

  React.useEffect(() => {
   
    setCanShowChart(true);
 
    checkNotifPerm();
    checkPermission();

   
  }, []);

  //for close position:
  React.useEffect(() => {
    if (closeClicked.split(',')[0] == 'true') {
      ToastAndroid.show(
        'Please tap once more to Close Position..',
        ToastAndroid.SHORT,
      );
      setTimeout(() => {
        setCloseClicked('false,-1');
      }, 5000);
    }
  }, [closeClicked]);
  React.useEffect(() => {
    if (superClosed.split(',')[0] == 'true') {
      ToastAndroid.show(
        'Please tap once more to Close Position..',
        ToastAndroid.SHORT,
      );
      setTimeout(() => {
        setSuperClosed('false,-1');
      }, 5000);
    }
  }, [superClosed]);
  React.useEffect(() => {
    if (buyClosed.split(',')[0] == 'true') {
      ToastAndroid.show(
        'Please tap once more to Close Position..',
        ToastAndroid.SHORT,
      );
      setTimeout(() => {
        setBuyClosed('false,-1');
      }, 5000);
    }
  }, [buyClosed]);
  React.useEffect(() => {
    if (sellClosed.split(',')[0] == 'true') {
      ToastAndroid.show(
        'Please tap once more to Close Position..',
        ToastAndroid.SHORT,
      );
      setTimeout(() => {
        setSellClosed('false,-1');
      }, 5000);
    }
  }, [sellClosed]);
  
  React.useEffect(() => {
    if (stopMarginBtn.split(',')[0] == 'true') {
      ToastAndroid.show(
        'Please tap once more to stop margin..',
        ToastAndroid.SHORT,
      );
      setTimeout(() => {
        setStopMarginBtn('false,-1');
      }, 5000);
    }
  }, [stopMarginBtn]);
  React.useEffect(() => {
    if (killBotBtn.split(',')[0] == 'true') {
      ToastAndroid.show(
        'Please tap once more to kill bot..',
        ToastAndroid.SHORT,
      );
      setTimeout(() => {
        setKillBotBtn('false,-1');
      }, 5000);
    }
  }, [killBotBtn]);


  React.useEffect(() => {
    if (closeClicked1.split(',')[0] == 'true') {
      ToastAndroid.show(
        'Please tap once more to Cancel Order..',
        ToastAndroid.SHORT,
      );
      setTimeout(() => {
        setCloseClicked1('false,-1');
      }, 5000);
    }
  }, [closeClicked1]);

  
  React.useEffect(() => {}, [FB_Data]);

  React.useEffect(() => {
    if (ChangeImg) {
      setRandomImage(green_img[Math.floor(Math.random() * green_img.length)]);
      setRandomImage1(green_img[Math.floor(Math.random() * green_img.length)]);
      setRandomImage2(green_img[Math.floor(Math.random() * green_img.length)]);
      setRandomImage3(red_img[Math.floor(Math.random() * red_img.length)]);
      setRandomImage4(red_img[Math.floor(Math.random() * red_img.length)]);
      setRandomImage5(red_img[Math.floor(Math.random() * red_img.length)]);
      setChangeImg(true);
    }
  }, []);

  React.useEffect(() => {
    let a = true;    
    if (global.depShow!=null)
    {
    if (global.depShow.toLowerCase() == 'true' && global.demo.toLowerCase() !== 'true'&& global.dtxt!=null) {
    
      setShowDep(true);
     
    }
  }
    return () => {
     
      a = false;
    };
  }, []);



  const StoreApiNEW = uid => {
    try {
      let newDate = new Date();
      let diff = getDifferenceInMinutes(global.prevtime_market, newDate);

      if (diff < 0) {
        if (
          global.Store !== '' &&
          global.Store !== undefined &&
          global.Store !== null
        ) {
          callApiTOP10(global.Store);
          return;
         
        }
      }
    } catch (e) {}
    //
    //pav
  };

  function global_store(hedgeval, from) {   
    if (global.Store != null && global.Store != undefined) {
      return;
    }
    global.status = 'false';

    global.prevtime_market = new Date();

    var finaljson = '';
    setData('');

    let url1;
    if (hedgeval == 'True') {
      url1 =
        global.BASE_URL + 'css_mob/hedge/store_hedge.aspx?uid=' + global.uid+
        '&token=' +
        global.token+
        '&device=' +
        DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel();;
    } else {
      url1 = global.BASE_URL + 'css_mob/store.aspx?uid=' + global.uid+
      '&token=' +
      global.token+
      '&device=' +
      DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel();;
    }
    //consolefn(url1,'start',new Date().toLocaleTimeString());
    fetch(url1)
      .then(item => item.json())
      .then(dta => {
        //consolefn(url1,'end',new Date().toLocaleTimeString());
        setCallStore(false);
        global.Store = dta;
        callApiTOP10(dta);
      }).catch(e=>{
     
      })
  }

  const takeScreenShot = () => {
   
    captureRef(modalRef).then(
     
      uri => {
        RNFS.readFile(uri, 'base64').then(res => {
          let urlString = 'data:image/jpeg;base64,' + res;
          let options = {
          
            url: urlString,
            type: 'image/jpeg',
          };
          Share.open(options)
            .then(res => {
           
            })
            .catch(err => {
              err 
            });
        });
      },
      error => console.error('Oops, Something Went Wrong', error),
    );
  };

  const callApiTOP10 = Coins => {
  
    setMyjson(null);
    var finaljson = '';
    let dta = '';
    var s1 = '';

    let url2 = `${global.BASE_URL}css_mob/price.aspx?pair=`;
    consolefn(url2,'callapitop10',new Date().toLocaleTimeString());
    fetch(url2)
      .then(item => item.json())
      .then(newdta1 => {
        // console.log('coins:::'+JSON.stringify(newdta1));
        newdta1.map(newdta => {
        try
        {
          // console.log('coins:::'+JSON.stringify(Coins));
          Coins.map(dta => {
            var mode = dta.mode;
            var lastprice = '';
            var pcp = '';
            var symbol = newdta.sym;
            var weightedaverage = '';
            var prev_close_price = '';
            var high_price = '';
            var low_price = '';
            var ask_price = '';

            var bid_price = '';

            lastprice = newdta.price;
            pcp = newdta.pchange;

            weightedaverage = 0;
            prev_close_price = 0;
            high_price = 0;
            low_price = 0;
            ask_price = 0;
            bid_price = 0;

            pcp = parseFloat(pcp).toFixed(2);

            if (symbol === dta.sym) {
             
              var json =
                "{'avg':'" +
                dta.avgprice +
                "','bst':'" +
                dta.bstatus +
                "','isfav':'" +
                dta.isfav +
                "','bst1':'" +
                dta.bstatus1 +
                "','side':'" +
                dta.side +
                "','start_bot_variation':'" +
                dta.start_bot_variation +
                "','img':'" +
                dta.img +
                "','last_price':'" +
                lastprice +
                "','pcp':'" +
                pcp +
                "','qty':'" +
                dta.qty +
                "','qty1':'" +
                dta.qty1 +
                "','sym':'" +
                symbol +
                "','st':'" +
                dta.st +
                "','tp':'" +
                dta.tp +
                "','usdt':'" +
                dta.usdt +
                "','strtamt':'" +
                dta.startamt +
                "','trd_dt':'" +
                dta.tradedt +
                "','wta':'" +
                weightedaverage +
                "','opens':'" +
                dta.opens +
                "','x_prev_cprice':'" +
                prev_close_price +
                "','x_hprice':'" +
                high_price +
                "','x_lprice':'" +
                low_price +
                "','x_askprice':'" +
                ask_price +
                "','isopen':'" +
                dta.isopen +
                "','x_bidprice':'" +
                bid_price +
                "','myusdt':'" +
                dta.myusdt +
                "','buy':'" +
                dta.buy +
                "','sell':'" +
                dta.sell +
                "','isbtc':'" +
                dta.isbtc +
                "','iscopy':'" +
                dta.iscopytrade
                +
                "','vol':'" +
                dta.vol
                +
                "','first_buy_in_amount':'" +
                dta.first_buy_in_amount +
                "'}";
              if (finaljson == '') {
                finaljson = json;
              } else {
                finaljson = finaljson + ',' + json;
              }
            }
          });
        } 
        catch (err)
        {
          
        } 
          
        });

        finaljson = finaljson.replace(/\'/g, '"');
        finaljson = '[' + finaljson + ']';
      
        settop10Data(JSON.parse(finaljson));
        global.top10json = finaljson;
        // consolefn('for top10 ',JSON.stringify(finaljson));
        setMyjson(finaljson);
      
      }).catch(e=>{
        
      })
      .then(() => {        
        setRefreshing(false);
      });
  };




const roe_cal=(item)=>{
return( 
  (item.side.toLowerCase() == 'buy'
? (
    (((parseFloat(item.last_price) -
      parseFloat(item.avg)) *
      parseFloat(item.qty) +
      parseFloat(item.usdt)) /
      parseFloat(item.usdt) -
      1) *
    100 *
    parseFloat(item.leverage)
  ).toFixed(2)
: (
    (((parseFloat(item.last_price) -
      parseFloat(item.avg)) *
      parseFloat(item.qty) +
      parseFloat(item.usdt)) /
      parseFloat(item.usdt) -
      1) *
    100 *
    parseFloat(item.leverage)
  ).toFixed(2) * -1))
}

const roe_cal_used=(item,side)=>{
 
  return(    
  side == 'long'||side == 'buy'
      ? 
     parseFloat(item.avg_buy)==0?0:(((parseFloat(item.price)-parseFloat(item.avg_buy))/parseFloat(item.avg_buy))*100*parseFloat(item.lev)).toFixed(2)
    
      :
      parseFloat(item.avg_sell)==0?0:((((parseFloat(item.price)-parseFloat(item.avg_sell))/parseFloat(item.avg_sell))*100*parseFloat(item.lev))*-1).toFixed(2)

                                               
      
)
    }


  //
  async function CallMe() {
    var uid = await AsyncStorage.getItem('user_id');
    global.uid = uid;
    var pwd = await AsyncStorage.getItem('myPwd');        
    var txn_pwd = await AsyncStorage.getItem('txn_pwd');    
    global.askValue = await AsyncStorage.getItem('ask');      
    setPwd(pwd);
    if (uid !== '') {
      setUid(uid);
      setUID(uid)
      global.uid = uid;
      global.PWD = pwd;
      global.txnPassword=txn_pwd;
   
    }
    api_key_api(uid, 'use focus effect');
  
  }

  
  function startinterval() {    
    clearInterval(interval)    
    clearInterval(interval2)   
    // arrIntervals.map((a) => {
    //   console.log(a)
    //   clearInterval(a);
    //   // arrIntervals = [];
    // })
    // console.log('===============startinterval cleared both'); 
    interval=setInterval(() => {
      // console.log('===============startinterval inside interval '+JSON.stringify(allcoins)+'  '+global.symname+new Date().toLocaleTimeString()); 
   
      if (allcoins != '') {
        if (global.symname != null && global.symname) {
        } else {
          
       

          return;
        }        
        // console.log('======hit trade api allcoins 2===========================');
        tradeApi(allcoins,2);
      }
    },5000);    

    interval2=setInterval(() => {
       try{         
         if (allcoins != '') {           
           if (global.symname != null && global.symname) {
          
          

        } else {


          
          if (!iscalled && global.api_key_data.hedge&&global.api_key_data.hedge!=null) {


            StoreApi(
              global.uid,
              '',
              'if Not Called',
              global.api_key_data.hedge,
            );
            iscalled = true;
          }

          return;
        }

      }
    }catch(e){
      //console.log(e)
    }
    }, 2000);


  }
 

  async function checkNotifPerm() {
    const allowed = true//await checkNotificationPermission();

    setNotifPerm(allowed);
  }

  async function checkPermission() {
    try{

      const enabled = await messaging().hasPermission();
      if (enabled) {
        const device = await messaging().getToken();
       
      } else {
      
        try {
          await messaging().requestPermission();
        } catch (error) {
          Alert.alert(
            'Unable to access the Notification permission. Please enable the Notification Permission from the settings',
          );
        }
      }
    }
    catch (error){
      console.log('exception is: '+error);
    }
  }
  const store_Call = React.useMemo(() => {
    if (callStore) {
     
      global.Store = null;
      try{
        global_store(global.api_key_data.hedge, 'from callstore');
      }catch(e){
       
      }
    }
  }, [callStore]);

  function adjustMargin() {
    let url;
    if (hedge) {
      url =
        global.BASE_URL +
        'css_mob/hedge/modify_margin.aspx?&uid=' +
        global.uid +
        '&api_key=' +
        global.api_key +
        '&api_secret=' +
        global.api_secret +
        '&quantity=' +
        adjMargin +
        '&pair=' +
        vItem.sym +
        '&side=' +
        vItem.side +
        '&tp=add'+
        '&token=' +
        global.token+
        '&device=' +
        DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel();;
    } else {
      url =
        global.BASE_URL +
        'css_mob/modify_margin.aspx?&uid=' +
        global.uid +
        '&api_key=' +
        global.api_key +
        '&api_secret=' +
        global.api_secret +
        '&quantity=' +
        adjMargin +
        '&pair=' +
        vItem.sym +
        '&tp=add'+
        '&token=' +
        global.token+
        '&device=' +
        DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel();
    }
    //consolefn(url,'start',new Date().toLocaleTimeString());
    global.status = 'true';
    fetch(url)
      .then(item => item.json())
      .then(dta => {
        //consolefn(url,'end',new Date().toLocaleTimeString());
        if (!dta.status) {
          ToastAndroid.show(dta.message, ToastAndroid.LONG);
          
        }
        setCNFRM(false);        
        refRBSheet1.current.close();
        global.status = 'true';
        global.Coins = '';
        global.symname = '';
        setCallStore(true);
        iscalled = false;
        setConfirm_add_margin(false);
        setTimeout(function () {
          try{
            StoreApi(Uid, 'run', 'api_key_function4', global.api_key_data&&global.api_key_data.hedge);
          }catch(e){
           
          }
        }, 2000);

       
      })
      .catch(ex => {
        ToastAndroid.show(
          'Something went wrong while adding margin..',
          ToastAndroid.SHORT,
        );
      });
  }

  function update_bot_status(status, sym, side) {

    let url;
    if (hedge == 'true' || hedge) {
      url =
        global.BASE_URL +
        'css_mob/hedge/change_bot_status.aspx?pair=' +
        sym +
        '&uid=' +
        Uid +
        '&api_key=' +
        global.api_key +
        '&api_secret=' +
        global.api_secret +
        '&status=' +
        status +
        '&side=' +
        side+
        '&token=' +
        global.token+
        '&device=' +
        DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel();;
    } else {
      url =
        global.BASE_URL +
        'css_mob/change_bot_status.aspx?pair=' +
        sym +
        '&uid=' +
        Uid +
        '&api_key=' +
        global.api_key +
        '&api_secret=' +
        global.api_secret +
        '&status=' +
        status+
        '&token=' +
        global.token+
        '&device=' +
        DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel();;
    }

    //consolefn(url,'start',new Date().toLocaleTimeString());
    global.status = 'true';
    fetch(url)
      .then(item => item.json())
      .then(dta => {
        //consolefn(url,'end',new Date().toLocaleTimeString());
        setCloseClicked1('false,-1')
        if (dta.status == true) {
          ToastAndroid.show(dta.message, ToastAndroid.SHORT);
          global.status = 'true';
          setTimeout(() => {
            setCancelling(false);
            global.Coins = '';
            global.symname = '';
            var currentDate = new Date();
            var minutesToAdd = 20;
            var futureDate = new Date(
              currentDate.getTime() - minutesToAdd * 60000,
            );
            global.prevtime1 = futureDate;
            global.prevtime = futureDate;
            global.prevtime2 = futureDate;
            global.prevtime3 = futureDate;
            global.prevtime_market = futureDate;
            setCallStore(true);
            iscalled = false;
          }, 5000);
        } else {
          ToastAndroid.show(dta.message, ToastAndroid.SHORT);
        }
      });
  }
  function update_bot_status_super(status, sym, side) {
    
    let url;
   
      url =
      global.BASE_URL +
      'css_mob/superbot/change_bot_status.aspx?pair=' +
      sym +
      '&uid=' +
      Uid +
      '&api_key=' +
      global.api_key +
      '&api_secret=' +
      global.api_secret +
    
      '&side='+'&status='+status +
      '&token=' +
      global.token+
      '&device=' +
      DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel();
      ;
      //consolefn(url,'start',new Date().toLocaleTimeString());
    global.status = 'true';
    fetch(url)
      .then(item => item.json())
      .then(dta => {
        //consolefn(url,'end',new Date().toLocaleTimeString());
        setSuperClosed('false,-1')
        if (dta.status == true) {
          ToastAndroid.show(dta.message, ToastAndroid.SHORT);
          global.status = 'true';
          setTimeout(() => {
            setCancelling(false);
           
            global.Coins = '';
            global.symname = '';
            var currentDate = new Date();
            var minutesToAdd = 20;
            var futureDate = new Date(
              currentDate.getTime() - minutesToAdd * 60000,
            );
            global.prevtime1 = futureDate;
            global.prevtime = futureDate;
            global.prevtime2 = futureDate;
            global.prevtime3 = futureDate;
            global.prevtime_market = futureDate;
            setCallStore(true);
            iscalled = false;
      
           setCloseDoubleClicked('false,-1');
           onRefresh()
        
          }, 5000);
        } else {
          ToastAndroid.show(dta.message, ToastAndroid.SHORT);
        }
      }).catch((err) => {
        
      });
  }
  const StoreApi = (uid, run, start, hedgeval) => {
 
    if (global.Coins != null && global.Coins != '') {
      if (global.Coins != undefined) {
        if (global.Coins[0].success === 'false') {
          setNoMoreHits(true);
          setData('');
          setCnt(0);
        } else {
          setNoMoreHits(false);
         
          if (!isloadedx) {
          }
          console.log('======hit trade api allcoins 3===========================');
          tradeApi(global.Coins,3);
          return;
        }
      }
    }

    //remove check 7/10/21
    if (run == '') {
      if (uid == undefined || uid == null || uid == '') {
        uid = global.uid;
      }
      if (uid == undefined || uid == null || uid == '') {
        return;
      }
      try {
     
        let newDate = new Date();
        let diff = getDifferenceInMinutes(global.prevtime1, newDate);
       

        if (diff < 20) {
          setLoading(false);
       
          return;
        }
      } catch (e) {}
    }
    global.status = 'false';
    
    global.prevtime1 = new Date();
 
    let url1;

   

    if (global.hedge_updated == '') {
      api_key_api(Uid, 'hedge not updated');
    }
    global.Coins = '';
    global.symname = '';        
    getsuperbotData()   
    if (hedgeval == 'True') {
      url1 =
        global.BASE_URL + 'css_mob/hedge/store_hedge.aspx?uid=' + global.uid + '&st=a'+
        '&token=' +
        global.token+
        '&device=' +
        DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel();;
    } else {
      url1 = global.BASE_URL + 'css_mob/store.aspx?uid=' + global.uid + '&st=a'+
      '&token=' +
      global.token+
      '&device=' +
      DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel();;
    }
    consolefn(url1,'start',new Date().toLocaleTimeString());
    setCancelling(false);
 
    fetch(url1)
      .then(item => item.json())
      .then(dta => {
        //consolefn(url1,'end',new Date().toLocaleTimeString());
        global.callStore = false;

        setCnt(dta.length);
        if(dta.success !='false'){

          allcoins = dta;
           
          global.Coins = dta;
        }
        else{
          console.log('==========global.coins');
        }


        
        if (dta != undefined) {
        

try{
   
          if (dta[0].success!=null) {
            setLoading(false);
            setLd(false)
            setNoMoreHits(true);
            setData('');
            setCnt(0);
           
          } else {
            setNoMoreHits(false);
           
            global.symname=''
            console.log('======hit trade api allcoins 4===========================');
            tradeApi(dta,4);
          }



        }
        catch (e) {
          console.log('======hit trade api allcoins 5===========================');
          tradeApi(dta,5);
          setLd(false);
          setLoading(false);
        }
        }
       
        setLd(false);
        setLoading(false);
      }).catch(ex => {
        //console.log('EXCEPTION'+ex)
        setLd(false);
        setLoading(false);
     
      });
  };

  const getsuperbotData=()=>{
    setSuperData([])
    let url=global.BASE_URL +'css_mob/superbot/store.aspx?uid='+global.uid+
    '&token=' +
    global.token+
    '&device=' +
    DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel();
    total_count2=0
    open_count2=0
   
    //consolefn(url,'start',new Date().toLocaleTimeString());
    fetch(url)
    .then(item=>item.json())
    .then(data=>{
      //consolefn(url,'end',new Date().toLocaleTimeString());
        if(data[0].success=='false'){
          return
        }
      
      setSuperData(data)      
      //console.log(data) 
      global.superData=data     
      data.map(e=>{
        if(e.opens=='True'){

          open_count2++
        }
        else{
          total_count2++
        }
        global.symname1 =global.symname1  + e.pair+","
      })     
      setTotalCount2(total_count2)       
      setOpenCount2(open_count2)    
      console.log('======hit trade api allcoins 4 second===========================');
      tradeApi(data,4);
    })   
  }

  function getDifferenceInMinutes(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60);
  }

  const tradeApi = (Coins,num) => {


started_checking_rates=true;    
  
    
    var finaljson = '';

    var s1 = '';
    let alldta = [];

    let tcnt = 0;

    if (
      global.symname == '' ||
      global.symname == null ||
      global.symname.toString().indexOf('undefined') >= 0
    ) {
      global.symname = '';
      Coins = global.Coins;
      global.symname = 'BTCUSDT';
      try {
        if (Coins!=null) {
        
        
          Coins.map(dta => {
          if (global.symname == '') {
            global.symname = dta.sym;
          } else {
            global.symname = global.symname + ',' + dta.sym;
          }
        }
      
        
        );
      }
      } catch (e) {



      }
      global.symname = global.symname + ',' + global.symname1
    }

    

    //consolefn(url2,`global.symname ${global.symname}`,new Date().toLocaleTimeString());
    if (global.symname != null && global.symname) {
    } else {
      return;
    }
    let url2 =`${global.BASE_URL}css_mob/price.aspx?pair=EURUSD`//${global.symname}` ;
    consolefn(url2,'getsuperbotData',new Date().toLocaleTimeString());
      
    finaljson = '';
    fetch(url2)
    .then(item => item.json())
    .then(newdta1 => {

     
      
      newdta1.map(newdta => {
        // if (newdta.sym == 'BTCUSDT') {
        //   setBtcLive(newdta.price);
        // }                
        
        try{
          let superbt=[...global.superData]
            superbt.map((e,index)=>{          
              newdta1.map(newdta => {                        
                    if(newdta.sym==e.pair){
                      superbt[index]['price']=newdta.price
                    }
                })            
              })          
              setSuperData(superbt)

        }
        catch (e) {}
     
          try {
            
            Coins.map(dta => {
              
              var mode = dta.mode;
              var side = dta.side;
              var lastprice = '';
              var pcp = '';

              var symbol = newdta.sym;
              
              var weightedaverage = '';
              var prev_close_price = '';
              var high_price = '';
              var low_price = '';
              var ask_price = '';
              var leverage = '';
              var bid_price = '';
              lastprice = newdta.price;

             

              pcp = newdta.pchange;
              weightedaverage = 0;
              prev_close_price = 0;
              high_price = 0;
              low_price = 0;
              ask_price = 0;
              bid_price = 0;
              var btcinit = dta.btcinit;
              pcp = parseFloat(pcp).toFixed(2);
              prev_close_price = parseFloat(prev_close_price).toFixed(2);
              try {
                
                if (symbol.toLowerCase() == dta.sym.toLowerCase()) {
                  tcnt = tcnt + 1;                  
                  var json =
                    "{'avg':'" +
                    dta.avgprice +
                    "','bst':'" +
                    dta.bstatus +
                    "','bst1':'" +
                    dta.bstatus1 +
                    "','img':'" +
                    dta.img +
                    "','leverage':'" +
                    dta.leverage +
                    "','liq':'" +
                    dta.liq +
                    "','last_price':'" +
                    lastprice +
                    "','pcp':'" +
                    pcp +
                    "','qty':'" +
                    dta.qty +
                    "','qty1':'" +
                    dta.qty1 +
                    "','sym':'" +
                    symbol +
                    "','st':'" +
                    dta.st +
                    "','tp':'" +
                    dta.tp +
                    "','usdt':'" +
                    dta.usdt +
                    "','wta':'" +
                    "','strtamt':'" +
                    dta.startamt +
                    "','trd_dt':'" +
                    dta.tradedt +
                    "','wta':'" +
                    weightedaverage +
                    "','x_prev_cprice':'" +
                    prev_close_price +
                    "','x_hprice':'" +
                    high_price +
                    "','x_lprice':'" +
                    low_price +
                    "','x_askprice':'" +
                    ask_price +
                    "','x_bidprice':'" +
                    bid_price +
                    "','myusdt':'" +
                    dta.myusdt +
                    "','saveliq':'" +
                    dta.saveliq +
                    "','save_liq_times':'" +
                    dta.save_liq_times +
                    "','iscopy':'" +
                    dta.iscopytrade +
                    "','ttype':'" +
                    dta.ttype +
                    "','start_bot_variation':'" +
                    dta.start_bot_variation +
                    "','opens':'" +
                    dta.opens +
                    "','sl':'" +
                    dta.sl +
                    "','tsl':'" +
                    dta.tsl +
                    "','tsl_type':'" +
                    dta.tsl_type +
                    "','btc_callback':'" +
                    dta.btc_callback +
                    "','mode':'" +
                    mode +
                    "','buy':'" +
                    dta.buy +
                    "','noc':'" +
                    dta.noc +
                    "','init_trade':'" +
                    dta.init_trade +
                    "','sell':'" +
                    dta.sell +
                    "','mmode':'" +
                    dta.mmode +
                    "','margin_call_drop':'" +
                    dta.margin_call_drop +
                    "','price_to_start_trade':'" +
                    dta.price_to_start_trade +
                    "','btcinit':'" +
                    btcinit +
                    "','side':'" +
                    side +
                    "','margin_callback_limit':'" +
                    dta.margin_callback_limit +
                    "'}";
                 
                  if (finaljson == '') {
                    finaljson = json;
                  } else {
                    finaljson = finaljson + ',' + json;
                  }
                }
              } catch (e) {
             
              }
            });
          } catch (error) {
    
          }
        });  


        bindjson(finaljson);
      }).catch(e=>{
        //console.log('PRINTING' + e)
      })
  };
  function bindjson(finaljson) {
 


    if (finaljson !== '' && finaljson !== null) {
      finaljson = finaljson.replace(/\'/g, '"');
      finaljson = '[' + finaljson + ']';
    
      let myJson = [];
      myJson = JSON.parse(finaljson);
 
      let dm = 0;

      let lv = 0;
    
      if (myJson.length != 0) {
        dm = 0;
        lv = 0;

        myJson.map((item, index) => {
          if (item.mode == 'demo') {
    
            // item.avg)
            dm =
              dm +
              ((parseFloat(item.last_price) - parseFloat(item.avg)) /
                parseFloat(item.avg)) *
                100;
    
          }
          if (item.mode == 'live') {
            lv =
              lv +
              ((parseFloat(item.last_price) - parseFloat(item.avg)) /
                parseFloat(item.avg)) *
                100;
          }
        });
      }

      try
      {
      if(lv.toFixed(2)!=null && lv.toFixed(2)!=undefined){

        setLive(lv.toFixed(2));
      }
    }
    catch(e)
    {

    }
      try
      {
        if(dm.toFixed(2)!=null && dm.toFixed(2)!=undefined){

          setDemo(dm.toFixed(2));
        }
      }
      catch(e)
      {

      }
     
      setData(JSON.parse(finaljson));
      setLoading(false)
      setRefreshing(false);
    }
  }

  const TradeType = (sym, type, orderType) => {
    let tp;
    if (type.toLowerCase() === 'one-shot') {
      tp = 'cycle';
    } else if (type.toLowerCase() === 'cycle') {
      tp = 'one-shot';
    } else {
      tp = 'one-shot';
    }

    let mode = hedge ? 'hedge' : 'normal';
    let url;
    if (hedge) {
      url =
        global.BASE_URL +
        'css_mob/hedge/tradetype.aspx?pair=' +
        sym +
        '&uid=' +
        Uid +
        '&tp=' +
        tp +
        '&pmode=' +
        mode +
        '&side=' +
        orderType+
        '&token=' +
        global.token+
        '&device=' +
        DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel();;
    } else {
      url =
        global.BASE_URL +
        'css_mob/tradetype.aspx?pair=' +
        sym +
        '&uid=' +
        Uid +
        '&tp=' +
        tp +
        '&pmode=' +
        mode+
        '&token=' +
        global.token+
        '&device=' +
        DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel();;
    }
    //consolefn(url,'start',new Date().toLocaleTimeString());
    fetch(url)
      .then(item => item.json())
      .then(dta => {
        //consolefn(url,'end',new Date().toLocaleTimeString());
        if (dta.status) {
          setTimeout(() => {
            onRefresh();
          
          }, 2000);
        }
        ToastAndroid.show(dta.message, ToastAndroid.SHORT);
        global.status = 'true';
      }).catch(e=>{
       
      })
      .then(() => {
        setWait(false);
      });
  };
  const TradeType_all = type => {
    let tp;
    if (type.toLowerCase() === 'one-shot') {
      tp = 'cycle';
    } else if (type.toLowerCase() === 'cycle') {
      tp = 'one-shot';
    } else {
      tp = 'one-shot';
    }

    let mode = hedge ? 'hedge' : 'normal';
    let url;

    url =
      global.BASE_URL +
      'css_mob/hedge/togglemode_all.aspx?&uid=' +
      Uid +
      '&tp=' +
      tp+
      '&token=' +
      global.token+
      '&device=' +
      DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel();;
      //consolefn(url,'start',new Date().toLocaleTimeString());
    fetch(url)
      .then(item => item.json())
      .then(dta => {
        //consolefn(url,'end',new Date().toLocaleTimeString());
        if (dta.status) {
          setTimeout(() => {
            setMode_all(tp);
            onRefresh();
          
          }, 2000);
        }
        ToastAndroid.show(dta.message, ToastAndroid.SHORT);
        global.status = 'true';
      })
      .then(() => {
        setWait(false);
      });
  };

  const toggleModal1 = () => {
    setModal1Visible(!isModal1Visible);
  };
  const stopSuperApi = (sym, side) => {    
  
    allcoins = '';
  
    let url;
    
      url =
        global.BASE_URL +
        'css_mob/superbot/stoptrade.aspx?pair=' +
        sym +
        '&uid=' +
        Uid +
        '&api_key=' +
        global.api_key +
        '&api_secret=' +
        global.api_secret +
        '&side=' +
        side+'&device='+DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel()+'&token='+global.token;
    
    global.status = 'true';
    global.Coins = '';
    
  
    var minutesToAdd = 20;
    var currentDate = new Date();
    var futureDate = new Date(currentDate.getTime() - minutesToAdd * 60000);
    global.prevtime1 = futureDate;
    
    global.prevtime2 = futureDate;
  
  
  
    // console.log('-------superbot stop: '+closeDoubleClicked)
    ToastAndroid.show('Requested For Bot Close For ' + sym+' '+side, ToastAndroid.SHORT);

  
    console.log(url);
    fetch(url)
      .then(item => item.json())
      .then(dta => {
  
        console.log('-------------stop api clicked---'+dta)
        // setSuperClosedDouble('false,-1')
        setTimeout(() => {
            
          onRefresh()
        }, 1500);
      }).catch(e=>{
      })
  };
  const stopApi = (sym, side) => {
    
    var minutesToAdd = 20;
    var currentDate = new Date();
    var futureDate = new Date(currentDate.getTime() - minutesToAdd * 60000);
    global.prevtime1 = futureDate;
    
    global.prevtime2 = futureDate;

    allcoins = '';
  
    let url;
    if (hedge) {
      url =
        global.BASE_URL +
        'css_mob/hedge/stoptrade_hedge.aspx?pair=' +
        sym +
        '&uid=' +
        Uid +
        '&api_key=' +
        global.api_key +
        '&api_secret=' +
        global.api_secret +
        '&side=' +
        side+'&device='+DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel();
    } else {
      url =
        global.BASE_URL +
        'css_mob/stoptrade.aspx?pair=' +
        sym +
        '&uid=' +
        Uid +
        '&api_key=' +
        global.api_key +
        '&api_secret=' +
        global.api_secret+'&device='+DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel();
    }
    global.status = 'true';
    global.Coins = '';
    setCallStore(true);

    var minutesToAdd = 20;
    var currentDate = new Date();
    var futureDate = new Date(currentDate.getTime() - minutesToAdd * 60000);
    global.prevtime1 = futureDate;
   
    global.prevtime2 = futureDate;
  
    
    ToastAndroid.show('Requested For Bot Close For ' + sym, ToastAndroid.SHORT);
    setTimeout(() => {
      setCloseDoubleClicked('false,-1');
    }, 5000);
    //consolefn(url,'start',new Date().toLocaleTimeString());
    fetch(url)
      .then(item => item.json())
      .then(dta => {}).catch(e=>{
        //consolefn(url,'end',new Date().toLocaleTimeString());
        setTimeout(() => {
          
          onRefresh()
        }, 1500);
      })
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleOTP = () => {
    setModalOTP(!ModalOTP);
  };
  const toggleModalIp = () => {
    setModalIpVisible(!isModalIpVisible);
  };
  const toggleTrialModal = () => {
    setTrialVisible(!TrialVisible);
  };
  const toggle_Popup_Img = () => {
    setPopup_Visible(!Popup_Visible);
  };
  const toggleModal_Fest = () => {
    setFest(!Fest);
  };
  const toggleModal_err = () => {
    setModalErrVisible(!isModalErrVisible);
  };
  // **for version 7/10/21
  const callApi = async uid => {
    var url = global.BASE_URL + 'css_mob/version.aspx?uid=' + uid+
    '&token=' +
    global.token+
    '&device=' +
    DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel();


    var versionMy = DeviceInfo.getVersion();
    //consolefn(url,'start',new Date().toLocaleTimeString());
    fetch(url)
      .then(item => item.json())
      .then(Vdta => {
        //consolefn(url,'end',new Date().toLocaleTimeString());
        setAppVer(Vdta.version);
       
        if (Vdta.version.includes(versionMy)) {         
          
         
        }
        if (Vdta.success === 'true') {
          if (!Vdta.version.toString().includes(versionMy.toString())) {
            //change code for version, ==  =>  !=
            // if('1.0.1'.includes('1.0')){

            props.navigation.navigate('VersionControl', {
              id: 'update',
              apk: Vdta.name,
              playstore: Vdta.playstore,
            });
          }
        } else if (Vdta.success === 'false') {
          props.navigation.navigate('VersionControl', {id: 'construction'});
        }
      }).catch(e=>{
        //console.log(e)
      })

    let n_url = global.BASE_URL + 'css_mob/scroll_news.aspx?uid=' + uid+
    '&token=' +
    global.token+
    '&device=' +
    DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel();
    //consolefn(n_url,'start',new Date().toLocaleTimeString());
    fetch(n_url)
    .then(item => item.json())
    .then(dta => {
      //consolefn(n_url,'end',new Date().toLocaleTimeString());
      global.news=dta[0].txt
      setScrollDta(global.news);
    }).catch(e=>{
      //console.log('erorr here scroll news--------------'+e)
    })
   

   
  };
  const api_key_api = async (uid, start) => {    
    console.log('=======================navpreet singh '+start)
    var token = await AsyncStorage.getItem('token');    
    global.token=token   
    //ToastAndroid.show('Loading API key Data',ToastAndroid.SHORT)

    if (called1) {
      return;
    }

    called1 = true;
    

    global.hedge_updated = 'normal';
    try {
      //console.log('hellodiff===================', start);
      if (global.EMAIL !== '') {
        let newDate = new Date();
        let diff = getDifferenceInMinutes(global.prevtime, newDate);
     
      }
    } catch (e) {}
    global.login_now = false;
    var mypwd = await AsyncStorage.getItem('myPwd');
    try{
  console.log(`possible issue================ ${uid} ${global.api_key_data} `);


    if (global.api_key_data ==null || global.api_key_data=='' ||
     global.api_key_data.hedge == null || global.api_key_data.hedge == undefined) {
      if (uid == undefined || uid == null || uid == '') {
        console.log('--------------issue here so cant call api_key.aspx');
        return;
      }

      const now = new Date();
      const tm = now.getTimezoneOffset() / 60;
      global.prevtime = new Date();
      global.hitApi = false;
      let url =
        global.BASE_URL +
        'css_mob/api_key.aspx?uid=' +
        uid +
        '&pwd=' +
        mypwd +
        '&zone=' +
        tm +
        '&token=' +
        token+
        '&device=' +
        DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel();
        consolefn(url,'start',new Date().toLocaleTimeString());
      global.uid = uid;
      // setUID(uid)
      fetch(url)
        .then(item => item.json())
        .then(Vdta => {
          //consolefn(url,'end',new Date().toLocaleTimeString());
          global.api_key_data = Vdta;
          if (global.lg_without_pwd) {
            
          } else {
            if (Vdta.success === 'false' && Vdta.msg === 'wrong_pwd') {
              signOut();
              ToastAndroid.show('Please Login once again', ToastAndroid.SHORT);
            }
          }
          //console.log('api_key ' + Vdta);
          if (parseFloat(Vdta.amt) > 0) {
            global.activeId = true;
          } else {
            if (global.refreshed) {
              if (Vdta.trial === 'true') {
                toggleTrialModal();
              }
            }
          }
          global.txnPassword = Vdta.txn;
          global.ReqValue = Vdta.reqvalue;
          global.autoStatus = Vdta.auto; //'False' or 'True'
          global.autoAmt = Vdta.auto_amt;
          global.autoNum = Vdta.auto_num;
          global.fest_json = Vdta.json;
          global.fest_date = Vdta.dy;
          global.fest_month = Vdta.mon;
          global.tradeCapital = Vdta.capital
          //console.log('trade capital in homne==============='+global.tradeCapital)
          global.hedge_updated = 'done';
          if((Vdta.otp).toLowerCase()=='true'){

            setOtpMode(true)
          }
          else{
            setOtpMode(false)
          }
          global.fest_year = Vdta.year;
          global.rank = Vdta.rank;
          global.freeUser=Vdta.free_user;
          global.bbal= Vdta.bbal;
          global.vbal= Vdta.vbal;
          global.ebal= Vdta.ebal;
          global.depShow = Vdta.depositshow;
          global.iscopytrade = Vdta.iscopytrader;
          global.demo = Vdta.demo;
          global.addr = Vdta.addr;
          
          if(parseFloat(global.ebal)>0&&Vdta.addr==''&&Vdta.demo&&Vdta.demo.toLowerCase() !== 'true'){
            props.navigation.navigate("KYC", { from: "home" });
          }

          if(Vdta.errorlogs&&Vdta.errorlogs!=''){
            setErrorModal(Vdta.errorlogs)
          }

          if (Vdta.hedge === 'True') {
            console.log('setting hedge to true===================================')
            setHedge(true);
          } else {
            setHedge(false);
          }
          if (Vdta.safemode === 'true') {
            setSafeMode(true);
          } else {
            setSafeMode(false);
          }
          global.Store = null;
          global_store(Vdta.hedge, 'from api_key.aspx vdta hedge');
          StoreApi(Uid, 'run', 'api_key_function6', Vdta.hedge);

          if (Vdta.depositshow.toLowerCase() == 'true' && (Vdta.demo).toLowerCase() !== 'true'&&global.dtxt!=null) {
            setShowDep(true);
          }
          if (Vdta.maxlev) {
            global.max_lev = Vdta.maxlev;
          }
          // global.demobal = parseFloat(Vdta.dbal).toFixed(2);
          global.depTxt = Vdta.dtxt;
          global.AccMode = Vdta.account_type;
          setGlobalAcc(Vdta.account_type);
          if (Vdta.account_type === 'demo') {
            setRealbal(false);
          }
          //console.log('modeis' + Vdta.account_type);
          setModeName(Vdta.account_type);
          setFdate(Vdta.dy);
          setFmonth(Vdta.mon);
          setFyear(Vdta.year);
          if (Vdta.mno === '' && Vdta.demo != 'true') {
            //props.navigation.navigate("KYC", { from: "home" });
          }
          if (global.refreshed) {
            if (Vdta.popup != '') {
              setPoupImg(Vdta.popup);
              toggle_Popup_Img();
              global.refreshed = false;
            }
          }
          if (Vdta.error === 'true') {
            toggleModal_err();
            setError_msg(Vdta.errmsg);
          }

          global.autoFamt = Vdta.auto_famt;
          global.timeleft = Vdta.timeleft;
          global.refurlProm = Vdta.whatsapp;
          setAPI(Vdta.api_key);
          global.autoFamt = Vdta.auto_famt;
          global.autotype = Vdta.auto_type;
          global.CopyId = Vdta.copyid;
          global.timeleft = Vdta.timeleft;
          // global.demo = Vdta.demo.toLowerCase();
          // var {cipher, key, iv} = setData({cipher, iv, key});//
        
          // let secretkey = asyncDecrypt(Vdta.secret_key, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', '')
          // setSecret(secretkey);
          global.NAME = Vdta.name;
          if (global.lg_without_pwd) {
            null;
          } else {
            if (
              global.NAME === '' ||
              global.NAME == undefined ||
              (global.NAME == null && Vdta.demo.toLowerCase() != 'true')
            ) {
         
            }
            if (Vdta.binance == 'true') {
              toggleModalIp();
            }
          }
          global.EMAIL = Vdta.eid;

          global.AMT = Vdta.amt;
          global.kycreq = Vdta.kycreq;

          global.CUR = Vdta.cur;
          global.dt = Vdta.dt;
          global.api_key = Vdta.api_key;
          global.api_secret = Vdta.secret_key;
          global.refurl = Vdta.refurl;

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
            //console.log(
            //   'for home and kyc: ' + global.kycreq + '  ' + global.NAME,
            // );
            if (global.kycreq.toString().toLowerCase() === 'true') {
              //global.NAME==='')
              //console.log('global name is: ' + global.NAME);
              props.navigation.navigate('KYCBefore');
            }
            // global.cur_value
            try {
              
              const token = await messaging().getToken();
            } catch (error) {
              console.log('exception103: '+error);
            }

            //console.log('token is  ' + token);
            //  if(oldtoken===''){
            if ((uid != '', token != '')) {
              // udpateToken(uid, token);
            }
            if (global.api_key == null || global.api_key == undefined) {
              global.api_key = '';
              global.api_secret = '';
            }
          }
          // ToastAndroid.show('API key Data Loaded Successfully',ToastAndroid.SHORT)
          setLoading(false);
          // setLoading(false)
        }).catch(e=>{
          //console.log(e)
        })
    } else {
      setLoading(false)
      global_store(
        hedge,
        'from api_key.aspx  end of function ',
      );
      StoreApi(Uid, 'run', 'api_key_function2', hedge);      
    }
  }catch(e){
    //console.log(e)
  }
  console.log(`----nav biggest panga here ==============================`)
    startinterval();

    called1 = false;
  };

  const OTPCall = async() => {
    let token=await AsyncStorage.getItem('token')
    if (Uid != '') {
      let url=global.BASE_URL + 'css_mob/sendotp.aspx?uid=' + Uid + '&type=email&device='+DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel()+'&token='+token
      //consolefn(url,'start',new Date().toLocaleTimeString());
      fetch(url)
        .then(item => item.json())
        .then(SData => {
          //consolefn(url,'start',new Date().toLocaleTimeString());
          if (SData.success === 'true') {
            setOTP(SData.otp);
       
            ToastAndroid.show(
              'Please Check Your Email Inbox/Spam Folder For Verification Code.',
              ToastAndroid.LONG,
            );
          }
          if(SData.success === 'false' && SData.msg === 'wrong_pwd'){
            signOut()
          }
        }).catch(e=>{
          //console.log(e)
        })
    } else {
      ToastAndroid.show('Enter a valid email first', ToastAndroid.SHORT);
    }
  };

  const udpateToken = async (uid, ntoken) => {
    var url = global.BASE_URL + 'css_mob/updateToken.aspx';
    var fdata = new FormData();
    fdata.append('uid', uid);
    fdata.append('ntoken', ntoken);
    //consolefn(url,'start',new Date().toLocaleTimeString());
    await axios
      .post(url, fdata, {headers: {contentType: 'application/json'}})
      .then(async function (response) {
        //consolefn(url,'end',new Date().toLocaleTimeString());
          await AsyncStorage.setItem('ntoken', ntoken);
        
          
      });
  };

  function SendToInner(
    sym,
    img,
    st,
    type,
    strtamt,
    qty,
    qty1,
    liq,
    inc,
    bst,
    avg,
    usdt,
    bst1,
    high,
    low,
    prev,
    ask,
    bid,
    side,
    iscopy,
    myusdt,
    buy,
    sell,
  ) {
    if (!global.lg_without_pwd) {
      // props.navigation.navigate('TrdChart', {
      props.navigation.navigate('TradeReview', {
        sym: sym,
        img: img,
        status: st,
        type: type,
        strtamt: strtamt,
        qty: qty,
        qty1: qty1,
        liq: liq,
        inc: inc,
        bst: bst,
        avg: avg,
        usdt: usdt,
        bst1: bst1,
        high: high,
        low: low,
        prev: prev,
        ask: ask,
        bid: bid,
        ordertype: side,
        iscopy: iscopy,
        myusdt: myusdt,
        buy: buy,
        sell: sell,
      });
    } else {
      ToastAndroid.show(
        'Sorry... Visitors are not allowed in here',
        ToastAndroid.SHORT,
      );
    }
  }

  const Push_btn = pair => {
    
    let url =
      global.BASE_URL +
      'css_mob/stoptrade.aspx?pair=' +
      pair +
      '&uid=' +
      Uid +
      '&api_key=' +
      global.api_key +
      '&api_secret=' +
      global.api_secret+
      '&token=' +
      global.token+
      '&device=' +
      DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel();
      //consolefn(url,'start',new Date().toLocaleTimeString());
    fetch(url)
      .then(item => item.json())
      .then(dta => {
        //consolefn(url,'end',new Date().toLocaleTimeString());

        ToastAndroid.show(dta.message + ' for ' + pair, ToastAndroid.SHORT);
        try{

          if (Uid !== '') {
 
            global_store(global.api_key_data.hedge, 'from push btn');
            StoreApi(Uid, 'run', 'Refresh Button', global.api_key_data.hedge);
          }
        }catch(e){
          //console.log(e)
        }
          toggleModal();
      }).catch(e=>{
        //console.log(e)
      })
  };

  const stop_margin_calls = () =>
    Alert.alert(
      'Alert',
      'Are you sure you want to resume all the bots?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Resume',
          onPress: () => resume(),
        },
      ],
      {
        cancelable: true,
      },
    );

  const resume = () => {
    let url = global.BASE_URL + 'css_mob/resume_all_bots.aspx'+
    '&token=' +
    global.token+
    '&device=' +
    DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel();;
    //consolefn(url,'start',new Date().toLocaleTimeString());
    fetch(url)
      .then(item => item.json())
      .then(dta => {
        //consolefn(url,'end',new Date().toLocaleTimeString());
      }).catch(e=>{
        //console.log(e)
      })
  };

  const hitApi = async a => {
    let url =
      global.BASE_URL + 'css_mob/set_acc.aspx?uid=' + global.uid + '&acc=' + a;
      //consolefn(url,'start',new Date().toLocaleTimeString());
    fetch(url)
      .then(item => item.json())
      .then(async dta => {
        //consolefn(url,'end',new Date().toLocaleTimeString());
        if (dta.success == 'true') {
          await AsyncStorage.setItem('mode', a);
          ToastAndroid.show(
            'Account Mode changed successfully!',
            ToastAndroid.SHORT,
          );

          if (dta.success == 'true') {
            setModeName(a);
            global.AccMode = a;
            setGlobalAcc(a);
            //console.log('modeis' + global.AccMode);
          }
        }
      }).catch(e=>{
        //console.log(e)
      })
    // }
    setLoading(false);
    // });
  };

  const Edit_tpsl = (pair, type, lev, side,item) => {
    let up = type === 'TP' ? 1 :type=='TSL'?3: 0;
    let roe= parseFloat(item.side.toLowerCase() == 'buy'
    ? (
        (((parseFloat(item.last_price) -
          parseFloat(item.avg)) *
          parseFloat(item.qty) +
          parseFloat(item.usdt)) /
          parseFloat(item.usdt) -
          1) *
        100 *
        parseFloat(item.leverage)
      ).toFixed(2)
    : (
        (((parseFloat(item.last_price) -
          parseFloat(item.avg)) *
          parseFloat(item.qty) +
          parseFloat(item.usdt)) /
          parseFloat(item.usdt) -
          1) *
        100 *
        parseFloat(item.leverage)
      ).toFixed(2) * -1)      
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Slider
          useNativeDriver={true}
          disabled={false}
          value={TPSL}
          style={{width: '70%'}}
          maximumTrackTintColor="#fff"
          minimumTrackTintColor="#165a05"
          thumbTintColor="#41c81d"
          onValueChange={value => {
            setTPSL(parseInt(value));
          }}
          minimumValue={0}
          maximumValue={type=='TSL'?parseInt(roe):100}
        />
        <Text style={{color: '#fff', marginLeft: 10, fontSize: 16}}>
          {type}:{TPSL}%
        </Text>
        <TouchableOpacity
          onPress={() => {
            if(type=='TSL'&&(parseFloat(TPSL) / parseFloat(lev)).toFixed(2)>roe){
              return
            }
            let url =
              global.BASE_URL +
              `css_mob/starttrade_tp.aspx?uid=${
                global.uid
              }&pair=${pair}&up=${up}&tp=${(
                parseFloat(TPSL) / parseFloat(lev)
              ).toFixed(2)}`+
              '&token=' +
              global.token+
              '&device=' +
              DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel();;

            if (hedge) {
              url =
                global.BASE_URL +
                `css_mob/hedge/starttrade_tp.aspx?side=${side}&uid=${
                  global.uid
                }&pair=${pair}&up=${up}&tp=${(
                  parseFloat(TPSL) / parseFloat(lev)
                ).toFixed(2)}`+
                '&token=' +
                global.token+
                '&device=' +
                DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel();;
            }

            //consolefn(url,'start',new Date().toLocaleTimeString());
            fetch(url)
              .then(item => item.json())
              .then(data => {
                //consolefn(url,'end',new Date().toLocaleTimeString());
                var currentDate = new Date();
                var minutesToAdd = 40;
                var futureDate = new Date(
                  currentDate.getTime() - minutesToAdd * 60000,
                );
                global.prevtime1 = futureDate;
                global.prevtime = futureDate;
                global.prevtime2 = futureDate;
                global.prevtime3 = futureDate;
                global.prevtime_market = futureDate;
                global.status = 'true';

                (global.Coins = null), setCallStore(true);
                try{

                  StoreApi(
                    Uid,
                    'run',
                    'api_key_function3',
                    global.api_key_data.hedge,
                    );
                  }catch(e){
                    //console.log(e)
                  }
                  }).catch(e=>{
                    //console.log(e)
                  })
                  .then(() => {
                    setShowTPSL(null);
                  });
          }}
          style={{
            backgroundColor: '#00a65a',
            borderRadius: 10,
            marginLeft: 5,
            padding: 5,
          }}>
          <Text style={{color: '#fff'}}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const color_check = React.useCallback(
    (item, type) => {
      var roe_per = 0;
      var clr = '';
      var stop_loss = parseFloat(item.sl) * parseFloat(item.leverage);
      {
        item.side.toLowerCase() == 'buy'
          ? (roe_per = (
              (((parseFloat(item.last_price) - parseFloat(item.avg)) *
                parseFloat(item.qty) +
                parseFloat(item.usdt)) /
                parseFloat(item.usdt) -
                1) *
              100 *
              parseFloat(item.leverage)
            ).toFixed(2))
          : (roe_per =
              (
                (((parseFloat(item.last_price) - parseFloat(item.avg)) *
                  parseFloat(item.qty) +
                  parseFloat(item.usdt)) /
                  parseFloat(item.usdt) -
                  1) *
                100 *
                parseFloat(item.leverage)
              ).toFixed(2) * -1);
      }
      type = 'ROE';
      if (type == 'ROE') {
        if (item.margin_callback_limit <= item.qty1 - 1) {
          var new_stop_loss = stop_loss;
          if (new_stop_loss == 0) {
            new_stop_loss = 100;
          }

          if ((roe_per * -1 * 100) / new_stop_loss > 50) {
            clr = '#F46401';

            return clr;
          }
        }

        if (roe_per < 0) {
          return colors.losscolor;
        } else {
          return colors.profitcolor;
        }
      }
    },
    [Data],
  );

  const close_all_orders = () => {
    let url =
      global.BASE_URL + `css_mob/close_all_orders.aspx?uid=${global.uid}`+
      '&token=' +
      global.token+
      '&device=' +
      DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel();;
    if (hedge) {
      url =
        global.BASE_URL +
        `css_mob/hedge/close_all_orders.aspx?uid=${global.uid}`+
        '&token=' +
        global.token+
        '&device=' +
        DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel();;
    }
    //consolefn(url,'start',new Date().toLocaleTimeString());
    fetch(url)
      .then(item => item.json())
      .then(data => {
        //consolefn(url,'end',new Date().toLocaleTimeString());
      })
      .then(() => {
        onRefresh();
      }).catch(e=>{
        //console.log(e)
      })
  };


  const Dta_filter=()=>{
    
    let Dta
    if(positionPanel){
      Dta= Data.filter(
          e =>
            e.opens !== 'True' &&
            //cond1

            ((sortStatus == 1 &&
              (e.side.toLowerCase() == 'buy'
                ? (parseFloat(e.last_price) - parseFloat(e.avg)) *
                    parseFloat(e.qty) >=
                  0
                : (parseFloat(e.last_price) - parseFloat(e.avg)) *
                    parseFloat(e.qty) *
                    -1 >=
                  0)) || //end of cond1
              //cond2
              (sortStatus == 2 &&
                (e.side.toLowerCase() == 'buy'
                  ? (parseFloat(e.last_price) -
                      parseFloat(e.avg)) *
                      parseFloat(e.qty) <
                    0
                  : (parseFloat(e.last_price) -
                      parseFloat(e.avg)) *
                      parseFloat(e.qty) *
                      -1 <
                    0)) ||
              sortStatus == 3 ||
              (sortStatus == 4 &&
                e.side.toLowerCase() == 'sell') ||
              (sortStatus == 5 &&
                (e.side.toLowerCase() == 'buy' ||
                  e.side.toLowerCase() == 'sell')) ||
              (sortStatus == 6 && e.side.toLowerCase() == 'buy')),
            //end of cond2
            //cond3 //main bracket
        )
      }
      else if( !positionPanel && OpenPanel){
      Dta= Data.filter(e => e.opens == 'True')
      }else{
      Dta= Data.filter(
          e =>
            e.ttype == 'copy' &&
            //cond1
            ((sortStatus == 1 &&
              (e.side.toLowerCase() == 'buy'
                ? (parseFloat(e.last_price) - parseFloat(e.avg)) *
                    parseFloat(e.qty) >=
                  0
                : (parseFloat(e.last_price) - parseFloat(e.avg)) *
                    parseFloat(e.qty) *
                    -1 >=
                  0)) || //end of cond1
              //cond2
              (sortStatus == 2 &&
                (e.side.toLowerCase() == 'buy'
                  ? (parseFloat(e.last_price) -
                      parseFloat(e.avg)) *
                      parseFloat(e.qty) <
                    0
                  : (parseFloat(e.last_price) -
                      parseFloat(e.avg)) *
                      parseFloat(e.qty) *
                      -1 <
                    0)) || //end of cond2
              //cond3
              sortStatus == 3), //main bracket
        )
        }
          if(!OpenPanel){
              total_count=Dta.length
          }
     
        return Dta
  }



  const Profit_rate_calculate = () => {
    let used_avg;
    if (NewAvg1 != undefined && NewAvg1 != null && NewAvg1 != '' && parseFloat(NewAvg1) > 0) {
      used_avg = NewAvg1;

    } else {
      used_avg = NewAvg
    }
    let av = used_avg == undefined || used_avg == null || isNaN(used_avg) || parseFloat(used_avg) == 0 ? 0 : used_avg != '' ?
      parseFloat(used_avg) < parseFloat(CPrice) ?
        (((((parseFloat(used_avg) - parseFloat(CPrice)) / parseFloat(used_avg)) * 100) * -1).toFixed(2)) :
        ((((parseFloat(CPrice) - parseFloat(used_avg)) / parseFloat(used_avg)) * 100).toFixed(2)) : 0
    return av;
  }
  const estimated_pnl = () => {
   
    let pnl = Input1 != '' ? isNaN(parseFloat(Input1) / parseFloat(NewAvg1) * 100 - 100) ? '0' : (parseFloat(Input1) / parseFloat(NewAvg1) * 100 - 100).toFixed(4) + '%' : '-'

    return pnl
  }
  const placeOrder = (mode) => {
    if (Input1 != '' && Input2 != '') {
      let hmode=hedge?'hedge':'normal'
      let url;
      if(hedge){
        url = global.BASE_URL + 'css_mob/hedge/place_order.aspx?uid=' + Uid + '&side=' + mode + '&api_key=' + global.api_key + '&api_secret=' + global.api_secret + '&quantity=' + parseFloat(Input2*vItem.leverage) + '&pair=' + vItem.sym + '&price=' + Input1 + '&precision=5'+'&pmode='+hmode+'&side1='+vItem.side;
      }else{
        url = global.BASE_URL + 'css_mob/place_order.aspx?uid=' + Uid + '&side=' + mode + '&api_key=' + global.api_key + '&api_secret=' + global.api_secret + '&quantity=' + parseFloat(Input2*vItem.leverage) + '&pair=' + vItem.sym + '&price=' + Input1 + '&precision=5'+'&pmode='+hmode;
      }
      //consolefn(url,'start',new Date().toLocaleTimeString());
      fetch(url)
        .then(item => item.json())
        .then(dta => {
          //consolefn(url,'end',new Date().toLocaleTimeString());
          setP_order(false)
          ToastAndroid.show("Order Will be Placed Instantly At Your Selected Price", ToastAndroid.SHORT)
          setAvgMarginModal(false)
          setClick_buy(true)
          global.status = 'true'
          global.Coins = '';
          setCallStore(true)
        })
    }
  }

  const Boxlayout=React.useCallback(({navigation, name, image, boximage})=>{

  const AnimationRef = React.useRef(null);
  const [dur,setDur]=React.useState(500);  
  const _onPress = () => {
    setDur(1500)
    if(AnimationRef) {
      AnimationRef.current?.bounce();
    }
    
  }




return(
  <TouchableOpacity activeOpacity={0.6} style={{alignItems:'center'}}
  onPress={()=>{
    set (false)    
    
    if(Loading&&name=="Future Trading"){
      ToastAndroid.show('Loading ! please wait.',ToastAndroid.SHORT)
    }
    if (name=="Crypto Spot Trading"){
     
      if(appModal){        
        _onPress();      
        // Linking.openURL('https://botz.trade')  
     
          SendIntentAndroid.isAppInstalled("com.btz.airobot").then(isInstalled => {                            
            console.log(isInstalled)
            if(isInstalled){
              SendIntentAndroid.openApp("com.btz.airobot").then(wasOpened => {console.log(wasOpened)});
            }else{
              
                  Linking.openURL('https://botz.trade/')
                }                      
          })    
        }else{
          _onPress();      
          Linking.openURL('https://botz.trade/')
        }            
    }
    else{
      _onPress()     
      if (name=="Future Trading"){
        setAppModal(false)
        AsyncStorage.setItem('appmodal','false')                        
      } else if (name=="Meta Games"){      
        
        SendIntentAndroid.isAppInstalled("com.mtg.gaming").then(isInstalled => {                            
          console.log(isInstalled)
          if(isInstalled){
            SendIntentAndroid.openApp("com.mtg.gaming").then(wasOpened => {console.log(wasOpened)});
          }else{
                Linking.openURL('https://metagames24.online')
              }                      
        })      
        // Linking.openURL('https://metagames24.online')  
        
      } 
      else if (name=="Meta Games"){      
        
        SendIntentAndroid.isAppInstalled("com.mtg.gaming").then(isInstalled => {                            
          console.log(isInstalled)
          if(isInstalled){
            SendIntentAndroid.openApp("com.mtg.gaming").then(wasOpened => {console.log(wasOpened)});
          }else{
                Linking.openURL('https://metagames24.online')
              }                      
        })      
        // Linking.openURL('https://metagames24.online')  
        
      } 
      else if(name=="NFT")
      {
    ToastAndroid.show(name + "  Launching Soon!",ToastAndroid.SHORT)
  }else{
    ToastAndroid.show(name + "  Under Construction!",ToastAndroid.SHORT)
  }
    }
  }}
  
  >
    <Animatable.View  animation={!Loading?null:
    boximage=="1"?'slideInLeft':boximage=="2"?"slideInRight":
    boximage=="3"?'slideInLeft':boximage=="4"?"slideInRight":
    boximage=="5"?'slideInLeft':'slideInRight'
  } iterationCount={1} ref={AnimationRef} duration={dur}  useNativeDriver={true}>
  <View 
   style={{width:80, height:80, marginTop:30,alignItems: 'center', marginBottom:20,marginLeft:boximage==="2"?0:10}}>
  <Image  style={{alignSelf:'center',width:100,height:100, marginTop:10,}} resizeMode={'contain'} source=
  {
    boximage=="1"?require('../../assets/apphome/future.png'):
    boximage=="2"?require('../../assets/apphome/spot.png'):
    boximage=="3"?require('../../assets/apphome/forex.png'):
    boximage=="4"?require('../../assets/apphome/grid.png'):
    boximage=="5"?require('../../assets/apphome/comm.png'):
    require('../../assets/apphome/share.png')
  }
  
  />
</View>
</Animatable.View>
<Text style={{color:'white', fontSize:14, textAlign:'center'}}>{name.split(' ',2)}</Text>  
{name=='Crypto Spot Trading'&&
<Text style={{color:'white', fontSize:14, textAlign:'center'}}>Trading  </Text>  
}

{name=='Future Trading'&&
<Text style={{color:'white', fontSize:14, textAlign:'center'}}>150 USDT   </Text>  
}
{name=='Meta Games'&&
<Text style={{color:'white', fontSize:14, textAlign:'center'}}>30 USDT</Text>  
}
</TouchableOpacity>
)
},[appModal,Loading])


const triggermodal=async(item)=>{  
    setTriggerData(item) 
    setShowTriggermodal(true)
}
const HitTrigger=async(item)=>{  
  let myitem=item?item:triggerData 
  let url=global.BASE_URL+`css_mob/hedge/trigger.aspx?uid=${global.uid}&symbol=${myitem.sym}&side=${myitem.side}`+
  '&token=' +
  global.token+
  '&device=' +
  DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel();
  //consolefn(url,'start',new Date().toLocaleTimeString());
  fetch(url)
  .then(item=>item.json())
  .then(dta=>{
    //consolefn(url,'end',new Date().toLocaleTimeString());
    if(dta.status){
      ToastAndroid.show('Trade Opened for '+(myitem.side=='BUY'?'sell':'buy')+' !',ToastAndroid.SHORT)
      setShowTriggermodal(false)
    }else{
      ToastAndroid.show('Please try again later',ToastAndroid.SHORT)
      setShowTriggermodal(false)
    }
  })
}
const[ld5,setLd5]= React.useState(false)

function calculate_pnl(item){
  let val=(parseFloat(
    (parseFloat(item.price) -
      parseFloat(item.avg_buy)) *
    parseFloat(item.qty_buy)
  )+ parseFloat((
   (parseFloat(item.price) -
     parseFloat(item.avg_sell)) *
   parseFloat(item.qty_sell)
 )*-1)).toFixed(2)




 return parseFloat(val)
}

function addDemo(){
 
  let url=global.BASE_URL+`css_mob/adddemo.aspx?uid=${global.uid}&amt=${addAmount}`+
  '&token=' +
  global.token+
  '&device=' +
  DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel();
  //consolefn(url,'start',new Date().toLocaleTimeString());
  fetch(url)
  .then(item=>item.json())
  .then(dta=>{
    //consolefn(url,'end',new Date().toLocaleTimeString());
    if(dta.msg){
      ToastAndroid.show(dta.msg,ToastAndroid.SHORT)
      setLd5(false)
      setAddMoneyModal(false)
      setShow(false)

    }
    else{
      ToastAndroid.show("Can't process your request, Please Try later!",ToastAndroid.SHORT)
      setLd5(false)
      setAddMoneyModal(false)
      setShow(false)

    }
   
  }).catch(e=>{
    ToastAndroid.show("Can't process your request, Please Try later!",ToastAndroid.SHORT)
      setLd5(false)
    setAddMoneyModal(false)
    setShow(false)

  })
}

const SignalInfo=(item,interval)=>{

  let url
  let url2
  if(interval!==undefined && interval!==null)
  {

    url=global.BASE_URL+'css_mob/signals_data.aspx?pair='+item+'&interval='+interval+
    '&token=' +
    global.token+
    '&device=' +
    DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel();
    url2=global.BASE_URL+'css_mob/get_indicators.aspx?pair='+item+'&interval='+interval+
    '&token=' +
    global.token+
    '&device=' +
    DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel();
  }
  else{

    url=global.BASE_URL+'css_mob/signals_data.aspx?pair='+item+'&interval=15'+
    '&token=' +
    global.token+
    '&device=' +
    DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel();
    url2=global.BASE_URL+'css_mob/get_indicators.aspx?pair='+item+'&interval=15'+
    '&token=' +
    global.token+
    '&device=' +
    DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel();
  }
  //consolefn(url,'start',new Date().toLocaleTimeString());
  console.log(url2)
  fetch(url2)
  .then(item=>item.json())
  .then(dta=>{   
    console.log(dta) 
      setSignalData2(dta)    
      // setLd2(-1)   
      // setSignalVis(true)   
  })
  fetch(url)
  .then(item=>item.json())
  .then(dta=>{   
    //consolefn(url,'end',new Date().toLocaleTimeString());
      setSignalData(dta)    
      setLd2(-1)   
      setSignalVis(true)   
  })
}

const onRefresh = async () => {

  global.Coins = '';
  global.symname = '';
  allcoins = '';

  var minutesToAdd = 20;
  var currentDate = new Date();
  var futureDate = new Date(currentDate.getTime() - minutesToAdd * 60000);
  global.prevtime1 = futureDate;
  global.prevtime = futureDate;
  api_key_api(Uid, 'onrefresh');

  setLd(true);


  setRefreshing(true);
  let newDate = new Date();
  let diff = getDifferenceInMinutes(global.prevtime1, newDate);

  if (Uid !== '') {
   
  }
  setRefVis(true);
  
    setLd(false);
  setTimeout(async () => {
    setRefreshing(false)
  }, 2000);

};

function calculateNetRoe(item){
  
  
    //   var a=(
    //   parseFloat(item.avg_buy)==0?0:(((parseFloat(item.price)-parseFloat(item.avg_buy))/parseFloat(item.avg_buy))*100*parseFloat(item.lev))
    // )+
    // (
    //   parseFloat(item.avg_sell)==0?0:((((parseFloat(item.price)-parseFloat(item.avg_sell))/parseFloat(item.avg_sell))*100*parseFloat(item.lev))*-1)
    // )
  console.log(`------${item.margin_buy}=========${item.margin_sell}`);
    var totalMargin = item.margin_buy?parseFloat(item.margin_buy):0+ item.margin_sell?parseFloat(item.margin_sell):0
      var totalPNL = (parseFloat(
        (parseFloat(item.price) -
          parseFloat(item.avg_buy)) *
        parseFloat(item.qty_buy)
      )+ parseFloat((
       (parseFloat(item.price) -
         parseFloat(item.avg_sell)) *
       parseFloat(item.qty_sell)
     )*-1)).toFixed(2)


    var netROE= (totalPNL*100)/totalMargin
    return netROE.toFixed(2)
     
}

  function consolefn(name,type,time){
      console.log(`${name} - ${type} - ${time}`)
  }


  return appModal ? (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
        backgroundColor: colors.background,
      }}>
     <ImageBackground source={require('../../assets/apphome/bg1.png')} style={{width:'100%',height:'100%',paddingTop:50}}>
        <Image source={require('../../assets/apphome/logo.png')} style={{width:200,height:60,alignSelf: 'center'}} resizeMode={'stretch'} />
     <ScrollView vertical style={{marginTop:'15%'}} >
        <View style={{marginTop:10, flexDirection:'row', justifyContent:'space-evenly'}}>
        <Boxlayout boximage="2" image="yellow" name="Future Trading"/>
        <Boxlayout  boximage="1" image="yellow" name="Crypto Spot Trading" />
        </View>
        <View style={{marginTop:20, flexDirection:'row', justifyContent:'space-evenly'}}>
        <Boxlayout boximage="3" image="yellow" name="Meta Games"/>
        <Boxlayout boximage="4" name="Meta-Z Token"/>
        </View>
        <View style={{marginTop:20, flexDirection:'row', justifyContent:'space-evenly', marginBottom:20}}>
        <Boxlayout boximage="5" name="Meta-FX"/>
        <Boxlayout boximage="6" name="NFT"/>
        </View>
        </ScrollView>
     </ImageBackground>
    </View>
  ) :
  Loading?
  <View
  style={{
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: colors.background,
  }}>
  <LottieView
    source={require('../../assets/loading.json')}
    style={{width: 150, height: 100, alignSelf: 'center'}}
    autoPlay
    loop
  />
</View>

  :
    (
    <ImageBackground source={require('../../assets/botz/app-bg.png')} resizeMode={'stretch'} style={[styles.container, {flex:1}]}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle={'light-content'}
      />

     
      <Modal
        onBackButtonPress={() => setShow(false)}
        statusBarTranslucent={true}
        deviceHeight={1000}
        onBackdropPress={() => setShow(false)}
        isVisible={show}
        useNativeDriver={true}
        animationIn={'slideInDown'}
        animationOut={'slideOutUp'}
        transparent={true}
        backdropOpacity={0.8}>
        <View
          style={{
            width: 360,
            flexDirection: 'column',
            backgroundColor: '#171e31',
            //  backgroundColor: '#29313d',
            alignSelf: 'center',
            marginTop: 110,
            borderRadius: 10,
            borderBottomWidth: 0,
            height: 400,
            zIndex: 9999,
          }}>
          <ImageBackground
            source={require('../../assets/botz/bannertop.png')}
            style={{
              width: '98%',
              height: 80,
              marginLeft: '1%',
              marginTop: 10,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            resizeMode={'stretch'}>
            <View style={{paddingHorizontal: 10}}>
              <Text
                style={{
                  color: colors.selected,
                  fontWeight: 'bold',
                  fontSize: 15,
                }}>
                Margin Trading
              </Text>
              <Text style={{color: colors.selected, fontSize: 12}}>
                Enjoy the fully re-engineered Crypto products with new interface
                and marginal balance.
              </Text>
            </View>
          </ImageBackground>
          <TouchableOpacity
            onPress={() => {
              setRealbal(true), hitApi('live'), setShow(false);
            }}
            style={{
              flexDirection: 'row',
              width: '100%',
              alignSelf: 'center',
              backgroundColor: '#1d2538',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              paddingVertical: 5,
              marginTop: 10,
              borderTopWidth: 0.5,
              borderBottomWidth: 0.5,
              borderColor: 'rgba(255,255,255,0.1)',
            }}>
            <View style={{flexDirection: 'column'}}>
              <Text style={{color: colors.selected, fontSize: 14}}>
                REAL ACCOUNT
              </Text>
              <Text
                style={{color: '#478b5b', fontSize: 14, fontWeight: 'bold'}}>
                ${global.livebal}
              </Text>
            </View>
            {realBal ? (
              <Image
                source={require('../../assets/botz/correct.png')}
                style={{width: 30, height: 30}}
                resizeMode={'stretch'}
              />
            ) : null}
          </TouchableOpacity>

          {realBal ? (
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                alignSelf: 'center',
                backgroundColor: 'transparent',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                paddingVertical: 5,
                marginTop: 20,
              }}>
              <View style={{flexDirection: 'column'}}>
                <Text style={{color: '#515c71', fontSize: 12}}>BALANCE</Text>
                <Text
                  style={{
                    color: colors.selected,
                    fontSize: 12,
                    marginTop: 3,
                    fontWeight: 'bold',
                  }}>
                  ${global.livebal}
                </Text>
              </View>
              <View style={{flexDirection: 'column'}}>
                <Text style={{color: '#515c71', fontSize: 12}}>
                  UNREALIZED P/L
                </Text>
                <Text
                  style={{
                    color: colors.selected,
                    fontSize: 12,
                    marginTop: 3,
                    fontWeight: 'bold',
                  }}>
                  ${live}
                </Text>
              </View>
              <View style={{flexDirection: 'column'}}>
                <Text style={{color: '#515c71', fontSize: 12}}>TOTAL</Text>
                <Text
                  style={{
                    color: colors.selected,
                    fontSize: 12,
                    marginTop: 3,
                    fontWeight: 'bold',
                  }}>
                  ${parseFloat(global.livebal) + live}
                </Text>
              </View>
            </View>
          ) : null}

          <TouchableOpacity
            onPress={() => {
              setRealbal(false), hitApi('demo'), setShow(false);
            }}
            style={{
              flexDirection: 'row',
              width: '100%',
              alignSelf: 'center',
              backgroundColor: '#1d2538',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              paddingVertical: 5,
              marginTop: 10,
              borderTopWidth: 0.5,
              borderBottomWidth: 0.5,
              borderColor: 'rgba(255,255,255,0.1)',
            }}>
            <View style={{flexDirection: 'column'}}>
              <Text style={{color: colors.selected, fontSize: 14}}>
                PRACTICE ACCOUNT
              </Text>
              <Text
                style={{color: '#c7764f', fontSize: 14, fontWeight: 'bold'}}>
                ${global.demobal}
              </Text>
            </View>
            {!realBal ? (
              <Image
                source={require('../../assets/botz/correct.png')}
                style={{width: 30, height: 30}}
                resizeMode={'stretch'}
              />
            ) : null}
          </TouchableOpacity>

          {!realBal ? (
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                alignSelf: 'center',
                backgroundColor: 'transparent',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                paddingVertical: 5,
                marginTop: 20,
              }}>
              <View style={{flexDirection: 'column'}}>
                <Text style={{color: '#515c71', fontSize: 12}}>BALANCE</Text>
                <Text
                  style={{
                    color: colors.selected,
                    fontSize: 12,
                    marginTop: 3,
                    fontWeight: 'bold',
                  }}>
                  ${global.demobal}
                </Text>
              </View>
              <View style={{flexDirection: 'column'}}>
                <Text style={{color: '#515c71', fontSize: 12}}>
                  UNREALIZED P/L
                </Text>
                <Text
                  style={{
                    color: colors.selected,
                    fontSize: 12,
                    marginTop: 3,
                    fontWeight: 'bold',
                  }}>
                  ${demo}
                </Text>
              </View>
              <View style={{flexDirection: 'column'}}>
                <Text style={{color: '#515c71', fontSize: 12}}>TOTAL</Text>
                <Text
                  style={{
                    color: colors.selected,
                    fontSize: 12,
                    marginTop: 3,
                    fontWeight: 'bold',
                  }}>
                  ${Math.round(parseFloat(global.demobal), 2) + demo}
                </Text>
              </View>
            </View>
          ) : null}
        </View>
        {/* <View style={{
          width: 340, flexDirection: 'column', justifyContent: 'space-around', backgroundColor: '#29313d',
          paddingHorizontal: 35, paddingVertical: 15, alignSelf: 'flex-end', position: 'absolute',
          bottom: 150,alignSelf: 'center',
          borderRadius: 10, borderBottomWidth: 0, height:400
        }}>
          <Text style={{color:'#fff',fontFamily: 'arial,sans-serif',fontSize:17}}>
            CHOOSE YOUR ACCOUNT TO USE
          </Text>

          <TouchableOpacity activeOpacity={0.9} 
          onPress={() => { setLoading(true), hitApi('demo'), setShow(false) }} 
          style={{ flexDirection: 'column', marginBottom: 5,
           borderBottomWidth: 0.5, borderColor: 'grey', paddingBottom: 5, backgroundColor:'#3f444b',
           textAlign:'center',flexDirection: 'row',alignItems: 'center'}}>
             <Image source={require('../../assets/botz/realacc.png')} 
             style={{width:35,height: 34,marginLeft:10}}
             resizeMode={'stretch'}
             />
     <View style={{flexDirection: 'column',marginLeft:10}}>

            <Text style={{ color: colors.losscolor1,fontSize: 16, fontFamily: 'arial,sans-serif',margin:5 }}>${global.demobal}</Text>
            <Text style={{ color: colors.selected,fontSize: 13, fontFamily: 'arial,sans-serif',margin:5 }}>PRACTICE ACCOUNT</Text>
     </View>
          </TouchableOpacity>
          
          
          <TouchableOpacity activeOpacity={0.9}
           onPress={() => { setLoading(true), hitApi('live'), setShow(false) }} 
           style={{ flexDirection: 'column',  marginBottom: 5, 
           borderBottomWidth: 0.5, borderColor: 'grey', paddingBottom: 5, backgroundColor:'#3f444b',
           textAlign:'center',flexDirection: 'row',alignItems: 'center'}}>
           <Image source={require('../../assets/botz/demoacc.png')} 
           style={{width:35,height: 34,marginLeft:10}}
           resizeMode={'stretch'}
           />
             <View style={{flexDirection: 'column',marginLeft:10}}>
            <Text style={{ color: colors.profitcolor1,fontSize: 16, fontFamily: 'arial,sans-serif',margin:5 }}>${global.livebal}</Text>
            <Text style={{ color: colors.selected,fontSize: 13, fontFamily: 'arial,sans-serif',margin:5 }}>REAL ACCOUNT</Text>
         </View>
          </TouchableOpacity>
          
          </View> */}
      </Modal>

      <Modal
        onBackButtonPress={() => {
          setShowDep(false);
        }}
        statusBarTranslucent={true}
        deviceHeight={1000}
        onBackdropPress={() => {
          setShowDep(false);
        }}
        isVisible={showDep}
        useNativeDriver={true}
        animationIn={'slideInDown'}
        animationOut={'slideOutUp'}
        backdropColor="white"
        // contentContainerStyle={{width:'100%'}}
        transparent={true}
        backdropOpacity={0.1}>
        <ImageBackground
          source={require('../../assets/botz/deparrow.jpg')}
          resizeMode={'stretch'}
          style={{
            flexDirection: 'column',
            width: 370,
            height: 450,

            paddingHorizontal: 35,
            paddingVertical: 15,
            alignSelf: 'center',
            // position: 'absolute',
            // top: 65,
            // borderRadius: 10, borderBottomWidth: 0, width: 300,
          }}>
          <View style={{position: 'absolute', top: 280}}>
            <Text
              style={{
                color: '#6D788E',
                position: 'absolute',
                bottom: 120,
                textAlign: 'center',
                marginHorizontal: 20,
                alignSelf: 'center',
                lineHeight: 25,
              }}>
              {global.depTxt}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                width: 340,
                justifyContent: 'space-between',
                marginHorizontal: 20,
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  setShowDep(false);
                }}
                style={{
                  backgroundColor: '#232B3E',
                  width: 160,
                  alignItems: 'center',
                  paddingVertical: 5,
                  borderRadius: 5,
                }}>
                {/* <Text style={{ color: colors.selected }}>$700</Text> */}
                <Text style={{color: colors.selected}}>
                  NOT NOW
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  navigation.navigate('DepositScreen');
                }}
                style={{
                  backgroundColor: '#2DAB40',
                  width: 160,
                  alignItems: 'center',
                  paddingVertical: 5,
                  marginRight: 5,
                  borderRadius: 5,
                }}>
                {/* <Text style={{ color: colors.selected }}>$400</Text> */}
                <Text style={{color: colors.selected, }}>
                  DEPOSIT
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              bottom: 10,
              position: 'absolute',
              alignSelf: 'center',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#2DAB40',
                borderRadius: 5,
                width: '40%',
                marginHorizontal: '5%',
                height: 80,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialCommunityIcons
                name={'arrow-top-right'}
                size={28}
                color={colors.selected}
              />

              <Text style={{color: colors.selected, fontWeight: 'bold'}}>
                BUY
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#DA4A32',
                borderRadius: 5,
                width: '40%',
                marginHorizontal: '5%',
                height: 80,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialCommunityIcons
                name={'arrow-bottom-right'}
                size={28}
                color={colors.selected}
              />

              <Text style={{color: colors.selected, fontWeight: 'bold'}}>
                SELL
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </Modal>

      <Animatable.View animation="fadeIn" style={styles.footer}>
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            alignSelf: 'center',
            borderBottomColor:'grey',
            borderBottomWidth:0.2,
          }}>
          <TouchableOpacity
            // onPress={() => {
            //   ResetFn(), signOut();
            // }}
            onPress={() => {
              navigation.openDrawer();
            }}
            style={{
              alignSelf: 'flex-end',
              padding: 10,
              paddingRight: 0,
              marginLeft: 0,
              width: '15%',
              justifyContent: 'center',
            }}>
             <FontAwesome name={'power-off'} size={27} color={'#f0f0f0'} /> 
            <Image
              style={{width: 25, height: 25,marginBottom:5}}
              resizeMode={'stretch'}
              source={require('../../assets/botz/homepagefx.png')}
            /> 
            <LottieView ref={AnimationRef} source={require('../../assets/botz/game/menubutton.json')} 
                                        style={{width:30,height:30,marginBottom:5}} autoPlay loop={true} />
          </TouchableOpacity>
          <View>
            <Image
              source={require('../../assets/logofx.png')}
              style={{
                marginTop: 35,
                marginBottom: 10,
                alignSelf: 'center',
                width: 140,
                height: 45,
              }}
              resizeMode="stretch"
            />
          </View>
          <TouchableOpacity
             onPress={() => {
               ResetFn(), signOut();
            }}
            style={{
              alignSelf: 'flex-end',
              padding: 10,
              paddingRight: 0,
              marginLeft: 0,
              width: '15%',
              justifyContent: 'center',
            }}>
            <FontAwesome name={'power-off'} size={27} color={'#f0f0f0'} />
            
          </TouchableOpacity>
        </View> */}
        <View
                style={{
                  height: 160,
                  marginTop: 10,
                  display: hideBlock ? 'none' : 'flex',
                }}>
                <Swiper
                  dot={
                    <View
                      style={{
                        backgroundColor: '#fff',
                        width: 5,
                        height: 5,
                        borderRadius: 4,
                        marginHorizontal: 3,
                        alignSelf: 'center',
                      }}
                    />
                  }
                  activeDot={
                    <View
                      style={{
                        backgroundColor: "#36D60C",
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: 3,
                      }}
                    />
                  }
                  loadMinimal={true}
                  autoplay={true}
                  autoplayTimeout={8}
                  showsPagination={true}
                  paginationStyle={{
                    justifyContent: 'center',
                    position: 'relative',
                    alignItems: 'center',
                    alignSelf: 'center',
                    top: -15,
                  }}
                  loadMinimalLoader={
                    <ActivityIndicator size={40} color="#d0d0d0" />
                  }>
                  <Image
                    resizeMode="stretch"
                    source={require('../../assets/Fxbot/slides/slide1.png')}
                    style={{alignSelf: 'center', width: '100%', height: 160}}
                  />
                  <Image
                    source={require('../../assets/Fxbot/slides/slide2.png')}
                    style={{
                      alignSelf: 'center',
                      width: '100%',
                      height: 160,
                      resizeMode: 'stretch',
                    }}
                  />
                  <Image
                    source={require('../../assets/Fxbot/slides/slide3.png')}
                    style={{alignSelf: 'center', width: '100%', height: 160}}
                  />
                  <Image
                    source={require('../../assets/Fxbot/slides/slide4.png')}
                    style={{alignSelf: 'center', width: '100%', height: 160}}
                  />
                  <Image
                    source={require('../../assets/Fxbot/slides/slide5.png')}
                    style={{alignSelf: 'center', width: '100%', height: 160}}
                  />

                  <Image
                    source={require('../../assets/Fxbot/slides/slide6.png')}
                    style={{alignSelf: 'center', width: '100%', height: 160}}
                  />
                  <Image
                    source={require('../../assets/Fxbot/slides/slide7.png')}
                    style={{alignSelf: 'center', width: '100%', height: 160}}
                  />
                </Swiper>
              </View>
        

       

        <ScrollView style={{flex:1}}>
        <View style={{flexDirection:'row',width:'100%',height:70,justifyContent:'space-between',alignItems:'center',marginTop:10}}>
            <View style={{flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',height:55,width:'100%'}}>
            <TouchableOpacity onPress={()=>{navigation.navigate("DepositScreen")}}>
<ImageBackground source={require('../../assets/temp/market-box-bg.png')} resizeMode="stretch" style={{width:170,height:60,justifyContent:'space-evenly',flexDirection:'row',alignItems:'center'}}>
                {/* <Image source={require('../../assets/temp/deposit-icon.png')} resizeMode="contain" style={{widht:15,height:25,}}></Image> */}
                <LottieView ref={AnimationRef} source={require('../../assets/botz/game/deposite.json')} 
                                        style={{width:40,height:40}} autoPlay loop={true} />
                <Text style={{color:'#fff',fontSize:15,fontWeight:'500'}}>Deposit</Text>
              </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{navigation.navigate("Withdraw")}}>
              <ImageBackground source={require('../../assets/temp/market-box-bg.png')} resizeMode="stretch" style={{width:170,height:60,justifyContent:'space-evenly',flexDirection:'row',alignItems:'center'}}>
                {/* <Image source={require('../../assets/temp/withdraw-icon.png')} resizeMode="contain" style={{widht:15,height:25,}}></Image> */}
                <LottieView ref={AnimationRef} source={require('../../assets/botz/game/wd1.json')} 
                                        style={{width:30,height:35}} autoPlay loop={true} />
                <Text style={{color:'#fff',fontSize:15,fontWeight:'500'}}>Withdraw</Text>
              </ImageBackground>
              </TouchableOpacity>
            </View>
       </View>
          <View style={{flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',width:'100%',height:100,paddingHorizontal:10,top:10}}>
                  <ImageBackground source={require('../../assets/temp/four-icon-bg.png')} resizeMode='contain' style={{width:85,height:95,justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity
                    onPress={() => {
                      if (!global.lg_without_pwd) {
                        navigation.navigate('APIBinding');
                        // navigation.navigate('HedgeAuto');
                      } else {
                        ToastAndroid.show(
                          'Please Activate Your ID',
                          ToastAndroid.SHORT,
                        );
                      }
                    }}
                    style={styles1.bx}
                    useNativeDriver={true}>
                    <Image
                      source={require('../../assets/temp/icon4.png')}
                      style={styles1.icons}
                      resizeMode={'contain'}
                    />
                    <Text
                      style={[
                        styles1.text,
                        {
                          color: colors.border,
                          textAlign: 'center',
                          fontWeight: 'bold',
                          fontSize: 11,
                        },
                      ]}>
                      LINK ACCOUNT{' '}
                    </Text>
                  </TouchableOpacity>
                  {/* <Image
                      source={require('../../assets/temp/icon4.png')}
                      style={{width: 30, height: 30}}
                      resizeMode={'stretch'}
                    /> */}
                  </ImageBackground>
                  <ImageBackground source={require('../../assets/temp/four-icon-bg.png')} resizeMode='contain' style={{width:85,height:95,justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity
                    onPress={() => {
                      {
                        navigation.navigate('Revenue');
                      }
                    }}
                    style={styles1.bx}
                    useNativeDriver={true}>
                    <Image
                      resizeMode={'contain'}
                      style={styles1.icons}
                      source={require('../../assets/temp/icon3.png')}
                    />
                    <Text
                      style={[
                        styles1.text,
                        {
                          color: colors.border,
                          textAlign: 'center',
                          fontWeight: 'bold',
                          fontSize: 11,
                        },
                      ]}>
                      PROFIT{' '}
                    </Text>
                  </TouchableOpacity>
                  {/* <Image
                      source={require('../../assets/temp/icon3.png')}
                      style={{width: 30, height: 30}}
                      resizeMode={'stretch'}
                    /> */}
                  </ImageBackground>
                  <ImageBackground source={require('../../assets/temp/four-icon-bg.png')} resizeMode='contain' style={{width:85,height:95,justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('TransactionScreen');
                    }}
                    style={styles1.bx}
                    useNativeDriver={true}>
                    <Image
                      resizeMode={'contain'}
                      style={styles1.icons}
                      source={require('../../assets/temp/icon2.png')}
                    />
                    <Text
                      style={[
                        styles1.text,
                        {
                          color: colors.border,
                          textAlign: 'center',
                          width: 60,
                          fontWeight: 'bold',
                          fontSize: 11,
                        },
                      ]}>
                      TRADES
                    </Text>
                  </TouchableOpacity>
                  {/* <Image
                      source={require('../../assets/temp/icon2.png')}
                      style={{width: 30, height: 30}}
                      resizeMode={'stretch'}
                    /> */}
                  </ImageBackground>
                  <ImageBackground source={require('../../assets/temp/four-icon-bg.png')} resizeMode='contain' style={{width:85,height:95,justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      navigation.navigate('ProfileDetails');
                    }}
                    style={styles1.bx}
                    useNativeDriver={true}>
                    <Image
                      resizeMode={'contain'}
                      style={
                        global.autoStatus === 'False'
                          ? styles1.icons
                          : styles1.icons1
                      }
                      source={require('../../assets/temp/icon1.png')}
                    />
                    <Text
                      style={[
                        styles1.text,
                        {
                          color: colors.border,
                          textAlign: 'center',
                          fontWeight: 'bold',
                          fontSize: 11,
                        },
                      ]}>
                      PORTFOLIO
                    </Text>
                  </TouchableOpacity>
                  {/* <Image
                      source={require('../../assets/temp/icon1.png')}
                      style={{width: 30, height: 30}}
                      resizeMode={'stretch'}
                    /> */}
                  </ImageBackground>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',width:'100%',height:100,paddingHorizontal:10,top:10}}>
                  <ImageBackground source={require('../../assets/temp/four-icon-bg.png')} resizeMode='contain' style={{width:85,height:95,justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity
                    // onPress={() => {
                    //   navigation.navigate('Web', {
                    //     url:
                    //       global.BASE_URL +
                    //       'm/homebot.aspx?uid=' +
                    //       Uid +
                    //       '&pwd=' +
                    //       My_Pwd,
                    //   });
                    // }}
                    onPress={() => {
                      navigation.navigate('OrderHistory');
                    }}
                    style={styles1.bx}
                    useNativeDriver={true}>
                    <Image
                      resizeMode={'contain'}
                      style={styles1.icons}
                      source={require('../../assets/temp/icon5.png')}
                    />
                    <Text
                      style={[
                        styles1.text,
                        {
                          color: colors.border,
                          textAlign: 'center',
                          fontWeight: 'bold',
                          fontSize: 11,
                        },
                      ]}>
                      ORDERS
                    </Text>
                  </TouchableOpacity>
                  {/* <Image
                      source={require('../../assets/temp/icon5.png')}
                      style={{width: 30, height: 30}}
                      resizeMode={'stretch'}
                    /> */}
                  </ImageBackground>
                  <ImageBackground source={require('../../assets/temp/four-icon-bg.png')} resizeMode='contain' style={{width:85,height:95,justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity
                    onPress={() => {
                      // global.activeId?
                      navigation.navigate('Invite');
                      // : ToastAndroid.show(
                      //     'Please Activate your ID first!',
                      //     ToastAndroid.LONG,
                      //   );
                    }}
                    style={styles1.bx}
                    useNativeDriver={true}>
                    <Image
                      resizeMode={'contain'}
                      style={styles1.icons}
                      source={require('../../assets/temp/icon6.png')}
                    />
                    <Text
                      style={[
                        styles1.text,
                        {
                          color: colors.border,
                          textAlign: 'center',
                          fontWeight: 'bold',
                          fontSize: 11,
                        },
                      ]}>
                      REFER{' '}
                    </Text>
                  </TouchableOpacity>
                  {/* <Image
                      source={require('../../assets/temp/icon6.png')}
                      style={{width: 30, height: 30}}
                      resizeMode={'stretch'}
                    /> */}
                  </ImageBackground>
                  <ImageBackground source={require('../../assets/temp/four-icon-bg.png')} resizeMode='contain' style={{width:85,height:95,justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('RewardDetails');
                    }}
                    style={styles1.bx}
                    useNativeDriver={true}>
                    <Image
                      resizeMode={'contain'}
                      style={styles1.icons}
                      source={require('../../assets/temp/icon7.png')}
                    />
                    <Text
                      style={[
                        styles1.text,
                        {
                          color: colors.border,
                          textAlign: 'center',
                          width: 60,
                          fontWeight: 'bold',
                          fontSize: 11,
                        },
                      ]}>
                      EARNING
                    </Text>
                  </TouchableOpacity>
                  {/* <Image
                      source={require('../../assets/temp/icon7.png')}
                      style={{width: 30, height: 30}}
                      resizeMode={'stretch'}
                    /> */}
                  </ImageBackground>
                  <ImageBackground source={require('../../assets/temp/four-icon-bg.png')} resizeMode='contain' style={{width:85,height:95,justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity
                    onPress={() => {
                      
                      navigation.navigate('CoinProfitScreen')
                    }}
                    style={styles1.bx}
                    useNativeDriver={true}>
                    <Image
                      resizeMode={'contain'}
                      style={styles1.icons}
                      source={require('../../assets/temp/icon8.png')}
                    />
                    <Text
                      style={[
                        styles1.text,
                        {
                          color: colors.border,
                          textAlign: 'center',
                          fontWeight: 'bold',
                          fontSize: 11,
                        },
                      ]}>
                      PAIRWISE
                    </Text>
                  </TouchableOpacity>
                  {/* <Image
                      source={require('../../assets/temp/icon8.png')}
                      style={{width: 30, height: 30}}
                      resizeMode={'stretch'}
                    /> */}
                  </ImageBackground>
          </View>
          {global.AMT != 0 ? 
          <View style={{width:'90%',alignSelf:'center',flexDirection: 'row',justifyContent:'space-between',marginVertical:20,marginTop:30}}>
                      {/* <View style={{}}> */}
                        <TouchableOpacity  onPress={() => {
      if (!global.lg_without_pwd) {
        navigation.navigate('Circle');
      } else {
        ToastAndroid.show(
          'Sorry... Visitors are not allowed in here',
          ToastAndroid.SHORT,
        );
      }
    }}>
                          <Text style={{color: colors.yellow,width:100,fontWeight:'bold',borderBottomWidth:1,borderColor:colors.yellow,paddingBottom:3}} numberOfLines={1}>TOP TRADERS</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={() => {
      if (!global.lg_without_pwd) {
        navigation.navigate('TopLeaders');
      } else {
        ToastAndroid.show(
          'Sorry... Visitors are not allowed in here',
          ToastAndroid.SHORT,
        );
      }
    }}>
                          <Text style={{color: colors.yellow,width:100,fontWeight:'bold',borderBottomWidth:1,borderColor:colors.yellow,paddingBottom:3}} numberOfLines={1}>RANK ACHIEVERS</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={() => {
      if (!global.lg_without_pwd) {
        navigation.navigate('TopEarners');
      } else {
        ToastAndroid.show(
          'Sorry... Visitors are not allowed in here',
          ToastAndroid.SHORT,
        );
      }
    }}>
                          <Text style={{color: colors.yellow,width:100,fontWeight:'bold',borderBottomWidth:1,borderColor:colors.yellow,paddingBottom:3}} numberOfLines={1}>TOP EARNERS</Text>
                        </TouchableOpacity>
                      {/* </View> */}
              </View>:null}
                {/* <Text style={{color: colors.green1,fontWeight:'bold'}}>TOP 10 GAMES</Text> */}
              <ImageBackground source={require('../../assets/Fxbot/home/bg1.png')} style={{width:'98%',alignSelf:'center',marginVertical:10}}>
                <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems:'center',}}>
                  <TouchableOpacity style={{justifyContent:'space-between',marginLeft:15}}   onPress={() => {
                        global.AMT > 0
                          ? navigation.navigate('SignalTrading')
                          : ToastAndroid.show(
                              'Please Activate Your Id First',
                              ToastAndroid.SHORT,
                            );
                      }}>

                  <Image source={require('../../assets/Fxbot/home/icon.png')} style={{width:65,height:66}} resizeMode={'stretch'} />
                  <Text style={{color:'#fff',fontWeight:'bold',fontSize:12,textAlign:'center'}}>SIGNALS</Text>
                  </TouchableOpacity>
                  <Image source={require('../../assets/Fxbot/home/bull.png')} style={{width:300,height:140}} resizeMode={'contain'} />
                </View>
                </ImageBackground>
              
          {Data10 && Data10 != null ? (
                <View
                  style={{
                    width: '96%',
                    alignSelf: 'center',
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    marginTop: 10,
                    
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingRight: 0,
                    }}>
                    <Text
                      style={{
                        color: colors.selected,
                        marginBottom: 10,
                        fontWeight: 'bold',
                        fontSize: 14,
                      }}>
                      TOP 10 {coinStatus ? 'LOSERS' : 'GAINERS'}
                    </Text>
                    <TouchableOpacity
                      style={{paddingHorizontal: 5}}
                      onPress={() => {
                        setCoinStatus(!coinStatus);
                      }}>
                      <FontAwesome5
                        name="exchange-alt"
                        size={20}
                        color={coinStatus ? '#00a65a' : 'red'}
                        style={{
                          backgroundColor: '#000',
                          padding: 5,
                          borderRadius: 5,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{flexDirection: 'row'}}>
 
                   
                   
                    <FlatList
                      horizontal={true}
                      data={
                        coinStatus
                          ? Data10.sort(
                              (a, b) => parseFloat(a.pcp) > parseFloat(b.pcp),
                            )
                          : Data10.sort(
                              (a, b) => parseFloat(a.pcp) < parseFloat(b.pcp),
                            )
                      }
                      initialNumToRender={5}
                      // extraData={Data}
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={{
                       marginTop:10
                      }}
                      removeClippedSubviews={true}
                      keyExtractor={(item, index) => index}
                      renderItem={({item, index}) =>
                        index < 10 ? (
                          <TouchableOpacity
                            onPress={() => {
                              if(global.freeUser=='true'){
                                ToastAndroid.show("Your Demo Account has Expired , Please Activate you Id!",ToastAndroid.SHORT)
                                return
                              }
                              if (global.api_key == '') {
                                navigation.navigate('APIBinding');
                              } else {
                                SendToInner(
                                  item.sym,
                                  item.img,
                                  item.st,
                                  item.tp.toUpperCase(),
                                  item.strtamt,
                                  item.qty,
                                  item.qty1,
                                  item.liq,
                                  item.st.toLowerCase() === 'false'
                                    ? 0
                                    : item.strtamt != ''
                                    ? parseFloat(item.strtamt) <
                                      parseFloat(item.last_price)
                                      ? (
                                          ((parseFloat(item.strtamt) -
                                            parseFloat(item.last_price)) /
                                            parseFloat(item.last_price)) *
                                          100
                                        ).toFixed(2)
                                      : (
                                          ((parseFloat(item.last_price) -
                                            parseFloat(item.strtamt)) /
                                            parseFloat(item.last_price)) *
                                          100
                                        ).toFixed(2)
                                    : 0,
                                  item.bst,
                                  item.avg,
                                  item.usdt,
                                  item.bst1,
                                  item.x_hprice,
                                  item.x_lprice,
                                  item.x_prev_cprice,
                                  item.x_askprice,
                                  item.x_bidprice,
                                  item.side,
                                  item.iscopy,
                                  item.myusdt,
                                  item.buy,
                                  item.sell,
                                );
                              }
                            }}
                            style={[
                              index + 1 == Data10.length
                                ? {marginRight: 20}
                                : {marginRight: 10},
                              {
                               
                              },
                            ]}>
                              <ImageBackground source={mainbg} resizeMode='stretch' style={{width:145,height:160,alignItems:'center',marginHorizontal:5}}>
                          <View style={{flexDirection:'column',justifyContent:'space-evenly',width:'100%',alignItems:'center',height:'100%'}}> 
                          <View style={{flexDirection:'row',justifyContent:'flex-start',paddingLeft:10,alignItems:'center',width:'100%'}}>
                          <Image
                          source={{uri: 'http://' + item.img}}
                          style={{width: 20, height: 20}}
                          // resizeMode={'stretch'}
                        />
                        <Text style={{color:"#fff",fontSize:15,fontWeight:'500',marginLeft:10}}>{item.sym}</Text>
                          </View>
                          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%',top:30}}>
                          
                    <Text style={{color:"grey",fontSize:10,fontWeight:'500',marginLeft:15}}>{coinStatus ? 'LOSERS' : 'GAINERS'}</Text>
                    {parseFloat(item.pcp) > 0 ? (
                              <Text
                              style={{color:"green",fontSize:10,fontWeight:'500',marginRight:15}}>
                                {' '}
                                +{item.pcp}
                              </Text>
                            ) : (
                              <Text
                              style={{color:"red",fontSize:10,fontWeight:'500',marginRight:15}}>
                                {' '}
                                {item.pcp}
                              </Text>
                            )}
                   
                          </View>
                          <Text style={{color:"#fff",fontSize:20,fontWeight:'600',alignSelf:'flex-start',top:15,marginLeft:15}}>${item.last_price}</Text>
                          </View>
                        </ImageBackground>
                            
                          </TouchableOpacity>
                        ) : null
                      }
                    />
                  </View>
                </View>
              ) : null}
              {global.AMT != 0 ? 
            <View style={{width:'94%',alignSelf:'center',marginVertical:10,flexDirection:'row',justifyContent: 'space-between'}}>
                  <TouchableOpacity style={{width:'48%'}} onPress={()=>{navigation.navigate('SuperBotScreen')}}>

                  <Image source={require('../../assets/Fxbot/home/ban1.png')} style={{width:'100%',height:90}} resizeMode={'stretch'} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{width:'48%'}} onPress={()=>{navigation.navigate('HedgeBot')}}>

                  <Image source={require('../../assets/Fxbot/home/ban2.png')} style={{width:'100%',height:90}} resizeMode={'stretch'} />
                  </TouchableOpacity>
                </View>:null}
          
          {/* <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      top:10,
                      marginBottom:'0.5%'
                    }}>
                    <Text
                      style={{marginLeft: 10, fontSize: 18, color: '#d0d0d0'}}>
                     Your Assets
                    </Text>
                        <Text style={{color: colors.selected}}>
                         See All
                        </Text>
                  </View>
                 
                  {Data10 && Data10 != null ? (
                      <FlatList
                      horizontal={true}
                      data={
                        coinStatus
                          ? Data10.sort(
                              (a, b) => parseFloat(a.pcp) > parseFloat(b.pcp),
                            )
                          : Data10.sort(
                              (a, b) => parseFloat(a.pcp) < parseFloat(b.pcp),
                            )
                      }
                      initialNumToRender={5}                                            
                      contentContainerStyle={{
                      
                      
                        marginTop:10
                      }}
                      removeClippedSubviews={true}
                      keyExtractor={(item, index) => index}
                      renderItem={({item, index}) => (
                        <ImageBackground source={mainbg} resizeMode='stretch' style={{width:145,height:160,alignItems:'center',marginHorizontal:5}}>
                          <View style={{flexDirection:'column',justifyContent:'space-evenly',width:'100%',alignItems:'center',height:'100%'}}> 
                          <View style={{flexDirection:'row',justifyContent:'flex-start',paddingLeft:10,alignItems:'center',width:'100%'}}>
                          <Image
                          source={{uri: 'http://' + item.img}}
                          style={{width: 30, height: 30}}
                          resizeMode={'stretch'}
                        />
                        <Text style={{color:"#fff",fontSize:15,fontWeight:'500',marginLeft:10}}>{item.sym}</Text>
                          </View>
                          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%',top:30}}>
                          
                    <Text style={{color:"grey",fontSize:10,fontWeight:'500',marginLeft:15}}>GAINERS</Text>
                    <Text style={{color:"green",fontSize:10,fontWeight:'500',marginRight:15}}>+{item.pcp}</Text>
                          </View>
                          <Text style={{color:"#fff",fontSize:20,fontWeight:'600',alignSelf:'flex-start',top:15,marginLeft:15}}>$151.15151</Text>
                          </View>
                        </ImageBackground>
                      )}

                        />
                    ):null} */}


                 
                 
                  

                
         

          {/* <View style={{flexDirection:'row',justifyContent: 'space-around',paddingVertical:3,alignItems: 'center',widht:'80%',paddingHorizontal:15}}>
        {/* <Image  resizeMode={'stretch'}    style={{  width: 45, height:40,}} source={require('../../assets/iconh/sound.png')} />
                  <Text style={{color:colors.text,marginLeft:15}}>the Royal Q platform once again reminds users to pre...</Text> 
        </View> */}

          {/* <View style={{flexDirection:'row',justifyContent: 'space-around',marginTop:-50}}> 
                <ImageBackground source={require('../../assets/box.png')} style={{width:120,height:120,alignItems: 'center',justifyContent: 'center'}}>
                 <View style={{width:'50%',alignSelf: 'center',borderRadius:20,flexDirection:'column',justifyContent: 'space-evenly',alignItems: 'center',paddingVertical:5,paddingHorizontal:0}}>
                          <TouchableOpacity  onPress={()=>{navigation.navigate('DepositScreen')}}>
                          <Image  resizeMode={'contain'}    style={{  width: 55, height:50}} source={require('../../assets/icon1x.png')} />                          
                          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingTop:0}}>
                          <Text style={[styles1.text,{color:colors.selected,fontSize:13}]}>DEPOSIT</Text>
                          <Image  source={require('../../assets/arrow1s.png')} style={{width:10,height:15,marginLeft:5}} resizeMode={'stretch'}  />
                          </View>
                          </TouchableOpacity> 
                    </View> 
                          </ImageBackground>                  
                  <ImageBackground source={require('../../assets/box.png')} style={{width:120,height:120,alignItems: 'center',justifyContent: 'center'}}>
                  <View style={{width:'50%',alignSelf: 'center',borderRadius:20,flexDirection:'column',justifyContent: 'space-between',alignItems: 'center',paddingVertical:5,paddingHorizontal:0}}>
                          <TouchableOpacity  onPress={()=>{
                                //console.log("amtis" + global.AMT)
                                if (global.AMT==0)
                                {
                                  ToastAndroid.show(`Please Activate Your Id First With ${global.ReqValue} USDT`,ToastAndroid.SHORT)
                                  navigation.navigate('DepositScreen')
                                }
                                else
                                {                                  
                                  navigation.navigate('Withdraw')
                                }
                          }}>
                          <Image  resizeMode={'contain'}    style={{  width: 55, height:50,marginLeft:5,marginBottom:-15,marginTop:10}} 
                          source={require('../../assets/wallter.png')} />
                          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:10}}>

                          <Text style={[styles1.text,{color:colors.selected,fontSize:13}]}>WITHDRAW</Text>
                          <Image  source={require('../../assets/arrow1s.png')} style={{width:10,height:15,marginLeft:3}} resizeMode={'stretch'}  />
                          </View>
                          </TouchableOpacity>  
                    </View> 
                          </ImageBackground>                 
                  </View> */}

          {parseFloat(btcptp) == '0' ? null : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                display: 'none',
                width: '100%',
                paddingVertical: 10,
                paddingHorizontal: 5,
              }}>
              <View style={{width: '30%', marginLeft: '0%'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: colors.appGrey, fontSize: 12}}>
                    BTC/USDT
                  </Text>
                  <Text
                    style={{
                      color:
                        parseFloat(btcptp) > 0
                          ? colors.profitcolor
                          : colors.losscolor,
                      fontSize: 12,
                      marginLeft: 2,
                    }}>
                    {parseFloat(btcptp) > 0 ? '+' + btcptp : btcptp}%
                  </Text>
                </View>
                <Text
                  style={{
                    color: parseFloat(btcptp) > 0 ? '#32C79F' : '#cc3545',
                    fontSize: 18,
                  }}>
                  {btcrate}
                </Text>
                <Text style={{color: colors.appGrey, fontSize: 14}}>
                  ≈ ₹{(parseFloat(btcinr) * 80).toFixed(2)}
                </Text>

                <Image
                  source={parseFloat(btcptp) > 0 ? randomImage : randomImage3}
                  resizeMode={'stretch'}
                  style={{
                    width: '60%',
                    height: 30,
                    marginTop: 5,
                    marginLeft: 10,
                  }}
                />
              </View>
              <View style={{width: '30%', marginHorizontal: '0%'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: colors.appGrey, fontSize: 12}}>
                    BNB/USDT
                  </Text>
                  <Text
                    style={{
                      color:
                        parseFloat(bnbptp) > 0
                          ? colors.profitcolor
                          : colors.losscolor,
                      fontSize: 12,
                      marginLeft: 2,
                    }}>
                    {parseFloat(bnbptp) > 0 ? '+' + bnbptp : bnbptp}%
                  </Text>
                </View>
                <Text
                  style={{
                    color: parseFloat(bnbptp) > 0 ? '#32C79F' : '#cc3545',
                    fontSize: 18,
                  }}>
                  {bnbrate}
                </Text>
                <Text style={{color: colors.appGrey, fontSize: 14}}>
                  ≈ ₹{(parseFloat(bnbinr) * 80).toFixed(2)}
                </Text>
                <Image
                  source={parseFloat(bnbptp) > 0 ? randomImage1 : randomImage4}
                  resizeMode={'stretch'}
                  style={{
                    width: '60%',
                    height: 30,
                    marginTop: 5,
                    marginLeft: 10,
                  }}
                />
              </View>
              <View style={{width: '30%', marginRight: '0%'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: colors.appGrey, fontSize: 12}}>
                    ETH/USDT
                  </Text>
                  <Text
                    style={{
                      color:
                        parseFloat(ethptp) > 0
                          ? colors.profitcolor
                          : colors.losscolor,
                      fontSize: 12,
                      marginLeft: 2,
                    }}>
                    {parseFloat(ethptp) > 0 ? '+' + ethptp : ethptp}%
                  </Text>
                </View>
                <Text
                  style={{
                    color: parseFloat(ethptp) > 0 ? '#32C79F' : '#cc3545',
                    fontSize: 18,
                  }}>
                  {ethrate}
                </Text>
                <Text style={{color: colors.appGrey, fontSize: 14}}>
                  ≈ ₹{(parseFloat(ethinr) * 80).toFixed(2)}
                </Text>
                <Image
                  source={parseFloat(ethptp) > 0 ? randomImage2 : randomImage5}
                  resizeMode={'stretch'}
                  style={{
                    width: '60%',
                    height: 30,
                    marginTop: 5,
                    marginLeft: 10,
                  }}
                />
              </View>
            </View>
          )}
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: 'transparent',
              alignItems: 'center',
              paddingVertical: 0,
              paddingHorizontal: 5,
            }}>
            <TextTicker
              style={{ fontSize: 15, color: colors.selected }}
              duration={5000}
              loop
              repeatSpacer={100}>
              {ScrollDta}
            </TextTicker>
            {global.demo === 'true' ? (
              <View style={{ flexDirection: 'row' }}>
               
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Invest');
                  }}
                  style={{
                    backgroundColor: '#00a9ff',
                    justifyContent: 'center',
                    borderRadius: 5,
                    paddingHorizontal: 5,display: 'none'
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      textAlign: 'center',
                      color: colors.selected,
                    }}>
                    Invest
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View> */}

          <View
            style={{
              flexDirection: 'row',
              borderRadius: 5,
              justifyContent: 'flex-start',
              // elevation: 10,
              borderBottomWidth: 0.5,
              borderBottomColor: 'grey',
              // backgroundColor: colors.inner_bg,
              alignItems: 'center',
              width: '96%',
              alignSelf: 'center',
            }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setPositionPanel(true), setOpenPanel(false);
              }}
              style={{marginRight: 10}}>
              <Text
                style={[
                  styles.heading,
                  {
                    color: colors.selected,
                    marginTop: 0,
                    fontSize: 13,
                    marginLeft: 5,
                    paddingVertical: 5,
                  },
                ]}>
                Positions :(
                {OpenPanel?total_count: Data ? Dta_filter().filter(e => e.opens !== 'True').length : ' 0'} )
                {/* {Data?Dta_filter().length:0} */}
                
              </Text>
              <View
                style={[
                  positionPanel
                    ? {borderBottomWidth: 2, borderColor: colors.binanceylw2}
                    : {},
                  {height: 5, width: 30, alignSelf: 'center'},
                ]}></View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setPositionPanel(false), setOpenPanel(false);
              }}
              style={{}}>
              <Text
                style={[
                  styles.heading,
                  {
                    color: colors.selected,
                    marginTop: 0,
                    display: 'flex',
                    fontSize: 13,
                    marginLeft: 5,
                    paddingVertical: 5,
                  },
                ]}>
                Copy Trades : ({' '}
                {Data ? Data.filter(e => e.ttype == 'copy').length : '0'} )
              </Text>
              <View
                style={[
                  !positionPanel && !OpenPanel
                    ? {borderBottomWidth: 2, borderColor: colors.binanceylw2}
                    : {},
                  {height: 5, width: 30, alignSelf: 'center'},
                ]}></View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setPositionPanel(false), setOpenPanel(true);
              }}
              style={{}}>
              <Text
                style={[
                  styles.heading,
                  {
                    color: colors.selected,
                    marginTop: 0,
                    display: 'flex',
                    fontSize: 13,
                    marginLeft: 5,
                    paddingVertical: 5,
                  },
                ]}>
                Open Trades : ({' '}
                {Data ? Data.filter(e => e.opens == 'True').length : '0'} )
              </Text>
              <View
                style={[
                  !positionPanel && OpenPanel
                    ? {borderBottomWidth: 2, borderColor: colors.binanceylw2}
                    : {},
                  {height: 5, width: 30, alignSelf: 'center'},
                ]}></View>
            </TouchableOpacity>
          </View>
          {!positionPanel && OpenPanel ? (
            !refreshing ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: '5%',
                  alignItems: 'center',
                  paddingTop: 10,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    onRefresh();
                  }}
                  style={{
                    justifyContent: 'flex-end',
                  }}>
                  <Ionicons
                    name={'md-refresh-sharp'}
                    size={30}
                    color={'#fff'}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setRefreshing(true);
                    close_all_orders();
                  }}>
                  <View
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 7,
                      backgroundColor: '#29313c',
                      borderRadius: 2,
                    }}>
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontSize: 13,
                        fontWeight: 'bold',
                      }}>
                      Close All Open Orders
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <ActivityIndicator
                  color={'#FFF'}
                  size={30}
                  style={{marginLeft: '5%'}}
                />
              </View>
            )
          ) : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              {!refreshing ? (
                <TouchableOpacity
                  onPress={() => {
                    onRefresh();
                  }}
                  style={{
                    justifyContent: 'flex-end',
                    marginLeft: '5%',
                    marginTop: 10,
                  }}>
                  <Ionicons
                    name={'md-refresh-sharp'}
                    size={30}
                    color={'#fff'}
                  />
                </TouchableOpacity>
              ) : (
                <View>
                  <ActivityIndicator
                    color={'#FFF'}
                    size={30}
                    style={{marginLeft: '5%'}}
                  />
                </View>
              )}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignSelf: 'flex-end',
                  width: '40%',
                  alignItems: 'center',
                  marginTop: 10,
                  marginRight: 15,
                }}>
                {wait ? (
                  <View>
                    <ActivityIndicator size={20} color={colors.selected} />
                  </View>
                ) : (
                  // <TouchableOpacity
                  //           onPress={() => {
                  //             setWait(true)
                  //            TradeType_all(Mode_all)
                  //           }}
                  //         >
                  //           <View
                  //             style={{
                  //               paddingHorizontal: 10,
                  //               paddingVertical: 7,
                  //               backgroundColor: "#29313c",
                  //               borderRadius: 2,
                  //             }}
                  //           >

                  //             <Text
                  //               style={{
                  //                 color: "#FFFFFF",
                  //                 fontSize: 13,
                  //                 fontFamily: "bold",

                  //               }}
                  //             >
                  //               {Mode_all.toUpperCase()}
                  //             </Text>
                  //           </View>
                  //         </TouchableOpacity>

                  <>
                    <Menu
                      visible={MenuVisible}
                      onDismiss={() => {
                        setMenuVisible(false);
                      }}
                      anchor={
                        <Feather
                          name={'filter'}
                          onPress={() => {
                            setMenuVisible(true);
                          }}
                          size={20}
                          style={{
                            color: colors.selected,
                            paddingVertical: 3,
                            textAlign: 'center',
                            textAlignVertical: 'top',
                            borderRadius: 5,
                            width: 35,
                          }}
                        />
                      }>
                      <Menu.Item
                        onPress={() => {
                          (global.sortHome = 6), setSortStatus(6);
                          setShowData('buy');
                          setMenuVisible(false)
                        }}
                        title="BUY"
                      />
                      <Menu.Item
                        onPress={() => {
                          (global.sortHome = 4), setSortStatus(4);
                          setShowData('sell');
                          setMenuVisible(false)
                        }}
                        title="SELL"
                      />
                      <Menu.Item
                        onPress={() => {
                          (global.sortHome = 5), setSortStatus(5);
                          setShowData('both');
                          setMenuVisible(false)
                        }}
                        title="BOTH"
                      />
                    </Menu>
                  </>
                )}

                <TouchableOpacity
                  onPress={() => {
                    (global.sortHome = 1), setSortStatus(1);
                  }}
                  style={[
                    {
                      alignItems: 'center',
                      backgroundColor: 'white',
                      elevation: 5,
                      borderRadius: 5,
                      padding: 3,
                    },
                    sortStatus == 1
                      ? {backgroundColor: '#000'}
                      : {backgroundColor: normalbg},
                  ]}>
                  <Image
                    style={{width: 20, height: 15, marginVertical: 3}}
                    resizeMode={'stretch'}
                    source={require('../../assets/botz/master/profit-icon.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    (global.sortHome = 2), setSortStatus(2);
                  }}
                  style={[
                    {
                      alignItems: 'center',
                      backgroundColor: 'white',
                      elevation: 5,
                      borderRadius: 5,
                      padding: 3,
                    },
                    sortStatus == 2
                      ? {backgroundColor: '#000'}
                      : {backgroundColor: normalbg},
                  ]}>
                  <Image
                    style={{width: 20, height: 15, marginVertical: 3}}
                    resizeMode={'stretch'}
                    source={require('../../assets/botz/master/loss-icon.png')}
                  />
                  {/* <Entypo name="triangle-down" color={global.topnavyBlue} size={26} /> */}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    (global.sortHome = 3), setSortStatus(3);
                  }}
                  style={[
                    {
                      alignItems: 'center',
                      backgroundColor: 'white',
                      elevation: 5,
                      borderRadius: 5,
                      padding: 3,
                    },
                    sortStatus == 3
                      ? {backgroundColor: '#000'}
                      : {backgroundColor: normalbg},
                  ]}>
                  <Image
                    style={{width: 20, height: 20}}
                    resizeMode={'stretch'}
                    source={require('../../assets/botz/both.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
 <View
      style={{
        marginVertical: 20,
        paddingVertical: 10,
        backgroundColor: '#202B3F',
      }}>
{Data.length > 0 ? (
              <FlatList
                horizontal={false}
                //  refreshControl={
                //    <RefreshControl
                //      refreshing={refreshing}
                //      onRefresh={onRefresh}
                //    />
                //  }
                data={
                  positionPanel
                    ? Data.filter(
                        e =>
                          e.opens !== 'True' &&
                          //cond1

                          ((sortStatus == 1 &&
                            (e.side.toLowerCase() == 'buy'
                              ? (parseFloat(e.last_price) - parseFloat(e.avg)) *
                                  parseFloat(e.qty) >=
                                0
                              : (parseFloat(e.last_price) - parseFloat(e.avg)) *
                                  parseFloat(e.qty) *
                                  -1 >=
                                0)) || //end of cond1
                            //cond2
                            (sortStatus == 2 &&
                              (e.side.toLowerCase() == 'buy'
                                ? (parseFloat(e.last_price) -
                                    parseFloat(e.avg)) *
                                    parseFloat(e.qty) <
                                  0
                                : (parseFloat(e.last_price) -
                                    parseFloat(e.avg)) *
                                    parseFloat(e.qty) *
                                    -1 <
                                  0)) ||
                            sortStatus == 3 ||
                            (sortStatus == 4 &&
                              e.side.toLowerCase() == 'sell') ||
                            (sortStatus == 5 &&
                              (e.side.toLowerCase() == 'buy' ||
                                e.side.toLowerCase() == 'sell')) ||
                            (sortStatus == 6 && e.side.toLowerCase() == 'buy')),
                          
                      )
                    : !positionPanel && OpenPanel
                    ? Data.filter(e => e.opens == 'True')
                    : Data.filter(
                        e =>
                          e.ttype == 'copy' &&
                          //cond1
                          ((sortStatus == 1 &&
                            (e.side.toLowerCase() == 'buy'
                              ? (parseFloat(e.last_price) - parseFloat(e.avg)) *
                                  parseFloat(e.qty) >=
                                0
                              : (parseFloat(e.last_price) - parseFloat(e.avg)) *
                                  parseFloat(e.qty) *
                                  -1 >=
                                0)) || //end of cond1
                            //cond2
                            (sortStatus == 2 &&
                              (e.side.toLowerCase() == 'buy'
                                ? (parseFloat(e.last_price) -
                                    parseFloat(e.avg)) *
                                    parseFloat(e.qty) <
                                  0
                                : (parseFloat(e.last_price) -
                                    parseFloat(e.avg)) *
                                    parseFloat(e.qty) *
                                    -1 <
                                  0)) || 
                            sortStatus == 3), 
                      )
                }
                initialNumToRender={5}                
                contentContainerStyle={{marginHorizontal: 5}}                
                keyExtractor={(item, index) => index}
                renderItem={({item, index}) => (
                  <View
                  key={index}
                   style={[
                     {
                       marginHorizontal:5,
                       
                       backgroundColor: colors.background,
                       borderWidth:
                         item.init_trade.toLowerCase() == 'true' ? 1 : 0,
                       elevation: 3,
                       borderColor: colors.hgl,
                       borderRadius: 5,
                     },
                   ]}>
                   <View
                     style={{
                       flexDirection: 'row',
                       width: '100%',
                       justifyContent: 'space-between',
                       padding: 10,
                     }}>
                     <TouchableOpacity
                       activeOpacity={0.9}
                       onPress={() => {
                         if (global.api_key == '') {
                           navigation.navigate('APIBinding');                             
                         } else {
                           SendToInner(
                             item.sym,
                             item.img,
                             item.st,
                             item.tp.toUpperCase(),
                             item.strtamt,
                             item.qty,
                             item.qty1,
                             item.liq,
                             item.st.toLowerCase() === 'false'
                               ? 0
                               : item.strtamt != ''
                               ? parseFloat(item.strtamt) <
                                 parseFloat(item.last_price)
                                 ? (
                                     ((parseFloat(item.strtamt) -
                                       parseFloat(item.last_price)) /
                                       parseFloat(item.last_price)) *
                                     100
                                   ).toFixed(2)
                                 : (
                                     ((parseFloat(item.last_price) -
                                       parseFloat(item.strtamt)) /
                                       parseFloat(item.last_price)) *
                                     100
                                   ).toFixed(2)
                               : 0,
                             item.bst,
                             item.avg,
                             item.usdt,
                             item.bst1,
                             item.x_hprice,
                             item.x_lprice,
                             item.x_prev_cprice,
                             item.x_askprice,
                             item.x_bidprice,
                             item.side,
                             item.iscopy,
                             item.myusdt,
                             item.buy,
                             item.sell,
                           );
                         }
                       }}
                       style={{
                         alignContent: 'center',
                         justifyContent: 'space-between',
                         flexDirection: 'row',
                         width: '100%',
                       }}>
                       <View style={{flexDirection: 'row'}}>
                         <Image
                           source={{uri: 'http://' + item.img}}
                           //  source={require('../../assets/trd/logo1.png')}
                           resizeMode={'stretch'}
                           style={{
                             width: 25,
                             height: 25,
                             marginTop: 1,
                             alignSelf: 'center',
                           }}
                         />
                         <Text
                           allowFontScaling={false}
                           style={{
                             alignSelf: 'center',
                             color: 'white',
                             marginLeft: 10,
                             fontWeight: 'bold',
                             fontSize: 17,
                           }}>
                           {item.sym}
     
                       
                         </Text>
                       </View>
                       {global.iscopytrade === 'True' ? (
                         <FontAwesome
                           onPress={() => {
                             navigation.navigate('CopiersScreen', {
                               sym: item.sym,
                               side: item.side,
                             });
                           }}
                           name={'book'}
                           size={25}
                           color={'#a0a0a0'}
                         />
                       ) : null}
                     {item.mode && item.mode.toLowerCase()=='demo'?
                     null:
                       <TouchableOpacity 
                        onPress={() => {
                         navigation.navigate('Positions', {
                           sym: item.sym,
                           side: item.side,
                           img:'http://' + item.img
                         });
                       }}
                       >
                       <Image                           
                           source={require('../../assets/botz/bn.png')}
                           style={{width:35,height:35}}                            
                           />
                         </TouchableOpacity>
                           }
                       <Text
                         style={{
                           alignSelf: 'flex-end',
                           color: '#717781',
                           // marginLeft: 20,
                           fontWeight: 'bold',
                           fontSize: 14,
                         }}>
                         Isolated{' '}
                         <Text
                           style={{
                             alignSelf: 'flex-end',
                             color: '#f1f1f1',
                             // marginLeft: 20,
                             fontWeight: 'bold',
                             fontSize: 14,
                           }}>
                           {item.leverage}x
                         </Text>
                       </Text>
                     </TouchableOpacity>
                   </View>
                   <View
                     style={[
                       {
                         flexDirection: 'row',
                         width: '100%',
                         justifyContent: 'space-between',
                         marginTop: 10,
                         alignItems: 'center',
                       },
                     ]}>
                     <View style={{width: '40%'}}>
                       <Text
                         style={{
                           alignSelf: 'flex-start',
                           color: '#717781',
                           marginLeft: 10,
                           fontSize: 13,
                           fontFamily: 'medium',
                         }}>
                         {item.opens == 'True'
                           ? 'Price'
                           : 'Unrealized PNL (USD)'}
                       </Text>
                     </View>
                     <View
                       style={{
                         width: '30%',
                         justifyContent: 'center',
                         alignItems: 'center',
                       }}>
                       <View
                         style={[
                           item.side.toLowerCase() == 'buy'
                             ? {backgroundColor: colors.profitcolor}
                             : {backgroundColor: colors.losscolor},
                           {
                             width: 90,
                             alignItems: 'center',
                             borderRadius: 5,
                             padding: 5,
                             fontSize: 13,
                           },
                         ]}>
                         <Text
                           style={{
                             color: colors.selected,
                             fontFamily: 'arial,sans-serif,bold',
                             fontSize: 13,
                           }}>
                           {item.side == 'SELL'
                             ? 'SELL/SHORT'
                             : item.side == 'BUY'
                             ? 'BUY/LONG'
                             : 'AUTO'}
                         </Text>
                       </View>
                       
                     </View>
                     <FontAwesome
                       onPress={() => {
                         setAlert_pair(item.sym),
                           setAlert_side(item.side),
                           setAlert_Modal(true);
                       }}
                       name={'bell'}
                       size={20}
                       color={colors.border}
                     />
                     <View>
                       <Text
                         style={{
                           alignSelf: 'flex-end',
                           textAlign: 'right',
                           color: '#717781',
                           marginRight: 10,
                           fontSize: 14,
                           fontFamily: 'arial,sans-serif,medium',
                         }}>
                         {item.opens == 'True'
                           ? item.side.toLowerCase() == 'buy'
                             ? 'MODE'
                             : 'MODE'
                           : 'ROE'}
                       </Text>
                     </View>
                   </View>
     
                   <View
                     style={{
                       height: 'auto',
                       width: '100%',
                       alignSelf: 'center',
                       borderRadius: 5,
                       flexDirection: 'column',
                       justifyContent: 'space-evenly',
                       paddingVertical: 5,
                       paddingHorizontal: 10,
                     }}>
                     <Text
                       allowFontScaling={false}
                       style={{
                         display: 'none',
                         fontSize: 12,
                         fontWeight: 'bold',
                         color:
                           parseFloat(item.avg) > parseFloat(item.last_price)
                             ? colors.profitcolor
                             : colors.losscolor,
                       }}>
                       {parseFloat(item.avg) >= parseFloat(item.last_price)
                         ? 'Decrease'
                         : 'Increase'}{' '}
                       {item.st.toLowerCase() === 'false'
                         ? 0
                         : item.avg != 0
                         ? parseFloat(item.avg) < parseFloat(item.last_price)
                           ? (
                               ((parseFloat(item.avg) -
                                 parseFloat(item.last_price)) /
                                 parseFloat(item.avg)) *
                               100 *
                               -1
                             ).toFixed(2)
                           : (
                               ((parseFloat(item.last_price) -
                                 parseFloat(item.avg)) /
                                 parseFloat(item.avg)) *
                               100
                             ).toFixed(2)
                         : 0}
                       %
                     </Text>
     
                     <View
                       style={{
                         flexDirection: 'row',
                         width: '100%',
                         justifyContent: 'space-between',
                       }}>
                       <Text
                         allowFontScaling={false}
                         style={{
                           color: color_check(item, 'total_size'),
                           fontSize: 21,
                           fontFamily: 'arial,sans-serif,bold',
                           fontWeight: 'bold',
                         }}>
                         {item.opens == 'True'
                           ? item.last_price
                           : item.side.toLowerCase() == 'buy'
                           ? (
                               (parseFloat(item.last_price) -
                                 parseFloat(item.avg)) *
                               parseFloat(item.qty)
                             ).toFixed(2)
                           : (
                               (parseFloat(item.last_price) -
                                 parseFloat(item.avg)) *
                               parseFloat(item.qty)
                             ).toFixed(2) * -1}
                       </Text>
     
                       <View
                         style={{
                           flexDirection: 'row',
                           justifyContent: 'space-around',
                           alignSelf: 'center',
                         }}>
                         <TouchableOpacity
                           activeOpacity={0.8}
                           onPress={() => {
                             if (ShowTPSL && TPSL_index === index) {
                               setShowTPSL(null);
                             } else {
                               setTPSL(
                                 parseInt(
                                   parseFloat(item.tp) *
                                     parseFloat(item.leverage),
                                 ),
                               );
                               setShowTPSL('TP'), setTPSL_index(index);
                             }
                           }}
                           style={{
                             alignItems: 'center',
                           }}>
                           <Text
                             style={{
                               color: '#fff',
                               textAlign: 'right',
                               fontSize: 10,
                             }}>
                             <FontAwesome
                               name={
                                 ShowTPSL && TPSL_index === index
                                   ? 'times'
                                   : 'edit'
                               }
                               size={18}
                               color={
                                 ShowTPSL && TPSL_index === index
                                   ? '#ff0000'
                                   : '#00a65a'
                               }
                             />{' '}
                             <Text style={{color: '#787f8a'}}>TP</Text> :{' '}
                             {parseFloat(
                               parseFloat(item.tp) * parseFloat(item.leverage),
                             )}
                             % (
                             {item.side === 'BUY'
                               ? (
                                   (parseFloat(item.avg) *
                                     parseFloat(item.tp)) /
                                     100 +
                                   parseFloat(item.avg)
                                 ).toFixed(3)
                               : (
                                   parseFloat(item.avg) -
                                   (parseFloat(item.avg) *
                                     parseFloat(item.tp)) /
                                     100
                                 ).toFixed(2)}
                             )
                           </Text>
                         </TouchableOpacity>
                         <TouchableOpacity
                           activeOpacity={0.8}
                           onPress={() => {
                             if (ShowTPSL && TPSL_index === index) {
                               setShowTPSL(null);
                             } else {
                               setTPSL(
                                 parseInt(
                                   parseFloat(item.sl) *
                                     parseFloat(item.leverage),
                                 ),
                               ),
                                 setShowTPSL('SL'),
                                 setTPSL_index(index);
                             }
                           }}
                           style={{
                             alignItems: 'center',
                             fontSize: 10,
                             marginLeft: 10,
                           }}>
                           {parseFloat(item.sl) * parseFloat(item.leverage) ===
                           0 ? null : (
                             <Text style={{color: '#fff', fontSize: 10}}>
                               <Text style={{color: '#787f8a', fontSize: 10}}>
                                 SL
                               </Text>{' '}
                               :{' '}
                               {parseInt(
                                 parseFloat(item.sl) *
                                   parseFloat(item.leverage),
                               )}{' '}
                               %{' '}
                               <FontAwesome
                                 name={
                                   ShowTPSL && TPSL_index === index
                                     ? 'times'
                                     : 'edit'
                                 }
                                 size={18}
                                 color={
                                   ShowTPSL && TPSL_index === index
                                     ? '#ff0000'
                                     : '#00a65a'
                                 }
                                 style={{marginLeft: 10}}
                               />
                             </Text>
                           )}
                         </TouchableOpacity>
                       </View>
                       <View
                         style={{
                           flexDirection: 'column',                            
                           justifyContent: 'center',
                           alignItem: 'center',
                         }}>             
                       {item.opens == 'True' ? (
                         <Text
                           allowFontScaling={false}
                           style={{
                             color: colors.profitcolor,
                             fontSize: 21,
                             fontFamily: 'arial,sans-serif,medium',
                             fontWeight: 'bold',
                           }}>
                           {' '}
                           {item.mode.toString().toUpperCase()}
                         </Text>
                       ) : (
                         <Text
                           allowFontScaling={false}
                           style={{
                             color: color_check(item, 'ROE'),
                             fontSize: 21,
                             fontFamily: 'arial,sans-serif,medium',
                             fontWeight: 'bold',
                           }}>
                           {' '}
                           
                           {item.side.toLowerCase() == 'buy'
                             ? (
                                 (((parseFloat(item.last_price) -
                                   parseFloat(item.avg)) *
                                   parseFloat(item.qty) +
                                   parseFloat(item.usdt)) /
                                   parseFloat(item.usdt) -
                                   1) *
                                 100 *
                                 parseFloat(item.leverage)
                               ).toFixed(2)
                             : (
                                 (((parseFloat(item.last_price) -
                                   parseFloat(item.avg)) *
                                   parseFloat(item.qty) +
                                   parseFloat(item.usdt)) /
                                   parseFloat(item.usdt) -
                                   1) *
                                 100 *
                                 parseFloat(item.leverage)
                               ).toFixed(2) * -1}
                           {''}%
                         </Text>
                       )}
                       
                      {(item.side.toLowerCase() == 'buy'
                             ? (
                                 (((parseFloat(item.last_price) -
                                   parseFloat(item.avg)) *
                                   parseFloat(item.qty) +
                                   parseFloat(item.usdt)) /
                                   parseFloat(item.usdt) -
                                   1) *
                                 100 *
                                 parseFloat(item.leverage)
                               ).toFixed(2)
                             : (
                                 (((parseFloat(item.last_price) -
                                   parseFloat(item.avg)) *
                                   parseFloat(item.qty) +
                                   parseFloat(item.usdt)) /
                                   parseFloat(item.usdt) -
                                   1) *
                                 100 *
                                 parseFloat(item.leverage)
                               ).toFixed(2) * -1)>0?
                                <TouchableOpacity
                           activeOpacity={0.8}
                           onPress={() => {
                               if(item.tsl_type=='auto'){
                                 ToastAndroid.show('TSL is set to Auto',ToastAndroid.SHORT)
                                 return
                               }
     
                             if (ShowTPSL && TPSL_index === index) {
                               setShowTPSL(null);
                             } else {
                               setTPSL(
                                 parseInt(
                                   parseFloat(item.tsl) *
                                     parseFloat(item.leverage),
                                 ),
                               );
                               setShowTPSL('TSL'), setTPSL_index(index);
                             }
                           }}
                           style={{
                             alignItems: 'center',
                           }}>
                           <Text
                             style={{
                               color: '#fff',
                               textAlign: 'right',
                               fontSize: 10,
                             }}>
                             <FontAwesome
                               name={
                                 ShowTPSL && TPSL_index === index
                                   ? 'times'
                                   : 'edit'
                               }
                               size={18}
                               color={
                                 ShowTPSL && TPSL_index === index
                                   ? '#ff0000'
                                   : '#00a65a'
                               }
                             />{' '}
                             <Text style={{color: '#787f8a'}}>TSL </Text> :{' '}
                             {item.tsl_type=='auto'?'Auto':null} {(parseFloat(item.tsl) * parseFloat(item.leverage)).toFixed(2)  }
                             % 
                           </Text>
                         </TouchableOpacity>
                         :null}
                         </View>
                     </View>
                     {ShowTPSL &&
                       TPSL_index === index &&
                       Edit_tpsl(item.sym, ShowTPSL, item.leverage, item.side,item)}
     
                     <View
                       style={{
                         display: OpenPanel ? 'none' : 'flex',
                         flexDirection: 'row',
                       }}>
                       <View
                         style={{
                           flexDirection: 'column',
                           width: '33%',
                           justifyContent: 'flex-start',
                           alignItem: 'flex-start',
                         }}>
                         <Text
                           allowFontScaling={false}
                           style={{
                             color: '#787f8a',
                             fontSize: 12,
                             fontFamily: 'arial,sans-serif,medium',
                           }}>
                           Size (USD)
                         </Text>
                         <Text
                           allowFontScaling={false}
                           style={{
                             width: 50,
                             color: '#f0f6f7',
                             fontFamily: 'arial,sans-serif,medium',
                           }}>
                           {item.side.toLowerCase == 'buy'
                             ? Math.round(
                                 parseFloat(item.usdt) +
                                   parseFloat(
                                     (
                                       (parseFloat(item.last_price) -
                                         parseFloat(item.avg)) *
                                       parseFloat(item.qty)
                                     ).toFixed(4),
                                   ),
                                 4,
                               )
                             : Math.round(
                                 parseFloat(item.usdt) -
                                   parseFloat(
                                     (
                                       (parseFloat(item.last_price) -
                                         parseFloat(item.avg)) *
                                       parseFloat(item.qty)
                                     ).toFixed(4) * -1,
                                   ),
                                 4,
                               )}{' '}
                         </Text>
                         <Text
                           allowFontScaling={false}
                           style={{
                             color: '#787f8a',
                             fontSize: 12,
                             fontFamily: 'arial,sans-serif,medium',
                             marginTop: 10,
                           }}>
                           {'\n'}
                           Entry Price
                         </Text>
                         <Text
                           allowFontScaling={false}
                           style={{
                             width: 80,
                             color: colors.selected,
                             fontFamily: 'arial,sans-serif,medium',
                             fontSize: 11,
                           }}>
                           {item.avg.toString().length >= 9
                             ? parseFloat(item.avg).toFixed(6)
                             : parseFloat(item.avg).toFixed(6)}{' '}
                         </Text>
                       </View>
                       {/* 2nd */}
                       <View
                         style={{
                           flexDirection: 'column',
                           width: '33%',
                           justifyContent: 'flex-start',
                           alignItem: 'flex-start',
                         }}>
                         <Text
                           allowFontScaling={false}
                           style={{
                             color: '#787f8a',
                             fontSize: 10,
                           }}>
                           Margin (USD) ({parseFloat(item.qty1) - 1}
                           {'/'}
                           {parseFloat(item.qty1) - 1 >
                           item.margin_callback_limit
                             ? parseFloat(item.qty1) - 1
                             : item.margin_callback_limit}
                           )
                         </Text>
                         <View style={{flexDirection: 'row', width: 120}}>
                           <Text
                             allowFontScaling={false}
                             style={{
                               textAlign: 'center',
                               color: '#f0f6f7',
                             }}>
                             {parseFloat(item.myusdt).toFixed(2)}{' '}
                             <Text
                               style={{
                                 fontSize: 10,
                                 fontWeight: 'normal',
                                 color: '#787f8a',
                               }}>
                               {item.bst1}
                               {'\n'}
                               Next Margin : ({item.margin_call_drop}%)   ({item.side === 'BUY'
                               ? (
                                (   (parseFloat(item.avg) *
                                     parseFloat(item.tp)) /
                                     100 -
                                   parseFloat(item.avg))*-1
                                 ).toFixed(3)
                               : (
                                   parseFloat(item.avg) +
                                   (parseFloat(item.avg) *
                                     parseFloat(item.tp)) /
                                     100
                                 ).toFixed(3)})
                             </Text>
                           </Text>
                           <MaterialIcons
                             onPress={() => {
                               setMarginCallModal(true);
                             }}
                             name={'block'}
                             size={20}
                             style={{
                               paddingHorizontal: 10,
                               paddingBottom: 5,
                               display: 'none',
                             }}
                             color={'red'}
                           />
                         </View>
                         <Text
                           allowFontScaling={false}
                           style={{
                             color: '#787f8a',
                             fontSize: 12,
                             marginLeft: 20,
                             marginTop: 15,
                           }}>
                           Mark Price
                         </Text>
                         <Text
                           allowFontScaling={false}
                           style={{
                             width: 80,
                             color: colors.selected,
                             marginLeft: 20,
                             fontSize: 11,
                           }}>
                           {item.last_price}{' '}
                         </Text>
                       </View>
                       {/* end2 */}
                       <View
                         style={{
                           flexDirection: 'column',
                           width: '33%',
                           justifyContent: 'flex-end',
                           alignItem: 'flex-start',
                         }}>
                         <Text
                           allowFontScaling={false}
                           style={{
                             textAlign: 'right',
                             color: '#787f8a',
                             fontSize: 12,
                           }}>
                           % Change
                         </Text>
                         <Text
                           allowFontScaling={false}
                           style={{
                             textAlign: 'right',
                             fontSize: 14,
                             fontWeight: 'bold',
     
                             color: color_check(item, 'change'),
                           }}>
                           {/* { parseFloat(item.avg) >
                          parseFloat(item.last_price)
                          ? ''
                          : '-'} */}
                           {item.side.toLowerCase() == 'buy'
                             ? item.st.toLowerCase() === 'false'
                               ? 0
                               : item.avg != 0
                               ? parseFloat(item.avg) >=
                                 parseFloat(item.last_price)
                                 ? (
                                     ((parseFloat(item.avg) -
                                       parseFloat(item.last_price)) /
                                       parseFloat(item.avg)) *
                                     100 *
                                     -1
                                   ).toFixed(2)
                                 : (
                                     ((parseFloat(item.last_price) -
                                       parseFloat(item.avg)) /
                                       parseFloat(item.avg)) *
                                     100
                                   ).toFixed(2)
                               : 0
                             : item.st.toLowerCase() === 'false'
                             ? 0
                             : item.avg != 0
                             ? parseFloat(item.avg) >=
                               parseFloat(item.last_price)
                               ? (
                                   ((parseFloat(item.avg) -
                                     parseFloat(item.last_price)) /
                                     parseFloat(item.avg)) *
                                   100
                                 ).toFixed(2)
                               : (
                                   ((parseFloat(item.last_price) -
                                     parseFloat(item.avg)) /
                                     parseFloat(item.avg)) *
                                   100 *
                                   -1
                                 ).toFixed(2)
                             : 0}
                           %
                         </Text>
                         <Text
                           allowFontScaling={false}
                           style={{
                             textAlign: 'right',
                             color: '#787f8a',
                             fontSize: 12,
                             marginTop: 10,
                           }}>
                           Liq. Price ({item.saveliq}/{item.save_liq_times})
                         </Text>
                         <Text
                           allowFontScaling={false}
                           style={{
                             textAlign: 'right',
     
                             fontSize: 11,
                             color: colors.selected,
                           }}>
                           {item.liq.toString().length >= 11
                             ? parseFloat(item.liq).toFixed(2)
                             : parseFloat(item.liq).toFixed(6)}
                         </Text>
                       </View>
                     </View>
     
                     <View
                       style={{
                         display: !OpenPanel ? 'none' : 'flex',
                         flexDirection: 'row',
                         width: '100%',
                         justifyContent: 'space-between',
                         marginTop: 10,
                         marginBottom: 5,
                       }}>
                       <TouchableOpacity
                         activeOpacity={0.9}
                         onPress={() => {
                           if (
                             closeClicked1.split(',')[0] == 'true' &&
                             parseInt(closeClicked1.split(',')[1]) == index
                           ) {
                             setCancelling(true);
                             update_bot_status('cancel', item.sym, item.side);
                             ToastAndroid.show(
                               'Cancelling Order...',
                               ToastAndroid.SHORT,
                             );
                           } else {
                             setCloseClicked1('true,' + index);
                           }
                         }}>
                         <View
                           style={[
                             closeClicked1.split(',')[0] == 'true' &&
                             index == parseInt(closeClicked1.split(',')[1])
                               ? {backgroundColor: colors.profitcolor}
                               : {backgroundColor: '#29313c'},
                             {
                               paddingHorizontal: 10,
                               paddingVertical: 7,
                               borderRadius: 2,
                             },
                           ]}>
                           <Text
                             style={{
                               color: '#FFFFFF',
                               fontSize: 13,
                               fontWeight: 'bold',
                             }}>
                             {Cancelling ? (
                               <ActivityIndicator size={25} color="#fff" />
                             ) : (
                               'Cancel Order'
                             )}
                           </Text>
                         </View>
                       </TouchableOpacity>
                     </View>
                     <View
                       style={{
                         display: OpenPanel ? 'none' : 'flex',
                         flexDirection: 'row',
                         width: '100%',
                         justifyContent: 'space-between',
                         marginTop: 10,
                       }}>
                       <TouchableOpacity
                         onPress={() => {
                           setVItem(item), refRBSheet1.current.open();
                         }}>
                         <View
                           style={{
                             paddingHorizontal: 10,
                             paddingVertical: 7,
                             backgroundColor: '#29313c',
                             borderRadius: 2,
                           }}>
                           <Text
                             style={{
                               color: '#FFFFFF',
                               fontSize: 13,
                               fontWeight: 'bold',
                             }}>
                             Add Margin
                           </Text>
                         </View>
                       </TouchableOpacity>
                       {wait ? (
                         <View
                           style={{
                             paddingHorizontal: 10,
                             paddingVertical: 7,
                             backgroundColor: '#29313c',
                             borderRadius: 2,
                           }}>
                           <ActivityIndicator size={18} color={'#fff'} />
                         </View>
                       ) : (
                         <TouchableOpacity
                           onPress={() => {
                             setWait(true);
                             TradeType(item.sym, item.mmode, item.side);
                           }}>
                           <View
                             style={{
                               paddingHorizontal: 10,
                               paddingVertical: 7,
                               backgroundColor: '#29313c',
                               borderRadius: 2,
                             }}>
                             <Text
                               style={{
                                 color:
                                   item.mmode.toUpperCase() === 'CYCLE'
                                     ? '#FDBE11'
                                     : '#FFFFFF',
                                 fontSize: 13,
                                 fontWeight: 'bold',
                               }}>
                                 
                               {item.mmode.toUpperCase()} 
                               
                               {item.mmode.toUpperCase()=='CYCLE'?'(' + item.noc + ')':null}
                             </Text>
                           </View>
                         </TouchableOpacity>
                       )}
                       {parseInt(closeDoubleClicked.split(',')[1]) == index ? (
                         <View
                           style={{
                             paddingHorizontal: 10,
                             paddingVertical: 7,
                             borderRadius: 2,
                             alignItems: 'center',
                             justifyContent: 'center',
                           }}>
                           {/* {//console.log('in close double clicked-------------')} */}
                           <ActivityIndicator
                             size={'small'}
                             color={colors.selected}
                           />
                         </View>
                       ) : (
                         <TouchableOpacity
                           activeOpacity={0.9}
                           onPress={() => {
                             if (
                               closeClicked.split(',')[0] == 'true' &&
                               parseInt(closeClicked.split(',')[1]) == index
                             ) {
                               setCloseDoubleClicked(closeClicked);
                               stopApi(item.sym, item.side);
                               ToastAndroid.show(
                                 'Closing Trade...',
                                 ToastAndroid.SHORT,
                               );                             
                             } else {
                               setCloseClicked('true,' + index);
                             }
                           }}>
                           <View
                             style={[
                               closeClicked.split(',')[0] == 'true' &&
                               index == parseInt(closeClicked.split(',')[1])
                                 ? {backgroundColor: colors.profitcolor}
                                 : {backgroundColor: '#29313c'},
                               {
                                 paddingHorizontal: 10,
                                 paddingVertical: 7,
                                 borderRadius: 2,
                               },
                             ]}>
                             <Text
                               style={{
                                 color: '#FFFFFF',
                                 fontSize: 13,
                                 fontWeight: 'bold',
                               }}>
                               Close Position
                             </Text>
                           </View>
                         </TouchableOpacity>
                       )}
                       <Modal
                         onBackButtonPress={toggleModal1}
                         statusBarTranslucent={true}
                         deviceHeight={1000}
                         onBackdropPress={toggleModal1}
                         isVisible={isModal1Visible}
                         animationInTiming={300}
                         animationOutTiming={200}>
                         <View
                           style={{
                             width: 350,
                             backgroundColor: '#203040',
                             flexDirection: 'column',
                             justifyContent: 'space-around',
                             paddingHorizontal: 35,
                             paddingVertical: 15,
                             borderWidth: 0.5,
                             borderColor: '#70707070',
                             borderRadius: 10,
                             borderBottomWidth: 0,
                           }}>
                           <Text
                             allowFontScaling={false}
                             style={[
                               styles.text_footer,
                               {textAlign: 'center', color: colors.selected},
                             ]}>
                             Are you sure you want to stop the BOT?
                           </Text>
     
                           <View
                             style={{
                               flexDirection: 'row',
                               justifyContent: 'space-around',
                               alignItems: 'flex-end',
                               width: '100%',
                             }}>
                             <TouchableOpacity
                               onPress={() => {
                                 toggleModal1();
                               }}>
                               <View
                                 style={{
                                   marginTop: 5,
                                   alignSelf: 'center',
                                   justifyContent: 'center',
                                   alignItems: 'center',
                                   borderRadius: 5,
                                 }}>
                                 <Text
                                   allowFontScaling={false}
                                   style={{
                                     color: colors.hgl,
                                     fontWeight: 'bold',
                                     fontSize: 17,
                                   }}>
                                   Cancel
                                 </Text>
                               </View>
                             </TouchableOpacity>
     
                             <TouchableOpacity
                               onPress={() => {
                              
                                 toggleModal1();
                                 stopApi(item.sym, item.side);
                               }}>
                               <View
                                 style={{
                                   marginTop: 5,
                                   alignSelf: 'center',
                                   justifyContent: 'center',
                                   alignItems: 'center',
                                   borderRadius: 5,
                                 }}>
                                 <Text
                                   allowFontScaling={false}
                                   style={{
                                     color: '#f5f5f5',
                                     fontWeight: 'bold',
                                     fontSize: 17,
                                   }}>
                                   Confirm Close Position
                                 </Text>
                               </View>
                             </TouchableOpacity>
                           </View>
                         </View>
                       </Modal>
                       <Modal
                         onBackButtonPress={() => setMarginCallModal(false)}
                         statusBarTranslucent={true}
                         backdropOpacity={0.3}
                         deviceHeight={1000}
                         onBackdropPress={() => setMarginCallModal(false)}
                         isVisible={MarginCallModal}>
                         <View
                           style={{
                             width: 350,
                             backgroundColor: '#203040',
                             flexDirection: 'column',
                             justifyContent: 'space-around',
                             paddingHorizontal: 35,
                             paddingVertical: 15,
                             borderWidth: 0.5,
                             borderColor: '#70707070',
                             borderRadius: 10,
                             borderBottomWidth: 0,
                           }}>
                           <Text
                             allowFontScaling={false}
                             style={[
                               styles.text_footer,
                               {textAlign: 'center', color: colors.selected},
                             ]}>
                             Are you sure you want to stop the margin calls ?
                           </Text>
     
                           <View
                             style={{
                               flexDirection: 'row',
                               justifyContent: 'space-around',
                               alignItems: 'flex-end',
                               width: '100%',
                             }}>
                             <TouchableOpacity
                               onPress={() => {
                                 setMarginCallModal(false);
                               }}>
                               <View
                                 style={{
                                   marginTop: 5,
                                   alignSelf: 'center',
                                   justifyContent: 'center',
                                   alignItems: 'center',
                                   borderRadius: 5,
                                 }}>
                                 <Text
                                   allowFontScaling={false}
                                   style={{
                                     color: colors.hgl,
                                     fontWeight: 'bold',
                                     fontSize: 17,
                                   }}>
                                   Cancel
                                 </Text>
                               </View>
                             </TouchableOpacity>
     
                             <TouchableOpacity
                               onPress={() => {
                                 stop_margin_calls(item.sym);
                               }}>
                               <View
                                 style={{
                                   marginTop: 5,
                                   alignSelf: 'center',
                                   justifyContent: 'center',
                                   alignItems: 'center',
                                   borderRadius: 5,
                                 }}>
                                 <Text
                                   allowFontScaling={false}
                                   style={{
                                     color: '#f5f5f5',
                                     fontWeight: 'bold',
                                     fontSize: 17,
                                   }}>
                                   Stop Margin Calls
                                 </Text>
                               </View>
                             </TouchableOpacity>
                           </View>
                         </View>
                       </Modal>
                     </View>
                     <TouchableOpacity
                       disabled={btn_disable}
                       onPress={() => {
                         setChart(item.sym),
                           setBtn_disable(true),
                           setTimeout(() => {
                             setBtn_disable(false);
                           }, 2000);
                         if (chartIndex === index) {
                           setShowChart(false);
                           setChartIndex(null);
                         } else {
                           setShowChart(false),
                             setShowChart(true),
                             setChartIndex(index);
                         }
                       }}>
                       {/* <View style={{ height: 1, width: '100%', backgroundColor: '#303c4d', marginTop: 10 }}></View> */}
                       {showChart && chartIndex == index ? (
                         <View
                           style={{
                             height: 250,
                             width: '100%',
                             borderTopWidth: 1,
                             borderColor: colors.selected,
                             marginTop: 20,
                           }}>
                           <KlineChart2
                             pair={item.sym}
                             navigation={navigation}
                             indi={'down'}
                             from={'joined'}
                           />
                         </View>
                       ) : null}
                       <View
                         style={{
                           flexDirection: 'row',
                           paddingBottom: 5,
                           justifyContent: 'space-between',
                           alignItems: 'center',
                           paddingHorizontal: 10,
                           fontSize: 14,
                         }}>
                         <Text
                           style={{
                             color:
                               item.mode.toString().toUpperCase() == 'LIVE'
                                 ? colors.profitcolor
                                 : '#fff',
                             fontSize: 12,
                             textAlign: 'center',
                           }}>
                           <Image
                             source={require('../../assets/logo1.png')}
                             style={{width: 30, height: 20}}
                             resizeMode={'contain'}
                           />
                           {global.demo=='true'?
                             item.trd_dt
                             : null} 
                             {' '}
                           {                           
                           parseFloat(item.btc_callback) != 0 &&
                           item.opens === 'True'
                             ? `waiting for btc to ${
                                 item.side === 'BUY' ? 'increase' : 'decrease'
                               } to ${item.btc_callback} USD`
                             : parseFloat(item.price_to_start_trade) > 0 &&
                               item.side === 'BUY' &&
                               item.opens === 'True' &&
                               parseFloat(item.last_price) >
                                 parseFloat(item.price_to_start_trade)
                             ? 'Waiting for the price to reach :' +
                               item.price_to_start_trade
                             : parseFloat(item.price_to_start_trade) > 0 &&
                               item.side === 'SELL' &&
                               parseFloat(item.last_price) <
                                 parseFloat(item.price_to_start_trade) &&
                               item.opens === 'True'
                             ? 'Waiting for the price to reach :' +
                               item.price_to_start_trade
                             : OpenPanel
                             ? `Waiting For Trade To Move  ${item.start_bot_variation}% in Your Direction`
                             : item.mode.toUpperCase()}{' '}
                           {global.demo === 'True' ? ': ' + item.trd_dt : null}{' '}
                           {item.opens === 'True'
                             ? null
                             : item.side.toUpperCase() == 'BUY'
                             ? Math.round(
                                 parseFloat(btclive) -
                                   parseFloat(item.btcinit),
                                 2,
                               ) < 0
                               ? 'BTC DOWN BY :' +
                                 Math.round(
                                   parseFloat(btclive) -
                                     parseFloat(item.btcinit),
                                   2,
                                 ) *
                                   -1 +
                                 ' $'
                               : 'BTC UP BY :' +
                                 Math.round(
                                   parseFloat(btclive) -
                                     parseFloat(item.btcinit),
                                   2,
                                 ) +
                                 ' $'
                             : Math.round(
                                 parseFloat(item.btcinit) -
                                   parseFloat(btclive),
                                 2,
                               ) < 0
                             ? 'BTC UP BY :' +
                               Math.round(
                                 parseFloat(item.btcinit) -
                                   parseFloat(btclive),
                                 2,
                               ) *
                                 -1 +
                               `$`
                             : 'BTC DOWN BY :' +
                               Math.round(
                                 parseFloat(item.btcinit) -
                                   parseFloat(btclive),
                                 2,
                               ) +
                               ' $'}{' '}
                         </Text>
                         <TouchableOpacity
                           onPress={() => {
                             if (global.api_key == '') {
                               navigation.navigate('APIBinding');
                             } else {
                               SendToInner(
                                 item.sym,
                                 item.img,
                                 item.st,
                                 item.tp.toUpperCase(),
                                 item.strtamt,
                                 item.qty,
                                 item.qty1,
                                 item.liq,
                                 item.st.toLowerCase() === 'false'
                                   ? 0
                                   : item.strtamt != ''
                                   ? parseFloat(item.strtamt) <
                                     parseFloat(item.last_price)
                                     ? (
                                         ((parseFloat(item.strtamt) -
                                           parseFloat(item.last_price)) /
                                           parseFloat(item.last_price)) *
                                         100
                                       ).toFixed(2)
                                     : (
                                         ((parseFloat(item.last_price) -
                                           parseFloat(item.strtamt)) /
                                           parseFloat(item.last_price)) *
                                         100
                                       ).toFixed(2)
                                   : 0,
                                 item.bst,
                                 item.avg,
                                 item.usdt,
                                 item.bst1,
                                 item.x_hprice,
                                 item.x_lprice,
                                 item.x_prev_cprice,
                                 item.x_askprice,
                                 item.x_bidprice,
                                 item.side,
                                 item.iscopy,
                                 item.myusdt,
                                 item.buy,
                                 item.sell,
                               );
                             }
                           }}>
                           <MaterialIcons
                             name={'settings'}
                             size={28}
                             color={colors.selected}
                             style={{marginTop: 10}}
                           />
                         </TouchableOpacity>
                         {btn_disable && showChart && chartIndex == index ? (
                           <>
                             {/* {//console.log(showChart, "  :  ", chartIndex)} */}
                             <ActivityIndicator size={18} color={'#fff'} />
                           </>
                         ) : (
                           <MaterialIcons
                             name={
                               showChart && chartIndex == index
                                 ? 'keyboard-arrow-up'
                                 : 'keyboard-arrow-down'
                             }
                             size={28}
                             color={colors.selected}
                             style={{marginTop: 10}}
                           />
                         )}
                       </View>
                     </TouchableOpacity>
                     <View
                       style={{
                         height: 1,
                         width: '100%',
                         backgroundColor: '#303c4d',
                       }}></View>
                   </View>
     
                   {/* <View style={{ width: '100%', height: 2, backgroundColor: '#1e252f', marginBottom: 5, marginTop: 10, elevation: 2 }}></View> */}
                 </View>
                  
                )}

                />
):
<View style={{alignItems: 'center', justifyContent: 'center'}}>
<Text style={{color: colors.selected}}>
  No Active Trades to show !{' '}
</Text>
</View>
}

</View>
<View style={{height:150}}></View>
        </ScrollView>

        
          <Modal
            onBackButtonPress={toggleModal}
            useNativeDriver={true}
            statusBarTranslucent={true}
            deviceHeight={1000}
            onBackdropPress={toggleModal}
            isVisible={isModalVisible}
            animationInTiming={300}
            animationOutTiming={200}>
            <View
              style={{
                width: 350,
                backgroundColor: '#203040',
                flexDirection: 'column',
                justifyContent: 'space-around',
                paddingHorizontal: 15,
                paddingVertical: 15,
                borderWidth: 0.5,
                borderColor: '#70707070',
                borderRadius: 10,
                borderBottomWidth: 0,
              }}>
              <Text
                style={[
                  styles.text_footer,
                  {textAlign: 'center', color: colors.selected},
                ]}>
                Are you sure you want to stop the Bot?
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'flex-end',
                  width: '100%',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    toggleModal();
                  }}>
                  <View
                    style={{
                      marginTop: 5,
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        color: colors.hdl,
                        fontWeight: 'bold',
                        fontSize: 17,
                      }}>
                      Cancel
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Push_btn(symbol);
                  }}>
                  <View
                    style={{
                      marginTop: 5,
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        color: '#f5f5f5',
                        fontWeight: 'bold',
                        fontSize: 17,
                      }}>
                      Confirm
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        
        
          <Modal
            // onBackButtonPress={toggleModalIp}
            useNativeDriver={true}
            statusBarTranslucent={true}
            deviceHeight={1000}
            // onBackdropPress={toggleModalIp}
            isVisible={isModalIpVisible}
            animationInTiming={300}
            animationOutTiming={200}>
            <View
              style={{
                backgroundColor: global.appColor1,
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignSelf: 'center',
                width: '90%',

                paddingHorizontal: 15,
                paddingVertical: 15,
                borderWidth: 0.5,
                borderColor: global.grad2,
                borderRadius: 10,
                borderBottomWidth: 0,
              }}>
              <Text
                style={[
                  styles.text_footer,
                  {
                    textAlign: 'center',
                    color: colors.text,
                    fontSize: 16,
                    fontWeight: 'bold',
                  },
                ]}>
                <Text
                  style={[
                    styles.text_footer,
                    {
                      textAlign: 'center',
                      color: colors.text,
                      fontSize: 20,
                      fontWeight: 'bold',
                    },
                  ]}>
                  Notice
                </Text>
                {'\n'}
                {'\n'}
                There seems an error with your api key in Binance Exchange .
                Please Complete the following steps to correct it : {'\n'}
                {'\n'}
                1) Check Spot Trading Is Enabled In Your Current Api key{'\n'}
                Or{'\n'}
                2) Check All Ip's Are Added in the api key
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'flex-end',
                  width: '100%',
                  marginTop: 30,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    toggleModalIp();
                    navigation.navigate('UpdateIP');
                  }}>
                  <View
                    style={{
                      marginTop: 5,
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 20,
                      padding: 2,
                      paddingHorizontal: 15,
                      backgroundColor: global.grad2,
                    }}>
                    <Text
                      style={{
                        color: colors.text,
                        fontWeight: 'bold',
                        fontSize: 17,
                      }}>
                      OK
                    </Text>
                  </View>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={()=>{Push_btn(symbol)}}>
                <View style={{marginTop:5,alignSelf: 'center',justifyContent: 'center',alignItems: 'center',borderRadius:5}}>
                    <Text style={{color:'#f5f5f5',fontWeight:'bold',fontSize:17}}>Confirm</Text>
                </View>
            </TouchableOpacity> */}
              </View>
            </View>
          </Modal>
        
        <Modal
          // onBackButtonPress={toggleModalIp}
          useNativeDriver={true}
          statusBarTranslucent={true}
          deviceHeight={1000}
          // onBackdropPress={toggleModalIp}
          isVisible={isModalErrVisible}
          animationInTiming={300}
          animationOutTiming={200}>
          <View
            style={{
              backgroundColor: global.grad3,
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignSelf: 'center',
              width: '90%',

              paddingHorizontal: 15,
              paddingVertical: 15,
              borderWidth: 0.5,
              borderColor: global.grad2,
              borderRadius: 10,
              borderBottomWidth: 0,
            }}>
            <Text
              style={[
                styles.text_footer,
                {
                  textAlign: 'center',
                  color: colors.text,
                  fontSize: 16,
                  fontWeight: 'bold',
                },
              ]}>
              <Text
                style={[
                  styles.text_footer,
                  {
                    textAlign: 'center',
                    color: colors.selected,
                    fontSize: 20,
                    fontWeight: 'bold',
                  },
                ]}>
                ERROR !{'\n'}
                {'\n'}
                {Error_msg}
              </Text>
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'flex-end',
                width: '100%',
                marginTop: 30,
              }}>
              <TouchableOpacity
                onPress={() => {
                  toggleModal_err(),
                    (global.notify_count1 = 0),
                    navigation.navigate('MessageScreen', {type: 'sys'});
                }}>
                <View
                  style={{
                    marginTop: 5,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20,
                    padding: 2,
                    paddingHorizontal: 15,
                    backgroundColor: global.grad2,
                  }}>
                  <Text
                    style={{
                      color: colors.text,
                      fontWeight: 'bold',
                      fontSize: 17,
                    }}>
                    OK
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        
          <Modal
            onBackButtonPress={() => {
              setNewsModal(false);
            }}
            statusBarTranslucent={true}
            deviceHeight={1000}
            onBackdropPress={() => {
              setNewsModal(false);
            }}
            useNativeDriver={true}
            isVisible={newsModal}
            animationInTiming={300}
            animationOutTiming={200}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-around',
                paddingHorizontal: 15,
                paddingVertical: 10,
                marginTop: 90,
                height: '100%',
                width: '100%',
              }}>
              <Image
                source={require('../../assets/smartbot/bot.png')}
                style={{
                  width: 110,
                  height: 140,
                  alignSelf: 'center',
                  marginBottom: -43,
                }}
                resizeMode={'stretch'}
              />
              <ImageBackground
                source={require('../../assets/botz/newsbox.png')}
                resizeMode={'stretch'}
                style={{
                  alignItems: 'center',
                  borderRadius: 20,
                  width: '100%',
                  height: '80%',
                  paddingVertical: 30,
                  borderColor: global.grad3,
                  marginHorizontal: 5,
                }}>
                <TouchableOpacity
                  style={{position: 'absolute', right: 0, top: -15}}
                  onPress={() => {
                    setNewsModal(false);
                  }}>
                  <Image
                    source={require('../../assets/close2.png')}
                    style={{width: 40, height: 40}}
                  />
                </TouchableOpacity>
                <Text
                  style={[
                    {
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: colors.bg,
                    },
                  ]}>
                  Welcome to SnapFuzen !{' '}
                </Text>
                <Text
                  style={[
                    styles.text_footer,
                    {
                      textAlign: 'center',
                      color: colors.selectednew,
                      fontWeight: 'bold',
                      fontSize: 26,
                    },
                  ]}>
                  LATEST NEWS
                </Text>
                <View
                  style={{
                    width: '70%',
                    borderBottomWidth: 0.5,
                    borderColor: 'grey',
                  }}></View>
                <Text
                  style={{
                    fontSize: 15,
                    color: colors.text,
                    marginTop: 50,
                    fontWeight: 'bold',
                    marginHorizontal: 10,
                  }}
                  // duration={15000}
                  // loop
                  // repeatSpacer={100}
                >
                  {ScrollDta != '' &&
                  ScrollDta != undefined &&
                  ScrollDta != null ? (
                    ScrollDta
                  ) : (
                    null
                  )}
                </Text>
                {/* <TouchableOpacity
            style={{ backgroundColor: '#2980b9',
            paddingVertical: 10,
            paddingHorizontal: 15,}}
            onPress={() => props.start()}>
            <Text style={{color: 'white',
    fontSize: 16,}}>
              START APP INTRODUCTION TOUR
            </Text>
          </TouchableOpacity> */}
              </ImageBackground>
              {/* <Text style={[styles.text_footer,{textAlign:'center',color:colors.selected}]}>Are you sure you want to stop the Bot?</Text>
           
            <View style={{flexDirection:'row',justifyContent: 'space-around',alignItems: 'flex-end',width:'100%'}}>
            <TouchableOpacity onPress={()=>{setNewsModal(false)}}>
                <View style={{marginTop:5,alignSelf: 'center',justifyContent: 'center',alignItems: 'center',borderRadius:5}}>
                    <Text style={{color:colors.hdl,fontFamily:global.appFontB,fontSize:17}}>Cancel</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{Push_btn(symbol)}}>
                <View style={{marginTop:5,alignSelf: 'center',justifyContent: 'center',alignItems: 'center',borderRadius:5}}>
                    <Text style={{color:'#f5f5f5',fontFamily:global.appFontB,fontSize:17}}>Confirm</Text>
                </View>
            </TouchableOpacity>
            </View> */}
            </View>
          </Modal>
          <Modal
            onBackButtonPress={() => {
              setPopup_Visible(false);
            }}
            statusBarTranslucent={true}
            deviceHeight={1000}
            onBackdropPress={() => {
              setPopup_Visible(false);
            }}
            useNativeDriver={true}
            isVisible={Popup_Visible}
            animationInTiming={300}
            animationOutTiming={200}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-around',
                paddingHorizontal: 5,
                paddingVertical: 10,
                marginTop: 90,
                height: '100%',
                width: '100%',
              }}>
              <ImageBackground
                source={{uri: PoupImg}}
                resizeMode={'stretch'}
                style={{
                  alignItems: 'center',
                  borderRadius: 20,
                  width: '100%',
                  height: '100%',
                  paddingVertical: 30,
                  borderColor: global.grad3,
                  marginHorizontal: 0,
                }}
                imageStyle={{borderRadius: 10}}>
                <TouchableOpacity
                  style={{position: 'absolute', right: 0, top: -15}}
                  onPress={() => {
                    setPopup_Visible(false);
                  }}>
                  <Image
                    source={require('../../assets/close2.png')}
                    style={{width: 40, height: 40}}
                  />
                </TouchableOpacity>
              </ImageBackground>
            </View>
          </Modal>

          <Modal
            statusBarTranslucent={true}
            deviceHeight={1000}
            useNativeDriver={true}
            isVisible={earningmodal}
            style={{marginTop: 0}}
            animationOut={'slideOutUp'}
            onBackdropPress={() => {
              setEarningmodal(false);
            }}
            onBackButtonPress={() => {
              setEarningmodal(false);
            }}
            animationInTiming={300}
            animationOutTiming={1000}>
            <Animatable.View
              onStartShouldSetResponder={() => {
                setEarningmodal(false);
              }}
              delay={1000}
              ref={modalRef}
              duration={1500}
              useNativeDriver={true}
              animation={'slideInDown'}
              style={{
                flexDirection: 'column',
                paddingHorizontal: 5,
                width: '100%',
              }}>
              <ImageBackground
                source={require('../../assets/botz/popup.png')}
                resizeMode={'stretch'}
                style={{
                  alignItems: 'center',
                  borderRadius: 20,
                  width: '100%',
                  height: '100%',
                  paddingVertical: 30,
                  borderColor: global.grad3,
                  marginHorizontal: 0,
                }}
                imageStyle={{borderRadius: 10}}>
                {lastEarned.refercode && (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      position: 'absolute',
                      bottom: '20%',
                      left: '8%',
                      height: 200,
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={{color: '#fff'}}>ENTRY PRICE</Text>
                      <Text style={{color: colors.binanceylw2, fontSize: 18}}>
                        {lastEarned.startprice}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View style={{alignItems: 'center', marginTop: 10}}>
                        <Text style={{color: '#fff'}}>REFERRAL CODE</Text>
                        <Image
                          source={{uri: lastEarned.refercode}}
                          style={{
                            width: 100,
                            height: 100,
                            borderRadius: 5,
                            marginTop: 15,
                            resizeMode: 'stretch',
                          }}
                        />
                      </View>
                      <View style={{alignItems: 'center'}}>
                        <Text style={{color: '#fff'}}>
                          {lastEarned.pair}{' '}
                          <Text
                            style={{
                              color:
                                lastEarned.type === 'SELL'
                                  ? '#ff0000'
                                  : '#00a65a',
                            }}>
                            {lastEarned.type === 'SELL' ? 'SHORT' : 'LONG'}
                          </Text>
                        </Text>
                        <Text style={{color: '#fff', fontSize: 22}}>
                          <Text style={{color: '#00a65a'}}>
                            {lastEarned.profit} USD
                          </Text>
                        </Text>
                        <TouchableOpacity
                          style={{marginTop: 20, padding: 20}}
                          onPress={() => {
                            takeScreenShot();
                          }}>
                          <FontAwesome
                            name={'share-alt-square'}
                            size={30}
                            color="#fff"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={{color: '#fff'}}>LAST PRICE</Text>
                      <Text style={{color: colors.binanceylw2, fontSize: 18}}>
                        {lastEarned.price}
                      </Text>
                    </View>
                  </View>
                )}
              </ImageBackground>
            </Animatable.View>
          </Modal>
          <Modal
            statusBarTranslucent={true}
            deviceHeight={1000}
            useNativeDriver={true}
            isVisible={ModalOTP}
            animationInTiming={300}
            animationOutTiming={200}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-around',
                paddingHorizontal: 15,
                paddingVertical: 10,
                marginTop: 90,
                height: '100%',
                width: '100%',
              }}>
              <Image
                source={require('../../assets/smartbot/bot.png')}
                style={{
                  width: 110,
                  height: 140,
                  alignSelf: 'center',
                  marginBottom: -43,
                }}
                resizeMode={'stretch'}
              />
              <ImageBackground
                source={require('../../assets/botz/newsbox.png')}
                resizeMode={'stretch'}
                style={{
                  alignItems: 'center',
                  borderRadius: 20,
                  width: '100%',
                  height: '80%',
                  paddingVertical: 30,
                  borderColor: global.grad3,
                  marginHorizontal: 5,
                }}>
                {/* <TouchableOpacity style={{position:'absolute',right:0,top:-15}}  onPress={()=>{setModalOTP(false)}}>
                        <Image source={require('../../assets/close2.png')} style={{width:40,height:40,}} />
                        </TouchableOpacity> */}
                <Animatable.Text
                  animation={'pulse'}
                  iterationCount={'infinite'}
                  use
                  useNativeDriver={true}
                  style={[
                    {
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: colors.bg,
                    },
                  ]}>
                  Seems like you logged in from a new device!{' '}
                </Animatable.Text>
                <Text
                  style={[
                    styles.text_footer,
                    {
                      textAlign: 'center',
                      color: colors.selectednew,
                      fontWeight: 'bold',
                      marginTop: 25,
                      fontSize: 26,
                    },
                  ]}>
                  Verify your Acoount
                </Text>
                <View
                  style={{
                    width: '70%',
                    borderBottomWidth: 0.5,
                    borderColor: 'grey',
                  }}></View>

                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    marginTop: 25,
                  }}>
                  {/* <View style={{borderWidth:0.5,width:'50%',borderRadius:10,flexDirection:'row',justifyContent:'space-between',backgroundColor:'white',
  marginHorizontal:10,height:50,marginTop:10}} > */}

                  {/* </View> */}
                  <TouchableOpacity
                    onPress={
                      Count1
                        ? null
                        : () => {
                            setCount1(true), OTPCall();
                          }
                    }
                    style={{alignSelf: 'center'}}>
                    <View
                      style={[
                        {
                          alignItems: 'center',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          height: 50,
                          paddingHorizontal: 5,
                          borderRadius: 5,
                          paddingVertical: 5,
                          width: 130,
                          backgroundColor: 'black',
                        },
                      ]}>
                      {Count1 ? null : (
                        <Text
                          style={[
                            styles.text,
                            {color: colors.selected, fontWeight: 'bold'},
                          ]}>
                          SEND CODE to EMAIL
                        </Text>
                      )}
                      {Count1 ? (
                        <Text
                          style={[
                            styles.text,
                            {color: colors.selected, fontWeight: 'bold'},
                          ]}>
                          RESEND CODE IN:{' '}
                          <Text style={{fontSize: 16}}> {seconds}</Text>{' '}
                        </Text>
                      ) : null}
                    </View>
                  </TouchableOpacity>

                  {Count1 ? (
                    <TextInput
                      placeholder="Verification Code"
                      style={[
                        {
                          backgroundColor: 'white',
                          marginTop: 15,
                          borderRadius: 5,
                          fontSize: 13,
                          fontWeight: 'bold',
                          shadowColor: 'white',
                        },
                      ]}
                      color={colors.selectednew}
                      keyboardType={'number-pad'}
                      autoCapitalize="none"
                      onChangeText={val => setVerify(val)}
                      width={130}
                      selectionColor={'black'}
                      maxLength={6}
                      placeholderTextColor={'grey'}
                    />
                  ) : null}
                </View>
                {Count1 ? (
                  <TouchableOpacity
                    onPress={async () => {
                      //console.log(
                      //   'verification code vs OTP call code :',
                      //   Verify + '  ' + OTP,
                      // );
                      if (Verify === OTP) {
                        setModalOTP(false);
                        ToastAndroid.show(
                          'Welcome to The World of Crypto Robot',
                          ToastAndroid.SHORT,
                        );
                        await AsyncStorage.setItem('device_db', 'false');
                      } else {
                        if (Verify == '') {
                          ToastAndroid.show(
                            'Please Enter Verification Code ',
                            ToastAndroid.SHORT,
                          );
                        } else {
                          ToastAndroid.show('Invalid Code', ToastAndroid.SHORT);
                        }
                      }
                    }}
                    style={{display: 'flex', marginTop: 50}}>
                    <LinearGradient
                      colors={['black', 'black']}
                      style={{
                        width: '80%',
                        borderRadius: 10,
                        paddingHorizontal: 25,
                        paddingVertical: 10,
                        alignSelf: 'center',
                        alignItems: 'center',
                      }}
                      start={{x: 0, y: 1}}
                      end={{x: 1, y: 1}}>
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: 17,
                        }}>
                        Verify
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ) : null}
              </ImageBackground>
            </View>
          </Modal>
          <Modal
            statusBarTranslucent={true}
            deviceHeight={1000}
            useNativeDriver={true}
            isVisible={Alert_Modal}
            onBackdropPress={() => {
              setAlert_Modal(false);
            }}
            onBackButtonPress={() => {
              setAlert_Modal(false);
            }}
            animationInTiming={300}
            animationOutTiming={200}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-around',
                paddingHorizontal: 15,
                paddingVertical: 10,
                marginTop: 90,
                height: '100%',
                width: '100%',
              }}>
              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: colors.background,
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  borderRadius: 20,
                  width: '100%',
                  height: '50%',
                  paddingVertical: 30,

                  marginHorizontal: 5,
                }}>
                <Text style={{color: '#fff', fontSize: 20}}>Alert Type :</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setAlert_type('price');
                    }}>
                    <Text
                      style={{
                        backgroundColor:
                          alert_type === 'price' ? colors.hgl : '#a0a0a0',
                        paddingHorizontal: 25,
                        fontWeight: 'bold',
                        paddingVertical: 5,
                        borderRadius: 5,
                      }}>
                      PRICE
                    </Text>
                  </TouchableOpacity>
                  <Text style={{color: '#fff'}}>/</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setAlert_type('roe');
                    }}>
                    <Text
                      style={{
                        backgroundColor:
                          alert_type === 'roe' ? colors.hgl : '#a0a0a0',
                        paddingHorizontal: 25,
                        fontWeight: 'bold',
                        paddingVertical: 5,
                        borderRadius: 5,
                      }}>
                      ROE
                    </Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setAlert_direction('above');
                    }}>
                    <Text
                      style={{
                        backgroundColor:
                          alert_direction === 'above' ? colors.hgl : '#a0a0a0',
                        paddingHorizontal: 5,
                        fontWeight: 'bold',
                        paddingVertical: 5,
                        borderRadius: 5,
                      }}>
                      {alert_type.toUpperCase()} : Rises Above{' '}
                    </Text>
                  </TouchableOpacity>
                  <Text style={{color: '#fff'}}>/</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setAlert_direction('below');
                    }}>
                    <Text
                      style={{
                        backgroundColor:
                          alert_direction === 'below' ? colors.hgl : '#a0a0a0',
                        paddingHorizontal: 5,
                        fontWeight: 'bold',
                        paddingVertical: 5,
                        borderRadius: 5,
                      }}>
                      {alert_type.toUpperCase()} : Drops To
                    </Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                  }}>
                  <TextInput
                    placeholder="Enter Value"
                    style={[
                      {
                        backgroundColor: '#808080',
                        marginTop: 15,
                        borderRadius: 5,
                        fontSize: 13,
                        fontWeight: 'bold',
                        shadowColor: 'white',
                      },
                    ]}
                    color={'#202020'}
                    keyboardType={'number-pad'}
                    autoCapitalize="none"
                    onChangeText={val => setVerify(val)}
                    width={250}
                    selectionColor={'#202020'}
                    maxLength={6}
                    placeholderTextColor={'#202020'}
                  />
                </View>
                <TouchableOpacity
                  onPress={async () => {
                    let dir =
                      alert_direction === 'above' ? 'greater' : 'lesser';
                    setAlert_Modal(false);
                    let url =
                      global.BASE_URL +
                      `css_mob/set_alert.aspx?uid=${
                        global.uid
                      }&tp=${alert_type.toUpperCase()}&tp1=${dir}&amount=${Verify}&pair=${alert_pair}&mode=${
                        hedge ? 'hedge' : 'normal'
                      }&side=${alert_side}`;
                    //console.log(url);
                    fetch(url)
                      .then(item => item.json())
                      .then(data => {
                        if (data.success === 'true') {
                          ToastAndroid.show(
                            'Alert Update Successfully',
                            ToastAndroid.SHORT,
                          );
                        } else {
                          ToastAndroid.show(
                            'Please Try Again After Sometime...',
                            ToastAndroid.SHORT,
                          );
                        }
                      });
                  }}
                  style={{padding: 5}}>
                  <LinearGradient
                    colors={['black', 'black']}
                    style={{
                      borderRadius: 10,
                      paddingHorizontal: 25,
                      paddingVertical: 10,
                      alignSelf: 'center',
                      alignItems: 'center',
                    }}
                    start={{x: 0, y: 1}}
                    end={{x: 1, y: 1}}>
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 17,
                      }}>
                      Add Alert
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal
            onBackButtonPress={() => {
              setTrialVisible(false);
            }}
            statusBarTranslucent={true}
            deviceHeight={1000}
            onBackdropPress={() => {
              setTrialVisible(false);
            }}
            useNativeDriver={true}
            isVisible={TrialVisible}
            animationInTiming={300}
            animationOutTiming={200}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-around',
                paddingHorizontal: 15,
                paddingVertical: 10,
                marginTop: 90,
                height: '100%',
                width: '100%',
              }}>
              <Image
                source={require('../../assets/smartbot/bot.png')}
                style={{
                  width: 110,
                  height: 140,
                  alignSelf: 'center',
                  marginBottom: -43,
                }}
                resizeMode={'stretch'}
              />
              <ImageBackground
                source={require('../../assets/botz/newsbox.png')}
                resizeMode={'stretch'}
                style={{
                  alignItems: 'center',
                  borderRadius: 20,
                  width: '100%',
                  height: '80%',
                  paddingVertical: 30,
                  borderColor: global.grad3,
                  marginHorizontal: 5,
                }}>
                <TouchableOpacity
                  style={{position: 'absolute', right: 0, top: -15}}
                  onPress={() => {
                    setTrialVisible(false);
                  }}>
                  <Image
                    source={require('../../assets/close2.png')}
                    style={{width: 40, height: 40}}
                  />
                </TouchableOpacity>

                <Text
                  style={[
                    styles.text_footer,
                    {
                      textAlign: 'center',
                      color: colors.selectednew,
                      fontWeight: 'bold',
                      fontSize: 22,
                    },
                  ]}>
                  We are happy to help you
                </Text>
                <View
                  style={{
                    width: '70%',
                    borderBottomWidth: 0.5,
                    borderColor: 'grey',
                  }}></View>
                {!Free_trial ? (
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'space-around',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setFree_trial(true);
                      }}>
                      <ImageBackground
                        source={require('../../assets/botz/free_trail.png')}
                        resizeMode={'cover'}
                        resizeMethod={'auto'}
                        style={{
                          width: 200,
                          height: 40,
                          justifyContent: 'center',
                          marginTop: 15,
                        }}></ImageBackground>
                    </TouchableOpacity>
                    <Text
                      style={{
                        textAlign: 'center',
                        marginTop: 15,
                        fontSize: 17,
                      }}>
                      or
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('DepositScreen'),
                          setTrialVisible(false);
                      }}>
                      <ImageBackground
                        source={require('../../assets/botz/activateid.png')}
                        resizeMode={'cover'}
                        resizeMethod={'auto'}
                        style={{
                          width: 200,
                          height: 40,
                          justifyContent: 'center',
                          marginTop: 15,
                        }}></ImageBackground>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <>
                    <View
                      style={{
                        width: '100%',
                        borderBottomWidth: 0.5,
                        borderColor: 'grey',
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: colors.text,
                          marginTop: 50,
                          fontWeight: 'bold',
                          marginHorizontal: 10,
                        }}>
                        1) Deposit 20 USD To The Address Given On Next Page
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: colors.text,
                          marginTop: 5,
                          fontWeight: 'bold',
                          marginHorizontal: 10,
                        }}>
                        2) After Depositing . It Will take 5 Minutes Time To
                        Start Your Trial Activation
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: colors.text,
                          marginTop: 5,
                          fontWeight: 'bold',
                          marginHorizontal: 10,
                        }}>
                        3) Trial will be of 7 days . all your trades will work
                        properly even after trial period expiry
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: colors.text,
                          marginTop: 5,
                          fontWeight: 'bold',
                          marginHorizontal: 10,
                        }}>
                        4) Only After Trial Period Expiry , Trades On new Coins
                        Wont Be Started
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('DepositScreen'),
                          setTrialVisible(false);
                      }}>
                      <ImageBackground
                        source={require('../../assets/botz/black_box.png')}
                        resizeMode={'stretch'}
                        style={{
                          width: 130,
                          height: 40,
                          justifyContent: 'center',
                          marginTop: 15,
                        }}>
                        <View>
                          <Text style={styles.sheading}>Activate</Text>
                        </View>
                      </ImageBackground>
                    </TouchableOpacity>
                  </>
                )}
              </ImageBackground>
              {/* <Text style={[styles.text_footer,{textAlign:'center',color:colors.selected}]}>Are you sure you want to stop the Bot?</Text>
           
            <View style={{flexDirection:'row',justifyContent: 'space-around',alignItems: 'flex-end',width:'100%'}}>
            <TouchableOpacity onPress={()=>{setNewsModal(false)}}>
                <View style={{marginTop:5,alignSelf: 'center',justifyContent: 'center',alignItems: 'center',borderRadius:5}}>
                    <Text style={{color:colors.hdl,fontFamily:global.appFontB,fontSize:17}}>Cancel</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{Push_btn(symbol)}}>
                <View style={{marginTop:5,alignSelf: 'center',justifyContent: 'center',alignItems: 'center',borderRadius:5}}>
                    <Text style={{color:'#f5f5f5',fontFamily:global.appFontB,fontSize:17}}>Confirm</Text>
                </View>
            </TouchableOpacity>
            </View> */}
            </View>
          </Modal>
        
      </Animatable.View>
      {/* <TouchableOpacity  style={{padding:20,backgroundColor:'red'}} onPress={() => refRBSheet1.current.open()}>
            <Text>click to opne rb sheet</Text>
          </TouchableOpacity>*/}
      <RBSheet
        ref={refRBSheet1}
        // closeOnDragDown={true}
        closeOnPressMask={true}
        height={350}
        style={{borderTopLeftRadius: 20, borderTopRightRadius: 20}}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent', //borderTopLeftRadius: 20, borderTopRightRadius: 20
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        {vItem != null ? (
          <View
            style={{
              flex: 10,
              flexDirection: 'column',
              backgroundColor: '#29313c', //borderTopLeftRadius: 20, borderTopRightRadius: 20
            }}>
            <View style={{paddingVertical: 5, width: '100%'}}>
              <Text
                style={[
                  styles.sheading,
                  {
                    fontWeight: 'bold',
                    color: colors.selected,
                    textAlign: 'center',
                    fontSize: 16,
                  },
                ]}>
                Adjust Margin (To Increase Liq Price)
              </Text>
            </View>
            <View style={{marginHorizontal: 10}}>
              <Text style={{color: '#717783', fontSize: 14}}>Amount</Text>
              <View
                style={{
                  backgroundColor: '#4a5666',
                  width: '100%',
                  alignSelf: 'center',
                  marginVertical: 5,
                  borderRadius: 5,
                  marginBottom: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 5,
                }}>
                <TouchableOpacity
                  style={{
                    width: '30%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{color: colors.selected}}>Add</Text>
                  <AntDesign name="caretdown" size={12} color={'#fff'} />
                  <View style={{width: 2, borderRightWidth: 0.5}}></View>
                </TouchableOpacity>
                <View style={{width: '50%'}}>
                  <TextInput
                    value={adjMargin}
                    placeholder=""
                    style={[
                      {
                        // backgroundColor: 'white',
                        marginTop: 0,
                        borderRadius: 5,
                        fontSize: 13,
                        fontWeight: 'bold',
                        shadowColor: 'white',
                        width: '100%',
                      },
                    ]}
                    contentContainerStyle={{width: '100%'}}
                    keyboardType={'number-pad'}
                    autoCapitalize="none"
                    onChangeText={val => {
                      setAdjMargin(val);
                    }}
                    // width={130}
                    selectionColor={'white'}
                    // maxLength={6}
                    color={'white'}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    width: '15%',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setAdjMargin(
                        global.AccMode == 'live' ? Bal : global.demobal,
                      );
                    }}
                    style={{}}>
                    <Text
                      style={{
                        color: colors.binanceylw2,
                        fontWeight: 'bold',
                        fontSize: 14,
                        marginRight: 5,
                      }}>
                      Max
                    </Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity style={{}}> */}
                  <Text
                    style={{
                      color: '#747b86',
                      fontWeight: 'bold',
                      fontSize: 14,
                    }}>
                    USD
                  </Text>
                  {/* </TouchableOpacity> */}
                </View>
              </View>
              <View style={styles.view}>
                <Text style={{color: '#717783', fontSize: 13}}>
                  Currently Assigned Margin
                </Text>
                <Text style={{color: colors.selected, fontSize: 13}}>
                  {(
                    parseFloat(vItem.usdt) / parseFloat(vItem.leverage)
                  ).toFixed(2)}{' '}
                  USD
                </Text>
              </View>
              <View style={styles.view}>
                <Text style={{color: '#717783', fontSize: 13}}>
                  Max Addable
                </Text>
                <Text style={{color: colors.selected, fontSize: 13}}>
                  {vItem.mode == 'live' ? Bal : global.demobal} USD
                </Text>
              </View>
              <View style={styles.view}>
                <Text style={{color: '#717783', fontSize: 13}}>
                  Est.Liq.Price after increase
                </Text>
              
                <Text style={{color: colors.selected, fontSize: 13}}>
                  {liq_calculator(vItem, adjMargin)}
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setCNFRM(true);
                  setConfirm_add_margin(true);
                  adjustMargin();
                }}
                disabled={confirm_add_margin}
                style={{
                  backgroundColor: colors.binanceylw2,
                  borderRadius: 5,
                  paddingVertical: 5,
                  marginTop: 10,
                }}>
                <View>
                  <Text style={[styles.dark_heading, {color: colors.c3}]}>
                    {CNFRM ? (
                      <ActivityIndicator size={20} color={'#000'} />
                    ) : (
                      'Confirm'
                    )}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </RBSheet>
    </ImageBackground>
  );
};

const liq_calculator = (item, adjMargin) => {
  let EP = parseFloat(item.avg).toFixed(4); //2.1852
  let margin = parseFloat(item.myusdt) + parseFloat(adjMargin); //20
  let PS = parseFloat(item.usdt).toFixed(4); //98.334
  let b_share = PS - margin; //140.73
  let surplus = b_share + margin * 0.05; //1.336
  let f_percentage = surplus / PS; //0.84840
  let total = f_percentage * EP;
  let ntotal = 0;
  let ptotal = 0;
  if (item.side === 'SELL') {
    ntotal = EP - total;
    ptotal = parseFloat(EP) + parseFloat(ntotal);
    if (isNaN(ptotal)) {
      ptotal = 0;
    }

    return parseFloat(ptotal).toFixed(6);
  } else {
    if (isNaN(total)) {
      total = 0;
    }
    return total.toFixed(6);
  }
};

export default HomeScreen;

const styles1 = StyleSheet.create({
  icons: {
    width: 30,
    height: 30,
  },
  modal: {
    color: '#fff',
    fontSize: 16,
  },
  icons1: {
    width: 40,
    height: 40,
  },
  container: {
    flex: 1,

    backgroundColor: '#0B1725',
  },
  text: {
    color: '#f5f5f5',
    fontWeight: 'bold',
    fontSize: 10,
    fontFamily: 'arial,sans-serif',
  },
  bx: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    // borderWidth:1,
    borderRadius: 10,
    // borderColor:"#3D3F70",
    marginVertical: 5,
    // backgroundColor:'#ff0000',
    paddingHorizontal: 5,
    marginHorizontal: 5,
    width: 80,
    alignItems: 'center',
    height: 90,
  },
  userType: {
    width: 320,

    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    shadowColor: 'black',
    marginTop: 10,
    flexDirection: 'row',
  },
  Rate: {
    color: '#ffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  textInput: {
    marginLeft: 15,
    marginTop: -15,
    paddingBottom: -10,
  },
  text_header: {
    color: '#f8f8f8f8',
    fontWeight: 'bold',
    fontSize: 17,
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //   borderBottomWidth: 0.5,
    //   borderBottomColor: '#80808080',

    paddingHorizontal: 8,
    paddingVertical: 15,
  },
  text_footer: {
    color: '#b9b9b9b9',
    // fontWeight: '400',
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
  Title: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#d5d5d5d5',
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
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
    marginBottom: 5,
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



