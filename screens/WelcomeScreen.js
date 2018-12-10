import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';


class WelcomeScreen extends Component {

  // For testing if user.displayName was stored in signup
  componentDidMount() {
    this.printUser();
  }

  printUser() {
    user = firebase.auth().currentUser;
    // console.log("\n\n\n\n\nIn welcome");
    // console.log(user);
  }


  render() {
    const { containerStyle,
            headerStyle,
            buttonStyle,
            buttonTextStyle
    } = styles;

    return (
      <View style={containerStyle}>
        <Text style={headerStyle}>
          Welcome to Homie
        </Text>

        <TouchableOpacity
          style={buttonStyle}
          onPress={
            () => this.props.navigation.navigate('JoinHouse')
        }>
          <Text style={buttonTextStyle}> Join a House </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={buttonStyle}
          onPress={
            () => this.props.navigation.navigate('CreateHouse')
        }>
          <Text style={buttonTextStyle}> Create a House </Text>
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

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 40,
    paddingRight: 40,
  },
  headerStyle: {
    fontSize:24,
    marginBottom:60,
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonStyle: {
    alignSelf: 'stretch',
    backgroundColor: '#eac784',
    borderRadius: 30,
    padding: 20,
    borderRadius: 30,
    alignItems: 'center',
    margin: 8
  },
  buttonTextStyle: {
    color: '#fff',
    fontWeight: 'bold'
  }
});

export default WelcomeScreen;
