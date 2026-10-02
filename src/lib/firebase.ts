import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_r7FDkVwHxmtGfrIYtcv8RNXi_PfC2VQ",
  authDomain: "junior-dream.firebaseapp.com",
  databaseURL: "https://junior-dream-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "junior-dream",
  storageBucket: "junior-dream.firebasestorage.app",
  messagingSenderId: "148047251345",
  appId: "1:148047251345:web:ee9bd9be3811dea222fc30",
  measurementId: "G-8VSX56Y7W8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
export const auth = getAuth(app);

// Keep analytics off the initial page-load path.
if (typeof window !== "undefined") {
  window.setTimeout(() => {
    void import("firebase/analytics")
      .then(async ({ getAnalytics, isSupported }) => {
        if (await isSupported()) getAnalytics(app);
      })
      .catch(() => undefined);
  }, 3000);
}

export default app;