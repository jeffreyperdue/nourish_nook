// src/components/DraggableIcon.js
import React from 'react';
import { useDraggable } from '@dnd-kit/core';

const DraggableIcon = ({ icon }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: icon,
  });

  const style = {
    transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
    cursor: 'grab',
  };

  return (
    <img
      ref={setNodeRef}
      src={icon}
      alt="icon"
      style={style}
      {...listeners}
      {...attributes}
      className="draggable-icon"
    />
  );
};

export default DraggableIcon;
