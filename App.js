import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './navigation/Navigation';
import { Permissions, Notifications } from 'expo';

import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDOWIjm5vykCtb_Tcx98pWuXbB1ejxsCHU",
  authDomain: "homie-9c022.firebaseapp.com",
  databaseURL: "https://homie-9c022.firebaseio.com",
  projectId: "homie-9c022",
  storageBucket: "homie-9c022.appspot.com",
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    StackNavigator.initialRouteName = 'App'

    // ...
  } else {
    // User is signed out.
    // ...
  }
});

async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  console.log("push notification token");
  console.log(token);
  // POST the token to your backend server from where you can retrieve it to send push notifications.
  return;
}

export default class App extends Component {

  componentDidMount() {
    // this.registerForPushNotificationsAsync().done();
    registerForPushNotificationsAsync();
  }




  render() {
    return(
        <StackNavigator />
        );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
