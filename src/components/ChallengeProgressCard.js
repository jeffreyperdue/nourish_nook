import React from 'react';
import './ChallengeProgressCard.css';

const ChallengeProgressCard = ({ challengeDescription, currentProgress, totalProgress }) => {
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
    </div>
  );
};

export default ChallengeProgressCard;
