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
  Alert,
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
import { jsonContext } from '../context/GlobalState';
const green = '#3fc71d'
const green2 = '#208606'
const green3 = '#054815'
const yellow = '#fdfb51'
const yellow2 = '#f2c90d'
const yellow3 = '#fd821b'
const yellow4 = '#f89d06'//'#f2c90d', '#fd821b', '#f89d06']
var DeviceInfo = require('react-native-device-info');
var arr = [];
const SuperBotScreen = ({ route }) => {
  const navigation = useNavigation()
  const linkTo = useLinkTo();
  const { colors } = useTheme();
  const [Started, setStarted] = React.useState('')
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    setVals()
  }, []);

  const sureStopAlert = () =>
    Alert.alert('Confirmation', 'Are you sure you want to STOP AutoBot?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'STOP', onPress: () => { callStopApi() } },
    ]);
  const sureStartAlert = () =>
    Alert.alert('Confirmation', 'Are you sure you want to START AutoBot?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'START', onPress: () => { callStartApi() } },
    ]);

  function callStopApi() {
    setLoading(true)
    function objToQueryString(obj) {
      const keyValuePairs = [];
      for (const key in obj) {
        keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
      }
      return keyValuePairs.join('&');
    }
    const key_string = objToQueryString({
      key: global.uid + global.PWD + global.txnPassword
    });
    let url =
      global.BASE_URL + 'css_mob/superbot/stopautobot.aspx?uid=' + global.uid +
      '&token=' +
      global.token +
      '&device=' +
      DeviceInfo.getUniqueId() +
      '&dname=' +
      DeviceInfo.getModel() + '&' + key_string;
    console.log(url);
    fetch(url)
      .then(item => item.json())
      .then(Dta => {
        setLoading(false)
        console.log('result ', Dta);
        if (Dta[0].success !== 'true') {
          // setBTN(true);
          ToastAndroid.show('Not able to Start Autobot ! Please try later!', ToastAndroid.SHORT)
          return;
        }
        ToastAndroid.show('Autobot Stopped Successfully!', ToastAndroid.SHORT)
        navigation.goBack()
      })
      .catch(function (error) {
        ToastAndroid.show('Not able to Start Autobot ! Please try later!', ToastAndroid.SHORT)
        console.log(' fetch error ' + error);
        setLoading(false)
      });
  }
  function callStartApi() {
    console.log('api for start!!');
    setLoading(true)
    function objToQueryString(obj) {
      const keyValuePairs = [];
      for (const key in obj) {
        keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
      }
      return keyValuePairs.join('&');
    }
    const key_string = objToQueryString({
      key: global.uid + global.PWD + global.txnPassword
    });
    let url =
    global.BASE_URL +
    'css_mob/superbot/autobot.aspx?uid=' +
    global.uid +
    '&amt=' +
    '&num=' +
    '&capital='+
    '&type=' +'&account_mode='+
    '&token=' +
    global.token +
    '&device=' +
    DeviceInfo.getUniqueId() +
    '&dname=' +
    DeviceInfo.getModel()+'&'+key_string;
    console.log(url);
    fetch(url)
      .then(item => item.json())
      .then(Dta => {
        setLoading(false)
        console.log('result ', Dta);
        if (Dta.success !== 'true') {
          // setBTN(true);
          ToastAndroid.show('Not able to Start Autobot ! Please try later!', ToastAndroid.SHORT)
          return;
        }
        ToastAndroid.show('Autobot Started Successfully!', ToastAndroid.SHORT)
        navigation.goBack()
      })
      .catch(function (error) {
        ToastAndroid.show('Not able to Start Autobot ! Please try later!', ToastAndroid.SHORT)
        console.log(' fetch error ' + error);
        setLoading(false)
      });
  }

  async function setVals() {

    function objToQueryString(obj) {
      const keyValuePairs = [];
      for (const key in obj) {
        keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
      }
      return keyValuePairs.join('&');
    }
    const key_string = objToQueryString({
      key: global.uid + global.PWD + global.txnPassword
    });
    let url =
      global.BASE_URL + 'css_mob/superbot/auto_settings.aspx?uid=' + global.uid +
      '&token=' +
      global.token +
      '&device=' +
      DeviceInfo.getUniqueId() +
      '&dname=' +
      DeviceInfo.getModel() + '&' + key_string;
    console.log(url);
    fetch(url)
      .then(item => item.json())
      .then(data => {
        console.log('-----------response of api:::::' + JSON.stringify(data));
        if (data.success === 'true') {

          setStarted(data.started);
          // setBtype(data.auto_type)
          setLoading(false)
        }
      })
      .catch(e => {
        setLoading(false)
        console.log('error inss', e);
      })
      ;
  }

  return (
    <ImageBackground
      source={require('../assets/Aeon/bgbot.png')}
      resizeMode="stretch"
      style={styles1.container}>
      {
        loading ?
          <View style={[styles.container, { flex: 1, alignItems: 'center', marginTop: '40%' }]}>
            <LottieView
              source={require('../assets/loading.json')}
              style={{ width: 300, height: 300, alignSelf: 'center' }}
              autoPlay
              loop
            />
          </View>
          :
          <>

            <TouchableOpacity 
            onPress={()=>navigation.goBack()}
            style={styles1.topRow}>
              <Ionicons name="arrow-back-outline" size={24} color={colors.selected} />
              <Text style={styles1.toptxt}>AUTOBOT</Text>
            </TouchableOpacity>

            <View style={styles1.box}>
              <Image source={require('../assets/Aeon/autobotpic.png')}
                style={styles1.topimg}
                resizeMode="stretch"
              />

              <TouchableOpacity 
              // style={Started == 'True' ? styles1.btnstarted : styles1.btn}
                onPress={Started == 'True' ? sureStopAlert : sureStartAlert}>
                  <ImageBackground style={styles1.btn}
                  source={Started == 'True' ?require('../assets/Aeon/stopbot.png'):
                  require('../assets/Aeon/startbot.png')}
                  resizeMode="stretch"
                  >

                <Text style={styles1.btntxt}>{Started == 'True' ? 'STOP' : 'START'} AUTOBOT</Text>
                  </ImageBackground>
              </TouchableOpacity>
            </View>
          </>
      }
    </ImageBackground>
  )
};

export default SuperBotScreen;

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 40,
  },
  btn: {
    // paddingHorizontal: 40,
    // paddingVertical: 15,
    // backgroundColor: '#2875CA',
    alignSelf: 'center',
    marginTop: 100,
    width:270,
    height:70,

    // borderRadius: 20
  },
  btnstarted: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    backgroundColor: '#f6465d',
    alignSelf: 'center',
    marginTop: 100,
    borderRadius: 20
  },
  btntxt: {
    color: '#fff',
    fontFamily: global.appFontB,
    fontSize: 20,
    marginLeft:80,
    marginTop:22
  },
  box: {

  },
  topimg: {
    width:220,
    alignSelf: 'center',
    height: 350,
    marginTop: 60
  },
  topRow: {
    flexDirection: 'row',
    marginTop: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  toptxt: {
    fontFamily: global.appFontB,
    color: '#19dc51',
    fontSize: 22,
    marginLeft: '25%'
  },
  risk: {
    alignItems: 'center', justifyContent: 'center',

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
    marginLeft: 30
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
