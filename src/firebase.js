import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCuXHUgANSxgWdBnGFJRCPlj-tLc5hGCIM",
    authDomain: "e-clone-deeca.firebaseapp.com",
    projectId: "e-clone-deeca",
    storageBucket: "e-clone-deeca.appspot.com",
    messagingSenderId: "617142021360",
    appId: "1:617142021360:web:027948aefd5f7e8649e635",
    measurementId: "G-HKNQ5JPDVG"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
export {db, auth};