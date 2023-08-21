import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    FlatList,
    useEffect
} from 'react-native';
import Animated,{useSharedValue,useAnimatedStyle,withTiming} from 'react-native-reanimated';
import {connect} from "react-redux";
import { setSelectedTab } from "../stores/tab/tabActions";
import LinearGradient from "react-native-linear-gradient";
import ResetFn from "../screens/ResetFn";
import {AuthContext} from "../component/context";
import {
    Home,
    CartTab,
    QuantitativeScreen,
    Notification,
    Top10screen
} from "../screens";
import MetaWall from "../screens/MetaWall"
import {
    COLORS,FONTS,SIZES,constants,icons,dummyData
    } from "../constants";

import {Header} from "../component";
import LottieView from 'lottie-react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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


    React.useEffect(()=>{
        if(selectedTab == constants.screens.home){
            flatListRef?.current.scrollToIndex({
                index:0,
                animated:false
            })
            homeTabFlex.value= withTiming(4,{duration:100})
            homeTabColor.value=withTiming(COLORS.green,{duration:100})
        }else{
            homeTabFlex.value= withTiming(1,{duration:100})
            homeTabColor.value=withTiming(COLORS.transparent,{duration:100})
        }
        if(selectedTab == constants.screens.top10screen){
            flatListRef?.current.scrollToIndex({
                index:1,
                animated:false
            })
            top10screenTabFlex.value= withTiming(4,{duration:100})
            top10screenTabColor.value=withTiming(COLORS.green,{duration:100})
        }else{
            top10screenTabFlex.value= withTiming(1,{duration:100})
            top10screenTabColor.value=withTiming(COLORS.transparent,{duration:100})
        }
        if(selectedTab == constants.screens.cart){
            flatListRef?.current.scrollToIndex({
                index:2,
                animated:false
            })
            cartTabFlex.value= withTiming(4,{duration:100})
            cartTabColor.value=withTiming(COLORS.green,{duration:100})
        }else{
            cartTabFlex.value= withTiming(1,{duration:100})
            cartTabColor.value=withTiming(COLORS.transparent,{duration:100})
        }
        if(selectedTab == constants.screens.favourite){
            flatListRef?.current.scrollToIndex({
                index:3,
                animated:false
            })
            favouriteTabFlex.value= withTiming(4,{duration:100})
            favouriteTabColor.value=withTiming(COLORS.green,{duration:100})
        }else{
            favouriteTabFlex.value= withTiming(1,{duration:100})
            favouriteTabColor.value=withTiming(COLORS.transparent,{duration:100})
        }
        if(selectedTab == constants.screens.notification){
            flatListRef?.current.scrollToIndex({
                index:4,
                animated:false
            })
            notificationTabFlex.value= withTiming(4,{duration:100})
            notificationTabColor.value=withTiming(COLORS.green,{duration:100})
        }else{
            notificationTabFlex.value= withTiming(1,{duration:100})
            notificationTabColor.value=withTiming(COLORS.transparent,{duration:100})
        }
    },[selectedTab])


    return (
        <Animated.View
            style={{
                flex: 1,
                backgroundColor:COLORS.darkBlue,
                ...drawerAnimationStyle,
                // marginLeft:-70
                elevation:7,
                shadowColor:COLORS.white,
                
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
            onPress={()=>navigation.openDrawer()}
            >
                <LottieView  source={require('../assets/botz/game/menubutton.json')}
                                        style={{width:30,height:30,marginBottom:5}} autoPlay loop={true} />
                {/* <Image 
                source={icons.menu}
                /> */}
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
               <FontAwesome name={'power-off'} size={27} color={'#f0f0f0'} /> 
            </TouchableOpacity>
        }
            />
            <View style={{flex:1}}>
            {/* <Text>MainLayout</Text> */}
            <FlatList
            ref={flatListRef}
            horizontal={false}
            scrollEnabled={false}
            pagingEnabled
            snapToAlignment='center'
            snapToInterval={SIZES.width}
            showsHorizontalScrollIndicator={false}
            data={constants.bottom_tabs}
            keyExtractor={item=>`${item.id}`}
            renderItem={({item,index})=>{
                return(
                    <View style={{height:SIZES.height,width:SIZES.width}}>
                        {item.label == constants.screens.home && <Home/>}
                        {item.label == constants.screens.top10screen && <Top10screen/>}
                        {item.label == constants.screens.cart && <MetaWall/>}
                        {item.label == constants.screens.QuantitativeScreen && <QuantitativeScreen/>}
                        {item.label == constants.screens.notification && <Notification/>}
                    </View>
                )
            }}
            />
            </View>
            
            <View style={{height:70,justifyContent:'flex-end',backgroundColor:'#00050e'}}>

                {/* Shadow */}
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





function mapStateToProps(state){
    return{
        selectedTab: state.tabReducer.selectedTab
    }
}

function mapDispatchToProps(dispatch){
    return{
        setSelectedTab: (selectedTab) =>{return dispatch(setSelectedTab(selectedTab))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MainLayout)