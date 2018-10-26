import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/Login';
import Signup from './components/Signup';
import Grocery from './components/Grocery';

import * as firebase from 'firebase';


import { createStackNavigator } from 'react-navigation';

const firebaseConfig = {
  apiKey: "AIzaSyDOWIjm5vykCtb_Tcx98pWuXbB1ejxsCHU",
  authDomain: "homie-9c022.firebaseapp.com",
  databaseURL: "https://homie-9c022.firebaseio.com",
  projectId: "homie-9c022",
  storageBucket: "homie-9c022.appspot.com",
};

firebase.initializeApp(firebaseConfig);


class HomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

const Application = createStackNavigator(
  {
    Login: { screen: Login},
    Signup: {screen: Signup},
    Home: HomeScreen,
    Grocery: { screen: Grocery}
  },
  {
    initialRouteName: 'Login'
  }
);



export default class App extends Component {
  render() {
    return(
        <Application />
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
