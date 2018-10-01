import firebase from '../firebase/index'

export const createImage = (image) => firebase.db.imageApi.doCreateImage(image);

export const createFileImage = (image, file) => firebase.db.imageApi.doCreateFileImage(image, file);

export const deleteImage = (key) => firebase.db.imageApi.doDeleteImage(key);

export const getImages = () => {
    return new Promise((resolve, reject) => {
        firebase.db.imageApi.doGetImages()
            .then(querySnapshot =>
                resolve(querySnapshot.docs.map((doc) => {         
                    return doc.data()
                })))
            .catch(error => reject(error));
    });
} 

