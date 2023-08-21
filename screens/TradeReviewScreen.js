/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import { View, Text, Button, Dimensions,Keyboard,Pressable, ToastAndroid, Alert, TouchableOpacity, Switch, TextInput, KeyboardAvoidingView, BackHandler, StyleSheet, Image, StatusBar, FlatList, ActivityIndicator, ScrollView, ImageBackground } from 'react-native';
import { ThemeProvider, useFocusEffect, useIsFocused, useTheme, useLinkTo } from '@react-navigation/native';
import { Appbar,Menu,Divider,Provider,List,RadioButton} from 'react-native-paper';
import IonIcons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { AuthContext } from '../component/context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import WebChart from '../component/WebChart'
import AntDesign from 'react-native-vector-icons/AntDesign'
import global from '../component/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../component/styles'
import { isNaN } from 'lodash';
import { color } from 'react-native-reanimated';
import database from '@react-native-firebase/database';
import { jsonContext } from '../context/GlobalState';
import KlineChart2 from '../component/KlineChart2';
var DeviceInfo = require('react-native-device-info');

// import ChartScreen from  '../component/ChartScreen';

// import { VictoryBar,VictoryCandlestick, VictoryChart, VictoryTheme } from "victory-native";


const Chart_data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
];
var DeviceInfo = require('react-native-device-info');

const colorpick = {hg1: "#45af25"}
var newjson = "";
global.closesocket=0;
var qty2 = 0;
const TradeReviewScreen = (props) => {
  const { setCallStore,hedge } = React.useContext(jsonContext);
  const linkTo = useLinkTo();
  const sym = props.route.params?.sym;
  const img = props.route.params?.img;
  var st = '';
  if (props.route.params?.status != undefined) {
    st = props.route.params?.status;
  }  

  const qty = props.route.params?.qty;
  var qty1 = props.route.params?.qty1;
  const bst = props.route.params?.bst;
  var liq = props.route.params?.liq;
  var iscopy = props.route.params?.iscopy; 
  const side_buy=props.route.params?.buy
  const side_sell=props.route.params?.sell  
  const isopen=props.route.params?.isopen  
  var bst1 = '';
  if (props.route.params?.bst == 'running' && props.route.params?.bst1 == '' || props.route.params?.bst1 == undefined || props.route.params?.bst1 == null) {
    bst1 = 'startmargin';
  } else {
    bst1 = props.route.params?.bst1;
  }
  let avg = props.route.params?.avg;
  const usdt = props.route.params?.usdt;
  

  const [keyboardStatus, setKeyboardStatus] = React.useState(false);
  const { colors } = useTheme();
  const theme = useTheme();
  const [Data, setData] = React.useState('');
  const { signOut } = React.useContext(AuthContext);
  const [Uid, setUid] = React.useState('');  
  const [Token,setToken] = React.useState(null);  
  const [showChart, setShowChart] = React.useState(false);
  const [macd, setmacd] = React.useState('Get Signal')
  const [bbands, setbbands] = React.useState('Get Signal')
  const [sma, setsma] = React.useState('Get Signal')
  const [NewAvg, setNewAvg] = React.useState('0');
  const [NewAvg1, setNewAvg1] = React.useState('0');
  const [total_amount, setTotalAmount] = React.useState('0');
  const [XPCP, setPCP] = React.useState('0');

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [Click_buy, setClick_buy] = React.useState(true);
  const [SymData,setSymData] = React.useState();
  const [signalData, setSignalData] = React.useState(null);
  const [signalData2, setSignalData2] = React.useState(null);
  const [showSignalData, setShowSignalData] = React.useState(false);
  /////////

  const [signalVis, setSignalVis] = React.useState(false);
  const [signalInterval,setSignalInterval] = React.useState('15');
  const [ld2, setLd2] = React.useState(false);
  const [ld, setLd] = React.useState(false);
  const[symSignal,setSymSignal]= React.useState('')

  //////////
  const [orderType, setOrderType] = React.useState(props.route.params?.ordertype);
  // console.log('val for ordertype ',props.route.params?.ordertype);
  const [Mode, setMode] = React.useState('');
  const [MP, setMP] = React.useState(false);
  const [CPrice, setLastPrice] = React.useState('0');
  const [Type, setType] = React.useState('cycle');
  const [Input1, setInput1] = React.useState('');
  const [listShow,setListShow] = React.useState(false); 
  const [Order_sideShow,setOrder_sideShow] = React.useState(false); 
  const [start_type,setStart_type] = React.useState('Market');   
  const [Input2, setInput2] = React.useState('');
  const [Config, setConfig] = React.useState('');
  const [limit,setLimit] = React.useState('');
  const [canShow,setCanShow] = React.useState(true);
  const [Best_buy,setBest_buy] = React.useState(false);
  const [Best_sell, setBest_sell] = React.useState(false);
  const [My_Pwd, setMy_Pwd] = React.useState('');
  const [BST, setBST] = React.useState(bst);
  const [BST1, setBST1] = React.useState(bst1);
  // const [RPA, setRPA] = React.useState(RPA);
  const [Strategy, setStrategy] = React.useState(global.strategy);
  const [Active, setActive] = React.useState(false);
  const[ShowAutoTrade,setShowAutoTrade]= React.useState(true)
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isModal1Visible, setModal1Visible] = React.useState(false);
  const [isModal2Visible, setModal2Visible] = React.useState(false);
  const [isModal3Visible, setModal3Visible] = React.useState(false);
  const [isModal4Visible, setModal4Visible] = React.useState(false);
  const [Reverse_info,setReverse_info] = React.useState(false);
  const[pipModal,setPipModal] = React.useState(false);
  const [Loading, setLoading] = React.useState(false)
  const [StopCalled, setStopCalled] = React.useState(false)

  const [P_order, setP_order] = React.useState(false);
  const [Wait, setWait] = React.useState(false)
  var Api_key = '';
  var Api_secret = '';
  var cc = "";

  const[pipStart,setPipStart] = React.useState('1.0548');
  const[pairName,setPairName] = React.useState('EURUSD');
  const[pipEnd,setPipEnd] = React.useState('1.0558');
  const[pipChange,setPipChange] = React.useState('0');


  React.useEffect(() => {
    
    if (Config.status!=true)
    {
      avg=0;
    }
    if (orderType==null || orderType=='' || orderType==undefined)
    {
      setOrderType('BUY')
    }
    
    setNewAvg(avg);
    setNewAvg1(avg);
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  global.myprice=0.0
  global.mypcp = 0.0
  React.useEffect(() => {
    global.myprice=0.0
    global.mypcp = 0.0    
    const interval = setInterval(() => {
if (parseFloat(global.myprice)>0)
{
      //console.log('my price here:'+global.myprice)
      setLastPrice(global.myprice),
    setPCP(global.mypcp)
  }
    }, 1000);       

    setTimeout(async () => {
      let uid;
      uid = await AsyncStorage.getItem('user_id')
      
      // console.log("bstatus : ",bst)
      
      setUid(uid)
      let api_key;
      let secret_key;      


      try {
        api_key = await AsyncStorage.getItem('api_key');

        if (!api_key) {
          props.navigation.navigate('APIBinding', { from: 'tradereview' })
        }
        // console.log('avgis' + avg)
      
        secret_key = await AsyncStorage.getItem('secret_key');
        Api_key = api_key;
        Api_secret = secret_key;
        //callApi()
        // if (cc=="") {
        //   getTrade(uid)
        //   cc = "a"
        // }


      }
      catch (e) {
        console.log(e);
      }
      // console.log('user token:', userToken);


    },1000);
    return(() => {
      clearInterval(interval)
  })
  }, []);


  React.useEffect(()=>{
    // let url = global.BASE_URL+'css_mob/price.aspx?sym='+sym;
    // console.log(url)
    // fetch(url)
    // .then(item=>item.json())
    // .then(data=>{
    //   setLastPrice(data.price)
    // }).catch(e=>console.log('exc52 : '+e))
  },[])




  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModal1 = () => {
    setActive(false)
    setModal1Visible(!isModal1Visible);
  };

  const toggleModal2 = () => {
    setModal2Visible(!isModal2Visible);
  };
  const toggleModal3 = () => {
    setModal3Visible(!isModal3Visible);
  };
  const toggleModal4 = () => {
    setModal4Visible(!isModal4Visible);
  };

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn)
  };

  useFocusEffect(
    React.useCallback(() => {
      setTimeout(()=>{setShowChart(true)},500)
      // if(Uid){

        dta()
      // }
      // var interval='';
      
      return () => {        
        setShowChart(false)        
      };
    }, [])
    );
    
    async function dta() {


      let uid;
      let my_pwd;
      let token;

      try {
        uid = await AsyncStorage.getItem('user_id')
        my_pwd = await AsyncStorage.getItem('myPwd')
        token = await AsyncStorage.getItem('token')
        setMy_Pwd(my_pwd)
        setToken(token)          
        getTrade(uid, orderType,token)
      }
      catch (e) {
        console.log("error", e)
      }
    }
  // React.useEffect(() => {
  //   return () => { database().ref('/LIVE_BINANCE_RATES/' + sym.toUpperCase()).off() };
  // }, [])

  React.useEffect(() => {
    // console.log('hahhahah')
  }, [Data,limit,qty1,NewAvg])


  const getTrade = (uid, side,Token) => {
    
    console.log(new Date().toLocaleTimeString(),'  , ',new Date().getMilliseconds())

    let sd=side?side:orderType    
    if(sd==undefined || sd==null || sd=='')
    {
      sd='BUY'
    }
    // console.log('side iss ',side,orderType);
    let url1

    if (hedge){    
      url1 = global.BASE_URL + 'css_mob/hedge/tradeconfig_final.aspx?pair=' + sym + '&uid=' + uid+'&side='+(sd=='BOTH'?'BUY':sd)   +'&token='+Token +'&device='+DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel();
    }else{
      url1 = global.BASE_URL + 'css_mob/tradeconfig_final.aspx?pair=' + sym + '&uid=' + uid   +'&token='+Token +'&device='+DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel();
    }
    console.log('calling this' + url1)
  fetch(url1)
      .then(item => item.json())
      .then(dta => {
        


         console.log(dta)        
        if (dta.status === undefined) {
          console.log("A")        
        }
        else {
          console.log("B")        
          if(dta.status==true){
            //setNewAvg(avg);            
          }
          console.log("C")        
          setConfig(dta)
          console.log('Startedis1' + Config.status)
          Config.status = dta.started.toString().toLowerCase()  //may be issue
          console.log('Startedis' + Config.status)
          console.log(Config.status)
          if (Config.status!=true)
          {
            avg=0;
            console.log("D")        
          }

          if (dta.status) {
            console.log("E")        
            setType(dta.type)
            
          }

          console.log("F")        

        }
        


      }).catch(e=>{
        console.log('exc1: '+e);
      })

    
  }


  React.useEffect(() => {
    if(hedge){
    setShowAutoTrade(false)
    }
  }, [hedge])

  
  const get_variation=()=>{
    let url="https://fapi.binance.com/fapi/v1/ticker/24hr?symbol="+sym
    console.log(url)
    fetch(url)
    .then(item=>item.json())
    .then(data=>{
      console.log(data)
      setSymData(data)
    })
  }



