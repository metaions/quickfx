import React, {Component} from 'react';
import {StyleSheet, Text,View,BackHandler,TouchableOpacity, SafeAreaView, ActivityIndicator} from 'react-native';
// import ByronKlineChart from 'react-native-kline';
// import {dispatchByronKline, KLineIndicator} from 'react-native-kline';
import axios from 'axios';
import IonIcons from 'react-native-vector-icons/Ionicons';
import global from './global'
import { colors } from 'react-native-swiper-flatlist/src/themes';
import theme from '../component/theme';
import { CommonActions } from '@react-navigation/native';


export default class KlineChart2 extends Component {
  isMount=false
  constructor(props) {
    super(props);
    this.ws = React.createRef();
    global.chartpair = this.props.pair
    
  }
  // const {data} = this.props.route
  state = {
    list: [],
    prevprice:0,
    currentprice:0,
    high:0,
    low:0,
    conn:true,
    one_m:false,
    five_m:false,
    fftn_m:true,
    thrty_m:false,
    one_hr:false,
    four_hr:false,
    four_hr:false,
    one_d:false,
    one_w:false,
    interval:'15m',
    from:this.props.from,
    game:this.props.game,
    pair:this.props.pair//('BTCUSDT'),
    ,indi:this.props.indi

    // pair:this.props.route.params.pair
  };
  
  
  onMoreKLineData = (params) => {};
  async initKlineChart() {   
    
    // this.setState({conn:'open'})
    console.log('https://fapi.binance.com/fapi/v1/klines?symbol='+this.state.pair+'&interval='+this.state.interval+'&limit=1000')
    const res = await axios
    ///fapi/v1/klines
      .get(
        'https://fapi.binance.com/fapi/v1/klines?symbol='+this.state.pair+'&interval='+this.state.interval+'&limit=1000',
        // 'https://www.okex.com/priapi/v5/market/candles?instId=BTC-USDT&bar=1m&limit=1000',
      )
      .catch((err) => {
        console.log('error'+err);
        return;
      });
    
    if (!res || !res.data || !res.data.length) {
      return;
    }
    const list = [];    
    for (let i = 0; i < res.data.length; i++) {
      const item = res.data[i];

      // 返回值分别为[timestamp,open,high,low,close,volume]
      list.push({
        amount: 0,
        open: Number(item[1]),
        close: Number(item[4]),
        high: Number(item[2]),
        id: parseInt(Number(item[0]) / 1000),
        low: Number(item[3]),
        vol: Number(item[5]),
      });
    }
    list.sort((l, r) => (l.id > r.id ? 1 : -1));
    this.setState({list:list});
    this.subscribeKLine();
  }

//   setTimePassed() {
//     this.setState({timePassed: true});
//  }
 

  subscribeKLine() {    
    let prevp=0;
    console.log('opening the socket+++++++++++++++++++'+this.state.interval+'  '+this.state.pair.toLowerCase())
    this.ws.current = new WebSocket('wss://fstream.binance.com/ws');//wss://fstream.binance.com/ws/
  //  ws.open()
    this.ws.current.onopen = () => {
      console.log('opened successfully'+this.state.interval)
      this.ws.current.send(JSON.stringify({ method: "SUBSCRIBE", params: [this.state.pair.toLowerCase()+"@kline_"+this.state.interval], id: 123 }
      )
      );
    };
    this.ws.current.onmessage = (ev) => { 


     
      // if(this.state.conn==='close'){
      //   
      // }
        var newjson = JSON.parse(ev.data);  
        
        
      try {
        
        const item = newjson.k;        
        if (item.s != global.chartpair)
        {
          
          return;
        }
        if(prevp==0){
          this.setState({prevprice:item.c})
          prevp=1;
        }else{
          this.setState({prevprice:this.state.currentprice})
          this.setState({currentprice:item.c})
        }
        // console.log('websocket' + item.c)
        if (global.myprice!=item.c)
{
  // console.log('pricebackend' + item.c)
      global.mypcp=parseFloat(item.c)
      
      global.myprice=parseFloat(item.c)
    }
        this.setState({high:item.h})
        this.setState({low:item.l})
        dispatchByronKline('update', [
          {
            amount: 0,
            open: Number(item.o),
            close: Number(item.c),
            high: Number(item.h),
            id: parseInt(Number(item.t) / 1000),
            low: Number(item.l),
            vol: Number(item.v),
          },
        ]);
      } catch (err) {}
    };


    this.ws.current.onclose = (e) => {
      
      this.setState({list:[]})
      global.mypcp=null     
      global.myprice=null
          };
          
  }
  
  componentDidMount() {
    
    if(this.state.from==='home'||this.state.from==='joined'){
      // this.setState({list:[]})
      if(this.ws.current){
        this.ws.current.close();
        this.setState({list:[]}) 
       }
       setTimeout(()=>{ this.initKlineChart()}, 1000); 
      // this.initKlineChart();
    }
    this.props.navigation.addListener('focus', this._onFocus);
    this.props.navigation.addListener('blur', this._onBlur);    
    this.isMount = true;  
      
  }

