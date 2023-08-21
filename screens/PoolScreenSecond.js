
import * as React from 'react';
import { ThemeProvider, useFocusEffect, useIsFocused, useTheme, useLinkTo } from '@react-navigation/native';
import { View, Text, Button, Dimensions, TouchableOpacity, ToastAndroid, StyleSheet, RefreshControl, 
  Image, StatusBar, FlatListProps, ListRenderItemInfo, FlatList,  ScrollView, 
  TextInput, Alert, ActivityIndicator, BackgroundImage, ImageBackground } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import global from '../component/global'
import axios from 'axios';
import { ProgressBar } from 'react-native-paper';
import Modal from 'react-native-modal';

var arr = [];
var newjson = ''
var Coins = '';
var symbol = '';

const PoolScreenSecond = ({route, navigation }) => {
  const { colors } = useTheme();
  const [Uid, setUid] = React.useState('')
  const [Loading, setLoading] = React.useState(true)
  const [data, setData] = React.useState(null)
  const [show, setShow] = React.useState(false)
  const [refreshing, setRefreshing] = React.useState(false);
  ////
  // name,dt, description, profit, min
  // , max, uid, copyid,rank,rankimg,loss,copiers,comm,img 
  console.log('-------------*-*-*------------------------------ '+JSON.stringify(route.params?.item))
  const [item,setItem] = React.useState(route.params?.item)
  const [sumSel,setSumSel] = React.useState(true)
  useFocusEffect(
    React.useCallback(() => {
      setTimeout(async () => {
        // setIsLoading(false);
        let uid;
        uid = null;
        uid = await AsyncStorage.getItem('user_id')
        // console.log("******", uid)
        setUid(uid)

      });

      //we can add delay time here before callApi() i.e ' },1000,callApi());' //
    }, 1000, [])
  );
  React.useEffect(() => {
    callApi()
  }, [])
  const linkTo = useLinkTo(); 
  const callApi = () => {    
    let url = global.BASE_URL + "css_mob/pool.aspx?uid=" + global.uid
    console.log(url)
    fetch(url)
      .then(item => item.json())
      .then(CData => {
        // console.log(CData)
        setData(CData)

      })


    setLoading(false)
    setRefreshing(false)

  }


  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    callApi()
  })


  return (

    <ImageBackground source={global.bgimg}
    resizeMode='stretch'
    style={{ flex: 1, justifyContent: 'space-between', width: '100%',
     }}>
      <ScrollView style={{flex:1,}} contentContainerStyle={{justifyContent: 'space-between'}}>
      <ImageBackground source={require('../assets/Fxbot/copy/topbg.png')}
              resizeMode='stretch'
      style={{  marginTop: 40,height: 150 , }}>
        <Text style={{ color: '#fff', fontSize: 32, alignSelf: 'center',fontFamily:global.bold,
        marginTop:20 }}>POOL RATING</Text>
      </ImageBackground>
  

      <View
        style={{
          backgroundColor: 'transparent', width: '96%',height:'60%',zIndex:999,
          alignSelf: 'center', 
          top:'-27%',
          alignItems: 'flex-start',borderRadius:5,
        }}>
           {(item!=null && item!='' && item!=undefined)?<ImageBackground 
                    resizeMode={'stretch'}
                    source={require('../assets/Fxbot/copy/boxBgPool.png')} 
                     style={{width:'100%',alignSelf: 'center',height:500,
                 marginBottom:10,marginLeft:'1%'}} >
           
                  <View style={{ flexDirection: 'row',marginHorizontal:8,marginTop:10,
                   height:62 ,justifyContent:'space-between',}}>
                        <View style={{ marginLeft: 0, marginTop: 5,flexDirection:'row' ,width:'60%',}}>
                        <Image source={(item.img=='' || item.img==null || item.img==undefined)?require('../assets/logom.png'):{uri:item.img}} style={{ width: 50, height: 50 ,borderRadius: 25}} />
                        <View style={{flexDirection:'column',marginLeft: 10}}>
                            <Text style={{color:colors.selected,fontSize:14,width:150}} numberOfLines={2}>{item.pname}</Text>
                            {/* <View style={{ marginLeft: 0, marginTop: 2,flexDirection:'row',
                            alignItems: 'center',color:colors.selected}}>
                      
                        <Text style={{marginLeft:5,color:colors.selected}}>{item.rank}</Text>
                        </View> */}
                      
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', alignItems: 'center',alignSelf: 'center',
                        justifyContent:'center'
                        ,width:'40%',}}>
                            <TouchableOpacity  onPress={() => {
                              // navigation.navigate('Invest')                                
                              if(global.AMT<=0){
                                ToastAndroid.show("Please Activate Your ID", ToastAndroid.LONG)
                                return
                              }
                              // if(parseFloat(global.autoFamt)==0){
                              //   navigation.navigate('Invest')                                
                              // }else{
                                if(parseInt(global.AMT)>0){
                                  // setShow(true)   
                                  navigation.navigate('PoolDepositScreen')                
                                }
                                else
                                {
                                  ToastAndroid.show("Please Activate Your ID", ToastAndroid.LONG)
                                }
                                
                              // }
                          }}
                            style={{backgroundColor:colors.green1,padding:5,
                            paddingHorizontal:8,borderRadius:3,}}>
                              <Text style={{color:colors.selected}}>Invest</Text>
                              
                            </TouchableOpacity>


        <Modal onBackButtonPress={() => setShow(false)} statusBarTranslucent={true} deviceHeight={1000} onBackdropPress={() => setShow(false)} 
        isVisible={show}
        useNativeDriver={true}
        animationIn={'slideInDown'} animationOut={'slideOutUp'}
        transparent={true} backdropOpacity={0.2} backdropColor={colors.selected}>
        <ImageBackground 
        source={global.bgimg} resizeMode={'stretch'}
        imageStyle={{borderRadius:20}}
        style={{
          width: 'auto', flexDirection: 'column', justifyContent: 'space-around', borderRadius:20,
          paddingHorizontal: 50, paddingVertical: 30, alignSelf: 'center', position: 'absolute',
          top: 65, 
          borderRadius: 10, borderBottomWidth: 0, height:'auto'
        }}>
          <Text style={{color:'#fff',fontFamily: 'DigitalRegular',fontSize:17}}>
            Are you sure you want to start copying trades from this user?
          </Text>
          <Text style={{color:'#fff',fontFamily: 'DigitalRegular',fontSize:17}}>
           NOTE : I Agree That I Am Copying this trader at my own risk. and i am well known of the fact that there is always a possibilty for loss. so i will be trading at my own risk...
          </Text>

          <TouchableOpacity activeOpacity={0.9} onPress={() => { 
              let url;
              setShow(false)
              if(parseInt(item.st)==1){
                url = global.BASE_URL + "css_mob/StopCopytrade.aspx?uid=" + item.uid + "&copyid=" + global.uid
              }else{
                url = global.BASE_URL + "css_mob/Copytrade.aspx?uid=" + item.uid + "&copyid=" + global.uid
              }
              console.log(url)
              fetch(url)
                  .then(item => item.json())
                  .then(CData => {
                      // console.log(CData)
                      if (CData.success === 'true') {                        
                        if(parseInt(item.st)==0){
                          ToastAndroid.show("Copied Successfully", ToastAndroid.LONG)
                        }else{
                          ToastAndroid.show("Stopped Copy Trade Successfully", ToastAndroid.LONG)
                        }
                          linkTo('/Home')
                         

                      } else {
                          ToastAndroid.show(CData.msg, ToastAndroid.SHORT)
                      }

                  })


              
            }} style={{ flexDirection: 'column', justifyContent: 'space-between', marginBottom: 5, borderBottomWidth: 0.5, borderColor: 'grey', paddingBottom: 5, backgroundColor:'#3f444b',textAlign:'center', marginTop:20}}>
            <Text style={{ color: colors.selected,fontSize: 18, fontFamily: 'DigitalRegular',margin:10 }}>CONFIRM</Text>
          </TouchableOpacity>
          
          
          <TouchableOpacity activeOpacity={0.9} onPress={() => { setShow(false) }} style={{ flexDirection: 'column', justifyContent: 'space-between', marginBottom: 5, borderBottomWidth: 0.5, borderColor: 'grey', paddingBottom: 5, backgroundColor:'#3f444b',textAlign:'center'}}>
            <Text style={{ color: colors.selected,fontSize: 18, fontFamily: 'DigitalRegular',margin:10 }}>CANCEL</Text>
          </TouchableOpacity>
          
          </ImageBackground>
       


      </Modal>

                        {/* <Text style={{ color: '#000',    textAlign: 'center', lineHeight:25,
                        fontSize:11,color:colors.selected,
                       }}>Min. Required : {item.min} USD{'\n'}Max. Required : {item.max} USD</Text> */}
                    </View>
                    </View>
                    <View style={{justifyContent: 'space-between',flexDirection:'row',alignItems:'center',
                        alignSelf: 'center',width:'92%',height:40}}>
                            <View onPress={()=>{setSumSel(true)}} 
                            style={{backgroundColor:'transparent',width:'100%',height:'100%',alignItems: 'center',justifyContent:'center',marginTop:20}}>
                              <Text style={{color:colors.selected,fontFamily:global.bold,fontSize:26
                              ,textAlign: 'center',alignSelf:'center',justifyContent:'center'
                              }}>SUMMARY</Text>
                            </View>
                           
                        </View>  
                        <View style={{flexDirection: 'row',width:'100%',marginTop:30}}>
                        <View style={{justifyContent: 'space-between',flexDirection:'column',alignItems:'center',
                        alignSelf: 'center',width:'50%',height:46,backgroundColor:'transparent'}}>
                         
                          <Text style={{color:colors.selected,fontFamily:global.bold,fontSize:18,textAlign:'left'}}>${item.min}</Text>
                          <Text style={{color:'grey',fontSize:12,textAlign:'left'}}>MIN. INVESTMENT</Text>
                        </View> 
                        <View style={{justifyContent: 'space-between',flexDirection:'column',alignItems:'center',
                        alignSelf: 'center',width:'50%',height:46,backgroundColor:'transparent'}}>
                         
                          <Text style={{color:colors.selected,fontFamily:global.bold,fontSize:18,textAlign:'left'}}>${item.max}</Text>
                          <Text style={{color:'grey',fontSize:12,textAlign:'left'}}>MAX. INVESTMENT</Text>
                        </View> 
                        {/* <View style={{justifyContent: 'space-between',flexDirection:'column',
                        alignItems:'center',
                        alignSelf: 'center',width:'50%',height:60,backgroundColor:'transparent'}}>
                          <ImageBackground 
                          source={require('../assets/Fxbot/copy/btn-bg.png')} resizeMode="stretch"
                          style={{justifyContent: 'space-around',flexDirection:'row',alignItems:'center',
                        alignSelf: 'center',width:160,padding:5}}>
                        <Image source={require('../assets/botz/master/star.png')}
                          style={{width:15,height:15,marginRight:10}}
                          />  
                          <Text style={{color:colors.selected}}>High Achiever</Text>

                          <Image source={require('../assets/botz/info.png')}
                          style={{width:15,height:15}}
                          />
                          </ImageBackground>
                          <ImageBackground 
                          source={require('../assets/Fxbot/copy/btn-bg.png')} resizeMode="stretch"
                           style={{justifyContent: 'space-around',flexDirection:'row',alignItems:'center',
                        alignSelf: 'center',width:160,padding:5,marginTop:10,}}>
                        <Image source={require('../assets/botz/master/star.png')}
                          style={{width:15,height:15,marginRight:10}}
                          />  
                          <Text style={{color:colors.selected}}>Risk Score</Text>

                          <Image source={require('../assets/botz/info.png')}
                          style={{width:15,height:15}}
                          />
                        </ImageBackground> 
                          </View> */}
                        </View>

                        <View style={{justifyContent: 'space-between',flexDirection:'row',alignItems:'center',
                        alignSelf: 'center',width:'92%',height:82,marginTop:20}}>
                            
                        <View style={{flexDirection:'column',justifyContent: 'center',alignItems: 'center',width:'48%'}}>
                         <Text style={{fontSize:14,color:colors.selected}}  allowFontScaling={false}>PARTICIPANTS</Text>
                            <Text style={{color:colors.selected,fontSize:22,textAlign: 'center',fontFamily:global.bold}}  allowFontScaling={false}>{item.copiers}</Text>
                           
                            </View>
                            <View style={{flexDirection:'column',justifyContent: 'center',alignItems: 'center',width:'48%'}}>
                            {/* <Text style={{fontSize:14,color:colors.selected}}  allowFontScaling={false}>GAIN</Text>       
                                <Text style={{color:colors.binanceylw3,fontSize:22,fontFamily:global.bold}}  allowFontScaling={false}>{parseFloat(item.profit).toFixed(2)}</Text> */}
                               
                            </View>
                           
                            {/* <View style={{flexDirection:'column',justifyContent: 'center',alignItems: 'center',width:'26%'}}>
                        <Text style={{fontSize:10,color:colors.selected}}  allowFontScaling={false}>COMMISSION</Text>       
                                <Text style={{color:colors.selected,fontSize:17,fontFamily:global.bold}}  allowFontScaling={false}>{parseFloat(item.comm).toFixed(2)} %</Text>
                                
                            </View> */}
                            {/* <TouchableOpacity onPress={()=>{setDet(true),rev_det(item.date)}}>
                            <Text><MaterialIcons name="keyboard-arrow-right" size={25}  color={'#fff'}   /></Text>       
                            </TouchableOpacity> */}
                        </View>
                        
                        <View style={{justifyContent: 'space-between',flexDirection:'column',alignItems:'center',
                        width:'94%',alignSelf: 'center',height:190,marginTop:2,backgroundColor:'transparent'}}>
                            {/* <Text style={{color:'#fff',alignSelf:'flex-start',fontSize:12}}>Profit and Loss</Text> */}
                           
                            
                            <View style={{justifyContent: 'flex-start',alignItems:'flex-start',
                            alignSelf: 'flex-start',marginTop:20}}>

                            <Text style={{color:colors.selected,fontFamily:global.bold,textAlign: 'justify'}}>STRATEGY DESCRIPTION{'\n'}</Text>
                            <Text style={{color:colors.selected,fontSize:13,lineHeight:20}} numberOfLines={5}>{item.desc}</Text>
                            </View>
                            {/* <View style={{justifyContent: 'space-between',flexDirection:'row',
                            alignItems:'center',position:'absolute',bottom:5,
                        width:'100%',alignSelf: 'center',marginTop:5,height:20}}>
                            <Text style={{}}></Text>
                            <View style={{flexDirection:'row',justifyContent: 'center',
                            alignItems: 'center'}}>
                            <Image source={(item.img=='' || item.img==null || item.img==undefined)?require('../assets/botz/master/profit-icon.png'):{uri:item.img}} style={{ width: 25, height: 13,alignSelf: 'center',marginTop:5,marginRight:5}} resizeMode={'stretch'} />
                        
                            <Text style={{color:'white',fontSize:13,textAlign:'center'}}  allowFontScaling={false}>{parseFloat(item.profit).toFixed(2)} USD</Text>
                             </View>
                             <Text style={{color:'#414959',fontSize:11,fontFamily:global.bold}}>PERFORMANCE</Text>
                             <View style={{flexDirection:'row',justifyContent: 'center',alignItems: 'center'}}>
                            <Text style={{color:'white',fontSize:13,textAlign:'center'}}  allowFontScaling={false}>{parseFloat(item.loss).toFixed(2)} USD</Text>
                            <Image source={(item.img=='' || item.img==null || item.img==undefined)?require('../assets/botz/master/loss-icon.png'):{uri:item.img}} style={{ width: 25, height: 13,alignSelf: 'center',marginTop:5,marginLeft:5}} resizeMode={'stretch'} />

                             </View>
                               
                            </View> */}
                            {/* <View style={{alignItems:'center',justifyContent:'flex-start',position:'absolute',bottom:8,
                        width:'100%',alignSelf: 'flex-start',height:22,}}>
                           {(parseFloat(item.profit)+parseFloat(item.loss))==0?
                           <ProgressBar progress={parseFloat(item.profit)/1} 
                           color={colors.green1} style={{backgroundColor:colors.green1,height:5,width:350,borderRadius:10}}/>
                           :
                           <ProgressBar progress={parseFloat(item.profit)/(parseFloat(item.profit)+(parseFloat(item.loss)*-1))} 
                           color={colors.green1} style={{backgroundColor:colors.red1,height:5,width:350,borderRadius:10}}/>}
                            
                         
                            </View> */}
                            </View>
                            {/* <View>
<Text style={{color:'white'}}>{'\n\n\n'}DISCLAIMER : 
{'\n\n'}All Pools work On basis Of Signals, News Or Chart Readings .{'\n'}So There Is No Gurantee of 100% Profit. 
Please Trade At Your Own Risk.
</Text>
<Text style={{color:'white'}}></Text>

                            </View> */}
         

            </ImageBackground>
            :null}
        <View style={{backgroundColor:'red'}}>

        </View>
      <View style={{marginTop:10,borderTopWidth:0.5,borderColor:'#fff'}}>
            <Text style={{color:'white',lineHeight:30,textAlign:'justify'}}>
              NOTE :{'\n'}
            1. Deposit Amount Approval Takes 6 to 24 hrs{'\n'}
            2. Deposited Amount Will Be Shown In Your Pool Wallet{'\n'}
            3. Profit Amount Will Be Added In The Pool Wallet{'\n'}
            4. Withdrawal Of Total Capital Can Be Requested AnyTime. Withdrawal Will Take 48-72 Hrs To Reach To Your Wallet{'\n'}
            5. Deposits Are Charged Flat 4 USDT Since Forex Broker Accepts Payments in ERC20
              </Text>                
      </View>
      </View>
      </ScrollView>
    </ImageBackground >
  )


}


export default PoolScreenSecond;

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
