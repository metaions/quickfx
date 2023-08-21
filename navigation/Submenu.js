import * as React from 'react';
import { List, Switch } from 'react-native-paper';
import {
  FlatList, Image, ToastAndroid, View, Text, TouchableOpacity, Linking, ImageBackground
  , StyleSheet, ActivityIndicator
} from 'react-native';
import {
  ThemeProvider,
  useFocusEffect,
  useIsFocused,
  useTheme,
  useLinkTo,
  useNavigation
} from '@react-navigation/native';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import global from '../component/global'
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from '../component/context';
import RBSheet from 'react-native-raw-bottom-sheet';
import { jsonContext } from '../context/GlobalState';
import TouchID from 'react-native-touch-id';
import LottieView from 'lottie-react-native';
import { DrawerContentScrollView, DrawerItem, useIsDrawerOpen } from '@react-navigation/drawer';
var DeviceInfo = require('react-native-device-info');
const Submenu = ({ navigation }) => {
  const drawerOpen = useIsDrawerOpen()
  const myVersion = DeviceInfo.getVersion()
  let listViewRef;
  let listViewRefRules;
  let listViewRefBroker;
  const { hedge, setHedge, safemode, setSafeMode, otpMode, setOtpMode, appVer } = React.useContext(jsonContext);
  const { colors } = useTheme();
  const theme = useTheme();
  const linkTo = useLinkTo();
  const refRBSheet1 = React.useRef();
  const refRBSheet2 = React.useRef();
  const [Uid, setUid] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  const [Bal, setBal] = React.useState('');
  const [poolBal, setPoolBal] = React.useState('');
  const [poolProfitBal, setPoolProfitBal] = React.useState('');
  const [Bonus, setBonus] = React.useState('');
  const [eBal, setEBal] = React.useState('');
  const [device_List, setDevice_List] = React.useState('');
  const [Tour, setTour] = React.useState(false);
  const [Rules, setRules] = React.useState(false);
  const [gBal, setGBal] = React.useState('');
  const [Loading, setLoading] = React.useState(true);
  const [hide_Hedge, setHide_Hedge] = React.useState(false);
  const [hide_Safe, setHide_Safe] = React.useState(false);
  const [hide_OTP, setHide_OTP] = React.useState(false);
  const [currency, setCurrency] = React.useState('');
  const [Vip, setVip] = React.useState(false);
  const [Ld, setLd] = React.useState(false);
  const [Rates, setRates] = React.useState('');
  const [Cur, setCur] = React.useState(global.cur_name);
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = React.useState(true);
  const [refreshAsset, setRefreshAsset] = React.useState(false);
  const [refreshPool, setRefreshPool] = React.useState(false);
  const [refreshPoolP, setRefreshPoolP] = React.useState(false);
  const [refreshBonus, setRefreshBonus] = React.useState(false);
  const [refreshIncome, setRefreshIncome] = React.useState(false);
  const [ACT, setACT] = React.useState(true);
  const [ACT_Code, setACT_Code] = React.useState('');
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isEnabled, setIsEnabled] = React.useState('');
  const { toggleTheme } = React.useContext(AuthContext);
  const { signOut } = React.useContext(AuthContext);
  const [cBox, setcBox] = React.useState('unchecked');
  const [brokerModal, setBrokerModal] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [isHedgeOn, setHedgeOn] = React.useState(false);
  const [isSafeOn, setSafeOn] = React.useState(false);
  // console.log('otpmode seee::::::'+otpMode)
  const [isOtpOn, setIsOtpOn] = React.useState(otpMode == 'false' ? false : true);
  const { App_Lock } = React.useContext(AuthContext);
  const [isModalVisible1, setModalVisible1] = React.useState(false);
  const [isModalVisibleRenew, setModalVisibleRenew] = React.useState(false);
  const [renewAnnualSel, setRenewAnnualSel] = React.useState(true);
  const [actCode, setActCode] = React.useState('');
  // console.log('app ver is:  '+appVer);
  if (drawerOpen) {
    if (Bal !== global.vbal) {
      setBal(global.vbal)
    }
    if (Bonus !== global.bbal) {
      setBonus(global.bbal)
    }
    if (poolBal !== global.pbal) {
      setPoolBal(global.pbal)
    }
    if (poolProfitBal !== global.rbal) {
      setPoolProfitBal(global.rbal)
    }
    if (eBal !== global.ebal) {
      setEBal(global.ebal)
    }
  }
  console.log(`======${global.AMT}`)


  React.useEffect(() => {
    if (checked) {
      setcBox('checked');
    } else {
      setcBox('unchecked');
    }
  }, [checked]);
  React.useEffect(() => {
    setHedgeOn(hedge);
  }, [hedge]);
  React.useEffect(() => {
    console.log(safemode, ' this is the safe mode ')
    setSafeOn(safemode)
  }, [safemode]);
  const onToggleSwitch = () => {
    // console.log('ontoggleswithc');
    if (isSwitchOn) {
      setIsSwitchOn(false);
      App_Lock('false');
      ToastAndroid.show('FingerPrint Deactivated', ToastAndroid.SHORT);
    } else if (!isSwitchOn) {
      biometricCheck();
    }
  };
  const onHedgeSwitch = () => {
    setHide_Hedge(true)
    let mode;
    if (isHedgeOn) {

      mode = 'normal'
    } else {

      mode = 'hedge'
    }

    global.api_key_data == '';
    let url = global.BASE_URL + 'css_mob/hedge/togglemode.aspx?uid=' + global.uid + '&mode=' + mode + "&wmode=" + global.AccMode;
    console.log(url)
    fetch(url)
      .then(item => item.json())
      .then(data => {
        ToastAndroid.show(data.msg, ToastAndroid.SHORT)
        if (data.success == 'True') {
          if (isHedgeOn) {
            setHedgeOn(false);
            setHedge(false)

          } else {
            setHedge(true)
            setHedgeOn(true)

          }

        }
      }).then(() => {
        setHide_Hedge(false)
      })

  };
  const onSafeSwitch = () => {
    setHide_Safe(true)
    let mode
    if (isSafeOn) {
      mode = false
    } else {

      mode = true
    }
    let url = global.BASE_URL + 'css_mob/safemode.aspx?uid=' + global.uid + '&safe=' + mode
    console.log(url)
    fetch(url)
      .then(item => item.json())
      .then(data => {
        console.log(data)
        if (data.success === 'True') {
          setSafeOn(!isSafeOn)
          setSafeMode(!safemode)
        }
        ToastAndroid.show(data.msg, ToastAndroid.SHORT)
      }).then(() => {
        setHide_Safe(false)
      })

    // setSafeOn(!isSafeOn)
    // setTimeout(() =>{
    //   setHide_Safe(false)       
    // },500)
  };
  const onOTPSwitch = () => {
    setHide_OTP(true)
    let mode
    if (otpMode) {
      mode = false
    } else {

      mode = true
    }
    let url = global.BASE_URL + 'css_mob/loginotp.aspx?uid=' + global.uid + '&loginotp=' + mode +
      '&token=' +
      global.token +
      '&device=' +
      DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel();
    console.log(url)
    fetch(url)
      .then(item => item.json())
      .then(data => {
        console.log(data)
        if (data.success === 'True') {


          setOtpMode(!otpMode)

          // setIsOtpOn(!isOtpOn)
        }
        ToastAndroid.show(data.msg, ToastAndroid.SHORT)
      }).then(() => {
        setHide_OTP(false)
      })


  };

  async function setAsyncVals(name, val) {
    console.log('setasync vals');
    await AsyncStorage.setItem('cur_name', name.toString());
    await AsyncStorage.setItem('cur_val', val.toString());
  }

  React.useEffect(() => {
    let isMounted = true
    const get_data = async () => {
      let uid, pwd;
      uid = null;
      pwd = null;
      uid = await AsyncStorage.getItem('user_id');
      pwd = await AsyncStorage.getItem('myPwd');
      if (uid !== null && pwd !== null && isMounted) {
        setPwd(pwd);
        setUid(uid);
        Cur_Set();
      }
    }
    get_data()
    return () => {
      isMounted = false
    }
  }, [global.cur_name]);

  useFocusEffect(
    React.useCallback(() => {
      let isMounted = true
      async function dta() {
        let thm = null;
        let code = null;

        thm = await AsyncStorage.getItem('DarkMode');
        code = await AsyncStorage.getItem('app_code');
        if (thm !== null && code !== null && isMounted) {

          console.log(code, 'applock')
          if (code === 'true') {
            setIsSwitchOn(true);
          } else if (code === null) {
            setIsSwitchOn(false);
          } else {
            setIsSwitchOn(false);
          }
          console.log(thm);
          if (thm == 'false') {
            setIsEnabled(false);
          } else if (thm === null) {
            setIsEnabled(true);
          } else {
            setIsEnabled(true);
          }

          try {
            setLoading(false);
            setRefreshing(false);
          } catch (e) {
            console.log(e);
          }
          callApi(Uid, false);

        }
      }

      dta();
      return () => {
        isMounted = false
      }
    }, []),
  );
  function getDifferenceInMinutes(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60);
  }

  const callApi = async (uid, isRefresh) => {
    if (uid == '' || uid == null) {
      let Nuid;
      Nuid = null;
      Nuid = await AsyncStorage.getItem('user_id');
      setUid(Nuid);
      uid = Nuid;
      //callApi(Nuid)
    }

    try {
      console.log('hellodiff', global.prevtime3);
      let newDate = new Date();
      let diff = getDifferenceInMinutes(global.prevtime3, newDate);
      console.log('hellodiff', diff);

      if (diff < 5 && !isRefresh) {
        console.log('noneed to recall', diff);
        setRefreshing(false);
        setLoading(false);
        return;
      }
    } catch (e) { }
    global.prevtime3 = new Date();

    if (parseInt(global.timeleft) > 0) {
      setTimeron(true);
      setEarningtime(parseInt(global.timeleft));
    }
  };

  const tourSkip = async () => {
    setTour(false)
    console.log('clicked toru skip');
    //  await AsyncStorage.setItem('startmodal', 'false')
  }
  const tourNext = (index) => {

    // listViewRef.scrollToEnd({ animated: true });
    // console.log('clicked toru next',index, typeof(index));
    listViewRef.scrollToOffset({ animated: true, offset: index * 350 })
    //   setTour(false)
    //  await AsyncStorage.setItem('startmodal', 'false')
  }
  const RulesSkip = async () => {
    setRules(false)
    console.log('clicked rules skip');
    //  await AsyncStorage.setItem('startmodal', 'false')
  }
  const RulesNext = (index) => {

    // listViewRef.scrollToEnd({ animated: true });
    // console.log('clicked toru next',index, typeof(index));
    listViewRefRules.scrollToOffset({ animated: true, offset: index * 350 })
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
  const getBal = (type) => {
    if (type == 'asset') {

      let url = global.BASE_URL + 'css_mob/bal.aspx?uid=' + Uid + '&ttype=V';
      console.log(url);
      fetch(url)
        .then(item => item.json())
        .then(dta => {
          if (dta.success === 'true') {
            global.vbal = dta.msg
            setBal(dta.msg);
          }
        });
    }
    if (type == 'bonus') {
      let url4 = global.BASE_URL + 'css_mob/bal.aspx?uid=' + Uid + '&ttype=B';
      console.log(url4);
      fetch(url4)
        .then(item => item.json())
        .then(dta => {
          if (dta.success === 'true') {
            global.bbal = dta.msg
            setBonus(dta.msg);
          }
        });
    }
    if (type == 'pool') {
      let url8 = global.BASE_URL + 'css_mob/bal.aspx?uid=' + Uid + '&ttype=P';
      console.log(url8);
      fetch(url8)
        .then(item => item.json())
        .then(dta => {
          if (dta.success === 'true') {
            global.pbal = dta.msg
            setPoolBal(dta.msg);
          }
        });
    }
    if (type == 'poolprofit') {
      let url9 = global.BASE_URL + 'css_mob/bal.aspx?uid=' + Uid + '&ttype=R';
      console.log(url9);
      fetch(url9)
        .then(item => item.json())
        .then(dta => {
          console.log('dta  ',dta);
          if (dta.success === 'true') {
            global.rbal = dta.msg
            console.log('dta msg : ',dta.msg);
            setPoolProfitBal(dta.msg);
          }
        });
    }
    if (type == 'income') {
      let url2 = global.BASE_URL + 'css_mob/bal.aspx?uid=' + Uid + '&ttype=E';
      console.log(url2);
      fetch(url2)
        .then(item => item.json())
        .then(dta => {
          if (dta.success === 'true') {
            global.ebal = dta.msg
            console.log('hello')
            setEBal(dta.msg);
          }
          setTimeout(() => {
            setRefreshing(false);
          }, 1000);
        })
        .catch(ex => {
          setTimeout(() => {
            setRefreshing(false);
          }, 1000);
        });
    }
    setTimeout(() => { setRefreshAsset(false), setRefreshBonus(false), setRefreshIncome(false),
      setRefreshPool(false),setRefreshPoolP(false) }, 5000)
  };





  const [renewClicked, setRenewClicked] = React.useState(false);
  const renewApi = async code => {
    setRenewClicked(true);
    var uid = Uid;
    if (uid == '' || uid == null) {
      let Nuid;
      Nuid = null;
      Nuid = await AsyncStorage.getItem('user_id');
      setUid(Nuid);
      uid = Nuid;

      //callApi(Nuid)
    }

    let url = global.BASE_URL + 'renew.aspx?uid=' + uid + '&code=' + code;
    console.log(url);
    fetch(url)
      .then(item => item.json())
      .then(dta => {
        if (dta.success === 'true') {
          //setBal(dta.msg)
          ToastAndroid.show('Successfully Renewed...', ToastAndroid.SHORT);
        } else {
          ToastAndroid.show('Renewed Unsuccessful...', ToastAndroid.SHORT);
        }
        setRenewClicked(false);
      })
      .catch(ex => {
        ToastAndroid.show('Oops! something went wrong..', ToastAndroid.SHORT);
        setRenewClicked(false);
      });
  };
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);

    callApi(Uid, true);
  });
  const toggleModalRenew = () => {
    setModalVisibleRenew(!isModalVisibleRenew);
  };

  const toggleModal1 = () => {
    setModalVisible1(!isModalVisible1);
  };
  const logOutMetod = () => {
    toggleModal1();
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  ////biometric
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
    TouchID.isSupported()
      .then(biometryType => {
        setIsSwitchOn(true);
        App_Lock('true');
        ToastAndroid.show(
          'FingerPrint Activated Successfully',
          ToastAndroid.SHORT,
        );
        //      if (biometryType === 'FaceID') {
        //        console.log('FaceID is supported.');
        //    } else {
        //        console.log('TouchID is supported.');
        //        if(isBio){
        //          null;
        //        }else{

        //          TouchID.authenticate('',optionalConfigObject).then((success)=>{
        //            console.log('success',success)
        //            setIsBio(false)
        //          }).catch((err)=>{
        //            BackHandler.exitApp();

        //          })
        //        }
        //    }
      })
      .catch(ex => {
        console.log('error in touch id: ' + ex);
        setIsSwitchOn(false);
        App_Lock('false');
        ToastAndroid.show(
          'Please activate Fingerprint Lock for your phone!',
          ToastAndroid.LONG,
        );
      });
    return <View style={{ backgroundColor: '#000', flex: 1 }}></View>;
  };
  //
  //**********code for timer */
  const [timeron, setTimeron] = React.useState(false);
  const [earningtime, setEarningtime] = React.useState(0);
  const [etym, setetym] = React.useState('');
  React.useEffect(() => {
    console.log('Imp point 5');

    console.log('timer on ' + timeron);
    if (timeron) {
      let interval = setInterval(() => {
        setEarningtime(lastTimerCount => {
          lastTimerCount <= 1 && clearInterval(interval);

          var seconds = parseInt(lastTimerCount, 10);

          var days = Math.floor(seconds / (3600 * 24));
          seconds -= days * 3600 * 24;
          var hrs = Math.floor(seconds / 3600);
          seconds -= hrs * 3600;
          var mnts = Math.floor(seconds / 60);
          seconds -= mnts * 60;

          setetym(days + 'D :' + hrs + 'H :' + mnts + 'M :' + seconds + 's');

          return lastTimerCount - 1;
        });
      }, 1000); //each count lasts for a second
      //cleanup the interval on complete
      return () => clearInterval(interval);
    }
  }, [timeron]);

  ////////////******************** */
  const Cur_Set = async () => {

    refRBSheet1.current.close()
    fetch(global.BASE_URL + 'css_mob/currency.aspx')
      .then(item => item.json())
      .then(Data => {
        //   console.log(Data.conversion_rates)
        //var convo = Data.conversion_rates;
        //convo = convo.toString();
        //convo = convo.replace(": ",": \"")
        var convo = JSON.stringify(Data.conversion_rates);
        convo = convo.toString();
        convo = convo.replace('{', '').replace('}', '');
        convo = convo.replace(/['"]+/g, '');

        var spl = [];
        spl = convo.split(',');
        var finaljson = '';
        for (let i = 0; i < spl.length - 1; i++) {
          var newstring = [];
          newstring = spl[i].toString().split(':');
          var json = '{"name":"' + newstring[0] + '","value":"' + newstring[1] + '"}';
          if (finaljson == '') {
            finaljson = json;
          } else {
            finaljson = finaljson + ',' + json;
          }
        }
        // console.log(finaljson)
        finaljson = '[' + finaljson + ']';
        finaljson = finaljson.replace(' ', '');
        // console.log(JSON.parse(finaljson))
        setRates(JSON.parse(finaljson));
      }).catch(e => {
        console.log(e)
      })
  };



  const get_devices = async () => {
    let token = await AsyncStorage.getItem('token')
    let url1 = global.BASE_URL + 'css_mob/my_devices.aspx?uid=' + Uid + '&pwd=' + global.PWD + '&token=' + token;
    console.log(url1);
    fetch(url1)
      .then(item => item.json())
      .then(dta => {
        if (dta) {
          setDevice_List(dta)
          refRBSheet2.current.open()
          setLd(false)
        }
      })

  }
  const logout_device = async (id) => {
    let token = await AsyncStorage.getItem('token')
    let url1 = global.BASE_URL + 'css_mob/device_logout.aspx?uid=' + Uid + '&pwd=' + global.PWD + '&token=' + token + '&device=' + id;
    console.log(url1);
    fetch(url1)
      .then(item => item.json())
      .then(dta => {
        console.log(dta)
        ToastAndroid.show(dta[0].msg, ToastAndroid.SHORT)
        setLd(true)
        get_devices()
      })

  }



  const toggle_dot = () => {
    return (
      <View style={{ flexDirection: 'row', }}>
        <Image source={require('../assets/botz/dots.gif')} style={{ width: 25, height: 15 }} resizeMode={'contain'} />
      </View>
    )
  }

  return (
    <List.Section>
      {/* <Modal
        onBackButtonPress={()=>setTour(false)}
        statusBarTranslucent={true}
        deviceHeight={1000}
        backdropOpacity={1}        
        onBackdropPress={()=>setTour(false)}
        isVisible={Tour}        
        animationInTiming={300}
        animationOutTiming={200}>       
          <View
            style={{
              flex:1,              
              flexDirection: 'column',
              justifyContent: 'center',                                          
              borderRadius: 10,
              width: '110%',
              marginLeft:-18
              }}>
               <Swiper
                  dot={
                    <View
                      style={{
                        backgroundColor: '#505050',
                        width: 5,
                        height: 5,
                        borderRadius: 4,
                        marginHorizontal:5,
                        marginBottom:10
                      }}
                    />
                  }
                  activeDot={
                    <View
                      style={{
                        backgroundColor: '#fff',
                        width: 5,
                        height: 5,
                        borderRadius: 4,   
                        marginHorizontal:5 ,
                        marginBottom:10             
                      }}
                    />
                  }
                  loadMinimal={true}
                  autoplay={true}
                  autoplayTimeout={8}
                  showsPagination={true}
                  
                  loadMinimalLoader={
                    <ActivityIndicator size={40} color="#d0d0d0" />
                  }>
                  <ImageBackground
                    source={require('../assets/botz/step1.png')}
                    style={{alignSelf: 'center', flex:1,width:'100%'}}                     
                    imageStyle={{resizeMode:'stretch',borderRadius:10}}
                  >
                    <TouchableOpacity onPress={()=>{Linking.openURL('https://youtu.be/U6EBaw8Q-XQ')}} style={styles.tour_btn}>
                      <Text style={styles.tour_btn_text}>Watch Video</Text>
                    </TouchableOpacity>
                  </ImageBackground>
                  <ImageBackground
                    source={require('../assets/botz/step2.png')}
                    style={{alignSelf: 'center', flex:1,width:'100%'}}                     
                    imageStyle={{resizeMode:'stretch',borderRadius:10}}
                  >
                    <TouchableOpacity onPress={()=>{Linking.openURL('https://youtu.be/U6EBaw8Q-XQ')}} style={styles.tour_btn}>
                      <Text style={styles.tour_btn_text}>Watch Video</Text>
                    </TouchableOpacity>
                  </ImageBackground>
                  <ImageBackground
                    source={require('../assets/botz/step3.png')}
                    style={{alignSelf: 'center', flex:1,width:'100%'}}                     
                    imageStyle={{resizeMode:'stretch',borderRadius:10}}
                  >
                  <TouchableOpacity onPress={()=>{Linking.openURL('https://youtu.be/iuwiO5MzsgY')}} style={styles.tour_btn}>
                      <Text style={styles.tour_btn_text}>Watch Video</Text>
                    </TouchableOpacity>
                  </ImageBackground>
                  <ImageBackground
                    source={require('../assets/botz/step4.png')}
                    style={{alignSelf: 'center', flex:1,width:'100%'}}                     
                    imageStyle={{resizeMode:'stretch',borderRadius:10}}
                  >
                  <TouchableOpacity onPress={()=>{Linking.openURL('https://www.youtube.com/watch?v=O9PkR5FR1VQ&t=3s')}} style={styles.tour_btn}>
                      <Text style={styles.tour_btn_text}>Watch Video</Text>
                    </TouchableOpacity>
                  </ImageBackground>
                 
                  
                </Swiper>
          </View>        
      </Modal> */}
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
                    <ImageBackground source={require('../assets/walkthrough/broker1.jpeg')} resizeMode={'stretch'}
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
                            <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15,color: '#000' }}>SKIP</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => { brokerNext(1) }} style={styles.bottomNext}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15,color: '#000' }}>NEXT</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </ImageBackground>
                    <ImageBackground source={require('../assets/walkthrough/broker2.jpeg')} resizeMode={'stretch'}
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
                            <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15,color: '#000' }}>SKIP</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => { brokerNext(1.95) }} style={styles.bottomNext}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15 ,color: '#000'}}>NEXT</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </ImageBackground>
                    <ImageBackground source={require('../assets/walkthrough/broker3.png')} resizeMode={'stretch'}
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
                            <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15 ,color: '#000'}}>SKIP</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => { brokerNext(2.85) }} style={styles.bottomNext}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15 ,color: '#000'}}>NEXT</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </ImageBackground>
                    <ImageBackground source={require('../assets/walkthrough/broker4.jpeg')} resizeMode={'stretch'}
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
                            <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15,color: '#000' }}>SKIP</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => { brokerNext(3.8) }} style={styles.bottomNext}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15 ,color: '#000'}}>NEXT</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </ImageBackground>
                    <ImageBackground source={require('../assets/walkthrough/broker5.jpeg')} resizeMode={'stretch'}
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
                            <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15,color: '#000' }}>SKIP</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => { brokerNext(4.9) }} style={styles.bottomNext}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15,color: '#000' }}>NEXT</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </ImageBackground>
                    <ImageBackground source={require('../assets/walkthrough/broker6.jpeg')} resizeMode={'stretch'}
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
                        <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15,color: '#000' }}>DONE</Text>
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
                <ImageBackground source={require('../assets/walkthrough/walk1.jpeg')} resizeMode={'stretch'}
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
                        <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15,color: '#000' }}>SKIP</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => { tourNext(1) }} style={styles.bottomNext}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15,color: '#000' }}>NEXT</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ImageBackground>
                <ImageBackground source={require('../assets/walkthrough/walk2.jpeg')} resizeMode={'stretch'}
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
                        <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15,color: '#000' }}>SKIP</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => { tourNext(1.95) }} style={styles.bottomNext}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15,color: '#000' }}>NEXT</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ImageBackground>
                <ImageBackground source={require('../assets/walkthrough/walk3.jpeg')} resizeMode={'stretch'}
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
                        <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15,color: '#000' }}>SKIP</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => { tourNext(2.85) }} style={styles.bottomNext}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15,color: '#000' }}>NEXT</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ImageBackground>
                <ImageBackground source={require('../assets/walkthrough/walk4.jpeg')} resizeMode={'stretch'}
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
                        <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15,color: '#000' }}>SKIP</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => { tourNext(3.8) }} style={styles.bottomNext}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15,color: '#000' }}>NEXT</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ImageBackground>
                <ImageBackground source={require('../assets/walkthrough/walk5.jpeg')} resizeMode={'stretch'}
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
                    <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15,color: '#000' }}>DONE</Text>
                  </TouchableOpacity>
                </ImageBackground>


              </View>
            )}
          />


        </View>
      </Modal>
      <Modal
        onBackButtonPress={() => setRules(false)}
        statusBarTranslucent={true}
        deviceHeight={1000}
        backdropOpacity={1}
        propagateSwipe={true}

        isVisible={Rules}

      >

        <View style={{ flex: 1, width: '100%' }}>

          <FlatList
            data={[1]}
            ref={(ref) => {
              listViewRefRules = ref;
            }}
            horizontal={true}
            contentContainerStyle={{}}
            renderItem={({ item, index }) => (
              <View style={{ flexDirection: 'row' ,marginTop: 100}}>
                <ImageBackground source={require('../assets/Fxbot/rules/rules.jpeg')} resizeMode={'stretch'}
                  style={styles.imgbackRule}>

                  <View
                    style={{ alignSelf: 'center', flex: 1, width: '100%' }}
                  >
                    {/* <TouchableOpacity onPress={()=>{Linking.openURL('https://www.youtube.com/watch?v=Tubg0qv1j7o')}}
                     style={styles.tour_btn}>
                      <Text style={styles.tour_btn_text}>Watch Video</Text>
                    </TouchableOpacity> */}
                    <View style={styles.viewbtm2}>

                      <TouchableOpacity onPress={RulesSkip} style={styles.bottomSkip}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15,color: '#000' }}>SKIP</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => { RulesNext(1) }} style={styles.bottomNext}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15,color: '#000' }}>NEXT</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ImageBackground>
                <ImageBackground source={require('../assets/Fxbot/rules/rule1.jpeg')} resizeMode={'stretch'}
                  style={styles.imgbackRule}>

                  <View
                    style={{ alignSelf: 'center', flex: 1, width: '100%' }}
                  >
                    {/* <TouchableOpacity onPress={()=>{setBrokerModal(true)}}
                     style={styles.tour_btn}>
                      <Text style={styles.tour_btn_text}>See Brokers</Text>
                    </TouchableOpacity> */}
                    <View style={styles.viewbtm2}>

                      <TouchableOpacity onPress={RulesSkip} style={styles.bottomSkip}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15,color: '#000' }}>SKIP</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => { RulesNext(2) }} style={styles.bottomNext}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15 ,color: '#000'}}>NEXT</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ImageBackground>
                <ImageBackground source={require('../assets/Fxbot/rules/rule2.jpeg')} resizeMode={'stretch'}
                  style={styles.imgbackRule}>

                  <View
                    style={{ alignSelf: 'center', flex: 1, width: '100%' }}
                  >
                    {/* <TouchableOpacity onPress={()=>{Linking.openURL('https://www.youtube.com/watch?v=oxIjEs1X66Q')}}
                     style={styles.tour_btn}>
                      <Text style={styles.tour_btn_text}>Watch Video</Text>
                    </TouchableOpacity> */}
                    <View style={styles.viewbtm2}>

                      <TouchableOpacity onPress={RulesSkip} style={styles.bottomSkip}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15,color: '#000' }}>SKIP</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => { RulesNext(2.95) }} style={styles.bottomNext}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15,color: '#000' }}>NEXT</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ImageBackground>
                <ImageBackground source={require('../assets/Fxbot/rules/rule3.jpeg')} resizeMode={'stretch'}
                  style={styles.imgbackRule}>

                  <View
                    style={{ alignSelf: 'center', flex: 1, width: '100%' }}
                  >
                    {/* <TouchableOpacity onPress={()=>{Linking.openURL('https://youtu.be/U6EBaw8Q-XQ')}}
                     style={styles.tour_btn}>
                      <Text style={styles.tour_btn_text}>Watch Video</Text>
                    </TouchableOpacity> */}
                    <View style={styles.viewbtm2}>

                      <TouchableOpacity onPress={RulesSkip} style={styles.bottomSkip}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15 ,color: '#000'}}>SKIP</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => { RulesNext(4) }} style={styles.bottomNext}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15 ,color: '#000'}}>NEXT</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ImageBackground>
                <ImageBackground source={require('../assets/Fxbot/rules/rule4.jpeg')} resizeMode={'stretch'}
                  style={styles.imgbackRule}>

                  <View
                    style={{ alignSelf: 'center', flex: 1, width: '100%' }}
                  >
                    {/* <TouchableOpacity onPress={()=>{Linking.openURL('https://youtu.be/U6EBaw8Q-XQ')}}
                     style={styles.tour_btn}>
                      <Text style={styles.tour_btn_text}>Watch Video</Text>
                    </TouchableOpacity> */}
                    <View style={styles.viewbtm2}>

                      <TouchableOpacity onPress={RulesSkip} style={styles.bottomSkip}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15,color: '#000' }}>SKIP</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => { RulesNext(4.95) }} style={styles.bottomNext}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15,color: '#000' }}>NEXT</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ImageBackground>
                <ImageBackground source={require('../assets/Fxbot/rules/rule5.jpeg')} resizeMode={'stretch'}
                  style={styles.imgbackRule}>

                  <View
                    style={{ alignSelf: 'center', flex: 1, width: '100%' }}
                  >
                    {/* <TouchableOpacity onPress={()=>{Linking.openURL('https://www.youtube.com/watch?v=9hDCTFlyblk')}}
                     style={styles.tour_btn}>
                      <Text style={styles.tour_btn_text}>Watch Video</Text>
                    </TouchableOpacity> */}

                  </View>
                  <TouchableOpacity onPress={RulesSkip} style={{
                    borderRadius: 20,
                    backgroundColor: '#dada10',
                    position: 'absolute', bottom: 10,
                    right: 20, alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15,color: '#000' }}>DONE</Text>
                  </TouchableOpacity>
                </ImageBackground>


              </View>
            )}
          />


        </View>
      </Modal>
      <List.Item title="Profile/KYC" titleStyle={{ fontSize: 13, color: '#fff' }}
        onPress={() => navigation.navigate('kyc')}
        left={props => <Image source={require('../assets/sidebar/icon3.png')} style={{ width: 20, height: 20, alignSelf: 'center', }} resizeMode={'stretch'} />} />
      <List.Item title="TopUp id" titleStyle={{ fontSize: 13, color: '#fff' }} onPress={() => {
        console.log('top up id==============')
        navigation.navigate('Web', {
          url:
            global.BASE_URL +
            'm/homebot.aspx?uid=' +
            Uid +
            '&pwd=' +
            pwd + '&page=topup',
        });

      }}
        left={props => <Image source={require('../assets/sidebar/icon15.png')}
          style={{ width: 20, height: 20, alignSelf: 'center', }} resizeMode={'stretch'} />} />
      <List.Item title="My Devices"
        onPress={() => {
          if (!global.lg_without_pwd) {
            // setLd(true)
            get_devices()
          } else {
            ToastAndroid.show(
              'Sorry... Visitors are not allowed in here',
              ToastAndroid.SHORT,
            );
          }
        }}
        titleStyle={{ fontSize: 13, color: '#fff' }} left={props => <Image source={require('../assets/sidebar/icon4.png')} style={{ width: 20, height: 20, alignSelf: 'center', }} resizeMode={'stretch'} />} />
      <List.Item title="Refer" titleStyle={{ fontSize: 13, color: '#fff' }}
        onPress={() => navigation.navigate('Invite')}
        left={props => <Image source={require('../assets/sidebar/icon5.png')} style={{ width: 20, height: 20, alignSelf: 'center', }} resizeMode={'stretch'} />} />
      <List.Item title="Deposit into Pool" titleStyle={{ fontSize: 13, color: '#fff' }}
        onPress={() => {
          global.AMT > 0
            ? navigation.navigate('PoolScreen')
            : ToastAndroid.show(
                'Please Activate Your Id First',
                ToastAndroid.SHORT,
              );
        }}
        left={props => <Image source={require('../assets/sidebar/icon5.png')} style={{ width: 20, height: 20, alignSelf: 'center', }}
         resizeMode={'stretch'} />} />

      <List.Item title="Rules of Trading" titleStyle={{ fontSize: 13, color: '#fff' }}
        onPress={() => {
          setRules(true)
        }}

        left={props => <Image source={require('../assets/sidebar/icon5.png')}
          style={{ width: 20, height: 20, alignSelf: 'center', }} resizeMode={'stretch'} />} />
      <List.Item title="Geneology" onPress={() => {
        navigation.navigate('Web', {
          url:
            global.BASE_URL +
            'm/homebot.aspx?uid=' +
            Uid +
            '&pwd=' +
            pwd,
        });
      }} titleStyle={{ fontSize: 13, color: '#fff' }} left={props => <Image source={require('../assets/sidebar/icon13.png')} style={{ width: 20, height: 20, alignSelf: 'center', }} resizeMode={'stretch'} />} />
      <List.Item title="How To Start" titleStyle={{ fontSize: 13, color: '#fff' }}
        onPress={() => {
          setTour(true)
        }}

        left={props => <Image source={require('../assets/sidebar/icon.png')} style={{ width: 20, height: 20, alignSelf: 'center', }} resizeMode={'stretch'} />} />
      <List.Item title="Transfer To Assets"
        onPress={() => {
          if (!global.lg_without_pwd) {
            navigation.navigate('TransferAsset', { Eval: eBal, Aval: Bal });
          } else {
            ToastAndroid.show(
              'Sorry... Visitors are not allowed in here',
              ToastAndroid.SHORT,
            );
          }
        }}
        titleStyle={{ fontSize: 13, color: '#fff' }}

        left={props => <Image source={require('../assets/icons/transfer_assets.png')}
          style={{ width: 20, height: 20, alignSelf: 'center', }}
          resizeMode={'stretch'} />} />
      <List.Item title="Transfer To Other Bot"
        onPress={() => {
          if (!global.lg_without_pwd) {
            navigation.navigate('TransferScreenOtherBot');
          } else {
            ToastAndroid.show(
              'Sorry... Visitors are not allowed in here',
              ToastAndroid.SHORT,
            );
          }
        }}
        titleStyle={{ fontSize: 13, color: '#fff' }}

        left={props => <Image source={require('../assets/icons/transfer_assets.png')}
          style={{ width: 20, height: 20, alignSelf: 'center', }}
          resizeMode={'stretch'} />} />
      <List.Item title="Transfer To Pool Wallet"
        onPress={() => {
          if (!global.lg_without_pwd) {
            navigation.navigate('TransferScreenPool');
          } else {
            ToastAndroid.show(
              'Sorry... Visitors are not allowed in here',
              ToastAndroid.SHORT,
            );
          }
        }}
        titleStyle={{ fontSize: 13, color: '#fff' }}

        left={props => <Image source={require('../assets/icons/transfer_assets.png')}
          style={{ width: 20, height: 20, alignSelf: 'center', }}
          resizeMode={'stretch'} />} />

      <List.Item title="Asset" titleStyle={{ fontSize: 13, color: '#fff' }}
        onPress={() => {
          if (!global.lg_without_pwd) {
            navigation.navigate('Asset');
          } else {
            ToastAndroid.show(
              'Sorry... Visitors are not allowed in here',
              ToastAndroid.SHORT,
            );
          }
        }}
        right={props => <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: '#fff' }}>{Bal != '' ? Bal : toggle_dot()} $</Text>
          {refreshAsset ?
            <LottieView source={require('../assets/botz/game/refreshfx.json')}
              style={{ width: 25, height: 25, marginBottom: 5 }} autoPlay loop />
            : <TouchableOpacity disabled={refreshAsset} onPress={() => { setRefreshAsset(true), getBal('asset') }} style={{ paddingHorizontal: 5 }}>
              <LottieView source={require('../assets/botz/game/refreshfx.json')}
                style={{ width: 25, height: 25, marginBottom: 5 }} loop={false} />
            </TouchableOpacity>}
        </View>}

        left={props => <Image source={require('../assets/icons/assets.png')}
          style={{ width: 20, height: 20, alignSelf: 'center', }}
          resizeMode={'stretch'} />} />
      
      <List.Item title="Bonus Points" titleStyle={{ fontSize: 13, color: '#fff' }}
        right={props => <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: '#fff' }}>{Bonus != '' ? Bonus : toggle_dot()} $</Text>
          {refreshBonus ?
            <LottieView source={require('../assets/botz/game/refreshfx.json')}
              style={{ width: 25, height: 25, marginBottom: 0, top: -1 }} autoPlay loop />
            :
            <TouchableOpacity disabled={refreshBonus} onPress={() => { setRefreshBonus(true), getBal('bonus') }}>
              <LottieView source={require('../assets/botz/game/refreshfx.json')}
                style={{ width: 25, height: 25, marginBottom: 0, top: -1 }} loop={false} />
            </TouchableOpacity>}
        </View>
        }

        onPress={() => { }}
        left={props => <Image source={require('../assets/icons/bonus.png')}
          style={{ width: 20, height: 20, alignSelf: 'center', }} resizeMode={'stretch'} />} />
      <List.Item title="Income" titleStyle={{ fontSize: 13, color: '#fff' }}
        onPress={() => {
          if (!global.lg_without_pwd) {
            navigation.navigate('Earning');
          } else {
            ToastAndroid.show(
              'Sorry... Visitors are not allowed in here',
              ToastAndroid.SHORT,
            );
          }
        }}
        right={props => <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: '#fff' }}>{eBal != '' ? eBal : toggle_dot()} $</Text>
          {refreshIncome ?
            <LottieView source={require('../assets/botz/game/refreshfx.json')}
              style={{ width: 25, height: 25, marginBottom: 0, top: -1 }} autoPlay loop />
            :
            <TouchableOpacity onPress={() => { setRefreshIncome(true), getBal('income') }} style={{ paddingHorizontal: 5 }}>
              <LottieView source={require('../assets/botz/game/refreshfx.json')}
                style={{ width: 25, height: 25, marginBottom: 0, top: -1 }} loop={false} />
            </TouchableOpacity>
          }
        </View>

        }


        left={props => <Image source={require('../assets/icons/income.png')}
          style={{ width: 20, height: 20, alignSelf: 'center', }} resizeMode={'stretch'} />} />
        <List.Item title="Pool Wallet" titleStyle={{ fontSize: 13, color: '#fff' }}
                onPress={() => {
                  if (!global.lg_without_pwd) {
                    navigation.navigate('PoolWallet');
                  } else {
                    ToastAndroid.show(
                      'Sorry... Visitors are not allowed in here',
                      ToastAndroid.SHORT,
                    );
                  }
                }}
                right={props => <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#fff' }}>{poolBal != '' ? poolBal : toggle_dot()} $</Text>
                  {refreshPool ?
                    <LottieView source={require('../assets/botz/game/refreshfx.json')}
                      style={{ width: 25, height: 25, marginBottom: 5 }} autoPlay loop />
                    : <TouchableOpacity disabled={refreshPool} onPress={() => { setRefreshPool(true), getBal('pool') }} style={{ paddingHorizontal: 5 }}>
                      <LottieView source={require('../assets/botz/game/refreshfx.json')}
                        style={{ width: 25, height: 25, marginBottom: 5 }} loop={false} />
                    </TouchableOpacity>}
                </View>}
        
                left={props => <Image source={require('../assets/icons/assets.png')}
                  style={{ width: 20, height: 20, alignSelf: 'center', }}
                  resizeMode={'stretch'} />} />
        <List.Item title="Pool Profit" titleStyle={{ fontSize: 13, color: '#fff' }}
                onPress={() => {
                  if (!global.lg_without_pwd) {
                    navigation.navigate('PoolProfit');
                  } else {
                    ToastAndroid.show(
                      'Sorry... Visitors are not allowed in here',
                      ToastAndroid.SHORT,
                    );
                  }
                }}
                right={props => <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#fff' }}>{poolProfitBal != '' ? poolProfitBal : toggle_dot()} $</Text>
                  {refreshPoolP ?
                    <LottieView source={require('../assets/botz/game/refreshfx.json')}
                      style={{ width: 25, height: 25, marginBottom: 5 }} autoPlay loop />
                    : <TouchableOpacity disabled={refreshPoolP} onPress={() => { setRefreshPoolP(true), getBal('poolprofit') }} style={{ paddingHorizontal: 5 }}>
                      <LottieView source={require('../assets/botz/game/refreshfx.json')}
                        style={{ width: 25, height: 25, marginBottom: 5 }} loop={false} />
                    </TouchableOpacity>}
                </View>}
        
                left={props => <Image source={require('../assets/icons/assets.png')}
                  style={{ width: 20, height: 20, alignSelf: 'center', }}
                  resizeMode={'stretch'} />} />
      <List.Item title="Currency" titleStyle={{ fontSize: 13, color: '#fff' }}
        onPress={() => refRBSheet1.current.open()}
        left={props => <Image source={require('../assets/icons/currency.png')}
          style={{ width: 20, height: 20, alignSelf: 'center' }} resizeMode={'stretch'} />} />
      {/* <List.Item title="FAQ" titleStyle={{fontSize:13,color:'#fff'}} 
        onPress={() => {
          Linking.openURL(global.BASE_URL+'web/qn/question1.html');
          }}
        left={props => <Image source={require('../assets/icons/faq.png')} 
        style={{width:20,height:20,alignSelf:'center'}} resizeMode={'stretch'} />}  /> */}

      {/* {global.AMT != 0 ?  <List.Item title="Zoom Meetings" titleStyle={{fontSize:13,color:'#fff'}} 
        onPress={() => {
          Linking.openURL(global.BASE_URL+'web/zoom.html');
          }}
        left={props => <Image source={require('../assets/icons/zoom.png')} 
        style={{width:20,height:20,alignSelf:'center'}} resizeMode={'stretch'} />}  />
        :null} */}

      {/* <List.Item title="Edit Copy Settings" titleStyle={{fontSize:13,color:'#fff'}} 
          onPress={() => {
                               navigation.navigate('Invest');
                              }}
        left={props => <Image source={require('../assets/icons/edit.png')} 
        style={{width:20,height:20,alignSelf:'center'}} resizeMode={'stretch'} />}  /> */}

      {global.AMT != 0 ? <List.Item title="Chat with our Support Team" titleStyle={{ fontSize: 13, color: '#fff' }}
        onPress={() => {
          Linking.openURL('https://t.me/iamrobotz')
        }}
        left={props => <Image source={require('../assets/icons/chat.png')}
          style={{ width: 20, height: 20, alignSelf: 'center' }} resizeMode={'stretch'} />} />
        : null}

      {global.AMT != 0 ? <List.Item title="Add Support Ticket" titleStyle={{ fontSize: 13, color: '#fff' }}
        onPress={() => {
          navigation.navigate('AddTicketScreen');
        }}
        left={props => <Image source={require('../assets/icons/report.png')}
          style={{ width: 20, height: 20, alignSelf: 'center' }} resizeMode={'stretch'} />} />
        : null}
      {global.AMT != 0 ? <List.Item title="Ticket Details" titleStyle={{ fontSize: 13, color: '#fff' }}
        onPress={() => {
          navigation.navigate('ViewTicketScreen');
        }}
        left={props => <Image source={require('../assets/icons/complaint.png')}
          style={{ width: 20, height: 20, alignSelf: 'center' }} resizeMode={'stretch'} />} />
        : null}
      {global.AMT != 0 ? <List.Item title="Earnings" titleStyle={{ fontSize: 13, color: '#fff' }}
        onPress={() => {
          navigation.navigate('Earning');
        }}
        left={props => <Image source={require('../assets/icons/earning.png')}
          style={{ width: 20, height: 20, alignSelf: 'center' }} resizeMode={'stretch'} />} />
        : null}
      {global.AMT != 0 ? <List.Item title="Rewards" titleStyle={{ fontSize: 13, color: '#fff' }}
        onPress={() => {
          navigation.navigate('RewardDetails');
        }}
        left={props => <Image source={require('../assets/icons/rewards.png')}
          style={{ width: 20, height: 20, alignSelf: 'center' }} resizeMode={'stretch'} />} />
        : null}
      {global.AMT != 0 ? <List.Item title="Net PNL" titleStyle={{ fontSize: 13, color: '#fff' }}
        onPress={() => {
          if (!global.lg_without_pwd) {
            navigation.navigate('PNLScreen');
          } else {
            ToastAndroid.show(
              'Sorry... Visitors are not allowed in here',
              ToastAndroid.SHORT,
            );
          }
        }}
        left={props => <Image source={require('../assets/icons/net_pnl.png')}
          style={{ width: 20, height: 20, alignSelf: 'center' }} resizeMode={'stretch'} />} />
        : null}
      {/* {global.AMT != 0 ? <List.Item title="Super Bot" titleStyle={{fontSize:13,color:'#fff'}} 
     onPress={() => {
      if (!global.lg_without_pwd) {
        navigation.navigate('SuperBotScreen');
      } else {
        ToastAndroid.show(
          'Sorry... Visitors are not allowed in here',
          ToastAndroid.SHORT,
        );
      }
    }}
        left={props => <Image source={require('../assets/icons/net_pnl.png')} 
        style={{width:20,height:20,alignSelf:'center'}} resizeMode={'stretch'} />}  />
:null}
      {global.AMT != 0 ? 
      <List.Item title="Hedge Bot" titleStyle={{fontSize:13,color:'#fff'}} 
     onPress={() => {
      if (!global.lg_without_pwd) {
        navigation.navigate('HedgeBot');
      } else {
        ToastAndroid.show(
          'Sorry... Visitors are not allowed in here',
          ToastAndroid.SHORT,
        );
      }
    }}
        left={props => <Image source={require('../assets/icons/net_pnl.png')} 
        style={{width:20,height:20,alignSelf:'center'}} resizeMode={'stretch'} />}  />
:null} */}
      {/* {global.AMT != 0 ? 
      <List.Item title="Top Traders" titleStyle={{fontSize:13,color:'#fff'}} 
     onPress={() => {
      if (!global.lg_without_pwd) {
        navigation.navigate('Circle');
      } else {
        ToastAndroid.show(
          'Sorry... Visitors are not allowed in here',
          ToastAndroid.SHORT,
        );
      }
    }}
        left={props => <Image source={require('../assets/icons/net_pnl.png')} 
        style={{width:20,height:20,alignSelf:'center'}} resizeMode={'stretch'} />}  />
:null}
      {global.AMT != 0 ? 
      <List.Item title="Top Earners" titleStyle={{fontSize:13,color:'#fff'}} 
     onPress={() => {
      if (!global.lg_without_pwd) {
        navigation.navigate('TopEarners');
      } else {
        ToastAndroid.show(
          'Sorry... Visitors are not allowed in here',
          ToastAndroid.SHORT,
        );
      }
    }}
        left={props => <Image source={require('../assets/icons/net_pnl.png')} 
        style={{width:20,height:20,alignSelf:'center'}} resizeMode={'stretch'} />}  />
:null}
      {global.AMT != 0 ? 
      <List.Item title="Top Leaders" titleStyle={{fontSize:13,color:'#fff'}} 
     onPress={() => {
      if (!global.lg_without_pwd) {
        navigation.navigate('TopLeaders');
      } else {
        ToastAndroid.show(
          'Sorry... Visitors are not allowed in here',
          ToastAndroid.SHORT,
        );
      }
    }}
        left={props => <Image source={require('../assets/icons/net_pnl.png')} 
        style={{width:20,height:20,alignSelf:'center'}} resizeMode={'stretch'} />}  />
:null} */}
      <List.Item title="Sign Up" titleStyle={{ fontSize: 13, color: '#fff' }}
        onPress={() => {
          if (!global.lg_without_pwd) {
            navigation.navigate('SignUpInner');
          } else {
            ToastAndroid.show(
              'Sorry... Visitors are not allowed in here',
              ToastAndroid.SHORT,
            );
          }
        }}
        left={props => <Image source={require('../assets/icons/signup.png')}
          style={{ width: 20, height: 20, alignSelf: 'center' }} resizeMode={'stretch'} />} />
      <Text style={{ color: colors.binanceylw, marginVertical: 5, fontSize: 18 }} >Security</Text>
      {global.AMT != 0 ? <List.Item title="FingerPrints" titleStyle={{ fontSize: 13, color: '#fff' }}
        onPress={onToggleSwitch}
        left={props => <Image source={require('../assets/icons/finger_print.png')}
          style={{ width: 20, height: 20, alignSelf: 'center' }} resizeMode={'stretch'} />}
        right={props => <Switch
          trackColor={{ false: colors.vbg, true: '#17da1e' }}
          thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={onToggleSwitch}
          value={isSwitchOn}
        />}
      />
        : null}
      {global.AMT != 0 ? <List.Item title="Change Password" titleStyle={{ fontSize: 13, color: '#fff' }}
        onPress={() => {
          if (!global.lg_without_pwd) {
            navigation.navigate('ChangePass');
          } else {
            ToastAndroid.show(
              'Sorry... Visitors are not allowed in here',
              ToastAndroid.SHORT,
            );
          }
        }}
        left={props => <Image source={require('../assets/icons/change_pass.png')}
          style={{ width: 20, height: 20, alignSelf: 'center' }} resizeMode={'stretch'} />} />
        : null}
      {global.AMT != 0 ? <List.Item title="Change Txn Password" titleStyle={{ fontSize: 13, color: '#fff' }}
        onPress={() => {
          if (!global.lg_without_pwd) {
            navigation.navigate('ChangeTxnPass');
          } else {
            ToastAndroid.show(
              'Sorry... Visitors are not allowed in here',
              ToastAndroid.SHORT,
            );
          }
        }}
        left={props => <Image source={require('../assets/icons/change_pass.png')}
          style={{ width: 20, height: 20, alignSelf: 'center' }} resizeMode={'stretch'} />} />
        : null}
      {global.AMT != 0 ? <List.Item title="Forgot Txn Password" titleStyle={{ fontSize: 13, color: '#fff' }}
        onPress={() => {
          if (!global.lg_without_pwd) {
            navigation.navigate('ForgotPass');
          } else {
            ToastAndroid.show(
              'Sorry... Visitors are not allowed in here',
              ToastAndroid.SHORT,
            );
          }
        }}
        left={props => <Image source={require('../assets/icons/chang_pass.png')}
          style={{ width: 20, height: 20, alignSelf: 'center' }} resizeMode={'stretch'} />} />
        : null}

      <Text style={{ color: colors.binanceylw, marginVertical: 5, fontSize: 18 }} >Social</Text>
      <List.Item title="Facebook" titleStyle={{ fontSize: 13, color: '#fff' }}
        onPress={() =>
          Linking.openURL(
            'https://www.facebook.com/Metafx-102565422470372',
          )
        }

        left={props => <Image source={require('../assets/icons/fb.png')}
          style={{ width: 20, height: 20, alignSelf: 'center' }} resizeMode={'stretch'} />}

      />
      <List.Item title="Instagram" titleStyle={{ fontSize: 13, color: '#fff' }}
        onPress={() =>
          Linking.openURL('https://www.instagram.com/meta_fx_84/')
        }

        left={props => <Image source={require('../assets/icons/insta.png')}
          style={{ width: 20, height: 20, alignSelf: 'center' }} resizeMode={'stretch'} />}

      />
      <List.Item title="Twitter" titleStyle={{ fontSize: 13, color: '#fff' }}

        onPress={() => Linking.openURL('https://twitter.com/Meta_FX_84')}


        left={props => <Image source={require('../assets/icons/twitter.png')}
          style={{ width: 20, height: 20, alignSelf: 'center' }} resizeMode={'stretch'} />}

      />
      <List.Item title="Youtube" titleStyle={{ fontSize: 13, color: '#fff' }}

        onPress={() => Linking.openURL('https://www.youtube.com/channel/UCjxROZDYPebWyhkLDxf6WoQ')}


        left={props => <Image source={require('../assets/icons/youtube.png')}
          style={{ width: 20, height: 20, alignSelf: 'center' }} resizeMode={'stretch'} />}

      />


      <RBSheet
        ref={refRBSheet1}
        // closeOnDragDown={true}
        closeOnPressMask={true}
        height={350}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <View
          style={{
            flex: 10,
            flexDirection: 'column',
            backgroundColor: global.grad4,
          }}>
          <View style={{ paddingVertical: 5, width: '100%' }}>
            <Text
              style={[
                styles.sheading,
                {
                  fontWeight: 'normal',
                  color: global.appColor1,
                  textAlign: 'center',
                },
              ]}>
              Selected Currency: {global.cur_name}{' '}
            </Text>
          </View>
          <FlatList
            horizontal={false}
            removeClippedSubviews={false}
            data={Rates}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) =>
              index == 0 ? null : (
                <TouchableOpacity
                  onPress={() => {
                    (global.cur_name = item.name),
                      setCur(item.name),
                      (global.cur_value = item.value),
                      setAsyncVals(item.name, item.value),
                      refRBSheet1.current.close();
                  }}
                  style={{
                    paddingVertical: 20,
                    justifyContent: 'center',
                    paddingLeft: 20,
                    borderBottomWidth: 0.5,
                    borderBottomColor: global.grad3,
                    width: '100%',
                  }}>
                  <View>
                    <Text
                      style={[
                        styles.dark_heading,
                        {
                          color:
                            global.cur_name === item.name
                              ? '#00a65a'
                              : '#f0f0f0',
                          fontWeight:
                            global.cur_name === item.name ? 'bold' : 'normal',
                          fontSize: global.cur_name === item.name ? 20 : 16,
                        },
                      ]}>
                      {' '}
                      {item.name}{' '}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            }
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            refRBSheet1.current.close();
          }}
          style={{
            flex: 1,
            width: '100%',
            alignItems: 'center',
            backgroundColor: colors.bg,
            paddingTop: 0,
          }}>
          <View>
            <Text style={[styles.dark_heading, { color: '#ff0000' }]}>
              Cancel
            </Text>
          </View>
        </TouchableOpacity>
      </RBSheet>
      <RBSheet
        ref={refRBSheet2}
        // closeOnDragDown={true}
        closeOnPressMask={true}
        height={350}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <View
          style={{
            flex: 10,
            flexDirection: 'column',
            backgroundColor: global.grad4,
          }}>
          <View style={{ paddingVertical: 5, width: '100%' }}>
            <Text
              style={[
                styles.sheading,
                {
                  fontWeight: 'normal',
                  color: colors.binanceylw2,
                  fontSize: 20,
                  textAlign: 'center',
                },
              ]}>
              LoggedIn Devices
            </Text>
          </View>
          <FlatList
            horizontal={false}
            removeClippedSubviews={false}
            data={device_List}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) =>

              <View
                style={{
                  paddingVertical: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 25,
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#808080',
                  width: '100%',
                }}>
                <View>
                  <Text
                    style={[
                      styles.dark_heading,
                      {
                        color:
                          global.cur_name === item.name
                            ? '#00a65a'
                            : '#f0f0f0',
                        fontWeight:
                          global.cur_name === item.name ? 'bold' : 'normal',
                        fontSize: 20,
                        padding: 10
                      },
                    ]}>
                    {' '}
                    {item.dname}{' '}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => { logout_device(item.device) }} style={{ padding: 10 }}>
                  <FontAwesome name={'power-off'} color={'#fff'} size={22} />
                </TouchableOpacity>
              </View>

            }
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            refRBSheet2.current.close();
          }}
          style={{
            flex: 1,
            width: '100%',
            alignItems: 'center',
            backgroundColor: colors.bg,
            paddingTop: 0,
          }}>
          <View>
            <Text style={[styles.dark_heading, { color: '#fff', fontSize: 20 }]}>
              Cancel
            </Text>
          </View>
        </TouchableOpacity>
      </RBSheet>
    </List.Section>
  );
};

