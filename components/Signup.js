import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, AsyncStorage, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import * as firebase from 'firebase';




export default class Login extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',

    }
  }

//checks if logged in before
  componentDidMount() {
    this._loadInitialState().done();
  }

  _loadInitialState = async () => {
    var value = await AsyncStorage.getItem('user');
    if(value !== null){
      //youre logged in so
      //this.props.navigation.navigate('PAGE YOU WANT');
    }
  }

  render() {
    return (

        <KeyboardAvoidingView begavior='padding' style={styles.wrapper}>
          <View style={styles.container}>
            <Text style={styles.header}>SIGN UP</Text>


            <TextInput style={styles.textInput} placeholder='First Name'
              onChangeText={(firstname) => this.setState({firstname}) }
              underlineColorAndroid='transparent'
            />
            <TextInput style={styles.textInput} placeholder='Last Name'
              onChangeText={(lastname) => this.setState({lastname}) }
              underlineColorAndroid='transparent'
            />
            <TextInput style={styles.textInput} placeholder='Email'
              onChangeText={(email) => this.setState({email}) }
              underlineColorAndroid='transparent'
            />



            <TextInput style={styles.textInput} placeholder='Password'
              onChangeText={(password) => this.setState({password}) }
              underlineColorAndroid='transparent'
            />



            <Button title= "Sign Up" onPress={ () => this.signmeup(this.state.email, this.state.password)}/>

          </View>

        </KeyboardAvoidingView>

    );
  }

  signmeup = (email, password) => {
    //alert('testing');
    try{
      if(this.state.password.length<6){
        alert("password atleast length 6")
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user){
        console.log(user)
      })

    }catch(error){
      console.log(error.toString())
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2896d3',
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
    backgroundColor: '#01c853',
    padding: 20,
    alignItems: 'center',
  },
});
