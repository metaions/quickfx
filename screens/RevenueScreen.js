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
// import { styles } from 'react-native-fbsdk-next/types/FBLoginButton';

const RevenueScreen = ({navigation}) => {
  const {colors} = useTheme();
  const theme = useTheme();
  const refRBSheet1 = React.useRef();
  const [Uid, setUid] = React.useState(global.uid);
  const [Loading, setLoading] = React.useState(true);
  const [ShowSS, setShowSS] = React.useState(true);
  const [currency, setCurrency] = React.useState('');
  const [Revenue_data, setRevenue_data] = React.useState('');
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

  useFocusEffect(
    React.useCallback(() => {
      callApi();
      // setIsLoading(false);

      //we can add delay time here before callApi() i.e ' },1000,callApi());' //
    }, []),
  );
  // const getId = () => {
    
    
  //   let thm = null;
  //   let code = null;
    

  //   setUid(Uid);
  //   try {
  //     callApi(Uid);

  //     setRefreshing(false);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  const callApi = uid => {
    let url = global.BASE_URL + 'css_mob/revenue.aspx?uid=' + global.uid + '&ttype=R'+'&mode='+status;
    // let url = 'https://server2.metafuture.trade/fx_mob/revenue.aspx?uid=top&ttype=R&mode=both'
    console.log(url);
    fetch(url)
      .then(item => item.json())
      .then(dta => {        
        setRevenue_data(dta[0].data);
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
      Uid +'&mode='+status + 
      '&day=' +
      date;
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
        
      }}>
      <LottieView
        source={require('../assets/loading.json')}
        style={{width: 300, height: 200, alignSelf: 'center'}}
        autoPlay
        loop
      />
    </View>
  ) : !Det ? (
    <ImageBackground source={global.bgimg} resizeMode={'stretch'} style={[styles.container, {flex:1}]}>
    <View
      animation="zoomIn"
      delay={300}
      iterationCount={1}
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
            paddingTop: 40,
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
                  name="arrow-back"
                  size={25}
                  color={colors.appGray}
                />
              </Text>
            </TouchableOpacity>
          </View>

          <Image
            source={require('../assets/Aeon/logo.png')}
            style={{
              width: 120,
              height: 50,
              // marginBottom: 15,
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
  
        <View style={{width: '100%',paddingHorizontal:10,}}>
            
          <ImageBackground
            source={require('../assets/Aeon/profit/topbox.png')}
            resizeMode={'stretch'}
            style={{width: '100%',  paddingVertical: 5,height:100,}}>
            <View style={{flexDirection: 'row', width: '100%',}}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  width: '50%',
                  padding:5
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    width: 180,
                    
                    alignItems: 'flex-start',
                    marginLeft:10
                  }}>
                  {/* <Image
                    source={require('../assets/botz/icon1.png')}
                    resizeMode={'stretch'}
                    style={{
                      width: 30,
                      height: 26,
                      marginVertical:5
                    }}
                  /> */}
                  <Text
                    allowFontScaling={false}
                    style={[
                      {
                        fontFamily:global.appFontM,
                        fontSize: 12,
                        color: colors.selected,marginTop:5
                      },
                    ]}>
                    {"Today's Profit( USD )".toUpperCase()}
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.sheading,
                      {fontSize: 20, color: colors.selected,marginTop:7},
                    ]}>
                    ${parseFloat(TP) == NaN ? '' : parseFloat(TP).toFixed(2)}
                  </Text>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center',marginTop:12}}>
                    <Text
                      style={[
                        {
                         
                          fontSize: 14,
                          color: colors.selected,
                          fontFamily:global.appFontM,
                        },
                      ]}
                      allowFontScaling={false}>
                      {' '}
                      {(parseFloat(TP) * global.cur_value).toFixed(2)}{' '}
                      {global.cur_name}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  width: '50%',
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    width: 180,
                    paddingTop: 5,paddingLeft:12,
                    alignItems: 'flex-start',
                  }}>
                  {/* <Image
                    source={require('../assets/botz/icon2.png')}
                    resizeMode={'stretch'}
                    style={{width: 30, height: 26}}
                  /> */}
                  <Text
                    style={[
                      {
                        textAlignVertical: 'center',
                        textAlign: 'left',
                        fontSize: 12,
                        color: colors.selected,
                        fontFamily:global.appFontM,
                        marginTop: 5,
                      },
                    ]}
                    allowFontScaling={false}>
                    {'Cumulative profit (USD)'.toUpperCase()}{' '}
                  </Text>
                  <Text
                    style={[
                      styles.sheading,
                      {textAlign: 'left', fontSize: 20, color: colors.selected,marginTop:7},
                    ]}
                    allowFontScaling={false}>
                    ${parseFloat(CP).toFixed(2)}
                  </Text>
                  <Text
                    style={[
                      {
                        textAlign: 'left',
                        fontSize: 15,
                        marginTop:12,
                        color: colors.selected,
                        fontFamily:global.appFontM,
                      },
                    ]}
                    allowFontScaling={false}>
                    {(parseFloat(CP) * global.cur_value).toFixed(2)}{' '}
                    {global.cur_name}
                  </Text>
                </View>
              </View>
            </View>
          </ImageBackground>
          {/* <View
           
            style={{width: '100%', height:130,marginTop: 10, paddingVertical: 5
            }}>
             <View style={{flexDirection: 'row', width: '100%',justifyContent: 'space-between'}}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems:'center',
                  width: '49%',borderRadius:5,
                  borderColor: colors.appLightgray,borderWidth:1,height:130
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    width: 180,
                    alignItems: 'center',
                    marginLeft:10,marginTop:10,
                  }}>
                     <Image
                  source={require('../assets/Aeon/profit/dollar.png')}
                  resizeMode="stretch" 
                  style={{width: 40, height: 40}}
                  />
                  <Text
                    style={[
                      {
                        textAlign: 'center',
                        fontSize: 11,
                        color: colors.appBlack,
                        marginTop: 10,
                        fontFamily:global.appFontM,
                      },
                    ]}
                    allowFontScaling={false}>
                    {'Total Investment(USD)'.toUpperCase()}
                  </Text>
                  <Text
                    style={[
                      styles.sheading,
                      { fontSize: 18, color: colors.appBlack,fontFamily:global.appFontM},
                    ]}
                    allowFontScaling={false}>
                    {parseFloat(Ti).toFixed(2)}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems:'center',
                  width: '49%',
                  padding:10,borderRadius:5,
                  borderColor: colors.appLightgray,borderWidth:1,height:130
                }}>
                  <Image
                  source={require('../assets/Aeon/profit/perc.png')}
                  resizeMode="stretch" 
                  style={{width: 40, height: 40,marginBottom:10}}
                  />
                <Text
                  style={[
                    {
                      textAlignVertical: 'center',
                      textAlign: 'center',
                      fontSize: 11,
                      color: colors.appBlack,
                      // marginTop: 10,
                      fontFamily:global.appFontM,
                      
                    },
                  ]}
                  allowFontScaling={false}>
                  {'Avg Return %age'.toUpperCase()}
                </Text>
                <Text
                  style={[
                    styles.sheading,
                    { fontSize: 18, color: colors.appBlack,fontFamily:global.appFontM},
                  ]}
                  allowFontScaling={false}>
                  {(
                    (parseFloat(TP) / parseFloat(Ti) > 0 ? parseFloat(Ci) : 0) *
                    100
                  ).toFixed(2)}
                </Text>
                <Text style={{color:'gray',fontSize:11,
                  fontFamily:global.appFontM,textTransform:'uppercase',marginTop: 3}}>(last 7 days)</Text>
              </View>
            </View> 
          </View> */}
        </View>
      </View>
      
      
                

      <View style={{width: '90%', marginTop:20,alignSelf: 'center',display:ShowSS?'flex':'none'}}>
      <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
              setShowSS(false)
              setTimeout(() => {
                  takeScreenShot();
              },1000)
              setTimeout(()=>{setShowSS(true)},2500)
          }}>
