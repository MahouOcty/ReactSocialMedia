// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const app = initializeApp({
  apiKey: "AIzaSyDKNzJIp9twc_dPRmLgAO4RfMLOb8-EanE",
  authDomain: "social-media-c712c.firebaseapp.com",
  projectId: "social-media-c712c",
  storageBucket: "social-media-c712c.appspot.com",
  messagingSenderId: "574674360024",
  appId: "1:574674360024:web:c1ac8d70c685560176e9ad",
  measurementId: "G-C9NEKTW4QE"
});

export const firebaseDb = getFirestore(app);
export const firebaseAuth = getAuth(app);
export const firebaseStorage = getStorage(app);