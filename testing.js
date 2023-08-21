import React from "react";
import {View, Text, TouchableOpacity,Image,StyleSheet} from 'react-native';

const testing = ()=>{

    return(
        <View style={styles.container}>
            <View style={styles.box}>
                <View style={styles.boxInner}>
                    
                </View>
              
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'green'
    },
    box:{
        width:300,
        height:300,
        backgroundColor:'red'
    },
    boxInner:{

    },
    boxOuter:{
       
    }
})

export default testing