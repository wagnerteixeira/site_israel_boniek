import firebase from '../firebase/index';
import baseService from './baseService';

const imageService = baseService('schedules');

const createSchedule = (id, file) => firebase.storage.child(`schedules/'${id}`).put(file);
const deleteSchedule = (id) => firebase.storage.child(`schedules/'${id}`).delete();

export default {
    ...imageService,
    createSchedule,
    deleteSchedule
};
