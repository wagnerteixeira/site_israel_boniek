import firebase from '../firebase/index'

export const getUsers = 
    new Promise((resolve, reject) => {
        firebase.db.userApi.doGetUsers()
            .then(querySnapshot =>
                resolve(querySnapshot.docs)
            )
            .catch(error => reject(error));
    }
);

export const createUser = (user) => {
    return new Promise((resolve, reject) => {      
        firebase.db.userApi.doCreateUser(user)
            .then(() => resolve())
            .catch(error => reject(error))                      
    });
};
