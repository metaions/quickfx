/* eslint-disable prettier/prettier */
import * as React from 'react';
// import { ThemeProvider } from '@react-navigation/native';
import { View,ImageBackground, Text, Button, Dimensions, TouchableOpacity, StyleSheet, Image, StatusBar, FlatList, ScrollView, TextInput,ActivityIndicator,ToastAndroid } from 'react-native';
import { Avatar, Card, Title, Paragraph, Divider } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
// import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from 'react-native-modal';
import { AuthContext } from '../../component/context';


import {
    ThemeProvider,
    useFocusEffect,
    useIsFocused,
    useTheme,
    useLinkTo,
} from '@react-navigation/native';


import global from '../../component/global';

const ForgotPass = ({ navigation }) => {
    const { colors } = useTheme();
    const [Uid, setUid] = React.useState('')
    const [User, setUser] = React.useState('')
    const bginput = '#2a3340'
    const plc = '#666d80'
    const [InputChange, setInputChange] = React.useState(false)
    const [InputChange1, setInputChange1] = React.useState(false)
    const [isModal2Visible, setModal2Visible] = React.useState(false);
    const { signOut } = React.useContext(AuthContext);
    const [Loading, setLoading] = React.useState(false);
  
    useFocusEffect(
        React.useCallback(() => {            
            setTimeout(async () => {
                // setIsLoading(false);
                let uid;
                uid = null;
                uid=await AsyncStorage.getItem('user_id')
                setUid(uid)
                               
              },1000);

            //we can add delay time here before callApi() i.e ' },1000,callApi());' //
        }, 1000,[])
    );

    const textInputChange = (val) => {
            
           if (val.length != 0) {
               setUser(val)
               setInputChange(true)
            } else {
                setInputChange(false)
            }
      
    }
    
    const ChangeHandle=()=>{
        // console.log(User)
        if(User!=''){
            setLoading(true);
            let url=global.BASE_URL+"css_mob/forgot.aspx?uid="+User
            console.log(url)
            fetch(url)
            .then(item => item.json())
            .then(CData => {
                setLoading(false);
                console.log(CData)
                if(CData.success===true){
                    ToastAndroid.show("Please Check Your Email Inbox/Spam Folder For Verification Code.",ToastAndroid.LONG)     
                    toggleModal2()
                    // navigation.goBack();            
                }else{
                    ToastAndroid.show(CData.msg,ToastAndroid.SHORT)
                }          
                
            })
        }else{
            ToastAndroid.show("Enter user id first",ToastAndroid.SHORT)
        }
   
    }
    const toggleModal2 = () => {
        setModal2Visible(!isModal2Visible);
      };


    return (
        <ImageBackground source={global.bgimg} resizeMode="stretch"
         style={{flex:1,alignItems:'center',justifyContent: 'center',paddingHorizontal:10}}>
        {/* <View style={styles.header}> */}
                {/* <Animatable.Image source={require('../assets/metalogo.png')}
                style={{width:'90%',height:110,marginTop:60}} resizeMode={'stretch'}
                delay={1000}
                duration={2000}
                useNativeDriver={true}
                    animation={'bounceInUp'}/>
              
                <Text style={[styles.text_header2,{color:'#cccccc'}]}>PLEASE ENTER YOUR E-MAIL ID</Text> */}
            {/* </View> */}
          
            <View  style={styles.container}>    
            {/* <TouchableOpacity style={{width:50,marginBottom:50}} onPress={() =>{navigation.goBack()}}>
            <Feather name="arrow-left"
                                            color={"#fff"}
                                            size={28}

                                        />
            </TouchableOpacity>        */}
            <View style={{marginTop:40,alignItems:'center'}}>
                <MaterialCommunityIcons name="lock-reset" color={colors.profitcolor2} size={122} />
            <Text style={{ fontFamily: global.appFontM, fontSize: 26, color: colors.selected,marginTop:30 }}>RESET PASSWORD</Text>
            
            </View>
               
        
      
            <View style={styles.action} >
            <Text style={{color:colors.selected}}>User ID</Text>
            {/* <ImageBackground source={require('../../assets/botz/input-password-bg.png')} resizeMode='stretch'  style={{
                                width: '100%', paddingRight: 0, alignItems: 'center',
                                flexDirection: 'row', justifyContent: 'space-between',  marginTop: 10, borderRadius: 4, 
                                paddingHorizontal: 5
                            }}> */}
                 <TextInput
                     placeholder="Enter User ID"
                     keyboardType='default'                     
                     style={{borderBottomColor:colors.profitcolor2,borderBottomWidth:1,}}
                     autoCapitalize="none"
                     onChangeText={(val) => textInputChange(val)}
                     width={'100%'}
                     placeholderTextColor= {plc}
                     selectionColor={'#fff'}
                     color='#fff'
                   
                 />
                {/* </ImageBackground> */}

                     
                       
                         
                         <View style={styles.button}>
                            <TouchableOpacity
                                style={[User!=''?{backgroundColor:colors.profitcolor2,}:{backgroundColor:colors.profitcolor2,},
                                {width:'96%',borderRadius:20,alignItems:'center',
                                paddingVertical:10,justifyContent: 'center'}]}
                                onPress={() => { ChangeHandle() }}
                                activeOpacity={0.8}
                                underlayColor="#000"
                            >
                                {!Loading?
                            // <ActivityIndicator size={25} color="#fff"/>
                            <Text style={styles.textSign}>Send Password</Text>
                            :<LottieView source={require('../../assets/botz/game/loginloading.json')} style={{width: 30, height: 30,top:-3}}
                            autoPlay
                            loop/>
                             
                                    
                                }
                            </TouchableOpacity>
                        </View> 
                        {/* <Animatable.Image source={require('../assets/trd/bot.png')}
                style={{width:200,height:200,marginTop:70,alignSelf:'center'}} resizeMode={'stretch'}
                delay={1000}
                duration={2000}
                useNativeDriver={true}
                    animation={'bounceInUp'}/> */}
                        </View>
                       

                                                                                                                                 
            
        <Modal  isVisible={isModal2Visible}  style={{alignSelf:'center'}} animationInTiming={300} animationOutTiming={200}>
                
            <View style={{width:350,height:200,flexDirection:'column',justifyContent:'center',paddingHorizontal:15,borderRadius:10,borderBottomWidth:0}}>
            <LottieView source={require('../../assets/success.json')} style={{width:'100%',alignSelf:'center',paddingVertical:0}} autoPlay loop={false}  duration={6000} />
            <TouchableOpacity onPress={()=>{navigation.goBack()}}>
            <Animatable.View delay={5000} style={{marginTop:5,width:'80%',height:35,backgroundColor:'transparent',alignSelf: 'center',justifyContent: 'center',alignItems: 'center',borderRadius:5}}>
                        <Text style={{color:'#f5f5f5',fontFamily:global.bold,fontSize:17}}>CONTINUE!</Text>
            </Animatable.View>
            </TouchableOpacity>
            </View>           
   
        </Modal>
            
        </View>
        </ImageBackground>
    );
}

