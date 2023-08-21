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
// import firestore from '@react-native-firebase/firestore';
// import Rates from '../component/Rates'
import styles from '../component/styles'
import { indexOf } from 'lodash';

import { color } from 'react-native-reanimated';

// import * as firebase from 'firebase';
var arr=[];
const CircleScreen = ({ navigation }) => {
  const {colors}=useTheme();
  const theme=useTheme();
  // const {theme}=useTheme();
    const isFocused = useIsFocused();
   const[MyVersion,setMyVersion]= React.useState('1.0')
   const[Uid,setUid]= React.useState('')
   const[BTC,setBTC]= React.useState('')
   
   const [status, setStatus] = React.useState('daily');

   const [currency,setCurrency]= React.useState('')   
   
   const [SortName, setSortName] = React.useState('');
   const [Search, setSearch] = React.useState(false);
   const [isModalVisible, setModalVisible] = React.useState(false);
   
   
   const[Loading,setLoading]= React.useState(false)
   
   const [refreshing, setRefreshing] = React.useState(false);
   const refRBSheet = React.useRef();   
   const [Srt, setSrt] = React.useState('RELEVANCE');
   const [Data, setData] = React.useState([]); 
   const [monthly, setMonthly] = React.useState(); 
   const [daily, setDaily] = React.useState(); 
   const [total, setTotal] = React.useState(); 

   const [Inp_txt, setInp_txt] = React.useState('');
   


  //  React.useEffect(() => {
  //   firestore()
  //     .collection('Users')
  //     .get()
  //     .then((querySnapshot) => {
  //       /*
  //           A QuerySnapshot allows you to inspect the collection,
  //           such as how many documents exist within it,
  //           access to the documents within the collection,
  //           any changes since the last query and more.
  //       */
  //       let temp = [];
  //       console.log('Total users: ', querySnapshot.size);
  //       querySnapshot.forEach((documentSnapshot) => {
  //         console.log('lllllllllllllllllllll')
  //         console.log('user Id: ', documentSnapshot.id);
  //         /*
  //           A DocumentSnapshot belongs to a specific document,
  //           With snapshot you can view a documents data,
  //           metadata and whether a document actually exists.
  //         */
  //         let userDetails = {};
  //         // Document fields
  //         userDetails = documentSnapshot.data();
  //         // All the document related data
  //         userDetails['id'] = documentSnapshot.id;
  //         temp.push(userDetails);
  //         // setListData(temp);
  //       });
  //     });
  // }, []);



// console.log(colors,"these are the colors")
React.useEffect(()=>{                                                                          
            callApi(global.uid)                     
},[status])

const callApi=async(uid)=>{
  if(status=='total'&&total!==undefined){
    setData(total)
    console.log('total called ')
    return
  }else if(status=='daily'&&daily!==undefined){
    setData(daily)
    console.log('daily called ')
    return
  }else if(status=='monthly'&&monthly!==undefined){
    setData(monthly)
    console.log('mothly called ')
    return
  }
  

        let url5=global.BASE_URL+"css_mob/user_list.aspx?uid="+uid+'&type='+status+'&mode=live';
        console.log(url5)
        fetch(url5)
        .then(item => item.json())
        .then(Vdta => {                 
          // console.log(Vdta)
          setData(Vdta)
          if(status=='total'){
            setTotal(Vdta)
          }else if(status=='daily'){
            setDaily(Vdta)
          }else if(status=='monthly'){
            setMonthly(Vdta)
          }
        })
      
        setRefreshing(false)
    
   
} 


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const EmptyList=()=>(
        
    <View style={{flexDirection:'column',justifyContent: 'center',height:'100%',backgroundColor:colors.background}} ><ActivityIndicator size={'small'} color={colors.selected} /></View>
        
)


    return (
       
        
        <ImageBackground source={global.bgimg} resizeMode="stretch" style={[styles.container,{paddingTop:40}]}>
        <ImageBackground source={require('../assets/botz/to-bg.png')} resizeMode="stretch" style={[styles.header,{flex:1.5}]}>
            
        
            <View style={{flexDirection:'row',justifyContent:'space-around',marginVertical:45}}>
                <View style={{flexDirection:'column',justifyContent:'center',alignSelf: 'center',marginTop:30}}>
                    
                    {/* <Image source={require('../assets/botz/arrw1.png')} resizeMode={'contain'} style={{alignSelf:'center',marginVertical:5}}/> */}
                    <ImageBackground source={require('../assets/botz/small-user.png')} resizeMode={'stretch'} style={{width:120,alignItems: 'center',height:120,paddingTop:35}}>
                      <Image source={require('../assets/logom.png')} resizeMode={'contain'} style={{width:50,height:50}} />
                    </ImageBackground>
                    <View style={{backgroundColor:colors.binanceylw2,padding:10,paddingHorizontal:15,borderRadius:50,position:"absolute",alignSelf: 'center',justifyContent: 'center',top:90}}><Text style={{fontWeight:'bold',fontSize:15}}>2</Text></View>
                   { Data.length>1?<Text style={[styles.text,{textAlign:'center',color:'#fff',marginTop:20}]}>{Data[1].name}</Text>  :null}                  
                </View>
                <View style={{flexDirection:'column',justifyContent:'center',alignSelf: 'center',marginHorizontal:-25,zIndex:99999,marginTop:-60,}}>
                    
                    {/* <Image source={require('../assets/botz/king.png')} resizeMode={'contain'} style={{width:35,height:35,alignSelf:'center',marginVertical:5}}/> */}
                    <ImageBackground source={require('../assets/botz/big-user.png')} resizeMode='stretch' style={{width:140,alignItems: 'center',height:150,paddingTop:35}}>
                      <Image source={require('../assets/logom.png')} resizeMode={'contain'} style={{width:70,height:70}} />
                    </ImageBackground>
                    <View style={{backgroundColor:colors.binanceylw2,padding:10,paddingHorizontal:15,borderRadius:50,position:"absolute",alignSelf: 'center',justifyContent: 'center',top:120}}><Text style={{fontWeight:'bold',fontSize:15}}>1</Text></View>
                    { Data.length>0? <Text style={[styles.text,{textAlign: 'center',color:'#fff',marginTop:20}]}>{Data&&Data[0].name}</Text>:null}
                    
                </View>
                <View style={{flexDirection:'column',justifyContent:'center',alignSelf: 'center',marginTop:30}}>
                    
                    {/* <Image source={require('../assets/botz/arrw2.png')} resizeMode={'contain'} style={{alignSelf:'center',marginVertical:5}}/> */}
                    <ImageBackground source={require('../assets/botz/small-user.png')} resizeMode='stretch' style={{width:120,alignItems: 'center',height:120,paddingTop:35}}>
                      <Image source={require('../assets/logom.png')} resizeMode={'contain'} style={{width:50,height:50}} />
                    </ImageBackground>
                    <View style={{backgroundColor:colors.binanceylw2,padding:10,paddingHorizontal:15,borderRadius:50,position:"absolute",alignSelf: 'center',justifyContent: 'center',top:90}}><Text style={{fontWeight:'bold',fontSize:15}}>3</Text></View>
                    { Data.length>2? <Text style={[styles.text,{textAlign:'center',color:'#fff',marginTop:20}]}>{Data&&Data[2].name}</Text>:null}
                    
                </View>
            </View>
            </ImageBackground>
            
       
        
    <Animatable.View
            animation="fadeInUpBig"
            delay={300}
            useNativeDriver={true}
            style={[styles.footer,{borderTopLeftRadius:50,borderTopRightRadius:50}]}>
        
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
        <View style={{width:'95%',alignSelf:'center',top:-35}}>
            <ImageBackground source={require('../assets/botz/tabbed-bg.png')} style={{flexDirection:'row',justifyContent:'space-around',marginVertical:10,width:'100%',height:65,alignItems:'center'}} resizeMode="stretch">
                  <ImageBackground source={status=='daily'?require('../assets/botz/tab-active-btn.png'):require('../assets/botz/tab-btn.png')} resizeMode="stretch" style={{width:95,height:45,alignItems:'center',justifyContent:'center'}}>
                  <TouchableOpacity onPress={()=>{setStatus('daily')}}>
                     <Text style={{color:status==='daily'?'#fff':'grey',fontWeight:'bold',paddingHorizontal:15,paddingVertical:5,borderRadius:5}}>{status==='daily'?'Daily':'D'}</Text>
                 </TouchableOpacity>
                  </ImageBackground>
                  <ImageBackground source={status=='monthly'?require('../assets/botz/tab-active-btn.png'):require('../assets/botz/tab-btn.png')} resizeMode="stretch" style={{width:95,height:45,alignItems:'center',justifyContent:'center'}}>
                  <TouchableOpacity onPress={()=>{setStatus('monthly')}}>
                     <Text style={{color:status==='monthly'?'#fff':'grey',fontWeight:'bold',paddingHorizontal:15,paddingVertical:5,borderRadius:5}}>{status==='monthly'?'Monthly':'M'}</Text>
                 </TouchableOpacity>
                  </ImageBackground>
                  <ImageBackground source={status=='total'?require('../assets/botz/tab-active-btn.png'):require('../assets/botz/tab-btn.png')} resizeMode="stretch" style={{width:95,height:45,alignItems:'center',justifyContent:'center'}}>
                  <TouchableOpacity onPress={()=>{setStatus('total')}}>
                     <Text style={{color:status==='total'?'#fff':'grey',fontWeight:'bold',paddingHorizontal:15,paddingVertical:5,borderRadius:5}}>{status==='total'?'Total':'T'}</Text>
                 </TouchableOpacity>
                  </ImageBackground>
                
             </ImageBackground>
            </View>
        
        {/* <View style={{flexDirection:'row',justifyContent:'space-around',marginVertical:10,width:'100%'}}>
                    <TouchableOpacity onPress={()=>{setStatus('daily')}}>
                        <Text style={{color:status==='daily'?'#000':'#fff',fontWeight:'bold',backgroundColor:status==='daily'?'#fff':null,paddingHorizontal:15,paddingVertical:5,borderRadius:5}}>{status==='daily'?'DAILY':'D'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{setStatus('monthly')}}>
                        <Text style={{color:status==='monthly'?'#000':'#fff',fontWeight:'bold',backgroundColor:status==='monthly'?'#fff':null,paddingHorizontal:15,paddingVertical:5,borderRadius:5}}>{status==='monthly'?'Monthly':'M'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{setStatus('total')}}>
                        <Text style={{color:status==='total'?'#000':'#fff',fontWeight:'bold',backgroundColor:status==='total'?'#fff':null,paddingHorizontal:15,paddingVertical:5,borderRadius:5}}>{status==='total'?'TOTAL':'T'}</Text>
                    </TouchableOpacity>
                    </View> */}
                   

       {Data.length>0? <FlatList
          horizontal={false}
          ListEmptyComponent={EmptyList}
          data={Data}
          showsVerticalScrollIndicator={false}          
          keyExtractor={(item,index) => index}
          renderItem={({item, index}) => (
            // item.SName===global.global_cur?null:
            <View>
              {/* {console.log('indexx see '+index)} */}
              <View  style={{width:'100%',alignSelf: 'center',flexDirection:'row',alignItems: 'center',paddingVertical:5,justifyContent: 'space-between',backgroundColor:index%2===0?'transparent':'transparent',borderBottomWidth:0.5,borderBottomColor:'grey'}}>                                                
                 <View style={{flexDirection:'row',justifyContent:'space-between',alignItems: 'center',alignSelf: 'flex-start',marginLeft:15,width:200}}>
                  <View>
                    <Text style={{fontWeight:'bold',fontSize:18,color:'#fff'}}>#{index+1}</Text>
                  </View>                                                    
                  <Image source={require('../assets/logom.png')} resizeMode={'contain'} style={{width:30,height:30}} />
                  <View style={{flexDirection:'column',justifyContent: 'center'}}>
                  <Text style={{fontWeight:'bold',color:'#fff',fontSize:15,width:100}}>{item.name}</Text>                   

                  </View>
                  </View>
                  <View  style={{backgroundColor:'#4a9529',borderRadius:50,width:90,padding:5,marginRight:15,alignItems: 'center',flexDirection:'row',justifyContent: 'space-evenly'}}>
                  <Image source={require('../assets/botz/star.png')} style={{width:15,height:15,marginRight:5}} />
                        <Text style={{color:'#fff',fontSize:16}} numberOfLines={1}>{item.profit} $</Text>
                  </View>
                  <Feather name={'eye'}  onPress={()=>{navigation.navigate('OrderHistory',{guest_id:item.userid,type:status}),ToastAndroid.show( `Showing Strategy For ${item.name}`,ToastAndroid.LONG)}}  size={20} color={colors.border} style={{marginRight:10}}/>
              </View>
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
    </ImageBackground >
  
)
        
}


export default CircleScreen;

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
  