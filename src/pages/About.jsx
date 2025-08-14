import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about">
      <div className="about-content">
        <h1>About Demon Slayer Games</h1>
        
        <section className="about-section">
          <h2>Welcome to the Ultimate Fan Experience</h2>
          <p>
            This website is a fan-made tribute to the incredible anime and manga series 
            "Demon Slayer: Kimetsu no Yaiba" created by Koyoharu Gotouge. Our collection 
            of games and quizzes is designed to test your knowledge and love for this 
            amazing series.
          </p>
        </section>

        <section className="about-section">
          <h2>What We Offer</h2>
          <ul>
            <li>🎮 <strong>Interactive Games:</strong> Memory games, matching challenges, and puzzles</li>
            <li>📋 <strong>Knowledge Quizzes:</strong> Test your understanding of characters, plot, and lore</li>
            <li>🏆 <strong>Score Tracking:</strong> Keep track of your progress and challenge yourself</li>
            <li>📱 <strong>Mobile Friendly:</strong> Play anywhere, anytime on any device</li>
            <li>🆓 <strong>Completely Free:</strong> No registration required, just pure fun</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>How to Play</h2>
          <p>
            Simply navigate to the Games or Quiz sections and choose your challenge. 
            Each game has its own rules and objectives. Your scores are automatically 
            saved locally, so you can always try to beat your personal best!
          </p>
        </section>

        <section className="about-section disclaimer">
          <h2>Disclaimer</h2>
          <p>
            <strong>Important:</strong> This is a fan-made website and is not affiliated 
            with or endorsed by Koyoharu Gotouge, Shueisha, Aniplex, Ufotable, or any 
            other official entity related to Demon Slayer: Kimetsu no Yaiba.
          </p>
          <p>
            All characters, names, and related indicia are trademarks of their respective 
            copyright holders. This website is created for entertainment and educational 
            purposes only and does not generate any profit.
          </p>
        </section>

        <section className="about-section">
          <h2>Created by Fans, for Fans</h2>
          <p>
            Made with ❤️ by Tyric Ramplin and the Demon Slayer fan community. 
            If you have suggestions for new games or improvements, feel free to reach out!
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
