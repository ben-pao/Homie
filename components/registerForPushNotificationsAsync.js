import { Permissions, Notifications } from 'expo';
import * as firebase from 'firebase';


async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  var user = firebase.auth().currentUser;
  if (user !== null) {
    var userName = user.providerData[0].displayName;
    var uid = user.uid;
    firebase.database().ref("/Users").child(uid)
      .update({
        Token: token
      })
      .then(() => {
        console.log("User token added to user table");
        return;
      })
      .catch( (error) => {
        alert(error.toString());
        return;
      });
  } else {
    return;
  }

}

export default registerForPushNotificationsAsync;
