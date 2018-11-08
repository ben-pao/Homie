import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, createDrawerNavigator } from 'react-native';
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

  render() {
    const { containerStyle,
            headerStyle,
            buttonStyle,
            buttonTextStyle
    } = styles;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text> You can add people to your house here! </Text>
        {this.GetHouseID()}
      </View>
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

export default AddPeopleScreen;
