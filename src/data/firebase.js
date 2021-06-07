import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyDKXlmUscAI_YJ0IzPU_UGIltR_BkyATuY",
  authDomain: "natdev1.firebaseapp.com",
  projectId: "natdev1",
  storageBucket: "natdev1.appspot.com",
  messagingSenderId: "130820660605",
  appId: "1:130820660605:web:904018a4a7c1571d8f4014"
}

const db = firebase.initializeApp(config);
export default db;