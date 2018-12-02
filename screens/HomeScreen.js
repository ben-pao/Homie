import React, { Component } from 'react';
import { StyleSheet, Image, Text, View, Button, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import { Keyboard } from 'react-native';
import { createStackNavigator, StackActions, NavigationActions, createBottomTabNavigator } from 'react-navigation';
import GroceryScreen from './GroceryScreen';
import SettingsScreen from './SettingsScreen';
import NotificationContainer from '../components/NotificationContainer';

class HomeScreen extends Component {
// class LogoTitle extends React.Component {
//   render() {
//     return (
//       <Image
//         source={require('../assets/homieIcon.png')}
//         style={{ width: 30, height: 30 }}
//       />
//     );
//   }
// }
//
// class HomeScreen extends Component {
//   static navigationOptions = {
//     headerTitle: <LogoTitle />,
//   };
  state = {
    token: ""
  }

  componentDidMount() {
    try{
      this.getMyToken();
    }catch(err){
      console.log("getMyToken didn't run");
      console.log(err.toString() );
    }
  }

  render() {
    const { containerStyle,
            headerStyle,
            buttonStyle,
            buttonTextStyle
    } = styles;
    return (
      <View style={containerStyle}>
        {//<TouchableOpacity style={buttonStyle}>
        }
          <NotificationContainer/>
        {//</TouchableOpacity>
        }
        <TouchableOpacity
          style={buttonStyle}
          onPress={
            () => {
              this.sendPushNotification('0', 'Hi', 'HIIIII');
            }
          }>
          <Text style={buttonTextStyle}> Send a test notification </Text>
        </TouchableOpacity>
        <TouchableOpacity style={buttonStyle}>
          <Text style={buttonTextStyle}> A dashboard for notifications and housemate updates if we have time! </Text>
        </TouchableOpacity>
      </View>
    );
  }

  sendPushNotification(token, title, body) {
    // token = this.getMyToken().done();
    token = this.state.token;
    if (token) {
      return fetch('https://exp.host/--/api/v2/push/send',
      {
        body: JSON.stringify({
          sound: "default",
          badge: 1,
          to: token,
          title: title,
          body: body,
          data: { message: `${title} - ${body}` },
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
    } else {
      alert("Some error occured when sending notification");
      return;
    }
  }

  getMyToken() {
    var user = firebase.auth().currentUser;
    var userName = user.providerData[0].displayName;
    var uid = user.uid;
    firebase.database().ref("/Users").child(uid).child("Token")
      .once('value')
      .then(snapshot => {
        if (snapshot.exists()) {
          console.log("token:" + snapshot.val());
          this.setState( {token: snapshot.val()} );
          return snapshot.val();
        } else {
          alert("Notification token not found!");
          return;
        }
      })
      .catch( error => {
        alert(error.toString());
        return;
      });
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    // backgroundColor: '#2896d3',
    // backgroundColor: '#000',
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

export default HomeScreen;
