import { db, storage } from '../firebase';

//Image API
export const doCreateImage = (image) => db.collection("images").add({...image});

export const doCreateFileImage = (image, file) => storage.child(image.fileName).put(file);

export const doGetImages = () => db.collection("images").get();
