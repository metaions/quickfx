/* eslint-disable prettier/prettier */
import * as React from 'react';
// import { ThemeProvider } from '@react-navigation/native';
import { View, Text, Button, Dimensions,Switch, TouchableOpacity,Linking, StyleSheet,RefreshControl, Image, StatusBar, FlatList, ScrollView, 
    TextInput,ActivityIndicator, ToastAndroid, ImageBackground } from 'react-native';
import { Avatar, Card, Title, Paragraph, Divider } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
// import { useFocusEffect, useIsFocused,useTheme } from '@react-navigation/native';
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
import { ThemeProvider, useFocusEffect, useIsFocused,useTheme ,useLinkTo} from '@react-navigation/native';

// import { styles } from 'react-native-fbsdk-next/types/FBLoginButton';


const AddTicketScreen = ({ navigation }) => {
    const linkTo = useLinkTo(); 

    const {colors}=useTheme();
    const theme=useTheme();
    const refRBSheet1 = React.useRef();
    const [Uid, setUid] = React.useState('');
    const [Loading, setLoading] = React.useState(true);  
    const [sub, setSub] = React.useState('');    
    const [msg,setMsg] = React.useState('')
    const [Bal,setBal] = React.useState('')
    const isFocused = useIsFocused();
    const [refreshing, setRefreshing] = React.useState(false);
    const [RevDet, setRevDet] = React.useState(false);
    const [Det, setDet] = React.useState(false);
    const [Ld, setLd] = React.useState(false);
    const [TP, setTP] = React.useState('');
    const [Ti, setTi] = React.useState('');
    const [CP, setCP] = React.useState('');
    const [Ci, setCi] = React.useState('');
    const [DT, setDT] = React.useState('');
    const {toggleTheme} = React.useContext(AuthContext);
    const { signOut } = React.useContext(AuthContext);
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const { App_Lock } = React.useContext(AuthContext);
    const [isModalVisible1, setModalVisible1] = React.useState(false);


      useFocusEffect(
        React.useCallback(() => {            
            setTimeout(async () => {
                // setIsLoading(false);
                let uid;
                uid = null;
                let thm= null;
                let code= null;
                uid=await AsyncStorage.getItem('user_id')            
                        
                setUid(uid)
                setLoading(false)
                // try {                
                //   callApi(uid);
                 
                //   setRefreshing(false)
                // }
                // catch (e) {
                //   console.log(e);
                // }
                
              },1000);

            //we can add delay time here before callApi() i.e ' },1000,callApi());' //
        },[])
    );

    const callApi=()=>{
        let url =global.BASE_URL +"css_mob/addticket.aspx?uid="+Uid+"&sub="+sub+"&msg="+msg
        console.log(url)
        fetch(url)
        .then(item=> item.json())
        .then(dta=>{
            console.log(JSON.stringify(dta))
           ToastAndroid.show(dta.msg,ToastAndroid.LONG)
           setLd(false)
        //    linkTo('/HomeDrawer/Funds')
        navigation.navigate('Home')
        });
        
       setLoading(false)
    }





    return (
        Loading?
        <View style={{flexDirection:'column',justifyContent: 'center',height:'100%',}} >
            <LottieView source={require('../assets/loading.json')} style={{width:300,height:300,alignSelf:'center'}} autoPlay loop />
        
        </View>
        
        :
       
        <ImageBackground  source={require('../assets/Aeon/aeon_login_bg.png')} style={styles.container}> 

            <View style={{flexDirection:'column',justifyContent: 'center',width:'100%',paddingTop:35}}>
         
                        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:15,paddingVertical:5,width:'100%'}}>          
                            <View   style={{flexDirection:'row',justifyContent:'space-between',}}>
                                <TouchableOpacity onPress={()=>navigation.goBack()} style={{padding:10}}>
                                    <Text style={{textAlign:'right'}}><IonIcons name="chevron-back-sharp" size={25}  color={colors.selected}   /></Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={()=>navigation.navigate('TransactionScreen')} style={{alignItems: 'center',justifyContent:'center'}}>            
                                        <Text style={[styles.heading,{color:colors.profitcolor2,fontSize:22,marginTop:0}]}>Add Ticket</Text>                            
                            </TouchableOpacity>
                            <View  style={{alignItems: 'center',justifyContent:'center',width:50}}>            
                                        <Text style={[styles.heading,{color:colors.appGray,fontSize:22,marginTop:0}]}></Text>                            
                            </View>
                        </View>

                        <View style={{width:'100%',alignSelf: 'center',flexDirection:'column',justifyContent: 'space-evenly'
                        ,paddingVertical:5,paddingHorizontal:10}}>
               
               </View>
                   
                
            </View>

           
            <View style={{padding:5}}>
                <Text style={[styles1.txt,{marginTop:50,color:colors.selected}]}>Subject</Text>
                <TextInput
                value={sub}
                placeholder='Enter Subject'
                placeholderTextColor='#fff'
                onChangeText={(val)=>{setSub(val)}}
                style={[styles1.textInput,{textAlignVertical: "top"}]}
                />
                 <Text style={[styles1.txt,{marginTop:20,color:colors.selected}]}>Message</Text>
               <TextInput
                value={msg}
                placeholder='Enter Message'
                placeholderTextColor='#fff'
                multiline
                numberOfLines={5}
                onChangeText={(val)=>{setMsg(val)}}
                style={[styles1.textInput,{textAlignVertical: "top"}]}
                />
              <TouchableOpacity onPress={()=>{
                  if(sub!=''&& msg!=''){

                      setLd(true),callApi()
                    }else{
                        ToastAndroid.show('Please Fill the details first...',ToastAndroid.SHORT)
                    }
                  
                  
                  }} style={styles1.btn}>
             
                  <Text style={{color:'white',textAlign:'center',alignSelf: 'center',fontSize:18,fontFamily:global.appFontM}}>ADD TICKET{Ld?
                   <ActivityIndicator size={'small'}  color="#fff" />:null}       </Text>
                
              </TouchableOpacity>
            </View>
                  <Text style={{fontSize:18,color:colors.selected,textAlign:'center',alignSelf: 'center',fontSize:14,marginTop:50}}><Text style={{color:colors.profitcolor2}}>NOTE:</Text> Asset Wallet is not Withdrawable !</Text>
        </ImageBackground>
       


    );
}

export default AddTicketScreen;
const styles1 = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:theme.bg,
        
        

    },
    txt:{
        color:'#2875CA',marginLeft:5,fontSize:16,
        fontFamily:global.appFontM,marginBottom:10,textTransform:'uppercase'
    },
    btn:{
        width:300,alignSelf: 'center',
        marginTop:20,backgroundColor:'#19dc51',
        borderRadius:30,paddingVertical:10
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
        // backgroundColor: global.grad4,
        borderBottomWidth:1,
        borderColor:'#fff',
        color:'#fff',
        marginVertical:20,
        borderRadius:5,
        marginTop: 0,
        paddingBottom: 0,
        fontSize: 16,
        color:'#000',
        paddingHorizontal:10
    },
    bx: {
        flexDirection:'column',
        justifyContent:'space-evenly',
        // borderWidth:1,
        borderRadius:10,
        // borderColor:"#3D3F70",
        paddingVertical:10,
        // backgroundColor:'#ff0000',
        paddingHorizontal:10,
        marginHorizontal:5,
        
        alignItems: 'center',
        height:90
    
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
        fontWeight:'bold',
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