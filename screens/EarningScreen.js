/* eslint-disable prettier/prettier */
import * as React from 'react';
import { ThemeProvider } from '@react-navigation/native';
import { View, Text, Button, Dimensions, Switch, TouchableOpacity, Linking, StyleSheet, RefreshControl, Image, StatusBar, FlatList, ScrollView, TextInput, ActivityIndicator, ToastAndroid, ImageBackground } from 'react-native';
import { Avatar, Card, Title, Paragraph, Divider } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { useFocusEffect, useIsFocused, useTheme } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IonIcons from 'react-native-vector-icons/Ionicons'
import { AuthContext } from '../component/context';
import global from '../component/global'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import theme from '../component/theme';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import RBSheet from "react-native-raw-bottom-sheet";
import styles from '../component/styles';

// import { styles } from 'react-native-fbsdk-next/types/FBLoginButton';


const EarningScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const theme = useTheme();
    const refRBSheet1 = React.useRef();
    const [Uid, setUid] = React.useState('');
    const [Loading, setLoading] = React.useState(false);
    const [currency, setCurrency] = React.useState('');
    const [Asset_data, setAsset_data] = React.useState('')
    const [Bal, setBal] = React.useState('')
    const isFocused = useIsFocused();
    const [refreshing, setRefreshing] = React.useState(false);
    const [Det, setDet] = React.useState(false);
    const [isEnabled, setIsEnabled] = React.useState('');
    const { toggleTheme } = React.useContext(AuthContext);
    const { signOut } = React.useContext(AuthContext);
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const { App_Lock } = React.useContext(AuthContext);
    const [isModalVisible1, setModalVisible1] = React.useState(false);
    const toggleSwitch = () => {
        toggleTheme()
        setIsEnabled(previousState => !previousState)
        if (isEnabled) {
            thm()
            async function thm() {
                await AsyncStorage.setItem("DarkMode", "false")
                console.log("false")
            }
        } else if (!isEnabled) {
            thm()
            async function thm() {
                await AsyncStorage.setItem("DarkMode", "true")
                console.log("true")
            }
        }

    };

    const onToggleSwitch = () => {
        if (isSwitchOn) {
            setIsSwitchOn(false)
            App_Lock("false")
            ToastAndroid.show("Biometry Deactivated", ToastAndroid.SHORT)
        } else if (!isSwitchOn) {
            setIsSwitchOn(true)
            App_Lock("true")
            ToastAndroid.show("Biometry Activated Successfully", ToastAndroid.SHORT)
        }
    };

    useFocusEffect(
        React.useCallback(async () => {

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



            //we can add delay time here before callApi() i.e ' },1000,callApi());' //
        }, [Uid])
    );

    const callApi = (uid) => {
        let url = global.BASE_URL + "css_mob/history.aspx?uid=" + uid + "&ttype=E"
        // let url = 'https://metafuture.trade/fx_mob/history.aspx?uid=cqjmgn&ttype=E'
        console.log(url)
        fetch(url)
            .then(item => item.json())
            .then(dta => {
                setAsset_data(dta)


            });

        let url1 = global.BASE_URL + "css_mob/bal.aspx?uid=" + uid + "&ttype=E"
        console.log(url1)
        fetch(url1)
            .then(item => item.json())
            .then(dta => {
                console.log(dta)
                if (dta.success === 'true') {
                    setBal(dta.msg)
                }

            });
    }

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        callApi(Uid)

    })


    const toggleModal1 = () => {
        setModalVisible1(!isModalVisible1);
    };
    const logOutMetod = () => {
        toggleModal1()
    }



    return (
        Loading ?
            <View style={{
                flexDirection: 'column', justifyContent: 'center', height: '100%',
                backgroundColor: theme.bg
            }} ><LottieView source={require('../assets/loading.json')}
                style={{ width: 300, height: 300, alignSelf: 'center' }} autoPlay loop />

            </View>

            :

            <View style={styles.container}>

                <View style={{ flexDirection: 'column', justifyContent: 'center', width: '100%' }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 5, width: '100%', paddingTop: 40 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
                                <Text style={{ textAlign: 'right' }}><IonIcons name="arrow-back" 
                                size={26} color={colors.selected} /></Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('TransactionScreen')}
                         style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={[styles.heading, { color: colors.profitcolor2, fontSize: 22, marginTop: 0 }]}>EARNING</Text>
                        </TouchableOpacity>
                        <View style={{ alignItems: 'center', justifyContent: 'center', width: 50 }}>
                            <Text style={[styles.heading, { color: colors.appGray, fontSize: 22, marginTop: 0 }]}></Text>
                        </View>
                    </View>
                    <View style={{width:'100%',height:50,position:'absolute',top:150}}>

                    </View>
                    <ImageBackground source={require('../assets/Aeon/earninbgbox.png')} resizeMode={'stretch'}
                        style={{
                            width: '100%', height: 200, 
                            flexDirection: 'column',  marginTop: 20, alignItems: 'center'
                        }}>
                        <View style={{ flexDirection: 'column', alignSelf: 'center',marginTop:15,width: '70%', }}>
                            <Text allowFontScaling={false} style={[styles.sheading, {
                                textAlign: 'center',
                                fontSize: 16, color: colors.selected,marginBottom:15
                            }]}>{'Total Earning'.toUpperCase()}</Text>
                            <View style={{ flexDirection: 'row', 
                            alignItems: 'center', marginTop: 10,width:'90%',
                            alignSelf:'center' }}>
                                <View style={{width:60 }}>

                                
                                </View>
                                <View style={{ flexDirection: 'column',marginLeft:20 }}>
                                    <Text allowFontScaling={false} style={[{  fontSize: 12, color: colors.selected, fontFamily:global.appFontB }]}>CONVERTED (USDT)</Text>

                                    <Text allowFontScaling={false} style={[styles.sheading, {  fontSize: 22, color: colors.selected, marginTop: 5,textAlign:'left' }]}>{Bal} USDT</Text>
                                    <Text allowFontScaling={false} style={[{  fontSize: 15, color: colors.selected, fontFamily:global.appFontB, marginTop: 5, }]}>={(parseFloat(Bal) * parseFloat(global.cur_value)).toFixed(2)} {global.cur_name}</Text>
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity onPress={() => {
                                if (!global.activeId) {
                                    ToastAndroid.show(`Please Activate Your Id First With ${global.ReqValue} USDT`, ToastAndroid.SHORT)
                                } else {
                                    navigation.navigate('Withdraw')
                                }
                            }} style={[styles1.bx, {justifyContent: 'center',
                            width:200,height:60, marginTop:15,
                            alignItems: 'center',//backgroundColor:'red'
                            }]}>
                                {/* <Image resizeMode={'stretch'} style={{ width: 50, height: 45, marginRight: 10 }} source={require('../assets/botz/deposit.png')} /> */}
                                <Text allowFontScaling={false} style={[styles1.text, {
                                     color: colors.selected, textAlign: 'center', fontFamily: global.appFontB }]}>WITHDRAWAL</Text>
                            </TouchableOpacity>
                    </ImageBackground>

               
                </View>
                <View style={{ alignItems: 'center', width: '100%', marginTop:30,
                 paddingBottom: 10 }}>
                    <Text style={{ color: '#8E99BA',fontFamily:global.appFontB,textTransform:'uppercase'
                    , marginHorizontal: 20, fontSize: 20 }}>History record</Text>
                </View>
                <FlatList
                    horizontal={false}
                    data={Asset_data}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => (


                        <View style={{ width: '96%', alignSelf: 'center', padding: 10,marginBottom:10, 
                         borderRadius:10,backgroundColor:colors.appBlack}}>
                            <View style={{ flexDirection: 'column', }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: colors.selected, fontSize: 14, 
                                        fontFamily:global.appFontM, width: 235 }}>{item.dsc}</Text>
                                    <Text style={{ color: 'gray',fontFamily:global.appFontM, fontSize: 14 }}>{item.date}</Text>
                                </View>
                                <View style={{borderTopWidth:1,borderTopColor:colors.appLightestGray,
                                    justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', height: 25, marginTop: 5
                                }}>
                                    <Text style={{ color: colors.selected,fontFamily:global.appFontM, fontSize: 12 }}>  Amount (in USD)</Text>
                                    <Text style={{ color: '#8E99BA',fontFamily:global.appFontM, fontSize: 14 }}>{item.amount}  </Text>


                                </View>
                                <View style={{
                                    justifyContent: 'space-between', flexDirection: 'row',
                                     alignItems: 'center', height: 25, marginTop: 5
                                }}>
                                    <Text style={{ color: colors.selected, fontSize: 12,fontFamily:global.appFontM }}>  Type</Text>
                                    <Text style={{ color: colors.profitcolor, fontSize: 14 ,fontFamily:global.appFontM}}>{item.type}  </Text>


                                </View>
                                {/* <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.appGray, marginTop: 5 }}>
                                    <View style={{ flex: 1, height: 1, backgroundColor: colors.appGray }} />

                                    <View style={{ flex: 1, height: 1, backgroundColor: colors.appGray }} />
                                </View> */}
                                </View>
                        </View>
                    )}
                />
            </View>


    );
}

export default EarningScreen;
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