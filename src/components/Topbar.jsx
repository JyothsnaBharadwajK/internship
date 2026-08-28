import React from 'react';
import { useApp } from '../context/AppContext';

export default function Topbar() {
  const { currentView, setCurrentView, setIsAIDrawerOpen } = useApp();

  return (
    <header className="navbar">
      <div className="nav-brand" onClick={() => setCurrentView('dashboard')}>
        <div className="brand-logo">
          <i className="fa-solid fa-atom"></i>
        </div>
        <span>skill100.ai</span>
      </div>

      <nav className="nav-links">
        <button
          className={`nav-link ${currentView === 'dashboard' ? 'active' : ''}`}
          onClick={() => setCurrentView('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`nav-link ${currentView === 'intro' ? 'active' : ''}`}
          onClick={() => setCurrentView('intro')}
        >
          Intro
        </button>
        <button
          className={`nav-link ${currentView === 'terminology' ? 'active' : ''}`}
          onClick={() => setCurrentView('terminology')}
        >
          Terminology
        </button>
        <button
          className={`nav-link ${currentView === 'skills' ? 'active' : ''}`}
          onClick={() => setCurrentView('skills')}
        >
          Skills &amp; Topics
        </button>
        <button
          className={`nav-link ${currentView === 'neet-pyq' ? 'active' : ''}`}
          onClick={() => setCurrentView('neet-pyq')}
        >
          NEET PYQ
        </button>
        <button
          className={`nav-link ${currentView === 'high-yield' ? 'active' : ''}`}
          onClick={() => setCurrentView('high-yield')}
        >
          High Yield NCERT
        </button>
        <button
          className={`nav-link ${currentView === 'formula-sheet' ? 'active' : ''}`}
          onClick={() => setCurrentView('formula-sheet')}
        >
          Formula Sheet
        </button>
        <button
          className={`nav-link ${currentView === 'flashcards' ? 'active' : ''}`}
          onClick={() => setCurrentView('flashcards')}
        >
          Quick Revision
        </button>
        <button
          className={`nav-link ${currentView === 'quiz' ? 'active' : ''}`}
          onClick={() => setCurrentView('quiz')}
        >
          Quiz
        </button>
      </nav>

      <button className="btn-ai-tutor" onClick={() => setIsAIDrawerOpen(true)}>
        <i className="fa-solid fa-robot"></i>
        <span>AI Tutor</span>
      </button>
    </header>
  );
}
