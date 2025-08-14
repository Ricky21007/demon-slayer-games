import React from 'react';
import { Link } from 'react-router-dom';
import './Quiz.css';

const Quiz = () => {
  const quizzes = [
    {
      id: 'characters',
      title: 'Character Knowledge',
      description: 'Test your knowledge of Demon Slayer characters',
      questions: 15,
      difficulty: 'Easy'
    },
    {
      id: 'plot',
      title: 'Story & Plot',
      description: 'Questions about the main storyline',
      questions: 20,
      difficulty: 'Medium'
    },
    {
      id: 'expert',
      title: 'Expert Challenge',
      description: 'Only true fans will master this quiz',
      questions: 25,
      difficulty: 'Hard'
    }
  ];

  return (
    <div className="quiz">
      <div className="quiz-header">
        <h1>📋 Demon Slayer Quizzes</h1>
        <p>Test your knowledge of the Demon Slayer universe!</p>
      </div>
      
      <div className="quiz-grid">
        {quizzes.map(quiz => (
          <div key={quiz.id} className="quiz-card">
            <h3 className="quiz-title">{quiz.title}</h3>
            <p className="quiz-description">{quiz.description}</p>
            <div className="quiz-info">
              <span className="quiz-questions">{quiz.questions} Questions</span>
              <span className={`difficulty ${quiz.difficulty.toLowerCase()}`}>
                {quiz.difficulty}
              </span>
            </div>
            <Link to={`/quiz/${quiz.id}`} className="btn btn-quiz">
              Start Quiz
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
