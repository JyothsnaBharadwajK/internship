import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import VSEPRCanvas from '../components/VSEPRCanvas';
import FormalChargeCalc from '../components/FormalChargeCalc';

export default function ChapterView() {
  const {
    topicsData,
    activeTopicId,
    setActiveTopicId,
    progressState,
    toggleTopicCompletion,
    setIsAIDrawerOpen
  } = useApp();

  const [isExplainSimplyOpen, setIsExplainSimplyOpen] = useState(false);

  const activeTopic = topicsData.find(t => t.id === activeTopicId) || topicsData[0];
  const tIndex = topicsData.findIndex(t => t.id === activeTopic.id);
  const isCompleted = progressState.completedTopics.includes(activeTopic.id);

  const navigateTopic = (delta) => {
    const nextIdx = tIndex + delta;
    if (nextIdx >= 0 && nextIdx < topicsData.length) {
      setActiveTopicId(topicsData[nextIdx].id);
      setIsExplainSimplyOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="app-view active">
      <div className="topic-view-container">
        {/* Left Table of Contents */}
        <div className="topic-toc-sidebar">
          <div className="toc-header">
            <h3>Chapter 4 Index</h3>
            <span className="toc-count">{topicsData.length} Topics</span>
          </div>
          <div className="toc-list">
            {topicsData.map((t) => {
              const isDone = progressState.completedTopics.includes(t.id);
              const isActive = t.id === activeTopic.id;
              return (
                <div
                  key={t.id}
                  className={`toc-item ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTopicId(t.id);
                    setIsExplainSimplyOpen(false);
                  }}
                >
                  <i className={`fa-solid fa-${t.icon || 'atom'}`}></i>
                  <span>{t.title}</span>
                  {isDone && <i className="fa-solid fa-circle-check toc-check"></i>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Main Topic Reader */}
        <div className="topic-main-reader">
          <div className="topic-reader-header">
            <div className="topic-crumb">
              <span>Unit 4</span> &bull; <span>Topic 4.{tIndex + 1}</span>
            </div>
            <h1 className="topic-header-title">{activeTopic.title}</h1>
            <p className="topic-header-subtitle">{activeTopic.subtitle || activeTopic.summary}</p>

            <div className="topic-toolbar">
              <button
                className="btn-tool-explain-simply"
                onClick={() => setIsExplainSimplyOpen(prev => !prev)}
              >
                <i className="fa-solid fa-wand-magic-sparkles"></i>
                <span>{isExplainSimplyOpen ? 'Hide Simple Explanation' : 'Explain Simply'}</span>
              </button>

              <button
                className={`btn-tool-mark-complete ${isCompleted ? 'completed' : ''}`}
                onClick={() => toggleTopicCompletion(activeTopic.id)}
              >
                <i className={isCompleted ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle-check'}></i>
                <span>{isCompleted ? 'Completed' : 'Mark as Completed'}</span>
              </button>

              <button
                className="btn-tool-ask-ai"
                onClick={() => setIsAIDrawerOpen(true)}
              >
                <i className="fa-solid fa-robot"></i>
                <span>Ask AI About This Topic</span>
              </button>
            </div>
          </div>

          {/* Explain Simply Card */}
          {isExplainSimplyOpen && activeTopic.explain_simply && (
            <div className="explain-simply-card">
              <div className="es-header">
                <div className="es-badge"><i className="fa-solid fa-lightbulb"></i> Simplified Concept Breakdown</div>
                <button className="es-close" onClick={() => setIsExplainSimplyOpen(false)}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <div className="es-content">
                <div className="es-item">
                  <strong><i className="fa-solid fa-sparkles"></i> Real-World Analogy:</strong>
                  <p>{activeTopic.explain_simply.analogy}</p>
                </div>
                <div className="es-item">
                  <strong><i className="fa-solid fa-key"></i> Key Takeaway:</strong>
                  <p>{activeTopic.explain_simply.takeaway}</p>
                </div>
                {activeTopic.explain_simply.key_terms && (
                  <div className="es-item">
                    <strong><i className="fa-solid fa-tags"></i> Core Terminology:</strong>
                    <div className="es-tags-row">
                      {activeTopic.explain_simply.key_terms.map((term, i) => (
                        <span key={i} className="es-tag">{term}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Subsections Content */}
          <div className="topic-body-content">
            {activeTopic.subsections && activeTopic.subsections.map((sub, idx) => (
              <div key={idx} className="topic-subsection">
                <h3 className="subsection-title"><i className="fa-solid fa-book-open"></i> {sub.title}</h3>
                <p className="subsection-text">{sub.content}</p>
              </div>
            ))}

            {activeTopic.exercises && activeTopic.exercises.map((ex, idx) => (
              <div key={idx} className="topic-subsection">
                <h3 className="subsection-title"><i className="fa-solid fa-circle-question"></i> Exercise {ex.q_num}: {ex.question}</h3>
                <p className="subsection-text" style={{ color: '#cbd5e1' }}><strong>Solution:</strong> {ex.answer}</p>
              </div>
            ))}
          </div>

          {/* Interactive Visualizer / Lab */}
          <div className="topic-interactive-lab">
            {activeTopic.id === 'vsepr-theory' && <VSEPRCanvas />}
            {activeTopic.id === 'kossel-lewis' && <FormalChargeCalc />}
          </div>

          {/* Extra Tables if present */}
          {activeTopic.table_data && activeTopic.table_data.length > 0 && (
            <div className="topic-extra-tables">
              <div className="data-table-wrapper">
                <table className="chem-data-table">
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
            </div>
          )}

          {/* Prev/Next Navigation Footer */}
          <div className="topic-nav-footer">
            <button
              className="btn-topic-step"
              style={{ visibility: tIndex > 0 ? 'visible' : 'hidden' }}
              onClick={() => navigateTopic(-1)}
            >
              <i className="fa-solid fa-arrow-left"></i>
              <div className="step-label">
                <span>Previous Topic</span>
                <strong>{tIndex > 0 ? topicsData[tIndex - 1].title : ''}</strong>
              </div>
            </button>

            <button
              className="btn-topic-step next"
              style={{ visibility: tIndex < topicsData.length - 1 ? 'visible' : 'hidden' }}
              onClick={() => navigateTopic(1)}
            >
              <div className="step-label">
                <span>Next Topic</span>
                <strong>{tIndex < topicsData.length - 1 ? topicsData[tIndex + 1].title : ''}</strong>
              </div>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
