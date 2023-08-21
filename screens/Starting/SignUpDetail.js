/* eslint-disable react-native/no-inline-styles */
/* eslint-disable css_mob/self-closing-comp */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import { View, Text, StyleSheet,ImageBackground, TouchableOpacity,ScrollView,BackHandler,
     StatusBar, Dimensions,ActivityIndicator,Image, Platform, TextInput,ToastAndroid } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
// import CountryPicker from "react-native-country-codes-picker/components/CountryPicker";
import { AuthContext } from '../../component/context';
import { ThemeProvider, useFocusEffect, useIsFocused,useTheme ,useLinkTo} from '@react-navigation/native';
import global from '../../component/global';
// import messaging from '@react-native-firebase/messaging';
import { color } from 'react-native-reanimated';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import ResetFn from '../../screens/ResetFn';
// import { colors } from 'react-native-swiper-flatlist/src/themes';


const SignUpDetail = ({ navigation,route }) => {
 const linkTo = useLinkTo(); 
 const { colors } = useTheme();
    const [uid, setUid] = React.useState(route.params?.uid);
    const [pwd, setPwd] = React.useState(route.params?.pw);
    const [txnPwd, setTxnPwd] = React.useState(route.params?.txnpw);
    const [token, setToken] = React.useState(route.params?.token);
    const [txn, setTxn] = React.useState(route.params?.txn);
    const [apptype, setAppType] = React.useState(route.params?.apptype);
   // const [Mob, setMob] = React.useState('');
    //const [Verify_Mob, setVerify_Mob] = React.useState('');
    const [Count, setCount] = React.useState(false);
   // const [Count1, setCount1] = React.useState(false);
    const [seconds, setSeconds] = React.useState(60);
    const [seconds1, setSeconds1] = React.useState(60);
    const [IPass,setIPass] = React.useState(true);
    const [Strong,setStrong] = React.useState(false);
    const [IPassTxn,setIPassTxn] = React.useState(true);
    const [StrongTxn,setStrongTxn] = React.useState(false);
    const [Verify, setVerify] = React.useState('');
    const [OTP, setOTP] = React.useState('');
   // const [OTP_mob, setOTP_mob] = React.useState('');
    const [Loading, setLoading] = React.useState(false);
    const { signIn } = React.useContext(AuthContext);
    const [show, setShow] = React.useState(false);
    
    const [canEmail, setCanEmail] = React.useState(true)
    //const [canMobile, setCanMobile] = React.useState(true)
    
  const [countryCode, setCountryCode] = React.useState('+91');
    const [data, setData] = React.useState({
        username: '',
        password: '',
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        refer: '',
 txnPassword:'',
        secureTextEntryTxn: true,
    });


 React.useEffect(() => {
    
   
        // console.log("shownnn")
        const backAction = () => {
            setShow(false)
           return true;
          };
      const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();   
    
   

  }, [show]);

  function setMyVals(){
    ResetFn()
    type()
    var minutesToAdd=20;
    var currentDate = new Date();
    var futureDate = new Date(currentDate.getTime() - minutesToAdd*60000);
        global.prevtime1 = futureDate
       global.prevtime = futureDate
        global.prevtime2=futureDate
        global.prevtime3 = futureDate
        global.prevtime_market=futureDate
        
    signIn(uid,apptype) 
  }
async function type(){
        await AsyncStorage.setItem('logintype',"normal")
        await AsyncStorage.setItem('myPwd',pwd)
        await AsyncStorage.setItem('token',token)
        await AsyncStorage.setItem('txn_pwd',txn)
    }

    return (
        <ImageBackground
        source={global.bgimg}
        style={{
            width: '100%', height: '100%', alignItems: 'center'
        }}>
        <Image source={require('../../assets/Aeon/logoA.png')} resizeMode={'stretch'}
            style={{ marginTop: 40, width: 170, height: 150 }} />
        <ImageBackground source={require('../../assets/Aeon/register_box.png')}
            style={{ width: '100%', height: 550 }} resizeMode="stretch">
            <View style={{ margin: 20,  marginTop: 50 }}>

                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center',marginTop:5 }}>
                    <Text style={{
                        fontFamily: global.appFontB, textTransform: 'uppercase', fontSize: 22,
                        color: colors.appBlack
                    }}>Registration Complete</Text>
                </View>

                <View
                    style={{ marginTop: 10, width: '96%' }}

                >

                    <Text style={{ color: colors.appGray,fontFamily:global.appFontM
                    , alignSelf: 'center', fontSize: 17, textAlign:'center',
                    marginTop: 15, }}>Your account is registered successfully.</Text>
                     <View style={{ width: '80%', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: 30 }}>
                         <Text style={[styles.textLeft, { color: colors.appBlue }]}>Username</Text>
                        <View style={{
                            width: '100%', flexDirection: 'row', alignItems: 'center', 
                            padding: 10, paddingVertical: 5,
                            borderRadius: 5,
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                            borderBottomWidth: 1.5, borderColor:colors.appBlue,marginBottom:10,
                        }}>
                            <Image source={require('../../assets/signup/ico1.png')} style={{ width: 20, height: 20, marginRight: 10, tintColor:'#000' }} />
                            {/* <Text style={styles.textLeft}>Username     :  <Text style={styles.textLeft2}>{uid}</Text></Text> */}
                            <View style={{ flexDirection: 'column', marginLeft: 5 }}>

                                <Text style={styles.textLeft2}>{uid}</Text>
                            </View>
                        </View>
                        <Text style={[styles.textLeft, { color: colors.appBlue }]}>Password</Text>
                        <View style={{
                            width: '100%', flexDirection: 'row', alignItems: 'center', padding: 10, paddingVertical: 5,
                            borderRadius: 5,
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                            borderBottomWidth: 1.5, borderColor:colors.appBlue,marginBottom:10, marginTop: 10
                        }}>
                            <Image source={require('../../assets/signup/ico2.png')} style={{ width: 20, height: 20, marginRight: 10, tintColor:'#000' }} />
                            <View style={{ flexDirection: 'column', marginLeft: 5 }}>

                                <Text style={styles.textLeft2}>{pwd}</Text>
                            </View>
                            {/* <Text style={styles.textLeft}>Password      :  <Text style={styles.textLeft2}>{pwd}</Text></Text> */}
                        </View>
                        <Text style={[styles.textLeft, { color: colors.appBlue }]}>TXN Password</Text>
                        <View style={{
                            width: '100%', flexDirection: 'row', alignItems: 'center', padding: 10, paddingVertical: 5,
                            borderRadius: 5,
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                            borderBottomWidth: 1.5, borderColor:colors.appBlue,marginBottom:10, marginTop: 10
                        }}>
                            <Image source={require('../../assets/signup/ico3.png')}
                                style={{ width: 20, height: 25, marginRight: 10, tintColor:'#000' }} />
                            <View style={{ flexDirection: 'column', marginLeft: 5 }}>

                                <Text style={styles.textLeft2}>{txnPwd}</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: colors.appBlue2, elevation: 6, 
                            shadowColor: colors.appBlue,
                             shadowOpacity: 0.2,backgroundColor:colors.appSkyblue,
                            borderRadius:25, marginTop: 40, width: 280, 
                            alignItems: 'center', marginBottom: 30, justifyContent: 'center',
                            alignSelf: 'center'
                        }}
                        onPress={() => { setMyVals() }}>
                        <Text style={{ color: '#fff',fontFamily:global.appFontM, paddingVertical: 10, 
                        paddingHorizontal: 15, fontSize: 18, }}>{'Proceed To Home'.toUpperCase()}</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </ImageBackground>
    </ImageBackground>
    )
}