 componentWillUnmount(){
  if(this.ws.current){
    this.ws.current.close(); 
   }
   
  this.props.navigation.removeListener('blur', this._onBlur);
  this.props.navigation.removeListener('focus', this._onFocus);
  
 }

 _onFocus = () => {
  if(this.ws.current){
    this.ws.current.close();
    this.setState({list:[]}) 
   }
  console.log("=====_onFocus")      
    this.initKlineChart();  
};

_onBlur = () => {  
      console.log("=====_onBlur")
      this.setState({conn:false})  
      if(this.ws.current){
        this.ws.current.close(); 
       }
};





  colorCheck(){
      if(parseFloat(this.state.prevprice)===parseFloat(this.state.currentprice)){
        return '#fff';
      }else if(parseFloat(this.state.prevprice)>parseFloat(this.state.currentprice)){
        return '#FF6960';
      }else if(parseFloat(this.state.prevprice)<parseFloat(this.state.currentprice)){
        return '#00BD9A';
      }
  }


  SelectedIndex(val){
    this.setState({list:[]})
    if(val==='1m'){
        this.setState({interval:'1m'})
        this.setState({one_m:true,five_m:false,fftn_m:false,thrty_m:false,one_hr:false,four_hr:false,one_d:false,one_w:false,list:[]})
    }else if(val==='5m'){
      this.setState({interval:'5m'})
        this.setState({one_m:false,five_m:true,fftn_m:false,thrty_m:false,one_hr:false,four_hr:false,one_d:false,one_w:false,list:[]})
    }else if(val==='15m'){
      this.setState({interval:'15m'})
        this.setState({one_m:false,five_m:false,fftn_m:true,thrty_m:false,one_hr:false,four_hr:false,one_d:false,one_w:false,list:[]})
    }else if(val==='30m'){
      this.setState({interval:'30m'})
        this.setState({one_m:false,five_m:false,fftn_m:false,thrty_m:true,one_hr:false,four_hr:false,one_d:false,one_w:false,list:[]})
    }else if(val==='1hr'){
      this.setState({interval:'1h'})
      this.setState({one_m:false,five_m:false,fftn_m:false,thrty_m:false,one_hr:true,four_hr:false,one_d:false,one_w:false,list:[]})
  }else if(val==='4hr'){
    this.setState({interval:'4h'})
    this.setState({one_m:false,five_m:false,fftn_m:false,thrty_m:false,one_hr:false,four_hr:true,one_d:false,one_w:false,list:[]})
}else if(val==='1d'){
  this.setState({interval:'1d'})
  this.setState({one_m:false,five_m:false,fftn_m:false,thrty_m:false,one_hr:false,four_hr:false,one_d:true,one_w:false,list:[]})
}else if(val==='1w'){
  this.setState({interval:'1w'})
  this.setState({one_m:false,five_m:false,fftn_m:false,thrty_m:false,one_hr:false,four_hr:false,one_d:false,one_w:true,list:[]})
}



  }

