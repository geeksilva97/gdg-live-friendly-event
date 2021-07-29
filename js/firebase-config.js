/**
 * This file is for firebase config
 * @depends firebase-app.js
 */

const firebaseConfig = {
    apiKey: "AIzaSyDvlCd0IxXElokpU20tWHnzuiuvDvDhIqU",
    authDomain: "mastering-security-rules.firebaseapp.com",
    projectId: "mastering-security-rules",
    storageBucket: "mastering-security-rules.appspot.com",
    messagingSenderId: "675379298879",
    appId: "1:675379298879:web:cff7f356048501b20f6e8a",
    measurementId: "G-3N1ZTWPPSZ"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();