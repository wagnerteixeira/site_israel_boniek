import firebase from '../firebase';
import baseService from './baseService';

const imageService = baseService('publications');

const createPublication = (id, file) => firebase.storage.child(`publications/'${id}`).put(file);
const deletePublication = (id) => firebase.storage.child(`publications/'${id}`).delete();

export default {
    ...imageService,
    createPublication,
    deletePublication
};
