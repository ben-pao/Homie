import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/LoginScreen';
import Signup from './screens/SignupScreen';
import Grocery from './screens/GroceryScreen';
import HomeScreen from './screens/HomeScreen';
import CreateHouseScreen from './screens/CreateHouseScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

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
    Signup: Signup,
    Welcome: WelcomeScreen,
    CreateHouse: CreateHouseScreen,
  },
  {
    initialRouteName: 'Login',
    navigationOptions: {
      header: null,
    },
  }
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
    },
  }
);

const StackNavigator = createStackNavigator(
  {
    Login: LoginStack,
    App: AppStack,
  },
  {
    initialRouteName: 'Login',
    // initialRouteName: 'App', // Skip Login page (for testing)
    navigationOptions: {
      header: null
    }
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
