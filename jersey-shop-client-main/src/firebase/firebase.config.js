// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyC9U6VwvEbgnJBBJF4UXKkNKQUz_bLWMkk",
    authDomain: "jersey-mania.firebaseapp.com",
    projectId: "jersey-mania",
    storageBucket: "jersey-mania.appspot.com",
    messagingSenderId: "950970480655",
    appId: "1:950970480655:web:61237f3816692f2ece4b7a"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;