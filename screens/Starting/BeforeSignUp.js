import * as React from 'react';
import {
    View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, BackHandler,
    StatusBar, Dimensions, ActivityIndicator, Image, Platform, TextInput, ToastAndroid, PixelRatio, Switch
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
// import CountryPicker from 'react-native-country-picker-modal'
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import * as RNLocalize from "react-native-localize";
import { AuthContext } from '../../component/context';
import { ThemeProvider, useFocusEffect, useIsFocused, useTheme } from '@react-navigation/native';
import global from '../../component/global';
import LottieView from 'lottie-react-native';
import CountryPicker from "react-native-country-codes-picker/components/CountryPicker";
import {NetworkInfo} from 'react-native-network-info';
// import CountryPicker from 'react-native-country-picker-modal'
// import { CountryCode, Country } from './src/types'
 
const styles = StyleSheet.create({
  // ...
})
// console.log('itesdfsdfjk '+JSON.stringify(RNLocalize.getLocales()));
// console.log('itesdfsdfjk '+RNLocalize.getCountry());

const BeforeSignUp = ({ navigation }) => {

  const [country, setCountry] = React.useState()
  const [flag, setFlag] = React.useState()
  
    ///
    const phoneInput = React.useRef(null);
    const bginput = '#2a3340'
    const plc = '#666d80'
    const { colors } = useTheme();
    React.useEffect(() => {
      locationget()
    function locationget(){       
      var url = 'https://api.ipgeolocation.io/ipgeo?apiKey=c9999ad05d2e40b7a29e82acfd179a19';
      fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          setCountry(responseJson.country_name)
          setFlag(responseJson.country_flag)
          // this.setState({
          //   countryName: responseJson.country_name,
          //   regionName: responseJson.region_name
          // });
        })
        
      }
     
    }, [])

    return (
        <View style={{ flex: 1, paddingTop: 50, paddingHorizontal: 20 }}>
            <StatusBar backgroundColor={'transparent'} translucent={true} barStyle={"light-content"} />
            <TouchableOpacity style={{ width: 50, marginBottom: 50 }} onPress={() => { navigation.goBack() }}>
                <Feather name="arrow-left"
                    color={plc}
                    size={28}

                />
            </TouchableOpacity>
            <LottieView source={require('../../assets/botz/globe.json')} style={{ width: 300, height: 200, alignSelf: 'center' }} autoPlay loop={false} />

            <Text style={{ marginTop: 10, fontSize: 22, fontFamily: global.bold, color: colors.selected, textAlign: 'center', alignSelf: 'center', lineHeight: 30 }}>
                Before we start, we'll have to know your current location of residence.
            </Text>
            <View style={{backgroundColor:'#2e3947',flexDirection:'row',width:'100%',paddingHorizontal:20,
            alignItems:'center',
            alignSelf: 'center',height:55,borderRadius:3,justifyContent:'space-between',marginTop:20}}>
          
           <View style={{flexDirection:'row'}}>
             <Image style={{width:30,height:30,borderRadius:20,marginRight:15}} source={{uri:flag}}/>

           {/* <Image style={{width:30,height:30,borderRadius:20,marginRight:15}} source={require('../assets/botz/flag.png')}/> */}
           <Text style={{textAlignVertical:'center',fontSize:16,color:'#fff'}}>{country}</Text>
          </View>
          
            <Image style={{width:30,height:25}} source={require('../../assets/botz/arrows.png')}/>
            </View>
           <Text style={{textAlignVertical:'center',fontSize:13,color:plc,lineHeight:20,marginTop:15}}>The registration process is subject to change based on the information you provide.</Text>
     {/* <TouchableOpacity style={{backgroundColor:plc,flexDirection:'row'}}>
     {/* <CountryPicker
        {...{
          countryCode,
          withFilter,
          withFlag,
          withCountryNameButton,
          withAlphaFilter,
          withCallingCode,
          withEmoji,
          onSelect,
        }}
        modalProps={{onPress}}
        containerButtonStyle={{width:300}}
        visible
      /> 
         <CountryPicker
                   inputPlaceholder='Select Country Code'
                   placeholderTextColor={'#fff'}
                   style={{ textInput: {                    
                       backgroundColor:'#f7931b',                    
                    color:'#fff'
              },
            modal:{
                zIndex:99999,
            }}}
                show={true}
                
                // when picker button press you will get the country object with dial code
                pickerButtonOnPress={(item) => {
                    
                // setCountryCode(item.dial_code);
                // setShow(false);
                }}
            />
        <Image style={{width:50,height:50}} source={require('../assets/botz/arrows.png')}/>
     </TouchableOpacity> */}
    
      {/* <Text style={{}}>Press on the flag to open modal</Text> */}
      {/* {country !== null && (
        <Text style={{}}>{JSON.stringify(country, null, 2)}</Text>
      )} */}
            {/* <PhoneInput
              ref={phoneInput}              
              defaultCode="IN"              
              layout="first"
            //   withShadow
              // autoFocus
            //   flagButtonStyle={{backgroundColor:'red',borderRadius}}
              onChangeCountry={item=>{console.log("    "+JSON.stringify(item.name))}}
              // onChangeText={item=>{console.log(item)}}
              containerStyle={{
                width: '90%',
                marginTop: 15,
                alignSelf: 'center',
                backgroundColor: 'transparent',
                     color:'#fff',           
                elevation: 5,
                height: 50,
                
              }}
              disableArrowIcon
              withDarkTheme={false}
              style={{color:'#fff'}}             
              countryPickerButtonStyle={{
                backgroundColor: '#2A3340',marginRight:-10,
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,color: colors.selected
              }}              
              codeTextStyle={{color:'#fff',display:'none',}}              
              textInputStyle={{fontSize: 18,color:'#fff'}}
              textContainerStyle={{
                paddingVertical: 0,                
                backgroundColor: '#2A3340',             
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                color:colors.selected, 
              }}     
              textInputProps={{selectionColor:colors.binanceylw2,placeholderTextColor:plc}}
              placeholderTextColor={'#fff'}        
              onChangeFormattedText={text => {
                console.log(text);
                // handleChange('mno', text);
              }}
            >
                </PhoneInput> */}
            <TouchableOpacity
                onPress={() => { navigation.navigate('SignUpScreen') }}
                style={[{ backgroundColor: colors.binanceylw2 }, { position: 'absolute', bottom: 40, right: 10, padding: 10, borderRadius: 5 }]}>

                <Feather name="arrow-right"
                    color={colors.background}
                    size={24}

                />
            </TouchableOpacity>
        </View>
    )
}

export default BeforeSignUp