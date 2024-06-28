import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 

const Header = () => {
  return (
    <header className="App-header">
      <Link to="/" className="logo-button">
        <div className="logo">NourishNook</div>
      </Link>
      <div className="account-button">
        <Link to="/login">
          <img src="images/profile.png" alt="Account" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
