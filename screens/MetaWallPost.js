import * as React from 'react';
import { ThemeProvider,useTheme } from '@react-navigation/native';
import { View, Text, Picker, Dimensions, TouchableOpacity,Paragraph,ToastAndroid,Clipboard,RefreshControl, StyleSheet, Image, StatusBar, FlatList, ScrollView, TextInput,ActivityIndicator, ImageBackground} from 'react-native';
import { Switch,Divider } from 'react-native-paper';
import Share from 'react-native-share';
import IonIcons from 'react-native-vector-icons/Ionicons'
import LottieView from 'lottie-react-native';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../component/context';


import theme from '../component/theme';
import styles from '../component/styles';
import global from '../component/global';

var RNFS = require('react-native-fs');
const MetaWallPost = ({ navigation,route }) => {
  // my_addr:addr,cur:Id,acc:AccName,img: Coin.image
  const pnl=route.params?.pnl;
  const sym=route.params?.sym;
  const tcall=route.params?.tcall;
  const ep=route.params?.ep;
  const lp=route.params?.lp;
  const vals=route.params?.vals;
  const auto=route.params?.auto;
  console.log(vals)
  const {colors}=useTheme();    
  const [Loading, setLoading] = React.useState(true);    
  const [Uid, setUid] = React.useState('');  
  const [listShow,setListShow] = React.useState(false);  
  const [SelectedValue, setSelectedValue] = React.useState('Hey Guys ! Check This Out...');  
  const [showIt, setShowIt] = React.useState(false);
  const [LD, setLD] = React.useState(false);
  const [Img, setImg] = React.useState('');
  
  const backImg ='../assets/botz/banner/bg6.png'
  React.useEffect(() => {
    const rVal =Math.floor(Math.random() * 5) + 1 ; 
    // console.log(rVal)
    // setBg(rVal)
    if(rVal==1)
    {
console.log('1')
        // backImg ='../assets/botz/banner/bg1.png'
    }
    if(rVal==2)
    {
console.log('2')
        // backImg ='../assets/botz/banner/bg2.png'
    }
    if(rVal==3)
    {
console.log('3')
        // backImg ='../assets/botz/banner/bg3.png'
    }
    if(rVal==4)
    {
console.log('4')
        // backImg ='../assets/botz/banner/bg4.png'
    }
    if(rVal==5)
    {
console.log('5')
        // backImg ='../assets/botz/banner/bg5.png'
    }
      setTimeout(() => {
          setShowIt(true)
          
      }, 500);

      
  }, [])
  let shareCodeProm = {
    message: global.refurlProm //string           

};
  useFocusEffect(
      React.useCallback(() => {            
          setTimeout(async() => {

              // setIsLoading(false);
              let code;
              let uid;
              code = null;
              try {
                  uid=await AsyncStorage.getItem('user_id')
                  code=await AsyncStorage.getItem('app_code');
                  console.log(code)
                  setLoading(false)
                  setUid(uid)
                  callImg(uid)
                }
                catch (e) {
                    console.log(e);
                }
                // console.log('user token:', userToken);
                
            })
              
            

          //we can add delay time here before callApi() i.e ' },1000,callApi());' //
      }, [Uid])
  );
// React.useEffect(()=>{
//     setTimeout(() =>{
//         takeScreenShot()
//     },3000)
// },[Img])  

const callImg = (Uid) => {
    console.log("https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl=http://snap.botz.trade/s/r.aspx?spid=" + Uid)
    setImg("https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl=http://snap.botz.trade/s/r.aspx?spid=" + Uid)   
}


const finalHit=()=>{
    let url=global.BASE_URL+`css_mob/share_orders.aspx?auto=${auto}&txt=${SelectedValue}`
    console.log(url)
    fetch(url)
    .then(item=>item.json())
    .then(data=>{
        if(data.status==='Success'){
            setLD(false)
            ToastAndroid.show('Posted to the wall Successfully!',ToastAndroid.SHORT),
            navigation.navigate('showWall')      
        }
    })
}



  return (    
      <View style={[styles.container,{backgroundColor:colors.background}]}>
          {/* Back Button module start */}            
          {/* <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:15,paddingTop:35,alignItems: 'center',backgroundColor:colors.greenup}}> 
               
                <View style={{flexDirection:'column',alignItems: 'center',justifyContent:'center',paddingTop:5}}>
                    <TouchableOpacity onPress={()=>navigation.goBack()} style={{padding:10}}>
                        <Text style={{textAlign:'right',}}><IonIcons name="md-arrow-back" size={25}  color={colors.selected}   /></Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',paddingLeft:20}}>            
                            <Text style={[styles1.heading,{color:colors.selected}]}>DEPOSIT</Text>                            
                </View>
                <View style={{flexDirection:'column',alignItems: 'center',justifyContent:'center',paddingTop:5}}>
                    <TouchableOpacity onPress={()=> {setDhis(true)}} style={{padding:10}}>
                    <Text style={[styles1.heading,{color:colors.selected,fontSize:12}]}>Deposit {'\n'} History</Text>     
                    </TouchableOpacity>
                </View>
            </View> */}
          {/* Back Button module end */}          

          {/* Settings Module start */}
          {Loading?
     <View style={{flexDirection:'column',justifyContent: 'center',height:'100%',backgroundColor:colors.background}} ><LottieView source={require('../assets/loading.json')} style={{width:300,height:300,alignSelf:'center'}} autoPlay loop /></View>
      :
        <View style={{flex:1,justifyContent: 'center',backgroundColor:'#000'}}>
     {showIt? <ImageBackground source={require(backImg)} resizeMode={'stretch'} style={{width:'100%',alignSelf:'center',justifyContent:'center'}}> 
       
      <View style={{justifyContent:'center',paddingLeft:20,paddingVertical:10}}>
                  {/* <Text style={{color:colors.selected,fontSize:18}}>META Futures</Text>                   */}
                  <Text style={[styles.text_footer,{color:colors.selected,fontSize:13}]}>{sym}   <Text style={{color:tcall==='BUY'?colors.profitcolor1:colors.losscolor1,fontWeight: 'bold'}}> {tcall=='BUY'?'LONG':'SHORT'}</Text></Text>
                  <Text style={[styles.text_footer,{fontSize:24,fontWeight:'bold'},{color:colors.profitcolor1}]}>{pnl} %</Text>                  
                  <Text style={[styles.text_footer,{color:colors.selected,fontSize:11}]}>Entry Price  <Text style={{color:colors.selected,fontSize:13}}>{ep}</Text></Text>                  
                  <Text style={[styles.text_footer,{color:colors.selected,fontSize:11}]}>Last Price  <Text style={{color:colors.selected,fontSize:13}}>{lp}</Text></Text>                  
                  <Text style={[styles.text_footer,{color:colors.selected,marginTop:20,marginLeft:25}]}>Referral Code </Text>
                  <Image source ={{uri:Img}} style={{width:100,height:100,marginBottom:0,marginLeft:20,borderRadius:5}} resizeMode={'stretch'} />                               
                    
          </View>    
      </ImageBackground>:null}

        <View style={{width:'100%',alignSelf: 'flex-start',backgroundColor:'#d0d0d0'}}>
            <TouchableOpacity onPress={()=>{setListShow(!listShow)}} style={{flexDirection:'row',paddingVertical:5,justifyContent: 'space-between',paddingHorizontal:15,borderBottomWidth:0.5}}>
            <Text style={{fontSize:20}}>{SelectedValue}</Text>
            <MaterialIcons name={listShow?'arrow-drop-down':'arrow-right'} size={25} />
            </TouchableOpacity>
            <View style={{display:listShow?'flex':'none'}}>
            <FlatList  
            data={dta}
            horizontal={false}                                           
            showsVerticalScrollIndicator={false}     
            contentContainerStyle={{paddingLeft:15}}
            keyExtractor={({item,index}) => index}
            renderItem={({ item, index }) => {                                                    
                return (
                        <TouchableOpacity onPress={()=>{setListShow(false),setSelectedValue(item.value)}} style={{marginVertical:7}}>
                            <Text style={{fontSize:18}}>{item.value}</Text>
                        </TouchableOpacity>
                )}}
            
            />
            </View>
        </View>
        <TouchableOpacity
        onPress={() => {
         setLD(true),
         finalHit()
        }}
        style={{position: 'absolute',bottom:15,width:'100%'}}
       >
        <View style={[{alignSelf: 'center',flexDirection:'row',justifyContent: 'center',borderRadius:10,width:'70%',paddingVertical:5,elevation:0,backgroundColor:global.appColor1}]}                    
                    >
              <Text style={[styles.heading,{color:'#000',textAlign: 'center'}]}>Post</Text>       
              {LD?<ActivityIndicator size={"small"}  color="#fff" />:null}
          </View>
      </TouchableOpacity>
       </View>
        
        }

          {/* Settings Module end */}





      </View>
     
  );
}

