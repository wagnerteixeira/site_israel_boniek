import firebase from '../firebase/index'

export const getShedules = 
    new Promise((resolve, reject) => {
        firebase.db.sheduleApi.doGetShedules()
            .then(querySnapshot =>
                resolve(querySnapshot.docs)
            )
            .catch(error => reject(error));
    }
);

export const createShedule = (shedule) => {
    return new Promise((resolve, reject) => {      
        firebase.db.sheduleApi.doCreateShedule(shedule)
            .then(() => resolve())
            .catch(error => reject(error))                      
    });
};
