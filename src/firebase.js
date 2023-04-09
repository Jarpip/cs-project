import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyA9LxJGtybe82ER7gu8c7IK9wgIE7eFOqM",
  authDomain: "first-auto-service.firebaseapp.com",
  projectId: "first-auto-service",
  storageBucket: "first-auto-service.appspot.com",
  messagingSenderId: "10354105582",
  appId: "1:10354105582:web:e7b1895e0cb257b52aa7ff",
  measurementId: "G-W3J4ME2EVG",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
