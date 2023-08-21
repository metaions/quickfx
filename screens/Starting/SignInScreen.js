/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable css_mob/self-closing-comp */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */

import * as React from 'react';
import { View, Linking, Text, StyleSheet, BackHandler, TouchableOpacity, StatusBar, ActivityIndicator, TextInput, ToastAndroid, ImageBackground, Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from '../../component/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    useTheme,
} from '@react-navigation/native';
import global from '../../component/global'
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
// import { Colors } from 'react-native-paper';
// import { colors } from 'react-native-swiper-flatlist/src/themes';
var DeviceInfo = require('react-native-device-info');
import ResetFn from '../ResetFn';

const SignInScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const [SelectedUser, setSelectedUser] = React.useState('user');
    const [Loading, setLoading] = React.useState(false);
    const [Secure, setSecure] = React.useState(true);
    const [Lg_btn, setLg_btn] = React.useState(false);
    const [OTP, setOTP] = React.useState('');
    const [OTP_recieved, setOTP_recieved] = React.useState(null);
    const [OTPView, setOTPView] = React.useState(false);
    const [OTPsent, setOTPsent] = React.useState(false);
    const [Proceed, setProceed] = React.useState(false);
    const [uid, setUid] = React.useState('');
    const { Req_pass } = React.useContext(AuthContext);
    const { signIn } = React.useContext(AuthContext);
    const { Image_Update } = React.useContext(AuthContext);
    const { User_Name } = React.useContext(AuthContext);
    const bginput = '#2a3340'
    const plc = '#666d80'


    const [UserData, setUserData] = React.useState('')
    const [data, setData] = React.useState({
        email: '',
        password: '',
        // check_textInputChange: false,
        secureTextEntry: true
    });




    const textInputChange = (val) => {
        console.log("val", val)
        setData({
            ...data,
            email: val,
            // check_textInputChange: true
        });

    }


    const handlePassword = (val) => {
        setData({
            ...data,
            password: val,

        });
    }

    React.useEffect(() => {

        if (OTPView) {
            const backAction = () => {
                return true;
            };
            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );

            return () => backHandler.remove();
        }


    }, [OTPView]);

    React.useEffect(() => {
        removePrevData()
    },[])

    async function removePrevData(from) {
        
        ResetFn()
       
    }

    const loginHandle = (pass) => {
        console.log("Device Model", DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel());
        var devName = DeviceInfo.getUniqueId() + '&dname=' + DeviceInfo.getModel()
        let pwd;
        if (Lg_btn) {
            pwd = 'metameta'
        } else {
            pwd = data.password
        }
        if (data.email != "" && (data.password != "" || pass != '')) {
            // console.log(data.email,data.password)
            let url = global.BASE_URL + "css_mob/rapp_login1.aspx?uid=" + data.email + "&pwd=" + pwd + "&typ=normal&device=" + devName
            console.log(url)
            fetch(url)
                .then(item => item.json())
                .then(mobData => {
                    console.log(mobData)

                    if (mobData.success === 'true') {
                        global.login_now = true;
                        setLoading(false)
                        console.log(data.email)
                        global.status = 'true'
                        global.NAME = ''
                        //global.data.userid
                        global.EMAIL = ''
                        global.PWD = ''
                        global.AMT = ''
                        type()
                        global.CUR = ''
                        global.api_key = ''
                        global.Coins = null,
                            global.api_key_data = null,
                            global.api_secret = ''
                        global.refurl = ''


                        var minutesToAdd = 20;
                        var currentDate = new Date();
                        var futureDate = new Date(currentDate.getTime() - minutesToAdd * 60000);
                        global.prevtime1 = futureDate
                        global.prevtime = futureDate
                        global.prevtime2 = futureDate
                        global.prevtime3 = futureDate
                        global.prevtime_market = futureDate
                        setUid(mobData.data.userid)
                        if (mobData.device.toLowerCase() === 'false') {
                            setOTPView(true)

                        } else {
                            signIn(mobData.data.userid, mobData.data.isbotz)
                        }
                        async function type() {
                            await AsyncStorage.setItem('logintype', "normal")
                            await AsyncStorage.setItem('myPwd', data.password)
                            await AsyncStorage.setItem('txn_pwd', mobData.data.txn)
                            await AsyncStorage.setItem('token', mobData.data.token)
                            await AsyncStorage.setItem('device_db', mobData.device)
                        }
                    } else {
                        setLoading(false)
                        ToastAndroid.show("Incorrect Id or Password", ToastAndroid.SHORT)
                        // console.log(data.email,mobData.token,"normal login")
                    }

                })
                .catch(e => {
                    setLoading(false)
                    ToastAndroid.show("Incorrect Id or Password", ToastAndroid.SHORT)
                    console.log('error in sigin ', e);
                })
        } else {
            setLoading(false)
            ToastAndroid.show("Above Fields must not be empty", ToastAndroid.SHORT)
        }

    };

    const OTP_api = async () => {
        let token = await AsyncStorage.getItem('token')
        let url = global.BASE_URL + `css_mob/sendotp.aspx?uid=${data.email}&type=login&device=${DeviceInfo.getUniqueId()}&dname=${DeviceInfo.getModel()}&token=${token}`
        console.log(url)
        fetch(url)
            .then(item => item.json())
            .then(dta => {
                console.log(dta)
                if (dta.success === 'true') {
                    ToastAndroid.show('OTP sent successfully!', ToastAndroid.SHORT)
                    setOTPsent(false)
                    setOTP_recieved(dta.otp)
                } else {
                    ToastAndroid.show('Something went wrong! Please try again later', ToastAndroid.SHORT)
                    setOTPsent(false)
                }

            })
    }

    const Verify_device = async () => {
        let url = global.BASE_URL + `css_mob/verifydevice.aspx?uid=${data.email}&otp=${OTP}&device=${DeviceInfo.getUniqueId()}&dname=${DeviceInfo.getModel()}&pwd=${data.password}`
        console.log(url)
        fetch(url)
            .then(item => item.json())
            .then(async dta => {
                console.log(dta)
                if (dta.success === 'true') {
                    await AsyncStorage.setItem('token', dta.token)
                    setProceed(true)
                    signIn(uid)
                    setTimeout(() => { setProceed(true) }, 5000)
                } else {
                    ToastAndroid.show('Something went wrong! Please try again later', ToastAndroid.SHORT)
                    setOTPsent(false)
                }

            })


    }


    if (OTPView) {
        return (
            <View
                style={{ width: '100%', height: '100%', backgroundColor: colors.background }}>
                <View style={styles.container}>
                    <StatusBar backgroundColor={'transparent'} translucent={true} barStyle={"light-content"} />



                    <View
                        animation="fadeIn"

                        style={styles.footer}>

                        <View style={{
                            width: '100%', alignSelf: 'center',
                        }}>
                            <View style={styles.action} >
                                <Text style={[styles.head, { marginTop: 50, fontFamily: global.appFontR }]}>OTP</Text>
                                <View style={{
                                    width: '100%', paddingRight: 25, alignItems: 'center',
                                    flexDirection: 'row', justifyContent: 'space-between', backgroundColor: bginput, marginTop: 10, borderRadius: 4, paddingHorizontal: 5
                                }}>

                                    <TextInput
                                        placeholder="Enter OTP"
                                        keyboardType='default'

                                        style={styles.txtinput}
                                        autoCapitalize="none"
                                        onChangeText={(val) => setOTP(val)}
                                        // width={'70%'}

                                        placeholderTextColor={colors.appGray}
                                        selectionColor='#000'
                                        color='#000'
                                    />
                                    <Text onPress={() => { setOTPsent(true), OTP_api() }} style={{ color: colors.binanceylw2 }}>{OTPsent ? <ActivityIndicator color='#fff' size={15} /> : 'Send OTP'}</Text>
                                </View>
                                <View style={{
                                    width: '100%', paddingRight: 25, alignItems: 'center', fontFamily: global.appFontR,
                                    flexDirection: 'row', justifyContent: 'space-between', backgroundColor: bginput, marginTop: 10, borderRadius: 4, paddingHorizontal: 5
                                }}>
                                </View>
                            </View>


                        </View>

                        <TouchableOpacity
                            onPress={() => {
                                console.log('otp output: ' + OTP + '  ' + OTP_recieved);
                                if (OTP === OTP_recieved) {
                                    Verify_device()

                                } else {
                                    ToastAndroid.show('Please enter OTP first', ToastAndroid.SHORT)
                                }
                            }}

                            style={{ backgroundColor: colors.binanceylw2, width: '25%', padding: 10, borderRadius: 5 }}>
                            <Text>{Proceed ? <ActivityIndicator color='#000' size={25} /> : 'Continue'}</Text>
                        </TouchableOpacity>


                    </View>

                </View>
                <TouchableOpacity onPress={() => { Linking.openURL('https://t.me/iamrobotz') }} style={{ alignSelf: 'center', position: 'relative', bottom: 20, paddingHorizontal: 10 }}>
                    <Animatable.Text animation='pulse' iterationCount={'infinite'} style={{ color: colors.hgl, fontSize: 17, textAlign: 'center' }}>Didtn't recieve the OTP? contact our support team !</Animatable.Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (

        <ImageBackground source={global.bgimg} resizeMode='stretch'
            style={{ width: '100%', height: '100%', flex: 1,  }}>
            <View style={styles.container}>
                <View style={{
                    flexDirection: 'column', width: "100%",
                    justifyContent: 'center', alignItems: 'center', marginTop: '45%'
                }}>
                    <Image source={require('../../assets/Aeon/logo.png')} resizeMode="contain"
                        style={{ width: 250, height: 60 }} />
                    

                </View>


                <View style={{
                    width: '84%', alignSelf: 'center',
                }}>
                    <View style={styles.action} >
                        <Text style={[styles.head, { marginTop: 50, fontFamily: global.appFontR,right:5,bottom:10 }]}>User ID</Text>
                        {/* <ImageBackground source={require('../../assets/botz/input-password-bg.png')} resizeMode='stretch' style={{
                                width: '100%', height:65,paddingRight: 0, alignItems: 'center',
                                flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, borderRadius: 4, paddingHorizontal: 5
                            }}> */}
                        <View style={{width: '100%', flexDirection:'row',justifyContent: 'space-between',alignItems:'center'}}>
                            <FontAwesome name="user" size={25}  color={'#8E99BA'}  style={{right:10}} />
                        <TextInput
                            placeholder="Enter User ID"
                            keyboardType='default'
                            
                            style={styles.txtinput}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChange(val)}
                            placeholderTextColor={'#fff'}
                            selectionColor='#fff'
                            color='#fff'

                        />
                        </View>
                        
                        {/* </ImageBackground> */}
                        <Text style={[styles.head, { marginTop: 40, fontFamily: global.appFontR,right:5,bottom:10 }]}>Password</Text>
                        <View style={{
                            width: '100%',
                            flexDirection: 'row', justifyContent: 'space-between', marginTop: 5,

                        }}>

<View style={{width: '100%', flexDirection:'row',justifyContent: 'space-between',alignItems:'center'}}>
                            <FontAwesome5 name="key" size={25}  color={'#8E99BA'}  style={{right:10}} />
                            <TextInput
                                placeholder="Enter Password"

                                // placeholder="username@gmail.com"
                                keyboardType='default'
                                style={styles.txtinput}
                                // style={[styles.textInput,{borderBottomWidth:0,paddingBottom:-10}]}
                                autoCapitalize="none"
                                // marginTop={10}
                                onChangeText={(val) => handlePassword(val)}
                                secureTextEntry={Secure ? true : false}
                                placeholderTextColor={'#fff'}
                                selectionColor='#fff'
                                color='#fff'

                            />
                            </View>
                           
                            <TouchableOpacity
                                onPress={() => { setSecure(!Secure) }} style={{
                                    alignItems: 'center',
                                    justifyContent: 'center', position: 'absolute', right: 10, top: 20
                                }}>
                                {!Secure ?
                                    <Feather name="eye-off"
                                        color={'#fff'}
                                        size={20}

                                    />
                                    // <Image source={require('../../assets/botz/view-icon.png')} resizeMode="contain" style={{width:20,height:15}} />
                                    :

                                    <Feather name="eye"
                                        color={'#fff'}
                                        size={20}

                                    />
                                    //  <Image source={require('../../assets/botz/not-view.png')} resizeMode="contain" style={{width:20,height:15}} />
                                }
                            </TouchableOpacity>

                        </View>
                    </View>
                    <ImageBackground source={require('../../assets/Aeon/login_btn.png')} resizeMode="stretch"style={[styles.button, (data.email != '' && data.password != '') ?
                        { backgroundColor: 'transparent', } : { backgroundColor: 'transparent', },
                        {
                            width: '95%', paddingVertical: 15, marginLeft: 15,
                            borderRadius: 30, marginTop: 30,
                        }]}>
                    <TouchableOpacity                        
                        onPress={() => { setLoading(true), loginHandle() }} disabled={Loading}>
                        {Loading ?
                            // <ActivityIndicator size={25} color="#fff"/>
                            <LottieView source={require('../../assets/botz/game/loginloading.json')}
                            style={{ width: 30, height: 30, top: -3 }}
                            autoPlay
                            loop />
                            :
                            <Text
                            style={{
                                color: '#000', textAlign: 'center', fontFamily: global.appFontM,
                                fontSize: 20
                            }}>LOGIN</Text>}
                    </TouchableOpacity>
                            </ImageBackground>
                    <TouchableOpacity style={[styles.button, {
                        width: '100%', alignItems: 'center',
                        justifyContent: 'center', paddingVertical: 10
                    }]}
                        onPress={() => { navigation.navigate("ForgotPass") }}>
                        <Text
                            style={{
                                fontSize: 15, color: '#fff',
                                alignSelf: 'flex-start', fontFamily: global.appFontR
                            }}>Forgot Password?</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                        onPress={() => { navigation.navigate("SignUpScreen") }}
                        style={{ alignItems: 'center', top: '30%', width: '100%',height:60}}
                    >
                        <View style={{
                              flexDirection: 'column',height:'100%',
                            justifyContent: 'space-between', alignItems: 'center',
                        }}>
                            <Text style={{ color: '#fff', fontSize: 20,textTransform:'uppercase', 
                            fontFamily: global.appFontM }}>DON'T HAVE AN ACCOUNT?</Text>
                            <Text style={{ color: '#8E99BA', fontSize: 18,textTransform:'uppercase', 
                            fontFamily: global.appFontM }}>Register</Text>

                        </View>
                    </TouchableOpacity> */}
                </View>



            </View>
        </ImageBackground>


    )
}

