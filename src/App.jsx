import React from 'react';
import { useApp } from './context/AppContext';
import Topbar from './components/Topbar';
import AITutorDrawer from './components/AITutorDrawer';
import DashboardView from './pages/DashboardView';
import IntroView from './pages/IntroView';
import TerminologyView from './pages/TerminologyView';
import SkillsView from './pages/SkillsView';
import FlashcardsView from './pages/FlashcardsView';
import QuizView from './pages/QuizView';
import NeetPyqView from './pages/NeetPyqView';
import HighYieldView from './pages/HighYieldView';
import FormulaSheetView from './pages/FormulaSheetView';

export default function App() {
  const { currentView } = useApp();

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Topbar />

      {/* Main Content Viewport */}
      <main className="main-content">
        {currentView === 'dashboard' && <DashboardView />}
        {currentView === 'intro' && <IntroView />}
        {currentView === 'terminology' && <TerminologyView />}
        {currentView === 'skills' && <SkillsView />}
        {currentView === 'neet-pyq' && <NeetPyqView />}
        {currentView === 'high-yield' && <HighYieldView />}
        {currentView === 'formula-sheet' && <FormulaSheetView />}
        {currentView === 'flashcards' && <FlashcardsView />}
        {currentView === 'quiz' && <QuizView />}
      </main>

      {/* Persistent AI Tutor Drawer */}
      <AITutorDrawer />
    </div>
  );
}
