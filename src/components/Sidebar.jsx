import React from 'react';
import { useApp } from '../context/AppContext';

export default function Sidebar() {
  const {
    currentView,
    setCurrentView,
    topicsData,
    flashcardsData,
    progressState,
    setIsAIDrawerOpen,
    isSidebarOpen,
    setIsSidebarOpen
  } = useApp();

  const exportPPTX = () => {
    if (typeof window.PptxGenJS === 'undefined') {
      alert('PptxGenJS library is loading, please try again.');
      return;
    }
    const pptx = new window.PptxGenJS();
    pptx.layout = 'LAYOUT_16x9';
    const s1 = pptx.addSlide();
    s1.background = { color: '0B0F19' };
    s1.addText('Chemical Bonding & Molecular Structure', {
      x: 0.8, y: 1.8, w: 8.4, fontSize: 28, bold: true, color: '38BDF8', fontFace: 'Arial'
    });
    s1.addText('NCERT Class 11 Chemistry — Unit 4 Comprehensive Master Summary', {
      x: 0.8, y: 2.8, w: 8.4, fontSize: 14, color: '94A3B8', fontFace: 'Arial'
    });

    const s2 = pptx.addSlide();
    s2.background = { color: '0F172A' };
    s2.addText('Chapter Curriculum Overview', {
      x: 0.8, y: 0.6, w: 8.4, fontSize: 20, bold: true, color: 'F8FAFC'
    });
    const topicBullets = topicsData.map(t => ({ text: t.title, options: { fontSize: 11, color: 'CBD5E1' } }));
    s2.addText(topicBullets, { x: 0.8, y: 1.4, w: 8.4, h: 3.6, bullet: true });
    pptx.writeFile({ fileName: 'Chemical_Bonding_NCERT_Summary.pptx' });
  };

  const navTo = (view) => {
    setCurrentView(view);
    setIsSidebarOpen(false);
  };

  const accuracy = progressState.questionsAttempted > 0
    ? Math.round((progressState.correctAnswers / progressState.questionsAttempted) * 100)
    : 0;

  return (
    <aside className={`app-sidebar ${isSidebarOpen ? 'open' : ''}`} id="app-sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo-icon">
          <svg width="30" height="30" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="15" stroke="url(#sidebar_logo_grad)" strokeWidth="2.5" strokeDasharray="6 3" />
            <circle cx="18" cy="18" r="7" fill="url(#sidebar_logo_grad)" />
            <path d="M12 18C12 14.6863 14.6863 12 18 12C21.3137 12 24 14.6863 24 18" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
            <defs>
              <linearGradient id="sidebar_logo_grad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                <stop stopColor="#38bdf8" />
                <stop offset="1" stopColor="#4f46e5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="brand-text">
          <span className="brand-name">ChemLearn</span>
          <span className="brand-badge">AI 2.0</span>
        </div>
        <button className="sidebar-close-btn" onClick={() => setIsSidebarOpen(false)} aria-label="Close sidebar">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div className="sidebar-chapter-pill">
        <span className="pill-label">CURRENT TEXTBOOK</span>
        <div className="pill-title" title="Unit 4: Chemical Bonding & Molecular Structure">
          <i className="fa-solid fa-book-bookmark"></i>
          <span>NCERT Unit 4: Bonding</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-group-title">LEARNING HUB</div>

        <button className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`} onClick={() => navTo('dashboard')}>
          <i className="fa-solid fa-house"></i>
          <span>Home Dashboard</span>
        </button>

        <button className={`nav-item ${currentView === 'chapter' ? 'active' : ''}`} onClick={() => navTo('chapter')}>
          <i className="fa-solid fa-layer-group"></i>
          <span>Chapter Topics</span>
          <span className="nav-tag">{topicsData.length}</span>
        </button>

        <button className={`nav-item ${currentView === 'flashcards' ? 'active' : ''}`} onClick={() => navTo('flashcards')}>
          <i className="fa-solid fa-clone"></i>
          <span>Concept Flashcards</span>
          <span className="nav-tag">{flashcardsData.length}</span>
        </button>

        <button className={`nav-item ${currentView === 'quiz' ? 'active' : ''}`} onClick={() => navTo('quiz')}>
          <i className="fa-solid fa-circle-question"></i>
          <span>Adaptive Quiz</span>
          <span className="nav-tag glow">Practice</span>
        </button>

        <button className={`nav-item ${currentView === 'revision' ? 'active' : ''}`} onClick={() => navTo('revision')}>
          <i className="fa-solid fa-bolt-lightning"></i>
          <span>Quick Revision</span>
        </button>

        <div className="nav-group-title">AI &amp; TOOLS</div>

        <button className="nav-item" onClick={() => { setIsAIDrawerOpen(true); setIsSidebarOpen(false); }}>
          <i className="fa-solid fa-robot"></i>
          <span>Textbook AI Tutor</span>
          <span className="ai-live-indicator"></span>
        </button>

        <button className={`nav-item ${currentView === 'practice-gen' ? 'active' : ''}`} onClick={() => navTo('practice-gen')}>
          <i className="fa-solid fa-wand-magic-sparkles"></i>
          <span>Practice Generator</span>
        </button>

        <button className="nav-item" onClick={exportPPTX}>
          <i className="fa-solid fa-file-powerpoint"></i>
          <span>Export Summary PPT</span>
        </button>
      </nav>

      <div className="sidebar-progress-card">
        <div className="sp-header">
          <span>Overall Mastery</span>
          <strong>{progressState.overallPercentage}%</strong>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${progressState.overallPercentage}%` }}></div>
        </div>
        <div className="sp-metrics">
          <span><i className="fa-regular fa-circle-check"></i> {progressState.completedTopics.length}/{topicsData.length} Topics</span>
          <span><i className="fa-solid fa-star"></i> {accuracy}% Quiz</span>
        </div>
      </div>
    </aside>
  );
}
