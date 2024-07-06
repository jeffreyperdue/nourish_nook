// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <main className="homepage">
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Welcome to NourishNook</h1>
          <p className="hero-subtitle">Grow healthy habits with our fun and engaging platform</p>
          <Link to="/signup">
            <button className="hero-button">Get Started</button>
          </Link>
        </div>
      </section>
      <section className="features-section">
        <div className="feature-card">
          <div className="feature-icon"><i className="fa-solid fa-book"></i></div>
          <div className="feature-title">Track Your Food</div>
          <div className="feature-descr">
            Log your meals, snacks, and food feelings with our food journal. Track your fruit and vegetable intake effortlessly.
          </div>
        </div>
        <div className="feature-card">
          <div className="feature-icon"><i className="fa-solid fa-leaf"></i></div>
          <div className="feature-title">See Your Plant Grow</div>
          <div className="feature-descr">
            Earn badges and see your plant grow as you eat more fruits and vegetables. Use our calendar and graphs to monitor your progress over time.
          </div>
        </div>
        <div className="feature-card">
          <div className="feature-icon"><i className="fa-solid fa-heart"></i></div>
          <div className="feature-title">Healthy Habits</div>
          <div className="feature-descr">
            See your fruit and vegetable tracking numbers. Visit your personalized nursery and see your previous plants.
          </div>
        </div>
        <div className="feature-card">
          <div className="feature-icon"><i className="fa-solid fa-info"></i></div>
          <div className="feature-title">Personalized Insights</div>
          <div className="feature-descr">
            Get personalized insights on your eating habits. Use our tools to develop healthier habits and improve your overall well-being.
          </div>
        </div>
      </section>
      <section className="call-to-action-section">
        <h2 className="call-to-action-title">Join NourishNook Today</h2>
        <Link to="/signup">
          <button className="call-to-action-button">Sign Up Now</button>
        </Link>
      </section>
    </main>
  );
};

export default Home;
