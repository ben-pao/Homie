import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, AsyncStorage, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import * as firebase from 'firebase';

export default class Signup extends Component {

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

    return (

      <KeyboardAvoidingView behavior='padding' style={wrapper} enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
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

          <TextInput password={true} style={textInput} placeholder='Password'
            onChangeText={(password) => this.setState({password}) }
            underlineColorAndroid='transparent'
          />

          <TextInput password={true} style={textInput} placeholder='Comfirm Password'
            onChangeText={(comfirm_password) => this.setState({comfirm_password}) }
            underlineColorAndroid='transparent'
          />

          <TouchableOpacity
            style={btn}
            onPress={
              () => this.signmeup(this.state.email, this.state.password,
                  this.state.comfirm_password, this.state.firstname, this.state.lastname)
          }>
            <Text style={btnText}> Sign up </Text>
          </TouchableOpacity>

        </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

    );
  }

  signmeup = (email, password, comfirm_password, first, last) => {
    //alert('testing');
    //check if comfirm password = password
    //
    if( comfirm_password != password){
      alert("passwords don't match")
      return
    }

    try{

      firebase.auth().createUserWithEmailAndPassword(email, password).then(
        (user) => {
          //console.log(user);
          //var userjson = user.json
          console.log(user.user.uid)
          console.log(user)
          var userid = user.user.uid

        //    console.log(key);
          firebase.database().ref('/Users').child(userid).set({
                  first: first,
                  last: last,
                  email: email,

    //            });
          //pass in firstname and last name into db
          //pass in email
          //log in the user
      //    this.props.navigation.navigate('App');
        }
      );
      this.props.navigation.navigate('App')
    })
    }catch(error){
      alert(error.toString());
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#2896d3',
    backgroundColor: '#fff',
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
    color: '#000',
    // color: '#fff',
    fontWeight: 'bold',
  },
  textInput: {
    alignSelf: 'stretch',
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#fff'
  },
  btn: {
    alignSelf: 'stretch',
    // backgroundColor: '#01c853',
    backgroundColor: '#000',
    // color: '#fff',
    padding: 20,
    alignItems: 'center',
    margin: 8
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});
