// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBr-BjMDOuIeQzp4VJk27Gsr48tBESSw5s",
  authDomain: "safenet-81d80.firebaseapp.com",
  projectId: "safenet-81d80",
  storageBucket: "safenet-81d80.appspot.com",
  messagingSenderId: "739741945907",
  appId: "1:739741945907:web:26677c7620c470e0cb1346"
};

let appInit = initializeApp(firebaseConfig);

export const auth = getAuth(appInit);
const db = getFirestore(appInit);
export default db;
export const app = appInit;
