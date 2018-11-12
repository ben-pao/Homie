import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, createDrawerNavigator } from 'react-native';
import * as firebase from 'firebase';
import { Keyboard } from 'react-native';

class AddPeopleScreen extends Component {
  // static navigationOptions = {
  //   drawerLabel: 'Home',
  //   // drawerIcon: ({ tintColor }) => (
  //   //   <Image
  //   //     source={require('./chats-icon.png')}
  //   //     style={[styles.icon, {tintColor: tintColor}]}
  //   //   />
  //   // ),
  // };

  constructor() {
    super();
    this.state = {
      houseid: '',
      houseName: '',
    }


  }



  render() {
    const { containerStyle,
            headerStyle,
            buttonStyle,
            buttonTextStyle
    } = styles;

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

export default AddPeopleScreen;
