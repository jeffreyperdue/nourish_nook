import React, { useState, useEffect, useRef } from 'react';
import { DndContext } from '@dnd-kit/core';
import axios from 'axios';
import StickerBank from './StickerBank';
import SaveButtons from './SaveButtons';
import PicnicBasket from './PicnicBasket';
import DashboardButton from './DashboardButton'; 
import './FoodJournal.css';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const FoodJournal = ({ stickers }) => {
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

    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await axios.get('http://localhost:5000/entries');
      setEntries(response.data);
    } catch (err) {
      console.error('Error fetching entries:', err);
    }
  };

  const handleSave = async () => {
    const newEntry = { text: currentEntry, icons, date: new Date().toLocaleDateString(), username };
    try {
      const response = await axios.post('http://localhost:5000/entries', newEntry);
      setEntries([...entries, response.data]);
      setCurrentEntry('');
      setIcons([]);
      if (quillInstanceRef.current) {
        quillInstanceRef.current.root.innerHTML = '';
      }
    } catch (err) {
      console.error('Error saving entry:', err);
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
          <div className="left-column">
            <DashboardButton />
            <PicnicBasket />
          </div>
          <div className="main-column">
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
              <div className="saved-entries">
                <h3>Saved Entries</h3>
                {entries.map((entry, index) => (
                  <div key={index} className="journal-entry">
                    <p>{entry.date}</p>
                    <div dangerouslySetInnerHTML={{ __html: entry.text }} />
                    <div className="icons">
                      {entry.icons.map((icon, idx) => (
                        <img key={idx} src={icon} alt="icon" className="journal-icon" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="right-column">
            <div className="sticker-bank-wrapper">
              <StickerBank type="Fruits & Veggies" stickers={stickers} />
            </div>
            <div className="sticker-bank-wrapper">
              <StickerBank type="Emojis" stickers={stickers} />
            </div>
            <div className="sticker-bank-wrapper-bottom">
              <StickerBank type="Stickers" stickers={stickers} />
            </div>
          </div>
        </div>
        {notification && <div className="notification">{notification}</div>}
      </DndContext>
    </div>
  );
};

export default FoodJournal;
