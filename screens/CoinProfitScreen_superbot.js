/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable css_mob/jsx-no-duplicate-props */
/* eslint-disable css_mob/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import { ThemeProvider, useFocusEffect, useIsFocused, useTheme, useLinkTo } from '@react-navigation/native';
import { View, Text, Button, Dimensions, TouchableOpacity, ToastAndroid, StyleSheet, RefreshControl, Image, StatusBar, FlatListProps, ListRenderItemInfo, FlatList, TextInputComponent, TextInput, Alert, ActivityIndicator, BackgroundImage, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import Feather from 'react-native-vector-icons/Feather';
import IonIcons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import global from '../component/global'
import { jsonContext } from '../context/GlobalState';
import Modal from 'react-native-modal';

// import Rates from '../component/Rates'
import styles from '../component/styles'
var DeviceInfo = require('react-native-device-info');
import DatePicker from 'react-native-date-picker'
import { captureScreen } from 'react-native-view-shot';
var RNFS = require('react-native-fs');
import Share from 'react-native-share';
const CoinProfitScreen = ({ navigation, route }) => {
  const [date, setDate] = React.useState(new Date())
  const [open, setOpen] = React.useState(false)
  const [dType, setDType] = React.useState(null)
  const [dateModal, setDateModal] = React.useState(false)
  const [msg, setMsg] = React.useState(`See My Result Of Total Automated Autobot  ,Join AEON Now. https://quickfx.in.net?spid=` + global.uid)

  const from = route.params?.from

  const { colors } = useTheme();

  // const {theme}=useTheme();


  ///////////////////////////////////////////////////////////////

  const [Uid, setUid] = React.useState('')
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


  const [No_Search, setNo_Search] = React.useState(false);

  const [Loading, setLoading] = React.useState(true)
  const [profit_cnt, setProfit_cnt] = React.useState(0)
  const [profit, setProfit] = React.useState(0)
  const [loss, setLoss] = React.useState(0)
  const [loss_cnt, setLoss_cnt] = React.useState(0)
  const [refreshing, setRefreshing] = React.useState(false);
  const [fromDate, setFromDate] = React.useState();
  const [toDate, setToDate] = React.useState();

  const [type, setType] = React.useState('daily');
  const [status, setStatus] = React.useState('both');

  const [Data, setData] = React.useState([]);
  const [NData, setNData] = React.useState('');



  const [Inp_txt, setInp_txt] = React.useState('');





  React.useEffect(() => {
    console.log('issue could be this---------------');
    get_Data()
  }, [type])

  // React.useEffect(()=>{
  //   console.log(`length: ${Data}`)
  //     if(Data){
  //       let val=parseFloat((isNaN(parseFloat(profit_cal())) || isNaN(parseFloat(loss_cal())))?'0':(parseFloat(profit_cal())+parseFloat(loss_cal()))).toFixed(2)
  //       setMsg(`See My Result Of Total Automated Superbot  , ${val} USD . Join MetaFX Now. https://meta-fx.trade/s/r.aspx?spid=${global.uid}`)
  //     }
  // },[Data])
  const get_Data = () => {
    let from = fromDate ? fromDate : ''
    let to = toDate ? toDate : ''
    let FromDate = ''
    let ToDate = ''
    if (to != '') {

      ToDate = to.getDate() + ' ' + months[to.getMonth()] + ' ' + to.getFullYear()
    }
    if (from != '') {

      FromDate = from.getDate() + ' ' + months[from.getMonth()] + ' ' + from.getFullYear()
    }
    let url = global.BASE_URL + 'css_mob/coin_wise.aspx?uid=' + global.uid + '&mode=' + status + '&type=' + type + '&from=' + FromDate + '&to=' + ToDate
    let pfrom = route.params?.from
    if (pfrom == 'hedgebot') {
      url = global.BASE_URL + 'css_mob/autobot/coin_wise.aspx?uid=' + global.uid + '&mode=' + status + '&type=' + type + '&from=' + FromDate + '&to=' + ToDate
    }
    if (pfrom == 'superbot') {
      url = global.BASE_URL + 'css_mob/superbot/coin_wise.aspx?uid=' + global.uid + '&mode=' + status + '&type=' + type + '&from=' + FromDate + '&to=' + ToDate
    }

    console.log(from)
    console.log(url)
    fetch(url)
      .then(item => item.json())
      .then(data => {
        setLoading(false)
        try {
          if (data[0].success && data[0].success == 'false') {
            setLoading(false)
            console.log('error could beeeeeeee======');
            setData([])
          } else {
            setData(data)
            console.log('see this');
          }
        } catch (e) {
          console.log(e)
        }

      })
    // .then(()=>{
    //   // setRefreshing(false)
    // })
  }

  // const onRefresh = React.useCallback(async () => { 
  //    get_Data()
  // })


  React.useEffect(() => {
    if (!!Data && Data.length > 0) {
      if (!!Data[0].success) {
        return
      }

        let total = 0
        let total_t = 0
        let loss = 0
        Data.map(item => {
          if (item.profit > 0) {
            total = total + parseFloat(item.profit)
          }
          if (item.loss != 0) {
            loss = loss + parseFloat(item.loss)
          }
          total_t = total_t + parseFloat(item.profit_cnt)


        })
        setProfit(total)
        setLoss(loss)
        setProfit_cnt(total_t)
      
    }



    return () => {

    }
  }, [Data])


  const profit_cal = () => {
    let total = 0
    
    Data.map(item => {
      if (item.profit > 0) {
        total = total + parseFloat(item.profit)
      }

    })

    return total.toFixed(2)
  }
  const profit_cal_t = () => {
    let total = 0
    Data && Data.map(item => {
      total = total + parseInt(item.profit_cnt)

    })
    setProfit_cnt(total)
    return total
  }
  const loss_cal_t = () => {
    let total = 0
    Data.map(item => {

      total = total + parseInt(item.loss_cnt)


    })
    setLoss_cnt(total)
    return total
  }
  const loss_cal = () => {
    let total = 0
    Data.map(item => {
      if (item.loss != 0) {
        total = total + parseFloat(item.loss)
      }
    })

    return total && (total).toFixed(2)
  }

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
        // setSavedImagePath(uri);
        // setImageURI(uri);
        console.log(uri)

        RNFS.readFile(uri, 'base64').then((res) => {
          let urlString = 'data:image/jpeg;base64,' + res;
          let options = {
            title: 'Profit',
            message: msg,
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
      }} >
        <LottieView source={require('../assets/loading.json')}
          style={{ width: 300, height: 300, alignSelf: 'center' }} autoPlay loop /></View>
      :

      <View style={[styles.container, { paddingTop: 45 }]}>
        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row' }}>
            <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.goBack()}>
              <IonIcons name="arrow-back-outline" size={28} color={colors.selected} />
            </TouchableOpacity>
            <Text style={{ fontFamily: global.appFontM, fontSize: 22, color: colors.profitcolor2, marginLeft: 50 }}>PAIRWISE PROFIT</Text>
          </View>
         
        </View>
        <Animatable.View
          animation="fadeIn"
          style={styles.footer}>


<View style={{
            flexDirection: 'column', justifyContent: 'space-between',alignItems: 'center', marginBottom: 10,backgroundColor:colors.appBlack,height:120,top:20,width:'90%',left:20,borderRadius:10
          }}>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:colors.profitcolor2,width:'75%',padding:20,borderBottomEndRadius:10,borderBottomStartRadius:10}}>
            <Text style={{
                color: colors.appBlack, textAlign: 'left', textTransform: 'uppercase',
                fontFamily: global.appFontM, marginLeft: 10, fontSize: 17,
              }}>
                {global.NAME}<Text style={{ fontFamily: global.appFontM, color: colors.appBlack }}> ({global.uid})</Text>
              </Text>
              </View>
              <View style={{
              flexDirection: 'row', alignItems: 'center', alignSelf: 'center',bottom:10
              ,
            }}>
              <TouchableOpacity onPress={() => { takeScreenShot() }} activeOpacity={0.8} style={{ marginRight: 10 }}>
                <IonIcons name="share-social" size={24} color={'#fff'} />

              </TouchableOpacity>
              <TouchableOpacity onPress={() => { setDType('from'), setOpen(true) }}>
                <Feather
                  name={'filter'}
                  onPress={() => {
                    setDateModal(true);
                  }}
                  size={24}
                  style={{
                    color: colors.selected,
                    borderRadius: 5,
                    width: 35,
                  }}
                />
              </TouchableOpacity>

            </View>

          </View>
          <View style={{
            flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20,
            paddingTop: 10, alignItems: 'center', marginBottom: 10
          }}>




          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10, width: '100%' }}>
            <TouchableOpacity onPress={() => { setType('daily') }}>
              <Text style={{
                color: type === 'daily' ? colors.profitcolor2 : '#fff', borderBottomWidth: type == 'daily' ? 2 : 0,
                borderBottomColor: colors.profitcolor2, fontFamily: global.appFontM,
                backgroundColor: type === 'daily' ? 'transparent' : null, paddingHorizontal: 15, paddingVertical: 5,
              }}>{type === 'daily' ? 'DAILY' : 'D'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setType('yesterday') }}>
              <Text style={{
                color: type === 'yesterday' ? colors.profitcolor2 : '#fff', borderBottomWidth: type == 'yesterday' ? 2 : 0,
                borderBottomColor: colors.profitcolor2, fontFamily: global.appFontM,
                backgroundColor: type === 'yesterday' ? 'transparent' : null, paddingHorizontal: 15, paddingVertical: 5,
              }}>{type === 'yesterday' ? 'YESTERDAY' : 'Y'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setType('weekly') }}>
              <Text style={{
                color: type === 'weekly' ? colors.profitcolor2 : '#fff', borderBottomWidth: type == 'weekly' ? 2 : 0,
                borderBottomColor: colors.profitcolor2, fontFamily: global.appFontM,
                backgroundColor: type === 'weekly' ? 'transparent' : null, paddingHorizontal: 15, paddingVertical: 5,
              }}>{type === 'weekly' ? 'WEEKLY' : 'W'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setType('monthly') }}>
              <Text style={{
                color: type === 'monthly' ? colors.profitcolor2 : '#fff', borderBottomWidth: type == 'monthly' ? 2 : 0,
                borderBottomColor: colors.profitcolor2, fontFamily: global.appFontM,
                backgroundColor: type === 'monthly' ? 'transparent' : null, paddingHorizontal: 15, paddingVertical: 5,
              }}>{type === 'monthly' ? 'MONTHLY' : 'M'}</Text>
            </TouchableOpacity>
          </View>

          <View 
          
          style={{width:250,height:60,marginLeft:80,backgroundColor:colors.appBlack,borderRadius:10,justifyContent:'center',alignSelf:'flex-start'}}>

            
              <Text style={{ color: colors.selected, fontSize: 16, textAlign: 'center', fontFamily: global.appFontM }} >
                NET PNL  : {Data.length > 0 ? <Text style={{
                  color:colors.selected,fontFamily:global.appFontM
                    // ((isNaN(parseFloat(profit)) || isNaN(parseFloat(loss))) ? 0 : (parseFloat(profit) + parseFloat(loss))) > 0 ? colors.profitcolor : colors.losscolor
                }}>{parseFloat((isNaN(parseFloat(profit)) || isNaN(parseFloat(loss))) ? '0' : (parseFloat(profit) + parseFloat(loss))).toFixed(2)} $</Text> : null}
              </Text>


            

          </View>
            <View style={{flexDirection: 'row',height:40,backgroundColor:colors.appGray,borderBottomEndRadius:10,borderBottomStartRadius:10,width:200,justifyContent:'center',left:10,alignItems: 'center',alignSelf:'center'}}>
              <Text style={{ color: colors.selected, fontSize: 16, textAlign: 'center', fontFamily: global.appFontM }} >
                TRADES  : {Data.length > 0 ? <Text style={{ color: colors.selected,fontFamily:global.appFontM }}>{isNaN(parseFloat(profit_cnt)) ? '0' : profit_cnt}</Text> : null}
              </Text>
            </View>



          {Data.length <= 0 ?
            <Text style={{
              color: colors.selected, fontSize: 18, marginTop: '15%', textAlign: 'center',
              fontFamily: global.appFontM
            }} >
              No Data to Display !
            </Text>
            :
            <FlatList
              horizontal={false}
              // refreshControl={
              //   <RefreshControl
              //     refreshing={refreshing}
              //     onRefresh={onRefresh}
              //   />
              // }
              data={!!Data && Data.sort((a, b) => parseFloat(a.profit) < parseFloat(b.profit))}
              initialNumToRender={10}
              // extraData={Data}
              removeClippedSubviews={true}
              keyExtractor={(item, index) => index}
              renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => { navigation.navigate('OrderHistory', { sym: item.pair, from: 'tradereview' }) }} 
                style={{
                  flexDirection: 'column', width: '96%', alignSelf: 'center', 
                   marginVertical: 10,
                }}

                >
                  <ImageBackground source={require('../assets/Aeon/rewardlist.png')}
                  resizeMode={'stretch'}
                   style={{ flexDirection: 'row', justifyContent: 'space-between',height:90, alignItems: 'center',paddingHorizontal:10 }} activeOpacity={0.9}>
                    <View style={{ flexDirection: 'row', width: '35%' }}>
                      <Image
                        source={{ uri: 'https://' + item.img }}
                        resizeMode={'stretch'}
                        style={{ width: 32, height: 32, marginRight: 10, alignSelf: 'center' }}
                      />
                      <View style={{ flexDirection: 'column' }}>

                        <Text style={{ color: colors.selected, fontFamily: global.appFontB, fontSize: 16, textAlign: 'left' }} >
                          {item.pair}
                        </Text>


                      </View>
                    </View>



                    <View style={{ flexDirection: 'column', width: '60%', }}>

                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                       paddingHorizontal: 15 }}>
                        <Text style={{ color: colors.profitcolor2, fontSize: 14, textAlign: 'center',
                         fontFamily: global.appFontM,marginBottom:5 }} >
                          NET PNL
                        </Text>
                        <Text style={{
                          color: ((isNaN(parseFloat(item.profit)) || isNaN(parseFloat(item.loss))) ? 0 :
                            (parseFloat(item.profit) + parseFloat(item.loss))) > 0 ? colors.profitcolor2 : colors.losscolor
                          , fontSize: 14, textAlign: 'center',fontFamily:global.appFontM,marginBottom:5,
                        }}>
                          {parseFloat((isNaN(parseFloat(item.profit)) || isNaN(parseFloat(item.loss))) ? '0' : (parseFloat(item.profit) + parseFloat(item.loss))).toFixed(2)} $</Text>


                      </View>

                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' ,}}>
                        <Text style={{ color: colors.selected,fontFamily:global.appFontM, fontSize: 11, textAlign: 'center', paddingHorizontal: 10 }} >
                          PROFIT TRADES
                        </Text>
                        
                          <Text style={{ color: colors.appGray, fontFamily: global.appFontM ,fontSize:12,marginRight:5}}>{isNaN(parseFloat(item.profit_cnt)) ? '0' : parseFloat(item.profit_cnt)} TRADES</Text> 
                        


                      </View>
                    </View>

                  </ImageBackground>

                </TouchableOpacity>


              )}
            />
          }
          <View>

          </View>
        </Animatable.View>
        <Modal
          onBackButtonPress={() => setDateModal(false)}
          statusBarTranslucent={true}
          deviceHeight={1000}
          onBackdropPress={() => setDateModal(false)}
          isVisible={dateModal}
          useNativeDriver={true}

        >
          <View
            style={{
              width: 360,
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: colors.selected,
              alignSelf: 'center',
              borderRadius: 10,
              alignItems: 'flex-start',
              padding: 15,
              zIndex: 9999,
            }}>
            <TouchableOpacity onPress={() => { setDType('from'), setOpen(true) }}
              style={{
                flexDirection: 'row', justifyContent: 'space-around',
                width: '100%', marginBottom: 20
              }}>
              <Text style={[styles1.heading, { color: colors.appBlue, fontSize: 16, textAlignVertical: 'center', fontFamily:global.appFontM, flex: 0.2 }]}>FROM  </Text>
              <Text style={[styles1.heading, { color: colors.appBlue, fontSize: 16, textAlignVertical: 'center', fontFamily:global.appFontM, flex: 0.2 }]}>:</Text>
              <Text style={[styles1.heading, { color: colors.appGray, fontSize: 15, textAlignVertical: 'center', fontFamily:global.appFontM, flex: 0.6 }]}>{fromDate ? fromDate.toString().split('GMT')[0] : 'SELECT'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setDType('to'), setOpen(true) }} style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', }}>
              <Text style={[styles1.heading, { color: colors.appBlue, fontSize: 16, textAlignVertical: 'center', fontFamily:global.appFontM, flex: 0.2 }]}>TO  </Text>
              <Text style={[styles1.heading, { color: colors.appBlue, fontSize: 16, textAlignVertical: 'center', fontFamily:global.appFontM, flex: 0.2 }]}>:</Text>
              <Text style={[styles1.heading, { color: colors.appGray, fontSize: 15, textAlignVertical: 'center', fontFamily:global.appFontM, flex: 0.6 }]}>{toDate ? toDate.toString().split('GMT')[0] : 'SELECT'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { get_Data(), setDateModal(false) }}
              style={{ backgroundColor: colors.appGray, padding: 5, paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center', marginTop: 20, alignSelf: 'center', borderRadius: 5 }}>
              <Text style={{ color: '#fff',fontFamily:global.appFontM }}>SUBMIT</Text>
            </TouchableOpacity>
          </View>

        </Modal>

        <DatePicker
          modal
          open={open}
          date={date}
          mode={'date'}
          onConfirm={(date) => {
            let today = new Date()
            let fromDate;
            let toDate;

            if (dType == 'from') {
              fromDate = new Date(date)
              if (fromDate > today) {
                setFromDate(today)
              } else {
                setFromDate(date)
              }
            } else {
              toDate = new Date(date)
              if (toDate > today) {
                setToDate(today)
              } else {
                setToDate(date)
              }
            }
            setOpen(false)
          }}
          onCancel={() => {
            setOpen(false)
          }}
        />

      </View >

  )

}


export default CoinProfitScreen;

const styles1 = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#0B1725',
  },
  userType: {
    width: 320,

    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    shadowColor: 'black',
    marginTop: 10,
    flexDirection: 'row',
  },
  Rate: {
    color: '#ffff',
    fontSize: 14,
    fontFamily: global.bold,

  },
  textInput: {
    marginLeft: 15,
    marginTop: -15,
    paddingBottom: -10,
  },
  text_header: {
    color: '#f8f8f8f8',
    fontFamily: global.bold,
    fontSize: 17,
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //   borderBottomWidth: 0.5,
    //   borderBottomColor: '#80808080',

    paddingHorizontal: 8,
    paddingVertical: 15,
  },
  text_footer: {
    color: '#b9b9b9b9',
    fontWeight: '400',
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
  Title: {
    fontSize: 13,
    fontFamily: global.bold,
    color: '#d5d5d5d5',
  },
  textSign: {
    fontSize: 18,
    fontFamily: global.bold,
    color: '#fff',
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
    borderRadius: 4,
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

    backgroundColor: '#fff',
  },
  text_card: {
    fontSize: 14,
    fontFamily: global.bold,
  },
});
