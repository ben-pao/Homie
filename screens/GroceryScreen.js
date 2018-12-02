import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import { StyleSheet, Text, View, StatusBar, ListView, TextInput, Keyboard, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Card, CardItem, Container, Content, Header, Form, Input, Item, Button, Label, List, ListItem, Left, Body, Right } from 'native-base';

import * as firebase from 'firebase';

import { createStackNavigator } from 'react-navigation';

var data = []


export default class GroceryScreen extends React.Component {

  constructor(props){
    super(props);

    // frontend display of list from react native
    this.ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 != r2})

    this.state = {
      listViewData: data,
      groceryItem: "",
      houseID: "",
      userID: "",
      userName: "",
    }
  }


  componentDidMount(){
    var that = this
    console.log("in componenet did mount")
    that.setStates();
  //  console.log(houseID);
  //  var houseid = this.getHouseID();
//  console.log(that.state.houseID)
//    that.getPreviousItems();
//     var groceryhouseRef = firebase.database().ref('/Grocery')
// //   var groceryhouseRef = firebase.database().ref('/Grocery').child(that.state.houseID)
//     groceryhouseRef.on('child_added', function(data){
//       var newData = [... that.state.listViewData]
//       newData.push(data)
//       that.setState({listViewData : newData})
//     })

  }

  getPreviousItems(){
    var that = this
    var groceryhouseRef = firebase.database().ref('/Grocery').child(that.state.houseID)
       groceryhouseRef.on('child_added', function(data){
         var newData = [... that.state.listViewData]
         newData.push(data)
         that.setState({listViewData : newData})
       });
  }

  addRow(data){
  //  var houseid = this.getHouseID();
  //  console.log(houseid);
    //var key = firebase.database().ref('/Grocery').push().key
    var that = this
    var user = firebase.auth().currentUser;
    if(user == null){
      return;
    }
    var uid = user.uid;

    var groceryhouseRef = firebase.database().ref('/Grocery').child(this.state.houseID);
    var key = groceryhouseRef.push().key
    console.log(key)
    groceryhouseRef.child(key).set({
      Item: data,
      UID: uid,
      UserName: that.state.userName,
      ItemKey: key

    });
  }

  setStates(){
    var that = this;
    var user = firebase.auth().currentUser;
    if(user == null){
      alert("not logged in");
      return;
    }
    var uid = user.uid;
    //alert(uid);
    //var key = firebase.database().ref('/Users').push().key;
    var userData = "";
    var userDBref = firebase.database().ref('/Users').child(uid)

    //set the states with info in users table
    userDBref.on('value', function(snapshot){
      userData = snapshot.val();
      console.log(userData.HouseID);
      that.setState({
        houseID: userData.HouseID,
        userID: uid,
        userName: userData.FirstName + ' ' + userData.LastName
      });

      //setting data with data in database
      var groceryhouseRef = firebase.database().ref('/Grocery').child(userData.HouseID)
         groceryhouseRef.on('child_added', function(data){
      //  groceryhouseRef.on('child_changed', function(data){
           console.log("inchild_added")
           console.log(data)
           var newData = [... that.state.listViewData]
           newData.push(data)
           that.setState({listViewData : newData})
         });
         groceryhouseRef.on('child_removed', function(data){
      //  groceryhouseRef.on('child_changed', function(data){
           console.log("child_removed")
           console.log(data)
           console.log(data.val().ItemKey)
           var newData = [... that.state.listViewData]

          // newData.push(data)
          //var index = newData.indexOf(data.target);
          //var index = newData.findIndex(x => x.ItemKey === data.ItemKey);
          for(var i = newData.length - 1; i >= 0; i--){
            console.log(i);
            console.log(newData)
            if(newData[i].val().ItemKey == data.val().ItemKey){
              console.log(newData[i].val().ItemKey)
              console.log("hit at index")
              console.log(i);
              newData.splice(i, 1);
              break;
            }
          }
        //  console.log(index);
        //  newData.splice(index, 1);
           that.setState({listViewData : newData})
         });
      console.log(that.state.houseID);
    //  return userData.HouseID;
    } , function (error) {
     console.log("Error: " + error.code);
    });
  }

  deleteRow(data){
    var user = firebase.auth().currentUser;
    console.log("in deleteRow")
    console.log(data);
    console.log(this.state.houseID)

    var groceryhouseRef = firebase.database().ref('/Grocery').child(this.state.houseID);
    console.log(data.val().ItemKey);
    //remove the item
    groceryhouseRef.child(data.val().ItemKey).remove();
    groceryhouseRef.on('child_changed', function(snapshot){
      var newData = snapshot.val();
      console.log("in child changed")
      console.log(newData);
    });
  //  var array = [... this.state.listViewData]; // make a separate copy of the array
  //  var index = array.indexOf(data.target.value);
  //  var index = array.indexOf(data);
  //  if (index !== -1) {
  //      array.splice(index, 1);
  //      this.setState({listViewData : array});
  //      console.log(this.state.listViewData);
  //  }


    //alert(this.state.houseID);
  }

  deleteAll(){
    var user = firebase.auth().currentUser;
    console.log("in deleteAll")
    console.log(data);
    console.log(this.state.houseID)

    // remove all the items
    var groceryhouseRef = firebase.database().ref('/Grocery').child(this.state.houseID);
    groceryhouseRef.remove();
    var emptyArray = [];
    this.setState({listViewData : emptyArray});
    // while (groceryhouseRef.firstChild) {
    //   groceryhouseRef.removeChild(groceryhouseRef.firstChild);
    // }
  }

  render() {
    const { container,
            wrapper,
            header,
            textInput,
            btn,
            btnText
    } = styles;
    return(
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <KeyboardAvoidingView behavior='padding' style={styles.wrapperStyle} enabled>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container style={styles.container}>
              <Content>
                {this.state.listViewData.map((data, index) => {
                  return(
                    <Card key={index}>
                      <CardItem>
                        <Left>
                          <Text style={styles.text}>
                            {data.val().Item}
                          </Text>
                          <Text style={styles.cardUser}>
                            {"\n"}{"\n"}{"\n"}-{data.val().UserName}
                          </Text>
                        </Left>
                        <Right>
                          <Button style={styles.btn} full danger onPress={ () => this.deleteRow(data)}>
                            <Icon name='trash'/>
                          </Button>
                        </Right>
                      </CardItem>
                    </Card>
                  );
                })}
                <Card>
                  <CardItem>
                    <Left>
                      <TextInput
                        style={styles.textInput}
                        placeholder='Add Item'
                        onChangeText={
                          (groceryItem) => this.setState({groceryItem})
                        }
                        underlineColorAndroid='transparent'
                      />
                    </Left>
                    <Right>
                      <Button style={styles.btn} add danger onPress={ () => this.addRow(this.state.groceryItem)}>
                        <Icon name='plus'/>
                      </Button>
                    </Right>
                  </CardItem>
                </Card>
                <Button style={styles.clearBtn} clear danger onPress={ () => this.deleteAll()}>
                  <Body>
                    <Text style={styles.clearTxt}> Clear List </Text>
                  </Body>
                </Button>
              </Content>
            </Container>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent'
    },
    contentContainer: {
      backgroundColor: 'transparent',
      paddingVertical: 20,
      paddingHorizontal: 20
    },
    blackColor: {
      backgroundColor: '#fff'
    },
    cardUser: {
      alignSelf: 'center',
      fontSize: 10,
      color: 'grey'
    },
    text: {
      alignSelf: 'center',
      fontWeight: 'bold'
    },
    textInput: {
      alignSelf: 'stretch',
      backgroundColor: '#fff'
    },
    input:{
      backgroundColor: '#000'
    },
    btn: {
      alignSelf: 'flex-end',
      right: 0,
      backgroundColor: 'transparent'
    },
    btnText: {
      color: '#fff',
      fontWeight: 'bold'
    },
    clearBtn: {
      alignSelf: 'stretch',
      backgroundColor: '#000'
    },
    clearTxt:{
      alignSelf: 'center',
      color: '#fff'
    },
    wrapperStyle: {
      flex: 1
    }
})
