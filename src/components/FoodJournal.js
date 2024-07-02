// src/components/FoodJournal.js
import React, { useState, useEffect, useRef } from 'react';
import { DndContext, useDroppable, useDraggable } from '@dnd-kit/core';
import StickerBank from './StickerBank';
import SaveButtons from './SaveButtons';
import PicnicBasket from './PicnicBasket';
import './FoodJournal.css';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const FoodJournal = () => {
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [icons, setIcons] = useState([]);
  const [username, setUsername] = useState('User');
  const [notification, setNotification] = useState('');
  const quillRef = useRef(null);
  const quillInstanceRef = useRef(null);

  useEffect(() => {
    setUsername('Hot_Rod_95');
    if (!quillInstanceRef.current) {
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

  const handleDrop = (event) => {
    const { active } = event;
    const newItem = active.id.split('/').pop().split('.')[0]; // Extract the name from the icon path
    setNotification(`${newItem} added successfully!`);
    setTimeout(() => {
      setNotification('');
    }, 3000);
  };

  const todayDate = new Date().toLocaleDateString();

  return (
    <div className="food-journal-background">
      <img src="/images/leaves.png" alt="Background" className="background-image" />
      <DndContext onDragEnd={handleDrop}>
        <div className="food-journal-container">
          <div className="sticker-bank-wrapper left">
            <StickerBank type="left" />
          </div>
          <PicnicBasket />
          <div className="food-journal-content">
            <div className="food-journal">
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
          <div className="sticker-bank-wrapper right">
            <StickerBank type="right" />
          </div>
        </div>
        {notification && <div className="notification">{notification}</div>}
        <div className="sticker-bank-wrapper-bottom">
          <StickerBank type="bottom" />
        </div>
      </DndContext>
    </div>
  );
};

export default FoodJournal;
