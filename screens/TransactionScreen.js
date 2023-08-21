/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import { View, Text, Button, Dimensions, RefreshControl, TouchableOpacity, BackHandler, StyleSheet, Image, StatusBar, FlatList, ActivityIndicator, ScrollView, TouchableHighlight, ImageBackground } from 'react-native';
import { ThemeProvider, useFocusEffect, useIsFocused, useTheme, useLinkTo, useNavigation } from '@react-navigation/native';
import { Appbar, Paragraph } from 'react-native-paper';
import IonIcons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import AsyncStorage from '@react-native-async-storage/async-storage';
import global from '../component/global';
import styles from '../component/styles'
import { jsonContext } from '../context/GlobalState';
import { color } from 'react-native-reanimated';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

const TransactionScreen = ({ route }) => {
  const navigation = useNavigation();
  const { hedge } = React.useContext(jsonContext);
  const linkTo = useLinkTo();
  const { colors } = useTheme();
  const theme = useTheme();
  const [Data, setData] = React.useState([

  ]);
  const [Uid, setUid] = React.useState('');
  const [status, setStatus] = React.useState('both');
  const [refreshing, setRefreshing] = React.useState(false);
  const [Clicked, setClicked] = React.useState('');
  const [chk_click, setChk_click] = React.useState(false);
  const [BuyTotal, setBuyTotal] = React.useState('0');
  const sym = route.params?.sym;
  const side = route.params?.side
  const botid = route.params?.botid;
  var sym1;
  const [Loading, setLoading] = React.useState(true)
  React.useEffect(() => {

    settingFn()

  }, [Uid]);

  async function settingFn() {
    let uid;
    try {
      uid = await AsyncStorage.getItem('user_id')
      setUid(uid)
      if (Uid != '' && Uid != undefined && Uid != null) {

        callApi(uid)
      }


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
    console.log('textis - ' + sym + '  ' + sym1)
    let url
    if (botid !== undefined && botid !== undefined) {
      url = global.BASE_URL + 'css_mob/get_logs.aspx?uid=' + uid + '&botid=' + botid
    } else if (sym == undefined && sym1 == undefined) {
      url = global.BASE_URL + 'css_mob/get_logs.aspx?uid=' + uid
    }
    else {
      if (sym != '' && sym != undefined && sym != null) {
        url = global.BASE_URL + 'css_mob/get_logs.aspx?uid=' + uid + '&pair=' + sym + '&side=' + side
        if (hedge) {
          url = global.BASE_URL + 'css_mob/hedge/get_logs.aspx?uid=' + uid + '&pair=' + sym + '&side=' + side
        }

      } else if (sym1 != '' && sym1 != undefined && sym1 != null) {
        url = global.BASE_URL + 'css_mob/get_logs.aspx?uid=' + uid + '&pair=' + sym1

      }
    }

    console.log(url)
    fetch(url)
      .then(item => item.json())
      .then(mobData => {
        // let dt = [{
        //   inx: "0",
        //   stoploss: "",
        //   botid: "7656827",
        //   call: "CLOSE",
        //   img: "meta-fx.trade/icons/AUDCAD.png",
        //   txt: "ORDERID:28472425,QTY:0,PRICE:0,USDT:0,FUEL FEES : 1.486",
        //   type: "FINAL",
        //   qty: "0",
        //   price: "0",
        //   profit: "7.43",
        //   pair: "AUDCAD",
        //   order_time: "27 Jan 2023 09:16:53 PM",
        //   profit_per: "0",
        //   lev: "1",
        //   mode: "DEMO"
        // },
        // {
        //   inx: "0",
        //   stoploss: "",
        //   botid: "7656827",
        //   call: "CLOSE",
        //   img: "meta-fx.trade/icons/AUDCAD.png",
        //   txt: "ORDERID:28395315,QTY:0.1,PRICE:0.94524,USDT:0.094524,FUEL FEES : 1.486",
        //   type: "BUY",
        //   qty: "0.1",
        //   price: "0.94524",
        //   profit: "7.43",
        //   pair: "AUDCAD",
        //   order_time: "27 Jan 2023 09:16:53 PM",
        //   profit_per: "0",
        //   lev: "1",
        //   mode: "DEMO"
        // },
        // {
        //   inx: "1",
        //   stoploss: "",
        //   botid: "7656827",
        //   call: "CLOSE",
        //   img: "meta-fx.trade/icons/AUDCAD.png",
        //   txt: "ORDERID:28394066,QTY:0.1,PRICE:0.94621,USDT:0.094621,FUEL FEES : 1.472",
        //   type: "BUY",
        //   qty: "0.1",
        //   price: "0.94621",
        //   profit: "7.36",
        //   pair: "AUDCAD",
        //   order_time: "27 Jan 2023 09:05:42 PM",
        //   profit_per: "0",
        //   lev: "1",
        //   mode: "DEMO"
        // }]
        // setData(dt)
        setData(mobData)
        console.log('falsee data ');
        setLoading(false)
        setRefreshing(false)
      }

      )

  }


  const EmptyList = () => (

    <View style={{ flexDirection: 'column', justifyContent: 'center', height: '100%' }} >
      <ActivityIndicator size={'small'} color={colors.appBlack} /></View>

  )

  return (

    <ImageBackground style={[styles1.container, {}]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, marginBottom: 10 }}>
        <View style={{ alignItems: 'center', justifyContent: 'center', width: '20%' }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
            <Text allowFontScaling={false} style={{ textAlign: 'right' }}><IonIcons name="md-arrow-back"
              size={24} color={colors.appGray} /></Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', paddingLeft: 20 }}>
          <Text allowFontScaling={false} style={[styles.heading, { color: colors.appGray }]}>TRADE HISTORY</Text>
        </View>
      </View>

{
  Loading?
      <View style={{  justifyContent: 'center',alignItems:'center',height: '80%'}}>
          <LottieView
          source={require('../assets/loading.json')}
          style={{ width: 300, height: 300, alignSelf: 'center' }}
          autoPlay
          loop
        />
      </View>
      :
      Data.lenth>0?
      <FlatList
        horizontal={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={() => (
          <View style={{ marginBottom: 50 }} />
        )}
        data={Data}//status==='live'?Data.filter(e=>e.mode==='live'):status==='demo'?Data.filter(e=>e.mode==='demo'):Data}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        // ListEmptyComponent={EmptyList}
        renderItem={({ item, index }) => (
          <ImageBackground source={Clicked == index ? require('../assets/Aeon/bigHist.png') : require('../assets/Aeon/smallHist.png')}
            style={{
              width: '100%', height: Clicked === index ? 400 : item.inx == '1' ?180:150,
              marginVertical: 5,
            }}
            resizeMode="stretch"
          >
            <TouchableOpacity activeOpacity={0.9}
              onPress={() => {
                if (Clicked == index) {
                  setClicked(-1)
                } else {
                  setClicked(index)
                }
              }}

              style={{
                width: '92%', alignSelf: 'center', marginTop: 5
                , justifyContent: 'space-evenly'
              }}>
              {
                index === Clicked ?
                  <View >

                    <View
                      style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignSelf: 'center' }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 200, paddingTop: 5 }}>


                        <Text allowFontScaling={false} style={{
                          color: colors.selected, fontSize: 15,
                          fontFamily: global.appFontB,
                        }}>
                          {item.pair}
                        </Text>

                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                        <Text allowFontScaling={false} style={{
                          color: colors.selected, fontSize: 11, fontFamily: global.appFontM
                          , marginLeft: 15, textAlignVertical: 'bottom'
                        }}>
                          {item.order_time}
                        </Text>


                      </View>
                    </View>
                    <View style={{ justifyContent: 'space-between', marginVertical: 5, flexDirection: 'row' }}>
                      <Text allowFontScaling={false}
                        style={{
                          fontSize: 13, color: colors.selected, fontFamily: global.appFontM,
                          //  color:item.type.toLowerCase()==='buy' || item.type.toLowerCase()==='manual buy'?colors.profitcolor:colors.losscolor,
                          //  fontFamily:global.bold,
                          marginLeft: 0, textAlignVertical: 'center'
                        }}>{item.call} /
                        {parseFloat(item.qty) > 0 ?
                          item.call.toLowerCase() == 'open' ?
                            item.type.toLowerCase() === 'buy' ? 'LONG' : item.type.toLowerCase() === 'sell' ? 'SHORT' : item.type.toLowerCase() === 'manual buy' ?
                              'LONG (MANUAL)' : item.type.toLowerCase() === 'manual sell' ?
                                'SHORT (MANUAL)' :
                                null :
                            item.call.toLowerCase() == 'close' ?
                              item.type.toLowerCase() === 'buy' ? 'SHORT' : item.type.toLowerCase() === 'sell' ? 'LONG' : item.type.toLowerCase() === 'manual buy' ?
                                'SHORT (MANUAL)' : item.type.toLowerCase() === 'manual sell' ?
                                  'LONG (MANUAL)' :
                                  null : null

                          :
                          'Failed'

                        }
                      </Text>
                      <AntDesign name={'caretup'} color={'white'} />
                    </View>

                    {/* <View
                            style={{flexDirection: 'row', justifyContent: 'space-between',width:'100%',backgroundColor:'red'}}> */}

                    <View style={{
                      flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start',
                      marginVertical: 15,
                    }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 10 }}>
                        <Text allowFontScaling={false} style={{ color: '#000', fontSize: 13, fontFamily: global.appFontM, width: '50%' }}>Order ID</Text>
                        <Text allowFontScaling={false} style={{ color: '#000', fontSize: 13, fontFamily: global.appFontM, width: '50%', textAlign: 'right' }}>{item.txt.split(',')[0].split(':')[1]} </Text>

                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 10 }}>
                        <Text allowFontScaling={false} style={{ color: '#000', fontSize: 13, fontFamily: global.appFontM, width: '50%' }}>Quantitiy</Text>
                        <Text allowFontScaling={false} style={{ color: '#000', fontSize: 13, fontFamily: global.appFontM, width: '50%', textAlign: 'right' }}>{item.txt.split(',')[1].split(':')[1]} </Text>

                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 10 }}>
                        <Text allowFontScaling={false} style={{ color: '#000', fontSize: 13, fontFamily: global.appFontM, width: '50%' }}>USD</Text>
                        <Text allowFontScaling={false} style={{ color: '#000', fontSize: 13, fontFamily: global.appFontM, width: '50%', textAlign: 'right' }}>{item.txt.split(',')[3].split(':')[1]} </Text>

                      </View>

                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 10 }}>
                        <Text allowFontScaling={false} style={{ color: '#000', fontSize: 13, fontFamily: global.appFontM, width: '50%' }}>Price</Text>
                        <Text allowFontScaling={false} style={{ color: '#000', fontSize: 13, fontFamily: global.appFontM, width: '50%', textAlign: 'right' }}>{item.price} </Text>

                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 10 }}>
                        <Text allowFontScaling={false} style={{ color: '#000', fontSize: 13, fontFamily: global.appFontM, width: '50%' }}>Filled (USD)</Text>
                        <Text allowFontScaling={false} style={{ color: '#000', fontSize: 13, fontFamily: global.appFontM, width: '50%', textAlign: 'right' }}>{item.txt.split(',')[3].split(':')[1]} USD</Text>

                      </View>

                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 10, display: parseFloat(item.profit) == 0 ? 'none' : 'flex' }}>
                        <Text allowFontScaling={false} style={{ color: '#000', fontSize: 13, fontFamily: global.appFontM, width: '50%' }}>Fee (USD)</Text>
                        <Text allowFontScaling={false} style={{ color: '#000', fontSize: 13, fontFamily: global.appFontM, width: '50%', textAlign: 'right' }}>{item.mode.toString().toUpperCase() == 'LIVE' ? (item.profit.includes('-') ? '0' : (parseFloat(item.profit) * 0.2).toFixed(2)) : '0'}</Text>

                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 10, display: parseFloat(item.profit) == 0 ? 'none' : 'flex' }}>
                        <Text allowFontScaling={false} style={{ color: '#000', fontSize: 13, fontFamily: global.appFontM, width: '50%' }}>Realized PNL (USD)</Text>
                        <Text allowFontScaling={false} style={{ color: '#000', fontSize: 13, fontFamily: global.appFontM, width: '50%', textAlign: 'right' }}>{parseFloat(item.profit).toFixed(3)} ({parseFloat(item.profit_per).toFixed(2)}% )</Text>

                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 10 }}>
                        <Text allowFontScaling={false} style={{ color: '#000', fontSize: 13, fontFamily: global.appFontM, width: '50%' }}>Mode</Text>
                        <Text allowFontScaling={false} style={{ color: item.mode.toLowerCase() == 'live' ? 'red' : 'green', fontSize: 13, fontFamily: global.appFontB, width: '50%', textAlign: 'right' }}>{item.mode.toString().toUpperCase()}</Text>

                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 10 }}>
                        <Text allowFontScaling={false} style={{ color: '#000', fontSize: 13, fontFamily: global.appFontM, width: '50%' }}>Trade ID</Text>
                        <Text allowFontScaling={false} style={{ color: '#000', fontSize: 13, fontFamily: global.appFontM, width: '50%', textAlign: 'right' }}>{item.botid.toString().toUpperCase()}</Text>

                      </View>



                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: 'green', display: !!item.stoploss ? 'flex' : 'none' }}>
                        <Text allowFontScaling={false} style={{ color: '#000', fontSize: 13, fontFamily: global.appFontM, width: '50%' }}>{item.stoploss ? item.stoploss == '1' ? 'Trade closed at Stop Loss !' : item.stoploss == '2' ? 'Trade closed at Trailing Stop Loss !' : null : null}</Text>
                      </View>

                    </View>

                  </View>
                  :

                  <View>

                    <View >

                      <View
                        style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 200, paddingTop: 5 }}>


                          <Text allowFontScaling={false} style={{
                            color: colors.selected, fontSize: 15,
                            fontFamily: global.appFontB
                          }}>
                            {item.pair}
                          </Text>

                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                          <Text allowFontScaling={false} style={{
                            color: colors.selected, fontSize: 11, fontFamily: global.appFontM
                            , marginLeft: 15, textAlignVertical: 'bottom'
                          }}>
                            {item.order_time}
                          </Text>


                        </View>
                      </View>
                      <View style={{ justifyContent: 'space-between', marginVertical: 5, flexDirection: 'row',marginBottom:20 }}>
                        <Text allowFontScaling={false}
                          style={{
                            fontSize: 13,
                            fontFamily:global.appFontM,color:colors.selected,
                            // color: item.type.toLowerCase() === 'buy' || item.type.toLowerCase() === 'manual buy' ? colors.profitcolor : colors.losscolor,
                            // fontFamily: global.bold,
                            marginLeft: 0, textAlignVertical: 'center'
                          }}>{item.call} /
                          {parseFloat(item.qty) > 0 ?
                            item.call.toLowerCase() == 'open' ?
                              item.type.toLowerCase() === 'buy' ? 'LONG' : item.type.toLowerCase() === 'sell' ? 'SHORT' : item.type.toLowerCase() === 'manual buy' ?
                                'LONG (MANUAL)' : item.type.toLowerCase() === 'manual sell' ?
                                  'SHORT (MANUAL)' :
                                  null :
                              item.call.toLowerCase() == 'close' ?
                                item.type.toLowerCase() === 'buy' ? 'SHORT' : item.type.toLowerCase() === 'sell' ? 'LONG' : item.type.toLowerCase() === 'manual buy' ?
                                  'SHORT (MANUAL)' : item.type.toLowerCase() === 'manual sell' ?
                                    'LONG (MANUAL)' :
                                    null : null

                            :
                            'Failed'

                          }
                        </Text>
                        <AntDesign name={'caretdown'} color={'white'} />
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 10, display: parseFloat(item.profit) == 0 ? 'none' : 'flex' }}>
                        <Text allowFontScaling={false} style={{ color: '#000', fontSize: 13, fontFamily: global.appFontM, width: '50%' }}>Realized PNL (USD)</Text>
                        <Text allowFontScaling={false} style={{ color: '#000', fontSize: 13, fontFamily: global.appFontM, width: '50%', textAlign: 'right' }}>{parseFloat(item.profit).toFixed(3)} ({parseFloat(item.profit_per).toFixed(2)}% )</Text>

                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 10 }}>
                        <Text allowFontScaling={false} style={{ color: '#000', fontSize: 13, fontFamily: global.appFontM, width: '50%' }}>Price</Text>
                        <Text allowFontScaling={false} style={{ color: '#000', fontSize: 13, fontFamily: global.appFontM, width: '50%', textAlign: 'right' }}>{item.price} </Text>

                      </View>
                      {/* {item.inx == '1' ? <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 10, backgroundColor: '#000' }}>
                        <Text allowFontScaling={false} style={{ color: '#000', fontSize: 13, fontFamily: global.appFontM, width: '49%', marginLeft: '1%' }}>REMARKS :</Text>
                        <Text allowFontScaling={false} style={{ color: '#000', fontSize: 13, fontFamily: global.appFontM, width: '49%', textAlign: 'right', marginRight: '1%' }}>Order Started</Text>
                      </View>
                        : null} */}

                    </View>
                  </View>
              }
            </TouchableOpacity>
            {item.inx == '1' ?
                      <View style={{paddingLeft:5,height:40,
                        flexDirection: 'row', justifyContent: 'space-between', width: '98%',
                      }}>
                        <Text allowFontScaling={false} style={{
                          color: '#000', fontSize: 13, fontFamily: global.appFontM,
                          width: '49%', marginLeft: 12,textAlignVertical:'center'
                        }}>REMARKS</Text>
                        <View style={{ backgroundColor: colors.appGray, width: '49%',marginRight: '1%',
                      justifyContent:'center',borderTopLeftRadius:20,borderBottomLeftRadius:20,
                      alignItems:'center'}}>

                        <Text allowFontScaling={false} style={{
                          color: '#fff', fontSize: 13,textTransform:'uppercase'
                          , fontFamily: global.appFontM, 
                          
                        }}>Order Started</Text>
                        </View>
                      </View>
                      : null}
                        
                    <View style={{
                      display:Clicked===index?'flex':'none',
                      alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row',
                      // backgroundColor: 'green'
                    }}>
                      {/* <TouchableOpacity onPress={() => {
                        global.val = item.pair
                        linkTo('/HomeDrawer/HomeDrawer/Swap')

                      }} >
                        <Text allowFontScaling={false}
                          style={{ color: '#000', fontSize: 13, paddingHorizontal: 15, paddingVertical: 5, borderRadius: 5, marginTop: 10 }}>
                          EDIT
                        </Text>
                      </TouchableOpacity> */}
                      <TouchableOpacity onPress={() => {
                        setLoading(true);
                        sym1 = item.pair;
                        callApi(Uid)

                      }} 
                      style={{borderRadius: 5, borderWidth:1,borderColor:colors.appLightgray,padding:5,paddingHorizontal:8
                      ,marginLeft:15
                      }}
                      >
                        <Text allowFontScaling={false}
                          style={{ color: colors.appBlack,fontSize:13,fontFamily:global.appFontM  }}>
                          FILTER
                        </Text>
                      </TouchableOpacity>

                    </View>
          </ImageBackground>
        )}
      />
      :
      <View style={{  justifyContent: 'center',alignItems:'center',height: '80%'}}>
        <Text style={{color:colors.appGray,fontSize:16}}>No Trades Found!</Text>
      </View>
    
    }
    </ImageBackground>
  );
}



export default TransactionScreen;
const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#0B1725',
    paddingTop: 40
  },
  textInput: {
    marginLeft: 15,
    marginTop: -15,
    paddingBottom: -10,

  },
  text_header: {
    color: "#000",
    fontFamily: global.appFontM,
    fontSize: 30
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // borderBottomWidth: 0.5,
    // borderBottomColor: '#000',
    marginTop: 15
  },
  text_Price: {
    color: "#000",
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
    backgroundColor: '#000',
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
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
    fontFamily: global.appFontM,
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
    fontFamily: global.appFontM,
  }
});