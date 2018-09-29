import { db } from '../firebase';

//Shedule API
export const doCreateShedule = (shedule) =>
  db.collection("shedules").add({...shedule});

export const doGetShedules = () =>
  db.collection("shedules").get();