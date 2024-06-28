// src/components/StickerBank.js
import React from 'react';
import DraggableIcon from './DraggableIcon';
import './StickerBank.css';

const fruitAndVeggieIcons = [
  'images/apple.png',
  'images/banana.png',
  // Add more fruit and vegetable icons
];

const emojiIcons = [
    'images/grinning.png',
    'images/disappointed.png',
  // Add more emoji icons
];

const StickerBank = ({ type }) => {
  const icons = type === 'left' ? fruitAndVeggieIcons : emojiIcons;
  const title = type === 'left' ? 'Fruits & Veggies' : 'Emojis';

  return (
    <div className={`sticker-bank ${type}`}>
      <h3>{title}</h3>
      {icons.map((icon, index) => (
        <DraggableIcon key={index} icon={icon} type={type} />
      ))}
    </div>
  );
};

export default StickerBank;
