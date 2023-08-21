/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable css_mob/jsx-no-duplicate-props */
/* eslint-disable css_mob/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import { ThemeProvider, useFocusEffect, useIsFocused,useTheme,useLinkTo } from '@react-navigation/native';
import { View, Text, Button, Dimensions, TouchableOpacity,ToastAndroid, StyleSheet,RefreshControl, Image, StatusBar,FlatListProps, ListRenderItemInfo,  FlatList, TextInputComponent, TextInput, Alert, ActivityIndicator,BackgroundImage, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import Feather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';

import AsyncStorage from '@react-native-async-storage/async-storage';
import global from '../component/global'
import { jsonContext } from '../context/GlobalState';
import DatePicker from 'react-native-date-picker'
import styles from '../component/styles'
var DeviceInfo = require('react-native-device-info');


const CoinProfitScreen = ({ navigation,route }) => {  

  const {colors}=useTheme();

  const [date, setDate] = React.useState(new Date())
  const [open, setOpen] = React.useState(false)
  const [dType,setDType] = React.useState(null)
  const [dateModal,setDateModal] = React.useState(false)
  
  const from =route.params?.from 
 
 ///////////////////////////////////////////////////////////////

   const[Uid,setUid]= React.useState('')
   
   const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
   
   const [No_Search, setNo_Search] = React.useState(false);
  
   const[Loading,setLoading]= React.useState(true)
   const[profit_cnt,setProfit_cnt]= React.useState(0)
   const[loss_cnt,setLoss_cnt]= React.useState(0)
   const [refreshing, setRefreshing] = React.useState(false);
 
   const [type, setType] = React.useState('daily');
   const [status, setStatus] = React.useState('both');
   
   const [Data, setData] = React.useState(null);
   const [NData, setNData] = React.useState('');
 
  
   const [fromDate, setFromDate] = React.useState('');
   const [toDate, setToDate] = React.useState('');
   const [Inp_txt, setInp_txt] = React.useState('');  
 
 
  

  
React.useEffect(()=>{
  get_Data()
},[type,status])

const get_Data =()=>{
  let from=fromDate?fromDate:''
  let to=toDate?toDate:''
  let FromDate=''
  let ToDate=''
  if(to!=''){

    ToDate=to.getDate()+' '+ months[to.getMonth()]+' '+to.getFullYear()
  }
  if(from!=''){

    FromDate=from.getDate()+' '+ months[from.getMonth()]+' '+from.getFullYear()
  }
  let url =global.BASE_URL +'css_mob/coin_wise.aspx?uid=' +global.uid +'&mode='+status+'&type='+type+'&from='+FromDate+'&to='+ToDate
  let pfrom =route.params?.from 
  if(pfrom=='hedgebot'){
    url=global.BASE_URL +'css_mob/autobot/coin_wise.aspx?uid=' +global.uid +'&mode='+status+'&type='+type+'&from='+FromDate+'&to='+ToDate
    }
  if(pfrom=='superbot'){
    url=global.BASE_URL +'css_mob/superbot/coin_wise.aspx?uid=' +global.uid +'&mode='+status+'&type='+type+'&from='+FromDate+'&to='+ToDate
  }
  
  console.log(from)
  console.log(url)
  fetch(url)
  .then(item=>item.json())
  .then(data=>{
    setLoading(false)
try{
  if(data[0].success&&data[0].success=='false'){
    setLoading(false)
    setData('')
  }else{
    setData(data)
  }
}catch(e){
  console.log(e)
}
    
  }).then(()=>{
    setRefreshing(false)
  })
}

const onRefresh = React.useCallback(async () => { 
   get_Data()
})


const profit_cal=()=>{
  let total =0
   Data.map(item=>{
     if (item.profit>0)
     {
      total= total +  parseFloat(item.profit)
     }
      
   })     

   return total.toFixed(2)
}
const profit_cal_t=()=>{
  let total =0
   Data.map(item=>{
    total=total+parseInt(item.profit_cnt)
     
   })
   setProfit_cnt(total)
   return total     
}
const loss_cal_t=()=>{
  let total =0
   Data.map(item=>{
     
      total=total+parseInt(item.loss_cnt)
     
     
   })     
   setLoss_cnt(total)
 return total
}
const loss_cal=()=>{
  let total =0
   Data.map(item=>{
    if (item.loss!=0)
    {
    total= total +  parseFloat(item.loss)
    }
   })   
   
   return total&&(total).toFixed(2)
}



    return (
        Loading?
        <View style={{flexDirection:'column',justifyContent: 'center',height:'100%',backgroundColor:colors.background}} ><LottieView source={require('../assets/loading.json')} style={{width:300,height:300,alignSelf:'center'}} autoPlay loop /></View>
        :
        <jsonContext.Consumer>
        {
        myDta=>
        <ImageBackground source={global.bgimg} 
        resizeMode={'stretch'}
        style={[styles.container,{paddingTop:40}]}>               
        
    <Animatable.View
            animation="fadeIn"
            style={styles.footer}>
        
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:10,paddingLeft:5,
        paddingTop:10,alignItems: 'center',marginBottom:10}}> 
        
        <View style={{flexDirection:'row',flex:0.4,justifyContent:'space-between',paddingBottom:10,borderBottomWidth:2,borderBottomColor:colors.profitcolor,marginLeft:5}}>            
                    <Text style={[styles1.heading,{color:colors.selected,fontSize:16,textAlignVertical:'center',fontWeight: 'bold',marginLeft:10}]}>{from=='hedgebot'?'HEDGE BOT PNL':from=='superbot'?'SUPER BOT PNL':'PNL REPORT'}</Text> 
                     
                        

        </View>        
          <View style={{flex:0.1,flexDirection:'row',justifyContent:'space-between'}}>
          <TouchableOpacity onPress={()=>{setDType('from'),setOpen(true)}}>
          <Feather
                          name={'filter'}
                          onPress={() => {
                            setDateModal(true);
                          }}
                          size={20}
                          style={{
                            color: colors.hgl,                            
                            
                            borderRadius: 5,
                            width: 35,
                          }}
                        />
          </TouchableOpacity>
          
        
          </View>   
    </View>
    <View style={{flexDirection:'row',justifyContent:'space-around',marginVertical:10,width:'100%'}}>
    <TouchableOpacity onPress={()=>{setType('daily')}}>
        <Text style={{color:type==='daily'?'#000':'#fff',fontWeight:'bold',backgroundColor:type==='daily'?'#fff':null,paddingHorizontal:15,paddingVertical:5,borderRadius:5}}>{type==='daily'?'DAILY':'D'}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>{setType('yesterday')}}>
        <Text style={{color:type==='yesterday'?'#000':'#fff',fontWeight:'bold',backgroundColor:type==='yesterday'?'#fff':null,paddingHorizontal:15,paddingVertical:5,borderRadius:5}}>{type==='yesterday'?'YESTERDAY':'Y'}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>{setType('weekly')}}>
        <Text style={{color:type==='weekly'?'#000':'#fff',fontWeight:'bold',backgroundColor:type==='weekly'?'#fff':null,paddingHorizontal:15,paddingVertical:5,borderRadius:5}}>{type==='weekly'?'WEEKLY':'W'}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>{setType('monthly')}}>
        <Text style={{color:type==='monthly'?'#000':'#fff',fontWeight:'bold',backgroundColor:type==='monthly'?'#fff':null,paddingHorizontal:15,paddingVertical:5,borderRadius:5}}>{type==='monthly'?'MONTHLY':'M'}</Text>
    </TouchableOpacity>
    </View>
   
       
       <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'space-between',paddingHorizontal:15}}>
       <Text style={{color:colors.border,fontSize:18, textAlign:'center',fontWeight:'bold'}} >
          PROFIT  : {Data?<Text style={{color:colors.profitcolor}}>{isNaN(parseFloat(profit_cal()))?'0':profit_cal()}</Text>:null}
       </Text>              
                     
       <Text style={{color:colors.border,fontSize:18, textAlign:'center',fontWeight:'bold'}} >
          LOSS  : {Data?<Text style={{color:colors.losscolor}}>{isNaN(parseFloat(loss_cal()))?'0':loss_cal()} </Text>:null}
       </Text>  
       
     </View>  

<View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'space-between',paddingHorizontal:15}}>
<Text style={{color:colors.border,fontSize:18, textAlign:'center',fontWeight:'bold'}} >
   TRADES  : {Data?<Text style={{color:colors.profitcolor}}>{isNaN(parseFloat(profit_cal_t()))?'0':profit_cal_t()}</Text>:null}
</Text>              
              
<Text style={{color:colors.border,fontSize:18, textAlign:'center',fontWeight:'bold'}} >
TRADES  : {Data?<Text style={{color:colors.losscolor}}>{isNaN(parseFloat(loss_cal_t()))?'0':loss_cal_t()} </Text>:null}
</Text>  

</View>  
<View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'space-between',paddingHorizontal:15}}>
<Text style={{color:colors.border,fontSize:18, textAlign:'center',fontWeight:'bold'}} >
   WIN %  : {Data?<Text style={{color:colors.profitcolor}}>{(parseInt(profit_cnt)*100/(parseInt(profit_cnt) + parseInt(loss_cnt))).toFixed(2)} %</Text>:null}
</Text>              
              
<Text style={{color:colors.border,fontSize:18, textAlign:'center',fontWeight:'bold'}} >
LOSS %  : {Data?<Text style={{color:colors.losscolor}}>{(parseInt(loss_cnt)*100/(parseInt(profit_cnt) + parseInt(loss_cnt))).toFixed(2)} %</Text>:null}
</Text>  

</View>  
<View style={{flexDirection:'row',marginTop:10,justifyContent: 'space-around',alignItems:'center'}}>

{/* <Text style={{color:'#000'}}>Superbot Profits are not shown here! </Text> */}
<TouchableOpacity  onPress={() => {
                global.AMT > 0
                  ? navigation.navigate('CoinProfitScreen_superbot', {from: 'superbot'})
                  : ToastAndroid.show(
                      'Please Activate Your Id First',
                      ToastAndroid.SHORT,
                    );
              }} style={{padding:5}}>
  <Text style={{color:colors.selected,fontSize:18}}>Click to See InfinityBot Profits!</Text>
