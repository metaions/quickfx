import * as React from 'react';
import { ThemeProvider,useTheme } from '@react-navigation/native';
import { View,Text,Dimensions,ToastAndroid,TouchableOpacity,ImageBackground, Image, FlatList,} from 'react-native';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../component/styles';
import global from '../component/global';
import { ActivityIndicator } from 'react-native-paper';
import {captureScreen,captureRef} from 'react-native-view-shot';
var RNFS = require('react-native-fs');
import Share from 'react-native-share';
// var RNFS = require('react-native-fs');


const MyAchievements = ({ navigation,route }) => {  
  const flt1 =React.useRef(null);
  const {colors}=useTheme();    
  const [Loading, setLoading] = React.useState(false);    
  const [Uid, setUid] = React.useState(global.uid);    
  const modalRef = React.useRef();
  const [Index,setIndex] = React.useState(0);  
  const [Img, setImg] = React.useState('https://www.imagediamond.com/blog/wp-content/uploads/2020/06/cartoon-boy-images-12.jpg');  

React.useEffect(()=>{
    let url=global.BASE_URL+`css_mob/get_profile.aspx?uid=${Uid}`
    console.log('url:'+url)
    fetch(url)
    .then(item=>item.json())
    .then(data=>{
        console.log('resp '+data.photo)
      setImg(data.photo)            
    })
},[])

React.useEffect(()=>{},[Img])
  
React.useEffect(()=>{
flt1.current?.scrollToIndex({
    animated: true,
      index: Index ,
});
},[Index])  


const takeScreenShot = () => {
    // To capture Screenshot
    captureRef(modalRef)
    .then(
      //callback function to get the result URL of the screnshot
      uri => {             
        RNFS.readFile(uri, 'base64').then(res => {
          let urlString = 'data:image/jpeg;base64,' + res;
          let options = {
            // title: 'Profit',
            // message: 'My Profit',
            url: urlString,
            type: 'image/jpeg',
          };
          Share.open(options)
            .then(res => {
              console.log('1 '+res);
            })
            .catch(err => {
              console.log('2 '+err);
            });
        });
      },
      error => console.error('Oops, Something Went Wrong', error),
    );
  };

const  renderItem=React.useCallback(()=>{      
    let imgtop,imgbottom,imgleft,imgright,txttop,txtbottom,txtleft,txtright,rtop,rbottom,rleft,rright=0
    if(Index===0){
        imgbottom='12%',
        imgright='17%',
        txtbottom='0%',
        txtright='15%',
        rbottom='2%',
        rleft='23%'
    }      
    if(Index===1){
        imgbottom='28%',
        imgright='41.5%',
        txtbottom='11%',
        txtright='38%',
        rbottom='7%',
        rright='10%'
    }      
    if(Index===2){
        imgtop='25%',
        imgright='38%',
        txtbottom='38%',
        txtright='36%',
        rbottom='2%',
        rleft='17%'
    }      
    if(Index===3){
        imgbottom='18%',
        imgright='16%',
        txtbottom='9%',
        txtright='13%',
        rbottom='5%',
        rleft='25%'
    }              
    return(
      
        <>            
        <Image source={{uri:Img}} style={{width:80,height:80,resizeMode:'cover',position:'absolute',bottom:imgbottom,borderRadius:200,right:imgright,left:imgleft,top:imgtop}} />                                
        <Text numberOfLines={1} style={{color:'#fff',fontSize:12,position:'absolute',fontWeight:'bold',width:95,bottom:txtbottom,right:txtright,left:txtleft,top:txttop}}>{global.NAME}</Text>
        <Text style={{color:'#000',fontWeight:'bold',position:'absolute',bottom:rbottom,right:rright,left:rleft,top:rtop}}>{global.rank}</Text>
        </>
        
        )
        
},[Index,Img])


  return (    
      <View style={[styles.container,{backgroundColor:'#000'}]}>       
         
        <View style={{flex:3}} ref={modalRef} collapsable={false}>            
         <FlatList
                    bounces={false}
                    decelerationRate={0.7}                    
                    ref={flt1}
                    scrollEnabled={false}
                    initialScrollIndex={Index}
                    removeClippedSubviews={true}
                    data={dta}                                        
                    horizontal                          
                    snapToInterval={Dimensions.get('window').width}                          
                    keyExtractor={({item,index}) => index}
                    renderItem={({ item, index:fIndex }) => {                        
                        return (
                            Loading?
                            <View  style={{flex:1,alignSelf:'center',alignItems: 'center',width:Dimensions.get('window').width}}>                                              
                            <ActivityIndicator size={30} color={'#fff'} />
                            </View>
                                   :
                           Img?<View   style={{flex:1,alignSelf:'center',alignItems: 'center',width:Dimensions.get('window').width}}>      
                            <TouchableOpacity                                
                                activeOpacity={0.8}
                                style={{alignSelf:'flex-end',marginRight:22,marginBottom:22}}
                                onPress={() => {                                                                        
                                        takeScreenShot();                                    
                                }}>
                                    <IonIcons name={'share-social-sharp'} color={'#fff'}  size={30} />
                                </TouchableOpacity> 
                            
                                <ImageBackground   source={item.value} resizeMode={'contain'} style={{width:Dimensions.get('window').width,height:350,borderRadius:10}} >
                                    {renderItem()}
                                </ImageBackground>
                            
                                </View>:null
            
                        )    
                    }}/>                               
        </View>
        <View style={{flex:0.7,}}>
         <FlatList
                    bounces={false}
                    decelerationRate={0.7}                                             
                    removeClippedSubviews={true}
                    data={dta}                                        
                    horizontal   
                    contentContainerStyle={{alignItems: 'center'}}           
                    snapToInterval={Dimensions.get('window').width}  
                    
                    keyExtractor={({item,index}) => index}
                    renderItem={({ item, index }) => {                                                    
                        return (
                        <TouchableOpacity onPress={()=>{setLoading(true),setIndex(index),setTimeout(()=>{setLoading(false)},500)}} style={{marginHorizontal:20,backgroundColor:Index===index?'aqua':null,justifyContent:'center',alignItems: 'center',borderRadius:5,width:85,height:85}}>
                            <Image source={item.value} style={{width:80,resizeMode:'contain',borderRadius:10,height:80}} />
                        </TouchableOpacity>
                        )    
                    }}/>                               
        </View>

      </View>
     
  );
}

export default MyAchievements;


const dta=[
        {value:require('../assets/botz/congrats1.png')},
        {value:require('../assets/botz/congrats3.png')},
        {value:require('../assets/botz/congrats4.png')},
        {value:require('../assets/botz/congrats2.png')},
        // {value:require('../assets/botz/congrats5.png')},
       
]
