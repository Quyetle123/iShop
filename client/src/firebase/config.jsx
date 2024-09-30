// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGI9NPi06str0-7WBo8UZQn8ZDm7vxcmk",
  authDomain: "note-app-211c3.firebaseapp.com",
  projectId: "note-app-211c3",
  storageBucket: "note-app-211c3.appspot.com",
  messagingSenderId: "477427998431",
  appId: "1:477427998431:web:4331df45f2a132216d136a",
  measurementId: "G-KZKN6W50MG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);