import React, { useState, useEffect, useRef } from 'react';
import { DndContext } from '@dnd-kit/core';
import StickerBank from './StickerBank';
import SaveButtons from './SaveButtons';
import PicnicBasket from './PicnicBasket';
import DashboardButton from './DashboardButton'; 
import './FoodJournal.css';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import Modal from 'react-modal';

const FoodJournal = ({ stickers }) => {
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [icons, setIcons] = useState([]);
  const [username, setUsername] = useState('User');
  const [notification, setNotification] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
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

    // Load entries from local storage
    const savedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    setEntries(savedEntries);
  }, []);

  const handleSave = () => {
    if (currentEntry.trim() !== '') {
      let newEntries;
      if (editIndex !== null) {
        newEntries = [...entries];
        newEntries[editIndex] = { text: currentEntry, icons, date: new Date() };
        setEditIndex(null);
      } else {
        newEntries = [...entries, { text: currentEntry, icons, date: new Date() }];
      }
      setEntries(newEntries);
      localStorage.setItem('journalEntries', JSON.stringify(newEntries)); // Save to local storage
      setCurrentEntry('');
      setIcons([]);
      if (quillInstanceRef.current) {
        quillInstanceRef.current.root.innerHTML = '';
      }
    }
  };

  const handleSaveDraft = () => {
    // Save draft logic
  };

  const handleDiscard = () => {
    setCurrentEntry('');
    setIcons([]);
    setEditIndex(null);
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

  const handleEdit = (index) => {
    const entry = entries[index];
    setCurrentEntry(entry.text);
    setIcons(entry.icons);
    if (quillInstanceRef.current) {
      quillInstanceRef.current.root.innerHTML = entry.text;
    }
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const newEntries = entries.filter((_, i) => i !== index);
    setEntries(newEntries);
    localStorage.setItem('journalEntries', JSON.stringify(newEntries)); // Save to local storage
  };

  const todayDate = new Date().toLocaleDateString();

  const openModal = (entry) => {
    setSelectedEntry(entry);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEntry(null);
  };

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
                  <div key={index} className="entry-buttons">
                    <button className="entry-button" onClick={() => openModal(entry)}>
                      {entry.date.toLocaleString()}
                    </button>
                    <button className="edit-button" onClick={() => handleEdit(index)}>Edit</button>
                    <button className="delete-button" onClick={() => handleDelete(index)}>Delete</button>
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
      {selectedEntry && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="journal-modal"
          overlayClassName="journal-modal-overlay"
        >
          <h2>{`${username}'s Journal Entry - ${selectedEntry.date.toLocaleString()}`}</h2>
          <div dangerouslySetInnerHTML={{ __html: selectedEntry.text }} />
          <div className="icons">
            {selectedEntry.icons.map((icon, index) => (
              <img key={index} src={icon} alt="icon" className="journal-icon" />
            ))}
          </div>
          <button onClick={closeModal} className="close-modal-button">Close</button>
        </Modal>
      )}
    </div>
  );
};

export default FoodJournal;
