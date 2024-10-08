// src/components/StickerBank.js
import React from 'react';
import DraggableIcon from './DraggableIcon';
import './StickerBank.css';
import { useUser } from '../contexts/UserContext'; // Import useUser hook

const StickerBank = ({ type }) => {
  const { user } = useUser(); // Get user data from context

  if (!user) {
    return <div>Please log in to view your stickers.</div>;
  }

  let filteredStickers = user.stickers.filter(sticker => sticker.pack === type);

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
