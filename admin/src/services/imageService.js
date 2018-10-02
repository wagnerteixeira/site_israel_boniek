import firebase from '../firebase/index';
import baseService from './baseService';

var imageService = baseService('images');

const createFileImage = (id, file) => firebase.storage.child('images/' + id).put(file);
const deleteFileImage = (id) => firebase.storage.child('images/' + id).delete();

export default {
    ...imageService,
    createFileImage,
    deleteFileImage
}

