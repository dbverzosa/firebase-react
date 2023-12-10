// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCK3wqIgcLVCoQaU-b3qcwV_WAb482CucI",
  authDomain: "react-firebase-blog-fdc88.firebaseapp.com",
  projectId: "react-firebase-blog-fdc88",
  storageBucket: "react-firebase-blog-fdc88.appspot.com",
  messagingSenderId: "1085119605468",
  appId: "1:1085119605468:web:70a86ac5853acfcf366219"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export {auth, db, storage}