// src/components/PolaroidNursery.js
import React, { useState, useEffect } from 'react';
import './PolaroidNursery.css';
import Polaroid from './Polaroid';
import DashboardButton from './DashboardButton';

const PolaroidNursery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Load saved images from local storage
    const savedImages = JSON.parse(localStorage.getItem('flowerImages')) || [];
    setImages(savedImages);
  }, []);

  return (
    <main>
      <h3>Archived Flowers</h3>
      <div className="polaroid-nursery">
        {images.map((img, index) => (
          <Polaroid key={index} image={img.image} date={img.date} />
        ))}
        <DashboardButton />
      </div>
    </main>
  );
};

export default PolaroidNursery;
