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
    // If user doesn't have a house yet
    StackNavigator.initialRouteName = 'App';
    // If user has a House
    // StackNavigator.initialRouteName = 'App';

    // ...
  } else {
    // User is signed out.
    // ...
    StackNavigator.initialRouteName = 'Login'
  }
});

export default class App extends Component {

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