<ImageBackground source={require('../assets/Aeon/profit/sshot.png')} 
resizeMode="contain" style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, 
justifyContent: 'space-between', width: '100%',height:60 }}>
  <View style={{ flexDirection: 'row', alignSelf: 'center',width:'90%',alignItems:'center',marginLeft:'7%',
 justifyContent:'space-between'}}>

                        <Text allowFontScaling={false} style={[ { color: '#f4f4f4',
                         fontFamily: global.appFontM, fontSize: 18 }]}>TAKE SCREENSHOT</Text>
                        {/* <View style={{backgroundColor:'#fff',borderRadius:50,width:50,height:50,
                        alignItems:'center',justifyContent:'center'}}> */}

                            {/* <Image source={require('../assets/Aeon/profit/cam.png')} 
                            style={{ width: 40, height: 40, alignSelf: 'center',}} resizeMode={'stretch'} /> */}
                        {/* </View> */}
                            </View>
                    </ImageBackground>
          </TouchableOpacity>
      
        {/* <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
              setShowSS(false)
              setTimeout(() => {
                  takeScreenShot();
              },1000)
              setTimeout(()=>{setShowSS(true)},2500)
          }}>
          <Image
            source={require('../assets/screenshot-btn.png')}
            style={{width: '100%', height: 60, resizeMode: 'stretch'}}
          />
        </TouchableOpacity> */}
      </View>
{console.log('revenue data is :',Revenue_data)}
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
            // onPress={() => {
            //   setDet(true), rev_det(item.date);
      //  /     }}
            >
            <View style={{marginHorizontal: 10, marginTop: 10}}>
              <ImageBackground
                // resizeMode={'contain'}
                resizeMode={'stretch'}
                source={require('../assets/Aeon/profit/whitebox.png')}
                // source={require('../assets/botz/cardProfit.png')}
                style={{                  
                  width: '100%',                  
                  backgroundColor: 'transparent',
                }}>
               
                <View
                  style={{
                    justifyContent: 'space-evenly',
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
                      <View style={{flexDirection: 'row',left: 10}}>
                      <Image source={require('../assets/Aeon/profit/return.png')} 
                            style={{ width: 15, height: 20, alignSelf: 'center',}} resizeMode={'stretch'} />
                      
                      <View style={{flexDirection:'column'}}>
                    <Text
                      style={{
                        fontSize: 11,
                        fontFamily:global.appFontB,
                        color: 'gray',
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
                          fontSize: 14,
                          fontFamily:global.appFontM,
                        }}
                        allowFontScaling={false}>
                        {parseFloat(item.ret).toFixed(2)} %
                      </Text>
                    </View>
                    </View>
                    </View>
                  </View>
                  <View
                  style={{                                      
                    alignSelf: 'flex-start'
                  
                  }}>
                    <View style={{flexDirection: 'row',left: 10}}>
                      <Image source={require('../assets/Aeon/profit/date.png')} 
                            style={{ width: 15, height: 20, alignSelf: 'center',}} resizeMode={'stretch'} />
                            <View style={{ flexDirection: 'column'}}>
                            <Text
                    style={{
                      fontSize: 11,
                      fontFamily:global.appFontM,
                      color: 'gray',
                      alignSelf: 'center',
                    }}
                    allowFontScaling={false}>
                    DATE{' '}
                  </Text>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 14,
                      // backgroundColor:'#84878a',
                      paddingHorizontal:10,
                      borderRadius:10,
                      fontFamily:global.appFontM,
                      textAlign: 'center',
                    }}
                    allowFontScaling={false}>
                    {item.date.toUpperCase()}
                  </Text>
                            </View>
                            </View>
                  
                </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      width: '45%',
                    }}>
                      <View style={{flexDirection: 'row',left: 10}}>
                      <Image source={require('../assets/Aeon/profit/fund.png')} 
                            style={{ width: 20, height: 20, alignSelf: 'center',}} resizeMode={'stretch'} />
                            <View style={{ flexDirection: 'column'}}>
                            <Text
                      style={{
                        fontSize: 11,
                        fontFamily:global.appFontM,
                        color: 'gray',
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
                          fontSize: 14,
                          fontFamily:global.appFontM,
                          textAlign: 'center',
                          right:5
                        }}
                        allowFontScaling={false}>
                        {parseFloat(item.amount).toFixed(2)} USD
                        </Text>
                      
                    </View>
                            </View>
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
                    marginTop: 3,
                  }}>
                  {/* <View style={{justifyContent: 'space-between',flexDirection:'row',alignItems:'center',
                        width:'98%',alignSelf: 'center',height:40}}> */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      width: '100%',
                      alignSelf: 'center',
                      marginTop:10,                      
                    }}>
                    <Text
                      style={{fontSize: 12, fontFamily:global.appFontB, color: '#fff'}}
                      allowFontScaling={false}>
                      PROFIT
                    </Text>
                    <Text
                      style={{
                        color: colors.selected,
                        fontSize: 14,
                        textAlign: 'center',
                        fontFamily:global.appFontB,
                      }}
                      allowFontScaling={false}>
                      {' '}
                      {parseFloat(item.profit).toFixed(2)} USD
                    </Text>
                  </View>
                  {/* <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '45%',
                      marginLeft: '5%',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{fontSize: 12, fontFamily:global.appFontM, color: 'white'}}
                      allowFontScaling={false}>
                      LOSS
                    </Text>
                    <Text
                      style={{
                        color: '#ff0000',
                        fontSize: 14,
                        textAlign: 'center',
                        fontFamily:global.appFontM,
                      }}
                      allowFontScaling={false}>
                      {' '}
                      {parseFloat(item.loss).toFixed(2)} USD
                    </Text>
                  </View> */}

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
                        backgroundColor: '#fff',
                        display: 'none',
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
                        display: 'none',
                        backgroundColor:'#fff',
                        height: 5,
                        width: 350,
                        borderRadius: 10,
                      }}
                    />
                  )} */}
                </View>               
              </ImageBackground>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
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
                 
                  </View>
                  <Text
                    style={[
                      {
                        textAlign: 'center',
                        fontSize: 12,
                        color: colors.selected,
                        marginTop: 0,
                        fontFamily:global.appFontM,
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
                        fontFamily:global.appFontM,
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
                    {item.pair.replace('USD', '')}
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
                    {parseFloat(item.amount).toFixed(2)} USD
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
                    {item.fee} USD
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

export default RevenueScreen;
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
    fontFamily:global.appFontM,
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
    fontFamily:global.appFontM,
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
    fontFamily:global.appFontM,
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
    fontFamily:global.appFontM,
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
    fontFamily:global.appFontM,
  },
});
