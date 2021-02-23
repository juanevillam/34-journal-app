import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA163aSkvnB7TXAvhPzHQ0n7x3_GVsPcVY",
    authDomain: "juanevillam-journal-app.firebaseapp.com",
    projectId: "juanevillam-journal-app",
    storageBucket: "juanevillam-journal-app.appspot.com",
    messagingSenderId: "136682082182",
    appId: "1:136682082182:web:1c638cd312f18cba5e6607"
};
  
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
    db,
    googleAuthProvider,
    firebase
}