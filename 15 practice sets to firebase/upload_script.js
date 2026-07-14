import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";
import { practiceSetsBook } from "./src/data/practice_sets_data.js";

const firebaseConfig = {
  apiKey: "AIzaSyCWBeflLL18D730hf9lOPscL_GUQnbmLdg",
  authDomain: "study-planner-40bc8.firebaseapp.com",
  projectId: "study-planner-40bc8",
  storageBucket: "study-planner-40bc8.firebasestorage.app",
  messagingSenderId: "808543753290",
  appId: "1:808543753290:web:6cc08ec36211fa7f7942b3",
  measurementId: "G-8EWKV909K8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function upload() {
  try {
    console.log("Starting upload...");
    await signInAnonymously(auth);
    console.log("Signed in anonymously.");
    const bookDocRef = doc(db, "practiceBooks", practiceSetsBook.id);
    await setDoc(bookDocRef, practiceSetsBook);
    console.log("Successfully uploaded practiceSetsBook to practiceBooks/jlpt-n3-practice-sets");
    process.exit(0);
  } catch (err) {
    console.error("Upload failed:", err);
    process.exit(1);
  }
}

upload();
