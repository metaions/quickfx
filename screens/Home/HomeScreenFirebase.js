//#region 
// position => symbol
// super => symbol
// copy => pair
//#endregion

import * as React from 'react';
import {
  ThemeProvider,
  useFocusEffect,
  useIsFocused,
  useTheme,
  useLinkTo,
  useNavigation,
} from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

import PushNotification from 'react-native-push-notification'
// import Aes from 'react-native-aes-crypto'
import images from '../../component/images'
import CountdownTimer from '../../component/CountdownTimer';
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
  PermissionsAndroid,
  Image,
  StatusBar,
  FlatList,
  TextInput,
  ActivityIndicator, NativeModules,
  ImageBackground,
  ToastAndroid, KeyboardAvoidingView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import messaging from '@react-native-firebase/messaging';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import { FAB, Menu, Button, Divider, List } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { AuthContext } from '../../component/context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import AutoScrolling from 'react-native-auto-scrolling';
// import ResetFn from '../ResetFn';
import Swiper from 'react-native-swiper';
// import TextTicker from 'react-native-text-ticker';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import Foundation from 'react-native-vector-icons/Foundation';
import database, { firebase } from '@react-native-firebase/database';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import global from '../../component/global';
import WebChart from '../../component/WebChart'
import styles, { wid } from '../../component/styles';
// import { indexOf, once, setLdMode index from 'lodash';
import { indexOf, set } from 'lodash';
import { captureScreen, captureRef } from 'react-native-view-shot';
var RNFS = require('react-native-fs');
import Share from 'react-native-share';
import { jsonContext } from '../../context/GlobalState';
import Modal from 'react-native-modal';
// import messaging from '@react-native-firebase/messaging';
import Slider from 'react-native-slider';
var intervalArr = []
// import {

//   checkNotificationPermission,
// } from 'react-native-check-notification-permission';
var SendIntentAndroid = require("react-native-send-intent");
var DeviceInfo = require('react-native-device-info');
var arr = [];
var allcoins = '';
var symbol = '';

var iscalled = false;
var bg = '#111c2e';

var called1 = false;
// var Aes = NativeModules.Aes;
var normalbg = '#202b3f';
let interval = '';
let interval2 = '';
var total_count = 0
var total_count2 = 0
var open_count2 = 0
var total_count3 = 0
var open_count3 = 0
var firedb_loaded = false

