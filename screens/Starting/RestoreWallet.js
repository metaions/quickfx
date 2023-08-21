/* eslint-disable prettier/prettier */
import * as React from 'react';
import { ThemeProvider } from '@react-navigation/native';
import { View, Text, Button, Dimensions, TouchableOpacity,ToastAndroid,ImageBackground, StyleSheet, Image, StatusBar, FlatList, ScrollView, TextInput,ActivityIndicator, SafeAreaView } from 'react-native';
import { Avatar, Card, Title, Paragraph, Divider } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { useFocusEffect, useIsFocused,useTheme } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IonIcons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { AuthContext } from '../../component/context';

//   import axios from 'axios';


// import { styles } from 'react-native-fbsdk-next/types/FBLoginButton';
import global from '../../component/global';
import theme from '../../component/theme';

import styles from '../../component/styles'


const RestoreWallet = ({ navigation }) => {
  const {colors}=useTheme();
  const {signIn} = React.useContext(AuthContext);
    const [LD, setLD] = React.useState(false);
    const [K1, setK1] = React.useState('');
    const [K2, setK2] = React.useState('');
    const [K3, setK3] = React.useState('');
    const [K4, setK4] = React.useState('');
    const [K5, setK5] = React.useState('');
    const [K6, setK6] = React.useState('');
    const [K7, setK7] = React.useState('');
    const [K8, setK8] = React.useState('');
    const [K9, setK9] = React.useState('');
    const [K10, setK10] = React.useState('');
    const [K11, setK11] = React.useState('');
    const [K12, setK12] = React.useState('');
  
    // const[CUR,setCUR]= React.useState(global.BTC_USD.symbol)
    // const[Selected,setSelected]= React.useState('0')
    // const[Aname,setAname]= React.useState('')
    // const[Count1,setCount1]= React.useState('1')

    
    React.useEffect(()=>{
      
        // LiveRate()       
      })
      

    //   useFocusEffect(
    //     React.useCallback(() => {            
    //         setTimeout(async () => {
    //             // setIsLoading(false);
                
    //            let pass = null;
    //            let tp = null;
    //            let uid;
    //            uid = null;
               
    //             try {
    //              console.log('more stack screen')
    //             pass=await AsyncStorage.getItem('req_pass');
    //             tp=await AsyncStorage.getItem('logintype');
    //             uid=await AsyncStorage.getItem('user_id')
    //             console.log(tp)
    //             if(pass==='true'){
    //                 setReqPass(true);
    //               }
    //               setLgType(tp);
    //               setUid(uid);
    //               setLoading(false)
    //             }
    //             catch (e) {
    //               console.log(e);
    //             }
    //             // console.log('user token:', userToken);
               
                
    //           },1000);

    //         //we can add delay time here before callApi() i.e ' },1000,callApi());' //
    //     }, 1000,[])
    // );
 

     

      const CreateAcc=async()=>{
        let arr=[];
        arr.push(K1)
        arr.push(K2)
        arr.push(K3)
        arr.push(K4)
        arr.push(K5)
        arr.push(K6)
        arr.push(K7)
        arr.push(K8)
        arr.push(K9)
        arr.push(K10)
        arr.push(K11)
        arr.push(K12)
        
        var url = global.BASE_URL+"exchange/restore.aspx"
        var fdata = new FormData();        
        fdata.append("key", (arr).toString());
        
        console.log(url,fdata)    
        // await AsyncStorage.setItem("DarkMode","false")
        await axios.post(url, fdata, { headers: { contentType: "application/json" } })
            .then(function (response) {        
               console.log(response.data)
               if(response.data.success==='true'){
                 signIn(response.data.uid)
                 ToastAndroid.show(response.data.msg,ToastAndroid.SHORT)
               }else{
                ToastAndroid.show(response.data.msg,ToastAndroid.SHORT)
                navigation.goBack();
               }
            })
            .catch(function (error) {
                console.log(" axios post error " + error);
            });
           
      }


      
      function SendToInner(from, name, val) {
        navigation.navigate('InnerBuy', {fname: from, name: name, id: val});
      }  
      
      


    return (
     
        <View  animation="zoomIn" delay={300} iterationCount={1} style={[styles.container,{backgroundColor:theme.bg,}]}>           
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:15,paddingVertical:5,marginBottom:10}}> 
        <View style={{flexDirection:'row',justifyContent:'space-between',width:'80%',paddingLeft:20}}>            
                    <Text style={[styles1.heading,{color:theme.hgl}]}>Restore</Text>                            
        </View>
        <View style={{alignItems: 'center',justifyContent:'center',width:'30%'}}>
            <TouchableOpacity onPress={()=>navigation.goBack()} style={{padding:10}}>
                <Text style={{textAlign:'right'}}><IonIcons name="md-arrow-back" size={22}  color={theme.hgl}   /></Text>
            </TouchableOpacity>
        </View>
    </View>
        <ScrollView style={{marginBottom:100}}>
       <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <View style={{width:'80%',borderWidth:0.5,borderColor:theme.lgt,borderRadius:10,flexDirection:'row',justifyContent:'flex-start',marginHorizontal:10,height:50,marginTop:10}}>
        <TextInput
                        placeholder="Key 1"
                        keyboardType='default'                                
                        style={styles.textInput}
                        onChangeText={(val)=>{setK1(val)}}
                        autoCapitalize="none"
                        width={'80%'}
                        placeholderTextColor={theme.hgl}
                        selectionColor='#808080'
                        color={theme.hgl}
                        height={'100%'}
                    />
        </View>
        <Image
                              source={require('../../assets/1.png')}
                              resizeMode={'stretch'}
                              style={{width: 40, height: 40,marginRight:15}}
                          />

        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <Image
                              source={require('../../assets/2.png')}
                              resizeMode={'stretch'}
                              style={{width: 40, height: 40,marginLeft:15}}
                          />
        <View style={{width:'80%',alignSelf: 'flex-end',borderWidth:0.5,borderColor:theme.lgt,borderRadius:10,flexDirection:'row',justifyContent:'flex-start',marginHorizontal:10,height:50,marginTop:10}}>
        <TextInput
                        placeholder="Key 2"
                        keyboardType='default'                                
                        style={styles.textInput}
                        onChangeText={(val)=>{setK2(val)}}
                        autoCapitalize="none"
                        width={'80%'}
                        placeholderTextColor={theme.hgl}
                        selectionColor='#808080'
                        color={theme.hgl}
                        height={'100%'}
                    />
        </View>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <View style={{width:'80%',borderWidth:0.5,borderColor:theme.lgt,borderRadius:10,flexDirection:'row',justifyContent:'flex-start',marginHorizontal:10,height:50,marginTop:10}}>
        <TextInput
                        placeholder="Key 3"
                        keyboardType='default'                                
                        style={styles.textInput}
                        onChangeText={(val)=>{setK3(val)}}
                        autoCapitalize="none"
                        width={'80%'}
                        placeholderTextColor={theme.hgl}
                        selectionColor='#808080'
                        color={theme.hgl}
                        height={'100%'}
                    />
        </View>
        <Image
                              source={require('../../assets/3.png')}
                              resizeMode={'stretch'}
                              style={{width: 40, height: 40, marginRight: 15}}
                          />
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <Image
                              source={require('../../assets/4.png')}
                              resizeMode={'stretch'}
                              style={{width: 40, height: 40,marginLeft:15}}
                          />
       <View style={{width:'80%',alignSelf: 'flex-end',borderWidth:0.5,borderColor:theme.lgt,borderRadius:10,flexDirection:'row',justifyContent:'flex-start',marginHorizontal:10,height:50,marginTop:10}}>
        <TextInput
                        placeholder="Key 4"
                        keyboardType='default'                                
                        style={styles.textInput}
                        onChangeText={(val)=>{setK4(val)}}
                        autoCapitalize="none"
                        width={'80%'}
                        placeholderTextColor={theme.hgl}
                        selectionColor='#808080'
                        color={theme.hgl}
                        height={'100%'}
                    />
        </View>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <View style={{width:'80%',borderWidth:0.5,borderColor:theme.lgt,borderRadius:10,flexDirection:'row',justifyContent:'flex-start',marginHorizontal:10,height:50,marginTop:10}}>
        <TextInput
                        placeholder="Key 5"
                        keyboardType='default'                                
                        style={styles.textInput}
                        onChangeText={(val)=>{setK5(val)}}
                        autoCapitalize="none"
                        width={'80%'}
                        placeholderTextColor={theme.hgl}
                        selectionColor='#808080'
                        color={theme.hgl}
                        height={'100%'}
                    />
        </View>
        <Image
                              source={require('../../assets/5.png')}
                              resizeMode={'stretch'}
                              style={{width: 40, height: 40, marginRight: 15}}
                          />
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <Image
                              source={require('../../assets/6.png')}
                              resizeMode={'stretch'}
                              style={{width: 40, height: 40,marginLeft:15}}
                          />
        <View style={{width:'80%',alignSelf: 'flex-end',borderWidth:0.5,borderColor:theme.lgt,borderRadius:10,flexDirection:'row',justifyContent:'flex-start',marginHorizontal:10,height:50,marginTop:10}}>
        <TextInput
                        placeholder="Key 6"
                        keyboardType='default'                                
                        style={styles.textInput}
                        onChangeText={(val)=>{setK6(val)}}
                        autoCapitalize="none"
                        width={'80%'}
                        placeholderTextColor={theme.hgl}
                        selectionColor='#808080'
                        color={theme.hgl}
                        height={'100%'}
                    />
        </View>
        </View>

        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <View style={{width:'80%',borderWidth:0.5,borderColor:theme.lgt,borderRadius:10,flexDirection:'row',justifyContent:'flex-start',marginHorizontal:10,height:50,marginTop:10}}>
        <TextInput
                        placeholder="Key 7"
                        keyboardType='default'                                
                        style={styles.textInput}
                        onChangeText={(val)=>{setK7(val)}}
                        autoCapitalize="none"
                        width={'80%'}
                        placeholderTextColor={theme.hgl}
                        selectionColor='#808080'
                        color={theme.hgl}
                        height={'100%'}
                    />
        </View>
        <Image
                              source={require('../../assets/7.png')}
                              resizeMode={'stretch'}
                              style={{width: 40, height: 40, marginRight: 15}}
                          />
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <Image
                              source={require('../../assets/8.png')}
                              resizeMode={'stretch'}
                              style={{width: 40, height: 40,marginLeft:15}}
                          />
        <View style={{width:'80%',alignSelf: 'flex-end',borderWidth:0.5,borderColor:theme.lgt,borderRadius:10,flexDirection:'row',justifyContent:'flex-start',marginHorizontal:10,height:50,marginTop:10}}>
        <TextInput
                        placeholder="Key 8"
                        keyboardType='default'                                
                        style={styles.textInput}
                        onChangeText={(val)=>{setK8(val)}}
                        autoCapitalize="none"
                        width={'80%'}
                        placeholderTextColor={theme.hgl}
                        selectionColor='#808080'
                        color={theme.hgl}
                        height={'100%'}
                    />
        </View>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <View style={{width:'80%',borderWidth:0.5,borderColor:theme.lgt,borderRadius:10,flexDirection:'row',justifyContent:'flex-start',marginHorizontal:10,height:50,marginTop:10}}>
        <TextInput
                        placeholder="Key 9"
                        keyboardType='default'                                
                        style={styles.textInput}
                        onChangeText={(val)=>{setK9(val)}}
                        autoCapitalize="none"
                        width={'80%'}
                        placeholderTextColor={theme.hgl}
                        selectionColor='#808080'
                        color={theme.hgl}
                        height={'100%'}
                    />
        </View>
        <Image
                              source={require('../../assets/9.png')}
                              resizeMode={'stretch'}
                              style={{width: 40, height: 40, marginRight: 15}}
                          />
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <Image
                              source={require('../../assets/10.png')}
                              resizeMode={'stretch'}
                              style={{width: 40, height: 40,marginLeft:15}}
                          />
        <View style={{width:'80%',alignSelf: 'flex-end',borderWidth:0.5,borderColor:theme.lgt,borderRadius:10,flexDirection:'row',justifyContent:'flex-start',marginHorizontal:10,height:50,marginTop:10}}>
        <TextInput
                        placeholder="Key 10"
                        keyboardType='default'                                
                        style={styles.textInput}
                        onChangeText={(val)=>{setK10(val)}}
                        autoCapitalize="none"
                        width={'80%'}
                        placeholderTextColor={theme.hgl}
                        selectionColor='#808080'
                        color={theme.hgl}
                        height={'100%'}
                    />
        </View>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <View style={{width:'80%',borderWidth:0.5,borderColor:theme.lgt,borderRadius:10,flexDirection:'row',justifyContent:'flex-start',marginHorizontal:10,height:50,marginTop:10}}>
        <TextInput
                        placeholder="Key 11"
                        keyboardType='default'                                
                        style={styles.textInput}
                        onChangeText={(val)=>{setK11(val)}}
                        autoCapitalize="none"
                        width={'80%'}
                        placeholderTextColor={theme.hgl}
                        selectionColor='#808080'
                        color={theme.hgl}
                        height={'100%'}
                    />
        </View>
        <Image
                              source={require('../../assets/11.png')}
                              resizeMode={'stretch'}
                              style={{width: 40, height: 40, marginRight: 15}}
                          />
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <Image
                              source={require('../../assets/12.png')}
                              resizeMode={'stretch'}
                              style={{width: 40, height: 40,marginLeft:15}}
                          />
        <View style={{width:'80%',alignSelf: 'flex-end',borderWidth:0.5,borderColor:theme.lgt,borderRadius:10,flexDirection:'row',justifyContent:'flex-start',marginHorizontal:10,height:50,marginTop:10}}>
        <TextInput
                        placeholder="Key 12"
                        keyboardType='default'                                
                        style={styles.textInput}
                        onChangeText={(val)=>{setK12(val)}}
                        autoCapitalize="none"
                        width={'80%'}
                        placeholderTextColor={theme.hgl}
                        selectionColor='#808080'
                        color={theme.hgl}
                        height={'100%'}
                    />
        </View>
        </View>
        </ScrollView>
      <View style={{position: 'absolute',bottom:5,width:'100%'}}>
          <ImageBackground source={require('../../assets/lg1.png')} style={[styles.Blinear,{paddingVertical:0}]}>
       <TouchableOpacity
       onPress={() => {
        setLD(true),CreateAcc()
       }}
       style={[styles.btn,{flexDirection:'row',justifyContent:'center',alignSelf:'center',paddingTop:5}]}>
     
         <Text style={[styles.sheading]}>Restore </Text>
         <Text style={[styles.sheading]}>{LD?<ActivityIndicator size={"small"}  color="#fff" />:null} </Text>
       
     
      </TouchableOpacity>
      </ImageBackground>
     </View>
    </View>
    );
}