function getIndicators(indicator_type){
  if (indicator_type==="macd"){
    setmacd("Checking...")
  }
  else if (indicator_type==="bb"){
    setbbands("Checking...")
  }
  else if (indicator_type==="sma"){
    setsma("Checking...")
  }
    let url = global.BASE_URL + 'css_mob/indicators.aspx?pair=' + sym + '&uid=' + Uid + '&type=' + indicator_type.toLowerCase()
    console.log(url)
    fetch(url)
      .then(item => item.json())
      .then(dta => {
        console.log(dta.status)
        var istatus= dta.status.toUpperCase()
        if (istatus===undefined){
          istatus = "CHECK LATER"
        } 
          
          if (indicator_type==="macd"){
            setmacd(istatus)
          }
          else if (indicator_type==="bb"){
            setbbands(istatus)
          }
          else if (indicator_type==="sma"){
            setsma(istatus)
          }
          
          
       
      });


  }

  const TradeType = () => {
    setWait(true)            
    let tp;
    console.log('typeis' + Type)
    if (Type.toLowerCase() === 'one-shot') {
      tp = 'cycle'
    } else if(Type.toLowerCase() === 'cycle'){
      tp = 'one-shot'
    }
   
    else{
      tp = 'one-shot'
    }
    console.log('newtypeis' + tp)
    let mode=hedge?'hedge':'normal'
    // console.log("symbol here",type)
    let url;
    if(hedge){
      url= global.BASE_URL + 'css_mob/hedge/tradetype.aspx?pair=' + sym + '&uid=' + Uid + '&tp=' + tp+'&pmode='+mode+'&side='+orderType
    }else{
      url= global.BASE_URL + 'css_mob/tradetype.aspx?pair=' + sym + '&uid=' + Uid + '&tp=' + tp+'&pmode='+mode
    }
    console.log(url)
    fetch(url)
      .then(item => item.json())
      .then(dta => {
         
        if (dta.status) {
          console.log('datais' + dta.status + 'tpis' + tp)
          try{
            if(global.firebase=='true'){
              database(global.secondaryApp).ref('CRYPTO_TRADES/'+(Uid&&Uid.toUpperCase()))
              .once('value')
              .then(snapshot => {
                if(snapshot.exists()){
                  console.log('========snapshot exists in tradereview screen')
                  var userData = snapshot.val();  
                  let keys = Object.keys(userData);
                  keys.forEach((key,index) => {
      
                    console.log('key val id::::::::222  '+key+'  '+orderType+'   '+sym)
                    if(key.includes(sym.toUpperCase()) && key.includes(orderType.toUpperCase())){
                        let keyVal=key
                        console.log('key val id::::::::'+keyVal)
                      console.log('=======firebase update opertation:: '+'CRYPTO_TRADES/'+(Uid&&Uid.toUpperCase())+'/'+keyVal+'     '+tp.toUpperCase()+'  baluee')
                      database(global.secondaryApp).ref('CRYPTO_TRADES/'+(Uid&&Uid.toUpperCase())+'/'+keyVal)
                      .update({
                        loop_type:tp.toUpperCase()
                      }).then(() => {
                        console.log('=======update val')
                      })
                    }
                  }) 
                }
                else{
                  console.log('============doesnt exitsssssssssssssssssssssss')
                }
              });
            }
          }catch(e){

          }
          setType(tp)

          setTimeout(() => {

            console.log('datais' + Type)
          },2000);
        }
        ToastAndroid.show(dta.message,ToastAndroid.SHORT) 
        global.status = 'true'
      }).then(() => {
        setWait(false)
      }).catch(e=>console.log('exc2: '+e));
  }

  const StartTrade = (orderside,type) => {
    setLoading(true)
    global.closesocket=0
    setActive(true)
    var minutesToAdd = 20;
    var currentDate = new Date();
    var futureDate = new Date(currentDate.getTime() - minutesToAdd * 60000);
    global.prevtime1 = futureDate
    
    let my_limit_check_low,my_limit_check_high;
    let my_limit=0
    my_limit_check_low=parseFloat(CPrice)-(0.10*parseFloat(CPrice))
    my_limit_check_high=parseFloat(CPrice)+(0.10*parseFloat(CPrice))
    console.log(my_limit_check_low,' : ',limit,' : ',my_limit_check_high)
    if(start_type==='Limit'&&(limit<my_limit_check_low||limit>my_limit_check_high)){
      ToastAndroid.show(`Please Enter Limit Order Price in Range ${my_limit_check_low.toFixed(2)}-${my_limit_check_high.toFixed(2)}`,ToastAndroid.SHORT)
      setActive(false)
      return
    }{
      if(start_type==='Limit'){
        my_limit=limit
      }
    }

    global.prevtime2 = futureDate



    const key_string = objToQueryString({
      key:Uid+global.PWD+global.txnPassword    
 });  
 const ePass = objToQueryString({
  epass:global.txnPassword       
});
 function objToQueryString(obj) {
  const keyValuePairs = [];
  for (const key in obj){
    keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
  }
  return keyValuePairs.join('&');
}  
//temp removed by nav 29july
// setCallStore(true)
// props.navigation.navigate('Home')
if(orderside=='BUY')
{
  
  ToastAndroid.show("Booking Long position for " + sym, ToastAndroid.SHORT)
}
else{
  ToastAndroid.show("Booking Short position for " + sym, ToastAndroid.SHORT)
}

if (global.symname=="")
{
  global.symname=sym
}
else
{
  global.symname = global.symname + "," +  sym
}
setActive(false)
let url;
  if(hedge){
    url = global.BASE_URL + 'css_mob/hedge/starttrade_final_hedge.aspx?uid=' + Uid + '&pair=' + sym + '&pwd=' + My_Pwd + 
    "&side=" + orderside + '&mode=&callback=' + '&foa=' + '&' +key_string+'&'+ePass+'&token='+Token+
    '&device='+DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel()
    // global.BASE_URL + 'css_mob/hedge/starttrade_final_hedge.aspx?uid=' + Uid + '&pair=' + sym + '&pwd=' + My_Pwd + "&side=" + orderside + '&mode=' + global.AccMode+'&limit_price='+my_limit +'&'+key_string+'&'+ePass+'&token='+Token+'&device='+DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel()
  } else{
    url = global.BASE_URL + 'css_mob/starttrade_final.aspx?uid=' + Uid + '&pair=' + sym + '&pwd=' + My_Pwd + "&side=" + orderside + '&mode=' + global.AccMode+'&limit_price='+my_limit +'&'+key_string+'&'+ePass+'&token='+Token+'&device='+DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel()
      }   

    console.log("start trade: " + url+'   '+new Date().toLocaleTimeString())
    // global.status = 'true'
    // global.Coins = '';
    fetch(url)
      .then(item => item.json())
      .then(dta => {
        if (dta.success === 'false' && dta.msg === 'wrong_pwd') {
          signOut()
          ToastAndroid.show("Please Login once again", ToastAndroid.SHORT)
        }
        console.log('data fdfd '+dta)
        if(type=='bothwala'){
        
        }
        else{
          setLoading(false)
          props.navigation.navigate('Home')
        }
      }).catch(e=>{console.log('exc3: '+e)
      if(type=='bothwala'){
        
      }
      else{
        setLoading(false)
        props.navigation.navigate('Home')
      }
    })
  }




  const Play = (status) => {
    global.closesocket=0
    console.log("symbol here", sym)
    setActive(true)
    // let url=global.BASE_URL+'css_mob/stoptrade.aspx?pair='+sym+'&uid='+Uid + "&api_key=" + global.api_key + "&api_secret=" + global.api_secret;
    let url = global.BASE_URL + 'css_mob/change_bot_status.aspx?pair=' + sym + '&uid=' + Uid + "&api_key=" + global.api_key + "&api_secret=" + global.api_secret + '&status=' + status;
    console.log(url)
    global.status = 'true'
    global.Coins = '';
    fetch(url)
      .then(item => item.json())
      .then(dta => {
        var minutesToAdd = 20;
        var currentDate = new Date();
        var futureDate = new Date(currentDate.getTime() - minutesToAdd * 60000);
        global.prevtime1 = futureDate
        // global.prevtime = futureDate
        global.prevtime2 = futureDate
        // global.prevtime_market=futureDate
        global.status = 'true'
        if (dta.status == true) {
          ToastAndroid.show(dta.message, ToastAndroid.SHORT)
          global.status = 'true'
          if (status === 'running') {
            setBST('paused')
          } else if (status === 'paused') {
            setBST('running')
          }
          setActive(false)
          props.navigation.navigate('Home')

        } else {
          ToastAndroid.show("Unable to Stop Bot . " + dta.message, ToastAndroid.SHORT)
          setActive(false)
        }

      }).catch(e=>console.log('exc4: '+e))
  }
  const marginCall = (status) => {
    global.closesocket=0
    toggleModal3()
    console.log("symbol here", sym)
    global.callStore=true;

    var minutesToAdd = 20;
    var currentDate = new Date();
    var futureDate = new Date(currentDate.getTime() - minutesToAdd * 60000);
    global.prevtime1 = futureDate
    // global.prevtime = futureDate
    global.prevtime2 = futureDate
    // global.prevtime_market=futureDate
    let mode =hedge?'hedge':'normal'
    // let url=global.BASE_URL+'css_mob/stoptrade.aspx?pair='+sym+'&uid='+Uid + "&api_key=" + global.api_key + "&api_secret=" + global.api_secret;
    let url;
    if(hedge){
      url = global.BASE_URL + 'css_mob/hedge/change_bot_status.aspx?pair=' + sym + '&uid=' + Uid + "&api_key=" + global.api_key + "&api_secret=" + global.api_secret + '&status=' + status+'&pmode='+mode+'&side='+orderType;
    }else{
      url = global.BASE_URL + 'css_mob/change_bot_status.aspx?pair=' + sym + '&uid=' + Uid + "&api_key=" + global.api_key + "&api_secret=" + global.api_secret + '&status=' + status+'&pmode='+mode;
    }
    console.log(url)
    global.status = 'true'
    global.Coins = '';
    fetch(url)
      .then(item => item.json())
      .then(dta => {
        if (dta.status == true) {
          ToastAndroid.show(dta.message, ToastAndroid.SHORT)
          global.status = 'true'
          if (status === 'stopmargin') {
            setBST1('stopmargin')
          } else if (status === 'startmargin') {
            setBST1('startmargin')
          }

          //props.navigation.navigate('HomeDrawer')

        } else {
          ToastAndroid.show("Unable to make changes  . May be Bot is Already Stopped.", ToastAndroid.SHORT)

        }

      }).catch(e=>console.log('exc5: '+e))
  }


  const stopApi = () => {
    global.closesocket=0

    var minutesToAdd = 20;
    var currentDate = new Date();
    var futureDate = new Date(currentDate.getTime() - minutesToAdd * 60000);
    global.prevtime1 = futureDate
    // global.prevtime = futureDate
    global.prevtime2 = futureDate
    // global.prevtime3=futureDate
    global.Coins = '';
    console.log("symbol here", sym)
    setActive(true)
   
    const key_string = objToQueryString({
      key:Uid+global.PWD+global.txnPassword    
 });  
 const ePass = objToQueryString({
  epass:global.txnPassword       
});
 function objToQueryString(obj) {
  const keyValuePairs = [];
  for (const key in obj){
    keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
  }
  return keyValuePairs.join('&');
} 
let mode=hedge?'hedge':'normal' 
    let url 
    if(hedge){
      url = global.BASE_URL + 'css_mob/hedge/stoptrade.aspx?pair=' + sym + '&uid=' + Uid + "&api_key=" + global.api_key + "&api_secret=" + global.api_secret+'&'+key_string+'&'+ePass+'&pmode='+mode+'&side='+orderType+'&token='+Token+'&device='+DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel();
    }else{
      url = global.BASE_URL + 'css_mob/stoptrade.aspx?pair=' + sym + '&uid=' + Uid + "&api_key=" + global.api_key + "&api_secret=" + global.api_secret+'&'+key_string+'&'+ePass+'&pmode='+mode+'&token='+Token+'&device='+DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel();
    }
    global.status = 'true'
    props.navigation.navigate('Home')
    ToastAndroid.show("Bot Stopped Successfully for " + sym, ToastAndroid.SHORT)

    setActive(false)
    setStopCalled(false)
    console.log(url)
    fetch(url)
      .then(item => item.json())
      .then(dta => {
        console.log(dta)
      }).catch(e=>console.log('exc7: '+e))
  }

  React.useEffect(() => {
    console.log('hello')
  }, [Input1, Input2])



  const placeOrder = (mode) => {
    if (Input1 != '' && Input2 != '') {
      let hmode=hedge?'hedge':'normal'
      let url;
      if(hedge){
        url = global.BASE_URL + 'css_mob/hedge/place_order.aspx?uid=' + Uid + '&side=' + mode + '&api_key=' + global.api_key + '&api_secret=' + global.api_secret + '&quantity=' + parseFloat(Input2*Config.leverage) + '&pair=' + sym + '&price=' + Input1 + '&precision=5'+'&pmode='+hmode+'&side1='+orderType;
      }else{
        url = global.BASE_URL + 'css_mob/place_order.aspx?uid=' + Uid + '&side=' + mode + '&api_key=' + global.api_key + '&api_secret=' + global.api_secret + '&quantity=' + parseFloat(Input2*Config.leverage) + '&pair=' + sym + '&price=' + Input1 + '&precision=5'+'&pmode='+hmode;
      }
      console.log(url)
      fetch(url)
        .then(item => item.json())
        .then(dta => {
          setP_order(false)
          ToastAndroid.show("Order Will be Placed Instantly At Your Selected Price", ToastAndroid.SHORT)
          toggleModal2()
          setClick_buy(true)
          global.status = 'true'
          global.Coins = '';
          setCallStore(true)
        }).catch(e=>console.log('exc8: '+e))
    }
  }



  const liq_calculator=(adjMargin,side)=>{       
    let EP=parseFloat(CPrice).toFixed(4)  //2.1852
    let margin=parseFloat(adjMargin)  //20
    let PS=((parseFloat(adjMargin)*7)).toFixed(4)  //98.334
    let b_share=PS-margin  //140.73
    let surplus=b_share+ (margin*0.05 )   //1.336 
    let f_percentage=(surplus)/PS //0.84840   
    let total=f_percentage*EP  
    let ntotal=0;
    let ptotal=0;
    if(side==='SELL'){    
      ntotal=EP-total    
      ptotal=parseFloat(EP)+parseFloat(ntotal)        
      if(isNaN(ptotal)){
        ptotal=0
      }     
  
      return parseFloat(ptotal).toFixed(6)
    }else{
  
      
      if(isNaN(total)){
        total=0
      } 
      return    total.toFixed(6)
      
    }
    }



  const Return_rate_calculate = () => {
    // console.log('my roe % values are : ',NewAvg," , ",CPrice," , ",av," , ",Config.leverage)
    let av = NewAvg == undefined || parseFloat(NewAvg) == 0 || st.toString() === "False" ? 0 : NewAvg != '' ?
      parseFloat(NewAvg) < parseFloat(CPrice) ?

        (((((parseFloat(NewAvg) - parseFloat(CPrice)) / parseFloat(NewAvg)) * 100) * -1).toFixed(2)) :

        (isNaN(((parseFloat(CPrice) - parseFloat(NewAvg)) / parseFloat(NewAvg)) * 100)) ? 0 :
          ((((parseFloat(CPrice) - parseFloat(NewAvg)) / parseFloat(NewAvg)) * 100).toFixed(2)) : 0
    return ((av*parseFloat(Config.leverage)).toFixed(2)==1000)?0:(av*parseFloat(Config.leverage)).toFixed(2);
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
    // console.log('pnl is ******* : '+ Input1+'  '+NewAvg1)
    let pnl = Input1 != '' ? isNaN(parseFloat(Input1) / parseFloat(NewAvg1) * 100 - 100) ? '0' : (parseFloat(Input1) / parseFloat(NewAvg1) * 100 - 100).toFixed(4) + '%' : '-'

    // console.log('new pnl is : ' +pnl)
    return pnl
  }


  const kill_bot = () => {
    let mode =hedge?'hedge':'normal'
    let url ;
    if(hedge){
      url= global.BASE_URL + 'css_mob/hedge/kill_bot.aspx?uid=' + Uid + '&pair=' + sym+'&pmode='+mode+'&side='+orderType;
    }else{
      url= global.BASE_URL + 'css_mob/kill_bot.aspx?uid=' + Uid + '&pair=' + sym+'&pmode='+mode;
    }
    console.log(url)
    fetch(url)
      .then(item => item.json())
      .then(dta => {
        console.log(dta)
        if (dta.status === true) {
          global.Coins = '';
          props.navigation.goBack()
        } else {
          global.Coins = '';
          props.navigation.goBack()
        }
      }).catch(e=>console.log('exc9: '+e))
  }


 const Best_price_get=(side)=>{
  let mode=hedge?'hedge':'normal'
  let url=global.BASE_URL+`css_mob/get_best_price.aspx?uid=${global.uid}&pair=${sym}&side=${side}&pmode=${mode}`
  console.log(url)
  fetch(url)
  .then(item=>item.json())
  .then(data=>{
    console.log(data)
    if(data.success==='true'){      
      setLimit(data.best_price)
    }
  }).then(()=>{
    setBest_buy(false)
    setBest_sell(false)
  }).catch(e=>console.log('exc10: '+e))
 }

 
 const SignalInfo=(item,interval)=>{
  console.log('signal info: '+JSON.stringify(item))
  let url
  let url2
  if(interval!==undefined && interval!==null)
  {

    url=global.BASE_URL+'css_mob/signals_data.aspx?pair='+item+'&interval='+interval
    url2=global.BASE_URL+'css_mob/get_indicators.aspx?pair='+item+'&interval='+interval
  }
  else{

    url=global.BASE_URL+'css_mob/signals_data.aspx?pair='+item+'&interval=15'
    url2=global.BASE_URL+'css_mob/get_indicators.aspx?pair='+item+'&interval=15'
  }
  console.log(url2)
  fetch(url2)
  .then(item=>item.json())
  .then(dta=>{   
    console.log(dta) 
      setSignalData2(dta)    
   
  })
  console.log(url)
  fetch(url)
  .then(item=>item.json())
  .then(dta=>{   
    console.log(dta) 
      setSignalData(dta)    
      setLd2(-1)   
      setSignalVis(true)   
  }).catch(e=>console.log('exc11: '+e))
}

