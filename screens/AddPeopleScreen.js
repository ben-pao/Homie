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
                  // this.getHouseIDToAdd(this.state.email);
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

<<<<<<< HEAD

=======
  emailNotNull(email) {
    if (email && email.length > 0) return true;
    else return false;
  }

  addUserByEmail(email) {
    if (this.emailNotNull(email))
      this.getHouseIDToAdd(email);
    else
      alert("Please enter your housemate's email");
  }

  getHouseIDToAdd(email) {
    var ref = firebase.database().ref("/Users");
    var uid = firebase.auth().currentUser.uid;
    // var thisUser = ref.child(uid);

    ref.child(uid).child("HouseID").once("value") // Get house id
      .then( snapshot => {
        console.log(snapshot.val());
        if (!snapshot.exists()) {
          alert("You do not have a house yet!");
          return;
        }
        this.getUIDToAdd(email, snapshot.val());
      })
      .catch( error => {
        alert(error);
      });
  }

  getUIDToAdd(email, houseID) {
    var ref = firebase.database().ref("/Users");

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
              alert("User with email " + email + " already has a house with us!");
            } else {
              var userName = user.child("FirstName").val() + " " + user.child("LastName").val();
              console.log(userName);
              this.joinHouseWithUIDHouseID(user.key, userName, houseID);
            }
          });
        }
      }, error => {
        alert(error);
      });
  }
>>>>>>> master

  joinHouseWithUIDHouseID(uid, userName, houseID) {
    // console.log("IN joinHouse!\n\n");
    const { navigate } = this.props.navigation;

<<<<<<< HEAD
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text> You can add people to your house here! </Text>
        <TouchableOpacity
          style={buttonStyle}
          onPress={
            () => {
              // this.joinHouse(this.state.houseID);
              this.GetHouseID();
            }
          }
        >
          <Text style={buttonTextStyle}>get houseid</Text>
        </TouchableOpacity>
      </View>
    );
  }

  GetHouseID (){
  var user = firebase.auth().currentUser;
  if(user == null){
    return;
  }
  var userName = user.providerData[0].displayName;
  var uid = user.uid;
  //alert(uid);
  //var key = firebase.database().ref('/Users').push().key;
  var userDBref = firebase.database().ref('/Users').child(uid)
  var userData = "";
  userDBref.on('value', function(snapshot){
    userData = snapshot.val();
    console.log(userData.HouseID);
    var userHouseref = firebase.database().ref('/Houses').child(userData.HouseID)
    var housedata = "";
    userHouseref.on('value', function(snapshot){
      housedata = snapshot.val();
      console.log(housedata);
      alert(housedata.HouseName);
        }, function (error) {
          console.log("Error: " + error.code);
    });
  //  alert(housedata.HouseName);
  } , function (error) {
   console.log("Error: " + error.code);
  });
  console.log(userData);  //userdata is only local insidee that userDBref

}


=======
    var houseref = firebase.database().ref("/Houses");
    // Check if house exists
    houseref.child(houseID).once("value")
      .then( snapshot => {
        // console.log(snapshot);
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
                // navigate('App');
                this.props.navigation.goBack();
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
>>>>>>> master
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
