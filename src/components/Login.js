// src/components/Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    // Perform login logic
    // After successful login, redirect to Dashboard
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <h2>Login to NourishNook</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