export default RestoreWallet;
const styles1 = StyleSheet.create({
    container: {
        flex: 1,
          backgroundColor: '#0B1725'

    },
    bx: {
        flexDirection:'column',
        justifyContent:'space-around',
        borderWidth:0.5,
        borderRadius:10,
        borderColor: '#2f67f0',
        paddingVertical:5,
        paddingHorizontal:5,
        marginHorizontal:5,
        width:70,
        alignItems: 'center',
        height:90

    },
    bx1: {
        flexDirection:'row',
        justifyContent:'space-between',
        borderWidth:1,
        borderRadius:7,
        borderColor: '#2f67f0',
        paddingVertical:3,
        paddingHorizontal:3,        
        // width:130,
        alignItems: 'center',
        // height:40

    },
    heading:{
        fontSize:25,
        fontWeight:'bold',
        color:'#fff',
        textAlign:'center',
        marginTop:10
        },
    btn1:{
        marginTop:10,
        width:60,
        borderWidth:0.5,
        borderColor: '#2f67f0',
        backgroundColor: '#16181d',
        paddingVertical:5,
        alignSelf:'center',
        alignItems:'center',
        borderRadius:5
    
    },
  
    textInput: {
            flexDirection:'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth:0.5,
            borderBottomColor:'#808080',
            

    },
    text_header: {
        color: "#fff",
        fontWeight: 'bold',
        fontSize: 30
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderBottomWidth: 0.5,
        borderBottomColor: '#808080',
        marginTop: 15
    },
    text: {
        color: theme.hgl,
        fontWeight: 'bold',
        fontSize: 12,
        

    },
    trx:{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
    },
    logo: {
        width: 250,
        maxHeight: 200,
    },
    signIn: {
        width: 320,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row',

    },
    button: {
        alignItems: 'center',
        marginTop: 80,

    },
    title: {
        fontSize: 22,
        
        color:'#FFF'
    },
    textSign: {
        fontSize: 18,       
        color: '#fc1681'
    },
    sliderContainer: {
        height: 280,
        width: '90%',
        marginTop: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 10,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 8,
    },
    slideImage: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,

    },
    fitnessbox: {
        paddingHorizontal: 0,
        // borderWidth: 1,
        marginHorizontal: 10,
        marginTop: 5,
        marginBottom: 20,
        borderRadius: 20,
    },
    box_heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15
    },
    card_box: {
       backgroundColor:'#fc1681',
       paddingHorizontal:15,
       height:30,
       borderRadius:20,
       paddingTop:2
    },
    text_card: {
        fontSize: 13,
        color:'#c9c9c9c9',
        marginTop:15
    }
});