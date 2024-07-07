// src/components/BadgeContainer.js
import React, { useState } from 'react';
import './BadgeContainer.css';
import { useUser } from '../contexts/UserContext'; // Import useUser hook

const BadgeContainer = () => {
  const { user } = useUser(); // Get user data from context
  const [currentPage, setCurrentPage] = useState(1);
  const badgesPerPage = 9;

  if (!user) {
    return <div>Please log in to view your badges.</div>;
  }

  const indexOfLastBadge = currentPage * badgesPerPage;
  const indexOfFirstBadge = indexOfLastBadge - badgesPerPage;
  const currentBadges = user.badges.slice(indexOfFirstBadge, indexOfLastBadge);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="badge-container">
      <h1>{`${user.username}'s Badges`}</h1>
      <div className="badges">
        {currentBadges.map((badge, index) => (
          <div key={index} className="badge">
            <img src={badge} alt={`Badge ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
        <button onClick={handleNextPage} disabled={indexOfLastBadge >= user.badges.length}>Next</button>
      </div>
    </div>
  );
};

export default BadgeContainer;
