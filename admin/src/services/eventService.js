import firebase from '../firebase/index';
import baseService from './baseService';

const eventService = baseService('events');

const createFileImage = (id, file) => firebase.storage.child(`events/'${id}`).put(file);
const deleteFileImage = (id) => firebase.storage.child(`events/'${id}`).delete();

export default {
    ...eventService,
    createFileImage,
    deleteFileImage
};
