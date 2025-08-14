import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './GameStyles.css';

const BreathingStyleMatch = () => {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const breathingStyles = [
    {
      character: "Tanjiro Kamado",
      style: "Water Breathing",
      technique: "Water Surface Slash",
      options: ["Water Breathing", "Fire Breathing", "Sun Breathing", "Stone Breathing"]
    },
    {
      character: "Zenitsu Agatsuma",
      style: "Thunder Breathing",
      technique: "Thunderclap and Flash",
      options: ["Lightning Breathing", "Thunder Breathing", "Wind Breathing", "Sound Breathing"]
    },
    {
      character: "Inosuke Hashibira",
      style: "Beast Breathing",
      technique: "First Fang: Pierce",
      options: ["Beast Breathing", "Wild Breathing", "Animal Breathing", "Boar Breathing"]
    },
    {
      character: "Kyojuro Rengoku",
      style: "Flame Breathing",
      technique: "First Form: Unknowing Fire",
      options: ["Fire Breathing", "Flame Breathing", "Heat Breathing", "Inferno Breathing"]
    },
    {
      character: "Giyu Tomioka",
      style: "Water Breathing",
      technique: "Eleventh Form: Dead Calm",
      options: ["Water Breathing", "Ocean Breathing", "Sea Breathing", "Flow Breathing"]
    }
  ];

  const handleAnswerClick = (answer) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (answer === breathingStyles[currentQuestion].style) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion + 1 < breathingStyles.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setGameCompleted(true);
      }
    }, 1500);
  };

  const resetGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setGameCompleted(false);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const currentStyle = breathingStyles[currentQuestion];

  if (gameCompleted) {
    return (
      <div className="game-container">
        <div className="game-completed">
          <h1>🎉 Game Completed!</h1>
          <div className="final-score">
            <h2>Your Score: {score} / {breathingStyles.length}</h2>
            <div className="score-percentage">
              {Math.round((score / breathingStyles.length) * 100)}%
            </div>
          </div>
          <div className="game-actions">
            <button onClick={resetGame} className="btn btn-primary">
              🔄 Play Again
            </button>
            <Link to="/games" className="btn btn-secondary">
              🎮 Back to Games
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <div className="game-header">
        <h1>💨 Breathing Style Match</h1>
        <div className="game-progress">
          <span>Question {currentQuestion + 1} of {breathingStyles.length}</span>
          <span>Score: {score}</span>
        </div>
      </div>
      
      <div className="game-content">
        <div className="character-display">
          <div className="character-info">
            <h2>{currentStyle.character}</h2>
            <div className="technique-display">
              <span className="technique-label">Signature Technique:</span>
              <span className="technique-name">"{currentStyle.technique}"</span>
            </div>
          </div>
        </div>
        
        <div className="answer-options">
          <h3>What breathing style does this character use?</h3>
          <div className="options-grid">
            {currentStyle.options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${
                  showResult
                    ? option === currentStyle.style
                      ? 'correct'
                      : option === selectedAnswer
                      ? 'incorrect'
                      : 'disabled'
                    : ''
                }`}
                onClick={() => handleAnswerClick(option)}
                disabled={selectedAnswer !== null}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        
        {showResult && (
          <div className={`result-feedback ${selectedAnswer === currentStyle.style ? 'correct' : 'incorrect'}`}>
            {selectedAnswer === currentStyle.style ? '✅ Correct!' : '❌ Incorrect!'}
            <div className="correct-answer">
              {currentStyle.character} uses: {currentStyle.style}
            </div>
          </div>
        )}
      </div>
      
      <div className="game-footer">
        <Link to="/games" className="btn btn-back">
          ← Back to Games
        </Link>
      </div>
    </div>
  );
};

export default BreathingStyleMatch;
