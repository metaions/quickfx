import {
  View,
  Text,
  Button,
  Dimensions,
  TouchableOpacity,
  BackHandler,
  ToastAndroid,
  Clipboard,
  RefreshControl,
  StyleSheet,
  Image,
  StatusBar,
  FlatList,
  ScrollView,
  TextInput,
  ActivityIndicator,
  ImageBackground
} from 'react-native';
import React from 'react'
import global from '../component/global'
import { ThemeProvider, useFocusEffect, useIsFocused, useTheme, useLinkTo } from '@react-navigation/native';
import Share from 'react-native-share';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LottieView from 'lottie-react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';

const PoolDepositScreen = ({navigation}) => {
  const { colors } = useTheme();
  const [ERROR, setERROR] = React.useState(false);
  const [amt, setAmt] = React.useState('')


  const [LD, setLD] = React.useState(false);

  const [Addr, setAddr] = React.useState('');
  const [chk_click, setChk_click] = React.useState(false);
  const [Uid, setUid] = React.useState('');
  const [UImg, setUImg] = React.useState('');
  const [TXNid, setTXNid] = React.useState('');

  const [Img, setImg] = React.useState('');

  React.useEffect(() => {
    callApi(global.uid);
  }, [])



  React.useEffect(() => {
    const backAction = () => {
      if(ERROR){
        setERROR(false)
        return true
      }
      else{

        return false;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [ERROR])
  const OpenImagePicker = val => {
    // let imageList = [];
    ImagePicker.openPicker({
      multiple: false,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
      compressImageQuality: 0.8,
      maxFiles: 1,
      mediaType: 'any',
      includeBase64: true,
    })
      .then(response => {
        // console.log('resp ',response)
       setUImg(response.data)
        // response.map(image => {
        //   if (val == 1) {
        //     setUImg(image.data);
        //   }
        // });
      })
      .catch(e => console.log('Error:', e.message));
  };


  const callApi = uid => {
    let url =
      global.BASE_URL +
      '/m/cpy/get_callback_address2.aspx?uid=' +
      uid +
      '&cur=USDT';
    console.log(url);
    fetch(url)
      .then(item => item.json())
      .then(dta => {
        if (
          dta.result.address.includes('error') ||
          dta.result.address.includes('Service')
        ) {
          console.log('hawwwwwww !! , error aa gya ');
          ToastAndroid.show('Deposit Service is currently unavailable, Please deposit in the above Address and provide the details as mentioned on your Screen', ToastAndroid.LONG)
          callApi('top');
          setERROR(true);
        } else {
          setAddr(dta.result.address);
          callImg(dta.result.address);
        }
      });
  };
  const upload_dta = () => {
    setLD(true);
    if (UImg == '') {
      ToastAndroid.show(
        'Please upload image in order to proceed further',
        ToastAndroid.SHORT,
      );
      setLD(false);
      return;
    }
    var data = new FormData();
    data.append('uid', global.uid);
    data.append('image1', UImg);
    data.append('txnid', TXNid);
    data.append('amt', amt);
    let url = global.BASE_URL + 'css_mob/deposit_auto.aspx'
    // console.log('url ',url , data); 
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    })
      .then(item => item.json())
      .then(dta => {
        ToastAndroid.show(dta.message, ToastAndroid.SHORT);
        setLD(false);
        console.log('msg ',dta.message);
        navigation.goBack()
      }).catch(e=>{
        console.log('issue ',e);
        setLD(false);
      })
      
      ;
  };
  const callImg = addr => {
    console.log(
      'https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl=' + addr,
    );
    setImg('https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl=' + addr);
  };
  function submitDeposit() {
    if (amt.trim() == '' || amt <= 0 || isNaN(parseFloat(amt))) {
      // console.log('enter valid number',amt,typeof(amt),parseFloat(amt));
      ToastAndroid.show('Enter valid number..', ToastAndroid.SHORT)
      setERROR(false)
      return
    }
    // console.log(' valid number',amt,typeof(amt),parseFloat(amt));
    setERROR(true)
  }

  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row',alignItems: 'center',width:'100%',justifyContent: 'flex-start'}}>
      <TouchableOpacity onPress={()=>{ERROR ? setERROR(false) :navigation.goBack()}} style={{padding:10}}>
      <AntDesign
                name={'back'} color={'#fff'}
                size={22}/>
      </TouchableOpacity>
      <Text style={[styles.head,{marginLeft:20}]}>Deposit in Pool</Text>
      </View>
      {
        ERROR ?
          <View
            style={{
              width: '100%',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 30,
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                OpenImagePicker(1);
              }}
              style={{
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                width: '35%',
              }}>
              {UImg == '' ? (
                <Image
                  source={require('../assets/no_image.jpg')}
                  style={{
                    borderRadius: 5,
                    width: 100,
                    height: 100,
                    alignSelf: 'flex-start',
                  }}
                  resizeMode={'center'}
                />
              ) : UImg.includes('http') ? (
                <Image
                  source={{ uri: UImg }}
                  style={{
                    borderRadius: 5,
                    width: 100,
                    height: 100,
                    alignSelf: 'flex-start',
                  }}
                  resizeMode={'cover'}
                />
              ) : (
                <Image
                  source={{ uri: 'data:image/png;base64,' + UImg }}
                  style={{
                    borderRadius: 5,
                    width: 100,
                    height: 100,
                    alignSelf: 'flex-start',
                  }}
                  resizeMode={'cover'}
                />
              )}

              <MaterialCommunityIcons
                name={'image-plus'}
                size={22}
                style={{
                  position: 'relative',
                  color: '#5B6A81',
                  bottom: 35,
                  left: 80,
                  borderWidth: 1,
                  borderColor: '#5B6A81',
                  borderRadius: 50,
                  padding: 5,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{ color: 'white', fontSize: 25, fontStyle: 'italic' }}>
              Or <Text style={{ fontSize: 20 }}>(Optional)</Text>
            </Text>
            <View
              style={[
                {
                  width: '80%',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  alignSelf: 'center',
                  backgroundColor: colors.selected,
                  marginHorizontal: 10,
                  marginVertical: 15,
                  borderRadius: 5,
                  marginTop:50
                },
              ]}>
              <TextInput
                placeholder="Please Enter Your Transaction Id"
                style={[{ fontSize: 12, marginTop: 0 }]}
                color={colors.text}
                autoCapitalize="none"
                value={TXNid}
                onChangeText={val => {
                  setTXNid(val);
                }}
                width={'100%'}
                placeholderTextColor={colors.dark_text}
              />
            </View>

            <View>
              <TouchableOpacity
                // style={styles.signIn}
                onPress={() => {
                  setLD(true)
                  upload_dta();
                }}
                activeOpacity={0.5}
                underlayColor="#000">
                <View style={styles.signIn}>
                  <Text style={styles.textSign}>SUBMIT</Text>
                  {LD ? (
                    <ActivityIndicator size={'small'} color="#d0d0d0" />
                  ) : null}
                </View>
              </TouchableOpacity>
            </View>
          </View>
          : <View style={styles.innercontainer}>

            <Text style={styles.subhead}>Amount to Deposit</Text>
            <View style={styles.txtinputOuter}>

              <TextInput style={styles.txtinput}
                placeholder={'Enter Amount to Invest'}
                value={amt}
                keyboardType={'decimal-pad'}
                onChangeText={(val) => { setAmt(val) }}
              />
              <Text style={[styles.subhead, { color: '#000', alignSelf: 'center' }]}>USDT</Text>
            </View>
            {Img !== '' ? <ImageBackground source={require('../assets/botz/qr-bg.png')} resizeMode="stretch" style={{ width: '100%', height: 300, justifyContent: 'center', alignItems: 'center', marginTop: 20, }}>
              <ImageBackground source={require('../assets/botz/QrCode.png')} resizeMode="stretch" style={{ width: 190, height: 190, alignSelf: 'center', bottom: 20, justifyContent: 'center' }}>
                <Image
                  source={{ uri: Img }}
                  style={{
                    width: 115,
                    height: 115,
                    // marginVertical: 40,
                    // marginTop: 50,
                    borderRadius: 10,
                    alignSelf: 'center'

                  }}
                  resizeMode={'stretch'}
                />
              </ImageBackground>
              <ImageBackground source={require('../assets/share-bg.png')} resizeMode="stretch"
                style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, justifyContent: 'space-evenly', width: '98%', height: 60, marginLeft: '1%' }}>
                <Text
                  style={[
                    styles.txt,
                    {
                      color: "#fff",
                      paddingHorizontal: 0,
                      fontWeight: 'bold',
                      width: 240,
                    },
                  ]}
                  numberOfLines={1}>
                  {Addr}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    Clipboard.setString(Addr),
                      ToastAndroid.show(
                        'Copied to Clipboard',
                        ToastAndroid.SHORT,
                      );
                  }}
                  style={{ padding: 5 }}>
                  <Text style={{ textAlign: 'right' }}>
                    <IonIcons name="copy-outline" size={25} color={colors.binanceylw2} />
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Share.open(shareImage).catch(err => console.log(err));
                  }}
                  style={{ padding: 5, justifyContent: 'center' }}>

                  <Image source={require('../assets/share-icon.png')} style={{ width: 28, height: 28, alignSelf: 'center', marginLeft: 0, left: 0 }} resizeMode={'stretch'} />

                </TouchableOpacity>

              </ImageBackground>
            </ImageBackground> : null}

            <Text style={{color: colors.selected,alignSelf: 'flex-end',marginTop:10}}>
              Chain Name :{' '}
              <Text
                style={{
                  color: colors.selected,
                  fontSize: 18,
                  // backgroundColor: colors,
                }}>
                TRC20
              </Text>
            </Text>
            <TouchableOpacity style={styles.touch} onPress={() => submitDeposit()}>
              <Text style={styles.subhead}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>}

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1, margin: 10, padding: 10,
    alignItems: 'center',
    paddingTop: 40
  },
  head: {
    fontSize: 22,
    fontFamily: global.bold,
    color: '#fff'
  },
  subhead: {
    fontSize: 16,
    // fontFamily:global.bold, 
    color: '#fff'
  },
  innercontainer: {
    alignSelf: 'flex-start',
    marginTop: 30, width: '100%'
    // flex:1,
    // backgroundColor:'red'

  },
  txtinputOuter: {
    backgroundColor: '#fff',
    marginTop: 10,
    borderRadius: 10,
    width: '96%', height: 50, flexDirection: 'row'
  },
  txtinput: {
    // backgroundColor:'#fff',
    // marginTop:10,
    // borderRadius:10,
    width: '85%', height: 50
  },
  touch: {
    alignSelf: 'center',
    marginTop: 10, alignItems: 'center', justifyContent: 'center',
    width: 100, height: 40, backgroundColor: 'green', borderRadius: 5
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  signIn: {
    width: 110,
    height: 40,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    backgroundColor: '#7bd75d',
  },
})
export default PoolDepositScreen