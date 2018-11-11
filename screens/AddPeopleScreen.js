import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity,  KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import * as firebase from 'firebase';
import { Keyboard } from 'react-native';

class AddPeopleScreen extends Component {

  state = {
    email: ""
  }

  render() {
    const { containerStyle,
            wrapperStyle,
            textInputStyle,
            buttonStyle,
            buttonTextStyle
    } = styles;

    return (
      <KeyboardAvoidingView behavior='padding' style={wrapperStyle} enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
          <View style={containerStyle}>
            <TextInput
              style={textInputStyle}
              placeholder="Enter your housemate's email"
              onChangeText={
                (email) => this.setState({email})
              }
              underlineColorAndroid='transparent'
            />

            <TouchableOpacity
              style={buttonStyle}
              onPress={
                () => {
                  this.addUserByEmail(this.state.email);
                }
              }
            >
              <Text style={buttonTextStyle}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={buttonStyle}
              onPress={
                () => this.props.navigation.goBack()
            }>
              <Text style={buttonTextStyle}> Cancel </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  addUserByEmail(email) {
    var ref = firebase.database().ref("/Users");
    var houseref = firebase.database().ref("/Houses");
    var uid = firebase.auth().currentUser.uid;
    // var thisUser = ref.child(uid);
    ref.child(uid).child("HouseID").once("value")
      .then( snapshot => {
        console.log(snapshot);
      })
      .catch( error => {
        alert(error);
      });

    // console.log("In Add() thisUser: " + thisUser);

    // ref.orderByChild("Email").equalTo(email).limitToFirst(1)
    //   .once("value", snapshot => {
    //     // console.log(snapshot);
    //     // console.log(snapshot.key);
    //
    //     if (snapshot.numChildren() === 0) {
    //       alert("User not found");
    //       return;
    //     } else {
    //       snapshot.forEach( user => {
    //         // console.log(user.key);
    //         if (user.child("HouseID").val()) {
    //           this.joinHouse(user.child("HouseID").val());
    //         } else {
    //           alert("User with email " + email + " does not have a house with us");
    //         }
    //       });
    //     }
    //   });

    return;
  }

  GetHouseID (){
    var user = firebase.auth().currentUser;
    if(user == null){
      return;
    }
    var userName = user.providerData[0].displayName;
    var uid = user.uid;
    //var key = firebase.database().ref('/Users').push().key;
    var userDBref = firebase.database().ref('/Users').child(uid)
    var userData = "";

    userDBref.once('value').then(function(snapshot){
      userData = (snapshot.val() && snapshot.val().username);
      console.log(userData);
    });



    // firebase.database().ref('/Users').child(uid).update(
    //     {
    //       houseid: ,
    //     }
    // );
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
    color: '#000',
    fontWeight: 'bold'
  }
});

export default AddPeopleScreen;
