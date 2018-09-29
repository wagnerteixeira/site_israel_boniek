import firebase from '../firebase/index'


export const createImage2 = (image) =>  firebase.db.imageApi.doCreateImage(image);


/*export const createImage = (image) =>  {
    return new Promise((resolve, reject) => {      
        firebase.db.imageApi.doCreateImage(image)
            .then((document) => resolve(document))
            .catch(error => reject(error))                      
    });
};*/

export const createFileImage = (image, file) => firebase.db.imageApi.doCreateFileImage(image, file);                                                    
    

