/* eslint-disable prettier/prettier */
import * as React from 'react';
import { ThemeProvider } from '@react-navigation/native';
import {
    View, Text,  TouchableOpacity, Linking,
    StyleSheet,  Image, StatusBar,  ImageBackground
} from 'react-native';

import { useFocusEffect, useIsFocused, useTheme } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import AsyncStorage from '@react-native-async-storage/async-storage';
import IonIcons from 'react-native-vector-icons/Ionicons'
import { AuthContext } from '../component/context';
import global from '../component/global'

import theme from '../component/theme';

import ActivationGain from './ActivationGain';
import Profit_Income from './Profit_Income';
import DirectQuant from './DirectQuant';
import TeamQuant from './TeamQuant';
import TeamQuant1 from './TeamQaunt1';
import AllRewards from './AllRewards';
import Rewards from './Rewards';
import GlobalIncome from './GlobalIncome';
import CopyTradingIncome from './CopyTradingIncome';
import { captureScreen } from 'react-native-view-shot';
var RNFS = require('react-native-fs');
import Share from 'react-native-share';

const Tab = createMaterialTopTabNavigator();
const RewardDetails = ({ navigation }) => {
    const { colors } = useTheme();
    const theme = useTheme();
    const refRBSheet1 = React.useRef();
    const [Uid, setUid] = React.useState('');
    const [Loading, setLoading] = React.useState(true);
    const [currency, setCurrency] = React.useState('');
    const [Revenue_data, setRevenue_data] = React.useState('')
    const [Bal, setBal] = React.useState('')
    const isFocused = useIsFocused();
    const [refreshing, setRefreshing] = React.useState(false);
    const [RevDet, setRevDet] = React.useState(false);
    const [Det, setDet] = React.useState(false);
    const [TP, setTP] = React.useState('');
    const [Ti, setTi] = React.useState('');
    const [CP, setCP] = React.useState('');
    const [Ci, setCi] = React.useState('');
    const { toggleTheme } = React.useContext(AuthContext);
    const { signOut } = React.useContext(AuthContext);
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const { App_Lock } = React.useContext(AuthContext);
    const [isModalVisible1, setModalVisible1] = React.useState(false);

    const [imageURI, setImageURI] = React.useState('');
    const [savedImagePath, setSavedImagePath] = React.useState('');

    useFocusEffect(
        React.useCallback(() => {
           
            tabdetails()
            //we can add delay time here before callApi() i.e ' },1000,callApi());' //
        }, [Uid])
    );

    async function tabdetails(){
        setTimeout(async () => {
            // setIsLoading(false);
            let uid;
            uid = null;
            let thm = null;
            let code = null;
            uid = await AsyncStorage.getItem('user_id')

            setUid(uid)
            try {
                callApi(uid);

                setRefreshing(false)
            }
            catch (e) {
                console.log(e);
            }

        });
    }

    const callApi = (uid) => {
        let url = global.BASE_URL + "css_mob/revenue.aspx?uid=" + uid + "&ttype=R"
        console.log(global.BASE_URL + "css_mob/revenue.aspx?uid=" + uid)
        fetch(url)
            .then(item => item.json())
            .then(dta => {
                console.log(dta[0])
                setRevenue_data(dta[0].data)
                setTP(dta[0].today_profit)
                setCP(dta[0].total_profit)
                setTi(dta[0].today_investment)
                setCi(dta[0].total_investment)
            });

        setLoading(false)
    }

    const rev_det = (date) => {
        setLoading(true)
        let url = global.BASE_URL + "css_mob/revenue_details.aspx?uid=" + Uid + "&day=" + date
        console.log(global.BASE_URL + "css_mob/revenue_details.aspx?uid=" + Uid + "&day=" + date)
        fetch(url)
            .then(item => item.json())
            .then(dta => {
                console.log(JSON.stringify(dta))
                setRevDet(dta)
                setLoading(false)
            })
    }



    const takeScreenShot = () => {
        // To capture Screenshot
        captureScreen({
            // Either png or jpg (or webm Android Only), Defaults: png
            format: 'jpg',
            // Quality 0.0 - 1.0 (only available for jpg)
            quality: 0.8,
        }).then(
            //callback function to get the result URL of the screnshot
            (uri) => {
                setSavedImagePath(uri);
                setImageURI(uri);
                console.log(uri)

                RNFS.readFile(uri, 'base64').then((res) => {
                    let urlString = 'data:image/jpeg;base64,' + res;
                    let options = {
                        title: 'Profit',
                        message: 'My Profit',
                        url: urlString,
                        type: 'image/jpeg',
                    };
                    Share.open(options)
                        .then((res) => {
                            console.log(res);
                        })
                        .catch((err) => {
                            err && console.log(err);
                        });
                });
            },
            (error) => console.error('Oops, Something Went Wrong', error),
        );
    };


    return (

        <>
        {/* source={global.bgimg}  */}
        <ImageBackground style={{flex:1, justifyContent:'space-between', width:'100%',paddingTop:10}}>
            {/* <StatusBar backgroundColor={'transparent'} translucent={true} barStyle={theme.dark ? 'light-content' : 'dark-content'} /> */}
            <View style={{flexDirection:'row',justifyContent: 'center'}}>            
            <View style={{ flexDirection: 'column', paddingTop: 35}}>
           
                <View style={{
                    flexDirection: 'row', 
                    alignItems: 'center', borderBottomRightRadius: 50
                }}>
                    <View style={{flexDirection:'column',alignItems: 'center',justifyContent:'center'}}>
                    <TouchableOpacity onPress={()=>navigation.popToTop()} style={{paddingLeft:30}}>
                        <Text style={{textAlign:'right',}}><IonIcons name="md-arrow-back" size={25}  color={colors.selected}   /></Text>
                    </TouchableOpacity>
                </View>
                     <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 50 }}>
                        <Text style={[{ fontSize: 22, color: colors.selected, 
                            fontFamily: global.appFontB, paddingBottom: 5, paddingHorizontal: 15 }]}>{'Earnings'.toUpperCase()}</Text>
                       
                    </View>
                    {/* <View >
                    <Image source={require('../assets/botz/logo1.png')} resizeMode={'contain'} style={{width:50,height:50}} />
                </View> */}
                </View>
                <TouchableOpacity onPress={() => { takeScreenShot() }} style={{marginTop:20}} >
                <ImageBackground source={require('../assets/Aeon/share_icon.png')} 
                resizeMode="stretch" style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5,
                 justifyContent: 'space-evenly', width: '96%',height:45,alignSelf:'center' }}>
                        <Text allowFontScaling={false} style={[ { textAlign: 'center', color: colors.selected, 
                        fontFamily: global.appFontM, fontSize: 16 }]}>SHARE SCREENSHOT</Text>
                        
                            <Image source={require('../assets/Aeon/shareicon.png')}
                             style={{ width: 23, height: 26, alignSelf: 'center',marginLeft:5,left:25,tintColor:colors.profitcolor2 }} resizeMode={'stretch'} />
                    </ImageBackground>
                </TouchableOpacity>
                
            </View>          
            </View>
            <Image source={require('../assets/botz/top-tab-bg.png')} style={{width:'100%',backgroundColor:'red'
            ,height:70,resizeMode:'stretch',position:'absolute',top:'30%'}} />
            <Tab.Navigator
                initialRouteName="profit"
               
                tabBarOptions={{
                    inactiveTintColor: colors.appGray,
                    activeTintColor: colors.selected,
                    
                    labelStyle: {
                        fontSize: 13,fontFamily:global.appFontB, width: 150,
                        textTransform: "uppercase",
                         textAlignVertical:'center', marginTop: 10,
                        
                    },
                    
                    tabStyle: { height: 80,},
                    
                    indicatorStyle: {
                        backgroundColor: colors.profitcolor2,
                        
                    },
                    style: { backgroundColor: 'transparent', elevation: 0 },
                    scrollEnabled: true,
                    allowFontScaling: true,

                }}
                

            >
                <Tab.Screen
                    name="profit"
                    fontSize={7}
                    
                    component={Profit_Income}
                    options={{ tabBarLabel: 'Trading + Incomes',
                    tabBarOptions: { 
                        activeTintColor: '#000',
                        inactiveTintColor: '#fff',
                }, }}

                />
                <Tab.Screen
                    name="all"
                    component={AllRewards}
                    fontSize={7}
                    options={{
                        tabBarLabel: 'All Incomes',
                        tabBarOptions: { 
                            activeTintColor: '#000',
                            inactiveTintColor: '#fff',
                    },
                    }}

                />

                {/* <Tab.Screen
                    name="gain"
                    fontSize={7}
                    component={ActivationGain}
                    options={{ tabBarLabel: 'Activation Gain',
                    tabBarOptions: { 
                        activeTintColor: '#000',
                        inactiveTintColor: '#fff',
                },
                 }}

                />
                <Tab.Screen
                    name="rewards"
                    fontSize={7}
                    component={Rewards}
                    options={{ tabBarLabel: 'Rewards',
                    tabBarOptions: { 
                        activeTintColor: '#000',
                        inactiveTintColor: '#fff',
                },
                 }}

                />
                <Tab.Screen
                    name="globalincome"
                    fontSize={7}
                    component={GlobalIncome}
                    options={{ tabBarLabel: 'Global',
                    tabBarOptions: { 
                        activeTintColor: '#000',
                        inactiveTintColor: '#fff',
                },
                 }}

                />
                <Tab.Screen
                    name="copyincome"
                    fontSize={7}
                    component={CopyTradingIncome}
                    options={{ tabBarLabel: 'Copy Trading',
                    tabBarOptions: { 
                        activeTintColor: '#000',
                        inactiveTintColor: '#fff',
                },
                 }}

                />
                <Tab.Screen
                    name="direct"
                    fontSize={7}
                    component={DirectQuant}
                    options={{ tabBarLabel: 'Gas Fuel Profit',
                    tabBarOptions: { 
                        activeTintColor: '#000',
                        inactiveTintColor: '#fff',
                },
                 }}

                />
                <Tab.Screen
                    name="team"
                    fontSize={7}
                    component={TeamQuant}
                    options={{ tabBarLabel: 'Activation Performance' ,
                    tabBarOptions: { 
                        activeTintColor: '#000',
                        inactiveTintColor: '#fff',
                },
                }}
                


                />
                <Tab.Screen
                    name="team1"
                    component={TeamQuant1}
                    options={{ tabBarLabel: 'Team Performance',
                    tabBarOptions: { 
                        activeTintColor: '#000',
                        inactiveTintColor: '#fff',
                },
                 }}

                /> */}
                {/* <Tab.Screen
                                        name="Profile"
                                        component={Profile}
                                        options={{ tabBarLabel: 'Profile' }}
                                    /> */}
            </Tab.Navigator>
            </ImageBackground>
        </>

    );
}

