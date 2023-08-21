/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable css_mob/jsx-no-duplicate-props */
/* eslint-disable css_mob/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import { ThemeProvider, useFocusEffect, useIsFocused,useTheme } from '@react-navigation/native';
import { View, Text, Button, Dimensions, TouchableOpacity, StyleSheet,RefreshControl, Image, StatusBar, FlatList, ScrollView, TextInputComponent, TextInput, Alert, ActivityIndicator,BackgroundImage, ImageBackground,Clipboard,ToastAndroid } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import IonIcons from 'react-native-vector-icons/Ionicons'
import LottieView from 'lottie-react-native';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from "react-native-raw-bottom-sheet";
import AsyncStorage from '@react-native-async-storage/async-storage';
import global from '../component/global'

// import Rates from '../component/Rates'
import styles from '../component/styles'
import { indexOf } from 'lodash';

import { color } from 'react-native-reanimated';
import { stat } from 'react-native-fs';

// import * as firebase from 'firebase';
var arr=[];
const TopEarnersSuperbot = ({ navigation }) => {
  const {colors}=useTheme();
  const theme=useTheme();
  // const {theme}=useTheme();
  const [status, setStatus] = React.useState('daily');
  // const [changed, setChanged] = React.useState('false');
   
  const [statusDL, setStatusDL] = React.useState('Live');
    const isFocused = useIsFocused();
   const[MyVersion,setMyVersion]= React.useState('1.0')
   const[Uid,setUid]= React.useState('')
   const[BTC,setBTC]= React.useState('')
   const[BTT,setBTT]= React.useState('')
   const[BNB,setBNB]= React.useState('')
   const[XRP,setXRP]= React.useState('')
   const[ETH,setETH]= React.useState('')
   const[TRX,setTRX]= React.useState('')
   const[PINK,setPINK]= React.useState('')
   const[LTC,setLTC]= React.useState('')
   const[DASH,setDASH]= React.useState('')
   const[USDT,setUSDT]= React.useState('')
   const[Port,setPort]= React.useState('')
   const [Symbol,setSymbol]= React.useState('')
   const [currency,setCurrency]= React.useState('')   
   const[Wallet,setWallet]= React.useState('')
   const [SortName, setSortName] = React.useState('');
   const [Search, setSearch] = React.useState(false);
   const [isModalVisible, setModalVisible] = React.useState(false);
   const[DogeCoin,setDogeCoin]= React.useState('')
   const[EYE,setEYE]= React.useState(false)   
   const[Loading,setLoading]= React.useState(false)
   const[Day,setDay]= React.useState(true)
   const[Week,setWeek]= React.useState(false)
   const[Mnt,setMnt]= React.useState(false)
   const [refreshing, setRefreshing] = React.useState(false);
   const refRBSheet = React.useRef();
   const refRBSheet1 = React.useRef();
   const [Srt, setSrt] = React.useState('RELEVANCE');
   const [Data, setData] = React.useState('');
   const [TtlAcc, setTtlAcc] = React.useState('');

   const [Bal, setBal] = React.useState({
     btc:'',
     btt:'',
     bnb:'',
     doge:'',
     eth:'',
     trx:'',
     xrp:'',
     dash:'',
     ltc:'',
     usd:'',
     pink:'',
   });
   const [ReqPass, setReqPass] = React.useState(false);    
   const [Inp_txt, setInp_txt] = React.useState('');
   let apiCalledAlready=false



// console.log(colors,"these are the colors")
// React.useEffect(()=>{   
//   console.log('from useeffect');

//   getVals()
 
  
// },[])

React.useEffect(() => {
  console.log('calling fromo use effect',global.notHit);
  // if(!global.notHit){
    console.log('calling api should 2',global.notHit);
    callApi(global.uid,status,statusDL.toLowerCase())
  // }
},[status,statusDL])

useFocusEffect(
  React.useCallback(() => {
    let isMounted = true
   if(isMounted) {
       setStatus('daily')
        setStatusDL('Live')
    console.log('from usefocuseffect');
     getVals('focus')
   }

    return  ()=>{
      isMounted=false
    }
  }, []),
);

async function getVals(){
  
  // console.log(parseFloat(global.all_cur),"currency")
  // setIsLoading(false);
  let uid;
  uid = null;
  // let pass;
  // pass = null;
  // let cur1 = null;
  try {
    
    // uid=await AsyncStorage.getItem('user_id')
    // setUid(uid)
    // console.log(uid)
    // cur1=await AsyncStorage.getItem("main_cur")
    // console.log("this is the cur",cur1)
    // setCurrency(cur1)
    // global.global_cur=cur1;
    // pass=await AsyncStorage.getItem('req_pass');
    // console.log('calling from getvals');

   
    // setChanged(false)
   
      console.log('calling api should');
      callApi(global.uid,'daily','live','notHit')    
  
   


    // callApi(uid)
    
  
  }
  catch (e) {
      console.log(e);
  }
}


const onRefresh = React.useCallback(async () => {
  console.log(parseFloat(BTC.current_price)*parseFloat(global.all_cur))
    setRefreshing(true);
    // callApi(Uid)
    LiveRate()

})



const callApi=async(uid,type,mode,from)=>{
      // apiCalledAlready=true
      
      let url5=global.BASE_URL+"css_mob/user_list_sb.aspx?uid="+uid+'&type='+type+'&mode='+mode;
      console.log(url5)
      fetch(url5)
      .then(item => item.json())
      .then(Vdta => {          
        
        // console.log(url5+'    ok')
        setData(Vdta)
        setTimeout(() => {
        if(from=='notHit'){
          global.notHit = false
        }
      }, 2000);
          
        //   // apiCalledAlready=false
        
      }).catch(e=>{
        // apiCalledAlready=false
        
      })
      
        setRefreshing(false)
    
   
}
 
function SendToInner(from, name, val,price) {
    navigation.navigate('TradeReview', {fname: from, name: name, id: val,price:price});
  }  
  
  // const CheckSort = val => {
  //   setSrt(val);
  //   if (val === 'NAME') {
  //     setSortName(DATA.sort((a, b) => a.Name.localeCompare(b.Name)));
  //   } else if (val === 'PRICE') {
  //     setSortName(DATA.sort((a, b) => parseFloat(a.Rate) < parseFloat(b.Rate)));
  //   } else if (val === 'RELEVANCE') {
  //     setSortName('');
  //   }
  //   refRBSheet.current.close()
  // };

 

  const handleSearch =(text)=>{
    setInp_txt(text);
    const formattedQuery = text.toLowerCase();       
    // console.log(formattedQuery)
    DATA.map(todo_inside => 
      {
        let nme=todo_inside.SName.toLowerCase()
        // console.log(nme)
          if(nme.includes(formattedQuery)){
            console.log(nme, formattedQuery,"hello")
            arr.push(todo_inside)
          }
          
      }   
          )
          
   setData(arr)
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const EmptyList=()=>(
        
    <View style={{flexDirection:'column',justifyContent: 'center',height:'100%',backgroundColor:colors.background}} ><ActivityIndicator size={'small'} color={colors.selected} /></View>
        
)

    return (
       
        <View //source={require('../assets/images/bgv.png')}  resizeMode={'stretch'} 
        style={[styles.container,{paddingTop:10,backgroundColor:'#000'}]}>
          <ScrollView style={{}}>

         
        <View  style={[styles.header,{flex:1.7}]}>
          <Image source={require('../assets/images/stone.png')}
          resizeMode={'contain'}
          style={{width:'94%',alignSelf:'center',height:200,position:'absolute',top:-30,}}
          />
           <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                
                <View  style={{felx:1,width:'100%',paddingVertical:5}}>
                      <Text style={[styles.heading,{fontWeight:'bold',fontSize:20}]}>PROFIT EARNERS </Text>
                </View>
              
          </View>
          
          
{Data&& Data.length>0?<View style={{flexDirection:'row',justifyContent:'space-around',marginVertical:0,marginTop:45}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems: 'center',width:'90%',paddingHorizontal:5}}>
                  {Data && Data[1]&&<ImageBackground source={require('../assets/images/circle.png')} resizeMode='stretch' 
                  style={{width:87,height:82,justifyContent:'center',alignItems: 'center',flexDirection:'column',top:15}}>
                    <Image source={require('../assets/logom.png')} resizeMode="stretch" style={{width:53,height:45,top:8}}/>
                    <Text style={{fontSize:12,fontWeight:'bold',color:colors.selected,top:30,textAlign:'center'}} numberOfLines={1}>{Data&&Data[1].name}</Text>
                    {/* <Text style={{fontSize:15,fontWeight:'bold',color:colors.selected,backgroundColor:'grey',padding:10,borderRadius:50,paddingHorizontal:17,top:75}}>2</Text> */}
                    
                  </ImageBackground>}
                  {Data && Data[0]&&<ImageBackground source={require('../assets/images/circle.png')} resizeMode='stretch' 
                  style={{width:102,height:98,top:-30,justifyContent:'center',alignItems: 'center',flexDirection:'column'}}>
                  <Image source={require('../assets/logom.png')} resizeMode="stretch" style={{width:70,height:63,top:11}}/>
                  <Text style={{fontSize:12,fontWeight:'bold',color:colors.selected,top:30,textAlign:'center'}} numberOfLines={1}>{Data&&Data[0].name}</Text>
                    {/* <Text style={{fontSize:15,fontWeight:'bold',color:colors.selected,backgroundColor:'green',padding:10,borderRadius:50,paddingHorizontal:17,top:85}}>1</Text> */}
                  </ImageBackground>}
                {Data && Data[2]&&  <ImageBackground source={require('../assets/images/circle.png')} resizeMode='stretch' 
                style={{width:87,height:82,justifyContent:'center',alignItems: 'center',flexDirection:'column',top:40}}>
                    <Image source={require('../assets/logom.png')} resizeMode="stretch" style={{width:53,height:45,top:8}}/>
                    <Text style={{fontSize:12,fontWeight:'bold',color:colors.selected,top:30,textAlign:'center'}} numberOfLines={1}>{Data&&Data[2].name}</Text>
                    {/* <Text style={{fontSize:15,fontWeight:'bold',color:colors.selected,backgroundColor:'grey',padding:10,borderRadius:50,paddingHorizontal:17,top:75}}>3</Text> */}
                    
                  </ImageBackground>}
                </View>
            </View>:null}
            {Data && Data.length>0?<Image source={require('../assets/images/boxRank.png')}
            style={{width:'94%',height:150,alignSelf:'center',marginTop:-15}}
            resizeMode={'stretch'}
            />:null}
        </View>
       
        
    <Animatable.View
            animation="fadeInUpBig"
            delay={300}
            useNativeDriver={true}
            style={[styles.footer,{paddingHorizontal:10,borderTopLeftRadius:50,borderTopRightRadius:50}]}>
        
        {/* <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:15,paddingTop:40,alignItems: 'center',marginBottom:20}}>  */}
        {/* <View style={{flexDirection:'row',justifyContent:'space-between',width:'40%',paddingBottom:10,paddingLeft:20,borderBottomWidth:2,borderBottomColor:colors.hdl}}>            
                    <Text style={[styles1.heading,{color:colors.hgl,fontSize:18,fontWeight: 'bold'}]}>Leader Board</Text>                            
        </View> */}
        
    {/* </View> */}
        {/* <View style={{flexDirection:'row',justifyContent: 'space-around',paddingBottom:15,display:'none'}}>
            <View style={{borderWidth:0.5,borderColor:'#90909090',borderRadius:10,flexDirection:'row',justifyContent:'flex-start',height:45}}>
                <TextInput
                                placeholder="Search Circle"
                                keyboardType='default'                                                              
                                style={styles.textInput}
                                autoCapitalize="none"
                                onChangeText={(val)=>{arr=[],handleSearch(val)}}
                                value={Inp_txt}
                                onFocus={()=>{setSearch(true)}}
                                width={'95%'}                               
                                placeholderTextColor={'#D3D3D3'}
                                selectionColor='#808080'
                                color={colors.text}
                                height={'100%'}
                            />
                <TouchableOpacity activeOpacity={!Search?1:0.2} style={{position: 'absolute',right:'3%',top:5}} onPress={()=>{Search?(setInp_txt(''),arr=[],setSearch(false)):null}}>
                <Text  style={{textAlignVertical:'center',}}>   <Ionicons name={Search?"ios-close-outline":"search-outline"} size={Search?30:25} color={colors.hgl}   /> </Text> 
                </TouchableOpacity>

                
            </View>
           
           
        </View> */}
        
        <View style={{width:'100%',alignSelf:'center',top:-5}}>
            <View  style={{flexDirection:'row',justifyContent:'space-around',
            marginVertical:0,width:'100%',height:40,alignItems:'center'}} resizeMode="stretch">
                 
                  {/* <ImageBackground 
                  source={statusDL=='Live'?require('../assets/botz/tab-active-btnw.png'):require('../assets/botz/tab-active-btnb.png')} resizeMode="stretch" 
                  > */}
                  <TouchableOpacity onPress={()=>{setStatusDL('Live')}}>
                  <LinearGradient colors={statusDL=='Live'?['#1e8105', '#155d03', '#0a3100']:['#343d4e', '#2d3443', '#1a1f28']} 
                  style={{width:100,borderRadius:20,height:30,alignItems:'center',justifyContent:'center'}}>

                     <Text style={{color:'#fff',fontWeight:'bold',paddingHorizontal:15,paddingVertical:5,fontSize:15}}>LIVE</Text>
                  </LinearGradient>
                 </TouchableOpacity>
                  {/* </ImageBackground> */}
                  {/* <ImageBackground source={statusDL=='Demo'?require('../assets/botz/tab-active-btnw.png'):require('../assets/botz/tab-active-btnb.png')} resizeMode="stretch" 
                  style={{width:90,height:35,alignItems:'center',justifyContent:'center'}}> */}
                  <TouchableOpacity onPress={()=>{setStatusDL('Demo')}}  >
                  <LinearGradient colors={statusDL=='Demo'?['#1e8105', '#155d03', '#0a3100']:['#343d4e', '#2d3443', '#1a1f28']} 
                  style={{width:100,borderRadius:20,height:30,alignItems:'center',justifyContent:'center'}}>

                     <Text style={{color:'#fff',fontWeight:'bold',paddingHorizontal:15,paddingVertical:5,fontSize:15}}>DEMO</Text>
                </LinearGradient>
                 </TouchableOpacity>
                  {/* </ImageBackground> */}
                
             </View>
            <View
            style={{flexDirection:'row',justifyContent:'space-around',marginVertical:10,marginTop:5,
            width:'100%',height:40,alignItems:'center'}} resizeMode="stretch">
                  {/* <ImageBackground source={status=='daily'?require('../assets/botz/tab-active-btnw.png'):require('../assets/botz/tab-active-btnb.png')} resizeMode="stretch" style={{width:80,height:45,alignItems:'center',justifyContent:'center'}}> */}
                  <TouchableOpacity onPress={()=>{setStatus('daily')}}>
                  <LinearGradient colors={status=='daily'?['#bbbbbb', '#d7d7d7', '#fcfcfc']:['#313232', '#242527', '#131619']}
                  style={{width:80,height:30,alignItems:'center',justifyContent:'center',borderRadius:5}}
                  >

                     <Text style={{color:status==='daily'?'#000':'#fff',fontWeight:'bold',paddingHorizontal:5,paddingVertical:5,borderRadius:5}} numberOfLines={1}>{status==='daily'?'Daily':'D'}</Text>
                  </LinearGradient>
                 </TouchableOpacity>
                  {/* </ImageBackground> */}
                  {/* <ImageBackground source={status=='yesterday'?require('../assets/botz/tab-active-btnw.png'):require('../assets/botz/tab-active-btnb.png')} resizeMode="stretch" style={{width:80,height:45,alignItems:'center',justifyContent:'center'}}> */}
                  <TouchableOpacity onPress={()=>{setStatus('yesterday')}}>
                  <LinearGradient colors={status=='yesterday'?['#bbbbbb', '#d7d7d7', '#fcfcfc']:['#313232', '#242527', '#131619']}
                  style={{width:80,height:30,alignItems:'center',justifyContent:'center',borderRadius:5}}
                  >
                     <Text style={{color:status==='yesterday'?'#000':'#fff',fontWeight:'bold',paddingHorizontal:5,paddingVertical:5,borderRadius:5}} numberOfLines={1}>{status==='yesterday'?'Yesterday':'Y'}</Text>
                  </LinearGradient>
                </TouchableOpacity>
                  {/* </ImageBackground> */}
                  {/* <ImageBackground source={status=='monthly'?require('../assets/botz/tab-active-btnw.png'):require('../assets/botz/tab-active-btnb.png')} resizeMode="stretch" style={{width:80,height:45,alignItems:'center',justifyContent:'center'}}> */}
                  <TouchableOpacity onPress={()=>{setStatus('monthly')}}>
                  <LinearGradient colors={status=='monthly'?['#bbbbbb', '#d7d7d7', '#fcfcfc']:['#313232', '#242527', '#131619']}
                  style={{width:80,height:30,alignItems:'center',justifyContent:'center',borderRadius:5}}
                  >
                     <Text style={{color:status==='monthly'?'#000':'#fff',fontWeight:'bold',paddingHorizontal:5,paddingVertical:5,borderRadius:5}} numberOfLines={1}>{status==='monthly'?'Monthly':'M'}</Text>
                 </LinearGradient>
                 </TouchableOpacity>
                  {/* </ImageBackground> */}
                  {/* <ImageBackground source={status=='total'?require('../assets/botz/tab-active-btnw.png'):require('../assets/botz/tab-active-btnb.png')} resizeMode="stretch" style={{width:80,height:45,alignItems:'center',justifyContent:'center'}}> */}
                  <TouchableOpacity onPress={()=>{setStatus('total')}}>
                  <LinearGradient colors={status=='total'?['#bbbbbb', '#d7d7d7', '#fcfcfc']:['#313232', '#242527', '#131619']}
                  style={{width:80,height:30,alignItems:'center',justifyContent:'center',borderRadius:5}}
                  >
                     <Text style={{color:status==='total'?'#000':'#fff',fontWeight:'bold',paddingHorizontal:5,paddingVertical:5,borderRadius:5}} numberOfLines={1}>{status==='total'?'Total':'T'}</Text>
                </LinearGradient>
                 </TouchableOpacity>
                  {/* </ImageBackground> */}
                
             </View>
            </View>

       {Data && Data.length>0? <FlatList
          horizontal={false}
          ListEmptyComponent={EmptyList}
          data={Data}
          showsVerticalScrollIndicator={false}          
          keyExtractor={(item,index) => index}
          renderItem={({item, index}) => (
            // item.SName===global.global_cur?null:
            <View>
            <ImageBackground source={require('../assets/images/cardRank.png')} resizeMode='stretch'  
            style={{marginVertical:10,width:'100%',alignSelf: 'center',borderRadius:5,flexDirection:'row',height:70,
            alignItems: 'center',paddingVertical:5,justifyContent: 'space-between'}}>                                                
               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems: 'center',
               alignSelf: 'flex-start',marginLeft:15,width:200}}>
                <View>
                  <Text style={{fontWeight:'bold',fontSize:15,color:colors.selected,margin:10,marginTop:17}}>#{index+1}</Text>
                </View>                                                    
                {/* <Image source={{uri:item.image}} resizeMode={'contain'} style={{width:50,height:50}} /> */}
                <View style={{flexDirection:'column',justifyContent: 'center',marginLeft:20,}}>
                <Text style={{fontWeight:'bold',fontSize:12,width:150,color:colors.selected,marginTop:2}} numberOfLines={1}>{item.name}</Text>                   
                <Text style={{fontWeight:'bold',fontSize:13,width:140,color:colors.selected,}} numberOfLines={1}>{item.cap && 'CAPITAL'} <Text style={{fontWeight:'bold',fontSize:14,color:'#fcea08'}}>- {item.cap}
                </Text>
                </Text>                   

                </View>
                </View>
                <View  style={{width:100,padding:5,marginRight:20,alignItems: 'center',flexDirection:'row',justifyContent: 'space-evenly'}}>
                <Image source={require('../assets/botz/star.png')} style={{width:10,height:10,marginRight:3,tintColor:'#000'}} />
                      <Text style={[styles.sheading,{fontSize:13,color:'#000',fontWeight:'bold'}]}>{parseFloat(item.profit).toFixed(2)} $</Text>
                </View>
            </ImageBackground>
            </View>
          )}
        />:null}

          
              <Modal onBackButtonPress={toggleModal}  statusBarTranslucent ={true} deviceHeight={1000}  onBackdropPress={toggleModal} isVisible={isModalVisible}   animationInTiming={300} animationOutTiming={200}>
                
                <View style={{width:350,height:150,backgroundColor:'#203040',flexDirection:'column',justifyContent:'space-around',paddingHorizontal:15,paddingVertical:15,borderWidth:0.5,borderColor:'#70707070',borderRadius:10,borderBottomWidth:0}}>
                    
                    <Text style={[styles.text_footer,{textAlign:'center',color:colors.selected}]}>Copy Trading Coming soon , Stay Updated!</Text>
                   
                    <View style={{flexDirection:'row',justifyContent: 'space-around',alignItems: 'flex-end',width:'100%'}}>
                    <TouchableOpacity onPress={()=>{toggleModal()}}>
                        <View style={{marginTop:5,alignSelf: 'center',justifyContent: 'center',alignItems: 'center',borderRadius:5}}>
                            <Text style={{color:colors.hdl,fontWeight:'bold',fontSize:17}}>Cancel</Text>
                        </View>
                    </TouchableOpacity>
                   
                    </View>
                </View>
                
       
            </Modal>
        </Animatable.View>
   </ScrollView> 
    </View>
    
)
        
}


export default TopEarnersSuperbot;

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
      fontWeight: 'bold',
      
    },
    textInput: {
      marginLeft: 15,
      marginTop: -15,
      paddingBottom: -10,
    },
    text_header: {
      color: '#f8f8f8f8',
      fontWeight: 'bold',
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
      fontWeight: 'bold',
      color: '#d5d5d5d5',
    },
    textSign: {
      fontSize: 18,
      fontWeight: 'bold',
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
      fontWeight: 'bold',
    },
  });
  