// src/components/BadgesAndChallenges.js
import React from 'react';
import './BadgesAndChallenges.css';
import Sash from './Sash';
import BadgeContainer from './BadgeContainer';

const BadgesAndChallenges = ({ username }) => {
  const badges = [
    'images/log_badge.png',
    'images/badge2.png',
    'images/badge3.png',
    'images/badge4.png',
    'images/badge4.png',
    'images/badge4.png',
    'images/badge4.png',
    'images/badge4.png',
    'images/badge4.png',
    'images/badge4.png',
    // Add more badge images as needed
  ];

  return (
    <main className="badges-challenges-container">
      <h1>Badges & Challenges</h1>
      <div className="content">
        <div className="sash-column">
          <Sash badges={badges} username={username} />
        </div>
        <div className="badge-column">
          <BadgeContainer badges={badges} />
        </div>
        <div className="challenges-column">
          {/* Future challenges content */}
        </div>
      </div>
    </main>
  );
};

export default BadgesAndChallenges;
