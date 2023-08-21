
import * as React from 'react';
import { ThemeProvider, useFocusEffect, useIsFocused,useTheme } from '@react-navigation/native';
import { View, Text, Button, Dimensions, TouchableOpacity,ToastAndroid, StyleSheet,RefreshControl, Image, StatusBar,FlatListProps, ListRenderItemInfo,  FlatList, ScrollView, TextInputComponent, TextInput, Alert, ActivityIndicator,BackgroundImage, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import AsyncStorage from '@react-native-async-storage/async-storage';
import global from '../component/global'

import styles from '../component/styles'

import PoolBox from '../component/PoolBox';
import { color } from 'react-native-reanimated';

var arr=[];
var newjson = ''
var Coins='';
var symbol='';
const PoolScreen = ({ navigation }) => {
  const {colors}=useTheme();
   const[Uid,setUid]= React.useState('')
   const[Loading,setLoading]= React.useState(true)
const[data,setData] = React.useState(null)
const[ profit,setProfit] = React.useState(true)
const[ cop,setCop] = React.useState(true)
const[ copSel,setCopSel] = React.useState(true)
const [refreshing, setRefreshing] = React.useState(false);
useFocusEffect(
  React.useCallback(() => {  
    callApi()          
      setTimeout(async () => {
          // setIsLoading(false);
          let uid;
          uid = null;
          uid=await AsyncStorage.getItem('user_id')
          // console.log("******",uid)
          setUid(uid)
                         
        });

      //we can add delay time here before callApi() i.e ' },1000,callApi());' //
  }, [])
);

const callApi=()=>{

  let url = global.BASE_URL+"css_mob/pool.aspx?uid="+global.uid
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
  let a=1
  setTimeout(() => {
    
    if(a==1){
  
      setRefreshing(true);
      callApi()        
    }
  }, 500);
  return ()=> a=2 
})
  
const callBackFn = (item) => {
  console.log("1111111111val is return: " +JSON.stringify(item))
  navigation.navigate('PoolScreenSecond',{item})
  
}

    return (
        
      <ImageBackground source={global.bgimg}
      resizeMode='stretch' style={{flex:1, justifyContent:'space-between', width:'100%',}}>

       
              <ImageBackground source={require('../assets/Fxbot/copy/top-bg.png')}
              resizeMode='stretch'
                    style={{width:'100%',flexDirection:'row',backgroundColor:colors.appColor1,marginBottom:20
                    ,alignSelf:'center',alignItems: 'center',justifyContent:'center',height:150}}
                
                >                                       
                   <View style={{marginLeft:0,marginRight:-20,alignItems:'center',justifyContent:'center'}}>
                     
                      <Text style={{color:colors.selected,fontSize:18,fontFamily:global.bold,padding:5}}>HAVEN'T INVESTED YET?</Text>
                      {/* <View style={{fontSize:11,borderBottomRightRadius:5,padding:5,borderBottomLeftRadius:5,
                       }}> */}
                      <Text style={{color:colors.binanceylw3,fontSize:17,textAlign:'left',lineHeight:30}}>Be a Member of MetaFX Pool</Text>
                 
                   {/* </View>  */}
                      
                  
                    </View>
                  {/* <Image source={require('../assets/botz/moneybag.png')} style={{width:90,height:120,zIndex:999,}}
                   resizeMode={'stretch'}/> */}
                  
                    {/* </View> */}
            
                </ImageBackground>
            
        
    <Animatable.View
            animation="fadeIn"
            style={[styles.footer,{backgroundColor:'transparent',width:'100%',
            alignSelf:'center',marginVertical:10,
            alignItems:'center'}]}>  
                    <View style={{flexDirection:'row',marginBottom:10}}>
              <TouchableOpacity onPress={()=>{setCopSel(true),setCop(!cop)}}
    style={{alignSelf:'flex-end',flexDirection:'row',marginRight:15,backgroundColor:colors.binanceylw3
    ,padding:10,margin:5,borderRadius:5}}>
      <Text style={{color:'#fff',fontWeight:'bold',fontSize:16}}>Sort by : participants</Text>
      <View 
      style={{paddingHorizontal:10}}
      >
        {
          !cop?
          <AntDesign name='arrowdown' size={20} color={'red'}/>
          :
          <AntDesign name='arrowup' size={20} color={'green'}/>
        }
      </View>

    </TouchableOpacity>
    <TouchableOpacity onPress={()=>{setCopSel(false),setProfit(!profit)}}
    style={{alignSelf:'flex-end',flexDirection:'row',marginRight:15,backgroundColor:'#34383e',
    padding:10,borderRadius:5,margin:5}}>
      <Text style={{color:'#fff'}}>Sort by : Profit</Text>
      <View 
      style={{paddingHorizontal:10}}
      >
        {
          !profit?
          <AntDesign name='arrowdown' size={20} color={'red'}/>
          :
          <AntDesign name='arrowup' size={20} color={'green'}/>
        }
      </View>

    </TouchableOpacity>
              </View>
    
    {!Loading && data!=null?     

        <FlatList
          showsVerticalScrollIndicator={false}
          horizontal={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                  }
                  data= {
                    copSel?
                    cop?
                    data.sort(function(a,b){ return (parseFloat(b.copiers)-parseFloat(a.copiers)) })
                    :
                    data.sort(function(a,b){ return (parseFloat(a.copiers)-parseFloat(b.copiers)) })
                    :
                    profit?
                    data.sort(function(a,b){ return (parseFloat(b.profit)-parseFloat(a.profit)) })
                   :
                    data.sort(function(a,b){ return (parseFloat(a.profit)-parseFloat(b.profit)) })
                  
                   }
          initialNumToRender={50}          
          removeClippedSubviews={true}
          keyExtractor={(item,index) => index}
          renderItem={({item, index}) => (
            index<50?
            <View>
              {/* {console.log(item)} */}
          {(item!=null && item!=undefined)?
        //  uid={item.uid}
         <PoolBox name={item.pname}  rank={item.rank} 
           rankimg={item.rankimg} dt={item.dt}
             description={item.desc} profit={item.profit} loss={item.loss} 
             min={item.min} navigation={navigation}
             comm={item.comm} copiers={item.copiers} 
           max={item.max} img={item.userimg} iscopy={item.iscopy}
           callBackFn={()=>{callBackFn(item)}}
        
           uid={Uid} copyid={item.uid}/>:null}
             </View>
          :null
        )}
        />
         :
         <View style={{flex:1,justifyContent:'center'}}>
           <ActivityIndicator size={'large'}  color="#d0d0d0" />
         </View>
         
         }   
<View>
       
      </View>
        </Animatable.View>
    </ImageBackground >
)
       
             
}


export default PoolScreen;

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
  