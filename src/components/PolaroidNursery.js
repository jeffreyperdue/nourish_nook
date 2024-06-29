import React from 'react';
import './PolaroidNursery.css';

const PolaroidNursery = ({ polaroids }) => {
  return (
    <div className="nursery-container">
      <h2>Your Polaroid Nursery</h2>
      <div className="polaroid-gallery">
        {polaroids.map((polaroid, index) => (
          <div key={index} className="polaroid">
            <img src={polaroid.src} alt={`Polaroid ${index + 1}`} />
            <p>{polaroid.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PolaroidNursery;
