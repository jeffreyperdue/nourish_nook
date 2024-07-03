// src/components/DashboardButton.js
import React from 'react';
import { Link } from 'react-router-dom';
import './DashboardButton.css';

const DashboardButton = () => {
  return (
    <Link to="/dashboard">
      <button className="dashboard-button">Go to Dashboard</button>
    </Link>
  );
};

export default DashboardButton;
