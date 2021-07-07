const functions = require('firebase-functions');

//loadfetch
var fetch = require('node-fetch')

const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase);

//method for senidng push NOTIFICATIONS
exports.sendPushNotification = functions.database.ref('contacts/{id}')
.onCreate(event=>[

    const root = event.data.ref.root
    var messages = []

    //return main promise
    return root.child('/users').once('value').then(function (snapshot) {

      snapshot.forEach(function(childSnapshot){

        var expoToken = childSnapshot.val().expoToken

        if(expoToken){
          messages.push({
            "to": expoToken,
            "body": "New Note Added"
          })
        }
      })

    return Promise.all(messages)
  }).then(messages =>{
    fetch('https://exp.host/--/api/v2/push/send',{

      method: "POST"
      headers:{
        "Accept": "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify(messages)
    })
  })
])
