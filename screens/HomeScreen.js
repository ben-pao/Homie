import React, { Component } from 'react';
import { StyleSheet, Image, Text, View, Button, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import { Keyboard } from 'react-native';
import { createStackNavigator, StackActions, NavigationActions, createBottomTabNavigator } from 'react-navigation';
import GroceryScreen from './GroceryScreen';
import SettingsScreen from './SettingsScreen';

class HomeScreen extends Component {
  // static navigationOptions = {
  //   headerTitle: 'Heyy',
  // };

// class LogoTitle extends React.Component {
//   render() {
//     return (
//       <Image
//         source={require('./homieIcon.png')}
//         style={{ width: 30, height: 30 }}
//       />
//     );
//   }
// }

// class HomeScreen extends Component {
//   static navigationOptions = {
//     headerTitle: <LogoTitle />,
//   };

  render() {
    const { containerStyle,
            headerStyle,
            buttonStyle,
            buttonTextStyle
    } = styles;
    return (
      <View style={containerStyle}>
        <TouchableOpacity
          style={buttonStyle}
          onPress={() => {
            this.props.navigation.navigate('Grocery', {
              otherParam: 'Groceries',
            });
          }}>
          <Text style={buttonTextStyle}> Groceries </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={buttonStyle}
          onPress={
            () => this.props.navigation.navigate('Chores')
        }>
          <Text style={buttonTextStyle}> Chore Wheel </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={buttonStyle}
          onPress={
            () => this.props.navigation.navigate('Settings')
        }>
          <Text style={buttonTextStyle}> Settings </Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={buttonStyle}
          onPress={
            () => {
              firebase.auth().signOut()
                .then(
                  () => {
                    // alert("Byeeeee!");
                    this.props.navigation.navigate('Login');
                  }
                ).catch(
                  (error) => alert(error.toString())
                );
            }
        }>
          <Text style={buttonTextStyle}> Sign out </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    // backgroundColor: '#2896d3',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 40,
    paddingRight: 40,
  },
  headerStyle: {
    fontSize:24,
    marginBottom:60,
    color: '#000',
    // color: '#fff',
    fontWeight: 'bold',
  },
  buttonStyle: {
    alignSelf: 'stretch',
    backgroundColor: 'hotpink',
    // color: '#fff',
    padding: 20,
    alignItems: 'center',
    margin: 8
  },
  buttonTextStyle: {
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'Cochin',
  }
});

export default HomeScreen;