</TouchableOpacity>
</View>

        {!Data?
          <Text style={{color:colors.border,fontSize:18,marginTop:'15%', textAlign:'center',fontWeight:'bold'}} >
            No Data to Display !
          </Text> 
          :
        <FlatList
        horizontal={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        data={Data&&Data.sort((a, b) => parseFloat(a.profit) < parseFloat(b.profit))}        
        initialNumToRender={10}
        // extraData={Data}
        removeClippedSubviews={true}
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) => (
  <TouchableOpacity onPress={()=>{navigation.navigate('OrderHistory',{sym:item.pair,from:'tradereview'})}}   
    
  >   
  <ImageBackground source={require('../assets/botz/top-ticket-bg.png')} style={{flexDirection:'column',width:'100%',alignSelf:'center',padding:5
  ,marginVertical:10,}}>
        
    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems: 'center',}}  activeOpacity={0.9}>
                <View style={{flexDirection:'row',width:'35%'}}>
                  <Image
                        source={{uri: 'https://' + item.img}}
                        resizeMode={'stretch'}
                        style={{width: 35, height: 35, marginRight:10, alignSelf:'center'}}
                      />
             <View style={{flexDirection:'column'}}>
            
             <Text style={{color:colors.selected,fontFamily:global.bold,fontSize:16, textAlign:'left'}} >
             {item.pair}
               </Text>
                  
            
             </View>             
                </View>
                          
                        
               
             <View style={{flexDirection:'column',width:'60%',alignSelf:'flex-start'}}>

              <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'space-between',paddingHorizontal:15}}>
               <Text style={{color:colors.profitcolor,fontSize:14, textAlign:'center',fontWeight:'bold'}} >
                  PROFIT
               </Text>              
               <Text style={{color:colors.losscolor,fontSize:14, textAlign:'center',fontWeight:'bold'}} >
                  LOSS 
               </Text>              
              
             </View>  
              <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'space-between'}}>
               <Text style={{color:colors.appGrey,fontSize:14, textAlign:'center',}} >
                <Text style={{color:colors.selected,fontWeight:'bold'}}>{isNaN(parseFloat(item.profit))?'0':parseFloat(item.profit).toFixed(2)}</Text> ( USDT )
               </Text>              
               <Text style={{color:colors.appGrey,fontSize:14, textAlign:'center',}} >
               <Text style={{color:colors.selected,fontWeight:'bold'}}>{isNaN(parseFloat(item.loss))?'0':parseFloat(item.loss).toFixed(2)}</Text>  ( USDT )
               </Text>              
              
             </View>  
              <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'space-between'}}>
               <Text style={{color:colors.appGrey,fontSize:14, textAlign:'center',paddingHorizontal:10}} >
               <Text style={{color:colors.selected,fontWeight:'bold'}}>{isNaN(parseFloat(item.profit_cnt))?'0':parseFloat(item.profit_cnt)}</Text> Trades
               </Text>              
               <Text style={{color:colors.appGrey,fontSize:14, textAlign:'center',paddingHorizontal:10}} >
               <Text style={{color:colors.selected,fontWeight:'bold'}}>{isNaN(parseFloat(item.loss_cnt))?'0':parseFloat(item.loss_cnt)}</Text> Trades
               </Text>              
              
             </View>  
             </View>

            </View>
            </ImageBackground>        
  </TouchableOpacity>
            
   
        )}
      />
            }
