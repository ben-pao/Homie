import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity,  KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import * as firebase from 'firebase';
import { Keyboard } from 'react-native';
import { createStackNavigator } from 'react-navigation';

var data = []

export default class PaymentsScreen extends React.Component {

  constructor(props){
    super(props);
    // frontend display of list from react native
  //  this.ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 != r2})
    this.state = {
      houseID: '',
      userID: '',
      userName: '',
      listViewData: data,
      paymentName: '',
      paymentQuantity: '',
      johns: ''
    }
  }
  componentDidMount(){
    var that = this
    console.log("in componenet did mount")
    that.setStates();


  }

  // setStates(){
  //   var that = this;
  //   var user = firebase.auth().currentUser;
  //   if(user == null){
  //     alert("not logged in");
  //     return;
  //   }
  //   var uid = user.uid;
  //   //alert(uid);
  //   //var key = firebase.database().ref('/Users').push().key;
  //   var userData = "";
  //   var userDBref = firebase.database().ref('/Users').child(uid)
  //
  //   //set the states with info in users table
  //   userDBref.on('value', function(snapshot){
  //     userData = snapshot.val();
  //     console.log(userData.HouseID);
  //     that.setState({
  //       houseID: userData.HouseID,
  //       userID: uid,
  //       userName: userData.FirstName
  //     });
  //
  //   }
  setStates(){
    var that = this;
    var user = firebase.auth().currentUser;
    if(user == null){
      alert("not logged in");
      return;
    }
    var uid = user.uid;
    //alert(uid);
    //var key = firebase.database().ref('/Users').push().key;
    var userData = "";
    var userDBref = firebase.database().ref('/Users').child(uid)

    //set the states with info in users table
    userDBref.on('value', function(snapshot){
      userData = snapshot.val();
      console.log(userData.HouseID);
      that.setState({
        houseID: userData.HouseID,
        userID: uid,
        userName: userData.FirstName
      });
      console.log(that.state.houseID);
    //  return userData.HouseID;
    } , function (error) {
     console.log("Error: " + error.code);
    });
  }


  addPayment(paymentName, paymentQuantity, johns) {
     console.log("IN addPayment!");
    var user = firebase.auth().currentUser;
    var userName = user.providerData[0].displayName;
    var uid = user.uid;
  //  var key = firebase.database().ref('/Payments').push().key;
    var paymentHouseJohnsRef = firebase.database().ref('/Payments').child(this.state.houseID).child(johns)
    var paymentHousePimpRef = firebase.database().ref('/Payments').child(this.state.houseID).child(uid)
    var requestedRef = paymentHousePimpRef.child('/Requested');
    var paymentsRef = paymentHouseJohnsRef.child('/Payment');
    var key = requestedRef.push().key;
    requestedRef.child(key)
      .set(
        { PaymentName: paymentName,
          Johns: johns, //person whose charging
          PaymentAmount: paymentQuantity,
          PaymentID: key
      });
    paymentsRef.child(key)
      .set(
        {
          PaymentName: paymentName,
          Pimp: uid, //whose being charged //Maybe make it a list for utilities
          PaymentAmount: paymentQuantity,
          PaymentID: key
        }
      );

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
                (johns) => this.setState({johns})
              }
              underlineColorAndroid='transparent'
            />
            <TouchableOpacity
              style={buttonStyle}
              onPress={
                () => {//
                  this.addPayment(this.state.paymentName,this.state.paymentQuantity, this.state.johns);
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

//export default CreatePaymentsScreen;
