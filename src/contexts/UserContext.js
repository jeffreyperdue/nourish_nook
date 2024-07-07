// src/contexts/UserContext.js
import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: 'AlfonzTheGreat',
    badges: [
      'images/log_badge.png',
      'images/badge2.png',
      'images/badge3.png',
      'images/badge4.png',
    ],
    challenges: [
      { id: 1, description: 'Log in 5 days in a row', currentProgress: 3, totalProgress: 5, unlocks: 1 },
      { id: 2, description: 'Create Your First Journal Entry', currentProgress: 1, totalProgress: 1, unlocks: 2 },
    ],
    stickers: [
      {
        id: 1,
        name: 'Star',
        image: '/images/star.png',
        isUnlocked: true,
        pack: 'Basic',
      },
      {
        id: 2,
        name: 'Heart',
        image: '/images/heart.png',
        isUnlocked: true,
        pack: 'Basic',
      },
      {
        id: 3,
        name: 'Apple',
        image: '/images/apple.png',
        isUnlocked: true,
        pack: 'Fruits & Veggies',
      },
      {
        id: 4,
        name: 'Banana',
        image: '/images/banana.png',
        isUnlocked: true,
        pack: 'Fruits & Veggies',
      },
      {
        id: 5,
        name: 'Grinning',
        image: '/images/grinning.png',
        isUnlocked: true,
        pack: 'Emojis',
      },
      {
        id: 6,
        name: 'Disappointed',
        image: '/images/disappointed.png',
        isUnlocked: true,
        pack: 'Emojis',
      },
      {
        id: 7,
        name: 'Sun',
        image: '/images/sun.png',
        isUnlocked: true,
        pack: 'Stickers',
      },
      {
        id: 8,
        name: 'Dino',
        image: '/images/dino.png',
        isUnlocked: true,
        pack: 'Stickers',
      },
    ],
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
