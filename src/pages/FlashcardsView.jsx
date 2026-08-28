import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function FlashcardsView() {
  const { flashcardsData, setCurrentView } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const stepCard = (delta) => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + delta + flashcardsData.length) % flashcardsData.length);
  };

  const currentCard = flashcardsData[currentIndex] || flashcardsData[0];

  return (
    <div>
      <div className="section-header-bar">
        <button className="btn-back-dashboard" onClick={() => setCurrentView('dashboard')}>
          &larr; Back to Dashboard
        </button>
      </div>

      <div className="quick-revision-wrapper">
        <div className="quick-revision-header">
          <h1 className="quick-revision-title">Chemical Bonding Quick Revision</h1>
          <p className="quick-revision-subtitle">Click the card or press Space to flip &bull; Use arrows to navigate</p>
        </div>

        <div className="flashcard-deck-container">
          <div className="flashcard-counter-header">
            <span className="counter-pill">Card {currentIndex + 1} of {flashcardsData.length}</span>
          </div>

          <div className={`flashcard-card-box ${isFlipped ? 'flipped' : ''}`} onClick={() => setIsFlipped(prev => !prev)}>
            <div className="flashcard-card-inner">
              {/* FRONT */}
              <div className="flashcard-face flashcard-front">
                <div className="card-top-icon-row">
                  <span className="card-topic-tag">Topic: {currentCard.topic}</span>
                </div>
                <div className="card-front-center">
                  <h2 className="card-front-title">{currentCard.front}</h2>
                  <p className="card-front-hint">Think of the core principle and formula before flipping.</p>
                  <div className="card-flip-prompt">
                    <i className="fa-solid fa-rotate"></i> Click to reveal explanation
                  </div>
                </div>
              </div>

              {/* BACK */}
              <div className="flashcard-face flashcard-back">
                <div className="card-top-icon-row">
                  <span className="card-topic-tag" style={{ color: '#10b981' }}>NCERT Solution / Core Concept</span>
                </div>
                <div className="card-back-body">
                  <p style={{ fontSize: '15px', color: '#1e293b', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                    {currentCard.back}
                  </p>
                </div>
                <div className="card-flip-prompt">
                  <i className="fa-solid fa-rotate"></i> Click to flip back
                </div>
              </div>
            </div>
          </div>

          <div className="flashcard-navigation-bar">
            <button className="flashcard-nav-button" onClick={() => stepCard(-1)}>
              &larr; Previous
            </button>
            <span className="flashcard-status-text">{currentIndex + 1} / {flashcardsData.length}</span>
            <button className="flashcard-nav-button" onClick={() => stepCard(1)}>
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
