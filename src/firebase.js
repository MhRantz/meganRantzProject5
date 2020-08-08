import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyARE04_FaCOjqkdOxfLefMbbgIAG2Jg-dI",
    authDomain: "tsundoku-stack.firebaseapp.com",
    databaseURL: "https://tsundoku-stack.firebaseio.com",
    projectId: "tsundoku-stack",
    storageBucket: "tsundoku-stack.appspot.com",
    messagingSenderId: "308210051228",
    appId: "1:308210051228:web:738aa55ef2dd85b5f56559"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;