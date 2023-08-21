import * as React from 'react';
import { ThemeProvider,useTheme } from '@react-navigation/native';
import { View, Text, Button, Dimensions, TouchableOpacity,ToastAndroid,Clipboard, StyleSheet,
     Image, StatusBar, FlatList, ScrollView, TextInput,ActivityIndicator, KeyboardAvoidingView, ImageBackground,} from 'react-native';
import { Switch,Divider } from 'react-native-paper';
import Share from 'react-native-share';
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
import Modal from 'react-native-modal';
import global from '../component/global';
import TouchID from 'react-native-touch-id';
var DeviceInfo = require('react-native-device-info');

var bg='#171E26'
var light='#1F2630'
const TransferScreen = ({ navigation,route }) => {
  // my_addr:addr,cur:Id,acc:AccName,img: Coin.image
  const img=route.params?.img;
  const cur=route.params?.cur;
  const acc=route.params?.acc;
  
  const {colors}=useTheme();
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const { App_Lock } = React.useContext(AuthContext);
  const [Loading, setLoading] = React.useState(true);
  const [Uid, setUid] = React.useState('');
  const [Balance, setBal] = React.useState('');
  const [Verify, setVerify] = React.useState('');
  const { signOut } = React.useContext(AuthContext);
  const [Success, setSuccess] = React.useState(false);
  const [Show_id, setShow_id] = React.useState(false);
  const [Addr, setAddr] = React.useState('');
  const [Amt, setAmt] = React.useState('');
  const [OTP, setOTP] = React.useState('');
  const [Token, setToken] = React.useState(null);
  const [Ld, setLd] = React.useState('');
  const [BTN,setBTN] = React.useState(true);
  const [Count, setCount] = React.useState(false);
  const [seconds, setSeconds] = React.useState(60); 
  const[clicked,setClicked] = React.useState(false)
  const [Pwd, setPwd] = React.useState('');
  const [isModalVisible, setModalVisible] = React.useState(false);
  const[txnPassword,setTxnPassword] = React.useState('')
  const onToggleSwitch = () => {
      if(isSwitchOn){
          setIsSwitchOn(false)
          App_Lock("false")
      }else if(!isSwitchOn){
          setIsSwitchOn(true)
          App_Lock("true")
      }
  };




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
    
      // setIsLoading(false);      
   async()=>{
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
     }
    

    
  }, []);
  useFocusEffect(
      React.useCallback(async() => {     


              // setIsLoading(false);
              let code;
              let uid;
              let pwd;
              let token;
              code = null;
              console.log('heyyyyyyyyyyy')
              
              try {
              uid=await AsyncStorage.getItem('user_id')
              code=await AsyncStorage.getItem('app_code');
              pwd=await AsyncStorage.getItem('myPwd')    
              token=await AsyncStorage.getItem('token')    
              console.log(code)
                setToken(token)
                setUid(uid)
                setPwd(pwd)
                setLoading(false)
                getBal(uid)
               
                
              }
              catch (e) {
                console.log(e);
              }
              // console.log('user token:', userToken);
             
              
            

          //we can add delay time here before callApi() i.e ' },1000,callApi());' //
      }, [Uid])
  );
 
