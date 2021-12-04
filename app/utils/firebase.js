import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth"; 

const firebaseConfig = {
    apiKey: "AIzaSyD2jJXbFRv1s6DfNiDuSmZlBytNFit_X8Q",
    authDomain: "tesis-app-aa0bd.firebaseapp.com", 
    databaseURL: "https://tesis-app-aa0bd-default-rtdb.firebaseio.com",
    projectId: "tesis-app-aa0bd",
    storageBucket: "tesis-app-aa0bd.appspot.com", 
    messagingSenderId: "493594094497",
    appId: "1:493594094497:web:13223d223e02a794f9f9e0" 
    };    

firebase.initializeApp(firebaseConfig);
export default firebase;