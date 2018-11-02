import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, createDrawerNavigator } from 'react-native';
import * as firebase from 'firebase';
import { Keyboard } from 'react-native';

class JoinHouse extends Component {

  state = {
    houseID: ''
  }

  render() {
    const { containerStyle,
            headerStyle,
            buttonStyle,
            buttonTextStyle
    } = styles;

    return (
      <KeyboardAvoidingView behavior='padding' style={wrapperStyle} enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
          <View style={containerStyle}>
            <Text style={headerStyle}>Join a House</Text>
            <TextInput
              style={textInputStyle}
              placeholder='Enter your house ID'
              onChangeText={
                (houseName) => this.setState({houseID})
              }
              underlineColorAndroid='transparent'
            />
            <TouchableOpacity
              style={buttonStyle}
              onPress={
                () => this.addHouse(this.state.houseName)
              }>
              <Text style={buttonTextStyle}>Submit</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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

export default JoinHouse;
