import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCB6rDNUcLnIlHcbW13MlSgL8Qzrqhy550",
    authDomain: "push-notifications-c6bcb.firebaseapp.com",
    databaseURL: "https://push-notifications-c6bcb.firebaseio.com",
    projectId: "push-notifications-c6bcb",
    storageBucket: "push-notifications-c6bcb.appspot.com",
    messagingSenderId: "461024400700",
    appId: "1:461024400700:web:e6f7cb2722a8ad1f55ba39"
}

firebase.initializeApp(config);

export default firebase;