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

// import * as firebase from 'firebase';
var arr=[];
const TopEarners = ({ navigation }) => {
  const {colors}=useTheme();
  const theme=useTheme();
  // const {theme}=useTheme();
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
   






// console.log(colors,"these are the colors")
React.useEffect(()=>{    
        getVals()
            
},[Uid])


async function getVals(){
  
  console.log(parseFloat(global.all_cur),"currency")
  // setIsLoading(false);
  let uid;
  uid = null;
  let pass;
  pass = null;
  let cur1 = null;
  try {
    
    uid=await AsyncStorage.getItem('user_id')
    setUid(uid)
    console.log(uid)
    cur1=await AsyncStorage.getItem("main_cur")
    console.log("this is the cur",cur1)
    setCurrency(cur1)
    global.global_cur=cur1;
    pass=await AsyncStorage.getItem('req_pass');
  
   


    // callApi(uid)
    
  callApi(uid,'day')    
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

const callApi=async(uid,type)=>{
  
        let url5=global.BASE_URL+"css_mob/user_list_payout.aspx?uid="+uid+'&type='+type;
      console.log(url5)
      fetch(url5)
      .then(item => item.json())
      .then(Vdta => {          
        
        // console.log(Vdta)
        setData(Vdta)
        
      
      })
      
        setRefreshing(false)
    
   
}
 
function SendToInner(from, name, val,price) {
    navigation.navigate('TradeReview', {fname: from, name: name, id: val,price:price});
  }  
  
  const CheckSort = val => {
    setSrt(val);
    if (val === 'NAME') {
      setSortName(DATA.sort((a, b) => a.Name.localeCompare(b.Name)));
    } else if (val === 'PRICE') {
      setSortName(DATA.sort((a, b) => parseFloat(a.Rate) < parseFloat(b.Rate)));
    } else if (val === 'RELEVANCE') {
      setSortName('');
    }
    refRBSheet.current.close()
  };

 

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
       
        <ImageBackground source={global.bgimg} resizeMode={'stretch'} style={[styles.container,{paddingTop:40}]}>
        <ImageBackground source={require('../assets/botz/to-bg.png')} resizeMode='stretch' style={[styles.header,{flex:1.7}]}>
           <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                
                <View  style={{felx:1,width:'100%',paddingVertical:5}}>
                      <Text style={styles.heading}>Top Payout Earners </Text>
                </View>
              
          </View>
            {/* <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                <TouchableOpacity onPress={()=>{setDay(true),setWeek(false),setMnt(false),callApi(Uid,'day')}}>
                  <ImageBackground source={Day?require('../assets/botz/week.png'):null} resizeMode={'contain'} style={{felx:1,width:90,paddingVertical:5}}>
                        <Text style={styles.sheading}>TODAY</Text>
                  </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setDay(false),setWeek(true),setMnt(false),callApi(Uid,'week')}}>
                  <ImageBackground source={Week?require('../assets/botz/week.png'):null} resizeMode={'contain'} style={{felx:1,width:90,paddingVertical:5}}>
                        <Text style={styles.sheading}>WEEK</Text>
                  </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setDay(false),setWeek(false),setMnt(true),callApi(Uid,'month')}}>
                  <ImageBackground source={Mnt?require('../assets/botz/week.png'):null} resizeMode={'contain'} style={{felx:1,width:90,paddingVertical:5}}>
                        <Text style={styles.sheading}>MONTH</Text>
                  </ImageBackground>
                </TouchableOpacity>
            </View> */}
{/*  */}
<View style={{flexDirection:'row',justifyContent:'space-around',marginVertical:25,marginTop:45}}>
                <View style={{flexDirection:'column',justifyContent:'center',alignSelf: 'center',marginTop:40}}>
                <View style={{backgroundColor:colors.binanceylw2,padding:10,paddingHorizontal:17,borderRadius:50,position:"absolute",alignSelf: 'center',justifyContent: 'center',top:-20}}><Text style={{fontWeight:'bold',fontSize:20,fontWeight:'bold'}}>2</Text></View>
                    {/* <Image source={require('../assets/botz/arrw1.png')} resizeMode={'contain'} style={{alignSelf:'center',marginVertical:5}}/> */}
                    <ImageBackground source={require('../assets/botz/b2.png')} resizeMode={'stretch'} style={{width:100,alignItems: 'center',height:160,paddingTop:35}}>
                      <Image source={require('../assets/logom.png')} resizeMode={'contain'} style={{width:60,height:60}} />
                      <Text style={[styles.text,{textAlign:'center',color:'#fff'}]}>{Data&&Data[1].name}</Text>   
                    </ImageBackground>
                                     
                </View>
                <View style={{flexDirection:'column',justifyContent:'center',alignSelf: 'center',marginHorizontal:-25,zIndex:99999,marginTop:-60,}}>
                <View style={{backgroundColor:colors.binanceylw2,padding:10,paddingHorizontal:17,borderRadius:50,position:"absolute",alignSelf: 'center',justifyContent: 'center',top:-20}}><Text style={{fontWeight:'bold',fontSize:20,fontWeight:'bold'}}>1</Text></View>
                    {/* <Image source={require('../assets/botz/king.png')} resizeMode={'contain'} style={{width:35,height:35,alignSelf:'center',marginVertical:5}}/> */}
                    <ImageBackground source={require('../assets/botz/b1.png')} resizeMode='stretch' style={{width:110,alignItems: 'center',height:190,paddingTop:35}}>
                      <Image source={require('../assets/logom.png')} resizeMode={'contain'} style={{width:80,height:80}} />
                      <Text style={[styles.text,{textAlign: 'center',color:'#fff'}]}>{Data&&Data[0].name}</Text>
                    </ImageBackground>
                    
                    
                </View>
                <View style={{flexDirection:'column',justifyContent:'center',alignSelf: 'center',marginTop:30}}>
                <View style={{backgroundColor:colors.binanceylw2,padding:10,paddingHorizontal:17,borderRadius:50,position:"absolute",alignSelf: 'center',justifyContent: 'center',top:-20}}><Text style={{fontWeight:'bold',fontSize:20,fontWeight:'bold'}}>3</Text></View>
                    {/* <Image source={require('../assets/botz/arrw2.png')} resizeMode={'contain'} style={{alignSelf:'center',marginVertical:5}}/> */}
                    <ImageBackground source={require('../assets/botz/b2.png')} resizeMode='stretch' style={{width:100,alignItems: 'center',height:160,paddingTop:35}}>
                      <Image source={require('../assets/logom.png')} resizeMode={'contain'} style={{width:60,height:60}} />
                      <Text style={[styles.text,{textAlign:'center',color:'#fff'}]}>{Data&&Data[2].name}</Text>
                    </ImageBackground>
                    
                    
                </View>
            </View>
        </ImageBackground>
       
        
    <Animatable.View
            animation="fadeInUpBig"
            delay={300}
            useNativeDriver={true}
            style={[styles.footer,{paddingHorizontal:10,borderTopLeftRadius:50,borderTopRightRadius:50}]}>
        
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:15,paddingTop:15,alignItems: 'center',marginBottom:10}}> 
        {/* <View style={{flexDirection:'row',justifyContent:'space-between',width:'40%',paddingBottom:10,paddingLeft:20,borderBottomWidth:2,borderBottomColor:colors.hdl}}>            
                    <Text style={[styles1.heading,{color:colors.hgl,fontSize:18,fontWeight: 'bold'}]}>Leader Board</Text>                            
        </View> */}
        
    </View>
        <View style={{flexDirection:'row',justifyContent: 'space-around',paddingBottom:15,display:'none'}}>
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
           
           
        </View>
        
        

        <FlatList
          horizontal={false}
          ListEmptyComponent={EmptyList}
          data={Data}
          showsVerticalScrollIndicator={false}          
          keyExtractor={(item,index) => index}
          renderItem={({item, index}) => (
            // item.SName===global.global_cur?null:
            <View>
            <View  style={{marginVertical:3,width:'100%',alignSelf: 'center',borderRadius:5,flexDirection:'row',alignItems: 'center',paddingVertical:5,justifyContent: 'space-between',borderBottomWidth:0.5,borderBottomColor:'grey'}}>                                                
               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems: 'center',alignSelf: 'flex-start',marginLeft:15,width:200}}>
                <View>
                  <Text style={{fontWeight:'bold',fontSize:18,color:colors.selected}}>#{index+1}</Text>
                </View>                                                    
                <Image source={{uri:item.image}} resizeMode={'contain'} style={{width:50,height:50}} />
                <View style={{flexDirection:'column',justifyContent: 'center'}}>
                <Text style={{fontWeight:'bold',fontSize:15,width:100,color:colors.selected}}>{item.name}</Text>                   

                </View>
                </View>
                <View  style={{backgroundColor:'#4a9529',borderRadius:50,width:90,padding:5,marginRight:15,alignItems: 'center',flexDirection:'row',justifyContent: 'space-evenly'}}>
                <Image source={require('../assets/botz/star.png')} style={{width:15,height:15,marginRight:5}} />
                      <Text style={[styles.sheading,{fontSize:12}]}>{item.profit} $</Text>
                </View>
            </View>
            </View>
          )}
        />

          
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
    </ImageBackground>
    
)
        
}


export default TopEarners;

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
  