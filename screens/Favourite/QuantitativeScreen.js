/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable css_mob/jsx-no-duplicate-props */
/* eslint-disable css_mob/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import { ThemeProvider, useFocusEffect, useIsFocused, useTheme, useLinkTo, useNavigation } from '@react-navigation/native';
import { View, Text, Pressable, Dimensions, TouchableOpacity, ToastAndroid, StyleSheet, RefreshControl, Image, StatusBar, FlatListProps, ListRenderItemInfo, FlatList, TextInputComponent, TextInput, Alert, ActivityIndicator, BackgroundImage, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import database from '@react-native-firebase/database';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from "react-native-raw-bottom-sheet";
import AsyncStorage from '@react-native-async-storage/async-storage';
import global from '../../component/global'
import { jsonContext } from '../../context/GlobalState';
import axios from 'axios';
import Modal from 'react-native-modal';
// import Rates from '../component/Rates'
import styles from '../../component/styles'
import KlineChart2 from '../../component/KlineChart2'
import WebChart from '../../component/WebChart'
import { indexOf } from 'lodash';

import { color } from 'react-native-reanimated';

import { ExternalStorageDirectoryPath } from 'react-native-fs';
import { ScrollView } from 'react-native-gesture-handler';
var DeviceInfo = require('react-native-device-info');

// import * as firebase from 'firebase';
var arr = [];
var Coins = '';
var symbol = '';

var newjson = ''
const QuantitativeScreen = ({ route }) => {
  const linkTo = useLinkTo();
  // const my_name=route.params?.name;
  const { myjson, setCallStore, setMyjson, hedge } = React.useContext(jsonContext);
  const my_name = route.params?.name;
  const [intvl, setIntvl] = React.useState(false)
  const { colors } = useTheme();
  const theme = useTheme();
  const navigation = useNavigation();
  // const {theme}=useTheme();
  const isFocused = useIsFocused();
  const [MenuVisible, setMenuVisible] = React.useState(false);
  const [ShowData, setShowData] = React.useState('all');
  ////////////////////////////////////////////////////////////////
  const [btn_disable, setBtn_disable] = React.useState(true);
  const [showChart, setShowChart] = React.useState(true)
  const [canShowChart, setCanShowChart] = React.useState(false)
  const [chartIndex, setChartIndex] = React.useState(-1)
  const [OpenPanel, setOpenPanel] = React.useState(false);
  const [FavFilter, setFavFilter] = React.useState(false);
  const [sVal, setSVal] = React.useState([]);
  const [fVal, setFVal] = React.useState([]);
  const [chart, setChart] = React.useState('')
  const [tradeIndex, setTradeIndex] = React.useState(null)
  const [signalVis, setSignalVis] = React.useState(false);
  const [signalInterval, setSignalInterval] = React.useState('15');
  const [ld2, setLd2] = React.useState(-1);
  const [symSignal, setSymSignal] = React.useState('')
  const [symbolTrade, setSymbolTrade] = React.useState('')
  const [variation, setVariation] = React.useState('')
  const [disableConfirm, setDisableConfirm] = React.useState(false)
  const [fbuy, setFBuy] = React.useState('')
  const [QTY1, setQTY1] = React.useState('0')
  const [modalSetting, setModalSetting] = React.useState(false);
  const [modalPopup, setModalPopup] = React.useState(false);
  const [superBotAmt, setSuperBotAmt] = React.useState('2');
  const [mplier, setMplier] = React.useState('4');
  const [tp, setTp] = React.useState('0.5');
  const [diffVal, setDiffVal] = React.useState('0.5');
  const [calSuperBot, setCalSuperBot] = React.useState(0);
  ///////////////////////////////////////////////////////////////
  const [startVals, setStartVals] = React.useState(null)
  const [modalTpSl, setModalTpSl] = React.useState(false)

  const [tpVal, setTpVal] = React.useState('')
  const [lotVal, setLotVal] = React.useState('0.01')
  const [slVal, setSlVal] = React.useState('')

  const [API_KEY, setAPI_KEY] = React.useState(false)
  const [Uid, setUid] = React.useState('')
  const [Token, setToken] = React.useState(null)
  const [fav, setFav] = React.useState([])
  const [signalData, setSignalData] = React.useState(null);
  const [signalData2, setSignalData2] = React.useState(null);
  const [showSignalData, setShowSignalData] = React.useState(false);
  const [My_Focus, setMy_Focus] = React.useState(false);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [Search, setSearch] = React.useState(false);
  const [No_Search, setNo_Search] = React.useState(false);
  const [NewAvg, setNewAvg] = React.useState('0');
  const [Config, setConfig] = React.useState('');
  const [Loading, setLoading] = React.useState(true)
  const [ld, setLd] = React.useState(-1)
  const [ShowAutoTrade, setShowAutoTrade] = React.useState(true)
  const [refreshing, setRefreshing] = React.useState(false);
  const [orderT, setOrderT] = React.useState('')
  const [selectedPair, setSelectedPair] = React.useState('')
  const [my_Pwd, setMy_Pwd] = React.useState(null);
  const [Data, setData] = React.useState(null);
  const [usedData, setUsedData] = React.useState(null);
  const [NData, setNData] = React.useState('');
  let outOfPage = false
  const [itemSelected, setItemSelected] = React.useState(null);

  const [Inp_txt, setInp_txt] = React.useState('');
  React.useEffect(() => {
    outOfPage = false
    // console.log('its data see it: '+myjson);
    setData(JSON.parse(myjson))
    setLoading(false)
  }, [myjson])
  React.useEffect(() => {
    if (Data != null && ShowData !== 'all') {
      // console.log('data os: '+JSON.stringify(Data));
      setUsedData(Data.filter(e => e.vol == ShowData))
      setLoading(false)
      return
    }
    if (Data != null) {
      setUsedData(Data)
    }

    //getfirebasedb()
  }, [Data, ShowData])






  useFocusEffect(
    React.useCallback(() => {
      if (outOfPage) {
        return
      }
      console.log("this is the global value : " + global.val)
      if (global.val != '') {
        setInp_txt(global.val);
        setMy_Focus(true)
      }
      // setLoading(true)                
      var interval = '';
      // setTimeout(async () => {                      
      //    interval = setInterval(() => {
      //     callApi(Coins)
      //   }, 2000);
      // }, 3000,[]);   
      return () => outOfPage = true;
      // return  () => {console.log('cleared already1'),setInp_txt(''),setSearch(false),global.val=''};
    }, [])
  );

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  React.useEffect(() => {
    console.log(hedge, "hie this is the hedge")
    if (hedge) {
      setShowAutoTrade(false)
    } else {
      setShowAutoTrade(true)
    }
  }, [hedge])



  useFocusEffect(
    React.useCallback(() => {
      if (outOfPage) {
        return
      }

      setTimeout(async () => {

        let api_key;
        let secret_key;
        let uid;
        console.log('focus')
        try {
          uid = await AsyncStorage.getItem('user_id')
          const my_pwd = await AsyncStorage.getItem('myPwd')
          const token = await AsyncStorage.getItem('token')
          global.token = token
          setMy_Pwd(my_pwd)
          setToken(token)
          arr = [];
          setNData('');
          setUid(uid)
          StoreApi(uid)
          api_key = await AsyncStorage.getItem('api_key');
          secret_key = await AsyncStorage.getItem('secret_key');
          console.log(api_key)
          console.log(secret_key)
          if (api_key != '' && api_key != null && secret_key != '' && secret_key != null
            //  && 
            // (global.binBal==='' ||global.binBal===undefined || global.binBal===null)
          ) {
            // setAPI_KEY(true)           
            // fetch(global.BASE_URL+'css_mob/get_bin_bal.aspx?asset=USDT&api_key='+global.api_key+'&api_secret='+global.api_secret+'&uid='+uid )
            // .then(item=>item.json())
            // .then(dta=>{
            //   setBal(dta.balance)
            // }) 

          } else {
            // setBal(global.binBal)
            // if(api_key!='' && api_key!=null && secret_key!='' && secret_key!=null  ){   
            //   setAPI_KEY(true)  
            // }else{
            //   setAPI_KEY(false)
            // }  
          }
        }
        catch (e) {
          console.log(e);
        }
      }, 1000);
      return () => outOfPage = true;
    }, [])
  );


  const getTrade = (uid, side, sym, avg, variation, firstbuyamt, item) => {
    setItemSelected(item)
    setOrderT(side)
    setSymbolTrade(sym)
    setVariation(variation)
    setFBuy(firstbuyamt)
    console.log(new Date().toLocaleTimeString(), '  , ', new Date().getMilliseconds())
    let sd = side
    let url1

    if (hedge) {
      url1 = global.BASE_URL + 'css_mob/hedge/tradeconfig_final.aspx?pair=' + sym + '&uid=' + global.uid + '&side=' + (sd == 'BOTH' ? 'BUY' : sd) + '&token=' +
        global.token + '&device=' + DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel();
    } else {
      url1 = global.BASE_URL + 'css_mob/tradeconfig_final.aspx?pair=' + sym + '&uid=' + global.uid + '&token=' + global.token + '&device=' +
        DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel();
    }
    console.log('calling this' + url1)
    fetch(url1)
      .then(item => item.json())
      .then(dta => {
        // console.log(dta)        
        if (dta.status === undefined) {
        }
        else {
          if (dta.status == true) {
            setNewAvg(avg);
          }
          setConfig(dta)
          Config.status = dta.started
          console.log(Config.status)
          if (Config.status != true) {
            avg = 0;
          }

          if (dta.status) {

            // setType(dta.type)

          }

        }



      })


  }

  function getDifferenceInMinutes(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60);
  }
  const StoreApi = (uid) => {

    try {
      console.log('hellodiff_store', global.prevtime2)
      let newDate = new Date()
      let diff = getDifferenceInMinutes(global.prevtime2, newDate)
      console.log('hellodiff_store', diff)

      if (diff < 5) {
        console.log('noneed to recall_storeapi_a', diff)
        setRefreshing(false)
        setLoading(false)
        return;
      }


    }
    catch (e) {

    }


    global.prevtime2 = new Date()
    console.log(new Date().toLocaleString());

    callApi(null)
    // let url1=global.BASE_URL+'css_mob/store.aspx?uid='+uid
    // console.log(url1)
    // fetch(url1)
    // .then(item=> item.json())
    // .then(dta=>{    
    //   Coins=dta;
    //   console.log(new Date().toLocaleString());

    //   // setIntvl(true)
    // })
  }
  useFocusEffect(
    React.useCallback(() => {
      let newDate = new Date()
      let diff = getDifferenceInMinutes(global.prevtime_market, newDate)
      console.log('hellodiff_market', diff)

      if (diff > 5) {
        callApi(Coins)
      }
      // const interval = setInterval(() => {
      //   console.log('=====================================interval1')
      // }, 3000);
      // return () => {
      //   clearInterval(interval),console.log('--------------------------------cleared inteval')
      // }
    }, [])
  );


  const callApi = (Coins) => {


    var finaljson = "";
    //let dta=global.BNB;   
    var s1 = '';
    // setData(JSON.parse(myjson))
    setLoading(false)
    setRefreshing(false)



  }




  const onRefresh = React.useCallback(async () => {
    setData(JSON.parse(myjson))
    setRefreshing(true);
    StoreApi(Uid)
  })

  function SendToInner(sym, img, st, type, strtamt, qty, qty1, inc, bst, avg, usdt, bst1, high, low, prev, ask, bid, order_type, iscopy, myusdt, buy, sell, isopen) {
    navigation.navigate('TradeReview', {
      sym: sym, img: img, status: st, type: type, strtamt: strtamt, qty: qty, qty1: qty1, inc: inc,
      bst: bst, avg: avg, usdt: usdt, bst1: bst1, high: high,

      low: low, prev: prev, ask: ask, bid: bid, iscopy: iscopy, myusdt: myusdt, buy: buy, sell: sell, isopen: isopen, ordertype: order_type

    });
  }




  const handleSearch = (text) => {

    setInp_txt(text);
    setSearch(true);
    const formattedQuery = text.toLowerCase();
    // console.log(formattedQuery)
    Data.map(todo_inside => {
      let nme = todo_inside.sym.toLowerCase()
      if (nme.includes(formattedQuery)) {
        console.log(nme, formattedQuery, "hello")
        arr.push(todo_inside)
      }

    }
    )

    if (text != '' && arr.length == 0) {
      setNo_Search(true)
    } else {
      setNo_Search(false)
    }
    setNData(arr)
  }
  const Push_btn = (pair) => {
    console.log("symbol here", pair)
    let url = global.BASE_URL + 'css_mob/stoptrade.aspx?pair=' + pair + '&uid=' + global.uid + "&api_key=" + global.api_key
      + "&api_secret=" + global.api_secret + '&token=' + global.token + '&device=' + DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel();
    console.log(url)
    fetch(url)
      .then(item => item.json())
      .then(dta => {
        // console.log("here" + dta)
        ToastAndroid.show(dta.message + " for " + pair, ToastAndroid.SHORT)
        StoreApi(Uid)
        toggleModal()

      })
  }

  const touch_handle = (item) => {
    console.log('see touch_handle ', item);
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
        item.order_type,
        item.iscopy,
        item.myusdt,
        item.buy,
        item.sell,
        item.isopen
      );
    }
  }

  const StartTrade = (orderside, sym, index, start, fba, shouldWait) => {
    setModalSetting(false)
    setModalTpSl(false)
    if (index == null) {

    }
    else {
      let callback = sVal[index]
      let foa = fVal[index]
      if (callback == undefined) {
        callback = start
      }
      if (foa == undefined) {
        foa = fba
      }
      setTradeIndex(index)
    }

    global.closesocket = 0
    var minutesToAdd = 20;
    var currentDate = new Date();
    var futureDate = new Date(currentDate.getTime() - minutesToAdd * 60000);
    global.prevtime1 = futureDate
    // global.prevtime = futureDate
    global.prevtime2 = futureDate

    const key_string = objToQueryString({
      key: Uid + global.PWD + global.txnPassword
    });
    const ePass = objToQueryString({
      epass: global.txnPassword
    });

    function objToQueryString(obj) {
      const keyValuePairs = [];
      for (const key in obj) {
        keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
      }
      return keyValuePairs.join('&');
    }

    let url;
    // if (hedge) {

    url = global.BASE_URL + 'css_mob/hedge/starttrade_final_hedge.aspx?uid=' + global.uid + '&pair=' + sym + '&pwd=' + global.PWD +
      "&side=" + orderside + '&mode=&callback=' + '&foa=' + '&' + key_string + '&' + ePass + '&token=' + global.token
      + '&lot_size=' + lotVal + '&tp=' + tpVal + '&sl=' + slVal +
      '&device=' + DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel();
    console.log("start trade: " + url)
    fetch(url)
      .then(item => item.json())
      .then(dta => {
        console.log(
          'resp of starttrade: ' + dta
        );
        if (dta.success === 'false' && dta.msg === 'wrong_pwd') {
          signOut()
          ToastAndroid.show("Please Login once again", ToastAndroid.SHORT)
        }
        // console.log('data fdfd '+dta)
      }).catch(e => {
        console.log(e, " @@@@@@@@@@@@@@@@@@@@@@")
      })
    setTimeout(() => {
      setDisableConfirm(false)
    }, 1000);

    if (orderside == 'BUY') {

      ToastAndroid.show("Booking Long position for " + sym, ToastAndroid.SHORT)

    }
    else {
      ToastAndroid.show("Booking Short position for " + sym, ToastAndroid.SHORT)

    }
    if (shouldWait == 'wait') {

    }
    else {
      global.status = 'true'
      global.Coins = '';
      setCallStore(true)
      setTimeout(() => {

        navigation.navigate('Home')
      }, 1000)
      if (global.symname == "") {
        global.symname = sym
      }
      else {
        global.symname = global.symname + "," + sym
      }

    }

  }
  const startTradeApi = (orderside, sym) => {


    global.closesocket = 0
    var minutesToAdd = 20;
    var currentDate = new Date();
    var futureDate = new Date(currentDate.getTime() - minutesToAdd * 60000);
    global.prevtime1 = futureDate
    // global.prevtime = futureDate
    global.prevtime2 = futureDate

    const key_string = objToQueryString({
      key: Uid + global.PWD + global.txnPassword
    });
    const ePass = objToQueryString({
      epass: global.txnPassword
    });

    function objToQueryString(obj) {
      const keyValuePairs = [];
      for (const key in obj) {
        keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
      }
      return keyValuePairs.join('&');
    }
    let url;

    url = global.BASE_URL + 'css_mob/superbot/starttrade_final.aspx?uid=' + global.uid + '&pair='
      + sym + '&pwd=' + global.PWD + "&side=" + orderside + '&mode=' + global.AccMode + '&amount=' + superBotAmt + '&type=bollinger'
      + '&' + key_string + '&' + ePass + '&token=' + global.token
      + '&device=' + DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel() + '&tp=' + tp + '&diff=' + diffVal + '&multiply=' + mplier;

    setModalPopup(false)
    setTimeout(() => {
      setDisableConfirm(false)
    }, 1000);
    console.log("start trade: " + url)
    global.status = 'true'
    global.Coins = '';
    setCallStore(true)
    linkTo('/Home')
    if (orderside == 'BUY') {

      ToastAndroid.show("Booking Long position for " + sym, ToastAndroid.SHORT)

    }
    else if (orderside == 'SELL') {

      ToastAndroid.show("Booking Short position for " + sym, ToastAndroid.SHORT)

    }
    else {
      ToastAndroid.show("Booking Auto position for " + sym, ToastAndroid.SHORT)

    }
    if (global.symname == "") {
      global.symname = sym
    }
    else {
      global.symname = global.symname + "," + sym
    }
    fetch(url)
      .then(item => item.json())
      .then(dta => {
        if (dta.success === 'false' && dta.msg === 'wrong_pwd') {
          signOut()
          ToastAndroid.show("Please Login once again", ToastAndroid.SHORT)
        }
        console.log('data fdfd ' + dta)
      }).catch(e => {
        console.log(e, " @@@@@@@@@@@@@@@@@@@@@@")
      })
  }


  const handleChange = (name, value) => {
    setSVal(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleFOA = (name, value) => {
    setFVal(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  function uploadFav(sym, isfav, index) {
    let my_fav = isfav === 'true' ? 'false' : 'true'
    let url = global.BASE_URL + `css_mob/save_fav.aspx?uid=${global.uid}&pair=${sym}&isfav=${my_fav}`
    console.log(url)
    fetch(url)
      .then(item => item.json())
      .then(data => {
        console.log(data)
      })

    // let flag=false ;
    // fav.map(item=>{
    //   if(item.pair===sym){      
    //     flag=true
    //   }
    // })
    //   if(flag){
    //     setFav(fav.filter(e=>e.pair!==sym))
    //     let url=global
    //   }else{
    //     setFav(e=>[...e, {'pair':sym}])
    //   }    

    Data[index]['isfav'] = my_fav;
    let myjs = JSON.stringify(Data)
    setMyjson(myjs)
  }
  const colorCheck = React.useCallback((sym) => {
    let color = '#a2a2a2';
    Data.map(item => {
      if (sym === item.sym) {
        if (item.isfav === 'true') {
          color = colors.hgl
        }
      }
    })
    return color
  }, [fav])

  // const SignalInfo=(item)=>{
  //   let url=global.BASE_URL+'css_mob/signals_data.aspx?pair='+item.sym+'&interval=15'
  //   console.log(url)
  //   fetch(url)
  //   .then(item=>item.json())
  //   .then(dta=>{   
  //     setLd(-1)
  //     console.log(dta) 
  //       setSignalData(dta.data)    
  //       setShowSignalData(true)      
  //   })
  // }

  const SignalInfo = (item, interval) => {
    console.log('signal info: ' + JSON.stringify(item))
    let url
    let url2
    if (interval !== undefined && interval !== null) {

      url = global.BASE_URL + 'css_mob/signals_data.aspx?pair=' + item + '&interval=' + interval
      url2 = global.BASE_URL + 'css_mob/get_indicators.aspx?pair=' + item + '&interval=' + interval
    }
    else {

      url = global.BASE_URL + 'css_mob/signals_data.aspx?pair=' + item + '&interval=15'
      url2 = global.BASE_URL + 'css_mob/get_indicators.aspx?pair=' + item + '&interval=15'
    }

    console.log(url2)
    fetch(url2)
      .then(item => item.json())
      .then(dta => {
        console.log(dta)
        setSignalData2(dta)
        // setLd2(-1)   
        // setSignalVis(true)   
      })
    console.log(url)
    fetch(url)
      .then(item => item.json())
      .then(dta => {
        console.log(dta)
        setSignalData(dta)
        setLd2(-1)
        setSignalVis(true)
      })
  }

  React.useEffect(() => {
    if (superBotAmt !== '') {

      calculatedSuperbot()
    }
    else {
      setCalSuperBot(0)
    }
  }, [superBotAmt])

  function calculatedSuperbot() {
    let result = 0
    let newVal = parseInt(superBotAmt)
    //3  newval=6 
    for (let i = 0; i < 9; i++) {
      result += newVal
      newVal *= 2
    }
    setCalSuperBot(result)
  }

  return (
    Loading ?
      <View style={{ flexDirection: 'column', justifyContent: 'center', height: '100%', backgroundColor: colors.background }} ><LottieView source={require('../../assets/loading.json')} style={{ width: 300, height: 200, alignSelf: 'center' }} autoPlay loop /></View>
      :

      <View style={[styles.container, { paddingTop: 0 }]}>

        <Animatable.View
          animation="fadeIn"
          style={styles.footer}>

          <View style={{
            flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingLeft: 5,
            paddingTop: 0, alignItems: 'center', marginBottom: 10
          }}>

            <Modal
              onBackButtonPress={() => { setSignalVis(false), setLd(-1) }}
              statusBarTranslucent={true}
              deviceHeight={1000}
              onBackdropPress={() => { setSignalVis(false), setLd(-1) }}
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
                  // backgroundColor: global.appColor2,            
                  alignSelf: 'center',
                  marginTop: 60,
                  // borderRadius: 10,
                  borderBottomWidth: 0,
                  paddingVertical: 20,
                  alignItems: 'center',
                  zIndex: 9999,
                }}
                imageStyle={{ borderRadius: 20 }}
              >
                <View style={{
                  flexDirection: 'row', justifyContent: 'space-around', width: '80%',
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
                  <TouchableOpacity onPress={() => { setSignalVis(false), setLd(-1) }}
                    style={{
                      backgroundColor: '#6e0919', paddingHorizontal: 60,
                      paddingVertical: 10, borderRadius: 5
                    }}>
                    <Text style={{ color: colors.selected, fontFamily:global.appFontB }}>CLOSE</Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>

            </Modal>
            <Modal
              onBackButtonPress={() => { setModalTpSl(false) }}
              statusBarTranslucent={true}
              deviceHeight={1000}
              onBackdropPress={() => { setModalTpSl(false) }}
              isVisible={modalTpSl}
              useNativeDriver={true}
              transparent={true}
              backdropOpacity={0.5}>
              <ImageBackground
                resizeMode={'stretch'}
                source={require('../../assets/signalbg.png')}
                style={{
                  width: Dimensions.get('screen').width, height: Dimensions.get('screen').height * 0.6,
                  flexDirection: 'column',
                  // backgroundColor: global.appColor2,            
                  alignSelf: 'center',
                  marginTop: 60,
                  // borderRadius: 10,
                  borderBottomWidth: 0,
                  paddingVertical: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 9999,
                }}
                imageStyle={{ borderRadius: 20 }}
              >
                <Text style={{ marginVertical: 10, textAlign: 'left', alignSelf: 'flex-start', marginLeft: '20%', color: '#fff' }}>Enter Lot Size (*mandatory)</Text>
                <TextInput
                  value={lotVal}
                  onChangeText={(val) => { setLotVal(val) }}
                  placeholder="Enter Lot size"
                  style={[styles.textInput, {
                    fontWeight: 'normal', backgroundColor: 'white'
                    , borderRadius: 10
                    , width: '60%'
                  }]}
                  placeholderTextColor={'grey'}
                  placeholderStyle={{ fontWeight: 'normal' }}
                  selectionColor={colors.binanceylw2}
                  color={'#000000'}
                  keyboardType="numeric"
                />
                <Text style={{ marginVertical: 10, textAlign: 'left', alignSelf: 'flex-start', marginLeft: '20%', color: '#fff' }}>Enter TP (Price) (optional)</Text>
                <TextInput
                  value={tpVal}
                  onChangeText={(val) => { setTpVal(val) }}
                  placeholder="Enter TP"
                  style={[styles.textInput, {
                    fontWeight: 'normal', backgroundColor: 'white'
                    , borderRadius: 10
                    , width: '60%'
                  }]}
                  placeholderTextColor={'grey'}
                  placeholderStyle={{ fontWeight: 'normal' }}
                  selectionColor={colors.binanceylw2}
                  color={'#000000'}
                  keyboardType="numeric"
                />

                <Text style={{ marginVertical: 10, textAlign: 'left', alignSelf: 'flex-start', marginLeft: '20%', color: '#fff' }}>Enter SL (Price) (optional)</Text>
                <TextInput
                  value={slVal}
                  onChangeText={(val) => { setSlVal(val) }}
                  placeholder="Enter SL"
                  style={[styles.textInput, {
                    fontWeight: 'normal', backgroundColor: 'white'
                    , borderRadius: 10
                    , width: '60%'
                  }]}
                  placeholderTextColor={'grey'}
                  placeholderStyle={{ fontWeight: 'normal' }}
                  selectionColor={colors.binanceylw2}
                  color={'#000000'}
                  keyboardType="numeric"
                />

                <TouchableOpacity onPress={() => {
                  if (isNaN(parseFloat(lotVal))) {

                    ToastAndroid.show("Please Enter valid lot Size..", ToastAndroid.SHORT)
                    return
                  }
                  if (parseFloat(lotVal) < 0.01) {
                    ToastAndroid.show("Please Enter valid lot Size..", ToastAndroid.SHORT)
                    return
                  }
                  if (startVals.side == 'BUY') {
                    StartTrade('BUY', startVals.item.sym, null, startVals.item.start_bot_variation, startVals.item.first_buy_in_amount)
                    //  setStartVals({side:'BUY', item:item})

                  }
                  if (startVals.side == 'SELL') {
                    StartTrade('SELL', startVals.item.sym, null, startVals.item.start_bot_variation, startVals.item.first_buy_in_amount)
                    //  setStartVals({side:'BUY', item:item})

                  }
                  if (startVals.side == 'BOTH') {
                    StartTrade('BUY', startVals.item.sym, null, startVals.item.start_bot_variation, startVals.item.first_buy_in_amount)
                    StartTrade('SELL', startVals.item.sym, null, startVals.item.start_bot_variation, startVals.item.first_buy_in_amount)
                    //  setStartVals({side:'BUY', item:item})

                  }
                }} style={{ backgroundColor: colors.binanceylw2, marginTop: 20, borderRadius: 5 }}>
                  <Text style={{ color: '#fff', fontSize: 16, padding: 5, paddingHorizontal: 8 }}>Place Order</Text>
                </TouchableOpacity>
              </ImageBackground>

            </Modal>
            <Modal
              onBackButtonPress={() => setModalSetting(false)}
              statusBarTranslucent={true}
              deviceHeight={1000}
              onBackdropPress={() => setModalSetting(false)}
              isVisible={modalSetting}
              useNativeDriver={true}
              transparent={true}
              backdropOpacity={0.5}>
              <ImageBackground
                resizeMode={'stretch'}
                source={require('../../assets/signalbg.png')}
                style={{
                  width: Dimensions.get('screen').width, height: 450,
                  flexDirection: 'column',
                  // backgroundColor: global.appColor2,            
                  alignSelf: 'center',
                  marginTop: 60,
                  // borderRadius: 10,
                  borderBottomWidth: 0,
                  paddingVertical: 20,
                  alignItems: 'center',
                  zIndex: 9999,
                }}
                imageStyle={{ borderRadius: 20 }}
              >

                {Config !== '' ? <View style={{
                  width: '90%', alignSelf: 'center', borderRadius: 5, backgroundColor: 'transparent', borderWidth: 0, borderColor: 'white',
                  flexDirection: 'column', justifyContent: 'space-evenly', paddingVertical: 5, paddingHorizontal: 15
                }}>



                  <Text allowFontScaling={false} style={{ color: colors.border, fontSize: 15, textAlign: 'center', fontSize: 20, marginVertical: 10 }}>
                    Settings For {orderT}
                  </Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.5, borderColor: '#90909090', paddingBottom: 5 }}>
                    <View style={{
                      flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',
                      width: 150, paddingTop: 5, borderRightWidth: 0.5, borderColor: '#90909090'
                    }}>
                      <Image
                        source={require('../../assets/iconf/icon2.png')}
                        resizeMode={'stretch'}
                        style={{ width: 16, height: 16, marginRight: 10 }}
                      />
                      <Text allowFontScaling={false} style={{ color: colors.vbg, fontSize: 12, width: 80 }}>
                        Lot Size
                      </Text>
                      <Text allowFontScaling={false} style={{ color: colors.profitcolor, fontSize: 14, marginLeft: 10 }}>
                        {Config.first_buy_in_amount}
                      </Text>

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: 150, alignItems: 'center', paddingTop: 5, paddingLeft: 5 }}>
                      <Image
                        source={require('../../assets/iconf/icon3.png')}
                        resizeMode={'stretch'}
                        style={{ width: 16, height: 16, marginRight: 10 }}
                      />
                      <Text allowFontScaling={false} style={{ color: colors.vbg, fontSize: 12, width: 80 }}>
                        Margin Call Limit
                      </Text>
                      <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 14, marginLeft: 10 }}>
                        {Config.margin_callback_limit}
                      </Text>

                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.5, borderColor: '#90909090', paddingBottom: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: 150, paddingTop: 5, borderRightWidth: 0.5, borderColor: '#90909090' }}>
                      <Image
                        source={require('../../assets/iconf/icon4.png')}
                        resizeMode={'stretch'}
                        style={{ width: 16, height: 16, marginRight: 10 }}
                      />
                      <Text allowFontScaling={false} style={{ color: colors.vbg, fontSize: 12, width: 80 }}>
                        Take profit ratio
                      </Text>
                      <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 14, marginLeft: 10 }}>
                        {parseFloat(Config.whole_position_take_profit).toFixed(2)}
                      </Text>

                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: 150, paddingTop: 5, paddingLeft: 5 }}>
                      <Image
                        source={require('../../assets/iconf/icon1.png')}
                        resizeMode={'stretch'}
                        style={{ width: 16, height: 16, marginRight: 10 }}
                      />
                      <Text allowFontScaling={false} style={{ color: colors.vbg, fontSize: 12, width: 80 }}>
                        Earning callback
                      </Text>
                      <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 14, marginLeft: 10 }}>
                        {Config.whole_position_take_profit_callback}
                      </Text>

                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: 150, paddingTop: 5, borderRightWidth: 0.5, borderColor: '#90909090' }}>
                      <Image
                        source={require('../../assets/iconf/icon6.png')}
                        resizeMode={'stretch'}
                        style={{ width: 16, height: 16, marginRight: 10 }}
                      />
                      <Text allowFontScaling={false} style={{ color: colors.vbg, fontSize: 12, width: 80 }}>
                        Margin Call Drop
                      </Text>
                      <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 14, marginLeft: 10 }}>

                        {
                          (parseFloat(QTY1) >= 0) ? (
                            (Config.margin_call_drop != null) ? Config.margin_call_drop.split(',')[QTY1 >= 1 ? QTY1 - 1 : 0] : 0) : 0

                        }
                      </Text>

                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: 150, paddingTop: 5, paddingLeft: 5 }}>
                      <Image
                        source={require('../../assets/iconf/icon5.png')}
                        resizeMode={'stretch'}
                        style={{ width: 16, height: 16, marginRight: 10 }}
                      />
                      <Text allowFontScaling={false} style={{ color: colors.vbg, fontSize: 12, width: 80 }}>
                        Buy In Callback
                      </Text>
                      <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 14, marginLeft: 10 }}>
                        {Config.buy_in_callback}
                      </Text>

                    </View>
                  </View>



                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: 150, paddingTop: 5, borderRightWidth: 0.5, borderColor: '#90909090' }}>
                      <Image
                        source={require('../../assets/iconf/icon6.png')}
                        resizeMode={'stretch'}
                        style={{ width: 16, height: 16, marginRight: 10 }}
                      />
                      <Text allowFontScaling={false} style={{ color: colors.vbg, fontSize: 12, width: 80 }}>
                        Trade Start Callback
                      </Text>
                      <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 14, marginLeft: 10 }}>

                        {
                          Config.start_bot_variation
                        }
                      </Text>

                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: 150, paddingTop: 5, paddingLeft: 5 }}>
                      <Image
                        source={require('../../assets/iconf/icon5.png')}
                        resizeMode={'stretch'}
                        style={{ width: 16, height: 16, marginRight: 10 }}
                      />
                      <Text allowFontScaling={false} style={{ color: colors.vbg, fontSize: 12, width: 80 }}>
                        Stop Loss
                      </Text>
                      <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 14, marginLeft: 10 }}>
                        {Config.stop_loss_per} PIP
                      </Text>

                    </View>

                  </View>





                  <TouchableOpacity disabled={disableConfirm}
                    onPress={() => {
                      setDisableConfirm(true)
                      if (orderT.toLowerCase() == 'both') {
                        StartTrade('BUY', symbolTrade, null, variation, fbuy, 'wait')
                        StartTrade('SELL', symbolTrade, null, variation, fbuy)
                        return
                      }
                      StartTrade(orderT, symbolTrade, null, variation, fbuy)
                    }} style={{
                      backgroundColor: colors.binanceylw2, paddingVertical: 5,
                      marginVertical: 5, borderRadius: 5, width: 200,
                      alignSelf: 'center', marginTop: 30,
                    }}>
                    <Text style={{ color: '#000', fontSize: 16, textAlign: 'center', textAlignVertical: 'center' }} >
                      Confirm
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={{ padding: 5, alignSelf: 'flex-end', marginRight: 5, marginTop: 10, flexDirection: 'row', }} onPress={() => { setModalSetting(false), touch_handle(itemSelected) }}>
                    <FontAwesome name='edit' size={25} color='#fff' />
                    <Text style={{ color: colors.selected, fontSize: 16, textAlign: 'right' }}> Edit Settings</Text>
                  </TouchableOpacity>
                </View> : null}
              </ImageBackground>

            </Modal>
            <Modal
              onBackButtonPress={() => setModalPopup(false)}
              statusBarTranslucent={true}
              deviceHeight={1000}
              onBackdropPress={() => setModalPopup(false)}
              isVisible={modalPopup}
              useNativeDriver={true}
              transparent={true}
              backdropOpacity={0.5}>
              <ImageBackground
                resizeMode={'stretch'}
                source={require('../../assets/signalbg.png')}
                style={{
                  width: Dimensions.get('screen').width, height: 600,
                  flexDirection: 'column',
                  // backgroundColor: global.appColor2,            
                  alignSelf: 'center',
                  marginTop: 40,
                  // borderRadius: 10,
                  borderBottomWidth: 0,
                  paddingVertical: 20,
                  alignItems: 'center',
                  zIndex: 9999,
                }}
                imageStyle={{ borderRadius: 20 }}
              >
                <Text style={{ color: colors.selected, fontSize: 20, marginTop: 50, marginBottom: 40 }}>Start SuperBot</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '80%', marginBottom: 20 }}>
                  <Text style={{ color: colors.selected, fontSize: 15, textAlign: 'left' }}>Enter SuperBot{'\n'} Amount</Text>
                  <TextInput
                    value={superBotAmt}
                    onChangeText={(val) => { setSuperBotAmt(val) }}
                    placeholder="SuperBot Amount"
                    style={[styles.textInput, {
                      fontWeight: 'normal', backgroundColor: 'white'
                      , borderRadius: 10
                      , width: '60%'
                    }]}
                    placeholderTextColor={'grey'}
                    placeholderStyle={{ fontWeight: 'normal' }}
                    selectionColor={colors.binanceylw2}
                    color={'#000000'}
                    keyboardType="numeric"
                  />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '80%', marginBottom: 20 }}>
                  <Text style={{ color: colors.selected, fontSize: 15, textAlign: 'left' }}>Take Profit</Text>
                  <TextInput
                    value={tp}
                    onChangeText={(val) => { setTp(val) }}
                    placeholder="SuperBot Amount"
                    style={[styles.textInput, {
                      fontWeight: 'normal', backgroundColor: 'white'
                      , borderRadius: 10
                      , width: '60%'
                    }]}
                    placeholderTextColor={'grey'}
                    placeholderStyle={{ fontWeight: 'normal' }}
                    selectionColor={colors.binanceylw2}
                    color={'#000000'}
                    keyboardType="numeric"
                  />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '80%', marginBottom: 20 }}>
                  <Text style={{ color: colors.selected, fontSize: 15, textAlign: 'left' }}>Difference</Text>
                  <TextInput
                    value={diffVal}
                    onChangeText={(val) => { setDiffVal(val) }}
                    placeholder="Difference"
                    style={[styles.textInput, {
                      fontWeight: 'normal', backgroundColor: 'white'
                      , borderRadius: 10
                      , width: '60%'
                    }]}
                    placeholderTextColor={'grey'}
                    placeholderStyle={{ fontWeight: 'normal' }}
                    selectionColor={colors.binanceylw2}
                    color={'#000000'}
                    keyboardType="numeric"
                  />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '80%', marginBottom: 20 }}>
                  <Text style={{ color: colors.selected, fontSize: 15, textAlign: 'left' }}>Multiplier</Text>
                  <TextInput
                    value={mplier}
                    onChangeText={(val) => { setMplier(val) }}
                    placeholder="multiplier Amount"
                    style={[styles.textInput, {
                      fontWeight: 'normal', backgroundColor: 'white'
                      , borderRadius: 10
                      , width: '60%'
                    }]}
                    placeholderTextColor={'grey'}
                    placeholderStyle={{ fontWeight: 'normal' }}
                    selectionColor={colors.binanceylw2}
                    color={'#000000'}
                    keyboardType="numeric"
                  />
                </View>

                <Text style={{ color: colors.selected, fontSize: 16 }}>Required Trading Capital : <Text style={{ color: colors.binanceylw2, fontSize: 18 }}>{isNaN(calSuperBot) ? 0 : calSuperBot}</Text></Text>
                <View style={{ flexDirection: 'row', width: '80%', justifyContent: 'space-between', marginTop: 40 }}>
                  <TouchableOpacity
                    onPress={() => {
                      if (superBotAmt == '' || superBotAmt == '0') {
                        ToastAndroid.show("Please Enter Amount First!", ToastAndroid.SHORT)
                        return
                      }
                      setDisableConfirm(true), startTradeApi('BUY', selectedPair)
                    }}
                    disabled={disableConfirm}
                    style={{ backgroundColor: colors.profitcolor, paddingVertical: 10, marginVertical: 5, borderRadius: 5, width: '30%' }}>
                    <Text style={{ color: colors.selected, fontSize: 14, textAlign: 'center', textAlignVertical: 'center' }} >
                      BUY
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      if (superBotAmt == '' || superBotAmt == '0') {
                        ToastAndroid.show("Please Enter Amount First!", ToastAndroid.SHORT)
                        return
                      }
                      setDisableConfirm(true), startTradeApi('SELL', selectedPair)
                    }}
                    disabled={disableConfirm}
                    style={{ backgroundColor: colors.losscolor, paddingVertical: 10, marginVertical: 5, borderRadius: 5, width: '30%' }}>
                    <Text style={{ color: colors.selected, fontSize: 14, textAlign: 'center', textAlignVertical: 'center' }} >
                      SELL
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      if (superBotAmt == '' || superBotAmt == '0') {
                        ToastAndroid.show("Please Enter Amount First!", ToastAndroid.SHORT)
                        return
                      }
                      setDisableConfirm(true), startTradeApi('', selectedPair)
                    }}
                    disabled={disableConfirm}
                    style={{ backgroundColor: '#277184', paddingVertical: 10, marginVertical: 5, borderRadius: 5, width: '30%' }}>
                    <Text style={{ color: colors.selected, fontSize: 14, textAlign: 'center', textAlignVertical: 'center' }} >
                      AUTO
                    </Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>

            </Modal>
            <View style={{
              flexDirection: 'row', flex: 0.8, justifyContent: 'flex-start',
              paddingBottom:0,
              marginLeft: 5, paddingTop: 5
            }}>
              <Text style={[styles1.heading, { color: '#fff', fontSize: 16, textAlignVertical: 'center', 
              fontFamily:global.appFontB }]}>QUICK START</Text>
          
{/* 
              {global.ismaster != '1' && global.iscopytrade == 'True' ?
                <TouchableOpacity style={{ marginLeft: 20 }} 
                onPress={() => { global.api_key != '' ? (global.AMT > 0 ? navigation.navigate('AllTradeSettings') : ToastAndroid.show("Please Activate Your ID To Get Access To This Feature!", ToastAndroid.SHORT)) : navigation.navigate('APIBinding') }} >
                  <FontAwesome name='gear' size={25} color={colors.appBlack} />
                </TouchableOpacity> : null} */}
            </View>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>


            </View>

          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 15 }}>


            <View style={{ flexDirection: 'row',backgroundColor: '#000', justifyContent: 'flex-start', height: 45, alignItems: 'center' ,borderRadius:30}}>
              <TextInput
                placeholder="Search Currency Name"
                keyboardType='default'
                style={styles.textInput}
                autoCapitalize="characters"
                // caretHidden={true}                                
                autoFocus={My_Focus}
                onChangeText={(val) => {
                  arr = []
                  if (Data) {
                    handleSearch(val)
                  }
                }//Data
                }
                value={Inp_txt}
                onFocus={() => { setSearch(true) }}
                width={'95%'}
                // backgroundColor={'#000'}
                placeholderTextColor={colors.selected}
                selectionColor={colors.selected}
                color={colors.selected}
                height={'100%'}
              />
              <TouchableOpacity activeOpacity={!Search ? 1 : 0.2} 
              style={{ position: 'absolute', right: '3%',backgroundColor:'#19dc51',
              borderRadius:60,width:30,height:30,alignItems:'center',justifyContent: 'center'}} 
              onPress={() => { Search ? (setInp_txt(''), arr = [], setNData(''), setSearch(false), 
              setNo_Search(false)) : null }}>
                <Text style={{marginLeft:2 }}>  
                 <Ionicons name={Search ? "ios-close-outline" : "search-outline"} size={Search ? 22 : 22} color={'#fff'} /> </Text>
              </TouchableOpacity>
            </View>



          </View>

          {No_Search ? null :
            <FlatList
              horizontal={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
              ListFooterComponent={()=>(
                <View style={{marginBottom:100}}></View>
              )}
              data={NData != '' ? NData : usedData && usedData.sort((a, b) => (a.sym) > (b.sym))}
              extraData={NData != '' ? NData : usedData}
              initialNumToRender={10}
              // extraData={Data}
              removeClippedSubviews={true}
              keyExtractor={(item, index) => index}
              renderItem={({ item, index }) => (
                // <>

                  <TouchableOpacity activeOpacity={0.8} style={{
                    flexDirection: 'column', width: '96%', alignSelf: 'center', 
                    marginVertical: 10,borderRadius:10,
                    // elevation:5,
                    // shadowColor:colors.appGray,
                    // borderWidth:1,
                    // borderColor:'#ebebeb'
                    // ,backgroundColor:'#fff',shadowWidth:1
                  }}
                    // onPress={() => {
                    //   // if(global.freeUser=='true'){
                    //   //   ToastAndroid.show("Your Demo Account has Expired , Please Activate you Id!",ToastAndroid.SHORT)
                    //   //   return
                    //   // }
                    //   if (global.ismaster != '1' && global.iscopytrade == 'True') {

                    //     touch_handle(item)
                    //   }
                    // }
                    // }

                  >
                    <View 
                   style={{ flexDirection: 'column', //justifyContent: 'space-around',
                     height: 150, }} activeOpacity={0.9}>
                      {/* backgroundColor:colors.appGray */}
                      <View style={{ flexDirection: 'row',  width: '100%', padding: 8,
                      backgroundColor:colors.appGray,borderTopStartRadius:10,borderTopEndRadius:10}}>
                        <Image
                          source={{ uri: 'https://' + item.img }}
                          resizeMode={'stretch'}
                          style={{ width: 25, height: 25, marginRight: 15, }}
                        />
                        <View style={{ flexDirection: 'column',marginTop:3 }}>
                          <Text style={{ color: colors.selected, fontFamily: global.bold, fontSize: 15, textAlign: 'left', fontFamily:global.appFontB }} >
                            {item.sym}
                          </Text>
                       

                        </View>
                        <Text style={{ color: colors.selected, fontSize: 17, fontFamily: global.bold, textAlign: 'left' }} >
                       
                        </Text>

                      </View>
                      <View style={{  justifyContent: 'space-around', flexDirection:'row',flex:1,backgroundColor:'#000',borderBottomStartRadius:10,borderBottomEndRadius:10 }}>
                      <View style={{  alignItems: 'center',flex:0.5 ,alignItems:'center',justifyContent: 'center',borderColor:'#ebebeb',
                    borderRightWidth:1}}>
                        <Text style={{ fontSize: 12, color: 'gray',textTransform:'uppercase',fontFamily:global.appFontM }} >
                          Start Callback
                        </Text>
                        <Text style={{ fontSize: 24,marginTop:10, color: colors.selected,fontFamily: global.appFontM}} >
                          {item.start_bot_variation}
                        </Text>
                       </View>

                       <View style={{  alignItems: 'center',flex:0.5,alignItems:'center',justifyContent: 'center' }}>

                        <Text style={{ fontSize: 12, color: 'gray',textTransform:'uppercase',fontFamily:global.appFontM }} >
                          Lot Size
                        </Text>
                        <Text style={{ fontSize: 24,marginTop:10, color: colors.selected,fontFamily: global.appFontM}} >
                          {item.first_buy_in_amount}
                        </Text>
                       </View>
                     
                      </View>
                     
                      {/*  for non hedge mode  */}
                      {/* <View style={{width: '100%', justifyContent: 'space-around', alignItems: "center",
                        display:
                          (global.ismaster == '1' || global.iscopytrade == 'True') ? 'flex' : 'none'
                      }}>
                        <TouchableOpacity
                          disabled={
                            global.ismaster != '1' ?
                              item.isopen == 'True' ? true : parseFloat(item.buy) == 1 ? true : false
                              : false
                          }
                          onPress={() => {
                            if (global.ismaster != '1') {

                              setQTY1(item.qty1),
                                setModalSetting(true),
                                getTrade(Uid, 'BUY', item.sym, item.avg, item.start_bot_variation, item.first_buy_in_amount, item)
                            }
                            else {
                              setStartVals({ side: 'BUY', item: item })
                              setModalTpSl(true)

                            }

                          }}
                         
                          style={{
                            paddingVertical: 5, marginVertical: 5,
                            opacity:
                              global.ismaster !== '1' ?
                                item.isopen == 'True' ? 0.1 : parseFloat(item.buy) == 1 ? 0.1 : 1
                                : 1
                          }}
                        >
                          <Text style={{
                            color: colors.profitcolor, fontSize: 16, fontFamily:global.appFontB, textAlign: 'center',
                            textAlignVertical: 'center'
                          }} >
                            BUY
                          </Text>
                        </TouchableOpacity>


                        <TouchableOpacity
                          disabled={
                            global.ismaster != '1' ?
                              item.isopen == 'True' ? true : parseFloat(item.sell) == 1 ? true : false
                              : false
                          }
                          onPress={() => {
                            if (global.ismaster != '1') {

                              setQTY1(item.qty1),
                                setModalSetting(true),
                                getTrade(Uid, 'SELL', item.sym, item.avg, item.start_bot_variation, item.first_buy_in_amount, item)
                            }
                            else {
                              setStartVals({ side: 'SELL', item: item })
                              setModalTpSl(true)
                            
                            }
                          }} style={{
                            paddingVertical: 5, marginVertical: 5,
                            opacity:
                              global.ismaster !== '1' ?
                                item.isopen == 'True' ? 0.1 : parseFloat(item.sell) == 1 ? 0.1 : 1
                                : 1
                          }}>
                          <Text style={{
                            color: colors.losscolor, fontSize: 16, fontFamily:global.appFontB, textAlign: 'center',
                            textAlignVertical: 'center',
                          }} >
                            SELL
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                       
                          disabled={
                            global.ismaster != '1' ?
                              item.st == 'True' ? true : false
                              : false
                          }
                          onPress={() => {
                            console.log('========my uid is: ' + Uid);
                            if (global.ismaster != '1') {

                              setQTY1(item.qty1),
                                setModalSetting(true),
                                getTrade(Uid, 'BOTH', item.sym, item.avg, item.start_bot_variation, item.first_buy_in_amount, item)

                            }
                            else {
                              setStartVals({ side: 'BOTH', item: item })
                              setModalTpSl(true)

                            }
                          }} style={{
                            paddingVertical: 5, marginVertical: 5,
                            display: (
                              global.ismaster !== '1' ?
                                item.isopen === 'True' ? 'none' : (parseFloat(item.buy) == 1 || parseFloat(item.sell) == 1) ? 'none' : 'flex'
                                : 'flex'
                            ),
                            opacity:
                              global.ismaster !== '1' ?
                                item.isopen === 'True' ? 0.1 : (parseFloat(item.buy) == 1 || parseFloat(item.sell) == 1) ? 0.1 : 1
                                : 1
                            // opacity: item.st == 'True' || item.opens == 'True' || item.opens == 'True' ? 0.1 : 1
                          }}>
                          <Text style={{ color: colors.selected, fontSize: 16, fontFamily:global.appFontB, textAlign: 'center', textAlignVertical: 'center' }} >
                            BOTH
                          </Text>
                        </TouchableOpacity>
                      </View> */}

                      {/*  for hedge mode  */}
                      {/* <View style={{flexDirection:'row',width:'100%',display:hedge?'flex':'none',justifyContent:'space-around',alignItems:"center"}}>    
             <TouchableOpacity disabled={item.opens=='True'?true:parseFloat(item.buy)==1?true:false} onPress={()=>{                                                                          
                     setQTY1(item.qty1),setModalSetting(true),getTrade(Uid, 'BUY',item.sym,item.avg,item.start_bot_variation,item.first_buy_in_amount,item)                                     
               }} style={{paddingVertical:5,marginVertical:5,opacity:item.opens=='True'?0.1:parseFloat(item.buy)==1?0.1:1}}>
             <Text style={{color:colors.profitcolor,fontSize:16,fontWeight:'bold', textAlign:'center',textAlignVertical:'center'}} >
                BUY
               </Text>
             </TouchableOpacity>
             <TouchableOpacity disabled={item.opens=='True'?true:parseFloat(item.sell)==1?true:false} onPress={()=>{                
                 setQTY1(item.qty1),setModalSetting(true),getTrade(Uid, 'SELL',item.sym,item.avg,item.start_bot_variation,item.first_buy_in_amount,item)                                   
               }} style={{paddingVertical:5,marginVertical:5,opacity:item.opens=='True'?0.1:parseFloat(item.sell)==1?0.1:1}}>
               <Text style={{color:colors.losscolor,fontSize:16,fontWeight:'bold', textAlign:'center',textAlignVertical:'center'}} >
                SELL
               </Text>
             </TouchableOpacity>
             
             <TouchableOpacity  onPress={()=>{      
	      setQTY1(item.qty1),setModalSetting(true),getTrade(Uid, 'BOTH',item.sym,item.avg,item.start_bot_variation,item.first_buy_in_amount,item)                          
          
                //  StartTrade('BUY',item.sym,index,item.start_bot_variation,item.first_buy_in_amount)
                 // StartTrade('SELL',item.sym,index,item.start_bot_variation,item.first_buy_in_amount)                                   
               }} style={{paddingVertical:5,marginVertical:5,display:(item.opens==='True'?'none':(parseFloat(item.buy)==1||parseFloat(item.sell)==1)?'none':'flex'),opacity:item.opens==='True'?0.1:(parseFloat(item.buy)==1||parseFloat(item.sell)==1)?0.1:1}}>
               <Text style={{color:colors.selected,fontSize:16,fontWeight:'bold', textAlign:'center',textAlignVertical:'center',display:(item.opens==='True'?'none':(parseFloat(item.buy)==1||parseFloat(item.sell)==1)?'none':'flex')}} >
                BOTH
               </Text>
             </TouchableOpacity>             
           {(hedge && global.demo=='true')?  <TouchableOpacity
             disabled={item.st=='True'||item.opens=='True'||item.opens=='True'?true:false}
            //  disabled={item.st=='True'?true:parseFloat(item.sell)==1?true:false} 
             onPress={()=>{                
                         setSelectedPair(item.sym)         
                    setModalPopup(true)   
                    // startTradeApi(Uid, undefined,item.sym,item.avg,item.start_bot_variation,item.first_buy_in_amount,item)
               }} style={{backgroundColor:'#277184',paddingVertical:7,marginVertical:5,borderRadius:5,display:(item.st==='True'?'none':(parseFloat(item.buy)==1||parseFloat(item.sell)==1)?'none':'flex'),opacity:item.st==='True'?0.1:(parseFloat(item.buy)==1||parseFloat(item.sell)==1)?0.1:1}}>
               <Text style={{color:colors.selected,fontSize:11, textAlign:'center',textAlignVertical:'center',display:(item.st==='True'?'none':(parseFloat(item.buy)==1||parseFloat(item.sell)==1)?'none':'flex')}} >
                SUPERBOT
               </Text>
             </TouchableOpacity>:null   }          
             </View> */}
                    </View>
                    <TouchableOpacity
                      //  disabled={btn_disable}
                      // style={{height:40}}
                      onPress={() => {
                        setChart(item.sym),
                          setBtn_disable(true),
                          setTimeout(() => { setBtn_disable(false) }, 1500)
                        if (chartIndex === index) {
                          setShowChart(false)
                          setChartIndex(null)
                        } else {

                          setShowChart(true), setChartIndex(index)
                        }

                      }}>
                      {/* <View style={{ height: 1, width: '100%', backgroundColor: '#303c4d', marginTop: 5 }}></View> */}

                      <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'flex-end', paddingHorizontal: 10 }}>
                        {/* <Text style={{ color: '#FFF', fontSize: 12, }}>{OpenPanel ? `Waiting for a dip of ${item.start_bot_variation} %` : item.mode.toUpperCase()}</Text> */}
                        {/* {btn_disable && showChart && chartIndex == index ?
                                  <>
                              
                                    <ActivityIndicator size={18} color={'#fff'} />
                                  </>
                                  :
                                  <MaterialIcons
                                    name={showChart && chartIndex == index ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={28} color={colors.selected} />
                                } */}



                      </View>

                    </TouchableOpacity>

                  </TouchableOpacity>
                  //  {
                  //           showChart && chartIndex == index ?
                  //             <View style={{ height: 350, width: '100%', borderTopWidth: 1, borderColor: colors.selected, marginTop: 20 }}>
                  //               <WebChart sym={item.sym} navigation={navigation} indi={'down'} from={'joined'} />
                  //             </View> : null} 
                // {/* </> */}

              )}
            />
          }
          <View>
            <Modal onBackButtonPress={toggleModal} statusBarTranslucent={true} deviceHeight={1000} onBackdropPress={toggleModal} isVisible={isModalVisible} animationInTiming={300} animationOutTiming={200}>
              <View style={{ width: 350, backgroundColor: '#203040', flexDirection: 'column', justifyContent: 'space-around', paddingHorizontal: 15, paddingVertical: 15, borderWidth: 0.5, borderColor: '#70707070', borderRadius: 10, borderBottomWidth: 0 }}>

                <Text style={[styles.text_footer, { textAlign: 'center', color: colors.selected }]}>Are you sure you want to stop the Bot?</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', width: '100%' }}>
                  <TouchableOpacity onPress={() => { toggleModal() }}>
                    <View style={{ marginTop: 5, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                      <Text style={{ color: colors.hdl, fontFamily:global.appFontB, fontSize: 17 }}>Cancel</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { Push_btn(symbol) }}>
                    <View style={{ marginTop: 5, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                      <Text style={{ color: '#f5f5f5', fontFamily:global.appFontB, fontSize: 17 }}>Confirm</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>


            </Modal>
          </View>
        </Animatable.View>

      </View >

  )

}


export default QuantitativeScreen;

const styles1 = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#0B1725',
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
    fontFamily: global.bold,

  },
  textInput: {
    marginLeft: 15,
    marginTop: -15,
    paddingBottom: -10,
  },
  text_header: {
    color: '#f8f8f8f8',
    fontFamily: global.bold,
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
    fontWeight: '400',
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
    fontFamily: global.bold,
    color: '#d5d5d5d5',
  },
  textSign: {
    fontSize: 18,
    fontFamily: global.bold,
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
    fontFamily: global.bold,
  },
});
