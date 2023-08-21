import React from 'react';
import {
View,
Text,
Image,
TouchableOpacity,Linking,ActivityIndicator,ToastAndroid,ImageBackground
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
COLORS,FONTS,SIZES,constants,icons,dummyData
} from "../constants";

import{
 createDrawerNavigator,
 DrawerContentScrollView
} from '@react-navigation/drawer';
import { Switch } from 'react-native-paper';
import {MainLayout}  from '../screens';
import Animated from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
// import {connect} from "react-redux";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { setSelectedTab} from "../stores/tab/tabActions";
import { jsonContext } from '../context/GlobalState'; 
import Submenu from "../navigation/Submenu";
import { ScrollView } from 'react-native-gesture-handler';
var DeviceInfo = require('react-native-device-info');
const Drawer = createDrawerNavigator()
import {
    ThemeProvider,
    useFocusEffect,
    useIsFocused,
    useTheme,
    useLinkTo,
    useNavigation,
  } from '@react-navigation/native';
import global from '../component/global'

const CustomDrawerItem = ({label,icon,isFocused,onPress })=>{
    
    
    return(
        <TouchableOpacity
         style={{flexDirection:'row',
        height:40,
        marginBottom:SIZES.base,
        alignItems:'center',
        paddingLeft:SIZES.radius,
        borderRadius:SIZES.base,
        backgroundColor: isFocused ? COLORS.green : null
    }}
    onPress={onPress}
        >
            <Image source={icon} style={{width:20,height:20,tintColor:isFocused?COLORS.white:COLORS.white}}/>
            <Text style={{marginLeft:15,color:isFocused?COLORS.white:COLORS.white,fontSize:12}}>
                {label}
            </Text>
        </TouchableOpacity>
    )
}

