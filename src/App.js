// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DndContext } from '@dnd-kit/core';
import { MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Home from './components/Home';
import FoodJournal from './components/FoodJournal';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import PolaroidNursery from './components/PolaroidNursery';
import Footer from './components/Footer'; // Import Footer component

function App() {
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <DndContext sensors={sensors}>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/food-journal" element={<FoodJournal />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard username="JohnDoe" />} /> {/* Example username */}
            <Route path="/polaroid-nursery" element={<PolaroidNursery />} /> {/* Add Polaroid Nursery route */}
          </Routes>
          <Footer />
        </div>
      </Router>
    </DndContext>
  );
}

export default App;
