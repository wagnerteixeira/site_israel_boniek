import * as auth from './auth';
import { storage, functions }  from './firebase';
import * as db from './db';

export default {
  auth,
  db,
  storage,
  functions
};