// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8b1s9XijK-xkczPu7plArgeEzTSY2QCk",
  authDomain: "image-editor-43b54.firebaseapp.com",
  projectId: "image-editor-43b54",
  storageBucket: "image-editor-43b54.appspot.com",
  messagingSenderId: "323061966080",
  appId: "1:323061966080:web:14cc8675e821ffd7daffe5",
  measurementId: "G-EC5NCJ5PW9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);