import React from 'react';
import { StyleSheet, Text, View, StatusBar, ListView } from 'react-native';
import { Card, CardItem, Body, Container, Content, Header, Form, Input, Item, Button, Label, Icon, List, ListItem } from 'native-base';
import * as firebase from 'firebase';

import { createStackNavigator } from 'react-navigation';

var data = []


export default class GrocTestScreen extends React.Component {

  constructor(props){
    super(props);

    // frontend display of list from react native
    this.ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 != r2})

    this.state = {
      listViewData: data,
      newContact: "" // the grocery item being added
    }
  }


  componentDidMount(){

    var that = this;

    firebase.database().ref('/Grocery').on('child_added', function(data){

      var newData = [... that.state.listViewData]
      newData.push(data)
      that.setState({listViewData : newData})
    })

  }

  addRow(data){
    var key = firebase.database().ref('/Grocery').push().key
    console.log(key)
    firebase.database().ref('/Grocery').child(key).set({item:data})
  }

  deleteRow(){

  }

  showInformation() {

  }

  render() {
    return(
      <Container style={styles.container}>
        <Content>
          <Card>
              <CardItem>
                <Text>milk</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fad',
  },
  input:{
    backgroundColor: '#000',
  }
})
