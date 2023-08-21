import React, { useEffect } from "react";
import {View,Animated,Dimensions,StatusBar,StyleSheet,Text,Easing,Image,ImageBackground} from "react-native";
import * as Animatable from 'react-native-animatable';
const {width,height}=Dimensions.get('window');
 function SplashScreen(){
  const imgref = React.useRef();
  const anim = new Animated.Value(0);
  const zoomOut = {
    0: {
      opacity: 1,
      scale: 1,
    },
    0.5: {
      opacity: 1,
      scale: 1,
    },
    1: {
      opacity: 0,
      scale: 20,
    },
  };
  const zoomOutr = {
    0: {
      opacity: 1,
      scale: 0,
    },
    0.5: {
      opacity: 1,
      scale: 20,
    },
    1: {
      opacity: 1,
      scale: 40,
    },
  };
  
  const fadeIn = {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  };
  useEffect(() =>{
      Animated.timing(anim,{
        toValue:1,
        duration:3000,
        delay:6000,
        Easing: Easing,
        useNativeDriver:true
      }).start();

  },[])

React.useEffect(()=>{
  imgref.current?.zoomOutr
            setTimeout(() =>{
                imgref.current?.zoomOutr
            },5500)
},[])
    const translateY= anim.interpolate({
      inputRange:[0,1],
      outputRange:[-(height * 2),0]
    });
    const translateX= anim.interpolate({
     inputRange:[0,1],
     outputRange:[-(height * 2),0]
   });
   
     return (
        <ImageBackground source={require('../../assets/splashnew/MetaF.png')} resizeMode='stretch' style={styles.container}>
            <StatusBar backgroundColor="transparent" translucent barStyle="light-content" />
            <Animatable.Image animation={zoomOut} useNativeDriver='true' iterationCount={1}   direction="reverse" delay={500} Easing='linear' source={require('../../assets/logom.png')} resizeMode="stretch" style={{height:130,width:120,top:40}}/>
            <Animatable.Image animation={zoomOutr} useNativeDriver='true' iterationCount={1}   direction="alternate" delay={5500} Easing='linear' source={require('../../assets/logom.png')} resizeMode="stretch" style={{height:130,width:120,top:72,position:'absolute'}}/>
            <View style={{flexDirection:'row',top:70}}>
            <Animatable.Text animation="fadeIn" useNativeDriver='true' iterationCount='infinite'   direction="alternate" delay={1100} style={{color:'#282645',fontSize:60}}>M</Animatable.Text>
             <Animatable.Text animation="fadeIn" useNativeDriver='true' iterationCount='infinite'  direction="alternate"  delay={1170} style={{color:'#282645',fontSize:60}}>E</Animatable.Text>
             <Animatable.Text animation="fadeIn" useNativeDriver='true' iterationCount='infinite'  direction="alternate"  delay={1220} style={{color:'#282645',fontSize:60}}>T</Animatable.Text>
             <Animatable.Text animation="fadeIn" useNativeDriver='true' iterationCount='infinite'  direction="alternate"  delay={1270} style={{color:'#282645',fontSize:60}}>A</Animatable.Text>
             <Animatable.Text animation="fadeIn" useNativeDriver='true' iterationCount='infinite'  direction="alternate"  delay={1320} style={{color:'#282645',fontSize:60}}>F</Animatable.Text>
             <Animatable.Text animation="fadeIn" useNativeDriver='true' iterationCount='infinite'  direction="alternate"  delay={1270} style={{color:'#282645',fontSize:60}}>X</Animatable.Text>
             {/* <Animatable.Text animation="fadeIn" useNativeDriver='true' iterationCount='infinite'  direction="alternate"  delay={1420} style={{color:'#282645',fontSize:60}}>S</Animatable.Text> */}
             
           </View>
           {/* <View style={{top:40}}>
           <Animatable.Image animation={fadeIn} useNativeDriver='true' iterationCount={1}   direction="alternate" delay={1500} Easing='linear'  source={require('../../assets/splash/cut1.png')} resizeMode="stretch" style={{top:30,position:'absolute',left:-160,zIndex:-9999}}/>
           <Animatable.Image animation={fadeIn} useNativeDriver='true' iterationCount={1}   direction="alternate" delay={1500} Easing='linear' source={require('../../assets/splash/cut2.png')} resizeMode="stretch" style={{top:0,position:'absolute',top:340,left:-108,zIndex:-9999}}/>
           <Animatable.Image animation={fadeIn} useNativeDriver='true' iterationCount={1}   direction="alternate" delay={1500} Easing='linear' source={require('../../assets/splash/cut3.png')} resizeMode="stretch" style={{top:-20,left:155,zIndex:-9999}}/>
           </View> */}
            {/* <Animated.View style={[styles.circle,{transform:[{translateX},{translateY}]}]}> 
             
          
           
            </Animated.View> */}
           
         </ImageBackground>
     );
  
 
}

const styles = {
  container: {
    flex: 1,
    backgroundColor:'white',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'column',
  },
  circle: {
    width: height * 2,
    height:height * 2,
    borderRadius:height,
    backgroundColor:'#5d54ab',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'column',
    flexGrow:1,
  }
};

export default SplashScreen;

