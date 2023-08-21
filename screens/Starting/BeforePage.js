import * as React from 'react';
import {
    View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, BackHandler,
    StatusBar, Dimensions, ActivityIndicator, Image, Platform, TextInput, ToastAndroid
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import CountryPicker from "react-native-country-codes-picker/components/CountryPicker";
import { AuthContext } from '../../component/context';
import { ThemeProvider, useFocusEffect, useIsFocused, useTheme } from '@react-navigation/native';
import global from '../../component/global';

const BeforePage = ({ navigation }) => {

    const bginput = '#2a3340'
    const plc = '#666d80'
    const { colors } = useTheme();


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }} >
            {/* <StatusBar backgroundColor={'transparent'} translucent={true} barStyle={"dark-content"} /> */}
            <Image source={require('../../assets/Aeon/logo.png')} resizeMode={'stretch'}
                style={{ width: 180, height: 80, }}
            />
            
            <Text style={{ marginTop: 30, fontSize: 26, color: colors.profitcolor2,fontFamily:global.appFontR,textTransform:'uppercase' }}>
                Welcome to {global.appName}</Text>
            <Text style={{ fontSize: 18, marginTop: 10, color: '#8E99BA',fontFamily:global.appFontR }}>Join the world's 1st Forex Trading Bot</Text>
            <TouchableOpacity
            onPress={()=>{navigation.navigate('SignInScreen')}} 
            style={{
                width: '74%', paddingVertical: 15, backgroundColor:colors.profitcolor2,
                alignItems: 'center', justifyContent: 'center',borderRadius:30,marginTop:80
            }}>
                <Text style={{fontFamily:global.appFontB,fontSize:20,color:'#fff',textTransform:'uppercase'}}>Sign Up / Log In</Text>
            </TouchableOpacity>
        </View>
    )
}

export default BeforePage