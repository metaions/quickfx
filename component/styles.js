import React from "react";
import { StyleSheet } from "react-native";
import { useTheme } from '@react-navigation/native';
import {Dimensions} from 'react-native';
import theme from './theme'
import global from "./global";
export const {width: wid,height:len} = Dimensions.get('window');

const appBlue = '#2875CA'
const appSkyblue = '#16B5FF'
const appGray = '#3f3f3f'
const appLightgray = '#d3d3d3'
const appBlack = '#000'
const appLightestGray = '#f8f8f8'
const appDarkGray = '#e9e8e6'
export default StyleSheet.create({
  container: {
    flex: 1,
   backgroundColor:'#2a3040',
 
},
viewbtm:{
  flexDirection:'row',justifyContent: 'space-between',position: 'absolute', bottom: 80,width:'90%',alignSelf: 'center'
  
},
imgback:{
  // flex:1,              
flexDirection: 'column',
// justifyContent: 'space-around',
width: 340,
height: '100%',                                          
borderRadius: 10},
toptxt: {
  fontSize: 30, color: '#000', fontWeight: 'bold', marginTop: 115, alignSelf: 'center'
},
bottomSkip: {
  borderRadius: 20,
  backgroundColor: '#dada10',
   alignItems: 'center',
  justifyContent: 'center',left: 20,
},
bottomNext: {
  borderRadius: 20,
  backgroundColor: '#dada10',
  
  right: 20, alignItems: 'center',
  justifyContent: 'center'
},
midtxt: {
  fontSize: 24, color: '#fff', fontWeight: 'bold', marginTop: 70, alignSelf: 'center', textAlign: 'center'
},
  view:
  {
    flexDirection: 'row',width: '100%',justifyContent: 'space-between',marginVertical:5}
,
  head: {
  color: '#8e929c',
  // fontFamily:"RotundaB",
  // fontFamily:global.appFontM,
  fontSize: 16, marginTop: 10, marginBottom: -5
},
textInput: {
  // backgroundColor: 'grey',
  borderBottomWidth: 0.5,
  borderColor: '#90909090',
  borderRadius: 5,
  fontSize: 15,
  marginBottom: '2%',
  paddingVertical: 5,
  paddingLeft: 10,
},
icons:{
 position:'absolute',
},
touch:{ width: '95%',alignSelf:'center',marginVertical:5,borderRadius:10, alignItems: 'center', paddingLeft: 0 },
touchpro:{ width: '100%', alignItems: 'center', paddingLeft: 0, marginTop:15 },
imgbg:{ height: 75, width: '98%',borderRadius:10,justifyContent: 'center',alignSelf:'center'},
imgpro:{ height: 100, width: '100%', justifyContent:'center' },
bottomview:{alignItems: 'center',flexDirection:'row', width: '80%',paddingLeft:10,},
bottomviewpro:{bottom:25, width: '100%', alignItems: 'center', paddingLeft: 0},
topbtn:{
  width:'31%',
  paddingVertical:5,
  alignItems:'center',justifyContent: 'center',
  borderRadius:5,
  marginHorizontal:'1%',marginVertical:5
},
back:{
  backgroundColor: theme.vbg,
  paddingHorizontal:'3%',
  
  paddingVertical:10,
  borderRadius:10,
  alignSelf:'center',
  width:wid-15
},
slide: {
  flex: 10,
  justifyContent: 'center',
  backgroundColor: 'transparent',
  
},
slideImage: {
  width: '80%',
  height:330,
  alignSelf: 'center',
  borderRadius:5

},
// heading:{
// fontSize:23,
// fontFamily:global.appFontB,
// color:appBlue,
// textAlign:'center',
// marginTop:10
// },
dark_heading:{
fontSize:18,
color:'#29a6ff',
textAlign:'center',

},
sheading:{
fontSize:18,
fontFamily:global.appFontB,
color:'#f5f5f5f5',
textAlign:'center'
},
mheading:{
fontSize:20,
fontFamily:global.appFontB,
color:theme.hgl,
textAlign:'center'
},
back:{
  backgroundColor: theme.vbg,
  paddingHorizontal:'3%',
  
  paddingVertical:10,
  borderRadius:10,
  alignSelf:'center',
  width:wid-15
},
slide: {
  flex: 10,
  justifyContent: 'center',
  backgroundColor: 'transparent',
  
},
slideImage: {
  width: '80%',
  height:330,
  alignSelf: 'center',
  borderRadius:5

},
heading:{
fontSize:23,
fontFamily:global.appFontB,
color:appBlue,
textAlign:'center',
marginTop:10
},
dark_heading:{
fontSize:18,
color:'#29a6ff',
textAlign:'center',

},
sheading:{
fontSize:15,
fontFamily:global.appFontB,
textTransform:'uppercase',
textAlign:'center'
},
mheading:{
fontSize:20,
fontFamily:global.appFontM,
color:theme.hgl,
textAlign:'center'
},
txt:{
fontSize:13,
color:'#f0f0f0f0',

},
txt_head:{
fontSize:18,
color:'#f0f0f0f0',

},
TopBox: {
  marginTop:'30%',
  height:len/1.7,    
   borderRadius:10,
   
}, 
text:{
   color:'#000',
   fontSize:12
},
hgl:{
   color:'#165a05',
   fontSize:15,
   fontFamily:global.appFontM,
},
textInput: {
  paddingLeft:15, 
  fontSize: 15,  
  fontFamily:global.appFontM
   
  
},
TopInnerBox:{
flexDirection:'row',
justifyContent: 'space-between',
paddingHorizontal:15,
marginVertical:10,

},
header: {
flex: 1.4,


},
footer: {
flex: len/300,
borderTopLeftRadius:5,
borderTopRightRadius:5,
backgroundColor: 'transparent',

},
linear:{
  width:'100%',
  alignItems:'center',
  paddingVertical:'2%',
  borderRadius:5,
  flexDirection:'column',
  justifyContent:'flex-end'
},
Blinear:{
  width:'100%',
  alignItems:'center',
  paddingVertical:'4%',
  
  borderRadius:10,  
},
btn:{
  marginVertical:'2%',
  width:'90%',
  height:len/15,
  alignSelf:'center',
},
btn1:{
marginVertical:'1%',
  width:'90%',
  height:len/15,
  alignSelf:'center',

},
Numb:{
color:'#3D3F70',
backgroundColor:'#01060A',
borderWidth:1,
borderColor: '#3D3F70',
borderRadius:30,
width:wid/3.8,
height:len/15,
textAlign:'center',
textAlignVertical:'center',
fontSize:20
},
textSign: {
fontSize: 20,

color: '#c9c9c9'
},
signIn: {
width: 300,
height: 50,
justifyContent: 'center',
alignItems: 'center',
borderRadius: 30,
flexDirection: 'row',
marginTop:15,
alignSelf:'center',
backgroundColor:'#19dc51'
},
dropdown: {
  height: 30,
  borderColor: 'gray',
  borderWidth: 0.5,
  borderRadius: 8,
  paddingHorizontal: 8,
  width:80,zIndex:99999
},
icon: {
  marginRight: 5,
},
label: {
  position: 'absolute',
  backgroundColor: 'white',
  left: 22,
  top: 8,
  zIndex: 999,
  paddingHorizontal: 8,
  fontSize: 14,
},
placeholderStyle: {
  fontSize: 16,color:'grey'
},
selectedTextStyle: {
  fontSize: 16,
},
iconStyle: {
  width: 20,
  height: 20,
},
inputSearchStyle: {
  height: 40,
  fontSize: 16,
},
tour_btn:{
  backgroundColor:'#26a206',
  fontSize:22,
  width:'60%',     
  alignItems: 'center',
  alignSelf: 'center',
  position:'absolute',
  borderRadius:5,
  paddingBottom: 2.5,
  bottom:'19%'
}, tour_btn_text:{
  color:'#fff',
  fontFamily:global.appFontM,
  fontSize:22,

},
});
