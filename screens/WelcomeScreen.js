
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, createDrawerNavigator } from 'react-native';
import * as firebase from 'firebase';


class WelcomeScreen extends Component {
  // static navigationOptions = {
  //   drawerLabel: 'Home',
  //   // drawerIcon: ({ tintColor }) => (
  //   //   <Image
  //   //     source={require('./chats-icon.png')}
  //   //     style={[styles.icon, {tintColor: tintColor}]}
  //   //   />
  //   // ),
  // };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome to Homie</Text>
      <Button
        onPress={
          () => this.props.navigation.navigate('CreateHouse')
          // () => this.props.navigation.openDrawer()
        }
        title="Join a House"
      />
      <Button
        onPress={
          () => this.props.navigation.navigate('CreateHouse')
          // () => this.props.navigation.openDrawer()
        }
        title="Create a House"
      />
      <Button
        onPress={
          () => {
            firebase.auth().signOut()
              .then(
                () => {
                  alert("Byeeeee!");
                  this.props.navigation.navigate('Login');
                }
              ).catch(
                (error) => alert(error.toString())
              )
          }
        }
        title="Sign out"
      />
      </View>
    );
  }
}

export default WelcomeScreen;
