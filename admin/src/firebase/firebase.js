import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'
import 'firebase/storage'
import config from './config'

if (!firebase.apps.length) {
  firebase.initializeApp(config);  
}

const db = firebase.firestore();
db.settings({timestampsInSnapshots: true});

const auth = firebase.auth();

var storage = firebase.storage().ref();

export {
  db,
  auth,
  storage
};




