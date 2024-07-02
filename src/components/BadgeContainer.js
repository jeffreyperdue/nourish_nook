// src/components/BadgeContainer.js
import React, { useState } from 'react';
import './BadgeContainer.css';

const BadgeContainer = ({ badges }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const badgesPerPage = 9;

  const indexOfLastBadge = currentPage * badgesPerPage;
  const indexOfFirstBadge = indexOfLastBadge - badgesPerPage;
  const currentBadges = badges.slice(indexOfFirstBadge, indexOfLastBadge);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="badge-container">
      <div className="badges">
        {currentBadges.map((badge, index) => (
          <div key={index} className="badge">
            <img src={badge} alt={`Badge ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
        <button onClick={handleNextPage} disabled={indexOfLastBadge >= badges.length}>Next</button>
      </div>
    </div>
  );
};

export default BadgeContainer;
