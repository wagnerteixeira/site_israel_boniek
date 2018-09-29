import { db } from '../firebase';

//Speech API
export const doCreateSpeech = (speech) =>
  db.collection("speeches").add({...speech});

export const doGetSpeeches = () =>
  db.collection("speeches").get();