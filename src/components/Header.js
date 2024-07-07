// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 

const Header = () => {
  return (
    <header className="App-header">
      <Link to="/" className="logo-button">
        <div className="logo">NourishNook</div>
      </Link>
      <nav className="nav-buttons">
        <Link to="/dashboard" className="nav-button">Dashboard</Link>
        <Link to="/food-journal" className="nav-button">Journal</Link>
        <Link to="/polaroid-nursery" className="nav-button">Polaroid Nursery</Link>
        <Link to="/badges-and-challenges" className="nav-button">Badges & Challenges</Link> {/* Ensure this matches */}
      </nav>
      <div className="account-button">
        <Link to="/login">
          <img src="images/profile.png" alt="Account" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