import btc_img from '../../assets/temp/icon8.png'
import mainbg from '../../assets/temp/assets-box-bg.png'
import { color, log } from 'react-native-reanimated';
import { parse } from 'react-native-svg';
import { split } from 'lodash';
import ResetFn from '../ResetFn';
let tokenCalled = false
// const { IconChanger } = NativeModules;
const HomeScreenFirebase = props => {

  let listViewRef;
  let listViewRefBroker;

  ///////////////////////code for timer//////////
  let fullOtherDate
  let DiffDate
  let NOW_IN_MS2
  let dateTimeAfter
  let thisDate = new Date().toString()
  let thisDateW = new Date()
  // console.log('1- '+thisDate)
  let diff = parseInt(thisDateW.getTimezoneOffset());
  let xGMT = -330 - diff
  // console.log('its diff: '+xGMT+'  '+diff);
  thisDateW = new Date(thisDateW.setMinutes(thisDateW.getMinutes() - xGMT))
  thisDate = thisDateW.toString()

  //subtract xGMT from values for correct value
  let otherDateReal = thisDateW//.toString()
  let otherDate = thisDate.split(' ')
  if (otherDate[0] == 'Sat' || otherDate[0] == 'Sun') {
    var numberOfDaysToAdd = 1;
    if (otherDate[0] == 'Sat') {
      numberOfDaysToAdd = 2
    }
    var result = new Date(otherDateReal.setDate(otherDateReal.getDate() + numberOfDaysToAdd));
    // console.log('its in 20 :'+result);
    otherDate = result.toString().split(' ')

    otherDate[4] = "05:30:00"
  }
  else {
    // console.log('today is not sat and sun=============');
    if (parseInt(otherDate[4].split(':')[0]) >= 16)//&& parseInt(otherDate[4].split(':')[1])>30)
    {
      // console.log('4 wj gye ne=============');
      if (parseInt(otherDate[4].split(':')[1]) >= 0 && parseInt(otherDate[4].split(':')[0]) == 16) {
        var numberOfDaysToAdd = 1;
        if (otherDate[0] == 'Fri') {
          numberOfDaysToAdd = 3
        }
        else {

        }
        // console.log('otherdatareal: '+otherDateReal);
        var result = new Date(otherDateReal.setDate(otherDateReal.getDate() + numberOfDaysToAdd));
        // console.log('its in 20 :'+result);
        otherDate = result.toString().split(' ')

        otherDate[4] = "05:30:00"
      }
      // else if (parseInt(otherDate[4].split(':')[1]) < 30 && parseInt(otherDate[4].split(':')[0]) == 17) {
      //   //no need for timer at this level
      // }
      else {
        var numberOfDaysToAdd = 1;
        if (otherDate[0] == 'Fri') {
          numberOfDaysToAdd = 3
        }
        else {

        }
        var result = new Date(otherDateReal.setDate(otherDateReal.getDate() + numberOfDaysToAdd));
        otherDate = result.toString().split(' ')

        otherDate[4] = "05:30:00"
      }
    }
    else if (parseInt(otherDate[4].split(':')[0]) >= 0 && parseInt(otherDate[4].split(':')[0]) <= 5) {
      if (parseInt(otherDate[4].split(':')[1]) >= 30 && parseInt(otherDate[4].split(':')[0]) == 5) {
        //dont do anything
      }
      else {

        // otherDate = result.split(' ')
        otherDate[4] = "05:30:00"
      }
    }
    else {
      //should not show timers
    }
  }
  fullOtherDate = otherDate.toString().replace(/,/ig, ' ')
  // console.log('fullotherdate '+fullOtherDate);
  DiffDate = (new Date(fullOtherDate) - new Date(thisDate))
  // console.log(new Date(fullOtherDate)+'    '+new Date(thisDate));
  // console.log(DiffDate);

  NOW_IN_MS2 = new Date().getTime();

  dateTimeAfter = NOW_IN_MS2 + DiffDate;

  ///////end of code for timer/////////////////

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'QuickFx app permission',
          message:
            'Quickfx App requires Storage permission for ' +
            'uploading KYC or for sharing Screenshots',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  
  var started_checking_rates = false;
  const navigation = useNavigation()
  const [keyboardStatus, setKeyboardStatus] = React.useState(false);
  const [mLoading, setMLoading] = React.useState('false,-1');
  const { colors } = useTheme();
  const AnimationRef = React.useRef(null);
  const [dur, setDur] = React.useState(500);
  const { signOut } = React.useContext(AuthContext);
  const [infoModal, setInfoModal] = React.useState(false);
  const {
    setMyjson,
    callStore,
    setCallStore, myjson,
    setGlobalAcc,
    setUID,
    UID,
    earningmodal,
    setEarningmodal,
    setHedge,
    hedge,
    setSafeMode, setOtpMode, setAgreeSuperbot
    , setAppVer, mainBal, setMainBal,
    isHedgeBot, setIsHedgeBot, isSuperBot, setIsSuperBot
  } = React.useContext(jsonContext);
  const [sortStatus, setSortStatus] = React.useState(3);
  const [API_KEY, setAPI_KEY] = React.useState(false);
  const [API_K, setAPI_K] = React.useState();
  const [superData, setSuperData] = React.useState([]);
  const [normalData, setNormalData] = React.useState([]);
  const [notifPerm, setNotifPerm] = React.useState(true);
  const [signalData, setSignalData] = React.useState(null);
  const [clickedItem, setClickedItem] = React.useState('-1');
  const [signalData2, setSignalData2] = React.useState(null);
  const [netPNL, setnetPNL] = React.useState('');
  const [signalVis, setSignalVis] = React.useState(false);
  const [MenuVisible, setMenuVisible] = React.useState(false);
  const [optionModal, setOptionModal] = React.useState(false);
  const [optLoading, setOptLoading] = React.useState(false);
  const [showTriggermodal, setShowTriggermodal] = React.useState(false)
  const [triggerData, setTriggerData] = React.useState()
  const [hideRefresh, setHideRefresh] = React.useState(-1)
  const [API, setAPI] = React.useState('');
  const [ShowData, setShowData] = React.useState('both');
  const [errorModal, setErrorModal] = React.useState(null);
  const [Uid, setUid] = React.useState(global.uid);
  const [listShow, setListShow] = React.useState(false);
  const [signalInterval, setSignalInterval] = React.useState('15');
  const [alert_type, setAlert_type] = React.useState('price');
  const [alert_direction, setAlert_direction] = React.useState('above');
  const [btcptp, setBTCPTP] = React.useState('0');
  const [btcrate, setBTCRATE] = React.useState('0');
  const [btcinr, setBTCINR] = React.useState('0');
  const [hideBlock, setHideBlock] = React.useState(false);
  const [coinStatus, setCoinStatus] = React.useState(false);

  const [Tour, setTour] = React.useState(false);

  const [copyTotal, setCopyTotal] = React.useState(0);
  const [normalTotal, setNormalTotal] = React.useState(0);

  const [CNFRM, setCNFRM] = React.useState(false);
  const [wait, setWait] = React.useState(false);
  const [ldMode, setLdMode] = React.useState(-1);
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
  const [appModal, setAppModal] = React.useState(false);
  const [cnt, setCnt] = React.useState('0');
  const [ScrollDta, setScrollDta] = React.useState(global.news);
  const [Search, setSearch] = React.useState(false);
  const [Bal, setBal] = React.useState('');
  const [Loading, setLoading] = React.useState(true);
  const [confirm_add_margin, setConfirm_add_margin] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [refreshingBal, setRefreshingBal] = React.useState(false);

  const [brokerModal, setBrokerModal] = React.useState(false);

  const [pnlSuperPosition, setPnlSuperPosition] = React.useState('');
  const [pnlSuper, setPnlSuper] = React.useState(0);
  const [pnlPosition, setPnlPosition] = React.useState(0);

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
  const [addMoneyModel, setAddMoneyModal] = React.useState(false)
  const [addAmount, setAddAmount] = React.useState('')
  const [cparamsModal, setCparamsModal] = React.useState(false)
  const [superItem, setSuperItem] = React.useState(null)
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

  const [totalCount2, setTotalCount2] = React.useState(0)
  const [openCount2, setOpenCount2] = React.useState(0)
  const [totalCount3, setTotalCount3] = React.useState(0)
  const [openCount3, setOpenCount3] = React.useState(0)
  const [totalCount, setTotalCount] = React.useState(0)
  const [newsModal, setNewsModal] = React.useState(false);
  const [Free_trial, setFree_trial] = React.useState(false);
  const [BinBal, setBinBal] = React.useState(false);
  const [positionPanel, setPositionPanel] = React.useState(false);
  const [OpenPanel, setOpenPanel] = React.useState(false);
  const [CopyPanel, setCopyPanel] = React.useState(true);

  const [isloadedx, setisloadedx] = React.useState(false);
  const [closeClicked, setCloseClicked] = React.useState('false,-1');
  const [closeNorClicked, setCloseNorClicked] = React.useState('false,-1');
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
  const [symSignal, setSymSignal] = React.useState('')
  var date = new Date().getDate(); //To get the Current Date
  var month = new Date().getMonth() + 1; //To get the Current Month
  var year = new Date().getFullYear(); //To get the Current Year

  const [refVis, setRefVis] = React.useState(true);
  const [NewAvg, setNewAvg] = React.useState('0');

  const [Input1, setInput1] = React.useState('');
  const [Input2, setInput2] = React.useState('0.01');
  const [Type, setType] = React.useState('cycle');
  const [avgMarginModal, setAvgMarginModal] = React.useState(false)
  const [MP, setMP] = React.useState(false);
  const [Strategy, setStrategy] = React.useState(global.strategy);
  const [CPrice, setLastPrice] = React.useState('0');
  const [NewAvg1, setNewAvg1] = React.useState('0');
  const [totalSuperMargin, setTotalSuperMargin] = React.useState(0)
  const [totalSuperPNL, setTotalSuperPNL] = React.useState(0)
  const [closeDoubleClicked, setCloseDoubleClicked] = React.useState('false,-1');
  const [closeNorDoubleClicked, setCloseNorDoubleClicked] = React.useState('false,-1');
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

  // function decrypt(encryptedData, key) {
  //   console.log({ encryptedData, key });
  //   return Aes.decrypt(
  //     encryptedData.cipher,
  //     key,
  //     encryptedData.iv,
  //     'aes-256-cbc',
  //   );
  // };




  React.useEffect(() => {
    requestStoragePermission()
    // let n = newnum;
    //   NotificationsAndroid.localNotification({
    //     title: "Local notification",
    //     body: "This notification was generated by the app!",
    //     extra: "data"
    // });
    createChannel()
    // let ky = 'pOssg/wN624S5aM2p1v5fI3+Acvk7uaHLBqeQtQ7sdE='//Vdta.secret_key
    // let iv = ''
    // let result = decrypt(ky, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    // console.log('key decrepted---------------' + JSON.stringify(result) + ' -----------------------------');
    // setDec(decrypted);

    // SendIntentAndroid.isAppInstalled("com.google.android.gm").then(isInstalled => {
    //   console.log('========================gaming installed-----------------------------------------------------'+isInstalled)
    // });
    if (Uid !== '' && Uid !== undefined && Uid !== null) {
      StoreApiNEW(Uid);
      if (global.dt === '') {
        callApi(Uid);
        getBalanceApi()
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

  // React.useEffect(() => {
  //   let totalMargin = 0
  //   let totalPL = 0
  //   // console.log('vals--------------------'+JSON.stringify(superData));
  //   if (superData.length > 0) {
  //     superData.map((item, index) => {
  //       if (item.opens == '1') {

  //         let a = parseFloat(item.margin_buy) + parseFloat(item.margin_sell)
  //         totalMargin += a



  //         totalPL += calculate_pnl(item)


  //       }
  //     })
  //     // console.log(`========pnl2:  ${totalPL}`);

  //     setTotalSuperMargin(totalMargin)
  //     setTotalSuperPNL(totalPL)
  //   }
  // }, [superData])

  React.useEffect(() => {
    let totalPNL = 0
    if(normalData.length>0){
      normalData.map((item, index) => {
        if(!(!!item.buy_price)){
          totalPNL += 0
        }
        else{

          totalPNL += item.side == 'BUY' ? parseFloat(calculate_pnlBuy(item, 'normal')):parseFloat(calculate_pnlSell(item, 'normal'))
        }

      })
      setnetPNL(totalPNL.toFixed(2))
      
    }
    else{

      setnetPNL('')
    }
  },[normalData])
  ///////////////
  useFocusEffect(
    React.useCallback(() => {
      let isMounted = true
      const get_dta = async () => {

        let uid;
        uid = null;
        let pass;
        pass = null;
        let api_key;
        let device;
        let my_pwd = null;
        if (!isMounted) {
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
      return () => {
        isMounted = false
      }
    }, [global.status]),
  );

  function createChannel() {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'Test Channel'
    })
  }
  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      global_store(global.api_key_data.hedge, 'notification');
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', backAction);
      setChartIndex(null);

      // console.log('==before timeout==started checking rates-----------' + started_checking_rates)
      setTimeout(() => {
        // if (!started_checking_rates)
        // {
        // console.log('====started checking rates-----------' + started_checking_rates)
        if (thisDate.split(' ')[0] == 'Sat' || thisDate.split(' ')[0] == 'Sun') {
          if (global.symname != null && global.symname)//&& !global.symname1) { //new added by nav on 9aug =>  && !global.symname1
          { } else {
            return;
          }

          tradeApi(allcoins, 2);
        } else {
          console.log('======== calling from part 9000', new Date().toLocaleTimeString());
          startinterval();
        }
        // }

      }, 9000);


      if (global.dt === '') {
        CallMe();
      }
      ///////////////

      if (!noMoreHits) {

        allcoins = global.Coins;

        if (allcoins != '' && allcoins) {

          setisloadedx(true);

          if (allcoins[0].success && allcoins[0].success == 'false') {
            global.Coins = ''
            console.log('==========calling tradeapi in 1=========');
            tradeApi('', 1);
          } else {
            console.log('==========calling tradeapi in 2=========');
            tradeApi(allcoins, 1);
          }

        } else {
          if (Uid !== '') {
            console.log(`main root of issue1`);
            // api_key_api(Uid, 'use focus effect11');


          } else {
            console.log(`main root of issue2`);
            CallMe();
          }

          setLd(false);


        }

        return () => {
          console.log('-------------clearing intervals')
          // clearInterval(interval);
          console.log('interval arr2: ' + intervalArr);
          // clearInterval(interval)
          intervalArr.map(it => {
            clearInterval(it)
            console.log('cleared arr2: ' + it);

          })
          // clearInterval(interval2);
          // arrIntervals.map((a) => {
          //   console.log(a)
          //   clearInterval(a);
          //   // arrIntervals = [];
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
      { text: 'YES', onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };


  // React.useEffect(() => {
  //   // ToastAndroid.show('Loading 2nd Page..',ToastAndroid.SHORT)
  //   // if (!global.appStarted) {//if (!!global.secondaryApp) {
  //   //   global.appStarted = true;
  //   //   getfirebasedb()
  //   // }
  //   async function appmodal() {
  //     let apm = await AsyncStorage.getItem('appmodal')
  //     let startModal = await AsyncStorage.getItem('startmodal')
  //     let superbotModal = await AsyncStorage.getItem('superbotmodal');
  //     var token = await AsyncStorage.getItem('token');
  //     global.token = token
  //     if (superbotModal != undefined && superbotModal != null) {
  //       setAgreeSuperbot(superbotModal)
  //     }
  //     if (apm !== 'false') {
  //       setAppModal(true)
  //     }
  //     if (startModal !== 'false' && apm == 'false') {
  //       console.log('====set appstart modal true');
  //       setTour(true)
  //     }
  //   }
  //   // appmodal()
  // }, []);
  const getfirebasedb = async () => {
    var secondaryApp
    const credentials = {
      apiKey: "AIzaSyCBJzA45NJXThpgpstiW7u-lACpo4FIq2o",
      authDomain: "metafx-68332.firebaseapp.com",
      databaseURL: "https://metafx-68332-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "metafx-68332",
      storageBucket: "metafx-68332.appspot.com",
      messagingSenderId: "921633931580",
      appId: "1:921633931580:web:581289f192fdef0fa8de39"
    };
    const config = {
      name: 'OtherFDB',
    };
    if (firebase.apps.length < 2) {

      secondaryApp = await firebase.initializeApp(credentials, config);
      console.log('see my firebase apps if ', secondaryApp);
    }
    else {
      secondaryApp = firebase.apps[1]
      console.log('see my firebase apps ', firebase.apps[1]);
    }

    global.secondaryApp = secondaryApp
    console.log('secondaryapp:: ' + secondaryApp);


  }

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
  }, []);
  React.useEffect(() => {

    store_Call;
  }, [callStore]);

  function getBalanceApi(){
    setRefreshingBal(true)
    let url1 =
    global.BASE_URL +
    'm/refr.aspx?uid=' +
    global.uid 
    consoleFn(url1, 'start', new Date().toLocaleTimeString());
    fetch(url1)
    .then(item => item.json())
    .then(dta => {
    }).catch(err => {
      console.log('exc ',err);
      let url =
      global.BASE_URL +
      'css_mob/get_bin_bal.aspx?asset=USDT&api_key=' +
      global.api_key +
      '&api_secret=' +
      global.api_secret +
      '&uid=' +
      global.uid +
      '&token=' +
      global.token +
      '&device=' +
      DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel();
    consoleFn(url, 'start', new Date().toLocaleTimeString());
    fetch(url)
      .then(item => item.json())
      .then(dta => {
        //consoleFn(url,'end',new Date().toLocaleTimeString());
  
        setBal(Math.round(dta.dbalance, 2));
        // setMainBal(Math.round(dta.balance, 4))
        global.balance = parseFloat(dta.dbalance).toFixed(2); //Math.round(dta.dbalance, 4)
        // global.livebal = parseFloat(dta.balance).toFixed(2); //Math.round(dta.balance, 4)
        // setLoading(false)
        setRefreshingBal(false)
      }).catch(e => {
        console.log('error ss',e)
        setRefreshingBal(false)
      })
    })
   
  }

  React.useEffect(() => {
    let isMounted = true
    const get_dta = async () => {

      let uid;
      let api_key;
      let my_pwd = null;
      let api_secret
      if (!isMounted) {
        return
      }
      try {
        uid = await AsyncStorage.getItem('user_id');
        my_pwd = await AsyncStorage.getItem('myPwd');
        api_key = await AsyncStorage.getItem('api_key');
        api_secret = await AsyncStorage.getItem('secret_key');
        global.askValue = await AsyncStorage.getItem('ask');
        console.log('vals of both: ' + api_key + '  ' + api_secret);
        setMy_Pwd(my_pwd);

        setAPI_K(api_key);

        if (
          api_key != '' ||
          (api_key != null && secret_key != '') ||
          api_secret != null
        ) {
          setAPI_KEY(true);
          let url = '';
          global.closesocket = 1;
          return

         
        } else {
          setAPI_KEY(false);
        }
      } catch (e) {
        //console.log(e);
      }
    };
    get_dta()
    return () => {
      isMounted = false
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
    if (closeNorClicked.split(',')[0] == 'true') {
      ToastAndroid.show(
        'Please tap once more to Close Position..',
        ToastAndroid.SHORT,
      );
      setTimeout(() => {
        setCloseNorClicked('false,-1');
      }, 5000);
    }
  }, [closeNorClicked]);
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


  React.useEffect(() => { }, [FB_Data]);

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
    if (global.depShow != null) {
      if (global.depShow == 'True' && global.demo !== 'true' && global.dtxt != null) {

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
    } catch (e) { }
    //
    //pav
  };

  function global_store(hedgeval, from) {

    // console.log('for global_store: '+global.Store);

    if (global.Store && from !== 'notification') {
      return;
    }
    global.status = 'false';

    global.prevtime_market = new Date();

    var finaljson = '';
    setData('');
    console.log('----working till here1',from);
    let url1;
    if (hedgeval == 'True') {
      console.log('----working till here2',from);
      url1 =
        global.BASE_URL + 'css_mob/hedge/store_hedge.aspx?uid=' + global.uid +
        '&token=' +
        global.token +
        '&device=' +
        DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel();;
    } else {
      console.log('----working till here3');
      url1 = global.BASE_URL + 'css_mob/store.aspx?uid=' + global.uid +
        '&token=' +
        global.token +
        '&device=' +
        DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel();;
    }
    consoleFn(url1, 'start', new Date().toLocaleTimeString());
    fetch(url1)
      .then(item => item.json())
      .then(dta => {
        consoleFn(url1, 'end', new Date().toLocaleTimeString());
        setCallStore(false);
        global.Store = dta;
        callApiTOP10(dta);
      }).catch(e => {

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

    // let url2 = `http://43.205.88.26/getPrices?server=${(global.server_name!==''&& global.server_name!==null)?global.server_name.split('-')[0]:''}&pair=`; 
    // consoleFn(url2, 'callapitop10', new Date().toLocaleTimeString());
    // fetch(url2)
    //   .then(item => item.json())
    //   .then(newdta1 => {
    // console.log('coins:::'+JSON.stringify(newdta1));
    // newdta1.map(newdta => {
    // try {
    // console.log('coins:::'+JSON.stringify(Coins));
    Coins.map(dta => {
      var mode = dta.mode;
      var lastprice = '';
      var pcp = '';
      var symbol = dta.sym;
      var weightedaverage = '';
      var prev_close_price = '';
      var high_price = '';
      var low_price = '';
      var ask_price = '';

      var bid_price = '';

      lastprice = '0';
      pcp = '0';

      weightedaverage = 0;
      prev_close_price = 0;
      high_price = 0;
      low_price = 0;
      ask_price = 0;
      bid_price = 0;
      // let tradeStatus = dta.trade_status == 1 ? 'False' : 'True'
      pcp = parseFloat(pcp).toFixed(2);
      // console.log('before making json in calltop10');
      // if (symbol === dta.sym) {

      var json =
        "{'avg':'" +
        dta.avg_price +
        "','bst':'" +
        dta.bstatus +
        "','isfav':'" +
        dta.isfav +
        "','bst1':'" +
        dta.bot_status +
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
        dta.total_qty +
        "','qty1':'" +
        dta.total_orders +
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
        dta.update_dt +
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
        dta.total_qty +
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
      // }
    });
    // }
    // catch (err) {
    //   console.log('issue in calltop10: ' + err);
    // }

    // });

    finaljson = finaljson.replace(/\'/g, '"');
    finaljson = '[' + finaljson + ']';

    // settop10Data(JSON.parse(finaljson));
    // global.top10json = finaljson;
    // console.log('json data in top10: ');
    setMyjson(finaljson);
    setRefreshing(false);

    // }).catch(e => {
    //   console.log('exception in price.spas: ' + e+'   '+url2);
    // })
    // .then(() => {
    // });
  };




  const roe_cal = (item) => {
    return (
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

  const roe_cal_used = (item, side) => {

    return (
      side == 'long' || side == 'buy'
        ?
        parseFloat(item.avg_buy) == 0 ? 0 : (((parseFloat(item.startamt) - parseFloat(item.avg_buy)) / parseFloat(item.avg_buy)) * 100 * parseFloat(item.leverage)).toFixed(2)

        :
        parseFloat(item.avg_sell) == 0 ? 0 : ((((parseFloat(item.startamt) - parseFloat(item.avg_sell)) / parseFloat(item.avg_sell)) * 100 * parseFloat(item.leverage)) * -1).toFixed(2)



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
      global.txnPassword = txn_pwd;

    }
    api_key_api(uid, 'use focus effect22');

  }


  function startinterval() {
    // console.log('interval arr: '+intervalArr);
    // clearInterval(interval)
    intervalArr.map(it => {
      clearInterval(it)
      // console.log('cleared arr: '+it); 

    })
    // clearInterval(interval2)  
    // arrIntervals.map((a) => {
    //   console.log(a)
    //   clearInterval(a);
    //   // arrIntervals = [];
    // })

    // console.log('===============startinterval cleared both'); 
    interval = setInterval(() => {
      // console.log('===============startinterval inside interval '+interval+'  '+intervalArr+'   '+global.symname+'  '+new Date().toLocaleTimeString()); 
      // consoleFn(url2,'getsuperbotData',new Date().toLocaleTimeString());
      // if (thisDate[0] == 'Sat' || thisDate[0] == 'Sun') {
      // return
      // }
      // if (allcoins != '') {  //temp removed by nav on 10aug
      if (global.symname != null && global.symname)//&& !global.symname1) { //new added by nav on 9aug =>  && !global.symname1
      { } else {



        return;
      }
      // console.log('date' +otherDate[0]);
      // console.log('--------calling tradeapi from interval 000000----------'+allcoins+'====================  '+global.symname); 
      // console.log('--------calling tradeapi from interval 222222----------', new Date().toLocaleTimeString());
      tradeApi(allcoins, 2);
      // }
    }, 5000);
    intervalArr.push(interval)
    // interval2=setInterval(() => {
    //    try{         
    //      if (allcoins != '') {           
    //        if (global.symname != null && global.symname) {



    //     } else {



    //       if (!iscalled && global.api_key_data.hedge&&global.api_key_data.hedge!=null) {


    //         StoreApi(
    //           global.uid,
    //           '',
    //           'if Not Called',
    //           global.api_key_data.hedge,
    //         );
    //         iscalled = true;
    //       }

    //       return;
    //     }

    //   }
    // }catch(e){
    //   //console.log(e)
    // }
    // }, 2000);
    // intervalArr.push(interval)
    // intervalArr.push(interval2)

  }


  async function checkNotifPerm() {
    const allowed = true //await checkNotificationPermission();

    setNotifPerm(allowed);
  }

  async function checkPermission() {
    try {

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
    catch (error) {
      console.log('exception is: ' + error);
    }
  }
  const store_Call = React.useMemo(() => {
    if (callStore) {

      global.Store = null;
      try {
        global_store(global.api_key_data.hedge, 'from callstore');
      } catch (e) {

      }
    }
  }, [callStore]);


  function getImg(name) {
    let myimg
    images.map(e => {
      if (e.sym == name) {
        myimg = e.img
      }
    })
    return myimg

  }

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
        '&tp=add' +
        '&token=' +
        global.token +
        '&device=' +
        DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel();;
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
        '&tp=add' +
        '&token=' +
        global.token +
        '&device=' +
        DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel();
    }
    //consoleFn(url,'start',new Date().toLocaleTimeString());
    global.status = 'true';
    fetch(url)
      .then(item => item.json())
      .then(dta => {
        //consoleFn(url,'end',new Date().toLocaleTimeString());
        if (!dta.status) {
          ToastAndroid.show(dta.message, ToastAndroid.LONG);

        }
        setCNFRM(false);
        refRBSheet1.current.close();
        global.status = 'true';
        // global.Coins = '';
        // global.symname = '';
        // setCallStore(true);
        // iscalled = false;
        setConfirm_add_margin(false);
        setTimeout(function () {
          try {
            StoreApi(Uid, 'run', 'api_key_function4', global.api_key_data && global.api_key_data.hedge);
          } catch (e) {

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


  function update_bot_status(status, sym, side, botid) {

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
        side +
        '&token=' +
        global.token +
        '&device=' +
        DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel();;
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
        status +
        '&token=' +
        global.token +
        '&device=' +
        DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel();;
    }

    consoleFn(url, 'start', new Date().toLocaleTimeString());
    global.status = 'true';
    fetch(url)
      .then(item => item.json())
      .then(dta => {
        consoleFn(url, 'end', new Date().toLocaleTimeString());
        if (status == 'cancel') {
          setCloseDoubleClicked('false,-1')
          if (dta.status == true) {



            ToastAndroid.show(dta.message, ToastAndroid.SHORT);
            global.status = 'true';


            setTimeout(() => {
              setCancelling(false);
              // global.Coins = '';
              // global.symname = '';
              // var currentDate = new Date();
              // var minutesToAdd = 20;
              // var futureDate = new Date(
              //   currentDate.getTime() - minutesToAdd * 60000,
              // );
              // global.prevtime1 = futureDate;
              // global.prevtime = futureDate;
              // global.prevtime2 = futureDate;
              // global.prevtime3 = futureDate;
              // global.prevtime_market = futureDate;
              setMLoading('false,-1')
              // setCallStore(true);
              // iscalled = false;
            }, 5000);
          } else {
            // setMLoading('false,-1')
            ToastAndroid.show(dta.message, ToastAndroid.SHORT);
          }
        }
        else {

          setCloseClicked1('false,-1')
          if (dta.status == true) {

            // database(global.secondaryApp).ref('POSITION_BOT_FX/' + (Uid && Uid.toLowerCase()))
            // .once('value')
            // .then(snapshot => {
            //   var userData = snapshot.val();
            //   let keys = Object.keys(userData);

            //   keys.forEach((key, index) => {

            //     if (key.includes(sym.toUpperCase()) && key.includes(botid)) {
            //        database(global.secondaryApp).ref('POSITION_BOT_FX/' + (Uid && Uid.toLowerCase()) + '/' + key)
            //       .update({
            //         bot_status: status.toLowerCase()
            //       }).then(() => {
            //       console.log('=======update val')
            //     })
            //   }

            //   })
            // }).then(val=>{
            //   // setLoading(true)
            //   // onRefresh();
            // })

            ToastAndroid.show(dta.message, ToastAndroid.SHORT);
            // global.status = 'true';


            setTimeout(() => {
              setCancelling(false);
              // global.Coins = '';
              // global.symname = '';
              // var currentDate = new Date();
              // var minutesToAdd = 20;
              // var futureDate = new Date(
              //   currentDate.getTime() - minutesToAdd * 60000,
              // );
              // global.prevtime1 = futureDate;
              // global.prevtime = futureDate;
              // global.prevtime2 = futureDate;
              // global.prevtime3 = futureDate;
              // global.prevtime_market = futureDate;
              setMLoading('false,-1')
              // setCallStore(true);
              // iscalled = false;
            }, 5000);
          } else {
            setMLoading('false,-1')
            ToastAndroid.show(dta.message, ToastAndroid.SHORT);
          }
        }
      });
  }

  function marginFn(side, status) {
    setOptLoading(true)
    let url = `${global.BASE_URL}css_mob/hedge/stop_all_margin.aspx?uid=${Uid}&side=${side}&token=${global.token}&status=${status}&device=${DeviceInfo.getUniqueId()}&dname=${DeviceInfo.getModel()}`
    console.log(url);
    fetch(url).then(item => item.json())
      .then(dta => {
        if (dta.status == 'true') {
          setOptLoading(false)
          setOptionModal(false)
          ToastAndroid.show(`${dta.message} Successfully!`, ToastAndroid.SHORT)
          //  global.status = 'true';
          //  global.Coins = '';
          //  global.symname = '';
          //  setCallStore(true);
          //  iscalled = false;
          setTimeout(function () {
            try {
              StoreApi(Uid, 'run', 'api_key_function4', global.api_key_data && global.api_key_data.hedge);
            } catch (e) {

            }
          }, 2000);
        }
      }).catch(e => {
        console.log('error is : ' + e);
      })
  }
  function avgMarginFn(Mode) {

    // if (Click_buy) {
    console.log('clicked on confirm of add avg margin-----------------------------' + Input1 + '//' + Input2);
    if (Input1 != '' && Input2 != '') {
      setClick_buy(false)
      setP_order(true)
      placeOrder(Mode)
      // setTimeout(() => {
      //   // setClick_buy(true)
      // }, 15000)

    } else {
      ToastAndroid.show("Please fill all  the details ", ToastAndroid.SHORT)
    }
    // }

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

      '&side=' + '&status=' + status +
      '&token=' +
      global.token +
      '&device=' +
      DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel();
    ;
    consoleFn(url, 'start', new Date().toLocaleTimeString());
    global.status = 'true';
    fetch(url)
      .then(item => item.json())
      .then(dta => {
        //consoleFn(url,'end',new Date().toLocaleTimeString());
        setSuperClosed('false,-1')
        if (dta.status == true) {
          ToastAndroid.show(dta.message, ToastAndroid.SHORT);
          global.status = 'true';
          setTimeout(() => {
            setCancelling(false);

            // global.Coins = '';
            // global.symname = '';
            // var currentDate = new Date();
            // var minutesToAdd = 20;
            // var futureDate = new Date(
            //   currentDate.getTime() - minutesToAdd * 60000,
            // );
            // global.prevtime1 = futureDate;
            // global.prevtime = futureDate;
            // global.prevtime2 = futureDate;
            // global.prevtime3 = futureDate;
            // global.prevtime_market = futureDate;
            // setCallStore(true);
            // iscalled = false;
            setSuperClosedDouble('false,-1')
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
    // console.log('store api========' + global.Coins);
    if (global.Coins != null && global.Coins != '') {
      if (global.Coins != undefined) {
        // console.log('store api22========' + global.Coins);
        if (global.Coins[0].success === 'false') {
          // console.log('store api33========' + global.Coins);
          setNoMoreHits(true);
          setData('');///////by nav at start
          setCnt(0);
        } else {
          console.log('store api44========' + global.Coins);
          setNoMoreHits(false);

          if (!isloadedx) {
          }
          console.log('======hit trade api allcoins 3===========================');
          tradeApi(global.Coins, 3);
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
        // let diff = getDifferenceInMinutes(global.prevtime1, newDate);


        // if (diff < 20) {
        //   setLoading(false);

        //   return;
        // }
      } catch (e) { }
    }
    console.log('------navpreet singh before' + firedb_loaded)
    // if(firedb_loaded){
    //   return
    // }
    global.status = 'false';

    global.prevtime1 = new Date();

    let url1;



    if (global.hedge_updated == '') {
      api_key_api(Uid, 'hedge not updated');
    }
    global.Coins = '';
    global.symname = '';
    console.log('------navpreet singh here' + global.uid)
    // if(global.secondaryApp!==null){

    getsuperbotData(global.uid)
    // }
    setCancelling(false);

    global.uid = global.uid.trim()

    // const dbref = database(global.secondaryApp).ref('POSITION_BOT_FX/' + (global.uid && global.uid.toLowerCase()))
    // console.log('===========snapshot vals11111::' + dbref)
    // try {

    //   console.log('=============working till here=======' + database(global.secondaryApp).ref('POSITION_BOT_FX/' + (global.uid && global.uid.toLowerCase())))
    //   database(global.secondaryApp).ref('POSITION_BOT_FX/' + (global.uid && global.uid.toLowerCase())).on('value', snapshot => {

    //     console.log('======POSITION_BOT_FX=======inside=======')
    //     if (!snapshot.exists()) {
    //       setData('');
    //       //imp code check later====
    //       // setCnt(0);
    //       allcoins = '';

    //       global.Coins = '';
    //       // tradeApi('', 10);
    //       console.log('======POSITION_BOT_FX=======not exists=======')
    //       return//may cause error
    //     }
    //     console.log('======POSITION_BOT_FX======= exists=======')
    //     let dta = []
    //     // if(snapshot)
    //     snapshot.forEach(function (item) {
    //       let key = item.key;
    //       let data = item.val()
    //       // console.log('keys available in postion: ',data.bot_status);
    //       if (data.symbol) {

    //         dta.push(data)
    //       }
    //     })
    //     // console.log('====position=======snapshot vals::' + JSON.stringify(dta))
    //     if (dta.length == 0) {
    //       setPnlPosition(0)
    //       setData('');
    //     }
    //     global.callStore = false;

    //     setCnt(dta.length);

    //     allcoins = dta;

    //     global.Coins = dta;




    //     // console.log('setLdMode index empty Data=============='+dta)
    //     // console.log("Coinsis" + global.Coins)
    //     if (dta && dta.length > 0) {

    //       try {
    //         // console.log(dta,'jiijiijijijjijijij')
    //         if (dta[0].sym.endsWith('m') || dta[0].sym.endsWith('+') || dta[0].sym.endsWith('.r')) {
    //           global.addOnSymbol = dta[0].sym.slice(6, dta[0].length)
    //           // console.log('see add on symbol/'+global.addOnSymbol+'/');
    //         }


    //         setNoMoreHits(false);
    //         global.symname = ''
    //         tradeApi(dta, 10);



    //       }
    //       catch (e) {
    //         console.log('======hit trade api allcoins 5===========================');
    //         tradeApi(dta, 5);
    //         setLd(false);
    //         setLoading(false);
    //       }
    //     }

    //     setLd(false);
    //     setLoading(false);
    //     firedb_loaded = true
    //   })
    //   // .catch(ex => {
    //   //   console.log('EXCEPTION'+ex)
    //   //   setLd(false);
    //   //   setLoading(false);

    //   // });

    // }
    // catch (e) {
    //   console.log('excepiton because of thisss:: ' + e);
    // }
  };

  const getsuperbotData = (uid) => {
    let url = global.BASE_URL + 'css_mob/hedge/copy_trades.aspx?uid=' + global.uid +
      '&token=' +
      global.token + '&exchange=mt5' +
      '&device=' +
      DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel();

    consoleFn(url, 'start or this', new Date().toLocaleTimeString());
    fetch(url)
      .then(item => item.json())
      .then(dta => {
        global.symnameCopy = ''
        if (!!dta && !!dta.status && dta.status == false) {
          // dispatch(setCopyData([]))
          // dispatch(setCopyCoins([]))

          console.log('======copy bot=======not exists=======')
          global.normalData = []
          setNormalData([])
          setTotalCount3(0)
          global.symname2=''
          global.symname=''
          allcoins = ''
          return
        }
        if (dta[0].success == 'false') {
          // dispatch(setCopyData([]));
          // dispatch(setCopyCoins([]))
          global.normalData = []
          setNormalData([])
          setTotalCount3(0)
          global.symname2=''
          global.symname=''
          allcoins = ''

          console.log('======copy bot=======not22222222 exists=======')
          return//may cause error

        }



        global.normalData = dta
        if (global.normalData.length > 0) {

          if (global.normalData[0].pair.endsWith('m') || global.normalData[0].pair.endsWith('+') || global.normalData[0].pair.endsWith('.r')) {
            global.addOnSymbol = global.normalData[0].pair.slice(6, global.normalData[0].length)
            // console.log('see add on symbol/'+global.addOnSymbol+'/');
          }
        }
        total_count3 = 0
        open_count3 = 0
        global.symname2 = ''
        total_count3 = dta.length
        dta.map(e => {
          
          if (!!e.pair) {

            global.symname2 = global.symname2 + e.pair + ","

            if (!(e.pair).toString().includes('USD')) {
              if ((e.pair).toString().slice(3, 6) == 'JPY' || (e.pair).toString().slice(3, 6) == 'CHF' || (e.pair).toString().slice(3, 6) == 'CAD') {


                global.symname2 = global.symname2 + ',' + 'USD' + (e.pair).toString().slice(3, 6) + global.addOnSymbol + global.addOnSymbol + ',';

              }
              else {
                global.symname2 = global.symname2 + (e.pair).toString().slice(3, 6) + 'USD' + global.addOnSymbol + global.addOnSymbol + ',';

              }
            }
          }
          setTotalCount3(total_count3)

          tradeApi(dta, 4);
        })


      }
      )
      .catch(e=>{
        console.log('error sin  ',e);
      })
  }


  function getDifferenceInMinutes(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60);
  }

  const tradeApi = (Coins, num) => {
    // console.log('num is: '+num);
    if (num == 4) {

      // console.log('in trade api=====================' + num);
    }
    if (num == 10) {

      // console.log('in trade api=====================' + num);
    }

    // console.log('in trade api====================='+num );
    started_checking_rates = true;


    var finaljson = '';


    var s1 = '';
    let alldta = [];


    let tcnt = 0;

    // console.log('see symbolssss: '+global.symname+'  '+global.symname1+'  '+global.symname2);

    if (
      global.symname == '' ||
      global.symname == null ||
      global.symname.toString().indexOf('undefined') >= 0
    ) {
      global.symname = '';
      Coins = global.Coins;
      if (num == 10) {
        // console.log('====global coins in tradeapi: ' + Coins + ' ' + JSON.stringify(Coins) + '  symnamne1:' + global.symname1);
      }
      // console.log('====global coins in tradeapi: '+JSON.stringify(Coins) );
      // global.symname = 'BTCUSDT';
      try {
        if (Coins) {
          Coins.map(dta => {
            // console.log('in homescreenfirebase: =='+JSON.stringify(dta));
            if (global.symname == '' && dta.symbol) {

              global.symname = dta.symbol;
              if (!(dta.symbol).toString().includes('USD')) {
                if ((dta.symbol).toString().slice(3, 6) == 'JPY' || (dta.symbol).toString().slice(3, 6) == 'CHF' || (dta.symbol).toString().slice(3, 6) == 'CAD') {


                  global.symname = global.symname + ',' + 'USD' + (dta.symbol).toString().slice(3, 6) + global.addOnSymbol + ',';

                  // console.log('val of symname: 3 '+global.symname);
                }
                else {


                  global.symname = global.symname + ',' + (dta.symbol).toString().slice(3, 6) + 'USD' + global.addOnSymbol + ',';

                  // console.log('val of symname: 4 '+global.symname);
                }
              }
              // console.log('val of symname: 1 '+global.symname);
            } else if (dta.symbol) {
              if (global.symname == '') {

                global.symname = dta.symbol;
                // console.log('val of symname: 2 '+global.symname);
                // if((dta.symbol).toString().slice(3,6)!=='USD'){
                if (!(dta.symbol).toString().includes('USD')) {
                  if ((dta.symbol).toString().slice(3, 6) == 'JPY' || (dta.symbol).toString().slice(3, 6) == 'CHF' || (dta.symbol).toString().slice(3, 6) == 'CAD') {


                    global.symname = global.symname + ',' + 'USD' + (dta.symbol).toString().slice(3, 6) + global.addOnSymbol + ',';

                    console.log('val of symname: 3 ' + global.symname);
                  }
                  else {

                    global.symname = global.symname + ',' + (dta.symbol).toString().slice(3, 6) + 'USD' + global.addOnSymbol + ',';

                    console.log('val of symname: 4 ' + global.symname);
                  }
                }

              }
              else {

                global.symname = global.symname + ',' + dta.symbol + ',';
                // console.log('val of symname: 5 '+global.symname);
                // if((dta.symbol).toString().slice(3,6)!=='USD'){
                if (!(dta.symbol).toString().includes('USD')) {
                  if ((dta.symbol).toString().slice(3, 6) == 'JPY' || (dta.symbol).toString().slice(3, 6) == 'CHF' || (dta.symbol).toString().slice(3, 6) == 'CAD') {

                    global.symname = global.symname + ',' + 'USD' + (dta.symbol).toString().slice(3, 6) + global.addOnSymbol + ',';

                    // console.log('val of symname: 6 '+global.symname);
                  }
                  else {

                    global.symname = global.symname + ',' + (dta.symbol).toString().slice(3, 6) + 'USD' + global.addOnSymbol + ',';

                    // console.log('val of symname: 7 '+global.symname);
                  }
                }

              }
            }
          }

          );
        }
      } catch (e) {

        console.log('facing issue heres:: ' + e);

      }

      // global.symname = global.symname + ',' + global.symname1
    }
    if (num == 2) {

    }
    else {

      global.symname = global.symname + ',' + global.symname1 + ',' + global.symname2
      if (num == 10) {
        // console.log('====global coins in tradeapi: ' + Coins + ' ' + JSON.stringify(Coins) + '  symnamne1:' + global.symname1);
        // console.log('val of symname: 8 '+global.symname+'  '+JSON.stringify(Coins));
      }
    }
    // else if(global.symname1){
    //   global.symname = global.symname + ',' + global.symname1
    // }

    // console.log('in trade api222====================='+global.symname+'  sym1: '+global.symname1);


    // consoleFn(url2,`global.symname ${global.symname}`,new Date().toLocaleTimeString());
    if (global.symname != null && global.symname) {
    } else {
      return;
    }
    checkComma()
    function checkComma() {

      if (global.symname && global.symname.indexOf(',') == 0) {
        global.symname = global.symname.replace(',', '')
        // console.log('see syumnamnjejme: ' + global.symname.replace(',', ''));
        if (global.symname && global.symname.indexOf(',') == 0) {
          // global.symname = global.symname.replace(',', '')
          // console.log('running it::::============ ');
          checkComma()
        }
        else {
          return
        }
      }
    }

    let finalAllSymbols = global.symname
    if (finalAllSymbols.includes('++')) {
      finalAllSymbols = finalAllSymbols.split('++').join('')
    }
    if (finalAllSymbols.includes('+')) {
      finalAllSymbols = finalAllSymbols.split('+').join('')
    }
    let url2 = `${global.priceURL}?server=${(global.server_name !== '' && global.server_name !== null) ? global.server_name.split('-')[0] : ''}&pair=` + finalAllSymbols;
    // if(num==10){

    // consoleFn(url2,'getsuperbotData',new Date().toLocaleTimeString());

    // }
    finaljson = '';
    fetch(url2)
      .then(item => item.json())
      .then(newdta1 => {
        global.allSymbolPrices = newdta1
        try {

          let normalBt = [...global.normalData]
          // console.log(normalBt);
          normalBt.map((e, index) => {
            newdta1.map(newdta => {
              if (!!e.pair) {
                // console.log('vals of symn: : '+newdta.sym+'  '+e.pair);                    
                if (e.pair.includes(newdta.sym) || newdta.sym.includes(e.pair)) {
                  // superbt[index]['price'] = newdta.price
                  normalBt[index]['buy_price'] = newdta.buy_price
                  normalBt[index]['sell_price'] = newdta.sell_price
                }
               
              }
            })
          })
          // console.log('=======normal btt ',normalBt);

          if (normalBt.length > 0) {
            let totalPNL = 0
            normalBt.map((item, index) => {
              if (!!item.pair) {
                if(!(!!item.buy_price)){
                  totalPNL = parseFloat(totalPNL) + 0
                }
                else{
                   if (item.side == 'BUY') {
                  
                      totalPNL = parseFloat(totalPNL) + parseFloat(calculate_pnlBuy(item, 'normal'))
                      // console.log('total copy pnl'+index+'  : '+totalPNL);
                    }
                    else {

                      totalPNL = parseFloat(totalPNL) + parseFloat(calculate_pnlSell(item, 'normal'))
                      // console.log('total copy pnl'+index+'  : '+totalPNL);
                    }
                }
               
              }
            })
            // console.log('total copy pnl main  : '+totalPNL);
            setCopyTotal(totalPNL)
          }
          else {
            setCopyTotal(0)

          }
          // console.log('normal data real ',normalBt); 
          setNormalData(normalBt)

        }
        catch (e) { }
        // var json
        // newdta1.map(newdta => {
        //   // if (newdta.sym == 'BTCUSDT') {
        //   //   setBtcLive(newdta.price);
        //   // }                

        //   // try {
        //     // let superbt = [...global.superData]
        //     // console.log('super data should be  ',global.superData);
        //     // console.log('newdta data should be  ',newdta1);
        //     // try {

        //     //   superbt.map((e, index) => {
        //     //     newdta1.map(newdta => {
        //     //       if(!!e.symbol){
        //     //         if (newdta.sym.includes(e.symbol) || e.symbol.includes(newdta.sym)) {
        //     //           // console.log('vals of symn: : ',newdta.sym, e.symbol, newdta.buy_price , newdta.buy_price);                    
        //     //           // superbt[index]['price'] = newdta.price
        //     //           superbt[index]['buy_price'] = newdta.buy_price
        //     //           superbt[index]['sell_price'] = newdta.sell_price
        //     //         }

        //     //       }
        //     //     })
        //     //   })
        //     // } catch (error) {
        //     //   console.log('error ssss',error);
        //     // }
        //     // console.log('suprdata length: init '+JSON.stringify(superbt)); 
        //     // try {

        //     //   if(superbt.length > 0) {
        //     //     let totalPNL = 0
        //     //     superbt.map((item,index)=>{
        //     //       if(!!item.symbol){

        //     //         totalPNL=parseFloat(totalPNL) + parseFloat(calculate_pnl(item))
        //     //       }
        //     //     })
        //     //     if(!isNaN(totalPNL)){
        //     //       totalPNL=parseFloat(parseFloat(totalPNL).toFixed(2))
        //     //     }
        //     //     else{
        //     //       totalPNL=0
        //     //     }
        //     //     // console.log('type of super pnl : ', typeof(totalPNL));
        //     //     setPnlSuper(totalPNL)
        //     //   }
        //     //   else{
        //     //     setPnlSuper(0)

        //     //   }     
        //     // } catch (error) {
        //     //   console.log('error eee',error);

        //     // }
        //     // console.log('suprdata length: '+JSON.stringify(superbt));        
        //     // setSuperData(superbt)

        //   // }
        //   // catch (e) { }

        //   // try {
        //   //   if (num !== 4) {
        //   //     if(num==10){

        //   //     }
        //   //     // console.log('coins see it: '+newdta.sym+'   '+JSON.stringify(Coins));
        //   //     Coins.map(dta => {
        //   //       // lastprice = newdta.price;
        //   //       var lastprice=''

        //   //       if(newdta.sym.includes(dta.symbol) || dta.symbol.includes(newdta.sym))

        //   //       {
        //   //         // console.log('see symbols: '+newdta.sym+' '+dta.symbol);

        //   //         // console.log('see symbols work: '+newdta.sym+' '+dta.symbol);
        //   //         // newdta1.map(newdta => {
        //   //           // console.log('price of '+dta.symbol+'  '+newdta.buy_price+' price: '+newdta.sell_price);
        //   //         if(dta.side.toUpperCase()=='SELL'){
        //   //           lastprice = newdta.buy_price
        //   //         }
        //   //         else{
        //   //           lastprice = newdta.sell_price

        //   //         }
        //   //         // })
        //   //         //newdta1 => price api data
        //   //         //newdta =>
        //   //         var mode = dta.mode;
        //   //         var side = dta.side;
        //   //         // var lastprice = '';
        //   //         var pcp = '';
        //   //         var symbol = dta.symbol;
        //   //         var weightedaverage = '';
        //   //         var prev_close_price = '';
        //   //         var high_price = '';
        //   //         var low_price = '';
        //   //         var ask_price = '';
        //   //         var leverage = '';
        //   //         var bid_price = '';

        //   //         // pcp = newdta.pchange;
        //   //         weightedaverage = 0;
        //   //         prev_close_price = 0;
        //   //         high_price = 0;
        //   //         low_price = 0;
        //   //         ask_price = 0;
        //   //         bid_price = 0;
        //   //         pcp = '';
        //   //         prev_close_price = parseFloat(prev_close_price).toFixed(2);
        //   //         // if (dta.symbol ) {//&& (symbol.toLowerCase() == dta.symbol.toLowerCase())

        //   //           // console.log('==========dta.pair===========',dta.sl)                 
        //   //           tcnt = tcnt + 1;


        //   //           // old json maker
        //   //            json =
        //   //             "{'avg':'" +
        //   //             dta.avg_price +//entry_price +                  
        //   //             "','bst1':'" +
        //   //             dta.bot_status +
        //   //             "','img':'" +
        //   //             dta.img +
        //   //             "','leverage':'" +
        //   //             '1' +
        //   //             "','liq':'" +
        //   //             dta.liq_price +
        //   //             "','botid':'" +
        //   //             dta.botid +
        //   //             "','last_price':'" +
        //   //             lastprice +
        //   //             "','pcp':'" +
        //   //             pcp +
        //   //             "','qty':'" +
        //   //             dta.total_qty +
        //   //             "','qty1':'" +
        //   //             dta.total_orders +
        //   //             "','sym':'" +
        //   //             symbol +
        //   //             "','st':'" +
        //   //             dta.st +
        //   //             // (dta.trade_status==1?'False':'True') +
        //   //             "','tp':'" +
        //   //             dta.tp +
        //   //             "','tp_pip':'" +
        //   //             dta.tp_pip +
        //   //             "','usdt':'" +
        //   //             dta.total_usdt +
        //   //             "','trd_dt':'" +
        //   //             dta.last_dt +
        //   //             "','x_prev_cprice':'" +
        //   //             prev_close_price +
        //   //             "','x_hprice':'" +
        //   //             high_price +
        //   //             "','x_lprice':'" +
        //   //             low_price +
        //   //             "','x_askprice':'" +
        //   //             ask_price +
        //   //             "','x_bidprice':'" +
        //   //             bid_price +
        //   //             "','myusdt':'" +
        //   //             dta.total_qty +
        //   //             "','my_margin':'" +
        //   //             dta.my_margin +
        //   //             "','saveliq':'" +
        //   //             dta.liq_calls +
        //   //             "','save_liq_times':'" +
        //   //             dta.no_of_liq_calls +
        //   //             "','iscopy':'" +
        //   //             dta.iscopy +
        //   //             "','start_bot_variation':'" +
        //   //             dta.start_bot_variation +
        //   //             "','opens':'" +
        //   //             dta.trade_status.toString()+
        //   //           //  (dta.trade_status==1?'False':'True') +
        //   //             "','sl':'" +
        //   //             dta.sl +
        //   //             "','sl_pip':'" +
        //   //             dta.sl_pip +
        //   //             "','tsl':'" +
        //   //             dta.tsl +
        //   //             "','tsl_type':'" +
        //   //             dta.tsl_type +
        //   //             "','btc_callback':'" +
        //   //             dta.btc_callback +
        //   //             "','mode':'" +
        //   //             dta.mode +
        //   //             "','buy':'" +
        //   //             '1' +
        //   //             "','noc':'" +
        //   //             dta.noc +
        //   //             "','init_trade':'" +
        //   //             dta.init_trade +
        //   //             "','sell':'" +
        //   //             '1' +
        //   //             "','mmode':'" +
        //   //             dta.mmode +
        //   //             "','margin_call_drop':'" +
        //   //             dta.margin_call_drop +
        //   //             "','price_to_start_trade':'" +
        //   //             dta.price_to_start_trade +
        //   //             "','btcinit':'" +
        //   //             dta.btc_start_price +
        //   //             "','side':'" +
        //   //             side +

        //   //             "','margin_callback_limit':'" +
        //   //             dta.total_margins +
        //   //             "'}";
        //   //             // }
        //   //             // console.log('finaljson in steps: '+json);
        //   //             if (finaljson == '') {
        //   //               finaljson = json;
        //   //             } else {
        //   //               finaljson = finaljson + ',' + json;
        //   //             }
        //   //           }
        //   //         }
        //   //         )
        //   //       }
        //   //     }
        //   //     catch (e) {
        //   //       // console.log('PRINTING' + e)
        //   //     }

        //     })
        // console.log('json of data : '+finaljson)        
        // bindjson(finaljson);
        // finaljson=''


      }).catch(e => { }
        //   console.log('issue hjere dannn: '+e
        // )
      )


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

      try {
        if (lv.toFixed(2) != null && lv.toFixed(2) != undefined) {

          setLive(lv.toFixed(2));
        }
      }
      catch (e) {

      }
      try {
        if (dm.toFixed(2) != null && dm.toFixed(2) != undefined) {

          setDemo(dm.toFixed(2));
        }
      }
      catch (e) {

      }
      // {item.opens == '0'
      // ? ''
      // : 
      // item.side=='BUY'? calculate_pnlBuy(item,'position')
      // :
      // calculate_pnlSell(item,'position')}
      let myVal = JSON.parse(finaljson)
      // console.log('value of mval: '+JSON.stringify(myVal));
      if (myVal.length > 0) {
        let totalPNL = 0
        myVal.map((item, index) => {
          if (item.opens == '0') {
            totalPNL = parseFloat(totalPNL)
          }
          else {
            if (!!item.sym) {


              if (item.side == 'BUY') {

                totalPNL = parseFloat(totalPNL) + parseFloat(calculate_pnlBuy(item, 'position'))
              }
              else {

                totalPNL = parseFloat(totalPNL) + parseFloat(calculate_pnlSell(item, 'position'))
              }
            }
          }

        })
        if (!isNaN(totalPNL)) {
          totalPNL = parseFloat(parseFloat(totalPNL).toFixed(2))
        }
        else {
          totalPNL = 0
        }
        // var a=parseFloat(-1.12)
        setPnlPosition((totalPNL))
      }
      else {
        setPnlPosition(0)

      }
      // console.log('type of position pnl : ', finaljson);
      setData(JSON.parse(finaljson));

      setLoading(false)
      setRefreshing(false);
    }
  }

  const TradeType = (sym, type, orderType, botid) => {
    let tp;
    console.log('=========its ' + type)
    if (type.toLowerCase() === 'one-shot' || type.toLowerCase() === 'oneshot') {
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
        orderType +
        '&token=' +
        global.token +
        '&device=' +
        DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel();;
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
        mode +
        '&token=' +
        global.token +
        '&device=' +
        DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel();;
    }
    consoleFn(url, 'start', new Date().toLocaleTimeString());
    fetch(url)
      .then(item => item.json())
      .then(dta => {
        consoleFn(url, 'end', new Date().toLocaleTimeString());
        console.log('updated here');
        database(global.secondaryApp).ref('POSITION_BOT_FX/' + (Uid && Uid.toLowerCase()))
          .once('value')
          .then(snapshot => {
            var userData = snapshot.val();
            let keys = Object.keys(userData);
            // console.log('working till this update');
            keys.forEach((key, index) => {
              // console.log('working till this update2 '+key+'  bot id: '+botid+'  sym: '+sym);

              if (key.includes(sym.toUpperCase()) && key.includes(botid)) {
                // console.log('working till this update3 '+key);
                database(global.secondaryApp).ref('POSITION_BOT_FX/' + (Uid && Uid.toLowerCase()) + '/' + key)
                  .update({
                    mmode: tp.toLowerCase()
                  }).then(() => {
                    console.log('=======update val')
                  })
              }

            })
          }).then(val => {
            // setLoading(true)
            onRefresh();
          })
        // setTimeout(() => {

        // }, 2000);
        // }
        ToastAndroid.show(dta.message, ToastAndroid.SHORT);
        // global.status = 'true';
      }).catch(e => {

      })
      .then(() => {
        setTimeout(() => {

          setLdMode(-1);
        }, 2000);
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
      tp +
      '&token=' +
      global.token +
      '&device=' +
      DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel();;
    consoleFn(url, 'start', new Date().toLocaleTimeString());
    fetch(url)
      .then(item => item.json())
      .then(dta => {
        consoleFn(url, 'end', new Date().toLocaleTimeString());
        if (dta.status) {
          setTimeout(() => {
            setMode_all(tp);
            onRefresh();

          }, 2000);
        }
        ToastAndroid.show(dta.message, ToastAndroid.SHORT);
        // global.status = 'true';
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
      side + '&device=' + DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel() + '&token=' + global.token;

    global.status = 'true';
    global.Coins = '';


    var minutesToAdd = 20;
    var currentDate = new Date();
    var futureDate = new Date(currentDate.getTime() - minutesToAdd * 60000);
    global.prevtime1 = futureDate;

    global.prevtime2 = futureDate;



    // console.log('-------superbot stop: '+closeDoubleClicked)
    ToastAndroid.show('Requested For Bot Close For ' + sym + ' ' + side, ToastAndroid.SHORT);


    console.log(url);
    fetch(url)
      .then(item => item.json())
      .then(dta => {

        console.log('-------------stop api clicked---' + dta)
        // setSuperClosedDouble('false,-1')
        setTimeout(() => {

          onRefresh()
        }, 1500);
      }).catch(e => {
      })
  };

  function closeApi(posId, pair, positionId) {

    let url = `${global.BASE_URL}trader/place_market_order_auto.aspx?trader_id=${Uid}&type=close&position_id=${posId}&pair=${pair}${(global.iscopytrade !== 'True' && global.ismaster != '1') ? `&fpid=${positionId}` : ``}&token=${global.token}&newtoken=inapp&device=${DeviceInfo.getUniqueId()}&dname=${DeviceInfo.getModel()}`
    console.log('urlis' + url)

    // let url= `${global.BASE_URL}trader/place_market_order_auto.aspx?trader_id=${Uid}&type=close&position_id=${posId}&pair=${pair}&token=${global.token}&newtoken=inapp&device=${DeviceInfo.getUniqueId()}&dname=${DeviceInfo.getModel()"&fpid="}` 
    // global.status = 'true';
    // global.Coins = '';
    // setCallStore(true);

    // var minutesToAdd = 20;
    // var currentDate = new Date();
    // var futureDate = new Date(currentDate.getTime() - minutesToAdd * 60000);
    // global.prevtime1 = futureDate;

    // global.prevtime2 = futureDate;


    ToastAndroid.show('Requested For Bot Close For ' + pair, ToastAndroid.SHORT);
    
    setTimeout(() => {
      setCloseNorDoubleClicked('false,-1');
    }, 5000);
    consoleFn(url, 'start', new Date().toLocaleTimeString());
    fetch(url)
      .then(item => item.json())
      .then(dta => {
        setTimeout(() => {
          
          onRefresh()
        }, 1500);
       }).catch(e => {
        setTimeout(() => {
          
          onRefresh()
        }, 1500);
        consoleFn(url, 'end', new Date().toLocaleTimeString());

      })

  }

  const stopApi = (sym, side) => {

    // var minutesToAdd = 20;
    // var currentDate = new Date();
    // var futureDate = new Date(currentDate.getTime() - minutesToAdd * 60000);
    // global.prevtime1 = futureDate;

    // global.prevtime2 = futureDate;

    // allcoins = '';

    let url;
    if (hedge) {
      url =
        global.BASE_URL +
        'css_mob/hedge/change_bot_status.aspx?status=manual&pair=' +
        sym +
        '&uid=' +
        Uid +
        '&api_key=' +
        global.api_key +
        '&api_secret=' +
        global.api_secret + '&token=' + global.token +
        '&side=' +
        side + '&device=' + DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel();
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
        global.api_secret + '&device=' + DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel();
    }
    // global.status = 'true';
    // global.Coins = '';
    // setCallStore(true);

    // var minutesToAdd = 20;
    // var currentDate = new Date();
    // var futureDate = new Date(currentDate.getTime() - minutesToAdd * 60000);
    // global.prevtime1 = futureDate;

    // global.prevtime2 = futureDate;


    ToastAndroid.show('Requested For Bot Close For ' + sym, ToastAndroid.SHORT);
    setTimeout(() => {
      setCloseDoubleClicked('false,-1');
    }, 5000);
    consoleFn(url, 'start', new Date().toLocaleTimeString());
    fetch(url)
      .then(item => item.json())
      .then(dta => { }).catch(e => {
        consoleFn(url, 'end', new Date().toLocaleTimeString());
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
    setTrialVisible(!TrialVisible);//ok working
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
    var url = global.BASE_URL + 'css_mob/version.aspx?uid=' + uid +
      '&token=' +
      global.token +
      '&device=' +
      DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel();


    var versionMy = DeviceInfo.getVersion();
    consoleFn(url, 'start', new Date().toLocaleTimeString());
    fetch(url)
      .then(item => item.json())
      .then(Vdta => {
        // navigation.navigate('VersionControl', {
        //   id: 'update',
        //   apk: Vdta.name,
        //   playstore: Vdta.playstore,
        // });
        consoleFn(url, 'end', new Date().toLocaleTimeString());
        setAppVer(Vdta.version);

        if (Vdta.version.includes(versionMy)) {


        }
        if (Vdta.success === 'true') {
          console.log('see versonssss: ', Vdta.version, versionMy);
          if (!Vdta.version.toString().includes(versionMy.toString())) {
            //change code for version, ==  =>  !=
            // if('1.0.1'.includes('1.0')){

            navigation.navigate('VersionControl', {
              id: 'update',
              apk: Vdta.name,
              playstore: Vdta.playstore,
            });
          }
        } else if (Vdta.success === 'false') {
          navigation.navigate('VersionControl', { id: 'construction' });
        }
      }).catch(e => {
        //console.log(e)
      })

    let n_url = global.BASE_URL + 'css_mob/scroll_news.aspx?uid=' + uid +
      '&token=' +
      global.token +
      '&device=' +
      DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel();
    consoleFn(n_url, 'start', new Date().toLocaleTimeString());
    fetch(n_url)
      .then(item => item.json())
      .then(dta => {
        consoleFn(n_url, 'end', new Date().toLocaleTimeString());
        global.news = dta[0].txt
        setScrollDta(global.news);
      }).catch(e => {
        //console.log('erorr here scroll news--------------'+e)
      })



  };
  const api_key_api = async (uid, start) => {
    console.log('=======================navpreet singh ' + start, called1)
    var token = await AsyncStorage.getItem('token');
    global.token = token
    //ToastAndroid.show('Loading API key Data',ToastAndroid.SHORT)

    // if (called1) {
    //   return;
    // }

    console.log('hellodiff===================', start);
    called1 = true;


    global.hedge_updated = 'normal';
    try {
      if (global.EMAIL !== '') {
        let newDate = new Date();
        let diff = getDifferenceInMinutes(global.prevtime, newDate);

      }
    } catch (e) { }
    global.login_now = false;
    var mypwd = await AsyncStorage.getItem('myPwd');
    try {
      console.log(`possible issue================ ${uid} ${global.api_key_data} `);


      if (global.api_key_data != null ) {
          setLoading(false)
          global_store(
            hedge,
            'from api_key.aspx  end of function ',
          );
          StoreApi(Uid, 'run', 'api_key_function2', hedge);
          return
        }
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
          token +
          '&device=' +
          DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel();
        consoleFn(url, 'start', new Date().toLocaleTimeString());
        global.uid = uid;
        // setUID(uid)
        fetch(url)
          .then(item => item.json())
          .then(Vdta => {
            consoleFn(url, 'end', new Date().toLocaleTimeString());
            global.api_key_data = Vdta;
            if (global.lg_without_pwd) {

            } else {
              if (Vdta.success === 'false' && Vdta.msg === 'wrong_pwd') {
                ResetFn()
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
            // global.balance = Vdta.ebal;
            // setBal(Vdta.ebal);
            global.ReqValue = Vdta.reqvalue;
            global.autoStatus = Vdta.auto; //'False' or 'True'
            global.autoAmt = Vdta.auto_amt;
            global.autoNum = Vdta.auto_num;
            global.fest_json = Vdta.json;
            global.fest_date = Vdta.dy;
            global.fest_month = Vdta.mon;
            global.demo = Vdta.demo;
            global.tradeCapital = Vdta.capital
            global.ismaster = Vdta.ismaster
            // setIsHedgeBot(Vdta.ishedgebot)
            // setIsSuperBot(Vdta.issupperbot)
            //console.log('trade capital in homne==============='+global.tradeCapital)
            global.hedge_updated = 'done';
            if ((Vdta.otp).toLowerCase() == 'true') {

              setOtpMode(true)
            }
            else {
              setOtpMode(false)
            }
            global.fest_year = Vdta.year;
            global.rank = Vdta.rank;
            global.freeUser = Vdta.free_user;
            global.bbal = Vdta.bbal;
            global.vbal = Vdta.vbal;
            global.ebal = Vdta.ebal;
            global.pbal = Vdta.pbal;
            global.rbal = Vdta.rbal;
            global.depShow = Vdta.depositshow;
            global.iscopytrade = Vdta.iscopytrader;
            global.demo = Vdta.demo;
            global.addr = Vdta.addr;

            if (parseFloat(global.ebal) > 0 && Vdta.addr == '' && Vdta.demo && Vdta.demo.toLowerCase() !== 'true') {
              navigation.navigate("KYC", { from: "home" });
            }

            if (Vdta.errorlogs && Vdta.errorlogs != '') {
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
            try {

              StoreApi(Uid, 'run', 'api_key_function6', Vdta.hedge);
            }
            catch (e) {
              console.log('exception in api_key_functions6 ' + e);
            }

            console.log('sending to global_store for api_key ====');
            if (Vdta.depositshow.toLowerCase() == 'true' && (Vdta.demo).toLowerCase() !== 'true' && global.dtxt != null) {
              setShowDep(true);
            }
            if (Vdta.maxlev) {
              global.max_lev = Vdta.maxlev;
            }
            console.log('sending to global_store for api_key22 ====');
            // global.demobal = parseFloat(Vdta.dbal).toFixed(2);
            global.depTxt = Vdta.dtxt;
            global.AccMode = 'live';
            setGlobalAcc(Vdta.account_type);
            if (Vdta.account_type === 'demo') {
              setRealbal(false);
            }
            console.log('sending to global_store for api_key33 ====');
            //console.log('modeis' + Vdta.account_type);
            setModeName(Vdta.account_type);
            setFdate(Vdta.dy);
            setFmonth(Vdta.mon);
            setFyear(Vdta.year);
            if (Vdta.mno === '' && Vdta.demo != 'true') {
              //navigation.navigate("KYC", { from: "home" });
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
            if (Vdta.server_name.includes('MetaQuotes')) {

              global.server_name = 'Exness-Demo';
            }
            else if (Vdta.server_name.includes('Vantage') || Vdta.server_name.includes('vantage')) {

              global.server_name = 'Vantage';
            }
            else {
              global.server_name = Vdta.server_name;
            }

            global.autotype = Vdta.auto_type;
            global.CopyId = Vdta.copyid;
            global.timeleft = Vdta.timeleft;
            // global.demo = Vdta.demo.toLowerCase();
            setSecret(Vdta.secret_key);
            global.NAME = Vdta.name;
            console.log('sending to global_store for api_key44 ====');
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
              if (global.kycreq.toString().toLowerCase() === 'true' && global.demo !== 'true') {
                //global.NAME==='')
                //console.log('global name is: ' + global.NAME);
                navigation.navigate('KYCBefore');
              }
              // global.cur_value
              // try {

              const token2 = await messaging().getToken();
              // } catch (error) {
              //   console.log('exception103: '+error);
              // }

              //console.log('token is  ' + token);
              //  if(oldtoken===''){
              if ((uid != '', token2 != '' && !tokenCalled)) {
                tokenCalled = true;
                udpateToken(uid, token2);
              }
              if (global.api_key == null || global.api_key == undefined) {
                global.api_key = '';
                global.api_secret = '';
              }
            }
            // ToastAndroid.show('API key Data Loaded Successfully',ToastAndroid.SHORT)
            setLoading(false);
            // setLoading(false)
            if (Vdta.firebase) {
              console.log('---------------------home check vala code: ' + Vdta.firebase)
              // if(Vdta.firebase=='true'){
              if (Vdta.firebase == 'true') {
                global.firebase = Vdta.firebase
                setHome(false)

              }
            }
          }).catch(e => {
            //console.log(e)
          })
      
    } catch (e) {
      //console.log(e)
    }
    console.log(`----nav biggest panga here ==============================`)
    // console.log('this date: '+thisDate.split(' ')[0]);
    if (thisDate.split(' ')[0] == 'Sat' || thisDate.split(' ')[0] == 'Sun') {
      if (global.symname != null && global.symname)//&& !global.symname1) { //new added by nav on 9aug =>  && !global.symname1
      { } else {
        return;
      }

      tradeApi(allcoins, 2);
    } else {
      console.log('======== calling from part start', new Date().toLocaleTimeString());
      startinterval();
    }

    called1 = false;
  };

  const OTPCall = async () => {
    let token = await AsyncStorage.getItem('token')
    if (Uid != '') {
      let url = global.BASE_URL + 'css_mob/sendotp.aspx?uid=' + Uid + '&type=email&device=' + DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel() + '&token=' + token
      //consoleFn(url,'start',new Date().toLocaleTimeString());
      fetch(url)
        .then(item => item.json())
        .then(SData => {
          //consoleFn(url,'start',new Date().toLocaleTimeString());
          if (SData.success === 'true') {
            setOTP(SData.otp);

            ToastAndroid.show(
              'Please Check Your Email Inbox/Spam Folder For Verification Code.',
              ToastAndroid.LONG,
            );
          }
          if (SData.success === 'false' && SData.msg === 'wrong_pwd') {
            ResetFn()
            signOut()
          }
        }).catch(e => {
          //console.log(e)
        })
    } else {
      ToastAndroid.show('Enter a valid email first', ToastAndroid.SHORT);
    }
  };

  const udpateToken = async (uid, ntoken) => {
    var url = global.BASE_URL + 'css_mob/updateToken.aspx?uid=' + uid + '&ntoken=' + ntoken;
    console.log(url)
    fetch(url)
      .then(item => item.json())
      .then(SData => {
        //consoleFn(url,'start',new Date().toLocaleTimeString());



      }).catch(e => {
        //console.log(e)
      })
    consoleFn(url, 'start', new Date().toLocaleTimeString());
    // var fdata = new FormData();
    // fdata.append('uid', uid);
    // fdata.append('ntoken', ntoken);
    // console.log('fdata sseee:: '+JSON.stringify(fdata));
    // await axios
    //   .post(url, fdata, {headers: {contentType: 'application/json'}})
    //   .then(async function (response) {
    //     consoleFn(url,'end',new Date().toLocaleTimeString());
    //       await AsyncStorage.setItem('ntoken', ntoken);


    //   }).catch(e=>{
    //     console.log('exception in axios: '+e);
    //   });
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
      // navigation.navigate('TrdChart', {
      navigation.navigate('TradeReview', {
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
      global.api_secret +
      '&token=' +
      global.token +
      '&device=' +
      DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel();
    //consoleFn(url,'start',new Date().toLocaleTimeString());
    fetch(url)
      .then(item => item.json())
      .then(dta => {
        //consoleFn(url,'end',new Date().toLocaleTimeString());

        ToastAndroid.show(dta.message + ' for ' + pair, ToastAndroid.SHORT);
        try {

          if (Uid !== '') {

            global_store(global.api_key_data.hedge, 'from push btn');
            StoreApi(Uid, 'run', 'Refresh Button', global.api_key_data.hedge);
          }
        } catch (e) {
          //console.log(e)
        }
        toggleModal();
      }).catch(e => {
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
    let url = global.BASE_URL + 'css_mob/resume_all_bots.aspx' +
      '&token=' +
      global.token +
      '&device=' +
      DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel();;
    //consoleFn(url,'start',new Date().toLocaleTimeString());
    fetch(url)
      .then(item => item.json())
      .then(dta => {
        //consoleFn(url,'end',new Date().toLocaleTimeString());
      }).catch(e => {
        //console.log(e)
      })
  };

  const hitApi = async a => {
    let url =
      global.BASE_URL + 'css_mob/set_acc.aspx?uid=' + global.uid + '&acc=' + a;
    //consoleFn(url,'start',new Date().toLocaleTimeString());
    fetch(url)
      .then(item => item.json())
      .then(async dta => {
        //consoleFn(url,'end',new Date().toLocaleTimeString());
        if (dta.success == 'true') {
          await AsyncStorage.setItem('mode', a);
          ToastAndroid.show(
            'Account Mode changed successfully!',
            ToastAndroid.SHORT,
          );

          if (dta.success == 'true') {
            setModeName(a);
            global.AccMode = 'live';
            setGlobalAcc(a);
            //console.log('modeis' + global.AccMode);
          }
        }
      }).catch(e => {
        //console.log(e)
      })
    // }
    setLoading(false);
    // });
  };
  function CalculateIt(startprice = 0.0000, endprice = 0.0000) {
    startprice = parseFloat(startprice).toFixed(5);
    endprice = parseFloat(endprice).toFixed(5);
    let multiplier
    if (startprice.toString().indexOf('.') == 3) {
      multiplier = 0.01
    }
    else if (startprice.toString().indexOf('.') > 3) {
      multiplier = 0.1

    }
    else {
      multiplier = 0.0001
    }


    let pips = (parseFloat(endprice) - parseFloat(startprice)) / multiplier

    return pips.toFixed(2)
  }
  const Edit_tpsl = (pair, type, lev, side, item) => {
    let up = type === 'TP' ? 1 : type == 'TSL' ? 3 : 0;
    let roe = parseFloat(item.side.toLowerCase() == 'buy'
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
      <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
        <Slider
          useNativeDriver={true}
          disabled={false}
          value={parseInt(TPSL)}
          style={{ width: '55%', marginLeft: '2%' }}
          maximumTrackTintColor="#fff"
          minimumTrackTintColor="#165a05"
          thumbTintColor="#41c81d"
          onValueChange={value => {
            setTPSL(parseInt(value));
          }}
          minimumValue={0}
          maximumValue={type == 'TSL' ? parseInt(roe) : 1000}
        />
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', width: '30%' }}>
          <Text style={{ color: '#fff', marginLeft: 10, fontSize: 16 }}>
            {type}: {TPSL} PIP
          </Text>
          {/* <TextInput
                  style={{width:50,height:20,color:'white'}}
                  value={TPSL}
                  onChangeText={(val) => {setTPSL(val) }}
                  selectionColor={'#fff'}
                  color={colors.selected}

            /> */}
          {/* {TPSL} PIP */}
        </View>
        <TouchableOpacity

          onPress={() => {
            console.log('see:: ' + type + '   ' + TPSL + '   ' + lev + '   ' + roe);
            // if (type == 'TSL' && (parseFloat(TPSL) / parseFloat(lev)).toFixed(2) > roe) {
            //   return
            // }
            let url =
              global.BASE_URL +
              `css_mob/starttrade_tp.aspx?uid=${global.uid
              }&pair=${pair}&up=${up}&tp=${(
                parseFloat(TPSL) / parseFloat(lev)
              ).toFixed(2)}` +
              '&token=' +
              global.token +
              '&device=' +
              DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel();;

            if (hedge) {
              url =
                global.BASE_URL +
                `css_mob/hedge/starttrade_tp.aspx?side=${side}&uid=${global.uid
                }&pair=${pair}&up=${up}&tp=${(
                  parseFloat(TPSL) / parseFloat(lev)
                ).toFixed(2)}` +
                '&token=' +
                global.token +
                '&device=' +
                DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel();;
            }

            consoleFn(url, 'start', new Date().toLocaleTimeString());
            fetch(url)
              .then(item => item.json())
              .then(data => {
                //consoleFn(url,'end',new Date().toLocaleTimeString());
                // var currentDate = new Date();
                // var minutesToAdd = 40;
                // var futureDate = new Date(
                //   currentDate.getTime() - minutesToAdd * 60000,
                // );
                // global.prevtime1 = futureDate;
                // global.prevtime = futureDate;
                // global.prevtime2 = futureDate;
                // global.prevtime3 = futureDate;
                // global.prevtime_market = futureDate;
                // global.status = 'true';

                // (global.Coins = null), setCallStore(true);
                try {

                  StoreApi(
                    Uid,
                    'run',
                    'api_key_function3',
                    global.api_key_data.hedge,
                  );
                } catch (e) {
                  //console.log(e)
                }
              }).catch(e => {
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
            padding: 5, alignSelf: 'flex-end'
          }}>
          <Text style={{ color: '#fff' }}>Save</Text>
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
          return colors.profitcolor2;
        }
      }
    },
    [Data],
  );

  const close_all_orders = () => {
    let url =
      global.BASE_URL + `css_mob/close_all_orders.aspx?uid=${global.uid}` +
      '&token=' +
      global.token +
      '&device=' +
      DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel();;
    if (hedge) {
      url =
        global.BASE_URL +
        `css_mob/hedge/close_all_orders.aspx?uid=${global.uid}` +
        '&token=' +
        global.token +
        '&device=' +
        DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel();;
    }
    //consoleFn(url,'start',new Date().toLocaleTimeString());
    fetch(url)
      .then(item => item.json())
      .then(data => {
        //consoleFn(url,'end',new Date().toLocaleTimeString());
      })
      .then(() => {
        onRefresh();
      }).catch(e => {
        //console.log(e)
      })
  };


  const Dta_filter = () => {

    let Dta
    if (positionPanel && !OpenPanel && !CopyPanel) {
      Dta = Data.filter(
        e =>
          e.opens == '1' &&
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
    else if (!positionPanel && OpenPanel && !CopyPanel) {
      Dta = Data.filter(e => e.opens == '0')
    } else {
      Dta = Data.filter(
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
    if (!OpenPanel && positionPanel && !CopyPanel) {
      total_count = Dta.length
    }
    // console.log('dta is::: '+JSON.stringify(Dta));
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

      let hmode = hedge ? 'hedge' : 'normal'
      let url;
      if (hedge) {
        url = global.BASE_URL + 'css_mob/hedge/place_order.aspx?uid=' + Uid + '&side=' + mode + '&api_key=' + global.api_key + '&api_secret=' + global.api_secret + '&quantity=' + parseFloat(Input2 * vItem.leverage) + '&pair=' + vItem.sym + '&price=' + Input1 + '&precision=5' + '&pmode=' + hmode + '&side1=' + vItem.side;
      } else {
        url = global.BASE_URL + 'css_mob/place_order.aspx?uid=' + Uid + '&side=' + mode + '&api_key=' + global.api_key + '&api_secret=' + global.api_secret + '&quantity=' + parseFloat(Input2 * vItem.leverage) + '&pair=' + vItem.sym + '&price=' + Input1 + '&precision=5' + '&pmode=' + hmode;
      }
      consoleFn(url, 'start', new Date().toLocaleTimeString());
      fetch(url)
        .then(item => item.json())
        .then(dta => {
          //consoleFn(url,'end',new Date().toLocaleTimeString());
          setP_order(false)
          ToastAndroid.show("Order Will be Placed Instantly At Your Selected Price", ToastAndroid.SHORT)
          setAvgMarginModal(false)
          setClick_buy(true)
          // global.status = 'true'
          // global.Coins = '';
          // setCallStore(true)
        }).catch(e => {
          console.log('exception is here: ', e);
        })
    }
  }
  // function calculateBuy(item) {
  //   let val
  //   if(item.pair.toString().slice(0,3)=='USD'){

  //     val = ((CalculateIt(item.startamt, item.sell_price)) * 10* sellMultPrice * (1/item.sell_price) * parseFloat(item.lot_size).toFixed(2))
  //   }
  //   else{

  //     val = ((CalculateIt(item.startamt, item.sell_price)) * 10* parseFloat(1 / parseFloat(val[1].sell_price)).toFixed(5)).toFixed(5) 
  //      * parseFloat(item.lot_size).toFixed(2))//* sellPrice
  //   }
  //   let jpyFactor=1
  //   if(item.pair.toString().slice(3,6)=='JPY'){
  //     jpyFactor=100
  //   }
  //   val=val*jpyFactor
  //  return val.toFixed(2)
  // }
  // function calculateSell(item) {
  //   let val
  //   if(item.pair.toString().slice(0,3)=='USD'){
  //     console.log('vals seee: '+(CalculateIt(item.startamt, buyPrice))+'  '+buyMultPrice+'  '+ (1/buyPrice)+'  '+parseFloat(item.lot_size).toFixed(2));
  //     val = ((CalculateIt(item.startamt, buyPrice)) * 10* buyMultPrice * (1/buyPrice) * parseFloat(item.lot_size).toFixed(2)) * -1
  //   }

  //   else{

  //     val = ((CalculateIt(item.startamt, buyPrice)) * 10* parseFloat(buyMultPrice).toFixed(5) * parseFloat(item.lot_size).toFixed(2)) * -1
  //   }
  //   let jpyFactor=1
  //   if(item.pair.toString().slice(3,6)=='JPY'){
  //     jpyFactor=100
  //   }
  //   val=val*jpyFactor
  //   return val.toFixed(2)
  // }
  const Boxlayout = React.useCallback(({ navigation, name, image, boximage }) => {

    const AnimationRef = React.useRef(null);
    const [dur, setDur] = React.useState(500);
    const _onPress = () => {
      setDur(1500)
      if (AnimationRef) {
        AnimationRef.current?.bounce();
      }

    }




    return (
      <TouchableOpacity activeOpacity={0.6} style={{ alignItems: 'center' }}
        onPress={() => {
          set(false)

          if (Loading && name == "Future Trading") {
            ToastAndroid.show('Loading ! please wait.', ToastAndroid.SHORT)
          }
          if (name == "Crypto Spot Trading") {

            if (appModal) {
              _onPress();
              // Linking.openURL('https://botz.trade')  

              SendIntentAndroid.isAppInstalled("com.btz.airobot").then(isInstalled => {
                console.log(isInstalled)
                if (isInstalled) {
                  SendIntentAndroid.openApp("com.btz.airobot").then(wasOpened => { console.log(wasOpened) });
                } else {

                  Linking.openURL('https://botz.trade/')
                }
              })
            } else {
              _onPress();
              Linking.openURL('https://botz.trade/')
            }
          }
          else {
            _onPress()
            if (name == "Future Trading") {

              // Linking.openURL('https://botz.trade')  

              SendIntentAndroid.isAppInstalled("com.mtft.mtapp").then(isInstalled => {
                console.log(isInstalled)
                if (isInstalled) {
                  SendIntentAndroid.openApp("com.mtft.mtapp").then(wasOpened => { console.log(wasOpened) });
                } else {

                  Linking.openURL('https://botz.trade/')
                }
              })
              // }else{

              //   Linking.openURL('https://botz.trade/')
              // }    
              // 
              // setAppModal(false)
              // AsyncStorage.setItem('appmodal','false')                        
            }
            else if (name == "MetaFX") {

              setAppModal(false)
              setTour(true)
              AsyncStorage.setItem('appmodal', 'false')

            }
            else if (name == "Meta Games") {

              SendIntentAndroid.isAppInstalled("com.mtg.gaming").then(isInstalled => {
                console.log(isInstalled)
                if (isInstalled) {
                  SendIntentAndroid.openApp("com.mtg.gaming").then(wasOpened => { console.log(wasOpened) });
                } else {
                  Linking.openURL('https://metagames24.online')
                }
              })
              // Linking.openURL('https://metagames24.online')  

            }
            else if (name == "NFT") {
              ToastAndroid.show(name + "  Launching Soon!", ToastAndroid.SHORT)
            } else {
              ToastAndroid.show(name + "  Under Construction!", ToastAndroid.SHORT)
            }

          }
        }}

      >
        <ImageBackground source={require('../../assets/temp/assets-box-bg.png')} resizeMode='stretch' style={{ width: 160, height: 160 }}>
          <View
            style={{ width: "100%", height: "100%", marginTop: 0, alignItems: 'center', flexDirection: 'column', marginBottom: 20, justifyContent: 'center' }}>
            <Image style={{ alignSelf: 'center', width: 50, height: 50, marginTop: 0, }} resizeMode={'contain'} source=
              {
                boximage == "1" ? require('../../assets/apphome/1.png') :
                  boximage == "2" ? require('../../assets/apphome/logo11.png') :
                    boximage == "3" ? require('../../assets/apphome/logo1.png') :
                      boximage == "4" ? require('../../assets/apphome/ic_launcher_round.png') :
                        boximage == "5" ? require('../../assets/apphome/logom.png') :
                          require('../../assets/apphome/share.png')

              }

            />
            <View style={{ marginTop: 20 }}>

              <Text style={{ color: 'white', fontSize: 14, textAlign: 'center' }}>{name.split(' ', 2)}</Text>
              {name == 'Crypto Spot Trading' &&
                <Text style={{ color: 'white', fontSize: 14, textAlign: 'center' }}>Trading  </Text>
              }
              {name == 'MetaFX' &&
                <Text style={{ color: 'white', fontSize: 14, textAlign: 'center' }}>100 USDT  </Text>
              }
              {name == 'Spot Trading' &&
                <Text style={{ color: 'white', fontSize: 14, textAlign: 'center' }}>50 USDT  </Text>
              }

              {name == 'Future Trading' &&
                <Text style={{ color: 'white', fontSize: 14, textAlign: 'center' }}>150 USDT   </Text>
              }
              {name == 'Meta Games' &&
                <Text style={{ color: 'white', fontSize: 14, textAlign: 'center' }}>30 USDT</Text>
              }
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    )
  }, [appModal, Loading])



  const triggermodal = async (item) => {
    setTriggerData(item)
    setShowTriggermodal(true)
  }
  const HitTrigger = async (item) => {
    console.log('in hit trigger=-----');
    let myitem = item ? item : triggerData
    let url = global.BASE_URL + `css_mob/hedge/trigger.aspx?uid=${global.uid}&symbol=${myitem.sym}&side=${myitem.side}` +
      '&token=' +
      global.token +
      '&device=' +
      DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel();
    consoleFn(url, 'start', new Date().toLocaleTimeString());
    fetch(url)
      .then(item => item.json())
      .then(dta => {
        //consoleFn(url,'end',new Date().toLocaleTimeString());
        if (dta.status) {
          ToastAndroid.show('Trade Opened for ' + (myitem.side == 'BUY' ? 'sell' : 'buy') + ' !', ToastAndroid.SHORT)
          setShowTriggermodal(false)
        } else {
          ToastAndroid.show('Please try again later', ToastAndroid.SHORT)
          setShowTriggermodal(false)
        }
      })
  }
  const [ld5, setLd5] = React.useState(false)

  function calculate_pnlBuy(item, from) {
    // console.log('see allsymbols',global.allSymbolPrices);
    try {
      if (global.allSymbolPrices != null && item) {

      }
      else { return }

      let mySymbol = ''
      if (from == 'normal') {
        mySymbol = item.pair
      }
      else if (from == 'position') {
        mySymbol = item.sym
      }
      else {
        mySymbol = item.symbol
      }
      if (!!mySymbol) {

      }
      else {
        return
      }
      let multiplyFactor = 1

      if ((mySymbol).toString().slice(3, 6) == 'USD') {

      }
      else {
        let valForPrice
        if ((mySymbol).toString().slice(3, 6) == 'JPY' || (mySymbol).toString().slice(3, 6) == 'CHF' || (mySymbol).toString().slice(3, 6) == 'CAD') {
          let main = global.allSymbolPrices
          valForPrice = main.filter(e => e.sym.toString() == "USD" + (mySymbol).toString().slice(3, 6) + global.addOnSymbol)
          if (valForPrice.length > 0) {

            multiplyFactor = 1 / (parseFloat(valForPrice[0].sell_price).toFixed(5))
          }

        }
        else if ((mySymbol).toString().includes('USD')) {
          valForPrice = global.allSymbolPrices.filter(e => e.sym.includes(mySymbol))
          if (valForPrice.length > 0) {
            multiplyFactor = 1 / (parseFloat(valForPrice[0].sell_price).toFixed(5))
          }
        }
        else {

          valForPrice = global.allSymbolPrices.filter(e => e.sym.includes(((mySymbol).toString().slice(3, 6) + 'USD' + global.addOnSymbol)))
          if (valForPrice.length > 0) {
            //cadusd and jpyusd 
            multiplyFactor = parseFloat(valForPrice[0].buy_price).toFixed(5)
          }
        }


        if ((mySymbol).toString().slice(3, 6) == 'JPY') {
          multiplyFactor = multiplyFactor * 100
        }
      }
      // console.log('imp values: '+ item.avg_buy_price);
      let val = ''
      if (from == 'normal') {

        val = ((CalculateIt(item.startamt, item.sell_price)) * 10 * multiplyFactor * parseFloat(item.lot_size).toFixed(2))
      }
      else if (from == 'position') {
        val = ((CalculateIt(item.avg, item.last_price)) * 10 * multiplyFactor * parseFloat(item.qty).toFixed(2))

      }
      else {

        val = ((CalculateIt(item.avg_buy_price, item.sell_price)) * 10 * multiplyFactor * parseFloat(item.buy_total_qty).toFixed(2))
      }


      return parseFloat(val).toFixed(2)
    } catch (error) {
      return 1
    }
  }
  function calculate_pnlSell(item, from) {
    try {


      if (global.allSymbolPrices != null && item) {

      }
      else { return }
      // console.log('pnl sell ');
      let mySymbol = ''
      if (from == 'normal') {
        mySymbol = item.pair
      }
      else if (from == 'position') {
        mySymbol = item.sym
      }
      else {
        mySymbol = item.symbol
      }
      if (!!mySymbol) {

      }
      else {
        return
      }
      // console.log('data isss:: '+JSON.stringify(Data));
      let multiplyFactor = 1
      if ((mySymbol).toString().slice(3, 6) == 'USD') {

      }
      else {
        let valForPrice
        valForPrice = global.allSymbolPrices.filter(e => e.sym.includes(((mySymbol).toString().slice(3, 6) + 'USD' + global.addOnSymbol)))
        // console.log('valfor price: '+mySymbol+'   '+valForPrice);
        if ((mySymbol).toString().slice(3, 6) == 'JPY' || (mySymbol).toString().slice(3, 6) == 'CHF' || (mySymbol).toString().slice(3, 6) == 'CAD') {
          let main = global.allSymbolPrices
          valForPrice = main.filter(e => e.sym.toString() == "USD" + (mySymbol).toString().slice(3, 6))
          if (valForPrice.length > 0) {

            multiplyFactor = 1 / (parseFloat(valForPrice[0].buy_price).toFixed(5))
          }
        }
        else if ((mySymbol).toString().includes('USD')) {
          valForPrice = global.allSymbolPrices.filter(e => e.sym.includes(mySymbol))
          if (valForPrice.length > 0) {

            multiplyFactor = 1 / (parseFloat(valForPrice[0].buy_price).toFixed(5))
          }
        }
        else {

          valForPrice = global.allSymbolPrices.filter(e => e.sym.includes(((mySymbol).toString().slice(3, 6) + 'USD')))
          if (valForPrice.length > 0) {

            multiplyFactor = parseFloat(valForPrice[0].sell_price).toFixed(5)
          }
        }
        if ((mySymbol).toString().slice(3, 6) == 'JPY') {
          multiplyFactor = multiplyFactor * 100
        }
      }
      // if(isNaN(multiplyFactor)){
      //   multiplyFactor=0.00700
      //   if((mySymbol).toString().slice(3,6)=='JPY'){
      //     multiplyFactor= multiplyFactor*100
      //   }
      // }
      if (mySymbol == 'USDJPY' && item.side == 'SELL') {

        // console.log(`see the mf: ${multiplyFactor} `);
        // console.log(`see the itembuy: ${item.avg_price_sell} ${item.startamt} ${multiplyFactor} ${item.sell_total_qty} => ${CalculateIt(item.avg_price_sell, item.startamt)}`);
      }
      let val = ''
      if (from == 'normal') {

        val = ((CalculateIt(item.startamt, item.buy_price)) * 10 * multiplyFactor * parseFloat(item.lot_size).toFixed(2) * -1)

      }
      else if (from == 'position') {//
        val = ((CalculateIt(item.avg, item.last_price)) * 10 * multiplyFactor * parseFloat(item.qty).toFixed(2) * -1)

      }
      else {

        val = ((CalculateIt(item.avg_price_sell, item.buy_price)) * 10 * multiplyFactor * parseFloat(item.sell_total_qty).toFixed(2) * -1)

      }

      // console.log('pnl for sell: '+parseFloat(val).toFixed(2));
      return parseFloat(val).toFixed(2)
    } catch (error) {
      return 1
    }
  }

  function calculate_pnl(item) {
    try {


      if (global.allSymbolPrices != null && item) {

      }
      else { return }

      // console.log('data isss:: '+JSON.stringify(Data));
      let multiplyFactor = 1
      // console.log('see the item: '+JSON.stringify(item));
      if (!!item.symbol) {

      }
      else {
        return
      }
      if ((item.symbol).toString().slice(3, 6) == 'USD') {

      }
      else {
        let valForPrice
        if ((item.symbol).toString().slice(3, 6) == 'JPY' || (item.symbol).toString().slice(3, 6) == 'CHF' || (item.symbol).toString().slice(3, 6) == 'CAD') {
          let main = global.allSymbolPrices
          valForPrice = main.filter(e => e.sym.toString() == "USD" + (item.symbol).toString().slice(3, 6))
          multiplyFactor = 1 / (parseFloat(valForPrice[0].buy_price).toFixed(5))
        }
        else if ((item.symbol).toString().includes('USD')) {
          valForPrice = global.allSymbolPrices.filter(e => e.sym.includes(item.symbol))
          multiplyFactor = 1 / (parseFloat(valForPrice[0].buy_price).toFixed(5))
        }
        else {
          valForPrice = global.allSymbolPrices.filter(e => e.sym.includes(((item.symbol).toString().slice(3, 6) + 'USD')))
          multiplyFactor = parseFloat(valForPrice[0].buy_price).toFixed(5)
        }


        if ((item.symbol).toString().slice(3, 6) == 'JPY') {
          multiplyFactor = multiplyFactor * 100
        }
      }

      let val = ((CalculateIt(item.avg_buy_price, item.sell_price)) * 10 * multiplyFactor * parseFloat(item.buy_total_qty).toFixed(2))
        + ((CalculateIt(item.avg_price_sell, item.buy_price)) * 10 * multiplyFactor * parseFloat(item.sell_total_qty).toFixed(2) * -1)


      return parseFloat(val).toFixed(2)
    } catch (error) {
      return 1
    }
  }

  function addDemo() {

    let url = global.BASE_URL + `css_mob/adddemo.aspx?uid=${global.uid}&amt=${addAmount}` +
      '&token=' +
      global.token +
      '&device=' +
      DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel();
    //consoleFn(url,'start',new Date().toLocaleTimeString());
    fetch(url)
      .then(item => item.json())
      .then(dta => {
        //consoleFn(url,'end',new Date().toLocaleTimeString());
        if (dta.msg) {
          ToastAndroid.show(dta.msg, ToastAndroid.SHORT)
          setLd5(false)
          setAddMoneyModal(false)
          setShow(false)

        }
        else {
          ToastAndroid.show("Can't process your request, Please Try later!", ToastAndroid.SHORT)
          setLd5(false)
          setAddMoneyModal(false)
          setShow(false)

        }

      }).catch(e => {
        ToastAndroid.show("Can't process your request, Please Try later!", ToastAndroid.SHORT)
        setLd5(false)
        setAddMoneyModal(false)
        setShow(false)

      })
  }

  const renderPagination = (index, total, context) => {
    return (

      <View style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: "rgba(0,0,0,0.3);", width: '100%', alignItems: 'flex-end', paddingHorizontal: 5, borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }}>
        <Text style={{ color: 'grey' }}>
          <Text style={{ color: '#fff', fontSize: 20, }}>{index + 1}</Text>/{total}
        </Text>
      </View>

    )
  }

  const SignalInfo = (item, interval) => {

    let url
    let url2
    if (interval !== undefined && interval !== null) {

      url = global.BASE_URL + 'css_mob/signals_data.aspx?pair=' + item + '&interval=' + interval +
        '&token=' +
        global.token +
        '&device=' +
        DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel();
      url2 = global.BASE_URL + 'css_mob/get_indicators.aspx?pair=' + item + '&interval=' + interval +
        '&token=' +
        global.token +
        '&device=' +
        DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel();
    }
    else {

      url = global.BASE_URL + 'css_mob/signals_data.aspx?pair=' + item + '&interval=15' +
        '&token=' +
        global.token +
        '&device=' +
        DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel();
      url2 = global.BASE_URL + 'css_mob/get_indicators.aspx?pair=' + item + '&interval=15' +
        '&token=' +
        global.token +
        '&device=' +
        DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel();
    }
    //consoleFn(url,'start',new Date().toLocaleTimeString());
    console.log(url2)
    fetch(url2)
      .then(item => item.json())
      .then(dta => {
        console.log(dta)
        setSignalData2(dta)
        // setLd2(-1)   
        // setSignalVis(true)   
      })
    fetch(url)
      .then(item => item.json())
      .then(dta => {
        //consoleFn(url,'end',new Date().toLocaleTimeString());
        setSignalData(dta)
        setLd2(-1)
        setSignalVis(true)
      })
  }

  const onRefresh =  () => {

    // global.Coins = '';
    // global.symname = '';
    // allcoins = '';

    // var minutesToAdd = 20;
    // var currentDate = new Date();
    // var futureDate = new Date(currentDate.getTime() - minutesToAdd * 60000);
    // global.prevtime1 = futureDate;
    // global.prevtime = futureDate;
    getsuperbotData()
    console.log('========here api key called but commented for firebase reasons-----------------');
    // api_key_api(Uid, 'onrefresh');

    setLd(true);


    setRefreshing(true);
    // let newDate = new Date();
    // let diff = getDifferenceInMinutes(global.prevtime1, newDate);

    // if (Uid !== '') {

    // }
    // setRefVis(true);

    setLd(false);
    setTimeout(async () => {
      setRefreshing(false)
    }, 2000);

  };

  // function calculateNetRoe(item) {


  //   //   var a=(
  //   //   parseFloat(item.avg_buy)==0?0:(((parseFloat(item.startamt)-parseFloat(item.avg_buy))/parseFloat(item.avg_buy))*100*parseFloat(item.lev))
  //   // )+
  //   // (
  //   //   parseFloat(item.avg_sell)==0?0:((((parseFloat(item.startamt)-parseFloat(item.avg_sell))/parseFloat(item.avg_sell))*100*parseFloat(item.lev))*-1)
  //   // )
  //   console.log(`------${item.margin_buy}=========${item.margin_sell}`);
  //   var totalMargin = item.margin_buy ? parseFloat(item.margin_buy) : 0 + item.margin_sell ? parseFloat(item.margin_sell) : 0
  //   var totalPNL = (parseFloat(
  //     (parseFloat(item.startamt) -
  //       parseFloat(item.avg_buy)) *
  //     parseFloat(item.qty_buy)
  //   ) + parseFloat((
  //     (parseFloat(item.startamt) -
  //       parseFloat(item.avg_sell)) *
  //     parseFloat(item.qty_sell)
  //   ) * -1)).toFixed(2)


  //   var netROE = (totalPNL * 100) / totalMargin
  //   return netROE.toFixed(2)

  // }
  const tourSkip = async () => {
    setTour(false)
    console.log('clicked toru skip');
    await AsyncStorage.setItem('startmodal', 'false')
  }
  const tourNext = (index) => {

    // listViewRef.scrollToEnd({ animated: true });
    // console.log('clicked toru next',index, typeof(index));
    listViewRef.scrollToOffset({ animated: true, offset: index * 350 })
    //   setTour(false)
    //  await AsyncStorage.setItem('startmodal', 'false')
  }
  const brokerSkip = async () => {
    setBrokerModal(false)
    console.log('clicked toru skip');
    //  await AsyncStorage.setItem('startmodal', 'false')
  }
  const brokerNext = (index) => {

    // listViewRef.scrollToEnd({ animated: true });
    // console.log('clicked toru next',index, typeof(index));
    listViewRefBroker.scrollToOffset({ animated: true, offset: index * 350 })
    //   setTour(false)
    //  await AsyncStorage.setItem('startmodal', 'false')
  }
  function consoleFn(name, type, time) {
    console.log(`${name} - ${type} - ${time}`)
  }

  const handleNotification = (item) => {
    PushNotification.localNotification({
      channelId: 'test-channel',
      title: 'you clicked on ' + item,
      message: 'my message is okk: ' + item,
      color: 'green',
      largeIconUrl: "https://w7.pngwing.com/pngs/846/267/png-transparent-computer-icons-house-symbol-small-icons-angle-building-triangle.png",
    });
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
      <ImageBackground source={global.bgimg} resizeMode={'stretch'} style={{ width: '100%', height: '100%', paddingTop: 0 }}>
        {/* <Image source={require('../../assets/apphome/logo.png')} style={{width:200,height:60,alignSelf: 'center'}} resizeMode={'stretch'} /> */}
        <ScrollView vertical style={{ marginTop: '20%' }} >
          <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Boxlayout boximage="5" name="MetaFX" />
            <Boxlayout boximage="1" image="yellow" name="Spot Trading" />
          </View>
          <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Boxlayout boximage="3" image="yellow" name="Meta Games" />
            <Boxlayout boximage="2" image="yellow" name="Future Trading" />
          </View>
          <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 20 }}>
            <Boxlayout boximage="4" name="Meta-Z Token" />
            <Boxlayout boximage="6" name="NFT" />
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  ) :
    Loading ?
      <View style={[styles.container, { flex: 1, alignItems: 'center', marginTop: '40%' }]}>
        <LottieView
          source={require('../../assets/loading.json')}
          style={{ width: 300, height: 300, alignSelf: 'center' }}
          autoPlay
          loop
        />
      </View>

      :
      (
        <View style={styles.container}>
          {/* <StatusBar
            backgroundColor={'transparent'}
            translucent={true}
            barStyle={'light-content'}
          /> */}
          <Modal
            onBackButtonPress={() => setTour(false)}
            statusBarTranslucent={true}
            deviceHeight={1000}
            backdropOpacity={1}
            propagateSwipe={true}

            isVisible={Tour}

          >

            <View style={{ flex: 1, width: '100%' }}>
              <Modal
                onBackButtonPress={() => setBrokerModal(false)}
                statusBarTranslucent={true}
                deviceHeight={1000}
                backdropOpacity={1}
                propagateSwipe={true}

                isVisible={brokerModal}

              >
                <View style={{ flex: 1, width: '100%' }}>

                  <FlatList
                    data={[1]}
                    ref={(ref) => {
                      listViewRefBroker = ref;
                    }}
                    horizontal={true}
                    contentContainerStyle={{}}
                    renderItem={({ item, index }) => (
                      <View style={{ flexDirection: 'row' }}>
                        <ImageBackground source={require('../../assets/walkthrough/broker1.jpeg')} resizeMode={'stretch'}
                          style={styles.imgback}>

                          <View
                            style={{ alignSelf: 'center', flex: 1, width: '100%' }}
                          >
                            {/* <TouchableOpacity onPress={()=>{Linking.openURL('https://youtu.be/U6EBaw8Q-XQ')}}
                     style={styles.tour_btn}>
                      <Text style={styles.tour_btn_text}>Watch Video</Text>
                    </TouchableOpacity> */}
                            <View style={styles.viewbtm}>

                              <TouchableOpacity onPress={brokerSkip} style={styles.bottomSkip}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15, color: '#000' }}>SKIP</Text>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => { brokerNext(0.98) }} style={styles.bottomNext}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15, color: '#000' }}>NEXT</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </ImageBackground>
                        <ImageBackground source={require('../../assets/walkthrough/broker2.jpeg')} resizeMode={'stretch'}
                          style={styles.imgback}>

                          <View
                            style={{ alignSelf: 'center', flex: 1, width: '100%' }}
                          >
                            {/* <TouchableOpacity onPress={()=>{Linking.openURL('https://youtu.be/U6EBaw8Q-XQ')}}
                     style={styles.tour_btn}>
                      <Text style={styles.tour_btn_text}>Watch Video</Text>
                    </TouchableOpacity> */}
                            <View style={styles.viewbtm}>

                              <TouchableOpacity onPress={brokerSkip} style={styles.bottomSkip}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15, color: '#000' }}>SKIP</Text>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => { brokerNext(1.95) }} style={styles.bottomNext}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15, color: '#000' }}>NEXT</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </ImageBackground>
                        <ImageBackground source={require('../../assets/walkthrough/broker3.png')} resizeMode={'stretch'}
                          style={styles.imgback}>

                          <View
                            style={{ alignSelf: 'center', flex: 1, width: '100%' }}
                          >
                            {/* <TouchableOpacity onPress={()=>{Linking.openURL('https://youtu.be/U6EBaw8Q-XQ')}}
                     style={styles.tour_btn}>
                      <Text style={styles.tour_btn_text}>Watch Video</Text>
                    </TouchableOpacity> */}
                            <View style={styles.viewbtm}>

                              <TouchableOpacity onPress={brokerSkip} style={styles.bottomSkip}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15, color: '#000' }}>SKIP</Text>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => { brokerNext(2.92) }} style={styles.bottomNext}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15, color: '#000' }}>NEXT</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </ImageBackground>
                        <ImageBackground source={require('../../assets/walkthrough/broker4.jpeg')} resizeMode={'stretch'}
                          style={styles.imgback}>

                          <View
                            style={{ alignSelf: 'center', flex: 1, width: '100%' }}
                          >
                            {/* <TouchableOpacity onPress={()=>{Linking.openURL('https://youtu.be/U6EBaw8Q-XQ')}}
                     style={styles.tour_btn}>
                      <Text style={styles.tour_btn_text}>Watch Video</Text>
                    </TouchableOpacity> */}
                            <View style={styles.viewbtm}>

                              <TouchableOpacity onPress={brokerSkip} style={styles.bottomSkip}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15, color: '#000' }}>SKIP</Text>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => { brokerNext(3.9) }} style={styles.bottomNext}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15, color: '#000' }}>NEXT</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </ImageBackground>
                        <ImageBackground source={require('../../assets/walkthrough/broker5.jpeg')} resizeMode={'stretch'}
                          style={styles.imgback}>

                          <View
                            style={{ alignSelf: 'center', flex: 1, width: '100%' }}
                          >
                            {/* <TouchableOpacity onPress={()=>{Linking.openURL('https://youtu.be/U6EBaw8Q-XQ')}}
                     style={styles.tour_btn}>
                      <Text style={styles.tour_btn_text}>Watch Video</Text>
                    </TouchableOpacity> */}
                            <View style={styles.viewbtm}>

                              <TouchableOpacity onPress={brokerSkip} style={styles.bottomSkip}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15, color: '#000' }}>SKIP</Text>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => { brokerNext(4.95) }} style={styles.bottomNext}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15, color: '#000' }}>NEXT</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </ImageBackground>
                        <ImageBackground source={require('../../assets/walkthrough/broker6.jpeg')} resizeMode={'stretch'}
                          style={styles.imgback}>

                          {/* <View
                    style={{alignSelf: 'center', flex:1,width:'100%'}} 
                    >
                    <TouchableOpacity onPress={()=>{Linking.openURL('https://youtu.be/U6EBaw8Q-XQ')}}
                     style={styles.tour_btn}>
                      <Text style={styles.tour_btn_text}>Watch Video</Text>
                    </TouchableOpacity>
                  
                  </View> */}
                          <TouchableOpacity onPress={brokerSkip} style={{
                            borderRadius: 20,
                            backgroundColor: '#dada10',
                            position: 'absolute', bottom: 80,
                            right: 20, alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15, color: '#000' }}>DONE</Text>
                          </TouchableOpacity>
                        </ImageBackground>


                      </View>
                    )}
                  />


                </View>
              </Modal>
              <FlatList
                data={[1]}
                ref={(ref) => {
                  listViewRef = ref;
                }}
                horizontal={true}
                contentContainerStyle={{}}
                renderItem={({ item, index }) => (
                  <View style={{ flexDirection: 'row' }}>
                    <ImageBackground source={require('../../assets/walkthrough/walk1.jpeg')} resizeMode={'stretch'}
                      style={styles.imgback}>

                      <View
                        style={{ alignSelf: 'center', flex: 1, width: '100%' }}
                      >
                        <TouchableOpacity onPress={() => { Linking.openURL('https://www.youtube.com/watch?v=Tubg0qv1j7o') }}
                          style={styles.tour_btn}>
                          <Text style={styles.tour_btn_text}>Watch Video</Text>
                        </TouchableOpacity>
                        <View style={styles.viewbtm}>

                          <TouchableOpacity onPress={tourSkip} style={styles.bottomSkip}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15, color: '#000' }}>SKIP</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => { tourNext(1) }} style={styles.bottomNext}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15, color: '#000' }}>NEXT</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </ImageBackground>
                    <ImageBackground source={require('../../assets/walkthrough/walk2.jpeg')} resizeMode={'stretch'}
                      style={styles.imgback}>

                      <View
                        style={{ alignSelf: 'center', flex: 1, width: '100%' }}
                      >
                        <TouchableOpacity onPress={() => { setBrokerModal(true) }}
                          style={styles.tour_btn}>
                          <Text style={styles.tour_btn_text}>See Brokers</Text>
                        </TouchableOpacity>
                        <View style={styles.viewbtm}>

                          <TouchableOpacity onPress={tourSkip} style={styles.bottomSkip}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15, color: '#000' }}>SKIP</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => { tourNext(1.95) }} style={styles.bottomNext}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15, color: '#000' }}>NEXT</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </ImageBackground>
                    <ImageBackground source={require('../../assets/walkthrough/walk3.jpeg')} resizeMode={'stretch'}
                      style={styles.imgback}>

                      <View
                        style={{ alignSelf: 'center', flex: 1, width: '100%' }}
                      >
                        <TouchableOpacity onPress={() => { Linking.openURL('https://www.youtube.com/watch?v=oxIjEs1X66Q') }}
                          style={styles.tour_btn}>
                          <Text style={styles.tour_btn_text}>Watch Video</Text>
                        </TouchableOpacity>
                        <View style={styles.viewbtm}>

                          <TouchableOpacity onPress={tourSkip} style={styles.bottomSkip}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15, color: '#000' }}>SKIP</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => { tourNext(2.85) }} style={styles.bottomNext}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15, color: '#000' }}>NEXT</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </ImageBackground>
                    <ImageBackground source={require('../../assets/walkthrough/walk4.jpeg')} resizeMode={'stretch'}
                      style={styles.imgback}>

                      <View
                        style={{ alignSelf: 'center', flex: 1, width: '100%' }}
                      >
                        {/* <TouchableOpacity onPress={()=>{Linking.openURL('https://youtu.be/U6EBaw8Q-XQ')}}
                     style={styles.tour_btn}>
                      <Text style={styles.tour_btn_text}>Watch Video</Text>
                    </TouchableOpacity> */}
                        <View style={styles.viewbtm}>

                          <TouchableOpacity onPress={tourSkip} style={styles.bottomSkip}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15, color: '#000' }}>SKIP</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => { tourNext(3.8) }} style={styles.bottomNext}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15, color: '#000' }}>NEXT</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </ImageBackground>
                    <ImageBackground source={require('../../assets/walkthrough/walk5.jpeg')} resizeMode={'stretch'}
                      style={styles.imgback}>

                      <View
                        style={{ alignSelf: 'center', flex: 1, width: '100%' }}
                      >
                        <TouchableOpacity onPress={() => { Linking.openURL('https://www.youtube.com/watch?v=9hDCTFlyblk') }}
                          style={styles.tour_btn}>
                          <Text style={styles.tour_btn_text}>Watch Video</Text>
                        </TouchableOpacity>

                      </View>
                      <TouchableOpacity onPress={tourSkip} style={{
                        borderRadius: 20,
                        backgroundColor: '#dada10',
                        position: 'absolute', bottom: 80,
                        right: 20, alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15, color: '#000' }}>DONE</Text>
                      </TouchableOpacity>
                    </ImageBackground>


                  </View>
                )}
              />


            </View>
          </Modal>

          <Modal
                        onBackButtonPress={() => setInfoModal(false)}
                        statusBarTranslucent={true}
                        deviceHeight={1000}
                        onBackdropPress={() => setInfoModal(false)}
                        // isVisible={ true }
                        isVisible={infoModal}
                        useNativeDriver={true}
                        animationIn={'bounceIn'}
                        animationOut={'bounceOut'}
                        animationInTiming={1000}
                        animationOutTiming={1000}
                        transparent={true}
                        backdropOpacity={0.6}>
                        <ImageBackground
                        source={require('../../assets/Aeon/bgNote.png')}
                        resizeMode='stretch'
                            style={{
                                width: 300,
                                height: 330,
                                flexDirection: 'column',
                                backgroundColor: colors.selected,  //'#9ed9ad',//          
                                alignSelf: 'center',
                                marginTop: 60,
                                padding: 10,
                                borderRadius: 10,
                                borderBottomWidth: 0,
                                // justifyContent:'center',
                                paddingHorizontal:30,
                                // paddingVertical: 20,
                                // alignItems: 'center',
                                zIndex: 9999,
                            }}>
                                <Text style={{color:colors.binanceylw,fontFamily:global.kanitFont,fontSize:26,textAlign: 'center',marginTop:0}}>NOTE</Text>
                                {/* <ImageBackground source={require('../assets/ribbon.png')}
                                resizeMode='stretch'
                                style={{width:300,height:100,alignSelf:'center',alignItems:'center',justifyContent:'center',marginBottom:20}}
                                >

                                </ImageBackground> */}
                                <Text style={{color:'#fff',fontFamily:global.kanitFontR,fontWeight:'100',fontSize:17,marginTop:50,
                                alignSelf:'center',textAlign:'center'}}>This bot generates only 5-8% monthly with no losses and minimal floating losses.</Text>
                                <TouchableOpacity onPress={()=>{setInfoModal(false)}}
                                    style={{backgroundColor:colors.binanceylw,paddingHorizontal:50,paddingVertical:10,alignSelf:'center',marginTop:80,borderRadius:10,}}>
                                <Text style={{color:'#000',fontFamily:global.kanitFontR,fontSize:17}}>OK</Text>
                                </TouchableOpacity>
                        </ImageBackground>

                    </Modal>

          <Modal
            onBackButtonPress={() => setSignalVis(false)}
            statusBarTranslucent={true}
            deviceHeight={1000}
            onBackdropPress={() => setSignalVis(false)}
            isVisible={signalVis ? true : false}
            useNativeDriver={true}
            transparent={true}
            backdropOpacity={0.5}>
            <ImageBackground
              resizeMode={'stretch'}
              source={require('../../assets/signalbg.png')}
              style={{
                width: Dimensions.get('screen').width, height: Dimensions.get('screen').height * 0.8,
                flexDirection: 'column',

                alignSelf: 'center',
                marginTop: 60,

                borderBottomWidth: 0,
                paddingVertical: 20,
                alignItems: 'center',
                zIndex: 9999,
              }}
              imageStyle={{ borderRadius: 20 }}
            >
              <View style={{
                flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, width: '80%',
                alignSelf: 'center', justifyContent: 'space-around', marginTop: 50
              }}>
                <TouchableOpacity
                  onPress={() => {
                    setLd2(1)
                    setSignalInterval('1')
                    SignalInfo(symSignal, '1')
                  }}
                  style={{ backgroundColor: signalInterval == '1' ? 'blue' : 'grey', width: 50, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                  <Text style={{ color: colors.selected }}>1m</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setLd2(1)
                    setSignalInterval('5')
                    SignalInfo(symSignal, '5')
                  }}
                  style={{ backgroundColor: signalInterval == '5' ? 'blue' : 'grey', width: 50, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                  <Text style={{ color: colors.selected }}>5m</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setLd2(1)
                    setSignalInterval('15')
                    SignalInfo(symSignal, '15')
                  }}
                  style={{ backgroundColor: signalInterval == '15' ? 'blue' : 'grey', width: 50, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                  <Text style={{ color: colors.selected }}>15m</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setLd2(1)
                    setSignalInterval('30')
                    SignalInfo(symSignal, '30')
                  }}
                  style={{ backgroundColor: signalInterval == '30' ? 'blue' : 'grey', width: 50, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                  <Text style={{ color: colors.selected }}>30m</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setLd2(1)
                    setSignalInterval('60')
                    SignalInfo(symSignal, '60')
                  }}
                  style={{ backgroundColor: signalInterval == '60' ? 'blue' : 'grey', width: 50, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                  <Text style={{ color: colors.selected }}>1h</Text>
                </TouchableOpacity>

              </View>
              {
                ld2 == -1 ?
                  <View style={{ alignSelf: 'center' }} >
                    <Text style={{ color: colors.selected, marginVertical: 25, alignSelf: 'flex-start' }}>RSI : {signalData2 && signalData2['RSI']}</Text>
                    <Text style={{ color: colors.selected, marginBottom: 25, alignSelf: 'flex-start' }}>Stochastic RSI : {signalData2 && signalData2['Stoch.RSI.K']}</Text>
                    <Text style={{ color: colors.selected, marginBottom: 25, alignSelf: 'flex-start' }}>Support : {signalData2 && signalData2['Pivot.M.Classic.S1']}</Text>
                    <Text style={{ color: colors.selected, marginBottom: 25, alignSelf: 'flex-start' }}>Resistance : {signalData2 && signalData2['Pivot.M.Classic.R1']}</Text>
                    <View style={{ borderBottomWidth: 1, marginVertical: 5, borderColor: '#fff' }}></View>
                    <Text style={{ color: colors.selected, marginVertical: 25, alignSelf: 'flex-start' }}>Total Buy Signals : {signalData && signalData.BUY}</Text>
                    <Text style={{ color: colors.selected, marginBottom: 25, alignSelf: 'flex-start' }}>Total Sell Signals : {signalData && signalData.SELL}</Text>
                    <Text style={{ color: colors.selected, marginBottom: 25, alignSelf: 'flex-start' }}>Total NEUTRAL Signals : {signalData && signalData.NEUTRAL}</Text>
                    <Text style={{ color: colors.selected, marginBottom: 25, alignSelf: 'flex-start' }}>RECOMMENDATION : {signalData && signalData.RECOMMENDATION}</Text>
                  </View> :
                  <View style={{ alignSelf: 'center' }} >
                    <ActivityIndicator size={'large'} color={colors.selected} />
                  </View>
              }

              <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', position: 'absolute', bottom: 80 }}>
                <TouchableOpacity onPress={() => setSignalVis(false)}
                  style={{
                    backgroundColor: '#6e0919', paddingHorizontal: 60,
                    paddingVertical: 10, borderRadius: 5
                  }}>
                  <Text style={{ color: colors.selected, fontWeight: 'bold' }}>CLOSE</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>

          </Modal>
          <Modal
            onBackButtonPress={() => setCparamsModal(false)}
            statusBarTranslucent={true}
            deviceHeight={1000}
            onBackdropPress={() => setCparamsModal(false)}
            isVisible={cparamsModal}
            useNativeDriver={true}
            transparent={true}
            backdropOpacity={0.9}>
            {superItem && <View

              style={{
                width: Dimensions.get('screen').width * 0.95, height: 650,
                flexDirection: 'column',
                borderRadius: 10,
                alignSelf: 'center',
                marginTop: 20,
                backgroundColor: colors.background,
                borderBottomWidth: 0,
                paddingVertical: 20,
                alignItems: 'center',
                zIndex: 9999, borderWidth: 2
              }}

            >
              <Text style={{ fontSize: 22, color: colors.binanceylw2, fontWeight: 'bold' }}>{superItem.symbol}</Text>
              <View style={styles.superitem}>
                <Text style={{ color: 'white', fontSize: 14 }}>TOTAL BUY MARGIN</Text>
                <Text style={{ color: 'white', fontSize: 16 }}>{superItem.buy_margins}</Text>
              </View>
              <View style={styles.superitem}>
                <Text style={{ color: 'white', fontSize: 14 }}>TOTAL SELL MARGIN</Text>
                <Text style={{ color: 'white', fontSize: 16 }}>{superItem.sell_margins}</Text>
              </View>
              <View style={styles.superitem}>
                <Text style={{ color: 'white', fontSize: 14 }}>QUANTITY FACTOR</Text>
                <Text style={{ color: 'white', fontSize: 16 }}>{superItem.qty_factor}</Text>
              </View>
              <View style={styles.superitem}>
                <Text style={{ color: 'white', fontSize: 14 }}>TP %</Text>
                <Text style={{ color: 'white', fontSize: 16 }}>{superItem.tp_per}</Text>
              </View>
              <View style={styles.superitem}>
                <Text style={{ color: 'white', fontSize: 14 }}>SL %</Text>
                <Text style={{ color: 'white', fontSize: 16 }}>{superItem.sl_per}</Text>
              </View>
              <View style={styles.superitem}>
                <Text style={{ color: 'white', fontSize: 14 }}>DIFFERENCE %</Text>
                <Text style={{ color: 'white', fontSize: 16 }}>{superItem.diff}</Text>
              </View>
              <View style={styles.superitem}>
                <Text style={{ color: 'white', fontSize: 14 }}>TP BUY</Text>
                <Text style={{ color: 'white', fontSize: 16 }}>{superItem.tp_buy}</Text>
              </View>
              <View style={styles.superitem}>
                <Text style={{ color: 'white', fontSize: 14 }}>SL BUY</Text>
                <Text style={{ color: 'white', fontSize: 16 }}>{superItem.sl_buy}</Text>
              </View>
              <View style={styles.superitem}>
                <Text style={{ color: 'white', fontSize: 14 }}>TP SELL</Text>
                <Text style={{ color: 'white', fontSize: 16 }}>{superItem.tp_sell}</Text>
              </View>
              <View style={styles.superitem}>
                <Text style={{ color: 'white', fontSize: 14 }}>SL SELL</Text>
                <Text style={{ color: 'white', fontSize: 16 }}>{superItem.sl_sell}</Text>
              </View>

              <View style={styles.superitem}>
                <Text style={{ color: 'white', fontSize: 14 }}>MARGIN TO BE STOPPED AT</Text>
                <Text style={{ color: 'white', fontSize: 16 }}>{superItem.stop_margin_at}</Text>
              </View>
              <View style={styles.superitem}>
                <Text style={{ color: 'white', fontSize: 14 }}>AUTO CLOSE TRADE</Text>
                <Text style={{ color: 'white', fontSize: 16 }}>{superItem.auto_close_val}</Text>
              </View>
              <View style={styles.superitem}>
                <Text style={{ color: 'white', fontSize: 14 }}>CLOSE TRADE AT MARGIN CALL</Text>
                <Text style={{ color: 'white', fontSize: 16 }}>{superItem.close_pl}</Text>
              </View>
              <View style={styles.superitem}>
                <Text style={{ color: 'white', fontSize: 14 }}>TRADE START CALLBACK</Text>
                <Text style={{ color: 'white', fontSize: 16 }}>{superItem.trade_start_callback}</Text>
              </View>
              <View style={styles.superitem}>
                <Text style={{ color: 'white', fontSize: 14 }}>SAFE MODE AT MARGIN CALL</Text>
                <Text style={{ color: 'white', fontSize: 16 }}>{superItem.safe_mode}</Text>
              </View>
              <View style={styles.superitem}>
                <Text style={{ color: 'white', fontSize: 14 }}>SAFE MODE AMOUNT</Text>
                <Text style={{ color: 'white', fontSize: 16 }}>{superItem.safe_pl}</Text>
              </View>
              <View style={styles.superitem}>
                <Text style={{ color: 'white', fontSize: 14 }}>SIDE</Text>
                <Text style={{ color: 'white', fontSize: 16 }}>{superItem.side}</Text>
              </View>
              <View style={styles.superitem}>
                <Text style={{ color: 'white', fontSize: 14 }}>STATUS OF BOT</Text>
                <Text style={{ color: 'white', fontSize: 16 }}>{superItem.status_bot}</Text>
              </View>
            </View>}

          </Modal>
          {/* {console.log('opt loading: '+optionModal)} */}
          <Modal
            onBackButtonPress={() => { setOptionModal(false) }}
            statusBarTranslucent={true}
            //  deviceHeight={1000}
            onBackdropPress={() => { setOptionModal(false) }}
            isVisible={optionModal}
            //  animationInTiming={300}
            //  backdropOpacity={1}

            style={{ backgroundColor: 'transparent', height: Dimensions.get('window').height }}
            backdropOpacity={0.4}
            backdropColor='rgba(255,255,255,0.1)'
          //  animationOutTiming={200}
          >
            {
              optLoading ?
                <View
                  style={{
                    width: 350,
                    backgroundColor: 'black',//'#203040',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 35,
                    paddingVertical: 25,
                    borderWidth: 0.5,
                    borderColor: '#70707070',
                    borderRadius: 10,
                    borderBottomWidth: 0,
                  }}>
                  <ActivityIndicator size={'large'} color={'white'} />
                </View>
                :
                <View
                  style={{
                    width: 350,
                    backgroundColor: 'black',//'#203040',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    paddingHorizontal: 35,
                    paddingVertical: 25,
                    borderWidth: 0.5,
                    borderColor: '#70707070',
                    borderRadius: 10,
                    borderBottomWidth: 0,
                  }}>
                  <TouchableOpacity style={{ marginBottom: 15 }}
                    onPress={() => {
                      setWait(true)
                      setOptionModal(false)
                      console.log('Mode all : ' + Mode_all);
                      TradeType_all(Mode_all)
                    }}
                  >
                    <ImageBackground
                      source={require('../../assets/btnylw.png')}
                      style={{
                        width: 250, alignSelf: 'center',
                        height: 50, flexDirection: 'row'
                        , alignItems: 'center', justifyContent: 'flex-start'
                        ,
                      }}
                      resizeMode={'stretch'}
                    >
                      <Image source={require('../../assets/change.png')} style={{
                        width: 25, height: 25
                        , marginHorizontal: 10, marginRight: 25
                      }} />
                      <Text
                        style={{
                          color: "#FFFFFF",
                          fontSize: 15,
                          fontFamily: global.appFontB,

                        }}
                      >
                        {Mode_all.toUpperCase()}
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>

                  <TouchableOpacity style={{ marginBottom: 15 }}
                    onPress={() => {
                      marginFn('buy', 'stopmargin')
                    }}
                  >
                    <ImageBackground
                      source={require('../../assets/btnred.png')}
                      style={{
                        width: 250, alignSelf: 'center',
                        height: 50, flexDirection: 'row'
                        , alignItems: 'center', justifyContent: 'flex-start'
                        ,
                      }}
                      resizeMode={'stretch'}
                    >
                      <Image source={require('../../assets/stop.png')} style={{
                        width: 25, height: 25
                        , marginHorizontal: 10, marginRight: 25
                      }} />
                      <Text
                        style={{
                          color: "#FFFFFF",
                          fontSize: 15,
                          fontFamily: global.appFontB,

                        }}
                      >
                        STOP ALL BUY MARGINS
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>

                  <TouchableOpacity style={{ marginBottom: 15 }}
                    onPress={() => {
                      marginFn('buy', 'startmargin')
                    }}
                  >
                    <ImageBackground
                      source={require('../../assets/btngrn.png')}
                      style={{
                        width: 250, alignSelf: 'center',
                        height: 50, flexDirection: 'row'
                        , alignItems: 'center', justifyContent: 'flex-start'
                        ,
                      }}
                      resizeMode={'stretch'}
                    >
                      <Image source={require('../../assets/start.png')} style={{
                        width: 25, height: 25
                        , marginHorizontal: 10, marginRight: 25
                      }} />
                      <Text
                        style={{
                          color: "#FFFFFF",
                          fontSize: 15,
                          fontFamily: global.appFontB,

                        }}
                      >
                        START ALL BUY MARGINS
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>

                  <TouchableOpacity style={{ marginBottom: 15 }}
                    onPress={() => {
                      marginFn('sell', 'stopmargin')
                    }}
                  >
                    <ImageBackground
                      source={require('../../assets/btnred.png')}
                      style={{
                        width: 250, alignSelf: 'center',
                        height: 50, flexDirection: 'row'
                        , alignItems: 'center', justifyContent: 'flex-start'
                        ,
                      }}
                      resizeMode={'stretch'}
                    >
                      <Image source={require('../../assets/stop.png')} style={{
                        width: 25, height: 25
                        , marginHorizontal: 10, marginRight: 25
                      }} />
                      <Text
                        style={{
                          color: "#FFFFFF",
                          fontSize: 15,
                          fontFamily: global.appFontB,

                        }}
                      >
                        STOP ALL SELL MARGINS
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>

                  <TouchableOpacity style={{ marginBottom: 15 }}
                    onPress={() => {
                      marginFn('sell', 'startmargin')
                    }}
                  >
                    <ImageBackground
                      source={require('../../assets/btngrn.png')}
                      style={{
                        width: 250, alignSelf: 'center',
                        height: 50, flexDirection: 'row'
                        , alignItems: 'center', justifyContent: 'flex-start'
                        ,
                      }}
                      resizeMode={'stretch'}
                    >
                      <Image source={require('../../assets/start.png')} style={{
                        width: 25, height: 25
                        , marginHorizontal: 10, marginRight: 25
                      }} />
                      <Text
                        style={{
                          color: "#FFFFFF",
                          fontSize: 15,
                          fontFamily: global.appFontB,

                        }}
                      >
                        START ALL SELL MARGINS
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => { setOptionModal(false) }}
                    style={{ marginTop: 50 }}
                  >
                    <View
                      style={{
                        width: 150, alignSelf: 'center',
                        height: 40, flexDirection: 'row', backgroundColor: 'grey'
                        , alignItems: 'center', justifyContent: 'flex-start', borderRadius: 5
                        ,
                      }}
                    >
                      <AntDesign name='closecircleo' size={26} color={'#fff'}
                        style={{ marginHorizontal: 20 }} />
                      <Text
                        style={{
                          color: "#FFFFFF",
                          fontSize: 15,
                          fontFamily: global.appFontB,

                        }}
                      >
                        CLOSE
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>}
          </Modal>
          <Modal
            onBackButtonPress={() => setShowTriggermodal(false)}
            statusBarTranslucent={true}
            deviceHeight={1000}
            onBackdropPress={() => setShowTriggermodal(false)}
            isVisible={showTriggermodal}
            useNativeDriver={true}
            transparent={true}
            backdropOpacity={0.8}>
            <View
              style={{
                width: 360,
                flexDirection: 'column',
                backgroundColor: global.appColor3,
                alignSelf: 'center',
                marginTop: 100,
                borderRadius: 10,
                borderBottomWidth: 0,
                paddingVertical: 20,
                alignItems: 'center',
                zIndex: 9999,
              }}>
              <Text style={{ color: colors.selected, marginBottom: 50 }}>This will result in opening a trade in opposite direction.</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', position: 'absolute', bottom: 15 }}>
                <TouchableOpacity onPress={() => setShowTriggermodal(false)} style={{ backgroundColor: colors.losscolor, paddingHorizontal: 20, paddingVertical: 5, borderRadius: 5 }}>
                  <Text style={{ color: colors.selected }}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity disabled={!showTriggermodal} onPress={() => { setShowTriggermodal(false), HitTrigger() }} style={{ backgroundColor: global.appColorGreen, paddingHorizontal: 20, paddingVertical: 5, borderRadius: 5 }}>
                  <Text style={{ color: colors.selected }}>Continue</Text>
                </TouchableOpacity>
              </View>
            </View>

          </Modal>
          <Modal
            onBackButtonPress={() => setAdjustModel(false)}
            statusBarTranslucent={true}
            deviceHeight={1000}
            onBackdropPress={() => setAdjustModel(false)}
            isVisible={adjustModel}
            useNativeDriver={true}
            transparent={true}
            backdropOpacity={0.5}>
            <View
              style={{
                width: 360,
                flexDirection: 'column',
                backgroundColor: '#202b3f',
                height: 250,
                alignSelf: 'center',
                marginTop: 100,
                borderRadius: 10,
                borderBottomWidth: 0,
                paddingVertical: 20,
                alignItems: 'center',
                zIndex: 9999,
              }}>
              <Text style={{ color: colors.selected, textAlign: 'center', marginTop: 0, marginBottom: 15, fontFamily: global.bold, fontSize: 16 }}>Select Margin Type</Text>
              <View style={{ flexDirection: 'row', width: '100%' }}>
                <Image source={require('../../assets/tempp.png')} style={{ width: 100, height: 100, marginLeft: 20 }} />
                <View style={{ flexDirection: 'column', justifyContent: 'space-around', width: '70%', alignItems: 'center', marginTop: 0 }}>
                  <TouchableOpacity onPress={() => {
                    setAdjustModel(false),
                      refRBSheet1.current.open();
                  }} style={{
                    backgroundColor: '#41c81d', width: 180, marginVertical: 10,
                    paddingVertical: 10, alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 5, marginBottom: 15, borderRadius: 5,
                    flexDirection: 'row'
                  }}>
                    <AntDesign name="pluscircle" size={18} color={'#fff'} />
                    <Text style={{ color: colors.selected, marginLeft: 5 }}>Add Liquidation Margin</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    setAdjustModel(false)
                    if (vItem.st.toString() === "False") {
                      ToastAndroid.show("No on-going trades available \n start a  trade first", ToastAndroid.SHORT)
                    } else {

                      setInput2('0.01'), setAvgMarginModal(true), setMode(vItem.side), setMP(true), setInput1((parseFloat(vItem.last_price).toFixed(8)).toString())
                    }
                  }
                  } style={{
                    backgroundColor: '#f2972c', width: 180, paddingVertical: 5, borderRadius: 5,
                    flexDirection: 'row', paddingVertical: 10, alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 5, flexDirection: 'row',
                  }}><AntDesign name="pluscircle" size={18} color={'#fff'} />
                    <Text style={{ color: colors.selected, marginLeft: 5, textAlign: 'left' }}>Add Average Margin</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* //style={{backgroundColor:global.appColor3,paddingHorizontal:20,paddingVertical:5,borderRadius:5}} */}
              <View style={{
                flexDirection: 'row', justifyContent: 'space-around', width: '100%', position: 'absolute', bottom: 0, height: 50
                , borderBottomRightRadius: 10, borderBottomLeftRadius: 10
                , width: '100%', alignItems: 'center', justifyContent: 'center'
                , backgroundColor: '#18202f'
              }}>
                <TouchableOpacity onPress={() => setAdjustModel(false)} >
                  <Text style={{ color: colors.selected }}>Close</Text>
                </TouchableOpacity>

              </View>
            </View>

          </Modal>
          <Modal onBackButtonPress={() => { setAvgMarginModal(false) }} onBackdropPress={() => { setAvgMarginModal(false) }} isVisible={avgMarginModal}
            animationInTiming={100} animationOutTiming={100}>
            {(vItem !== null && vItem != undefined) ?

              <View style={{
                width: 350, alignSelf: 'center', backgroundColor: colors.background, flexDirection: 'column', justifyContent: 'space-around', paddingHorizontal: 15, paddingVertical: 15,
                borderWidth: 0.5, borderColor: '#70707070', borderRadius: 10, borderBottomWidth: 0
              }}>

                <Text allowFontScaling={false} style={[styles.sheading, { textAlign: 'center', color: colors.selected }]}>Add Position</Text>
                <View style={{ width: '100%', backgroundColor: colors.background, borderWidth: 0.1, borderColor: colors.border, alignSelf: 'flex-start', paddingVertical: 10, paddingHorizontal: 10, marginVertical: 10, borderRadius: 5, flexDirection: 'column', justifyContent: 'space-between', }}>
                  <View style={{ marginVertical: 5 }}>
                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderRadius: 5 }}>
        <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>Position amount</Text>
        <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>{vItem.usdt == undefined ? 0 : vItem.usdt} USDT</Text>
      </View> */}
                  </View>
                  <View style={{ marginVertical: 5 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderRadius: 5 }}>
                      <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>Avg price </Text>
                      <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>{parseFloat(vItem.avg).toFixed(6)} USD</Text>
                    </View>
                  </View>
                  <View style={{ marginVertical: 5 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderRadius: 5 }}>
                      <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>Position quantity</Text>
                      <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>{vItem.qty == undefined ? 0 : vItem.qty} Lot</Text>
                    </View>
                  </View>
                  <View style={{ marginVertical: 5 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderRadius: 5 }}>
                      <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>Current price</Text>
                      <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15, color: '#2da4fe' }}>{parseFloat(vItem.last_price).toFixed(5)}</Text>
                    </View>
                  </View>
                  <View style={{ marginVertical: 5 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderRadius: 5 }}>
                      <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>Position profit and loss </Text>
                      <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>   {vItem.side.toLowerCase() == 'buy'
                        ?
                        (parseFloat(vItem.qty) * (parseFloat(vItem.last_price) - parseFloat(vItem.avg))).toFixed(2)

                        :
                        (parseFloat(vItem.qty) * (parseFloat(vItem.last_price) - parseFloat(vItem.avg))).toFixed(2) * -1}
                        USD
                      </Text>
                    </View>
                  </View>

                  <View>
                    <TouchableOpacity onPress={() => { global.strategy = ("sbr"), setStrategy('sbr') }} style={{ marginVertical: 10 }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderRadius: 5 }}>
                        <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>Estimated Avg Price </Text>

                        <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>{Input1 != '' ? isNaN(parseFloat(NewAvg1)) ? '0' : (parseFloat(NewAvg1) * vItem.leverage).toFixed(2) : '-'}</Text>
                      </View>
                    </TouchableOpacity>
                    {/* <View style={{ marginVertical: 5 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderRadius: 5 }}>
            <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>Estimated Holding {'\n'} profit and loss </Text>
            <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>{(parseFloat(estimated_pnl())*parseFloat(vItem.leverage)).toFixed(4)}</Text>
          </View>
        </View> */}
                  </View>

                  <View style={{ marginVertical: 5, width: '100%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderRadius: 5 }}>
                      <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>Trigger price (buy/Sell at market price after reaching the trigger price )</Text>

                    </View>
                  </View>
                  <View style={{ width: '100%' }}>
                    <View style={{ marginTop: 5, flexDirection: 'row', justifyContent: 'space-between', borderRadius: 5 }}>
                      <TextInput
                        keyboardType={'number-pad'}
                        autoCapitalize="none"

                        value={parseFloat(vItem.last_price).toFixed(5)}
                        color={colors.dark_text}
                        placeholder={'Please Enter Trigger Price'}
                        placeholderTextColor={colors.lgt_text}
                        width={'60%'}
                        editable={MP ? false : true}
                        height={40}
                        style={{ marginTop: 5, backgroundColor: '#e8f2fc', }}
                        selectionColor={colors.selected}
                      />


                      <TouchableOpacity disabled={true} style={{ backgroundColor: MP ? '#2da4fe' : '#e8f2fc', borderRadius: 5, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5 }}>
                        <View style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center', }}>
                          <Text allowFontScaling={false} style={{ color: MP ? colors.selected : colors.dark_text, fontSize: 16 }}>Market Price</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View>
                    <View >
                      <View style={{ marginTop: 5, flexDirection: 'row', justifyContent: 'space-between', borderRadius: 5 }}>
                        <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>{'Lot Size'}</Text>
                        <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>{Strategy === 'sbr' ? <Ionicons name={'checkmark-sharp'} size={20} /> : null}</Text>
                      </View>
                    </View>
                    <View style={{ marginVertical: 5, width: '100%' }}>
                      <KeyboardAvoidingView style={{ marginTop: 5, backgroundColor: '#e8f2fc', flexDirection: 'row', justifyContent: 'space-between', borderRadius: 5 }}>

                        <TextInput
                          keyboardType={'number-pad'}
                          autoCapitalize="none"
                          onChangeText={


                            (val) => {

                              setTotalAmount((parseFloat(vItem.leverage) * parseFloat(val)).toFixed(4))


                              setInput2(val)

                              let newqty = parseFloat(val) / parseFloat(Input1)
                              newqty = parseFloat(newqty) + parseFloat(vItem.qty)
                              let total_fund = parseFloat(vItem.usdt) + parseFloat(val)

                              let new_calculated_avg = total_fund / (newqty)
                              if (Input1 == '0' || Input1 == '') {
                                setNewAvg1(0)
                              }
                              else {
                                setNewAvg1(new_calculated_avg)

                              }
                            }}
                          value={Input2}

                          color={colors.dark_text}
                          placeholderTextColor={colors.lgt_text}
                          placeholder={'Enter Lot Size'}
                          width={'60%'}

                          height={40}
                          style={{ marginTop: 5, color: 'black' }}
                          selectionColor={'black'}
                        />



                        {/* <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 5 }}>
            <View style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
              <Text allowFontScaling={false} style={{ color: colors.dark_text, fontSize: 17, }}>{'USD'}</Text>
            </View>
          </View>                                                                                   */}
                      </KeyboardAvoidingView>
                    </View>
                  </View>
                  {/* {Mode !== 'xx' ? null :
      <View>
  
        <View style={{ backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'space-evenly', borderTopLeftRadius: 25, borderTopRightRadius: 25, }}>
      
          <TouchableOpacity style={{ backgroundColor: '#2da4fe', borderRadius: 5 }} activeOpacity={1}>
            <View style={[styles1.btn1]}>
              <Text allowFontScaling={false} style={{ color: '#f5f5f5' }}>100%</Text>
            </View>
          </TouchableOpacity>
      


        </View>

      </View>

    } */}
                </View>
                {/* <View style={{display:keyboardStatus?'none':'flex',flexDirection: 'row',justifyContent: 'space-between'}}>

  <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15,marginTop:5 }}>Leverage : {vItem.leverage}x</Text>
        <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15,marginTop:5 }}>Total Amount : {isNaN(total_amount)?'0':total_amount}</Text>
  </View> */}
                <View style={{ display: keyboardStatus ? 'none' : 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', width: '100%' }}>
                  <TouchableOpacity onPress={() => { setAvgMarginModal(false) }}>
                    <View style={{ marginTop: 5, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                      <Text allowFontScaling={false} style={{ color: colors.selected, fontWeight: 'bold', fontSize: 17 }}>Cancel</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity disabled={!Click_buy} onPress={() => avgMarginFn(Mode)}
                  >
                    <View style={{ marginTop: 5, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                      <Text allowFontScaling={false} style={{ color: colors.profitcolor2, fontWeight: 'bold', fontSize: 17 }}>Confirm  {P_order ? <ActivityIndicator size={'small'} color="#000" /> : null}  </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              : null}

          </Modal>
          <Modal
            onBackButtonPress={() => setErrorModal(null)}
            statusBarTranslucent={true}
            deviceHeight={1000}
            onBackdropPress={() => setErrorModal(null)}
            isVisible={errorModal ? true : false}
            useNativeDriver={true}
            // animationIn={'slideInDown'}
            // animationOut={'slideOutUp'}
            transparent={true}
            backdropOpacity={0.6}>
            <ImageBackground source={require('../../assets/Aeon/otpbg.png')} 
            resizeMode='stretch'
              style={{
                width: 360,
                height: 400,
                flexDirection: 'column',
                // backgroundColor: '#02221A',  //'#9ed9ad',//          
                alignSelf: 'center',
                marginTop: 60,
                padding: 10,
                borderRadius: 10,
                borderBottomWidth: 0,
                paddingVertical: 50,
                alignItems: 'center',
                zIndex: 9999,
              }}>
            
              <Text style={{ color: colors.appBlue, fontSize: 22,fontFamily:global.appFontB,position:'absolute',top:12, }}>NOTICE</Text>
              <Image source={require('../../assets/images/image30.png')} resizeMode='stretch' style={{ width: 120, height: 100,marginTop:30,marginBottom:20 }} />
              <Text style={{ color: '#fff', fontSize: 15,textAlign:'center',fontFamily:global.appFontM,lineHeight:20 }}>{errorModal}</Text>
              <ImageBackground source={require('../../assets/Aeon/otpbtn.png')} resizeMode='center'
               style={{ width:240,height:50, position: 'absolute', bottom: 20, alignItems:'center',justifyContent:'center'}}>

                <TouchableOpacity onPress={() => { setErrorModal(null) }} >
                  <Text style={{ color: '#fff', fontSize: 18,fontFamily:global.appFontM }}>OK</Text>
                </TouchableOpacity>
              </ImageBackground>
            </ImageBackground>

          </Modal>
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
            {/* <View
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
              <Modal
                onBackButtonPress={() => setAddMoneyModal(false)}
                statusBarTranslucent={true}
                deviceHeight={1000}
                onBackdropPress={() => setAddMoneyModal(false)}
                isVisible={addMoneyModel}
                useNativeDriver={true}
                animationIn={'slideInDown'}
                animationOut={'slideOutUp'}
                transparent={true}
                backdropOpacity={0.2}>
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
                  <Text style={{
                    color: '#fff', fontFamily: global.bold, fontSize: 22, textAlign: 'center'
                    , padding: 10
                  }}>Add Amount to Demo Balance</Text>
                  <TextInput
                    placeholder="Enter New Amount"
                    style={[
                      {
                        backgroundColor: 'white',
                        marginTop: 15,
                        height: 50,
                        borderRadius: 5,
                        fontSize: 18, paddingLeft: 5, alignSelf: 'center',
                        fontWeight: 'bold',
                        shadowColor: 'white',
                      },
                    ]}
                    value={addAmount}
                    color={colors.selectednew}
                    keyboardType={'decimal-pad'}
                    autoCapitalize="none"
                    onChangeText={val => setAddAmount(val)}
                    width={300}
                    selectionColor={'black'}
                    maxLength={6}
                    placeholderTextColor={'grey'}
                  />

                  <TouchableOpacity onPress={() => { setLd5(true), addDemo() }}
                    disabled={ld5}
                    style={{
                      alignSelf: 'center', marginTop: 20, backgroundColor: colors.binanceylw2,
                      paddingHorizontal: 25, paddingVertical: 5, borderRadius: 5
                    }}>
                    <Text style={{ color: '#000', fontFamily: global.bold, fontSize: 18 }}>ADD</Text>
                  </TouchableOpacity>
                </View>

              </Modal>
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
                <View style={{ paddingHorizontal: 10 }}>
                  <Text
                    style={{
                      color: colors.selected,
                      fontWeight: 'bold',
                      fontSize: 15,
                    }}>
                    Margin Trading
                  </Text>
                  <Text style={{ color: colors.selected, fontSize: 12 }}>
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
                <View style={{ flexDirection: 'column' }}>
                  <Text style={{ color: colors.selected, fontSize: 14 }}>
                    REAL ACCOUNT
                  </Text>
                  <Text
                    style={{ color: '#478b5b', fontSize: 14, fontWeight: 'bold' }}>
                    ${global.livebal}
                  </Text>
                </View>
                {realBal ? (
                  <Image
                    source={require('../../assets/botz/correct.png')}
                    style={{ width: 30, height: 30 }}
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
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={{ color: '#515c71', fontSize: 12 }}>BALANCE</Text>
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
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={{ color: '#515c71', fontSize: 12 }}>
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
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={{ color: '#515c71', fontSize: 12 }}>TOTAL</Text>
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
                <View style={{ flexDirection: 'column' }}>
                  <Text style={{ color: colors.selected, fontSize: 14 }}>
                    PRACTICE ACCOUNT
                  </Text>
                  <Text
                    style={{ color: '#c7764f', fontSize: 14, fontWeight: 'bold' }}>
                    ${global.demobal}
                  </Text>
                </View>
                {!realBal ? (
                  <Image
                    source={require('../../assets/botz/correct.png')}
                    style={{ width: 30, height: 30 }}
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
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={{ color: '#000', fontSize: 12 }}>BALANCE</Text>
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
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={{ color: '#515c71', fontSize: 12 }}>
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
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={{ color: '#515c71', fontSize: 12 }}>TOTAL</Text>
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
              <View style={{ position: 'absolute', top: 280 }}>
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
                    <Text style={{ color: colors.selected }}>
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
                    <Text style={{ color: colors.selected, }}>
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

                  <Text style={{ color: colors.selected, fontWeight: 'bold' }}>
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

                  <Text style={{ color: colors.selected, fontWeight: 'bold' }}>
                    SELL
                  </Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </Modal>


          {/* <ImageBackground
            source={require('../../assets/botz/box-bgapi.png')} //resizeMode= {'stretch'}
            style={{ width: '100%', alignSelf: 'center', alignItems: 'center', height: 60, flexDirection: 'row', }}
          >
            <Image
              source={require('../../assets/logom.png')}
              style={{ width: 45, height: 38, resizeMode: 'stretch', margin: 10, marginLeft: 22 }}
            />
            <View style={{ flexDirection: 'column', justifyContent: 'center', width: '50%', alignSelf: 'flex-end', justifyContent: 'flex-start', paddingRight: '5%', height: '100%', paddingTop: 5 }}>


              <Text style={{ color: '#fff' }}>Name : <Text style={{ color: '#fff', fontSize: 12, color: colors.yellow, fontWeight: 'bold', }}>{global.NAME}</Text></Text>
              <Text style={{ color: '#fff' }}>User Id : <Text style={{ color: '#fff', fontSize: 16, color: colors.yellow, fontWeight: 'bold' }}>{global.uid}</Text></Text>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Text
                onPress={() => {
                  if (!global.lg_without_pwd) {
                    navigation.navigate('DepositScreen');
                  } else {
                    ToastAndroid.show(
                      'Sorry... Visitors are not allowed in here',
                      ToastAndroid.SHORT,
                    );
                  }
                }}
                style={[
                  styles.sheading,
                  { textAlign: 'right', fontSize: 15, color: colors.selected },
                ]}>
                <Text style={[global.AMT > 0 ? { color: colors.yellow } : { color: colors.losscolor }]}>
                  <Text style={{ color: '#fff' }}>Status :</Text> {global.AMT == 0 ? 'Inactive' : 'Active'}
                </Text>
              </Text>
              <Text
                style={{

                  fontSize: 12,
                  fontWeight: 'bold',

                  fontWeight: 'bold',
                  color: '#fff',
                }}>
                Rank :{' '}
                <Text
                  style={{

                    fontSize: 10,
                    fontWeight: 'bold',

                    fontWeight: 'bold',
                    color: colors.yellow,
                  }}>
                  {global.rank}
                </Text>
              </Text>
            </View>



          </ImageBackground> */}
          <ScrollView style={{ flex: 1, }} showsVerticalScrollIndicator={false}>
            <View style={{ width:'100%',paddingHorizontal:20}}>
            <ImageBackground
              source={require('../../assets/Aeon/dashboard.png')}
              resizeMode="stretch"
              style={{
                width: '100%', height: 290, marginBottom: 0,
                marginTop: 15, justifyContent: 'space-evenly',flexDirection:'column',alignItems:'center'
              }}>
                <View style={{height:5}}></View>
              <View style={{ padding: 0, paddingVertical: 20,flexDirection:'column',alignItems:'center',justifyContent:'space-between',top:5,left:5}}>
              
                <Text style={{ color: '#fff', fontFamily: global.appFontB, fontSize: 22, }}>Total Balance</Text>
                <Text style={{ color: '#19DC51', fontSize: 30, fontFamily: global.appFontB }}>${Bal}</Text>
              
              <View style={{ marginLeft:0,marginTop:5}}>

              {refreshingBal?
             <ActivityIndicator size={'small'} color="#fff"/>
             :
             <Ionicons name="refresh" size={24} color={colors.selected} onPress={()=>{
               getBalanceApi()
              }}/>}
              </View>
              </ View >
              <View style={{
                padding: 0, paddingVertical: 0, flexDirection: 'row'
                , alignItems: 'center', justifyContent: 'space-evenly', width: '100%',height:40,alignContent:'center',top:15
                
              }}>
                <ImageBackground source={require('../../assets/Aeon/green1.png')} resizeMode='stretch' style={{width:150,height:'100%',justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity 
                  onPress={() => { navigation.navigate("DepositScreen") }}
                >
                  
                  <Text style={{ color: '#fff', fontSize: 12, fontFamily: global.appFontM,right:15 }}>DEPOSIT</Text>
                </TouchableOpacity>
                </ImageBackground>
                <ImageBackground source={require('../../assets/Aeon/red_btn.png')} resizeMode='stretch' style={{width:150,height:'100%',justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity  
                  onPress={() => { navigation.navigate("Withdraw") }}>
                 
                  <Text style={{ color: '#fff', fontSize: 12, fontFamily: global.appFontM,right:15 }}>WITHDRAW</Text>
                </TouchableOpacity>
                </ImageBackground>
              </ View >

            </ImageBackground>
            </View>
            {/* <View
              style={{
                height: 160,
                marginTop: 10,
                // width:'96%',alignItems:'center',
                display: hideBlock ? 'none' : 'flex',
                paddingHorizontal: 10
              }}>
              <Swiper
              
                loadMinimal={true}
                autoplay={true}
                loadMinimalSize={1}
                autoplayTimeout={8}
                showsPagination={true}
              
                renderPagination={renderPagination}
                loadMinimalLoader={
                  <ActivityIndicator size={40} color="#d0d0d0" />
                }>
                <Image
                  resizeMode="stretch"
                  source={require('../../assets/Fxbot/slides/slide2.png')}
                  style={{ alignSelf: 'center', width: '100%', height: 160, borderRadius: 10 }}
                />

                <Image
                  source={require('../../assets/Fxbot/slides/slide2i.png')}
                  style={{
                    alignSelf: 'center',
                    width: '100%',
                    height: 160,
                    resizeMode: 'stretch',
                    borderRadius: 10
                  }}
                />
                <Image resizeMode="stretch"
                  source={require('../../assets/Fxbot/slides/s4.png')}
                  style={{ alignSelf: 'center', width: '100%', height: 160, borderRadius: 10 }}
                />
                <Image resizeMode="stretch"
                  source={require('../../assets/Fxbot/slides/slide1.png')}
                  style={{ alignSelf: 'center', width: '100%', height: 160, borderRadius: 10 }}
                />
                <Image resizeMode="stretch"
                  source={require('../../assets/Fxbot/slides/s5.png')}
                  style={{ alignSelf: 'center', width: '100%', height: 160, borderRadius: 10 }}
                />
                <Image resizeMode="stretch"
                  source={require('../../assets/Fxbot/slides/s6.png')}
                  style={{ alignSelf: 'center', width: '100%', height: 160, borderRadius: 10 }}
                />
                <Image resizeMode="stretch"
                  source={require('../../assets/Fxbot/slides/s5.png')}
                  style={{ alignSelf: 'center', width: '100%', height: 160, borderRadius: 10 }}
                />
              </Swiper>
            </View> */}
            <AutoScrolling endPadding={50}>
              <Text style={{ color: '#000' }} delay={0} duration='infinite'>{ScrollDta}</Text>
            </AutoScrolling>

            <View style={{
              flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center',
              width: '100%', height: 100, paddingHorizontal: 10, top: 10,
            }}>
              <View style={styles1.iconOuter2}>
                <TouchableOpacity
                  onPress={() => {
                    if (!global.lg_without_pwd && global.activeId) {
                      navigation.navigate('APIBinding');
                      // navigation.navigate('HedgeAuto');
                    } else {
                      ToastAndroid.show(
                        'Please Activate Your ID',
                        ToastAndroid.SHORT,
                      );
                    }
                  }}
                  style={styles1.iconOuter}
                  useNativeDriver={true}>
                  {(global.server_name == null || global.server_name == '') ? <Image
                    source={require('../../assets/Aeon/ico1.png')}
                    style={styles1.icons}
                    resizeMode={'contain'}
                  /> : <Image
                    source={require('../../assets/Aeon/ico1.png')}
                    style={styles1.icons}
                    resizeMode={'contain'}
                  />}
                </TouchableOpacity>
                <Text
                  style={styles1.text}>
                  {(global.server_name == null || global.server_name == '') ? 'LINK ACCOUNT' : 'LINKED'}
                </Text>
              </View>
              <View style={styles1.iconOuter2}>
                <TouchableOpacity
                  onPress={() => {
                    {
                      navigation.navigate('Revenue');
                    }
                  }}
                  style={styles1.iconOuter}
                  useNativeDriver={true}>
                  <Image
                    resizeMode={'contain'}
                    style={styles1.icons}
                    source={require('../../assets/Aeon/ico2.png')}
                  />
                </TouchableOpacity>
                <Text
                  style={styles1.text}>
                  PROFIT{' '}
                </Text>
                {/* <Image
                      source={require('../../assets/temp/icon3.png')}
                      style={{width: 30, height: 30}}
                      resizeMode={'stretch'}
                    /> */}
              </View>
              <View style={styles1.iconOuter2}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('TransactionScreen');
                  }}
                  style={styles1.iconOuter}
                  useNativeDriver={true}>
                  <Image
                    resizeMode={'contain'}
                    style={styles1.icons}
                    source={require('../../assets/Aeon/trades.png')}
                  />
                </TouchableOpacity>
                <Text
                  style={styles1.text}>
                  TRADES
                </Text>

              </View>
              <View style={styles1.iconOuter2}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    navigation.navigate('ProfileDetails');
                  }}
                  style={styles1.iconOuter}
                  useNativeDriver={true}>
                  <Image
                    resizeMode={'contain'}
                    style={
                      global.autoStatus === 'False'
                        ? styles1.icons
                        : styles1.icons1
                    }
                    source={require('../../assets/Aeon/ico4.png')}
                  />
                </TouchableOpacity>
                <Text
                  style={styles1.text}>
                  PORTFOLIO
                </Text>

              </View>
            </View>
            <View style={{
              flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center',
              width: '100%', height: 100, paddingHorizontal: 10, marginTop: 10,
            }}>
              <View style={styles1.iconOuter2}>
                <TouchableOpacity

                  onPress={() => {
                    navigation.navigate('OrderHistory');
                  }}
                  style={styles1.iconOuter}
                  useNativeDriver={true}>
                  <Image
                    resizeMode={'contain'}
                    style={styles1.icons}
                    source={require('../../assets/Aeon/orders.png')}
                  />
                </TouchableOpacity>
                <Text
                  style={styles1.text}>
                  ORDERS
                </Text>

              </View>
              <View style={styles1.iconOuter2}>
                <TouchableOpacity
                  onPress={() => {
                    // global.activeId?
                    navigation.navigate('Invite');
                    // : ToastAndroid.show(
                    //     'Please Activate your ID first!',
                    //     ToastAndroid.LONG,
                    //   );
                  }}
                  style={styles1.iconOuter}
                  useNativeDriver={true}>
                  <Image
                    resizeMode={'contain'}
                    style={[styles1.icons,{}]}
                    source={require('../../assets/Aeon/refer.png')}
                  />
                </TouchableOpacity>
                <Text
                  style={styles1.text}>
                  REFER{' '}
                </Text>

              </View>
              <View style={styles1.iconOuter2}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('RewardDetails');
                  }}
                  style={styles1.iconOuter}
                  useNativeDriver={true}>
                  <Image
                    resizeMode={'stretch'}
                    style={[styles1.icons, {}]}
                    source={require('../../assets/Aeon/earning.png')}
                  />
                </TouchableOpacity>
                <Text
                  style={
                    styles1.text}>
                  EARNING
                </Text>

              </View>
              <View style={styles1.iconOuter2}>
                <TouchableOpacity
                  onPress={() => {

                    navigation.navigate('CoinProfitScreen_superbot'//, { from: 'superbot' }
                    )
                  }}
                  style={styles1.iconOuter}
                  useNativeDriver={true}>
                  <Image
                    resizeMode={'contain'}
                    style={styles1.icons}
                    source={require('../../assets/Aeon/pnl.png')}
                  />
                </TouchableOpacity>
                <Text
                  style={
                    styles1.text}>
                  PNL
                </Text>

              </View>
            </View>

            {/* <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between',
              marginTop: 30,}}>
              <TouchableOpacity
              style={{backgroundColor:colors.appGray ,paddingHorizontal:10,
                paddingVertical:5,borderTopLeftRadius:10,borderTopRightRadius:10}}
              onPress={() => {
                if (!global.lg_without_pwd && global.AMT != 0) {
                  navigation.navigate('Circle');
                } else {
                  ToastAndroid.show(
                    'Please Activate Your Id First',
                    ToastAndroid.SHORT,
                  );
                }
              }}>
               
                <Text style={{ color: colors.selected,fontFamily:global.appFontR }} numberOfLines={1}>TOP TRADERS</Text>
             
              </TouchableOpacity> */}
            {/* <TouchableOpacity onPress={() => {
                if (!global.lg_without_pwd && global.AMT != 0) {
                  navigation.navigate('TopLeaders');
                } else {
                  ToastAndroid.show(
                    'Please Activate Your Id First',
                    ToastAndroid.SHORT,
                  );
                }
              }}>
                <ImageBackground source={require('../../assets/botz/btn8.png')} resizeMode='stretch' style={{ width: 120, height: 30, justifyContent: 'center', alignItems: 'center' }}>

                  <Text style={{ color: colors.selected, fontWeight: 'bold', borderBottomWidth: 0, borderColor: colors.selected, paddingBottom: 0 }} numberOfLines={1}>RANK ACH</Text>
                </ImageBackground>

              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                if (!global.lg_without_pwd && global.AMT != 0) {
                  navigation.navigate('TopEarners');
                } else {
                  ToastAndroid.show(
                    'Please Activate Your Id First',
                    ToastAndroid.SHORT,
                  );
                }
              }}>
                <ImageBackground source={require('../../assets/botz/btn8.png')} resizeMode='stretch' style={{ width: 120, height: 30, justifyContent: 'center', alignItems: 'center' }}>

                  <Text style={{ color: colors.selected, fontWeight: 'bold', borderBottomWidth: 0, borderColor: colors.selected, paddingBottom: 0 }} numberOfLines={1}>TOP EARNERS</Text>
                </ImageBackground>

              </TouchableOpacity> */}
            {/* </View> */}
            {/* </View> */}
            {/* <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: 'transparent',
                display: 'none'
              }}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={{
                  paddingRight: 12,
                  padding: 0,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                }}
                onPress={() => {
                  setHideBlock(!hideBlock);
                }}>
                <LottieView
                  source={hideBlock ? require('../../assets/botz/game/arright.json') : require('../../assets/botz/game/ardown.json')}
                  style={{ width: 35, height: 35, }}
                  autoPlay
                  loop
                />
             
              </TouchableOpacity>
            </View> */}




            {/* <TouchableOpacity style={{ width: '100%', alignItems: 'center', marginTop: 10, justifyContent: 'center', }}
              onPress={() => {
                // navigation.navigate('SuperBotScreen');
                if (global.AMT != 0) {
                  navigation.navigate('SuperBotScreen');
                } else {
                  ToastAndroid.show(
                    'Please Activate Your Id First',
                    ToastAndroid.SHORT,
                  );
                }
              }}
            >
              <ImageBackground source={require('../../assets/Aeon/autobot.png')}
                style={{ width: '96%', height: 115, alignSelf: 'center', marginLeft: '3%' }} resizeMode={'stretch'} >

              </ImageBackground>
            </TouchableOpacity> */}
            <View style={{flexDirection:'row',justifyContent:'space-evenly',paddingHorizontal:10,width:'100%'}}>

            <TouchableOpacity
                                            style={{ 
                                              flex:1,
                                              // display: isSuperBot == '1' ? 'flex' : 'none',
                                              marginVertical:10 }}
                                            onPress={() => {
                                                global.AMT > 0
                                                    ? navigation.navigate('SuperBotScreenSafe')
                                                    : ToastAndroid.show(
                                                        'Please Activate Your Id First',
                                                        ToastAndroid.SHORT
                                                    );
                                            }}

                                        >
                                            <Image source={require('../../assets/Aeon/safebot9.png')}
                                                resizeMode={'contain'} style={{ width: '96%', height: 120,alignSelf:'center' }} />
                                            <TouchableOpacity onPress={()=>{setInfoModal(true)}}
                                            style={{position:'absolute',top:20,right:10,zIndex:999,padding:10}}>
                                                <Entypo name='info-with-circle' color={colors.selected} size={22}/>
                                            </TouchableOpacity>
                                        </TouchableOpacity>
            <TouchableOpacity
                                            style={{flex:1,
                                              //  display: isSuperBot == '1' ? 'flex' : 'none'
                                               }}
                                            onPress={() => {
                                                global.AMT > 0
                                                    ? navigation.navigate('SuperBotScreenGold')
                                                    : ToastAndroid.show(
                                                        'Please Activate Your Id First',
                                                        ToastAndroid.SHORT
                                                    );
                                            }}

                                        >
                                            <Image source={require('../../assets/Aeon/gold_bot.png')}
                                                resizeMode={'contain'} style={{ width: '96%', height: 120,top:10 }} />
                                        </TouchableOpacity>
            </View>
            {/* <ImageBackground source={require('../../assets/Fxbot/home/bgmid.png')}
              resizeMode={'stretch'}
              style={{ width: Dimensions.get('screen').width * 0.94, height: 100, alignSelf: 'center', }}>



              <View
                style={{
                  flexDirection: 'row',
                  borderRadius: 5, paddingHorizontal: 5,
                  justifyContent: 'space-evenly',
                  // elevation: 10,
                  borderBottomWidth: 0.5,
                  borderBottomColor: 'grey',
                  // backgroundColor: colors.inner_bg,
                  alignItems: 'center',
                  width: '100%',
                  alignSelf: 'center',

                }}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    setPositionPanel(true), setOpenPanel(false),setCopyPanel(false);
                  }}
                  style={{ marginRight: 10, flexDirection: 'column', }}>
                  <View style={{ flexDirection: 'row', }}>

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
                      Positions </Text>
                    <ImageBackground source={require('../../assets/Fxbot/home/grn.png')} style={{ alignItems: 'center', justifyContent: 'center', height: 20, alignSelf: 'center', }}>
                      <Text style={{ color: '#2cd300', textAlign: 'center' }}>  {
                        Data!=='' ?
                          Dta_filter().filter(e => (e.opens == '1')).length + totalCount2
                          : superData.length > 0 ? totalCount2 : ' 0'
                      }  </Text>
                    </ImageBackground>
                  </View>

                  <View
                    style={[
                      positionPanel && !OpenPanel && !CopyPanel
                        ? { borderBottomWidth: 2, borderColor: colors.binanceylw2 }
                        : {},
                      { height: 5, width: 30, alignSelf: 'center' },
                    ]}></View>
                </TouchableOpacity>

             
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    setPositionPanel(false), setOpenPanel(true),setCopyPanel(false);
                  }}
                  style={{ marginRight: 10, flexDirection: 'column', }}>
                  <View style={{ flexDirection: 'row', }}>

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
                      Open Trades </Text>
                    <ImageBackground source={require('../../assets/Fxbot/home/grn.png')} style={{ alignItems: 'center', justifyContent: 'center', height: 20, alignSelf: 'center', }}>
                      <Text style={{ color: '#2cd300', textAlign: 'center' }}> {Data ? Data.filter(e => e.opens == '0').length : '0'} </Text>
                    </ImageBackground>
                  </View>

                  <View
                    style={[
                      !positionPanel && OpenPanel && !CopyPanel
                        ? { borderBottomWidth: 2, borderColor: colors.binanceylw2 }
                        : {},
                      { height: 5, width: 30, alignSelf: 'center' },
                    ]}></View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    setPositionPanel(false), setOpenPanel(false),setCopyPanel(true)
                  }}
                  style={{ marginRight: 10, flexDirection: 'column', }}>
                  <View style={{ flexDirection: 'row', }}>

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
                      Copy Trades </Text>
                    <ImageBackground source={require('../../assets/Fxbot/home/grn.png')}
                     style={{ alignItems: 'center', justifyContent: 'center', height: 20, alignSelf: 'center', }}>
                      <Text style={{ color: '#2cd300', textAlign: 'center' }}> {normalData ? normalData.length : '0'} </Text>
                    </ImageBackground>
                  </View>

                  <View
                    style={[
                      !positionPanel && !OpenPanel && CopyPanel
                        ? { borderBottomWidth: 2, borderColor: colors.binanceylw2 }
                        : {},
                      { height: 5, width: 30, alignSelf: 'center' },
                    ]}></View>
                </TouchableOpacity>

              </View>
              {!positionPanel && OpenPanel ? (
                !refreshing ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      paddingHorizontal: '5%',
                      alignItems: 'center',
                      paddingTop: 10,
                    }}>
                   
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
                      style={{ marginLeft: '5%' }}
                    />
                  </View>
                )
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}>
                  {!refreshing ? (
                    <>
                    </>
                 
                  ) : (
                    <View>
                      <ActivityIndicator
                        color={'#FFF'}
                        size={30}
                        style={{ marginLeft: '5%' }}
                      />
                    </View>
                  )}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignSelf: 'flex-end',
                      width: '60%',
                      alignItems: 'center',
                      marginTop: 10,
                      marginRight: 15,
                    }}>
                          <TouchableOpacity  onPress={() =>{console.log('option modal') ,setOptionModal(true)}}
                          style={{marginHorizontal:5 }}>
                           < Animatable.View animation="rotate" delay={1000} iterationCount={'infinite'} duration={2000}
              useNativeDriver={true} >
                            <Fontisto name="player-settings" size={26} color="#216ade"/>
                            </Animatable.View>
                          </TouchableOpacity>
                    {wait ? (
                      <View>
                        <ActivityIndicator size={20} color={colors.selected} />
                      </View>
                    ) : (

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
                          ? { backgroundColor: '#000' }
                          : { backgroundColor: normalbg },
                      ]}>
                      <Image
                        style={{ width: 20, height: 20, marginVertical: 3 }}
                        resizeMode={'stretch'}
                        source={require('../../assets/Fxbot/home/up.png')}
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
                          ? { backgroundColor: '#000' }
                          : { backgroundColor: normalbg },
                      ]}>
                      <Image
                        style={{ width: 20, height: 20, marginVertical: 3 }}
                        resizeMode={'stretch'}
                        source={require('../../assets/Fxbot/home/down.png')}
                      />
                     
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
                          ? { backgroundColor: '#000' }
                          : { backgroundColor: normalbg },
                      ]}>
                      <Image
                        style={{ width: 20, height: 20, marginVertical: 3 }}
                        resizeMode={'stretch'}
                        source={require('../../assets/Fxbot/home/updown.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </ImageBackground> */}

            {/* {(pnlSuper==0 && pnlPosition==0) || !positionPanel
           ?
           null
           :
           <Text style={{color:((parseFloat(pnlSuper))+(parseFloat(pnlPosition)))>0?colors.profitcolor:colors.losscolor,fontSize:16,marginLeft:10}}>Total PNL : {((parseFloat(pnlSuper))+(parseFloat(pnlPosition))).toFixed(2)} $</Text>} */}
            <View style={{
              width: 200, height: 40, borderTopRightRadius: 10, borderTopLeftRadius: 10, alignSelf: 'center',flexDirection: 'row',
              backgroundColor: colors.appGray, alignItems:'center', justifyContent: 'space-between', marginTop: 50, marginTop: 10,
              paddingHorizontal:20
            }}>
              <Text style={{ color: colors.selected, fontFamily: global.appFontM, fontSize: 18 }}>TRADES : {totalCount3}</Text>
             {refreshing?
             <ActivityIndicator size={'small'} color="#fff"/>
             :
             <Ionicons name="refresh" size={24} color={colors.selected} onPress={()=>{
                  onRefresh()
              }}/>}
            </View>
           
            <View style={{
              width: '100%', height: 1,
              //  borderTopWidth:1,
              elevation: 3, shadowColor: '#000', backgroundColor: '#fff'
              //  borderColor:colors.appLightgray
            }}></View>
            <View style={{ 
              display:netPNL==''?'none':'flex',
              height: 40,width:200,backgroundColor:netPNL>0?colors.appBlue:colors.losscolor,
              alignItems:'center',justifyContent:'center',paddingHorizontal:5,
                  alignSelf:'flex-end',marginRight:10,
                  borderBottomLeftRadius:10,borderBottomRightRadius:10
          }}>
              <Text style={{ color: colors.selected, fontFamily: global.appFontM,fontSize:14}}>Net PNL : {netPNL}$</Text>
            </View>
            <View
              style={{
                marginVertical: 20,
                paddingVertical: 10,
                // backgroundColor: 'red',
              }}>

              {/* {normalData.length>0 && CopyPanel ?<Text style={{fontSize:16,color:copyTotal>0?colors.appBlue:colors.losscolor,fontSize:16,marginLeft:10}}>Total PNL : {copyTotal.toFixed(2)} $</Text> :null} */}
              {normalData.length > 0 && CopyPanel ?
                <FlatList
                  data={normalData}
                  keyExtractor={(item, index) => index + 'a'}
                  renderItem={({ item, index }) => (
                    // (item.buy_price == undefined) ?
                    //   null :
                      <TouchableOpacity
                        onPress={() => {
                          if (clickedItem == item.position_id) {
                            setClickedItem('-1')
                          }
                          else {

                            setClickedItem(item.position_id)
                          }
                        }}
                        style={{
                          marginTop: '5%',
                          width: '96%',
                          alignSelf: 'center',
                        }}>
                        <ImageBackground source={require('../../assets/Aeon/tradebox.png')}
                          style={{ width: '100%', height: 170 }} resizeMode="stretch"
                        >


                          <View style={{ paddingHorizontal: 10, paddingVertical: 5, marginBottom: 0 }}>


                            <View
                              style={{
                                top:5,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',//backgroundColor:'red'
                              }}>


                              <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
                                <View style={{ flexDirection: 'row', }}>
                                  <Image
                                    source={{ uri: 'http://' + getImg(item.pair) }}
                                    resizeMode={'stretch'}
                                    style={{
                                      width: 25,
                                      height: 25,
                                      marginTop: 0, marginRight: 10,
                                      alignSelf: 'center',
                                    }}
                                  />
                                  <Text style={{ color: colors.selected, fontFamily: global.appFontM, fontSize: 16 }}>{item.pair}, 
                                  <Text style={{ color: item.side == 'BUY' ? colors.profitcolor2 : colors.losscolor, fontSize: 11, }}>{item.side.toUpperCase()} {item.lot_size}</Text></Text>

                                </View>
                              </View>
                              <View style={{ flexDirection: 'column', justifyContent: 'flex-end', marginRight: 5 }}>
                                <Text style={{ color: 'grey', fontSize: 11 }}>{(item.dt)}</Text>
                                {/* .toString().split(' ')[0]} {(item.dt).toString().split(' ')[1].split('.')[0] */}
                                
                              </View>



                            </View>
                            {/* {global.demo=='true'? 
                        <View style={{flexDirection: 'row',justifyContent: 'space-evenly'}}>

                          <Text style={{ color: '#fff' }}>Bot ID : {item.botid}</Text>
                          <Text style={{ color: '#fff' }}>PIPS : {item.side == 'BUY' ? CalculateIt(item.startamt, item.sell_price)
                            :CalculateIt(item.startamt, item.buy_price)}</Text>
                          </View>
                          :null} */}
                          </View>
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 0, height: 90,top:20 }}>
                            <View style={{ width: '50%', paddingLeft: '8%' }}>
                              <Text style={{ color: colors.selected, fontSize: 12, fontFamily: global.appFontM, marginTop: 5 }}>{parseFloat(item.startamt).toFixed(5)}{" -> "} {!(!!item.buy_price)?"-":item.side == 'BUY' ? parseFloat(item.sell_price).toFixed(5) : parseFloat(item.buy_price).toFixed(5)}</Text>
                              {/* <Text style={{ color: 'grey',  fontSize: 12,textAlign: 'right' }}>Master : <Text style={{ color: 'grey', fontWeight: 'normal',fontSize:13 }}>{item.copier_name}</Text></Text> */}
                              <Text style={{ color: '#fff', fontSize: 12, textAlign: 'left', marginTop: 15, fontFamily: global.appFontM }}>POSITION ID : <Text style={{ color: '#fff', fontWeight: 'normal', fontSize: 13 }}>{item.position_id}</Text></Text>
                              <Text style={{ color: '#ffff', fontSize: 12, marginTop: 5, fontFamily: global.appFontM }}>PIPS : {!(!!item.buy_price)?"-":item.side == 'BUY' ? CalculateIt(item.startamt, item.sell_price)
                                : CalculateIt(item.startamt, item.buy_price)}</Text>
                            </View>
                            <Text style={{
                                  color: item.side == 'BUY' ? calculate_pnlBuy(item, 'normal') > 0 ? colors.profitcolor2
                                    : colors.losscolor : calculate_pnlSell(item, 'normal') > 0 ?
                                    colors.profitcolor2 : colors.losscolor,
                                  fontFamily: global.appFontB
                                  , textAlign: 'right', fontSize: 18, marginTop: 5,right:45,top:35
                                }}>
                                  {!(!!item.buy_price)?"-":item.side == 'BUY' ? calculate_pnlBuy(item, 'normal') : calculate_pnlSell(item, 'normal')}</Text>

                            <View style={{ width: '50%', alignSelf: 'flex-end',display:'none' }}>
                              {parseInt(closeNorDoubleClicked.split(',')[1]) == index ? (
                                <View
                                  style={{
                                    width: 100, height: 30, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end', marginRight: 5,
                                    backgroundColor: colors.appSkyblue,
                                    borderRadius: 2,
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
                                  
                                  style={{ width: 120, height: 30, alignSelf: 'flex-end', }}
                                  onPress={() => {
                                    console.log('value of bot id: ' + item.botid);
                                    if (
                                      closeNorClicked.split(',')[0] == 'true' &&
                                      parseInt(closeNorClicked.split(',')[1]) == index) {
                                        closeApi(item.botid, item.pair, item.position_id);
                                      setCloseNorDoubleClicked(closeNorClicked);
                                      ToastAndroid.show(
                                        'Closing Trade...',
                                        ToastAndroid.SHORT,
                                      );
                                    } else {
                                      setCloseNorClicked('true,' + index);
                                    }
                                  }}>

                                  <View
                                    style={[
                                      closeNorClicked.split(',')[0] == 'true' &&
                                        index == parseInt(closeNorClicked.split(',')[1])
                                        ? { backgroundColor: colors.appSkyblue }
                                        : { backgroundColor: colors.appBlue, },
                                      {

                                        width: 100, height: 30, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end', marginRight: 5,
                                        // backgroundColor: '#303a3a',
                                        borderRadius: 5,

                                      },
                                    ]}>
                                    <Text
                                      style={{
                                        color: '#FFFFFF',
                                        fontSize: 10, fontFamily: global.appFontM, textAlign: 'center',
                                        textTransform: 'uppercase',//paddingHorizontal:2
                                        //  fontWeight: 'bold',
                                      }}>
                                      Close Position
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                              )}
                            </View>
                          </View>
                          {/* <AntDesign name={clickedItem==item.position_id?'up':'down'} color={'#fff'} size={14} style={{alignSelf:'flex-end',marginRight:5,marginBottom:5}}/> */}
                          {/* </View> */}
                        </ImageBackground>
                      </TouchableOpacity>
                  )}
                />
                : null
              }

            </View>
            <View style={{ height: 150 }}></View>
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
                  { textAlign: 'center', color: colors.selected },
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
                      navigation.navigate('MessageScreen', { type: 'sys' });
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
                  style={{ position: 'absolute', right: 0, top: -15 }}
                  onPress={() => {
                    setNewsModal(false);
                  }}>
                  <Image
                    source={require('../../assets/close2.png')}
                    style={{ width: 40, height: 40 }}
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
            onPress={() => start()}>
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
                source={{ uri: PoupImg }}
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
                imageStyle={{ borderRadius: 10 }}>
                <TouchableOpacity
                  style={{ position: 'absolute', right: 0, top: -15 }}
                  onPress={() => {
                    setPopup_Visible(false);
                  }}>
                  <Image
                    source={require('../../assets/close2.png')}
                    style={{ width: 40, height: 40 }}
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
            style={{ marginTop: 0 }}
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
                imageStyle={{ borderRadius: 10 }}>
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
                      <Text style={{ color: '#fff' }}>ENTRY PRICE</Text>
                      <Text style={{ color: colors.selected, fontSize: 18 }}>
                        {lastEarned.startprice}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View style={{ alignItems: 'center', marginTop: 10 }}>
                        <Text style={{ color: '#fff' }}>REFERRAL CODE</Text>
                        <Image
                          source={{ uri: lastEarned.refercode }}
                          style={{
                            width: 100,
                            height: 100,
                            borderRadius: 5,
                            marginTop: 15,
                            resizeMode: 'stretch',
                          }}
                        />
                      </View>
                      <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: '#fff' }}>
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
                        <Text style={{ color: '#fff', fontSize: 22 }}>
                          <Text style={{ color: '#00a65a' }}>
                            {lastEarned.profit} USD
                          </Text>
                        </Text>
                        <TouchableOpacity
                          style={{ marginTop: 20, padding: 20 }}
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
                      <Text style={{ color: '#fff' }}>LAST PRICE</Text>
                      <Text style={{ color: colors.binanceylw2, fontSize: 18 }}>
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

                <Animatable.Text
                  animation={'pulse'}
                  iterationCount={'infinite'}

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
                    style={{ alignSelf: 'center' }}>
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
                            { color: colors.selected, fontWeight: 'bold' },
                          ]}>
                          SEND CODE to EMAIL
                        </Text>
                      )}
                      {Count1 ? (
                        <Text
                          style={[
                            styles.text,
                            { color: colors.selected, fontWeight: 'bold' },
                          ]}>
                          RESEND CODE IN:{' '}
                          <Text style={{ fontSize: 16 }}> {seconds}</Text>{' '}
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
                    style={{ display: 'flex', marginTop: 50 }}>
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
                      start={{ x: 0, y: 1 }}
                      end={{ x: 1, y: 1 }}>
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
                <Text style={{ color: '#fff', fontSize: 20 }}>Alert Type :</Text>
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
                  <Text style={{ color: '#fff' }}>/</Text>
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
                  <Text style={{ color: '#fff' }}>/</Text>
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
                      `css_mob/set_alert.aspx?uid=${global.uid
                      }&tp=${alert_type.toUpperCase()}&tp1=${dir}&amount=${Verify}&pair=${alert_pair}&mode=${hedge ? 'hedge' : 'normal'
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
                  style={{ padding: 5 }}>
                  <LinearGradient
                    colors={['black', 'black']}
                    style={{
                      borderRadius: 10,
                      paddingHorizontal: 25,
                      paddingVertical: 10,
                      alignSelf: 'center',
                      alignItems: 'center',
                    }}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}>
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
                  style={{ position: 'absolute', right: 0, top: -15 }}
                  onPress={() => {
                    setTrialVisible(false);
                  }}>
                  <Image
                    source={require('../../assets/close2.png')}
                    style={{ width: 40, height: 40 }}
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


          <RBSheet
            ref={refRBSheet1}
            // closeOnDragDown={true}
            closeOnPressMask={true}
            height={350}
            style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
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
                <View style={{ paddingVertical: 5, width: '100%' }}>
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
                <View style={{ marginHorizontal: 10 }}>
                  <Text style={{ color: '#717783', fontSize: 14 }}>Amount</Text>
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
                      <Text style={{ color: colors.selected }}>Add</Text>
                      <AntDesign name="caretdown" size={12} color={'#fff'} />
                      <View style={{ width: 2, borderRightWidth: 0.5 }}></View>
                    </TouchableOpacity>
                    <View style={{ width: '50%' }}>
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
                        contentContainerStyle={{ width: '100%' }}
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
                            Bal
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
                    <Text style={{ color: '#717783', fontSize: 13 }}>
                      Currently Assigned Margin
                    </Text>
                    <Text style={{ color: colors.selected, fontSize: 13 }}>
                      {(
                        parseFloat(vItem.usdt) / parseFloat(vItem.leverage)
                      ).toFixed(2)}{' '}
                      USD
                    </Text>
                  </View>
                  <View style={styles.view}>
                    <Text style={{ color: '#717783', fontSize: 13 }}>
                      Max Addable
                    </Text>
                    <Text style={{ color: colors.selected, fontSize: 13 }}>
                      {vItem.mode == 'live' ? Bal : global.demobal} USD
                    </Text>
                  </View>
                  <View style={styles.view}>
                    <Text style={{ color: '#717783', fontSize: 13 }}>
                      Est.Liq.Price after increase
                    </Text>

                    <Text style={{ color: colors.selected, fontSize: 13 }}>
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
                      <Text style={[styles.dark_heading, { color: colors.c3 }]}>
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
        </View>
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

export default HomeScreenFirebase;

const styles1 = StyleSheet.create({
  iconOuter: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1D212D',
    elevation: 3,
    borderRadius: 50
  },
  iconOuter2: {
    // marginBottom:10
  },
  icons: {
    width: 50,
    height: 50,
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
    color: '#fff',
    fontFamily: global.appFontB,
    fontSize: 11,
    alignSelf: 'center',
    marginTop: 5
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
  supertext: {
    color: '#fff'
  },
  superBox: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginVertical: 5,
  },
});



