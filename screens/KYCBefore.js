/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles1 */
/* eslint-disable prettier/prettier */

import * as React from 'react';
import { ThemeProvider,useTheme } from '@react-navigation/native';
import { View, Text, Button, Dimensions, TouchableOpacity,BackHandler, StyleSheet,Alert, Image,ActivityIndicator, StatusBar, FlatList, ScrollView, TextInput,ToastAndroid } from 'react-native';

import  MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';

import global from '../component/global'
import styles from '../component/styles'
import { AuthContext } from '../component/context';





const KYCBefore = ({ navigation, route }) => {
    const {colors}=useTheme();
    const theme=useTheme();
    const uid = route.params?.uid
    const id = route.params?.id
    const tkn = route.params?.tkn
    const { signOut } = React.useContext(AuthContext);
    React.useEffect(() => {
        const backAction = () => {
          Alert.alert("Hold on!", "Are you sure you want to exit MetaFX?", [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel"
            },
            { text: "YES", onPress: () => BackHandler.exitApp() }
          ]);
        // ToastAndroid.show('You have to do KYC first!',ToastAndroid.SHORT)
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
      }, []);
    


    return (
     <View style={{alignItems:'center',marginTop:'10%',height:'100%'}}>
         <LinearGradient
                    colors={[ global.grad3,global.grad4]}
                    style={{borderRadius:30,alignItems:'center',
                    marginTop:'20%',paddingVertical:50,marginHorizontal:'5%',paddingHorizontal:10}}
                    // start={{ x: 0, y: 1 }}
                    // end={{ x: 1, y: 1 }}
                >
                    <LottieView source={require('../assets/kyc.json')}
                     style={{width:150,height:250,alignSelf:'center'}} autoPlay loop  />
                    <Text style={styles1.textNew}>You have to do KYC first. Please click below to move to KYC Screen.</Text>
                   
         </LinearGradient>
         <TouchableOpacity onPress={()=>{navigation.navigate('kyc')}}>
         <LinearGradient
                    colors={[ global.grad3,global.grad4]}
                    style={{borderRadius:30,alignItems:'center',justifyContent:'center',
                    marginTop:'20%',paddingVertical:5,marginHorizontal:'5%',paddingHorizontal:10}}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                >
                    <Text style={[styles1.textNew,{fontWeight:'normal'}]}>Move to KYC Screen</Text>
                   
         </LinearGradient>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => signOut()} style={{paddingHorizontal:10,alignItems: 'center',marginBottom:15,marginTop:'5%',}}>
                <View   style={{flexDirection:'row',justifyContent: 'center',alignItems: 'center',}}>
                      <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center'}}>
                        <MaterialIcons name={'logout'} color={'white'} size={22} />
                        <Text style={[styles.txt,{marginLeft:10,fontWeight:'bold',color:colors.selected,fontSize:18}]}>SignOut</Text>
                      </View>                      
                </View>
                      </TouchableOpacity>
     </View>
    );
}


export default KYCBefore;


const styles1 = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#0B1725',


    },
    textNew: {
        color:'white',//'#4d0300',
        marginHorizontal:10,marginVertical:5,fontSize:18,fontWeight:'bold',
        alignSelf:'center',textAlign:'center',lineHeight: 30,
    },
    hour_box: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: '#808080',
        borderBottomWidth: 0.5,
        borderBottomColor: '#80808080',
        width: '90%',
        paddingVertical: 5,
        paddingHorizontal: 0,
        marginHorizontal: 20,
        marginTop:30

    },
    doc:{
        flexDirection:'row',
        justifyContent: 'space-between',
        marginVertical:10,
        paddingHorizontal:5,
        borderBottomWidth:0.5,
        borderBottomColor:'#80808080',
        borderRadius:10
    },
    textInput: {
        marginLeft: 5,
        color:'#f5f5f5',
        marginTop: 0,
        paddingBottom: 0,
        fontSize: 16,
    },textInput1: {
        borderRadius:5,
        fontSize:15,
        width:250,height:50,
        textAlign:'left',
        textAlignVertical:'center',
        color:'#c5c5c5',
        fontWeight:'bold',
        paddingLeft:15,
        marginVertical:15
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
        marginTop: 15,
    },
    text_footer: {
        color: '#000',
        fontWeight: '400',
        fontSize: 15,

    },
    header: {
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center',

    },
    footer: {
        flex: 3,
        backgroundColor: '#ffff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,

        paddingHorizontal: 40,
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
        marginVertical: 20,

    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'#c9c9c9c9',
        marginLeft: 8
    },
    textSign: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
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
        shadowOffset: { width: 20, height: 10 },
        shadowColor: '#303030',
        borderRadius: 0,
        borderColor: '#fff',
        shadowOpacity: 0.5,
        elevation: 50,
        backgroundColor: '#fff'
    },
    text_card: {
        fontSize: 14,
        fontWeight: 'bold',
    }
});