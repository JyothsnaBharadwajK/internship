import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import VSEPRCanvas from '../components/VSEPRCanvas';
import FormalChargeCalc from '../components/FormalChargeCalc';

export default function SkillsView() {
  const { topicsData, setCurrentView, activeTopicId, setActiveTopicId } = useApp();
  const [selectedTopicId, setSelectedTopicId] = useState(activeTopicId || 'kossel-lewis');
  const [isReadingMode, setIsReadingMode] = useState(false);

  const activeTopic = topicsData.find(t => t.id === selectedTopicId) || topicsData[0];

  const handleOpenLesson = (topicId) => {
    setSelectedTopicId(topicId);
    setActiveTopicId(topicId);
    setIsReadingMode(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <div className="section-header-bar">
        <button
          className="btn-back-dashboard"
          onClick={() => {
            if (isReadingMode) setIsReadingMode(false);
            else setCurrentView('dashboard');
          }}
        >
          &larr; {isReadingMode ? 'Back to Skills List' : 'Back to Dashboard'}
        </button>

        <div className="section-pill-tabs">
          <button className="pill-tab" onClick={() => setCurrentView('intro')}>
            🌟 Intro
          </button>
          <button className="pill-tab" onClick={() => setCurrentView('terminology')}>
            📖 Terminology
          </button>
          <button className="pill-tab active" onClick={() => setCurrentView('skills')}>
            🎯 Skills
          </button>
        </div>
      </div>

      {!isReadingMode ? (
        <div className="skills-list">
          {topicsData.map((t, idx) => (
            <div key={t.id} className="skill-row-card">
              <div className="skill-row-left">
                <div className="skill-icon-box">
                  <i className={`fa-solid fa-${t.icon || 'atom'}`}></i>
                </div>
                <div>
                  <div className="skill-row-title">Skill {idx + 1}: {t.title}</div>
                  <div className="skill-row-desc">{t.subtitle || t.summary}</div>
                </div>
              </div>

              <div className="skill-row-actions">
                <button className="btn-skill-action btn-learn" onClick={() => handleOpenLesson(t.id)}>
                  <i className="fa-solid fa-book-open"></i> Learn
                </button>
                <button className="btn-skill-action btn-practice" onClick={() => setCurrentView('quiz')}>
                  <i className="fa-solid fa-pen-to-square"></i> Practice
                </button>
                <button className="btn-skill-action btn-assess" onClick={() => setCurrentView('flashcards')}>
                  <i className="fa-solid fa-bolt"></i> Flashcards
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="term-detail-panel" style={{ padding: '36px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
              Unit 4 &bull; NCERT Class 11 Chemistry
            </span>
            <button
              style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-muted)' }}
              onClick={() => setIsReadingMode(false)}
            >
              &times; Close Lesson
            </button>
          </div>

          <h1 style={{ fontFamily: 'var(--font-family-display)', fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>
            {activeTopic.title}
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '28px' }}>
            {activeTopic.subtitle || activeTopic.summary}
          </p>

          {/* Subsections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
            {(activeTopic.subsections || []).map((sub, idx) => (
              <div key={idx} style={{ background: 'var(--color-bg)', padding: '20px', borderRadius: '10px', border: '1px solid var(--color-border)' }}>
                <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '8px', color: 'var(--color-text-primary)' }}>
                  {sub.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                  {sub.content}
                </p>
              </div>
            ))}

            {(activeTopic.exercises || []).map((ex, idx) => (
              <div key={idx} style={{ background: 'var(--color-bg)', padding: '20px', borderRadius: '10px', border: '1px solid var(--color-border)' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>
                  Exercise {ex.q_num}: {ex.question}
                </h3>
                <p style={{ fontSize: '14px', color: '#1e40af' }}>
                  <strong>Solution:</strong> {ex.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Interactive Lab */}
          {activeTopic.id === 'vsepr-theory' && <VSEPRCanvas />}
          {activeTopic.id === 'kossel-lewis' && <FormalChargeCalc />}

          {/* Tables */}
          {activeTopic.table_data && activeTopic.table_data.length > 0 && (
            <div className="formula-table-container">
              <table className="formula-table">
                <thead>
                  <tr>
                    {Object.keys(activeTopic.table_data[0]).map((k, i) => (
                      <th key={i}>{k}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {activeTopic.table_data.map((row, rIdx) => (
                    <tr key={rIdx}>
                      {Object.keys(row).map((k, cIdx) => (
                        <td key={cIdx}>{row[k]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
