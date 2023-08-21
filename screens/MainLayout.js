import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    FlatList,
    useEffect,
    ImageBackground
} from 'react-native';
import Animated,{useSharedValue,useAnimatedStyle
    ,withTiming,withSpring,withRepeat} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';

import LinearGradient from "react-native-linear-gradient";
import ResetFn from "../screens/ResetFn";
import {AuthContext} from "../component/context";
// import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    Home,
    CartTab,
    QuantitativeScreen,
    Notification,
    Top10screen
} from "../screens";
import AppInfoScreen from "../screens/AppInfoScreen"
import {
    COLORS,FONTS,SIZES,constants,icons,dummyData
    } from "../constants";
import HomeScreenFirebase from './Home/HomeScreenFirebase';
import {Header} from "../component";
import TopEarnersSuperbot from './TopEarnersSuperbot';
import LottieView from 'lottie-react-native';
import Refer from "../screens/InviteScreen";
import SideScreen from '../screens/SideScreen';
import CopyTrading from '../screens/CopyTrading';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
////////////////////////////////////////////////////////////////////////////
const Tabs = createBottomTabNavigator();
const SIZE = 100.0;
const handleRotation = (progress) => {
    'worklet';
    return `${progress.value *2 * Math.PI}rad`
}
export default ({drawerAnimationStyle,navigation,selectedTab,setSelectedTab}) => {
    const {signOut} = React.useContext(AuthContext);
    const progress = useSharedValue(1)
    const scale = useSharedValue(1)
    // React.useEffect(() => {
    //     // if instead of 10 , we type -1 then its infinite time repeatition
    // //   progress.value = withTiming(0.5)//,{duration:5000}
    //   progress.value = withTiming(0,{duration:1500,})//,{duration:5000}
      
    // //   scale.value = withRepeat(withSpring(1),10,true)//,true
    //    //if true then reverse repeat
    // }, [])
    const reanimatedStyle = useAnimatedStyle((focused)=>{
        return{
            // opacity: progress.value,
            // borderRadius:(progress.value*SIZE)/2,
            transform:[
                // {scale:scale.value},
                {rotate:handleRotation(progress)}
            ]
        }
    },[])
console.log('selected tab',selectedTab )
    return(<Animated.View
    style={{
        flex: 1,
        // backgroundColor:COLORS.darkBlue,
        backgroundColor:'#2a3040',
     
        // ...drawerAnimationStyle,
        
    }}
>
    <Header 
    containerStyle={{
            height:50,
            paddingHorizontal: SIZES.padding,
            marginTop:40,
            alignItems:'center',
            backgroundColor:"transparent"
            
            
    }}
    title={selectedTab}
    leftComponent={
    <TouchableOpacity style={{
        width:40,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        // borderWidth:1,
        // borderColor:COLORS.gray2,
        // borderRadius:SIZES.radius
    }}
    // onPress={()=>navigation.openDrawer()}
    >
        <Image  source={require('../assets/Aeon/menu.png')} resizeMode="stretch"
                                style={{width:30,height:30,marginBottom:5}}  />
      
    </TouchableOpacity>
}
rightComponent={
    <TouchableOpacity style={{
        width:40,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        // borderWidth:1,
        // borderColor:COLORS.gray2,
        // borderRadius:SIZES.radius
    }}
    onPress={() => { ResetFn(), signOut(); }}
    >
       <FontAwesome name={'power-off'} size={27} color={'#ddd'} /> 
    </TouchableOpacity>
}
    />
     {/* <Image source={'../assets/Aeon/footer.png'}
     resizeMode="stretch"
            style={{width:'100%',height:50,position:'absolute',bottom:0,zIndex:999,}}
            /> */}
    <Tabs.Navigator
      // default configuration from React Navigation
    //   tabStyle={{backgroundColor:'#021416'}}
    screenOptions ={{
        tabBarShowLabel:false,
        headerShown:false,
        tabBarStyle: {width:'100%', height:80,position:'absolute',elevation:0,
        paddingTop:10
        ,borderTopWidth:0,zIndex:999
    },

        tabBarBackground: () => (
            <ImageBackground source={require('../assets/Aeon/footer.png')}
            resizeMode="stretch"
            style={{width:'100%',height:80,justifyContent:'flex-end'}}
            />
          ),
        // backgroundColor:'gray'
        // activeTintColor: "#fff",
        // inactiveTintColor: "#000000",
        // activeBackgroundColor :'#274627',
        // labelStyle:{marginLeft:SIZES.base,color:COLORS.white,...FONTS.h3}
      }}
    //   sceneContainerStyle={{backgroundColor:'red'}}
      appearance={{whenInactiveShow : 'icon-only',tabBarBackground :"#fff"}}
      initialRouteName="Home"
    >
  

      <Tabs.Screen name="Market" component={QuantitativeScreen}   
      options={{
        tabBarIcon: ({ focused, color, size }) => (
            <Image
                    source={icons.candlestickchart}
                    style={{width:25,height:25,tintColor:focused ? '#19dc51' :COLORS.gray}}
                    />
        ),
        // label:"hiii",
        showLabel: false
      }}
      />
      <Tabs.Screen name="Top Earners" component={AppInfoScreen}  options={{
        tabBarIcon: ({ focused, color, size }) => (
            <Image
                    source={icons.piechart}
                    style={{width:25,height:25,tintColor:focused ? '#19dc51' :COLORS.gray}}
                    />
        ),
        // label:"hiii",
        // showLabel: true
      }}/>
      <Tabs.Screen name="Home" component={HomeScreenFirebase}  options={{
        tabBarIcon: ({ focused, color, size }) => (
            <Animated.Image
                    source={icons.homee}
                    style={[{width:60,height:60,marginTop:-40,elevation:2,shadowColor:'#fff',shadowOpacity:1}]}
                    />
        ),
        // label:"hiii",
        // showLabel: true
      }}/>
      <Tabs.Screen name="Notification" component={Notification}  options={{
        tabBarIcon: ({ focused, color, size }) => (
            <Image
                    source={icons.notification}
                    style={{width:25,height:25,tintColor:focused ? '#19dc51' :COLORS.gray}}
                    />
        ),
        // label:"hiii",
        // showLabel: true
      }}/>
      <Tabs.Screen name="Side" component={SideScreen}  options={{
        
        tabBarIcon: ({ focused, color, size }) => (
            <Image
                    source={icons.user}
                    style={{width:25,height:25,tintColor:focused ? '#19dc51' :COLORS.gray}}
                    />
        ),
        // label:"hiii",
        // showLabel: true
      }}/>

  
    </Tabs.Navigator>
    </Animated.View>
  )}