export default RewardDetails;
const styles1 = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bg,



    },
    hour_box: {

        color: '#808080',
        borderBottomWidth: 0.5,
        width: '80%',
        paddingVertical: 5,
        paddingHorizontal: 0,
        marginHorizontal: 20,

    },
    textInput: {
        marginLeft: 5,

        marginTop: 0,
        paddingBottom: 0,
        fontSize: 16,
    },
    bx: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        // borderWidth:1,
        borderRadius: 10,
        // borderColor:"#3D3F70",
        paddingVertical: 10,
        // backgroundColor:'#ff0000',
        paddingHorizontal: 10,
        marginHorizontal: 5,

        alignItems: 'center',
        height: 90

    },
    text_header: {
        color: "#fff",
        fontWeight: 'bold',
        fontSize: 30
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // borderBottomWidth: 0.5,
        // borderBottomColor: '#808080',
        marginTop: 15,
    },
    text_footer: {
        color: '#f5f5f5f5',
        fontWeight: 'bold',
        fontSize: 16,

    },
    header: {
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center',

    },
    footer: {
        flex: 3,
        backgroundColor: theme.bg,
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


    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    },
    sliderContainer: {
        height: 280,
        width: '90%',
        marginTop: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 10,
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
        borderRadius: 8,

    },
    fitnessbox: {
        paddingHorizontal: 0,
        // borderWidth: 1,
        marginHorizontal: 10,
        marginTop: 5,
        marginBottom: 20,
        borderRadius: 20,
    },
    box_heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15
    },
    card_box: {
        shadowOffset: { width: 20, height: 10 },
        shadowColor: '#303030',
        borderRadius: 0,
        borderColor: '#fff',
        shadowOpacity: 0.5,
        elevation: 10,
        marginTop: 200,
        marginHorizontal: 10,
        paddingHorizontal: 20,
        paddingVertical: 50,
        backgroundColor: '#fff',
    },
    text_card: {
        fontSize: 14,
        fontWeight: 'bold',
    }
});