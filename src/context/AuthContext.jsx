import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebaseConfig.js'; // Import both auth and the database
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'; // Import Firestore functions

// Create the context
const AuthContext = React.createContext();

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}

// Provider component that wraps your app
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // The login function is now async to handle the database operation
  async function loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // --- THIS IS THE NEW DATABASE LOGIC ---
      // After a successful login, create a user document in Firestore.
      if (user) {
        // Create a reference to the document for this user.
        // The document will be named with the user's unique UID.
        const userDocRef = doc(db, "users", user.uid);

        // Use setDoc with { merge: true } as an "upsert".
        // It creates the document if it's new, or updates it without
        // overwriting existing data if the user logs in again.
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          lastLogin: serverTimestamp(), // Records the time of the last login
        }, { merge: true });
      }
      
      return userCredential;

    } catch (error) {
      console.error("Error during Google sign-in:", error);
      // Re-throw the error so the UI component can handle it
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

  const value = {
    currentUser,
    loginWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