function CalculateIt(){
  let multiplier
  if(pipStart.indexOf('.')>=3){
    multiplier= 0.01
  }
  else{
    multiplier = 0.0001
  }

//   if str(open_price).index('.') >= 3:  # JPY pair
//   multiplier = 0.01
// else:
//   multiplier = 0.0001

let pips = (parseFloat(pipEnd) - parseFloat(pipStart)) / multiplier
setPipChange(pips.toFixed(2))
}


  return (
    Loading ?
      <View style={{ flexDirection: 'column', justifyContent: 'center', height: '100%', backgroundColor: colors.background }} ><LottieView source={require('../assets/loading.json')} style={{ width: 300, height: 200, alignSelf: 'center' }} autoPlay loop /></View>
      :
      <ImageBackground source={global.bgimg} style={[styles1.container, { }]}>
      <Modal
      onBackButtonPress={() => setSignalVis(false)}
      statusBarTranslucent={true}
      deviceHeight={1000}
      onBackdropPress={() => setSignalVis(false)}
      isVisible={signalVis?true:false}
      useNativeDriver={true}    
      transparent={true}
      backdropOpacity={0.5}>
      <ImageBackground
      resizeMode={'stretch'}
      source={require('../assets/signalbg.png')}
        style={{
          width:  Dimensions.get('screen').width,height:Dimensions.get('screen').height*0.8,
          flexDirection: 'column',
          // backgroundColor: global.appColor2,            
          alignSelf: 'center',
          marginTop: 60,
          // borderRadius: 10,
          borderBottomWidth: 0,
          paddingVertical:20,
          alignItems: 'center',            
          zIndex: 9999,
        }}
        imageStyle={{borderRadius:20}}
        >    
                  <View style={{flexDirection: 'row',justifyContent: 'space-around',marginTop:10,width:'80%',
                  alignSelf: 'center',justifyContent: 'space-around',marginTop:50
                }}>
                  <TouchableOpacity 
                  onPress={() => {
                    setLd2(1)
                    setSignalInterval('1')
                    SignalInfo(symSignal,'1')
                  }}
                  style={{backgroundColor:signalInterval=='1'?'blue':'grey',width:50,height:30,alignItems:'center',justifyContent:'center',borderRadius:5}}>
                      <Text style={{color:colors.selected}}>1m</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                  onPress={() => {
                    setLd2(1)
                    setSignalInterval('5')
                    SignalInfo(symSignal,'5')
                  }}
                  style={{backgroundColor:signalInterval=='5'?'blue':'grey',width:50,height:30,alignItems:'center',justifyContent:'center',borderRadius:5}}>
                      <Text style={{color:colors.selected}}>5m</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                  onPress={() => {
                    setLd2(1)
                    setSignalInterval('15')
                    SignalInfo(symSignal,'15')
                  }}
                  style={{backgroundColor:signalInterval=='15'?'blue':'grey',width:50,height:30,alignItems:'center',justifyContent:'center',borderRadius:5}}>
                      <Text style={{color:colors.selected}}>15m</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                  onPress={() => {
                    setLd2(1)
                    setSignalInterval('30')
                    SignalInfo(symSignal,'30')
                  }}
                  style={{backgroundColor:signalInterval=='30'?'blue':'grey',width:50,height:30,alignItems:'center',justifyContent:'center',borderRadius:5}}>
                      <Text style={{color:colors.selected}}>30m</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                  onPress={() => {
                    setLd2(1)
                    setSignalInterval('60')
                    SignalInfo(symSignal,'60')
                  }}
                  style={{backgroundColor:signalInterval=='60'?'blue':'grey',width:50,height:30,alignItems:'center',justifyContent:'center',borderRadius:5}}>
                      <Text style={{color:colors.selected}}>1h</Text>
                  </TouchableOpacity>
                      
                        </View>     
                    {  
                    ld2==-1?
                    <View style={{alignSelf: 'center'}} >
                       <Text style={{color:colors.selected,marginVertical:25,alignSelf:'flex-start'}}>RSI : {signalData2&&signalData2['RSI']}</Text>
            <Text style={{color:colors.selected,marginBottom:25,alignSelf:'flex-start'}}>Stochastic RSI : {signalData2&&signalData2['Stoch.RSI.K']}</Text>
            <Text style={{color:colors.selected,marginBottom:25,alignSelf:'flex-start'}}>Support : {signalData2&&signalData2['Pivot.M.Classic.S1']}</Text>
            <Text style={{color:colors.selected,marginBottom:25,alignSelf:'flex-start'}}>Resistance : {signalData2&&signalData2['Pivot.M.Classic.R1']}</Text>
<View style={{borderBottomWidth: 1,marginVertical:5,borderColor:'#fff'}}></View>
            <Text style={{color:colors.selected,marginVertical:25,alignSelf:'flex-start'}}>Total Buy Signals : {signalData&&signalData.BUY}</Text>
            <Text style={{color:colors.selected,marginBottom:25,alignSelf:'flex-start'}}>Total Sell Signals : {signalData&&signalData.SELL}</Text>
            <Text style={{color:colors.selected,marginBottom:25,alignSelf:'flex-start'}}>Total NEUTRAL Signals : {signalData&&signalData.NEUTRAL}</Text>          
            <Text style={{color:colors.selected,marginBottom:25,alignSelf:'flex-start'}}>RECOMMENDATION : {signalData&&signalData.RECOMMENDATION}</Text>          
                          </View>  :
                           <View style={{alignSelf: 'center'}} >
                             <ActivityIndicator size={'large'} color={colors.selected}/>
                           </View>
                          }   
            
              <View style={{flexDirection: 'row',justifyContent: 'center',width:'100%',position: 'absolute',bottom: 80}}>
                  <TouchableOpacity onPress={()=>{setSignalVis(false),setLd(false)}} 
                  style={{backgroundColor:'#6e0919',paddingHorizontal:60,
                  paddingVertical:10,borderRadius:5}}>
                        <Text style={{color:colors.selected,fontWeight: 'bold'}}>CLOSE</Text>
                  </TouchableOpacity>               
              </View>
      </ImageBackground>
    
    </Modal>
      <Modal
      onBackButtonPress={() => setPipModal(false)}
      statusBarTranslucent={true}
      deviceHeight={1000}
      onBackdropPress={() => setPipModal(false)}
      isVisible={pipModal}
      useNativeDriver={true}    
      transparent={true}
      backdropOpacity={0.5}>
      <ImageBackground
      resizeMode={'stretch'}
      source={require('../assets/signalbg.png')}
        style={{
          width:  Dimensions.get('screen').width,height:Dimensions.get('screen').height*0.7,
          flexDirection: 'column',
          // backgroundColor: global.appColor2,            
          alignSelf: 'center',
          marginTop: 60,
          // borderRadius: 10,
          borderBottomWidth: 0,
          paddingVertical:20,
          alignItems: 'flex-start',            
          zIndex: 9999,
        }}
        imageStyle={{borderRadius:20}}
        >    
           <View style={{paddingTop:30,width:'100%'}}>
            <Text style={{fontSize:26,color: colors.selected,textAlign: 'center'}}>PIP Calculator</Text>
            <View style={{alignItems: 'flex-start',width: '80%',marginLeft: '10%',alignSelf: 'flex-start',marginTop:20}}>
            <Text style={{fontSize:16,color: colors.binanceylw}}>Enter Pair Name</Text>
            <TextInput
            placeholder="Enter Pair Name"
            value={pairName}
            onChangeText={(val)=>{setPairName(val)}}
            style={{backgroundColor:'#fff',borderRadius:5,width:'90%'}}
            />
            <Text style={{fontSize:16,color: colors.binanceylw,marginTop:25}}>Enter Start Amount</Text>
            <TextInput
            placeholder="Enter Open Price"
            value={pipStart}
            onChangeText={(val)=>{setPipChange('0'),setPipStart(val)}}
            keyboardType={'number-pad'}
            style={{backgroundColor:'#fff',borderRadius:5,width:'90%'}}
            />
            <Text style={{fontSize:16,color: colors.binanceylw,marginTop:25}}>Enter End Amount</Text>
            <TextInput
            placeholder="Enter Close Price"
            value={pipEnd}
            keyboardType={'number-pad'}
            onChangeText={(val)=>{setPipChange('0'),setPipEnd(val)}}
            style={{backgroundColor:'#fff',borderRadius:5,width:'90%'}}
            />
            <Text style={{fontSize:14,color:colors.selected,textAlign:'right',alignSelf: 'flex-end',}}>PIP change : <Text style={{fontSize:18,color: colors.binanceylw}}>{pipChange}</Text></Text>
            </View>
           </View>
            
              <View style={{justifyContent: 'center',width:'50%',alignItems: 'center',alignSelf: 'center',}}>
                  <TouchableOpacity onPress={()=>{CalculateIt()}} 
                  style={{backgroundColor:colors.binanceylw,paddingHorizontal:60,marginVertical:20,
                  paddingVertical:10,borderRadius:5}}>
                        <Text style={{color:colors.selected,fontWeight: 'bold'}}>Calculate</Text>
                  </TouchableOpacity>               
                  <TouchableOpacity onPress={()=>{setPipModal(false)}} 
                  style={{backgroundColor:'#6e0919',paddingHorizontal:60,
                  paddingVertical:10,borderRadius:5}}>
                        <Text style={{color:colors.selected,fontWeight: 'bold'}}>CLOSE</Text>
                  </TouchableOpacity>               
              </View>
      </ImageBackground>
    
    </Modal>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5, paddingVertical: 5, marginTop: 35 }}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '40%', alignItems: 'flex-end' }}>
            <View style={{ marginTop: 10, paddingLeft: 15, alignSelf: 'center', alignItems: 'center', }}>
              <Text allowFontScaling={false} style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold', textAlignVertical: 'center', color: colorpick.hg1 }}>
                {sym}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '55%' }}>
           {global.iscopytrade==='True'&&( <FontAwesome onPress={()=>{props.navigation.navigate('CopiersScreen',{sym:sym,side:orderType})}} name={'book'} size={30} style={{marginTop:5}} color={'#EE8580'} />)}
            <View style={{ alignItems: 'center' }}>
             
              <TouchableOpacity onPress={() => { global.notify_count1 = 0, props.navigation.navigate('MessageScreen', { type: "sys", pair: sym,side:orderType }) }} style={{
                borderRadius: 5,
                justifyContent: 'center', paddingHorizontal: 5,  marginTop: 10
              }}>
                <Text allowFontScaling={false} style={{ fontSize: 14, textAlign: 'center', fontWeight: 'bold', textAlignVertical: 'center', color: colorpick.hg1 }}>
                  Log</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => { props.navigation.navigate('TransactionScreen', { sym: sym,side:orderType }) }} style={{ alignItems: 'center', justifyContent: 'center', }}>
              <Text allowFontScaling={false} style={[styles.heading, { color: colorpick.hg1, fontSize: 14 }]}>Transaction</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {props.navigation.navigate('OrderHistory',{sym:sym,from:'tradereview'})}} style={{ alignItems: 'center', justifyContent: 'center', }}>
              <Text allowFontScaling={false} style={[styles.heading, { color: colorpick.hg1, fontSize: 14 }]}>My-Orders</Text>
            </TouchableOpacity>

          </View>

        </View>
        {global.demo == 'true' ?
          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 10,marginLeft: 10 }}>
            <TouchableOpacity onPress={() => { props.navigation.navigate('Hist', { sym: sym,side:orderType,from:'trade' }) }} 
            style={{ backgroundColor: "#29313c",  borderRadius: 5, justifyContent: 'center', height: 38, marginTop: 10,paddingHorizontal:10,display:'none' }}>
              <Text allowFontScaling={false} style={{ fontSize: 15, textAlign: 'center', textAlignVertical: 'center', color: colors.selected }}>
                Trade History</Text>
            </TouchableOpacity>

          
          <TouchableOpacity onPress={() => { props.navigation.navigate('Hist', { sym: sym,side:orderType,from:'order' }) }}
           style={{ backgroundColor: "#29313c",  borderRadius: 5, justifyContent: 'center', height: 38, marginTop: 10,paddingHorizontal:10,display:'none' }}>
            <Text allowFontScaling={false} style={{ fontSize: 15, textAlign: 'center', textAlignVertical: 'center', color: colors.selected }}>
              Order History</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setPipModal(true) }}
           style={{ backgroundColor: "#29313c",  borderRadius: 5, justifyContent: 'center', height: 38, marginTop: 10,paddingHorizontal:10 }}>
            <Text allowFontScaling={false} style={{ fontSize: 15, textAlign: 'center', textAlignVertical: 'center', color: colors.selected }}>
              PIP Calculator</Text>
          </TouchableOpacity>

        </View>

          

          : null
        }
        
        
        <ScrollView style={{ marginBottom: 20 }}>
          {CPrice>0&&SymData ?
          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',padding:15 }}>
              <View>
                <Text style={{color:colors.hgl,fontWeight: 'bold',fontSize:28}}>{CPrice} <Text style={{fontSize:15,color:colors.lgt_text}}>(USD)</Text></Text>
           
              </View>
              <View style={{flexDirection: 'row',width:'50%',justifyContent:'space-between'}}>
              <View style={{flexDirection: 'column',justifyContent:'center'}}>
                <Text style={{color:colors.lgt_text,fontSize:10}}>24h High {'\n'}<Text style={{color:colors.selected}}>{SymData.highPrice}</Text></Text>
                <Text style={{color:colors.lgt_text,fontSize:10}}>24h low {'\n'}<Text style={{color:colors.selected}}>{SymData.lowPrice}</Text></Text>
              </View>
              <View style={{flexDirection: 'column',justifyContent:'center'}}>
                <Text style={{color:colors.lgt_text,fontSize:10}}>24h VOL({sym}) {'\n'}<Text style={{color:colors.selected}}>{SymData.volume}</Text></Text>
                <Text style={{color:colors.lgt_text,fontSize:10}}>24h VOL(USD) {'\n'}<Text style={{color:colors.selected}}>{SymData.quoteVolume}</Text></Text>
              </View>
              </View>
          </View>
  
            
  
            : null
          }
          {/* <TouchableOpacity onPress={()=>{
              showChart(!chart)

          }}>
            <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{color:'#FFFFFF', marginLeft:10, fontSize:15}}>{chart?'Hide':'Show'} Chart </Text>
              <AntDesign name={chart?"caretdown":"caretright"} color="#FFFFFF" size={12} style={{marginTop:7.5}} />
            </View>
          </TouchableOpacity> */}
          {/* {chart && */}
        
          {/* // } */}
          {/* <View style={{  justifyContent: 'center', alignItems: 'center' }}> */}

            {/* <Text style={{ marginLeft: 10, fontSize: 18, color: '#d0d0d0' }}>View </Text> */}
             {/* <TouchableOpacity style={{ alignSelf: 'flex-end', paddingVertical: 5, padding: 10, flexDirection: 'row', backgroundColor:colors.c1,borderRadius:5,
             marginRight:10}}
              onPress={() => {
                
              }}> */}
              {/* <Text style={{ color: colors.selected }}>Show Chart</Text> */}
              {/* <MaterialIcons
                name={"keyboard-arrow-down"} size={28} color={colors.selected} /> */}
            {/* </TouchableOpacity> 
          </View> */}
          <View style={{ marginTop: 5, backgroundColor: 'transparent', width: '100%', borderRadius: 10,
           alignItems: 'center', alignSelf: 'center', paddingBottom: 5, }}>
           

            <View style={{
              elevation: 10, width: '90%', alignSelf: 'center', borderRadius: 20, backgroundColor: 'black', borderColor: '#17181e', elevation: 3,
              flexDirection: 'column', justifyContent: 'space-between', paddingVertical: 5, paddingHorizontal: 0
            }}>
              <View style={{
                flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                width: '100%', paddingTop: 5,  marginLeft: 20
              }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={{ uri: 'https://' + img }}
                    resizeMode={'stretch'}
                    style={{ width: 30, height: 30, marginRight: 10 }}
                  />
                  <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 18 }}>
                    {sym}
                  </Text>
                </View>
                <View style={[orderType&&orderType.toLowerCase()=='buy'?{backgroundColor: colors.profitcolor}:
                      {backgroundColor: colors.losscolor},{width:50,
                      alignItems: 'center',
                      display:(st.toString()==="True")?'flex':'none',
                      
                        borderRadius:5,padding:5,alignSelf: 'center',}]}>
                        <Text style={{ color: colors.selected,fontFamily:global.appFontB,fontSize:11 }}>
                          {orderType}</Text>
                      </View>
                <View style={[orderType&&orderType.toLowerCase()=='buy'?{backgroundColor: colors.profitcolor}:
                      {backgroundColor: colors.losscolor},{width:50,
                      alignItems: 'center',                                          
                        borderRadius:5,padding:5,alignSelf: 'center',}]}>
                          
                         <Pressable hitSlop={40} onPress={()=>{setSymSignal(sym),SignalInfo(sym)}}>
                        {ld?
                              <ActivityIndicator size={'small'} color={colors.selected}/>
                                :
                                <FontAwesome name={'line-chart'} color={colors.selected} size={17} />}
                            </Pressable>     
                      </View>
                <View style={{marginRight:40}}>
                       <TouchableOpacity 
                        onPress={() => {
                         props.navigation.navigate('Positions', {
                           sym: sym,
                           side: 'superbot',
                           img:'https://' + img
                         });
                       }}
                       >
                       <Image                           
                           source={require('../assets/botz/mt5-icon.png')}
                           style={{width:35,height:35}}                            
                           />
                         </TouchableOpacity>
                           
             
                </View>
                {/* {st.toString()==="False"?null:
            <TouchableOpacity onPress={()=>{toggleModal4()}} style={{backgroundColor:global.top21,padding:2,borderRadius:5}}  >
         <Text  allowFontScaling={false} style={{fontSize:14,textAlign: 'center',textAlignVertical:'center',color:colorpick.hg1}}>
            Force{'\n'}Stop</Text>
       </TouchableOpacity>
         } */}
              </View>
              <View
                style={{
                  flexDirection: 'column', justifyContent: 'space-between', width: '100%', borderTopWidth: 0.5, alignSelf: 'center',
                  backgroundColor: "#000000", paddingHorizontal: 35,
                  borderTopColor: '#90909090', paddingVertical: 5, marginTop: 10
                }}>


                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                  <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 12, marginTop: 2 }}>MACD</Text>
                  <TouchableOpacity onPress={() => {
                      getIndicators("macd")
                  }} activeOpacity={0.7}>
                  <View style={{padding:5, backgroundColor:macd=="BUY"?colors.profitcolor: macd=="SELL"?colors.losscolor:"#18a3cb", borderRadius:8}}>
                  <Text allowFontScaling={false} style={{ color: '#FFFFFF', fontSize: 12 }}>{macd}</Text>
                  </View>
                  </TouchableOpacity>
                  <Text  allowFontScaling={false} style={{color:colors.selected,fontSize:12}}>amount (USD)</Text>
                </View> */}

                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                  <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 12, marginTop: 2 }}>SMA</Text>
                  <TouchableOpacity onPress={() => {
                    getIndicators("sma")
                  }} activeOpacity={0.7}>
                  <View style={{padding:5, backgroundColor:sma=="BUY"?colors.profitcolor: sma=="SELL"?colors.losscolor:"#18a3cb", borderRadius:8}}>
                  <Text allowFontScaling={false} style={{ color: '#FFFFFF', fontSize: 12 }}>{sma}</Text>
                  </View>
                  </TouchableOpacity>
                  <Text  allowFontScaling={false} style={{color:colors.selected,fontSize:12}}>amount (USD)</Text>
                </View> */}
                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                  <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 12, marginTop: 2 }}>Bollinger Bands</Text>
                  <TouchableOpacity onPress={() => {
                    getIndicators("bb")
                  }} activeOpacity={0.7}>
                  <View style={{padding:5, backgroundColor:bbands=="BUY"?colors.profitcolor: bbands=="SELL"?colors.losscolor:"#18a3cb", borderRadius:8}}>
                  <Text allowFontScaling={false} style={{ color: '#FFFFFF', fontSize: 12 }}>{bbands}</Text>
                  </View>
                  </TouchableOpacity>
                  <Text  allowFontScaling={false} style={{color:colors.selected,fontSize:12}}>amount (USD)</Text>
                </View> */}


                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                  <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 12 }}>Position amount (USD)</Text>
                  <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>{usdt == undefined ? 0 : parseFloat(usdt).toFixed(3)}</Text>
                  {/* <Text  allowFontScaling={false} style={{color:colors.selected,fontSize:12}}>amount (USD)</Text> */}

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                  <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 12 }}>Avg price</Text>
                  <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>{parseFloat(qty1) === 0 ? 0 : parseFloat(NewAvg).toFixed(3)}</Text>                  

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 12 }}>Numbers of call margin</Text>                  
                  <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>{qty1 == undefined ? 0 : parseFloat(qty1) > 0 ? parseFloat(qty1) < Config.margin_callback_limit ? (parseFloat(qty1) - 1) : Config.margin_callback_limit : 0}</Text>


                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', height: 10, borderBottomWidth: 1, borderColor: colors.selected }}>

                </View>
              </View>
              <View
                style={{
                  flexDirection: 'column', justifyContent: 'space-between', width: '100%', paddingVertical: 3,
                  backgroundColor: "#000000", paddingHorizontal: 35
                }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                  <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 12 }}>Position quantity ({sym.split('USDT')})</Text>
                  <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>{qty == undefined ? 0 : parseFloat(qty).toFixed(3)}</Text>
                  {/* <Text  allowFontScaling={false} style={{color:colors.selected,fontSize:12}}></Text> */}

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                  <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 12 }}>Current price</Text>
                  <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 13 }}>{Data == undefined ? 0 : parseFloat(CPrice).toFixed(6)}</Text>


                </View>
                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                  <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 12 }}>Liquidation Price</Text>
                  <Text allowFontScaling={false} style={{ color: colors.losscolor, fontSize: 14 }}>{liq&&parseFloat(liq).toFixed(5)}</Text>


                </View> */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', fontSize: 15,fontWeight: 'bold' }}>

                  {/* <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>ROE %</Text>
                  {
                  Config.status==true&&parseFloat(CPrice)>0?orderType&&
                  orderType.toLowerCase()=='buy'?
                  <Text allowFontScaling={false} style={{ color: parseFloat(NewAvg) < parseFloat(CPrice) ? colors.profitcolor : colors.losscolor, fontSize: 19,fontWeight: 'bold' }}>{Return_rate_calculate()}%</Text>
                  :
                  <Text allowFontScaling={false} style={{ color: parseFloat(NewAvg) * -1 < parseFloat(CPrice) * -1 ? colors.profitcolor : colors.losscolor, fontSize: 19,fontWeight: 'bold' }}>{Return_rate_calculate() * -1}%</Text>
               :
               <Text allowFontScaling={false} style={{ color:colors.selected, fontSize: 19,fontWeight: 'bold' }}>0%</Text>

                } */}


                </View>
                
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', height: 10, borderBottomWidth: 1, borderColor: colors.selected }}>

                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 35 }}>
            
              {orderType&&orderType.toLowerCase()=='buy'?
                <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 12, }}>Floating{' '}
                  {parseFloat(CPrice).toFixed(6) >
                    parseFloat(avg)
                    ? 'Profit'
                    : 'Loss'}</Text>
                    :
                    <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 12, }}>Floating{' '}
                  {parseFloat(CPrice).toFixed(6) * -1 >
                    parseFloat(avg) * -1
                    ? 'Profit'
                    : 'Loss'}</Text>
                  }
  {
                  Config.status==true&&parseFloat(CPrice)>0?orderType&&
              orderType.toLowerCase()=='buy'?
                  <Text allowFontScaling={false} style={{ color: parseFloat(CPrice).toFixed(6) >  parseFloat(avg) ? colors.profitcolor : colors.losscolor, fontSize: 19,fontWeight: 'bold' }}>
                  {
                    
                  (
                    (parseFloat(CPrice).toFixed(6) -
                      parseFloat(avg)) *
                    parseFloat(qty)
                  ).toFixed(2)}</Text>
                  :
                  <Text allowFontScaling={false} style={{ color:parseFloat(CPrice).toFixed(6) * -1 > parseFloat(avg) * -1? colors.profitcolor : colors.losscolor, fontSize: 19,fontWeight: 'bold' }}>
                  {(
                    (parseFloat(CPrice).toFixed(6) -
                      parseFloat(avg)) *
                    parseFloat(qty)
                  ).toFixed(2) * -1}</Text>
                  :
                  <Text allowFontScaling={false} style={{ color:  colors.selected, fontSize: 19,fontWeight: 'bold' }}>
                 0</Text>
                }
                



              </View>
              {/* <View style={{flexDirection: 'row',alignItems: 'center', justifyContent: 'space-between',width:'100%', backgroundColor:'#000000',paddingBottom:5,paddingHorizontal:35}}>
           <Text  allowFontScaling={false}
                             style={{
                               color: colors.profitcolor,
                               fontSize: 18,
                               fontWeight: 'bold',
                               marginTop: 10,
                             }}>
                             Floating{' '}
                             {parseFloat(CPrice).toFixed(6) >
                             parseFloat(avg)
                               ? 'Profit'
                               : 'Loss'}
                           </Text>
                           <Text  allowFontScaling={false} style={{color: colors.selected}}>
                               {(
                                 (parseFloat(CPrice).toFixed(6) -
                                   parseFloat(avg)) *
                                 parseFloat(qty)
                               ).toFixed(2)}
                             </Text>
           </View> */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 35 }}>
                <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 12 }}>Call margin trigger price</Text>
                <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>{orderType&&orderType.toLowerCase()=='buy'?'<':'>'}</Text>
                {orderType&&orderType.toLowerCase()=='buy'?
                <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>{Config.margin_call_drop != null ? (parseFloat(NewAvg) - ((Config.margin_call_drop.split(',')[qty1 >= 1 ? qty1 - 1 : 0] * 0.01) * parseFloat(NewAvg))).toFixed(3) : 0}</Text>
                :
                <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>{Config.margin_call_drop != null ? (parseFloat(NewAvg) + ((Config.margin_call_drop.split(',')[qty1 >= 1 ? qty1 - 1 : 0] * 0.01) * parseFloat(NewAvg))).toFixed(3) : 0}</Text>
          }
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 35, paddingBottom: 10 }}>
                <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 12 }}>Take profit trigger price</Text>
                <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>{orderType&&orderType.toLowerCase()=='buy'?'>':'<'}</Text>
                {orderType&&orderType.toLowerCase()=='buy'?
                <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>{(parseFloat(NewAvg) + ((parseFloat(Config.whole_position_take_profit) * 0.01) * parseFloat(NewAvg))).toFixed(3)}</Text>
                :
                <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>{(parseFloat(NewAvg) - ((parseFloat(Config.whole_position_take_profit) * 0.01) * parseFloat(NewAvg))).toFixed(3)}</Text>
                }

              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 35, paddingBottom: 10 }}>
                <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 12 }}>Current Mode</Text>
               
                <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}> {Wait ? <ActivityIndicator size={'small'} color={colors.selected} /> : Type.toUpperCase()}</Text>
               
               

              </View>
              
              {/* <Text  allowFontScaling={false} style={{color:colors.vbg,fontSize:15}}>Take profit trigger price      {'>'}     <Text  allowFontScaling={false} style={{color:colors.selected}}>{   (parseFloat(NewAvg)+((parseFloat(Config.whole_position_take_profit)*0.01)*parseFloat(NewAvg))).toFixed(3)}</Text> </Text> */}

              
            </View>
            {parseFloat(NewAvg) > 0 ?
              <View style={{ marginTop: 10, backgroundColor: '#000000', width: '100%', borderRadius: 10, alignItems: 'flex-start', alignSelf: 'center', }}>
                {/* {console.log("newagr is ",NewAvg,"Config.margin_call_drop is"+ Config.margin_call_drop+'qty1 is '+ qty1)}
       {console.log("call margin trigger price *0.0.1 : "+ (Config.margin_call_drop.split(',')[2]))} */}


              </View>


              : null}

          </View>

          <View style={{
            marginTop: 10, backgroundColor: 'transparent', width: '100%', borderRadius: 10,
            alignItems: 'center', alignSelf: 'center', paddingVertical: 0
          }}>

            <View style={{
              width: '100%', alignSelf: 'center', borderRadius: 5, backgroundColor: 'transparent', borderWidth: 0, borderColor: colors.lgt_text,
              flexDirection: 'column', justifyContent: 'space-evenly', paddingVertical: 0, paddingHorizontal: 45
            }}>

              <View
                style={{
                  flexDirection: 'row', justifyContent: 'space-evenly',
                  alignItems: 'center', width: '100%', padding: 0
                }}>
                    
                <TouchableOpacity  onPress={()=>{TradeType()}} style={styles1.bx}>
                   <Image  resizeMode={'stretch'}    style={{  width: 30, height:30,}} source={require('../assets/iconx/cycle.png')} />
                   <Text  allowFontScaling={false} style={[styles1.text,{color:colors.selected,marginTop:10,textAlign: 'center'}]}>{Type==='one-shot'?'cycle':Type==='cycle'?'one-shot':'one-shot'} </Text>
               </TouchableOpacity>  
               <FontAwesome onPress={()=>{setReverse_info(true)}} style={{position: 'absolute',}} name={'info-circle'} color={'#fff'} size={23} />  
               {/* {st === 'True' ?
                <TouchableOpacity onPress={() => { toggleModal4() }} style={styles1.bx}>
                  <Animatable.Image animation={'zoomIn'} duration={1000} useNativeDriver={true} resizeMode={'stretch'} 
                  style={{ width: 30, height: 30, }} source={require('../assets/iconx/icon71.png')} />
                  <Text allowFontScaling={false} style={[styles1.text, { color: colors.selected, marginTop: 10, textAlign: 'center' }]}>Kill Bot</Text>
                </TouchableOpacity>
              :null} */}

                {st === 'False' || st === 'True' ?
                  <TouchableOpacity onPress={() => {
                    if (st.toString() === "False") {
                      ToastAndroid.show("No Bot to stop", ToastAndroid.SHORT)
                    } else {
                      toggleModal3()
                    }
                  }} style={styles1.bx}>
                    <Image  resizeMode={'stretch'} style={{ width: 30, height: 30, }} source={require('../assets/iconx/icon61.png')} />

                    <Text allowFontScaling={false} style={[styles1.text, { color: colors.selected, marginTop: 10, textAlign: 'center' }]}>{BST1 === 'startmargin' || BST1 === undefined || BST1 === '' ? 'Stop' : 'Start'} margin call</Text>

                  </TouchableOpacity>
                  :
                  <View style={styles1.bx}>

                  </View>


                }

              </View>
              <View
                style={{
                  flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10,
                  alignItems: 'center', width: '100%', padding: 0,
                }}>
                <TouchableOpacity onPress={() => {
                  console.log('see result ',Config , CPrice);
                  if(Config.opens==='True'){//||parseFloat(CPrice)==0
                    return
                  }
                  if (Config != undefined && Config != '') {
// sub_bin: sub_bin,
                    props.navigation.navigate('TradeSetting', { sym: sym,price:CPrice, result: Config, st: st, qty1: parseFloat(qty1) - 1,side:orderType ,onReturn: (item) => {setOrderType(item)} })
                  }
                }}
                  style={[styles1.bx]}>
                  <Image  resizeMode={'stretch'} style={{ width: 30, height: 30, }} source={require('../assets/iconx/set.png')} />
                  <Text allowFontScaling={false} style={[styles1.text, { color: colors.selected, marginTop: 10, textAlign: 'center' }]}>Edit Settings</Text>
                </TouchableOpacity>
                <View
             style={{flexDirection: 'row', justifyContent: 'space-evenly',
             alignItems: 'center',padding:0}}>                                                  
             
                <TouchableOpacity onPress={()=>{
                  
                   if(st.toString()==="False"){
                    ToastAndroid.show("No on-going trades available \n start a  trade first",ToastAndroid.SHORT)
                   }else{
                   setInput2(''),setInput1(''),toggleModal2(),setMode(Config.first_order_type),setMP(true), setInput1((parseFloat(CPrice).toFixed(8)).toString()) }}  
                  }
         activeOpacity={1}  style={styles1.bx}>
           {!Config.first_order_type==null?
                <Text style={{position:'absolute',top:5,right:-50,fontSize:12,color:Config.first_order_type==='BUY'?'#00a65a':'#ff0000'}}>
                  
                  {Config.first_order_type==='BUY'?'LONG/BUY':'SELL/SHORT'}
                  
                  </Text>  
                  :null
           }
                <Image  resizeMode={'stretch'}    style={{  width: 30, height:30,}} source={require('../assets/iconx/icon51.png')} />
                   <Text  allowFontScaling={false} style={[styles1.text,{color:colors.selected,marginTop:10,textAlign: 'center'}]}>Open New Positions</Text>
               </TouchableOpacity>                                                            
           </View>
                {/* {st==='False' || st==='True'?                                 */}
                {/* <TouchableOpacity onPress={() => { setCanShow(!canShow) }} style={styles1.bx}>
                  <Animatable.Image animation={'zoomIn'} duration={3000} useNativeDriver={true} resizeMode={'stretch'} style={{ width: 30, height: 30, }}
                    source={require('../assets/iconx/hide.png')} />

                  <Text allowFontScaling={false} style={[styles1.text, { color: colors.selected, marginTop: 10, textAlign: 'center' }]}>{canShow?'Hide Settings':'Show Settings'}</Text>

                </TouchableOpacity> */}


              </View>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: '100%', padding: 10 }}>
                {/* <TouchableOpacity onPress={()=>{toggleModal()}} style={styles1.bx}>
                <Animatable.Image animation={'zoomIn'} duration={2500}  useNativeDriver={true} resizeMode={'stretch'}    style={{  width: 30, height:30,}} source={require('../assets/iconx/icon31.png')} />
                   <Text  allowFontScaling={false} style={[styles1.text,{color:colors.selected,marginTop:10,textAlign: 'center'}]}>Strategy mode</Text>
               </TouchableOpacity>    */}


                {/* {console.log(st)} */}
                {/* {st==='True'?
               
                <TouchableOpacity onPress={()=>{
                 //  let type=BST==='running'?"Pause":'Resume'
                 let type=BST==='running'?"Pause":'Resume'
                 showAlert(type)                    
                } 
               }
                style={[styles1.bx,]}>
                <Animatable.Image animation={'zoomIn'} duration={3500}  useNativeDriver={true}  resizeMode={'stretch'} 
                   style={{  width: 35, height:35,}}
                    source={BST==='running'?require('../assets/iconf/pause.png'):require('../assets/iconf/play.png')} />
                   <Text  allowFontScaling={false} style={[styles1.text,{color:colors.selected,marginTop:10,textAlign: 'center',}]}>{ BST==='running'?"Pause\nTrade":'Resume\nTrade'}</Text>
               </TouchableOpacity>        
             
             :
             <View style={styles1.bx}>

               </View>
               
               
             } */}

              </View>
            </View>
            <View>

              <Modal onBackButtonPress={()=>setReverse_info(false)} statusBarTranslucent={true} deviceHeight={1000} onBackdropPress={()=>setReverse_info(false)} isVisible={Reverse_info} animationInTiming={300} animationOutTiming={200}>
                <View style={{ width: 350, backgroundColor: '#203040', flexDirection: 'column', justifyContent: 'space-around', paddingHorizontal: 35, paddingVertical: 15, borderWidth: 0.5, borderColor: '#70707070', borderRadius: 10, borderBottomWidth: 0 }}>

                  <Text allowFontScaling={false} style={[styles.text_footer, { textAlign: 'center', color: colors.selected }]}>NOTE (Cycle/Reverse Mode) : If The Trade Is Cut In Stop Loss , It Will Automatically Add Trade In The Reverse Direction With Same Settings. If Trade Cuts In Profit Then It Will Add Trade In Same Direction</Text>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', width: '100%' }}>
                    <TouchableOpacity onPress={() => { setReverse_info(false) }}>
                      <View style={{ marginTop: 5, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                        <Text allowFontScaling={false} style={{ color: colors.hgl, fontWeight: 'bold', fontSize: 17 }}>Cancel</Text>
                      </View>
                    </TouchableOpacity>

                    
                  </View>
                </View>


              </Modal>
              <Modal onBackButtonPress={toggleModal1} statusBarTranslucent={true} deviceHeight={1000} onBackdropPress={toggleModal1} isVisible={isModal1Visible} animationInTiming={300} animationOutTiming={200}>
                <View style={{ width: 350, backgroundColor: '#203040', flexDirection: 'column', justifyContent: 'space-around', paddingHorizontal: 35, paddingVertical: 15, borderWidth: 0.5, borderColor: '#70707070', borderRadius: 10, borderBottomWidth: 0 }}>

                  <Text allowFontScaling={false} style={[styles.text_footer, { textAlign: 'center', color: colors.selected }]}>Are you sure you want to stop the BOT?</Text>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', width: '100%' }}>
                    <TouchableOpacity onPress={() => { toggleModal1() }}>
                      <View style={{ marginTop: 5, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                        <Text allowFontScaling={false} style={{ color: colors.hgl, fontWeight: 'bold', fontSize: 17 }}>Cancel</Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                      // console.log(BST)
                      if (!StopCalled) {
                        if (st === 'True') {
                          setStopCalled(true)
                          stopApi()
                        }
                      }
                    }}>
                      <View style={{ marginTop: 5, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                        <Text allowFontScaling={false} style={{ color: '#f5f5f5', fontWeight: 'bold', fontSize: 17 }}>Confirm {StopCalled ? <ActivityIndicator size={'small'} color="#fff" /> : null}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>


              </Modal>
              <Modal onBackButtonPress={toggleModal4} statusBarTranslucent={true} deviceHeight={1000} onBackdropPress={toggleModal4} isVisible={isModal4Visible} animationInTiming={300} animationOutTiming={200}>
                <View style={{ width: 350, backgroundColor: '#203040', flexDirection: 'column', justifyContent: 'space-around', paddingHorizontal: 35, paddingVertical: 15, borderWidth: 0.5, borderColor: '#70707070', borderRadius: 10, borderBottomWidth: 0 }}>

                  <Text allowFontScaling={false} style={[styles.text_footer, { textAlign: 'center', color: colors.selected }]}>Are you sure you want to Kill the BOT?</Text>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', width: '100%' }}>
                    <TouchableOpacity onPress={() => { toggleModal4() }}>
                      <View style={{ marginTop: 5, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                        <Text allowFontScaling={false} style={{ color: colors.hgl, fontWeight: 'bold', fontSize: 17 }}>Cancel</Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                      // console.log(BST)
                      kill_bot()
                      toggleModal4()
                    }}>
                      <View style={{ marginTop: 5, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                        <Text allowFontScaling={false} style={{ color: '#f5f5f5', fontWeight: 'bold', fontSize: 17 }}>Confirm </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>


              </Modal>
            </View>
            <View>

              <Modal onBackButtonPress={toggleModal3} statusBarTranslucent={true} deviceHeight={1000} onBackdropPress={toggleModal3} isVisible={isModal3Visible} animationInTiming={300} animationOutTiming={200}>
                <View style={{ width: 350, backgroundColor: '#203040', flexDirection: 'column', justifyContent: 'space-around', paddingHorizontal: 35, paddingVertical: 15, borderWidth: 0.5, borderColor: '#70707070', borderRadius: 10, borderBottomWidth: 0 }}>

                  <Text allowFontScaling={false} style={[styles.text_footer, { textAlign: 'center', color: colors.selected, marginBottom: 10 }]}>Are you sure you want to {BST1 === 'stopmargin' ? 'startmargin' : BST1 === '' ? 'stopmargin' : 'stopmargin'} call?</Text>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', width: '100%' }}>
                    <TouchableOpacity onPress={() => { toggleModal3() }}>
                      <View style={{ marginTop: 5, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                        <Text allowFontScaling={false} style={{ color: colors.hgl, fontWeight: 'bold', fontSize: 17 }}>Cancel</Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                      // console.log(BST1)

                      if (BST1 === 'startmargin') {
                        marginCall('stopmargin')
                      } else {
                        marginCall('startmargin')
                      }

                    }}>
                      <View style={{ marginTop: 5, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                        <Text allowFontScaling={false} style={{ color: '#f5f5f5', fontWeight: 'bold', fontSize: 17 }}>Confirm</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>


              </Modal>
            </View>


          </View>

          {/* Chart screen starts here  */}
          {/* <View style={{flexDirection: 'row',justifyContent: 'space-around',alignItems: 'center',marginVertical:15}}>
<Text  allowFontScaling={false} style={[styles.text,{fontSize:16}]}>View Chart</Text>

<Switch
             trackColor={{false: colors.vbg, true: '#FE8B06'}}
             thumbColor={isSwitchOn ? '#f4f3f4' : '#f4f3f4'}
             ios_backgroundColor="#3e3e3e"
             onValueChange={onToggleSwitch}
             value={isSwitchOn}
           />
</View>
{isSwitchOn?
<ChartScreen  pair={sym} />
:null} */}

          {/* Chart screen ends here  */}



          {/* <View style={{marginTop:10,backgroundColor:'transparent',width:'100%',borderRadius:10,alignItems: 'center',alignSelf: 'center',paddingVertical:10, borderWidth:2, borderColor:'#17181e', elevation:3,}}>
           
           <View style={{elevation:10,width:'90%',alignSelf: 'center',borderRadius:5,backgroundColor:global.topnavyBlue,flexDirection:'column',justifyContent: 'space-evenly',paddingVertical:10,paddingHorizontal:35}}>
           <View style={{flexDirection:'row',justifyContent: 'space-between',borderRadius:5,marginTop:10,alignItems: 'center',width:'100%',
           paddingVertical:0,paddingHorizontal:5,}}>
           <Text  allowFontScaling={false} style={[styles1.text,{color:colors.selected,fontSize:17,textAlign: 'center',width:'100%'}]}>Operation Reminder</Text>                         
           </View>
           <Text  allowFontScaling={false} style={[styles1.text,{color:colors.selected,marginTop:10,textAlign: 'center'}]}>When your bot is operating, please do not operate the trade by yourself, this may cause abnormal behaviour by the app.</Text>
           
           </View>
       {/* 103.224.241.238 
       </View> */}



          <Modal onBackButtonPress={toggleModal} statusBarTranslucent={true} deviceHeight={1000} onBackdropPress={toggleModal} isVisible={isModalVisible} animationInTiming={300} animationOutTiming={200}>

            <View style={{ width: 300, alignSelf: 'center', backgroundColor: colors.background, flexDirection: 'column', justifyContent: 'space-around', paddingHorizontal: 35, paddingVertical: 15, borderWidth: 0.5, borderColor: '#70707070', borderRadius: 10, borderBottomWidth: 0 }}>

              <Text allowFontScaling={false} style={[styles.mheading, { textAlign: 'center', color: '#d9d9d9' }]}>Strategy Mode</Text>
              <Text allowFontScaling={false} style={[styles.text, { textAlign: 'center', color: '#cccccc' }]}>Please select a strategy mode</Text>
              <View style={{ width: '100%', backgroundColor: colors.hdl, elevation: 6, alignSelf: 'flex-start', paddingVertical: 10, paddingHorizontal: 10, marginVertical: 10, borderRadius: 5, flexDirection: 'column', justifyContent: 'space-between', }}>
                <TouchableOpacity onPress={() => { global.strategy = ("wwm"), setStrategy('wwm') }} style={{ marginVertical: 10 }}>
                  <View style={{ marginTop: 5, flexDirection: 'row', justifyContent: 'space-between', borderRadius: 5 }}>
                    <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>Whole warehouse mode</Text>
                    <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>{Strategy === 'wwm' ? <IonIcons name={'checkmark-sharp'} size={20} /> : null}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { global.strategy = ("sbm"), setStrategy('sbm') }} style={{ marginVertical: 10 }}>
                  <View style={{ marginTop: 5, flexDirection: 'row', justifyContent: 'space-between', borderRadius: 5 }}>
                    <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>Sub-bin mode</Text>
                    <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>{Strategy === 'sbm' ? <IonIcons name={'checkmark-sharp'} size={20} /> : null}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { global.strategy = ("sbr"), setStrategy('sbr') }} style={{ marginVertical: 10 }}>
                  <View style={{ marginTop: 5, flexDirection: 'row', justifyContent: 'space-between', borderRadius: 5 }}>
                    <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>sub-bin mode Real time settlement</Text>
                    <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>{Strategy === 'sbr' ? <IonIcons name={'checkmark-sharp'} size={20} /> : null}</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', width: '100%' }}>
                <TouchableOpacity onPress={() => { toggleModal() }}>
                  <View style={{ marginTop: 5, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                    <Text allowFontScaling={false} style={{ color: '#cccccc', fontWeight: 'bold', fontSize: 17 }}>Cancel</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { toggleModal() }}>
                  <View style={{ marginTop: 5, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                    <Text allowFontScaling={false} style={{ color: colors.hdl, fontWeight: 'bold', fontSize: 17 }}>Confirm</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>


          </Modal>


          <Modal onBackButtonPress={toggleModal2} onBackdropPress={toggleModal2} isVisible={isModal2Visible} animationInTiming={300} animationOutTiming={200}>

            <View style={{ width: 350, alignSelf: 'center', backgroundColor: colors.background, flexDirection: 'column', justifyContent: 'space-around', paddingHorizontal: 15, paddingVertical: 15, borderWidth: 0.5, borderColor: '#70707070', borderRadius: 10, borderBottomWidth: 0 }}>

              <Text allowFontScaling={false} style={[styles.sheading, { textAlign: 'center', color: colors.selected }]}>Add Avg Margin</Text>
              <View style={{ width: '100%', backgroundColor: colors.background, borderWidth: 0.1, borderColor: colors.border, alignSelf: 'flex-start', paddingVertical: 10, paddingHorizontal: 10, marginVertical: 10, borderRadius: 5, flexDirection: 'column', justifyContent: 'space-between', }}>
                <View style={{ marginVertical: 5 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderRadius: 5 }}>
                    <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>Position amount</Text>
                    <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>{usdt == undefined ? 0 : usdt} USDT</Text>
                  </View>
                </View>
                <View style={{ marginVertical: 5 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderRadius: 5 }}>
                    <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>Avg price </Text>
                    <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>{parseFloat(qty1) === 0 ? 0 : parseFloat(NewAvg).toFixed(2)} USDT</Text>
                  </View>
                </View>
                <View style={{ marginVertical: 5 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderRadius: 5 }}>
                    <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>Position quantity</Text>
                    <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>{qty == undefined ? 0 : qty} {sym.split('USDT')}</Text>
                  </View>
                </View>
                <View style={{ marginVertical: 5 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderRadius: 5 }}>
                    <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>Current price</Text>
                    <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15, color: '#2da4fe' }}>{parseFloat(CPrice).toFixed(8)}  USDT</Text>
                  </View>
                </View>
                <View style={{ marginVertical: 5 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderRadius: 5 }}>
                    <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>Position profit and loss </Text>
                    <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}> {Profit_rate_calculate()}%    </Text>
                  </View>
                </View>
                {Mode === 'buy' ?
                  <View>
                    <TouchableOpacity onPress={() => { global.strategy = ("sbr"), setStrategy('sbr') }} style={{ marginVertical: 10 }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderRadius: 5 }}>
                        <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>Estimated Avg Price </Text>
                        <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>{Input1 != '' ? isNaN(parseFloat(NewAvg1)) ? '0' : (parseFloat(NewAvg1)*Config.leverage).toFixed(2) : '-'}</Text>
                      </View>
                    </TouchableOpacity>
                    <View style={{ marginVertical: 5 }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderRadius: 5 }}>
                        <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>Estimated Holding {'\n'} profit and loss </Text>
                        <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>{(parseFloat(estimated_pnl())*parseFloat(Config.leverage)).toFixed(4)}</Text>
                      </View>
                    </View>
                  </View>
                  :
                  null
                }
                <View style={{ marginVertical: 5, width: '100%' }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderRadius: 5 }}>
                    <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>Trigger price (Sell at market price after reaching the trigger price )</Text>

                  </View>
                </View>
                <View style={{ width: '100%' }}>
                  <View style={{ marginTop: 5, flexDirection: 'row', justifyContent: 'space-between', borderRadius: 5 }}>
                    <TextInput
                      keyboardType={'number-pad'}
                      autoCapitalize="none"
                      onChangeText={(val) => { setInput1(val) }}
                      value={parseFloat(CPrice).toFixed(8)}
                      color={colors.dark_text}
                      placeholder={'Please Enter Trigger Price'}
                      placeholderTextColor={colors.lgt_text}
                      width={'60%'}
                      editable={MP ? false : true}
                      height={40}
                      style={{ marginTop: 5, backgroundColor: '#e8f2fc', }}
                      selectionColor={colors.selected}
                    />


                    <TouchableOpacity disabled={true}  style={{ backgroundColor: MP ? '#2da4fe' : '#e8f2fc', borderRadius: 5, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5 }}>
                      <View style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center', }}>
                        <Text allowFontScaling={false} style={{ color: MP ? colors.selected : colors.dark_text, fontSize: 16 }}>Market Price</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                <View>
                  <View >
                    <View style={{ marginTop: 5, flexDirection: 'row', justifyContent: 'space-between', borderRadius: 5 }}>
                      <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>{'Amount of Avg Margin Call'}</Text>
                      <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15 }}>{Strategy === 'sbr' ? <IonIcons name={'checkmark-sharp'} size={20} /> : null}</Text>
                    </View>
                  </View>
                  <View style={{ marginVertical: 5, width: '100%' }}>
                    <KeyboardAvoidingView style={{ marginTop: 5, backgroundColor: '#e8f2fc', flexDirection: 'row', justifyContent: 'space-between', borderRadius: 5 }}>

                      <TextInput
                        keyboardType={'number-pad'}
                        autoCapitalize="none"
                        onChangeText={


                          (val) => {


                            setTotalAmount((parseFloat(Config.leverage)*parseFloat(val)).toFixed(4))


                            setInput2(val)

                            let newqty = parseFloat(val) / parseFloat(Input1)
                            newqty = parseFloat(newqty) + parseFloat(qty)
                            let total_fund = parseFloat(usdt) + parseFloat(val)

                            let new_calculated_avg = total_fund / (newqty)
                            setNewAvg1(new_calculated_avg)
                            // console.log('valueis' + val)
                            //                           console.log('totalqty' + newqty)
                            //                           console.log('totalfundinv' + total_fund)


                          }}
                        value={Mode === 'sell' ? Input2 : Input2}

                        color={colors.dark_text}
                        placeholderTextColor={colors.lgt_text}
                        placeholder={Mode === 'buy' ? 'Enter Purchase Amount' : 'Enter Purchase Amount'}
                        width={'60%'}
                       
                        height={40}
                        style={{ marginTop: 5, color: 'black' }}
                        selectionColor={'black'}
                      />



                      <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 5 }}>
                        <View style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                          <Text allowFontScaling={false} style={{ color: colors.dark_text, fontSize: 17, }}>{Mode === 'buy' ? 'USDT' : 'USDT'}</Text>
                        </View>
                      </View>                                                                                  
                    </KeyboardAvoidingView>                    
                  </View>
                </View>
                {Mode !== 'xx' ? null :
                  <View>
                    {/* <View style={{marginVertical:10}}>
                   <View style={{marginTop:5,flexDirection:'row',justifyContent:'space-between',borderRadius:5}}>
                   <Text  allowFontScaling={false} style={{color:colors.selected,fontSize:15}}>Remaining position amount</Text>
                   <Text  allowFontScaling={false} style={{color:colors.selected,fontSize:15}}>{isNaN(parseFloat(RPA))? usdt==undefined?0:usdt: parseFloat(RPA).toFixed(2)}</Text>
                   </View>
               </View> */}
                    <View style={{ backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'space-evenly', borderTopLeftRadius: 25, borderTopRightRadius: 25, }}>
                      {/*                                       
                                 {TabPress?
                                 <TouchableOpacity style={{backgroundColor:'#2da4fe',borderRadius:5}} onPress={()=>{SelectedIndex(25)}}>
                                 <View style={[styles1.btn1]}>
                                     <Text  allowFontScaling={false} style={{color:'#f5f5f5'}}>25%</Text>
                                 </View>
                                 </TouchableOpacity> 
                                     :
                                 <TouchableOpacity style={{backgroundColor:colors.lgt_text,borderRadius:5}} onPress={()=>{SelectedIndex(25)}}>
                                     <View style={styles1.btn1}>
                                         <Text  allowFontScaling={false} style={{color:'#fff'}}>25%</Text>
                                     </View>
                                 </TouchableOpacity>
                                 }
             
                                 {Tab1Press?
                                 <TouchableOpacity  style={{backgroundColor:'#2da4fe',borderRadius:5}} onPress={()=>{SelectedIndex(50)}}>
                                 <View style={[styles1.btn1]}>
                                     <Text  allowFontScaling={false} style={{color:'#f5f5f5'}}>50%</Text>
                                 </View>
                                 </TouchableOpacity> 
                                     :
                                 <TouchableOpacity style={{backgroundColor:colors.lgt_text,borderRadius:5}} onPress={()=>{SelectedIndex(50)}}>
                                     <View style={styles1.btn1}>
                                         <Text  allowFontScaling={false} style={{color:'#fff'}}>50%</Text>
                                     </View>
                                 </TouchableOpacity>
                                 }
                                 {Tab2Press?
                                 <TouchableOpacity style={{backgroundColor:'#2da4fe',borderRadius:5}} onPress={()=>{SelectedIndex(75)}}>
                                 <View style={[styles1.btn1]}>
                                     <Text  allowFontScaling={false} style={{color:'#f5f5f5'}}>75%</Text>
                                 </View>
                                 </TouchableOpacity> 
                                     :
                                 <TouchableOpacity style={{backgroundColor:colors.lgt_text,borderRadius:5}} onPress={()=>{SelectedIndex(75)}}>
                                     <View style={styles1.btn1}>
                                         <Text  allowFontScaling={false} style={{color:'#fff'}}>75%</Text>
                                     </View>
                                 </TouchableOpacity>
                                 } */}
                      {/* {Tab3Press? */}
                      <TouchableOpacity style={{ backgroundColor: '#2da4fe', borderRadius: 5 }} activeOpacity={1}>
                        <View style={[styles1.btn1]}>
                          <Text allowFontScaling={false} style={{ color: '#f5f5f5' }}>100%</Text>
                        </View>
                      </TouchableOpacity>
                      {/* :
                                 <TouchableOpacity style={{backgroundColor:colors.lgt_text,borderRadius:5}} onPress={()=>{SelectedIndex(100)}}>
                                     <View style={styles1.btn1}>
                                         <Text  allowFontScaling={false} style={{color:'#fff'}}>100%</Text>
                                     </View>
                                 </TouchableOpacity>
                                 } */}


                    </View>

                  </View>

                }
              </View>
              <View style={{display:keyboardStatus?'none':'flex',flexDirection: 'row',justifyContent: 'space-between',}}>

              <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15,marginTop:5 }}>Leverage : {Config.leverage}x</Text>
                    <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 15,marginTop:5 }}>Total Amount : {total_amount}</Text>
              </View>
              <View  style={{display:keyboardStatus?'none':'flex',flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', width: '100%' }}>
                <TouchableOpacity onPress={() => { toggleModal2() }}>
                  <View style={{ marginTop: 5, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                    <Text allowFontScaling={false} style={{ color: colors.selected, fontWeight: 'bold', fontSize: 17 }}>Cancel</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                   console.log("Input1is" + Mode)
                   
                  // console.log("Input2is" + Input2)
                  if (Click_buy) {

                     if (Input1 != '' && Input2 != '') {
                       setP_order(true)
                       placeOrder(Mode)
                       setClick_buy(false)
                       setTimeout(() => {
                         setClick_buy(true)
                       }, 15000)

                     } else {
                       ToastAndroid.show("Please fill all  the details ", ToastAndroid.SHORT)
                     }
                  }

                }}
                
                
                >
                  <View style={{ marginTop: 5, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                    <Text allowFontScaling={false} style={{ color: colors.hgl, fontWeight: 'bold', fontSize: 17 }}>Confirm  {P_order ? <ActivityIndicator size={'small'} color="#000" /> : null}  </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>


          </Modal>


          {hedge&&(
                      <View style={{flexDirection: 'row',justifyContent: 'space-around',}}>
                        <Text allowFontScaling={false} style={{ color: colors.vbg, fontSize: 15,marginTop:10,textAlign: 'center'}}>
                          Order Side :   
                        </Text>                                                                                          
                                {/* <List.Accordion                                 
                                  left={props =>  <Text style={{fontSize:20,color: colors.selected,marginLeft:10}}>{orderType}</Text>  }
                                  expanded={Order_sideShow}
                                  style={{width: 200,padding:0}}                                  
                                  onPress={()=>{setOrder_sideShow(!Order_sideShow)}}>                                    
                                  <List.Item titleStyle={{color:colors.hgl}}    onPress={()=>{setOrderType('BUY'),setOrder_sideShow(!Order_sideShow),getTrade(Uid,'BUY')}}  title="BUY" />
                                  <List.Item titleStyle={{color:colors.hgl}}  onPress={()=>{setOrderType('SELL'),setOrder_sideShow(!Order_sideShow),getTrade(Uid,'SELL')}} title="SELL" />
                                </List.Accordion>   */}
<View style={{flexDirection:'row',justifyContent:'space-evenly',alignItems: 'center',}}>
                                  <Text style={[styles1.text,{color:'#fff'}]}>Buy</Text>
        <RadioButton
                // disabled={st === 'True'?true:false}
                status={ orderType=='BUY' ? 'checked':'unchecked' }
                color={'#ffffff'}
                uncheckedColor={'#ffffff'}
                onPress={() => {setOrderType('BUY'),setOrder_sideShow(!Order_sideShow),getTrade(Uid,'BUY',Token)}}
              />
       
       
       </View>

                                <View style={{flexDirection:'row',justifyContent:'space-evenly',alignItems: 'center',}}>
                                  <Text style={[styles1.text,{color:'#fff'}]}>Sell</Text>
        <RadioButton
                // disabled={st === 'True'?true:false}
                status={ orderType=='SELL' ? 'checked':'unchecked' }
                color={'#ffffff'}
                uncheckedColor={'#ffffff'}
                onPress={()=>{setOrderType('SELL'),setOrder_sideShow(!Order_sideShow),getTrade(Uid,'SELL',Token)}}
                
              />
       
       
       </View>
                                

                      </View>
                      
                    )
                    
                    }
                    
                    
          {st.toString()==='False'&&parseFloat(CPrice)>0&&(
            
                      <View style={{flexDirection: 'row',justifyContent: 'space-around',marginTop:10}}>
                        <Text allowFontScaling={false} style={{ color: colors.vbg, fontSize: 15,marginTop:10,textAlign: 'center'}}>
                          Order Type : 
                        </Text>                                                                                          
                                <List.Accordion                                 
                                  left={props =>  <Text style={{fontSize:20,color: colors.selectednew,marginLeft:10}}>{start_type}</Text>  }
                                  expanded={listShow}
                                  style={{width: 200,padding:0}}                                  
                                  onPress={()=>{setListShow(!listShow)}}>                                    
                                  <List.Item titleStyle={{color:colors.hgl}}    onPress={()=>{setStart_type('Market'),setListShow(!listShow)}}  title="Market" />
                                  <List.Item titleStyle={{color:colors.hgl}}  onPress={()=>{setLimit(CPrice),setStart_type('Limit'),setListShow(!listShow)}} title="Limit" />
                                </List.Accordion>                       
                      </View>
                    )}

          {st.toString()==='False'&& start_type==='Limit'&&(
                      <View style={{flexDirection: 'column',alignItems:'center',justifyContent: 'space-around',marginTop:10}}>
                         <TextInput
                          placeholder="Enter Price"
                          style={{borderWidth:0.5,borderColor:colors.binanceylw,borderRadius:5}}
                          color={colors.binanceylw}
                          keyboardType={'number-pad'}
                          autoCapitalize="none"
                          value={limit.toString()}                          
                          onChangeText={(val) => setLimit(val)}
                          width={'90%'}
                          selectionColor={colors.binanceylw}                          
                          placeholderTextColor={'#a2a2a2'}
                          />
                          <View style={{flexDirection:'row',justifyContent: 'space-around',marginLeft:20,display:global.AMT == 0 ?'none':'flex'}}>                                                 
                          <TouchableOpacity
                          disabled={Best_sell?true:false}
                              onPress={() => { Best_price_get('sell'),setBest_sell(true) }}
                              style={[styles.header, {  alignSelf: 'flex-start', marginRight: 20,backgroundColor:'#3F4254',marginTop:10,borderRadius:5 }]}>                                                                
                                  <ActivityIndicator style={{display:Best_sell?'flex':'none'}} size={'small'} color={'#fff'} />                                
                                <View style={{display:!Best_sell?'flex':'none',flexDirection:'row',justifyContent: 'space-around',alignItems:'center'}}>
                                  <Text style={{ color: colors.selected, fontSize: 12, padding: 5,textAlign: 'center'}}>Get Best Price For {'\n'}<Text style={{color:'#ff0000',fontWeight: 'bold'}}>SHORT    </Text></Text>
                                  <MaterialIcons onPress={()=>{
                                    Alert.alert('this is the best Price you get for SELL order')
                                  }} name='info-outline' color={'#fff'} size={25}   />
                                </View>
                          </TouchableOpacity>
                          <TouchableOpacity
                          disabled={Best_buy?true:false}
                              onPress={() => { Best_price_get('buy'),setBest_buy(true) }}
                              style={[styles.header, {  alignSelf: 'flex-start', marginRight: 20,backgroundColor:'#3F4254',marginTop:10,borderRadius:5 }]}>
                                <ActivityIndicator style={{display:Best_buy?'flex':'none'}} size={'small'} color={'#fff'} />
                                <View style={{display:!Best_buy?'flex':'none',flexDirection:'row',justifyContent: 'space-around',alignItems:'center'}}>
                                  <Text style={{ color: colors.selected, fontSize: 12, padding: 5,textAlign: 'center'}}>Get Best Price For {'\n'}<Text style={{color:'#00a65a',fontWeight: 'bold'}}>LONG    </Text></Text>
                                  <MaterialIcons onPress={()=>{
                                    Alert.alert('this is the best Price you get for BUY order')
                                  }} name='info-outline' color={'#fff'} size={25}   />
                                </View>
                          </TouchableOpacity>
                          </View>
                      </View>
                    )}


          <TouchableOpacity activeOpacity={1} onPress={() => {
            console.log('see it: '+CPrice);
            if(Config.opens==='True'//||parseFloat(CPrice)==0
            ){
              return
            }
            if (Config != undefined && Config != '') {

              props.navigation.navigate('TradeSetting', { sym: sym,price:CPrice, result: Config, st: st, qty1: parseFloat(qty1) - 1,side:orderType,onReturn: (item) => {setOrderType(item)} })
            }
          }} style={{ marginTop: 10, backgroundColor: 'transparent', width: '100%', borderRadius: 10, alignItems: 'center', alignSelf: 'center', paddingVertical: 10,}}>
            {
              canShow ?
                <View style={{
                  width: '90%', alignSelf: 'center', borderRadius: 5, backgroundColor: 'transparent', borderWidth: 0, borderColor: 'white',
                  flexDirection: 'column', justifyContent: 'space-evenly', paddingVertical: 5, paddingHorizontal: 15
                }}>
                    {/* {st.toString()==='False'&&(
                      <>
                      <Text allowFontScaling={false} style={{ color: colors.vbg, fontSize: 15,textAlign: 'center',display: liq_calculator(Config.first_buy_in_amount,'BUY')==0?'none':'flex'}}>
                       Est. Liq Price on BUY order : <Text style={{color:'#fff'}}>{liq_calculator(Config.first_buy_in_amount,'BUY')}</Text> 
                      </Text>
                     <Text allowFontScaling={false} style={{ color: colors.vbg, fontSize: 15,textAlign: 'center',display: liq_calculator(Config.first_buy_in_amount,'SELL')==0?'none':'flex'}}>
                        Est. Liq Price on SELL order :  <Text style={{color:'#fff'}}>{liq_calculator(Config.first_buy_in_amount,'SELL')}</Text>
                      </Text>
                      </>
                    )} */}

                   
                 
                      {/* {Config.opens==='True'||parseFloat(CPrice)==0?
                      <Text allowFontScaling={false} style={{ color: colors.selected,marginTop:20, fontSize: 15,textAlign: 'center'}}>
                       <ActivityIndicator size={18} color={colors.selected}  /> Loading Please Wait...!
                      </Text>
                      :null} */}

                     {hedge? <Text allowFontScaling={false} style={{ color: colors.border, fontSize: 15,textAlign: 'center',fontSize:20,marginVertical:10}}>
                        Settings For {orderType} / {orderType=='BUY'?'LONG':'SHORT'} 
                      </Text>:null}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.5, borderColor: '#90909090', paddingBottom: 5 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start',alignItems: 'center',
                     width: 150, paddingTop: 5, borderRightWidth: 0.5, borderColor: '#90909090' }}>
                      <Image
                        source={require('../assets/iconf/icon2.png')}
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
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: 150,alignItems: 'center', paddingTop: 5, paddingLeft: 5 }}>
                      <Image
                        source={require('../assets/iconf/icon3.png')}
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
                    <View style={{ flexDirection: 'row',alignItems: 'center', justifyContent: 'flex-start', width: 150, paddingTop: 5, borderRightWidth: 0.5, borderColor: '#90909090' }}>
                      <Image
                        source={require('../assets/iconf/icon4.png')}
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
                    <View style={{ flexDirection: 'row',alignItems: 'center', justifyContent: 'flex-start', width: 150, paddingTop: 5, paddingLeft: 5 }}>
                      <Image
                        source={require('../assets/iconf/icon1.png')}
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
                    <View style={{ flexDirection: 'row',alignItems: 'center', justifyContent: 'flex-start', width: 150, paddingTop: 5, borderRightWidth: 0.5, borderColor: '#90909090' }}>
                      <Image
                        source={require('../assets/iconf/icon6.png')}
                        resizeMode={'stretch'}
                        style={{ width: 16, height: 16, marginRight: 10 }}
                      />
                      <Text allowFontScaling={false} style={{ color: colors.vbg, fontSize: 12, width: 80 }}>
                        Margin Call Drop
                      </Text>
                      <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 14, marginLeft: 10 }}>

                        {
                          (parseFloat(qty1) >= 0) ? (
                            (Config.margin_call_drop != null) ? Config.margin_call_drop.split(',')[qty1 >= 1 ? qty1 - 1 : 0] : 0) : 0

                        }
                      </Text>

                    </View>
                    <View style={{ flexDirection: 'row',alignItems: 'center', justifyContent: 'flex-start', width: 150, paddingTop: 5, paddingLeft: 5 }}>
                      <Image
                        source={require('../assets/iconf/icon5.png')}
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
                    <View style={{ flexDirection: 'row',alignItems: 'center', justifyContent: 'flex-start', width: 150, paddingTop: 5, borderRightWidth: 0.5, borderColor: '#90909090' }}>
                      <Image
                        source={require('../assets/iconf/icon6.png')}
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
                    <View style={{ flexDirection: 'row',alignItems: 'center', justifyContent: 'flex-start', width: 150, paddingTop: 5, paddingLeft: 5 }}>
                      <Image
                        source={require('../assets/iconf/icon5.png')}
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
                    {/* <View style={{ flexDirection: 'row',alignItems: 'center', justifyContent: 'flex-start', width: 150, paddingTop: 5, paddingLeft: 5 }}>
                      <Image
                        source={require('../assets/iconf/icon5.png')}
                        resizeMode={'stretch'}
                        style={{ width: 16, height: 16, marginRight: 10 }}
                      />
                      <Text allowFontScaling={false} style={{ color: colors.vbg, fontSize: 12, width: 80 }}>
                        Liqudation Notify Percentage
                      </Text>
                      <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 14, marginLeft: 10 }}>
                        {Config.liq_notify_percent}
                      </Text>

                    </View> */}
                  </View>




                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 5 ,display:'none'}}>
                    <View style={{ flexDirection: 'row',alignItems: 'center', justifyContent: 'flex-start', width: 150, paddingTop: 5, borderRightWidth: 0.5, borderColor: '#90909090' }}>
                      <Image
                        source={require('../assets/iconf/icon6.png')}
                        resizeMode={'stretch'}
                        style={{ width: 16, height: 16, marginRight: 10 }}
                      />
                      <Text allowFontScaling={false} style={{ color: colors.vbg, fontSize: 12, width: 80 }}>
                        Leverage
                      </Text>
                      <Text allowFontScaling={false} style={{ color: colors.losscolor, fontSize: 15, marginLeft: 10 }}>

                        {
                          Config.leverage
                        }x
                      </Text>

                    </View>
                    <View style={{ flexDirection: 'row',alignItems: 'center', justifyContent: 'flex-start', width: 150, paddingTop: 5, paddingLeft: 5 }}>
                      <Image
                        source={require('../assets/iconf/icon5.png')}
                        resizeMode={'stretch'}
                        style={{ width: 16, height: 16, marginRight: 10 }}
                      />
                      <Text allowFontScaling={false} style={{ color: colors.vbg, fontSize: 12, width: 80 }}>
                        Total Order Amount
                      </Text>
                      <Text allowFontScaling={false} style={{ color: colors.selected, fontSize: 14, marginLeft: 10 }}>
                        {Config.first_buy_in_amount * Config.leverage}
                      </Text>

                    </View>
                    
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 5 }}>
                    {/* <View style={{ flexDirection: 'row',alignItems: 'center', justifyContent: 'flex-start', width: 150, paddingTop: 5, borderRightWidth: 0.5, borderColor: '#90909090' }}>
                      <Image
                        source={require('../assets/iconf/icon6.png')}
                        resizeMode={'stretch'}
                        style={{ width: 16, height: 16, marginRight: 10 }}
                      />
                      <Text allowFontScaling={false} style={{ color: colors.vbg, fontSize: 12, width: 80 }}>
                        BTC CallBack 
                      </Text>
                      <Text allowFontScaling={false} style={{ color: colors.losscolor, fontSize: 15, marginLeft: 10 }}>

                        {
                          Config.btc_callback
                        }
                      </Text>

                    </View> */}
                   
                    
                  </View>
                  
                </View>
                : null
            }
          </TouchableOpacity>
            {iscopy==='True'?
            <View >
                <Text style={{color: colors.selected,textAlign: 'center',}}>Note - This Is An Ongoing Copy Trade. But You Can Modify Settings/Add Avg Margin at your own risk. There Might Be a Possibility That Your Trades Go Wrong. So Please Modify At Your Own Risk .</Text>
            </View>
            :null}
        </ScrollView>