////////////////////////////////////////////////////////////////////////////////


const TabButton = ({label,icon,isFocused,onPress,outerCointainerStyle,innerCointainerStyle})=>{
    return(
        <TouchableWithoutFeedback
        onPress={onPress}
        >
            <Animated.View style={[
                {
                flex:1,justifyContent:'center',alignItems:'center'
                },outerCointainerStyle
                ]}>
                <Animated.View style={[
                    {
                        flexDirection:'row',width:"80%",height:50,alignItems:'center',justifyContent:'center',borderRadius:25},innerCointainerStyle
                        ]}>
                    <Image
                    source={icon}
                    style={{width:20,height:20,tintColor:isFocused ? COLORS.white :COLORS.white}}
                    />
                    {isFocused &&
                    <Text numberOfLines={1} 
                    style={{marginLeft:SIZES.base,color:COLORS.white,...FONTS.h3}}>
                        {label}
                    </Text>
                    }
                </Animated.View>
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}
 
const MainLayout = ({drawerAnimationStyle,navigation,selectedTab,setSelectedTab}) => {
    

    const flatListRef = React.useRef()

    // Reanimated Shared Value

    const homeTabFlex = useSharedValue(1)
    const homeTabColor = useSharedValue(COLORS.white)
    const top10screenTabFlex = useSharedValue(1)
    const top10screenTabColor = useSharedValue(COLORS.white)
    const cartTabFlex = useSharedValue(1)
    const cartTabColor = useSharedValue(COLORS.white)
    const favouriteTabFlex = useSharedValue(1)
    const favouriteTabColor = useSharedValue(COLORS.white)
    const notificationTabFlex = useSharedValue(1)
    const notificationTabColor = useSharedValue(COLORS.white)
    const {signOut} = React.useContext(AuthContext);

    // Reanimated Animated Style

    const homeFlexStyle = useAnimatedStyle(()=>{
        return{
            flex: homeTabFlex.value
        }
    }) 

    const homeColorStyle = useAnimatedStyle(()=>{
        return{
            backgroundColor:homeTabColor.value
        }        
    })

    const top10screenFlexStyle = useAnimatedStyle(()=>{
        return{
            flex: top10screenTabFlex.value
        }
    }) 

    const top10screenColorStyle = useAnimatedStyle(()=>{
        return{
            backgroundColor:top10screenTabColor.value
        }        
    })

    const cartFlexStyle = useAnimatedStyle(()=>{
        return{
            flex: cartTabFlex.value
        }
    }) 

    const cartColorStyle = useAnimatedStyle(()=>{
        return{
            backgroundColor:cartTabColor.value
        }        
    })

    const favouriteFlexStyle = useAnimatedStyle(()=>{
        return{
            flex: favouriteTabFlex.value
        }
    }) 

    const favouriteColorStyle = useAnimatedStyle(()=>{
        return{
            backgroundColor:favouriteTabColor.value
        }        
    })

    const notificationFlexStyle = useAnimatedStyle(()=>{
        return{
            flex: notificationTabFlex.value
        }
    }) 

    const notificationColorStyle = useAnimatedStyle(()=>{
        return{
            backgroundColor:notificationTabColor.value
        }        
    })

    React.useEffect(()=>{
        setSelectedTab(constants.screens.home)
    },[])


    

    return (
        <Animated.View
            style={{
                flex: 1,
                backgroundColor:COLORS.darkBlue,
                // ...drawerAnimationStyle,
           
                
            }}
        >
            <Header 
            containerStyle={{
                    height:50,
                    paddingHorizontal: SIZES.padding,
                    marginTop:40,
                    alignItems:'center',
                    backgroundColor:"transparent"
                    
                    
            }}
            title={selectedTab}
            leftComponent={
            <TouchableOpacity style={{
                width:40,
                height:40,
                alignItems:'center',
                justifyContent:'center',
                // borderWidth:1,
                // borderColor:COLORS.gray2,
                // borderRadius:SIZES.radius
            }}
            // onPress={()=>navigation.openDrawer()}
            >
                <LottieView  source={require('../assets/botz/game/menubutton.json')}
                                        style={{width:30,height:30,marginBottom:5}} autoPlay loop={false} />
              
            </TouchableOpacity>
        }
        rightComponent={
            <TouchableOpacity style={{
                width:40,
                height:40,
                alignItems:'center',
                justifyContent:'center',
                // borderWidth:1,
                // borderColor:COLORS.gray2,
                // borderRadius:SIZES.radius
            }}
            onPress={() => { 
                ResetFn()
                 signOut()}}
            >
               <FontAwesome name={'power-off'} size={27} color={'#f0f0f0'} /> 
            </TouchableOpacity>
        }
            />
            <View style={{flex:1}}>

            </View>
            
            <View style={{height:70,justifyContent:'flex-end',backgroundColor:'#00050e'}}>

       
                <LinearGradient
                start={{x:0,y:0}}
                end={{x:0,y:4}}
                colors={[
                    COLORS.transparent,
                    COLORS.lightGray1
                ]}
                style={{
                    position:"absolute",
                    top:-20,
                    left:0,
                    right:0,
                    height:80,
                    borderTopLeftRadius:15,
                    borderTopRightRadius:15,

            }}
                />

                {/* Tabs */}
                <View
                style={{
                    flex:1,
                    flexDirection:"row",
                    paddingHorizontal:SIZES.radius,
                    paddingBottom:10,
                    borderTopLeftRadius:20,
                    borderTopRightRadius:20,
                    // borderBottomLeftRadius:20,
                    // borderBottomRightRadius:20,
                    backgroundColor:COLORS.darkBlue

                }}
                >
                    <TabButton
                        label={constants.screens.quantitative}
                        icon={icons.candlestickchart}
                        isFocused={selectedTab== constants.screens.QuantitativeScreen}
                        outerCointainerStyle={favouriteFlexStyle}
                        innerCointainerStyle={favouriteColorStyle}
                        onPress={()=>setSelectedTab(constants.screens.QuantitativeScreen)}
                    />
                    <TabButton
                        label={constants.screens.top10screen}
                        icon={icons.piechart}
                        isFocused={selectedTab== constants.screens.top10screen}
                        outerCointainerStyle={top10screenFlexStyle}
                        innerCointainerStyle={top10screenColorStyle}
                        onPress={()=>setSelectedTab(constants.screens.top10screen)}
                    />
                    <TabButton
                        label={constants.screens.home}
                        icon={icons.homee}
                        isFocused={selectedTab== constants.screens.home}
                        outerCointainerStyle={homeFlexStyle}
                        innerCointainerStyle={homeColorStyle}
                        onPress={()=>setSelectedTab(constants.screens.home)}
                    />
                    
                    
                    <TabButton
                        label={constants.screens.notification}
                        icon={icons.notification}
                        isFocused={selectedTab== constants.screens.notification}
                        outerCointainerStyle={notificationFlexStyle}
                        innerCointainerStyle={notificationColorStyle}
                        onPress={()=>setSelectedTab(constants.screens.notification)}
                    />
                    <TabButton
                        label={constants.screens.cart}
                        icon={icons.user}
                        isFocused={selectedTab== constants.screens.cart}
                        outerCointainerStyle={cartFlexStyle}
                        innerCointainerStyle={cartColorStyle}
                        onPress={()=>setSelectedTab(constants.screens.cart)}
                    />

                </View>
            </View>
        </Animated.View>
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

// export default connect(mapStateToProps,mapDispatchToProps)(MainLayout)