// src/components/PicnicBasket.js
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import './PicnicBasket.css';

const PicnicBasket = ({ onDrop }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: 'picnic-basket',
  });

  return (
    <div className={`picnic-basket-container ${isOver ? 'over' : ''}`}>
      <div className="picnic-basket" ref={setNodeRef}>
        <img src="/images/picnic_basket.png" alt="Picnic Basket" />
      </div>
      <p>Log fruits & vegetables by placing them in the basket.</p>
    </div>
  );
};

export default PicnicBasket;
