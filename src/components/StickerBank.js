// src/components/StickerBank.js
import React from 'react';
import DraggableIcon from './DraggableIcon';
import './StickerBank.css';

const StickerBank = ({ type, stickers = [] }) => {
  let filteredStickers = stickers.filter(sticker => sticker.pack === type);

  let title = '';
  if (type === 'Fruits & Veggies') {
    title = 'Fruits & Veggies';
  } else if (type === 'Emojis') {
    title = 'Emojis';
  } else if (type === 'Stickers') {
    title = 'Stickers';
  }

  return (
    <div className={`sticker-bank ${type.toLowerCase().replace(/\s+/g, '-')}`}>
      <h3>{title}</h3>
      {filteredStickers.map((sticker) => (
        <DraggableIcon key={sticker.id} icon={sticker.image} />
      ))}
    </div>
  );
};

export default StickerBank;
