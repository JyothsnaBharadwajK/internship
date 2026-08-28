import React from 'react';
import { useApp } from '../context/AppContext';

export default function DashboardView() {
  const { chapterData, topicsData, flashcardsData, neetPyqsData, setCurrentView } = useApp();

  return (
    <div className="dashboard-container">
      <div className="dashboard-grid">
        {/* Left Hero Card */}
        <div className="dashboard-hero">
          <div className="hero-content">
            <div className="hero-grade-badge">
              <i className="fa-solid fa-graduation-cap"></i> Grade 11 Chemistry • Unit 4
            </div>
            <h1 className="hero-title">Chemical Bonding &amp; Molecular Structure</h1>
            <p className="hero-subtitle">
              Explore the fundamental forces holding atoms together, Kössel-Lewis octet concepts, 3D VSEPR geometries, orbital overlap, hybridisation, and Molecular Orbital Theory.
            </p>
          </div>

          <div className="hero-stats-grid">
            <div className="hero-stat-card">
              <span className="hero-stat-val">{topicsData.length}</span>
              <span className="hero-stat-lbl">Core Skills</span>
            </div>
            <div className="hero-stat-card">
              <span className="hero-stat-val">12</span>
              <span className="hero-stat-lbl">Definitions</span>
            </div>
            <div className="hero-stat-card">
              <span className="hero-stat-val">{neetPyqsData.length}</span>
              <span className="hero-stat-lbl">NEET PYQs</span>
            </div>
            <div className="hero-stat-card">
              <span className="hero-stat-val">{flashcardsData.length}</span>
              <span className="hero-stat-lbl">Flashcards</span>
            </div>
          </div>
        </div>

        {/* Right Path Selector */}
        <div className="path-selector-container">
          <div className="path-header-lbl">Learning Paths</div>

          <div className="path-card intro" onClick={() => setCurrentView('intro')}>
            <div className="path-icon-wrapper">
              <i className="fa-solid fa-star"></i>
            </div>
            <div className="path-card-content">
              <div className="path-tag">Discovery</div>
              <div className="path-title">Intro &amp; 6 Big Questions</div>
              <div className="path-desc">Who, What, When, Where, Why, and How of Chemical Bonding.</div>
            </div>
            <i className="fa-solid fa-chevron-right path-chevron"></i>
          </div>

          <div className="path-card terminology" onClick={() => setCurrentView('terminology')}>
            <div className="path-icon-wrapper">
              <i className="fa-solid fa-book-bookmark"></i>
            </div>
            <div className="path-card-content">
              <div className="path-tag">Foundations</div>
              <div className="path-title">Terminology &amp; Key Laws</div>
              <div className="path-desc">Octet rule, formal charge, bond parameters &amp; dipole moments.</div>
            </div>
            <i className="fa-solid fa-chevron-right path-chevron"></i>
          </div>

          <div className="path-card skills" onClick={() => setCurrentView('skills')}>
            <div className="path-icon-wrapper">
              <i className="fa-solid fa-atom"></i>
            </div>
            <div className="path-card-content">
              <div className="path-tag">Core Theories</div>
              <div className="path-title">Skills &amp; Master Topics</div>
              <div className="path-desc">VSEPR 3D canvas, hybridisation models, and MOT configurations.</div>
            </div>
            <i className="fa-solid fa-chevron-right path-chevron"></i>
          </div>

          <div className="path-card exam-edge" onClick={() => setCurrentView('neet-pyq')}>
            <div className="path-icon-wrapper">
              <i className="fa-solid fa-bullseye"></i>
            </div>
            <div className="path-card-content">
              <div className="path-tag">Exam Mastery</div>
              <div className="path-title">NEET PYQ &amp; High Yield NCERT</div>
              <div className="path-desc">Previous 7 years questions with step-by-step verified NCERT solutions.</div>
            </div>
            <i className="fa-solid fa-chevron-right path-chevron"></i>
          </div>

          <div className="path-card connectomics" onClick={() => setCurrentView('formula-sheet')}>
            <div className="path-icon-wrapper">
              <i className="fa-solid fa-square-root-variable"></i>
            </div>
            <div className="path-card-content">
              <div className="path-tag">Formulas</div>
              <div className="path-title">Formula Sheet &amp; Equations</div>
              <div className="path-desc">Master formulas, dipole values, and bond order equations.</div>
            </div>
            <i className="fa-solid fa-chevron-right path-chevron"></i>
          </div>

          <div className="path-card intro" onClick={() => setCurrentView('flashcards')}>
            <div className="path-icon-wrapper">
              <i className="fa-solid fa-bolt-lightning"></i>
            </div>
            <div className="path-card-content">
              <div className="path-tag">Recall</div>
              <div className="path-title">Quick Revision Flashcards</div>
              <div className="path-desc">Active recall concept deck for rapid exam mastery.</div>
            </div>
            <i className="fa-solid fa-chevron-right path-chevron"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
