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

class SettingsScreen extends React.Component{
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
  Settings: SettingsScreen,
  // Grocery: GroceryScreen,
});