<View>
       
      </View>
        </Animatable.View>
        <Modal
        onBackButtonPress={() => setDateModal(false)}
        statusBarTranslucent={true}
        deviceHeight={1000}
        onBackdropPress={() => setDateModal(false)}
        isVisible={dateModal}
        useNativeDriver={true}        
        
        >
        <View
          style={{
            width: 360,
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: global.grad3,            
            alignSelf: 'center',            
            borderRadius: 10,                        
            alignItems: 'flex-start',
            padding:15,            
            zIndex: 9999,
          }}>                         
               <TouchableOpacity onPress={()=>{setDType('from'),setOpen(true)}} style={{flexDirection:'row',justifyContent: 'space-around',width:'100%',}}>
            <Text style={[styles1.heading,{color:colors.binanceylw2,fontSize:16,textAlignVertical:'center',fontWeight: 'bold',flex:0.2}]}>FROM  </Text> 
            <Text style={[styles1.heading,{color:colors.binanceylw2,fontSize:16,textAlignVertical:'center',fontWeight: 'bold',flex:0.2}]}>:</Text> 
            <Text style={[styles1.heading,{color:colors.border,fontSize:15,textAlignVertical:'center',fontWeight: 'bold',flex:0.6}]}>{fromDate?fromDate.toString().split('GMT')[0]:'SELECT'}</Text> 
          </TouchableOpacity>              
          <TouchableOpacity onPress={()=>{setDType('to'),setOpen(true)}} style={{flexDirection:'row',justifyContent: 'space-around',width:'100%',marginTop:10}}>
          <Text style={[styles1.heading,{color:colors.binanceylw2,fontSize:16,textAlignVertical:'center',fontWeight: 'bold',flex:0.2}]}>TO  </Text> 
          <Text style={[styles1.heading,{color:colors.binanceylw2,fontSize:16,textAlignVertical:'center',fontWeight: 'bold',flex:0.2}]}>:</Text>
            <Text style={[styles1.heading,{color:colors.border,fontSize:15,textAlignVertical:'center',fontWeight: 'bold',flex:0.6}]}>{toDate?toDate.toString().split('GMT')[0]:'SELECT'}</Text> 
          </TouchableOpacity>

          <TouchableOpacity
          onPress={()=>{get_Data(),setDateModal(false)}}
          style={{backgroundColor:colors.binanceylw2,padding:5,paddingHorizontal:10,alignItems: 'center',justifyContent: 'center',marginTop:20,alignSelf: 'center',borderRadius:5}}>
            <Text style={{color:'#fff'}}>Submit</Text>
          </TouchableOpacity>
        </View>
      
      </Modal>

        <DatePicker
        modal
        mode={'date'}
        open={open}
        date={date}
        onConfirm={(date) => {
          let today=new Date()
          let fromDate;
          let toDate;
          
          if(dType=='from'){  
            

            fromDate =new Date(date)                   
            if(fromDate>today){
              setFromDate(today)            
            }else{
              setFromDate(date)            
            }
          }else{
            toDate=new Date(date)
            if(toDate>today){
              setToDate(today)            
            }else{
              setToDate(date)            
            }
          }
          setOpen(false)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
        </ImageBackground >
      }
        </jsonContext.Consumer>
)
        
}


export default CoinProfitScreen;

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
  