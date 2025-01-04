// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPsHXJ5TppH073UYACFRYy7_bqHnmuXPs",
  authDomain: "my-blog-platform.firebaseapp.com",
  projectId: "my-blog-platform",
  storageBucket: "my-blog-platform.firebasestorage.app",
  messagingSenderId: "390088700221",
  appId: "1:390088700221:web:ba068270c2d2de6a565554",
  measurementId: "G-LEN9ZDMWS0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db  = getFirestore(app);
export const auth = getAuth(app);