
import React, { useState, useEffect } from 'react';
import {
    ThemeProvider,
    useFocusEffect,
    useIsFocused,
    useTheme,
    useLinkTo,
  } from '@react-navigation/native';
  import LottieView from 'lottie-react-native';
import {
    View,
    Text,
    ScrollView,
    Animated,
    TouchableOpacity,
    FlatList,
    ToastAndroid,
    StatusBar,
    ActivityIndicator
} from 'react-native';
// import Orientation from 'react-native-orientation';
import KlineChart2 from '../component/KlineChart2'
import Entypo from 'react-native-vector-icons/Entypo'
import WebChart from '../component/WebChart'
export default function FullChart({ route, navigation }) {
    const {colors} = useTheme();
    const sym  = route.params?.sym;
    console.log(sym);
    // const [sym, setSym] = useState(route.params?.sym);
    const [Ld, setLd] = useState(true);
    const isFocused = useIsFocused();

    // useEffect(() => {
    //     // Orientation.lockToLandscape();
    //     // Orientation.addOrientationListener(this._orientationDidChange);
    //     return () => {
    //         Orientation.lockToPortrait()
    //         Orientation.removeOrientationListener();
    //     }
    // }, [])

   return(
        <View style={{flex:1,paddingTop:20}}>
           <View style={{flexDirection: 'row',justifyContent: 'space-between',paddingHorizontal:15}}>
            <Text style={{fontSize:22,color:'#fff'}}>{sym}</Text>
            <TouchableOpacity style={{zIndex:999}}          
            onPress={() => {navigation.pop()}}         >
                <Entypo  name={"resize"} size={28} color={colors.selected} />
         </TouchableOpacity>
           </View>
        <WebChart sym={sym} navigation={navigation} from={'home'} indi={'inner'} />
        </View>
   )
   }
 