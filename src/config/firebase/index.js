// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/database';
// import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaAFhA4YQCv3NFjnWmCdCntCvARV-mmuU",
  authDomain: "ipb-log.firebaseapp.com",
  projectId: "ipb-log",
  storageBucket: "ipb-log.appspot.com",
  messagingSenderId: "334825711210",
  appId: "1:334825711210:web:2cadcf30bd472f8f90cc13",
  measurementId: "G-5S4JPL4YM4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const database = firebase.database();

export default firebase;