


import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBm9wTPrpD5wy48xsfj_mOC1QY5i0-e1-4",
  authDomain: "my-test-670c0.firebaseapp.com",
  projectId: "my-test-670c0",
  storageBucket: "my-test-670c0.appspot.com",
  messagingSenderId: "162283481986",
  appId: "1:162283481986:web:dfa35b4004170227eb7d9b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


export default app;

