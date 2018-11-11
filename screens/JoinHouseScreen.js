import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity,  KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import * as firebase from 'firebase';
import { Keyboard } from 'react-native';

class JoinHouseScreen extends Component {

  state = {
    houseID: "",
    housemateEmail: "",
  }

  render() {
    const { containerStyle,
            wrapperStyle,
            headerStyle,
            textInputStyle,
            buttonStyle,
            buttonTextStyle
    } = styles;

    const { navigate, goBack } = this.props.navigation;

    return (
      <KeyboardAvoidingView behavior='padding' style={wrapperStyle} enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
          <View style={containerStyle}>
            <Text style={headerStyle}>Join a House</Text>
            <TextInput
              style={textInputStyle}
              placeholder='Enter the ID of your house'
              onChangeText={
                (houseID) => this.setState({houseID})
              }
              underlineColorAndroid='transparent'
            />
            <TextInput
              style={textInputStyle}
              placeholder="Enter your housemate's email"
              onChangeText={
                (housemateEmail) => this.setState({housemateEmail})
              }
              underlineColorAndroid='transparent'
            />
            <TouchableOpacity
              style={buttonStyle}
              onPress={
                () => {
                  // this.joinHouse(this.state.houseID);
                  this.submitJoinInput(this.state);
                }
              }
            >
              <Text style={buttonTextStyle}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={buttonStyle}
              onPress={
                () => goBack()
            }>
              <Text style={buttonTextStyle}> Cancel </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  submitJoinInput(state) {
    if (this.badInput(state)) {
      return;
    }
    if (state.houseID.length > 0) {
      this.joinHouse(state.houseID);
    } else {
      this.joinByEmail(state.housemateEmail);
    }
  }

  // check inputs aren't both null or both filled
  badInput(state) {
    var houseID = state.houseID;
    var email = state.housemateEmail;

    if ( (!houseID || houseID.length === 0) &&
         (!email || email.length === 0) ) {
      alert("Please enter either a house ID or an email");
      return true;
    } else if (houseID.length > 0 && email.length > 0) {
      alert("Please only fill out one field");
      return true;
    } else {
      return false;
    }
  }

  // // Find house id by email of a user in the house
  // findHouseIDByEmail = new Promise(
  //   function(email) {
  //     houseID = "";
  //     if (houseID) {
  //       resolve(houseID);
  //     }
  //     else {
  //       reject(houseID);
  //     }
  //   }
  // )

  joinByEmail(email) {
    // alert("Join by email!!!");
    // email = "1";
    // Get user with Email = email
    var ref = firebase.database().ref("/Users");
    var uid = "";
    ref.orderByChild("Email").equalTo(email).limitToFirst(1)
      .once("value", snapshot => {
        // console.log(snapshot);
        // console.log(snapshot.key);

        if (snapshot.numChildren() === 0) {
          alert("User not found");
          return;
        } else {
          snapshot.forEach( user => {
            // console.log(user.key);
            if (user.child("HouseID").val()) {
              this.joinHouse(user.child("HouseID").val());
            } else {
              alert("User with email " + email + " does not have a house with us");
            }
          });
        }
      });

    return;
  }

  joinHouse(houseID) {
    // console.log("IN joinHouse!\n\n");
    const { navigate } = this.props.navigation;
    var user = firebase.auth().currentUser;
    var userName = user.providerData[0].displayName;
    var uid = user.uid;
    var houseref = firebase.database().ref("/Houses");
    // Check if house exists
    houseref.child(houseID).once("value")
      .then(function(snapshot) {
        console.log(snapshot);
        if (snapshot.exists()) { // House exists
          console.log("House exists");
          // Add user info to the house
          houseref.child(houseID).child("Users")
          .update({
            [uid]: userName
          })
          .then(() => {
            console.log("userid and userName added to db");
            // Add house info to user
            firebase.database().ref("/Users").child(uid)
              .update({
                HouseID: houseID,
                HouseName: snapshot.child("HouseName").val()
              })
              .then(() => {
                console.log("House info added to user");
                navigate('App');
              });
          });
        }
        else {
          alert("House with ID " + houseID + " doesn't exists");
        }
      })
      .catch( (error) => {
        alert(error.toString());
      });
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

export default JoinHouseScreen;
