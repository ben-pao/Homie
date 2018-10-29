
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, createDrawerNavigator } from 'react-native';

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
      </View>
    );
  }
}

export default WelcomeScreen;