<View style={{display:hedge?'none' : 'flex'}}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', bottom: 0, backgroundColor: colors.background }}>
        <TouchableOpacity  activeOpacity={!Active ? 0.7 : 1} onPress={() => {
          console.log('aaaaaaaaaaa');
          if (Active//||parseFloat(CPrice)==0
          ) {
            console.log('herekredkrjnerjkld');
            } else {
              console.log('bbbbbbbbbbbbbb');
              setActive(true)
              if (st.toString() === 'False') {
                if (parseFloat(Config.first_buy_in_amount) === 0) {
                  setActive(false)
                  if (Config != undefined && Config != '') {
                    console.log("from trade review ", Config)

                    props.navigation.navigate('TradeSetting', { sym: sym,price:CPrice, result: Config, st: st, qty1: parseFloat(qty1) - 1, })
                  }
                } else {
                  setOrderType("BUY")
                  StartTrade("BUY")
                }
              } else {
                // stopApi()
                toggleModal1()
              }
            }
          }} style={{ width: '33%', alignItems: 'center', backgroundColor: colors.profitcolor, padding: 12, display:hedge&&parseFloat(side_buy)==1?'none':st.toString() === "False" ? "flex" : "none" }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Text allowFontScaling={false} style={[styles.text_Price, { color: '#fff', fontSize: 16,}]}>{st.toString() === "False" ? "BUY/LONG" : "POSITION"}</Text>
              {Active ?
                <Text allowFontScaling={false} style={[styles.text_Price, { color: '#fff', fontSize: 18 }]}><ActivityIndicator size={'small'} color="#fff" /></Text>
                : null}
            </View>
          </TouchableOpacity>
          <TouchableOpacity  activeOpacity={!Active ? 0.7 : 1} onPress={() => {
            if (Active) {//||parseFloat(CPrice)==0
              null
            } else {
              setActive(true)
              if (st.toString() === 'False') {
                if (parseFloat(Config.first_buy_in_amount) === 0) {
                  setActive(false)
                  if (Config != undefined && Config != '') {
                    console.log("from trade review ", Config)

                    props.navigation.navigate('TradeSetting', { sym: sym,price:CPrice, result: Config, st: st, qty1: parseFloat(qty1) - 1, })
                  }
                } else {
                  setOrderType("AUTO")
                  StartTrade("AUTO")
                }
              } else {
                // stopApi()
                toggleModal1()
              }
            }
          }} style={{ width: '33%', alignItems: 'center', backgroundColor:'#277184', padding: 12, display:!ShowAutoTrade?'none':st.toString() === "False" ? "flex" : "none" }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Text allowFontScaling={false} style={[styles.text_Price, { color: '#fff', fontSize: 16,}]}>{st.toString() === "False" ? "AUTO" : "POSITION"}</Text>
              {Active ?
                <Text allowFontScaling={false} style={[styles.text_Price, { color: '#fff', fontSize: 18 }]}><ActivityIndicator size={'small'} color="#fff" /></Text>
                : null}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            if (Active) {//||parseFloat(CPrice)==0
              null
            } else {
              setActive(true)
              if(hedge&&parseFloat(side_sell)==0){
                if (parseFloat(Config.first_buy_in_amount) === 0) {
                  setActive(false)
                  if (Config != undefined && Config != '') {
                    console.log("from trade review ", Config)

                    props.navigation.navigate('TradeSetting', { sym: sym,price:CPrice, result: Config, st: st, qty1: parseFloat(qty1) - 1, })
                  }
                } else {
                  setOrderType("SELL")
                  StartTrade("SELL")
                }
                return
              }
              if (st.toString() === 'False') {
                if (parseFloat(Config.first_buy_in_amount) === 0) {
                  setActive(false)
                  if (Config != undefined && Config != '') {
                    console.log("from trade review ", Config)
                    props.navigation.navigate('TradeSetting', { sym: sym,price:CPrice, result: Config, st: st, qty1: parseFloat(qty1) - 1, })
                  }
                } else {
                  setOrderType("SELL")
                  StartTrade("SELL")
                }
              } else {
                // stopApi()
                toggleModal1()
              }
            }
          }}
            style={{ width:hedge?'33%': st.toString() === "False" ? "33%" : "100%", alignItems: 'center', backgroundColor: colors.losscolor, padding: 12,display:parseFloat(side_sell)==1?'none':'flex' }}>
            <View >              
              <Text allowFontScaling={false} style={[styles.text_Price, { color: "#FFF", fontSize: 16 }]}>{hedge&&parseFloat(side_sell)==0? "SELL/SHORT":st.toString() === "False" ? "SELL/SHORT" :"CLOSE POSITION"}</Text>
            </View>
          </TouchableOpacity>

         
        
       
        </View>
        </View>

