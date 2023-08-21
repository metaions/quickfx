/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable css_mob/jsx-no-duplicate-props */
/* eslint-disable css_mob/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import { ThemeProvider, useFocusEffect, useIsFocused,useTheme,useNavigation } from '@react-navigation/native';
import { View, Text, Button, Dimensions, TouchableOpacity,ToastAndroid, StyleSheet,RefreshControl, Image, StatusBar,FlatListProps, ListRenderItemInfo,  FlatList, ScrollView, TextInputComponent, TextInput, Alert, ActivityIndicator,BackgroundImage, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
// import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import RBSheet from "react-native-raw-bottom-sheet";
// import database from '@react-native-firebase/database';
import { jsonContext } from '../../context/GlobalState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import global from '../../component/global'
// import axios from 'axios';
import Modal from 'react-native-modal';
// import Rates from '../component/Rates'
import styles from '../../component/styles'
import { indexOf } from 'lodash';

import { color } from 'react-native-reanimated';

// import * as firebase from 'firebase';
var arr=[];
var newjson = ''
var Coins='';
var symbol='';
const Top10screen = () => {
  const navigation = useNavigation(); 
  const {colors}=useTheme();
  const theme=useTheme();
  // const {theme}=useTheme();
    const isFocused = useIsFocused();
    const { myjson } = React.useContext(jsonContext);
   const[API_KEY,setAPI_KEY]= React.useState(false)
   const[Uid,setUid]= React.useState(global.uid)
   const[Bal,setBal]= React.useState('')
   const[pchange,setPChange]= React.useState(true)
  
   const [isModalVisible, setModalVisible] = React.useState(false);
   const [Search, setSearch] = React.useState(false);
   const [No_Search, setNo_Search] = React.useState(false);
  
   const[Loading,setLoading]= React.useState(true)
   const [refreshing, setRefreshing] = React.useState(false);
 
   const [Data, setData] = React.useState('');
   const [Sort, setSort] = React.useState('');
   const [NData, setNData] = React.useState('');
    const[renderIt,setRenderIt] = React.useState(false);
  
 
   const [Inp_txt, setInp_txt] = React.useState('');  

useFocusEffect(
  React.useCallback(() => {            
                         
    return  () => {
      
      console.log('cleared already1'),setInp_txt(''),setSearch(false)};
  }, [])
);

const toggleModal = () => {
  setModalVisible(!isModalVisible);
};






useFocusEffect(
  React.useCallback(() => { 
    setRefreshing(true);
    

    // console.log('see results: '+myjson);
    setData(JSON.parse(myjson))
    
    setLoading(false)
    setRefreshing(false)      
    setTimeout(() => {
      setRenderIt(true)
    }, 2000); 
  }, [myjson])
);
function getDifferenceInMinutes(date1, date2) {
  const diffInMs = Math.abs(date2 - date1);
  return diffInMs / (1000 * 60);
}
const StoreApi=(uid)=>{



  global.status='false';
  console.log('set empty Data')
  global.prevtime_market = new Date()


  // let url1=global.BASE_URL+'css_mob/store.aspx?uid='+uid
  // console.log(url1)
  // fetch(url1)
  // .then(item=> item.json())
  // .then(dta=>{
  //   Coins=dta;
  //   global.Store=dta;
  //   //callApi(dta) 
  


}







const onRefresh = React.useCallback(async () => { 
    setRefreshing(true);
    


  setData(JSON.parse(myjson))
  
  setLoading(false)
  setRefreshing(false)
    
})
function SendToInner(sym,img,st,type,strtamt,qty,qty1,inc,bst,avg,usdt,bst1,high,low,prev,ask,bid,iscopy) {  
  if(!global.lg_without_pwd){
    navigation.navigate('TradeReview', {sym:sym,img:img,status:st,type:type,strtamt:strtamt,qty:qty,qty1:qty1,inc:inc,bst:bst,avg:avg,usdt:usdt,bst1:bst1,high:high,low:low,prev:prev,ask:ask,bid:bid,iscopy:iscopy});
    // navigation.navigate('TrdChart', {sym:sym,img:img,status:st,type:type,strtamt:strtamt,qty:qty,qty1:qty1,inc:inc,bst:bst,avg:avg,usdt:usdt,bst1:bst1,high:high,low:low,prev:prev,ask:ask,bid:bid});
   
  }else{
    ToastAndroid.show("Sorry... Visitors are not allowed in here",ToastAndroid.SHORT)
  }
}  
  



  const handleSearch =(text)=>{
    console.log("this is text",text)
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
    console.log('this is array',arr)   
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
      console.log("here" + dta)
      ToastAndroid.show(dta.message + " for "+pair,ToastAndroid.SHORT)
      StoreApi(Uid) 
      toggleModal()
      
    })                 
  }
  
  const CheckSort = (DATA) => {    
    if(Data){
      setSort(
        DATA.sort((a, b) => parseFloat(a.pcp) < parseFloat(b.pcp)),
        );
        
      } 
  };
  

    return (
        
        <ImageBackground source={global.bgimg} style={{flex:1, justifyContent:'space-between', width:'100%'}}>
        
      
        {renderIt?<ScrollView style={{flex:1}}>
    <Animatable.View
            animation="fadeIn"
            style={[styles.footer,{backgroundColor:'transparent',width:'100%',alignSelf:'center',alignItems:'center'}]}>               
        <View
    style={{
        padding:10,
        width:'100%',
        flexDirection:'row',
        marginTop:5,
        justifyContent:'space-between',
        borderBottomWidth:0.2,borderColor:colors.appGrey
        
    }}
    >
    <Text style={{textAlign:'left',  fontSize:16, marginLeft:10, color:colors.selected,fontFamily:global.bold}}>Pair</Text>
    <Text style={{alignItems:'center', color:colors.selected, fontSize:16,  textAlign:'right',fontFamily:global.bold,marginLeft:30}}>Last Price</Text>
    <TouchableOpacity onPress={()=>{setPChange(!pchange)}}
    style={{flexDirection:'row'}}>
    <Text style={{alignItems:'center', color:colors.selected, fontSize:16,  textAlign:'right',fontFamily:global.bold}}>24h chg%</Text>
    {
          !pchange?
          <AntDesign name='arrowdown' size={20} color={'red'}/>
          :
          <AntDesign name='arrowup' size={20} color={colors.profitcolor}/>
        }
    </TouchableOpacity>
    </View>
    {!Loading? 
           
        <FlatList
          showsVerticalScrollIndicator={false}
          horizontal={false}
          
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                  }
          data={Data&& pchange?Data.sort((a, b) => parseFloat(a.pcp) < parseFloat(b.pcp)
            )
            :
            Data&& Data.sort((a, b) => parseFloat(b.pcp) < parseFloat(a.pcp))
          }
          initialNumToRender={50}          
          removeClippedSubviews={true}
          keyExtractor={(item,index) => index}
          renderItem={({item, index}) => (
            index<50?
            <Animatable.View  style={{marginTop:index==0?10:0,borderBottomColor:'grey',borderBottomWidth:0.2}} animation={index<50?'slideInLeft':null}  useNativeDriver={true}  delay={index<0?index*100:0}>    
       
            <TouchableOpacity 
            activeOpacity={0.9}
            onPress={() => {
              
                if(global.freeUser=='true'){
                  ToastAndroid.show("Your Demo Account has Expired , Please Activate you Id!",ToastAndroid.SHORT)
                  return
                }

                

                  if(!global.api_key){
                    navigation.navigate('APIBinding')
                  }else
                  {
                    SendToInner(item.sym,item.img,item.st,item.tp.toUpperCase(),item.strtamt,item.qty,item.qty1,(item.st.toLowerCase()==='false'? 0 :  item.strtamt!=''? parseFloat(item.strtamt)<parseFloat(item.last_price)?  ((((parseFloat(item.strtamt)-parseFloat(item.last_price))/parseFloat(item.last_price))*100).toFixed(2)):((((parseFloat(item.last_price)-parseFloat(item.strtamt))/parseFloat(item.last_price))*100).toFixed(2)):0),item.bst,item.avg,item.usdt,item.bst1,item.x_hprice,item.x_lprice,item.x_prev_cprice,item.x_askprice,item.x_bidprice,item.iscopy);
                  }
                
              }}    >
                <View  style={{width:'90%',height:60,justifyContent:'center',alignItems:'center',left:5,paddingRight:5,marginVertical:5,}}>
                          <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',alignItems:'center',height:'100%',marginBottom:0,}}> 
                          <View style={{flexDirection:'row',justifyContent:'flex-start',width:'35%'}}>

                          <Image
                          source={{uri: 'https://' + item.img}}
                          style={{width: 20, height: 20,marginRight:5}}
                          resizeMode={'contain'}
                        />
                          <View style={{flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',}}>
                          <Text style={{color:"#fff",fontSize:15,fontWeight:'500',}}>{item.sym.replace('USDT','')}/USD</Text> 
                     
                        </View>
                          
                          </View>
                         
                        
                        <Text style={{color:"#fff",fontSize:15,fontWeight:'500',right:0}}>${item.last_price} </Text>
                    
                       
                        {
          !pchange?
          <View style={{width:90,flexDirection:'row',alignItems:'center',borderColor:'green',height:30,justifyContent:'center',left:30}}>
                      <Image source={require('../../assets/botz/down-arrow.png')} resizeMode="contain" style={{width:10,height:10,right:4}}></Image>
                      <Text style={{color:"red",fontSize:15,fontWeight:'500',}}>{item.pcp.toString()}%</Text>
                        </View> 
          :
          <View  style={{width:80,flexDirection:'row',alignItems:'center',borderColor:'green',height:30,justifyContent:'center',left:30}}>
          <Image source={require('../../assets/botz/uparrow.png')} resizeMode="contain" style={{width:10,height:10,right:4}}></Image>
          <Text style={{color:colors.green1,fontSize:15,fontWeight:'500',}}>{item.pcp.toString()}%</Text>
            </View> 
        }  
                 
                    
                         
                        
                  
                          
                          </View>
                        </View>
             
              </TouchableOpacity>
              </Animatable.View>
          :null
        )}
        />
         :
         <View style={{flexDirection:'column',justifyContent: 'center',height:'100%',backgroundColor:colors.background}} ><LottieView source={require('../../assets/loading.json')} style={{width:300,height:300,alignSelf:'center'}} autoPlay loop /></View>
      
         
         }   
<View>
         <Modal onBackButtonPress={toggleModal}  statusBarTranslucent ={true} deviceHeight={1000}  onBackdropPress={toggleModal} isVisible={isModalVisible}   animationInTiming={300} animationOutTiming={200}>               
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
        </ScrollView>:null}
    </ImageBackground>
)
       
             
}


export default Top10screen;

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
  
