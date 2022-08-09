// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: "clone-b399c",
  storageBucket: "clone-b399c.appspot.com",
  messagingSenderId: "586598283461",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
