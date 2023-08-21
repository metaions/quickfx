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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import AsyncStorage from '@react-native-async-storage/async-storage';
import global from '../component/global';
import styles from '../component/styles';
import Modal from 'react-native-modal';
import {set} from 'lodash';
var arr = [];
const InvestScreen = ({navigation, route}) => {
  const linkTo = useLinkTo();
  const {colors} = useTheme();
  const theme = useTheme();
  const [Data, setData] = React.useState('');
  const [Uid, setUid] = React.useState('');
  const [Amt, setAmt] = React.useState('');
  const [Num, setNum] = React.useState('');
  const [Btype, setBtype] = React.useState('');
  const [Bal, setBal] = React.useState(global.AccMode=='demo'?global.demobal:global.livebal);

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

  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isModalVisible2, setModalVisible2] = React.useState(false);
  const [timer, setTimer] = React.useState(6);
  const sym = route.params?.sym;
  // console.log("symboldis" + sym);
  const [Loading, setLoading] = React.useState(false);




  React.useEffect(() => {
   let url = global.BASE_URL+'css_mob/copy_settings.aspx?uid='+global.uid;   
   fetch(url)
   .then(item=>item.json())
   .then(data=>{
     if(data.success==='true'){       
       setNum(data.auto_famt)
       setNumTrades(data.auto_num)
      }
   })
  }, []);




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

  // useFocusEffect(
  //   React.useCallback(() => {
  //     setTimeout(async () => {
  //       let api_key;
  //       let secret_key;
  //       let uid;
  //       console.log('focus');
  //       try {
  //         uid = await AsyncStorage.getItem('user_id');
  //         arr = [];

  //         api_key = await AsyncStorage.getItem('api_key');
  //         secret_key = await AsyncStorage.getItem('secret_key');
  //         console.log(api_key);
  //         console.log(secret_key);
  //         if (
  //           api_key != '' ||
  //           (api_key != null && secret_key != '') ||
  //           secret_key != null
  //         ) {
  //           console.log(
  //             global.BASE_URL +
  //               'css_mob/get_bin_bal.aspx?asset=USDT&api_key=' +
  //               global.api_key +
  //               '&api_secret=' +
  //               global.api_secret +
  //               '&uid=' +
  //               uid +
  //               '&coins=true',
  //           );
  //           fetch(
  //             global.BASE_URL +
  //               'css_mob/get_bin_bal.aspx?asset=USDT&api_key=' +
  //               global.api_key +
  //               '&api_secret=' +
  //               global.api_secret +
  //               '&uid=' +
  //               uid +
  //               '&coins=true',
  //           )
  //             .then(item => item.json())
  //             .then(dta => {
  //               setBal(dta.balance);
  //               setShowCoins(dta.showcoins);
  //             });
  //         } else {
  //         }
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     }, 1000);
  //   }, []),
  // );
  async function myApiCall(uid) {
    console.log(global.BASE_URL + 'css_mob/api_key.aspx?uid=' + uid);
    fetch(global.BASE_URL + 'css_mob/api_key.aspx?uid=' + uid)
      .then(item => item.json())
      .then(Vdta => {
        console.log(Vdta);
        if (parseFloat(Vdta.amt) > 0) {
          global.activeId = true;
        } else {
          global.activeId = false;
        }
        global.txnPassword = Vdta.txn;
        global.ReqValue = Vdta.reqvalue;
        global.autoStatus = Vdta.auto; //'False' or 'True'
        global.autoAmt = Vdta.auto_amt;
        global.autoNum = Vdta.auto_num;
        global.autoFamt = Vdta.auto_famt;
        global.timeleft = Vdta.timeleft;
        global.autoFamt = Vdta.auto_famt;
        global.refurlProm = Vdta.whatsapp;
        // setAPI(Vdta.api_key)
        // setSecret(Vdta.secret_key)
        global.NAME = Vdta.name;
        global.EMAIL = Vdta.eid;
        global.PWD = Vdta.pwd;
        global.AMT = Vdta.amt;
        global.CUR = Vdta.cur;
        global.dt = Vdta.dt;
        global.api_key = Vdta.api_key; 
        if(Vdta.server_name.includes('MetaQuotes')){
          
          global.server_name = 'Exness-Demo';
        }
        else if(Vdta.server_name.includes('Vantage') || Vdta.server_name.includes('vantage')){
          
          global.server_name = 'Vantage';
        }
          else{
          global.server_name = Vdta.server_name;
        }
        global.api_secret = Vdta.secret_key;
        global.refurl = Vdta.refurl;
        const oldtoken = Vdta.ntoken;
        console.log('name is' + global.api_key);
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
          //   global.cur_name=await AsyncStorage.getItem('cur_name')
          //   global.cur_value=await AsyncStorage.getItem('cur_val')
        }
        // }
      });
  }
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
          'Copy Settings Are Updated. Now U Can Start To Copy Any 1 Particular Trader',
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
      if (global.autoStatus === 'True') {
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
    let Bal=global.AccMode=='demo'?global.demobal:global.livebal    
    var numT = parseFloat(Num) * 10;
    if (numT !== '' && Bal !== '') {
      if (parseFloat(Bal) % parseFloat(numT) === 0) {
        setStrades(Math.floor(parseFloat(Bal) / parseFloat(numT)).toFixed(1));
      } else {
        setStrades(Math.floor(parseFloat(Bal) / parseFloat(numT)).toFixed(1));
      }
    }
    console.log('kkkkkkk')
  }, [Strades, Num]);

  const EditInvest = async () => {
    setBTN(false);

    // if (parseInt(Num) < 5) {
    //   setBTN(true)
    //   ToastAndroid.show(
    //     'Minimum First Buy In Amount Is 5 USD',
    //     ToastAndroid.LONG,
    //   );
    //   setLoading(false)
    //   return;
    // }
    // if (numTrades>10)
    // {
    //     ToastAndroid.show('Maximum Number Of Trades Can be 10',ToastAndroid.LONG)
    //     return;

    // }

    toggleModal();

    global.autoAmt = Amt;
    global.autoNum = numTrades;
    global.autoFamt = Num;
    let url =
      global.BASE_URL +
      'css_mob/autobot.aspx?uid=' +
      Uid +
      '&amt=0.01&num=' +
      numTrades +
      '&num1=' +
      numTrades +
      '&mode=edit' +
      '&bal=' +
      Bal;
    global.autoStatus = 'True';
    // let url=global.BASE_URL+'css_mob/stopautobot.aspx?uid='+Uid;
    console.log(url);
    setCount(true);
    fetch(url)
      .then(item => item.json())
      .then(Dta => {
        console.log(Dta + '   ' + JSON.stringify(Dta));
        if(Dta.success!=='true'){
          setBTN(true)
          return
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
    global.autoStatus = 'False';
    setFromEdit(true);
  };
  const StopInvest = async () => {
    console.log('stop invest');
    setIsModalVisibleStop(false);
    global.autoStatus = 'False';
    // let url=global.BASE_URL+'css_mob/f?uid='+Uid+'&amt='+Amt+'&num='+Num+'&mode=edit';
    let url = global.BASE_URL + 'css_mob/stopautobot.aspx?uid=' + Uid;
    console.log(url);
    fetch(url)
      .then(item => item.json())
      .then(Dta => {
        global.autoAmt = 0;
        global.autoNum = 0;
        global.autoFamt = 0;

        console.log(Dta + '   ' + JSON.stringify(Dta));
        if(Dta.success!=='true'){
          setBTN(true)
          return
        }
        toggleModal2();
      })
      .catch(function (error) {
        toggleModal2();
        console.log(' fetch error ' + error);
      });
  };
  async function myApi() {
    fetch(global.BASE_URL + 'css_mob/api_key.aspx?uid=' + Uid)
      .then(item => item.json())
      .then(Vdta => {
        console.log(Vdta);
        if (parseFloat(Vdta.amt) > 0) {
          global.activeId = true;
        } else {
          global.activeId = false;
        }
        global.txnPassword = Vdta.txn;
        global.ReqValue = Vdta.reqvalue;
        global.autoStatus = Vdta.auto; //'False' or 'True'
        global.autoAmt = Vdta.auto_amt;
        global.autoNum = Vdta.auto_num;
        global.autoFamt = Vdta.auto_famt;
        global.timeleft = Vdta.timeleft;
        global.autoFamt = Vdta.auto_famt;
        global.refurlProm = Vdta.whatsapp;
        // setAPI(Vdta.api_key)
        // setSecret(Vdta.secret_key)
        global.NAME = Vdta.name;
        global.EMAIL = Vdta.eid;
        global.PWD = Vdta.pwd;
        global.AMT = Vdta.amt;
        global.CUR = Vdta.cur;
        global.dt = Vdta.dt;
        global.api_key = Vdta.api_key;
        if(Vdta.server_name.includes('MetaQuotes')){
          
          global.server_name = 'Exness-Demo';
        }
        else if(Vdta.server_name.includes('Vantage') || Vdta.server_name.includes('vantage')){
          
          global.server_name = 'Vantage';
        }
          else{
          global.server_name = Vdta.server_name;
        }
        global.api_secret = Vdta.secret_key;
        global.refurl = Vdta.refurl;

        console.log('name is' + global.api_key);
        check();
        async function check() {
          await AsyncStorage.setItem('api_key', Vdta.api_key);
          await AsyncStorage.setItem('secret_key', Vdta.secret_key);
          global.cur_name = await AsyncStorage.getItem('cur_name');
          global.cur_value = await AsyncStorage.getItem('cur_val');
        }
        // }
      });
  }

  const Invest = async () => {
    setBTN(false);

    // if (parseFloat(Amt) > parseFloat(Bal)) {
    //   ToastAndroid.show('Not Enough USD Available', ToastAndroid.LONG);
    //   return;
    // }
    // if (parseInt(Num) < 10) {
    //   setBTN(true)
    //   ToastAndroid.show(
    //     'Minimum First Buy In Amount Is 10 USD',
    //     ToastAndroid.LONG,
    //   );
    //   setLoading(false)
    //   return;
    // }
    if (parseInt(numTrades) < 1) {
      ToastAndroid.show('Please Fill All Values', ToastAndroid.LONG);
      setLoading(false)
      return;
    }
    global.autoAmt = Amt;
    global.autoNum = numTrades;
    global.autoFamt = Num;

    let url =
      global.BASE_URL +
      'css_mob/autobot.aspx?uid=' +
      Uid +
      '&amt=0.01&num=' +
      numTrades +
      '&num1=' +
      numTrades +
      '&type=' +
      Btype +
      '&bal=' +
      Bal;
    console.log(url);
    apihit()
    function apihit(){

    
      fetch(url)
      .then(item => item.json())
      .then(Dta => {
        console.log(Dta + '   ' + JSON.stringify(Dta));
        if(Dta.success!=='true'){
          setBTN(true)
          return
        }
          // const timer = setTimeout(() => {
          //   var currentDate = new Date();
          //   var minutesToAdd = 20;
          //   var futureDate = new Date(
          //     currentDate.getTime() - minutesToAdd * 60000,
          //   );
          //   global.autobot_time = futureDate;
          //   global.autoStatus = 'True';
          //   global.autotype = Btype;
          //   toggleModal();
          //   setCount(true);
          // }, 3000);
        
        
        console.log('.........................')
        if (Dta.success === 'true') {
          toggleModal();
          console.log('///////////////////////')
          var currentDate = new Date();
          var minutesToAdd = 20;
          var futureDate = new Date(
            currentDate.getTime() - minutesToAdd * 60000,
            );
            global.autobot_time = futureDate;
          global.autoStatus = 'True';
          global.autotype = Btype;
          global.status='true'
          global.Coins='';
          setCount(true);
        } else {
          setBTN(true);
          ToastAndroid.show(Dta.msg, ToastAndroid.LONG);
        }
        
        // myApi();
      })
      .catch(function (error) {
        toggleModal();
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
    <ImageBackground
    source={global.bgimg}
    resizeMode={'stretch'}
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 15,height:'100%'
      }}>
    <ScrollView

    contentContainerStyle={{paddingTop:40}}
      style={[styles1.container, {}]}>
       
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 15,
              width: '80%',
              
              paddingVertical: 0,
              marginBottom: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                alignItems: 'center',
                paddingHorizontal: 20
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
                style={{alignItems: 'center', justifyContent: 'center'}}></View>
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
                    style={{color: 'white', fontSize: 20, textAlign: 'center'}}>
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
                style={{width: '100%', alignSelf: 'center', paddingVertical: 0}}
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
                  Copy Settings Updated...
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
                You can proceed further. Please Select A Copy Trader Of Your Choice.
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
                    style={{color: 'white', fontSize: 20, textAlign: 'center'}}>
                    Run In Background ({timer})
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
              style={{color: colors.selected, fontSize: 17, fontWeight: 'bold'}}>
              Do you really want to Edit Settings of Copy Trade?
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
              style={{color: colors.selected, fontSize: 17, fontWeight: 'bold'}}>
              Do you really want to Stop SMARTBOT?
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
   
       
            <View style={{  paddingHorizontal:50}}>
          <ImageBackground source={require('../assets/botz/top-ticket-bg.png')} resizeMode={'stretch'}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              flexDirection: 'row',
             width:330,height:120
            }}>
            <Image
              source={require('../assets/smartbot/coins.png')}
              style={{width: 50, height: 40, alignSelf: 'center'}}
              resizeMode={'stretch'}
            />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 10,
              }}>
              <Text
                style={{
                  color: colors.selected,
                  fontSize: 17,
                  fontFamily: global.bold,
                  alignSelf: 'flex-start',
                }}>
                USD Balance
              </Text>
              <Text
                style={{
                  color: '#fffa05',
                  fontSize: 20,
                  fontFamily: global.bold,
                  alignSelf: 'flex-start',
                }}>
                {' '}
                {global.livebal} USD{'\n'}
              </Text>
            </View>
          </ImageBackground>
          <Text
            style={{
              color: colors.selected,
              fontSize: 15,
              alignSelf: 'center',
              marginVertical:10,
              // alignItems: 'center',
              fontFamily: global.bold,
            }}>
            Number of Trades
          </Text>
          
          <ImageBackground source={require('../assets/botz/input-password-bg.png')} resizeMode='stretch' 
            style={[
              styles1.boxouter,
              { marginBottom: 10},
            ]}>
            {/* <Image
              source={require('../assets/smartbot/white2.png')}
              style={styles1.boximg}
              resizeMode={'stretch'}
            /> */}
            <TextInput
              placeholder={ph2 ? null : 'Eg 2'}
              onFocus={() => {
                setPh2(true);
              }}
              onBlur={() => {
                setPh2(false);
              }}
              value={numTrades}
              // keyboardType="default"
              maxLength={30}
              editable={global.autoStatus === 'True' ? false : true}
              style={
                global.autoStatus === 'True'
                  ? styles1.textInput2
                  : styles1.textInput
              }
              keyboardType="number-pad"
              autoCapitalize="none"
              onChangeText={val =>
                {
                let new_bal=parseFloat(global.livebal)/10  ;
                setNumTrades(val)
                new_bal=Math.floor(new_bal/val)                
                setNum(new_bal.toString())
                }
              }
              // width={'80%'}
              // marginTop={10}
              // borderRadius={5}
              placeholderTextColor="#fff"
              selectionColor={global.autoStatus == 'True' ? '#fff' : '#fff'} //'#808080'
              // color={global.autoStatus=='True'?'white':'#4d0300'}//'#000'
              color={'#fff'}
              // color={'#4d0300'}
              // selectionColor={'black'} //{'#4d0300'}//'#808080'
              // color={global.autoStatus=='True'?'white':'#4d0300'}//'#000'
              // selectionColor={'transparent'}
            />
          </ImageBackground>

          {/* <Text
            style={{
              color: colors.selected,
              fontSize: 15,
              alignSelf: 'flex-start',
              // marginLeft: 25,
              paddingVertical: 10,
              fontFamily: global.bold,alignSelf: 'center'
            }}>
            First Order Amount
          </Text>
          <ImageBackground source={require('../assets/botz/input-password-bg.png')} resizeMode='stretch' style={styles1.boxouter}>
           
            <TextInput
              placeholder={ph ? null : 'Eg 11 USD'}
              
              // placeholderTextColor={ph?'transparent':}
              // onFocus={() => {
              //   setPh(true);
              // }}
              keyboardType="number-pad"
              maxLength={30}
              // value={isFinite(Num)?Num:0}
              value={'0.01'}
              onBlur={() => {
                setPh(false);
              }}
              editable={false}
              // editable={global.autoStatus === 'True' ? false : true}
              style={
                global.autoStatus === 'True'
                  ? styles1.textInput2
                  : styles1.textInput
              }
              autoCapitalize="none"
              // onChangeText={val => setNum(val)}
              // width={'80%'}
              // marginTop={10}
              // borderRadius={5}
              placeholderTextColor="#fff"
              // selectionColor={'#4d0300'}//'#808080'
              // color={'#4d0300'}//'#000'
              selectionColor={'#fff'} //{global.autoStatus=='True'?'white':'#4d0300'}//'#808080'
              // color={global.autoStatus=='True'?'white':''}//'#000'
              color={'#fff'}
              // selectionColor={'transparent'}
            />
          </ImageBackground> */}
          
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginTop: 10,
            }}>
            {/* <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setSelected1(!selected1),
                  setSelected2(false),
                  setSelected3(false),
                  setBtype('high');
              }}
              style={{marginHorizontal: 10}}>
              <ImageBackground
                source={
                  selected1
                    ? require('../assets/botz/bot1.png')
                    : require('../assets/botz/bot.png')
                }
                style={{
                  width: selected1 ? 70 : 60,
                  height: selected1 ? 70 : 80,
                  justifyContent: 'center',
                }}
                resizeMode={'contain'}>
                <Text
                  style={{
                    color: selected1 ? colors.selected : '#000',
                    textAlign: 'center',
                    fontSize: 13,
                    marginTop: 10,
                  }}>
                  High Risk{'\n'}
                </Text>
              </ImageBackground>
            </TouchableOpacity> */}
            <TouchableOpacity
            style={{display:'none'}}
              activeOpacity={0.7}
              onPress={() => {
                setSelected2(!selected2),
                  setSelected1(false),
                  setSelected3(false),
                  setBtype('low');
              }}>
              <ImageBackground
                source={
                  selected2
                    ? require('../assets/botz/bot1.png')
                    : require('../assets/botz/bot.png')
                }
                style={{
                  width: selected2 ? 70 : 60,
                  height: selected2 ? 70 : 80,
                  justifyContent: 'center',
                }}
                resizeMode={'contain'}>
                <Text
                  style={{
                    color: selected2 ? colors.selected : '#000',
                    textAlign: 'center',
                    fontSize: 13,
                    marginTop: 10,
                  }}>
                  Auto{'\n'}
                </Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity 
              activeOpacity={0.7}
              onPress={() => {
                setSelected3(!selected3),
                  setSelected1(false),
                  setSelected2(false),
                  setBtype('custom'),
                  navigation.navigate('AutobotSettings');
              }}
              style={{marginHorizontal: 10,display:'none'}}>
              <ImageBackground
                source={
                  selected3
                    ? require('../assets/botz/bot1.png')
                    : require('../assets/botz/bot.png')
                }
                style={{
                  width: selected3 ? 70 : 60,
                  height: selected3 ? 70 : 80,
                  justifyContent: 'center',
                }}
                resizeMode={'contain'}>
                <Text
                  style={{
                    color: selected3 ? colors.selected : '#000',
                    textAlign: 'center',
                    fontSize: 13,
                    marginTop: 10,
                  }}>
                  Custom{'\n'}
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        
      </View>
        
        <View style={{zIndex:999,}}>
{global.autoStatus === 'True' ? (
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around',
              justifyContent:'space-between',alignItems: 'center',width:'100%'}}>
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
                    justifyContent: 'center',backgroundColor: '#686868',borderRadius:5
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
                    justifyContent: 'center',borderRadius:5,
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
              {/* <View
                style={{
                  width: '100%',
                  marginVertical: 5,
                  alignItems: 'center',                  
                }}>
                <Text style={{fontSize: 18, marginLeft: 10,color:colors.selected}}>
                  Suggested Number of Trades : {isNaN(Strades) ? 0 : Strades}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{flexDirection:'row',alignItems: 'center'}}
                  onPress={()=>{ Linking.openURL(global.BASE_URL+'web/strategy.html',)}}
                  >
                  <Text style={{fontSize: 18, marginLeft: 10,color:colors.selected}}>
                  Strategy
                  </Text>
                    <Image source={require('../assets/botz/alert1.png')} style={{width:40,height:40}} resizeMode={'contain'} />
                </TouchableOpacity>
              </View> */}
              <TouchableOpacity
                onPress={() => {
                  if (Num != '') {
                    if (global.api_key === '') {
                      setBTN(true)
                      ToastAndroid.show(
                        'Please Link your API Address first!',
                        ToastAndroid.LONG,
                      );
                    } else {
                      //    console.log('values: '+numTrades+'  '+)
                      if (fromEdit && parseInt(numTrades) > 0) {
                        // if(parseInt(numTrades)*parseInt(Num)<=parseFloat(Bal))
                        // {
                        EditInvest();
                        // }
                        //  else{
                        //     ToastAndroid.show("Can't enter amount greater than balance! ",ToastAndroid.SHORT)
                        //  }
                      } else if (!fromEdit && parseInt(numTrades) > 0) {
                        // if(parseInt(numTrades)*parseInt(Num)<=parseFloat(Bal))
                        // {
                        Invest();
                        // }
                        //  else{
                        //     ToastAndroid.show("Can't enter amount greater than balance! ",ToastAndroid.SHORT)
                        //  }
                      } else {
                        setBTN(true)
                        ToastAndroid.show(
                          'Number of Trades should be greater than 0! ',
                          ToastAndroid.SHORT,
                        );
                      }
                    }
                  } else {
                    setBTN(true)
                    ToastAndroid.show(
                      'Enter the details first! ',
                      ToastAndroid.SHORT,
                    );
                  }
                }}
                activeOpacity={0.9}
                style={{paddingHorizontal: 0, marginTop: 0}}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',width:200,height:40,alignSelf:'center',
                    paddingHorizontal: 10,backgroundColor:colors.binanceylw2,borderRadius:5
                  }}>
                  <Text style={{color: 'black',marginBottom:5, fontSize: 20}}>
                    Submit{' '}
                    {BTN ? null : (
                      <ActivityIndicator size={'small'} color="#000" />
                    )}{' '}
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          )}
        </View>
        
          {/* <View
            style={{
              alignItems: 'flex-start',
              width: '80%',
              padding: 5,
              borderColor: '#ffe36e',
              borderWidth: 0,
              borderRadius: 10,
              marginTop: 10,
              paddingBottom: 35,
            }}>
            <Text style={{color: global.appColor1, fontWeight: 'bold'}}>
              Welcome to Smart Auto Bot.{'\n'}Just Give me Money and I Will
              Start The Best Trades for You.{'\n'}
              {'\n'}
             
            </Text>
          </View> */}
     
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

export default InvestScreen;

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#0B1725',
    // paddingTop: 40,
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
    // backgroundColor: 'white',
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
