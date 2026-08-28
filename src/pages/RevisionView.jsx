import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function RevisionView() {
  const { revisionData } = useApp();
  const [activeTab, setActiveTab] = useState('formulas');

  if (!revisionData) return null;

  return (
    <section className="app-view active">
      <div className="revision-wrapper">
        <div className="view-header-centered">
          <span className="section-tag"><i className="fa-solid fa-bolt-lightning"></i> EXAM CRASH REVISION</span>
          <h1 className="view-title">Chemical Bonding Quick Revision Sheet</h1>
          <p className="view-subtitle">High-yield definitions, essential formulas, key comparisons, and examiner tips for rapid review.</p>
        </div>

        <div className="revision-tabs-bar">
          <button
            className={`rev-tab ${activeTab === 'formulas' ? 'active' : ''}`}
            onClick={() => setActiveTab('formulas')}
          >
            <i className="fa-solid fa-square-root-variable"></i> Master Formulas
          </button>
          <button
            className={`rev-tab ${activeTab === 'definitions' ? 'active' : ''}`}
            onClick={() => setActiveTab('definitions')}
          >
            <i className="fa-solid fa-book"></i> Key Definitions
          </button>
          <button
            className={`rev-tab ${activeTab === 'differences' ? 'active' : ''}`}
            onClick={() => setActiveTab('differences')}
          >
            <i className="fa-solid fa-code-compare"></i> Key Differences
          </button>
          <button
            className={`rev-tab ${activeTab === 'tips' ? 'active' : ''}`}
            onClick={() => setActiveTab('tips')}
          >
            <i className="fa-solid fa-lightbulb"></i> Exam Tips
          </button>
        </div>

        {/* TAB 1: FORMULAS */}
        {activeTab === 'formulas' && (
          <div className="revision-tab-panel active">
            <div className="revision-grid">
              {(revisionData.master_formulas || []).map((f, i) => (
                <div key={i} className="rev-card">
                  <h3 className="rev-card-title">
                    <i className="fa-solid fa-square-root-variable" style={{ color: '#38bdf8' }}></i> {f.name}
                  </h3>
                  <div className="rev-formula-box">{f.formula}</div>
                  <p className="rev-card-desc">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: DEFINITIONS */}
        {activeTab === 'definitions' && (
          <div className="revision-tab-panel active">
            <div className="revision-grid">
              {(revisionData.key_definitions || []).map((d, i) => (
                <div key={i} className="rev-card">
                  <h3 className="rev-card-title">
                    <i className="fa-solid fa-book" style={{ color: '#10b981' }}></i> {d.term}
                  </h3>
                  <p className="rev-card-desc" style={{ color: '#e2e8f0' }}>{d.definition}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: DIFFERENCES */}
        {activeTab === 'differences' && (
          <div className="revision-tab-panel active">
            <div className="diff-tables-container">
              {(revisionData.key_differences || []).map((diff, i) => (
                <div key={i} className="diff-card">
                  <h3 className="diff-card-title">{diff.topic}</h3>
                  <table className="diff-table">
                    <thead>
                      <tr>
                        <th>Property</th>
                        <th>{diff.topic.split(' vs ')[0]}</th>
                        <th>{diff.topic.split(' vs ')[1] || 'Alternative'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {diff.points.map((p, pIdx) => (
                        <tr key={pIdx}>
                          <td><strong>{p.aspect}</strong></td>
                          <td>{p.a}</td>
                          <td>{p.b}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: TIPS */}
        {activeTab === 'tips' && (
          <div className="revision-tab-panel active">
            <div className="exam-tips-list">
              {(revisionData.exam_tips || []).map((tip, i) => (
                <div key={i} className="tip-item">
                  <div className="tip-icon"><i className="fa-solid fa-lightbulb"></i></div>
                  <p className="tip-text">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
