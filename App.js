import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/Login';
import Signup from './components/Signup';
import Grocery from './components/Grocery';
import HomeScreen from './screens/HomeScreen';
import { createStackNavigator } from 'react-navigation';

import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDOWIjm5vykCtb_Tcx98pWuXbB1ejxsCHU",
  authDomain: "homie-9c022.firebaseapp.com",
  databaseURL: "https://homie-9c022.firebaseio.com",
  projectId: "homie-9c022",
  storageBucket: "homie-9c022.appspot.com",
};

firebase.initializeApp(firebaseConfig);

const LoginStack = createStackNavigator(
  {
    Login: Login,
    Signup: Signup
  },
  {
    navigationOptions: {
      header: null,
      // headerStyle: {
      //   backgroundColor: '#f4511e',
      // },
    },
  }
  // ,
  // {
  //   initialRouteName: 'Login'
  // }
);

const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
    Grocery: Grocery,
    // Chores: Chores,
    // Payments: Payments,
    // Messages: Messages,
    // Invite: Invite,
    // Settings: SettinsStack
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      header: null,
      // headerStyle: {
      //   backgroundColor: '#f4511e',
      // },
    },
  }
);

const StackNavigator = createStackNavigator(
  {
    Login: LoginStack,
    App: AppStack,
  },
  {
    // header: null
    initialRouteName: 'Login',
    navigationOptions: {
      header: null
      // headerStyle: {
      //   backgroundColor: '#f4511e',
      // },
      // headerTintColor: '#fff',
      // headerTitleStyle: {
      //   fontWeight: 'bold',
    },
      // title: 'Homie'

  }
);



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
