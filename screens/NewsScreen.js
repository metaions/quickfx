import * as React from 'react';
import { ThemeProvider } from '@react-navigation/native';
import { View, Text, Button, Dimensions, Switch, TouchableOpacity, StyleSheet, RefreshControl, Image, StatusBar, FlatList, ScrollView, TextInput, ActivityIndicator, ImageBackground, ToastAndroid,Linking } from 'react-native';
import { Avatar, Card, Title, Paragraph, Divider } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { useFocusEffect, useIsFocused, useTheme } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IonIcons from 'react-native-vector-icons/Ionicons'
import { AuthContext } from '../component/context';
import global from '../component/global'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import theme from '../component/theme';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../component/styles';

// import { styles } from 'react-native-fbsdk-next/types/FBLoginButton';


const NewsScreen = ({ navigation }) => {
    const {colors}=useTheme();
    const theme=useTheme();
    const [Uid, setUid] = React.useState('');
    const [Loading, setLoading] = React.useState(true);
    const [Data, setData] = React.useState('');
    const [Bal, setBal] = React.useState('');
    const [Port, setPort] = React.useState('');
    const [Thm, setThm] = React.useState('');    
    const [theArray, setTheArray] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [isEnabled, setIsEnabled] = React.useState('');
    const {toggleTheme} = React.useContext(AuthContext);
    const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

      useFocusEffect(
        React.useCallback(() => {            
           callApi();
            //we can add delay time here before callApi() i.e ' },1000,callApi());' //
        }, 1000,[])
    );

    const callApi=()=>{
        
        let url=global.BASE_URL+'css_mob/get_crypto_news.aspx'
        console.log(url)
        fetch(url)
        .then(item => item.json())
        .then(dta => {          
        //  console.log(Vdta.data)
        //  console.log(dta)
         setData(dta)
        })
        
        setRefreshing(false)
      }


      const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        callApi()
        
    
    })
    const EmptyList=()=>(
        
        <View style={{flexDirection:'column',justifyContent: 'center',
        height:'100%',
        backgroundColor:colors.background}} >
            <LottieView
          source={require('../assets/loading.json')}
          style={{ width: 300, height: 300, alignSelf: 'center' }}
          autoPlay
          loop
        />
            </View>
            
    )

    return (
     
        <ImageBackground source = {global.bgimg} resizeMode={'stretch'} 
        style={[styles.container,{   paddingTop:50}]}>
            <Text style={[styles.heading,{alignSelf:'flex-start',marginLeft:20,color:colors.appSkyblue,fontFamily:global.appFontB}]}>NEWS</Text>                   
        <FlatList
        horizontal={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={Data}
        showsHorizontalScrollIndicator={false}          
        keyExtractor={item => item.id}
        ListEmptyComponent={EmptyList}
        renderItem={({item, index}) => (
          <View style={{flexDirection:'column',justifyContent: 'center',alignItems:'center',alignSelf:'center',
          paddingHorizontal:15,paddingVertical:10,borderBottomWidth:0.5,borderColor:colors.appBlue,width:'100%'}}>
              {item.image_url!=='None'&&<Image source={{uri:item.image_url}} style={{width:'100%',height:200,borderRadius:10}} resizeMode={'stretch'} />}
             <View style={{width:'100%',alignItems:'flex-start',paddingLeft:15,marginTop:15}}>
              <Text style={{color:colors.skyBlue, fontSize:18,fontFamily:global.appFontM}} numberOfLines={2}>{item.title}</Text>
              <Text style={{fontSize:15,color:colors.appBlue,marginTop:15}}>{"Date: "+item.date}</Text>
              <Text style={{color:colors.appBlack,marginVertical:20,textAlign:'justify'}}>{item.txt}</Text>

             </View>
              <TouchableOpacity onPress={()=>{ Linking.openURL(item.news_url);}}
               style={{borderRadius:5,width:'50%',alignSelf:'flex-end',paddingVertical:3,alignItems:'flex-end'}}>
                      <Text style={{fontSize:16,fontFamily:global.appFontM,color:colors.appBlue}}>Read More</Text>
                  </TouchableOpacity>
          </View>

        //   <Card style={{marginVertical:10,width:'95%',alignSelf:'center',backgroundColor:colors.vbg}}  >
        //         <Card.Cover source={{ uri: item.screenshot }} />
        //         <Card.Title titleStyle={{color:"#fff"}} title={item.title} subtitle={<Text style={{fontSize:15,color:'#d0d0d0d0'}}>{"City: "+item.city}</Text>}  />
        //         <Card.Content>
        //         <Title>{<Text style={{fontSize:15,color:'#d0d0d0d0'}}>{"Link: "+item.website}</Text>}</Title>
        //         <Paragraph ><Text style={{color:"#fff"}}>{item.description}</Text></Paragraph>
        //         </Card.Content>
            
        //     </Card>
        )}
      />
               
        
            
        </ImageBackground>
    );
}

export default NewsScreen;
const styles1 = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0B1525',
        paddingTop: 40
    },
    textInput: {
        marginLeft: 15,
        marginTop: -15,
        paddingBottom: -10,

    },
    text_header: {
        color: "#fff",
        fontFamily:global.appFontM,
        fontSize: 30
    },
    bx: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        // borderWidth:1,
        borderRadius: 10,
        // borderColor:"#3D3F70",
        paddingVertical: 10,
        // backgroundColor:'#ff0000',
        paddingHorizontal: 10,
        marginHorizontal: 5,

        alignItems: 'center',
        height: 90

    },
    action: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderBottomWidth: 0.5,
        borderBottomColor: '#808080',
        marginTop: 15
    },
    text_Price: {
        color: "#13B34F",
        width: 100,
        textAlign: 'left',
        fontSize: 13,

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
        marginTop: 80,

    },
    title: {
        fontSize: 15,
        color: '#f5f5f5f5',
        fontFamily:global.appFontM,
    },
    textTime: {
        fontSize: 13,
        color: '#d0d0d0d0',
        width: 90,
        textAlign: 'left'

    },
    textVol: {
        fontSize: 15,
        color: '#d0d0d0d0',
        width: 100,
        textAlign: 'right',

    },
    sliderContainer: {
        height: 350,
        width: '96%',
        marginTop: 10,
        justifyContent: 'center',
        alignSelf: 'center',

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
        borderRadius: 4

    },
    fitnessbox: {
        paddingHorizontal: 0,
        // borderWidth: 1,
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 18,
        borderRadius: 20,
    },
    card_box: {
        borderRadius: 0,
        borderColor: '#fff',


        backgroundColor: '#fff'
    },
    text_card: {
        fontSize: 14,
        fontFamily:global.appFontM,
    }
});