  componentDidUpdate(prevProps,prevState) {
    // Typical usage (don't forget to compare props):        
    if (this.state.interval !== prevState.interval ) {
      
      // setTimeout(function(){
        if(this.ws.current){
          this.ws.current.close();
          this.setState({list:[]}) 
         }
        //  this.state.setTimeout(() => {
        //   this.setTimeout( () => {
        //    this.initKlineChart();
        //  },1000);
         setTimeout(()=>{ this.initKlineChart()}, 1000); 
      //  }
           
        //  }, 1000);
        // this.setState({timePassed: true})
      // }.bind(this), 100)
      // this.initKlineChart();

    }
    // if (this.state.interval !== prevState.interval) {
    //   // console.log('********** : '+this.state.interval)
    //   setTimeout(function(){
    //     this.initKlineChart();
    //     // this.setState({timePassed: true})
    //   }.bind(this), 2000)
    //   // this.initKlineChart();

    // }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>          

        {/* <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems:'flex-end'}}>
        <Text style={[styles.welcome,{textAlign:'left',color:this.colorCheck(),fontSize:35}]}>{this.state.currentprice==''?
        <ActivityIndicator size={18} color={global.appColor1} />: parseFloat(this.state.currentprice)} <Text style={{fontSize:20,color:'#fff'}}>USDT</Text></Text>
        <Text style={[styles.welcome,{color:global.appColor1,fontSize:25}]}>{this.state.pair}</Text>
        </View> */}
        {/* <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'flex-end'}}>
        <Text style={[styles.welcome,{textAlign:'left',marginVertical:0,color:this.colorCheck(),fontSize:15}]}>=<Text style={{color:'#fff',fontStyle:'italic'}}></Text> {this.state.currentprice==''?
        <ActivityIndicator size={18} color={global.appColor1} />: (parseFloat(this.state.currentprice)*global.cur_value).toFixed(2)} <Text style={{color:'#fff'}}>{global.cur_name} </Text> </Text>
         <View >
                        <Text style={{color:'#a9a9a9',fontSize:13,textAlign:'left'}}>24h Low <Text style={{color:'#f5f5f5'}}>{'\n'+ global.low_24}</Text></Text>
          </View>
         <View >
                        <Text style={{color:'#a9a9a9',fontSize:13,textAlign:'left'}}>24h High <Text style={{color:'#f5f5f5'}}>{'\n'+global.high_24}</Text></Text>
          </View>
        </View> */}
         {
        <View style={styles.box}>
          <TouchableOpacity onPress={()=>{
   this.SelectedIndex('1m')}}>
                    <View style={[styles.btn,{backgroundColor:this.state.one_m?'#FFA500':'#1F2630'}]}>
                        <Text style={{color:this.state.one_m?'#000':'#f5f5f5'}}>1m</Text>
                    </View>
          </TouchableOpacity> 
          <TouchableOpacity onPress={()=>{
   this.SelectedIndex('5m')}}>
          <View style={[styles.btn,{backgroundColor:this.state.five_m?'#FFA500':'#1F2630'}]}>
                        <Text style={{color:this.state.five_m?'#000':'#f5f5f5'}}>5m</Text>
                    </View>
          </TouchableOpacity> 
          <TouchableOpacity onPress={()=>{
   this.SelectedIndex('15m')}}>
          <View style={[styles.btn,{backgroundColor:this.state.fftn_m?'#FFA500':'#1F2630'}]}>
                        <Text style={{color:this.state.fftn_m?'#000':'#f5f5f5'}}>15m</Text>
                    </View>
          </TouchableOpacity> 
          <TouchableOpacity onPress={()=>{
   this.SelectedIndex('30m')}}>
          <View style={[styles.btn,{backgroundColor:this.state.thrty_m?'#FFA500':'#1F2630'}]}>
                        <Text style={{color:this.state.thrty_m?'#000':'#f5f5f5'}}>30m</Text>
                    </View>
          </TouchableOpacity> 
          <TouchableOpacity onPress={()=>{
   this.SelectedIndex('1hr')}}>
          <View style={[styles.btn,{backgroundColor:this.state.one_hr?'#FFA500':'#1F2630'}]}>
                        <Text style={{color:this.state.one_hr?'#000':'#f5f5f5'}}>1hr</Text>
                    </View>
          </TouchableOpacity> 
          <TouchableOpacity onPress={()=>{
   this.SelectedIndex('4hr')}}>
          <View style={[styles.btn,{backgroundColor:this.state.four_hr?'#FFA500':'#1F2630'}]}>
                        <Text style={{color:this.state.four_hr?'#000':'#f5f5f5'}}>4hr</Text>
                    </View>
          </TouchableOpacity> 
          <TouchableOpacity onPress={()=>{
   this.SelectedIndex('1d')}}>
          <View style={[styles.btn,{backgroundColor:this.state.one_d?'#FFA500':'#1F2630'}]}>
                        <Text style={{color:this.state.one_d?'#000':'#f5f5f5'}}>1D</Text>
                    </View>
          </TouchableOpacity> 
        
        </View>
          }
        {this.state.conn?
          this.state.indi=='inner'?
          <ByronKlineChart
          style={{flex: 1,}}
          datas={this.state.list}       
          indicators={[KLineIndicator.ChildMACD,KLineIndicator.ChildRSI,KLineIndicator.MainBOLL]}                       
          mainBackgroundColor={'#1F2630'}
          pricePrecision={3}
          
        />
      :
      this.state.indi=='down'?      
      <ByronKlineChart
          style={{flex: 1,}}
          datas={this.state.list}       
          indicators={[KLineIndicator.ChildRSI,KLineIndicator.MainBOLL]}             
          mainBackgroundColor={'#1F2630'}
          pricePrecision={3}
          
        />
        :
        <ByronKlineChart
          style={{flex: 1,}}
          datas={this.state.list}                
          indicators={[KLineIndicator.ChildRSI,KLineIndicator.MainMA,KLineIndicator.MainBOLL]}   
          pricePrecision={3}
          
          mainBackgroundColor={'#1F2630'}
        />
        :null
      }
      </SafeAreaView>

      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,       
    backgroundColor: '#171e26',    
  },
  box: {
    width:'100%',
    flexDirection: 'row',  
    justifyContent: 'space-around',
    alignItems: 'center'
    
  },
  btn:{ 
    marginTop:5,
    width:'100%',           
    paddingVertical:2,
    paddingHorizontal:15,    
},
    welcome: {
    fontSize: 20,
    color:'#fff',
    textAlign: 'center',
    margin: 5,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});