export default ForgotPass;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:'15%',
        width:'90%'
    },
    head:{
        color: '#8e929c',
        // fontFamily:"RotundaB",
        // fontWeight:'bold',
        fontSize:16,marginTop:0,marginBottom:5
    },
    text_header2: {
        color: "white",
        // fontWeight: 'bold',
        fontFamily:"RotundaN",
        fontSize: 14,
        marginTop: 5,
        
        // fontStyle:'RobotoN'
    },
    textInput: {
        
        borderBottomWidth:0.5,
        borderColor: '#90909090',
        borderRadius:5,
        paddingLeft:10,
        fontSize: 15,
        marginBottom:'2%',
        
        
    },
    textInput1: {
        paddingLeft:25,
        borderWidth: 0.5,
        borderColor: '#808080',
        borderRadius:5,
        paddingBottom: -10,
        fontSize: 20,
        
        
        // fontWeight: 'bold'
    },
    text_header: {
        color: "#fff",
        // fontWeight: 'bold',
        fontFamily:global.bold
        ,fontSize: 30
    },
    action: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
         width:'100%',
        marginTop:50,
        
        paddingVertical:15,
        paddingHorizontal:10,
        marginHorizontal:10,
        borderRadius:10,              
      
    },
    text_footer: {
        color: "#000",
        fontWeight: '400',
        fontSize: 15,

    },
    header: {
        //  paddingTop:60,
        //  paddingBottom:90,    
        height:100,   
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,

    },
    footer: {
        
        backgroundColor: 'transparent',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        
        paddingBottom: '10%',
        
        alignItems: 'center',
    },
    logo: {
        width: 250,
        maxHeight: 200,
    },
    signIn: {
        width: '95%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,        
        flexDirection: 'row',
    },
    signUp: {
        marginLeft:10,
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
        alignItems: 'center',justifyContent: 'center',
        marginTop: 80,
        width:'100%',
        // paddingBottom:'10%',
       
    },
    title: {
        fontSize: 22,
        // fontWeight: 'bold'
    },
    textSign: {
        fontSize: 18,textAlign:'center',
        // fontWeight: 'bold',
        color: '#fff',textTransform:'uppercase',fontFamily:global.appFontM
        // letterSpacing:3,
        // fontFamily:global.bold
    },
});