// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import Polaroid from './Polaroid';
import FoodOfTheDay from './FoodOfTheDay';
import Calendar from './Calendar';
import Flower from './Flower';
import Modal from './Modal';

const Dashboard = ({ username }) => {
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [journalEntries, setJournalEntries] = useState([]);

  useEffect(() => {
    // Load saved images from local storage
    const savedImages = JSON.parse(localStorage.getItem('flowerImages')) || [];
    setImages(savedImages);
  }, []);

  const saveImages = (newImages) => {
    setImages(newImages);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSave = (entries) => {
    setJournalEntries(entries);
    console.log('Journal entries saved:', entries);
  };

  const handleClear = () => {
    setJournalEntries([]);
  };

  const handleAddToJournal = (newEntry) => {
    setJournalEntries((prevEntries) => [...prevEntries, newEntry]);
  };

  return (
    <main>
      <div className="welcome-message">
        <div className="speech-bubble">
          Welcome, {username}!
        </div>
      </div>
      <div className="dashboard-content">
        <div className="calendar-container">
          <Calendar />
        </div>
        <div className="fotd-container">
          <FoodOfTheDay />
        </div>
        <div className="flower-container">
          <Flower saveImages={saveImages} />
        </div>
      </div>
      <div className="dashboard-buttons">
        <Link to="/food-journal">
          <button className="dashboard-button">Add Journal Entry</button>
        </Link>
        <button className="dashboard-button">View Challenges/Badges</button>
        <button className="dashboard-button">Visit Polaroid Nursery</button>
        <button className="dashboard-button" onClick={toggleModal}>Quicklog</button>
      </div>
      <div className="archived-images">
        <h3>Archived Flowers</h3>
        {images.map((img, index) => (
          <Polaroid key={index} image={img.image} date={img.date} />
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={toggleModal}
        onSave={handleSave}
        onClear={handleClear}
        onAddToJournal={handleAddToJournal} // Pass the function to the Modal
      />
    </main>
  );
};

export default Dashboard;
