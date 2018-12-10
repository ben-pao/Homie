import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity,  KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import * as firebase from 'firebase';
import { Keyboard } from 'react-native';

class CreateHouseScreen extends Component {

  state = {
    houseName: ''
  }

  render() {
    const { containerStyle,
            wrapperStyle,
            headerStyle,
            textInputStyle,
            buttonStyle,
            buttonTextStyle
    } = styles;

    // const { navigate, goBack } = this.props.navigation;

    return (
      <KeyboardAvoidingView behavior='padding' style={wrapperStyle} enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
          <View style={containerStyle}>
            <Text style={headerStyle}>CreateHouse</Text>
            <TextInput
              style={textInputStyle}
              placeholder='Enter a Name for Your House'
              onChangeText={
                (houseName) => this.setState({houseName})
              }
              underlineColorAndroid='transparent'
            />
            <TouchableOpacity
              style={buttonStyle}
              onPress={
                () => {
                  this.addHouse(this.state.houseName);
                  this.props.navigation.navigate('App');
                }
              }
            >
              <Text style={buttonTextStyle}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={buttonStyle}
              onPress={
                () => {
                  this.props.navigation.goBack();
                }
              }
            >
              <Text style={buttonTextStyle}> Cancel </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  addHouse = (houseName) => {
    // console.log("IN addHouse!\n\n");
    var user = firebase.auth().currentUser;
    var userName = user.providerData[0].displayName;
    var uid = user.uid;
    var key = firebase.database().ref('/Houses').push().key;
    firebase.database().ref('/Houses').child(key)
      .set(
        { HouseName: houseName,
          Users: {[uid]: userName} }
      );
    firebase.database().ref('/Users').child(uid).update(
        {
          HouseID: key,
          HouseName: houseName
        }
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
  wrapperStyle: {
    flex: 1,
  },
  headerStyle: {
    fontSize:24,
    marginBottom:60,
    color: '#fff',
    fontWeight: 'bold',
  },
  textInputStyle: {
    alignSelf: 'stretch',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff'
  },
  buttonStyle: {
    alignSelf: 'stretch',
    backgroundColor: '#eac784',
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

export default CreateHouseScreen;
