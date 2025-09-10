import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebaseConfig.js';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { doc, setDoc, getDocs, collection, serverTimestamp, writeBatch } from 'firebase/firestore';
import { quizData as staticQuizData } from '../data/quiz_data.jsx'; // Your local data
import { ADMIN_UID } from '../adminConfig.jsx'; // Your admin ID

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // This function pushes the local quiz data to the global Firestore collection.
  // It only runs if the user is the admin and the collection is empty.
  const seedStandardQuizzes = async () => {
    try {
      const quizzesRef = collection(db, 'quizzes');
      const existingQuizzesSnapshot = await getDocs(quizzesRef);

      // Only seed data if the global collection is empty
      if (existingQuizzesSnapshot.empty) {
        console.log("Seeding standard quizzes to global collection...");
        const batch = writeBatch(db);

        Object.keys(staticQuizData).forEach(level => {
          Object.keys(staticQuizData[level]).forEach(category => {
            Object.keys(staticQuizData[level][category]).forEach(difficulty => {
              const quizId = `${level}-${category}-${difficulty}`;
              const quizDocRef = doc(db, 'quizzes', quizId);
              const quizDetails = staticQuizData[level][category][difficulty];
              batch.set(quizDocRef, {
                ...quizDetails,
                level,
                category,
                difficulty,
                type: 'standard', // Mark this as a standard quiz
              });
            });
          });
        });
        await batch.commit();
        console.log("Standard quizzes have been successfully seeded.");
      }
    } catch (error) {
      console.error("Error seeding standard quizzes:", error);
    }
  };

  async function loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          lastLogin: serverTimestamp(),
        }, { merge: true });

        // If the logged-in user is the admin, run the seeding function
        if (user.uid === ADMIN_UID) {
          await seedStandardQuizzes();
        }
      }
      return userCredential;
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      throw error;
    }
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = { currentUser, loginWithGoogle, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

