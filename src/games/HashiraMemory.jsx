import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './GameStyles.css';

const HashiraMemory = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const hashiraData = [
    { id: 1, name: "Giyu Tomioka", emoji: "🌊", title: "Water Hashira" },
    { id: 2, name: "Kyojuro Rengoku", emoji: "🔥", title: "Flame Hashira" },
    { id: 3, name: "Tengen Uzui", emoji: "💎", title: "Sound Hashira" },
    { id: 4, name: "Shinobu Kocho", emoji: "🦋", title: "Insect Hashira" },
    { id: 5, name: "Mitsuri Kanroji", emoji: "💕", title: "Love Hashira" },
    { id: 6, name: "Muichiro Tokito", emoji: "☁️", title: "Mist Hashira" },
    { id: 7, name: "Gyomei Himejima", emoji: "🗿", title: "Stone Hashira" },
    { id: 8, name: "Sanemi Shinazugawa", emoji: "🌪️", title: "Wind Hashira" }
  ];

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const initializeGame = () => {
    const gameCards = [];
    hashiraData.forEach(hashira => {
      gameCards.push(
        { ...hashira, cardId: `${hashira.id}-1`, type: 'emoji' },
        { ...hashira, cardId: `${hashira.id}-2`, type: 'name' }
      );
    });
    setCards(shuffleArray(gameCards));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setGameCompleted(false);
    setTimeElapsed(0);
    setGameStarted(true);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    let interval;
    if (gameStarted && !gameCompleted) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameCompleted]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves(moves + 1);
      const [first, second] = flippedCards;
      
      if (first.id === second.id && first.cardId !== second.cardId) {
        setMatchedCards([...matchedCards, first.id]);
        setFlippedCards([]);
        
        if (matchedCards.length + 1 === hashiraData.length) {
          setGameCompleted(true);
        }
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, matchedCards, moves]);

  const handleCardClick = (card) => {
    if (flippedCards.length === 2) return;
    if (flippedCards.find(c => c.cardId === card.cardId)) return;
    if (matchedCards.includes(card.id)) return;
    
    setFlippedCards([...flippedCards, card]);
  };

  const isCardFlipped = (card) => {
    return flippedCards.find(c => c.cardId === card.cardId) || matchedCards.includes(card.id);
  };

  const isCardMatched = (card) => {
    return matchedCards.includes(card.id);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreRating = () => {
    if (moves <= 12) return { rating: "Perfect!", color: "#4caf50" };
    if (moves <= 18) return { rating: "Excellent!", color: "#4ecdc4" };
    if (moves <= 24) return { rating: "Good!", color: "#ffd93d" };
    return { rating: "Keep Practicing!", color: "#ff6b6b" };
  };

  if (gameCompleted) {
    const { rating, color } = getScoreRating();
    return (
      <div className="game-container">
        <div className="game-completed">
          <h1>🎉 Memory Master!</h1>
          <div className="final-score">
            <h2 style={{ color }}>🏆 {rating}</h2>
            <div className="score-stats">
              <div className="stat">
                <span className="stat-label">Moves:</span>
                <span className="stat-value">{moves}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Time:</span>
                <span className="stat-value">{formatTime(timeElapsed)}</span>
              </div>
            </div>
          </div>
          <div className="game-actions">
            <button onClick={initializeGame} className="btn btn-primary">
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
        <h1>🧠 Hashira Memory Game</h1>
        <div className="game-progress">
          <span>Moves: {moves}</span>
          <span>Time: {formatTime(timeElapsed)}</span>
          <span>Matched: {matchedCards.length}/{hashiraData.length}</span>
        </div>
      </div>
      
      <div className="game-content">
        <div className="memory-instructions">
          <p>Match each Hashira with their emoji! Click two cards to flip them.</p>
        </div>
        
        <div className="memory-grid">
          {cards.map((card) => (
            <div
              key={card.cardId}
              className={`memory-card ${
                isCardFlipped(card) ? 'flipped' : ''
              } ${isCardMatched(card) ? 'matched' : ''}`}
              onClick={() => handleCardClick(card)}
            >
              {isCardFlipped(card) ? (
                <div className="card-content">
                  {card.type === 'emoji' ? (
                    <div className="card-emoji">{card.emoji}</div>
                  ) : (
                    <div className="card-text">
                      <div className="card-name">{card.name}</div>
                      <div className="card-title">{card.title}</div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="card-back">?</div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="game-footer">
        <button onClick={initializeGame} className="btn btn-back">
          🔄 Restart Game
        </button>
        <Link to="/games" className="btn btn-back">
          ← Back to Games
        </Link>
      </div>
    </div>
  );
};

export default HashiraMemory;