export default Submenu;

const styles = StyleSheet.create({
  bottomDrawerSection: {
    marginBottom: 5,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,

  },
  topbtn: {
    width: 80, height: 80, borderRadius: 50, justifyContent: 'center', alignItems: 'center',
  },
  userInfo: {
    paddingLeft: 10,
    paddingTop: 20,
    flexDirection: 'row',
    backgroundColor: '#1F2630',

    paddingBottom: 10

  },
  userInfoSection: {
    width: 230,
    flexDirection: 'row',

    paddingVertical: 8,
    marginTop: 3,
    height: 60,
    marginHorizontal: 20,
    backgroundColor: 'transparent',
    justifyContent: 'space-evenly',
    borderColor: '#a6a6a6',
    borderWidth: 1,
    borderRadius: 10,


  },
  caption: {
    fontWeight: 'bold',
  },
  renewSelected: {
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  notRenewSelected: {
    color: 'black',
    borderRadius: 5,
    paddingVertical: 0,
    paddingHorizontal: 10,
    fontSize: 16,
    textAlign: 'center',
  },

  container: {
    flex: 1,
    // backgroundColor: theme.bg,
  },
  hour_box: {
    color: '#808080',
    borderBottomWidth: 0.5,
    width: '80%',
    paddingVertical: 5,
    paddingHorizontal: 0,
    marginHorizontal: 20,
  },
  tour_btn: {
    backgroundColor: '#26a206',
    fontSize: 22,
    width: '60%',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    borderRadius: 5,
    paddingBottom: 2.5,
    bottom: '15%'
  }, tour_btn_text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,

  },
  textInput: {
    marginLeft: 5,

    marginTop: 0,
    paddingBottom: 0,
    fontSize: 16,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // borderBottomWidth: 0.5,
    // borderBottomColor: '#808080',
    marginTop: 15,
  },
  text_footer: {
    color: '#f5f5f5f5',
    fontWeight: 'bold',
    fontSize: 16,
  },
  header: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 3,
    // backgroundColor: theme.bg,
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
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
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
    fontWeight: 'bold',
    marginBottom: 15,
  },
  card_box: {
    shadowOffset: { width: 20, height: 10 },
    shadowColor: '#303030',
    borderRadius: 0,
    borderColor: '#fff',
    shadowOpacity: 0.5,
    elevation: 10,
    marginTop: 200,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 50,
    backgroundColor: '#fff',
  },
  text_card: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  viewbtm: {
    flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', 
    bottom: 80, width: '90%', alignSelf: 'center'

  },
  viewbtm2: {
    flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: 0, width: '90%', alignSelf: 'center'

  },
  imgback: {
    // flex:1,              
    flexDirection: 'column',
    // justifyContent: 'space-around',
    width: 340,
    height: '100%',
    borderRadius: 10
  },
  imgbackRule: {
    // flex:1,           
    backgroundColor:'red',   
    flexDirection: 'column',
    // justifyContent: 'space-around',
    width: 350,
    height: 450,
    // marginRight:10,
    borderRadius: 10,
    // paddingBottom:50
  },
  toptxt: {
    fontSize: 30, color: '#000', fontWeight: 'bold', marginTop: 115, alignSelf: 'center'
  },
  bottomSkip: {
    borderRadius: 20,
    backgroundColor: '#dada10',
    alignItems: 'center',
    justifyContent: 'center', left: 20,
  },
  bottomNext: {
    borderRadius: 20,
    backgroundColor: '#dada10',

    right: 20, alignItems: 'center',
    justifyContent: 'center'
  },
  midtxt: {
    fontSize: 24, color: '#fff', fontWeight: 'bold', marginTop: 70, alignSelf: 'center', textAlign: 'center'
  },
  tour_btn: {
    backgroundColor: '#26a206',
    fontSize: 22,
    width: '60%',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    borderRadius: 5,
    paddingBottom: 2.5,
    bottom: '19%'
  }, tour_btn_text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,

  },
});
