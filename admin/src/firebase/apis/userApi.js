import { db } from '../firebase';

// User API
export const doCreateUser = (id, username, email) =>
  db.collection("users").doc(id).set({
    email: email,
    username: username,                
  });

export const doGetUsers = () =>
  db.collection("users").get();