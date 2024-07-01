// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <main className="homepage">
      <div className="homepage-content">
        <section className="left-column">
          <Link to="/signup">
            <div className="home-card">
              <div className="home-card-text">Get Started</div>
              <div className="home-card-image" style={{ backgroundImage: 'url(/images/flowersnip.png)' }}></div>
            </div>
          </Link>
        </section>
        <section className="middle-column">
          <h1>Welcome to NourishNook</h1>
          <ul>
            <li style={{ '--accent-color': '#0B374D' }}>
              <div className="icon"><i className="fa-solid fa-book"></i></div>
              <div className="title">Track Your Food</div>
              <div className="descr">Log your meals, snacks, and food feelings with our food journal. Track your fruit and vegetable intake effortlessly.</div>
            </li>
            <li style={{ '--accent-color': '#1286A8' }}>
              <div className="icon"><i className="fa-solid fa-leaf"></i></div>
              <div className="title">See Your Plant Grow</div>
              <div className="descr">Earn badges and see your plant grow as you eat more fruits and vegetables. Use our calendar and graphs to monitor your progress over time.</div>
            </li>
            <li style={{ '--accent-color': '#D2B53B' }}>
              <div className="icon"><i className="fa-solid fa-heart"></i></div>
              <div className="title">Healthy Habits</div>
              <div className="descr">See your fruit and vegetable tracking numbers. Visit your personalized nursery and see your previous plants.</div>
            </li>
            <li style={{ '--accent-color': '#DA611E' }}>
              <div className="icon"><i className="fa-solid fa-info"></i></div>
              <div className="title">Personalized Insights</div>
              <div className="descr">See your fruit and vegetable tracking numbers. Visit your personalized nursery and see your previous plants.</div>
            </li>
          </ul>
        </section>
        <section className="right-column">
          <Link to="/food-journal">
            <div className="home-card">
              <div className="home-card-text">Explore Journal</div>
              <div className="home-card-image" style={{ backgroundImage: 'url(/images/journalsnip.png)' }}></div>
            </div>
          </Link>
        </section>
      </div>
    </main>
  );
};

export default Home;