const CustomDrawerContent = ({navigation,selectedTab,setSelectedTab})=>{
  const {colors} = useTheme();
  const {hedge,setHedge,safemode,setMainBal,mainBal,otpMode,setOtpMode,appVer} = React.useContext(jsonContext);
  // const [isOtpOn, setIsOtpOn] = React.useState(otpMode=='false'? false:true);
  const [etym, setetym] = React.useState('');
  const [timeron, setTimeron] = React.useState(false);
    const [hide_OTP, setHide_OTP] = React.useState(false);
    const [earningtime, setEarningtime] = React.useState(0);
    const [refreshBalance, setRefreshBalance] = React.useState(false);
    useFocusEffect(
      React.useCallback(() => {
        if (parseInt(global.timeleft) > 0) {
          setTimeron(true);
          // setEarningtime(parseInt(global.timeleft));
        }
      }, []),
      );
    React.useEffect(() => {
      console.log('Imp point 5');
  
      console.log('timer on ' + timeron);
      if (timeron) {
        let interval = setInterval(() => {
          setEarningtime(lastTimerCount => {
            lastTimerCount <= 1 && clearInterval(interval);
  
            var seconds = parseInt(lastTimerCount, 10);
  
            var days = Math.floor(seconds / (3600 * 24));
            seconds -= days * 3600 * 24;
            var hrs = Math.floor(seconds / 3600);
            seconds -= hrs * 3600;
            var mnts = Math.floor(seconds / 60);
            seconds -= mnts * 60;
  
            setetym(days + 'D :' + hrs + 'H :' + mnts + 'M :' + seconds + 's');
  
            return lastTimerCount - 1;
          });
        }, 1000); //each count lasts for a second
        //cleanup the interval on complete
        return () => clearInterval(interval);
      }
    }, [timeron]);
    async function balapi(){
   
            let uid = await AsyncStorage.getItem('user_id');
            let my_pwd = await AsyncStorage.getItem('myPwd');
            let api_key = await AsyncStorage.getItem('api_key');
           let  api_secret = await AsyncStorage.getItem('secret_key');
           
          
            
            if (
              api_key != '' ||
              (api_key != null && secret_key != '') ||
              api_secret != null
            ) {
             
              let url = '';
         
    
           
              url =
                global.BASE_URL +
                'css_mob/get_bin_bal.aspx?asset=USDT&api_key=' +
                api_key +
                '&api_secret=' +
                api_secret +
                '&uid=' +
                uid+
                '&token=' +
                global.token+
                '&device=' +
                DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel();;
               console.log(url);
              fetch(url)
                .then(item => item.json())
                .then(dta => {
                  //consoleFn(url,'end',new Date().toLocaleTimeString());
    
                  setMainBal(Math.round(dta.balance, 4));
                 
                  global.demobal = parseFloat(dta.dbalance).toFixed(2); //Math.round(dta.dbalance, 4)
                  global.livebal = parseFloat(dta.balance).toFixed(2); //Math.round(dta.balance, 4)
                  setRefreshBalance(false)
                }).catch(e=>{
                    setRefreshBalance(false)
                })
            }
    } 
    const myVersion=DeviceInfo.getVersion() 
    const onOTPSwitch = () => {
        setHide_OTP(true) 
        let mode 
        if (otpMode) {          
          mode=false      
        } else{
          
          mode =true          
        }
        let url=global.BASE_URL+'css_mob/loginotp.aspx?uid='+global.uid+'&loginotp='+mode+
        '&token=' +
        global.token+
        '&device=' +
        DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel();
        console.log(url)
        fetch(url)
        .then(item=>item.json())
        .then(data=>{
          console.log(data)
          if(data.success==='True'){
        
  
              setOtpMode(!otpMode)
           
            // setIsOtpOn(!isOtpOn)
          }
          ToastAndroid.show(data.msg,ToastAndroid.SHORT)
        }).then(()=>{
          setHide_OTP(false) 
        })
  
     
      };
    return(
        <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
        <DrawerContentScrollView
        scrollEnabled={true}
        contentContainerStyle={{flex:1}}
        >
            <View
            style={{flex:1,
            paddingHorizontal:10,paddingRight:0,
            paddingVertical:10
            }}
            >
                {/* Close */}
                <View style={{alignItems:'flex-start',justifyContent:'center',flexDirection:'row',justifyContent:'space-between'}}>
                <TouchableOpacity style={{alignItems:"center",justifyContent:'center'}}
                onPress={()=>navigation.closeDrawer()}
                >
                    <Image source={require('../assets/close.png')} resizeMode="stretch" style={{height:20,width:20,tintColor:COLORS.white,left:5}}
                    />
                </TouchableOpacity>
                <View style={{justifyContent: 'flex-end',alignSelf:'flex-end',marginRight:20}}>
            <Text style={{color:'white',textAlign:'right'}}>Version : {myVersion}</Text>
           { appVer!==''?
           appVer.includes(',')?
           appVer.slice(appVer.lastIndexOf(',')+1)!==myVersion?
           <TouchableOpacity onPress={() => {Linking.openURL(global.BASE_URL+'app.aspx')}} style={{backgroundColor: colors.binanceylw2,padding:5,marginTop:8,borderRadius:5,paddingHorizontal:8}}>
              <Text style={{color:'black',textAlign:'center',}}>Update</Text>
              </TouchableOpacity>
              :null
              :null
              :null} 
            </View> 
                </View>
             
                {/* Profile */}
                    <TouchableOpacity style={{flexDirection:'row',alignItems:'center',marginTop:20}}
                    onPress={()=> console.log("Profile")}
                    >
                        <Image source={require('../assets/logom.png')} resizeMode="stretch" style={{height:40,width:50}}
                         />
                         <View style={{marginLeft:20}}>
                            <Text style={{fontSize:15,color:'#fff'}}>Name: {global.NAME}</Text>
                            <Text style={{fontSize:20,color:'#fff'}}>Id: {global.uid}</Text>
                         </View>
                    </TouchableOpacity>
                    <Text style={{fontSize:12,color:'#fff',marginTop:10}}>E-mail:</Text>
                    <Text style={{fontSize:12,color:'#fff',marginTop:1}}>{global.EMAIL}</Text>
                    {mainBal!=''?<ImageBackground style={{flexDirection:'row',alignItems: 'center',justifyContent: 'space-between',paddingHorizontal:10,width:230,height:40,marginVertical:5}}
                    resizeMode={'stretch'}
                    source={require('../assets/sidebar/bgv.png')}>
                        <Text style={{color:'#fff',fontWeight:'bold',fontSize:20}}>Balance </Text>
                        <Text style={{color:colors.binanceylw2,fontWeight:'bold',fontSize:16,}}>{mainBal}$</Text>
                        {refreshBalance?
                      <LottieView  source={require('../assets/botz/game/refreshfx.json')}
                      style={{width:25,height:25,marginBottom:5}} autoPlay loop />
                    :<TouchableOpacity disabled={refreshBalance} onPress={()=>{setRefreshBalance(true),balapi()}} style={{paddingHorizontal:5}}>
                    <LottieView  source={require('../assets/botz/game/refreshfx.json')}
                                style={{width:25,height:25,marginBottom:5}}  loop={false} />
                    </TouchableOpacity>}
                        </ImageBackground>:null}
                        <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                {/* <Image
                  source={require('../assets/logo1.png')}
                  style={{width: 35, height: 40}}
                  resizeMode={'stretch'}
                /> */}
                <View style={{flexDirection: 'column',borderTopWidth:0.5,borderColor:'#fff',marginTop:5,paddingTop:5}}>
                

                  <Text
                    style={
                      {textAlign: 'left', fontSize: 11, color: colors.selected}
                    }>
                    Expires on : {global.dt}
                  </Text>
                  {parseInt(global.timeleft) > 0 ? (
                    <View style={{flexDirection: 'row', marginTop: 3}}>
                      <Text
                        style={{ textAlign: 'left',
                            fontWeight: 'normal',
                            fontSize: 11,
                            color: global.grad3,
                          }}>
                        {' '}
                        Free Trial:{' '}
                      </Text>
                      <Text
                        style={
                        
                          {
                            textAlign: 'left',
                            fontWeight: 'bold',
                            fontSize: 11,
                            color: global.grad3,
                          }
                        }>
                        {etym}
                      </Text>
                    </View>
                  ) : null}
                </View>
              </View>
                {/* Draweritem */}
                <View style={{flex:1,marginTop:10,}}>
                 
               
                    
                    <ScrollView>
                    <View style={{}}>
                    <View style={{flexDirection: 'row',}}>
                    <Text
                              style={[
                                
                                {textAlign: 'center', fontSize: 15, color: colors.selected},
                              ]}>
                              OTP on Login : 
                            </Text>
                            {hide_OTP?
                              <View>
                              <ActivityIndicator
                                color={"#FFF"}
                                size={30}
                                style={{ marginLeft: "5%" }}
                              />
                               </View>
                              :
                            <Switch
                            trackColor={{false: colors.vbg, true: '#17da1e'}}
                            thumbColor={otpMode ? '#f4f3f4' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={onOTPSwitch}
                            value={otpMode}
                            style={{marginLeft: "5%"}}
                          />
                            }
                            {/* {console.log('=====value in rendering: '+)} */}
                    </View> 
                <Submenu navigation={navigation}/>
            </View>
            </ScrollView>
                    
                   
                </View>
                {/* <View style={{marginBottom:SIZES.padding}}>
                
                    
                </View> */}
            </View>
            
        </DrawerContentScrollView>
        </ScrollView>
    )
}

const CustomDrawer=({selectedTab,setSelectedTab})=>{
  const { colors } = useTheme();
    
const [progress,setProgress] = React.useState(new Animated.Value(0))
const scale = Animated.interpolateNode(progress,{
    inputRange:[0,1],
    outputRange:[1,0.7]
})
const borderRadius = Animated.interpolateNode(progress,{
    inputRange:[0,1],
    outputRange:[0,26]
})

const rotateY = Animated.interpolateNode(progress,{
    inputRange: [0, 1],
    outputRange: ['0deg', '0deg']
  })

const animatedStyle={transform:[{scale},{rotateY}]}//borderRadius,
    return(
        <View style={{
            flex:1,backgroundColor:colors.appBlue
            
        }}>
            
           
         <Drawer.Navigator 
         drawerType="slide"
         overlayColor="transparent"
         drawerStyle={{
             flex:1,
             width:'60%',
             paddingRight:0,
             backgroundColor:'transparent'
         }}
         sceneContainerStyle={{
             backgroundColor:'transparent'
         }}
         initialRouteName="MainLayout"
         drawerContent={props=>{
             setTimeout(()=>{
                setProgress(props.progress)
             },0)
             
             return (
                 <CustomDrawerContent 
                 navigation={props.navigation}
                 selectedTab={selectedTab}
                 setSelectedTab={setSelectedTab}
                 />
             )
         }}
         >
                <Drawer.Screen name='MainLayout'>
                    {props => <MainLayout {...props}
                    drawerAnimationStyle={animatedStyle}
                    />}
                </Drawer.Screen>

         </Drawer.Navigator>
         
        </View>
    )
}




// function mapStateToProps(state){
//     return{
//         selectedTab: state.tabReducer.selectedTab
//     }
// }

// function mapDispatchToProps(dispatch){
//     return{
//         setSelectedTab: (selectedTab) =>{return dispatch(setSelectedTab(selectedTab))}
//     }
// }

export default CustomDrawer//connect(mapStateToProps,mapDispatchToProps)(