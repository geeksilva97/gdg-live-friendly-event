/**
 * This file is for firebase config
 * @depends firebase-app.js
 */

const firebaseConfig = {
    apiKey: "AIzaSyAgvazM-PiFlGCCilBVS82N_cQOlVZ2yRE",
    authDomain: "security-rules-event.firebaseapp.com",
    projectId: "security-rules-event",
    storageBucket: "security-rules-event.appspot.com",
    messagingSenderId: "282667396632",
    appId: "1:282667396632:web:2eeff9c9fa4c423927dd6d",
    measurementId: "G-7X0EXQC54F"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();