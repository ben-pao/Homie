import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, AsyncStorage, TouchableWithoutFeedback } from 'react-native';
import { createStackNavigator, StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
// import DismissKeyboard from 'dismissKeyboard';
import { Keyboard } from 'react-native';
import { Permissions, Notifications } from 'expo';
import registerForPushNotificationsAsync from '../components/registerForPushNotificationsAsync';
import registerForPushNotification from '../components/registerForPushNotificationsAsync';

export default class LoginScreen extends Component {

  state = {
    email: '',
    password: '',
    // token: ''
  }

//checks if logged in before
  // componentDidMount() {
  //   this._loadInitialState().done();
  //   // Get token for notif
  //   // this.registerForPushNotificationsAsync().done();
  // }

  _loadInitialState = async () => {
    var value = await AsyncStorage.getItem('user');
    console.log('User: ' + value);
    if (value !== null) {
      //youre logged in so
      // if User has a House
        // this.props.navigation.navigate('App');
      // else
        this.props.navigation.navigate('Welcome');
    }
  }

  // registerForPushNotificationsAsync = async () => {
  //   const { status: existingStatus } = await Permissions.getAsync(
  //     Permissions.NOTIFICATIONS
  //   );
  //   let finalStatus = existingStatus;
  //
  //   // only ask if permissions have not already been determined, because
  //   // iOS won't necessarily prompt the user a second time.
  //   if (existingStatus !== 'granted') {
  //     // Android remote notification permissions are granted during the app
  //     // install, so this will only ask on iOS
  //     const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  //     finalStatus = status;
  //   }
  //
  //   console.log("finalStatus");
  //   console.log(finalStatus);
  //
  //   // Stop here if the user did not grant permissions
  //   if (finalStatus !== 'granted') {
  //     return;
  //   }
  //
  //   // Get the token that uniquely identifies this device
  //   let token = await Notifications.getExpoPushTokenAsync();
  //
  //   console.log("push notification token");
  //   console.log(token);
  //   // POST the token to your backend server from where you can retrieve it to send push notifications.
  //   this.setState({token});
  //   return;
  // }

  render() {
    const { container,
            wrapper,
            header,
            textInput,
            btn,
            btnText
    } = styles;

    return (
      <KeyboardAvoidingView behavior='padding' style={wrapper} enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
          <View style={container}>
            <Text style={header}>LOGIN</Text>

            <TextInput
              style={textInput}
              placeholder='Email'
              onChangeText={
                (email) => this.setState({email})
              }
              underlineColorAndroid='transparent'
            />

            <TextInput
              style={textInput}
              secureTextEntry={true}
              placeholder='Password'
              value={this.state.password}
              onChangeText={
                (password) => this.setState({password})
              }
              underlineColorAndroid='transparent'
            />

            <TouchableOpacity
              style={btn}
              onPress={
                () => {
                  // registerForPushNotificationsAsync();
                  // registerForPushNotification();
                  this.login(this.state.email, this.state.password)
                }
              }>
              <Text style={btnText}> Log in </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={btn}
              onPress={
                () => this.props.navigation.navigate('Signup')
            }>
              <Text style={btnText}> Sign up </Text>
            </TouchableOpacity>

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

    );
  }

  login = (email, password) => {
    // console.log("hi\n");
    //  alert(email);
    const { navigate } = this.props.navigation;
      try {
        //console.log(email)
        //console.log(password)
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
          (user) => {
            // console.log(user);
            this.setState( {password: ''} );
            var uid = user.user.uid;
            var user = firebase.database().ref("/Users").child(uid);
            // Check if current user has a house
            user.once("value")
              .then(function(snapshot) {
                var hasHouse = snapshot.child("HouseID").exists();
                // console.log("In Login(): hasHouse = " + hasHouse);
                if (hasHouse) navigate("App");
                else navigate("Welcome");
              }
            );
          }
        ).catch(
          (error) => {
            alert(error.toString());
          }
        )
      } catch(error) {
        alert(error.toString());
        console.log(error.toString());
      }
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 40,
    paddingRight: 40
  },
  wrapper: {
    flex: 1,
  },
  header: {
    fontSize:24,
    marginBottom:60,
    color: '#fff',
    fontWeight: 'bold'
  },
  textInput: {
    alignSelf: 'stretch',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff'
  },
  btn: {
    alignSelf: 'stretch',
    backgroundColor: '#eac784',
    padding: 20,
    borderRadius: 30,
    alignItems: 'center',
    margin: 8
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});
