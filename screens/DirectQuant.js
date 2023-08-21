/* eslint-disable prettier/prettier */
import * as React from 'react';
import { ThemeProvider } from '@react-navigation/native';
import { View,ImageBackground, Text, Button, Dimensions,Switch, TouchableOpacity,Linking, StyleSheet,RefreshControl, Image, StatusBar, FlatList, ScrollView, TextInput,ActivityIndicator, ToastAndroid } from 'react-native';
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
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import LinearGradient from 'react-native-linear-gradient';
// import Modal from 'react-native-modal';
// import RBSheet from "react-native-raw-bottom-sheet";
import styles from '../component/styles';

// import { styles } from 'react-native-fbsdk-next/types/FBLoginButton';

const {width,height} = Dimensions.get('window')

const DirectQuant = ({ navigation }) => {
    const {colors}=useTheme();
    const theme=useTheme();
    const refRBSheet1 = React.useRef();
    const [Uid, setUid] = React.useState(global.uid);
    const [Loading, setLoading] = React.useState(true);  
    const [currency, setCurrency] = React.useState('');    
    const [Revenue_data,setRevenue_data] = React.useState('')
    const [Bal,setBal] = React.useState('')
    const isFocused = useIsFocused();
    const [refreshing, setRefreshing] = React.useState(false);
    const [RevDet, setRevDet] = React.useState('');
    const [Det, setDet] = React.useState(false);
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
                try {                
                  callApi(uid);
                 
                  setRefreshing(false)
                }
                catch (e) {
                  console.log(e);
                }
                
              });

            //we can add delay time here before callApi() i.e ' },1000,callApi());' //
        }, [Uid])
    );

    const callApi=(uid)=>{
        let url =global.BASE_URL +"css_mob/rewards.aspx?uid="+uid+"&type=2"
        console.log(url)
        fetch(url)
        .then(item=> item.json())
        .then(dta=>{
            console.log(dta[0])
            setRevenue_data(dta[0].data)
            setTP(dta[0].today_profit)
            setCP(dta[0].total_profit)
            setTi(dta[0].today_investment)
            setCi(dta[0].total_investment)
        });
        
       setLoading(false)
    }

    const rev_det=(date)=>{
        setLoading(true)
        let url=global.BASE_URL +"css_mob/rewards.aspx?uid="+Uid+"&dtday="+date+"&type=2";
        console.log(url)
        fetch(url)
        .then(item=>item.json())
        .then(dta=>{
            console.log(JSON.stringify(dta))
            if(dta[0].data!==null && dta[0].data!==undefined)
            {setRevDet(dta[0].data)
                if(dta[0].data[0]!==null && dta[0].data[0]!==undefined)
                        {
                            setDT(dta[0].data[0].date)
                        }
                // setDT(dta[0].data[0].date)
            }
            // setRevDet(dta[])
            // setDT(dta[0].date)
            setLoading(false)
        })
    }




    return (
        Loading?
        <View style={{flexDirection:'column',justifyContent: 'center',height:'100%'}} >
            <LottieView source={require('../assets/loading.json')} 
            style={{width:300,height:300,alignSelf:'center'}} autoPlay loop />
        
        </View>
        
        :
        !Det?
         <ImageBackground style={styles.container}>

        <View style={{ flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
       
                        <View
                            source={require('../assets/botz/top-income-box.png')}
                            resizeMode={'stretch'}
                            style={{
                                width: '100%', alignItems: 'center', flexDirection: 'column', marginTop: 10,
                                height: 195,
                                justifyContent: 'flex-end'
                            }}
                        >
                            <View style={{
                                paddingHorizontal: width*0.01, flexDirection: 'row', 
                                justifyContent: 'space-around',
                                alignItems: 'flex-start', alignSelf: 'flex-start', width: width, height: '100%',
                            }}>
                                <ImageBackground source={require('../assets/Aeon/box2s.png')}
                                // imageStyle={{width:'50%'}}
                                resizeMode={'stretch'} style={{
                                    flexDirection: 'column', width: width*0.46
                                    , justifyContent: 'flex-start',
                                    alignItems: 'center', marginTop: 20,height:'100%',
                                    // borderRadius:10,
                                    // elevation:5,shadowColor:colors.appGray,backgroundColor:'#fff'
                                }}>
                                    <Text style={[{ textAlign: 'center', fontSize: 12,textTransform:'uppercase', color: colors.appGray,  
                                    marginTop: 15,fontFamily:global.appFontM }]}>Today's Profit( USD )</Text>
                                    <Text style={[styles.sheading, { textAlign: 'left', fontSize: 20, 
                                    color: colors.selected,marginTop:55 }]}>{parseFloat(TP).toFixed(2)}</Text>
                                    <Text style={[{ textAlign: 'left', fontSize: 13, color: colors.appBlack, marginTop:48,fontFamily:global.appFontM }]}>{(parseFloat(TP) * global.cur_value).toFixed(2)} {global.cur_name}</Text>


                                  </ImageBackground>
                                  <ImageBackground source={require('../assets/Aeon/box2s.png')}
                                // imageStyle={{width:'50%'}}
                                resizeMode={'stretch'} style={{
                                    flexDirection: 'column', width: width*0.46
                                    , justifyContent: 'flex-start',
                                    alignItems: 'center', marginTop: 20,height:'100%',
                                    // borderRadius:10,
                                    // elevation:5,shadowColor:colors.appGray,backgroundColor:'#fff'
                                }}>
                                    <Text style={[{ textAlign: 'center', fontSize: 12,textTransform:'uppercase', color: colors.appGray,  
                                    marginTop: 15,fontFamily:global.appFontM }]}>Cumulative profit (USD)</Text>
                                    <Text style={[styles.sheading, { textAlign: 'left', fontSize: 20, color: colors.selected,marginTop:55 }]}>{parseFloat(CP).toFixed(2)}</Text>
                                    <Text style={[{ textAlign: 'left', fontSize: 13, color: colors.appBlack, marginTop:48,fontFamily:global.appFontM }]}>{(parseFloat(CP) * global.cur_value).toFixed(2)} {global.cur_name}</Text>


                                  </ImageBackground>
                              
                            </View>

                        </View>

                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',bottom:65,right:2}}>
                        <Image source={require('../assets/Aeon/logoCircle.png')} resizeMode="stretch" style={{width:50,height:51}} />

                    </View>
                    </View>
                

                    <FlatList
                        horizontal={false}


                        data={Revenue_data}

                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item, index }) => (

                            <View 
                            // activeOpacity={0.9}
                            //     onPress={() => { setDet(true), rev_det(item.date) }}
                            >

                                <ImageBackground source={require('../assets/Aeon/rewardlist.png')} 
                                resizeMode="stretch"
                                    style={{
                                        flexDirection: 'column', justifyContent: 'space-between',
                                         height:80,
                                    }} >
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop:15,
                                    width: '100%', }} >
                                        <View style={{
                                    flexDirection: 'row',width:'50%',alignItems:'center',
                                     alignSelf: 'flex-start',justifyContent:'center'
                                }}>
                                        <View style={{
                                            flexDirection: 'column', justifyContent: 'space-between', marginLeft: 5,width:'50%',
                                            alignItems: 'flex-start'
                                        }}>
                                            <Text style={{ fontSize: 12,fontFamily:global.appFontM,  color: '#000' }}>PROFIT</Text>
                                            
                                            <Text style={{ color:colors.appSkyblue, fontSize: 14,fontFamily:global.appFontB }}>${parseFloat(item.amount).toFixed(3)}</Text>
                                            


                                            </View>
                                            <Image source={require('../assets/Aeon/dollar.png')}
                                            style={{ width: 30, height: 25, marginHorizontal: 5 }} resizeMode={'stretch'}
                                        />
                                        </View>
                                        <View style={{
                                            flexDirection: 'row', justifyContent: 'center', width:'50%',justifyContent:'center',
                                            alignItems: 'center', alignSelf: 'flex-start',
                                        }}>
                                        <View style={{
                                            flexDirection: 'column', justifyContent: 'space-between', marginLeft: 5,width:'50%',
                                            alignItems: 'flex-start'
                                        }}>
                                            <Text style={{ fontSize: 12,  fontFamily:global.appFontM, color: '#000' }}>DATE</Text>
                                           <Text style={{ color: '#000', fontSize: 14,fontFamily:global.appFontB, marginBottom: 5, }}>{item.date}</Text>
                                           
                                        </View>
                                            <Image source={require('../assets/Aeon/date.png')}
                                            style={{ width: 25, height: 25, marginHorizontal: 5 }} resizeMode={'stretch'}
                                        />
                                        </View>

                                        {/* <TouchableOpacity onPress={()=>{setDet(true),rev_det(item.date)}}>
                <Text><MaterialIcons name="keyboard-arrow-right" size={25}  color={'#000'}   /></Text>       
                </TouchableOpacity> */}

                                    </View>
                                </ImageBackground>
                                {/* <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#7F8591', marginTop: 0 }}>
                                    <View style={{ flex: 1, height: 1, backgroundColor: '#7F8591' }} />

                                    <View style={{ flex: 1, height: 1, backgroundColor: '#7F8591' }} />
                                </View> */}
                            </View>
                        )}
                    />


                </ImageBackground>
                :
                <View  style={[styles.container,{backgroundColor:'red'}]} >

                    <View style={{ flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                        <View
                            // source={require('../assets/botz/curvegreen.png')}
                            // colors={[ '#219202','#219202']}
                            // resizeMode={'stretch'}
                            style={{
                                width: '100%', alignItems: 'center'
                                , flexDirection: 'column', justifyContent: 'flex-end'
                            }}
                        // start={{ x: 0, y: 1 }}
                        // end={{ x: 1, y: 1 }}
                        >
                            <View style={{
                                flexDirection: 'row', justifyContent: 'space-between'
                                , paddingHorizontal: 15, paddingVertical: 5, paddingBottom: 30, width: '100%'
                            }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <TouchableOpacity onPress={() => setDet(false)} style={{ padding: 10 }}>
                                        <Text style={{ textAlign: 'right' }}><IonIcons name="close-sharp" size={25} color={colors.selected} /></Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity onPress={() => navigation.navigate('TransactionScreen')} style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={[{ color: colors.selected, fontSize: 20,  marginTop: 0 }]}>{DT}</Text>
                                </TouchableOpacity>
                                <View style={{ alignItems: 'center', justifyContent: 'center', width: 50 }}>
                                    <Text style={[styles.heading, { color: colors.selected, fontSize: 22, marginTop: 0 }]}></Text>
                                </View>
                            </View>


                        </View>


                    </View>

                    <View style={{ marginTop: 10, zIndex: 999 }}>


                        <FlatList
                            horizontal={false}

                            removeClippedSubviews={false}
                            data={RevDet}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index}
                            renderItem={({ item, index }) => (
                                <View style={{
                                    marginVertical: 8, width: '96%', alignSelf: 'center', borderRadius: 5, flexDirection: 'column',
                                    justifyContent: 'space-evenly', paddingVertical: 5,
                                }}>
                                    <View style={{
                                        flexDirection: 'row', justifyContent: 'space-between', marginLeft: 5,
                                        alignItems: 'flex-start'
                                    }}>
                                        <Text style={{ fontSize: 14,  marginBottom: 5, color: '#7F8591', width: '30%' }}>Date</Text>
                                        <Text style={{ color: '#DBE2EB', fontSize: 14, marginBottom: 5, width: '70%', textAlign: 'right' }}>{item.date}</Text>

                                    </View>

                                    <View style={{
                                        flexDirection: 'row', justifyContent: 'space-between', marginLeft: 5,
                                        alignItems: 'flex-start'
                                    }}>
                                        <Text style={{ fontSize: 14,  marginBottom: 5, color: '#7F8591', width: '30%' }}>Amount</Text>
                                        <Text style={{ color: '#DBE2EB', fontSize: 14, marginBottom: 5, width: '70%', textAlign: 'right' }}>{item.amount}</Text>

                                    </View>

                                    <View style={{
                                        flexDirection: 'row', justifyContent: 'space-between', marginLeft: 5,
                                        alignItems: 'flex-start'
                                    }}>
                                        <Text style={{ fontSize: 14,  marginBottom: 5, color: '#7F8591', width: '30%' }}>Description</Text>
                                        <Text style={{ color: '#DBE2EB', fontSize: 14, marginBottom: 5, width: '70%', textAlign: 'right', lineHeight: 20 }}>{item.desc}</Text>

                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#7F8591', marginTop: 5 }}>
                                        <View style={{ flex: 1, height: 1, backgroundColor: '#7F8591' }} />

                                        <View style={{ flex: 1, height: 1, backgroundColor: '#7F8591' }} />
                                    </View>






                                </View>
                            )}
                        />
                    </View>



        </View>
      


    );
}

export default DirectQuant;
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
