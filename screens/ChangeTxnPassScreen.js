import * as React from 'react';
import { ThemeProvider, useTheme } from '@react-navigation/native';
import {
  View, Text, Button, Dimensions, RefreshControl,
  TouchableOpacity, ToastAndroid, Clipboard, StyleSheet,
  Image, StatusBar, FlatList, ScrollView, TextInput, ActivityIndicator, ImageBackground
} from 'react-native';

import IonIcons from 'react-native-vector-icons/Ionicons'
import LottieView from 'lottie-react-native';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../component/context';

import LinearGradient from 'react-native-linear-gradient';
import theme from '../component/theme';
import styles from '../component/styles';

import global from '../component/global';
import Feather from 'react-native-vector-icons/Feather'
import Modal from 'react-native-modal';
const bginput = '#2a3340'
const plc = '#666d80'
var DeviceInfo = require('react-native-device-info');
const ChangeTxnPassScreen = ({ navigation, route }) => {
  // my_addr:addr,cur:Id,acc:AccName,img: Coin.image
  const img = route.params?.img;
  const cur = route.params?.cur;
  const PWD = global.txnPassword;
  const { colors } = useTheme();
  const { signOut } = React.useContext(AuthContext);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const { App_Lock } = React.useContext(AuthContext);
  const [Loading, setLoading] = React.useState(true);
  const [Uid, setUid] = React.useState('');
 
  const [Success, setSuccess] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [New_pwd, setNew_pwd] = React.useState('');
  const [Old_pwd, setOld_pwd] = React.useState('');
  const [Ld, setLd] = React.useState('');
  const [Pwd, setPwd] = React.useState('');
  const [Whis, setWhis] = React.useState(false);
  const [Balance, setBal] = React.useState('');
  const [token, setToken] = React.useState('');
  const [otpModal, setOtpModal] = React.useState(false);
  const [clicked, setClicked] = React.useState(false)
  const [Verify, setVerify] = React.useState('');
  const [seconds, setSeconds] = React.useState(60);
  const [Count, setCount] = React.useState(false);

  const [OTP, setOTP] = React.useState('');
  React.useEffect(() => {
    if (Count) {

      if (seconds > 0) {
        setTimeout(() => setSeconds(seconds - 1), 1000);
      } else {
        setSeconds(60);
        setCount(false)
      }
    }
  });
  const onToggleSwitch = () => {
    if (isSwitchOn) {
      setIsSwitchOn(false)
      App_Lock("false")
    } else if (!isSwitchOn) {
      setIsSwitchOn(true)
      App_Lock("true")
    }
  };


  useFocusEffect(
    React.useCallback(() => {
      // let do = false

      // if(do)
      let a = setTimeout(async () => {
        // setIsLoading(false);
        let code;
        let uid;
        let pwd;
        code = null;
        try {
          uid = await AsyncStorage.getItem('user_id')
          code = await AsyncStorage.getItem('app_code');
          pwd = await AsyncStorage.getItem('myPwd')
          console.log(code)
          setUid(uid)
          setPwd(pwd)
          setLoading(false)
          console.log('this was my old pwd', PWD)

          //  getBal()    

        }
        catch (e) {
          console.log(e);
        }
        // console.log('user token:', userToken);


      });

      return()=>{
        
        clearTimeout(a)}
      //we can add delay time here before callApi() i.e ' },1000,callApi());' //
    }, [Uid])
  );
  const getBal = () => {
    var url = global.BASE_URL + 'css_mob/bal.aspx?uid=' + Uid + '&ttype=V'
    console.log(url)
    fetch(url)
      .then(item => item.json())
      .then(dta => {
        if (dta.success === 'true') {
          console.log('balanceaaya', dta.msg)
          setBal(dta.msg)

        } else {
          ToastAndroid.show(dta.result.status, ToastAndroid.SHORT)
        }
      })
  }

  const OTPCall = async () => {
    let token = await AsyncStorage.getItem('token')
    setToken(token)
    if (Uid != '') {

      fetch(global.BASE_URL + "css_mob/sendotp.aspx?uid=" + Uid + "&type=email&otp=withdrawal&device=" + DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel() + '&token=' + token)
        .then(item => item.json())
        .then(SData => {

          console.log(SData)
          if (SData.success === "true") {
            setOTP(SData.otp)
            console.log(SData.otp)
            ToastAndroid.show("Please Check Your Email Inbox/Spam Folder For Verification Code.", ToastAndroid.LONG)
          }
          if (SData.success === 'false' && SData.msg === 'wrong_pwd') {
            signOut()
          }

        })
    } else {
      ToastAndroid.show("Enter a valid email first", ToastAndroid.SHORT)
    }

  };
  const OtpSubmit = () => {
    if (parseFloat(Verify) !== parseFloat(OTP)) {
      ToastAndroid.show("Invalid Verification code ", ToastAndroid.SHORT);
      setClicked(false)
    } else {
      console.log('transaction password: ' + global.txnPassword)

      //   setBTN(false)
      //   setTimeout(()=>{
      //         setBTN(true)
      //   },3000)
      setOtpModal(false)
      Withdraw()

      setLd(false)
    }
  }

  //   setLoading(true),Withdraw()
  const Withdraw = () => {
    function objToQueryString(obj) {
      const keyValuePairs = [];
      for (const key in obj) {
        keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
      }
      return keyValuePairs.join('&');
    }
    const key_string = objToQueryString({
      key: Uid + global.PWD + Old_pwd
    });

    const ePass = objToQueryString({
      epass: global.txnPassword
    });
    var url = global.BASE_URL + 'css_mob/update_txn.aspx?uid=' + Uid + '&old=' + Old_pwd + '&txn=' + New_pwd + '&pwd=' + Pwd + '&' + key_string + '&' + ePass + '&token=' + token + '&device=' + DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel()
    console.log(url)
    try {

      fetch(url)
        .then(item => item.json())
        .then(async dta => {
          if (dta.success === 'false' && dta.msg === 'wrong_pwd') {
            signOut()
            ToastAndroid.show("Please Login once again", ToastAndroid.SHORT)
          }
          console.log(dta)
          if (dta.success === 'true') {
            global.txnPassword = New_pwd;
            await AsyncStorage.setItem('txn_pwd', New_pwd)
            setLoading(false)
            setLd(false)
            ToastAndroid.show(dta.msg, ToastAndroid.SHORT)
            navigation.goBack()
          }
          else {
            ToastAndroid.show(dta.msg, ToastAndroid.SHORT)
            setLoading(false)
            setLd(false)
          }
        })
    } catch (e) {
      console.log(e)
    }
  }



  const onRefresh = React.useCallback(async () => {

    setRefreshing(true);
    history(Uid)


  })




  return (

    Success ?
      <View style={[styles.container, { paddingTop: 20, alignItems: 'center', justifyContent: 'center' }]}>
        <LottieView source={require('../assets/success.json')} style={{ width: 350, height: 350, alignSelf: 'center' }} autoPlay loop={false} />
      </View>

      :
      <ImageBackground source={global.bgimg} resizeMode='stretch' style={[styles.container,]}>

        <Modal onBackButtonPress={() => { setOtpModal(false) }}
         onBackdropPress={() => { setOtpModal(false) }}
          useNativeDriver={true}
          animationIn={'slideInUp'} animationOut={'slideOutDown'}
          isVisible={otpModal} style={{ alignSelf: 'center' }} 
          animationInTiming={300} animationOutTiming={200}
        >
           <ImageBackground 
          source={require('../assets/Aeon/otpbg.png')}
          resizeMode="stretch"
          style={{width:Dimensions.get('window').width*0.96,
          height:'80%',borderRadius:10,
          justifyContent:'center',}}>
             
            <View
              style={{ width: '100%', paddingTop: 30,
               paddingBottom: 0, borderRadius: 0, 
                height: '100%' }}

            >
              {/* <Text style={{ fontWeight: 'bold', color: colors.appGray, fontSize: 16, alignSelf: 'center', marginBottom: 20 }}>Email OTP Verification</Text> */}
              <View style={{  marginTop: 50, alignItems: 'flex-start' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginTop: 10 }}>


                  <TextInput
                    placeholder="Verification Code"
                    //   style={[styles1.textInput,{backgroundColor:'white',elevation:10,borderRadius:50, shadowColor: 'white',paddingVertical:10
                    // }]}
                    style={styles1.textInput}

                    keyboardType={'number-pad'}
                    autoCapitalize="none"
                    onChangeText={(val) => setVerify(val)}
                    width={200}

                    maxLength={6}
                    placeholderTextColor='#c0c0c0'
                    selectionColor='#fff'
                    color='#fff'

                  />


                  {/* </View> */}
                  <TouchableOpacity onPress={Count ? null : () => { setCount(true), OTPCall() }} style={{ alignSelf: 'center', marginLeft: 10 }} >
                    <View style={[{
                      alignItems: 'center', flexDirection: 'row', justifyContent: 'center',
                      height: 40, paddingHorizontal: 5, borderRadius: 25, paddingVertical: 5, width: 150, backgroundColor: '#fff'
                    }]}>
                      {Count ? null : <Text style={[styles.text, { textAlign: 'center' }]}>SEND CODE to EMAIL</Text>}
                      {Count ? <Text style={[styles.text, { textAlign: 'center' }]}>RESEND CODE IN: <Text style={{ fontSize: 18 }}> {seconds}</Text>  </Text> : null}

                    </View>
                  </TouchableOpacity>
                </View>
                {/* <View style={{width:350,alignItems: 'flex-start',alignSelf: 'center',backgroundColor:'transparent',
                 marginTop:10,borderRadius:0,marginLeft:-10}}>
                 
                 <TextInput
                         placeholder="Enter Transaction Password"
                         keyboardType='default'                        
                         style={styles1.textInput}
                         autoCapitalize="none"
                         onChangeText={(val) => setTxnPassword(val)}                        
                         width={'80%'}
                         placeholderTextColor='#c0c0c0'
                         selectionColor='#fff'
                         color='#fff'
                         
                     />
                 </View> */}
              </View>
              <TouchableOpacity disabled={clicked ? true : false} onPress={() => { setClicked(true), OtpSubmit() }}
                style={{ display: 'flex', marginTop: 50 }}>
                <LinearGradient
                  colors={[colors.profitcolor, colors.profitcolor2]}
                  style={{ width: '80%', borderRadius: 30, paddingHorizontal: 25, paddingVertical: 10, alignSelf: 'center', alignItems: 'center' }}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 1 }}
                >

                  <Text style={{ color: colors.appBlack, fontSize: 16, fontFamily: global.appFontM }}>Change Txn Password</Text>
                  {clicked ? <ActivityIndicator size={'small'} color="#fff" /> : null}
                </LinearGradient>
              </TouchableOpacity>

            </View>

          </ImageBackground>
        </Modal>

        <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 5, marginBottom: 10, marginTop: 40 }}>
          <View style={{ flexDirection: 'row', width: '98%', paddingLeft: 10 }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10, marginTop: 2, marginRight: 10 }}>
              <Text style={{ textAlign: 'right' }}><IonIcons name="md-arrow-back" size={22} color={colors.selected} /></Text>
            </TouchableOpacity>
            <Text style={[styles.heading, { color: colors.profitcolor2, textTransform: 'uppercase', fontSize: 19 }]}>Change TXN Password</Text>
          </View>
        </View>

        {Loading ?
          <View style={{
            flexDirection: 'column', justifyContent: 'center', height: '100%',
            backgroundColor: colors.background
          }} ><LottieView source={require('../assets/loading.json')}
            style={{ width: 150, height: 100, alignSelf: 'center' }} autoPlay loop /></View>
          :
          <View style={{
            marginBottom: '20%', position: 'relative', top: 10, alignSelf: 'center', width: '100%',
            alignItems: 'center', paddingBottom: 20, borderRadius: 10, paddingHorizontal: 20
          }}>
            <View style={styles1.action} >
              <Text style={[styles.head, { marginTop: 50, fontFamily: global.appFontM, color: colors.selected, }]}>Old Password</Text>
              {/* <ImageBackground source= {require('../assets/botz/input-password-bg.png')} resizeMode="stretch" style={{
          width: '100%', paddingRight: 25, alignItems: 'center',
          flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, borderRadius: 4, paddingHorizontal: 5
      }}> */}

              <TextInput
                placeholder="Enter Old Password"
                keyboardType='default'

                style={styles1.textinput}
                autoCapitalize="none"
                onChangeText={(val) => setOld_pwd(val)}
                width={'100%'}
                borderRadius={5}
                placeholderTextColor={plc}
                selectionColor={colors.selected}
                color='#fff'

              />
              {/* </ImageBackground> */}
              <Text style={[styles.head, { marginTop: 50, fontFamily: global.appFontM, color: colors.selected, }]}>New Password</Text>
              {/* <ImageBackground source= {require('../assets/botz/input-password-bg.png')} resizeMode="stretch" style={{
          width: '100%', paddingRight: 25, alignItems: 'center',
          flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, borderRadius: 4, paddingHorizontal: 5
      }}> */}

              <TextInput
                placeholder="Enter New Password"
                onChangeText={(val) => setNew_pwd(val)}
                keyboardType='default'

                style={styles1.textinput}
                autoCapitalize="none"
                //   onChangeText={(val) => setOld_pwd(val)}
                width={'100%'}
                borderRadius={5}
                placeholderTextColor={plc}
                selectionColor={colors.selected}
                color='#fff'

              />
              {/* </ImageBackground> */}
              {/* <View style={styles1.action} >
                    
                    <TextInput
                        placeholder="Enter Old Password"
                        keyboardType='defualt'
                        maxLength={30}
                        style={styles1.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => setOld_pwd(val)}
                        width={'100%'}                                                        
                        borderRadius={5}
                        placeholderTextColor='#808080'                            
                        selectionColor='#808080'
                        color={colors.selected}//'#2F67F0'
                        
                    />
                    
                    <TextInput
                        placeholder="Enter New Password"
                        keyboardType='default'                        
                        style={styles1.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => setNew_pwd(val)}                        
                        width={'100%'}
                        secureTextEntry={true}
                        placeholderTextColor='#808080'
                        selectionColor='#808080'
                        color={colors.selected}
                        
                    />
                                           
                      */}
            </View>


            {/* <TouchableOpacity
                                style={styles1.signIn}
                                onPress={() => { Withdraw(),setLd(true)}}
                                activeOpacity={0.9}
                                underlayColor="#000"
                            >
                                <LinearGradient
                                   colors={[ colors.binanceylw2,colors.binanceylw2]}
                                    style={styles1.signIn}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 1 }}
                                >
                                    <Text style={styles1.textSign}>Continue</Text>
                                   {Ld? <ActivityIndicator size={'small'}  color="#d0d0d0" />:null}
                                </LinearGradient>
                            </TouchableOpacity> */}





          </View>
        }

        <TouchableOpacity
          onPress={() => {
            if (New_pwd == '' || Old_pwd == '') {
              ToastAndroid.show('Please Enter Both Old and New Passwords First!', ToastAndroid.SHORT)
              return
            }
            setOtpModal(true)
          }}

          style={[(Old_pwd != '' && New_pwd != '') ? { backgroundColor: colors.appGray } : { backgroundColor:colors.profitcolor2 }, {
            padding: 5, borderRadius: 30, height: 50, alignItems: 'center', justifyContent: 'center',
             alignSelf: 'center', width: '80%'
          }]}>
          {!Loading ? <Text style={{ fontSize: 18, color: '#fff', fontFamily: global.appFontM }}>SUBMIT</Text> :
            <ActivityIndicator size={'small'} color="#fff" />}
        </TouchableOpacity>





      </ImageBackground>





  );
}



export default ChangeTxnPassScreen;
const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: theme.bg,
    paddingTop: 10,
    paddingHorizontal: 10

  },
  textinput: {
    fontSize: 15,
    color: '#fff',
    width: '100%',
    borderBottomColor: '#19dc51',marginTop:10,
    borderBottomWidth: 1.5
  },
  action: {
    width: '100%',
    alignSelf: 'center',
  },
  hour_box: {

    color: '#808080',
    borderBottomWidth: 0.5,
    width: '80%',
    paddingVertical: 5,
    paddingHorizontal: 0,
    marginHorizontal: 20,

  },
  action: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: 15,
    paddingHorizontal: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    width: '90%'

  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 10
  },
  textInput: {
    paddingLeft: 25,
    borderBottomWidth: 0.5,
    paddingVertical: 15,
    borderColor: '#fff',
    borderRadius: 5,
    marginVertical: 10,
    fontSize: 16,
    fontWeight: 'bold'
  },
  button: {
    alignItems: 'center',

    width: '100%',
    // paddingBottom:'10%',

  },
  text_header: {
    color: "#fff",
    fontWeight: 'bold',
    fontSize: 30
  },

  text_footer: {
    color: '#000',
    fontWeight: '400',
    fontSize: 15,

  },
  header: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',

  },

  text: {
    color: theme.hgl,

    fontSize: 12,


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
    borderRadius: 5,
    flexDirection: 'row',

  },
  button: {
    alignItems: 'center',
    marginTop: 10,

  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#d5d5d5',
    marginVertical: 15,
    marginLeft: 5,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000'
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
    marginBottom: 15
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
  }
});





