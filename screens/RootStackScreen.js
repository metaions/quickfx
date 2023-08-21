/* eslint-disable prettier/prettier */
import * as React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './Starting/SplashScreen';
import SignInScreen from './Starting/SignInScreen';
import SignUpScreen from './Starting/SignUpScreen';
import SignUpDetail from './Starting/SignUpDetail';
import BeforePage from './Starting/BeforePage';
import BeforeSignUp from './Starting/BeforeSignUp';
// import TrainerStatScreen1 from './Starting/TrainerStatScreen1';
// import KYCScreen from './Starting/KYCScreen';
import ForgotPass from './Starting/ForgotPassScreen';
import RestoreWallet from './Starting/RestoreWallet';


const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => (
    <RootStack.Navigator >


        <RootStack.Screen name='BeforePage' options={{ headerTitleAlign: 'center',headerShown:false }}
         component={BeforePage} />
          {/* <RootStack.Screen name='BeforeSignUp' options={{ headerTitleAlign: 'center',headerShown:false }}
         component={BeforeSignUp} /> */}
        <RootStack.Screen name='SignInScreen' options={{ headerTitleAlign: 'center',headerShown:false }} component={SignInScreen} />
        <RootStack.Screen name='SignUpScreen' options={{ headerTitleAlign: 'center',headerShown:false }} component={SignUpScreen} />
        <RootStack.Screen name='Restore' options={{ headerTitleAlign: 'center',headerShown:false }} component={RestoreWallet} />
        {/* <RootStack.Screen name="KYC" options={{ headerTitleAlign: 'center',headerShown:false }} component={KYCScreen} /> */}
        <RootStack.Screen name="ForgotPass" options={{ headerTitleAlign: 'center',headerShown:false }} component={ForgotPass} />
        <RootStack.Screen name="SignUpDetail" options={{ headerTitleAlign: 'center',headerShown:false }} component={SignUpDetail} />

    </RootStack.Navigator>

);

export default RootStackScreen;

