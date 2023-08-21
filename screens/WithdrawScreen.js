import * as React from 'react';
import { ThemeProvider,useTheme } from '@react-navigation/native';
import { View, Text,ImageBackground, Button, Dimensions,RefreshControl, TouchableOpacity,ToastAndroid,Clipboard, StyleSheet,
    KeyboardAvoidingView, Image, StatusBar, FlatList, ScrollView, TextInput,ActivityIndicator} from 'react-native';
import { Switch,Divider } from 'react-native-paper';
import Share from 'react-native-share';
import IonIcons from 'react-native-vector-icons/Ionicons'
import LottieView from 'lottie-react-native';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../component/context';

import { RNCamera } from 'react-native-camera';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../component/theme';
import styles from '../component/styles';

import global from '../component/global';
import Modal from 'react-native-modal';
// import TouchID from 'react-native-touch-id';
var DeviceInfo = require('react-native-device-info');
var bg='#171E26'
var light='#1F2630'
const WithdrawScreen = ({ navigation,route }) => {
  // my_addr:addr,cur:Id,acc:AccName,img: Coin.image
  const img=route.params?.img;
  const cur=route.params?.cur;
  const acc=route.params?.acc;
  const {colors}=useTheme();
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const { App_Lock } = React.useContext(AuthContext);
  const [OTP, setOTP] = React.useState('');
  const { signOut } = React.useContext(AuthContext);
  const [Loading, setLoading] = React.useState(true);
  const [Token,setToken] = React.useState(null);
  const [Uid, setUid] = React.useState('');
  const [Data, setData] = React.useState([
   
]);
  const [Success, setSuccess] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [BTN,setBTN] = React.useState(true);
  const [Addr, setAddr] = React.useState(global.addr);
  const [Amt, setAmt] = React.useState('');
  const [Ld, setLd] = React.useState('');
  const [Pwd, setPwd] = React.useState('');
  const [Whis, setWhis] = React.useState(false);
  const [Balance, setBal] = React.useState('');
  const [isModalVisible, setModalVisible] = React.useState(false);
    const[txnPassword,setTxnPassword] = React.useState('')
  

  useFocusEffect(
      React.useCallback(() => {                
          if(global.addr.length<25){
            navigation.navigate('KYC', {from: 'fund'})
          }
          setTimeout(async()=>{
              // setIsLoading(false);
              let code;
              let uid;
              let pwd;
              let token;
              code = null;
              try {
              uid=await AsyncStorage.getItem('user_id')
              code=await AsyncStorage.getItem('app_code');
              pwd=await AsyncStorage.getItem('myPwd')  
              token = await AsyncStorage.getItem("token");  
              console.log(code)
              setToken(token)
                setUid(uid)
                setPwd(pwd)
                setLoading(false)
                
                history(uid)    
                getBal(uid)    
                
              }
              catch (e) {
                console.log(e);
              }
              // console.log('user token:', userToken);
             
              
            
            })
          //we can add delay time here before callApi() i.e ' },1000,callApi());' //
      },[])
  );

  const OTPCall = async() => {  
    let token=await AsyncStorage.getItem('token')
    if(Uid!=''){
      
      fetch(global.BASE_URL+"css_mob/sendotp.aspx?uid="+Uid+"&type=email&otp=withdrawal&device="+DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel()+'&token='+token )
      .then(item => item.json())
      .then(SData => {
        
        console.log(SData)
        if(SData.success==="true"){
          setOTP(SData.otp) 
          console.log(SData.otp)        
          ToastAndroid.show("Please Check Your Email Inbox/Spam Folder For Verification Code.",ToastAndroid.LONG)       
        }
        if(SData.success === 'false' && SData.msg === 'wrong_pwd'){
          signOut()
        }
        
      })
    } else{
      ToastAndroid.show("Enter a valid email first",ToastAndroid.SHORT)
    }    
              
  };

  


  
  const getBal =(uid)=>{
    var url =global.BASE_URL+'css_mob/bal.aspx?uid='+uid+'&ttype=E'
    console.log(url)
    fetch(url)
    .then(item=>item.json())
    .then(dta=>{
        if(dta.success==='true'){
            console.log('balanceaaya',dta.msg)
            setBal(dta.msg)
           
        }else{
            ToastAndroid.show(dta.result.status,ToastAndroid.SHORT)
        }
    })
  }
  const[clicked,setClicked] = React.useState(false)
  const txnPasswordSubmit=()=>{
    if(parseFloat(Verify)!==parseFloat(OTP)){
        ToastAndroid.show("Invalid Verification code ", ToastAndroid.SHORT);
        setClicked(false)
      }else{
      console.log('transaction password: '+global.txnPassword)
      if(global.txnPassword===txnPassword)
      {
          setBTN(false)
          setTimeout(()=>{
                setBTN(true)
          },3000)
          setModalVisible(false)
            Withdraw()
      }
      else{
        setModalVisible(false)
        setClicked(false)
        setBTN(true)
        ToastAndroid.show('Transaction password is invalid...Try again with correct one..',ToastAndroid.SHORT)
      }
      setLd(false)
    }
  }

  const Withdraw =()=>{
  
    function objToQueryString(obj) {
      const keyValuePairs = [];
      for (const key in obj){
        keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
      }
      return keyValuePairs.join('&');
    }         
    const key_string = objToQueryString({
       key:Uid+Pwd+txnPassword      
  });  
    
    const ePass = objToQueryString({
       epass:txnPassword      
  });  

          var url =global.BASE_URL+'css_mob/ww.aspx?uid='+Uid+'&amt='+Amt+'&addr='+Addr+'&pwd='+Pwd+'&otp='+Verify+'&api_key='+global.api_key+'&api_secret='+global.api_secret +'&'+key_string+'&'+ePass+'&token='+Token+'&device='+DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel()
          console.log(url)
    fetch(url)
    .then(item=>item.json())
    .then(dta=>{
       try{
        if(dta.success==='false' && dta.msg==='wrong_pwd'){
            signOut()
            ToastAndroid.show("Please Login once again",ToastAndroid.SHORT)
          }
           if(dta.success==='true'){
               setSuccess(true)
               setLd(false)
               setTimeout(()=>{
                   setSuccess(false)
                   navigation.goBack();
                   setClicked(false)
                },3000)
            }else{
                setLd(false)
                setClicked(false)
                ToastAndroid.show(dta.result.status,ToastAndroid.SHORT)
            }
        }catch(e){
            setLd(false)
            setClicked(false)
            ToastAndroid.show(dta.result.status,ToastAndroid.SHORT)
        }
        })
        .catch (error => {
          setClicked(false)
      ToastAndroid.show("Can't Withdraw money at that moment ..Please try later",ToastAndroid.SHORT)
    })  
}
  const [isBio,setIsBio]= React.useState(false);
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
    const biometricCheck=()=>{
        TouchID.isSupported().then((biometryType)=>{
           if (biometryType === 'FaceID') {
             console.log('FaceID is supported.');
         } else {
             console.log('TouchID is supported.');
             if(isBio){
               null;
             }else{
               
               TouchID.authenticate('',optionalConfigObject).then((success)=>{
                 console.log('success',success)
                 setIsBio(false)
               }).catch((err)=>{
                //  BackHandler.exitApp();
                navigation.goBack()
                 
               })
             }
         }
         }).catch((ex)=>{
           console.log('error in touch id: '+ex)
           ToastAndroid.show('Please activate Fingerprint Lock for your phone!',ToastAndroid.LONG)
         })
        return(
         
          <View style={{backgroundColor: '#000',flex:1}}>
            
          </View>
        );
       
      }
  React.useEffect(() => {
    console.log(Uid)
    setTimeout(async () => {
      // setIsLoading(false);      
   
      let app_code;
      app_code = null;
      
     
      
      try {
       
        app_code = await AsyncStorage.getItem('app_code')       
       
        if(app_code==="true"){
          console.log("app lock active")
          biometricCheck()
        }else{
          console.log("app lock inactive")
        }
      }
      catch (e) {
        console.log(e);
      }
     
    }, 1000);

    
  }, []);
  const toggleModal = () => {
    if(!isModalVisible)
    {
        setLd(false)
    }
    setModalVisible(!isModalVisible);
    
  };
  const [isModalVisibleOtp,setModalVisibleOtp] = React.useState(false)
  const toggleModalOtp = () => {
    if(!isModalVisibleOtp)
    {
        setLd(false)
    }
    setModalVisibleOtp(!isModalVisibleOtp);
    
  };
  const onRefresh = React.useCallback(async () => {
 
    setRefreshing(true);
    history(Uid)


})
const [seconds, setSeconds] = React.useState(60);
const [Count, setCount] = React.useState(false);
const history=(uid)=>{
    let url= global.BASE_URL+'css_mob/history.aspx?uid='+uid+'&ttype=E&dsc1=Withdrawal';    
    console.log(url)
    fetch(url)
    .then(item=>item.json())
    .then(dta=>{
        setData(dta)
    }).catch(e=>{
      console.log('error here ',e);
    })
}
const[fee,setFee] = React.useState('')

    React.useEffect(() => {
      console.log(Amt);
      if(parseFloat(Amt)*0.01 > 2)
      {

        let a=parseFloat(Amt)*0.01
        setFee(a.toString())
      }
      else{
        setFee('2')
      }
       
    }, [Amt])
    React.useEffect(() => {
        if(Count){
          
          if (seconds > 0) {
            setTimeout(() => setSeconds(seconds - 1), 1000);
          } else {
            setSeconds(60);
            setCount(false)
          }
        }
      });
      const [Verify, setVerify] = React.useState('');
  return (

    Success?
        <View style={[styles.container,{paddingTop:20,alignItems:'center',justifyContent:'center'}]}>
            <LottieView source={require('../assets/success.json')} style={{width:350,height:350,alignSelf:'center'}} autoPlay loop={false} />
        </View>

    :
    !Whis?
    <ImageBackground source={global.bgimg} resizeMode='stretch' style={[styles.container,]}>
          {/* Back Button module start */}
    <ScrollView>
    <Modal onBackButtonPress={toggleModalOtp} onBackdropPress={toggleModalOtp} useNativeDriver={true}
      isVisible={isModalVisibleOtp}  style={{alignSelf:'center'}} 
      animationInTiming={300} animationOutTiming={200}
     >
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <ImageBackground 
          source={require('../assets/Aeon/otpbg.png')}
          resizeMode="stretch"
          style={{width:'100%',height:'80%',borderRadius:10,justifyContent:'center'}}>
                 
         <View 
           style={{width:'100%',paddingTop:30,paddingBottom:100,height:500}}
         
       >
        {/* <Text style={{fontFamily:global.appFontB,textTransform:'uppercase',
        color:colors.appBlack,fontSize:16,alignSelf:'center',marginBottom:20}}>OTP 
        <Text style={{color:colors.appBlue,fontFamily:global.appFontB,}}> Verification</Text></Text> */}

         <View style={{flexDirection:'row',justifyContent:'space-between',
         paddingHorizontal:10,borderBottomWidth:1,width:'94%',alignSelf:'center',
         borderColor:colors.appDarkBlue,marginTop:80,}}>
            
   <View style={{width:'60%',flexDirection:'row',
   justifyContent:'space-between'
  ,height:50,marginTop:10}} >
                       <Image source={require('../assets/Aeon/otpverify.png')}
                          style={{width:20,height:15,alignSelf:'center'}} resizeMode="stretch"
                       />
                       <TextInput
                           placeholder="Verification Code"
                           style={[styles1.textInput2]}
                           color={colors.appGray}
                           keyboardType={'number-pad'}
                           autoCapitalize="none"
                           onChangeText={(val) => setVerify(val)}
                           width={200}
                           selectionColor={'#fff'}
                           maxLength={6}
                           placeholderTextColor={'#fff'}
                           
                       />
 
 
   </View>
                       <TouchableOpacity 
                       onPress={Count?null:() =>{setCount(true),OTPCall()}} 
                       style={{alignSelf: 'center',marginLeft:10,width:'40%'}} >
                               <View style={[{alignItems:'center',flexDirection: 'row',
                               justifyContent: 'center',width:'100%',paddingHorizontal:5,borderRadius:25,
                               paddingVertical:5,backgroundColor:'#fff'}]}>                               
                                 {Count?null:  <Text style={[styles.text,{fontFamily:global.appFontM,}]}>SEND CODE to EMAIL</Text>}
                                 {Count? <Text style={[styles.text,{fontFamily:global.appFontM,}]}>RESEND CODE IN: <Text style={{fontSize:18}}> {seconds}</Text>  </Text>:null}
                                   
                               </View>
                         </TouchableOpacity>
   </View>
   <View style={{width:'96%',alignItems: 'center',alignSelf: 'center',backgroundColor:'transparent',
                  marginTop:10,paddingHorizontal:10,borderRadius:10,flexDirection:'row',
                  paddingHorizontal:10,borderBottomWidth:1,
                  borderColor:colors.appDarkBlue,}}>
                   <Image source={require('../assets/Aeon/otptxn.png')}
                          style={{width:20,height:20,marginLeft:2,alignSelf:'center'}} resizeMode="stretch"
                       />
                  {/* <Text style={{fontFamily:global.appFontM,color:colors.appGray,fontSize:14}}>Transaction Password</Text> */}
                  <TextInput
                          placeholder="Enter Transaction Password"
                          keyboardType='default'    
                          secureTextEntry={true}                    
                          style={styles1.textInput2}
                          autoCapitalize="none"
                          onChangeText={(val) => setTxnPassword(val)}                        
                          width={'80%'}
                          placeholderTextColor='#fff'
                          selectionColor='#fff'
                          color='#fff'
                          
                      />
                  </View>
   <TouchableOpacity  onPress={()=>{setClicked(true),txnPasswordSubmit()}} 
   style={clicked?{display:'none',marginTop:50}:{display:'flex',marginTop:50}}>
                     <ImageBackground source={require('../assets/Aeon/otpbtn.png')}
                     resizeMode="stretch"
           style={{width:200,borderRadius:10,paddingHorizontal:25,paddingVertical:10,
           alignSelf:'center',alignItems: 'center',paddingLeft:5,height:40}}
       >
         
           {/* <Text style={{color:'white',textTransform:'uppercase',fontSize:18,fontFamily:global.appFontM}}>withdraw</Text> */}
       </ImageBackground>
                     </TouchableOpacity>
          
          </View> 
      </ImageBackground>
      </KeyboardAvoidingView>
             </Modal>
          
          <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:15,paddingTop:30,alignItems: 'center',}}> 
               
          <View style={{flexDirection:'column',alignItems: 'center',justifyContent:'center',paddingTop:5}}>
              <TouchableOpacity onPress={()=>navigation.goBack()} style={{padding:10}}>
                  <Text style={{textAlign:'right',}}><IonIcons name="md-arrow-back" size={25}  color={colors.selected}   /></Text>
              </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-between',paddingLeft:20}}>            
                      <Text style={[styles1.heading,{color:colors.profitcolor2}]}>WITHDRAW</Text>                            
          </View>
          <View style={{flexDirection:'column',alignItems: 'center',justifyContent:'center',paddingTop:5}}>
              <TouchableOpacity onPress={()=> {setWhis(true)}} style={{padding:10,backgroundColor:colors.profitcolor2,elevation:5
            ,borderRadius:5}}>
              <Text style={[styles1.heading,{color:colors.selected,fontSize:12,fontFamily:global.appFontM}]}>
                WITHDRAWAL {'\n'} HISTORY</Text>     
              </TouchableOpacity>
          </View>
      </View>
     
          {/* Back Button module end */}


          {/* Settings Module start */}
          {Loading?
     <View style={{flexDirection:'column',justifyContent: 'center',height:'100%'}} >
      <LottieView source={require('../assets/loading.json')}
       style={{width:300,height:300,alignSelf:'center'}} autoPlay loop /></View>
      :
      <View style={{
      top:40,width:'100%',alignSelf:'center',paddingBottom:20,alignItems: 'center'}}> 
             <View style={styles1.action} >
                    <Text style={{color:colors.selected,fontFamily:global.appFontM}}>Withdrawal Amount</Text>
                    {/* <ImageBackground source={require('../assets/botz/input-password-bg.png')} 
                    resizeMode='stretch'  style={[styles1.textInput,{width:'100%',height:60}]}> */}
                    <TextInput
                        placeholder="Enter withdrawal amount (in USD)"
                        keyboardType='numeric'
                        style={styles1.txtinput}
                        // maxLength={4}
                        value={Amt}
                        onChangeText={(val) => {

                          parseFloat(val)>parseFloat(Balance)?
                          ToastAndroid.show("Can't enter amount greater than Balance available!",ToastAndroid.SHORT)
                        :
                        setAmt(val.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''))
                        console.log(val.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''))
                      }
                      }
                        
                       
                       
                        autoCapitalize="none"
                        
                        width={'100%'}                                                        
                        borderRadius={5}
                        placeholderTextColor='#8E99BA'                            
                        selectionColor={colors.selected}
                        color={'#8E99BA'}
                        
                    /> 
                    {/* </ImageBackground>           */}
                    <Text style={{color:colors.selected,fontFamily:global.appFontM,marginTop:20}}>USDT Address</Text>
                    {/* <ImageBackground source={require('../assets/botz/input-password-bg.png')} resizeMode='stretch'  style={[styles1.textInput,{width:'100%',height:60}]}> */}
                    <TextInput
                        placeholder="Update TRC20 USDT address in KYC if not available "
                        keyboardType='default' 
                        style={styles1.txtinput}                       
                        autoCapitalize="none"
                        onChangeText={(val) => setAddr(val)}
                        value={global.addr}
                        width={'100%'}
                        editable={false}
                        placeholderTextColor='#8E99BA'
                        selectionColor={colors.selected}
                        color={'#8E99BA'}
                        
                    />
                     {/* </ImageBackground>                       */}
                    
                </View> 
                <View style={{flexDirection:'row',alignItems: 'center',
                marginBottom:-50,zIndex:999,elevation:3,backgroundColor:colors.profitcolor2,maxWidth:250,alignSelf:'center'
                ,padding:8,borderRadius:6
                ,justifyContent: 'space-evenly',width:'100%'}}>
                  
                <Text style={{fontSize:14,fontFamily:global.appFontM,color:colors.appBlack,textAlign:'center'}}>Balance Available{'\n'}<Text style={{color:colors.appBlack,fontSize:20,fontFamily:global.appFontM}}>{Balance} USDT</Text></Text>
                </View> 
               <View style={{width:'100%',backgroundColor:colors.appBlack,marginTop:20,paddingVertical:30,alignItems: 'center',}}>
                <View style={{backgroundColor:'transparent',width:'90%',flexDirection:'row',marginTop:10,paddingHorizontal:10,paddingVertical:10,justifyContent: 'space-between'}}>
                <Text style={[styles1.transColor,{color:'#8E99BA'}]}>Transaction Fees</Text>
                <Text style={styles1.transColor}>{fee} USDT</Text>
  </View>
                        <View style={{backgroundColor:'transparent',width:'90%',
                        flexDirection:'row',marginTop:10,paddingHorizontal:10,paddingVertical:10,justifyContent: 'space-between'}}>
                            <Text style={[styles1.transColor,{color:'#8E99BA'}]}>Arrival quantity</Text>
                            <Text style={styles1.transColor}>{Amt!==''?parseFloat(Amt)- parseFloat(fee):''}</Text>
                         
                </View>
                
                    </View>

                 
                {/* <View style={{backgroundColor:'black',width:'90%',flexDirection:'column',marginTop:10,paddingHorizontal:10,paddingVertical:10,justifyContent: 'space-between'}}>
                       <Text style={[styles1.transColor,{fontFamily:global.appFontM,marginBottom:10}]}>Operation Reminder</Text>
                       <Text style={styles1.transColor}>Do not transfer USDT assets to non-USDT addresses, otherwise they cannot be retrieved, The nighttime (0:00-8:00) withdrawal system will improve the risk control level of assets, and withdrawals that have not been automatically reviewed will be processed before 10:00 (Singapore time).</Text>
                       </View>
               */}
                <View style={styles1.button}>
                       {BTN?
                            <TouchableOpacity
                                // style={styles.signIn}
                                onPress={() => {
                                  toggleModalOtp()
                                if(Amt!=='' && Addr!=='')
                                {
                                  setLd(true)
                                  toggleModalOtp()
                                }//toggleModal()
                            else{ToastAndroid.show('Please fill all fields first!',ToastAndroid.SHORT)}}}
                                activeOpacity={0.9}
                                underlayColor="#000"
                            >
                                <LinearGradient
                                   colors={[colors.profitcolor2,colors.profitcolor2]}
                                    style={styles.signIn}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 0 }}
                                >
                                    <Text style={[styles1.textSign,{color:'#fff'}]}>WITHDRAW</Text>                                    
                                </LinearGradient>
                            </TouchableOpacity>

