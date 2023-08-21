import * as React from 'react';
import { ThemeProvider, useTheme } from '@react-navigation/native';
import { View, Text, Picker, Dimensions, TouchableOpacity, ImageBackground, Image, FlatList, } from 'react-native';
import LottieView from 'lottie-react-native';
import styles from '../component/styles';
import global from '../component/global';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { jsonContext } from "../context/GlobalState";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
const PositionMT = ({ navigation, route }) => {
  // my_addr:addr,cur:Id,acc:AccName,img: Coin.image  

  const sym = route.params?.sym
  const side = route.params?.side
  const img = route.params?.img
  const [imageURI, setImageURI] = React.useState('');
  const [savedImagePath, setSavedImagePath] = React.useState('');
  const {
    hedge,
  } = React.useContext(jsonContext);
  const { colors } = useTheme();
  const [Loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(true);
  const [buyPrice, setBuyPrice] = React.useState('0');
  const [buyMultPrice, setBuyMultPrice] = React.useState('1');
  const [sellMultPrice, setSellMultPrice] = React.useState('1');
  const [sellPrice, setSellPrice] = React.useState('0');
  const [live, setLive] = React.useState(0);
  const [demo, setDemo] = React.useState(0);
  const [Data, setData] = React.useState(null);

  React.useEffect(() => {
    setData(null);

    let url = global.BASE_URL + `css_mob/getpositioninfo.aspx?uid=${global.uid}&pair=${sym}`


    console.log(url)
    fetch(url)
      .then(Data => Data.json())
      .then(dta => {
        setData(dta)
        // setLoading(false);
      })
      // .catch(e=>
      //   // setLoading(false)
      //   )

  }, [refreshing])

  React.useEffect(() => {
    let interval = setInterval(() => {
      priceApi()
    }, 5000);
    return () => clearInterval(interval);
  }, [])

  function priceApi() {
    let url2
    if (sym.toString().includes('USD')) {

      let finalAllSymbols = sym
    if(finalAllSymbols.includes('++')){
      finalAllSymbols = finalAllSymbols.split('++').join('')
    }
    if(finalAllSymbols.includes('+')){
      finalAllSymbols = finalAllSymbols.split('+').join('')
    }
      url2 = `${global.priceURL}?server=${(global.server_name !== '' && global.server_name !== null) ? global.server_name.split('-')[0] : ''}&pair=` + finalAllSymbols;

      // console.log('url1 : ' + url2);
      fetch(url2)
        .then(item => item.json())
        .then(val => {
          // console.log('val length: '+val.length);
          if (val.length > 0) {

            setBuyPrice(parseFloat(val[0].buy_price))
            // console.log('setseel price '+parseFloat(val[0].sell_price));
            setSellPrice(parseFloat(val[0].sell_price))
            // if(Loading){

            //   setLoading(false);
            // }
          }
        }).then(va=>setLoading(false)).catch(e=>setLoading(false))

    }
    else {
      let reqSym
      // if(sym.toString().includes('USD')){
      //   reqSym = sym
      // }
      // else 
      if (sym.toString().slice(3, 6) == 'JPY' || sym.toString().slice(3, 6) == 'CHF' || sym.toString().slice(3, 6) == 'CAD') {
        reqSym = sym + ',USD'+sym.toString().slice(3, 6)+global.addOnSymbol
      }
      else {
        reqSym = sym + ',' + sym.toString().slice(3, 6) + 'USD'+global.addOnSymbol
      }
      let finalAllSymbols = reqSym
      if(finalAllSymbols.includes('++')){
        finalAllSymbols = finalAllSymbols.split('++').join('')
      }
      if(finalAllSymbols.includes('+')){
        finalAllSymbols = finalAllSymbols.split('+').join('')
      }
      url2 = `${global.priceURL}?server=${(global.server_name !== '' && global.server_name !== null) ? global.server_name.split('-')[0] : ''}&pair=` + finalAllSymbols;
      console.log('url: ' + url2);
      fetch(url2)
        .then(item => item.json())
        .then(val => {
          // console.log('val length: '+val.length());
          if (val.length > 0) {
            if (sym.toString().slice(3, 6) == 'JPY' || sym.toString().slice(3, 6) == 'CHF' || sym.toString().slice(3, 6) == 'CAD') {
              // console.log('jpy resp: '+(1 / parseFloat(val[1].buy_price)).toFixed(5)+' , '+((1 / parseFloat(val[1].buy_price)) * parseFloat(val[0].buy_price)).toFixed(5)+' , '+parseFloat(val[0].buy_price).toFixed(5));
              setBuyPrice( parseFloat(val[0].buy_price))// *
              setSellPrice( ( parseFloat(val[0].sell_price)))//(1 / parseFloat(val[1].sell_price))*
              setBuyMultPrice((1 / parseFloat(val[1].buy_price)).toFixed(5)) 
              setSellMultPrice((1 / parseFloat(val[1].sell_price)).toFixed(5)) 
              console.log('its correct case '+(1 / parseFloat(val[1].sell_price))+'  '+( parseFloat(val[0].sell_price)));
            }
            else {
              setBuyPrice(parseFloat(val[0].buy_price))//parseFloat(val[1].buy_price) * 
              setSellPrice( parseFloat(val[0].sell_price))//parseFloat(val[1].sell_price) *
              console.log('sell price: '+val[0].sell_price);
              setBuyMultPrice(( parseFloat(val[1].buy_price))) 
              setSellMultPrice(( parseFloat(val[1].sell_price))) 

            }
          }
        }).then(v=>setLoading(false)).catch(e=>setLoading(false))
    }


  }

  function calculateBuy(item) {
    let val
    if(sym.toString().slice(0,3)=='USD'){

      val = ((CalculateIt(item.price, sellPrice)) * 10* sellMultPrice * (1/sellPrice) * parseFloat(item.qty).toFixed(2))
    }
    else{

      val = ((CalculateIt(item.price, sellPrice)) * 10* parseFloat(sellMultPrice).toFixed(5)  * parseFloat(item.qty).toFixed(2))//* sellPrice
    }
    let jpyFactor=1
    if(sym.toString().slice(3,6)=='JPY'){
      jpyFactor=100
    }
    // console.log('vals for imppp: '+ (CalculateIt(item.price, sellPrice))+'  '+ sellMultPrice +'  '+ sellMultPrice +'  '+ parseFloat(item.qty).toFixed(2));
    val=val*jpyFactor
    // console.log('buy val=='+(CalculateIt(item.price, sellPrice))+'   '+ sellMultPrice +'  '+sellPrice+'  '+ parseFloat(item.qty).toFixed(2));
    return val.toFixed(2)
  }
  function calculateSell(item) {
    let val
    if(sym.toString().slice(0,3)=='USD'){
      console.log('vals seee: '+(CalculateIt(item.price, buyPrice))+'  '+buyMultPrice+'  '+ (1/buyPrice)+'  '+parseFloat(item.qty).toFixed(2));
      val = ((CalculateIt(item.price, buyPrice)) * 10* buyMultPrice * (1/buyPrice) * parseFloat(item.qty).toFixed(2)) * -1
    }
    // else if(sym.toString().slice(3,6)=='CHF' || sym.toString().slice(3,6)=='JPY'){
    //   val = ((CalculateIt(item.price, buyPrice)) * 10* buyMultPrice * (1/buyPrice) * parseFloat(item.qty).toFixed(2)) * -1
      
    // }
    else{
        
      val = ((CalculateIt(item.price, buyPrice)) * 10* parseFloat(buyMultPrice).toFixed(5) * parseFloat(item.qty).toFixed(2)) * -1
    }
    let jpyFactor=1
    if(sym.toString().slice(3,6)=='JPY'){
      jpyFactor=100
    }
    val=val*jpyFactor
    return val.toFixed(2)
  }
  // function calculateTotal(){
  //   let val = ((CalculateIt(item.price, sellPrice)) * 10   * parseFloat(item.qty).toFixed(2)) + 
  //                 ((CalculateIt(item.price, buyPrice)) * 10   * parseFloat(item.qty).toFixed(2)) 
  // }

  function CalculateIt(startprice = 0.0000, endprice = 0.0000) {
    // console.log('buy prc an sell: '+startprice+'  '+endprice);
    let multiplier
    // if (startprice.toString().indexOf('.') >= 3) {
    //   // console.log('print 1');
    //   multiplier = 0.01
    // }
    if (startprice.toString().indexOf('.') == 3) {
      multiplier = 0.01
    }
    else if (startprice.toString().indexOf('.') > 3){
      multiplier = 0.1

    }
    else {
      // console.log('print 2');
      multiplier = 0.0001
    }


    let pips = (parseFloat(endprice) - parseFloat(startprice)) / multiplier

    return pips.toFixed(2)
  }
  return (

    Loading ?
      <View style={{ flexDirection: 'column', justifyContent: 'center', height: 700, backgroundColor: colors.background }} >
        <LottieView source={require('../assets/loadingRound.json')} style={{ width: 80, height: 80, alignSelf: 'center' }} autoPlay loop /></View>
      :
      <ImageBackground source={global.bgimg} style={[styles.container, { paddingTop: 20, ImageBackground }]}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={
            { padding: 50, }
          }
            onPress={() => { navigation.goBack() }}
          >
            <Ionicons
              name="md-arrow-back"
              size={22}
              color={colors.selected}
            />

          </TouchableOpacity>
          <Image source={require('../assets/logo.png')} style={{ width: 180, height: 60, alignSelf: 'center', resizeMode: 'stretch' }} />
        </View>
        <View style={{
          marginTop: 20,
          alignItems: 'center',
          width: '100%',
        }}>
          <Text
            style={{
              color: colors.selected,
              fontSize: 18,
              textAlign: 'center',
            }}>
            My Position in Broker
          </Text>
        </View>
        {Data ?
          <FlatList
            data={Data}
            keyExtractor={(item, index) => index + 'a'}
            renderItem={({ item, index }) => (
              <View
                style={{
                  marginTop: '5%',
                  width: '100%',
                  alignSelf: 'center',
                  borderBottomWidth: 0.5,
                  borderBottomColor: colors.appGrey,
                  // backgroundColor: '#202B3F',
                  flexDirection: 'column',

                  elevation: 5,
                  paddingHorizontal: 15,
                  paddingVertical: 15,

                }}>
                     <Text style={{ color: 'grey',  fontSize: 12,textAlign: 'right' }}>#position-id : <Text style={{ color: 'grey', fontWeight: 'normal',fontSize:13 }}>{item.position_id}</Text></Text>
                <View
                  style={{

                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  {/* <Image
                    source={{ uri: img }}
                    //  source={require('../assets/trd/logo1.png')}
                    resizeMode={'stretch'}
                    style={{
                      width: 25,
                      height: 25,
                      marginTop: 1,
                      alignSelf: 'center',
                      marginRight: 10
                    }}
                  /> */}

                  <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{sym}, <Text style={{ color: item.side == 'BUY' ? colors.profitcolor2 : colors.losscolor, fontWeight: 'normal' }}>{item.side.toLowerCase()} {item.qty}</Text></Text>
                    <Text style={{ color: 'grey', fontWeight: 'bold', marginTop: 5 }}>{item.price}{" -> "} {item.side == 'BUY' ? sellPrice : buyPrice}</Text>
                  </View>
                  <View style={{ flexDirection: 'column', justifyContent: 'flex-end', marginLeft: 50 }}>
                    <Text style={{ color: 'grey' }}>{item.date}</Text>
                    <Text style={{
                      color: item.type == 'limit' ? colors.profitcolor2 : item.side == 'BUY' ? calculateBuy(item) > 0 ? colors.profitcolor2
                        : colors.losscolor : calculateSell(item) > 0 ? colors.profitcolor2 : colors.losscolor, fontWeight: 'bold', textAlign: 'right'
                    }}>
                      {item.type == 'limit' ? 'limit order' : item.side == 'BUY' ? calculateBuy(item) : calculateSell(item)}</Text>
                  </View>



                </View>
              </View>
            )}
          />
          : null
        }





      </ImageBackground>

  );
}

export default PositionMT;



