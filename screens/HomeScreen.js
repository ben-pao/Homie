import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, createDrawerNavigator } from 'react-native';
import { createStackNavigator, StackActions, NavigationActions, createBottomTabNavigator } from 'react-navigation';

class HomeScreen extends Component {
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
        <Text> This is the home page </Text>
      </View>
    );
  }
}

class GroceryScreen extends React.Component{
  render(){
    return(
      <View style= {{ flex: 1, justifyContent:'center', alignItems: 'center'}}>
        <Text>Grocery!</Text>
        <Button
          title="Go to Grocery"
          onPress={()=> this.props.navigation.navigate('Grocery')}
        />
      </View>
      );
  }
}

class SettingsScreen extends React.Component{
  render(){
    return(
      <View style= {{ flex: 1, justifyContent:'center', alignItems: 'center'}}>
        
        <Button
          title=" Log out (Go to Login Screen)"
          onPress={()=> this.props.navigation.navigate('Login')}
        />

        <Button
          title=" Create a new house"
          onPress={()=> this.props.navigation.navigate('CreateHouseScreen')}
        />


      </View>
      );
  }
}

// export default createStackNavigator({
//   Home: {
//     screen: HomeScreen,
//   },
// }, 
//   {
//     initialRouteName: 'Home',

// });

export default createBottomTabNavigator({
  Home: HomeScreen,
  Grocery: GroceryScreen,
  Settings: SettingsScreen,
  // Grocery: GroceryScreen,
});
