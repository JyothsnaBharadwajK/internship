import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function IntroView() {
  const { chapterData, setCurrentView } = useApp();
  const [expandedId, setExpandedId] = useState('who');

  const toggleAccordion = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const wordColors = {
    WHO: '#3b82f6',
    WHAT: '#10b981',
    WHEN: '#f59e0b',
    WHERE: '#8b5cf6',
    WHY: '#ef4444',
    HOW: '#06b6d4'
  };

  return (
    <div>
      <div className="section-header-bar">
        <button className="btn-back-dashboard" onClick={() => setCurrentView('dashboard')}>
          &larr; Back to Dashboard
        </button>

        <div className="section-pill-tabs">
          <button className="pill-tab active" onClick={() => setCurrentView('intro')}>
            🌟 Intro
          </button>
          <button className="pill-tab" onClick={() => setCurrentView('terminology')}>
            📖 Terminology
          </button>
          <button className="pill-tab" onClick={() => setCurrentView('skills')}>
            🎯 Skills
          </button>
        </div>
      </div>

      <div className="connectomics-hero" style={{ background: 'var(--color-dark-hero)', marginBottom: '32px' }}>
        <h1 style={{ color: '#fff' }}>
          Dive into <span>Chemical Bonding &amp; Structure</span>
        </h1>
        <p>Start with the 6 big questions: Who, What, When, Where, Why, and How.</p>
      </div>

      <div className="big-questions-grid">
        {(chapterData?.big_questions || []).map((q) => {
          const isExpanded = expandedId === q.id;
          const color = wordColors[q.category] || '#3b82f6';
          return (
            <div
              key={q.id}
              className="big-question-card-accordion"
              onClick={() => toggleAccordion(q.id)}
            >
              <div>
                <div className="bq-card-top-bar">
                  <span className="bq-word-title" style={{ color }}>{q.category}</span>
                  <i className={`fa-solid fa-chevron-down bq-chevron-icon ${isExpanded ? 'rotated' : ''}`}></i>
                </div>
                <div className="bq-question-text">{q.question}</div>
              </div>

              {isExpanded && (
                <div className="bq-accordion-body">
                  <p>{q.answer}</p>
                  <div className="bq-fun-fact">
                    <strong>💡 Fact:</strong> {q.fun_fact}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