export default SignUpDetail;

const styles = StyleSheet.create({
    // const { colors } = useTheme();
    container: {
        flex: 1,
     paddingTop:'15%'   
        
    },
    textInput: {
        // marginLeft: 15,
        
        paddingBottom: 0,
        
        fontSize:16
    },
    textLeft: {
        // color: colors.appBlue,
        // fontWeight: 'bold',
        fontSize: 15,
        marginVertical: 0,
        alignSelf: 'flex-start',
        width: '100%'
    },
    textLeft2: {
        color: '#000',
        fontFamily: global.appFontM,
        fontSize: 19,
        // marginVertical:5,
        // textAlign:'right',
        
        width:'100%'
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        borderColor: '#90909090',
        marginVertical: 5,
        width:'100%',
        borderRadius:7,
        alignItems: 'center',

        // paddingHorizontal:10
        
    },
    text_footer: {
        color: "#fff",
        fontWeight: 'bold',
        fontSize: 16,
        marginTop:15
    },
    header: {          
        paddingTop:50,
        paddingBottom:100,        
        alignItems: 'center',
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30

    },
    footer: {        
        
        
        paddingVertical:15,
        paddingHorizontal:15,
        borderRadius:10,
        alignSelf: 'center',
        width:'100%'
        
    },
    logo: {
        width: 250,
        maxHeight: 200,
    },
    signIn: {
        width: 300,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        elevation: 6,
        flexDirection: 'row',


    },
    button: {
        alignItems: 'center',
        marginVertical: 30,


    },
    title: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    },
});