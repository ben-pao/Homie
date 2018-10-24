import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Grocery from './Components/Grocery';

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

const Application = createStackNavigator({
  Home: { screen: Login},
  Signup: {screen: Signup},
  Grocery: { screen: Grocery}

});



export default class App extends React.Component {
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
