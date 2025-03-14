// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5qKCI10k_Dm5zZTJIEewrcDrtwv5L1kA",
  authDomain: "game-c-c738f.firebaseapp.com",
  projectId: "game-c-c738f",
  storageBucket: "game-c-c738f.firebasestorage.app",
  messagingSenderId: "1052071407804",
  appId: "1:1052071407804:web:5b44dd95e170c45abda0b9",
  measurementId: "G-LJDG9MXD5F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
