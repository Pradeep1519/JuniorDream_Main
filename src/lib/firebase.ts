import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase web config is safe to keep in client code — it's not a secret.
// Access control is enforced by Firestore Security Rules (see firestore.rules)
// and by the fact that there is no public sign-up screen in this app —
// only accounts you create yourself in the Firebase Console can log in.
const firebaseConfig = {
  apiKey: "AIzaSyA_r7FDkVwHxmtGfrIYtcv8RNXi_PfC2VQ",
  authDomain: "junior-dream.firebaseapp.com",
  databaseURL:
    "https://junior-dream-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "junior-dream",
  storageBucket: "junior-dream.firebasestorage.app",
  messagingSenderId: "148047251345",
  appId: "1:148047251345:web:ee9bd9be3811dea222fc30",
  measurementId: "G-8VSX56Y7W8",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
