import { db } from '../firebase';

//Publication API
export const doCreatePublication = (publication) =>
  db.collection("publications").add({...publication});

export const doGetPublications = () =>
  db.collection("publications").get();