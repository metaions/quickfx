/* eslint-disable prettier/prettier */
import * as React from 'react';
import { ThemeProvider } from '@react-navigation/native';
import { View, Text, Button, Dimensions, Switch, TouchableOpacity, StyleSheet, RefreshControl, Image, StatusBar, FlatList, ScrollView, TextInput, ActivityIndicator, ImageBackground, ToastAndroid } from 'react-native';
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
import LinearGradient from 'react-native-linear-gradient';
import styles from '../component/styles';
import { captureScreen } from 'react-native-view-shot';
var RNFS = require('react-native-fs');
import Share from 'react-native-share';
// import { styles } from 'react-native-fbsdk-next/types/FBLoginButton';


const ProfileDetails = ({ navigation, route }) => {
    const [imageURI, setImageURI] = React.useState('');
    const [savedImagePath, setSavedImagePath] = React.useState('');
    const { colors } = useTheme();
    const theme = useTheme();
    const [Uid, setUid] = React.useState(global.uid);    
    const [refreshing, setRefreshing] = React.useState(false);
    const [status, setStatus] = React.useState('both');
    const [O_Notify, setO_Notify] = React.useState('0');
    const [S_Notify, setS_Notify] = React.useState('0');
    const[data, setData] = React.useState(null)
    const sym = route.params?.sym;

    const [Loading, setLoading] = React.useState(true)





    useFocusEffect(
        React.useCallback(() => {
            setO_Notify(global.notify_count)
            setS_Notify(global.notify_count1)
            console.log(global.notify_count + '   ' + global.notify_count1)
        }, [global.notify_count])
    );


    React.useEffect(() => {        
        setTimeout( () => {
            
            try {                
                
                Final_hit()
            }
            catch (e) {
                console.log(e);
            }
            // console.log('user token:', userToken);


        }, 2000);
    }, []);


    const Final_hit=React.useCallback(()=>{                        
            let url=global.BASE_URL+'css_mob/profile_view.aspx?uid='+Uid+'&mode='+status
            console.log(url)
            fetch(url)
            .then(item=>item.json())
            .then(dta=>{
                console.log(JSON.stringify(dta))
                setData(dta)
                setLoading(false)
            })
        },[])
    

    const onRefresh = React.useCallback(async () => {

        setRefreshing(true);



    })

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
        Loading ?
      
            <View style={{
                flexDirection: 'column', justifyContent: 'center', height: '100%',
                // backgroundColor: colors.background
            }} ><LottieView source={require('../assets/loading.json')} 
            style={{ width: 300, height: 300, alignSelf: 'center' }} autoPlay loop /></View>
            :
            <ImageBackground source={global.bgimg} 
            style={[styles1.container, {  paddingTop: 0 }]}>    
            <View style={{ width: '100%',height: 40,backgroundColor: colors.profitcolor2}}>

            </View>                 
                    <View 
                        style={{ width: '100%', paddingTop: 20, height:120, 
                        borderBottomRightRadius:20,
                        borderBottomLeftRadius:20,alignSelf:'center',flexDirection:'row',
                         backgroundColor:colors.profitcolor2 ,justifyContent:'space-between'}} >
             
          
         
                <TouchableOpacity onPress={() => { takeScreenShot() }}  style={{
                width:'20%',alignItems:'center',marginTop:5
              }} activeOpacity={0.8}>
                  
                        <IonIcons name="arrow-back" size={30} color={'#fff'} />
                   
                </TouchableOpacity>
                <View style={{width:'60%'}}>

                <Text style={{color:colors.selected , alignSelf:'center', fontSize:30, fontWeight: 'bold', }}>{data && data.name}</Text>        
                <Text style={{color:colors.yellow, alignSelf:'center', fontSize:25, fontWeight: 'bold', }}>{data && data.rank}</Text>
                </View>
        
                <TouchableOpacity onPress={() => { takeScreenShot() }}  style={{
                width:'20%',alignItems:'center',marginTop:5
              }} activeOpacity={0.8}>
                  
                        <IonIcons name="share-social" size={30} color={'#fff'} />
                   
                </TouchableOpacity>
         
         
          <View style={{flex:0.4,flexDirection:'row',justifyContent:'center',alignItems:"center",Bottom:20}}>
          {/* {data?
                            
                            <TouchableOpacity>
                       {data&&(
       <Image style={{width:60,height:60,borderRadius:10,alignSelf: 'center'}}
       resizeMode={'contain'} 
       source={data.photo==='http://snap.botz.trade/m/user_photos/'?require('../assets/logo1.png')
       :{uri: data.photo}}/>
                       )}

       </TouchableOpacity>
       :
       <ActivityIndicator size={'small'} color={colors.selected} />
       } */}
          </View>
          
       
                    </View>
                            <ScrollView>
                                
                    <View style={{ flexDirection: 'row',justifyContent:'space-between',paddingHorizontal:25}}>                 
                        <TouchableOpacity activeOpacity={1}
                         onPress={() => { }} 
                         style={[styles.touchpro,{width:150}]}>
                             <ImageBackground source={require('../assets/Aeon/curve_bg.png')} resizeMode="contain" style={{width:200,height:200}}>
                        <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',width:'100%',height:200}}>
                          <Text style={{ color:"#fff",textAlign:'center', fontSize: 13,
                                                    fontFamily:global.appFontM }}>
                                                    TRADING PROFIT
                                                </Text>
                          <Image source={require('../assets/Aeon/one.png')} resizeMode="contain" 
                          style={{width:110,height:110,top:5}}></Image>
                                                <Text style={{ color:colors.yellow2,textAlign:'center', fontSize: 19,
                                                    fontFamily:global.appFontB }}>
                                                    {data && parseFloat(data.profit).toFixed(2)}
                                                </Text>
                                                <Text style={{ color:colors.appLightgray,textAlign:'center', fontSize: 14,
                                                    fontFamily:global.appFontB }}>
                                                   USD
                                                </Text>
                        </View>
                    </ImageBackground>
                          
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={1}
                         onPress={() => { }} 
                         style={[styles.touchpro,{width:150}]}>
                             <ImageBackground source={require('../assets/Aeon/curve_bg.png')} resizeMode="contain" style={{width:200,height:200}}>
                             <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',width:'100%',height:200}}>
                          <Text style={{ color:"#fff",textAlign:'center', fontSize: 13,
                                                    fontFamily:global.appFontM }}>
                                                    TEAM PROFIT
                                                </Text>
                          <Image source={require('../assets/Aeon/two.png')} resizeMode="contain" 
                          style={{width:110,height:110,top:5}}></Image>
                                                <Text style={{ color:colors.yellow2,textAlign:'center', fontSize: 19,
                                                    fontFamily:global.appFontB }}>
                                                     {data && parseFloat(data.income).toFixed(2)}
                                                </Text>
                                                <Text style={{ color:colors.appLightgray,textAlign:'center', fontSize: 14,
                                                    fontFamily:global.appFontB }}>
                                                   USD
                                                </Text>
                        </View>
                      
                       
                    </ImageBackground>


                        
                        </TouchableOpacity>

                     

                        
                    </View>
                    <View style={{width:'90%',alignSelf: 'center',alignItems:'center',marginTop:50}}>
                    <ImageBackground source={require('../assets/Aeon/curve_bg.png')} resizeMode="contain" style={{width:200,height:200}}>
                             <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',width:'100%',height:200}}>
                          <Text style={{ color:"#fff",textAlign:'center', fontSize: 13,
                                                    fontFamily:global.appFontM }}>
                                                     TOTAL PROFIT
                                                </Text>
                          <Image source={require('../assets/Aeon/three.png')} resizeMode="contain" 
                          style={{width:110,height:110,top:5}}></Image>
                                                <Text style={{ color:colors.yellow2,textAlign:'center', fontSize: 19,
                                                    fontFamily:global.appFontB }}>
                                                      {data && (parseFloat(data.income) + parseFloat(data.profit)).toFixed(2)}
                                                </Text>
                                                <Text style={{ color:colors.appLightgray,textAlign:'center', fontSize: 14,
                                                    fontFamily:global.appFontB }}>
                                                   USD
                                                </Text>
                        </View>
                      
                       
                    </ImageBackground>
                   
                    {/* <ImageBackground resizeMode={'stretch'} source={require('../assets/botz/banner/big-box.png')} 
                            style={{height: 210, width: '100%', justifyContent:'center' , marginTop:15}}>
                               
                                <View style={{flexDirection:'column', justifyContent:'space-between', alignItems: 'center', padding:25}}>
                                <ImageBackground source={require('../assets/botz/banner/icon-bg.png')} resizeMode="contain" style={{width:95,height:95,justifyContent:'center',alignItems:'center'}}>
                                <Image source={require('../assets/botz/banner/icon1.png')} resizeMode="contain" style={{width:45,height:45,}}></Image>  
                                </ImageBackground>
                                
                                <Text style={{ color:"#FFFFFF",textAlign:'center', fontSize: 25, 
                                                    fontFamily:global.bold }}>
                                                TOTAL PROFIT
                                                </Text>
                                          
                                                <Text style={{ color:"#00a65a",textAlign:'center',fontWeight: 'bold', fontSize: 25,marginRight:8,
                                                    fontFamily:global.bold }}>
                                                   {data && (parseFloat(data.income) + parseFloat(data.profit)).toFixed(2)} {'\n'}
                                                   <Text style={{color:'#fff',fontWeight: 'bold',fontSize:14}}>USD</Text>
                                                </Text>
                                               
                                               

                                    </View>
  
                            </ImageBackground> */}

                    </View>
                    </ScrollView> 
               
                   
              
            </ImageBackground>
            
    );
}



