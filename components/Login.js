import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, AsyncStorage } from 'react-native';
import { createStackNavigator, StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
export default class Login extends React.Component {

  constructor(props){
    super(props);
    this.state = {
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
            <Text style={styles.header}>LOGIN</Text>

            <TextInput style={styles.textInput} placeholder='Email'
              onChangeText={(email) => this.setState({email}) }
              underlineColorAndroid='transparent'
            />



            <TextInput style={styles.textInput} placeholder='Password'
              onChangeText={(password) => this.setState({password}) }
              underlineColorAndroid='transparent'
            />

            <TouchableOpacity
              style={styles.btn}
              onPress={() => this.login(this.state.email, this.state.password)}>
              <Text> Log in </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btn}
              onPress={ () => this.props.navigation.navigate('Signup') }>
              <Text> Sign up </Text>
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
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
     console.log(user)
     navigate('Grocery')

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
