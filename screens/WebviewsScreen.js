/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
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
    ScrollView,
    Animated,
    TouchableOpacity,
    FlatList,
    ToastAndroid,
    StatusBar,
    ActivityIndicator
} from 'react-native';

import { WebView } from 'react-native-webview';


export default function WebScreen({ route, navigation }) {
    const {colors} = useTheme();
    const [url, setUrl] = useState(route.params?.url);
    const [Ld, setLd] = useState(true);
    const isFocused = useIsFocused();


    useEffect(() => {
        console.log("nav in webview1" + route.params?.url);

        setUrl(route.params?.url);
        setTimeout(()=>{
                setLd(false)
        },1500)
    }, [isFocused])

    var handleWebViewNavigationStateChange = newNavState => {
console.log(url);
        const { url } = newNavState;
        if (!url) return;


        if (url.includes('thanks1.aspx') || url.includes('login.aspx')) {
            if (url.includes('success')) {
                
            }
            else if (url.includes('login.aspx')) {
            
            }
            else {
                // ToastAndroid.show("Business Listed Successfully... ", ToastAndroid.SHORT);
            }
            setUrl(url)
            navigation.navigate('Home');

        }
        if (url.includes('close.aspx')) {
            setUrl(url)
            navigation.navigate('Home');






        }
    };

    function renderLoadingView()
{
    return (
        <View style={{height:'100%',backgroundColor:'#000',justifyContent:'center'}}>
        <ActivityIndicator
           animating = {true}
           color = '#fff'
           size = "large" 
        //    style={{position: 'absolute',top:'50%',left:'45%'}}          
           hidesWhenStopped={true} 
        />
        </View>
    );
    
        }
    return <>
    <WebView renderLoading={renderLoadingView} startInLoadingState={true} source={{ uri: url }}
        onNavigationStateChange={handleWebViewNavigationStateChange}
        style={{ marginTop: 0 }} />
        </>
}