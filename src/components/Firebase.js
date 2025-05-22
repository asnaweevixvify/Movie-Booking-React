import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';



const firebaseConfig = {
  apiKey: "AIzaSyB__iwmO4FoIoEya7FWSIZ7QTc36J2Kmjo",
  authDomain: "movie-931d7.firebaseapp.com",
  projectId: "movie-931d7",
  storageBucket: "movie-931d7.firebasestorage.app",
  messagingSenderId: "97083957100",
  appId: "1:97083957100:web:b06d7d75f0a2b010a09d49",
  measurementId: "G-FNP5PHMHR3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
