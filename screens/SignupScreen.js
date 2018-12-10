import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, KeyboardAvoidingView, TouchableOpacity, AsyncStorage, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import * as firebase from 'firebase';

export default class SignupScreen extends Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirm_password: ''
  }

  // checks if logged in before
  componentDidMount() {
    this._loadInitialState().done();
  }

  _loadInitialState = async () => {
    var value = await AsyncStorage.getItem('user');
    if(value !== null){
      //youre logged in so
      this.props.navigation.navigate('App');
    }
  }

  render() {
    const { container,
            wrapper,
            header,
            textInput,
            btn,
            btnText
    } = styles;

    const { firstname,
            lastname,
            email,
            password,
            confirm_password
    } = this.state;

    // const { navigate, goBack } = this.props.navigation;

    return (
      <KeyboardAvoidingView behavior='padding' style={wrapper} enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={container}>
            <Text style={header}>SIGN UP</Text>

            <TextInput style={textInput} placeholder='First Name'
              onChangeText={(firstname) => this.setState({firstname}) }
              underlineColorAndroid='transparent'
              // onBlur={() => alert("blurred")}
            />

            <TextInput style={textInput} placeholder='Last Name'
              onChangeText={(lastname) => this.setState({lastname}) }
              underlineColorAndroid='transparent'
            />

            <TextInput style={textInput} placeholder='Email'
              onChangeText={(email) => this.setState({email}) }
              underlineColorAndroid='transparent'
            />

            <TextInput
              password={true}
              secureTextEntry={true}
              style={textInput}
              placeholder='Password'
              onChangeText={(password) => this.setState({password}) }
              underlineColorAndroid='transparent'
            />

            <TextInput
              password={true}
              secureTextEntry={true}
              style={textInput}
              placeholder='Confirm Password'
              onChangeText={
                (confirm_password) => this.setState({confirm_password})
              }
              underlineColorAndroid='transparent'
            />

            <TouchableOpacity
              style={btn}
              onPress={
                () => this.signmeup(firstname, lastname, email, password, confirm_password)
            }>
              <Text style={btnText}> Sign up </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={btn}
              onPress={
                () => {
                  // goBack();
                  this.props.navigation.goBack();
                }
            }>
              <Text style={btnText}> Cancel </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  nameIsNull(first, last) {
    // check if firstname/lastname are filled out
    if (!first || first.length === 0 ) {
      alert("Please enter your first name");
      return true;
    }
    if (!last || last.length === 0 ) {
      alert("Please enter your last name");
      return true;
    }
    return false;
  }

  passwordDontMatch(password, confirm_password) {
    if (password != confirm_password) {
      alert("Passwords don't match");
      return true;
    }
    return false;
  }

  signmeup = (first, last, email, password, confirm_password) => {
    const { navigate } = this.props.navigation;
    //alert('testing');
    if (this.nameIsNull(first, last) ||
        this.passwordDontMatch(password, confirm_password))
      return;

    try {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(
        (user) => {
          var username = first + ' ' + last;
          user.user.updateProfile( {displayName: username} )
          .then(
            ()      => {
              // navigate('Welcome');
              this.props.navigation.navigate('Welcome');
            }
          ).catch(
            (error) => { alert(error.toString()); }
          );

          console.log(user.user.uid);
          console.log(user);
          var userid = user.user.uid;

          // Store user's information in Users table
          firebase.database().ref('/Users').child(userid).set(
            {
              FirstName: first,
              LastName: last,
              Email: email,
            }
          );
          // navigate('Welcome');
          this.props.navigation.navigate('Welcome');
        }
      ).catch(
        (error) => {
          alert(error.toString());
        }
      )
    } catch(error) {
      alert(error.toString());
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
    paddingRight: 40,
  },
  wrapper: {
    flex: 1,
  },
  header: {
    fontSize:24,
    marginBottom:60,
    color: '#fff',
    fontWeight: 'bold',
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
