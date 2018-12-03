import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity,  KeyboardAvoidingView, TouchableWithoutFeedback, Picker, ScrollView } from 'react-native';
import * as firebase from 'firebase';
import { Card, CardItem, Container, Content, Header, Form, Input, Item, Button, Label, List, ListItem, Left, Body, Right } from 'native-base';
import { Keyboard } from 'react-native';
import { createStackNavigator } from 'react-navigation';

var data = []

export default class CreatePaymentsScreen extends React.Component {

  constructor(props){
    super(props);
    // frontend display of list from react native
  //  this.ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 != r2})
    this.state = {
      houseID: '',
      userID: '',
      userName: '',
      listViewData: data,
      paymentName: '',
      paymentQuantity: '',
      johns: '',
      name: '',
      userList: data,
    }
  }
  componentDidMount(){
    var that = this
    console.log("in componenet did mount")
    that.setStates();


  }

  // setStates(){
  //   var that = this;
  //   var user = firebase.auth().currentUser;
  //   if(user == null){
  //     alert("not logged in");
  //     return;
  //   }
  //   var uid = user.uid;
  //   //alert(uid);
  //   //var key = firebase.database().ref('/Users').push().key;
  //   var userData = "";
  //   var userDBref = firebase.database().ref('/Users').child(uid)
  //
  //   //set the states with info in users table
  //   userDBref.on('value', function(snapshot){
  //     userData = snapshot.val();
  //     console.log(userData.HouseID);
  //     that.setState({
  //       houseID: userData.HouseID,
  //       userID: uid,
  //       userName: userData.FirstName
  //     });
  //
  //   }
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
        userName: userData.FirstName + ' ' +userData.LastName,
      });
      console.log(that.state.houseID);
      var userHouse = firebase.database().ref('/Houses').child(userData.HouseID);
      userHouse.on('value', function(snapshot){
        that.setState({
          listViewData: snapshot.val().Users,
        });
        console.log('houseuserlist');
        console.log(snapshot.val().Users);
        console.log(that.state.listViewData);
        var objArray = [];
      //  for( key in that.state.listViewData){
      for( key in snapshot.val().Users){
        //  console.log("in loop");
        //  console.log("hi")
        //  console.log("this sucks");
        //  if (that.state.listViewData.hasOwnProperty(key)) {
         if (snapshot.val().Users.hasOwnProperty(key)) {
            var obj = {};
            //var objArray = [];
            obj["UID"] = key;
          //  obj["UserName"] = that.state.listViewData[key];
            obj["UserName"] = snapshot.val().Users[key];

            objArray.push(obj);
            console.log(objArray);
            that.setState({userList : objArray})
          }
          console.log(that.state.userList);
        }
      });
    //  return userData.HouseID;
    } , function (error) {
     console.log("Error: " + error.code);
    });



  }


  addPayment(paymentName, paymentQuantity, johns) {
     console.log("IN addPayment!");
    var user = firebase.auth().currentUser;
    var userName = user.providerData[0].displayName;
    var uid = user.uid;
    var johnsName = '';
    var pimpName = this.state.userName;
    for(var i=0; i<this.state.userList.length; i++ ){
      if(this.state.userList[i].UID == johns){
        johnsName = this.state.userList[i].UserName;
      }
    }
    console.log(johnsName);
    console.log('pimp name is ', pimpName)
  //  var key = firebase.database().ref('/Payments').push().key;
    var paymentHouseJohnsRef = firebase.database().ref('/Payments').child(this.state.houseID).child(johns)
    var paymentHousePimpRef = firebase.database().ref('/Payments').child(this.state.houseID).child(uid)
    var requestedRef = paymentHousePimpRef.child('/Requested');
    var paymentsRef = paymentHouseJohnsRef.child('/Payment');
    var key = requestedRef.push().key;
    requestedRef.child(key)
      .set(
        { PaymentName: paymentName,
          Johns: johns, //person whose charging
          PaymentAmount: paymentQuantity,
          PaymentID: key,
          JohnsName: johnsName,
      });
    paymentsRef.child(key)
      .set(
        {
          PaymentName: paymentName,
          Pimp: uid, //whose being charged //Maybe make it a list for utilities
          PaymentAmount: paymentQuantity,
          PaymentID: key,
          PimpName: pimpName,
        }
      );
        this.props.navigation.navigate('Requests');
  }


  render() {
    const { containerStyle,
            wrapperStyle,
            headerStyle,
            textInputStyle,
            buttonStyle,
            buttonTextStyle
    } = styles;

    // const { navigate, goBack } = this.props.navigation;

    return (
      <ScrollView>
      <KeyboardAvoidingView behavior='padding' style={wrapperStyle} enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
          <View style={containerStyle}>
            <Text style={headerStyle}>Add a Payment</Text>
            <TextInput
              style={textInputStyle}
              placeholder='Enter a Payment'
              onChangeText={
                (paymentName) => this.setState({paymentName})
              }
              underlineColorAndroid='transparent'
            />
            <TextInput
              style={textInputStyle}
              placeholder='Enter the Payment Quantity'
              onChangeText={
                (paymentQuantity) => this.setState({paymentQuantity})
              }
              underlineColorAndroid='transparent'
            />
    {/*       <TextInput
              style={textInputStyle}
              placeholder='Enter the Housemate to Charge'
              onChangeText={
                (johns) => this.setState({johns})
              }
              underlineColorAndroid='transparent'
            />
            */}
      {/*      <Picker
              selectedValue={this.state.language}
              style={{ height: 50, width: 100 }}
              onValueChange={(itemValue, itemIndex) => this.setState({johns: itemValue})}
            >
            {this.state.userList.map((data, index) => {
              return(
                <Picker.Item label={data.UserName} value={data.UID} />
              );
            })}
            </Picker>

          */}
          {/*this.state.userList.map((data, index) => {
            return(
              <Text style={headerStyle} >{data.UserName} </Text>
            );
          })*/}
          <Picker
  selectedValue={this.state.johns}
  style={{backgroundColor: '#fafafa', width: '100%', height:'20%'}}
  onValueChange={(itemValue, itemIndex) => this.setState({johns: itemValue})}>
  {this.state.userList.map((data, index) => {
    return(
      <Picker.Item label={data.UserName} value={data.UID} />
    );
  })}

</Picker>


            <TouchableOpacity
              style={buttonStyle}
              onPress={
                () => {//
                  this.addPayment(this.state.paymentName,this.state.paymentQuantity, this.state.johns);
                }
              }
            >
              <Text style={buttonTextStyle}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={buttonStyle}
              onPress={
                () => {
                  this.props.navigation.goBack();
                }
              }
            >
              <Text style={buttonTextStyle}> Cancel </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    // backgroundColor: '#2896d3',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 40,
    paddingRight: 40,
  },
  wrapperStyle: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: 'transparent',

  },
  headerStyle: {
    fontSize:24,
    marginBottom:60,
    color: '#fff',
    // color: '#fff',
    fontWeight: 'bold',
  },
  textInputStyle: {
    alignSelf: 'stretch',
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#fff'
  },
  buttonStyle: {
    alignSelf: 'stretch',
    // backgroundColor: '#01c853',
    backgroundColor: 'hotpink',
    // color: '#fff',
    padding: 20,
    alignItems: 'center',
    margin: 8
  },
  buttonTextStyle: {
    color: '#fff',
    fontWeight: 'bold'
  }
});

//export default CreatePaymentsScreen;
