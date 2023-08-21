/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import { View, Text, Button, Dimensions,RefreshControl, TouchableOpacity,BackHandler, StyleSheet, Image, StatusBar, FlatList, ActivityIndicator, ScrollView, TouchableHighlight, ImageBackground } from 'react-native';
import { ThemeProvider, useFocusEffect, useIsFocused,useTheme,useLinkTo,   } from '@react-navigation/native';
import { Appbar, Paragraph } from 'react-native-paper';
import IonIcons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from '@react-native-async-storage/async-storage';
import global from '../component/global';
import styles from '../component/styles'
import { color } from 'react-native-reanimated';

const OrderHistory = ({ navigation, route }) => {
    const linkTo = useLinkTo(); 
    const {colors}=useTheme();
  const theme=useTheme();
    const [Data, setData] = React.useState([]
    //   [{
    //   pair:'XAUUSD',
    //   type:'BUY', 
    //   startprice:'1.25256',
    //   price:'1.25270',
    //   qty:'0.01',
    //   order_time:'02 feb 2023',
    //   profit:'10',
    //   callno :'1',
    //   botid:'1515gf55'
    // }]
    );
    const [both, setBoth] = React.useState(); 
    const [demo, setDemo] = React.useState(); 
    const [live, setLive] = React.useState(); 
    const [Uid, setUid] = React.useState(global.uid); 

    const [expandIndex, setExpandIndex] = React.useState(-1)   
    const [MinVal, setMinVal] = React.useState('');
    const [refreshing, setRefreshing] = React.useState(false);
    const [Clicked, setClicked] = React.useState('');
    const [chk_click, setChk_click] = React.useState(false);
    const [BuyTotal, setBuyTotal] = React.useState('0');  
    const [bg, setBg] = React.useState('');  
    const sym=route.params?.sym;
    const guest_id=route.params?.guest_id;
    const type=route.params?.type;
    const from=route.params?.from;
    var sym1;    
    const [status, setStatus] = React.useState(guest_id!=undefined?'live':'both');
    const [Loading, setLoading] = React.useState(false)
    React.useEffect(() => {

        
        getdetails()
       


        
    }, [status]);

async function getdetails(){
    let rVal =Math.floor(Math.random() * 5) + 1 ; 
    console.log(rVal)
    setBg(rVal)                    
        try {
            
            
            if(guest_id!= '' && Uid!=undefined && Uid!=null)
            {

                callApi(Uid)
            }
            
            
        }
        catch (e) {
            console.log(e);
        }
        // console.log('user token:', userToken);
}
 

    const onRefresh = React.useCallback(async () => {
 
        setRefreshing(true);
        callApi(Uid)
    
    
    })


    
    async function callApi(uid) {
        
        setLoading(true)                
        // if(status=='live'&&live!==undefined){
        //     setData(live)
        //     console.log('live called')
        //     setRe
        //     setLoading(false)
        //     return
        //   }else if(status=='demo'&&demo!==undefined){
        //     setData(demo)
        //     console.log('demo called')
        //     setRe
        //     setLoading(false)
        //     return
        //   }else if(status=='both'&&both!==undefined){
        //     setData(both)
        //     console.log('both called')
        //     setRe
        //     setLoading(false)
        //     return
        //   }
         
         let url
         if(sym==undefined && sym1==undefined){
              url=global.BASE_URL+'css_mob/get_orders.aspx?uid=' +uid+'&mode='+status
         }
         else{
              if (sym!= '' && sym!=undefined && sym!=null) {
            url=global.BASE_URL+'css_mob/get_orders.aspx?uid=' +uid+ '&pair=' + sym +'&mode='+status
        }else

        if (sym1!= '' && sym1!=undefined && sym1!=null) {
            url=global.BASE_URL+'css_mob/get_orders.aspx?uid=' +uid+ '&pair=' + sym1 +'&mode='+status
        }
         }
         if(guest_id!==undefined){
            url=global.BASE_URL+'css_mob/get_strategy.aspx?uid=' +guest_id+'&mode=live&type='+type
         }
       
        console.log(url)
        fetch(url)
            .then(item => item.json())
            .then(mobData => {                
                setData(mobData)
                if(status=='live'){
                    setLive(mobData)
                  }else if(status=='demo'){
                    setDemo(mobData)
                  }else if(status=='both'){        
                    setBoth(mobData)
                  }                
                setRefreshing(false)
                setLoading(false)
            }
            
            ).then(()=>{
                setRefreshing(false)
                setLoading(false)
            })
            
    }
    const EmptyList=()=>(
        
        <View style={{flexDirection:'column',justifyContent: 'center',height:'100%'}} >
          <ActivityIndicator size={'large'} color={colors.appBlack} /></View>
            
    )
    const EmptyListReal=()=>(
        
      <View style={{flexDirection:'column',justifyContent: 'center',height:'100%',alignItems:'center'}} >
        <Text style={{color:'#fff',marginTop:50}}>Nothing to Show!</Text></View>
          
  )

    return (
            // source={global.bgimg}
            <ImageBackground  style={[styles1.container,{}]}>
            <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:0,
            marginBottom:10}}> 
              <View style={{alignItems: 'flex-start',marginLeft:10,justifyContent:'center',width:'20%'}}>
                <TouchableOpacity onPress={()=>navigation.goBack()} style={{padding:10}}>
                    <Text  allowFontScaling={false} style={{textAlign:'right'}}><IonIcons name="md-arrow-back"
                     size={24}  color={colors.selected}   /></Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',width:'80%',paddingLeft:20}}>            
                        <Text  allowFontScaling={false} style={[styles.heading,{color:colors.profitcolor2,}]}>ORDER HISTORY</Text>                            
            </View>
           
            </View>
            {!Loading && Data.length<=0?
             <View style={{  justifyContent: 'center',alignItems:'center',height: '80%'}}>
             <Text style={{color:colors.appGray,fontSize:16}}>No Order Found!</Text>
           </View>

             :
             Loading?<View style={{  justifyContent: 'center',alignItems:'center',height: '80%'}}>
             <LottieView
             source={require('../assets/loading.json')}
             style={{ width: 300, height: 300, alignSelf: 'center' }}
             autoPlay
             loop
           />
         </View>
           :
                <FlatList
                    horizontal={false}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                  // contentContainerStyle={{backgroundColor:'red',width:'96%'}}
                    data={Data}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={EmptyListReal}
                    // ItemSeparatorComponent={<View style={{borderWidth:1,borderColor:'#fff',height:5,width:'100%'}}></View>}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity activeOpacity={0.9}  
                        key={index}
                        onPress={()=>{ expandIndex==index? setExpandIndex(-1):setExpandIndex(index)}}   
                        style={{marginVertical:5,width:'96%',alignSelf: 'center',borderRadius:10,
                        flexDirection:'column',
                        justifyContent: 'space-evenly'}}>
                            
                            {/* <View
                            style={{flex:1,paddingVertical:5,paddingHorizontal:0,width:'100%',}} 
                            > */}
                                                 
                                
              <View style={{height:160}}>
                <ImageBackground source={require('../assets/Aeon/bg5.png')} resizeMode='stretch' style={{width:'100%',height:'100%'}}>
                <View
                  style={{flexDirection: 'row', justifyContent: 'space-between',
                  width:'100%',height:40,alignItems: 'center'
                  }}>
                  {/* <View style={{flexDirection: 'row',width:'40%',paddingTop:0}}> */}
                  
                  
                  <Text  allowFontScaling={false} style={{color:colors.appBlack,fontSize:15,marginLeft:10,
                    fontFamily:global.appFontM}}>
                        {item.pair},  <Text  allowFontScaling={false} 
                  style={{fontSize:12,color:'#000',
                  // color:item.type.toLowerCase()==='buy' || item.type.toLowerCase()==='manual buy'?
                  // colors.profitcolor2:colors.losscolor,
                //   fontFamily:global.bold,
                  marginLeft:0,textAlignVertical:'center',textTransform:'uppercase',fontFamily:global.appFontM}}>{parseFloat(item.qty)>0?( item.type.toLowerCase()==='buy'?'buy':item.type.toLowerCase()==='manual buy'?'buy (MANUAL)':item.type.toLowerCase()==='manual sell'?'sell (MANUAL)':'sell'):'Failed'} {item.qty} </Text>
                  </Text>
                 
                {/* </View> */}
                {/* <View style={{flexDirection: 'column',justifyContent: 'center',width:'60%',}}> */}
                
                         
                  <Text  allowFontScaling={false} style={{color:colors.appBlack,fontSize:12,fontFamily:global.appFontM,
                    marginRight:15,textAlignVertical:'bottom',textAlign:'right',textTransform:'uppercase'}}>
                            {item.order_time}  
                          </Text>
                        
              
                 
                  {/* </View> */}
                </View>
                <View style={{flexDirection:'row',width:'95%',justifyContent:'space-between'
                ,paddingTop:7
                ,alignSelf:'center',height:50,top:30,paddingHorizontal:10}}>

                <Text  allowFontScaling={false} style={{color:colors.selected,fontSize:18,fontFamily:global.appFontB,
                }}>
                            {item.startprice} → {item.price}  
                          </Text>
                          <Text  allowFontScaling={false} style={{color:
                          item.profit.includes('-')?colors.losscolor:colors.yellow,fontSize:18,lineHeight:20,
                          marginTop:5,
                          fontFamily:global.appFontB,textAlign:'right'
                ,marginLeft:15,}}>{parseFloat(item.profit).toFixed(2)}<Text style={{color:'#fff',fontSize:12
                ,fontFamily:global.appFontM
                ,textAlignVertical:'center',}}>
                            {'\n'}Fee : {(item.profit.includes('-')?'0':(parseFloat(item.profit)*0.2).toFixed(2))  }
                          </Text></Text>
                </View>
                {/* {expandIndex==index? */}
                  {/* <View
                  style={{flexDirection: 'row', justifyContent: 'space-between',width:'100%'}}>
                <Text  allowFontScaling={false} style={{color:'#9D9D9F',fontSize:15,fontFamily:global.appFontM
                ,textAlignVertical:'center'}}>
                         {item.callno==0? '':'Position no : '+item.callno}   
                          </Text>
                <Text  allowFontScaling={false} style={{color:'#9D9D9F',fontSize:15,fontFamily:global.appFontM
                ,textAlignVertical:'center'}}>
                            Fee : {(item.profit.includes('-')?'0':(parseFloat(item.profit)*0.2).toFixed(2))  }
                          </Text>
                  
                  </View> */}
                  {/* // :null} */}
                <View
                  style={{flexDirection: 'row', justifyContent: 'space-between',width:'100%',height:35,
                  alignItems:'center',justifyContent: 'center',
                  marginTop:30,}}>

                          <TouchableOpacity onPress={()=>{ navigation.navigate('TransactionScreen',{botid:item.botid})}} 
                          style={{}}>
                      <Text style={{fontSize:12,fontFamily:global.appFontB,color:'#fff'}}>VIEW DETAILS</Text>
                  </TouchableOpacity>
                          {/* <TouchableOpacity onPress={()=>{ expandIndex==index? setExpandIndex(-1):setExpandIndex(index)}} 
                          style={{alignSelf:'flex-end'}}>
                      <Text style={{fontSize:15,color:'#fff'}}>{expandIndex==index?'Shrink':'Expand'}</Text>
                  </TouchableOpacity> */}
                  </View>
                  </ImageBackground> 
                  
                
                
                {/* <View style={{justifyContent: 'flex-start',marginVertical:5}}>
                
                 
                  </View> */}
  
                {/* price filled fee realized pnd all in usdt */}
                {/* <View
                  style={{flexDirection: 'row', justifyContent: 'space-between',width:'100%',marginTop:-5}}>
                
                  <View style={{flexDirection:'column',justifyContent: 'center',alignItems: 'flex-start',
                  marginVertical:15}}>
                         <View style={{flexDirection: 'row',justifyContent:'space-between',width:'100%',marginBottom:15}}>
                  <Text  allowFontScaling={false} style={{color:'#7F8591',fontSize:13,fontWeight:'bold',width:'50%'}}>Start Price</Text>
                  <Text  allowFontScaling={false} style={{color:'#DBE2EB',fontSize:13,fontWeight:'bold',width:'50%',textAlign: 'right'}}>{item.startprice} </Text>

                </View>
                              <View style={{flexDirection: 'row',justifyContent:'space-between',width:'100%',marginBottom:15}}>
                  <Text  allowFontScaling={false} style={{color:'#7F8591',fontSize:13,fontWeight:'bold',width:'50%'}}>End Price</Text>
                  <Text  allowFontScaling={false} style={{color:'#DBE2EB',fontSize:13,fontWeight:'bold',width:'50%',textAlign: 'right'}}>{item.price} </Text>

                </View>
                <View style={{flexDirection: 'row',justifyContent:'space-between',width:'100%',marginBottom:15}}>
                  <Text  allowFontScaling={false} style={{color:'#7F8591',fontSize:13,fontWeight:'bold',width:'50%'}}>Filled (USD)</Text>
                  <Text  allowFontScaling={false} style={{color:'#DBE2EB',fontSize:13,fontWeight:'bold',width:'50%',textAlign: 'right'}}>{item.qty} </Text>

                </View>
        
                <View style={{flexDirection: 'row',justifyContent:'space-between',width:'100%',marginBottom:15}}>
                  <Text  allowFontScaling={false} style={{color:'#7F8591',fontSize:13,fontWeight:'bold',width:'50%'}}>Fee (USD)</Text>
                  <Text  allowFontScaling={false} style={{color:'#DBE2EB',fontSize:13,fontWeight:'bold',width:'50%',textAlign: 'right'}}>{item.mode.toString().toUpperCase()=='LIVE'?(item.profit.includes('-')?'0':(parseFloat(item.profit)*0.2).toFixed(2)):'0'}</Text>

                </View>
                <View style={{flexDirection: 'row',justifyContent:'space-between',width:'100%',marginBottom:15}}>
                  <Text  allowFontScaling={false} style={{color:'#7F8591',fontSize:13,fontWeight:'bold',width:'50%'}}>Realized PNL (USD)</Text>
                  <Text  allowFontScaling={false} style={{color:'#DBE2EB',fontSize:13,fontWeight:'bold',width:'50%',textAlign: 'right'}}>{parseFloat(item.profit).toFixed(3)} ({parseFloat(item.profit_per).toFixed(2)}% )</Text>

                </View>
                <View style={{flexDirection: 'row',justifyContent:'space-between',width:'100%',marginBottom:15}}>
                  <Text  allowFontScaling={false} style={{color:'#7F8591',fontSize:13,fontWeight:'bold',width:'50%'}}>MODE</Text>
                  <Text  allowFontScaling={false} style={{color:'#DBE2EB',fontSize:13,fontWeight:'bold',width:'50%',textAlign: 'right'}}>{item.mode.toString().toUpperCase()} </Text>

                </View>
                <View style={{flexDirection: 'row',justifyContent:'flex-start',width:'30%',display:item.uid.toLowerCase()==global.uid.toLowerCase()?'flex':'none',marginTop:5}}>
                 
                </View>
                </View>

                
                </View> */}
             
                
                        
              
{/* <ImageBackground source={require('../assets/botz/sharepost-bg.png')} 
style={{height:40,flexDirection:'row',alignItems:'center',justifyContent: 'space-around',display:item.uid.toLowerCase()==global.uid.toLowerCase()?'flex':'none',marginTop:0,}} resizeMode="stretch">                                        
                    
                
                    <TouchableOpacity style={{display:item.share==='True' || parseFloat(item.profit)<0?'none':'flex',alignItems:'flex-end',justifyContent:'flex-end'}}
                     onPress={()=>{
                        
                        navigation.navigate('MetaWall',{sym:item.pair,tcall:item.type,pnl:parseFloat(item.profit).toFixed(3),ep:item.startprice,lp:item.price,vals:bg,auto:item.auto})}} >
                            <Text style={{fontSize:15,fontWeight:'bold',color:'#fff'}}>POST TO META WALL</Text>
                               </TouchableOpacity>                  
                    <TouchableOpacity style={{alignItems:'flex-end',justifyContent:'flex-end',}}
                     onPress={()=>{
                        
                              navigation.navigate('TradeShare',{sym:item.pair,tcall:item.type,pnl:parseFloat(item.profit).toFixed(3),ep:item.startprice,lp:item.price,vals:bg})
                                }} >
                          <AntDesign name='sharealt' size={17}   color={colors.selected}/>
                    </TouchableOpacity>                  
                </ImageBackground>   */}
               
      
              </View>

                        
                    {/* </View> */}
                        </TouchableOpacity>
                    )}
                    /> }
            </ImageBackground>
    );
}



export default OrderHistory;
const styles1 = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0B1725',
        paddingTop:40
    },
    textInput: {
        marginLeft: 15,
        marginTop: -15,
        paddingBottom: -10,

    },
    text_header: {
        color: "#fff",
        fontWeight: 'bold',
        fontSize: 30
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderBottomWidth: 0.5,
        borderBottomColor: '#808080',
        marginTop: 15
    },
    text_Price: {
        color: "#13B34F",
        width: 100,
        textAlign: 'left',
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
    title: {
        fontSize: 15,
        color: '#f5f5f5f5',
        fontWeight: 'bold',    
    },
    textTime: {
        fontSize: 13,
        color: '#d0d0d0d0',
        width: 90,
        textAlign: 'left'

    },
    textVol: {
        fontSize: 15,
        color: '#d0d0d0d0',
        width: 100,
        textAlign: 'right',

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
        borderRadius: 4

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


        backgroundColor: '#fff'
    },
    text_card: {
        fontSize: 14,
        fontWeight: 'bold',
    }
});