/* 


    <View >
           <TouchableOpacity  onPress={()=>{navigation.navigate('RestoreAcc')}} style={{backgroundColor:colors.vbg,width:'90%',height:90,borderRadius:10,alignItems: 'flex-start',alignSelf: 'center',borderLeftWidth:4,borderTopLeftRadius:5,borderBottomLeftRadius:5,borderLeftColor:"#F7931B",paddingLeft:10,paddingVertical:10,marginVertical:5}}>
            <View style={{flexDirection:'row',justifyContent:'space-around',alignItems: 'center'}}>
            <Text style={{textAlign:'center',width:30}}><MaterialIcons name="restore" size={25}  color={'#fff'}   /></Text>
            <View style={{flexDirection:'column',justifyContent:'space-around',paddingLeft:15}}>
                    <Text style={[styles.sheading,{textAlign:'left'}]}>RESTORE ACCOUNT</Text>
                    <Text style={[styles1.text,{width:200}]}>Restore your old wallet accounts.</Text>
            </View>
            </View>
            </TouchableOpacity>
    </View>
   <View >
           <TouchableOpacity onPress={()=>{navigation.navigate('ImportAcc')}} style={{backgroundColor:colors.vbg,width:'90%',height:90,borderRadius:10,alignItems: 'flex-start',alignSelf: 'center',borderLeftWidth:4,borderTopLeftRadius:5,borderBottomLeftRadius:5,borderLeftColor:"#F7931B",paddingLeft:10,paddingVertical:10,marginVertical:5}}>  
            <View style={{flexDirection:'row',justifyContent:'space-around',alignItems: 'center'}}>
            <Text style={{textAlign:'center',width:30}}><IonIcons name="md-download-outline" size={25}  color={'#fff'}   /></Text>
            <View style={{flexDirection:'column',justifyContent:'space-around',paddingLeft:15}}>
                    <Text style={[styles.sheading,{textAlign:'left'}]}>IMPORT WITH PRIVATE KEY</Text>
                    <Text style={[styles1.text,{width:200}]}>Use to import your external accounts using private key.</Text>
            </View>
            </View>
            </TouchableOpacity>
    </View>
    <View >
            <TouchableOpacity onPress={()=>{navigation.navigate('WatchMode')}} style={{backgroundColor:colors.vbg,width:'90%',height:90,borderRadius:10,alignItems: 'flex-start',alignSelf: 'center',borderLeftWidth:4,borderTopLeftRadius:5,borderBottomLeftRadius:5,borderLeftColor:"#F7931B",paddingLeft:10,paddingVertical:10,marginVertical:5}}>
            <View style={{flexDirection:'row',justifyContent:'space-around',alignItems: 'center'}}>
            <Text style={{textAlign:'center',width:30}}><IonIcons name="md-eye-outline" size={22}  color={'#fff'}   /></Text>
            <View style={{flexDirection:'column',justifyContent:'space-around',paddingLeft:15}}>
                    <Text style={[styles.sheading,{textAlign:'left'}]}>WATCH MODE</Text>
                    <Text style={[styles1.text,{width:250}]}>You will only have access to track the account.You will not be able to take any action with it. </Text>
            </View>
            </View>
            </TouchableOpacity> 
    </View>
  

*/