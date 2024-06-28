// src/components/Polaroid.js
import React from 'react';
import './Polaroid.css';

const Polaroid = ({ image, date }) => {
  return (
    <div className="polaroid">
      <div className="polaroid-image">
        <img src={image} alt={`Flower on ${date}`} />
      </div>
      <div className="polaroid-caption">
        <p>{date}</p>
      </div>
    </div>
  );
};

export default Polaroid;
