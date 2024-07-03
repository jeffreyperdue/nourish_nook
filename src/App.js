import React, { useState } from 'react';
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
import BadgesAndChallenges from './components/BadgesAndChallenges';
import stickersData from './components/stickers';
import Footer from './components/Footer'; // Import Footer component

function App() {
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const sensors = useSensors(mouseSensor, touchSensor);

  const [stickers, setStickers] = useState(stickersData);

  const unlockSticker = (stickerId) => {
    setStickers((prevStickers) =>
      prevStickers.map((sticker) =>
        sticker.id === stickerId ? { ...sticker, isUnlocked: true } : sticker
      )
    );
  };

  const completeChallenge = (stickerId) => {
    unlockSticker(stickerId);
  };

  return (
    <DndContext sensors={sensors}>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/food-journal" element={<FoodJournal stickers={stickers.filter(sticker => sticker.isUnlocked)} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard username="JohnDoe" />} /> {/* Example username */}
            <Route path="/polaroid-nursery" element={<PolaroidNursery />} /> {/* Add Polaroid Nursery route */}
            <Route path="/badges-challenges" element={<BadgesAndChallenges username="JohnDoe" onCompleteChallenge={completeChallenge} />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </DndContext>
  );
}

export default App;
