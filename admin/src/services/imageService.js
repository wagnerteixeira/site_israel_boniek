import firebase from '../firebase/index'

export const createImage = (image) => firebase.db.imageApi.doCreateImage(image);

export const createFileImage = (id, file) => firebase.db.imageApi.doCreateFileImage(id, file);

export const deleteImage = (id) => firebase.db.imageApi.doDeleteImage(id);

export const changeImage = (image) => firebase.db.imageApi.doChangeImage(image);

export const getImages = () => {
    return new Promise((resolve, reject) => {
        firebase.db.imageApi.doGetImages()
            .then(querySnapshot =>
                resolve(querySnapshot.docs.map((doc) => {         
                    return { data: doc.data(), id: doc.id }
                })))
            .catch(error => reject(error));
    });
} 

