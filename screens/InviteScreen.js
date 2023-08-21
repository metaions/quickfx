/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import * as React from 'react';

import { View, Text, Button, Dimensions, Switch, TouchableOpacity, ImageBackground, Linking, StyleSheet, RefreshControl, Image, StatusBar, FlatList, ScrollView, TextInput, ActivityIndicator, ToastAndroid, ImageBackgroundBase } from 'react-native';
import { useFocusEffect, useIsFocused, useTheme } from '@react-navigation/native';
import styles from "../component/styles";

import global from '../component/global'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { captureScreen } from 'react-native-view-shot';
import Share from 'react-native-share';
var RNFS = require('react-native-fs');


const HelpScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const [Uid, setUid] = React.useState('');
    const [Img, setImg] = React.useState('');
    const [imageURI, setImageURI] = React.useState('');
    const [savedImagePath, setSavedImagePath] = React.useState('');
    useFocusEffect(
        React.useCallback(() => {
            setTimeout(async () => {
                // setIsLoading(false);
                let uid;
                uid = null;
                let thm = null;
                let code = null;
                uid = await AsyncStorage.getItem('user_id')
                setUid(uid)
                callImg(uid)
            });

            //we can add delay time here before callApi() i.e ' },1000,callApi());' //
        }, [])
    );
    var imgurl = "https://ibot365.com/app.aspx";

    let shareCode = {
        // title: "My Referral Id",//string
        message: global.refurl //+ " , Use My Referal Code : \"" + Uid+"\""//string        
    };

    let shareCodeProm = {
        message: global.refurlProm //string           

    };

    React.useEffect(() => {

    }, [Img])

    const callImg = (Uid) => {
        console.log("https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl=http://snap.botz.trade/s/r.aspx?spid=" + Uid)
        setImg("https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl=http://snap.botz.trade/s/r.aspx?spid=" + Uid)
    }



    const takeScreenShot = () => {
        // To capture Screenshot
        captureScreen({
            // Either png or jpg (or webm Android Only), Defaults: png
            format: 'jpg',
            // Quality 0.0 - 1.0 (only available for jpg)
            quality: 0.8,
        }).then(
            //callback function to get the result URL of the screnshot
            (uri) => {
                setSavedImagePath(uri);
                setImageURI(uri);
                console.log(shareCodeProm)
                var ss = shareCodeProm.message.toString()

                RNFS.readFile(uri, 'base64').then((res) => {
                    let urlString = 'data:image/jpeg;base64,' + res;
                    let options = {
                        title: 'Refer & Earn',
                        message: ss,
                        url: urlString,
                        type: 'image/jpeg',
                    };
                    Share.open(options)
                        .then((res) => {
                            console.log(res);
                        })
                        .catch((err) => {
                            err && console.log(err);
                        });
                });
            },
            (error) => console.error('Oops, Something Went Wrong', error),
        );
    };




    return (

        <View style={[{ backgroundColor: colors.background, height: 900,flex:1 }]}>


            {/* <View  style={{width:'100%',alignSelf: 'center',paddingVertical:'8%',
            borderRadius:5,flexDirection:'column',justifyContent:'flex-end'}}> */}
            <View style={{ width: '100%', height:'50%', marginBottom: 100, paddingTop: 70, alignSelf: 'center',
            backgroundColor:'#19dc51',borderBottomEndRadius:30,borderBottomStartRadius:30,zIndex:9999 }}>
                       
                {/* <ScrollView style={{flex:1,top:20}}> */}
                {/* <Image
                source={require('../assets/logofx.png')}
                style={{
                  marginTop: 10, marginBottom: 20,
                  alignSelf: 'center',
                  width: 180,
                  height: 55,
                }}
                resizeMode="stretch"
              /> */}
                <Text allowFontScaling={false} style={{ textAlign: 'center', fontSize: 22, color: colors.selected,fontFamily:global.appFontB }}>{'Earn Level Commission by'.toUpperCase()}</Text>
                <Text allowFontScaling={false} style={{ textAlign: 'center', fontSize: 17, color: colors.selected, fontFamily: global.appFontM,marginTop:10 }}>{'Sharing My Invite Code'.toUpperCase()}</Text>
                {/* <ImageBackground source={require('../assets/qrcode-bg.png')} resizeMode='stretch' style={{width:"100%",height:300,paddingHorizontal:30,marginLeft:30,marginTop:30}}> */}
              
                {/* </ImageBackground> */}
            
                

                {/* </ScrollView> */}
            </View>
            <View style={{flexDirection:'row',justifyContent: 'center',alignItems: 'center',marginTop:'-70%',zIndex:9999}}>
                <ImageBackground source={require('../assets/Aeon/bgblack.png')} resizeMode="stretch" style={{flexDirection:'column',justifyContent: 'center',alignItems: 'center',height:300,width:300,}}>
                       {Uid === '' ?
                        <Text allowFontScaling={false} style={{ textAlign: 'center',marginRight:40,marginBottom:10 }}><ActivityIndicator size={30} color={colors.selected} /></Text>
                        :
                        <Text allowFontScaling={false} style={[styles.mheading, { fontSize: 24, color: '#fff',textTransform:'uppercase',marginBottom:10 }]}>{Uid}</Text>
                    }
                    
                    <Image source={{ uri: Img }} 
                    style={{ width: 150, height: 150, alignSelf: 'center',marginRight:0,borderRadius:10,}} resizeMode={'stretch'} />
                    
                 {/* <ImageBackground source={require('../assets/botz/QrCode.png')} resizeMode="stretch" style={{width: 160, height: 160,alignSelf: 'center',marginRight:40,bottom:20,}}>
                    </ImageBackground> */}

                </ImageBackground>
                </View>
            <View style={{top:50}}>
            <TouchableOpacity onPress={() => { takeScreenShot() }}
                    activeOpacity={0.8}
                    style={{
                        paddingHorizontal: 5, justifyContent: 'center',
                        width: '94%', alignSelf: 'center', alignItems: 'center', paddingVertical: 5,
                        marginTop: 40,
                    }}>
                    <View 
                    style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5,
                    justifyContent: 'space-evenly', width: '100%',height:60,backgroundColor:'#011315',borderRadius:50 }}>
                        <Text allowFontScaling={false} style={[styles.mheading, {textTransform:'uppercase', 
                        textAlign: 'center', color: '#fff', fontFamily: global.appFontM, fontSize: 14,marginLeft:10 }]}>Share Promotional Message</Text>
                        
                            <Image source={require('../assets/share-icon.png')} 
                            style={{ marginRight:15,width: 28, height: 28, alignSelf: 'center',tintColor:'#fff' }} resizeMode={'stretch'} />
                    </View>

                    
                </TouchableOpacity>
            </View>





            {/* </View> */}









        </View>
    );
}


export default HelpScreen;
