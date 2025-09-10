import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      navigate('/profile'); // Redirect to profile after successful login
    } catch (error) {
      console.error("Failed to log in with Google", error);
      alert("Failed to log in. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome Back!</h1>
        <p>Sign in to continue to your dashboard.</p>
        <button onClick={handleGoogleSignIn} className="google-signin-button">
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;