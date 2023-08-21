/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable css_mob/jsx-no-duplicate-props */
/* eslint-disable css_mob/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import { ThemeProvider, useFocusEffect, useIsFocused,useTheme,useLinkTo } from '@react-navigation/native';
import { View, Text, Button, Dimensions, TouchableOpacity,ToastAndroid, StyleSheet,RefreshControl, Image, StatusBar,FlatListProps, ListRenderItemInfo,  FlatList, ScrollView, TextInputComponent, TextInput, Alert, ActivityIndicator,BackgroundImage, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import database from '@react-native-firebase/database';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from "react-native-raw-bottom-sheet";
import AsyncStorage from '@react-native-async-storage/async-storage';
import global from '../component/global'
import { jsonContext } from '../context/GlobalState';
import axios from 'axios';
import Modal from 'react-native-modal';
// import Rates from '../component/Rates'
import styles from '../component/styles'
import KlineChart2 from '../component/KlineChart2'
import { indexOf } from 'lodash';
// import a from './a.json'
import { color } from 'react-native-reanimated';

import {Checkbox,Switch } from 'react-native-paper';
// import * as firebase from 'firebase';
var arr=[];
var Coins='';
var symbol='';

var newjson = ''
const SignalTrading = ({ navigation,route }) => {  
  const linkTo = useLinkTo();
  // const my_name=route.params?.name;
  const { myjson,setCallStore } = React.useContext(jsonContext);
  const my_name=route.params?.name;
  const[intvl, setIntvl]= React.useState(false)
  const {colors}=useTheme();
  const theme=useTheme();

  // const {theme}=useTheme();
   const isFocused = useIsFocused();
 ////////////////////////////////////////////////////////////////
 const[ask,setAsk] = React.useState(false)
 const [btn_disable, setBtn_disable] = React.useState(true);
 const [showChart, setShowChart] = React.useState(true)
 const [canShowChart, setCanShowChart] = React.useState(false)
 const [chartIndex, setChartIndex] = React.useState(-1)
 const [OpenPanel, setOpenPanel] = React.useState(false);
 const [chart, setChart] = React.useState('')
 const[signalInterval,setSignalInterval] = React.useState('15')
 const[rsiRange,setRsiRange] = React.useState('50')
 const[small,setSmall] = React.useState(false)
 ///////////////////////////////////////////////////////////////
   const[API_KEY,setAPI_KEY]= React.useState(false)
   const[Uid,setUid]= React.useState('')
   const[Bal,setBal]= React.useState('')
  const[modalVis,setModalVis] = React.useState(false)
   const [My_Focus, setMy_Focus] = React.useState(false);
   const [isModalVisible, setModalVisible] = React.useState(false);
   const [Search, setSearch] = React.useState(false);
   const [No_Search, setNo_Search] = React.useState(false);
  
   const[Loading,setLoading]= React.useState(false)
   const [refreshing, setRefreshing] = React.useState(false);
 
   const [my_Pwd, setMy_Pwd] = React.useState(null);
   const [Data, setData] = React.useState(null);
   const [RSIData, setRSIData] = React.useState(null);
   const [NData, setNData] = React.useState('');
   const[bolg,setBolg] = React.useState(true);
   const[bolgBtn,setBolgBtn] = React.useState(true);
  const[signalSearch,setSignalSearch] = React.useState('')
  
 
   const [Inp_txt, setInp_txt] = React.useState('');  
     React.useEffect(()=>{   
             
      checkAsk()
     },[])
    async function checkAsk(){
      let askVal=await AsyncStorage.getItem('ask')
      if(askVal=='checked'){

        setModalVis(false) 
      }
      else{

        setModalVis(true) 
      }
     }
   useFocusEffect(
    React.useCallback(() => {
      console.log("this is the global value : " + global.val)
      if(global.val!=''){
        setInp_txt(global.val);
        setMy_Focus(true)       
      }
      // setLoading(true)                
      var interval='';
      // setTimeout(async () => {                      
      //    interval = setInterval(() => {
      //     callApi(Coins)
      //   }, 2000);
      // }, 3000,[]);                     
      return  () => {console.log('cleared already1'),setInp_txt(''),setSearch(false),global.val=''};
    }, [])
  );
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  

  const callApi=()=>{
 setLoading(true);
   
    let url=global.BASE_URL+'css_mob/get_signals_for_app.aspx?uid='+global.uid
    // let url2=global.BASE_URL+'css_mob/get_rsi.aspx?val='+rsiRange+'&type='+(small?'lesser':'greater')

    console.log(url)
    fetch(url)
    .then(item=>item.json())
    .then(data=>{
           console.log('its reposnsd: '+JSON.stringify(data)) 
      setData(data)
      setLoading(false)
     setRefreshing(false)
     if(data.length==0 || JSON.stringify(data)=='{}'){
      setBolgBtn(true)
     }
     
    }).catch(e=>{
      console.log('1  '+e)
      setRefreshing(false)
            setLoading(false)
         
    })      
   
  }
  
  function ShowResults(){
    setLoading(true)
    let url2=global.BASE_URL+`css_mob/get_rsi.aspx?val=${rsiRange}&type=${small?'lesser':'greater'}&interval=${signalInterval}`
    console.log(url2)
    fetch(url2)
    .then(item=>item.json())
    .then(data=>{
      console.log('response 3 '+JSON.stringify(data)) 
      setRSIData(data)
      setRefreshing(false)
      setLoading(false)
    }).catch(e=>{
      console.log('2 '+e)
      setRefreshing(false)
      setLoading(false)
    })  
  }

 const renderlist=()=>{
return(
 <View style={{height:'85%'}}>

 <ScrollView  showsVerticalScrollIndicator={false}>
  { Object.entries(Data).filter(e=>e[0].includes(signalSearch.toUpperCase())).map((item,index)=><View style={{flexDirection:'row',paddingVertical:5,borderBottomWidth:0.5,borderColor:'#fff',elevation:5,
  paddingHorizontal:5,backgroundColor:item[1]=='CLOSE TO LOWER BOLLINGER'?'#0EAE25':
  item[1]=='CLOSE TO UPPER BOLLINGER'?'#DC0808':item[1]=='BREAKS UPPER BOLLINGER'?'#5AC534':'#FF0000'}}>
  <Text style={{color:'white',fontSize:13,flex:0.35,borderRightWidth:0.5,borderColor:'#fff',fontWeight: 'bold'}}>{item[0]}</Text>
  <Text style={{color:'white',fontSize:12,flex:0.65,marginLeft:10,borderRightWidth:0.5,borderColor:'#fff',}}>{item[1]}</Text>
  <Text style={{color:'white',fontSize:13,flex:0.25,marginLeft:10,fontWeight: 'bold'}}>{item[1]=='CLOSE TO LOWER BOLLINGER'?'BUY':item[1]=='CLOSE TO UPPER BOLLINGER'?'SELL':item[1]=='BREAKS UPPER BOLLINGER'?'STRONG BUY':'STRONG SELL'}</Text>
  </View>)}
</ScrollView>
    </View>
)}

 const renderlist2=()=>{
return(
  <View style={{height:'75%'}}>

 <ScrollView  showsVerticalScrollIndicator={false}>
 { Object.entries(RSIData).filter(e=>e[0].includes(signalSearch.toUpperCase())).map((item,index)=><View key={index} style={{flexDirection:'row',paddingVertical:5,borderBottomWidth:0.5,borderColor:'#fff',
  // elevation:5,
  paddingHorizontal:5,
  }}>
  <Text style={{color:'white',fontSize:13,flex:0.45,borderRightWidth:0.5,borderLeftWidth:0.5,borderColor:'#fff',fontWeight: 'bold',paddingLeft:5}}>{item[0]}</Text>
  <Text style={{color:'white',fontSize:13,flex:0.55,marginLeft:10,borderRightWidth:0.5,borderColor:'#fff',}}>{item[1]}</Text>
  </View>)}
</ScrollView>
    </View>
  )}

const onRefresh = React.useCallback(async () => {   
    setRefreshing(true);
    callApi(Coins)      
})

function SendToInner(sym,img,st,type,strtamt,qty,qty1,inc,bst,avg,usdt,bst1,high,low,prev,ask,bid) {
    navigation.navigate('TradeReview', {sym:sym,img:img,status:st,type:type,strtamt:strtamt,qty:qty,qty1:qty1,inc:inc,bst:bst,avg:avg,usdt:usdt,bst1:bst1,high:high,low:low,prev:prev,ask:ask,bid:bid});
  }  
  



  const handleSearch =(text)=>{
    
    setInp_txt(text);
    setSearch(true);
    const formattedQuery = text.toLowerCase();       
    // console.log(formattedQuery)
    Data.map(todo_inside => 
      {
        let nme=todo_inside.sym.toLowerCase()        
          if(nme.includes(formattedQuery)){
            console.log(nme, formattedQuery,"hello")
            arr.push(todo_inside)
          }
          
      }   
          )
      
     if(text!=''&& arr.length==0){
      setNo_Search(true)  
    }else{
      setNo_Search(false)
    }
   setNData(arr)
  }
  const Push_btn=(pair)=>{
    console.log("symbol here",pair)
    let url=global.BASE_URL+'css_mob/stoptrade.aspx?pair='+pair+'&uid='+Uid + "&api_key=" + global.api_key + "&api_secret=" + global.api_secret;
    console.log(url)
    fetch(url)
    .then(item=>item.json())
    .then(dta=>{
      // console.log("here" + dta)
      ToastAndroid.show(dta.message + " for "+pair,ToastAndroid.SHORT)
      StoreApi(Uid) 
      toggleModal()
      
    })                 
  }
  

const touch_handle=(item)=>{
  if (global.api_key == '') {
    navigation.navigate('APIBinding');
  } else {
    SendToInner(
      item.sym,
      item.img,
      item.st,
      item.tp.toUpperCase(),
      item.strtamt,
      item.qty,
      item.qty1,
      item.st.toLowerCase() === 'false'
        ? 0
        : item.strtamt != ''
        ? parseFloat(item.strtamt) <
          parseFloat(item.last_price)
          ? (
              ((parseFloat(item.strtamt) -
                parseFloat(item.last_price)) /
                parseFloat(item.last_price)) *
              100
            ).toFixed(2)
          : (
              ((parseFloat(item.last_price) -
                parseFloat(item.strtamt)) /
                parseFloat(item.last_price)) *
              100
            ).toFixed(2)
        : 0,
      item.bst,
      item.avg,
      item.usdt,
      item.bst1,
      item.x_hprice,
      item.x_lprice,
      item.x_prev_cprice,
      item.x_askprice,
      item.x_bidprice,
      item.order_type
    );
  }
}
  

async function understandFn(){
  if(ask){
    await AsyncStorage.setItem('ask','checked')
  }
  else{
    await AsyncStorage.removeItem('ask')
  }
  setModalVis(false)
}

    return (
        // Loading?
        // <View style={{flexDirection:'column',justifyContent: 'center',height:'100%',backgroundColor:colors.background}} >
        //   <LottieView source={require('../assets/loading.json')} style={{width:300,height:300,alignSelf:'center'}} autoPlay loop />
        //   </View>
        // :
       
      
       
        <ImageBackground source={global.bgimg} style={[styles.container,{paddingTop:40}]}>               
          <Modal isVisible={Loading}
        statusBarTranslucent
      onBackButtonPress={()=>{setLoading(false),navigation.goBack()}}
    
        // style={{alignSelf:'center',marginLeft:0,marginTop:0,borderRadius:10,alignSelf: 'center',alignItems:'center',justifyContent: 'center',}}           
       
        >
     <View style={{flexDirection:'column',justifyContent: 'center',height:'100%',backgroundColor:'transparent',alignItems: 'center'}} >
          <LottieView source={require('../assets/signal.json')} style={{width:250,height:250,alignSelf:'center'}} autoPlay loop />
          <Text style={{color:'#fff'}}>Searching for Signals...</Text>
          </View>
    
    </Modal> 
          <Modal isVisible={modalVis}
        statusBarTranslucent
       //  deviceHeight={window.height*0.5}
        onBackButtonPress={()=>{setModalVis(false)}} //modalVis
        style={{alignSelf:'center',marginLeft:0,marginTop:0,borderRadius:10,alignSelf: 'center',alignItems:'center',justifyContent: 'center'}}           
       //  onBackdropPress={()=>{setModalVis(false)}}
        >
        <View  resizeMode={'stretch'} 
        style={{backgroundColor:'#375a78',alignSelf:'center',borderRadius:10,marginLeft:15,paddingHorizontal:20,
        alignItems:'center',}}>
        <Text style={{color:'white',fontSize:16,lineHeight:25,marginTop:20}}>
         Desclaimer : {'\n'}{'\n'}
         - These signals are provided by TradingView and just for Knowledge purpose.{'\n'}{'\n'}
         - Please do your own research before Trading.{'\n'}{'\n'}
        </Text>
<TouchableOpacity style={{backgroundColor:'#2a9c3d',padding:10,borderRadius:5,marginTop:20}} onPress={()=> understandFn()}>
<Text style={{color:'white',fontSize:16}}>
         I Understand</Text>
</TouchableOpacity>
<View style={{flexDirection:'row',justifyContent: 'center',alignItems: 'center',marginTop:10}}>
<Checkbox                      
                   status={ask? 'checked':'unchecked' }
                   color={'#ffffff'}
                   uncheckedColor={'#ffffff'}
                   onPress={() => {setAsk(!ask)}}
                 />
<Text style={{color:'white',fontSize:16}}>
         Don't ask again</Text>
</View>
</View>
    
    </Modal> 
    <Animatable.View
            animation="fadeIn"
            style={styles.footer}>
        
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:10,paddingLeft:5,
        paddingTop:10,alignItems: 'center',}}> 
        
        <TouchableOpacity onPress={()=>{setBolg(true)}} style={[bolg?{borderBottomWidth:2,}:{},{flexDirection:'row',justifyContent:'space-between',width:'30%',paddingBottom:10,paddingLeft:20
        ,borderBottomColor:colors.binanceylw2,marginLeft:20}]}>            
                    <Text style={[styles1.heading,{color:colors.binanceylw2,fontSize:18,fontWeight: 'bold'}]}>Bollinger</Text>                            
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{setBolg(false)}} style={[bolg?{}:{borderBottomWidth:2,},{flexDirection:'row',justifyContent:'space-between',width:'30%',paddingBottom:10,paddingLeft:20
        ,borderBottomColor:colors.binanceylw2,marginLeft:20}]}>            
                    <Text style={[styles1.heading,{color:colors.binanceylw2,fontSize:18,fontWeight: 'bold'}]}>RSI</Text>                            
        </TouchableOpacity>
        
    </View>
    
        {((!Data ||JSON.stringify(Data)=='{}') && bolg)?
        <View>
        {!Loading && JSON.stringify(Data)=='{}'?<Text style={{color:'white',fontSize:20}}>{'\n\n\n\n\n\n\n\n\n\n\n\n'}                       No Signals Currently</Text>:
        
          <View style={{width:'100%'}}>
            <TouchableOpacity style={{backgroundColor:colors.binanceylw2,width:200,height:50,alignSelf: 'center',alignItems: 'center'
            ,marginTop:25,borderRadius:10,justifyContent: 'center'}} onPress={()=>{setBolgBtn(false),callApi()}}>
              <Text style={{fontSize:16}}>Get Bollinger Signals</Text>
            </TouchableOpacity>
            </View>
        
        }
        </View>
        :
        ((!RSIData ||JSON.stringify(RSIData)=='{}') && !bolg)?
        <View>
          <View style={{flexDirection:'row',justifyContent: 'space-between',width:'96%',alignItems: 'center',marginVertical:10,}}>
    <View style={{flexDirection:'column',justifyContent: 'space-between',width:'70%',alignItems: 'center',}}>
      <TextInput style={{width:'70%',borderRadius:10,paddingLeft:10,padding:5,color:'#000',backgroundColor:'#fff'}}
      placeholder="Enter RSI Value !"
      keyboardType={'number-pad'}
      value={rsiRange}
      onChangeText={(val) =>{setRsiRange(val)}}

      />
       <View style={{flexDirection:'row',justifyContent: 'space-between',width:'60%',alignItems: 'center',marginTop:15}}>
      <TouchableOpacity onPress={()=>{setSmall(true)}} style={{width:70,height:25,borderRadius:20,backgroundColor:small?colors.binanceylw2:'grey',alignItems: 'center',justifyContent: 'center'}}>
        <Text style={{color:'#000'}}>Lesser</Text></TouchableOpacity>
      <TouchableOpacity onPress={()=>{setSmall(false)}} style={{width:70,height:25,borderRadius:20,backgroundColor:!small?colors.binanceylw2:'grey',alignItems: 'center',justifyContent: 'center'}}>
        <Text style={{color:'#000'}}>Greater</Text></TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={()=>ShowResults()}
      style={{width:100,height:50,borderRadius:5,backgroundColor:'#40e3cd',alignItems: 'center',justifyContent: 'center'}}>
        <Text style={{color:'#000'}}>Show Results</Text></TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row',justifyContent: 'space-around',width:'96%',marginTop:5,
                alignSelf: 'center',justifyContent: 'space-around',
              }}>
                <TouchableOpacity 
                onPress={() => {
                  //setLd2(1)
                  setSignalInterval('1')
                  //SignalInfo(symSignal,'1')
                }}
                style={{backgroundColor:signalInterval=='1'?'blue':'grey',width:50,height:30,alignItems:'center',justifyContent:'center',borderRadius:5}}>
                    <Text style={{color:colors.selected}}>1m</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => {
                  //setLd2(1)
                  setSignalInterval('5')
                  //SignalInfo(symSignal,'5')
                }}
                style={{backgroundColor:signalInterval=='5'?'blue':'grey',width:50,height:30,alignItems:'center',justifyContent:'center',borderRadius:5}}>
                    <Text style={{color:colors.selected}}>5m</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => {
                  //setLd2(1)
                  setSignalInterval('15')
                  //SignalInfo(symSignal,'15')
                }}
                style={{backgroundColor:signalInterval=='15'?'blue':'grey',width:50,height:30,alignItems:'center',justifyContent:'center',borderRadius:5}}>
                    <Text style={{color:colors.selected}}>15m</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => {
                  //setLd2(1)
                  setSignalInterval('30')
                  //SignalInfo(symSignal,'30')
                }}
                style={{backgroundColor:signalInterval=='30'?'blue':'grey',width:50,height:30,alignItems:'center',justifyContent:'center',borderRadius:5}}>
                    <Text style={{color:colors.selected}}>30m</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => {
                  //setLd2(1)
                  setSignalInterval('60')
                  //SignalInfo(symSignal,'60')
                }}
                style={{backgroundColor:signalInterval=='60'?'blue':'grey',width:50,height:30,alignItems:'center',justifyContent:'center',borderRadius:5}}>
                    <Text style={{color:colors.selected}}>1H</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => {
                  //setLd2(1)
                  setSignalInterval('240')
                  //SignalInfo(symSignal,'60')
                }}
                style={{backgroundColor:signalInterval=='240'?'blue':'grey',width:50,height:30,alignItems:'center',justifyContent:'center',borderRadius:5}}>
                    <Text style={{color:colors.selected}}>4H</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => {
                  //setLd2(1)
                  setSignalInterval('1440')
                  //SignalInfo(symSignal,'60')
                }}
                style={{backgroundColor:signalInterval=='1440'?'blue':'grey',width:50,height:30,alignItems:'center',justifyContent:'center',borderRadius:5}}>
                    <Text style={{color:colors.selected}}>1D</Text>
                </TouchableOpacity>
                    
                      </View>    
        {!Loading?<Text style={{color:'white',fontSize:20}}>{'\n\n\n\n\n\n\n\n\n\n\n\n'}                       No Signals Currently</Text>:null}
        </View>
        :
      <View style={{marginTop:10,marginHorizontal:5}}>
         <View style={{flexDirection:'row',marginVertical:5,alignItems: 'center',justifyContent: 'space-between',alignSelf: 'center',paddingHorizontal:5
  ,backgroundColor:'#fff',width:'94%',borderRadius:30,elevation:5,paddingLeft:10}}>
    <TextInput
    style={{width:'80%'}}
    value={signalSearch}
    onChangeText={(val) =>setSignalSearch(val)}
    placeholder='Enter Currency Name'
    />
    <TouchableOpacity style={{padding:5,}} onPress={()=>{callApi()}}>
    <Ionicons name={"refresh"} size={Search?30:25} color={colors.selectednew}   style={{marginRight:10}} /> 
    </TouchableOpacity>
    <Ionicons name={Search?"ios-close-outline":"search-outline"} size={Search?30:25} color={colors.selectednew}   /> 
  </View>

  {bolg?<View style={{width:'100%'}}>

<View style={{marginTop:10,borderColor:'#fff',marginHorizontal:0}}>
      <View style={{flexDirection:'row',paddingVertical:5,borderWidth:0.5,borderColor:'#fff',backgroundColor:'transparent',paddingHorizontal:5}}>
  <Text style={{color:'#fff',fontWeight: 'bold',fontSize:20,flex:0.25,borderRightWidth:0.5,borderColor:'#fff',}}>Coin</Text>
  <Text style={{color:'#fff',fontWeight: 'bold',fontSize:20,flex:0.55,marginLeft:10,borderColor:'#fff',borderRightWidth:0.5}}>Bollinger Level</Text>
  <Text style={{color:'#fff',fontWeight: 'bold',fontSize:20,flex:0.20,marginLeft:10}}>Signal</Text>
  </View>

 
  {/* {console.log('data is: '+JSON.stringify(Data))} */}
 {(Data!==null&& Data!==undefined) ? renderlist():null}
 </View>
 </View>
 :
  <View style={{width:'100%'}}>
       <View style={{flexDirection:'row',justifyContent: 'space-between',width:'96%',alignItems: 'center',marginVertical:10}}>
    <View style={{flexDirection:'column',justifyContent: 'space-between',width:'70%',alignItems: 'center',}}>
      <TextInput style={{width:'70%',borderRadius:10,paddingLeft:10,padding:5,color:'#000',backgroundColor:'#fff'}}
      placeholder="Enter RSI Value !"
      keyboardType={'number-pad'}
      value={rsiRange}
      onChangeText={(val) =>{setRsiRange(val)}}

      />
       <View style={{flexDirection:'row',justifyContent: 'space-between',width:'60%',alignItems: 'center',marginTop:15}}>
      <TouchableOpacity onPress={()=>{setSmall(true)}} style={{width:70,height:25,borderRadius:20,backgroundColor:small?colors.binanceylw2:'grey',alignItems: 'center',justifyContent: 'center'}}>
        <Text style={{color:'#000'}}>Lesser</Text></TouchableOpacity>
      <TouchableOpacity onPress={()=>{setSmall(false)}} style={{width:70,height:25,borderRadius:20,backgroundColor:!small?colors.binanceylw2:'grey',alignItems: 'center',justifyContent: 'center'}}>
        <Text style={{color:'#000'}}>Greater</Text></TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={()=>ShowResults()}
      style={{width:100,height:50,borderRadius:5,backgroundColor:'#40e3cd',alignItems: 'center',justifyContent: 'center'}}>
        <Text style={{color:'#000'}}>Show Results</Text></TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row',justifyContent: 'space-around',width:'96%',marginTop:5,
                alignSelf: 'center',justifyContent: 'space-around',
              }}>
                <TouchableOpacity 
                onPress={() => {
                  //setLd2(1)
                  setSignalInterval('1')
                  //SignalInfo(symSignal,'1')
                }}
                style={{backgroundColor:signalInterval=='1'?'blue':'grey',width:50,height:30,alignItems:'center',justifyContent:'center',borderRadius:5}}>
                    <Text style={{color:colors.selected}}>1m</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => {
                  //setLd2(1)
                  setSignalInterval('5')
                  //SignalInfo(symSignal,'5')
                }}
                style={{backgroundColor:signalInterval=='5'?'blue':'grey',width:50,height:30,alignItems:'center',justifyContent:'center',borderRadius:5}}>
                    <Text style={{color:colors.selected}}>5m</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => {
                  //setLd2(1)
                  setSignalInterval('15')
                  //SignalInfo(symSignal,'15')
                }}
                style={{backgroundColor:signalInterval=='15'?'blue':'grey',width:50,height:30,alignItems:'center',justifyContent:'center',borderRadius:5}}>
                    <Text style={{color:colors.selected}}>15m</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => {
                  //setLd2(1)
                  setSignalInterval('30')
                  //SignalInfo(symSignal,'30')
                }}
                style={{backgroundColor:signalInterval=='30'?'blue':'grey',width:50,height:30,alignItems:'center',justifyContent:'center',borderRadius:5}}>
                    <Text style={{color:colors.selected}}>30m</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => {
                  //setLd2(1)
                  setSignalInterval('60')
                  //SignalInfo(symSignal,'60')
                }}
                style={{backgroundColor:signalInterval=='60'?'blue':'grey',width:50,height:30,alignItems:'center',justifyContent:'center',borderRadius:5}}>
                    <Text style={{color:colors.selected}}>1H</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => {
                  //setLd2(1)
                  setSignalInterval('240')
                  //SignalInfo(symSignal,'60')
                }}
                style={{backgroundColor:signalInterval=='240'?'blue':'grey',width:50,height:30,alignItems:'center',justifyContent:'center',borderRadius:5}}>
                    <Text style={{color:colors.selected}}>4H</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => {
                  //setLd2(1)
                  setSignalInterval('1440')
                  //SignalInfo(symSignal,'60')
                }}
                style={{backgroundColor:signalInterval=='1440'?'blue':'grey',width:50,height:30,alignItems:'center',justifyContent:'center',borderRadius:5}}>
                    <Text style={{color:colors.selected}}>1D</Text>
                </TouchableOpacity>
                    
                      </View>   
  <View style={{marginTop:10,borderColor:'#fff',marginHorizontal:0}}>
      <View style={{flexDirection:'row',paddingVertical:5,borderWidth:0.5,borderColor:'#fff',backgroundColor:'transparent',paddingHorizontal:5}}>
  <Text style={{color:'#fff',fontWeight: 'bold',fontSize:20,flex:0.45,borderRightWidth:0.5,borderColor:'#fff',}}>Coin</Text>
  <Text style={{color:'#fff',fontWeight: 'bold',fontSize:20,flex:0.5,marginLeft:10,borderColor:'#fff',}}>RSI Value</Text>
  {/* <Text style={{color:'#fff',fontWeight: 'bold',fontSize:15,flex:0.25,marginLeft:10}}>Signal</Text> */}
  </View>

 
  {/* {console.log('data is: '+JSON.stringify(Data))} */}
 {(RSIData!==null&& RSIData!==undefined) ? renderlist2():null}
 </View></View>}

  </View>
}
<View>
         <Modal onBackButtonPress={toggleModal}  statusBarTranslucent ={true} deviceHeight={1000}  
         onBackdropPress={toggleModal} isVisible={isModalVisible}   >               
                <View style={{width:350,backgroundColor:'#203040',flexDirection:'column',justifyContent:'space-around',paddingHorizontal:15,paddingVertical:15,borderWidth:0.5,borderColor:'#70707070',borderRadius:10,borderBottomWidth:0}}>
                    
                    <Text style={[styles.text_footer,{textAlign:'center',color:colors.selected}]}>Are you sure you want to stop the Bot?</Text>
                   
                    <View style={{flexDirection:'row',justifyContent: 'space-around',alignItems: 'flex-end',width:'100%'}}>
                    <TouchableOpacity onPress={()=>{toggleModal()}}>
                        <View style={{marginTop:5,alignSelf: 'center',justifyContent: 'center',alignItems: 'center',borderRadius:5}}>
                            <Text style={{color:colors.hdl,fontWeight:'bold',fontSize:17}}>Cancel</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{Push_btn(symbol)}}>
                        <View style={{marginTop:5,alignSelf: 'center',justifyContent: 'center',alignItems: 'center',borderRadius:5}}>
                            <Text style={{color:'#f5f5f5',fontWeight:'bold',fontSize:17}}>Confirm</Text>
                        </View>
                    </TouchableOpacity>
                    </View>
                </View>
                
       
            </Modal>
      </View>
        </Animatable.View>
        </ImageBackground >
      
      
)
        
}


export default SignalTrading;

const styles1 = StyleSheet.create({
    container: {
      flex: 1,
  
      backgroundColor: '#0B1725',
    },
    userType: {
      width: 320,
  
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: 20,
      shadowColor: 'black',
      marginTop: 10,
      flexDirection: 'row',
    },
    Rate: {
      color: '#ffff',
      fontSize: 14,      
      fontFamily:global.bold,
      
    },
    textInput: {
      marginLeft: 15,
      marginTop: -15,
      paddingBottom: -10,
    },
    text_header: {
      color: '#f8f8f8f8',
      fontFamily:global.bold,
      fontSize: 17,
    },
    action: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      //   borderBottomWidth: 0.5,
      //   borderBottomColor: '#80808080',
  
      paddingHorizontal: 8,
      paddingVertical: 15,
    },
    text_footer: {
      color: '#b9b9b9b9',
      fontWeight: '400',
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
    Title: {
      fontSize: 13,
      fontFamily:global.bold,
      color: '#d5d5d5d5',
    },
    textSign: {
      fontSize: 18,
      fontFamily:global.bold,
      color: '#fff',
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
      fontFamily:global.bold,
    },
  });
  