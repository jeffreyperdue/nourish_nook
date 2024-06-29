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

const stickerIcons = [
  'images/sun.png',
  'images/dino.png',
  // Add more sticker icons
];

const StickerBank = ({ type }) => {
  let icons = [];
  let title = '';

  if (type === 'left') {
    icons = fruitAndVeggieIcons;
    title = 'Fruits & Veggies';
  } else if (type === 'right') {
    icons = emojiIcons;
    title = 'Emojis';
  } else if (type === 'bottom') {
    icons = stickerIcons;
    title = 'Stickers';
  }

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
