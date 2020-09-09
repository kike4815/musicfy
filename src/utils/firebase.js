import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyCqoV0JKaeX66gtLT0v7cUSEhKbcJMXSPA",
    authDomain: "musicfy-e8e61.firebaseapp.com",
    databaseURL: "https://musicfy-e8e61.firebaseio.com",
    projectId: "musicfy-e8e61",
    storageBucket: "musicfy-e8e61.appspot.com",
    messagingSenderId: "350398635651",
    appId: "1:350398635651:web:d1171715426e128e4c45b6"
  };
  // Initialize Firebase
export default firebase.initializeApp(firebaseConfig);