:null}
                        </View>
                  
                        <View style={{width:'100%',marginTop:30}}>
                    <Text style={{color:'#c5c5c5c5',textAlign:'center'}}> <Text style={{color:'#41c81d'}}>Note:</Text> Address must be of USDT.TRC20 BlockChain</Text>
                    </View>        
      </View>
          }

         



          </ScrollView>

      </ImageBackground>
    
    :
    
    <ImageBackground source={global.bgimg} resizeMode='stretch' style={[styles.container,{}]}>
    {/* Back Button module start */}

    <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:15,paddingTop:35,marginBottom:20,}}> 
     
      <View style={{alignItems: 'center',justifyContent:'center',width:'20%'}}>
          <TouchableOpacity onPress={()=>{setWhis(false)}} style={{padding:10}}>
              <Text style={{textAlign:'right'}}><IonIcons name="md-arrow-back" size={22}  color={colors.appGray}   /></Text>
          </TouchableOpacity>
      </View>
      <View style={{flexDirection:'row',justifyContent:'space-between',width:'80%',paddingLeft:20}}>            
                  <Text style={[styles.heading,{color:colors.appGray,alignSelf:'center'}]}>History</Text>                            
      </View>
      </View>
    {/* Back Button module end */}


    {/* Settings Module start */}
    {Loading?
<View style={{flexDirection:'column',justifyContent: 'center',height:'100%'}} ><LottieView source={require('../assets/loading.json')} style={{width:300,height:300,alignSelf:'center'}} autoPlay loop /></View>
:
<View style={{marginBottom:'30%',alignSelf:'center',width:'100%',alignItems: 'center',}}> 
<FlatList
        horizontal={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{width:'100%'}}
        // contentContainerStyle={{width:'100%'}}
                    data={Data}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                      <View style={{width:'96%',alignSelf: 'center',marginBottom:10,backgroundColor:'#fff',borderRadius:10,
                        borderWidth:1.5,borderColor:colors.appLightgray
                      }}>
                        <View style={{flexDirection:'column',margin:0,}}>
                            <View style={{flexDirection:'row',justifyContent: 'space-between',backgroundColor:colors.appBlue,borderTopLeftRadius:9,
                          borderTopRightRadius:9,paddingHorizontal:10,paddingVertical:5
                          }}>
                                <Text style={{color:colors.selected,fontSize:14,fontFamily:global.appFontM,width:235}}>{item.dsc}</Text>
                                <Text style={{color:colors.selected,fontSize:11,textAlignVertical:'bottom'}}>{item.date}</Text>
                            </View>
                            <View style={{justifyContent: 'space-between',flexDirection:'row',alignItems:'center',height:25,marginTop:5,margin:5
                            }}>
                              <Text style={{color:colors.appGray,fontSize:12}}>  Amount(in USD)</Text>   
                                <Text style={{color:colors.appBlue,fontSize:14,fontFamily:global.appFontM}}>{item.amount}  </Text>  
                            </View>
                            <View style={{justifyContent: 'space-between',flexDirection:'row',alignItems:'center',height:25,marginTop:5,margin:5
                            }}>
                              <Text style={{color:colors.appGray,fontSize:12}}>  Type</Text>   
                                <Text style={{color:colors.appBlue,fontSize:14,fontFamily:global.appFontM}}>{item.type}  </Text>   
                                      
                                
                            </View>
                            {/* <View style={{flexDirection: 'row', alignItems: 'center',backgroundColor:colors.appGray,marginTop:5}}>
  <View style={{flex: 1, height: 1, backgroundColor: colors.appGray}} />
  
  <View style={{flex: 1, height: 1, backgroundColor: colors.appGray}} />
</View> */}
                        </View>
                    </View>
                    )}
                    />