export default ProfileDetails;
const styles1 = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0B1725',
        paddingTop: 40
    },
    textInput: {
        marginLeft: 15,
        marginTop: -15,
        paddingBottom: -10,

    },
    text_header: {
        color: "#fff",
        fontWeight: 'bold',
        fontSize: 30
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
    action: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderBottomWidth: 0.5,
        borderBottomColor: '#808080',
        marginTop: 15
    },
    text_Price: {
        color: "#13B34F",
        width: 100,
        textAlign: 'left',
        fontSize: 13,

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
        fontWeight: 'bold',
    },
    textTime: {
        fontSize: 13,
        color: '#d0d0d0d0',
        width: 90,
        textAlign: 'left'

    },
    textVol: {
        fontSize: 15,
        color: '#d0d0d0d0',
        width: 100,
        textAlign: 'right',

    },
    sliderContainer: {
        height: 350,
        width: '96%',
        marginTop: 10,
        justifyContent: 'center',
        alignSelf: 'center',

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
        borderRadius: 4

    },
    fitnessbox: {
        paddingHorizontal: 0,
        // borderWidth: 1,
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 18,
        borderRadius: 20,
    },
    card_box: {
        borderRadius: 0,
        borderColor: '#fff',


        backgroundColor: '#fff'
    },
    text_card: {
        fontSize: 14,
        fontWeight: 'bold',
    }
});





