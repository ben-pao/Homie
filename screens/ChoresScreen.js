import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity,  KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';

import * as firebase from 'firebase';
import { Keyboard } from 'react-native';

class ChoresScreen extends Component {
  state = {
    userID: "",
    houseID: "",
    choreName: "",
    description: "",
    frequency: "",
    users: [],
  }

  componentDidMount() {
    this._loadUserInfo().done();
    this._loadHouseInfo().done();
  }

  _loadUserInfo = async () => {
    var uid = firebase.auth().currentUser.uid;
    var userRef = firebase.database().ref("/Users").child(uid);
    userRef.once("value")
    .then(snapshot => {
      // console.log(snapshot.key);
      var user = snapshot.val();
      // console.log(user);
      // console.log(user.HouseID);
      this.setState({
        userID: uid,
        houseID: user.HouseID
      });
      // console.log(this.state);
    })
    .catch( error => {
        console.log(error);
    });

    // console.log("Hi");
  }

  _loadHouseInfo = async () => {
    var uid = firebase.auth().currentUser.uid;
    var houseIDRef = firebase.database().ref("/Users").child(uid).child("HouseID");
    var houseRef = firebase.database().ref("/Houses");
    var userRotationList = [];
    houseIDRef.once("value")
    .then( snapshot => {
      var houseID = snapshot.val();
      houseRef.child(houseID).child("Users").once("value")
      .then( snapshot => {
        console.log(snapshot);
        console.log(snapshot.val());
        var users = snapshot.val();
        userRotationList = Object.keys(users);
        console.log(userRotationList);
        this.setState({
          users: userRotationList
        });
      });
    })
    .catch( error => {
      console.log(error);
    });
  }

  render() {
    const { wrapperStyle,
            containerStyle,
            textInputStyle,
            headerStyle,
            buttonStyle,
            buttonTextStyle
    } = styles;

    return (
        <KeyboardAvoidingView behavior='padding' style={wrapperStyle} enabled>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <View style={containerStyle}>
              <Text style={headerStyle}>Add a Chore</Text>
              <TextInput
                style={textInputStyle}
                placeholder="Chore"
                onChangeText={
                  (choreName) => this.setState({choreName})
                }
                underlineColorAndroid='transparent'
              />

              <TextInput
                style={textInputStyle}
                placeholder="Description"
                onChangeText={
                  (description) => this.setState({description})
                }
                underlineColorAndroid='transparent'
              />

              <TextInput
                style={textInputStyle}
                placeholder="Frequency"
                onChangeText={
                  (frequency) => this.setState({frequency})
                }
                underlineColorAndroid='transparent'
              />

              <TouchableOpacity
                style={buttonStyle}
                onPress={
                  () => {
                    this.addChore(this.state).done();
                    this.props.navigation.goBack();
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

  getTodayDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    }

    if(mm<10) {
        mm = '0'+mm
    }

    today = mm + '-' + dd + '-' + yyyy;

    return today;
  }

  addChore = async (state) => {
    // console.log("addChore pressed");
    // console.log(state);
    var today = this.getTodayDate();
    // console.log(today);
    var choresRef = firebase.database().ref("/Chores").child(state.houseID);
    var key = choresRef.push().key;
    choresRef.child(key).set({
      ChoreName: state.choreName,
      Description: state.description,
      Date: today,
      Freq: state.frequency,
      Users: state.users,
      Current: 1
    });
    //
    // console.log(userData);
    // return;
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

export default ChoresScreen;
