import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class CreateHouseScreen extends Component {
  addHouse(data) {
    var key = firebase.database().ref('/Houses').push().key;
    firebase.database().ref('/Grocery').child(key).set({item:data})
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>CreateHouse</Text>
      </View>
    )
  }

}

export default CreateHouseScreen;
