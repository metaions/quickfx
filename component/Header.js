import React from 'react';

import {
 View,
 Text,Image
} from 'react-native';

import {FONTS} from "../constants";

const Header =({containerStyle,title,leftComponent,rightComponent})=>{
    return(
        <View style={{flexDirection:'row',...containerStyle}}>
            {console.log("************",title)}
             {/* {leftComponent}  */}
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          {

          }
            <Image source={require('../assets/Aeon/logo.png')} resizeMode="stretch" 
            style={{height:50,width:110,left:20}}
            />
   
            </View>
            {rightComponent}
        </View>
    )
}

export default Header;