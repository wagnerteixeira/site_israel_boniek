import firebase from '../firebase/index'

export const getPublications = 
    new Promise((resolve, reject) => {
        firebase.db.publicationApi.doGetPublications()
            .then(querySnapshot =>
                resolve(querySnapshot.docs)
            )
            .catch(error => reject(error));
    }
);

export const createPublication = (publication) => {
    return new Promise((resolve, reject) => {      
        firebase.db.publicationApi.doCreatePublication(publication)
            .then(() => resolve())
            .catch(error => reject(error))                      
    });
};
