/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import {
  View,
  Text,
  Button,
  Dimensions,
  RefreshControl,
  TouchableOpacity,
  BackHandler,
  StyleSheet,
  Image,
  StatusBar,
  FlatList,
  ActivityIndicator,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import {
  ThemeProvider,
  useFocusEffect,
  useIsFocused,
  useTheme,
  useLinkTo,
} from '@react-navigation/native';
import {Appbar, Paragraph} from 'react-native-paper';
import IonIcons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import global from '../component/global';
import styles from '../component/styles';
import {jsonContext} from '../context/GlobalState';

const HisScreen = ({navigation, route}) => {
  const from = route.params?.from;
  const {hedge} = React.useContext(jsonContext);
  const linkTo = useLinkTo();
  const {colors} = useTheme();
  const theme = useTheme();
  const [Data, setData] = React.useState('');
  const [Uid, setUid] = React.useState('');
  const [MinVal, setMinVal] = React.useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const [Clicked, setClicked] = React.useState('');
  const [chk_click, setChk_click] = React.useState(false);
  const [SortName, setSortName] = React.useState('');
  const [BuyTotal, setBuyTotal] = React.useState('0');
  const sym = route.params?.sym;
  const [Loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    async() => {
      let uid;
      try {
        uid = await AsyncStorage.getItem('user_id');
        setUid(uid);
        callApi(uid);
      } catch (e) {
        console.log(e);
      }
    }
    
    // console.log('user token:', userToken);
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    callApi(Uid);
  });

  function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =
      date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
  }

  const DateChange = time => {
    let tm = parseFloat(time);
    let t = new Date(tm);
    var hours = t.getHours();
    var minutes = t.getMinutes();
    var newformat = t.getHours() >= 12 ? 'PM' : 'AM';

    // Find current hour in AM-PM Format
    hours = hours % 12;

    // To display "0" as "12"
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var formatted =
      t.toString().split(' ')[0] +
      ', ' +
      ('0' + t.getDate()).slice(-2) +
      '/' +
      ('0' + (t.getMonth() + 1)).slice(-2) +
      '/' +
      t.getFullYear() +
      ' - ' +
      ('0' + t.getHours()).slice(-2) +
      ':' +
      ('0' + t.getMinutes()).slice(-2) +
      ' ' +
      newformat;

    return formatted;
  };

  async function callApi(uid) {
    let mode = hedge ? 'hedge' : 'normal';
    let token = await AsyncStorage.getItem('token');
    let url;
    url =
      global.BASE_URL +
      'css_mob/trade_history.aspx?uid=' +
      uid +
      '&pair=' +
      sym +
      '&mode=' +
      mode +
      '&token=' +
      token;
    if (from == 'order') {
      url =
        global.BASE_URL +
        'css_mob/order_history.aspx?uid=' +
        uid +
        '&pair=' +
        sym +
        '&mode=' +
        mode +
        '&token=' +
        token;
    }
    console.log(url);
    fetch(url)
      .then(item => item.json())
      .then(dta => {
        // console.log(dta)
        setData(dta);

        setSortName(
          dta.sort((a, b) => parseFloat(a.time) < parseFloat(b.time)),
        );
      });
    setLoading(false);
    setRefreshing(false);
  }

  return Loading ? (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: colors.background,
      }}>
      <LottieView
        source={require('../assets/loading.json')}
        style={{width: 300, height: 200, alignSelf: 'center'}}
        autoPlay
        loop
      />
    </View>
  ) : (
    <ImageBackground source={global.bgimg}  resizeMode={'stretch'} style={[styles1.container, {}]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          paddingVertical: 5,
          marginBottom: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '80%',
            paddingLeft: 20,
          }}>
          <Text style={[styles.heading, {color: colors.hgl}]}>History</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '30%',
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{padding: 10}}>
            <Text style={{textAlign: 'right'}}>
              <IonIcons name="md-arrow-back" size={22} color={colors.hgl} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        horizontal={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={SortName}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
         from=='trade'?
          <View
            style={{
              marginVertical: 5,
              width: '95%',
              alignSelf: 'center',
              borderRadius: 5,
              borderBottomWidth: 0.1,
              borderBottomColor: colors.appGrey,
              backgroundColor: 'transparent',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              paddingVertical: 5,
              paddingHorizontal: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: 150,
                }}>
                <Text
                  style={{
                    color: colors.selected,
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>
                  {item.symbol}
                </Text>
              </View>
              <Text style={{color: colors.appGrey,}}>
                {DateChange(item.time)}{' '}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                marginVertical: 10,
              }}>
              <Text style={{color: colors.selected,}}>
                {' '}
                <Text
                  style={{
                    fontSize: 15,
                    color:
                      item.side == 'BUY'
                        ? colors.profitcolor
                        : colors.losscolor,
                  }}>
                  {item.side}
                </Text>{' '}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginVertical: 5,
                }}>
                <Text style={{color: colors.appGrey}}>
                  Price :{' '}
                </Text>
                <Text style={{color: colors.selected}}>
                  {' '}
                  {item.price}{' '}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{color: colors.appGrey}}>Filled (USD) : </Text>
                <Text style={{color: colors.selected}}> {item.quoteQty} </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{color: colors.appGrey}}>Fee (USD) : </Text>
                <Text style={{color: colors.selected}}>
                  {' '}
                  {item.commission}{' '}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{color: colors.appGrey}}>
                  Realized PNL (USD) :{' '}
                </Text>
                <Text style={{color: colors.selected}}>
                  {' '}
                  {item.realizedPnl}{' '}
                </Text>
              </View>
            </View>
          </View>
          :      
          <View
            style={{
              marginVertical: 5,
              width: '95%',
              alignSelf: 'center',
              borderRadius: 5,
              borderBottomWidth: 0.1,
              borderBottomColor: colors.appGrey,
              backgroundColor: 'transparent',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              paddingVertical: 5,
              paddingHorizontal: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: 150,
                }}>
                <Text
                  style={{
                    color: colors.selected,
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>
                  {item.symbol} 
                </Text>
              </View>
              <Text style={{color: colors.appGrey, fontSize: 12}}>
                {DateChange(item.time)}{' '}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                marginVertical: 10,
              }}>
             
            </View>

            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginVertical: 5,
                }}>
                <Text style={{color:item.side=='BUY'?colors.profitcolor:colors.losscolor, }}>
                  {item.origType}  /  {item.positionSide=='BOTH'?null:item.reduceOnly.toString()=='true'?'Close':'Open'} {item.positionSide=='BOTH'?item.side:item.positionSide}
                </Text>
                <Text style={{color:item.status=='FILLED'?colors.profitcolor:colors.losscolor, }}>
                  {' '}
                  {item.status}{' '}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginVertical: 5,
                }}>
                <Text style={{color: colors.appGrey,}}>
                  Amount :{' '}( USDT )
                </Text>
                <Text style={{color: colors.selected,}}>
                  {' '}
                  {item.cumQuote}{' '}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginVertical: 5,
                }}>
                <Text style={{color: colors.appGrey}}>
                  Price :{' '}
                </Text>
                <Text style={{color: colors.selected}}>
                  {' '}
                  {item.avgPrice}{' '}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{color: colors.appGrey}}>Reduce Only : </Text>
                <Text style={{color: colors.selected}}> {(item.reduceOnly)?.toString().toUpperCase()}</Text>
              </View>             

              {global.demo=='true'?<View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center', marginVertical: 5,
                }}>
                <Text style={{color: colors.appGrey}}>OrderID : </Text>
                <Text style={{color: colors.selected}}> {(item.clientOrderId)}</Text>
              </View>  :null}           
             
            </View>
          </View>      
        )}
      />
    </ImageBackground>
  );
};

export default HisScreen;
const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1725',
    paddingTop: 40,
  },
  textInput: {
    marginLeft: 15,
    marginTop: -15,
    paddingBottom: -10,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomWidth: 0.5,
    borderBottomColor: '#808080',
    marginTop: 15,
  },
  text_Price: {
    color: '#13B34F',
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
    textAlign: 'left',
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
    fontWeight: 'bold',
  },
});
