import firebase from '../firebase/index';

export default (collection) => {
  const createDoc = (doc) => {
    return new Promise((resolve, reject) => {
      firebase.db.baseApi.doCreate(collection, doc)
        .then(doc => resolve(doc.id)
        )
        .catch(error => reject(error));
    });
  };

  const deleteDoc = (id) => firebase.db.baseApi.doDelete(collection, id);

  const updateDoc = (data) => firebase.db.baseApi.doUpdate(collection, data);

  const getDocs = () => {
    return new Promise((resolve, reject) => {
      firebase.db.baseApi.doGet(collection)
        .then(querySnapshot =>
          resolve(querySnapshot.docs.map(doc => {
            return { data: doc.data(), id: doc.id };
          })))
        .catch(error => reject(error));
    });
  };

  const getDocsOrderBy = (field) => {
    return new Promise((resolve, reject) => {
      firebase.db.baseApi.doGetOrderBy(collection, field)
        .then(querySnapshot =>
          resolve(querySnapshot.docs.map(doc => {
            return { data: doc.data(), id: doc.id };
          })))
        .catch(error => reject(error));
    });
  }

  return {
    createDoc,
    deleteDoc,
    updateDoc,
    getDocs,
    getDocsOrderBy
  };
};