</View>
    }

   





</ImageBackground>

  
  );
}



export default WithdrawScreen;
const styles1 = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bg,
        paddingTop: 10,
        paddingHorizontal: 10

    },
    txtinput:{
      marginVertical:10,
      borderBottomWidth:1,
      borderColor:'#fff'
      
    },
    textInput2:{
      paddingLeft:10,
      paddingVertical:15,
      fontSize: 15,    
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
        paddingVertical:15,
        paddingHorizontal:5,
        marginHorizontal:10,
        borderRadius:10,              
        width:'90%'
        
    },
    heading:{
        fontSize:25,
        // fontFamily:global.appFontM,
        fontFamily:global.appFontM,
        color:'#3f3f3f',
        textAlign:'center',
        // marginTop:10
        },
     textInput: {
        paddingLeft:25,
        // borderWidth: 0.5,
        //paddingVertical:15,
        // borderColor: '#808080',
        //backgroundColor:bg,
        borderRadius:5,
        marginVertical:20,
        paddingTop:5,
        fontSize: 16,                
        // fontWeight: 'bold'
    },
    text_header: {
        color: "#fff",
        fontWeight: 'bold',
        fontSize: 30
    },
    transColor: {
        color:'#fff'
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
        borderRadius: 50,
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
        fontFamily:global.appFontB,
        // fontWeight: 'bold',
        color: '#fff'
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


