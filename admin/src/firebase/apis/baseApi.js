import { db } from '../firebase';

export const doCreate = (collection, data) => db.collection(collection).add({...data});

export const doGet = (collection) => db.collection(collection).get();

export const doGetOrderBy = (collection, field) => db.collection(collection).orderBy(field).get();

export const doDelete = (collection, id) => db.collection(collection).doc(id).delete();

export const doUpdate = (collection, data) => db.collection(collection).doc(data.id).set(data.data);