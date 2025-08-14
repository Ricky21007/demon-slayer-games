import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Games from './pages/Games';
import Quiz from './pages/Quiz';
import About from './pages/About';
import CharacterMatch from './games/CharacterMatch';
import BreathingStyleMatch from './games/BreathingStyleMatch';
import HashiraMemory from './games/HashiraMemory';
import Trivia from './games/Trivia';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/character-match" element={<CharacterMatch />} />
          <Route path="/games/breathing-style-match" element={<BreathingStyleMatch />} />
          <Route path="/games/hashira-memory" element={<HashiraMemory />} />
          <Route path="/games/trivia" element={<Trivia />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz/:quizId" element={<Trivia />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
