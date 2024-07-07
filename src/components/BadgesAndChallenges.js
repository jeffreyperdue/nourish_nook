// src/components/BadgesAndChallenges.js
import React, { useEffect } from 'react';
import './BadgesAndChallenges.css';
import Sash from './Sash';
import BadgeContainer from './BadgeContainer';
import ChallengeProgressCard from './ChallengeProgressCard';
import { useUser } from '../contexts/UserContext'; // Import useUser hook

const BadgesAndChallenges = ({ onCompleteChallenge }) => {
  const { user } = useUser(); // Get user data from context

  useEffect(() => {
    console.log('User data:', user); // Log user data to check if it's being received
  }, [user]);

  if (!user) {
    return <div>Please log in to view badges and challenges.</div>;
  }

  const handleCompleteChallenge = (unlockId) => {
    onCompleteChallenge(unlockId); // Unlock sticker related to the challenge
  };

  return (
    <main className="badges-challenges-container">
      <div className="content">
        <div className="sash-column">
          <Sash />
        </div>
        <div className="badge-column">
          <BadgeContainer />
        </div>
        <div className="challenges-column">
          {user.challenges.map((challenge, index) => (
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
