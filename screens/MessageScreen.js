/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import { View, Text, Button, ImageBackground, Dimensions, RefreshControl, TouchableOpacity, BackHandler, StyleSheet, Image, StatusBar, FlatList, ActivityIndicator, ScrollView, TouchableHighlight } from 'react-native';
import { ThemeProvider, useFocusEffect, useIsFocused, useTheme } from '@react-navigation/native';
import { Appbar, Paragraph } from 'react-native-paper';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { jsonContext } from '../context/GlobalState';
import global from '../component/global';
import styles from '../component/styles'

const MessageScreen = ({ navigation, route }) => {
    const {hedge} = React.useContext(jsonContext);
    const pair = route.params?.pair;
    const type = route.params?.type;
    const side = route.params?.side;
    const { colors } = useTheme();
    const theme = useTheme();
    const [Data, setData] = React.useState('');
    const [Uid, setUid] = React.useState('');
    const [MinVal, setMinVal] = React.useState('');
    const [refreshing, setRefreshing] = React.useState(false);
    const [Clicked, setClicked] = React.useState('');
    const [chk_click, setChk_click] = React.useState(false);
    const [BuyTotal, setBuyTotal] = React.useState('0');
    const sym = route.params?.sym;
    // console.log("symboldis" + sym);
    const [Loading, setLoading] = React.useState(true)
    React.useEffect( () => {
       getVals()
        // console.log('user token:', userToken);        
    }, []);

    async function getVals(){
        let uid;
        try {
            console.log("type is " + type)
            uid = await AsyncStorage.getItem('user_id')
            setUid(uid)
            callApi(uid)


        }
        catch (e) {
            console.log(e);
        }
    }



    const onRefresh = React.useCallback(async () => {

        setRefreshing(true);
        callApi(Uid)


    })



    async function callApi(uid) {
        let url;
        url = global.BASE_URL + 'css_mob/get_logs_news.aspx?uid=' + uid
        if (type === 'sys') {
            if (pair != '' && pair != undefined && pair != null) {
                url = global.BASE_URL + 'css_mob/news.aspx?uid=' + uid + '&pair=' + pair
                if(hedge){
                    url = global.BASE_URL + 'css_mob/hedge/news.aspx?uid=' + uid + '&pair=' + pair+'&side='+side
                }
            } else {
                url = global.BASE_URL + 'css_mob/news.aspx?uid=' + uid
            }
        } else if (type === 'tele') {
            url = global.BASE_URL + 'css_mob/get_signals.aspx'

        } else if (type === 'cnews') {
            url = global.BASE_URL + 'css_mob/cnews.aspx'
        }
        console.log(url)
        fetch(url)
            .then(item => item.json())
            .then(mobData => {


                setData(mobData)
                setLoading(false)

            }

            )
        setRefreshing(false)
    }
    const EmptyList=()=>(
        
        <View  style={[styles1.container, { backgroundColor:'transparent',alignItems: 'center',justifyContent: 'center',height:300}]}>
            {/* <ActivityIndicator size={'small'} color={colors.selected} /> */}
            <Text style={{color:'#fff'}}>No Messages Found</Text>
            </View>
            
    )

    return (
       Loading?
       <ImageBackground source={global.bgimg} 
       style={{flexDirection:'column',alignItems: 'center',justifyContent: 'center',height:'100%',}} >
       <LottieView
          source={require('../assets/loading.json')}
          style={{ width: 300, height: 300, alignSelf: 'center' }}
          autoPlay
          loop
        />
       </ImageBackground>
       :
          
                <ImageBackground source={global.bgimg} resizeMode="stretch" style={[styles1.container, {  }]}>
                    <View style={{
                        flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, paddingTop: 40
                        , marginBottom: 10, 
                    }}>
                        <View style={{ alignItems: 'flex-start', justifyContent: 'center', width: '30%' }}>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
                                <Text style={{ textAlign: 'right' }}><IonIcons name="md-arrow-back" size={22} color={colors.selected} /></Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', paddingLeft: 20 }}>
                            <Text style={[styles.heading, { color: colors.profitcolor2 }]}>Message</Text>
                        </View>

                    </View>


                    <FlatList
                        horizontal={false}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                        data={Data}
                        showsHorizontalScrollIndicator={false}
                        ListEmptyComponent={EmptyList}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) => (
                            <View style={{ flexDirection: 'column', justifyContent: 'center', 
                            alignItems: 'center' }}>
                                {index > 0 ? Data[index].jdt.replace(/ /g, '/') === Data[index - 1].jdt.replace(/ /g, '/') ? null :
                                    <View style={{ width: '100%', alignItems: 'center', marginVertical: 15 }}>
                                        <Text style={{ color: colors.appBlue,
                                            paddingHorizontal: 15, paddingVertical: 2, textAlign: 'center', borderRadius: 10, fontFamily:global.appFontM,
                                        }}>{item.jdt.replace(/ /g, '/')}  {item.dt.split(' ')[1]}</Text>
                                    </View>
                                    :
                                    <View style={{ width: '100%', alignItems: 'center', marginVertical: 15 }}>
                                        <Text style={{ color: colors.appBlue,
                                            paddingHorizontal: 15, paddingVertical: 2, textAlign: 'center', borderRadius: 10,fontFamily:global.appFontM,
                                        }}>{item.jdt.replace(/ /g, '/')}  </Text>
                                    </View>
                                }
                                <View style={{
                                        marginVertical: 5, width: 350,backgroundColor:colors.appDarkGray,
                                        height: type === 'tele' ? 250 : 100, alignSelf: 'center', borderRadius: 5,
                                        flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start',  paddingHorizontal: 15
                                    }}>

                                    {type === 'tele' && (<Text style={{ fontSize: 18, fontFamily:global.appFontM, color: colors.appBlack }}>{item.pair}</Text>)}
                                    {type === 'cnews' && (<Text style={{ fontSize: 18, fontFamily:global.appFontM, color: colors.appBlack }}>{item.heading}</Text>)}
                                    <Text style={{ marginTop: 10, fontSize: 12, color: colors.appBlack ,lineHeight:20}}>{item.txt}</Text>
                                    <View style={{ justifyContent: 'space-between', width: '100%',alignItems: 'center', 
                                    flexDirection: 'row',width:150,alignSelf: 'flex-end',position:'absolute',bottom:5,right:10}}>
                                        
                                            <Feather name="clock" size={16} color={'#6a6f7b'} style={{alignSelf:'center'}}/>
                                            <Text style={{ textAlign: 'right', color: '#6a6f7b',textAlign:'center' }}>{item.dt.split(' ')[0]}</Text>
                                        
                                        
                                            <Text style={{ textAlign: 'right', color: '#6a6f7b',textAlign:'center' }}>{item.dt.split(' ')[1]}</Text>

                                        
                                    </View>
                                </View>
                            </View>

                        )}
                    />

                </ImageBackground>
    );
}



export default MessageScreen;
const styles1 = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0B1725',

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