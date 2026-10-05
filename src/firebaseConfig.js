import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  initializeFirestore, 
  connectFirestoreEmulator,
  persistentLocalCache, 
  persistentMultipleTabManager 
} from "firebase/firestore";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import { connectStorageEmulator, getStorage } from "firebase/storage";

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
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Initialize Firestore with IndexedDB Persistence
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
});
const auth = getAuth(app);
const functions = getFunctions(app, "asia-northeast1");
const storage = getStorage(app);

if (import.meta.env.VITE_USE_FIREBASE_EMULATORS === 'true') {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
  connectFunctionsEmulator(functions, '127.0.0.1', 5001);
  connectStorageEmulator(storage, '127.0.0.1', 9199);
}

// Export the instances to be used in other components
export { db, auth, functions, storage };


