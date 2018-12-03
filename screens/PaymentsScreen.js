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
    // backgroundColor: '#2896d3',
    backgroundColor: '#000',
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
    backgroundColor: 'hotpink',
    // color: '#fff',
    padding: 20,
    alignItems: 'center',
    margin: 8
  },
  buttonTextStyle: {
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'Cochin',
  }
});

export default PaymentsScreen;
