/* eslint-disable prettier/prettier */
import * as React from 'react';
import { ThemeProvider } from '@react-navigation/native';
import { View, Text, Button, Dimensions, Switch, TouchableOpacity, StyleSheet, RefreshControl, Image, StatusBar, FlatList, ScrollView, TextInput, ActivityIndicator, ImageBackground, ToastAndroid } from 'react-native';
import { Avatar, Card, Title, Paragraph, Divider } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { useFocusEffect, useIsFocused, useTheme,useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IonIcons from 'react-native-vector-icons/Ionicons'
import { AuthContext } from '../../component/context';
import global from '../../component/global'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import theme from '../../component/theme';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../component/styles';


const Notification = () => {
    const navigation = useNavigation(); 
    const { colors } = useTheme();
    const theme = useTheme();
    const imgref = React.useRef();
    const [Data, setData] = React.useState('');
    const [Uid, setUid] = React.useState(global.uid);
    const [MinVal, setMinVal] = React.useState('');
    const [refreshing, setRefreshing] = React.useState(false);
    const [Clicked, setClicked] = React.useState('');
    const [chk_click, setChk_click] = React.useState(false);
    const [O_Notify, setO_Notify] = React.useState('0');
    const [S_Notify, setS_Notify] = React.useState('0');
    // const sym = route.params?.sym;

    const [Loading, setLoading] = React.useState(false)


    useFocusEffect(
        React.useCallback(() => {
            imgref.current?.slideInLeft()
            setTimeout(() =>{
                imgref.current?.bounce()
            },1500)
            
            setO_Notify(global.notify_count)
            setS_Notify(global.notify_count1)
            console.log(global.notify_count + '   ' + global.notify_count1)
        }, [global.notify_count])
    );

    const onRefresh = React.useCallback(async () => {

        setRefreshing(true);



    })

    return (
        Loading ?
            <View style={{
                flexDirection: 'column', justifyContent: 'center', height: '100%',
                backgroundColor: colors.background
            }} ><LottieView source={require('../../assets/loading.json')} style={{ width: 300, height: 200, alignSelf: 'center' }} autoPlay loop /></View>
            :
            <ImageBackground source={global.bgimg} style={{flex:1, justifyContent:'space-between', width:'100%',paddingTop:10,}}>
            
                              
                              <ScrollView  ContentContainerStyle={{ flexDirection: 'column', justifyContent: 'space-between'}}
                              style={{marginBottom:0}}
                              >
                    {/* <Animatable.View useNativeDriver={true} animation={'bounceInDown'} duration={1500} 
                    style={{flexDirection:'row',width: '100%',justifyContent:'space-around',
                    alignItems:'center',paddingVertical:15,marginTop:30}}>
                    <TouchableOpacity activeOpacity={1}
                        onPress={() => { 
                            
                            if(global.AMT == 0){
                                ToastAndroid.show('Please Activate Your Id First',ToastAndroid.SHORT)
                                return
                            }
                            navigation.navigate("NewsScreen")                                                
                        }}
                        >
                    <ImageBackground source={require('../../assets/Aeon/forex.png')} 
                    resizeMode="contain" style={{width:180,height:180}}>
                        
                    </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1}
                        onPress={() => { global.notify_count1 = 0, navigation.navigate('MessageScreen', { type: "sys" }) }}
                        >
                    <ImageBackground source={require('../../assets/Aeon/system.png')} resizeMode="contain" style={{width:180,height:180}}>
                  
                    </ImageBackground>
                    </TouchableOpacity>
                        
                    </Animatable.View> */}
                    <Animatable.View useNativeDriver={true} animation={'bounceInDown'} duration={1500} 
                    style={{flexDirection:'row-reverse',width: '100%',justifyContent:'space-around',alignItems:'center',paddingVertical:15}}>
                    {/* <TouchableOpacity activeOpacity={1}
                        onPress={() => { global.notify_count1 = 0, navigation.navigate('MessageScreen', { type: "cnews" }) }}
                        >
                    <ImageBackground source={require('../../assets/Aeon/company.png')} resizeMode="contain" style={{width:180,height:180}}>
                    
                    </ImageBackground>
                    </TouchableOpacity> */}
                    <TouchableOpacity activeOpacity={1}
                        onPress={() => { global.notify_count = 0, navigation.navigate('MessageScreen', { type: "order" }) }}
                        >
                    <ImageBackground source={require('../../assets/Aeon/order.png')} resizeMode="contain" style={{width:180,height:180}}>
                   
                    </ImageBackground>
                    </TouchableOpacity>

                        
                    </Animatable.View>
                    {/* <Animatable.View useNativeDriver={true} animation={'slideInUp'} duration={1500} style={{flexDirection:'row',width: '100%',justifyContent:'flex-start',alignItems:'center',paddingVertical:15}}>
                    <TouchableOpacity activeOpacity={1}
                        onPress={() => { navigation.navigate('MyAchievements');}}
                        >
                    <ImageBackground source={require('../../assets/botz/box-bg.png')} resizeMode="contain" style={{width:180,height:180}}>
                    <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',width:'100%',height:200}}>
                          <Image source={require('../../assets/botz/icon51.png')} resizeMode="contain" style={{width:45,height:45,bottom:0}}></Image>
                          <Text style={{color: '#fff',fontWeight: 'bold',fontSize:25,paddingTop:30}}>MY</Text>
                          <Text style={{color: 'grey',fontWeight: 'bold',fontSize:12}}>ACHIEVEMENTS</Text>
                        </View>

                    </ImageBackground>
                    </TouchableOpacity>

                        
                    </Animatable.View> */}
                    

                
                
                      
                </ScrollView>
                <TouchableOpacity activeOpacity={1}
                    onPress={() => {


                        global.notify_count1 = 0;
                        if (parseFloat(global.signal) == 0) {
                            ToastAndroid.show('Kindly Topup your Id With Monthly Signals Pack to get the access', ToastAndroid.LONG);
                        } else {
                            navigation.navigate('MessageScreen', { type: "tele" })
                        }

                    }} style={[styles.touch, { alignSelf: 'center' ,display:'none'}]}>


                    <ImageBackground source={require('../../assets/botz/company_news.png')}
                        style={styles.imgbg}>
                        {parseFloat(S_Notify) > 0 ?
                            <ImageBackground resizeMode={'stretch'} source={require('../../assets/tab/ai1.png')} style={{ position: 'absolute', right: 20, top: 0, justifyContent: 'center', alignItems: 'center', bottom: 28, width: 35, height: 35 }}>
                                <Text adjustsFontSizeToFit={true} style={{ color: colors.selected, fontSize: 12 }}>{S_Notify}</Text>
                            </ImageBackground>
                            : null
                        }

                        <View style={styles.bottomview}>
                            <Text style={{
                                color: global.appColor2, textAlign: 'center', fontSize: 11,
                                fontFamily: global.bold
                            }}>
                                PAID{'\n'}SIGNALS
                            </Text>

                        </View>






                    </ImageBackground>
                </TouchableOpacity>
                   
                    



            </ImageBackground>
    );
}



export default Notification;
const styles1 = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0B1525',
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
source={require('../../assets/iconf/news.png')}
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
