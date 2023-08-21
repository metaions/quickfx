import * as React from 'react';
import { ThemeProvider, useTheme } from '@react-navigation/native';
import { View, Text, Picker, Dimensions, TouchableOpacity, ToastAndroid, Image, FlatList, } from 'react-native';
import LottieView from 'lottie-react-native';
import styles from '../component/styles';
import global from '../component/global';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { jsonContext } from "../context/GlobalState";
import AntDesign from "react-native-vector-icons/AntDesign";
import images from '../component/images'
const CopiersScreen = ({ navigation, route }) => {

  const sym = route.params?.sym
  const side = route.params?.side
  const from = route.params?.from
  const botid = route.params?.botid
  const [imageURI, setImageURI] = React.useState('');
  const [savedImagePath, setSavedImagePath] = React.useState('');
  const {
    hedge,
  } = React.useContext(jsonContext);
  const { colors } = useTheme();
  const [Loading, setLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(true);
  const [status, setStatus] = React.useState('both');
  const [live, setLive] = React.useState(0);
  const [demo, setDemo] = React.useState(0);
  const [Data, setData] = React.useState([]);
  const [buyPrice, setBuyPrice] = React.useState('')
  const [sellPrice, setSellPrice] = React.useState('')
  const [Coins, setCoins] = React.useState(null);
  const [Cancelling, setCancelling] = React.useState(false);
  const [ShowTPSL, setShowTPSL] = React.useState(null);
  const [closeClicked, setCloseClicked] = React.useState("false,-1");
  const [closeClicked1, setCloseClicked1] = React.useState("false,-1");
  const [closeDoubleClicked, setCloseDoubleClicked] = React.useState("false,-1");
  const [clickedItem, setClickedItem] = React.useState('-1');
  let allsymbols = sym
  const[allsymbolPrices,setAllSymbolPrices]  = React.useState(null)
  let coins = ''
  let interval
  React.useEffect(() => {
    if (!(sym).toString().includes('USD')) {
      if ((sym).toString().slice(3, 6) == 'JPY' || (sym).toString().slice(3, 6) == 'CHF' || (sym).toString().slice(3, 6) == 'CAD') {


        allsymbols = allsymbols + ',' + 'USD' + (sym).toString().slice(3, 6)+global.addOnSymbol + ',';

        //console.log('val of symname: 6 '+global.symname);
      }
      else {


        allsymbols = allsymbols + ',' + (sym).toString().slice(3, 6) + 'USD'+global.addOnSymbol+',';

       
        //console.log('val of symname: 7 '+global.symname);
      }
    }
    let url = global.BASE_URL + `css_mob/store_copiers.aspx?uid=${global.uid}&pair=${sym}&mode=${hedge ? 'hedge' : 'normal'}&side=${side}${botid!=undefined?'&botid='+botid :''}`

    if (from == 'quant') {
      url = global.BASE_URL + `css_mob/store_pairs.aspx?pair=${sym}&mode=${hedge ? 'hedge' : 'normal'}`
    }
    if (from == 'quantTop') {
      url = global.BASE_URL + `css_mob/store_pairs.aspx?side=${side}&mode=${hedge ? 'hedge' : 'normal'}`
    }
    console.log(url)
    fetch(url)
      .then(item => item.json())
      .then(dta => {
        if(dta[0].success=='false'){
          ToastAndroid.show("nothing to show..",ToastAndroid.SHORT)
          return
        }
        tradeApi(dta)
        setCoins(dta)
        coins = dta
        // setData(dta)
        console.log('coins is');
        if(coins!==''){
          console.log('coins is not null');
           interval = setInterval(() => {
            tradeApi(coins)
          }, 5000)
        }
      })
    // interval=setInterval(()=>{              
    //     tradeApi(Coins)            
    //  },5000)
    return () => { clearInterval(interval) }
  }, [])


  const tradeApi = dta => {




    let finalAllSymbols = allsymbols
    if(finalAllSymbols.includes('++')){
      finalAllSymbols = finalAllSymbols.split('++').join('')
    }
    if(finalAllSymbols.includes('+')){
      finalAllSymbols = finalAllSymbols.split('+').join('')
    }
    let url2 = `${global.priceURL}?server=${(global.server_name !== '' && global.server_name !== null) ? global.server_name.split('-')[0] : ''}&pair=` + finalAllSymbols;

//    console.log(url2);



    fetch(url2)
      .then(item => item.json())
      .then(newdta1 => {
        setAllSymbolPrices(newdta1)
        console.log('all symbol price while api:',allsymbolPrices)
        try {
          let superbt = [...dta]
          // console.log('superbot',superbt)
          superbt.map((e, index) => {
            newdta1.map(newdta => {
//               console.log('vals of symn: : '+newdta.sym+'  '+e.symbol);

              if (newdta.sym.includes(e.pair) || e.pair.includes(newdta.sym)) {

                // superbt[index]['price'] = newdta.price
                superbt[index]['buy_price'] = newdta.buy_price
                superbt[index]['sell_price'] = newdta.sell_price
              }
            })
          })
          // console.log('suprdata length: '+JSON.stringify(superbt));        
          setData(superbt)

        }
        catch (e) { }
        // setBuyPrice(dta[0].buy_price)
        // setSellPrice(dta[0].sell_price)


      })


  };


  const onRefresh = React.useCallback(async () => {
    setRefreshing(true)
  });

  const color_check = React.useCallback((item, type) => {
    var roe_per = 0;
    let clr;
    var stop_loss = parseFloat(item.sl) * parseFloat(item.leverage)
    {
      item.side.toLowerCase() == "buy"
      ? (
        roe_per = ((((parseFloat(item.last_price) -
          parseFloat(item.avg)) *
          parseFloat(item.qty) +
          parseFloat(item.usdt)) /
          parseFloat(item.usdt) -
          1) *
          100 *
          parseFloat(item.leverage)
        ).toFixed(2))
      : (
        roe_per = ((((parseFloat(item.last_price) -
          parseFloat(item.avg)) *
          parseFloat(item.qty) +
          parseFloat(item.usdt)) /
          parseFloat(item.usdt) -
          1) *
          100 *
          parseFloat(item.leverage)
        ).toFixed(2) * -1)
    }
    type = 'ROE'
    if (type == 'ROE') {


      if (item.margin_callback_limit <= item.qty1 - 1) {


        if (stop_loss + roe_per < 20) {
          clr = '#F46401'
          return clr

        }
        if (roe_per < -50) {
          clr = '#F46401'
          return clr

        }

      }



      if (roe_per < 0) {
        return colors.losscolor

      }
      else {
        return colors.profitcolor
      }



    }



  }, [Data]
  )


  function getImg(name) {
    let myimg
    images.map(e => {
      if (e.sym == name) {
        myimg = e.img
      }
    })
    return myimg

  }

  const roe_cal = (item) => {
    let final;
    {
      item.side.toLowerCase() == "buy"
      ? final = (
        (((parseFloat(item.last_price) -
          parseFloat(item.avg)) *
          parseFloat(item.qty) +
          parseFloat(item.usdt)) /
          parseFloat(item.usdt) -
          1) *
        100 *
        parseFloat(item.leverage)
      ).toFixed(2)
      : final = (
        (((parseFloat(item.last_price) -
          parseFloat(item.avg)) *
          parseFloat(item.qty) +
          parseFloat(item.usdt)) /
          parseFloat(item.usdt) -
          1) *
        100 *
        parseFloat(item.leverage)
      ).toFixed(2) * -1
    }
    return final
  }

   function calculate_pnlBuy(item, from) {

    if (allsymbolPrices != null && allsymbolPrices!='' && item) {


    }
    else { return }

    let mySymbol = ''
    if (from == 'normal') {
      mySymbol = item.pair
    }
    else if (from == 'position') {
      mySymbol = item.sym
    }
    else {
      mySymbol = item.symbol
    }

    let multiplyFactor = 1

    if ((mySymbol).toString().slice(3, 6) == 'USD') {

    }

    else {
      let valForPrice
 valForPrice = allsymbolPrices.filter(e => e.sym.includes(((mySymbol).toString().slice(3, 6) + 'USD')))
      if ((mySymbol).toString().slice(3, 6) == 'JPY' || (mySymbol).toString().slice(3, 6) == 'CHF' || (mySymbol).toString().slice(3, 6) == 'CAD') {
        let main = allsymbolPrices

        valForPrice = main.filter(e => e.sym.toString() == "USD" + (mySymbol).toString().slice(3, 6))
        if (valForPrice.length > 0) {

          multiplyFactor = 1 / (parseFloat(valForPrice[0].sell_price).toFixed(5))
        }

      }
      else if ((mySymbol).toString().includes('USD')) {
        valForPrice = allsymbolPrices.filter(e => e.sym.includes(mySymbol))
        if (valForPrice.length > 0) {
          multiplyFactor = 1 / (parseFloat(valForPrice[0].sell_price).toFixed(5))
        }
      }
      else {

        valForPrice = allsymbolPrices.filter(e => e.sym.includes(((mySymbol).toString().slice(3, 6) + 'USD')))
        if (valForPrice.length > 0) {
          //cadusd and jpyusd 
          multiplyFactor = parseFloat(valForPrice[0].buy_price).toFixed(5)
        }
      }


      if ((mySymbol).toString().slice(3, 6) == 'JPY') {
        multiplyFactor = multiplyFactor * 100
      }
    }
    // console.log('imp values: '+ item.avg_buy_price);
    let val = ''
    if (from == 'normal') {

      val = ((CalculateIt(item.startamt, item.sell_price)) * 10 * multiplyFactor * parseFloat(item.lot_size).toFixed(2))
    }
    else if (from == 'position') {
      val = ((CalculateIt(item.avg, item.last_price)) * 10 * multiplyFactor * parseFloat(item.qty).toFixed(2))

    }
    else {

      val = ((CalculateIt(item.avg_buy_price, item.sell_price)) * 10 * multiplyFactor * parseFloat(item.buy_total_qty).toFixed(2))
    }


    return parseFloat(val).toFixed(2)
  }
  function calculate_pnlSell(item, from) {
    if (allsymbolPrices != null && allsymbolPrices!='' && item) {

    }
    else { return }
    let mySymbol = ''
    if (from == 'normal') {
      mySymbol = item.pair
    }
    else if (from == 'position') {
      mySymbol = item.sym
    }
    else {
      mySymbol = item.symbol
    }
    let multiplyFactor = 1
    if ((mySymbol).toString().slice(3, 6) == 'USD') {

    }
    else {
      let valForPrice
      // console.log('in sell of price:',allsymbolPrices)
      valForPrice = allsymbolPrices.filter(e => e.sym.includes(((mySymbol).toString().slice(3, 6) + 'USD')))
      if ((mySymbol).toString().slice(3, 6) == 'JPY' || (mySymbol).toString().slice(3, 6) == 'CHF' || (mySymbol).toString().slice(3, 6) == 'CAD') {
        let main = allsymbolPrices

        valForPrice = main.filter(e => e.sym.toString() == "USD" + (mySymbol).toString().slice(3, 6))
        if (valForPrice.length > 0) {

          multiplyFactor = 1 / (parseFloat(valForPrice[0].buy_price).toFixed(5))
        }
      }
      else if ((mySymbol).toString().includes('USD')) {
        valForPrice = allsymbolPrices.filter(e => e.sym.includes(mySymbol))
        if (valForPrice.length > 0) {

          multiplyFactor = 1 / (parseFloat(valForPrice[0].buy_price).toFixed(5))
        }
      }
      else {

        valForPrice = allsymbolPrices.filter(e => e.sym.includes(((mySymbol).toString().slice(3, 6) + 'USD')))
        if (valForPrice.length > 0) {

          multiplyFactor = parseFloat(valForPrice[0].sell_price).toFixed(5)
        }
      }
      if ((mySymbol).toString().slice(3, 6) == 'JPY') {
        multiplyFactor = multiplyFactor * 100
      }
    }

    if (mySymbol == 'USDJPY' && item.side == 'SELL') {

    }
    // console.log('pips :',from)
    let val = ''
    if (from == 'normal') {

      val = ((CalculateIt(item.startamt, item.buy_price)) * 10 * multiplyFactor * parseFloat(item.lot_size).toFixed(2) * -1)

    }
    else if (from == 'position') {//
      val = ((CalculateIt(item.avg, item.sell_price)) * 10 * multiplyFactor * parseFloat(item.qty).toFixed(2) * -1)

    }
    else {

      val = ((CalculateIt(item.avg_price_sell, item.buy_price)) * 10 * multiplyFactor * parseFloat(item.sell_total_qty).toFixed(2) * -1)

    }

    // console.log('pnl for sell: '+parseFloat(val).toFixed(2));
    return parseFloat(val).toFixed(2)
  }


  function CalculateIt(startprice = 0.0000, endprice = 0.0000) {


    startprice = parseFloat(startprice).toFixed(5);
    endprice = parseFloat(endprice).toFixed(5);
    let multiplier
    if (startprice.toString().indexOf('.') == 3) {
      multiplier = 0.01
    }
    else if (startprice.toString().indexOf('.') > 3) {
      multiplier = 0.1

    }
    else {
      multiplier = 0.0001
    }


    let pips = (parseFloat(endprice) - parseFloat(startprice)) / multiplier
        return pips.toFixed(2)
  }
  return (

    Loading ?
      <View style={{ flexDirection: 'column', justifyContent: 'center', height: 700, backgroundColor: colors.background }} ><LottieView source={require('../assets/loading.json')} style={{ width: 300, height: 200, alignSelf: 'center' }} autoPlay loop /></View>
      :
      <View style={[styles.container, { paddingTop: 40 }]}>
        <Image source={require('../assets/logo.png')} style={{ width: 200, height: 55, alignSelf: 'center', resizeMode: 'stretch' }} />
        {from == 'quant' || from == 'quantTop' ?
          <Text style={{ color: colors.selected, marginLeft: 15, fontSize: 17, marginVertical: 10 }}>Results Showing for <Text style={{ color: colors.hgl }}>{from == 'quant' ? sym : side == 'buy' ? 'LONG' : 'SHORT'}  </Text>ORDERS</Text>
          :
          <Text style={{ color: colors.selected, marginLeft: 15, fontSize: 17, marginVertical: 10 }}>Total Copiers : <Text style={{ color: colors.hgl }}>{Data && Data.length}</Text></Text>}


        {Data && Data.length > 0 ? (<FlatList
          data={Data}
          style={{ marginBottom: 10 }}
          keyExtractor={(item, index) => index + 'a'}
          renderItem={({ item, index }) => (

            <TouchableOpacity
              onPress={() => {
                if (clickedItem == item.position_id) {
                  setClickedItem('-1')
                }
                else {

                  setClickedItem(item.position_id)
                }
              }}
              style={{
                marginTop: '5%',
                width: '96%',
                alignSelf: 'center',
                borderColor: item.side == 'BUY' ? calculate_pnlBuy(item, 'normal') > 0 ? colors.profitcolor2
                  : colors.losscolor : calculate_pnlSell(item, 'normal') > 0 ? colors.profitcolor2 : colors.losscolor,

                backgroundColor:'#202B3F',// item.mode.toLowerCase()=='live'?'#1f4736':

                flexDirection: 'column',
                borderRightWidth: 2,
                borderLeftWidth: 2,
                shadowColor: '#1d4138', elevation: 5,
                borderRadius: 5,
                alignSelf: 'center',
                elevation: 5,



              }}>

              <View style={[{ paddingHorizontal: 10, paddingVertical: 15, marginBottom: 0, }
                // ,item.mode.toLowerCase()=='live'?{borderWidth:1,borderLeftWidth:0,borderRightWidth:0,borderColor:'green'}:{}
                ]}>



                <View
                  style={{

                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}>


                  <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
                    <View style={{ flexDirection: 'row', }}>
                      <Image
                        source={{ uri: 'http://' + getImg(item.pair) }}
                        resizeMode={'stretch'}
                        style={{
                          width: 20,
                          height: 20,
                          marginTop: 1, marginRight: 5,
                          alignSelf: 'center',
                        }}
                      />
                      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{item.pair} ,
                        <Text style={{ color: item.side == 'BUY' ? colors.profitcolor2 : colors.losscolor, fontWeight: 'normal' }}>{' '}{item.side.toLowerCase()}
                          {item.lot_size}</Text>
                      </Text>
                    </View>
                    <Text style={{ color: 'grey', marginTop: 5 }}>{parseFloat(item.startamt).toFixed(5)}{" -> "} {item.side == 'BUY' ? parseFloat(item.sell_price).toFixed(5) : parseFloat(item.buy_price).toFixed(5)}</Text>
                  </View>
                  <View style={{ flexDirection: 'column', justifyContent: 'flex-end', marginRight: 5 }}>
                    <Text style={{ color: 'grey', fontSize: 12, textAlign: 'right' }}>User ID : <Text style={{ color: '#fff', fontWeight: 'normal', fontSize: 13 }}>{item.uid}</Text></Text>
                    <Text style={{
                      color: item.side == 'BUY' ? calculate_pnlBuy(item, 'normal') > 0 ? colors.profitcolor2
                        : colors.losscolor : calculate_pnlSell(item, 'normal') > 0 ? colors.profitcolor2 : colors.losscolor,
                      fontWeight: 'bold'
                      , textAlign: 'right', fontSize: 16
                    }}>
                      {item.side == 'BUY' ? calculate_pnlBuy(item, 'normal') : calculate_pnlSell(item, 'normal')}
                    </Text>
                  </View>



                </View>
                {/* {global.demo=='true'? 
                <View style={{flexDirection: 'row',justifyContent: 'space-evenly'}}>

                  <Text style={{ color: '#fff' }}>Position ID : {item.botid}</Text>
                  <Text style={{ color: '#fff' }}>PIPS : {item.side == 'BUY' ? CalculateIt(item.price, item.sell_price)
                    :CalculateIt(item.price, item.buy_price)}</Text>
                  </View>
                  :null} */}


              
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>

                    <Text style={{ color: 'grey', fontSize: 13, textAlign: 'right' }}>Balance : <Text style={{ color: '#109e3a', fontWeight: 'bold', fontSize: 14 }}>{item.balance}</Text></Text>
                    <Text style={{ color: 'grey', fontSize: 12, textAlign: 'right' }}>Copier Bot ID : <Text style={{ color: 'grey', fontWeight: 'normal', fontSize: 13 }}>{item.copier_bot_id}</Text></Text>
                    <Text style={{ color: item.mode.toLowerCase()=='live'?'#fff':'grey',padding:2,paddingHorizontal:4,borderRadius:2, fontSize: item.mode.toLowerCase()=='live'?14:12, textAlign: 'left',backgroundColor: item.mode.toLowerCase()=='live'?'#109e3a':'transparent'}}>Mode : <Text style={{ color: item.mode.toLowerCase()=='live'?'#fff':'grey', fontWeight: 'bold', fontSize: item.mode.toLowerCase()=='live'?15:13 }}>{item.mode}</Text></Text>

                  </View>
                  {clickedItem == item.position_id ? <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <Text style={{ color: 'grey', fontSize: 12, textAlign: 'right' }}>Bot ID : <Text style={{ color: 'grey', fontWeight: 'normal', fontSize: 13 }}>{item.botid}</Text></Text>
                    <Text style={{ color: 'grey', fontSize: 12, textAlign: 'left' }}>#position-id : <Text style={{ color: 'grey', fontWeight: 'normal', fontSize: 13 }}>{item.position_id}</Text></Text>
                  </View>
                : null}
              </View>

              {/* {parseInt(closeNorDoubleClicked.split(',')[1]) == index ? (
                      <View
                        style={{
                          width: 120, height: 30, alignItems: 'center', justifyContent: 'center',alignSelf:'flex-end',marginRight:5,
                          backgroundColor: '#303a3a',
                          borderRadius: 2,
                        }}>
                        
                        <ActivityIndicator
                          size={'small'}
                          color={colors.selected}
                        />
                      </View>
                    ) : (
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                          console.log('value of bot id: '+item.botid);
                          if (
                            closeNorClicked.split(',')[0] == 'true' &&
                            parseInt(closeNorClicked.split(',')[1]) == index) {
                            setCloseNorDoubleClicked(closeNorClicked);
                            closeApi(item.botid, item.pair,item.position_id);
                            ToastAndroid.show(
                              'Closing Trade...',
                              ToastAndroid.SHORT,
                            );
                          } else {
                            setCloseNorClicked('true,' + index);
                          }
                        }}>
                     
                        <View
                          style={[
                            closeNorClicked.split(',')[0] == 'true' &&
                              index == parseInt(closeNorClicked.split(',')[1])
                              ? { backgroundColor: colors.profitcolor2 }
                              : { backgroundColor: '#303a3a', },
                            {

                              width: 120, height: 30, alignItems: 'center', justifyContent: 'center',alignSelf:'flex-end',marginRight:5,
                              // backgroundColor: '#303a3a',
                              borderRadius: 2,

                            },
                          ]}>
                          <Text
                            style={{
                              color: '#FFFFFF',
                              fontSize: 11,
                              //  fontWeight: 'bold',
                            }}>
                            Close Position
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ) } */}
              <AntDesign name={clickedItem == item.position_id ? 'up' : 'down'} color={'#fff'} size={14} style={{ alignSelf: 'flex-end', marginRight: 5, marginBottom: 5 }} />

            </TouchableOpacity>
          )}
        />)
          : (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text style={{ color: colors.selected }}>
                No Trades to show !{" "}
              </Text>
            </View>
          )}

      </View>

  );
}

export default CopiersScreen;