export default SignInScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',

    },
    txtinput: {
        fontSize: 16,
        fontFamily: global.appFontR,
        borderBottomWidth: 1,
        borderColor: '#2875CA', width: '100%'
    },
    head: {
        color: '#fff',
        // fontFamily:"RotundaB",
        // fontWeight:'bold',
        fontSize: 14, marginTop: 10, marginBottom: -5
    },
    textInput: {
        backgroundColor: 'grey',
        borderBottomWidth: 0.5,
        borderColor: '#90909090',
        borderRadius: 5,
        fontSize: 15,
        marginBottom: '2%',
        paddingVertical: 5,
        paddingLeft: 10


    },
    textInput1: {
        paddingLeft: 25,
        borderWidth: 0.5,
        borderColor: '#808080',
        borderRadius: 5,
        paddingBottom: -10,
        fontSize: 20,


        // fontWeight: 'bold'
    },
    text_header: {
        color: "#9fe7fc",
        // fontWeight: 'bold',
        fontSize: 30,
        marginTop: 5,
        fontFamily: "RotundaB"
    },
    text_header2: {
        color: "white",
        // fontWeight: 'bold',
        fontFamily: "RotundaN",
        fontSize: 14,
        marginTop: 5,

        // fontStyle:'RobotoN'
    },
    action: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',



        paddingVertical: 15,
        // paddingHorizontal:5,
        // marginHorizontal:10,
        borderRadius: 10,


    },
    text_footer: {
        color: "#000",
        fontWeight: '400',
        fontSize: 15,

    },
    header: {
        // flex: 1,
        marginTop: 60,
        justifyContent: 'center',
        alignItems: 'center',

    },
    footer: {
        flex: 1,
        backgroundColor: 'transparent',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        zIndex: 9999,
        marginHorizontal: 25,
        paddingVertical: '30%',

        // alignItems: 'center',
    },
    logo: {
        width: 250,
        maxHeight: 200,
    },
    signIn: {
        width: '90%',
        height: 55,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        //   backgroundColor:global.appColor1,
        flexDirection: 'row', alignSelf: 'center', marginTop: 20
    },
    signUp: {
        marginLeft: 10,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        elevation: 6,
        flexDirection: 'row',

    },
    userType: {
        width: 305,
        height: '18%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        shadowColor: 'black',
        elevation: 8,
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',



    },
    button: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',

        marginTop: 10
    },
    title: {
        fontSize: 22,
        // fontWeight: 'bold'
    },
    textSign: {
        fontSize: 12,
        // fontWeight: 'bold',
        color: '#fff',
        letterSpacing: 0
    },
});











