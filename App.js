import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import GroceryScreen from './screens/GroceryScreen';
import ChoresScreen from './screens/ChoresScreen';
import HomeScreen from './screens/HomeScreen';
import CreateHouseScreen from './screens/CreateHouseScreen';
import JoinHouseScreen from './screens/JoinHouseScreen';
import SettingsScreen from './screens/SettingsScreen';
import AddPeopleScreen from './screens/AddPeopleScreen';
import ProfileScreen from './screens/ProfileScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import AboutScreen from './screens/AboutScreen';
import { createStackNavigator, createDrawerNavigator, createBottomTabNavigator } from 'react-navigation';

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
    Login: LoginScreen,
    Signup: SignupScreen,
    Welcome: WelcomeScreen,
    CreateHouse: CreateHouseScreen,
    JoinHouse: JoinHouseScreen,
  },
  {
    initialRouteName: 'Login',
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  }
);

const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
    Grocery: GroceryScreen,
    Chores: ChoresScreen,
    // Payments: Payments,
    // Messages: Messages,
    // Invite: Invite,
    Settings: SettingsScreen,
    AddPeople: AddPeopleScreen
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#000',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      // header: null,
      gesturesEnabled: false,
    },
  }
);

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
    AddPeople: AddPeopleScreen,
    Profile: ProfileScreen,
    About: AboutScreen
  }
)

const StackNavigator = createStackNavigator(
  {
    Login: LoginStack,
    App: AppStack,
  },
  {
    // initialRouteName: 'Login',
    initialRouteName: 'App', // Skip Login page (for testing)
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    }
  }
);

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
