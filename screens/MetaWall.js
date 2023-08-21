import * as React from 'react';
import { ThemeProvider,useTheme } from '@react-navigation/native';
import { View, Text, Picker, Dimensions, TouchableOpacity,Paragraph,ToastAndroid,Clipboard,RefreshControl, StyleSheet, Image, StatusBar, FlatList, ScrollView, TextInput,ActivityIndicator, ImageBackground} from 'react-native';

import {captureScreen} from 'react-native-view-shot';
var RNFS = require('react-native-fs');
import Share from 'react-native-share';
import LottieView from 'lottie-react-native';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';


import AsyncStorage from '@react-native-async-storage/async-storage';


import styles from '../component/styles';

import global from '../component/global';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {jsonContext} from '../context/GlobalState'
const MetaWall = ({ navigation,route }) => {

  const [imageURI, setImageURI] = React.useState('');
    const [savedImagePath, setSavedImagePath] = React.useState('');

  const {colors}=useTheme();    
  const [Loading, setLoading] = React.useState(false);    
  const [refreshing,setRefreshing] = React.useState(true);
  const [status, setStatus] = React.useState('both');    
  const {   UID  } = React.useContext(jsonContext);
  const [SelectedValue, setSelectedValue] = React.useState('Hey Guys ! Check This Out...');  
  const [showIt, setShowIt] = React.useState(false);
  const [Data,setData] = React.useState(null);
  const [Img, setImg] = React.useState('');
  
  
  useFocusEffect(
    React.useCallback(() => {
        console.log('hit in metawall');
        GetWall()
    },[]
))

// React.useEffect(()=>{
   
// },[status])



function callImg (uid){    
        return "https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl=http://snap.botz.trade/s/r.aspx?spid="  +uid  
}

function Img_check (uid){    
    let rnd=Math.floor((Math.random()*6)+1)
    let img='../assets/wall1.png';
    if(rnd==1){
        return require('../assets/wall1.png')
    }else if(rnd==2){
        return require('../assets/wall2.png')
    }else if(rnd==3){
        return require('../assets/wall3.png')
    }
    // else if(rnd==4){
    //     return require('../assets/wall4.png')
    // }else if(rnd==5){
    //     return require('../assets/wall5.png')
    else {
        return require('../assets/wall2.png')
    }
        
}

const GetWall=()=>{
    let url=global.BASE_URL+'css_mob/get_orders.aspx?uid=' + UID +'&share=true'+'&mode='+status
    console.log(url)
    fetch(url)
    .then(item=>item.json())
    .then(data=>{
        console.log(data)        
        setData(data)
        setLoading(false)
        setRefreshing(false)
    })
}
const onRefresh=()=>{
    setRefreshing(true)
    GetWall()
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
        console.log(uri)

        RNFS.readFile(uri, 'base64').then((res) => {
            let urlString = 'data:image/jpeg;base64,' + res;
            let options = {
              title: 'Profit',
              message:'The Wall of Fortune ',
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

          Loading?
     <View style={{flexDirection:'column',justifyContent: 'center',height:700,backgroundColor:colors.background}} ><LottieView source={require('../assets/loading.json')} style={{width:300,height:300,alignSelf:'center'}} autoPlay loop /></View>
      :
      <ScrollView>
            <ImageBackground source={global.bgimg} resizeMode={'stretch'} style={[styles.container,{paddingTop:0}]}>                      
                {/* <Image source={require('../assets/logo.png')} style={{width:240,height:60,marginTop:0,alignSelf:'center',}} resizeMode={'contain'} /> */}
                <TouchableOpacity onPress={()=>{takeScreenShot()}} style={{position:'absolute',top:20,right:30}}>
                <FontAwesome name="share-alt" size={24} color={'#fff'}  />
                </TouchableOpacity>
             
               <FlatList
                    horizontal={false}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                    data={Data}                    
                    showsVerticalScrollIndicator={false}     
                    contentContainerStyle={{paddingBottom:50}}                    
                    keyExtractor={({item,index}) => index}
                    renderItem={({ item, index }) => {                                                    
                        return (
                        <ImageBackground source={Img_check()} resizeMode={'stretch'} style={{width:'100%',alignSelf:'center',justifyContent:'center',
                        marginVertical:10}}>        
                         <View style={{justifyContent:'center',paddingLeft:20,paddingVertical:10,marginTop:60}}>
                                
                                  
                                  
                                  <Text style={[styles.text_footer,{color:colors.selected,fontSize:11}]}>Entry Price  <Text style={{color:colors.selected,fontSize:13}}>{item.startprice}</Text></Text>                  
                                  <Text style={[styles.text_footer,{color:colors.selected,fontSize:11}]}>Last Price  <Text style={{color:colors.selected,fontSize:13}}>{item.price}</Text></Text>                  
                                  
                                  <Text style={[styles.text_footer,{color:colors.selected,fontSize:13}]}>{item.pair}   <Text style={{color:item.type==='BUY'?colors.profitcolor1:colors.losscolor1,fontWeight: 'bold'}}> {item.type}</Text></Text>
                                  <Text style={[styles.text_footer,{fontSize:24,fontWeight:'bold'},{color:colors.profitcolor1}]}>{parseFloat(item.profit_per).toPrecision(2)} % <Text style={{color:colors.profitcolor,fontSize:12,fontWeight:'normal'}}></Text></Text>                  
                                  <Image source ={{uri:callImg(item.uid)}} style={{width:50,height:50,marginBottom:0,marginLeft:20,borderRadius:5}} resizeMode={'stretch'} />                               
                                  <Text style={[styles.text_footer,{color:colors.selected,fontSize:14,textAlign:'center',marginLeft:15,borderRadius:5,backgroundColor:'#000',width:60}]}>{item.uid}</Text>                  
                                  <Text style={[styles.text_footer,{color:colors.selected,fontSize:12,textAlign:'center',borderRadius:5,backgroundColor:'#000',width:120,marginTop:5}]}>{item.name}</Text>                  
                                    
                          </View>    
                          <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between',alignItems: 'center',}}>

                                  <Text style={[{color:colors.selected,fontSize:12,backgroundColor:'#000',textAlign:'center',width:'60%',marginTop:25}]}>{item.txt}</Text>
                                  <Text style={[{color:colors.selected,fontSize:12,backgroundColor:'#000',textAlign:'center',width:'40%',marginTop:25}]}>{item.order_time.split(' ')[0]} {item.order_time.split(' ')[1]} {item.order_time.split(' ')[2]} {item.order_time.split(' ')[3]} {item.order_time.split(' ')[4]}</Text>
                          </View>
                        </ImageBackground>
                        )    
                }}/>                               

          {/* Settings Module end */}



         
<View style={{marginBottom:150}}></View>
      </ImageBackground>
     </ScrollView>

  );
}

export default MetaWall;






/* 


    <View >
           <TouchableOpacity  onPress={()=>{navigation.navigate('RestoreAcc')}} style={{backgroundColor:colors.vbg,width:'90%',height:90,borderRadius:10,alignItems: 'flex-start',alignSelf: 'center',borderLeftWidth:4,borderTopLeftRadius:5,borderBottomLeftRadius:5,borderLeftColor:"#F7931B",paddingLeft:10,paddingVertical:10,marginVertical:5}}>
            <View style={{flexDirection:'row',justifyContent:'space-around',alignItems: 'center'}}>
            <Text style={{textAlign:'center',width:30}}><MaterialIcons name="restore" size={25}  color={'#fff'}   /></Text>
            <View style={{flexDirection:'column',justifyContent:'space-around',paddingLeft:15}}>
                    <Text style={[styles.sheading,{textAlign:'left'}]}>RESTORE ACCOUNT</Text>
                    <Text style={[styles1.text,{width:200}]}>Restore your old wallet accounts.</Text>
            </View>
            </View>
            </TouchableOpacity>
    </View>
   <View >
           <TouchableOpacity onPress={()=>{navigation.navigate('ImportAcc')}} style={{backgroundColor:colors.vbg,width:'90%',height:90,borderRadius:10,alignItems: 'flex-start',alignSelf: 'center',borderLeftWidth:4,borderTopLeftRadius:5,borderBottomLeftRadius:5,borderLeftColor:"#F7931B",paddingLeft:10,paddingVertical:10,marginVertical:5}}>  
            <View style={{flexDirection:'row',justifyContent:'space-around',alignItems: 'center'}}>
            <Text style={{textAlign:'center',width:30}}><IonIcons name="md-download-outline" size={25}  color={'#fff'}   /></Text>
            <View style={{flexDirection:'column',justifyContent:'space-around',paddingLeft:15}}>
                    <Text style={[styles.sheading,{textAlign:'left'}]}>IMPORT WITH PRIVATE KEY</Text>
                    <Text style={[styles1.text,{width:200}]}>Use to import your external accounts using private key.</Text>
            </View>
            </View>
            </TouchableOpacity>
    </View>
    <View >
            <TouchableOpacity onPress={()=>{navigation.navigate('WatchMode')}} style={{backgroundColor:colors.vbg,width:'90%',height:90,borderRadius:10,alignItems: 'flex-start',alignSelf: 'center',borderLeftWidth:4,borderTopLeftRadius:5,borderBottomLeftRadius:5,borderLeftColor:"#F7931B",paddingLeft:10,paddingVertical:10,marginVertical:5}}>
            <View style={{flexDirection:'row',justifyContent:'space-around',alignItems: 'center'}}>
            <Text style={{textAlign:'center',width:30}}><IonIcons name="md-eye-outline" size={22}  color={'#fff'}   /></Text>
            <View style={{flexDirection:'column',justifyContent:'space-around',paddingLeft:15}}>
                    <Text style={[styles.sheading,{textAlign:'left'}]}>WATCH MODE</Text>
                    <Text style={[styles1.text,{width:250}]}>You will only have access to track the account.You will not be able to take any action with it. </Text>
            </View>
            </View>
            </TouchableOpacity> 
            
    </View>
  

*/