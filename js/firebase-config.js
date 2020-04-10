/**
 * This file is for firebase config
 * @depends firebase-app.js
 */

var firebaseConfig = {
    apiKey: "...",
    authDomain: "...",
    databaseURL: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "..."
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);