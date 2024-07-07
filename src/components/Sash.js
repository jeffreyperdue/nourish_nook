// src/components/Sash.js
import React from 'react';
import './Sash.css';
import { useUser } from '../contexts/UserContext'; // Import useUser hook

const Sash = () => {
  const { user } = useUser(); // Get user data from context

  return (
    <div className="sash-box">
      <h2 className="sash-title">{user ? `${user.username}'s Sash` : 'Guest\'s Sash'}</h2>
      <div className="sash-container">
        <div className="sash">
          {user && user.badges.map((badge, index) => (
            <div key={index} className="badge" style={{ backgroundImage: `url(${badge})` }}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sash;
