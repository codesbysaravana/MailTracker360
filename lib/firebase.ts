// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCu8EXbqzBwpWm-iN_eo8vP1-P355A35FU",
  authDomain: "mailtracker360.firebaseapp.com",
  databaseURL: "https://mailtracker360-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mailtracker360",
  storageBucket: "mailtracker360.firebasestorage.app",
  messagingSenderId: "906444136199",
  appId: "1:906444136199:web:3d6edf0c4572cb72396fa2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);