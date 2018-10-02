import { db, storage } from '../firebase';

//Image API
export const doCreateImage = (image) => db.collection("images").add({...image.data});

export const doGetImages = () => db.collection("images").get();

export const doCreateFileImage = (id, file) => storage.child(id).put(file);

export const doDeleteImage = (id) => db.collection("images").doc(id).delete();

export const doChangeImage = (image) => db.collection('images').doc(image.id).set(image.data);

