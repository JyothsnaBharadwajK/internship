import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

export default function SearchModal() {
  const {
    isSearchModalOpen,
    setIsSearchModalOpen,
    topicsData,
    flashcardsData,
    setActiveTopicId,
    setCurrentView
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSearchQuery('');
    }
  }, [isSearchModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isSearchModalOpen) {
        setIsSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const q = searchQuery.toLowerCase().trim();
  const matches = [];

  if (q) {
    topicsData.forEach(t => {
      if (t.title.toLowerCase().includes(q) || (t.summary && t.summary.toLowerCase().includes(q))) {
        matches.push({
          type: 'Topic',
          title: t.title,
          snippet: t.summary || t.subtitle,
          icon: 'atom',
          action: () => {
            setActiveTopicId(t.id);
            setCurrentView('chapter');
            setIsSearchModalOpen(false);
          }
        });
      }
    });

    flashcardsData.forEach(fc => {
      if (fc.front.toLowerCase().includes(q) || fc.back.toLowerCase().includes(q)) {
        matches.push({
          type: 'Flashcard',
          title: fc.front,
          snippet: fc.back,
          icon: 'clone',
          action: () => {
            setCurrentView('flashcards');
            setIsSearchModalOpen(false);
          }
        });
      }
    });
  }

  return (
    <div
      className="search-modal-backdrop"
      id="search-modal-backdrop"
      onClick={(e) => {
        if (e.target.id === 'search-modal-backdrop') setIsSearchModalOpen(false);
      }}
    >
      <div className="search-modal-card">
        <div className="search-modal-header">
          <i className="fa-solid fa-magnifying-glass search-modal-icon"></i>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search topics, formulas, definitions, exercises..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-modal-close" onClick={() => setIsSearchModalOpen(false)}>
            <kbd>ESC</kbd>
          </button>
        </div>

        <div className="search-results-wrapper">
          {!q && (
            <div className="search-empty-state">
              <p>Type keywords like <em>hybridisation, formal charge, vsepr, dipole moment, lattice enthalpy...</em></p>
            </div>
          )}

          {q && matches.length === 0 && (
            <div className="search-empty-state">
              <p>No direct matches found for &quot;<strong>{searchQuery}</strong>&quot; in Unit 4.</p>
            </div>
          )}

          {matches.slice(0, 8).map((m, idx) => (
            <div key={idx} className="search-result-item" onClick={m.action}>
              <div className="s-res-icon"><i className={`fa-solid fa-${m.icon}`}></i></div>
              <div className="s-res-info">
                <h4>{m.title}</h4>
                <p>{m.snippet ? m.snippet.slice(0, 100) : ''}...</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
