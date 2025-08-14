import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './GameStyles.css';

const Trivia = () => {
  const { quizId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);

  const triviaQuestions = [
    {
      question: "What is the name of Tanjiro's younger sister?",
      options: ["Nezuko", "Kanao", "Shinobu", "Mitsuri"],
      correct: "Nezuko",
      difficulty: "Easy"
    },
    {
      question: "Which Hashira uses Water Breathing?",
      options: ["Kyojuro Rengoku", "Giyu Tomioka", "Tengen Uzui", "Sanemi Shinazugawa"],
      correct: "Giyu Tomioka",
      difficulty: "Easy"
    },
    {
      question: "What is the name of the strongest demon?",
      options: ["Muzan Kibutsuji", "Akaza", "Douma", "Kokushibo"],
      correct: "Muzan Kibutsuji",
      difficulty: "Medium"
    },
    {
      question: "How many forms does Thunder Breathing have?",
      options: ["Six", "Seven", "Eight", "Nine"],
      correct: "Six",
      difficulty: "Medium"
    },
    {
      question: "What is the name of Kyojuro Rengoku's father?",
      options: ["Senjuro Rengoku", "Shinjuro Rengoku", "Kyojuro Rengoku Sr.", "Rengoku Kyojuro"],
      correct: "Shinjuro Rengoku",
      difficulty: "Hard"
    },
    {
      question: "Which demon is known as 'Upper Moon One'?",
      options: ["Akaza", "Douma", "Kokushibo", "Gyutaro"],
      correct: "Kokushibo",
      difficulty: "Hard"
    },
    {
      question: "What color is Tanjiro's hair?",
      options: ["Black", "Red", "Brown", "Dark Red"],
      correct: "Dark Red",
      difficulty: "Easy"
    },
    {
      question: "Who taught Zenitsu Thunder Breathing?",
      options: ["Jigoro Kuwajima", "Sakonji Urokodaki", "Kyojuro Rengoku", "Tengen Uzui"],
      correct: "Jigoro Kuwajima",
      difficulty: "Medium"
    }
  ];

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !showResult && !gameCompleted) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleTimeUp();
    }
  }, [timeLeft, gameStarted, showResult, gameCompleted]);

  const startGame = () => {
    setGameStarted(true);
    setTimeLeft(30);
  };

  const handleTimeUp = () => {
    setSelectedAnswer(null);
    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestion + 1 < triviaQuestions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(30);
      } else {
        setGameCompleted(true);
      }
    }, 2000);
  };

  const handleAnswerClick = (answer) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (answer === triviaQuestions[currentQuestion].correct) {
      const timeBonus = Math.floor(timeLeft / 5);
      setScore(score + 10 + timeBonus);
    }
    
    setTimeout(() => {
      if (currentQuestion + 1 < triviaQuestions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(30);
      } else {
        setGameCompleted(true);
      }
    }, 1500);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameCompleted(false);
    setTimeLeft(30);
    setGameStarted(false);
  };

  const getTimeWarning = () => {
    if (timeLeft <= 5) return 'danger';
    if (timeLeft <= 10) return 'warning';
    return '';
  };

  const getScoreGrade = () => {
    const maxScore = triviaQuestions.length * 16; // 10 base + 6 time bonus
    const percentage = (score / maxScore) * 100;
    
    if (percentage >= 90) return { grade: 'S', color: '#ffd93d', text: 'Demon Slayer Master!' };
    if (percentage >= 80) return { grade: 'A', color: '#4ecdc4', text: 'Hashira Level!' };
    if (percentage >= 70) return { grade: 'B', color: '#4caf50', text: 'Skilled Slayer!' };
    if (percentage >= 60) return { grade: 'C', color: '#ff9800', text: 'Trainee Level' };
    return { grade: 'D', color: '#ff6b6b', text: 'Keep Training!' };
  };

  if (!gameStarted) {
    return (
      <div className="game-container">
        <div className="game-header">
          <h1>🧭 Ultimate Demon Slayer Trivia</h1>
          <p>Test your knowledge with timed questions!</p>
        </div>
        
        <div className="game-content">
          <div className="trivia-info">
            <h3>Game Rules:</h3>
            <ul>
              <li>🕐 You have 30 seconds per question</li>
              <li>⭐ Base score: 10 points per correct answer</li>
              <li>⚡ Time bonus: Extra points for quick answers</li>
              <li>🎯 {triviaQuestions.length} questions total</li>
            </ul>
          </div>
          
          <div className="game-actions">
            <button onClick={startGame} className="btn btn-primary">
              🚀 Start Trivia
            </button>
            <Link to="/games" className="btn btn-secondary">
              ← Back to Games
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (gameCompleted) {
    const { grade, color, text } = getScoreGrade();
    return (
      <div className="game-container">
        <div className="game-completed">
          <h1>🎉 Trivia Complete!</h1>
          <div className="final-score">
            <div className="score-grade" style={{ color }}>
              Grade: {grade}
            </div>
            <h2>Final Score: {score}</h2>
            <div className="score-text" style={{ color }}>{text}</div>
            <div className="score-breakdown">
              Correct: {score > 0 ? Math.floor(score / 10) : 0} / {triviaQuestions.length}
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

  const currentQ = triviaQuestions[currentQuestion];

  return (
    <div className="game-container">
      <div className="game-header">
        <h1>🧭 Ultimate Trivia</h1>
        <div className="game-progress">
          <span>Question {currentQuestion + 1} of {triviaQuestions.length}</span>
          <span>Score: {score}</span>
        </div>
      </div>
      
      <div className="timer-container">
        <div className={`timer ${getTimeWarning()}`}>
          ⏰ {timeLeft}s
        </div>
      </div>
      
      <div className="game-content">
        <div className="trivia-question">
          <div className="question-difficulty">
            <span className={`difficulty ${currentQ.difficulty.toLowerCase()}`}>
              {currentQ.difficulty}
            </span>
          </div>
          <h3>{currentQ.question}</h3>
        </div>
        
        <div className="trivia-options">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              className={`option-btn ${
                showResult
                  ? option === currentQ.correct
                    ? 'correct'
                    : option === selectedAnswer
                    ? 'incorrect'
                    : 'disabled'
                  : ''
              }`}
              onClick={() => handleAnswerClick(option)}
              disabled={selectedAnswer !== null || timeLeft === 0}
            >
              {option}
            </button>
          ))}
        </div>
        
        {showResult && (
          <div className={`result-feedback ${
            selectedAnswer === currentQ.correct ? 'correct' : 'incorrect'
          }`}>
            {selectedAnswer === currentQ.correct ? 
              `✅ Correct! +${10 + Math.floor(timeLeft / 5)} points` : 
              selectedAnswer === null ? 
                '⏰ Time\'s up!' : 
                '❌ Incorrect!'
            }
            <div className="correct-answer">
              The correct answer is: {currentQ.correct}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trivia;
