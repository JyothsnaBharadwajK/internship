import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function PracticeGenView() {
  const { questionsData } = useApp();
  const [topicSelect, setTopicSelect] = useState('all');
  const [diffSelect, setDiffSelect] = useState('all');
  const [countSelect, setCountSelect] = useState(10);
  const [generatedList, setGeneratedList] = useState([]);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleGenerate = () => {
    let pool = [...questionsData];
    if (topicSelect !== 'all') {
      pool = pool.filter(q => q.topic_id === topicSelect);
    }
    if (diffSelect !== 'all') {
      pool = pool.filter(q => q.difficulty === diffSelect);
    }
    pool.sort(() => Math.random() - 0.5);
    setGeneratedList(pool.slice(0, countSelect));
    setHasGenerated(true);
  };

  return (
    <section className="app-view active">
      <div className="practice-gen-wrapper">
        <div className="view-header-centered">
          <span className="section-tag"><i className="fa-solid fa-wand-magic-sparkles"></i> AI PRACTICE ENGINE</span>
          <h1 className="view-title">Practice With AI</h1>
          <p className="view-subtitle">Generate custom targeted practice questions calibrated strictly to NCERT Chemical Bonding textbook knowledge.</p>
        </div>

        <div className="gen-config-card">
          <div className="gen-form-grid">
            <div className="gen-field">
              <label htmlFor="gen-topic-select"><i className="fa-solid fa-layer-group"></i> Select Topic</label>
              <select
                id="gen-topic-select"
                className="gen-select"
                value={topicSelect}
                onChange={(e) => setTopicSelect(e.target.value)}
              >
                <option value="all">Entire Chapter (All Topics)</option>
                <option value="kossel-lewis">4.1 Kössel-Lewis &amp; Octet Rule</option>
                <option value="ionic-bond">4.2 Ionic Bond &amp; Lattice Enthalpy</option>
                <option value="bond-parameters">4.3 Bond Parameters &amp; Dipole</option>
                <option value="vsepr-theory">4.4 VSEPR Theory</option>
                <option value="valence-bond-theory">4.5 Valence Bond Theory (VBT)</option>
                <option value="hybridisation">4.6 Hybridisation (sp, sp2, sp3, sp3d)</option>
                <option value="mot-theory">4.7 Molecular Orbital Theory (MOT)</option>
                <option value="hydrogen-bonding">4.9 Hydrogen Bonding</option>
              </select>
            </div>

            <div className="gen-field">
              <label htmlFor="gen-diff-select"><i className="fa-solid fa-gauge-high"></i> Difficulty Level</label>
              <select
                id="gen-diff-select"
                className="gen-select"
                value={diffSelect}
                onChange={(e) => setDiffSelect(e.target.value)}
              >
                <option value="all">Mixed (Easy to Hard)</option>
                <option value="easy">Easy (Definitions &amp; Direct Rules)</option>
                <option value="medium">Medium (Geometry &amp; Electron Configs)</option>
                <option value="hard">Hard (Conceptual &amp; Advanced Anomalies)</option>
              </select>
            </div>

            <div className="gen-field">
              <label htmlFor="gen-count-select"><i className="fa-solid fa-list-ol"></i> Question Count</label>
              <select
                id="gen-count-select"
                className="gen-select"
                value={countSelect}
                onChange={(e) => setCountSelect(parseInt(e.target.value))}
              >
                <option value={5}>5 Questions</option>
                <option value={10}>10 Questions</option>
                <option value={15}>All Available</option>
              </select>
            </div>
          </div>

          <div className="gen-actions">
            <button className="btn-generate-practice" onClick={handleGenerate}>
              <i className="fa-solid fa-bolt"></i> Generate Practice Set
            </button>
          </div>
        </div>

        {hasGenerated && (
          <div className="gen-output-container">
            <div className="gen-output-header">
              <h3>Custom Practice Set Generated ({generatedList.length} Questions)</h3>
              <button className="btn-tool-sm" onClick={() => window.print()}>
                <i className="fa-solid fa-print"></i> Print / Save
              </button>
            </div>
            <div className="gen-questions-list">
              {generatedList.map((q, idx) => (
                <div key={idx} className="gen-q-item">
                  <div className="gen-q-meta">
                    <span className="gen-tag">Q{idx + 1}</span>
                    <span className="gen-tag">{q.topic}</span>
                    <span className="gen-tag" style={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8' }}>
                      {q.difficulty}
                    </span>
                  </div>
                  <h4 className="gen-q-text">{q.question}</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
                    {q.options.map((opt, oIdx) => (
                      <div key={oIdx} style={{ fontSize: '0.9rem', color: '#94a3b8' }}>&bull; {opt}</div>
                    ))}
                  </div>
                  <details className="gen-answer-reveal">
                    <summary style={{ cursor: 'pointer', fontWeight: 700, color: '#10b981' }}>
                      Click to Reveal Correct Answer &amp; Explanation
                    </summary>
                    <div style={{ marginTop: '8px' }}>
                      <strong>Answer:</strong> {q.answer}<br />
                      <span style={{ color: '#94a3b8' }}>{q.explanation}</span>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
