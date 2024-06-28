// src/components/SignUp.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = (event) => {
    event.preventDefault();
    // Perform signup logic
    // After successful signup, redirect to Dashboard
    navigate('/dashboard');
  };

  return (
    <div className="signup-container">
      <h2>Join NourishNook</h2>
      <form onSubmit={handleSignUp}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" required />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
