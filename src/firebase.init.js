// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAxqHNA2yuNOLssmvhxXKJloWjeViibCs8",
    authDomain: "section-n-diu.firebaseapp.com",
    projectId: "section-n-diu",
    storageBucket: "section-n-diu.appspot.com",
    messagingSenderId: "863840747151",
    appId: "1:863840747151:web:43ff0bd61dd7c18bb3bafa",
    measurementId: "G-1YT45T2LG2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export const storage = getStorage(app);


export default auth;