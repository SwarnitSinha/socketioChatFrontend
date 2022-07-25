import firebase from './firebase';

const config = {
    apiKey: "AIzaSyAtVRUlCxTclmBsmXlv7GXGe_Mw7DLEPgo",
  authDomain: "we-talk-9d7b2.firebaseapp.com",
  projectId: "we-talk-9d7b2",
  storageBucket: "we-talk-9d7b2.appspot.com",
  messagingSenderId: "528350898501",
  appId: "1:528350898501:web:bbe62ddbb90e4bb021f62c"
}

firebase.initializeApp(config);
export default firebase;