export default MetaWallPost;
const styles1 = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bg,
        paddingTop: 10,
        paddingHorizontal: 10

    },
    hour_box: {

        color: '#808080',
        borderBottomWidth: 0.5,
        width: '80%',
        paddingVertical: 5,
        paddingHorizontal: 0,
        marginHorizontal: 20,

    },
    heading:{
        fontSize:25,
        fontWeight:'bold',
        color:'#fff',
        textAlign:'center',
        marginTop:10
        },
    textInput: {
        marginLeft: 5,

        marginTop: 0,
        paddingBottom: 0,
        fontSize: 16,
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

    text: {
        color: theme.hgl,
        
        fontSize: 12,
        

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
        marginTop: 80,

    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#d5d5d5',
        marginVertical: 15,
        marginLeft: 5,
    },
    textSign: {
        fontSize: 18,
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
        elevation: 10,
        marginTop: 200,
        marginHorizontal: 10,
        paddingHorizontal: 20,
        paddingVertical: 50,
        backgroundColor: '#fff',
    },
    text_card: {
        fontSize: 14,
        fontWeight: 'bold',
    }
});

const dta=[
        {value:'Hey Guys ! Check This Out...'},
        {value:'Catch me If You Can'},
        {value:'Thank you MetaFX !!!!'},
        {value:'Im Loving It'},
        {value:'Whos The Boss Now?'},
        {value:'Not Bad....!'},
        {value:'Lottery.......!'},
        {value:'Can You believe This?'},    
]

{/* <Picker
            selectedValue={SelectedValue}
            style={{ height: 50, width: '100%' ,color:'#000'}}            
            mode={'dropdown'}                      
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}        >
            <Picker.Item  label="Hey Guys ! Check This Out..." value="Hey Guys ! Check This Out..." />
            <Picker.Item label="Catch me If You Can" value="Catch me If You Can" />
            <Picker.Item label="Thank you metafutures !!!!" value="Thank you metafutures !!!!" />
            <Picker.Item label="Im Loving It" value="Im Loving It" />
            <Picker.Item label="Whos The Boss Now?" value="Whos The Boss Now?" />
            <Picker.Item label="Not Bad....!" value="Not Bad....!" />
            <Picker.Item label="Lottery.......!" value="Lottery.......!" />
            <Picker.Item label="Can You believe This?" value="Can You believe This?" />
        </Picker> */}