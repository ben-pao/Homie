import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, AsyncStorage } from 'react-native';
import { createStackNavigator, StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';

export default class Login extends React.Component {

  // constructor(props){
  //   super(props);
  //   this.state = {
  //     email: '',
  //     password: '',
  //   }
  // }
  state = {
    email: '',
    password: ''
  }

//checks if logged in before
  componentDidMount() {
    this._loadInitialState().done();
  }

  _loadInitialState = async () => {
    var value = await AsyncStorage.getItem('user');
    if(value !== null){
      //youre logged in so
      this.props.navigation.navigate('Home');
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
      <KeyboardAvoidingView behavior='padding' style={wrapper}>
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
            placeholder='Password'
            onChangeText={
              (password) => this.setState({password})
            }
            underlineColorAndroid='transparent'
          />

          <TouchableOpacity
            style={btn}
            onPress={
              () => {
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
      </KeyboardAvoidingView>
    );
  }

  login = (email, password) => {
  //  alert(email);
  const { navigate } = this.props.navigation;
    try{
      //console.log(email)
      //console.log(password)

      firebase.auth().signInWithEmailAndPassword(email, password).then(
        (user) => {
          console.log(user)
          navigate('Home')
        }
      )
    }catch(error){
      alert(error.toString());
      console.log(error.toString());
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
