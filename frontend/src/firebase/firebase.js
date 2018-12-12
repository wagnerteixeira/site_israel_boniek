import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/functions';
import config from './config';  

if (!firebase.apps.length) {
  firebase.initializeApp(config);  
}

const db = firebase.firestore();
db.settings({timestampsInSnapshots: true});

const auth = firebase.auth();

const storage = firebase.storage().ref();

const functions = firebase.functions();


export {
  db,
  auth,
  storage,
  functions
};




