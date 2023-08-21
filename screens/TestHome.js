import React, { useEffect } from "react";
import {View, Text, TouchableOpacity} from 'react-native'

function TestHome(){
    let interval=''
    React.useEffect(() => {
     myInterval()
    
    return () => {
        clearInterval(interval)
          console.log('return of  interval of 2 in useEffect')
        
      }
    }, [])

    function myInterval(){
        console.log(interval);
        clearInterval(interval)
        interval= setInterval(() =>{
            console.log('Calling interval of 2 in useEffect '+new Date().toLocaleTimeString())
        },2000)
    }
    
    return<View style={{flex:1}}>
        <Text style={{color: 'white'}}>Its my home for testing purpose!</Text>
        <TouchableOpacity style={{backgroundColor:'red',padding:20}} onPress={() => myInterval()}>
            <Text style={{color:'white'}}>call FN</Text>
        </TouchableOpacity>
    </View>
}
export default TestHome;