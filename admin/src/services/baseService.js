import firebase from '../firebase/index'

export default function(collection){
    const createDoc = (doc) => firebase.db.baseApi.doCreate(collection, doc);

    const deleteDoc = (id) => firebase.db.baseApi.doDelete(collection, id);

    const updateDoc = (doc) => firebase.db.baseApi.doUpdate(collection, doc);

    const getDocs = () => {
        return new Promise((resolve, reject) => {
            firebase.db.baseApi.doGet(collection)
                .then(querySnapshot =>
                    resolve(querySnapshot.docs.map((doc) => {         
                        return { data: doc.data(), id: doc.id }
                    })))
                .catch(error => reject(error));
        });
    } 

    return {
        createDoc,
        deleteDoc,
        updateDoc,
        getDocs
    }
}

