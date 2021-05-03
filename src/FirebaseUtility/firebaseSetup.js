import firebase from 'firebase';

// Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
        apiKey: "AIzaSyDifBdp3HTodeqzEC0sdO_Gx92O3QkPDYE",
        authDomain: "southampton-book-exchange.firebaseapp.com",
        projectId: "southampton-book-exchange",
        storageBucket: "southampton-book-exchange.appspot.com",
        messagingSenderId: "513972865984",
        appId: "1:513972865984:web:28391dc5d9747aa4655625",
        measurementId: "G-R7WWHPRZTZ"
      };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

export default firebase;