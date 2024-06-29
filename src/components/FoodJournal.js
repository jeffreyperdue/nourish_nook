// src/components/FoodJournal.js
import React, { useState, useEffect, useRef } from 'react';
import { useDroppable } from '@dnd-kit/core';
import StickerBank from './StickerBank';
import SaveButtons from './SaveButtons';
import './FoodJournal.css';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

// Add Quill editor container
const FoodJournal = () => {
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [icons, setIcons] = useState([]);
  const [username, setUsername] = useState('User');
  const quillRef = useRef(null);
  const quillInstanceRef = useRef(null); // Ref to keep track of the Quill instance

  const { setNodeRef } = useDroppable({
    id: 'droppable',
  });

  useEffect(() => {
    setUsername('JohnDoe');
    if (!quillInstanceRef.current) { // Check if Quill instance is already created
      quillInstanceRef.current = new Quill(quillRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ font: [] }],
            [{ size: ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ align: [] }],
            [{ color: [] }, { background: [] }],
            ['clean']
          ],
        },
      });

      quillInstanceRef.current.on('text-change', () => {
        setCurrentEntry(quillInstanceRef.current.root.innerHTML);
      });
    }
  }, []);

  const handleSave = () => {
    setEntries([...entries, { text: currentEntry, icons }]);
    setCurrentEntry('');
    setIcons([]);
    if (quillInstanceRef.current) {
      quillInstanceRef.current.root.innerHTML = '';
    }
  };

  const handleSaveDraft = () => {
    // Save draft logic
  };

  const handleDiscard = () => {
    setCurrentEntry('');
    setIcons([]);
    if (quillInstanceRef.current) {
      quillInstanceRef.current.root.innerHTML = '';
    }
  };

  const todayDate = new Date().toLocaleDateString();

  return (
    <div 
      className="food-journal-background"
    >
      <div className="sticker-bank-wrapper">
        <StickerBank type="left" />
      </div>
      <div className="food-journal-container">
        <div className="food-journal" ref={setNodeRef}>
          <h2>{`${username}'s Journal - ${todayDate}`}</h2>
          <div className="journal-area">
            <div ref={quillRef} className="quill-editor" />
            <div className="icons">
              {icons.map((icon, index) => (
                <img key={index} src={icon} alt="icon" className="journal-icon" />
              ))}
            </div>
          </div>
          <SaveButtons onSave={handleSave} onSaveDraft={handleSaveDraft} onDiscard={handleDiscard} />
        </div>
      </div>
      <div className="sticker-bank-wrapper">
        <StickerBank type="right" />
      </div>
    </div>
  );
};

export default FoodJournal;
