import firebase from '../firebase';
import baseService from './baseService';

const imageService = baseService('publications');

const createFileImage = (id, file) => firebase.storage.child(`publications/'${id}`).put(file);
const deleteFileImage = (id) => firebase.storage.child(`publications/'${id}`).delete();

export default {
    ...imageService,
    createFileImage,
    deleteFileImage
};
