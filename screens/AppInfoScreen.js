import { View, Text ,Image,ImageBackground,StyleSheet} from 'react-native'
import React from 'react'
import global from '../component/global'
import LottieView from 'lottie-react-native';
export default function AppInfoScreen() {
  return (
    <ImageBackground resizeMode="stretch"
    style={styles.container}>
         {/* <Image source={require('../assets/Aeon/logoA.png')} resizeMode="stretch"
    style={styles.imgLogo}/> */}
         <Image source={require('../assets/Aeon/banner.png')} resizeMode="stretch"
    style={styles.img}/>
        {/* <LottieView
          source={require('../assets/loading.json')}
          style={{ width: 300, height: 300, alignSelf: 'center',marginTop:'20%' }}
          autoPlay
          loop
        /> */}
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        // justifyContent: 'center',
    },
    img:{
      width:350,
      height:400,
      marginTop:'20%'
    },
    imgLogo:{
      width:200,
      height:200
    }
})