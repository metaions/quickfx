/* eslint-disable react-native/no-inline-styles */
/* eslint-disable css_mob/self-closing-comp */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import {
    View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, BackHandler,
    StatusBar, Dimensions, ActivityIndicator, Image, Platform, TextInput, ToastAndroid
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import PhoneInput from 'react-native-phone-number-input';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import CountryPicker from "react-native-country-codes-picker/components/CountryPicker";
import { AuthContext } from '../../component/context';
import { ThemeProvider, useFocusEffect, useIsFocused, useTheme } from '@react-navigation/native';
import global from '../../component/global';
var DeviceInfo = require('react-native-device-info');
const bginput = '#2a3340'
const plc = '#666d80'
import { jsonContext } from '../../context/GlobalState';
const SignUpScreenInner = ({ navigation }) => {
    const {UID} =React.useContext(jsonContext)
    
    const phoneInput = React.useRef(null);
    const { colors } = useTheme();
    const [Email, setEmail] = React.useState('');
    const [Email_valid, setEmail_valid] = React.useState(false);
    const [Verify_Mob, setVerify_Mob] = React.useState('');
    const [Count, setCount] = React.useState(false);
    const [Count1, setCount1] = React.useState(false);
    const [seconds, setSeconds] = React.useState(60);
    const [seconds1, setSeconds1] = React.useState(60);
    const [IPass, setIPass] = React.useState(true);
    const [Strong, setStrong] = React.useState(false);
    const [IPassTxn, setIPassTxn] = React.useState(true);
    const [StrongTxn, setStrongTxn] = React.useState(false);
    const [Verify, setVerify] = React.useState('');
    const [OTP, setOTP] = React.useState('');
    const [OTP_mob, setOTP_mob] = React.useState('');
    const [Loading, setLoading] = React.useState(false);
    const { signIn } = React.useContext(AuthContext);
    const [show, setShow] = React.useState(false);
    const [Token, setToken] = React.useState('');
    const [canEmail, setCanEmail] = React.useState(true)
    const [canMobile, setCanMobile] = React.useState(true)
    const [invEmail, setInvEmail] = React.useState(false)
    const bginput = '#2a3340'
    const plc = '#666d80'
    const [countryCode, setCountryCode] = React.useState('+91');
    const [Editable_mno, setEditable_mno] = React.useState(true);
    const [data, setData] = React.useState({
        username: '',
        password: '',
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        refer: '',
        txnPassword: '',
        secureTextEntryTxn: true,
    });

    React.useEffect(() => {
      
        // invCodeApi()
    }, [])
    React.useEffect(() => {

        if (show) {
            console.log("shownnn")
            const backAction = () => {
                setShow(false)
                return true;
            };
            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );

            return () => backHandler.remove();
        }


    }, [show]);
    async function invCodeApi() {
        let url = global.BASE_URL + 'css_mob/get_refer.aspx';
        console.log(url)
        fetch(url)
            .then(item => item.json())
            .then(mobData => {

                console.log(JSON.stringify(mobData))
                handleRefer(mobData.refid)

            })
    }
    React.useEffect(()=>{
  
        setTimeout(() => {
            if(!UID)
            {
   
            }
            else{
                handleRefer(UID.toString())
            }
            
        }, 1000);
    },[])
    const [LoadingRef, setLoadingRef] = React.useState(false)
    React.useEffect(() => {
        if (Count) {

            if (seconds > 0) {
                setTimeout(() => setSeconds(seconds - 1), 1000);
            } else {
                setSeconds(60);
                setCount(false)
                setCanEmail(true)
            }
        }

    });
    React.useEffect(() => {
        if (Count1) {

            if (seconds1 > 0) {
                setTimeout(() => setSeconds1(seconds1 - 1), 1000);
            } else {
                setSeconds1(60);
                setCount1(false)
                setCanMobile(true)
            }
        }

    });

    const textInputChange = (val) => {
        if (val.length !== 0) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false
            });
        }
    }


    const handlePassword = (val) => {
        setData({
            ...data,
            password: val,

        });
    }
    const handlePasswordTxn = (val) => {
        setData({
            ...data,
            txnPassword: val,

        });
    }
    const handleMnoChange = (val) => {
        setData({
            ...data,
            mno: val,

        });
    }

    const handleConfirmPassword = (val) => {
        setData({
            ...data,
            confirm_password: val,

        });
    }
    const handleRefer = (val) => {
        setEmailRef('')
        setData({
            ...data,
            refer: val,
        });

    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }
    const updateSecureTextEntryTxn = () => {
        setData({
            ...data,
            secureTextEntryTxn: !data.secureTextEntryTxn
        })
    }
    const [emailRef, setEmailRef] = React.useState('')
    const [hideRefer, setHideRefer] = React.useState('')

    function getEmailApi() {

        let url = global.BASE_URL + 'css_mob/get_email.aspx?uid=' + data.refer;
        console.log(url)
        fetch(url)
            .then(item => item.json())
            .then(mobData => {
                if (mobData[0].eid === '') {
                    ToastAndroid.show('Invalid Referral Code. Please retry with another code!', ToastAndroid.LONG)
                }
                else {
                    setEmailRef(mobData[0].eid)
                }
                console.log(JSON.stringify(mobData))
                setLoadingRef(false)

            })

    }



    const OTPCall =(val, type) => {                
        if (val != '') {
            let url=global.BASE_URL + "css_mob/sendotp.aspx?eid=" + Email + "&type=" + type+'&device='+DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel()
            console.log(url)
            fetch(url)
                .then(item => item.json())
                .then(SData => {
                    console.log(SData)
                    if (SData.success === "true") {
                        if (type === 'email') {
                            setOTP(SData.otp)
                        } else {
                            setOTP_mob(SData.otp)
                        }
                        ToastAndroid.show("Please Check Your Email Inbox/Spam Folder For Verification Code.", ToastAndroid.LONG)

                        console.log(SData.otp)
                    }


                })

            //  else if(type==='mob'){
            //     console.log(global.BASE_URL+"css_mob/sendotp.aspx?eid="+val+"&type=mobile" )
            //     fetch(global.BASE_URL+"css_mob/sendotp.aspx?eid="+val+"&type=mobile" )
            //     .then(item => item.json())
            //     .then(SData => {
            //       console.log(SData)
            //       if(SData.success==="true"){
            //         setOTP_mob(SData.otp) 
            //         console.log(SData.otp)               
            //       }


            //     })
            // }  
        } else {
            ToastAndroid.show(`Please fill the ${type.toUpperCase()} field to obtain an otp`, ToastAndroid.SHORT)
        }

    };
    const HitApi = () => {
        // console.log("my OTP",OTP ,"sent otp",OTPState )
        if (OTP === OTPState) {
            var rurl = global.BASE_URL + "css_mob/verify.aspx?uid=" + Uid + "&type=email";
            console.log(rurl)
            fetch(rurl)
                .then(item => item.json())
                .then(SData => {
                    if (SData.success === 'true') {
                        ToastAndroid.show(SData.msg, ToastAndroid.SHORT)
                        navigation.goBack();
                    } else {
                        ToastAndroid.show("Invalid Userid/Pwd", ToastAndroid.SHORT)
                    }
                })

        } else {
            ToastAndroid.show("OTP does not match", ToastAndroid.SHORT)
        }
    };

    var specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=₹";
    var checkForSpecialChar = function (string) {
        for (var i = 0; i < specialChars.length; i++) {
            if (string.indexOf(specialChars[i]) > -1) {
                return true
            }
        }
        return false;
    }


    const signupHandle = () => {
        if (IPass) {


            if (Email != '' && data.password != '' && data.confirm_password != '' && data.refer != '' && data.mno != '') {
                if (parseFloat(Verify) !== parseFloat(OTP)) {
                    ToastAndroid.show(" Email Verification code does not match", ToastAndroid.SHORT);
                }
                // else if(parseFloat(Verify_Mob)!==parseFloat(OTP_mob)){
                //     ToastAndroid.show("Mobile Verification code does not match", ToastAndroid.SHORT);
                // }
                else {


                    if (data.password === data.confirm_password) {
                        let url=global.BASE_URL + "css_mob/signup.aspx?eid=" + Email + '&pwd=' + data.password + 
                        '&refid=' + data.refer  + '&txn=' + data.txnPassword+//+ '&code=' + countryCode
                         '&mno=' + data.mno+
                        '&device='+DeviceInfo.getUniqueId()+'&dname='+DeviceInfo.getModel()
                        console.log(url)
                        fetch(url)//+'&mno='+ Mob
                            .then(item => item.json())
                            .then(signupData => {
                                console.log("signup resp " + JSON.stringify(signupData))
                                if (signupData.success === 'true') {
                                    ToastAndroid.show(signupData.msg, ToastAndroid.SHORT);
                                    // signIn(data.username);
                                    navigation.navigate("SignUpDetailInner", { uid: signupData.uname, pw: data.password, txnpw: data.txnPassword,token:signupData.token,apptype:signupData.isbotz,txn:signupData.txn })
                                    // signIn(signupData.uname) 
                                    //signIn(Email)
                                    //signIn(signupData.uname)

                                } else {
                                    ToastAndroid.show(signupData.msg, ToastAndroid.SHORT);
                                }
                            }).then(()=>{
                                setLoading(false)
                            })
                    } else {
                        ToastAndroid.show("Passwords do Not Match !", ToastAndroid.LONG);
                    }
                }
            } else {
                ToastAndroid.show("Please Fill All The Details Correctly !", ToastAndroid.LONG);
            }
        } else {
            ToastAndroid.show("Password too short!", ToastAndroid.LONG);
        }
        setLoading(false)
    };


    const validate = (text) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
          setEmail_valid(false)
          setEmail(text)
          return false;
        }
        else {
            setEmail(text)
          console.log("Email is Correct");
          setEmail_valid(true)
        }
      }

    return (
        <ImageBackground source={global.bgimg} resizeMode="stretch"
            style={{ flex:1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={[styles.container]}>
                <ScrollView style={{ zIndex: 9999, paddingBottom: 0 }}
                    showsVerticalScrollIndicator={false}>
                        <View style={{flexDirection:'row',width:'100%',height:100,justifyContent:'space-between',alignItems:'center'}}>
                        <Image source={require('../../assets/Aeon/sidebar/onenes_logo.png')} resizeMode="stretch" style={{width:70,height:60}}/>
                        <Text style={{ fontFamily: global.appFontB, fontSize: 18, color: colors.profitcolor2,marginRight:90 }}>SIGNUP</Text>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate("SignInScreen") }}
                        style={[styles.header, { width: 100,}]}>
                        {/* <Text style={{ color:'#41c81d', fontSize: 18, padding: 5 }}>LOGIN</Text> */}
                    </TouchableOpacity>
                        </View>
                        
                    {/* <Text style={[styles.text_header,{alignSelf:'center',color:global.appColorGreen,marginTop:10}]}>SIGN<Text style={{color:'#0c0c0c'}}> UP</Text></Text> */}
                    



                    <Animatable.View
                        animation="fadeInUpBig"
                        style={[styles.footer, { marginTop: 0,}]}>

                        <Text style={[styles.text_footer]}>EMAIL</Text>
                        <View style={styles.action}>
                        
                            <TextInput
                                editable={canEmail}
                                //  selectTextOnFocus={canEmail} 
                                placeholder="name@gmail.com"
                                style={styles.textInput}
                                
                                value={Email}
                                color={colors.selected}
                                autoCapitalize="none"
                                // selectioncolor={colors.appBlack}
                                selectionColor={colors.selected}
                                onChangeText={(val) => { validate(val), setOTP('') }}
                                width={230}
                                placeholderTextColor={plc}
                            />
                            <FontAwesome name={Email_valid?'check':'times'} size={20} color={Email_valid?'#00a65a':'#ff0000'}   />
                            {
                                Count ?
                                    <TouchableOpacity onPress={() => {
                                        setCount(false), setEmail(''), setCanEmail(true), setOTP(''), setSeconds(0)


                                    }} style={{}} >
                                        <View style={[{
                                            alignItems: 'center', flexDirection: 'row', justifyContent: 'center',
                                            paddingHorizontal: 6, borderRadius: 50, paddingVertical: 5, backgroundColor: colors.appGray, marginRight: 10
                                        }]}>
                                            <Text style={{ color: colors.selected, fontSize: 10, fontFamily: global.appFontB }}>Change Email</Text>

                                        </View>
                                    </TouchableOpacity>
                                    : null}
                        </View>
                        <Text style={[styles.text_footer,]}>VERIFY EMAIL OTP</Text>
                        <View style={styles.action}>
                           
                            <TextInput

                                placeholder="Verification code"
                                style={[styles.textInput]}
                                color={colors.selected}
                                keyboardType={'number-pad'}
                                autoCapitalize="none"
                                onChangeText={(val) => setVerify(val)}
                                width={200}
                                selectionColor={colors.selected}
                                maxLength={6}
                                placeholderTextColor={plc}

                            />
                            <TouchableOpacity onPress={Count ? null :
                                () => {
                                    if(!Email_valid){
                                        ToastAndroid.show('Please enter valid Email Id ',ToastAndroid.SHORT)
                                        return
                                    }
                                    if (Email != '') {
                                        setCount(true), setCanEmail(false)
                                    }
                                    OTPCall(Email, "email")

                                }} style={{}} >
                                <View style={[{
                                    alignItems: 'center', flexDirection: 'row', justifyContent: 'center',
                                    backgroundColor: colors.profitcolor2,
                                    paddingHorizontal: 5, borderRadius: 5, paddingVertical: 5, width: 80,
                                }]}>
                                    {Count ? null : <Text style={[styles.text, { color: '#fff', fontSize: 12, }]}>SEND OTP</Text>}
                                    {Count ? <Text style={[styles.text, { color: '#fff', fontSize: 12, }]}>RESEND OTP IN: <Text style={{ fontSize: 10 }}> {seconds}</Text>  </Text> : null}

                                </View>
                            </TouchableOpacity>

                        </View>

                        <Text
               style={[styles.text_footer,]}>Mobile No.
               </Text>
             
           
              <PhoneInput
              ref={phoneInput}              
              defaultCode="AE"              
              layout="second"
            //   withShadow
              // autoFocus
              
              onChangeCountry={item=>{console.log("    "+JSON.stringify(item.name), 
              handleMnoChange( item.name))}}
              // onChangeText={item=>{console.log(item)}}
              containerStyle={{
                width: '96%',
                marginTop: 15,
                alignSelf: 'center',
                backgroundColor: 'transparent',
                
                elevation: 5,
                height: 50,
              }}              
              countryPickerButtonStyle={{
                // backgroundColor: colors.appBluebg,
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
              }}           
              disableArrowIcon   
              codeTextStyle={{fontWeight: 'bold',color:colors.selected}}              
              textInputStyle={{fontSize: 16,color:'#fff', borderBottomWidth:1,
              
              borderColor:'#19dc51', }}
              style={{
                        

              }}
              textContainerStyle={{
                paddingVertical: 0,                
                // backgroundColor: colors.appBlue,    
                backgroundColor:'transparent',            
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
              }}              
              onChangeFormattedText={text => {
                console.log(text);
                handleMnoChange(text);
              }}
            />

                        <Text style={[styles.text_footer]}>PASSWORD</Text>
                        <View style={styles.action}>

                            <TextInput
                                placeholder="Enter your password"
                                secureTextEntry={data.secureTextEntry ? true : false}
                                onChangeText={(val) => {
                                    if (val.length >= 6) {
                                        setIPass(true)
                                        setStrong(true)
                                    } else if (val.length < 1) {
                                        setIPass(true)
                                        setStrong(false)
                                    }
                                    else {
                                        setIPass(false)
                                    }
                                    if (checkForSpecialChar(val)) {
                                        console.log("not valid")
                                        ToastAndroid.show(`Can't enter special characters`, ToastAndroid.SHORT)
                                        // alert("Not Valid");
                                    } else {
                                        console.log("Valid")
                                        handlePassword(val)
                                        //   alert("Valid");
                                    }

                                }}
                                value={data.password}
                                style={styles.textInput}
                                autoCapitalize="none"
                                color={colors.selected}
                                width={250}
                                selectionColor={colors.selected}
                                maxLength={20}
                                placeholderTextColor={plc}
                            />
                            <TouchableOpacity onPress={updateSecureTextEntry}>
                                {data.secureTextEntry ?
                                    // <Feather name="eye-off"
                                    //     color={global.appColor2}
                                    //     size={17}
                                    //     style={{ flexDirection: 'row', justifyContent: 'flex-end' }}
                                    // />
                                    <Image source={require('../../assets/botz/not-view.png')} resizeMode="contain" 
                                    style={{width:20,height:15,tintColor:colors.selected}} />
                                    
                                    :
                                    <Image source={require('../../assets/botz/view-icon.png')} resizeMode="contain" 
                                    style={{width:20,height:15,tintColor:colors.selected}} />

                                    // <Feather name="eye"
                                    //     color={global.appColor2}
                                    //     size={17}
                                    //     style={{ flexDirection: 'row', justifyContent: 'flex-end' }}
                                    // />
                                    }
                            </TouchableOpacity>
                        </View>
                        {!IPass ?
                            <Animatable.Text animation={'pulse'} iterationCount={'infinite'} style={{ textAlign: 'right', fontSize: 15, color: '#ff0000', marginTop: 5 }}>Password length should be atleast 6</Animatable.Text>
                            : Strong ?
                                <Animatable.Text animation={'bounceIn'} style={{ textAlign: 'right', fontSize: 15, color: '#00a65a', marginTop: 5 }}>Password Valid</Animatable.Text>
                                : null
                        }
                        <Text style={[styles.text_footer, { marginTop: !IPass ? 0 : 10, color: colors.selected }]}>CONFIRM PASSWORD</Text>
                        <View style={styles.action}>
                          
                            <TextInput
                                placeholder="Re-enter your password"
                                secureTextEntry={data.secureTextEntry ? true : false}
                                onChangeText={(val) => {
                                    if (checkForSpecialChar(val)) {
                                        console.log("not valid")
                                        ToastAndroid.show(`Can't enter special characters`, ToastAndroid.SHORT)

                                    } else {
                                        console.log("Valid")
                                        handleConfirmPassword(val)

                                    }
                                }}
                                style={styles.textInput}
                                color={colors.selected}
                                autoCapitalize="none"
                                width={250}
                                value={data.confirm_password}
                                selectionColor={colors.selected}
                                maxLength={20}
                                placeholderTextColor={plc}
                            />

                        </View>

                        <Text style={[styles.text_footer]}>TRANSACTION PASSWORD</Text>
                        <View style={styles.action}>

                            <TextInput
                                placeholder="Enter transaction password"
                                secureTextEntry={data.secureTextEntryTxn ? true : false}
                                onChangeText={(val) => {
                                    if (val.length >= 4) {
                                        setIPassTxn(true)
                                        setStrongTxn(true)
                                    } else if (val.length < 1) {
                                        setIPassTxn(true)
                                        setStrongTxn(false)
                                    }
                                    else {
                                        setIPassTxn(false)
                                    }
                                    if (checkForSpecialChar(val)) {
                                        console.log("not valid")
                                        ToastAndroid.show(`Can't enter special characters`, ToastAndroid.SHORT)
                                        // alert("Not Valid");
                                    } else {
                                        console.log("Valid")
                                        handlePasswordTxn(val)
                                        //   alert("Valid");
                                    }
                                }}
                                numberOfLines={1}
                                value={data.txnPassword}
                                style={styles.textInput}
                                autoCapitalize="none"
                                color={colors.selected}
                                width={280}
                                selectionColor={colors.selected}
                                maxLength={20}
                                placeholderTextColor={plc}
                            />
                            <TouchableOpacity onPress={updateSecureTextEntryTxn}>
                                {data.secureTextEntryTxn ?
                                    // <Feather name="eye-off"
                                    //     color={global.appColor2}
                                    //     size={17}
                                    //     style={{ flexDirection: 'row', justifyContent: 'flex-end' }}
                                    // />
                                    <Image source={require('../../assets/botz/not-view.png')}
                                     resizeMode="contain" style={{width:20,height:15,tintColor:colors.selected}} />
                                    :
                                    <Image source={require('../../assets/botz/view-icon.png')}
                                     resizeMode="contain" style={{width:20,height:15,tintColor:colors.selected}} />

                                    // <Feather name="eye"
                                    //     color={global.appColor2}
                                    //     size={17}
                                    //     style={{ flexDirection: 'row', justifyContent: 'flex-end' }}
                                    // />
                                    }
                            </TouchableOpacity>
                        </View>
                        {!IPassTxn ?
                            <Animatable.Text animation={'pulse'} iterationCount={'infinite'} s
                            tyle={{ textAlign: 'right', fontSize: 15, color: '#ff0000', marginTop: 5 }}>Password length should be atleast 4</Animatable.Text>
                            : StrongTxn ?
                                <Animatable.Text animation={'bounceIn'}
                                 style={{ textAlign: 'right', fontSize: 15, color: '#00a65a', marginTop: 5 }}>Transaction Password Valid</Animatable.Text>
                                : null
                        }
                        {hideRefer ? null : <>
                            <Text style={[styles.text_footer]}>REFERRAL CODE</Text>
                            <View style={styles.action}>

                                <TextInput
                                    placeholder="Code of person who referred you"
                                    onChangeText={(val) => handleRefer(val)}
                                    style={[styles.textInput, { fontSize: 14 }]}
                                    value={data.refer}
                                    color={colors.selected}
                                    autoCapitalize="none"
                                    width={230}
                                    selectionColor={colors.selected}
                                    maxLength={50}
                                    placeholderTextColor={plc}
                                />

                                {data.refer !== '' ? <TouchableOpacity onPress={() => { setLoadingRef(true), getEmailApi() }} style={{}} >
                                    <View style={[{
                                        alignItems: 'center', flexDirection: 'row', justifyContent: 'center',
                                        paddingHorizontal: 5,
                                        borderRadius: 40, paddingVertical: 5, backgroundColor: colors.profitcolor2,
                                    }]}>
                                        <Text style={{ color: '#000', fontSize: 12 }}>Validate ID</Text>
                                        {LoadingRef ? <ActivityIndicator size={'small'} color="#fff" /> : null}
                                    </View>
                                </TouchableOpacity> : null}
                            </View >
                        </>}
                        {/* <TouchableOpacity
                        style={{marginVertical:10}}
                        onPress={() => {
                            if(!hideRefer)
                            {
                                setHideRefer(true),
                                 handleRefer('top')

                            }
                            else{
                                setHideRefer(false),
                                handleRefer('')

                            }
                              }}>
                            <Text style={{ color: colors.appGray, fontSize: 15 ,marginBottom:50}}>{hideRefer?"I have a referral ID":"I Don't have a referral ID"}</Text>
                        </TouchableOpacity> */}
                        {emailRef !== '' ? <View style={[{
                            alignItems: 'center', flexDirection: 'row',
                            justifyContent: 'center', height: 40, paddingHorizontal: 5,
                            borderRadius: 4, paddingVertical: 5, backgroundColor: 'transparent'
                        }]}>
                            <Text style={[styles.text, { color: 'black', fontSize: 13 }]}>Email ID : <Text style={[styles.text, { color: colors.binanceylw2, fontSize: 15 }]}>{emailRef}</Text></Text>

                        </View> : null}                        
                            
                            {/* <TouchableOpacity
                                disabled={Email != '' && data.password != '' && data.confirm_password != '' && data.refer != ''?false:true}
                                onPress={() => { setLoading(true), signupHandle() }}
                                style={[(Email != '' && data.password != '' && data.confirm_password != '' && data.refer != '') ? 
                                { backgroundColor: colors.binanceylw2 } : { backgroundColor: plc }, 
                                { position: 'absolute', bottom: 0, right: 10, padding: 10, borderRadius: 5 ,}]}>
                                {Loading ?
                                 <ActivityIndicator size={20} color="#fff" />
                                    :
                                <Feather name="arrow-right"
                                    color={colors.background}
                                    size={24}

                                /> 
                                }
                            </TouchableOpacity> */}

                        
                         <TouchableOpacity 
                         disabled={(data.email!='' && data.password!='' && !Loading)?false:true} 
                         onPress={()=>{
                            
                            setLoading(true),signupHandle()}} 
                         style={[(data.email!='' && data.password!='')?{backgroundColor:colors.profitcolor2,color:'#fff'}:{backgroundColor:colors.profitcolor2,color:'#000'},{ width: '100%', paddingVertical: 15,
                               borderRadius:10,marginTop:10,textAlign:'center',fontSize:20}]}>
                   
                        <Text style={[styles.textSign,{color:(data.email!='' && data.password!='')?'#fff':'#fff',textAlign:'center'}]}>SIGNUP{Loading? <ActivityIndicator size={'small'}  color="#d0d0d0" />:null}</Text>
                        
                    
                    </TouchableOpacity> 

                    </Animatable.View>

                </ScrollView>

                <CountryPicker
                    inputPlaceholder='Select Country Code'
                    placeholderTextColor={'#fff'}
                    style={{
                        textInput: {
                            backgroundColor: '#f7931b',
                            color: '#fff'
                        },
                        modal: {
                            zIndex: 99999,
                        }
                    }}
                    show={show}

                    // when picker button press you will get the country object with dial code
                    pickerButtonOnPress={(item) => {

                        setCountryCode(item.dial_code);
                        setShow(false);
                    }}
                />
            </View>
        </ImageBackground>
    )
}

