/**
 * This file is for firebase config
 * @depends firebase-app.js
 */

const firebaseConfig = {
    apiKey: "...",
    authDomain: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "...",
    measurementId: "..."
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();