const OTPCall = async() => {  
  let token=await AsyncStorage.getItem('token')
    if(Uid!=''){      
      fetch(global.BASE_URL+"css_mob/sendotp.aspx?uid="+Uid+"&type=email&otp=transfer&device="+DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel()+'&token='+token)
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

    var url =global.BASE_URL+'css_mob/transfer.aspx?fromid='+Uid+'&amt='+Amt+'&toid='+Addr+'&pwd='+Pwd+'&'+key_string+'&'+ePass+'&token='+Token+'&device='+DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel()
    console.log(url)
    fetch(url)
    .then(item=>item.json())
    .then(dta=>{
   
        console.log('resultis',dta)
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
               setClicked(false)
               navigation.goBack();
            },3000)
        }else{
            setSuccess(false)
            setLd(false)
            setClicked(false)
            ToastAndroid.show(dta.msg,ToastAndroid.SHORT)
        }
    }catch(e){
        setSuccess(false)
        setLd(false)
        setClicked(false)
        ToastAndroid.show(dta.msg,ToastAndroid.SHORT)
    }
    })
  }
  const toggleModal = () => {
    if(!isModalVisible)
    {
        setLd(false)
    }
    setModalVisible(!isModalVisible);
    
  };
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
  const getBal =(uid)=>{
    var url =global.BASE_URL+'css_mob/bal.aspx?uid='+uid+'&ttype=V'
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

  const [isModalVisibleOtp,setModalVisibleOtp] = React.useState(false)
  const toggleModalOtp = () => {
    if(!isModalVisibleOtp)
    {
        setLd(false)
    }
    setModalVisibleOtp(!isModalVisibleOtp);
    
  };

  const[emailRef,setEmailRef] = React.useState('')
   
  function getEmailApi() {      
    
      let url= global.BASE_URL+'css_mob/get_email.aspx?uid='+Addr;
      console.log(url)
              fetch(url)
                  .then(item => item.json())
                  .then(mobData => {
                      if(mobData[0].eid==='')
                      {
                          ToastAndroid.show('Invalid ID. Please retry with another ID!',ToastAndroid.LONG)
                          setShow_id(false)
                      }
                      else{
                          setEmailRef(mobData[0].eid)
                      }
                      console.log(JSON.stringify(mobData))
                    //   setLoadingRef(false)
                     
                 })                                      
              
          }
  return (

    Success?
        <View style={[styles.container,{paddingTop:20,alignItems:'center',justifyContent:'center'}]}>
            <LottieView source={require('../assets/success.json')} style={{width:350,height:350,alignSelf:'center'}} autoPlay loop={false} />
        </View>

    :
    <ImageBackground source={require('../assets/Aeon/bg.png')}
    resizeMode="stretch"
    style={{flex:1}}
    >
    
    <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
    <View style={[styles.container]}>
          {/* Back Button module start */}

          <View style={{flexDirection:'row',justifyContent:'space-between',
          paddingVertical:20,alignItems: 'center',}}> 
        
            <TouchableOpacity onPress={()=>navigation.goBack()} style={{padding:10,marginTop:15,
              alignSelf: 'center',justifyContent:'center',marginLeft:10}}>
                <Text style={{textAlign:'right',}}><IonIcons name="md-arrow-back" size={25}  
                color={colors.appGray}   /></Text>
            </TouchableOpacity>
        <View style={{flexDirection:'row',justifyContent:'space-between',width:'80%',paddingLeft:20}}>            
                    <Text style={[styles1.heading,{color:colors.appGray}]}>Transfer Asset</Text>                            
        </View>
      
    </View>
          {/* Back Button module end */}


          {/* Settings Module start */}
          {Loading?
     <View style={{flexDirection:'column',justifyContent: 'center',height:'100%',}} >
      <LottieView source={require('../assets/loading.json')} style={{width:300,height:300,alignSelf:'center'}} autoPlay loop /></View>
      :
      <View style={{marginBottom:'30%',alignSelf:'center',width:'100%',alignItems: 'center'}}> 
  
  
  <Modal onBackButtonPress={toggleModalOtp} onBackdropPress={toggleModalOtp} useNativeDriver={true}
            animationIn={'slideInUp'} animationOut={'slideOutDown'}
     isVisible={isModalVisibleOtp}  style={{alignSelf:'center'}}
   
    >
          <ImageBackground 
          source={require('../assets/Aeon/otpbg.png')}
          resizeMode="stretch"
          style={{width:'100%',borderRadius:10,paddingVertical:20}}>
         
         {/* <View 
           style={{width:'100%',paddingTop:30,paddingBottom:100,height:500}}
         
       > */}
        <Text style={{fontFamily:global.appFontB,textTransform:'uppercase',
        color:colors.appBlack,fontSize:16,alignSelf:'center',marginBottom:20}}>OTP 
        <Text style={{color:colors.appBlue,fontFamily:global.appFontB,}}> Verification</Text></Text>

         <View style={{flexDirection:'row',justifyContent:'space-between',
         paddingHorizontal:10,borderBottomWidth:1,width:'96%',alignSelf:'center',alignItems:'center',marginLeft:10,
         borderColor:colors.appDarkBlue,marginTop:10,}}>
            
   <View style={{width:'60%',flexDirection:'row',
   justifyContent:'space-between',alignSelf:'center'
  ,height:50,marginTop:10}} >
                       <Image source={require('../assets/Aeon/otpverify.png')}
                          style={{width:20,height:15,alignSelf:'center'}} resizeMode="stretch"
                       />
                      <TextInput
                          placeholder="Verification Code"
                        //   style={[styles1.textInput,{backgroundColor:'white',elevation:10,borderRadius:50, shadowColor: 'white',paddingVertical:10
                        // }]}
                        style={styles1.textInput2}
                           color={colors.selected}
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
                       style={{alignSelf: 'center',marginLeft:10,width:'36%'}} >
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
                  borderBottomWidth:1,
                  borderColor:colors.appDarkBlue,}}>
                   <Image source={require('../assets/Aeon/otptxn.png')}
                          style={{width:20,height:20,marginLeft:2,alignSelf:'center'}} resizeMode="stretch"
                       />
                 <TextInput
                         placeholder="Enter Transaction Password"
                         keyboardType='default'                        
                          secureTextEntry={true}                    
                         style={styles1.textInput2}
                         autoCapitalize="none"
                         onChangeText={(val) => setTxnPassword(val)}                        
                         width={'90%'}
                          placeholderTextColor='#fff'
                          selectionColor='#fff'
                          color='#fff'
                         
                     />
                 </View>
   <TouchableOpacity  onPress={()=>{setClicked(true),txnPasswordSubmit()}} 
   style={clicked?{display:'none',marginTop:50}:{display:'flex',marginTop:50}}>
                     <ImageBackground source={require('../assets/Aeon/otpbtn.png')}
                     resizeMode="stretch"
           style={{width:210,borderRadius:10,paddingHorizontal:25,paddingVertical:10,
           alignSelf:'center',alignItems: 'center',paddingLeft:5}}
       >
         
           <Text style={{color:'white',textTransform:'uppercase',fontSize:18,fontFamily:global.appFontM}}>Transfer</Text>
       </ImageBackground>
        </TouchableOpacity>
         
         {/* </View>  */}
      </ImageBackground>
     
            </Modal>
       
  
  
  
  
  <View style={styles1.action} >
               <Text style={{color:colors.appBlue,marginBottom:5}}>Transfer Amount</Text>     
                    <TextInput
                        placeholder="Enter Amount To Transfer"

                         keyboardType='numeric'
                        maxLength={4}
                        style={[styles1.textInput]}
                        value={Amt}
                        autoCapitalize="none"
                        onChangeText={(val) => {
                          parseFloat(val)>parseFloat(Balance)?
                          ToastAndroid.showWithGravityAndOffset("Can't enter amount greater than Balance available!",ToastAndroid.SHORT,ToastAndroid.TOP,10,20)
                          :
                          setAmt(val.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''))
                        }}
                        width={'100%'}                                                        
                        borderRadius={5}
                        placeholderTextColor='#808080'                            
                        selectionColor='#000'
                        color='#000'
                        
                    />
                     <Text style={{color:colors.appBlue,marginVertical:5,marginTop:10}}>User ID</Text>     
                    <TextInput
                        placeholder="Enter Userid"
                        keyboardType='default'                        
                        style={[styles1.textInput]}
                        autoCapitalize="none"
                        onChangeText={(val) => {setShow_id(false),setAddr(val),setEmailRef('')}}
                        borderRadius={5}
                        // marginTop={15}
                        width={'100%'}
                        placeholderTextColor='#808080'
                        selectionColor='#000'
                        color='#000'
                        
                    />                       
                    
                </View> 
                {
                   Addr.length>1?
                   !Show_id?
                    <TouchableOpacity onPress={()=>{getEmailApi(),setShow_id(true)}}>
                        <View style={{paddingVertical:8,paddingHorizontal:20,backgroundColor:colors.appBlue,
                            borderRadius:5,marginBottom:10}}>
                            <Text>Confirm ID</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <View>
                        <Text style={{color:colors.appBlack,textAlign: 'left'}}>Email Id is :{'\n'}<Text style={{color:colors.appBlue,lineHeight:25}}>{emailRef}</Text></Text>
                    </View>
                    :
                            null
                   }
                <View style={{flexDirection:'row',alignItems: 'center',
                marginBottom:-50,zIndex:999,elevation:3,backgroundColor:'#fff',maxWidth:250,alignSelf:'center'
                ,padding:8,borderRadius:6
                ,justifyContent: 'space-evenly',width:'100%'}}>
                  
                <Text style={{fontSize:14,fontFamily:global.appFontM,color:colors.appBlack,textAlign:'center'}}>Balance Available{'\n'}<Text style={{color:colors.appSkyblue,fontSize:20,fontFamily:global.appFontM}}>{Balance} USDT</Text></Text>
                </View> 
               <View style={{width:'100%',backgroundColor:colors.borderGray,marginTop:20,paddingVertical:30,alignItems: 'center',}}>
                <View style={{backgroundColor:'transparent',width:'90%',flexDirection:'row',marginTop:10,paddingHorizontal:10,paddingVertical:10,justifyContent: 'space-between'}}>
                <Text style={styles1.transColor}>Transaction Fees</Text>
                <Text style={styles1.transColor}>0 USDT</Text>
  </View>
                        <View style={{backgroundColor:'transparent',width:'90%',
                        flexDirection:'row',marginTop:10,paddingHorizontal:10,paddingVertical:10,justifyContent: 'space-between'}}>
                            <Text style={styles1.transColor}>Arrival quantity</Text>
                            <Text style={styles1.transColor}>{Amt!==''?parseFloat(Amt).toString():''}</Text>
                         
                </View>
                
                    </View>
                  <View style={{backgroundColor:'transparent',width:'90%',flexDirection:'column',marginTop:10,paddingHorizontal:10,paddingVertical:10,justifyContent: 'space-between'}}>
                  <Text style={[styles1.transColor,{marginBottom:10,color:'gray',fontSize:15}]}>Operation Reminder</Text>
                  <Text  style={[styles1.transColor,{lineHeight:20,color:'gray',fontSize:12}]}>If the receiving account fills in the external withdrawal address, the withdrawal fee will be charged : 2USDT</Text>
                  </View>  
             <View>
                       
                            <TouchableOpacity
                                style={styles.signIn}
                                // onPress={() => { Withdraw(),setLd(true)}}
                                onPress={() => { if(Amt!=='' && Addr!==''){setLd(true),toggleModalOtp()}
                            else{ToastAndroid.show('Please fill all fields first!',ToastAndroid.SHORT)}}}
                                activeOpacity={0.9}
                                underlayColor="#000"
                            >
                                
                                    <Text style={styles1.textSign}>Transfer Funds</Text>
                                   {Ld? <ActivityIndicator size={'small'}  color="#000" />:null}
                               
                            </TouchableOpacity>
                        </View>                            
      </View>
          }

         





      </View>
      </ScrollView>
      </ImageBackground>
  );
}



export default TransferScreen;
const styles1 = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bg,
        paddingTop: 10,
        paddingHorizontal: 10

    },
    transColor: {
        color:'#3f3f3f',fontFamily:global.appFontM,fontSize:15
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
        fontFamily:global.appFontM,
        textTransform:'uppercase',
        color:'#fff',
        textAlign:'center',
        marginTop:10
        },
     textInput: {
      paddingLeft:10,
      // borderWidth: 0.5,
      paddingVertical:15,
      // borderColor: '#808080',
      // backgroundColor:bg,
      borderBottomWidth:2,
      borderColor:'#2875CA',
      // borderRadius:5,
      marginVertical:10,
      fontSize: 16,     
      color:'#000'  
    },
     textInput2: {
      paddingLeft:10,
      paddingVertical:15,
      // backgroundColor:'red',
      // borderBottomColor:'#2875CA',
      // borderBottomWidth:1.5,
      fontSize: 15,   
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
        borderRadius: 50,
        flexDirection: 'row',

    },
    button: {
        alignItems: 'center',
        marginTop: 80,

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
        textTransform:'uppercase',
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