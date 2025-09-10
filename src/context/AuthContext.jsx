import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebaseConfig.js';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ADMIN_UID } from '../admin_config.jsx'; // Your admin ID

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // State to track admin status
  const [loading, setLoading] = useState(true);

  async function loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Create or update the user's document in Firestore
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          lastLogin: serverTimestamp(),
        }, { merge: true });
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
    // This listener handles all auth changes (login, logout, page refresh)
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in
        setCurrentUser(user);
        // Check if the signed-in user's UID matches the admin UID
        if (user.uid === ADMIN_UID) {
          setIsAdmin(true);
          console.log("Admin user authenticated.");
        } else {
          setIsAdmin(false);
          console.log("Standard user authenticated.");
        }
      } else {
        // User is signed out
        setCurrentUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return unsubscribe; // Cleanup the listener on component unmount
  }, []);

  // Expose the admin status through the context value
  const value = {
    currentUser,
    isAdmin, // Now you can check this value in other components
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}