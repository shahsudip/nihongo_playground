import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
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
const auth = getAuth(app);

// Export the instances to be used in other components
export { db, auth };

