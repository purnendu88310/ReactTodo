// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlJHJnz_0gFEpPT4kkztEreXbG0_zygos",
  authDomain: "reacttodo-d5f6d.firebaseapp.com",
  projectId: "reacttodo-d5f6d",
  storageBucket: "reacttodo-d5f6d.appspot.com",
  messagingSenderId: "396875171170",
  appId: "1:396875171170:web:d45a9dc6591cfd47aa583b",
  measurementId: "G-Z065LTN12R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)
export {db}