import React from 'react';
// import DateTimeDisplay from './DateTimeDisplay';
import { useCountdown } from './useCountdown';
import {Text,View,TouchableOpacity,ImageBackground,ToastAndroid} from 'react-native'
import global from './global';
const ExpiredNotice = () => {
  return (
    <View >
      {/* <Text>Expired!!!</Text>
      <Text>Please select a future date and time.</Text> */}
    </View>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds ,color}) => {
  return (
    <View style={{padding:5,backgroundColor:'#41c81d',width:150,alignSelf:'center',alignItems: 'center'
    ,borderBottomRightRadius:10,borderBottomLeftRadius:10,marginTop:0}}>
        {/* <Text>timer is:</Text> */}
        <Text style={{color: color,fontWeight:'bold'}}><Text style={{color: 'white',fontSize:12}}>Wait for : </Text>{days}:{hours}:{minutes}:{seconds}</Text>
    </View>
  );
};

const CountdownTimer = ({ targetDate,navigation,color }) => {
  // console.log('date: '+targetDate);
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return  <TouchableOpacity style={{ width: '100%' }}
    onPress={() => {
      if (global.AMT != 0) {
        navigation.navigate('SuperBotScreen');
      } else {
        ToastAndroid.show(
          'Please Activate Your Id First',
          ToastAndroid.SHORT,
        );
      }
    }}
  >
    <ImageBackground source={require('../assets/botz/infi/infitity_bot.png')} style={{ width: '100%', height: 115 }} resizeMode={'cover'} >
   
     </ImageBackground>
     </TouchableOpacity>;
  }
   else {
    return (
      <TouchableOpacity style={{ width: '100%' }}
      onPress={() => {
        if (global.AMT != 0) {
          navigation.navigate('SuperBotScreen');
        } else {
          ToastAndroid.show(
            'Please Activate Your Id First',
            ToastAndroid.SHORT,
          );
        }
      }}
    >
      <ImageBackground source={require('../assets/botz/infi/infitity_bot.png')} style={{ width: '100%', height: 115 }} resizeMode={'cover'} >
       </ImageBackground>
      <ShowCounter
      // returnFn={'Wait'}
      color={color}
      days={days}
      hours={hours}
      minutes={minutes}
      seconds={seconds}
      />
       </TouchableOpacity>
    );
  }
};

export default CountdownTimer;

