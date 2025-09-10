// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // <-- THIS LINE WAS MISSING
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWBeflLL18D730hf9lOPscL_GUQnbmLdg",
  authDomain: "study-planner-40bc8.firebaseapp.com",
  projectId: "study-planner-40bc8",
  storageBucket: "study-planner-40bc8.firebasestorage.app",
  messagingSenderId: "808543753290",
  appId: "1:808543753290:web:6cc08ec36211fa7f7942b3",
  measurementId: "G-8EWKV909K8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Get references to the services
const db = getFirestore(app);
const auth = getAuth(app); // <-- 2. Initialize Auth

// 3. Export everything
export { db, auth };