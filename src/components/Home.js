// src/components/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import './Home.css';
import Polaroid from './Polaroid';

const Home = () => {
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
    const stemHeight = `${randomNumber * 17}px`;
    plantStem.style.height = stemHeight;

    // Position the top flower
    flowerTop.style.bottom = stemHeight;

    // Create and position flowers along the stem
    flowerIntervals.forEach((interval, index) => {
      if (interval < randomNumber) {
        const flowerBranch = document.createElement('div');
        flowerBranch.className = 'flower-branch';

        // Set random length for the branch
        const branchLength = `${Math.random() * 60 + 10}px`; // Between 10px and 70px
        flowerBranch.style.height = branchLength;

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

  return (
    <main>
      <section className="features">
        <h1>Welcome to NourishNook</h1>
        <ul>
          <li style={{ '--accent-color': '#0B374D' }}>
            <div className="icon"><i className="fa-solid fa-book"></i></div>
            <div className="title">Track Your Food</div>
            <div className="descr">Log your meals, snacks, and food feelings with our food journal. Track your fruit and vegetable intake effortlessly.</div>
          </li>
          <li style={{ '--accent-color': '#1286A8' }}>
            <div className="icon"><i className="fa-solid fa-leaf"></i></div>
            <div className="title">See Your Plant Grow</div>
            <div className="descr">Earn badges and see your plant grow as you eat more fruits and vegetables. Use our calendar and graphs to monitor your progress over time.</div>
          </li>
          <li style={{ '--accent-color': '#D2B53B' }}>
            <div className="icon"><i className="fa-solid fa-heart"></i></div>
            <div className="title">Healthy Habits</div>
            <div className="descr">See your fruit and vegetable tracking numbers. Visit your personalized nursery and see your previous plants.</div>
          </li>
          <li style={{ '--accent-color': '#DA611E' }}>
            <div className="icon"><i className="fa-solid fa-info"></i></div>
            <div className="title">Personalized Insights</div>
            <div className="descr">See your fruit and vegetable tracking numbers. Visit your personalized nursery and see your previous plants.</div>
          </li>
        </ul>
      </section>
      <Link to="/signup">
        <div className="home-card">
          <div className="home-card-text">Get Started</div>
          <div className="home-card-image" style={{ backgroundImage: 'url(/images/flowersnip.png)' }}></div>
        </div>
      </Link>
      <Link to="/food-journal">
        <div className="home-card">
          <div className="home-card-text">Explore Journal</div>
          <div className="home-card-image" style={{ backgroundImage: 'url(/images/journalsnip.png)' }}></div>
        </div>
      </Link>
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
    </main>
  );
};

export default Home;
