import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, ImageBackground, TextInput, ToastAndroid } from "react-native";
import Feather from 'react-native-vector-icons/Feather'
import global from "./global";
import { NavigationRouteContext, useFocusEffect, useIsFocused, useTheme } from '@react-navigation/native';
import { ProgressBar } from 'react-native-paper';
function CopyBox({ name, dt, description, profit, min, max, uid, copyid, rank, rankimg, loss, copiers, comm, img
    , navigation, callBackFn,iscopy }) {

    const { colors } = useTheme();


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
            imageStyle={iscopy==0?{}:{borderWidth:1,borderColor:colors.binanceylw3,borderRadius:5}}
            source={require('../assets/Fxbot/copy/listBoxWithLines.png')}
            style={{
                height: 220, width: '98%', alignSelf: 'center',
                backgroundColor: 'transparent', marginBottom: 10, marginLeft: '1%'
            }} >
            <TouchableOpacity activeOpacity={0.4} style={{width: '100%',}}
                // onPress={() => {onPress}}
                onPress={() => { callBackFn() }}

            >
                <View style={{
                    flexDirection: 'row', marginHorizontal: 8, marginTop: 10,
                    height: 65, justifyContent: 'space-between',width: '100%',
                }}>
                    <View style={{ marginLeft: 0, marginTop: 5, flexDirection: 'row', width: '80%' }}>
                        <Image source={img == '' ? require('../assets/logom.png') : { uri: img }} style={{ width: 50, height: 50, borderRadius: 25 }} />
                        <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                            <Text style={{ color: colors.selected, fontSize: 16, fontFamily: global.bold }} numberOfLines={1}>{name}</Text>
                            <View style={{
                                marginLeft: 0, marginTop: 2, flexDirection: 'row',
                                alignItems: 'center', color: colors.selected
                            }}>
                                <Image source={rankimg == '' ? require('../assets/botz/master/star.png') : { uri: rankimg }}
                                    style={{ width: 10, height: 10 }} />
                                <Text style={{ marginLeft: 5, color: colors.selected }}>{rank}</Text>
                            </View>

                        </View>
                    </View>
                  
                </View>


                <View style={{
                    justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center',
                    width: '94%', alignSelf: 'center', height: 56, marginTop: 2,
                }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '50%' }}>
                        <Text style={{ color: colors.selected, fontSize: 17, textAlign: 'center', fontFamily: global.bold }} allowFontScaling={false}>$ {min}</Text>
                        <Text style={{ fontSize: 10, color: 'grey' }} allowFontScaling={false}>MIN. REQUIRED</Text>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '50%' }}>
                        <Text style={{ color: colors.selected, fontSize: 17, textAlign: 'center', fontFamily: global.bold }} allowFontScaling={false}>$ {max}</Text>
                        <Text style={{ fontSize: 10, color: 'grey' }} allowFontScaling={false}>MAX. REQUIRED</Text>
                    </View>
                   
                </View>

                <View style={{
                    justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center',
                    alignSelf: 'center', width: '92%', height: 85,
                }}>

                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '26%' }}>
                        <Text style={{ fontSize: 10, color: colors.selected }} allowFontScaling={false}>COPIERS</Text>
                        <Text style={{ color: colors.selected, fontSize: 17, textAlign: 'center', fontFamily: global.bold }} allowFontScaling={false}>{copiers}</Text>

                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '48%' }}>
                        <Text style={{ fontSize: 14, color: colors.selected }} allowFontScaling={false}>GAIN</Text>
                        <Text style={{ color: colors.binanceylw3, fontSize: 20, fontFamily: global.bold }} 
                        allowFontScaling={false}><Text style={{ color: colors.selected}}>$ </Text>{parseInt(profit)}</Text>

                    </View>

                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '26%' }}>
                        <Text style={{ fontSize: 10, color: colors.selected }} allowFontScaling={false}>COMMISSION</Text>
                        <Text style={{ color: colors.selected, fontSize: 17, fontFamily: global.bold }} allowFontScaling={false}>{parseFloat(comm).toFixed(2)} %</Text>

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

export default CopyBox;