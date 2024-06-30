import React, { useEffect, useRef, useState } from 'react';
import { FastAverageColor } from 'fast-average-color';
import './FoodOfTheDay.css';

const foods = [
  {
    name: 'Apple',
    image: 'images/apple.png',
    facts: 'Apples are high in fiber and vitamin C.',
  },
  {
    name: 'Carrot',
    image: 'images/carrot.png',
    facts: 'Carrots are a great source of beta-carotene, fiber, and antioxidants.',
  },
  // Add more food objects as needed
];

const getFoodOfTheDay = () => {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 0);
  const diff = today - startOfYear;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return foods[dayOfYear % foods.length];
};

const getComplementaryColor = (rgb) => {
  const [r, g, b] = rgb;
  return `rgb(${255 - r}, ${255 - g}, ${255 - b})`;
};

const FoodOfTheDay = () => {
  const [bgColor, setBgColor] = useState('#ffffff');
  const [complementaryColor, setComplementaryColor] = useState('#000000');
  const imageRef = useRef(null);
  const food = getFoodOfTheDay();
  const todayDate = new Date().toLocaleDateString();

  useEffect(() => {
    if (imageRef.current.complete) {
      setColors();
    } else {
      imageRef.current.onload = setColors;
    }
  }, [food.image]);

  const setColors = () => {
    const fac = new FastAverageColor();
    fac.getColorAsync(imageRef.current)
      .then(color => {
        setBgColor(color.rgb);
        setComplementaryColor(getComplementaryColor(color.value));
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="card food-card" style={{ backgroundColor: bgColor }}>
      <div className="card-header">
        <h5 className="card-title" style={{ color: complementaryColor }}>
          F.O.T.D (Food of the Day)
        </h5>
        <p className="card-date" style={{ color: complementaryColor }}>
          {todayDate}
        </p>
      </div>
      <img ref={imageRef} src={food.image} className="card-img-top" alt={food.name} />
      <div className="card-body" style={{ backgroundColor: complementaryColor }}>
        <h5 className="card-title">{food.name}</h5>
        <p className="card-text">{food.facts}</p>
      </div>
    </div>
  );
};

export default FoodOfTheDay;
