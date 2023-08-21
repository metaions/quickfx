/**
 * @format
 */

import {AppRegistry,Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification'
import testing from './testing'

PushNotification.configure({ 
    onNotification: function(notification) {
        console.log('notification is-----------',notification);
    },
    requestPermissions:Platform.OS==='ios'
});
// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  
    console.log('Message handled in the background!');
  });
AppRegistry.registerComponent(appName, () => App);//
