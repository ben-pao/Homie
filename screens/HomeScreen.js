import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, createDrawerNavigator } from 'react-native';
import * as firebase from 'firebase';
import { Keyboard } from 'react-native';
import { createStackNavigator, StackActions, NavigationActions, createBottomTabNavigator } from 'react-navigation';

class HomeScreen extends Component {
  // static navigationOptions = {
  //
  //   // drawerLabel: 'Home',
  //   // drawerIcon: ({ tintColor }) => (
  //   //   <Image
  //   //     source={require('./chats-icon.png')}
  //   //     style={[styles.icon, {tintColor: tintColor}]}
  //   //   />
  //   // ),
  // };
  render() {
    const { containerStyle,
            headerStyle,
            buttonStyle,
            buttonTextStyle
    } = styles;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
                )
            }
        }>
          <Text style={buttonTextStyle}> Sign out </Text>
        </TouchableOpacity>

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

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen,
});

const GroceryStack = createStackNavigator({
  Home: HomeScreen,
  Grocerys: GroceryScreen,
});

const SettingStack = createStackNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen,
});

export default createBottomTabNavigator({
  Home: HomeScreen,
  Grocerys: GroceryScreen,
  Settings: SettingsScreen,
},

);

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    // backgroundColor: '#2896d3',
    backgroundColor: '#fff',
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
    // backgroundColor: '#01c853',
    backgroundColor: '#000',
    // color: '#fff',
    padding: 20,
    alignItems: 'center',
    margin: 8
  },
  buttonTextStyle: {
    color: '#fff',
    fontWeight: 'bold'
  }
});

// export default HomeScreen;
