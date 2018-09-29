import firebase from '../firebase/index'

export const getSpeeches = 
    new Promise((resolve, reject) => {
        firebase.db.speechApi.doGetSpeeches()
            .then(querySnapshot =>
                resolve(querySnapshot.docs)
            )
            .catch(error => reject(error));
    }
);

export const createSpeech = (speech) => {
    return new Promise((resolve, reject) => {      
        firebase.db.speechApi.doCreateSpeech(speech)
            .then(() => resolve())
            .catch(error => reject(error))                      
    });
};
