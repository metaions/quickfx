import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, ImageBackground, TextInput, ToastAndroid } from "react-native";
import Feather from 'react-native-vector-icons/Feather'
import global from "./global";


function CopyBoxSecond({ name, description, profit, min, max, uid, copyid }) {




    // var  check_orientation = orientation
    // var unixTime = parseFloat(timeLeft);
    // var matchDate = new Date(unixTime*1000)
    // var now_date = new Date()

    // var diff = Math.abs(matchDate-now_date); //in milliseconds
    // matchDate = new Date(diff*1000).toLocaleDateString
    // console.log("Time Lefts " + diff)
    return (
        // <View style={{  marginVertical: 1, height: 'auto', marginVertical: 5 }}>
        <ImageBackground 
                    resizeMode={'stretch'}
                    source={require('../assets/botz/cardProfit.png')} 
                     style={{height:200,width:'100%',
                    backgroundColor:'transparent'}} >
            <TouchableOpacity activeOpacity={0.4}
                onPress={() => {
                    let url = global.BASE_URL + "css_mob/Copytrade.aspx?uid=" + uid + "&copyid=" + copyid
                    console.log(url)
                    fetch(url)
                        .then(item => item.json())
                        .then(CData => {
                            console.log(CData)
                            if (CData.success === 'true') {
                                ToastAndroid.show("Copied Successfully", ToastAndroid.LONG)

                            } else {
                                ToastAndroid.show(CData.success, ToastAndroid.SHORT)
                            }

                        })
                }}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', }}>

                    <View style={{ flexDirection: 'row', backgroundColor: 'transparent', margin: 10, borderRadius: 20 }}>
                        <Image source={require('../assets/iconf/icon1s.png')} style={{ width: 40, height: 40 }} />
                        <View style={{ marginLeft: 10, marginTop: 5, }}>
                            <Text>{name}</Text>
                            <Text>{description}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column', marginVertical: 20, marginRight: 10, alignItems: 'center' }}>
                        <Text style={{ color: '#FFFFFF', backgroundColor: '#1a7202', padding: 10, width: 125, textAlign: 'center', borderRadius: 20 }}>Start Copying</Text>
                    </View>

                </View>
                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', width: '100%',
                 height: 50, backgroundColor:'red',zIndex:9999}}>
                    <View style={{ backgroundColor: '#1a7202', flex: 2, justifyContent: 'center' }}>
                        <Text style={styles.textStyle}>GAIN</Text>
                        <Text style={styles.textStyle2}>{profit}</Text>
                    </View>
                    <View style={{ backgroundColor: '#002140', flex: 2, justifyContent: 'center' }}>
                        <Text style={styles.textStyle}>Min</Text>
                        <Text style={styles.textStyle2}>{min}</Text>
                    </View>
                    <View style={{ backgroundColor: '#2f2f2f', flex: 2, justifyContent: 'center' }}>
                        <Text style={styles.textStyle}>Max</Text>
                        <Text style={styles.textStyle2}>{max}</Text>
                    </View>
                </View>
            </TouchableOpacity>

            </ImageBackground>

    )
}




const styles = StyleSheet.create(
    {
        textStyle: {
            textAlign: 'center', color: '#FFFFFF'
        },
        textStyle2: {
            textAlign: 'center', color: '#FFFFFF', fontWeight: 'bold'
        },
        container: {
            backgroundColor: 'white',
            padding: 10,
            marginTop: 15,
            borderRadius: 10,
            marginLeft: 8,
            marginRight: 8
        },
        container_horizontal: {
            backgroundColor: 'white',
            padding: 10,
            marginTop: 2,
            width: 370,
            height: 'auto',
            borderRadius: 10,
            marginLeft: 8,
            marginRight: 10,
        },
        team1: {
            color: 'black',
            fontSize: 13,
            marginTop: 12,
            marginLeft: 5,

        },
        teamSize: {
            width: 20,
            marginTop: 5,
            height: 30,
            marginLeft: 5
        },
        team2: {
            color: 'black',
            fontSize: 13,
            marginTop: 12,
            marginRight: 5,

        }
    }



)

export default CopyBoxSecond;