{/* <FlatList
horizontal={false}
refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
}
data={Data}
showsHorizontalScrollIndicator={false}
keyExtractor={(item) => item.heading}
renderItem={({ item, index }) => (
    <TouchableOpacity activeOpacity={1}  onPress={()=>{  setClicked(index)
        setChk_click(!chk_click)}}  style={{elevation:5,marginVertical:5,width:'95%',alignSelf: 'center',borderRadius:5,backgroundColor:colors.inner_bg,flexDirection:'column',justifyContent: 'space-evenly',paddingVertical:5,paddingHorizontal:15}}>
    <View>                            
            
<View >

<View
style={{flexDirection: 'row', justifyContent: 'space-between',width:'100%',alignItems: 'center'}}>
<View style={{flexDirection: 'row', justifyContent: 'flex-start',width:150,height:90,paddingTop:5,alignItems:'center'}}>

<Image
source={require('../assets/iconf/news.png')}
resizeMode={'stretch'}
style={{width: 70, height:70,marginRight:15,elevation:20,shadowColor: '#202020', shadowOffset: {width: 0, height: 0}, shadowRadius: 5}}
/>
<Text style={{color:colors.text,fontSize:15,fontWeight: 'bold'}}>
    Order Message
</Text>

</View>

<Text style={{textAlign:'right',alignSelf: 'center',}}><MaterialIcons name= {index===parseFloat(Clicked) && chk_click?"keyboard-arrow-up":"keyboard-arrow-right"} size={25}  color={colors.text}   /></Text>                               


</View>

{index===parseFloat(Clicked) && chk_click?
<View >
<Paragraph>{item.txt.replace(/,/g, '\n')}</Paragraph>

</View>
:null}
</View>

    </View>
    </TouchableOpacity>
)}
/> */}