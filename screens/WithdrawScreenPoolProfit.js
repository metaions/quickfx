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
const WithdrawScreenPoolProfit = ({ navigation,route }) => {
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
  const [Data, setData] = React.useState('');
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
    var url =global.BASE_URL+'css_mob/bal.aspx?uid='+uid+'&ttype=r'
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

          var url =global.BASE_URL+'css_mob/ww_profit.aspx?uid='+Uid+'&amt='+Amt+'&addr='+Addr+'&pwd='+Pwd+'&otp='+Verify+'&api_key='+global.api_key+'&api_secret='+global.api_secret +'&'+key_string+'&'+ePass+'&token='+Token+'&device='+DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel()
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
    let url= global.BASE_URL+'css_mob/history.aspx?uid='+uid+'&ttype=r&dsc1=Withdrawal';    
    console.log(url)
    fetch(url)
    .then(item=>item.json())
    .then(dta=>{
        setData(dta)
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
            animationIn={'slideInUp'} animationOut={'slideOutDown'}
     isVisible={isModalVisibleOtp}  style={{alignSelf:'center'}} animationInTiming={300} animationOutTiming={200}
    >
         <View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
         
        <ImageBackground source={require('../assets/images/popup.png')} resizeMode='stretch'
          style={{width:'100%',paddingTop:0,paddingBottom:0,borderRadius:0,height:350,flexDirection:'column',alignItems:'center'}}
          // start={{ x: 0, y: 1 }}
          // end={{ x: 1, y: 1 }}
      >
       
       <View style={{marginTop:0,alignItems:'flex-start'}}>
       <Text style={{fontWeight:'bold',color:colors.selected,fontSize:20,alignSelf:'center',marginTop:30}}>Email OTP Verification</Text>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:10,marginTop:10}}>
           
                      
                      <TextInput
                          placeholder="Verification Code"
                        //   style={[styles1.textInput,{backgroundColor:'white',elevation:10,borderRadius:50, shadowColor: 'white',paddingVertical:10
                        // }]}
                        style={[styles1.textInput,{backgroundColor:'#fff'}]}
                         
                          keyboardType={'number-pad'}
                          autoCapitalize="none"
                          onChangeText={(val) => setVerify(val)}
                          width={180}
                         
                          maxLength={6}                       
                          placeholderTextColor='#c0c0c0'
                         selectionColor='#000'
                         color='#000'
                          
                      />


  {/* </View> */}
                      <TouchableOpacity onPress={Count?null:() =>{setCount(true),OTPCall()}} style={{alignSelf: 'center',marginLeft:10}} >
                              <View style={[{alignItems:'center',flexDirection: 'row',justifyContent: 'center',
                              height:40,paddingHorizontal:5,borderRadius:5,paddingVertical:5,width:130,backgroundColor:"#065C91"}]}>                               
                                {Count?null:  <Text style={[styles.text,{textAlign:'center',color:'#fff',fontWeight:'bold'}]}>SEND CODE TO EMAIL</Text>}
                                {Count? <Text style={[styles.text,{textAlign:'center',fontSize:12,color:'#fff'}]}>RESEND CODE IN:<Text style={{fontSize:14}}> {seconds}</Text>  </Text>:null}
                                  
                              </View>
                        </TouchableOpacity>
  </View>
  <View style={{width:300,alignItems: 'flex-start',alignSelf: 'center',backgroundColor:'transparent',
                 marginTop:0,borderRadius:0,marginLeft:10}}>
                 
                 <TextInput
                         placeholder="Enter Transaction Password"
                         keyboardType='default'                        
                         style={[styles1.textInput,{backgroundColor:'#fff'}]}
                         autoCapitalize="none"
                         onChangeText={(val) => setTxnPassword(val)}                        
                         width={'80%'}
                         placeholderTextColor='#c0c0c0'
                         selectionColor='#000'
                         color='#000'
                         
                     />
                 </View>
                 </View>
        <TouchableOpacity  disabled={clicked?true:false} onPress={()=>{setClicked(true),txnPasswordSubmit()}} style={{marginTop:40,width:'50%',flexDirection:'row',justifyContent: 'center',alignItems: 'center',alignSelf: 'center',}}>
                    <ImageBackground
           source={require('../assets/images/withdraw_btn.png')} resizeMode='stretch'
          style={{width:'100%',height:50,alignItems: 'center',justifyContent: 'center'}}
        
      >
        
          <Text style={{color:'#fff',fontSize:16,fontFamily:global.bold}}>Withdraw</Text>
          {clicked? <ActivityIndicator size={'small'}  color="#000" />:null}
      </ImageBackground>
        </TouchableOpacity>
         
         </ImageBackground> 
     
     </View>
            </Modal>
          
          <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:15,paddingTop:30,alignItems: 'center',}}> 
               
          <View style={{flexDirection:'column',alignItems: 'center',justifyContent:'center',paddingTop:5}}>
              <TouchableOpacity onPress={()=>navigation.goBack()} style={{padding:10}}>
                  <Text style={{textAlign:'right',}}><IonIcons name="md-arrow-back" size={25}  color={colors.selected}   /></Text>
              </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-between',paddingLeft:20}}>            
                      <Text style={[styles1.heading,{}]}>Withdraw</Text>                            
          </View>
          <View style={{flexDirection:'column',alignItems: 'center',justifyContent:'center',paddingTop:5}}>
              <TouchableOpacity onPress={()=> {setWhis(true)}} style={{padding:10}}>
              <Text style={[styles1.heading,{color:colors.selected,fontSize:12}]}>withdrawal {'\n'} History</Text>     
              </TouchableOpacity>
          </View>
      </View>
     
          {/* Back Button module end */}


          {/* Settings Module start */}
          {Loading?
     <View style={{flexDirection:'column',justifyContent: 'center',height:'100%'}} ><LottieView source={require('../assets/loading.json')} style={{width:300,height:300,alignSelf:'center'}} autoPlay loop /></View>
      :
      <View style={{marginBottom:'30%',position:'relative',top:50,width:'100%',alignSelf:'center',borderRadius:0,elevation:6,paddingBottom:20,alignItems: 'center'}}> 
             <View style={styles1.action} >
                    <Text style={{color:colors.selected}}>Withdrawal Amount</Text>
                    <ImageBackground source={require('../assets/botz/input-password-bg.png')} resizeMode='stretch'  style={[styles1.textInput,{width:'100%',height:60}]}>
                    <TextInput
                        placeholder="Enter withdrawal amount (in USD)"
                        keyboardType='numeric'
                        maxLength={4}
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
                        placeholderTextColor='#808080'                            
                        selectionColor={colors.selected}
                        color={colors.selected}
                        
                    /> 
                    </ImageBackground>          
                    <Text style={{color:colors.binanceylw2}}>USDT Address</Text>
                    <ImageBackground source={require('../assets/botz/input-password-bg.png')} resizeMode='stretch'  style={[styles1.textInput,{width:'100%',height:60}]}>
                    <TextInput
                        placeholder="Update TRC20 USDT address in KYC if not available "
                        keyboardType='default'                        
                        autoCapitalize="none"
                        onChangeText={(val) => setAddr(val)}
                        value={global.addr}
                        width={'100%'}
                        editable={false}
                        placeholderTextColor='#808080'
                        selectionColor={colors.selected}
                        color={colors.selected}
                        
                    />
                     </ImageBackground>                      
                    
                </View> 
                <View style={{width:'95%',paddingVertical:10}}>

                <ImageBackground source={require('../assets/botz/list-box-bg.png')} resizeMode="stretch" style={{flexDirection:'column',alignItems: 'center',justifyContent: 'space-evenly',width:'100%',height:100}}>
                <Text style={{fontSize:20,fontWeight:'bold',color:colors.selected}}>Balance Available  </Text>
                <Text style={{color:'#41c81d',fontSize:16}}>{Balance} USDT</Text>
                </ImageBackground> 
                  </View>
                {/* <Text style={{fontSize:14,fontWeight:'bold',color:colors.selected}}>Balance Available : <Text style={{fontSize:16,fontWeight:'bold',color:colors.binanceylw2}}>{Balance} USDT</Text></Text> */}
               <View style={{width:'100%',marginTop:20,borderBottomColor:'grey',borderBottomWidth:0.2}}>
                 
                <View style={{width:'90%',flexDirection:'row',marginTop:10,paddingHorizontal:10,paddingVertical:10,justifyContent: 'space-between'}}>
                    <Text style={styles1.transColor}>Transaction Fees</Text>
                    <Text style={styles1.transColor}>{fee} USDT</Text>
                    </View>
                    <View style={{width:'90%',
                flexDirection:'row',marginTop:10,paddingHorizontal:10,paddingVertical:10,justifyContent: 'space-between'}}>
                    <Text style={styles1.transColor}>Arrival quantity</Text>
                    <Text style={styles1.transColor}>{Amt!==''?parseFloat(Amt)- parseFloat(fee):''}</Text>
                    </View>
                 </View>
                {/* <View style={{backgroundColor:'black',width:'90%',flexDirection:'column',marginTop:10,paddingHorizontal:10,paddingVertical:10,justifyContent: 'space-between'}}>
                       <Text style={[styles1.transColor,{fontWeight:'bold',marginBottom:10}]}>Operation Reminder</Text>
                       <Text style={styles1.transColor}>Do not transfer USDT assets to non-USDT addresses, otherwise they cannot be retrieved, The nighttime (0:00-8:00) withdrawal system will improve the risk control level of assets, and withdrawals that have not been automatically reviewed will be processed before 10:00 (Singapore time).</Text>
                       </View>
               */}
                <View style={styles1.button}>
                       {BTN?
                            <TouchableOpacity
                                style={styles.signIn}
                                onPress={() => { if(Amt!=='' && Addr!==''){setLd(true),toggleModalOtp()}//toggleModal()
                            else{ToastAndroid.show('Please fill all fields first!',ToastAndroid.SHORT)}}}
                                activeOpacity={0.9}
                                underlayColor="#000"
                            >
                                <LinearGradient
                                   colors={[colors.binanceylw2,'#41c81d']}
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
              <Text style={{textAlign:'right'}}><IonIcons name="md-arrow-back" size={22}  color={colors.selected}   /></Text>
          </TouchableOpacity>
      </View>
      <View style={{flexDirection:'row',justifyContent:'space-between',width:'80%',paddingLeft:20}}>            
                  <Text style={[styles.heading,{color:colors.selected,alignSelf:'center'}]}>History</Text>                            
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
                      <ImageBackground source={require('../assets/botz/transfer/list-bg.png')} resizeMode="stretch"  style={{width:'100%',alignSelf: 'center',padding:5,marginBottom:10}}>
                        <View style={{flexDirection:'column',borderRadius:5,margin:0,padding:5}}>
                            <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                <Text style={{color:colors.selected,fontSize:16,fontWeight:'bold',width:235}}>{item.dsc}</Text>
                                <Text style={{color:'#6C727E',fontSize:13}}>{item.date}</Text>
                            </View>
                            <View style={{justifyContent: 'space-between',flexDirection:'row',alignItems:'center',height:25,marginTop:5
                            }}>
                              <Text style={{color:'#7F8591',fontSize:12}}>  Amount(in USD)</Text>   
                                <Text style={{color:'#DBE2EB',fontSize:14}}>{item.amount}  </Text>  
                            </View>
                            <View style={{justifyContent: 'space-between',flexDirection:'row',alignItems:'center',height:25,marginTop:5
                            }}>
                              <Text style={{color:'#7F8591',fontSize:12}}>  Type</Text>   
                                <Text style={{color:'#DBE2EB',fontSize:14}}>{item.type}  </Text>   
                                      
                                
                            </View>
                            {/* <View style={{flexDirection: 'row', alignItems: 'center',backgroundColor:'#7F8591',marginTop:5}}>
  <View style={{flex: 1, height: 1, backgroundColor: '#7F8591'}} />
  
  <View style={{flex: 1, height: 1, backgroundColor: '#7F8591'}} />
</View> */}
</View>
                    </ImageBackground>
                    )}
                    />
</View>
    }

   





</ImageBackground>

  
  );
}



export default WithdrawScreenPoolProfit;
const styles1 = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bg,
        paddingTop: 10,
        paddingHorizontal: 10

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
        fontWeight:'bold',
        color:'#fff',
        textAlign:'center',
        marginTop:10
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
        color:'white'
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
        fontWeight: 'bold',
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


