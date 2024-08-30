// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_firebase_api_key,
  authDomain: process.env.REACT_APP_firebase_auth_domain,
  projectId: "workout-3fb65",
  storageBucket: "workout-3fb65.appspot.com",
  messagingSenderId: "502550942607",
  appId: process.env.REACT_APP_firebase_appid,
  measurementId: "G-5B2C132B8E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db };