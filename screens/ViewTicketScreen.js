/* eslint-disable prettier/prettier */
// css_mob/view_ticket.aspx?uid=top
import * as React from 'react';
import { ThemeProvider } from '@react-navigation/native';
import { View, Text, Button, Dimensions, ImageBackground, TouchableOpacity, Linking, StyleSheet, RefreshControl, Image, StatusBar, FlatList, ScrollView, TextInput, ActivityIndicator, ToastAndroid } from 'react-native';
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
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import RBSheet from "react-native-raw-bottom-sheet";
import styles from '../component/styles';
import { color } from 'react-native-reanimated';

// import { styles } from 'react-native-fbsdk-next/types/FBLoginButton';


const RevenueScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const theme = useTheme();
    const refRBSheet1 = React.useRef();
    const [Uid, setUid] = React.useState('');
    const [Loading, setLoading] = React.useState(true);
    const [currency, setCurrency] = React.useState('');
    const [tickets, setTickets] = React.useState('')
    const [Bal, setBal] = React.useState('')
    const isFocused = useIsFocused();
    const [refreshing, setRefreshing] = React.useState(false);
    const [cData, setCData] = React.useState(false);
    const [Det, setDet] = React.useState(false);
    const [TP, setTP] = React.useState('');
    const [Ti, setTi] = React.useState('');
    const [CP, setCP] = React.useState('');
    const [Ci, setCi] = React.useState('');
    const [DT, setDT] = React.useState('');
    const { toggleTheme } = React.useContext(AuthContext);
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
                let thm = null;
                let code = null;
                uid = await AsyncStorage.getItem('user_id')

                setUid(uid)

                // try {                
                //   callApi(uid);

                //   setRefreshing(false)
                // }
                // catch (e) {
                //   console.log(e);
                // }

            }, 1000);

            //we can add delay time here before callApi() i.e ' },1000,callApi());' //
        }, [])
    );
    React.useEffect(() => {
        if (Uid !== '') {
            callApi()
        }
    }, [Uid])
    const [closed, setClosed] = React.useState(0)
    const [pending, setPending] = React.useState(0)
    const callApi = () => {
        let url = global.BASE_URL + "css_mob/view_ticket.aspx?uid=" + Uid
        console.log(url)
        fetch(url)
            .then(item => item.json())
            .then(dta => {
                console.log(JSON.stringify(dta))
                setTickets(dta)
                var clos = 0, pend = 0
                try {

                    dta.map((itm, ind) => {
                        if (itm.status === 'False') {
                            pend = pend + 1
                        }
                        else {
                            clos = clos + 1
                        }
                    })
                    setPending(pend)
                    setClosed(clos)
                } catch (error) {

                }
                //    ToastAndroid.show(dta.msg,ToastAndroid.LONG)
                //    linkTo('/HomeDrawer/Funds')
            });

        setLoading(false)
    }
    const [Cid, setCid] = React.useState('')
    const viewTickets = (cid) => {
        setCid(cid)
        let url = global.BASE_URL + "css_mob/view_ticket_id.aspx?complaintid=" + cid
        console.log(url)
        fetch(url)
            .then(item => item.json())
            .then(dta => {
                console.log(JSON.stringify(dta))
                setCData(dta)
                //    ToastAndroid.show(dta.msg,ToastAndroid.LONG)
                //    linkTo('/HomeDrawer/Funds')
            });

        setLoading(false)
    }




    return (
        Loading ?
            <View style={{ flexDirection: 'column', justifyContent: 'center', height: '100%', backgroundColor: theme.bg }} ><LottieView source={require('../assets/loading.json')} style={{ width: 300, height: 300, alignSelf: 'center' }} autoPlay loop />

            </View>

            :
            !Det ?
                <View  style={styles.container}>

                    <View style={{ flexDirection: 'column', justifyContent: 'center', width: '100%', paddingTop: 35 }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 5, width: '100%' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
                                    <Text style={{ textAlign: 'right' }}><IonIcons name="chevron-back-sharp" size={25} color={colors.selected} /></Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={[styles.heading, { color: colors.profitcolor2, fontSize: 22, marginTop: 0 }]}>View Tickets</Text>
                            </TouchableOpacity>
                            <View style={{ alignItems: 'center', justifyContent: 'center', width: 50 }}>
                                <Text style={[styles.heading, { color: colors.appGray, fontSize: 22, marginTop: 0 }]}></Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', alignSelf: 'center', flexDirection: 'column', justifyContent: 'space-evenly',
                         paddingVertical: 5, paddingHorizontal: 10,backgroundColor:"#1d212d" }}>


                            <View style={{ paddingHorizontal: 10, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', alignSelf: 'center', width: '98%', }}>
                                <View style={{ flexDirection: 'column', width: '50%', justifyContent: 'center', alignItems: 'center',
                                borderRightWidth:0.5,borderColor:colors.appGray, height: 75, }}>
                                    <Text style={[{ textAlign: 'center', fontSize: 14, color: colors.selected,fontFamily:global.appFontM }]}>Total Solved Tickets</Text>
                                    <Text style={[styles.sheading, { textAlign: 'left', fontSize: 24, color: colors.profitcolor2 }]}>{closed}</Text>
                                    {/* <Text style={[{textAlign:'left',fontSize:15,color:colors.appGray,fontWeight:'normal'}]}>= {(parseFloat(TP)*global.cur_value).toFixed(2)} {global.cur_name}</Text> */}

                                </View>
                                <View style={{ flexDirection: 'column', width: '50%', justifyContent: 'center', alignItems: 'center', height: 75 }}>
                                    <Text style={[{ textAlignVertical: 'center', textAlign: 'left', fontSize: 14,fontFamily:global.appFontM, color: colors.selected }]}>Total Pending Tickets </Text>
                                    <Text style={[styles.sheading, { textAlign: 'left', fontSize: 24, color: colors.profitcolor2 }]}>{pending}</Text>
                                    {/* <Text style={[{textAlign:'left',fontSize:15,color:colors.appGray,fontWeight:'normal'}]}>= {(parseFloat(CP)*global.cur_value).toFixed(2)} {global.cur_name}</Text> */}

                                </View>

                            </View>

                        </View>

                    </View>
                    <View >

        <View style={{marginTop:20}}>

        
                        <FlatList
                            horizontal={false}

                            removeClippedSubviews={false}
                            data={tickets}

                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index}
                            renderItem={({ item, index }) => (

                                <TouchableOpacity onPress={() => { setDet(true), viewTickets(item.complaint_id) }}
                                style={{ width: '96%', alignSelf: 'center', elevation:5,borderRadius:10,backgroundColor:'#000', padding: 10, marginVertical:5}}>
                                   
                                        <View style={{ flexDirection: 'column', borderRadius: 5, margin: 0 }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between',backgroundColor:"#1d212d",padding: 10,width:377,right:11,top:-11,borderTopLeftRadius:10,borderTopRightRadius:10}}>
                                                <Text style={{ color: colors.appGray, fontSize: 16, fontWeight: 'bold', width: 235 }}>{item.status === 'False' ? 'Pending' : 'Solved'}</Text>
                                                <Text style={{ color: '#6C727E', fontSize: 13 }}>{item.date}</Text>
                                            </View>
                                            <View style={{
                                                justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', height: 25, marginTop: 5
                                            }}>
                                                <Text style={{ color: colors.selected, fontSize: 12 }}>  Ticket Id</Text>
                                                <Text style={{ color: colors.profitcolor2, fontSize: 14 }}>#{(parseInt(item.complaint_id) + 115000).toString()}  </Text>
                                            </View>
                                            <View style={{
                                                justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', height: 25, marginTop: 5
                                            }}>
                                                <Text style={{ color: colors.selected, fontSize: 12 }}>  Subject</Text>
                                                <Text style={{ color: colors.selected, fontSize: 14 }}>{item.sub}  </Text>


                                            </View>
                                            {/* <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.appBlue, marginTop: 5 }}>
                                                <View style={{ flex: 1, height: 1, backgroundColor: colors.appBlue }} />

                                                <View style={{ flex: 1, height: 1, backgroundColor: colors.appBlue }} />
                                            </View> */}
                                            </View>
                                  
                        
                                </TouchableOpacity>
                            )}
                        />
                        </View>
                    </View>

                </View>
                :
                <ImageBackground source={require('../assets/Aeon/aeon_login_bg.png')} resizeMode="stretch" style={styles.container} >

                    <View style={{ flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                       
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, 
                            paddingTop:35,
                            paddingVertical: 5, width: '100%' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <TouchableOpacity onPress={() => setDet(false)} style={{ padding: 10 }}>
                                        <Text style={{ textAlign: 'right' }}><IonIcons name="chevron-back-sharp" size={25} color={colors.selected} /></Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginLeft: 40 }}>
                                        <Text style={[styles.heading, { color: colors.selected, fontSize: 19, marginTop: 0 }]}>Ticket ID : #{(parseInt(Cid) + 115000).toString()}</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* <View  style={{alignItems: 'center',justifyContent:'center',width:50}}>            
                                        <Text style={[styles.heading,{color:colors.appGray,fontSize:22,marginTop:0}]}></Text>                            
                            </View> */}
                            </View>

                    </View>
                    <View style={{ marginBottom: '50%', marginTop: 60 }}>

                        <FlatList
                            horizontal={false}

                            removeClippedSubviews={false}
                            data={cData}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index}
                            renderItem={({ item, index }) => (
                                <ImageBackground source={require('../assets/Aeon/sidebar/black_bg.png')} resizeMode='stretch' style={{ width: '100%', height:160,alignSelf: 'center', flexDirection: 'column', justifyContent: 'space-evenly', }}>
                                    <View
                                        style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%',paddingHorizontal:20 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 200, height: 40, paddingTop: 5 }}>
                                            <Image
                                                source={require('../assets/Aeon/qq.png')}
                                                resizeMode={'stretch'}
                                                style={{ width: 35, height: 25, marginRight: 10, }}
                                            />
                                            <Text style={{ color: colors.selected,fontFamily:global.appFontM,textTransform:'uppercase' }}>
                                                Reply from : {item.sender}
                                            </Text>

                                        </View>

                                    </View>




                                    <View
                                        style={{ flexDirection: 'column', justifyContent: 'space-between', width: '100%',paddingHorizontal:10 ,top:-10}}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20, width: '100%' }}>
                                            <Text style={{ color: '#8E99BA', fontSize: 12, fontFamily: global.appFontM, width: '20%' }}>Message:   </Text>
                                            <Text style={{ color: colors.selected, fontSize: 12, PaddingRight: 10, textAlign: 'right', width: '80%' }}>{item.txt}</Text>

                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20, width: '100%' }}>
                                            <Text style={{ color: '#8E99BA', fontSize: 12, fontFamily: global.appFontM, width: '20%' }}>Date:</Text>
                                            <Text style={{ color: colors.selected, fontSize: 12, width: '80%', textAlign: 'right' }}>{item.date}</Text>

                                        </View>
                                 
                                    </View>

                                </ImageBackground>
                            )}
                        />


                    </View>

                </ImageBackground>



    );
}

export default RevenueScreen;
const styles1 = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bg,



    },
    statusF: {
        backgroundColor: 'red',
        paddingHorizontal: 6,
        paddingVertical: 4,
        color: 'white',
        borderRadius: 5, marginLeft: 100
    },
    statusT: {
        backgroundColor: 'green',
        paddingHorizontal: 6,
        paddingVertical: 4,
        color: 'white',
        borderRadius: 5, marginLeft: 100
    },
    hour_box: {

        color: '#808080',
        // borderBottomWidth: 0.5,
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
        fontFamily: global.appFontM,
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