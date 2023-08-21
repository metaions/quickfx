import React from 'react'
import {
    View, Text, StyleSheet, ToastAndroid, Linking, TouchableOpacity,
    Image, ImageBackground, SafeAreaView, ScrollView, FlatList
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import global from '../component/global';
import {
    useTheme,
    useLinkTo,
    useNavigation,
    Link,
} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RBSheet from 'react-native-raw-bottom-sheet';
import { ActivityIndicator } from 'react-native-paper';
const darkBlue = '#0f4c8f'
const lightBlue = '#1666bf'
export default function SideScreen() {
    const navigation = useNavigation()
    const { colors } = useTheme();
    const [aBal, setaBal] = React.useState('');
    const [eBal, setEBal] = React.useState('');
    const [refreshing, setRefreshing] = React.useState(true);
    const [refreshAsset, setRefreshAsset] = React.useState(false);
    const [refreshIncome, setRefreshIncome] = React.useState(false);
    const [refreshEarning, setRefreshEarning] = React.useState(false);
    const refRBSheet1 = React.useRef();
    const [Rates, setRates] = React.useState('');
    const [Cur, setCur] = React.useState(global.cur_name);
    React.useEffect(() => {

        getBal('asset')
        getBal('income')
        Cur_Set();
    }, [])
    const Cur_Set = (from) => {
        if(from=='set'){

            refRBSheet1.current.close()
        }
        fetch(global.BASE_URL + 'css_mob/currency.aspx')
          .then(item => item.json())
          .then(Data => {
           
            var convo = JSON.stringify(Data.conversion_rates);
            convo = convo.toString();
            convo = convo.replace('{', '').replace('}', '');
            convo = convo.replace(/['"]+/g, '');
    
            var spl = [];
            spl = convo.split(',');
            var finaljson = '';
            for (let i = 0; i < spl.length - 1; i++) {
              var newstring = [];
              newstring = spl[i].toString().split(':');
              var json = '{"name":"' + newstring[0] + '","value":"' + newstring[1] + '"}';
              if (finaljson == '') {
                finaljson = json;
              } else {
                finaljson = finaljson + ',' + json;
              }
            }
            // console.log(finaljson)
            finaljson = '[' + finaljson + ']';
            finaljson = finaljson.replace(' ', '');
            // console.log(JSON.parse(finaljson))
            setRates(JSON.parse(finaljson));
          }).catch(e => {
            console.log(e)
          })
      };

    const comps = [
        // {
        //     id: 0,
        //     txt: 'test',
        //     icon: require('../assets/Aeon/icons/kyc.png'),
        //     right: null,
        //     type: 'navigate',
        //     route: 'SignUpDetail',
        //     params: {
        //       uid:'cqjmgn',
        //       pw:'123456',
        //       txnpw:'1234',
        //       token:'fdsfhdfjkldsj454',
        //       txn:'1452360',

        //     }
        // },
        {
            id: 1,
            txt: 'KYC',
            icon: require('../assets/Aeon/sidebar/kyc.png'),
            right: null,
            type: 'navigate',
            route: 'kyc'
        },
        {
            id: 2,
            txt: 'REFER',
            icon: require('../assets/Aeon/sidebar/refer.png'),
            right: null,
            type: 'navigate',
            route: 'Invite'
        },
        {
            id: 3,
            txt: 'TOPUP ID',
            icon: require('../assets/Aeon/sidebar/topup.png'),
            right: null,
            type: 'navigate',
            route: 'Web',
            params: {
                url:
                    global.BASE_URL +
                    'm/homebot.aspx?uid=' +
                    global.uid +
                    '&pwd=' +
                    global.PWD + '&page=topup',
            }
        },
        {
            id: 3,
            txt: 'GENEOLOGY',
            icon: require('../assets/Aeon/sidebar/topup.png'),
            right: null,
            type: 'navigate',
            route: 'Web',
            params: {
                url:
                    global.BASE_URL +
                    'm/homebot.aspx?uid=' +
                    global.uid +
                    '&pwd=' +
                    global.PWD + '&page=direct',
            }
        },
        {
            id: 4,
            txt: 'TRANSFER TO ASSETS',
            icon: require('../assets/Aeon/sidebar/assets2.png'),
            right: null,
            type: 'navigate',
            route: 'TransferAsset',
            params: { Eval: eBal, Aval: aBal }
        },
        {
            id: 5,
            txt: 'ASSETS',
            icon: require('../assets/Aeon/sidebar/asset.png'),
            right: null,
            type: 'navigate',
            route: 'Asset'
        },
        // {
        //     id: 6,
        //     txt: 'INCOME',
        //     icon: require('../assets/Aeon/icons/income.png'),
        //     right: null,
        //     type: 'navigate',
        //     route: 'Earning'
        // },
        {
            id: 7,
            txt: 'EARNINGS',
            icon: require('../assets/Aeon/sidebar/earnings.png'),
            right: null,
            type: 'navigate',
            route: 'Earning'
        },
        {
            id: 8,
            txt: 'CURRENCY',
            icon: require('../assets/Aeon/sidebar/currency.png'),
            right: null,
            type: 'rbsheet',
            route: 'currency'
        },
        {
            id: 9,
            txt: 'SUPPORT TICKET',
            icon: require('../assets/Aeon/sidebar/ticker.png'),
            right: null,
            type: 'navigate',
            route: 'AddTicketScreen'
        },
        {
            id: 10,
            txt: 'TICKET DETAILS',
            icon: require('../assets/Aeon/sidebar/ticket.png'),
            right: null,
            type: 'navigate',
            route: 'ViewTicketScreen'
        },
        {
            id: 11,
            txt: 'SIGNUP',
            icon: require('../assets/Aeon/sidebar/signup.png'),
            right: null,
            type: 'navigate',
            route: 'SignUpInner'
        },
        {
            id: 12,
            txt: 'CHANGE PASSWORD',
            icon: require('../assets/Aeon/sidebar/password.png'),
            right: null,
            type: 'navigate',
            route: 'ChangePass'
        },
        {
            id: 13,
            txt: 'CHANGE TXN PASSWORD',
            icon: require('../assets/Aeon/sidebar/txn1.png'),
            right: null,
            type: 'navigate',
            route: 'ChangeTxnPass'
        },
        {
            id: 14,
            txt: 'FORGOT TXN PASSWORD',
            icon: require('../assets/Aeon/sidebar/txn2.png'),
            right: null,
            type: 'navigate',
            route: 'ForgotPass'
        },
        // {
        //     id: 15,
        //     txt: 'YOUTUBE',
        //     icon: require('../assets/Aeon/icons/youtube.png'),
        //     right: null,
        //     type: 'link',
        //     route: 'https://www.youtube.com'
        // },
        // {
        //     id: 16,
        //     txt: 'TWITTER',
        //     icon: require('../assets/Aeon/icons/twitter.png'),
        //     right: null,
        //     type: 'link',
        //     route: 'https://www.twitter.com'
        // },
        // {
        //     id: 17,
        //     txt: 'INSTAGRAM',
        //     icon: require('../assets/Aeon/icons/insta.png'),
        //     right: null,
        //     type: 'link',
        //     route: 'https://www.instagram.com'
        // },
        // {
        //     id: 18,
        //     txt: 'FACEBOOK',
        //     icon: require('../assets/Aeon/icons/facebook.png'),
        //     right: null,
        //     type: 'link',
        //     route: 'https://www.facebook.com'

        // },
    ]

    const getBal = (type) => {
        if (type == 'asset') {

            let url = global.BASE_URL + 'css_mob/bal.aspx?uid=' + global.uid + '&ttype=V';
            console.log(url);
            fetch(url)
                .then(item => item.json())
                .then(dta => {
                    if (dta.success === 'true') {
                        global.vbal = dta.msg
                        setaBal(dta.msg);
                    }
                });
        }
        if (type == 'income') {
            let url2 = global.BASE_URL + 'css_mob/bal.aspx?uid=' + global.uid + '&ttype=E';
            console.log(url2);
            fetch(url2)
                .then(item => item.json())
                .then(dta => {
                    if (dta.success === 'true') {
                        global.ebal = dta.msg
                        console.log('hello')
                        setEBal(dta.msg);
                    }
                    setTimeout(() => {
                        setRefreshing(false);
                    }, 1000);
                })
                .catch(ex => {
                    setTimeout(() => {
                        setRefreshing(false);
                    }, 1000);
                });
        }
        setTimeout(() => { setRefreshAsset(false), setRefreshEarning(false) }, 5000)
    };

    const FooterComp = () => {
        return (
            <View style={styles.footer}></View>
        )
    }
    const sideComponents = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => {
                if (item.type == 'navigate') {
                    navigation.navigate(item.route, !!item.params && item.params)
                }
                else if (item.type == 'link') {
                    Linking.openURL(item.route)
                }
                else if (item.type == 'rbsheet') {
                    refRBSheet1.current.open()
                }
                else {
                    console.log('type not available ', item.type);
                }
            }}
                style={styles.touch}>
                {/* {console.log('see its ', item)} */}
                <View style={styles.leftView}>

                <Image source={item.icon}
                    style={styles.img} resizeMode="contain" />

                <Text style={styles.txt}>{item.txt}</Text>
                </View>
                <View style={styles.rightView}>
                {item.route=='Earning'?
                  <Text style={styles.rightTxt}>{eBal}</Text>
                  :
                  item.route=='Asset'?
                  <Text style={styles.rightTxt}>{aBal}</Text>
                  :null
                 }
                {item.route=='Earning'?
                <TouchableOpacity style={styles.right} 
                onPress={() => {
                  setRefreshEarning(true)
                  getBal('income')
                }}>
                  {
                    refreshEarning?
                    <ActivityIndicator size={'small'} color={colors.selected}/>
          //           <LottieView source={require('../assets/smallLoading.json')} 
          //  style={{width:50,height:50,alignSelf:'center',marginRight:20,backgroundColor:'red'}} autoPlay loop />
                    :
                    <FontAwesome name="refresh" size={24} color={colors.selected} />
                    
                    }
                </TouchableOpacity>
                :null}
                {item.route=='Asset'?
                <TouchableOpacity style={styles.right} 
                onPress={() => {
                  setRefreshAsset(true)
                  getBal('asset')
                }}>
                  {
                    refreshAsset?
                    <ActivityIndicator size={'small'} color={colors.selected}/>
          //           <LottieView source={require('../assets/smallLoading.json')} 
          //  style={{width:75,height:75,alignSelf:'center',marginRight:20}} autoPlay loop />
                    :
                    <FontAwesome name="refresh" size={24} color={colors.selected} />
                    
                    }
                </TouchableOpacity>
                :null}
                </View>
            </TouchableOpacity>
        )
    }

    async function setAsyncVals(name, val) {
        console.log('setasync vals');
        await AsyncStorage.setItem('cur_name', name.toString());
        await AsyncStorage.setItem('cur_val', val.toString());
      }
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={require('../assets/Aeon/sidebar/black_bg.png')}
                style={styles.imgback}
                resizeMode="stretch"
            >
                  <View style={{width:70,height:70,
                    borderRadius:70,alignItems:'center',justifyContent:'center',right:10}}>
                        <Image source={require('../assets/Aeon/sidebar/onenes_logo.png')}
                        resizeMode="stretch"
                        style={{width:70,height:70,marginTop:20}}/>
                </View>
               
                       
               

                <View style={{alignItems:'flex-start',marginLeft:0}}>
                    
                    <Text style={{color:'#fff',fontSize:18,fontFamily:global.appFontM}}>NAME{'\t\t\t\t\t'}{global.NAME}</Text>
                    <Text style={{fontSize:18,fontFamily:global.appFontM,color:colors.selected,marginTop:5}}>ID{'\t\t\t\t\t\t\t\t\t\t'}{global.uid}</Text>
                    <Text style={{color:'#fff',fontSize:18,fontFamily:global.appFontM,marginTop:5}}>E-mail{'\t\t\t\t\t'}{global.EMAIL}</Text>
                    <Text style={{color:'#fff',fontSize:15,fontFamily:global.appFontM,marginTop:5}}>STATUS{'\t\t\t\t\t'}
                        <Text style={{color:global.AMT=='0'||global.AMT==''?colors.losscolor:colors.selected,fontFamily:global.appFontB,fontSize:15}}>{global.AMT=='0'||global.AMT==''?'INACTIVE':'ACTIVE'}
                          </Text></Text>
                </View>
                
            </ImageBackground>
            {/* <View
                style={styles.imgbackbtm}>
                <View
                    style={{ flex: 0.7, borderTopLeftRadius:5,
                    borderTopRightRadius:5,justifyContent:'center',paddingLeft:'8%' }}>
                        <Text style={{color:'#fff',fontSize:13,fontFamily:global.appFontM}}>E-mail{'\t\t\t\t\t\t\t\t\t\t\t'}{global.EMAIL}</Text>
                </View>
                <View
                    style={{ flex: 0.7, borderBottomLeftRadius:5,
                        borderBottomRightRadius:5,justifyContent:'center',paddingLeft:'8%' }}>
                        <Text style={{color:'#fff',fontSize:13,fontFamily:global.appFontM}}>STATUS{'\t\t\t\t\t\t\t\t\t\t\t'}
                        <Text style={{color:global.AMT=='0'||global.AMT==''?colors.losscolor:colors.selected,fontFamily:global.appFontB,fontSize:15}}>{global.AMT=='0'||global.AMT==''?'INACTIVE':'ACTIVE'}
                          </Text></Text>

                </View>
            </View> */}
            <View style={styles.btmview}>

                <FlatList
                    ListFooterComponent={FooterComp}
                    data={comps}
                    renderItem={sideComponents}
                    keyExtractor={item => item.id}
                />
            </View>
            <RBSheet
        ref={refRBSheet1}
        // closeOnDragDown={true}
        closeOnPressMask={true}
        height={350}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <View
          style={{
            flex: 10,
            flexDirection: 'column',
            backgroundColor: colors.appBlack,
          }}>
          <View style={{ paddingVertical: 15, width: '96%' ,alignSelf:'center',justifyContent:'space-between',flexDirection:'row'}}>
            <Text
              style={
                {
                  color: colors.profitcolor,textTransform:'uppercase',
                  textAlign: 'center',fontFamily:global.appFontM
                }
              }>
              Selected Currency: {global.cur_name}{' '}
            </Text>
            <TouchableOpacity style={{padding:5}} 
            onPress={()=>refRBSheet1.current.close()}>
            <Text
              style={
                {
                  color: colors.losscolor,textTransform:'uppercase',
                  textAlign: 'center',fontFamily:global.appFontM
                }
              }>
              close
            </Text>

            </TouchableOpacity>
          </View>
          <FlatList
            horizontal={false}
            removeClippedSubviews={false}
            data={Rates}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) =>
              index == 0 ? null : (
                <TouchableOpacity
                  onPress={() => {
                    (global.cur_name = item.name),
                      setCur(item.name),
                      (global.cur_value = item.value),
                      setAsyncVals(item.name, item.value),
                      refRBSheet1.current.close();
                  }}
                  style={{
                    paddingVertical: 20,
                    justifyContent: 'center',
                    paddingLeft: 20,
                    // borderBottomWidth: 0.5,
                    // borderBottomColor: global.grad3,
                    width: '100%',
                    backgroundColor:global.cur_name === item.name?'#fff':colors.appLightestGray
                  }}>
                  <View>
                    <Text
                      style={
                        {
                          color:
                            global.cur_name === item.name
                              ? colors.appSkyblue
                              : colors.appBlack,
                          
                          fontSize: global.cur_name === item.name ? 20 : 16,
                        }}>
                      {' '}
                      {item.name}{' '}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            }
          />
        </View>
        {/* <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            refRBSheet1.current.close();
          }}
          style={{
            flex: 1,
            width: '100%',
            alignItems: 'center',
            backgroundColor: colors.bg,
            paddingTop: 0,
          }}>
          <View>
            <Text style={{ color: '#ff0000' }}>
              Cancel
            </Text>
          </View>
        </TouchableOpacity> */}
      </RBSheet>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    right:{
      // alignSelf: 'flex-end',
      justifyContent:'flex-end',
      alignItems: 'flex-end',
    },
    imgback: {
        flex: 0.20,
        flexDirection:'row',
        padding:20
    },
    imgbackbtm: {
        flex: 0.14,
        marginTop: '-20%',
        elevation: 4,
        // width:'90%',
        marginHorizontal:'5%',

    },
    btmview: {
        flex: 0.66,
    },
    touch: {
        flexDirection: 'row',
        margin: 10,
        paddingVertical: 15,
        marginVertical: 2,
        alignItems: 'center',
        width:'100%',
        // backgroundColor:'yellow'
        // backgroundColor:'red'
    },
    leftView: {
        flexDirection: 'row',
        // margin: 10,
        // paddingVertical: 15,
        // marginVertical: 2,
        alignItems: 'center',
        width:'70%',
        // backgroundColor:'green'
    },
    rightView: {
        flexDirection: 'row',
        // margin: 10,
        // paddingVertical: 15,
        // marginVertical: 2,
        alignItems: 'center',
        width:'25%',
        marginRight:'5%',
        justifyContent:'flex-end',
        // backgroundColor:'green'
    },
    img: {
        width: 30,
        height: 30,
        marginRight: 25,
        marginLeft: 15,
        tintColor: '#19dc51'
    },
    txt: {
        color: '#fff',
        fontFamily: global.appFontM,
        fontSize: 15,
    },
    rightTxt: {
        color: '#fff',
        fontFamily: global.appFontM,
        fontSize: 15,
        marginRight:10
    },
    footer: {
        marginBottom: 100
    }
})