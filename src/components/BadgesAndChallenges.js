// src/components/BadgesAndChallenges.js
import React from 'react';
import './BadgesAndChallenges.css';
import Sash from './Sash';
import BadgeContainer from './BadgeContainer';
import DashboardButton from './DashboardButton';
import ChallengeProgressCard from './ChallengeProgressCard';

const BadgesAndChallenges = ({ username, onCompleteChallenge }) => {
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

  const challenges = [
    { id: 1, description: 'Log in 5 days in a row', currentProgress: 1, totalProgress: 5, unlocks: 1 },
    { id: 2, description: 'Create Your First Journal Entry', currentProgress: 0, totalProgress: 1, unlocks: 2 },
  ];

  const handleCompleteChallenge = (unlockId) => {
    onCompleteChallenge(unlockId); // Unlock sticker related to the challenge
  };

  return (
    <main className="badges-challenges-container">
      <div className="content">
        <div className="sash-column">
          <Sash badges={badges} username={username} />
        </div>
        <div className="badge-column">
          <BadgeContainer badges={badges} />
        </div>
        <div className="challenges-column">
          {challenges.map((challenge, index) => (
            <ChallengeProgressCard
              key={index}
              challengeDescription={challenge.description}
              currentProgress={challenge.currentProgress}
              totalProgress={challenge.totalProgress}
              onComplete={() => handleCompleteChallenge(challenge.unlocks)}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default BadgesAndChallenges;
