


import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDIykZQs36-TXR0nQGiQMcDSq4ogDaoe1M",
  authDomain: "test-project-598a8.firebaseapp.com",
  projectId: "test-project-598a8",
  storageBucket: "test-project-598a8.appspot.com",
  messagingSenderId: "160660094882",
  appId: "1:160660094882:web:0426438fe4ac54327d7cfb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


export default app;

