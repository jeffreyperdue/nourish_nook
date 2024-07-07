// src/components/Flower.js
import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import './Flower.css';
import './FlowerStyle1.css';
import './FlowerStyle2.css';
import './FlowerStyle3.css';
import './FlowerStyle4.css';
import './FlowerStyle5.css';
import './FlowerStyle6.css';
import { useUser } from '../contexts/UserContext'; // Import useUser hook

const Flower = ({ saveImages }) => {
  const { user } = useUser(); // Get user data from context
  const [number, setNumber] = useState(0);
  const [images, setImages] = useState([]);
  const [style, setStyle] = useState('default');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 16) + 15;
    setNumber(randomNumber);

    const plantStem = document.getElementById('plantStem');
    const flowerTop = document.getElementById('flowerTop');
    const flowerIntervals = [5, 10, 15, 20, 25, 30];
    const flowerImages = [
      'images/five.png',
      'images/ten.png',
      'images/fifteen.png',
      'images/twenty.png',
      'images/twenty-five.png',
      'images/thirty.png'
    ];

    while (plantStem.firstChild) {
      plantStem.removeChild(plantStem.firstChild);
    }

    const stemHeight = `${randomNumber * 17}px`;
    plantStem.style.height = stemHeight;

    flowerTop.style.bottom = stemHeight;

    flowerIntervals.forEach((interval, index) => {
      if (interval < randomNumber) {
        const flowerBranch = document.createElement('div');
        flowerBranch.className = 'flower-branch';

        const branchLength = `${Math.random() * 60 + 10}px`;
        flowerBranch.style.height = branchLength;

        flowerBranch.style.bottom = `${interval * 17}px`;

        const angle = Math.random() * 60 + 30;
        flowerBranch.style.transform = `rotate(${angle}deg)`;

        if (index % 2 === 0) {
          flowerBranch.style.left = '55%';
        } else {
          flowerBranch.style.left = '45%';
          flowerBranch.style.transform = `rotate(${-angle}deg)`;
        }

        const flower = document.createElement('div');
        flower.className = 'flower';
        flower.style.bottom = '100%';

        const flowerImage = document.createElement('img');
        flowerImage.src = flowerImages[index % flowerImages.length];
        flowerImage.width = 40;
        flowerImage.height = 40;

        flower.appendChild(flowerImage);
        flowerBranch.appendChild(flower);
        plantStem.appendChild(flowerBranch);
      }
    });

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
    if (saveImages) {
      saveImages(newImages);
    }
  };

  const getCurrentWeekDates = () => {
    const currentDate = new Date();
    const firstDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

    const firstDate = firstDayOfWeek.toLocaleDateString();
    const lastDate = lastDayOfWeek.toLocaleDateString();

    return `${firstDate} - ${lastDate}`;
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleStyleChange = (newStyle) => {
    setStyle(newStyle);
    setShowDropdown(false);
  };

  return (
    <div className={`flower-container ${style}`}>
      <div className="sidebar">
        <h2>{`${user ? user.username : 'Guest'}'s Weekly Wellness Flower`}</h2>
        <h3>{getCurrentWeekDates()}</h3>
        <div className="style-dropdown">
          <button onClick={toggleDropdown} className="change-style-button">Change Style</button>
          {showDropdown && (
            <div className="dropdown-menu">
              <div onClick={() => handleStyleChange('default')}>Default Style</div>
              <div onClick={() => handleStyleChange('style1')}>Style 1</div>
              <div onClick={() => handleStyleChange('style2')}>Style 2</div>
              <div onClick={() => handleStyleChange('style3')}>Style 3</div>
              <div onClick={() => handleStyleChange('style4')}>Style 4</div>
              <div onClick={() => handleStyleChange('style5')}>Style 5</div>
              <div onClick={() => handleStyleChange('style6')}>Style 6</div>
            </div>
          )}
        </div>
      </div>
      <div className="plant-container">
        <div className="pot-container">
          <img src="/images/pot.png" alt="Pot" />
        </div>
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
    </div>
  );
};

export default Flower;
