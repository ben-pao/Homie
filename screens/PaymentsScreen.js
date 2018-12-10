import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity,  KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import * as firebase from 'firebase';
import { Keyboard } from 'react-native';

class PaymentsScreen extends Component {

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

    return (
      <View style={containerStyle}>
        <Text style={headerStyle}> Payments </Text>
        <TouchableOpacity
          style={buttonStyle}
          onPress={
            () => this.props.navigation.navigate('CreatePayments')
        }>
          <Text style={buttonTextStyle}> Create Payment </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={buttonStyle}
          onPress={
            () => this.props.navigation.navigate('Charges')
        }>
          <Text style={buttonTextStyle}> View Charges </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={buttonStyle}
          onPress={
            () => this.props.navigation.navigate('Requests')
        }>
          <Text style={buttonTextStyle}> View Requests </Text>
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
    alignItems: 'center',
    borderRadius: 30,
    margin: 8
  },
  buttonTextStyle: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Cochin',
  }
});

export default PaymentsScreen;
