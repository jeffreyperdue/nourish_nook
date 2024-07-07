// src/components/ChallengeProgressCard.js
import React from 'react';
import './ChallengeProgressCard.css';

const ChallengeProgressCard = ({ challengeDescription, currentProgress, totalProgress, onComplete }) => {
  const progressPercentage = (currentProgress / totalProgress) * 100;

  return (
    <div className="challenge-card">
      <div className="challenge-description">
        {challengeDescription}
      </div>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
      </div>
      <div className="progress-text">
        {currentProgress} out of {totalProgress}
      </div>
      {currentProgress >= totalProgress && (
        <button onClick={onComplete}>Complete Challenge</button>
      )}
    </div>
  );
};

export default ChallengeProgressCard;
