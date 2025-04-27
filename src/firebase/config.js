import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA4no1R89Br0MAeTP_RNbA2hbcTKNKYcXE",
    authDomain: "movie-verse-75879.firebaseapp.com",
    projectId: "movie-verse-75879",
    storageBucket: "movie-verse-75879.firebasestorage.app",
    messagingSenderId: "357440253899",
    appId: "1:357440253899:web:8b0f3c0637dc192033904e"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 
//export default app;