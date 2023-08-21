/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity,PermissionsAndroid, Image, Linking,BackHandler,Alert, ImageBackground } from 'react-native';
import LottieView from 'lottie-react-native';
// import RNApkInstallerN from 'react-native-apk-installer-n';
import * as Progress from 'react-native-progress';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Swiper from 'react-native-swiper';
import { ThemeProvider, useFocusEffect, useIsFocused,useTheme,useLinkTo } from '@react-navigation/native';
import Modal from 'react-native-modal';
import Foundation from 'react-native-vector-icons/Foundation'
import Feather from 'react-native-vector-icons/Feather'
import * as Animatable from 'react-native-animatable';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import LinearGradient from 'react-native-linear-gradient';
import IonIcons from 'react-native-vector-icons/Ionicons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import global from '../component/global'
var RNFS = require('react-native-fs');

const VersionControl = ({ navigation,route }) => {

    const {colors}=useTheme();
    const [Progress1,setProgress1] = React.useState('0');
    const [isModalVisible, setModalVisible] = React.useState(false);
    const [Prog,setProg] = React.useState(false);
    const id= route.params?.id;
    const apk= route.params?.apk;
    const playstore= route.params?.playstore;
    
    const backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to exit?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      };
    
      React.useEffect(() => {
        // Permission()
        BackHandler.addEventListener("hardwareBackPress", backAction);
        if(playstore==='0'){
          toggleModal(),Permission()
        }else if(playstore==='1'){
          Linking.openURL(global.BASE_URL+'app.aspx')
        }




        return () =>
          BackHandler.removeEventListener("hardwareBackPress", backAction);
      }, []);

   
      React.useEffect(()=>{            
      },[Progress1])
      const Permission=async()=>{          
        const dirs = RNFS.DocumentDirectoryPath ; //Use the dir API
        console.log(dirs)                                
    
        if (Platform.OS === 'ios') {
            downloadFile();
          } else {
            try {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                  title: 'Storage Permission Required',
                  message:
                    'Application needs access to your storage to download File',
                }
              );
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // Start downloading
                console.log('Storage Permission Granted.');
                downloadFile();
              } else {
                // If permission denied then show alert
                Alert.alert('Error','Storage Permission Not Granted');
              }
            } catch (err) {
              // To handle permission related exception
              console.log("++++"+err);
            }
          }
    
      }
      
        
const downloadFile=()=>{


    var path = RNFS.DocumentDirectoryPath       
    const download = RNFS.downloadFile({
        fromUrl: global.BASE_URL+'app.aspx',
        toFile: path+"/"+ apk,   
        background: true,
        discretionary: true,     
        progress: res => {        
            setProgress1((res.bytesWritten / res.contentLength).toFixed(2))
        },
        begin   : (res) => {
            console.log(res.jobId)
            // setJob(res.jobId)
        },
        progressDivider: 1,
        progressInterval :800                       
        
    
    
      })
      download.promise.then(async result => {
        console.log(result)
        setProgress1(1)
        setModalVisible(false)
        if(result.statusCode == 200){
          //  RNApkInstallerN.install( path+"/"+ apk)
            
        }
    })
   
    .catch(error => {
      console.log(error);
      // here we can perform any task when download is stopped manually
    }); 
    
      console.log(download)
    }
    
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
      };


    return (
       id=="update"?
       <View style={styles.container}>
            {/* Back Button module start */}
          <ImageBackground  source={require('../assets/Aeon/aeon_login_bg.png')} style={{flex:1,paddingTop:'16%'}}   >
            <>
            {/* <Text style={[styles.title]}>Update Alert!</Text> */}
            <Image source={require('../assets/Aeon/logo.png')}  
            style={{width:150,height:60,alignSelf:'center'}} resizeMode="stretch"/>

               <Text
                style={[styles.text_header,{paddingTop:'30%',}]}>Update Available !</Text>
            
            <View style={styles.action}>

           </View>         
            </>
            <Modal  useNativeDriver={true}  statusBarTranslucent ={true} deviceHeight={1000}  isVisible={isModalVisible}   animationInTiming={300} animationOutTiming={200}>               
                <ImageBackground source={require('../assets/botz/main_bg.png')} resizeMode={'stretch'} style={{width:350,height:250,flexDirection:'column',justifyContent:'space-evenly',paddingHorizontal:15,paddingVertical:15,borderWidth:0.5,borderColor:'#70707070',borderRadius:10,borderBottomWidth:0}}>                    
                    <Text style={[{textAlign:'center',fontSize:22,color:colors.selected}]}>Please Wait...!</Text>
                    <View style={{flexDirection:'column',justifyContent:'center',alignSelf: 'center',alignItems:'center'}}>
                    <Text style={[styles.text_footer,{textAlign:'center',color:colors.selected}]}>Your download is in process </Text>                   
                  <View     style={{alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                <Progress.Bar useNativeDriver={true} animationType={'timing'} progress={Progress1} width={250} height={8} marginRight={10} color={colors.hgl} borderWidth={0} unfilledColor={'#e0e0e0e0'} />
                <Text style={[styles.sheading,{color:colors.hgl,fontSize:15}]}>{(parseFloat(Progress1)*100).toFixed(0)}%</Text>
                </View>
                </View>
                </ImageBackground>
                
       
            </Modal>
            </ImageBackground>
        </View>
        
        :
        <View style={styles.container}>
        {/* Back Button module start */}
        <ImageBackground  source={require('../assets/Aeon/bg.png')} style={{flex:1,paddingTop:'40%'}}   >
            <>
        {/* <Text style={[styles.title]}>Work In Progress!</Text> */}


        <Text style={styles.text_header}>App is under maintenance!</Text>
        <Text  style={{color:colors.appGray,fontSize:15,textAlign:'center',marginTop:10}}>Don't Worry! Your Trades are working safely...</Text>
        <LottieView source={require('../assets/work1.json')} style={{width:'100%',alignSelf:'center',}} autoPlay loop={true}  />
        {/* <View style={styles.action}>

        </View> */}
        {/* <View style={styles.action}> */}

        {/* <LottieView source={require('../assets/work2.json')} style={{width:'100%',alignSelf:'center',}} autoPlay loop={true}  /> */}
        {/* </View> */}
        
        </>
        
            </ImageBackground>
        </View>
    );
}


export default VersionControl;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        
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
    text_header: {
        color: '#fff',
        fontFamily: global.appFontB,
        textAlign:'center',
        fontSize: 22,
        paddingTop:'20%',
        textTransform:'uppercase',
    },
    action: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        backgroundColor:global.grad4,
        position: 'absolute',
        bottom:0
       
    },
    text_footer: {
        color: '#000',
        fontWeight: '400',
        fontSize: 15,

    },
    header: {
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center',

    },
    footer: {
        flex: 3,
        backgroundColor: '#ffff',
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
        marginTop:30,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 5,
        flexDirection: 'row',

    },
    button: {
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: '#dcdcdc',
        padding: 10,
        borderRadius: 20

    },
    title: {
        fontSize: 20,
        color:'#f5f5f5f5',
        alignSelf: 'center',
        flex: 1,
        position: 'absolute',
        top: 55,
        marginLeft: 8
    },
    textSign: {
        fontSize: 20,
        marginVertical: 15,
        color: '#000',
        fontWeight: 'bold'
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