import React from 'react';
import { Text,View } from 'react-native';
import { ThemeProvider, useFocusEffect, useIsFocused,useTheme,useLinkTo,useNavigation } from '@react-navigation/native';
const MetaWall=()=>{
    React.useEffect(() => {
      
      console.log('Enter of MetaWall useeffect');
    
      return () => {
        console.log('out of MetaWall useeffect');
      }
    }, [])
    
    useFocusEffect(
        React.useCallback(() => {
                console.log('in focus effect of MetaWall');               
          return  () => {console.log('return of focus MetaWall')};
        }, [])
      );
    return (
        <View style={{flex: 1}}>
            <Text style={{color:'#fff'}}>hiii MetaWall</Text>
        </View>
    )
}
export default MetaWall;