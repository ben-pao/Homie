import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity,  KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import * as firebase from 'firebase';
import { Keyboard } from 'react-native';

class PaymentsScreen extends Component {

  state = {
    paymentName: ''
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
            <Text style={headerStyle}>Add a Payment</Text>
            <TextInput
              style={textInputStyle}
              placeholder='Enter a Payment'
              onChangeText={
                (paymentName) => this.setState({paymentName})
              }
              underlineColorAndroid='transparent'
            />
            <TextInput
              style={textInputStyle}
              placeholder='Enter the Payment Quantity'
              onChangeText={
                (paymentQuantity) => this.setState({paymentQuantity})
              }
              underlineColorAndroid='transparent'
            />
            <TextInput
              style={textInputStyle}
              placeholder='Enter the Housemate to Charge'
              onChangeText={
                (userCharge) => this.setState({userCharged})
              }
              underlineColorAndroid='transparent'
            />
            <TouchableOpacity
              style={buttonStyle}
              onPress={
                () => {
                  this.addPayment(this.state.paymentName);
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

  addPayment = (paymentName) => {
    // console.log("IN addPayment!\n\n");
    var user = firebase.auth().currentUser;
    var userName = user.providerData[0].displayName;
    var uid = user.uid;
    var key = firebase.database().ref('/Payments').push().key;
    firebase.database().ref('/Payments').child(key)
      .set(
        { PaymentName: paymentName,
          Users: {[uid]: userName} }
      );
    firebase.database().ref('/Users').child(uid).update(
        {
          PaymentID: key,
          PaymentName: paymentName
        }
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
    color: '#fff',
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
    backgroundColor: 'hotpink',
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

export default PaymentsScreen;
