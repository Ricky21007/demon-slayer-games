// Score Storage Utility for Demon Slayer Games

const STORAGE_KEYS = {
  CHARACTER_MATCH: 'ds_character_match_scores',
  BREATHING_STYLE: 'ds_breathing_style_scores',
  HASHIRA_MEMORY: 'ds_hashira_memory_scores',
  TRIVIA: 'ds_trivia_scores',
  OVERALL_STATS: 'ds_overall_stats'
};

// Save score to localStorage
export const saveScore = (gameType, scoreData) => {
  try {
    const existingScores = getScores(gameType);
    const newScore = {
      ...scoreData,
      timestamp: new Date().toISOString(),
      id: Date.now()
    };
    
    const updatedScores = [...existingScores, newScore];
    
    // Keep only the top 10 scores
    updatedScores.sort((a, b) => b.score - a.score);
    const topScores = updatedScores.slice(0, 10);
    
    localStorage.setItem(STORAGE_KEYS[gameType], JSON.stringify(topScores));
    
    // Update overall stats
    updateOverallStats(gameType, scoreData);
    
    return newScore;
  } catch (error) {
    console.error('Error saving score:', error);
    return null;
  }
};

// Get scores for a specific game
export const getScores = (gameType) => {
  try {
    const scores = localStorage.getItem(STORAGE_KEYS[gameType]);
    return scores ? JSON.parse(scores) : [];
  } catch (error) {
    console.error('Error getting scores:', error);
    return [];
  }
};

// Get best score for a specific game
export const getBestScore = (gameType) => {
  const scores = getScores(gameType);
  return scores.length > 0 ? scores[0] : null;
};

// Update overall statistics
const updateOverallStats = (gameType, scoreData) => {
  try {
    const existingStats = getOverallStats();
    const gameStats = existingStats[gameType] || {
      gamesPlayed: 0,
      totalScore: 0,
      bestScore: 0,
      averageScore: 0,
      lastPlayed: null
    };
    
    gameStats.gamesPlayed += 1;
    gameStats.totalScore += scoreData.score || 0;
    gameStats.bestScore = Math.max(gameStats.bestScore, scoreData.score || 0);
    gameStats.averageScore = Math.round(gameStats.totalScore / gameStats.gamesPlayed);
    gameStats.lastPlayed = new Date().toISOString();
    
    const updatedStats = {
      ...existingStats,
      [gameType]: gameStats,
      lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem(STORAGE_KEYS.OVERALL_STATS, JSON.stringify(updatedStats));
  } catch (error) {
    console.error('Error updating overall stats:', error);
  }
};

// Get overall statistics
export const getOverallStats = () => {
  try {
    const stats = localStorage.getItem(STORAGE_KEYS.OVERALL_STATS);
    return stats ? JSON.parse(stats) : {};
  } catch (error) {
    console.error('Error getting overall stats:', error);
    return {};
  }
};

// Get game statistics for a specific game type
export const getGameStats = (gameType) => {
  const overallStats = getOverallStats();
  return overallStats[gameType] || {
    gamesPlayed: 0,
    totalScore: 0,
    bestScore: 0,
    averageScore: 0,
    lastPlayed: null
  };
};

// Get total games played across all game types
export const getTotalGamesPlayed = () => {
  const overallStats = getOverallStats();
  return Object.values(overallStats).reduce((total, gameStats) => {
    return total + (gameStats.gamesPlayed || 0);
  }, 0);
};

// Clear all scores and stats
export const clearAllData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error clearing data:', error);
    return false;
  }
};

// Clear scores for a specific game
export const clearGameScores = (gameType) => {
  try {
    localStorage.removeItem(STORAGE_KEYS[gameType]);
    
    // Update overall stats to remove the game data
    const overallStats = getOverallStats();
    delete overallStats[gameType];
    localStorage.setItem(STORAGE_KEYS.OVERALL_STATS, JSON.stringify(overallStats));
    
    return true;
  } catch (error) {
    console.error('Error clearing game scores:', error);
    return false;
  }
};

// Export data for sharing or backup
export const exportData = () => {
  try {
    const data = {};
    Object.entries(STORAGE_KEYS).forEach(([key, storageKey]) => {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        data[key] = JSON.parse(stored);
      }
    });
    return data;
  } catch (error) {
    console.error('Error exporting data:', error);
    return null;
  }
};

// Import data from backup
export const importData = (data) => {
  try {
    Object.entries(data).forEach(([key, value]) => {
      if (STORAGE_KEYS[key]) {
        localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(value));
      }
    });
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
};

// Get achievement status
export const getAchievements = () => {
  const overallStats = getOverallStats();
  const achievements = [];
  
  // First Game Achievement
  if (getTotalGamesPlayed() >= 1) {
    achievements.push({
      id: 'first_game',
      name: 'First Step',
      description: 'Play your first game',
      icon: '🎯',
      unlocked: true
    });
  }
  
  // Play each game type
  Object.keys(STORAGE_KEYS).forEach(gameType => {
    if (gameType !== 'OVERALL_STATS' && overallStats[gameType]) {
      achievements.push({
        id: `${gameType.toLowerCase()}_player`,
        name: `${gameType.replace('_', ' ')} Player`,
        description: `Play ${gameType.replace('_', ' ').toLowerCase()}`,
        icon: '🎮',
        unlocked: true
      });
    }
  });
  
  // High score achievements
  Object.entries(overallStats).forEach(([gameType, stats]) => {
    if (stats.bestScore >= 80) {
      achievements.push({
        id: `${gameType}_master`,
        name: `${gameType} Master`,
        description: `Score 80+ in ${gameType.replace('_', ' ').toLowerCase()}`,
        icon: '🏆',
        unlocked: true
      });
    }
  });
  
  // Perfect score achievements
  Object.entries(overallStats).forEach(([gameType, stats]) => {
    if (stats.bestScore === 100) {
      achievements.push({
        id: `${gameType}_perfect`,
        name: `${gameType} Perfectionist`,
        description: `Get a perfect score in ${gameType.replace('_', ' ').toLowerCase()}`,
        icon: '⭐',
        unlocked: true
      });
    }
  });
  
  return achievements;
};

export default {
  saveScore,
  getScores,
  getBestScore,
  getGameStats,
  getOverallStats,
  getTotalGamesPlayed,
  clearAllData,
  clearGameScores,
  exportData,
  importData,
  getAchievements
};
