import React from 'react';
import { StyleSheet, Text, View, StatusBar, ListView, TextInput, Keyboard, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView} from 'react-native';
import { Card, CardItem, Container, Content, Header, Form, Input, Item, Button, Label, Icon, List, ListItem, Left, Right } from 'native-base';

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
        userName: userData.FirstName
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
      //
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
  //        console.log(this.state.listViewData);
    //  }


      //alert(this.state.houseID);
  }

  iEnumerate(data){

  }

  showInformation() {

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
      <KeyboardAvoidingView behavior='padding' style={styles.wrapperStyle} enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <Container style={styles.container}>
          <Content>
          {this.state.listViewData.map((item, index) => {
            return(
              <Card key={index}>
                <CardItem>
                  <Left>
                    <Text>{item.title}</Text>
                  </Left>
                  <Right>
                    <Button full danger  onPress={ () => this.deleteRow(data)}>
                      <Icon name='trash'/>
                    </Button>
                  </Right>
                </CardItem>
              </Card>
            );
          })}
          <TextInput
            style={textInput}
            placeholder='Item'
            onChangeText={
              (groceryItem) => this.setState({groceryItem})
            }
            underlineColorAndroid='transparent'
          />
          <TouchableOpacity
            style={btn}
            onPress={
              () => this.addRow(this.state.groceryItem)
            }>
            <Text style={btnText}> ADD ITEM </Text>
          </TouchableOpacity>
          </Content>
        </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
    // input:{
    //   backgroundColor: '#000',
    // },
    // container: {
    //   flex: 1,
    //   // backgroundColor: '#2896d3',
    //   backgroundColor: '#fff',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   paddingLeft: 40,
    //   paddingRight: 40,
    // },
    // wrapper: {
    //   flex: 1,
    // },
    // header: {
    //   fontSize:24,
    //   marginBottom:60,
    //   color: '#000',
    //   // color: '#fff',
    //   fontWeight: 'bold',
    // },
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    blackColor: {
      backgroundColor: '#fff',
    },
    textInput: {
      alignSelf: 'stretch',
      padding: 15,
      marginBottom: 20,
      backgroundColor: '#fff'
    },
    input:{
      backgroundColor: '#000',
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
    },
    wrapperStyle: {
      flex: 1,
    }
})
