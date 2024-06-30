import React from 'react';
import './FoodOfTheDay.css';

const foods = [
  {
    name: 'Apple',
    image: 'images/apple.png',
    facts: 'Apples are high in fiber and vitamin C.'
  },
  {
    name: 'Carrot',
    image: 'images/carrot.png',
    facts: 'Carrots are a great source of beta-carotene, fiber, and antioxidants.'
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

const FoodOfTheDay = () => {
  const food = getFoodOfTheDay();

  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src={food.image} className="card-img-top" alt={food.name} />
      <div className="card-body">
        <h5 className="card-title">{food.name}</h5>
        <p className="card-text">{food.facts}</p>
      </div>
    </div>
  );
};

export default FoodOfTheDay;
