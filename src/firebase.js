import firebase from 'firebase'
import 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyCZ-agcHGIDzX-EgZgplqdib1a2ircW0QQ",
  authDomain: "app1-3a2e7.firebaseapp.com",
  projectId: "app1-3a2e7",
  storageBucket: "app1-3a2e7.appspot.com",
  messagingSenderId: "197567355355",
  appId: "1:197567355355:web:a2c9333d9427cf935f6ffe",
  measurementId: "G-3RP9WWHGSC"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
  export {firebase}