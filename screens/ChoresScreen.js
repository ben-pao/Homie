import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

class ChoreAddButton extends React.Component{
  render(){
    return(
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonWord}>
        Add Chore
      </Text>
    </TouchableOpacity>
    );
  }
}

export default class ChoresScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>

          <ChoreAddButton />
          <Text>HEY YO</Text>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  button: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 3,
  },
  buttonWord: {
    color: '#fff',
  },

});
