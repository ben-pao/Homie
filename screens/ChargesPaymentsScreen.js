import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import { StyleSheet, Text, View, StatusBar, ListView, TextInput, Keyboard, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Card, CardItem, Container, Content, Header, Form, Input, Item, Button, Label, List, ListItem, Left, Body, Right } from 'native-base';
import * as firebase from 'firebase';

import { createStackNavigator } from 'react-navigation';

var data = []


export default class ChargesPaymentsScreen extends React.Component {

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
        userName: userData.FirstName + ' ' + userData.LastName,
      });
      var newData = [... that.state.listViewData]

      //setting data with data in database
      var paymentsRef = firebase.database().ref('/Payments').child(userData.HouseID);
      var userPaymentsRef = paymentsRef.child(uid).child('Payment');
         userPaymentsRef.on('child_added', function(data){
      //  groceryhouseRef.on('child_changed', function(data){
           console.log("inchild_added")
           console.log(data)
            //var newData = [... that.state.listViewData]
            newData.push(data)
            that.setState({listViewData : newData})
         });
         that.setState({listViewData : newData})
         userPaymentsRef.on('child_removed', function(data){
      //  groceryhouseRef.on('child_changed', function(data){
           console.log("child_removed")
           console.log(data)
           //console.log(data.val().ItemKey)
           var newData = [... that.state.listViewData]

          // newData.push(data)
          //var index = newData.indexOf(data.target);
          //var index = newData.findIndex(x => x.ItemKey === data.ItemKey);
          for(var i = newData.length - 1; i >= 0; i--){
            console.log(i);
            console.log(newData)
            if(newData[i].val().PaymentID == data.val().PaymentID){
              console.log(newData[i].val().PaymentID)
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
        <Text style={styles.text}>Getting Charged</Text>
        <Content>
        {this.state.listViewData.map((data, index) => {
          return(
            <Card key={index}>
              <CardItem>
                <Left>
                  <Text style={styles.text}>
                    {data.val().PimpName}
                  </Text>
                </Left>
              </CardItem>
              <CardItem>
                <Left>
                  <Text>
                    {data.val().PaymentName}
                  </Text>
                </Left>
              </CardItem>
              <CardItem>
                <Left>
                  <Text>
                  Amount :
                    ${data.val().PaymentAmount}
                  </Text>
                </Left>
              </CardItem>
            </Card>
          );
        })}

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
    // textInput: {
    //   alignSelf: 'stretch',
    //   padding: 15,
    //   marginBottom: 20,
    //   backgroundColor: '#fff'
    // },
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    headerText:{
      alignSelf: 'center',
      fontWeight: 'bold'
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
    blackColor: {
      backgroundColor: '#fff',
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
