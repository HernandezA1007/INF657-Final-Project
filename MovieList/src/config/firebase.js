// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: proccess.env.REACT_APP_FIREBASE_API_KEY,
  apiKey: "AIzaSyCdWcRStl86Q1UhnUYsi189LPendxDYeSc",
  // authDomain: proccess.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  authDomain: "movielist-8f1e8.firebaseapp.com",
  // projectId: proccess.env.REACT_APP_FIREBASE_PROJECT_ID,
  projectId: "movielist-8f1e8",
  // storageBucket: proccess.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  storageBucket: "movielist-8f1e8.appspot.com",
  // messagingSenderId: proccess.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  messagingSenderId: "301613004867",
  // appId: proccess.env.REACT_APP_FIREBASE_APP_ID
  appId: "1:301613004867:web:30ca0471a3f23cab63fcf6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); // 
export default app;


// Original
/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdWcRStl86Q1UhnUYsi189LPendxDYeSc",
  authDomain: "movielist-8f1e8.firebaseapp.com",
  projectId: "movielist-8f1e8",
  storageBucket: "movielist-8f1e8.appspot.com",
  messagingSenderId: "301613004867",
  appId: "1:301613004867:web:30ca0471a3f23cab63fcf6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
*/