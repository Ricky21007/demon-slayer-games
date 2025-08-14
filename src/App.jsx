import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <header className="app-header">
        <h1>🗡️ Demon Slayer: Free Games & Quizzes</h1>
        <p>
          An interactive fan-made website built with React.js where users can play 
          Demon Slayer: Kimetsu no Yaiba-themed games, quizzes, and puzzles — all for free!
        </p>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Welcome to your Demon Slayer games website! Start building your games and quizzes.
        </p>
      </header>
    </div>
  )
}

export default App
