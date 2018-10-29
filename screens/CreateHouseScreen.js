import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';

class CreateHouseScreen extends Component {

  state = {
    houseName: ''
  }

  render() {
    const { containerStyle,
            headerStyle,
            textInputStyle,
            buttonStyle,
            buttonTextStyle
    } = styles;

    return (
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
          onPress={ this.addHouse(this.state.houseName) }>
          <Text style={buttonTextStyle}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }

  addHouse(houseName) {
    var user = firebase.auth().currentUser;
    var userName = user.providerData[0].displayName;
    var uid = user.uid;
    var key = firebase.database().ref('/Houses').push().key;
    firebase.database().ref('/Houses').child(key)
      .set(
        { HouseName: houseName,
          Users: {uid: userName} }
      );
  }
}

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
  textInputStyle: {
    alignSelf: 'stretch',
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#fff'
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

export default CreateHouseScreen;
