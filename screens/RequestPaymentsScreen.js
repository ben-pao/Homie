import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import { StyleSheet, Text, View, StatusBar, ListView, TextInput, Keyboard, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Card, CardItem, Container, Content, Header, Form, Input, Item, Button, Label, List, ListItem, Left, Body, Right } from 'native-base';

import * as firebase from 'firebase';

import { createStackNavigator } from 'react-navigation';

var data = []


export default class RequestPaymentsScreen extends React.Component {

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
    var that = this;
    console.log("in componenet did mount");
    try {
      that.setStates();
    }
    catch (err) {
      console.log("setStates() didn't run");
      console.log(err);
    }
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
      var newData = [... that.state.listViewData]
      //setting data with data in database
      var requestpaymentsRef = firebase.database().ref('/Payments').child(userData.HouseID);
      var userRequestPaymentsRef = requestpaymentsRef.child(uid).child('Requested');
         userRequestPaymentsRef.on('child_added', function(data){
      //  groceryhouseRef.on('child_changed', function(data){
           console.log("inchild_added")
           console.log(data)
          // var newData = [... that.state.listViewData]
           newData.push(data)
           console.log('newData', newData);
          // that.setState({listViewData : newData})
           console.log("lisview data ", that.state.listViewData)
           that.setState({listViewData : newData})
         });
         that.setState({listViewData : newData})
         userRequestPaymentsRef.on('child_removed', function(data){
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

  deletePayment(data){
      var user = firebase.auth().currentUser;
      console.log("in deleteRow")
      console.log(data);
      console.log(this.state.houseID)
      //
      var requestpaymentsRef = firebase.database().ref('/Payments').child(this.state.houseID);
      var userRequestPaymentsRef = requestpaymentsRef.child(this.state.userID).child('Requested');
      var johnsChargedPaymentRef = requestpaymentsRef.child(data.val().Johns).child('Payment');
      //remove the item
      userRequestPaymentsRef.child(data.val().PaymentID).remove();
      johnsChargedPaymentRef.child(data.val().PaymentID).remove();
      // userRequestPaymentsRef.on('child_changed', function(snapshot){
      //   var newData = snapshot.val();
      //   console.log("in child changed")
      //   console.log(newData);
      // });
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

  remindPayment(data){
    alert('remind ', data.val().JohnsName );
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
      <ScrollView>
      <KeyboardAvoidingView behavior='padding' style={styles.wrapperStyle} enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
          <Container style={styles.container}>
            <Text style={styles.text}>Requesting Payments</Text>
            <Content>
            {this.state.listViewData.map((data, index) => {
              return(
                <Card key={index}>
                  <CardItem>
                    <Left>

                      <Text style={styles.text}>

                        {data.val().JohnsName}
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

                      <Text style={styles.cardUser}>
                      Amount : $
                        {data.val().PaymentAmount}
                      </Text>


                    </Left>
                    <Right>
                      <TouchableOpacity

                        onPress={
                          () => {//
                            this.remindPayment(data);
                          }
                        }
                      >
                        <Text >Remind</Text>
                      </TouchableOpacity>
                      <TouchableOpacity

                        onPress={
                          () => {//
                            this.deletePayment(data);
                          }
                        }
                      >
                        <Text >Paid</Text>
                      </TouchableOpacity>
                    </Right>
                  </CardItem>
                </Card>
              );
            })}

            </Content>

          </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </ScrollView>


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
    text: {
      alignSelf: 'center',
      fontWeight: 'bold'
    },
    cardUser: {
      alignSelf: 'center',
      fontSize: 10,
      color: 'grey'
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
