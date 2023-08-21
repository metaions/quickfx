/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import {
  View,
  Text,
  Button,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
  BackHandler,
  Switch,
  StyleSheet,
  Image,
  TextInput,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {
  ThemeProvider,
  useFocusEffect,
  useIsFocused,
  useTheme,
  useLinkTo,
} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';

import database from '@react-native-firebase/database';
import {Appbar,List,RadioButton,Checkbox } from 'react-native-paper';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import global from '../component/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../component/styles';
import axios from 'axios';
import {isString} from 'lodash';
import {jsonContext} from '../context/GlobalState';
// import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Slider from 'react-native-slider';
const TradeSettingScreen = ({navigation, route}) => {
  const sym = route.params?.sym;
  const dta = route.params?.result;
  const st = route.params?.st;
  const qty1 = route.params?.qty1;
  const side = route.params?.side;
  const price = route.params?.price;
  var DeviceInfo = require('react-native-device-info');
  const {colors} = useTheme();
  const theme = useTheme();
  const [Data, setData] = React.useState([]);
  const [RData, setRData] = React.useState([]);
  const [DPA_Data, setDPA_Data] = React.useState([]);
  const [MinVal, setMinVal] = React.useState('');
  const [NVal, setNVal] = React.useState([]);
  const [RNVal, setRNVal] = React.useState([]);
  const linkTo = useLinkTo();
  const [HRT, setHRT] = React.useState('0');
  const {myjson, setCallStore, hedge} = React.useContext(jsonContext);
  const [SVal, setSVal] = React.useState([]);
  const [RSVal, setRSVal] = React.useState([]);
  const [sideChecked, setSideChecked] = React.useState(false);
  const [disableScroll, setDisableScroll] = React.useState(false);
  const [CC, setCC] = React.useState(false);  
  var m_c_d = '';
  var m_b_in_r = '';
  var Rm_c_d = '';
  var Rm_b_in_r = '';

  const IntervalItems=[
    {label: '15m', value: '15'},
    {label: '30m', value: '30'},
    {label: '1h', value: '60'},
    {label: '4h', value: '240'}
  ];
  const rsiDir=[{label:'Lesser', value: '0'},{label:'Greater', value: '1'}]
  const bolgWhen = [{label:'Touches Lower Bollinger', value: '2'},
  {label:'Touches Upper Bollinger', value: '1'},{label:'None', value: '0'}]
  const[timeFrame2,setTimeFrame2] = React.useState('15')
  const[RsiValue,setRsiValue] = React.useState('40')
  const[RsiType,setRsiType] = React.useState('0')
  const[bollgr,setBollgr] = React.useState('1')
  const [DVal, setDVal] = React.useState([]);
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [isEnabled1, setIsEnabled1] = React.useState(false);
  const [advanced,setAdvanced] = React.useState(true);
  const [processing, setProcessing] = React.useState(false);
  const [checked, setChecked] = React.useState('auto');
  const [Uid, setUid] = React.useState('');
  const [Config, setConfig] = React.useState('');
  const [FBA, setFBA] = React.useState('0.01');
  const [MCL, setMCL] = React.useState('7');
  const [RMCL, setRMCL] = React.useState('7');
  const [RPVal, setRPVal] = React.useState([]);
  const [EPVal, setEPVal] = React.useState([]);
  const [cycleData, setCycleData] = React.useState([]);
  const ws = React.useRef(null);
  const [WPR, setWPR] = React.useState('1.3');
  const [PTS, setPTS] = React.useState('2');
  const [cycles, setCycles] = React.useState('0');
  const [subBin, setSubBin] = React.useState('0');
  const [candlevol, setCandleVol] = React.useState('0');
  const [showtframe,setShowTframe] = React.useState(false);
  const [candles, setCandles] = React.useState('0');
  const [timeframe, setTimeFrame] = React.useState('5');
  const [TRC,setTRC] = React.useState('2');
  const [stopLoss, setStopLoss] = React.useState('3');
  const [leverage, setLeverage] = React.useState(100);
  const [BTC_call, setBTC_call] = React.useState('0');
  const [Secret_key, setSecret_key] = React.useState('');
  const [Api_key, setApi_key] = React.useState('');
  const [WPC, setWPC] = React.useState('0.3');
  const [BC, setBC] = React.useState('0.5');
  const [SPC, setSPC] = React.useState('0.3');
  const [gap, setGap] = React.useState('3');
  const [showBTCTime,setShowBTCTime] = React.useState(false);
  const [BTCTime,setBTCTime] = React.useState('5m');
  const [hedgeFOA,setHedgeFOA] = React.useState('0'); 
  

  /////////////
  const [CVal, setCVal] = React.useState([]);
  const [LAM, setLAM] = React.useState('0');
  const [LOP, setLOP] = React.useState('0');
  const [SLT, setSLT] = React.useState('0');
  const [LNP, setLNP] = React.useState('0');
  const [trailstopLoss, setTrailStopLoss] = React.useState('0');
  const [Token,setToken] = React.useState(null);  
  /////////////////
  const [MC, setMC] = React.useState(false);
  const [RMC, setRMC] = React.useState(false);
  const [DPA, setDPA] = React.useState(false);
  const [Normal, setNormal] = React.useState(true);
  const [Loading, setLoading] = React.useState(true);
  const [firstOrder, setFirstOrder] = React.useState('buy');

  React.useEffect(() => {
    setTimeout(async () => {
      let uid;
    let api;
      let secret;
      try {
        uid = await AsyncStorage.getItem('user_id');
        api = global.api_key;
        secret = global.api_secret;
        let token=await AsyncStorage.getItem('token')
        setToken(token)          
        setUid(uid);
        if (dta.status) {
          let enabled = JSON.parse(dta.open_position_doubled.toLowerCase());
          setIsEnabled(enabled);
          get_trade(uid);

          setApi_key(api);
          setSecret_key(secret);
        }
        if (dta.disable === 'true') {
          setIsEnabled1(true);
        }
        // mc_calculate()
      } catch (e) {
        console.log('a' + e);
      }
      // console.log('user token:', userToken);
    }, 500);
  }, []);
  const backAction = () => {
    console.log('a', MC);
    if (RMC) {
      console.log('b');
      setRMC(false);
      setNormal(true);
      return true;
    } else if (MC) {
      console.log('b');
      setMC(false);
      setNormal(true);
      return true;
    } else {
      console.log('c');
      navigation.goBack();
      return true;
    }
  };

  React.useEffect(() => {
    console.log('lvg: ' + leverage);
  }, [leverage]);

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, [MC, RMC]);

  React.useEffect(() => {
    // console.log('  MCL  ')
  }, [Data, RData]);
  React.useEffect(() => {
    // console.log('  MCL  ')
  }, [MCL, RMCL]);

  React.useEffect(() => {}, [NVal, RNVal]);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };
  const toggleSwitch1 = () => {
    setIsEnabled1(previousState => !previousState);
  };

  const get_trade = uid => {
    console.log('========setting FBA=============');
    setConfig(dta);
    
    if (dta.first_buy_in_amount != '') {
      setFBA(dta.first_buy_in_amount);
    }
    if (dta.margin_callback_limit != '') {
      setMCL(dta.margin_callback_limit);
    }
    setSubBin(dta.sub_bin);
    console.log('================================' + dta.sub_bin)
    if (dta.rmargin_callback_limit != '') {
      setRMCL(dta.rmargin_callback_limit);
    }

    if (dta.tframe != '') {
      setTimeFrame(dta.tframe)
  }
  if (dta.candles != '') {
      setCandles(dta.candles)
  }
  if (dta.minvol != '') {
      setCandleVol(dta.minvol)
  }
  if (dta.noc != '') {
      setCycles(dta.noc)
  }
  console.log('sbr',dta.start_bot_rej);
    if (dta.start_bot_rej != '') {
      setTRC(dta.start_bot_rej)
  }
    if (dta.whole_position_take_profit != '') {
      setWPR(dta.whole_position_take_profit);
    }
    if (dta.whole_position_take_profit_callback != '') {
      setWPC(dta.whole_position_take_profit_callback);
    }
    if (dta.buy_in_callback != '') {
      setBC(dta.buy_in_callback);
    }
    if (dta.sub_position != '') {
      setSPC(dta.sub_position);
    }
    console.log('dta trigger is',dta.trigger);
    if (dta.trigger != '') {
      setHRT(dta.trigger);
    }
    ///////////
    if (dta.liq_notify_percent != '') {
      setLNP(dta.liq_notify_percent);
    }
    if (dta.liq_add_margin != '') {
      setLAM(dta.liq_add_margin);
    }
    if (dta.liq_open_percentage != '') {
      setLOP(dta.liq_open_percentage);
    }
    if (dta.save_liq_times != '') {
      setSLT(dta.save_liq_times);
    }
    //////
    console.log(dta.cyc,' :   this is the cyc3 value hhhhhhhhhhhhh')
    if (dta.start_bot_variation != '') {
      setPTS(dta.start_bot_variation);
    }
    if (dta.stop_loss_per != '') {
      setStopLoss(dta.stop_loss_per);
    }
    if (dta.leverage != '') {
      console.log('leverage is ',dta.leverage);
      setLeverage(parseInt(dta.leverage));
    }
    if (dta.btc_callback && dta.btc_callback != '') {
      setBTC_call(dta.btc_callback);
    }
    if (dta.tsl_type && dta.tsl_type != '') {
      setChecked(dta.tsl_type);
    }
    if (dta.btc_callback_time&& dta.btc_callback_time != '') {
      setBTCTime(dta.btc_callback_time)
  }
   if (dta.trailing_stop_loss&& dta.trailing_stop_loss != '') {
    setTrailStopLoss(dta.trailing_stop_loss)
}
   if (dta.tframe_new&& dta.tframe_new != '') {
    setTimeFrame2(dta.tframe_new)
}
   if (dta.rsi_type&& dta.rsi_type != '') {
    setRsiType(dta.rsi_type)
}
   if (dta.rsi_val&& dta.rsi_val != '') {
    setRsiValue(dta.rsi_val)
}
   if (dta.bollinger&& dta.bollinger != '') {
    setBollgr(dta.bollinger)
}

  

    setGap(dta.gap);

    console.log(dta.margin_buy_in_ratio.split(','));
    console.log(dta.margin_call_drop.split(','));

    // for(let i=0;i<dta.margin_buy_in_ratio.split(',').length;i++){
    //     console.log(dta.margin_buy_in_ratio.split(',')[i])
    //     if(isNaN(parseFloat(dta.margin_buy_in_ratio.split(',')[i]))){
    //         let value=dta.margin_buy_in_ratio.split(',')[i]
    //         value =value.replace(NaN,0)
    //         console.log("new value",value)
    //     }

    // }

    m_c_d = dta.margin_call_drop;
    m_b_in_r = dta.margin_buy_in_ratio;
    Rm_c_d = dta.rmargin_call_drop;
    Rm_b_in_r = dta.rmargin_buy_in_ratio;
    
    // m_c_d = m_c_d.replace(",0", ",2")
    // m_c_d = m_c_d.replace(",0", ",2")
    // m_c_d = m_c_d.replace(",0", ",2")
    // m_c_d = m_c_d.replace(",0", ",2")
    // m_c_d = m_c_d.replace(",0", ",2")
    // m_b_in_r = m_b_in_r.replace(",0", ",2")
    // m_b_in_r = m_b_in_r.replace(",0", ",2")
    // m_b_in_r = m_b_in_r.replace(",0", ",2")
    // m_b_in_r = m_b_in_r.replace(",0", ",2")
    // m_b_in_r = m_b_in_r.replace(",0", ",2")
    
    setSVal(m_c_d.split(','));
    setNVal(m_b_in_r.split(','));
    if (m_c_d == '') {
      setSVal([]);
      setNVal([]);
    }
    
    setHedgeFOA(dta.hedge_foa)
      setRSVal(Rm_c_d.split(','));
      setRNVal(Rm_b_in_r.split(','));
    
      if(dta.cyc&&dta.cyc!==''){
    

        setCVal(dta.cyc.split(','))
    }else{
        for(let i=0;i<parseFloat(dta.noc);i++){
            setCVal(dta=>[...dta,1])
        }
    }
    console.log(dta.cyc,' :   this is the cyc0 value hhhhhhhhhhhhh')
    console.log(dta.cyc,' :   this is the cyc0 value hhhhhhhhhhhhh')
    console.log(dta.cyc,' :   this is the cyc0 value hhhhhhhhhhhhh')
    console.log(dta.cyc,' :   this is the cyc0 value hhhhhhhhhhhhh')

    cycle_cal(dta.noc)
    mc_calculate(dta.margin_callback_limit);
    mc_calculate(dta.rmargin_callback_limit, 'reverse');
    console.log(dta.cyc,' :   this is the cyc-1 value hhhhhhhhhhhhh')
    setLoading(false);
    // for(let i=0; i<parseFloat(dta.margin_callback_limit);i++){
    //     setData(Data => [...Data, i]);
    //     handleChange(i,dta.margin_call_drop[i])
    //     handleTextChange(i,dta.margin_buy_in_ratio[i])
    // }
  };

  const defval = lvl => {
    if (lvl == 0) {
      return '4';
    }
    if (lvl == 1) {
      return '6';
    }
    if (lvl == 2) {
      return '8';
    }
    if (lvl == 3) {
      return '10';
    }
    if (lvl >= 4) {
      return '10';
    }
    if (lvl == 5) {
      return '8';
    }
    if (lvl == 6) {
      return '10';
    }
    if (lvl >= 7) {
      return '12';
    }
  };

  const dpa_calculate = () => {
    setDPA_Data([]);
    if (parseFloat(MCL) <= 5) {
      for (let i = 0; i < 1; i++) {
        setDPA_Data(DPA_Data => [...DPA_Data, i]);
        handleDPA_change(i, '1.3');
      }
    } else if (parseFloat(MCL) > 10) {
      for (let i = 0; i < 10 - 4; i++) {
        setDPA_Data(DPA_Data => [...DPA_Data, i]);
        handleDPA_change(i, '1.3');
      }
    } else {
      for (let i = 0; i < parseFloat(MCL) - 4; i++) {
        setDPA_Data(DPA_Data => [...DPA_Data, i]);

        handleDPA_change(i, '1.3');
      }
    }
  };
  const mc_calculate = (mcl, side) => {
    // setNVal([])
    // setSVal([])
    if (side == 'reverse') {
      
      setRData([]);
      
      for (let i = 0; i < parseFloat(mcl); i++) {
        setRData(RData => [...RData, i]);
        // handleChange(i,SVal[i])
        // handleTextChange(i,NVal[i])
      }
      return;
    }
    
    setData([]);
    

    
    for (let i = 0; i < parseFloat(mcl); i++) {
      setData(Data => [...Data, i]);
      // handleChange(i,SVal[i])
      // handleTextChange(i,NVal[i])
    }
  };

  const cycle_cal=(val)=>{
    let myval=parseFloat(val)
        myval=myval<=10?myval:10
    setCycleData([])
    for(let i=0;i<parseFloat(myval);i++){
        setCycleData(Dta=>[...Dta,i])            
    }
}

  const handleTextChange = (name, value) => {
    setNVal(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleChange = (name, value) => {
    setSVal(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleRTextChange = (name, value) => {
    setRNVal(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleRChange = (name, value) => {
    setRSVal(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDPA_change = (name, value) => {
    setDVal(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const Check_val = () => {
    let final;
    for (let i = 0; i < parseFloat(MCL); i++) {
      if (SVal[i] != '' && NVal[i] != '') {
        final = 1;
      } else {
        final = 0;
        break;
      }
    }
    if (final == 1) {
      setMC(false);
      setNormal(true);
    } else {
      ToastAndroid.show('All fields required', ToastAndroid.SHORT);
    }
  };
  const RCheck_val = () => {
    let final;
    for (let i = 0; i < parseFloat(RMCL); i++) {
      if (RSVal[i] != '' && RNVal[i] != '') {
        final = 1;
      } else {
        final = 0;
        break;
      }
    }
    if (final == 1) {
      setRMC(false);
      setNormal(true);
    } else {
      ToastAndroid.show('All fields required', ToastAndroid.SHORT);
    }
  };
  const Final_hit = async (myside) => {
    
    global.callStore = true;
    // console.log('valusss:: '+FBA+'  -  '+
    // MCL+'  -  '+
    // WPR+'  -  '+
    // WPC+'  -  '+
    // BC+'  -  '+
    // SPC+'  -  '+
    // gap+'  -  '+
    // PTS+'  -  '+
    // stopLoss+'  -  '+
    // WPR+'  -  '+
    // LNP+'  -  '+
    // LAM+'  -  '+
    // LOP+'  -  '+
    // SLT);
  console.log('fba val is: -'+FBA+'--');
    if (
      (FBA != '' && parseFloat(FBA) != 0) &&
      MCL != '' &&
      WPR != '' &&
      WPC != '' &&
      BC != '' &&
      SPC != '' &&
  
      PTS != '' &&
      stopLoss != '' &&
      WPR != '' &&
      LNP != '' &&
      LAM != '' &&
      LOP != '' &&
      SLT != ''
    ) {
      let marginCall = parseFloat(MCL);
      let rmarginCall = parseFloat(RMCL);

      marginCall = MCL;

      setLoading(true);
      rmarginCall = RMCL;

      var rmr_ratio = [];
      var rmr_call = [];
      var rs1 = '',
        rs2 = '';
      var mr_ratio = [];
      var mr_call = [];
      var s1 = '',
        s2 = '';
      var index = 0;
      var rindex = 0;
      Object.entries(NVal).map((val, key) => {
        var myval = NVal[index];
        index = index + 1;
        if (s1 == '') {
          s1 = myval;
        } else {
          s1 = s1 + ',' + myval;
        }

        mr_ratio.push(myval);
      });
      console.log('margin_ratio-----------------:', s1.toString());

      console.log('hello', JSON.stringify(SVal));
      index = 0;
      Object.entries(SVal).map((val, key) => {
        var myval = SVal[index];
        mr_call.push(myval);

        index = index + 1;
        if (s2 == '') {
          s2 = myval;
        } else {
          s2 = s2 + ',' + myval;
        }
      });
      Object.entries(RNVal).map((val, key) => {
        var myval = RNVal[rindex];
        rindex = rindex + 1;
        if (rs1 == '') {
          rs1 = myval;
        } else {
          rs1 = rs1 + ',' + myval;
        }

        rmr_ratio.push(myval);
      });
      console.log('margin_ratio-----------------:', rs1.toString());

      
      rindex = 0;
      Object.entries(RSVal).map((val, key) => {
        var myval = RSVal[rindex];
        rmr_call.push(myval);

        rindex = rindex + 1;
        if (rs2 == '') {
          rs2 = myval;
        } else {
          rs2 = rs2 + ',' + myval;
        }
      });

      // try{
      //   if(global.firebase=='true'){
      //     database(global.secondaryApp).ref('CRYPTO_TRADES/'+(Uid&&Uid.toUpperCase()))
      //     .once('value')
      //     .then(snapshot => {
      //       if(snapshot.exists()){
      //         console.log('========snapshot exists in tradesetting screen')
      //         var userData = snapshot.val();  
      //         let keys = Object.keys(userData);
      //         keys.forEach((key,index) => {
  
      //           console.log('key val id::::::::222  '+key+'  '+myside+'   '+sym)
      //           if(key.includes(sym.toUpperCase()) && key.includes(myside.toUpperCase())){
      //               let keyVal=key
      //               console.log('key val id::::::::'+keyVal)
      //             console.log('=======firebase update opertation:: '+'CRYPTO_TRADES/'+(Uid&&Uid.toUpperCase())+'/'+keyVal+'     '+cycles+'  baluee')
      //             database(global.secondaryApp).ref('CRYPTO_TRADES/'+(Uid&&Uid.toUpperCase())+'/'+keyVal)
      //             .update({
      //               cycle_limit:parseInt(cycles)
      //             }).then(() => {
      //               console.log('=======update val')
      //             })
      //           }
      //         }) 
      //       }
      //       else{
      //         console.log('============doesnt exitsssssssssssssssssssssss')
      //       }
      //     });
      //   }
      // }catch(e){
      //   console.log('============error exitsssssssssssssssssssssss  '+e)
        
      // }
      

      // console.log(SVal1);
      // console.log(JSON.stringify(SVal1));

      if (MCL == '0') {
        s2 = '0,0,';
        s1 = '0,0,';
      }
      if (RMCL == '0') {
        rs2 = '0,0,';
        rs1 = '0,0,';
      }
      let url;
      let tk=''
        if(Token==null || Token == undefined){
          tk=global.token
        }
        else{
          tk=Token
        }
      if (hedge) {
        url =
          global.BASE_URL +
          'css_mob/hedge/starttrade.aspx?user_id=' +
          Uid +
          '&pair=' +
          sym +
          '&sub_bin=' +
          subBin +
          '&first_buy_in_amount=' +
          FBA +
          '&open_position_doubled=' +
          isEnabled +
          '&margin_callback_limit=' +
          marginCall +
          '&rmargin_callback_limit=' +
          rmarginCall +
          '&take_ratio=' +
          WPR +
          '&take_callback=' +
          WPC +
          '&buy_in= ' +
          BC +
          '&sub_position=' +
          SPC +
          '&type=one-shot' +
          '&margin_call_drop=' +
          s2 +
          '&rmargin_call_drop=' +
          rs2 +
          '&margin_buy_in_ratio=' +
          s1 +
          '&rmargin_buy_in_ratio=' +
          rs1 +
          '&api_key=' +
          global.api_key +
          '&api_secret=' +
          global.api_secret +
          '&gap=' +
          gap +
          '&disable=' +
          isEnabled1 +
          '&price_to_start=' +
          PTS +
          '&stop_loss_per=' +
          stopLoss +
          '&leverage=' +
          leverage +
          '&win_percentage=' +
          WPR +
          '&usdt=' +
          FBA * leverage +
          '&side=' +
          myside +
          '&liq_notify_percent=' +
          LNP +
          '&liq_add_margin=' +
          LAM +
          '&liq_open_percentage=' +
          LOP +
          '&save_liq_times=' +
          SLT +
          '&btc_callback=' +
          BTC_call +
          '&trigger=' +
          HRT
          +'&start_bot_rej='+TRC
          +'&noc='+cycles+'&tframe='+timeframe+'&candles='+candles+'&minvol='+candlevol+
          '&btc_callback_time='+BTCTime+'&trailing_stop_loss='+trailstopLoss+
          '&tsl_type='+checked   +'&token='+tk +'&device='+DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel()
          +'&cyc='+CVal+'&hedge_foa='+hedgeFOA
          +'&tframe_new='+timeFrame2+'&rsi_type='+RsiType+'&rsi_val='+RsiValue+'&bollinger='+bollgr
          
          ;
      } else {
        url =
          global.BASE_URL +
          'css_mob/starttrade.aspx?user_id=' +
          Uid +
          '&pair=' +
          sym +
          '&first_buy_in_amount=' +
          FBA +
          '&open_position_doubled=' +
          isEnabled +
          '&margin_callback_limit=' +
          marginCall +
          '&rmargin_callback_limit=' +
          rmarginCall +
          '&take_ratio=' +
          WPR +
          '&take_callback=' +
          WPC +
          '&buy_in= ' +
          BC +
          '&sub_position=' +
          SPC +
          '&type=one-shot' +
          '&margin_call_drop=' +
          s2 +
          '&rmargin_call_drop=' +
          rs2 +
          '&margin_buy_in_ratio=' +
          s1 +
          '&rmargin_buy_in_ratio=' +
          rs1 +
          '&api_key=' +
          Api_key +
          '&api_secret=' +
          Secret_key +
          '&gap=' +
          gap +
          '&disable=' +
          isEnabled1 +
          '&price_to_start=' +
          PTS +
          '&stop_loss_per=' +
          stopLoss +
          '&leverage=' +
          leverage +
          '&win_percentage=' +
          WPR +
          '&usdt=' +
          FBA * leverage +
          '&liq_notify_percent=' +
          LNP +
          '&liq_add_margin=' +
          LAM +
          '&liq_open_percentage=' +
          LOP +
          '&save_liq_times=' +
          SLT +
          '&btc_callback=' +
          BTC_call          
          +'&start_bot_rej='+TRC
          +'&noc='+cycles+'&tframe='+timeframe+'&candles='+candles+'&minvol='+candlevol+'&btc_callback_time='+BTCTime+'&trailing_stop_loss='+trailstopLoss+'&tsl_type='+checked   + '&token='+tk +'&device='+DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel();    
          +'&tframe_new='+timeFrame2+'&rsi_type='+RsiType+'&rsi_val='+RsiValue+'&bollinger='+bollgr
          ;
      }

      console.log(url);
      fetch(url)
        .then(item => item.json())
        .then(dta => {
          if (dta && dta.status === true) {
            global.status = 'true';
            global.Coins = '';
            setCallStore(true);
            setLoading(false);
            ToastAndroid.show(dta.message, ToastAndroid.SHORT);
            route.params.onReturn(side);
            navigation.goBack();
          } else {
            setLoading(false);
            ToastAndroid.show(dta.message, ToastAndroid.SHORT);
          }
        }).then(()=>{
          setProcessing(false)
        })
    } else {
      ToastAndroid.show(
        'All fields must be filled properly',
        ToastAndroid.SHORT,        
      );
      setProcessing(false)
    }
  };

  

  const Header = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      }}>
      <Text
        style={{
          color: colors.hgl,
          fontSize: 16,
          textAlign: 'center',
          flex: RPVal.length > 1 ? 0.2 : 0.2,
        }}>
        Margin {'\n'}call drop
      </Text>
      <Text
        style={{
          color: colors.hgl,
          fontSize: 16,
          textAlign: 'center',
          flex: RPVal.length > 1 ? 0.4 : 0.3,
        }}>
        Margin{'\n'}Buy in ratio
      </Text>

      <Text
        style={{
          color: colors.hgl,
          fontSize: 16,
          textAlign: 'center',
          flex: 0.2,
          display: RPVal.length > 1 ? 'flex' : 'none',
        }}>
        Recovery{'\n'} %
      </Text>

      <Text
        style={{
          color: colors.hgl,
          fontSize: 16,
          textAlign: 'right',
          flex: 0.2,
          display: EPVal.length > 1 ? 'flex' : 'none',
        }}>
        Net %
      </Text>
    </View>
  );
  const CycleHeader=()=>(
    <View
    style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>

    <Text style={{ color: colors.hgl, fontSize: 16,textAlign:'center',flex:0.3 }}>
        Cycle
    </Text>       
    <Text style={{ color: colors.hgl, fontSize: 16,textAlign:'center',flex:0.5 }}>
        Lot Size
    </Text>

</View>
)
React.useEffect(()=>{},[SVal,NVal]);
  function Simulation(val, side) {
      
    let rpval = [];
    let epval = [];
    let init_price = parseFloat(price);
    let init_fund = parseFloat(FBA) * parseFloat(leverage);
    let init_qty = init_fund / init_price;
    let total_fund_inv = 0;
    let total_qty = 0;
    let price_now = 0;
    let entry_price = 0;
    let qty_inv = 0;
    SVal.length>0&&SVal.map((item, index) => {
      let calldrop = parseFloat(SVal[index]);
      let ratio = parseFloat(NVal[index]);
      let fund_inv = init_fund * ratio;

      if (index == 0) {
        total_fund_inv = fund_inv + init_fund;
        price_now = init_price - (init_price * calldrop) / 100;
        if (side === 'SELL') {
          price_now = init_price + (init_price * calldrop) / 100;
        }
        qty_inv = fund_inv / price_now;
        total_qty = init_qty + fund_inv / price_now;
      } else {
        price_now = entry_price - (entry_price * calldrop) / 100;
        if (side === 'SELL') {
          price_now = entry_price + (entry_price * calldrop) / 100;
        }
        qty_inv = fund_inv / price_now;
        total_fund_inv += fund_inv;
        total_qty += qty_inv;
      }
      entry_price = total_fund_inv / total_qty;
      let rec_per = ((entry_price - price_now) / price_now) * 100 * -1;
      if (side==='SELL') {
        rec_per = ((entry_price - price_now) / price_now) * 100;
      }
      console.log(
        ' call drop : ',
        calldrop,
        '  ratio :',
        ratio,
        '  init_price :',
        init_price,
        '  init_fund :',
        init_fund,
        '  init_qty :',
        init_qty,
        '  price_now :',
        price_now,
        '  fund_inv :',
        fund_inv,
        '  total_qty :',
        total_qty,
        '  total_fund_inv :',
        total_fund_inv,
        '  entry_price :',
        entry_price,
        '  rec_per :',
        rec_per,
      );
      rpval.push(rec_per);
      epval.push(((entry_price-init_price)/init_price)*100);
    });

    setEPVal(epval);
    setRPVal(rpval);
  }
  
  function setTheCycles(val){
    setCycles(val)
   
  }

  return  Normal ? (
    <ImageBackground source={global.bgimg} style={[styles1.container, {}]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 5,
          paddingVertical: 5,
          marginBottom: 10,
          // 
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{padding: 10}}>
            <Text style={{textAlign: 'right'}}>
              <IonIcons
                name="chevron-back-sharp"
                size={25}
                color={colors.hgl}
              />
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={[
              styles.heading,
              {
                color: colors.hgl,                
                fontWeight: 'normal',
                textDecorationLine: 'underline',
                fontSize: 16,
              },
            ]}>
            Trade Settings  <Text style={{fontSize:12}}>( {side} ){'\n'}</Text> {sym}
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 15,
          }}>
          <TouchableOpacity
            disabled={processing}
            onPress={() => {
              setProcessing(true)
              if(sideChecked){
                Final_hit('BUY');
                Final_hit('SELL');                
              }else{
                Final_hit(side);
              }
            }}>
            <Text
              style={[
                styles.heading,
                {
                  color: colors.hgl,
                  fontSize: 14,
                  fontWeight: 'normal',
                  fontSize: 16,
                },
              ]}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 15,display:'none'
        }}>
        <Text style={{fontSize: 16, color: '#FFF'}}>
            Apply Same Settings for {side=='BUY'?'SELL':'BUY'}
        </Text>
        <Checkbox
          status={sideChecked ? 'checked' : 'unchecked'}
          onPress={() => {
            setSideChecked(!sideChecked);
          }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          paddingHorizontal: 15,
        }}>
        
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Web', {
              url: global.BASE_URL + 'web/settings.html',
            });
          }}>
          <Text
            style={{
              backgroundColor: '#d0d0d0',
              paddingHorizontal: 15,
              textAlign: 'center',
              fontSize: 16,
              color: '#000',
              borderRadius: 10,
            }}>
            FAQ!
          </Text>
        </TouchableOpacity>
      </View>
  
      <ScrollView style={{marginBottom: 0, }}>
      
        <View style={{flexDirection: 'row', justifyContent: 'space-between',paddingRight:20}}>
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 16,
            padding: 12,
            marginLeft: 14,
            fontWeight: 'bold',
          }}>
          LOT SETTINGS:
        </Text>
        {Loading?
        <ActivityIndicator size={'small'} color={colors.selected} />
        :null}
        </View>
      
  
        <View
          style={{
            elevation: showtframe?0: 10,
            width: '90%',
            alignItems: 'center',
            alignSelf: 'center',
          
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 15,
          }}>
          <Text style={{color: '#787f8a', fontSize: 16, width: 150}}>
            Lot Size
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: 'auto',//backgroundColor:'red'
            }}>
              {/* {console.log("started is " + dta.started)} */}
              <TouchableOpacity onPress={() =>{
                if(parseFloat(FBA)>0.01){
                 let v= (parseFloat(FBA)-0.01).toFixed(2).toString()
                  setFBA(v)
                }}} >
                  <Entypo name='squared-minus' size={26} color={colors.selected} />
              </TouchableOpacity>
              <TextInput
              keyboardType={'number-pad'}
              autoCapitalize="none"
              style={{textAlign:'center'}}
  
                onChangeText={val => {
                  console.log('======vals: '+val.lastIndexOf('.'));
                  // if( val.length-1-[val.indexOf(".")]>2)//val.indexOf(".")>=0 &&
                  // {
                  //   return
                  // }
                  // if(val=='' || val=='0' || isNaN(val)){
                  //   console.log('======vals2: '+val+isNaN(parseFloat(val)));

                  //   setFBA('0.01');//.replace(/[^0-9]/g, '')
                  //   return
                  // }
                  if(val.length>4){
                    ToastAndroid.show('Please enter valid Lot Size..',ToastAndroid.SHORT)
                    return
                }
                  if(parseFloat(val)>2){
                    ToastAndroid.show("Sorry! Can't enter more than 2 lot",ToastAndroid.SHORT)
                    return
                  }
                setFBA(val);//.replace(/[^0-9]/g, '')
              }}
              value={FBA.toString()}//.lastIndexOf('.')>2? parseFloat(FBA).toFixed(2).toString():FBA.toString()}
              
              editable={dta.length>0 &&dta.started.toString().toLowerCase() =="true" ? false : true}
              width={50}
              // height={42}
              color={colors.selected}
              // style={{marginTop:5}}
              selectionColor={'#787f8a'}
            />
             <TouchableOpacity onPress={() =>{
                if(parseFloat(FBA)<2){

                    let a=(parseFloat(FBA)+0.01).toFixed(2).toString()
                    setFBA(a)
                }
              }} >
                  <Entypo name='squared-plus' size={26} color={colors.selected} />
              </TouchableOpacity>
          
          </View>
        </View>

  
        <TouchableOpacity onPress={()=>{setAdvanced(!advanced)}} style={{display:'none',flexDirection: 'row', justifyContent: 'space-between' ,alignItems: 'center',paddingRight:10,}}>
                        <Text
                        style={{
                            color: '#FFFFFF',
                            fontSize: 16,
                            padding: 12,
                            
                            fontWeight: 'bold',
                        }}>
                        ADVANCED SETTINGS:  <Text style={{fontSize:14,color:colors.border}}> ( Optional )   </Text>
                        </Text>
                        <Entypo name={advanced?"chevron-down":"chevron-right"} size={22} style={{marginTop:5}}   color={colors.selected}  /> 
                       
                        </TouchableOpacity>
                        <View style={{display:'none',}}>
                        <View style={{  width: '90%', alignItems: 'center', alignSelf: 'center',  flexDirection: 'row', justifyContent: 'space-between', padding: 15 }}>
                            <Text style={{ color: '#787f8a', fontSize: 16, width: 150 }}>
                            TimeFrame
                            </Text>
                            <View style={{flexDirection: 'row',alignItems: 'center'}}>
                            <Text
                            onPress={() => {setShowTframe(!showtframe)}}
                            style={{
                              padding:10,
                              color: colors.selected,
                              fontSize: 15,
                              textAlign: 'center',
                            }}>
                            {timeframe}{timeframe==1||timeframe==4?'H':'M'}
                          </Text> 
                          
                          <Entypo name="chevron-down" size={18} color={colors.selected}  />
                          </View>
                        </View>
                          {showtframe?   
                          <View style={{width:'100%',alignItems: 'flex-end',position: 'absolute',top:'25%',right:'2%',zIndex:99999,}}>
                              <View style={{flexDirection: 'column',backgroundColor:colors.border,borderRadius:5,justifyContent:'center',alignItems: 'flex-start',paddingLeft:'5%',width:'30%'}}>
                               <TouchableOpacity onPress={()=>{setTimeFrame('5'),setShowTframe(false)}} style={{padding:10,width:'100%'}}>
                                 <Text style={{fontSize:16}}>5M</Text>
                               </TouchableOpacity>
                               <TouchableOpacity onPress={()=>{setTimeFrame('15'),setShowTframe(false)}} style={{padding:10,width:'100%'}}>
                                 <Text style={{fontSize:16}}>15M</Text>
                               </TouchableOpacity>
                               <TouchableOpacity onPress={()=>{setTimeFrame('30'),setShowTframe(false)}} style={{padding:10,width:'100%'}}>
                                 <Text style={{fontSize:16}}>30M</Text>
                               </TouchableOpacity>
                               <TouchableOpacity onPress={()=>{setTimeFrame('1'),setShowTframe(false)}} style={{padding:10,width:'100%'}}>
                                 <Text style={{fontSize:16}}>1H</Text>
                               </TouchableOpacity>
                               <TouchableOpacity onPress={()=>{setTimeFrame('4'),setShowTframe(false)}} style={{padding:10,width:'100%'}}>
                                 <Text style={{fontSize:16}}>4H</Text>
                               </TouchableOpacity>
                                 
                              
                              </View>



                          </View>
                        
                        
                        
                        :null
                        }
                        <View style={{
                            width: '90%', alignItems: 'center', alignSelf: 'center',  flexDirection: 'row',
                            justifyContent: 'space-between', padding: 10
                        }}>
                            <Text style={{ color: '#787f8a', fontSize: 16, width: 150 }}>
                            No Of Candles :
                            </Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 'auto' }}>
                                <TextInput
                                    keyboardType={'number-pad'}
                                    autoCapitalize="none"
                                    onChangeText={(val) => {
                                        setCandles(val.replace(/[^0-9]/g, ''))
                                    }}
                                   
                                    value={candles}
                                    editable={dta.started ==true ? false : true}
                                    width={50}
                                    // height={42}
                                    color={colors.selected}
                                    // style={{marginTop:5}}
                                    selectionColor={'#787f8a'}



                                />
                                <Text style={{ color: colors.selected, fontSize: 15, textAlign: 'center' }}>USD</Text>
                            </View>

                        </View>


                        <View style={{  width: '90%', alignItems: 'center', alignSelf: 'center',  flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                            <Text style={{ color: '#787f8a', fontSize: 16, width: 150 }}>
                             Minimum Volume Of Each Candle in (%):
                            </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 'auto' }}>
                                <TextInput
                                    keyboardType={'number-pad'}
                                    autoCapitalize="none"
                                    onChangeText={(val) => {
                                        setCandleVol(val)
                                    }}
                                   
                                    value={candlevol}
                                    editable={dta.started ==true ? false : true}
                                    width={50}
                                    // height={42}
                                    color={colors.selected}
                                    // style={{marginTop:5}}
                                    selectionColor={'#787f8a'}



                                />
                                <Text style={{ color: colors.selected, fontSize: 15, textAlign: 'center' }}>  %</Text>
                            </View>


                        </View>
                        </View>
        {/* 103.224.241.238 */}
        {/* </View> */}

        <View
          style={{
            backgroundColor: 'transparent',
            width: '100%',
            borderRadius: 10,
            alignItems: 'center',
            alignSelf: 'center',
            paddingVertical: 5,
          }}>
          {/* <Text style={{color:"#FFF",fontSize:16, marginTop:10}}>
                   First Order Type : {firstOrder.toUpperCase()}
                  </Text> */}
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: '100%',
              display: 'none',
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setFirstOrder('buy');
              }}>
              <View
                style={{
                  backgroundColor: firstOrder == 'buy' ? '#00c0ff' : '#FFFFFF',
                  padding: 12,
                  borderRadius: 12,
                  marginLeft: 40,
                  width: 150,
                  alignItems: 'center',
                  marginTop: 10,
                  marginBottom: 10,
                }}>
                <Text style={{color: '#000'}}>BUY</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setFirstOrder('sell');
              }}>
              <View
                style={{
                  backgroundColor: firstOrder == 'sell' ? '#00c0ff' : '#FFFFFF',
                  padding: 12,
                  borderRadius: 12,
                  marginRight: 40,
                  width: 150,
                  alignItems: 'center',
                  marginTop: 10,
                  marginBottom: 10,
                }}>
                <Text style={{color: '#000'}}>SELL</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              elevation: 10,
              width: '90%',
              marginVertical: 10,
              alignSelf: 'center',
              
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 15,
              display: 'none',
            }}>
            <Text style={{color: '#787f8a', fontSize: 16, width: 250}}>
              Disable buys in case of huge market crash !
            </Text>
            <Text style={{color: '#787f8a', fontSize: 15}}>
              <Switch
                trackColor={{false: colors.vbg, true: '#FE8B06'}}
                thumbColor={isEnabled1 ? '#f4f3f4' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch1}
                value={isEnabled1}
              />
            </Text>
          </View>
          {/* 103.224.241.238 */}
        </View>
{/* signal settings::: */}
<Text
          style={{
            color: '#FFFFFF',
            fontSize: 16,
            padding: 12,
            marginLeft: 14,
            fontWeight: 'bold',
          }}>
          SIGNALS SETTINGS:
        </Text>
        <View
          style={{
            elevation: 10,
            width: '90%',
            alignSelf: 'center',
            
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            marginBottom: 20,
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 0.5,
            borderBottomColor: '#80808080', width: '100%', paddingVertical: 8 }}>
                                <Text style={{ color: '#787f8a', fontSize: 16, width: 150 }}>
                                  Time Frame
                                </Text>
                                <View style={{  justifyContent: 'center', alignItems: 'center' ,width: 120,height:30,}}>
                                
                                <Dropdown
                                  style={[styles.dropdown, { borderColor: 'white' }]}
                                  placeholderStyle={styles.placeholderStyle}
                                  selectedTextStyle={styles.selectedTextStyle}
                                  inputSearchStyle={styles.inputSearchStyle}
                                  iconStyle={styles.iconStyle}
                                  data={IntervalItems}
                                  activeColor={'grey'}
                                  containerStyle={{marginTop:-25,borderRadius:10,backgroundColor:'#bbb'}}
                                  
                                  maxHeight={200}
                                  labelField="label"
                                  valueField="value"
                                
                               
                                  value={timeFrame2}
                               
                                  onChange={item => {
                                    setTimeFrame2(item.value);
                        
                                  }}
                             
                                />
                                   {/* <Picker
                                   style={{width:'100%',height:10,backgroundColor:'#fff',}}
                                   
                                   
                                   mode='dropdown'
                                   selectedValue={timeFrame2}
                                   onValueChange={(itemValue, itemIndex) =>
                                    setTimeFrame2(itemValue)
                                  }>
                                    
                                    {IntervalItems.map((item, i) =><Picker.Item label={item.label} value={item.value}  />
                                  )}
                                  </Picker> */}
                                </View>
                            </View>
                           
       
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 0.5, 
              borderBottomColor: '#80808080', width: '100%', paddingVertical: 8 }}>
                                <Text style={{ color: '#787f8a', fontSize: 16, width: 150 }}>
                                RSI Value
                                </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <TextInput
                                        keyboardType={'number-pad'}
                                        // autoCapitalize="none"
                                        onChangeText={(val) => {
                                            setRsiValue(val)
                                        }}
                                       
                                        value={RsiValue}
                                        width={75}
                                        height={42}
                                        color={colors.selected}
                                        style={{ marginTop: 5 }}
                                        selectionColor={'#787f8a'}
                                    />
                               
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom:15,
                            borderBottomWidth: 0.5, borderBottomColor: '#80808080', width: '100%', paddingVertical: 8 }}>
                                <Text style={{ color: '#787f8a', fontSize: 16, width: 150 }}>
                                RSI Type
                                </Text>
                                <View style={{  justifyContent: 'center', alignItems: 'center' ,width: 120,height:30,}}>
                                
                                <Dropdown
                                  style={[styles.dropdown, { borderColor: 'white',width: 150}]}
                                  placeholderStyle={styles.placeholderStyle}
                                  selectedTextStyle={styles.selectedTextStyle}
                                  inputSearchStyle={styles.inputSearchStyle}
                                  iconStyle={styles.iconStyle}
                                  data={rsiDir}
                                  activeColor={'grey'}
                                  containerStyle={{marginTop:-25,borderRadius:10,backgroundColor:'#bbb'}}
                                    dropdownPosition={'bottom'}
                                  showsVerticalScrollIndicator={false}
                                  maxHeight={200}
                                  labelField="label"
                                  valueField="value"
                                  // placeholder={!isFocus ? 'Select item' : '...'}
                                  // searchPlaceholder="Search..."
                                  value={RsiType}
                                  // onFocus={() => setIsFocus(true)}
                                  // onBlur={() => setIsFocus(false)}
                                  onChange={item => {
                                    setRsiType(item.value);
                                    // setIsFocus(false);
                                  }}
                                 
                                />
                                {/* <Picker
                                    selectedValue={RsiType}
                                    style={{width:'100%',height:20,backgroundColor:'#fff',borderRadius:5}}
                                    mode='dropdown'
                                    onValueChange={(itemValue, itemIndex) =>  setRsiType(itemValue)}>
                                

                                    <Picker.Item label='greater' value={'greater'} />
                                    <Picker.Item label='lesser' value={'lesser'} />
                                 
                                  </Picker> */}
                                </View>
                            </View>  
        
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
          borderBottomWidth: 0.5, borderBottomColor: '#80808080', width: '100%', paddingVertical: 8 }}>
                                <Text style={{ color: '#787f8a', fontSize: 16, width: 150 }}>
                                Start Bot When
                                </Text>
                                <View style={{  justifyContent: 'center', alignItems: 'center' ,width: 120,height:30,}}>
                                
                                <Dropdown
                                  style={[styles.dropdown, { borderColor: 'white',width: 150}]}
                                  placeholderStyle={styles.placeholderStyle}
                                  selectedTextStyle={styles.selectedTextStyle}
                                  inputSearchStyle={styles.inputSearchStyle}
                                  iconStyle={styles.iconStyle}
                                  data={bolgWhen}
                                  activeColor={'grey'}
                                  containerStyle={{marginTop:-25,borderRadius:10,backgroundColor:'#bbb'}}
                                  
                                  selectedTextProps={{numberOfLines:1}}
                                  dropdownPosition={'bottom'}
                                  showsVerticalScrollIndicator={false}
                                  maxHeight={200}
                                  labelField="label"
                                  valueField="value"
                                  // placeholder={!isFocus ? 'Select item' : '...'}
                                  // searchPlaceholder="Search..."
                                  value={bollgr}
                                  // onFocus={() => setIsFocus(true)}
                                  // onBlur={() => setIsFocus(false)}
                                  onChange={item => {
                                    setBollgr(item.value);
                                    // setIsFocus(false);
                                  }}
                                 
                                />
                                </View>
                            </View>                            
         
                    
          </View>
{/* end of signal settings */}
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 16,
            padding: 12,
            marginLeft: 14,
            fontWeight: 'bold',
          }}>
          TRADE START SETTINGS:
        </Text>
        <View
          style={{
            elevation: 10,
            width: '90%',
            alignSelf: 'center',
            
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            marginBottom: 20,
          }}>
              
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 0.5, borderBottomColor: '#80808080', width: '100%', paddingVertical: 8 }}>
                                <Text style={{ color: '#787f8a', fontSize: 16, width: 150 }}>
                                   Number Of Cycles
                                </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <TextInput
                                        keyboardType={'number-pad'}
                                        autoCapitalize="none"
                                        onChangeText={(val) => {
                                            setTheCycles(val)
                                            
                                        }}
                                       
                                        value={cycles}
                                        width={75}
                                        height={42}
                                        color={colors.selected}
                                        style={{ marginTop: 5 }}
                                        selectionColor={'#787f8a'}
                                    />
                                   
                                </View>
                            </View>
                            <Text style={{color:colors.losscolor,alignSelf: 'flex-start'}}>NOTE: This is applicable only in cycle mode !</Text>

                            {cycles !== '' && cycles !== '0'&&hedge ?
                                <TouchableOpacity onPress={() => { setCC(true), setNormal(false) }} style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.5, borderBottomColor: '#80808080', width: '100%', paddingVertical: 8 }}>
                                    <Text style={{ color: '#787f8a', fontSize: 16, width: 150 }}>
                                        Cycle Configuration
                                    </Text>
                                    <Text style={{ color: '#787f8a', fontSize: 15, }}>
                                        <IonIcons name="chevron-forward-sharp" size={25} color={colors.selected} />
                                    </Text>
                                </TouchableOpacity> : null} 
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottomWidth: 0.5,
              borderBottomColor: '#80808080',
              width: '100%',
              paddingVertical: 8,
            }}>
            <Text style={{color: '#787f8a', fontSize: 16, width: 150}}>
              Trade Start Callback
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TextInput
                keyboardType={'number-pad'}
                autoCapitalize="none"
                onChangeText={val => {
                  setPTS(val);
                }}
                value={PTS}
                width={75}
                editable={dta.started ==true ? false : true}
                height={42}
                color={colors.selected}
                style={{marginTop: 5}}
                selectionColor={'#787f8a'}
              />
              <Text style={{color: colors.selected, fontSize: 15}}>PIP</Text>
              </View>
          </View>
              {/* <Text style={{color: colors.profitcolor, alignSelf: 'flex-end'}}>
            {parseFloat(PTS * leverage).toFixed(2)} %ROE
          </Text> */}
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 0.5, borderBottomColor: '#80808080', width: '100%', paddingVertical: 8 }}>
                                <Text style={{ color: '#787f8a', fontSize: 16, width: 150 }}>
                                    Trade Reject Callback
                                </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <TextInput
                                        keyboardType={'number-pad'}
                                        autoCapitalize="none"
                                        onChangeText={(val) => {
                                            setTRC(val)
                                        }}
                                       
                                        value={TRC}
                                        width={75}
                                        height={42}
                                        color={colors.selected}
                                        style={{ marginTop: 5 }}
                                        selectionColor={'#787f8a'}
                                    />
                                    <Text style={{ color: colors.selected, fontSize: 15, }}>
                                        PIP
                                    </Text>
                                </View>
                            </View>
                            {/* <Text style={{color:colors.profitcolor,alignSelf: 'flex-end'}}>{TRC * leverage} %ROE</Text> */}
            
      
          <View
            style={{
              display: hedge ? 'flex' : 'none',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottomWidth: 0.5,
              borderBottomColor: '#80808080',
              width: '100%',
              paddingVertical: 8,
            }}>
            <Text style={{color: '#787f8a', fontSize: 16, width: 150}}>
              Hedge Reverse Direction Trigger
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                display: hedge ? 'flex' : 'none',
              }}>
              <TextInput
                keyboardType={'number-pad'}
                autoCapitalize="none"
                onChangeText={val => {
                  setHRT(val);
                }}
                value={HRT}
                width={75}
                editable={true}
                height={42}
                color={colors.selected}
                style={{marginTop: 5}}
                selectionColor={'#787f8a'}
              />
              <Text style={{color: colors.selected, fontSize: 15}}>PIP</Text>
            </View>
          </View>
          {/* <Text style={{color: colors.profitcolor, alignSelf: 'flex-end',display: hedge ? 'flex' : 'none',}}>
            {parseFloat(HRT * leverage).toFixed(2)} %ROE
          </Text> */}
          <View style={{display:hedge?'flex':'none', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 0.5, borderBottomColor: '#80808080', width: '100%', paddingVertical: 8 }}>
                                <Text style={{ color: '#787f8a', fontSize: 16, width: 150 }}>
                                    hedge reverse trigger (Lot Size)
                                </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',display:hedge?'flex':'none' }}>
                                    <TextInput
                                        keyboardType={'number-pad'}
                                        autoCapitalize="none"
                                        onChangeText={(val) => {
                                            setHedgeFOA(val)
                                        }}                                        
                                        value={hedgeFOA}
                                        width={75}
                                        editable={true}
                                        height={42}
                                        color={colors.selected}
                                        style={{ marginTop: 5 }}
                                        selectionColor={'#787f8a'}
                                    />
                                    <Text style={{ color: colors.selected, fontSize: 15, }}>
                                        times
                                    </Text>
                                </View>
                            </View>                            
          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottomWidth: 0.5,
              borderBottomColor: '#80808080',
              width: '100%',
              paddingVertical: 8,
            }}>
            <Text style={{color: '#787f8a', fontSize: 16, width: 150}}>
              BTC callback
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TextInput
                keyboardType={'number-pad'}
                autoCapitalize="none"
                onChangeText={val => {
                  setBTC_call(val);
                }}
                color={colors.selected}
                value={BTC_call}
                width={35}
                height={42}
                editable={dta.started ==true ? false : true}
                style={{marginTop: 5}}
                selectionColor={'#787f8a'}
              />
              <Text style={{color: colors.selected, fontSize: 15}}>USD</Text>
            </View>
          </View> */}
          {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 0.5, borderBottomColor: '#80808080', width: '100%', paddingVertical: 8,marginBottom:5 }}>
                            <Text style={{ color: '#787f8a', fontSize: 16, width: 150 }}>
                            BTC Callback Time
                            </Text>
                            <View style={{flexDirection: 'row',alignItems: 'center'}}>
                            <Text
                            onPress={() => {setShowBTCTime(!showBTCTime)}}
                            style={{
                              padding:10,
                              color: colors.selected,
                              fontSize: 15,
                              textAlign: 'center',
                            }}>
                            {BTCTime&&BTCTime.toUpperCase()}
                          </Text> 
                          
                          <Entypo name="chevron-down" size={18} color={colors.selected}  />
                          </View>
                        </View> */}
                          {showBTCTime?   
                          <View style={{width:'100%',alignItems: 'flex-end',position:'absolute',top:'20%',left:20}}>
                              <View style={{flexDirection: 'column',backgroundColor:colors.border,borderRadius:5,justifyContent:'center',alignItems: 'flex-start',paddingLeft:'5%',width:'30%'}}>
                               <TouchableOpacity onPress={()=>{setBTCTime('5m'),setShowBTCTime(false)}} style={{padding:10,width:'100%'}}>
                                 <Text style={{fontSize:16}}>5M</Text>
                               </TouchableOpacity>
                               <TouchableOpacity onPress={()=>{setBTCTime('15m'),setShowBTCTime(false)}} style={{padding:10,width:'100%'}}>
                                 <Text style={{fontSize:16}}>15M</Text>
                               </TouchableOpacity>
                               <TouchableOpacity onPress={()=>{setBTCTime('30m'),setShowBTCTime(false)}} style={{padding:10,width:'100%'}}>
                                 <Text style={{fontSize:16}}>30M</Text>
                               </TouchableOpacity>
                               <TouchableOpacity onPress={()=>{setBTCTime('1h'),setShowBTCTime(false)}} style={{padding:10,width:'100%'}}>
                                 <Text style={{fontSize:16}}>1H</Text>
                               </TouchableOpacity>
                               <TouchableOpacity onPress={()=>{setBTCTime('4h'),setShowBTCTime(false)}} style={{padding:10,width:'100%'}}>
                                 <Text style={{fontSize:16}}>4H</Text>
                               </TouchableOpacity>
                               <TouchableOpacity onPress={()=>{setBTCTime('1d'),setShowBTCTime(false)}} style={{padding:10,width:'100%'}}>
                                 <Text style={{fontSize:16}}>1D</Text>
                               </TouchableOpacity>
                                 
                              
                              </View>



                          </View>
                        
                        
                        
                        :null
                        }
          </View>
          <Text
          style={{
            color: '#FFFFFF',
            fontSize: 16,
            padding: 12,
            marginLeft: 14,
            fontWeight: 'bold',
          }}>
          TRADE  SETTINGS:
        </Text>
          <View
          style={{
            elevation: 10,
            width: '90%',
            alignSelf: 'center',
            
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            marginBottom: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              paddingVertical: 8,
            }}>
            <Text style={{color: colors.losscolor, fontSize: 16, width: 150}}>
              Stop Loss
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TextInput
                keyboardType={'number-pad'}
                autoCapitalize="none"
                onChangeText={val => {
                  setStopLoss(val);
                }}
                color={colors.losscolor}
                value={stopLoss}
                width={35}
                height={42}
                style={{marginTop: 5}}
                selectionColor={'#787f8a'}
              />
              <Text style={{color: colors.losscolor, fontSize: 15}}>PIP</Text>
            </View>
          </View>
          {/* <Text style={{color: colors.profitcolor, alignSelf: 'flex-end'}}>
            {parseFloat(stopLoss * leverage).toFixed(2)} %ROE
          </Text> */}
          <Text
            style={{
              width: '100%',
              color: colors.border,
              alignSelf: 'flex-start',
              borderBottomWidth: 0.5,
              borderBottomColor: '#80808080',
            }}>
            <Text style={{color: '#fff'}}>NOTE : </Text>Stop Loss will hit after
            all Avg margin calls !{'\n\n'}if you don't want to apply stop loss ,
            set Stop Loss to 0 PIP
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 0.5, borderBottomColor: '#80808080', width: '100%', paddingVertical: 8 }}>
                                <Text style={{ color: '#787f8a', fontSize: 14, width: '60%'}}>
                                   Trailing Stop Loss Type 
                                </Text>
                                <View style={{ flexDirection: 'column', justifyContent: 'space-around', alignItems: 'flex-start',width: '30%' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                
                               
                                  <RadioButton
                                  disabled={dta.started == true ? true : false}
                                    value="auto"
                                    status={ checked === 'auto' ? 'checked' : 'unchecked' }
                                    onPress={() => setChecked('auto')}
                                    />
                                     <Text style={{ color: colors.border, fontSize: 16 }}>
                                   Auto 
                                </Text>
                                    </View>
                                  <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                   
                                  <RadioButton
                                  disabled={dta.started == true ? true : false}
                                    value="custom"
                                    status={ checked === 'custom' ? 'checked' : 'unchecked' }
                                    onPress={() => {setTrailStopLoss('0'),setChecked('custom')}}
                                    />
                                <Text style={{ color: colors.border, fontSize: 16 }}>
                                   Custom 
                                 </Text>
                                </View>
                                </View>
                            </View>
                            {checked=='custom'?
                            <Text
                                style={{
                                width: '100%',
                                color: colors.border,
                                alignSelf: 'flex-start',
                                borderBottomWidth: 0.5,
                                borderBottomColor: '#80808080',
                                }}>
                                <Text style={{color: '#fff'}}>NOTE : </Text>
                                This will be set after the trade has been started! 
                            </Text>
                                    :
                                    <Text
                                    style={{
                                    width: '100%',
                                    color: colors.border,
                                    alignSelf: 'flex-start',
                                    borderBottomWidth: 0.5,
                                    borderBottomColor: '#80808080',
                                    }}>
                                    <Text style={{color: '#fff'}}>NOTE : </Text>
                                   TSL will auto update  ! 
                                </Text>

                                    }
          <View style={{display:checked=='custom'?'none':'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 0.5, borderBottomColor: '#80808080', width: '100%', paddingVertical: 8 }}>
                                <Text style={{ color: '#787f8a', fontSize: 16, width: 150 }}>
                                   Trailing Stop Loss 
                                </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <TextInput
                                        keyboardType={'number-pad'}
                                        autoCapitalize="none"
                                        onChangeText={(val) => {
                                            setTrailStopLoss(val)
                                        }}
                                        color={colors.selected}
                                        value={trailstopLoss}
                                        width={35}
                                        height={42}

                                        style={{ marginTop: 5 }}
                                        selectionColor={'#787f8a'}
                                    />
                                    <Text style={{ color: colors.selected, fontSize: 15, }}>
                                        PIP
                                    </Text>
                                </View>
                            </View>
        
          {/* <Text style={{color:colors.profitcolor,alignSelf: 'flex-end'}}>{parseFloat(trailstopLoss)*parseFloat(leverage)}%ROE</Text> */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottomWidth: 0.5,
              borderBottomColor: '#80808080',
              width: '100%',
              paddingVertical: 8,
            }}>
            <Text style={{color: '#787f8a', fontSize: 16, width: 150}}>
              Margin call limit ( For Averaging)
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TextInput
                keyboardType={'number-pad'}
                autoCapitalize="none"
                onChangeText={val => {
                  if (val >= 131) {
                    val = '131';
                  }
                  console.log(val);
                  setMCL(val);
                  if (val > SVal.length) {
                    console.log(
                      'value is changed here' + val + ' ' + SVal.length,
                    );
                    for (let i = SVal.length - 1; i < val; i++) {
                      var value_to_add = 0;
                      var value_to_add_limit = 0;
                      console.log('value of i is' + i);
                      console.log('value of sval length is' + SVal.length);
                      if (i == 3) {
                        value_to_add = 4.5;
                        value_to_add_limit = 1;
                      }
                      if (i == 4) {
                        value_to_add = 5;
                        value_to_add_limit = 1;
                      }
                      if (i == 5) {
                        value_to_add = 8;
                        value_to_add_limit = 1;
                      }
                      if (i == 6) {
                        value_to_add = 10;
                        value_to_add_limit = 1;
                      }
                      if (i >= 7) {
                        value_to_add = 12;
                        value_to_add_limit = 1;
                      }

                      if (i == 0) {
                        m_c_d = value_to_add;
                        m_b_in_r = value_to_add_limit;
                      }
                      if (i > 0) {
                        m_c_d = m_c_d + ',' + value_to_add;
                        m_b_in_r = m_b_in_r + ',' + value_to_add_limit;
                      }

                      setSVal(SVal => [...SVal, value_to_add]);
                      setNVal(NVal => [...NVal, value_to_add_limit]);
                    }
                    console.log(SVal);
                    console.log(NVal);
                  }

                  mc_calculate(val);
                }}
                color={colors.selected}
                value={parseFloat(MCL) > 131 ? '131' : MCL}
                editable={dta.started ==true ? false : true}
                width={35}
                height={42}
                style={{marginTop: 5}}
                selectionColor={'#787f8a'}
                maxLength={2}
              />
              <Text style={{color: colors.selected, fontSize: 15}}>Time</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 0.5, borderBottomColor: '#80808080', width: '100%', paddingVertical: 8 }}>
                                <Text style={{ color: '#787f8a', fontSize: 16, width: 150 }}>
                                   Position Mode Starts from
                                </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <TextInput
                                        keyboardType={'number-pad'}
                                        autoCapitalize="none"
                                        onChangeText={(val) => {
                                            setSubBin(val)
                                            
                                        }}
                                       
                                        value={subBin}
                                        width={75}
                                        height={42}
                                        color={colors.selected}
                                        style={{ marginTop: 5 }}
                                        selectionColor={'#787f8a'}
                                    />
                                   
                                </View>
                            </View>
          {MCL !== '' && MCL !== '0' ? (
            <TouchableOpacity
              onPress={() => {
                setMC(true), setNormal(false);
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 0.5,
                borderBottomColor: '#80808080',
                width: '100%',
                paddingVertical: 8,
              }}>
              <Text style={{color: '#787f8a', fontSize: 16, width: 150}}>
                Margin Configuration
              </Text>
              <Text style={{color: '#787f8a', fontSize: 15}}>
                <IonIcons
                  name="chevron-forward-sharp"
                  size={25}
                  color={colors.selected}
                />
              </Text>
            </TouchableOpacity>
          ) : null}

          <View
            style={{
              
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottomWidth: 0.5,
              borderBottomColor: '#80808080',
              width: '100%',
              paddingVertical: 8,
            }}>
            <Text style={{color: '#787f8a', fontSize: 16, width: 150}}>
              Same Direction Margin call limit
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TextInput
                keyboardType={'number-pad'}
                autoCapitalize="none"
                onChangeText={val => {
                  if (val >= 131) {
                    val = '131';
                  }
                  console.log(val);
                  setRMCL(val);
                  if (val > RSVal.length) {
                    for (let i = RSVal.length - 1; i < val; i++) {
                      var value_to_add = 0;
                      var value_to_add_limit = 0;
                      console.log('value of i is' + i);
                      console.log('value of sval length is' + RSVal.length);
                      if (i == 3) {
                        value_to_add = 4.5;
                        value_to_add_limit = 1;
                      }
                      if (i == 4) {
                        value_to_add = 5;
                        value_to_add_limit = 1;
                      }
                      if (i == 5) {
                        value_to_add = 8;
                        value_to_add_limit = 1;
                      }
                      if (i == 6) {
                        value_to_add = 10;
                        value_to_add_limit = 1;
                      }
                      if (i >= 7) {
                        value_to_add = 12;
                        value_to_add_limit = 1;
                      }

                      if (i == 0) {
                        Rm_c_d = value_to_add;
                        Rm_b_in_r = value_to_add_limit;
                      }
                      if (i > 0) {
                        Rm_c_d = m_c_d + ',' + value_to_add;
                        Rm_b_in_r = m_b_in_r + ',' + value_to_add_limit;
                      }

                      setRSVal(RSVal => [...RSVal, value_to_add]);
                      setRNVal(RNVal => [...RNVal, value_to_add_limit]);
                    }
                    console.log(RSVal);
                    console.log(RNVal);
                  }

                  mc_calculate(val, 'reverse');
                }}
                color={colors.selected}
                value={parseFloat(RMCL) > 131 ? '131' : RMCL}
                editable={dta.started ==true ? false : true}
                width={35}
                height={42}
                style={{marginTop: 5}}
                selectionColor={'#787f8a'}
                maxLength={2}
              />
              <Text style={{color: colors.selected, fontSize: 15}}>Time</Text>
            </View>
          </View>
          {RMCL !== '' ? (
            <TouchableOpacity
              onPress={() => {
                setRMC(true), setNormal(false);
              }}
              style={{
                
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 0.5,
                borderBottomColor: '#80808080',
                width: '100%',
                paddingVertical: 8,
              }}>
              <Text style={{color: '#787f8a', fontSize: 16, width: 250}}>
                Same Direction Margin Configuration
              </Text>
              <Text style={{color: '#787f8a', fontSize: 15}}>
                <IonIcons
                  name="chevron-forward-sharp"
                  size={25}
                  color={colors.selected}
                />
              </Text>
            </TouchableOpacity>
          ) : null}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottomWidth: 0.5,
              borderBottomColor: '#80808080',
              width: '100%',
              paddingVertical: 8,
            }}>
            <Text style={{color: colors.profitcolor, fontSize: 16, width: 150}}>
              Take Profit ratio
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TextInput
                keyboardType={'number-pad'}
                autoCapitalize="none"
                onChangeText={val => {
                  setWPR(val);
                }}
                // color={colors.selected}
                value={WPR}
                width={35}
                height={42}
                style={{marginTop: 5}}
                color={colors.profitcolor}
                selectionColor={'#787f8a'}
              />
              <Text style={{color: colors.profitcolor, fontSize: 15}}>PIP</Text>
            </View>
          </View>
          {/* <Text style={{color: colors.profitcolor, alignSelf: 'flex-end'}}>
            {parseFloat(WPR * leverage).toFixed(2)} %ROE
          </Text> */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottomWidth: 0.5,
              borderBottomColor: '#80808080',
              width: '100%',
              paddingVertical: 8,
            }}>
            <Text style={{color: '#787f8a', fontSize: 16, width: 150}}>
              Take Profit callback
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TextInput
                keyboardType={'number-pad'}
                autoCapitalize="none"
                onChangeText={val => {
                  setWPC(val);
                }}
                color={colors.selected}
                value={WPC}
                width={35}
                height={42}
                style={{marginTop: 5}}
                selectionColor={'#787f8a'}
              />
              <Text style={{color: colors.selected, fontSize: 15}}>PIP</Text>
            </View>
          </View>
          {/* <Text style={{color: colors.profitcolor, alignSelf: 'flex-end'}}>
            {parseFloat(WPC * leverage).toFixed(2)} %ROE
          </Text> */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottomWidth: 0.5,
              borderBottomColor: '#80808080',
              width: '100%',
              paddingVertical: 8,
            }}>
            <Text style={{color: '#787f8a', fontSize: 16, width: 150}}>
              Buy in callback
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TextInput
                keyboardType={'number-pad'}
                autoCapitalize="none"
                onChangeText={val => {
                  setBC(val);
                }}
                color={colors.selected}
                value={BC}
                width={35}
                height={42}
                style={{marginTop: 5}}
                selectionColor={'#787f8a'}
              />
              <Text style={{color: colors.selected, fontSize: 15}}>PIP</Text>
            </View>
          </View>
          {/* <Text style={{color: colors.profitcolor, alignSelf: 'flex-end'}}>
            {parseFloat(BC * leverage).toFixed(2)} %ROE
          </Text> */}

          {parseFloat(MCL) >= 5 ? (
            <View>
              <TouchableOpacity
                onPress={() => {
                  setDPA(true), setNormal(false), dpa_calculate();
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#80808080',
                  width: '100%',
                  paddingVertical: 8,
                  display: 'none',
                }}>
                <Text style={{color: '#787f8a', fontSize: 16, width: 150}}>
                  Distributed and Take Profit Allocation
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#787f8a', fontSize: 15}}>
                    <Text style={{color: '#787f8a', fontSize: 15}}>
                      <IonIcons
                        name="chevron-forward-sharp"
                        size={25}
                        color={colors.selected}
                      />
                    </Text>
                  </Text>
                </View>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  paddingVertical: 8,
                  display: 'none',
                }}>
                <Text style={{color: '#787f8a', fontSize: 16, width: 150}}>
                  Sub-position take-profit callback
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TextInput
                    keyboardType={'number-pad'}
                    autoCapitalize="none"
                    onChangeText={val => {
                      setSPC(val);
                    }}
                    color={colors.selected}
                    value={SPC}
                    width={35}
                    height={42}
                    style={{marginTop: 5}}
                    selectionColor={'#787f8a'}
                  />
                  <Text style={{color: colors.selected, fontSize: 15}}>%</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  paddingVertical: 3,
                  display: 'none',
                }}>
                <Text style={{color: '#787f8a', fontSize: 16, width: 150}}>
                  Gap between 2 Buys
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TextInput
                    keyboardType={'number-pad'}
                    autoCapitalize="none"
                    onChangeText={val => {
                      setGap(val);
                    }}
                    color={colors.selected}
                    value={gap}
                    width={35}
                    height={42}
                    style={{marginTop: 0}}
                    selectionColor={'#787f8a'}
                  />
                  <Text style={{color: colors.selected, fontSize: 15}}>
                    (minutes)
                  </Text>
                </View>
              </View>
            </View>
          ) : null}
        </View>
        {/* <Text
          style={{
            color: '#FFFFFF',
            fontSize: 16,
            padding: 15,
            marginLeft: 14,
            fontWeight: 'bold',
          }}>
          LIQUIDATION SETTINGS:
        </Text> */}
        {/* <View
          style={{
            elevation: 10,
            width: '90%',
            alignSelf: 'center',
            
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            marginBottom: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              paddingVertical: 8,
            }}>
            <Text style={{color: '#787f8a', fontSize: 16, width: 150}}>
              Liq. Add Margin
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TextInput
                keyboardType={'number-pad'}
                autoCapitalize="none"
                onChangeText={val => {
                  setLAM(val);
                }}
                color={colors.selected}
                value={LAM}
                width={45}
                height={42}
                style={{marginTop: 0}}
                selectionColor={'#787f8a'}
              />
              {/* <Text style={{color:colors.selected,fontSize:15,}}>
                             (minutes)
                        </Text> 
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              paddingVertical: 8,
            }}>
            <Text style={{color: '#787f8a', fontSize: 16, width: 150}}>
              Add Margin To Prevent Liquidation At
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TextInput
                keyboardType={'number-pad'}
                autoCapitalize="none"
                onChangeText={val => {
                  setLOP(val);
                }}
                color={colors.selected}
                value={LOP}
                width={35}
                height={42}
                style={{marginTop: 0}}
                selectionColor={'#787f8a'}
              />
              <Text style={{color: colors.selected, fontSize: 15}}>PIP</Text>
            </View>
          </View>
          {/* <Text style={{color: colors.profitcolor, alignSelf: 'flex-end'}}>
            {parseFloat(LOP * leverage).toFixed(2)} %ROE
          </Text> 
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              paddingVertical: 8,
            }}>
            <Text style={{color: '#787f8a', fontSize: 16, width: 150}}>
              Save Liq. Times
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TextInput
                keyboardType={'number-pad'}
                autoCapitalize="none"
                onChangeText={val => {
                  setSLT(val);
                }}
                color={colors.selected}
                value={SLT}
                width={35}
                height={42}
                style={{marginTop: 0}}
                selectionColor={'#787f8a'}
              />
              <Text style={{color: colors.selected, fontSize: 15}}>times</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              paddingVertical: 8,
            }}>
            <Text style={{color: '#787f8a', fontSize: 16, width: 150}}>
              Liq. Notify PIP
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TextInput
                keyboardType={'number-pad'}
                autoCapitalize="none"
                onChangeText={val => {
                  setLNP(val);
                }}
                color={colors.selected}
                value={LNP}
                width={35}
                height={42}
                style={{marginTop: 0}}
                selectionColor={'#787f8a'}
              />
              <Text style={{color:colors.selected,fontSize:15,}}>
                            times
                        </Text> 
            </View>
          </View>
           <Text style={{color: colors.profitcolor, alignSelf: 'flex-end'}}>
            {parseFloat(LNP * leverage).toFixed(2)} %ROE
          </Text> 
        </View> */}

        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              color: colors.lgt_text,
              fontSize: 16,
              width: '80%',
              lineHeight: 25,
              marginBottom: 10,
            }}>
            <Text style={{color: '#00a9ff'}}>Note:</Text> you wont be able to
            change settings of margin call limit and first buy in amount on a
            running bot!
          </Text>
        </View>
      </ScrollView>
    </ImageBackground>
  ) : MC ? (
     <ImageBackground source={global.bgimg}  style={[styles1.container, {}]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 5,
          paddingVertical: 5,
          marginBottom: 10,
          
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            onPress={() => {
              setMC(false), setNormal(true);
            }}
            style={{padding: 10}}>
            <Text style={{textAlign: 'right'}}>
              <IonIcons
                name="chevron-back-sharp"
                size={25}
                color={colors.hgl}
              />
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={[
              styles.heading,
              {
                color: colors.hgl,
                fontSize: 14,
                fontWeight: 'normal',
                fontSize: 16,
              },
            ]}>
            Margin Configuration
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 15,
          }}>
          <Text
            style={[
              styles.heading,
              {
                color: '#787f8a',
                fontSize: 14,
                fontWeight: 'normal',
                fontSize: 16,
              },
            ]}></Text>
        </View>
      </View>
      {/* <View> */}
      <View
        style={{
          marginBottom: '15%',
          width: '90%',
          alignSelf: 'center',
          
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          paddingVertical: 25,
          paddingHorizontal: 15,
        }}>
        <FlatList
          horizontal={false}
          ListHeaderComponent={Header}
          removeClippedSubviews={false}
          data={Data}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          renderItem={({item, index}) => (
            <View style={{marginVertical: 10}}>
              <Text style={{color: colors.hgl, marginLeft: 5}}>
                {index === 0
                  ? 'First'
                  : index === 1
                  ? '2nd'
                  : index === 2
                  ? '3rd'
                  : index + 1 + 'th'}{' '}
                Call
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 5,
                  marginTop: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: colors.c1,
                    elevation: 6,
                    width: 80,
                    alignItems: 'center',
                  }}>
                  <TextInput
                    keyboardType={'number-pad'}
                    autoCapitalize="none"
                    onChangeText={val => {
                    //   if((val*leverage)>85){
                    //     val=85/leverage
                    // }   
                       let new_sval=[...SVal]
                       new_sval[index]=val                                            
                       setSVal(new_sval)
                       console.log(new_sval)
                    }}
                    color={colors.selected}
                    placeholder={'Margin call drop'}
                    width={'70%'}
                    value={SVal[index].toString()}
                    height={40}
                    style={{marginTop: 5, fontWeight: 'bold'}}
                    selectionColor={'#787f8a'}
                    placeholderTextColor={'white'}
                  />
                  <Text style={{color: '#787f8a'}}>%</Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: colors.c1,
                    elevation: 6,
                    width: 120,
                    paddingHorizontal: 10,
                    alignItems: 'center',
                  }}>
                  <TextInput
                    keyboardType={'number-pad'}
                    autoCapitalize="none"
                    onChangeText={val => {
                      handleTextChange(index, val.replace(/[^0-9.]/g, ''));
                    }}
                    color={colors.selected}
                    value={NVal[index].toString()}
                    placeholder={''}
                    width={'70%'}
                    height={40}
                    style={{marginTop: 5, paddingLeft: 15, fontWeight: 'bold'}}
                    selectionColor={'#787f8a'}
                  />

                  <Text style={{color: '#787f8a'}}>Times</Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    elevation: 6,
                    width: 55,
                    backgroundColor: colors.c1,
                justifyContent: 'center',
                    paddingHorizontal: 4,
                    alignItems: 'center',
                    display: RPVal.length > 1 ? 'flex' : 'none',
                  }}>
                  <Text style={{color: colors.selected}}>
                    {RPVal.length > 1 &&
                      parseFloat(RPVal[index]).toFixed(2)}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    elevation: 6,
                    width: 55,
                    justifyContent: 'center',
                    backgroundColor: colors.c1,
                    paddingHorizontal: 4,
                    alignItems: 'center',
                    display: EPVal.length > 1 ? 'flex' : 'none',
                  }}>
                  <Text style={{color: colors.selected}}>
                    {EPVal.length > 1 &&
                      parseFloat(EPVal[index]).toFixed(2)}
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'row',justifyContent: 'space-between',width:'100%'}}>

              {/* <Text
                style={{
                    color: colors.profitcolor,
                    alignSelf: 'flex-start',
                    marginLeft: 15,
                }}>
                {SVal[index] * leverage} %ROE
              </Text> */}
           <View style={{flex:0.65,flexDirection:'row',justifyContent:'space-between'}}>
             
             {/* {RPVal&&RPVal.length>0?
              <Text
                style={{
                  color: colors.profitcolor,
                  alignSelf: 'flex-start',                  
                }}>
                {(RPVal[index] * leverage).toPrecision(2)} %ROE
              </Text>
          :
          null
        } */}
             {/* {EPVal&&EPVal.length>0?
              <Text
              style={{
                color: colors.profitcolor,
                alignSelf: 'flex-start',                
                }}>
                {(EPVal[index] * leverage).toPrecision(2)} %ROE
              </Text>
          :
          null
        } */}
        </View>
            </View>
            </View>
          )}
        />

        <View>
          <TouchableOpacity
            onPress={() => {
              Check_val();
            }}>
            <LinearGradient
              colors={[colors.binanceylw2, colors.binanceylw2]}
              style={[styles.signIn]}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 1}}>
              <Text style={[styles.textSign, {color: 'black'}]}>Confirm</Text>
              {Loading ? (
                <ActivityIndicator size={'small'} color="#d0d0d0" />
              ) : null}
            </LinearGradient>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={() => {
                let final;
                for (let i = 0; i < parseFloat(MCL); i++) {
                  if (SVal[i] != '' && NVal[i] != '') {
                    final = 1;
                  } else {
                    final = 0;
                    break;
                  }
                }
                if (final == 1) {
                    Simulation(0, 'BUY');
                } else {
                  ToastAndroid.show('All fields required', ToastAndroid.SHORT);
                }
                
              }}>
              <LinearGradient
                colors={[colors.text, colors.text]}
                style={[styles.signIn, {width: 150, height: 50}]}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 1}}>
                <Text
                  style={[
                    styles.textSign,
                    {color: colors.selected, fontSize: 16, textAlign: 'center'},
                  ]}>
                  Run Simulation for LONG
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                let final;
                for (let i = 0; i < parseFloat(MCL); i++) {
                  if (SVal[i] != '' && NVal[i] != '') {
                    final = 1;
                  } else {
                    final = 0;
                    break;
                  }
                }
                if (final == 1) {
                    Simulation(0, 'SELL');
                } else {
                  ToastAndroid.show('All fields required', ToastAndroid.SHORT);
                }
               
              }}>
              <LinearGradient
                colors={[colors.text, colors.text]}
                style={[styles.signIn, {width: 150, height: 50}]}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 1}}>
                <Text
                  style={[
                    styles.textSign,
                    {color: colors.selected, fontSize: 16, textAlign: 'center'},
                  ]}>
                  Run Simulation for SHORT
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* </View> */}
    </ImageBackground>
  ) : RMC ? (
     <ImageBackground source={global.bgimg}  style={[styles1.container, {}]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 5,
          paddingVertical: 5,
          marginBottom: 10,
          
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            onPress={() => {
              setRMC(false), setNormal(true);
            }}
            style={{padding: 10}}>
            <Text style={{textAlign: 'right'}}>
              <IonIcons
                name="chevron-back-sharp"
                size={25}
                color={colors.hgl}
              />
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={[
              styles.heading,
              {
                color: colors.hgl,
                fontSize: 14,
                fontWeight: 'normal',
                fontSize: 16,
              },
            ]}>
            Same Direction Margin Configuration
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 15,
          }}>
          <Text
            style={[
              styles.heading,
              {
                color: '#787f8a',
                fontSize: 14,
                fontWeight: 'normal',
                fontSize: 16,
              },
            ]}></Text>
        </View>
      </View>
      {/* <View> */}
      <View
        style={{
          marginBottom: '15%',
          width: '90%',
          alignSelf: 'center',
          
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          paddingVertical: 25,
          paddingHorizontal: 15,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <Text
            style={{
              color: colors.hgl,
              fontSize: 16,
              width: 150,
              textAlign: 'center',
            }}>
            Same Direction Margin call drop
          </Text>

          <Text
            style={{
              color: colors.hgl,
              fontSize: 16,
              width: 150,
              textAlign: 'center',
            }}>
            Same Direction Margin Buy in ratio
          </Text>
        </View>

        <FlatList
          horizontal={false}
          removeClippedSubviews={false}
          data={RData}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          renderItem={({item, index}) => (
            <View style={{marginVertical: 10}}>
              <Text style={{color: colors.hgl, marginLeft: 5}}>
                {index === 0
                  ? 'First'
                  : index === 1
                  ? '2nd'
                  : index === 2
                  ? '3rd'
                  : index + 1 + 'th'}{' '}
                Call
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 5,
                  marginTop: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: colors.c1,
                    elevation: 6,
                    width: 80,
                    alignItems: 'center',
                  }}>
                  <TextInput
                    keyboardType={'number-pad'}
                    autoCapitalize="none"
                    onChangeText={val => {
                      handleRChange(index, val);
                    }}
                    color={colors.selected}
                    placeholder={'Margin call drop'}
                    width={'70%'}
                    value={RSVal[index].toString()}
                    height={40}
                    style={{marginTop: 5, fontWeight: 'bold'}}
                    selectionColor={'#787f8a'}
                    placeholderTextColor={'white'}
                  />
                  <Text style={{color: '#787f8a'}}>PIP</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: colors.c1,
                    elevation: 6,
                    width: 140,
                    paddingHorizontal: 10,
                    alignItems: 'center',
                  }}>
                  <TextInput
                    keyboardType={'number-pad'}
                    autoCapitalize="none"
                    onChangeText={val => {
                      handleRTextChange(index, val.replace(/[^0-9.]/g, ''));
                    }}
                    color={colors.selected}
                    value={RNVal[index].toString()}
                    placeholder={'Multiple Buy in ratio'}
                    width={'70%'}
                    height={40}
                    style={{marginTop: 5, paddingLeft: 15, fontWeight: 'bold'}}
                    selectionColor={'#787f8a'}
                  />

                  <Text style={{color: '#787f8a'}}>Times</Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: colors.c1,
                    elevation: 6,
                    width: 80,
                    alignItems: 'center',
                    display: 'none',
                  }}>
                  <TextInput
                    keyboardType={'number-pad'}
                    autoCapitalize="none"
                    onChangeText={val => {
                      handleRTextChange(index, val.replace(/[^0-9]/g, ''));
                    }}
                    color={colors.selected}
                    value={RNVal[index].toString()}
                    placeholder={'Multiple Buy in ratio'}
                    width={'70%'}
                    height={40}
                    style={{marginTop: 5, paddingLeft: 15, fontWeight: 'bold'}}
                    selectionColor={'#787f8a'}
                  />
                </View>
              </View>
              {/* <Text
                style={{
                  color: colors.profitcolor,
                  alignSelf: 'flex-start',
                  marginLeft: 35,
                }}>
                {RSVal[index] * leverage} %ROE
              </Text> */}
            </View>
          )}
        />

        <View>
          <TouchableOpacity
            onPress={() => {
              RCheck_val();
            }}>
            <LinearGradient
              colors={[colors.binanceylw2, colors.binanceylw2]}
              style={[styles.signIn]}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 1}}>
              <Text style={[styles.textSign, {color: 'black'}]}>Confirm</Text>
              {Loading ? (
                <ActivityIndicator size={'small'} color="#d0d0d0" />
              ) : null}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      {/* </View> */}
    </ImageBackground>
  ) : DPA ? (
     <ImageBackground source={global.bgimg}  style={[styles1.container, {backgroundColor: colors.background}]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 5,
          paddingVertical: 5,
          marginBottom: 10,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            onPress={() => {
              setDPA(false), setNormal(true);
            }}
            style={{padding: 10}}>
            <Text style={{textAlign: 'right'}}>
              <IonIcons
                name="chevron-back-sharp"
                size={25}
                color={colors.hgl}
              />
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            display: 'none',
          }}>
          <Text
            style={[
              styles.heading,
              {
                color: colors.hgl,
                fontSize: 14,
                fontWeight: 'normal',
                fontSize: 16,
              },
            ]}>
            Distributed and Take Profit...
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 15,
          }}>
          <Text
            style={[
              styles.heading,
              {
                color: '#787f8a',
                fontSize: 14,
                fontWeight: 'normal',
                fontSize: 16,
              },
            ]}></Text>
        </View>
      </View>

      <FlatList
        horizontal={false}
        removeClippedSubviews={false}
        data={DPA_Data}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) => (
          <View style={{marginVertical: 10}}>
            <View
              style={{
                elevation: 10,
                width: '90%',
                alignSelf: 'center',
                
                flexDirection: 'column',
                justifyContent: 'space-between',
                paddingHorizontal: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#80808080',
                  width: '100%',
                  paddingVertical: 8,
                }}>
                <Text style={{color: '#787f8a', fontSize: 16, width: 150}}>
                  {index + 5} sub-position
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TextInput
                    keyboardType={'number-pad'}
                    autoCapitalize="none"
                    onChangeText={val => {
                      handleDPA_change(index, val);
                    }}
                    color={'#787f8a'}
                    width={25}
                    height={35}
                    value={DVal[index].toString()}
                    style={{marginTop: 5}}
                    selectionColor={colors.selected}
                    maxLength={3}
                  />
                  <Text style={{color: '#787f8a', fontSize: 15}}>%</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </ImageBackground>
  )  : 
  CC?
   <ImageBackground source={global.bgimg}  style={[styles1.container, {  }]}>


  <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5, paddingVertical: 5, marginBottom: 10,  }}>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
          <TouchableOpacity onPress={() => { setMC(false), setNormal(true) }} style={{ padding: 10 }}>
              <Text style={{ textAlign: 'right' }}><IonIcons name="chevron-back-sharp" size={25} color={colors.hgl} /></Text>
          </TouchableOpacity>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', }}>
          <Text style={[styles.heading, { color: colors.hgl, fontSize: 14, fontWeight: 'normal', fontSize: 16 }]}>Cycle Configuration</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 15, }}>
          <Text style={[styles.heading, { color: '#787f8a', fontSize: 14, fontWeight: 'normal', fontSize: 16 }]}></Text>
      </View>
  </View>
  {/* <View> */}
  <View style={{
      marginBottom: '15%', width: '90%', alignSelf: 'center', 
      flexDirection: 'column', justifyContent: 'space-evenly', paddingVertical: 25, paddingHorizontal: 15
  }}>
     
      <FlatList
          horizontal={false}

          removeClippedSubviews={false}
          data={cycleData}
          ListHeaderComponent={CycleHeader}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => (
              index>99?null:
              <View style={{ marginVertical: 10 }}>
                  
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center', paddingHorizontal: 5, marginTop: 10 }}>
                      <Text style={{color:colors.selected,textAlign:'center',flex:0.3}}>{index+1} . </Text>
                      <View style={{ flexDirection: 'row', backgroundColor: colors.c1, elevation: 6,flex:0.5,  alignItems: 'center' }}>
                          <TextInput
                              keyboardType={'number-pad'}
                              autoCapitalize="none"
                              onChangeText={(val) => {                                                                                                                                                                                                       
                                  let new_cval=[...CVal]
                                  new_cval[index]=val                                            
                                  setCVal(new_cval)
                                  console.log(new_cval)                                                                                                       
                              }}
                              color={colors.selected}                                                
                              width={'40%'}
                              value={(CVal[index]).toString()}
                              height={40}
                              style={{ marginLeft:20, fontWeight: 'bold', }}
                              selectionColor={'#787f8a'}
                              placeholderTextColor={'white'}
                          />
                          <Text style={{ color: '#787f8a' }}>Times</Text>
                      </View>
                     
                  
                  </View>
                  
              </View>
          )}
      />



          <TouchableOpacity onPress={() => {
              
              Check_val()

          }} >
              <LinearGradient
                  colors={[colors.binanceylw2, colors.binanceylw2]}
                  style={[styles.signIn]}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 1 }}
                  >
                  <Text style={[styles.textSign, { color: 'black' }]}>Confirm</Text>
                  {Loading ? <ActivityIndicator size={'small'} color="#d0d0d0" /> : null}
              </LinearGradient>
          </TouchableOpacity>
          <Text style={{color:colors.losscolor,textAlign: 'center'}}>NOTE : Value for the cycles abover 100 will be picked automatically same as that of the 100th no. cycle .</Text>
  </View>
  {/* </View> */}
</ImageBackground>


  :null
};

export default TradeSettingScreen;
const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1725',
    paddingTop: 40,
  },
  textInput: {
    marginLeft: 15,
    marginTop: -15,
    paddingBottom: -10,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  bx: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    // borderWidth:1,
    borderRadius: 10,
    // borderColor:"#3D3F70",
    paddingVertical: 10,
    // backgroundColor:'#ff0000',
    paddingHorizontal: 10,
    marginHorizontal: 5,
    width: 100,
    alignItems: 'center',
    height: 90,
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
