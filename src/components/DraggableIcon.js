// src/components/DraggableIcon.js
import React from 'react';
import { useDraggable } from '@dnd-kit/core';

const DraggableIcon = ({ icon, id }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : 'none',
    cursor: 'pointer',
    width: '40px',
    height: '40px',
  };

  return (
    <img
      ref={setNodeRef}
      src={icon}
      alt="icon"
      style={style}
      {...listeners}
      {...attributes}
    />
  );
};

export default DraggableIcon;
