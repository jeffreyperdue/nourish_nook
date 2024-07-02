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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [journalEntries, setJournalEntries] = useState([]);

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
          <Flower />
        </div>
      </div>
      <div className="dashboard-buttons">
        <Link to="/food-journal">
          <button className="dashboard-button">Add Journal Entry</button>
        </Link>
        <button className="dashboard-button">View Challenges/Badges</button>
        <Link to="/polaroid-nursery">
          <button className="dashboard-button">Visit Polaroid Nursery</button>
        </Link>
        <button className="dashboard-button" onClick={toggleModal}>Quicklog</button>
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
