import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUYf_du-ucTcgdVNayuhjVz57Z98dmGfM",
  authDomain: "animal-rescue-admin.firebaseapp.com",
  projectId: "animal-rescue-admin",
  storageBucket: "animal-rescue-admin.firebasestorage.app",
  messagingSenderId: "714030701861",
  appId: "1:714030701861:web:3d8ce57452f40f8772cecc",
  measurementId: "G-JC40KSY8PR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Retrieve the Analytics service
export const analytics = getAnalytics(app);

// Retrieve the Authentication service
export const auth = getAuth(app);

// Retrieve the Firestore database
export const db = getFirestore(app);