export default SignUpScreenInner;


const styles = StyleSheet.create({
    container: {
        flex: 1, padding: '4%',
        paddingTop: 40,

    },
    textInput: {
        // marginLeft: 15,

        // paddingBottom: 0,
        // backgroundColor:'#fff',
        fontSize: 16
    },
    text_header: {
        color: "#fff",
        // fontWeight: 'bold',
        fontFamily: global.appFontB,
        fontSize: 34
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
        width: '100%',
        alignItems: 'center',
         paddingHorizontal: 0,
         height:60,borderBottomWidth:1,
         borderColor:'#19dc51'

    },
    text_footer: {
        color: "#fff",
        // fontFamily:"RotundaB",
        fontSize: 16,
        marginTop: 15
    },
    header: {
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30

    },
    footer: {


        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 10,
        alignSelf: 'center',
        width: '100%'

    },
    logo: {
        width: 250,
        maxHeight: 200,
    },
    signIn: {
        width: 350,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 45,
        elevation: 6,
        flexDirection: 'row',


    },
    button: {
        alignItems: 'center',
        marginVertical: 30,


    },
    title: {
        fontSize: 22,
        fontFamily: global.appFontB,
    },
    textSign: {
        fontSize: 18,
        fontFamily: global.appFontB,
        color: '#fff'
    },
});