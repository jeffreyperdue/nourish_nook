// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import './Dashboard.css';
import Polaroid from './Polaroid';
import FoodOfTheDay from './FoodOfTheDay';
import Calendar from './Calendar'; // Import the Calendar component

const Dashboard = ({ username }) => {
  const [number, setNumber] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 16) + 15; // Generate random number between 15 and 30
    setNumber(randomNumber);

    // Branch generation logic
    const plantStem = document.getElementById('plantStem');
    const flowerTop = document.getElementById('flowerTop');
    const flowerIntervals = [5, 10, 15, 20, 25, 30];
    const flowerImages = [
      'images/five.png',  // Your custom PNG paths
      'images/ten.png',
      'images/fifteen.png',
      'images/twenty.png',
      'images/twenty-five.png',
      'images/thirty.png'
    ];

    // Clear existing branches if any
    while (plantStem.firstChild) {
      plantStem.removeChild(plantStem.firstChild);
    }

    // Set the height of the stem
    const stemHeight = randomNumber * 17;
    plantStem.style.height = `${stemHeight}px`;

    // Position the top flower
    flowerTop.style.bottom = `${stemHeight}px`;

    // Create and position flowers along the stem
    flowerIntervals.forEach((interval, index) => {
      if (interval < randomNumber) {
        const flowerBranch = document.createElement('div');
        flowerBranch.className = 'flower-branch';

        // Set random length for the branch
        const branchLength = Math.random() * 60 + 10; // Between 10px and 70px
        flowerBranch.style.height = `${branchLength}px`;

        flowerBranch.style.bottom = `${interval * 17}px`;

        // Set specific angles for the branches between 30 and 90 degrees
        const angle = Math.random() * 60 + 30; // Between 30deg and 90deg
        flowerBranch.style.transform = `rotate(${angle}deg)`;

        // Alternate the side of the stem the flowers are on
        if (index % 2 === 0) {
          flowerBranch.style.left = '55%';
        } else {
          flowerBranch.style.left = '45%';
          flowerBranch.style.transform = `rotate(${-angle}deg)`; // Rotate in the opposite direction for the other side
        }

        const flower = document.createElement('div');
        flower.className = 'flower';
        flower.style.bottom = '100%';

        // Add the PNG image
        const flowerImage = document.createElement('img');
        flowerImage.src = flowerImages[index % flowerImages.length];
        flowerImage.width = 40; // Adjust the width as needed
        flowerImage.height = 40; // Adjust the height as needed

        flower.appendChild(flowerImage);
        flowerBranch.appendChild(flower);
        plantStem.appendChild(flowerBranch);
      }
    });

    // Load saved images from local storage
    const savedImages = JSON.parse(localStorage.getItem('flowerImages')) || [];
    setImages(savedImages);
  }, []);

  const captureFlower = async () => {
    const flowerElement = document.getElementById('flowerTop');
    const canvas = await html2canvas(flowerElement);
    const image = canvas.toDataURL('image/png');
    const newImages = [...images, { date: new Date().toLocaleDateString(), image }];
    setImages(newImages);
    localStorage.setItem('flowerImages', JSON.stringify(newImages));
  };

  return (
    <main>
      <div className="welcome-message">
        <div className="speech-bubble">
          Welcome, {username}!
        </div>
      </div>
      <div className="plant-container">
        <div className="pot" id="pot"></div>
        <div className="plant-stem" id="plantStem"></div>
        <div className="flower-top" id="flowerTop">
          <div className="flower-center" id="flowerCenter">{number}</div>
          <div className="petal petal1"></div>
          <div className="petal petal2"></div>
          <div className="petal petal3"></div>
          <div className="petal petal4"></div>
          <div className="petal petal5"></div>
          <div className="petal petal6"></div>
        </div>
      </div>
      <button onClick={captureFlower} className="capture-flower">Capture Flower</button>
      <FoodOfTheDay />
      <div className="dashboard-buttons">
        <Link to="/food-journal">
          <button className="dashboard-button">Add Journal Entry</button>
        </Link>
        <button className="dashboard-button">View Challenges/Badges</button>
        <button className="dashboard-button">Visit Polaroid Nursery</button>
      </div>
      <div className="archived-images">
        <h3>Archived Flowers</h3>
        {images.map((img, index) => (
          <Polaroid key={index} image={img.image} date={img.date} />
        ))}
      </div>
      <Calendar /> {/* Add the Calendar component */}
    </main>
  );
};

export default Dashboard;
