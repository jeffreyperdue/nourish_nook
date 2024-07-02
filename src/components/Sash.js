// src/components/Sash.js
import React from 'react';
import './Sash.css';

const Sash = ({ badges, username }) => {
  return (
    <div className="sash-box">
      <h2 className="sash-title">{username}'s Sash</h2>
      <div className="sash-container">
        <div className="sash">
          {badges.map((badge, index) => (
            <div key={index} className="badge" style={{ backgroundImage: `url(${badge})` }}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sash;
