import * as firebase from 'firebase';
import 'firebase/storage'

const firebaseConfig = {
  // Your web app's Firebase configuration
    apiKey: "AIzaSyCIW5gUpgblmCC0gAG3vnttmG5E72j8LUs",
    authDomain: "booking-bef36.firebaseapp.com",
    databaseURL: "https://booking-bef36.firebaseio.com",
    projectId: "booking-bef36",
    storageBucket: "gs://booking-bef36.appspot.com",
    messagingSenderId: "490887540205",
    appId: "1:490887540205:web:1ca921fa8ef8134b"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export {
    storage, firebase as default
  }