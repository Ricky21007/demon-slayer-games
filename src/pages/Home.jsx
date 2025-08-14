import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">🗡️ Demon Slayer</h1>
          <h2 className="hero-subtitle">Free Games & Quizzes</h2>
          <p className="hero-description">
            Test your knowledge of Kimetsu no Yaiba with our collection of 
            interactive games, quizzes, and puzzles. Challenge yourself and 
            become the ultimate Demon Slayer fan!
          </p>
          <div className="hero-buttons">
            <Link to="/games" className="btn btn-primary">
              🎮 Play Games
            </Link>
            <Link to="/quiz" className="btn btn-secondary">
              📋 Take Quizzes
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="sword-graphic">⚔️</div>
        </div>
      </div>
      
      <div className="features-section">
        <h3>What You'll Find Here</h3>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🧩</div>
            <h4>Memory Games</h4>
            <p>Test your memory with Hashira matching and character puzzles</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🧠</div>
            <h4>Trivia Challenges</h4>
            <p>Answer questions about characters, breathing styles, and story</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h4>Quick Games</h4>
            <p>Fun mini-games perfect for quick entertainment breaks</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h4>Score Tracking</h4>
            <p>Keep track of your best scores and challenge yourself</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
