import firebase from '../firebase/index';
import baseService from './baseService';

const imageService = baseService('schedules');

const createFileImage = (id, file) => firebase.storage.child(`schedules/'${id}`).put(file);
const deleteFileImage = (id) => firebase.storage.child(`schedules/'${id}`).delete();

export default {
    ...imageService,
    createFileImage,
    deleteFileImage
};
