/* eslint-disable prettier/prettier */
import * as React from 'react';
import { ThemeProvider } from '@react-navigation/native';
import { View, Text, Button, Dimensions,Linking, TouchableOpacity,Clipboard,ToastAndroid, StyleSheet, Image, StatusBar, FlatList, ScrollView, TextInput,ActivityIndicator, ImageBackground, Alert } from 'react-native';
import { RadioButton,Checkbox  } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { useFocusEffect, useIsFocused,useTheme } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IonIcons from 'react-native-vector-icons/Ionicons'
import Swiper from 'react-native-swiper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import { AuthContext } from '../component/context';

// import { styles } from 'react-native-fbsdk-next/types/FBLoginButton';
import global from '../component/global';
import theme from '../component/theme';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from '../component/styles'
import LinearGradient from 'react-native-linear-gradient';
import { Dropdown } from 'react-native-element-dropdown';
var DeviceInfo = require('react-native-device-info');
const BindingScreen = ({ navigation }) => {    
  const {colors}=useTheme();
  const theme=useTheme();
  const brokers=[
    // {label: 'Exness', value: 'Exness'},
    // {label: 'GIFXPrime', value: 'GIFXPrime'},
    // {label: 'ICMarkets', value: 'ICMarkets'},
    {label: 'OctaFX', value: 'OctaFX'},
    // {label: 'TradeView', value: 'Tradeview'},
    // {label: 'Vantage', value: 'Vantage'},
    // {label: 'FutureFX', value: 'FutureFX'},

    // {label: 'IFC Markets Ltd', value: 'IFC Markets Ltd'}
  ];
  const serverList =[
    {value:'Exness-MT5Trial'},
    {value:'Exness-MT5Trial2'},
    {value:'Exness-MT5Trial3'},
    {value:'Exness-MT5Trial4'},
    {value:'Exness-MT5Trial5'},
    {value:'Exness-MT5Trial6'},
    {value:'Exness-MT5Trial7'},
    {value:'Exness-MT5Trial8'},
    {value:'Exness-MT5Trial9'},
    {value:'Exness-MT5Trial10'},
    {value:'Exness-MT5Trial11'},
    {value:'Exness-MT5Trial12'},

    {value:'Exness-MT5Real'},
    {value:'Exness-MT5Real2'},
    {value:'Exness-MT5Real3'},
    {value:'Exness-MT5Real4'},
    {value:'Exness-MT5Real5'},
    {value:'Exness-MT5Real6'},
    {value:'Exness-MT5Real7'},
    {value:'Exness-MT5Real8'},
    {value:'Exness-MT5Real9'},
    {value:'Exness-MT5Real10'},
    {value:'Exness-MT5Real11'},
    {value:'Exness-MT5Real12'},
    {value:'Exness-MT5Real14'},
    {value:'Exness-MT5Real15'},
    //ok
  ]
  // https://www.icmarkets.com/global/en/
  const serverListFP =[
    {value:'FPMarkets-Demo'},
    {value:'FPMarkets-Live'},
    
  ]
  const serverListGIFX =[
    {value:'GIFXPrime-Server'},
    // {value:'FPMarkets-Live'},
    
  ]
  const serverListIC =[
    {value:'ICMarkets-Demo'},
    {value:'ICMarkets-MT5'},
    {value:'ICMarkets-MT5-2'},
    {value:'ICMarkets-MT5-4'},
    
  ]

  const serverListFFX =[
    {value:'FutureFX-Demo'},
    {value:'FutureFX-Server'},
    
  ]

  const severListVn=[
    {value:'VantageInternational-Demo'},
    {value:'VantageInternational-Live'},
    {value:'VantageInternational-Live 2'},
  ]
  const serverListIfc =[
    {value:'IFCMarketsLtd-Demo'},
    {value:'IFCMarketsLtd-Live'},
    
  ]
  const serverListOcta =[
    {value:'OctaFX-Demo'},
    {value:'OctaFX-Real'},
    {value:'OctaFX-Real2'},
    
  ]
  const [broker,setBroker] = React.useState('OctaFX')
  const [brokerURL,setBrokerURL] = React.useState('https://www.octafx.com/')
    const [LD, setLD] = React.useState(false);
    const bginput = '#2a3340'
    const plc = '#666d80'
    const [Uid, setUid] = React.useState('');
    const [Token,setToken] = React.useState(null);
    const [Loading, setLoading] = React.useState(true);
    const [seconds, setSeconds] = React.useState(60);
    const [showWarning, setShowWarning] = React.useState(false);
    const [alertModal, setAlertModal] = React.useState(false);
    const [qr,setQr] = React.useState({
      q1:false,
      q2:false,
      q3:false,
      q4:false,
      q5:false,     
    });
    // const [Quiz, setQuiz] = React.useState(false);
    const { signOut } = React.useContext(AuthContext);
    const[API,setAPI]= React.useState('')
    const[Secret,setSecret]= React.useState('')
    const[Server,setServer]= React.useState('Exness-MT5Trial7') //temp
   
    const [OTP, setOTP] = React.useState('');
    const [Verify, setVerify] = React.useState('');
    const [Count, setCount] = React.useState(false);

    const [checked, setChecked] = React.useState(false);
    const [demoKey, setDemoKey] = React.useState(false);
   
  const[ipShown,setIpShown] = React.useState('')
  const[ipReal,setIpReal] = React.useState('')
   
  function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    result='demo-'+result
    return result;
}
const [api_key,setApi_key] = React.useState(randomString(25, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'));
const [api_secret,setApi_secret] = React.useState(randomString(25, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'));

    
    // React.useEffect(()=>{
      
    //     LiveRate()       
    //   })

      useFocusEffect(
        React.useCallback(() => {            
            setTimeout(async () => {
                // setIsLoading(false);            
               let pass = null;
               let tp = null;
               let uid;
               let token;
               uid = null;
               
                try {
               
                uid=await AsyncStorage.getItem('user_id')
                token=await AsyncStorage.getItem('token')
                console.log(uid)
                setToken(token)
                // ipApi()
                console.log('----calling callAPi====================');
                  callApi(uid,token)
                  
                  setUid(uid);
                  
                  console.log(Count)
                  // callApi(uid);
                }
                catch (e) {
                  console.log(e);
                }
                // console.log('user token:', userToken);
               
                
              },1000);
              
            //we can add delay time here before callApi() i.e ' },1000,callApi());' //
        }, [])
    );
    // function ipApi(){
    //   console.log(global.BASE_URL+'css_mob/get_ip.aspx')
    //   fetch(global.BASE_URL+'css_mob/get_ip.aspx')
    //   .then(item => item.json())
    //   .then(Vdta => {
    //       console.log(Vdta)
    //       if(Vdta.success==='true')
    //       {
    //         setIpShown(Vdta.ip)
    //         setIpReal(Vdta.copy)
    //       }
    //   })
    // }
    React.useEffect(() => {
      if(Count){
        
        if (seconds > 0) {
          setTimeout(() => setSeconds(seconds - 1), 1000);
        } else {
          setSeconds(5);
          setCount(false)
        }
      }
    });
  


    const callApi=async(uid,token)=>{   
      setLoading(true)
      let url=global.BASE_URL+'css_mob/api_key.aspx?uid='+uid+'&pwd='+encodeURIComponent(global.PWD)+'&token='+token+'&broker='+broker+'&device='+DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel()
      console.log(url)
        fetch(url)
        .then(item => item.json())
        .then(Vdta => {
          console.log(Vdta)
          if(Vdta.success==='false'){
            setLoading(false)
            return
          }
            console.log(Vdta)
            if(parseFloat(Vdta.amt)>0)
            {
              global.activeId=true
            }
            else{
              global.activeId=false
            }  
            
            global.ReqValue=Vdta.reqvalue     
            global.autoStatus=Vdta.auto//'False' or 'True'
            global.autoAmt=Vdta.auto_amt
            global.autoNum=Vdta.auto_num   
            global.autoFamt=Vdta.auto_famt     
            global.timeleft = Vdta.timeleft        
                global.refurlProm=Vdta.whatsapp  
            global.timeleft = Vdta.timeleft
            setAPI(Vdta.api_key)
            setSecret(Vdta.secret_key)
            if(Vdta.server_name!=='')
            {
              setServer(Vdta.server_name)
              let brokerFull = Vdta.server_name
              // 
              // if(item.value=='Exness')
              // {
                
              //   setBrokerURL('https://www.exness.com/')
              // }
              // else if(item.value=='Tradeview')
              // {
                
              //   setBrokerURL('https://www.tradeviewlatam.com/')
              // }
              // else if(item.value=='IFC Markets Ltd')
              // {
                
              //   setBrokerURL('https://www.ifcmarkets.com/')
              // }
              // else if(item.value=='FPMARKETS')
              // {
                
              //   setBrokerURL('https://www.fpmarkets.com/')
              // }
              // else if(item.value=='OctaFX')
              // {
                
              //   setBrokerURL('https://www.octafx.com/')
              // }
              // 
              if(Vdta.server_name.toLowerCase().includes('vantage'))
              {
                setBroker('Vantage')
                setBrokerURL('https://www.Vantagemarkets.com/')
              }
              if(Vdta.server_name.toLowerCase().includes('icmarket'))
              {
                setBroker('ICMarkets')
                setBrokerURL('https://www.icmarkets.com/global/en/')
              }
              if(Vdta.server_name.toLowerCase().includes('exness'))
              {
                setBroker('Exness')
                setBrokerURL('https://www.exness.com/')
              }
              if(Vdta.server_name.toLowerCase().includes('fpmarket'))
              {
                setBroker('FPMARKETS')
                setBrokerURL('https://www.fpmarkets.com/')
                
              }
              if(Vdta.server_name.toLowerCase().includes('gifx'))
              {
                setBroker('GIFXPrime')
                setBrokerURL('https://www.gifxprime.com/')
                
              }
              if(Vdta.server_name.toLowerCase().includes('tradeview'))
              {
                setBroker('Tradeview')
                setBrokerURL('https://www.tradeviewlatam.com/')
                
              }
              // if(Vdta.server_name.toLowerCase().includes('ifcmarket'))
              // {
              //   setBroker('IFC Markets Ltd')
              //   setBrokerURL('https://www.ifcmarkets.com/')
                
              // }
              if(Vdta.server_name.toLowerCase().includes('octafx'))
              {
                setBroker('OctaFX')
                setBrokerURL('https://www.octafx.com/')
                
              }
              if(Vdta.server_name.toLowerCase().includes('futurefx'))
              {
                setBroker('FutureFX')
                setBrokerURL('https://www.futurefx.com/')
                
              }


            }
            else{
              setServer('Exness-MT5Trial7')
              setBroker('Exness')
            }
            if(Vdta.server_name.includes('MetaQuotes')){
          
              global.server_name = 'Exness-Demo';
            }
            else if(Vdta.server_name.includes('Vantage') || Vdta.server_name.includes('vantage')){
          
              global.server_name = 'Vantage';
            }

              else{
              global.server_name = Vdta.server_name;
            }
            global.NAME=Vdta.name                
          global.EMAIL=Vdta.eid
          // global.PWD=Vdta.pwd
          global.AMT=Vdta.amt            
          global.CUR=Vdta.cur
          global.api_key=Vdta.api_key
          global.server_name=Vdta.server_name
          global.dt=Vdta.dt
          global.api_secret=Vdta.secret_key
          console.log('everything done');
          global.refurl=Vdta.refurl
            check()
            async function check(){
              await AsyncStorage.setItem('api_key', Vdta.api_key);          
              await AsyncStorage.setItem('secret_key', Vdta.secret_key);
             
            }  
        })
        .then(val=> setLoading(false))
        .catch(e=> setLoading(false))
        
         
       
    }
  
    const OTPCall = async() => {  
      let token=await AsyncStorage.getItem('token')
      if(Uid!=''){
        
        fetch(global.BASE_URL+"css_mob/sendotp.aspx?uid="+Uid+"&type=email&device="+DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel()+'&token='+token)
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


    const BindAPI=()=>{
      let myAPI=demoKey?api_key:API
      let myAPI_secret=demoKey?api_secret:Secret
      if(parseFloat(Verify)!==parseFloat(OTP)){
        ToastAndroid.show("Invalid Verification code ", ToastAndroid.SHORT);
        setShowWarning(false)
        // setQuiz(false)
        setLD(false)
      }else{
        let demo=demoKey?1:0
        let url=global.BASE_URL+'css_mob/update_api_key.aspx?uid='+Uid+'&key1='+myAPI+'&key2='+encodeURIComponent(myAPI_secret)+'&server='+Server
        console.log(url)
        fetch(url)
        .then(item=> item.json())
        .then(dta=>{
          console.log(dta)
          if(dta.success==='true'){            
            ToastAndroid.show(dta.msg, ToastAndroid.LONG);           
            global.api_key=API;
            global.api_secret=Secret;
            global.callStore=true      
            setTimeout(() => {
              // setAlertModal(true)
              navigation.navigate('Home')
            }, 2000);     
          }
          else
          {
            setLD(false)
            ToastAndroid.show(dta.msg, ToastAndroid.LONG);
          }
        }).then(()=>{
          // setQuiz(false)
          setShowWarning(false)
        }).catch((ex)=>{
          console.log('error in api binding: '+ex)
          setLD(false)
            ToastAndroid.show('Something went wrong.. Please try again later!', ToastAndroid.SHORT);
        })
      }
    }
   
    const renderServers=(item)=>{
        return (
          <View style={{ padding: 10,paddingVertical:20 }}>
            {console.log('item',item)}
            <Text style={{ color: '#000' }}>{item.value}</Text>
    
          </View>
        
        )
    }
      
    return (
        Loading?
           <View style={{flexDirection:'column',justifyContent: 'center',height:'100%',
           }} ><LottieView source={require('../assets/loading.json')} 
           style={{width:350,height:350,alignSelf:'center'}} autoPlay loop /></View>
            :
        <ImageBackground source={global.bgimg} resizeMode={'stretch'} 
        style={[styles.container,{paddingTop:30,}]}>                   
        <View style={{alignItems: 'center',justifyContent:'center',flexDirection:'row',}}>
            <TouchableOpacity onPress={()=>navigation.goBack()} style={{padding:10}}>
                <Text style={{textAlign:'right'}}><IonIcons name="md-arrow-back" size={24}  color={colors.selected}   /></Text>
            </TouchableOpacity>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:15,
        paddingVertical:5,marginBottom:10}}> 
        <View style={{flexDirection:'row',justifyContent:'space-between',width:'80%',paddingLeft:20}}>            
                    <Text style={[styles1.heading,{color:colors.profitcolor2,textTransform:'uppercase'}]}>Link Account</Text>                            
        </View>
        </View>
    </View>
       
       

 <ScrollView style={{marginBottom:10,}} showsVerticalScrollIndicator={false}>

 <View style={{}}>
  <View style={{flexDirection:'column',justifyContent:'space-between',margin:10,marginHorizontal:20}}>
      <Text style={{color:colors.selected,fontSize:16,fontFamily:global.appFontM,
     }}>Broker
     {/* <Text style={{color:'#000',fontSize:16,
      fontFamily:global.appFontM,marginVertical:10,}}> : Exness</Text> */}
      </Text>
      
 <Dropdown
                                  style={[styles.dropdown, { height:40,width:'100%',
                                    marginTop:20,
                                    borderBottomWidth:1,borderColor:colors.profitcolor2,
                                    marginBottom:10,marginRight:10}]}
                                  placeholderStyle={styles.placeholderStyle}
                                  selectedTextStyle={[styles.selectedTextStyle,{backgroundColor:'transparent',
                                    color:'#fff'}]}
                                  inputSearchStyle={styles.inputSearchStyle}
                                  iconStyle={styles.iconStyle}
                                  iconColor={'#fff'}
                                  data={brokers}
                                  activeColor={colors.appBlue}
                                  containerStyle={{marginTop:-30,borderRadius:10,
                                    // backgroundColor:'#bbb',borderTopLeftRadius:0,
                                  borderTopRightRadius:0,color:'#fff'}}
                                  
                                  maxHeight={200}
                                  labelField="label"
                                  valueField="value"
                                value={broker}
                                  renderItem={(item,index)=>{
                                    return(
                                      <View
                                      // onPress={()=>{
                                      //   if(item.value=='Exness')
                                      //   {
                                      //     setBrokerURL('https://www.exness.com/')
                                      //   }
                                      //   if(item.value=='GIFXPrime')
                                      //   {
                                      //     setBrokerURL('https://www.gifxprime.com/')
                                      //   }
                                      //   setBroker(item.value)
                                      // }}  
                                      style={{padding:10}}>
                                        <Text style={{color:'#000'}}>{item.label}</Text>
                                      </View>
                                    )
                                  }}
                                  
                               
                                  onChange={item => {
                                    if(item.value=='Exness')
                                    {
                                      
                                      setBrokerURL('https://www.exness.com/')
                                    }
                                    if(item.value=='GIFXPrime')
                                      {
                                        setBrokerURL('https://www.gifxprime.com/')
                                      }
                                    else if(item.value=='Tradeview')
                                    {
                                      
                                      setBrokerURL('https://www.tradeviewlatam.com/')
                                    }
                                    else if(item.value=='Vantage')
                                    {
                                      
                                       setBrokerURL('https://www.Vantagemarkets.com/')
                                     }
                                    else if(item.value=='FPMARKETS')
                                    {
                                      
                                      setBrokerURL('https://www.fpmarkets.com/')
                                    }
                                    else if(item.value=='OctaFX')
                                    {
                                      
                                      setBrokerURL('https://www.octafx.com/')
                                    }
                                    else if(item.value=='FutureFX')
                                    {
                                      
                                      setBrokerURL('https://www.futurefx.com/')
                                    }
                                    else if(item.value=='ICMarkets')
                                    {
                                      
                                      setBrokerURL('https://www.icmarkets.com/global/en/')
                                    }
                                    
                                    
                                    setBroker(item.value)

                        
                                  }}
                             
                                />
  </View>
  <TouchableOpacity style={{alignSelf: 'flex-start',marginLeft:20,marginBottom:10}} onPress={()=>{Linking.openURL(brokerURL)}}>
    <Text style={{color:'#8E99BA',textDecorationLine: 'underline'
}}>Create Account With {broker}</Text>
  </TouchableOpacity>
 <View style={{
                               margin:5, width: '100%', paddingRight: 5, alignItems: 'center',
                                flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, borderRadius: 0,borderBottomWidth:1,borderColor:colors.selected, paddingHorizontal: 5
                            }}>
                              
 <TextInput
                 placeholder="UserName/Account No."
                 keyboardType='number-pad'                                
                 style={styles.textInput}
                 onChangeText={(val)=>{setAPI(val)}}
                 autoCapitalize="none"
                 width={'100%'}
                 value={demoKey?api_key:API}
                 placeholderTextColor={'#fff'}
                 selectionColor='#fff'
                 color={colors.selected}
                 height={'100%'}
             />
</View>
 <View style={{
                                width: '100%', paddingRight: 5, alignItems: 'center',
                                margin:5,
                                flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, borderRadius: 0,borderBottomWidth:1,borderColor:colors.selected, paddingHorizontal: 5
                            }}>
 <TextInput
                 placeholder="Password"
                //  keyboardType='visible-password'  
                secureTextEntry={global.demo=='true'?false:true}                               
                 style={styles.textInput}
                 onChangeText={val=>{setSecret(val)}}
                 autoCapitalize="none"
                 width={'100%'}
                 value={demoKey?api_secret:Secret}
                 placeholderTextColor={'#fff'}
                 selectionColor='#fff'
                 color={colors.selected}
                 height={'100%'}
             />
</View>
 <View style={{
                                width: '100%', paddingRight: 5, alignItems: 'center',
                                margin:5,
                                flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, borderRadius: 0,borderBottomWidth:1,borderColor:colors.selected, paddingHorizontal: 5
                            }}>
                              <Dropdown
                                  style={[styles.dropdown, { height:50,width:300,backgroundColor:'transparent',borderWidth:0,marginTop:5,marginBottom:10,
                                  marginRight:10}]}
                                  placeholderStyle={styles.placeholderStyle}
                                  selectedTextStyle={[styles.selectedTextStyle,{backgroundColor:'transparent',color:colors.selected}]}
                                  inputSearchStyle={styles.inputSearchStyle}
                                  iconStyle={styles.iconStyle}
                                  iconColor={'#fff'}
                                  placeholder="Select Server"
                                  // Exness
                                  // FPMARKETS
                                  // Tradeview
                                  // AAFX Trading

                                  // data={broker=='Vantage'?severListVn:broker=='Exness'?serverList:broker=='FPMARKETS'?serverListFP:broker=='Tradeview'?serverListTV:broker=='OctaFX'?serverListOcta:serverListFFX}//:serverListIfc
                                  data ={broker=='Exness'?serverList:broker=='ICMarkets'?serverListIC:broker=='OctaFX'?serverListOcta:serverListGIFX}
                                  activeColor={colors.appBlue}
                                  containerStyle={{marginTop:-32,borderRadius:10,backgroundColor:'#fff',
                                  borderWidth:0,borderTopLeftRadius:0,borderTopRightRadius:0}}
                                  
                                  maxHeight={200}
                                  labelField="value"
                                  valueField="value"
                                
                               
                                  value={Server}
                               
                                  onChange={item => {
                                      setServer(item.value)
                                  }}
                                    renderItem={renderServers}
                                />
 {/* <TextInput
                 placeholder="Server Name"
                 keyboardType='default'                                
                 style={styles.textInput}
                //  editable={false}
                 onChangeText={(val)=>{setServer(val)}}
                 autoCapitalize="none"
                 width={'100%'}
                 value={Server}
                 placeholderTextColor={'gray'}
                 selectionColor='#000'
                 color={colors.appBlack}
                 height={'100%'}
             /> */}
</View>
<View style={{flexDirection:'row',justifyContent:'center',paddingHorizontal:15,width:'90%',
borderBottomWidth:1,borderColor:colors.selected,alignSelf: 'center'}}>
  <View style={{
                                width: '70%', paddingRight: 0, alignItems: 'center',
                                flexDirection: 'row', justifyContent: 'space-between', marginTop: 10,
                                  paddingHorizontal: 0
                            }}>

                      
                      <TextInput
                          placeholder="Verification Code"
                          style={styles.textInput}
                          color={colors.selected}
                          keyboardType={'number-pad'}
                          autoCapitalize="none"
                          onChangeText={(val) => setVerify(val)}
                          width={200}
                          selectioncolor={colors.selected}
                          maxLength={4}
                          placeholderTextColor={'#fff'}
                          
                      />

  </View>
                      <TouchableOpacity onPress={Count?null:() =>{setCount(true),OTPCall()}} 
                      
                      style={{marginBottom:5,alignSelf: 'flex-end',marginLeft:10}} >
                        
                              <View style={[{alignItems:'center',color:'#000000',flexDirection: 'row',
                              justifyContent: 'center',height:40,paddingHorizontal:5,
                              borderRadius:20,paddingVertical:5,width:150,backgroundColor: colors.profitcolor2}]}>                               
                                {Count?null:  <Text style={[styles.text,{color:'#ffffff',fontFamily:global.appFontM}]}>SEND CODE</Text>}
                                {Count? <Text style={[styles.text,{color:colors.selected,}]}>RESEND CODE IN: <Text style={{fontSize:18}}> {seconds}</Text>  </Text>:null}
                                  
                              </View>
                        </TouchableOpacity>
  </View>
</View>

<View style={{position: 'relative',bottom:10,alignItems: 'center',alignSelf:'center'}}>
       <View style={{marginTop:10,backgroundColor:'transparent',width:'100%',borderRadius:10,alignItems: 'center',alignSelf: 'center',paddingVertical:10}}>
       
       <View style={{flexDirection:'row',justifyContent:'space-evenly',alignItems: 'center',marginTop:10}}>
        <RadioButton
                
                status={ checked ? 'checked':'unchecked' }
                color={colors.appGray}
                uncheckedColor={colors.appGray}
                onPress={() => setChecked(!checked)}
              />
       
               <Text style={[styles1.text,{color:colors.appGray,textTransform:'uppercase',
               fontFamily:global.appFontM}]}>I have read the risk notice carefully</Text>
       
       </View>
       {/* 103.224.241.238 */}
      </View>
      <View>
      
        <TouchableOpacity
        onPress={() => {
          if(checked){            
            setShowWarning(true)            
           }else{
             ToastAndroid.show('check the Risk Notice first!',ToastAndroid.SHORT)
           }
        }}
       >
        <LinearGradient
                        colors={checked?[ colors.profitcolor,colors.profitcolor2]:[ '#505050','#90909090']}   

                        style={[styles1.signIn,{alignSelf: 'center',elevation:0}]}                    
                    >
              <Text style={[styles.sheading,{color:colors.selected}]}>Continue</Text>
       
          </LinearGradient>
      </TouchableOpacity>
     </View>
     {/* <Text onPress={() => {Linking.openURL('https://t.me/iamrobotz')}}style={{color:colors.binanceylw,marginTop:10,textAlign: 'center'}}>Need Help for Linking Account? Click here to Contact our Customer Support Service !</Text> */}
    </View>
    </ScrollView>

<Modal onBackButtonPress={() => setShowWarning(false)} 
statusBarTranslucent={true} deviceHeight={1000}
onBackdropPress={() => setShowWarning(false)} 
isVisible={showWarning}
 useNativeDriver={true}
 animationIn={'slideInDown'} animationOut={'slideOutUp'}
 backdropColor='white'
 // contentContainerStyle={{width:'100%'}}
 transparent={true} backdropOpacity={0.1}>
 <ImageBackground source={require('../assets/Aeon/bigHistmodal.png')} 
 resizeMode={'stretch'}
 style={{
  flexDirection: 'column', width:370,height:420,
   paddingHorizontal: 35, paddingVertical: 15, alignSelf: 'center', 
   // position: 'absolute',
   // top: 65,
   // borderRadius: 10, borderBottomWidth: 0, width: 300,
 }}>
  <Text style={{color:colors.profitcolor2,fontFamily:global.appFontB,fontSize:18,marginTop:10}}>RISK NOTICE</Text>
 <View style={{position: 'absolute',  top: 100,alignSelf: 'center'}}>
   <Text style={{ color:colors.appGray
    ,fontSize:14,fontFamily:global.appFontM,textTransform: 'uppercase'
    ,textAlign: 'justify',marginHorizontal:20,alignSelf: 'center',lineHeight:25,marginBottom:10}}>
       Forex Trading Involves Risk Of Money Loss Also. This Bot Only Provides Tools for better trading and to Minimize Your Losses. There is No gurantee for profits. So Please Trade At your own Risk.
       </Text>
       <TouchableOpacity
        onPress={() => {
        
         setShowWarning(false)  
         if(API!=='' && Secret!=='' && Server!=='') {

           BindAPI()  
         }
         else{
          ToastAndroid.show('Please fill all details first!',ToastAndroid.SHORT)
         }
        }}
       >
        <LinearGradient
                        colors={checked?[colors.profitcolor,colors.profitcolor2]:[ '#505050','#90909090']}   

                        style={[styles1.signIn,{alignSelf: 'center',elevation:0,marginTop:20}]}                    
                    >
              <Text style={[styles.sheading,{color:colors.selected}]}>Proceed{LD?<ActivityIndicator size={"small"}  color="#fff" />:null}</Text>
       
          </LinearGradient>
      </TouchableOpacity>
   </View>
  
 </ImageBackground>


</Modal>
<Modal onBackButtonPress={() => {setAlertModal(false),navigation.navigate('Home')}} statusBarTranslucent={true} deviceHeight={1000}
onBackdropPress={() => {setAlertModal(false),navigation.navigate('Home')}} isVisible={alertModal}
 useNativeDriver={true}
 animationIn={'slideInDown'} animationOut={'slideOutUp'}

 // contentContainerStyle={{width:'100%'}}
 transparent={true} backdropOpacity={0.4} backdropColor={'#000'}>

<View style={{width:300,height:300,alignSelf: 'center',alignItems: 'center',justifyContent:'center',backgroundColor:'#fff',borderRadius:10}}>
      <Text style={{color:'#000',fontSize:18,}}>Please select your copier again!!</Text>

      <TouchableOpacity style={{alignItems: 'center',justifyContent:'center',marginTop:60,backgroundColor:colors.appBlue,padding:10,paddingHorizontal:20
      ,borderRadius:10
    }} onPress={()=>{setAlertModal(false),navigation.navigate('Home')}}>
          <Text style={{fontWeight:'bold',color:colors.selected}}>OK</Text>
      </TouchableOpacity>
</View>


</Modal>
{/* <Modal onBackButtonPress={() => setQuiz(false)} statusBarTranslucent={true} deviceHeight={1000}
onBackdropPress={() => setQuiz(false)} isVisible={Quiz}
 useNativeDriver={true}
 animationIn={'slideInDown'} animationOut={'slideOutUp'}
 backdropColor='white'
 // contentContainerStyle={{width:'100%'}}
 transparent={true} backdropOpacity={0.1}>
 <ImageBackground source={require('../assets/botz/deparrow.jpg')} 
 resizeMode={'stretch'}
 style={{
  flexDirection: 'column', width:370,height:450,
   paddingHorizontal: 35, paddingVertical: 15, alignSelf: 'center', 
   // position: 'absolute',
   // top: 65,
   // borderRadius: 10, borderBottomWidth: 0, width: 300,
 }} 
 >
 <View style={{alignSelf: 'center'}}>
 <Swiper loop={false}
 style={{paddingTop:150}}
 showsButtons={true}
 buttonWrapperStyle={{marginTop:100}} 
 >
                        <View >
                          <Text style={styles.sheading}>I am very well aware of the fact that Future trading is highly risky.</Text>
                          <View style={{flexDirection:'row',alignItems:'center',marginTop:25,justifyContent:'center'}}>
                          <Checkbox
                          uncheckedColor='#fff'
                            status={qr.q1 ? 'checked' : 'unchecked'}
                            onPress={() => {
                              setQr(e=>({...e,'q1':!qr.q1}));
                              console.log(qr.q1)
                            }}
                            />
                            <Text style={[styles.sheading,{color:colors.binanceylw}]}>I Agree</Text>
                            </View>
                        </View>
                        
                        <View>
                          <Text style={styles.sheading}>The maximum leverage available on Meta-Futures is 10X .</Text>
                          <View style={{flexDirection:'row',alignItems:'center',marginTop:25,justifyContent:'center'}}>
                          <Checkbox
                          uncheckedColor='#fff'
                            status={qr.q2 ? 'checked' : 'unchecked'}
                            onPress={() => {
                              setQr(e=>({...e,'q2':!qr.q2}));
                              console.log(qr.q2)
                            }}
                            />
                            <Text style={[styles.sheading,{color:colors.binanceylw}]}>I Agree</Text>
                            </View>
                        </View>
                       
                        <View>
                          <Text style={styles.sheading}>The maximum loss for trading in a futures contract can be 100% of collateral .</Text>
                          <View style={{flexDirection:'row',alignItems:'center',marginTop:25,justifyContent:'center'}}>
                          <Checkbox
                          uncheckedColor='#fff'
                            status={qr.q3 ? 'checked' : 'unchecked'}
                            onPress={() => {
                              setQr(e=>({...e,'q3':!qr.q3}));
                              console.log(qr.q3)
                            }}
                            />
                            <Text style={[styles.sheading,{color:colors.binanceylw}]}>I Agree</Text>
                            </View>
                        </View>
                       
                        <View>
                          <Text style={styles.sheading}>I Should not take up a personal loan to trade futures .</Text>
                          <View style={{flexDirection:'row',alignItems:'center',marginTop:25,justifyContent:'center'}}>
                          <Checkbox
                          uncheckedColor='#fff'
                            status={qr.q4 ? 'checked' : 'unchecked'}
                            onPress={() => {
                              setQr(e=>({...e,'q4':!qr.q4}));
                              console.log(qr.q4)
                            }}
                            />
                            <Text style={[styles.sheading,{color:colors.binanceylw}]}>I Agree</Text>
                            </View>
                        </View>
                       
                        <View>
                          <Text style={styles.sheading}>Meta-Futures is not liable for any losses that I suffer while trading in futures i.e  Only I am responsible for my loss!</Text>
                          <View style={{flexDirection:'row',alignItems:'center',marginTop:25,justifyContent:'center'}}>
                          <Checkbox
                          uncheckedColor='#fff'
                            status={qr.q5 ? 'checked' : 'unchecked'}
                            onPress={() => {
                              setQr(e=>({...e,'q5':!qr.q5}));
                              console.log(qr.q5)
                            }}
                            />
                            <Text style={[styles.sheading,{color:colors.binanceylw}]}>I Agree</Text>
                            </View>
                        </View>
                        
                          
                      </Swiper>
       <TouchableOpacity
        onPress={() => {
          if(!qr.q1||!qr.q2||!qr.q3||!qr.q4||!qr.q5){
            ToastAndroid.show('Please read and agree with all the above terms to continue',ToastAndroid.LONG)
            return
          }     
          setLD(true)
         BindAPI()   
        }}
       >
        <LinearGradient
                        colors={checked?[ global.appColor1,global.appColor1]:[ '#505050','#90909090']}   

                        style={[styles1.signIn,{alignSelf: 'center',elevation:0}]}                    
                    >
              <Text style={[styles.sheading,{color:colors.text}]}>Bind{LD?<ActivityIndicator size={"small"}  color="#fff" />:null}</Text>
       
          </LinearGradient>
      </TouchableOpacity>
   </View>
  
 </ImageBackground>


</Modal> */}
<Text style={{display:'none'}}></Text>
    </ImageBackground>
    );
}

export default BindingScreen;
const styles1 = StyleSheet.create({
    container: {
        flex: 1,
          backgroundColor: '#0B1725'

    },
    bx: {
        flexDirection:'column',
        justifyContent:'space-around',
        borderWidth:0.5,
        borderRadius:10,
        borderColor:theme.vbg,
        paddingVertical:5,
        paddingHorizontal:5,
        marginHorizontal:5,
        width:70,
        alignItems: 'center',
        height:90

    },
    signIn: {
      width: 300,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 45,
      marginTop:20,
      elevation: 6,
      flexDirection: 'row',


  },
    bx1: {
        flexDirection:'row',
        justifyContent:'space-between',
        borderWidth:1,
        borderRadius:7,
        borderColor: '#2f67f0',
        paddingVertical:3,
        paddingHorizontal:3,        
        // width:130,
        alignItems: 'center',
        // height:40

    },
    heading:{
        fontSize:25,
        fontFamily:global.appFontM,
        color:'#fff',
        textAlign:'center',
        marginTop:10
        },
    btn1:{
        marginTop:10,
        width:60,
        borderWidth:0.5,
        borderColor: '#2f67f0',
        backgroundColor: '#16181d',
        paddingVertical:5,
        alignSelf:'center',
        alignItems:'center',
        borderRadius:5
    
    },
  
    textInput: {
            flexDirection:'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth:0.5,
            borderBottomColor:'#808080',
            

    },
    text_header: {
        color: "#fff",
        fontFamily:global.appFontM,
        fontSize: 30
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderBottomWidth: 0.5,
        borderBottomColor: '#808080',
        marginTop: 15
    },
    text: {
        color: theme.hgl,
        fontFamily:global.appFontM,
        fontSize: 12,
        

    },
    trx:{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
    },
    logo: {
        width: 250,
        maxHeight: 200,
    },
   
    button: {
        alignItems: 'center',
        marginTop: 80,

    },
    title: {
        fontSize: 22,
        
        color:'#FFF'
    },
    textSign: {
        fontSize: 18,       
        color: '#fc1681'
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
        fontFamily:global.appFontM,
        marginBottom: 15
    },
    card_box: {
       backgroundColor:'#fc1681',
       paddingHorizontal:15,
       height:30,
       borderRadius:20,
       paddingTop:2
    },
    text_card: {
        fontSize: 13,
        color:'#c9c9c9c9',
        marginTop:15
    }
});