<View 
style={{display:hedge?'flex':'none'}}
>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', bottom: 0, backgroundColor: colors.background }}>
        <TouchableOpacity  activeOpacity={!Active ? 0.7 : 1}
         onPress={() => {
            if (Active//||parseFloat(CPrice)==0
            ) {
              console.log('fffffffffffffff');
            } else {
              console.log('gggggggggggggg' +st+'  '+ Config && Config.first_buy_in_amount);
              setActive(true)
              if (st.toString() === 'False') {
                if (parseFloat(Config.first_buy_in_amount) === 0) {
                  setActive(false)
                  if (Config != undefined && Config != '') {
                    console.log("from trade review ", Config)

                    props.navigation.navigate('TradeSetting', { sym: sym,price:CPrice, result: Config, st: st, qty1: parseFloat(qty1) - 1, })
                  }
                } else {
                  setOrderType("BUY")
                  StartTrade("BUY")
                }
              } else {
                // stopApi()
                console.log('going for togglemodal1');
                toggleModal1()
              }
            }
          }} 
//           disabled={
//             global.ismaster!='1' ?
//            item.isopen=='True'?true:parseFloat(item.sell)==1?true:false
//            :false
//           } 
// style={{ paddingVertical: 5, marginVertical: 5, 
//             opacity:
//             global.ismaster!=='1'?
//             item.isopen=='True'?0.1:parseFloat(item.sell)==1?0.1:1
//             :1
//            }}
          style={{ width: '33%', alignItems: 'center', backgroundColor: colors.profitcolor2, padding: 12, 
          display:
          global.ismaster=='1'?'flex':
          isopen=='True'?'none':
          hedge&&parseFloat(side_buy)==1?'none':"flex" 
          
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Text allowFontScaling={false} style={[styles.text_Price, { color: '#fff', fontSize: 16,}]}>{"BUY/LONG"}</Text>
              {Active ?
                <Text allowFontScaling={false} style={[styles.text_Price, { color: '#fff', fontSize: 18 }]}><ActivityIndicator size={'small'} color="#fff" /></Text>
                : null}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            if (Active)//||parseFloat(CPrice)==0) {
              {
            } else {
              setActive(true)
              if(hedge&&parseFloat(side_sell)==0){
                if (parseFloat(Config.first_buy_in_amount) === 0) {
                  setActive(false)
                  if (Config != undefined && Config != '') {
                    console.log("from trade review ", Config)

                    props.navigation.navigate('TradeSetting', { sym: sym,price:CPrice, result: Config, st: st, qty1: parseFloat(qty1) - 1, })
                  }
                } else {
                  setOrderType("SELL")
                  StartTrade("SELL")
                }
                return
              }
             
            }
          }}
            style={{ width:"33%", alignItems: 'center', backgroundColor: colors.losscolor, padding: 12,
            display:
            global.ismaster=='1'?'flex':
            isopen=='True'?'none':
            parseFloat(side_sell)==1?'none':'flex'
            
             }}>
            <View >              
              <Text allowFontScaling={false} style={[styles.text_Price, { color: "#FFF", fontSize: 16 }]}>{ "SELL/SHORT" }</Text>
            </View>
          </TouchableOpacity>

         
          <TouchableOpacity  activeOpacity={!Active ? 0.7 : 1} onPress={() => {
            if (Active//||parseFloat(CPrice)==0
            ) 
            {
              null
            } else {
              setActive(true)
              if (st.toString() === 'False') {
                if (parseFloat(Config.first_buy_in_amount) === 0) {
                  setActive(false)
                  if (Config != undefined && Config != '') {
                    console.log("from trade review ", Config)

                    props.navigation.navigate('TradeSetting', { sym: sym,price:CPrice, result: Config, st: st, qty1: parseFloat(qty1) - 1, })
                  }
                } else {
                  setOrderType("BOTH")
                  StartTrade("BUY",'bothwala')
                  StartTrade("SELL")
                }
              } else {
                // stopApi()
                toggleModal1()
              }
            }
          }} style={{ width: '33%', alignItems: 'center', backgroundColor:'#E86850', padding: 12, 
          display:
          global.ismaster=='1'?'flex':
          isopen=='True'?'none':
          parseFloat(side_buy)==1||parseFloat(side_sell)==1?'none':st.toString() === "False" ? "flex" : "none"
         
         }
          }>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Text allowFontScaling={false} style={[styles.text_Price, { color: '#fff', fontSize: 16,}]}>{ "BOTH" }</Text>
              {Active ?
                <Text allowFontScaling={false} style={[styles.text_Price, { color: '#fff', fontSize: 18 }]}><ActivityIndicator size={'small'} color="#fff" /></Text>
                : null}
            </View>
          </TouchableOpacity>
         
        </View>
        </View>
      </ImageBackground>
  );
}



export default TradeReviewScreen;
const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1725',
    // paddingTop:40
  },
  textInput: {
    marginLeft: 15,
    marginTop: -15,
    paddingBottom: -10,

  },
  text_header: {
    color: "#fff",
    fontWeight: 'bold',
    fontSize: 30
  },
  btn1: {
    paddingHorizontal: 15,
    paddingVertical: 5,

  },
  bx: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    // borderWidth:1,
    borderRadius: 10,
    // borderColor:"#3D3F70",
    paddingVertical: 5,
    // backgroundColor:'#ff0000',
    paddingHorizontal: 5,
    marginHorizontal: 5,
    width: 90,
    alignItems: 'center',
    height: 80

  },

  action: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomWidth: 0.5,
    borderBottomColor: '#808080',
    marginTop: 15
  },
  text_Price: {
    color: "#13B34F",
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
    textAlign: 'left'

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
    borderRadius: 4

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


    backgroundColor: '#fff'
  },
  text_card: {
    fontSize: 14,
    fontWeight: 'bold',
  }
});