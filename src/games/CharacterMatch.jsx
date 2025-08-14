import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveScore, getBestScore } from '../utils/scoreStorage';
import './GameStyles.css';

const CharacterMatch = () => {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [bestScore, setBestScore] = useState(null);

  const characters = [
    {
      name: "Tanjiro Kamado",
      emoji: "🔥",
      description: "The main protagonist with a kind heart",
      options: ["Tanjiro Kamado", "Zenitsu Agatsuma", "Inosuke Hashibira", "Giyu Tomioka"]
    },
    {
      name: "Nezuko Kamado",
      emoji: "🌸",
      description: "Tanjiro's demon sister who resists eating humans",
      options: ["Kanao Tsuyuri", "Nezuko Kamado", "Shinobu Kocho", "Mitsuri Kanroji"]
    },
    {
      name: "Zenitsu Agatsuma",
      emoji: "⚡",
      description: "Thunder Breathing user who fights while sleeping",
      options: ["Zenitsu Agatsuma", "Kyojuro Rengoku", "Tengen Uzui", "Sanemi Shinazugawa"]
    },
    {
      name: "Inosuke Hashibira",
      emoji: "🐗",
      description: "Beast Breathing user raised by boars",
      options: ["Genya Shinazugawa", "Inosuke Hashibira", "Obanai Iguro", "Muichiro Tokito"]
    },
    {
      name: "Giyu Tomioka",
      emoji: "🌊",
      description: "Water Hashira with a calm demeanor",
      options: ["Giyu Tomioka", "Kyojuro Rengoku", "Tengen Uzui", "Sanemi Shinazugawa"]
    }
  ];

  useEffect(() => {
    const best = getBestScore('CHARACTER_MATCH');
    setBestScore(best);
  }, []);

  const handleGameComplete = () => {
    const scoreData = {
      score: Math.round((score / characters.length) * 100),
      correctAnswers: score,
      totalQuestions: characters.length,
      gameType: 'Character Match'
    };

    const savedScore = saveScore('CHARACTER_MATCH', scoreData);
    if (savedScore) {
      const newBest = getBestScore('CHARACTER_MATCH');
      setBestScore(newBest);
    }

    setGameCompleted(true);
  };

  const handleAnswerClick = (answer) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (answer === characters[currentQuestion].name) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion + 1 < characters.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        handleGameComplete();
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

  const currentChar = characters[currentQuestion];

  if (gameCompleted) {
    return (
      <div className="game-container">
        <div className="game-completed">
          <h1>🎉 Game Completed!</h1>
          <div className="final-score">
            <h2>Your Score: {score} / {characters.length}</h2>
            <div className="score-percentage">
              {Math.round((score / characters.length) * 100)}%
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
        <h1>👥 Character Match</h1>
        <div className="game-progress">
          <span>Question {currentQuestion + 1} of {characters.length}</span>
          <span>Score: {score}</span>
        </div>
      </div>
      
      <div className="game-content">
        <div className="character-display">
          <div className="character-emoji">{currentChar.emoji}</div>
          <div className="character-description">{currentChar.description}</div>
        </div>
        
        <div className="answer-options">
          <h3>Who is this character?</h3>
          <div className="options-grid">
            {currentChar.options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${
                  showResult
                    ? option === currentChar.name
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
          <div className={`result-feedback ${selectedAnswer === currentChar.name ? 'correct' : 'incorrect'}`}>
            {selectedAnswer === currentChar.name ? '✅ Correct!' : '❌ Incorrect!'}
            <div className="correct-answer">
              The correct answer is: {currentChar.name}
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

export default CharacterMatch;
