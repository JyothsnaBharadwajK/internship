import React from 'react';
import { useApp } from '../context/AppContext';

export default function HighYieldView() {
  const { highYieldData, setCurrentView } = useApp();

  return (
    <div>
      <div className="section-header-bar">
        <button className="btn-back-dashboard" onClick={() => setCurrentView('dashboard')}>
          &larr; Back to Dashboard
        </button>

        <div className="section-pill-tabs">
          <button className="pill-tab" onClick={() => setCurrentView('neet-pyq')}>
            🎯 NEET PYQs
          </button>
          <button className="pill-tab active" onClick={() => setCurrentView('high-yield')}>
            ⚡ High Yield NCERT
          </button>
          <button className="pill-tab" onClick={() => setCurrentView('formula-sheet')}>
            📐 Formula Sheet
          </button>
          <button className="pill-tab" onClick={() => setCurrentView('flashcards')}>
            🔄 Quick Revision
          </button>
        </div>
      </div>

      <div className="connectomics-hero" style={{ background: 'var(--color-dark-hero)', marginBottom: '28px' }}>
        <h1 style={{ color: '#fff' }}>
          High Yield <span>NCERT Concepts &amp; Traps</span>
        </h1>
        <p>High-probability questions, subtle NCERT exceptions, and common examination pitfalls.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {highYieldData.map((item, idx) => (
          <div key={idx} className="checkpoint-card">
            <div className="checkpoint-title">
              <i className="fa-solid fa-bolt" style={{ color: '#f59e0b' }}></i>
              <span>High Yield #{idx + 1}: {item.topic}</span>
            </div>

            <div style={{ fontSize: '15px', color: '#1e293b', lineHeight: 1.6, marginBottom: '14px' }}>
              <strong>Core NCERT Fact:</strong> {item.core_fact}
            </div>

            <div className="neet-trap-box">
              <strong style={{ display: 'block', marginBottom: '4px' }}>
                <i className="fa-solid fa-triangle-exclamation"></i> Examiner Pitfall / Trap:
              </strong>
              {item.neet_trap}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
