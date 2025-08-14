import React from 'react';
import { Link } from 'react-router-dom';
import './Games.css';

const Games = () => {
  const games = [
    {
      id: 'character-match',
      title: 'Character Match',
      description: 'Match character images to their names',
      icon: '👥',
      difficulty: 'Easy'
    },
    {
      id: 'breathing-style-match',
      title: 'Breathing Style Match',
      description: 'Match Slayers to their breathing techniques',
      icon: '💨',
      difficulty: 'Medium'
    },
    {
      id: 'hashira-memory',
      title: 'Hashira Memory Game',
      description: 'Flip and match Hashira portraits',
      icon: '🧠',
      difficulty: 'Medium'
    },
    {
      id: 'trivia',
      title: 'Ultimate Trivia',
      description: 'Timed multiple-choice questions',
      icon: '🧭',
      difficulty: 'Hard'
    }
  ];

  return (
    <div className="games">
      <div className="games-header">
        <h1>🎮 Demon Slayer Games</h1>
        <p>Choose your challenge and test your skills!</p>
      </div>
      
      <div className="games-grid">
        {games.map(game => (
          <div key={game.id} className="game-card">
            <div className="game-icon">{game.icon}</div>
            <h3 className="game-title">{game.title}</h3>
            <p className="game-description">{game.description}</p>
            <div className="game-difficulty">
              <span className={`difficulty ${game.difficulty.toLowerCase()}`}>
                {game.difficulty}
              </span>
            </div>
            <Link to={`/games/${game.id}`} className="btn btn-game">
              Play Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;
