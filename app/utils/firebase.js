import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth"; 

const firebaseConfig = {
   /* Aquí se debe colocar la configuración de la db de firebase*/
    };    

firebase.initializeApp(firebaseConfig);
export default firebase;
