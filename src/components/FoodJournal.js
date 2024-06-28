// src/components/FoodJournal.js
import React, { useState, useEffect } from 'react';
import { useDroppable } from '@dnd-kit/core';
import StickerBank from './StickerBank';
import SaveButtons from './SaveButtons';
import './FoodJournal.css';

const FoodJournal = () => {
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [icons, setIcons] = useState([]);
  const [username, setUsername] = useState('User');

  const { setNodeRef } = useDroppable({
    id: 'droppable',
  });

  useEffect(() => {
    setUsername('JohnDoe');
  }, []);

  const handleSave = () => {
    setEntries([...entries, { text: currentEntry, icons }]);
    setCurrentEntry('');
    setIcons([]);
  };

  const handleSaveDraft = () => {
    // Save draft logic
  };

  const handleDiscard = () => {
    setCurrentEntry('');
    setIcons([]);
  };

  const todayDate = new Date().toLocaleDateString();

  return (
    <div className="food-journal-background">
      <div className="food-journal-container">
        <StickerBank type="left" />
        <div className="food-journal" ref={setNodeRef}>
          <h2>{`${username}'s Journal - ${todayDate}`}</h2>
          <div className="journal-area">
            <textarea
              value={currentEntry}
              onChange={(e) => setCurrentEntry(e.target.value)}
              placeholder="Write your journal entry here..."
            />
            <div className="icons">
              {icons.map((icon, index) => (
                <img key={index} src={icon} alt="icon" className="journal-icon" />
              ))}
            </div>
          </div>
          <SaveButtons onSave={handleSave} onSaveDraft={handleSaveDraft} onDiscard={handleDiscard} />
        </div>
        <StickerBank type="right" />
      </div>
    </div>
  );
};

export default FoodJournal;
