import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="layout">
      <header className="header">
        <nav className="navbar">
          <div className="nav-brand">
            <Link to="/" className="brand-link" onClick={closeMenu}>
              <span className="brand-icon">⚔️</span>
              <span className="brand-text">Demon Slayer Games</span>
            </Link>
          </div>
          
          <button className="menu-toggle" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <li className="nav-item">
              <Link 
                to="/" 
                className={`nav-link ${isActive('/') && location.pathname === '/' ? 'active' : ''}`}
                onClick={closeMenu}
              >
                🏠 Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/games" 
                className={`nav-link ${isActive('/games') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                🎮 Games
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/quiz" 
                className={`nav-link ${isActive('/quiz') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                📋 Quizzes
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/about" 
                className={`nav-link ${isActive('/about') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                ℹ️ About
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      
      <main className="main-content">
        {children}
      </main>
      
      <footer className="footer">
        <div className="footer-content">
          <p>© 2024 Demon Slayer Games - Fan-made tribute to Kimetsu no Yaiba</p>
          <p>Not affiliated with official Demon Slayer franchise</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
