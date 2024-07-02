// src/components/Modal.js
import React, { useState } from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, onSave, onClear, onAddToJournal }) => {
  const [entry, setEntry] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState('');
  const [entries, setEntries] = useState([]);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleEntryChange = (event) => {
    setEntry(event.target.value);
  };

  const handleAddToJournal = () => {
    const newEntry = { entry, quantity, date };
    setEntries([...entries, newEntry]);
    onAddToJournal(newEntry); // Call the passed function to handle the addition
    setEntry('');
    setQuantity(1);
    setDate('');
  };

  const handleSave = () => {
    onSave(entries);
    onClose();
  };

  const handleClear = () => {
    setEntries([]);
    onClear();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>New Journal Entry</h2>
        <div className="modal-field">
          <label htmlFor="entry">Entry:</label>
          <textarea id="entry" value={entry} onChange={handleEntryChange} />
        </div>
        <div className="modal-field">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
          />
        </div>
        <div className="modal-field">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={handleDateChange}
          />
        </div>
        <div className="modal-buttons">
          <button onClick={handleAddToJournal}>Add to Journal</button>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleClear}>Clear</button>
        </div>
        <div className="journal-entries">
          <h3>Journal Entries</h3>
          <ul>
            {entries.map((entry, index) => (
              <li key={index}>
                {entry.date} - {entry.entry} (Quantity: {entry.quantity})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Modal;
