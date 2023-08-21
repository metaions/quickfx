/* eslint-disable prettier/prettier */
import * as React from 'react';
import { ThemeProvider } from '@react-navigation/native';
import { View, Text, Button, Dimensions,Switch, TouchableOpacity,Linking, StyleSheet,RefreshControl, Image, StatusBar, FlatList, ScrollView, TextInput,ActivityIndicator, ToastAndroid, ImageBackground } from 'react-native';
import { Avatar, Card, Title, Paragraph, Divider } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { useFocusEffect, useIsFocused,useTheme } from '@react-navigation/native';
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


const AssetScreen = ({ navigation }) => {
    const {colors}=useTheme();
    const theme=useTheme();
    const refRBSheet1 = React.useRef();
    const [Uid, setUid] = React.useState('');
    const [Loading, setLoading] = React.useState(false);  
    const [currency, setCurrency] = React.useState('');    
    const [Asset_data,setAsset_data] = React.useState('')
    const [Bal,setBal] = React.useState('')
    const [eBal,setEBal] = React.useState('')
    const isFocused = useIsFocused();
    const [refreshing, setRefreshing] = React.useState(false);
    const [Det, setDet] = React.useState(false);
    const [isEnabled, setIsEnabled] = React.useState('');
    const {toggleTheme} = React.useContext(AuthContext);
    const { signOut } = React.useContext(AuthContext);
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const { App_Lock } = React.useContext(AuthContext);
    const [isModalVisible1, setModalVisible1] = React.useState(false);
    const toggleSwitch = () => {
        toggleTheme()
        setIsEnabled(previousState => !previousState)
        if(isEnabled){
            thm()
            async function thm(){
                await AsyncStorage.setItem("DarkMode","false")
                console.log("false")
            }
        }else if(!isEnabled){
            thm()
            async function thm(){
                await AsyncStorage.setItem("DarkMode","true")
                console.log("true")
            } 
            }
        
    };

    const onToggleSwitch = () => {
        if(isSwitchOn){
            setIsSwitchOn(false)
            App_Lock("false")
            ToastAndroid.show("Biometry Deactivated",ToastAndroid.SHORT)
        }else if(!isSwitchOn){
            setIsSwitchOn(true)
            App_Lock("true")
            ToastAndroid.show("Biometry Activated Successfully",ToastAndroid.SHORT)
        }
    };

      useFocusEffect(
        React.useCallback(async() => {            
            
                // setIsLoading(false);
                let uid;
                uid = null;
                let thm= null;
                let code= null;
                uid=await AsyncStorage.getItem('user_id')            
                        
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

    const callApi=(uid)=>{
        let url =global.BASE_URL +"css_mob/history.aspx?uid="+uid+"&ttype=V"
        console.log(url)
        fetch(url)
        .then(item=> item.json())
        .then(dta=>{
            setAsset_data(dta)
            
           
        });
        
        let url1=global.BASE_URL+"css_mob/bal.aspx?uid="+uid+"&ttype=V"
        console.log(url1)
        fetch(url1)
        .then(item=> item.json())
        .then(dta=>{
            console.log(dta)
            if(dta.success==='true'){
                setBal(dta.msg)
            }
            
        });
        let url2=global.BASE_URL+"css_mob/bal.aspx?uid="+uid+"&ttype=E"
        console.log(url2)
        fetch(url2)
        .then(item=> item.json())
        .then(dta=>{
            console.log(dta)
            if(dta.success==='true'){
                setEBal(dta.msg)
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
const logOutMetod=()=>{
    toggleModal1()
}



    return (
        Loading?
        <View style={{flexDirection:'column',justifyContent: 'center',height:'100%',backgroundColor:colors.appBlackView }} >
            <LottieView source={require('../assets/loading.json')} style={{width:300,height:300,alignSelf:'center'}} autoPlay loop />
        
        </View>
        
        :
       
        <View style={styles.container}> 

            <View style={{flexDirection:'column',justifyContent: 'center',width:'100%'}}>
                  <LinearGradient
                        colors={[ "transparent","transparent"]}
                        style={{width:'100%',alignItems:'center',flexDirection:'column',
                        justifyContent:'flex-end',paddingTop:40,paddingBottom:100}}
                       
                    >
                        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:15,paddingVertical:5,width:'100%'}}>          
                            <View   style={{flexDirection:'row',justifyContent:'space-between',}}>
                                <TouchableOpacity onPress={()=>navigation.goBack()} style={{padding:10}}>
                                    <Text  allowFontScaling={false} style={{textAlign:'right'}}><IonIcons name="chevron-back-sharp" 
                                    size={25}  color={colors.selected}   /></Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={()=>navigation.navigate('TransactionScreen')} 
                            style={{alignItems: 'center',justifyContent:'center',marginBottom:5,paddingHorizontal:5}}>            
                                        <Text  allowFontScaling={false} style={[styles.heading,{color:colors.selected,fontSize:22,fontFamily:global.appFontM,marginTop:0}]}>ASSETS</Text>                            
                            </TouchableOpacity>
                            <View  style={{alignItems: 'center',justifyContent:'center',width:50}}>            
                                        <Text  allowFontScaling={false} style={[styles.heading,{color:colors.selected,fontSize:22,marginTop:0}]}></Text>                            
                            </View>
                        </View>
                   
                      
                    </LinearGradient>
                    
                    <ImageBackground  source={require('../assets/Aeon/asset/card_bg.png')} resizeMode={'stretch'} 
                    style={{width:'100%',height:210,paddingTop:10,paddingHorizontal:5,flexDirection:'row',
                    marginLeft:8,marginTop:-80,}}>
                        <View style={{width:'80%'}}>

                            <View style={{flexDirection:'column',marginTop:10}}>
                            <Text  allowFontScaling={false} style={[styles.sheading,{textAlign:'center',
                            fontSize:14,letterSpacing:-0.5,color:colors.selected}]}>{'Total assets converted (USDT)'.toUpperCase()}</Text>
                           <View style={{flexDirection:'row',justifyContent:'center',alignItems: 'center',marginTop:5}}>
                           
                            <View style={{flexDirection:'column',width:'100%'}}>

                            <Text  allowFontScaling={false} style={[styles.sheading,{textAlign:'center',fontSize:28,color:colors.yellow2,marginTop:0}]}>{Bal} USDT</Text>
                            <Text  allowFontScaling={false} style={{textAlign:'center',fontSize:15,color:colors.selected,backgroundColor:colors.appBlack,
                                borderRadius:20,fontFamily:global.appFontM,padding:5,paddingHorizontal:15,maxWidth:200,alignSelf:'center',marginTop:5
                                }}>{(parseFloat(Bal)* parseFloat(global.cur_value)).toFixed(2)} {global.cur_name}</Text>
                          
                            
                            </View>
                           </View>
                            </View>
                            
                            <View  style={{flexDirection:'row',justifyContent: 'space-between',width:'94%',alignSelf:'center',
                            marginTop:15,height:60,alignItems:'flex-end',}}>
                            <Text  allowFontScaling={false} style={{textAlign:'left',fontSize:14,fontFamily:global.appFontB,
                            color:colors.selected,marginTop:5}}>{'Total RP assets'.toUpperCase()}</Text>
                            <Text  allowFontScaling={false} style={{textAlign:'right',fontSize:14,fontFamily:global.appFontB,
                            color:colors.selected,marginTop:5}}>{eBal} USDT</Text>
                        
                            </View>
                        </View>
                        <View style={{width:'20%',justifyContent:'center',}}>

                        
                            </View>
                     </ImageBackground>

                     <View style={{flexDirection:'row',justifyContent: 'space-evenly',width:'100%',height:130,alignItems: 'center',top:-20}}>
                     <ImageBackground source={require('../assets/Aeon/asset/btn1.png')} resizeMode='stretch' 
                     style={{width:170,height:40,alignItems: 'center',justifyContent:'center'}}>
                     <TouchableOpacity onPress={()=>{navigation.navigate("DepositScreen")}} style={{flexDirection:'row',
                    justifyContent: 'center',alignItems: 'center'}}>
                    {/* <Image  resizeMode={'stretch'}    style={{  width: 50, height:45,marginRight:10}} source={require('../assets/botz/transfer/deposit.png')} /> */}
                    <Text  allowFontScaling={false} style={{color:colors.selected,textAlign: 'center',fontFamily:global.appFontM}}>DEPOSIT</Text>
                    </TouchableOpacity>

                     </ImageBackground>
                     <ImageBackground source={require('../assets/Aeon/asset/btn2.png')} resizeMode='stretch' 
                     style={{width:170,height:40,alignItems: 'center',justifyContent:'center'}}>
                     <TouchableOpacity onPress={()=>{ if (!global.activeId){
                            ToastAndroid.show(`Please Activate Your Id First With ${global.ReqValue} USDT`,ToastAndroid.SHORT)
                           }else{
                               navigation.navigate('TransferScreen')
                            }}} style={{flexDirection:'row'
                    ,justifyContent: 'center',alignItems: 'center'}}>
                    {/* <Image  resizeMode={'stretch'}    style={{  width: 50, height:45,marginRight:10}} source={require('../assets/botz/transfer/transfer.png')} /> */}
                    <Text  allowFontScaling={false} style={{color:colors.selected,textAlign: 'center',fontFamily:global.appFontM}}>TRANSFER</Text>
                    </TouchableOpacity>

                     </ImageBackground>
                     
                     </View>
                <Text style={{color:'#8E99BA',alignSelf:'center',fontSize:16,top:-30,fontFamily:global.appFontM,textTransform:'uppercase'}}>History Record</Text>
            </View>
            
                
               
                <FlatList
                    horizontal={false}                                        
                    data={Asset_data}                                        
                    showsHorizontalScrollIndicator={false} 
                    showsVerticalScrollIndicator={false}         
                    keyExtractor={(item,index) => index}
                    renderItem={({item, index}) => (
                        <View style={{width:'100%',justifyContent: 'center',alignItems:'center',paddingHorizontal:10}}>
                        <ImageBackground source={require('../assets/Aeon/asset/box_blue.png')} resizeMode='stretch' style={{width:'100%',alignSelf: 'center',paddingBottom:10}}>
                            <View style={{width:'100%',flexDirection:'column',
                            
                            justifyContent: 'flex-start',alignItems: 'center',}}>

                                <View style={{width:'100%',alignItems: 'center',
                                padding:10,paddingBottom:18}}>
                                
                            <Text style={{fontSize:14,color:'#fff',fontFamily:global.appFontM,textAlign:'center',}}>{item.dsc}</Text>
                                </View>
                            <Text style={{fontSize:15,color:colors.selected,fontFamily:global.appFontM,marginTop:0
                            
                            }}>{item.date}</Text>
                            <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center',
                            width:'100%',paddingVertical:5,paddingHorizontal:15,marginTop:10,marginBottom:10}}>
                                <View style={{flexDirection:'column',alignItems: 'center',
                            width:'48%'}}>
                                <Text style={{fontSize:12,color:colors.selected,fontFamily:global.appFontM}}>AMOUNT(IN USD)</Text>
                                <Text style={{fontSize:19,color:colors.profitcolor2,fontFamily:global.appFontM}}>{item.amount}</Text>
                                </View>
                                <View style={{flexDirection:'column',alignItems: 'center',padding:10,
                            width:'48%'}}>
                                <Text style={{fontSize:12,color:colors.selected,fontFamily:global.appFontM}}>TYPE</Text>
                                <Text style={{fontSize:20,color:colors.profitcolor2,fontFamily:global.appFontM}}>{item.type}</Text>
                                </View>

                            </View>
                            </View>
                    </ImageBackground>    
                    </View>

                 )}
                 />
            </View >

       
    );
}

export default AssetScreen;
const styles1 = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:theme.bg,
        
        

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
        flexDirection:'column',
        justifyContent:'space-evenly',
        // borderWidth:1,
        borderRadius:50,
        // borderColor:"#3D3F70",
        paddingVertical:10,
        // backgroundColor:'#ff0000',
        paddingHorizontal:10,
        marginHorizontal:5,
        width: 180,height:60,
        alignItems: 'center',
        // height:90
    
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
        fontFamily:global.appFontM,
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