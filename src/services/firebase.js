// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfZOp1feCIWxifZIYL6sEhkVUka7DleIA",
  authDomain: "trasladosapp-c6164.firebaseapp.com",
  projectId: "trasladosapp-c6164",
  storageBucket: "trasladosapp-c6164.firebasestorage.app",
  messagingSenderId: "951492524081",
  appId: "1:951492524081:web:594bfaf9a168c2107fbd10",
  measurementId: "G-T8VVYB71D0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };