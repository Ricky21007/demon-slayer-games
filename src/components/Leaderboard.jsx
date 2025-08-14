import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getScores, getOverallStats, clearAllData } from '../utils/scoreStorage';
import './Leaderboard.css';

const Leaderboard = () => {
  const [selectedGame, setSelectedGame] = useState('CHARACTER_MATCH');
  const [scores, setScores] = useState([]);
  const [stats, setStats] = useState({});

  const gameTypes = {
    CHARACTER_MATCH: { name: 'Character Match', icon: '👥' },
    BREATHING_STYLE: { name: 'Breathing Style', icon: '💨' },
    HASHIRA_MEMORY: { name: 'Hashira Memory', icon: '🧠' },
    TRIVIA: { name: 'Trivia Challenge', icon: '🧭' }
  };

  useEffect(() => {
    loadData();
  }, [selectedGame]);

  const loadData = () => {
    const gameScores = getScores(selectedGame);
    const overallStats = getOverallStats();
    setScores(gameScores);
    setStats(overallStats);
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all scores and statistics? This cannot be undone.')) {
      clearAllData();
      loadData();
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScoreColor = (score) => {
    if (score >= 90) return '#ffd93d';
    if (score >= 80) return '#4ecdc4';
    if (score >= 70) return '#4caf50';
    if (score >= 60) return '#ff9800';
    return '#ff6b6b';
  };

  const getRankIcon = (index) => {
    switch(index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return `#${index + 1}`;
    }
  };

  return (
    <div className="leaderboard">
      <div className="leaderboard-header">
        <h1>🏆 Leaderboard</h1>
        <p>Track your progress and compete for the top scores!</p>
      </div>

      <div className="game-selector">
        <div className="game-tabs">
          {Object.entries(gameTypes).map(([key, game]) => (
            <button
              key={key}
              className={`game-tab ${selectedGame === key ? 'active' : ''}`}
              onClick={() => setSelectedGame(key)}
            >
              <span className="tab-icon">{game.icon}</span>
              <span className="tab-name">{game.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="leaderboard-content">
        <div className="stats-overview">
          {stats[selectedGame] && (
            <div className="game-stats">
              <h3>📊 Statistics for {gameTypes[selectedGame].name}</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-label">Games Played:</span>
                  <span className="stat-value">{stats[selectedGame].gamesPlayed}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Best Score:</span>
                  <span className="stat-value" style={{ color: getScoreColor(stats[selectedGame].bestScore) }}>
                    {stats[selectedGame].bestScore}%
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Average Score:</span>
                  <span className="stat-value">{stats[selectedGame].averageScore}%</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Last Played:</span>
                  <span className="stat-value">
                    {stats[selectedGame].lastPlayed ? 
                      formatDate(stats[selectedGame].lastPlayed) : 
                      'Never'
                    }
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="scores-list">
          <h3>🎯 Top Scores - {gameTypes[selectedGame].name}</h3>
          {scores.length > 0 ? (
            <div className="scores-container">
              {scores.map((score, index) => (
                <div key={score.id} className="score-item">
                  <div className="score-rank">
                    <span className="rank-icon">{getRankIcon(index)}</span>
                  </div>
                  <div className="score-details">
                    <div className="score-main">
                      <span className="score-value" style={{ color: getScoreColor(score.score) }}>
                        {score.score}%
                      </span>
                      {score.correctAnswers && score.totalQuestions && (
                        <span className="score-breakdown">
                          ({score.correctAnswers}/{score.totalQuestions})
                        </span>
                      )}
                    </div>
                    <div className="score-meta">
                      <span className="score-date">{formatDate(score.timestamp)}</span>
                      {score.moves && (
                        <span className="score-moves">{score.moves} moves</span>
                      )}
                      {score.timeElapsed && (
                        <span className="score-time">{Math.floor(score.timeElapsed / 60)}:{(score.timeElapsed % 60).toString().padStart(2, '0')}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-scores">
              <p>No scores yet for {gameTypes[selectedGame].name}</p>
              <p>Play the game to see your scores here!</p>
              <Link to="/games" className="btn btn-primary">
                🎮 Play Games
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="leaderboard-actions">
        <Link to="/games" className="btn btn-secondary">
          🎮 Back to Games
        </Link>
        {Object.keys(stats).length > 0 && (
          <button onClick={handleClearData} className="btn btn-danger">
            🗑️ Clear All Data
          </button>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
