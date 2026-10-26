
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, setAnalyticsCollectionEnabled } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only after consent
export const initializeAnalytics = () => {
  if (!import.meta.env.PROD) return null;

  const analytics = getAnalytics(app);
  setAnalyticsCollectionEnabled(analytics, true);

  return analytics;
};

// Disable Analytics collection when consent is withdrawn
export const disableAnalytics = () => {
  if (!import.meta.env.PROD) return;

  const analytics = getAnalytics(app);
  setAnalyticsCollectionEnabled(analytics, false);
};

// Retrieve the Authentication service
export const auth = getAuth(app);

// Retrieve the Firestore database
export const db = getFirestore(app);
