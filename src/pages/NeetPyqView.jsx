import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function NeetPyqView() {
  const { neetPyqsData, setCurrentView } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [revealedSolutions, setRevealedSolutions] = useState({});

  const toggleSolution = (id) => {
    setRevealedSolutions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filtered = neetPyqsData.filter(q => {
    const matchesYear = selectedYear === 'all' || q.year.includes(selectedYear);
    const matchesSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          q.solution.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesYear && matchesSearch;
  });

  return (
    <div>
      <div className="section-header-bar">
        <button className="btn-back-dashboard" onClick={() => setCurrentView('dashboard')}>
          &larr; Back to Dashboard
        </button>

        <div className="section-pill-tabs">
          <button className="pill-tab active" onClick={() => setCurrentView('neet-pyq')}>
            🎯 NEET PYQs
          </button>
          <button className="pill-tab" onClick={() => setCurrentView('high-yield')}>
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
          NEET <span>Previous Years Questions (PYQs)</span>
        </h1>
        <p>Real NEET exam problems from 2018 to 2024 on Chemical Bonding &amp; Molecular Structure.</p>
      </div>

      <div className="pyq-filters">
        <input
          type="text"
          className="search-input-box"
          placeholder="Search NEET questions by keyword (e.g., dipole, hybridisation, MOT, see-saw)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="filter-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="all">All Years (2018-2024)</option>
          <option value="2024">NEET 2024</option>
          <option value="2023">NEET 2023</option>
          <option value="2022">NEET 2022</option>
          <option value="2021">NEET 2021</option>
          <option value="2020">NEET 2020</option>
          <option value="2019">NEET 2019</option>
          <option value="2018">NEET 2018</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {filtered.map((q) => (
          <div key={q.id} className="pyq-card">
            <div className="pyq-card-header">
              <span className="year-badge">{q.year}</span>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-muted)' }}>Unit 4 Bonding</span>
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '14px', lineHeight: 1.5 }}>
              {q.question}
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px', marginBottom: '14px' }}>
              {q.options.map((opt, i) => (
                <div key={i} style={{ padding: '8px 12px', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: '6px', fontSize: '13px', color: '#334155' }}>
                  <strong>{['(A)', '(B)', '(C)', '(D)'][i]}</strong> {opt}
                </div>
              ))}
            </div>

            <button className="solution-toggle-btn" onClick={() => toggleSolution(q.id)}>
              <i className={`fa-solid fa-chevron-${revealedSolutions[q.id] ? 'up' : 'down'}`}></i>
              <span>{revealedSolutions[q.id] ? 'Hide Detailed NCERT Solution' : 'View Correct Answer & NCERT Solution'}</span>
            </button>

            {revealedSolutions[q.id] && (
              <div className="solution-box">
                <div style={{ fontWeight: 800, color: '#059669', marginBottom: '6px' }}>
                  <i className="fa-solid fa-circle-check"></i> Correct Answer: {q.answer}
                </div>
                <p>{q.solution}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
