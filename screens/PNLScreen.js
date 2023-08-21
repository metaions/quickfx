/* eslint-disable prettier/prettier */
import * as React from 'react';
import {ThemeProvider} from '@react-navigation/native';
import {
  View,
  Text,
  Button,
  Dimensions,
  Switch,
  TouchableOpacity,
  Linking,
  StyleSheet,
  RefreshControl,
  Image,
  StatusBar,
  FlatList,
  ScrollView,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
  ImageBackground,BackHandler
} from 'react-native';
// import { Avatar, Card, Title, Paragraph, Divider } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import {useFocusEffect, useIsFocused, useTheme} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../component/context';
import global from '../component/global';
import {ProgressBar} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import theme from '../component/theme';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import RBSheet from 'react-native-raw-bottom-sheet';
import styles from '../component/styles';
import {captureScreen} from 'react-native-view-shot';
var RNFS = require('react-native-fs');
import Share from 'react-native-share';
import {getDisplay} from 'react-native-device-info';
import { jsonContext } from '../context/GlobalState';
const PNLScreen = ({navigation}) => {
  const{UID} = React.useContext(jsonContext) 
  const {colors} = useTheme();
  const theme = useTheme();
  const refRBSheet1 = React.useRef();
  // const [Uid, setUid] = React.useState(global.uid);
  const [Loading, setLoading] = React.useState(true);
  const [ShowSS, setShowSS] = React.useState(true);
  const [currency, setCurrency] = React.useState('');
  const [Revenue_data, setRevenue_data] = React.useState('');
  const [both, setBoth] = React.useState(); 
  const [demo, setDemo] = React.useState(); 
  const [live, setLive] = React.useState(); 
  const [Bal, setBal] = React.useState('');
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = React.useState(false);
  const [RevDet, setRevDet] = React.useState(false);
  const [Det, setDet] = React.useState(false);
  const [TP, setTP] = React.useState('0');
  const [Ti, setTi] = React.useState('');
  const [CP, setCP] = React.useState('0');
  const [Ci, setCi] = React.useState('');
  const [DT, setDT] = React.useState('');
  const [status, setStatus] = React.useState('both');
  const [imageURI, setImageURI] = React.useState('');
  const [savedImagePath, setSavedImagePath] = React.useState('');

  const {toggleTheme} = React.useContext(AuthContext);
  const {signOut} = React.useContext(AuthContext);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const {App_Lock} = React.useContext(AuthContext);
  const [isModalVisible1, setModalVisible1] = React.useState(false);

  React.useEffect(() => {
    const backAction = () => {
      if(Det){
      setDet(false)
    }
    else{
      navigation.goBack()
      // return true
    }
    return true
    
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [Det]);
  React.useEffect(() => {
    console.log('getId usefocuseffect=====');
    getId();
  
  }, [status])
    
  const getId = async () => {
    
    console.log('getId=====');
    

 
    try {
      callApi(UID);

      setRefreshing(false);
    } catch (e) {
      console.log(e);
    }
  };
  const callApi = uid => {
    console.log('call api=====');
    // if(status=='live'&&live!==undefined){
    //   setRevenue_data(live)
    //   setTP(live.today_profit);
    //   setCP(live.total_profit);
    //   setTi(live.today_investment);
    //   setCi(live.total_investment);
    //   console.log('live called')
    //   return
    // }else if(status=='demo'&&demo!==undefined){
    //   setRevenue_data(demo)
    //   setTP(demo.today_profit);
    //   setCP(demo.total_profit);
    //   setTi(demo.today_investment);
    //   setCi(demo.total_investment);
    //   console.log('demo called')
    //   return
    // }else if(status=='both'&&both!==undefined){
    //   setRevenue_data(both)
    //   setTP(both.today_profit);
    //   setCP(both.total_profit);
    //   setTi(both.today_investment);
    //   setCi(both.total_investment);
    //   console.log('both called')
    //   return
    // }
    let url = global.BASE_URL + 'css_mob/revenue.aspx?uid=' + UID + '&ttype=R'+'&mode='+status;
    console.log(url);
    fetch(url)
      .then(item => item.json())
      .then(dta => {        
        setRevenue_data(dta[0].data);
        if(status=='live'){
          setLive(dta[0].data)
        }else if(status=='demo'){
          setDemo(dta[0].data)
        }else if(status=='both'){        
          setBoth(dta[0].data)
        }
        setTP(dta[0].today_profit);
        setCP(dta[0].total_profit);
        setTi(dta[0].today_investment);
        setCi(dta[0].total_investment);
      });

    setLoading(false);
  };

  const rev_det = date => {
    setLoading(true);
    let url =
    global.BASE_URL +
    'css_mob/revenue_details.aspx?uid=' +
    UID +'&mode='+status + 
    '&day=' +
    date;
  console.log(
    url
  );
    console.log(
    url
    );
    fetch(url)
      .then(item => item.json())
      .then(dta => {
        console.log(JSON.stringify(dta));
        setRevDet(dta);
        if (dta.length > 0) {
          setDT(dta[0].date);
        }
        setLoading(false);
      });
  };

  const takeScreenShot = () => {
    // To capture Screenshot
    captureScreen({
      // Either png or jpg (or webm Android Only), Defaults: png
      format: 'jpg',
      // Quality 0.0 - 1.0 (only available for jpg)
      quality: 0.8,
    }).then(
      //callback function to get the result URL of the screnshot
      uri => {
        setSavedImagePath(uri);
        setImageURI(uri);
        console.log(uri);

        RNFS.readFile(uri, 'base64').then(res => {
          let urlString = 'data:image/jpeg;base64,' + res;
          let options = {
            title: 'Profit',
            message: 'My Profit',
            url: urlString,
            type: 'image/jpeg',
          };
          Share.open(options)
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              err && console.log(err);
            });
        });
      },
      error => console.error('Oops, Something Went Wrong', error),
    );
  };

  return Loading ? (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: theme.bg,
      }}>
      <LottieView
        source={require('../assets/loading.json')}
        style={{width: 300, height: 200, alignSelf: 'center'}}
        autoPlay
        loop
      />
    </View>
  ) : !Det ? (
    <ImageBackground
    source={global.bgimg}
    resizeMode={'stretch'}   
      // animation="zoomIn"
      // delay={300}
      // iterationCount={1}
      style={styles.container}>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
        }}>
     
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            paddingTop: 35,
            paddingVertical: 5,
            width: '100%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{padding: 10}}>
              <Text style={{textAlign: 'right'}}>
                <IonIcons
                  name="chevron-back-sharp"
                  size={25}
                  color={colors.selected}
                />
              </Text>
            </TouchableOpacity>
          </View>

          <Image
            source={require('../assets/metalogo.png')}
            style={{
              width: 150,
              height: 50,
              marginBottom: 15,
              alignSelf: 'center',
            }}
            resizeMode={'stretch'}
          />

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 50,
            }}></View>
            
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-around',marginVertical:10,width:'100%'}}>
                        <TouchableOpacity onPress={()=>{setStatus('live')}}>
                            <Text style={{color:status==='live'?'#000':'#fff',fontWeight:'bold',backgroundColor:status==='live'?'#fff':null,paddingHorizontal:15,paddingVertical:5,borderRadius:5}}>{status==='live'?'LIVE':'L'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setStatus('demo')}}>
                            <Text style={{color:status==='demo'?'#000':'#fff',fontWeight:'bold',backgroundColor:status==='demo'?'#fff':null,paddingHorizontal:15,paddingVertical:5,borderRadius:5}}>{status==='demo'?'DEMO':'D'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setStatus('both')}}>
                            <Text style={{color:status==='both'?'#000':'#fff',fontWeight:'bold',backgroundColor:status==='both'?'#fff':null,paddingHorizontal:15,paddingVertical:5,borderRadius:5}}>{status==='both'?'TOTAL':'T'}</Text>
                        </TouchableOpacity>
                    </View>
        <View style={{width: '100%'}}>
            
          <ImageBackground
            source={require('../assets/botz/top-income-box.png')}
            resizeMode={'stretch'}
            style={{width: '100%',  paddingVertical: 5}}>
            <View style={{flexDirection: 'row', width: '100%'}}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '50%',
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    width: 180,
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../assets/sidebar/icon8.png')}
                    resizeMode={'stretch'}
                    style={{
                      width: 30,
                      height: 30,
                      marginVertical:5
                    }}
                  />
                  <Text
                    allowFontScaling={false}
                    style={[
                      {
                        textAlign: 'center',
                        fontSize: 12,
                        color: colors.selected,
                      },
                    ]}>
                    {"Today's Profit( USD )".toUpperCase()}
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.sheading,
                      {textAlign: 'left', fontSize: 17, color: colors.selected},
                    ]}>
                    {isNaN(TP) ? '' : parseFloat(TP).toFixed(2)}
                  </Text>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    {isNaN(TP)?null:<Text
                      style={[
                        {
                          textAlign: 'left',
                          fontSize: 15,
                          color: colors.selected,
                          fontWeight: 'normal',
                        },
                      ]}
                      allowFontScaling={false}>
                      {' '}
                      = {(parseFloat(TP) * global.cur_value).toFixed(2)}{' '}
                      {global.cur_name}
                    </Text>}
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '50%',
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    width: 180,
                    paddingTop: 5,
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../assets/botz/profit/trophy.png')}
                    resizeMode={'stretch'}
                    style={{width: 30, height: 26}}
                  />
                  <Text
                    style={[
                      {
                        textAlignVertical: 'center',
                        textAlign: 'left',
                        fontSize: 12,
                        color: colors.selected,
                        marginTop: 5,
                      },
                    ]}
                    allowFontScaling={false}>
                    {'Cumulative profit (USD)'.toUpperCase()}{' '}
                  </Text>
                  <Text
                    style={[
                      styles.sheading,
                      {textAlign: 'left', fontSize: 20, color: colors.selected},
                    ]}
                    allowFontScaling={false}>
                    {isNaN(CP)?'':parseFloat(CP).toFixed(2)}
                  </Text>
                  {isNaN(CP)?null:<Text
                    style={[
                      {
                        textAlign: 'left',
                        fontSize: 15,
                        color: colors.selected,
                        fontWeight: 'normal',
                      },
                    ]}
                    allowFontScaling={false}>
                    = {(parseFloat(CP) * global.cur_value).toFixed(2)}{' '}
                    {global.cur_name}
                  </Text>}
                </View>
              </View>
            </View>
          </ImageBackground>
          <ImageBackground
            source={require('../assets/botz/total-bg.png')}
            resizeMode={'stretch'}
            style={{width: '100%', marginTop: 10, paddingVertical: 5}}>
            <View style={{flexDirection: 'row', width: '100%'}}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '50%',
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    width: 180,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={[
                      {
                        textAlign: 'center',
                        fontSize: 12,
                        color: colors.selected,
                        marginTop: 10,
                        fontWeight: 'bold',
                      },
                    ]}
                    allowFontScaling={false}>
                    {'Total Investment(USD)'.toUpperCase()}
                  </Text>
                  <Text
                    style={[
                      styles.sheading,
                      {textAlign: 'left', fontSize: 20, color: colors.binanceylw2},
                    ]}
                    allowFontScaling={false}>
                    {isNaN(Ti)?'':parseFloat(Ti).toFixed(2)}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '50%',
                }}>
                <Text
                  style={[
                    {
                      textAlignVertical: 'center',
                      textAlign: 'center',
                      fontSize: 12,
                      color: colors.selected,
                      marginTop: 10,
                      fontWeight: 'bold',
                    },
                  ]}
                  allowFontScaling={false}>
                  {'Avg Return Percentage %\n(last 7 days)'.toUpperCase()}
                </Text>
                <Text
                  style={[
                    styles.sheading,
                    {textAlign: 'left', fontSize: 20, color: colors.binanceylw2},
                  ]}
                  allowFontScaling={false}>
                  {(
                    (parseFloat(TP) / parseFloat(Ti) > 0 ? parseFloat(Ci) : 0) *
                    100
                  ).toFixed(2)}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
      <View style={{width: '80%', alignSelf: 'center',display:ShowSS?'flex':'none'}}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
              setShowSS(false)
              setTimeout(() => {
                  takeScreenShot();
              },1000)
              setTimeout(()=>{setShowSS(true)},2500)
          }}>
          <ImageBackground
            source={require('../assets/botz/box-bgapi.png')}
            style={{width: 300,alignSelf: 'center', height: 60,flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center', resizeMode: 'stretch'}}
          >
            <Image
            source={require('../assets/botz/camera-icon.png')}
            style={{width: 25,height: 25, resizeMode: 'stretch',alignSelf: 'flex-start',margin:18,marginLeft:22 }}
          />
          <Text style={{color:colors.binanceylw,fontSize:18}}>Take ScreenShot</Text>
         </ImageBackground>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal={false}
        removeClippedSubviews={false}
        data={Revenue_data}
        style={{marginBottom: 10, width: '100%'}}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => {
              setDet(true), rev_det(item.date);
            }}>
            {/* <View style={{marginHorizontal: 10, marginTop: 10}}> */}
              <ImageBackground
                resizeMode={'stretch'}
               
                source={require('../assets/botz/list-box-bg.png')}
                // source={require('../assets/botz/cardProfit.png')}
                style={{                  
                  width: '98%',     height:150  ,margin:5          
                  // backgroundColor: 'transparent',
                }}>
               
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',                                        
                    alignSelf: 'center',                    
                    marginTop: 5,
                  }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      width: '45%',
                    }}>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: 'bold',
                        color: colors.binanceylw2,
                        textAlign: 'center',
                        alignSelf: 'center',
                      }}
                      allowFontScaling={false}>
                      % RETURN
                    </Text>
                    <View
                      style={{
                        width: 90,                        
                        marginTop: 5,                                                
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 16,
                          fontWeight: 'bold',
                        }}
                        allowFontScaling={false}>
                        {parseFloat(item.ret).toFixed(2)} %
                      </Text>
                    </View>
                  </View>
                  <View
                  style={{                                      
                    alignSelf: 'flex-start'
                  
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: 'white',
                      alignSelf: 'center',
                    }}
                    allowFontScaling={false}>
                    DATE {' '}
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 14,
                      // backgroundColor:'#84878a',
                      paddingHorizontal:10,
                      borderRadius:10,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                    allowFontScaling={false}>
                    {item.date.toUpperCase()}
                  </Text>
                </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      width: '45%',
                    }}>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: 'bold',
                        color: colors.binanceylw2,
                        textAlign: 'center',
                        alignSelf: 'center',
                      }}
                      allowFontScaling={false}>
                      FUND
                    </Text>
                    <View
                      style={{
                        width: 90,                                                                        
                        marginTop: 0,
                        alignItems: 'center',
                        
                      }}>
                      <Text
                        style={{
                          color: colors.selected,
                          fontSize: 18,
                          fontWeight: 'bold',
                          textAlign: 'center',
                        }}
                        allowFontScaling={false}>
                        {parseFloat(item.amount).toFixed(2)}
                        {'\n'}
                        <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                          USDT
                        </Text>
                      </Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '94%',                    
                    alignSelf: 'center',                    
                    marginTop: 20,
                  }}>
                  {/* <View style={{justifyContent: 'space-between',flexDirection:'row',alignItems:'center',
                        width:'98%',alignSelf: 'center',height:40}}> */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '45%',
                      marginVertical:10,
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{fontSize: 12, fontWeight: 'bold', color: 'white'}}
                      allowFontScaling={false}>
                      PROFIT
                    </Text>
                    <Text
                      style={{
                        color: '#00a65a',
                        fontSize: 14,
                        textAlign: 'center',
                        fontWeight: 'bold',
                      }}
                      allowFontScaling={false}>
                      {' '}
                      {parseFloat(item.profit).toFixed(2)} USDT
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '45%',
                      marginLeft: '5%',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{fontSize: 12, fontWeight: 'bold', color: 'white'}}
                      allowFontScaling={false}>
                      LOSS
                    </Text>
                    <Text
                      style={{
                        color: '#ff0000',
                        fontSize: 14,
                        textAlign: 'center',
                        fontWeight: 'bold',
                      }}
                      allowFontScaling={false}>
                      {' '}
                      {parseFloat(item.loss).toFixed(2)} USDT
                    </Text>
                  </View>

                  {/* </View> */}
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    marginBottom:10,
                    alignSelf: 'center',
                  
                  }}>
                  {/* {parseFloat(item.profit) + parseFloat(item.loss) == 0 ? (
                    <ProgressBar
                      progress={parseFloat(item.profit) / 1}
                      color={colors.green1}
                      style={{
                        backgroundColor: colors.red1,
                        height: 5,
                        width: 350,
                        borderRadius: 10,
                      }}
                    />
                  ) : (
                    <ProgressBar
                      progress={
                        parseFloat(item.profit) /
                        (parseFloat(item.profit) + parseFloat(item.loss) * -1)
                      }
                      color={colors.green1}
                      style={{
                        backgroundColor: colors.red1,
                        height: 5,
                        width: 350,
                        borderRadius: 10,
                      }}
                    />
                  )} */}
                </View>               
              </ImageBackground>
            {/* </View> */}
          </TouchableOpacity>
        )}
      />
    </ImageBackground>
  ) : (
    <ImageBackground
    source={global.bgimg}

      style={styles.container}>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',flex:0.5
        }}>
        <View
          // colors={[ global.grad3,global.grad4]}
          style={{
            width: '100%',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            paddingTop: 40,
          }}
          // start={{ x: 0, y: 1 }}
          // end={{ x: 1, y: 1 }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 15,
              paddingVertical: 5,
              width: '100%',
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                onPress={() => setDet(false)}
                style={{padding: 10}}>
                <Text style={{textAlign: 'right'}}>
                  <IonIcons
                    name="chevron-back-sharp"
                    size={25}
                    color={colors.selected}
                  />
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('TransactionScreen')}
              style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text
                style={[{color: colors.selected, fontSize: 22, marginTop: 0}]}>
                {DT}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
              }}>
              <Text
                style={[
                  styles.heading,
                  {color: colors.selected, fontSize: 22, marginTop: 0},
                ]}></Text>
            </View>
          </View>
          {/*  */}
          <View style={{width: '100%', paddingVertical: 30}}>
            <View
              style={{
                width: '100%',
                // backgroundColor: '#131a22',
                height: 200,
                marginTop: 50,
              }}>
              <ImageBackground
              source={require('../assets/botz/top-income-box.png')}
                style={{
                  marginLeft: 5,
                  flexDirection: 'row',
                  top: -70,
                  justifyContent: 'space-between',
                  paddingBottom:50,
                  alignItems: 'flex-start',
                  alignSelf: 'center',
                  width: '100%',
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',//alignSelf: 'flex-start',
                    width: '50%',
                  }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: 180,
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 150,
                      // borderRadius: 100,
                      // backgroundColor: '#2e3746',
                    }}>
                    <Image
                      source={require('../assets/sidebar/icon8.png')}
                      resizeMode={'stretch'}
                      style={{
                        width: 40,
                        height: 40,
                        marginTop: 12,
                        marginBottom: 10,
                      }}
                    />
                    <Text
                      allowFontScaling={false}
                      style={[
                        {
                          textAlign: 'center',
                          fontSize: 12,
                          color: colors.selected,
                        },
                      ]}>
                      {"Today's Profit( USD )".toUpperCase()}
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={[
                        styles.sheading,
                        {
                          textAlign: 'left',
                          fontSize: 20,
                          color: colors.selected,
                        },
                      ]}>
                      {parseFloat(TP) == NaN ? '' : parseFloat(TP).toFixed(2)}
                    </Text>
                    <View
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Text
                        style={[
                          {
                            textAlign: 'left',
                            fontSize: 15,
                            color: colors.selected,
                            fontWeight: 'normal',
                          },
                        ]}
                        allowFontScaling={false}>
                        {' '}
                        = {(parseFloat(TP) * global.cur_value).toFixed(2)}{' '}
                        {global.cur_name}
                      </Text>
                    </View>
                    {/* <TouchableOpacity onPress={()=>{takeScreenShot()}}>
                        <IonIcons name="camera" size={30} color={colors.binanceylw2}  />
                   </TouchableOpacity> */}
                  </View>
                  <Text
                    style={[
                      {
                        textAlign: 'center',
                        fontSize: 12,
                        color: colors.selected,
                        marginTop: 0,
                        fontWeight: 'bold',
                      },
                    ]}
                    allowFontScaling={false}>
                    {'Total Investment(USD)'.toUpperCase()}
                  </Text>
                  <Text
                    style={[
                      styles.sheading,
                      {textAlign: 'left', fontSize: 20, color: colors.binanceylw2},
                    ]}
                    allowFontScaling={false}>
                    {parseFloat(Ti).toFixed(2)}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '50%',
                  }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: 180,
                      // backgroundColor: '#2e3746',
                      height: 140,
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../assets/botz/profit/trophy.png')}
                      resizeMode={'stretch'}
                      style={{width: 30, height: 30, marginTop: 45}}
                    />
                    <Text
                      style={[
                        {
                          textAlignVertical: 'center',
                          textAlign: 'left',
                          fontSize: 12,
                          color: colors.selected,
                          marginTop: 10,
                        },
                      ]}
                      allowFontScaling={false}>
                      {'Cumulative profit (USD)'.toUpperCase()}{' '}
                    </Text>
                    <Text
                      style={[
                        styles.sheading,
                        {
                          textAlign: 'left',
                          fontSize: 20,
                          color: colors.selected,
                        },
                      ]}
                      allowFontScaling={false}>
                      {parseFloat(CP).toFixed(2)}
                    </Text>
                    <Text
                      style={[
                        {
                          textAlign: 'left',
                          fontSize: 15,
                          color: colors.selected,
                          fontWeight: 'normal',
                        },
                      ]}
                      allowFontScaling={false}>
                      = {(parseFloat(CP) * global.cur_value).toFixed(2)}{' '}
                      {global.cur_name}
                    </Text>
                    <View style={{height: 30}}></View>
                  </View>
                  <Text
                    style={[
                      {
                        textAlignVertical: 'center',
                        textAlign: 'center',
                        fontSize: 12,
                        color: colors.selected,
                        marginTop: 10,
                        fontWeight: 'bold',
                      },
                    ]}
                    allowFontScaling={false}>
                    {'Avg Return Percentage %\n(last 7 days)'.toUpperCase()}
                  </Text>
                  <Text
                    style={[
                      styles.sheading,
                      {textAlign: 'left', fontSize: 20, color: colors.binanceylw2},
                    ]}
                    allowFontScaling={false}>
                    {(
                      (parseFloat(TP) / parseFloat(Ti) > 0
                        ? parseFloat(Ci)
                        : 0) * 100
                    ).toFixed(2)}
                  </Text>
                </View>
              </ImageBackground>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: -70,
              }}>
              <Image
                 source={require('../assets/sidebar/icon10.png')}
                style={{width: 90, height: 80}}
                resizeMode={'stretch'}
              />
            </View>
          </View>

        </View>
      </View>
      <View style={{ flex:0.5}}>
        <FlatList
          horizontal={false}
          removeClippedSubviews={false}
          // data={}
          data={RevDet}
          style={{marginBottom: 50}}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          renderItem={({item, index}) => (
            <View
              style={{
                width: '96%',
                alignSelf: 'center',
                // backgroundColor: colors.background,
                padding: 5,
              }}>
              <View style={{flexDirection: 'column', margin: 0}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{color: colors.selected, fontSize: 14, width: 235}}>
                    Date
                  </Text>
                  <Text style={{color: '#6C727E', fontSize: 13}}>
                    {item.date}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 25,
                    marginTop: 5,
                  }}>
                  <Text style={{color: '#7F8591', fontSize: 14}}>
                    Order Number
                  </Text>
                  <Text style={{color: '#DBE2EB', fontSize: 14}}>
                    {item.ordernumber}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 25,
                    marginTop: 5,
                  }}>
                  <Text style={{color: '#7F8591', fontSize: 14}}>Exchange</Text>
                  <Text style={{color: '#DBE2EB', fontSize: 14}}>Binance</Text>
                </View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 25,
                    marginTop: 5,
                  }}>
                  <Text style={{color: '#7F8591', fontSize: 14}}>
                    Sell Currency
                  </Text>
                  <Text style={{color: '#DBE2EB', fontSize: 14}}>
                    {item.pair.replace('USDT', '')}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 25,
                    marginTop: 5,
                  }}>
                  <Text style={{color: '#7F8591', fontSize: 14}}>
                    Sell Time
                  </Text>
                  <Text style={{color: '#DBE2EB', fontSize: 14}}>
                    {item.selldt.split(' ')[3]}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 25,
                    marginTop: 5,
                  }}>
                  <Text style={{color: '#7F8591', fontSize: 14}}>
                    Realized PNL(USD)
                  </Text>
                  <Text style={{color: '#DBE2EB', fontSize: 14}}>
                    {parseFloat(item.amount).toFixed(2)} USDT
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 25,
                    marginTop: 5,
                  }}>
                  <Text style={{color: '#7F8591', fontSize: 14}}>Fuel Fee</Text>
                  <Text style={{color: '#DBE2EB', fontSize: 14}}>
                    {item.fee} USDT
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#7F8591',
                    marginTop: 10,
                    marginVertical: 5,
                  }}>
                  <View
                    style={{flex: 1, height: 1, backgroundColor: '#7F8591'}}
                  />

                  <View
                    style={{flex: 1, height: 1, backgroundColor: '#7F8591'}}
                  />
                </View>
              </View>
            </View>
          
          )}
        />
      </View>
    </ImageBackground>
  );
};

export default PNLScreen;
const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
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
    height: 90,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
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
    fontWeight: 'bold',
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
    color: '#fff',
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
    marginBottom: 15,
  },
  card_box: {
    shadowOffset: {width: 20, height: 10},
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
  },
});
