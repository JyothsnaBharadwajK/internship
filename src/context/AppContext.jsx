import React, { createContext, useContext, useState, useEffect } from 'react';
import chapterData from '../../chapter.json';
import topicsData from '../../topics.json';
import flashcardsData from '../../flashcards.json';
import questionsData from '../../questions.json';
import revisionData from '../../revision.json';
import neetPyqsData from '../../neet_pyqs.json';
import highYieldData from '../../high_yield.json';
import formulaSheetData from '../../formula_sheet.json';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [currentView, setCurrentView] = useState('dashboard');
  const [activeTopicId, setActiveTopicId] = useState('kossel-lewis');
  const [isAIDrawerOpen, setIsAIDrawerOpen] = useState(false);

  // Persistent user state
  const [progressState, setProgressState] = useState(() => {
    try {
      const saved = localStorage.getItem('chemlearn_progress');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed reading localStorage', e);
    }
    return {
      completedTopics: [],
      masteredFlashcards: [],
      reviewFlashcards: [],
      questionsAttempted: 0,
      correctAnswers: 0,
      topicMistakes: {},
      overallPercentage: 0
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('chemlearn_progress', JSON.stringify(progressState));
    } catch (e) {
      console.warn('Failed writing to localStorage', e);
    }
  }, [progressState]);

  const recordQuizAnswer = (isCorrect, topicId) => {
    setProgressState(prev => {
      const attempted = prev.questionsAttempted + 1;
      const correct = isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers;
      const mistakes = { ...prev.topicMistakes };
      if (!isCorrect && topicId) {
        mistakes[topicId] = (mistakes[topicId] || 0) + 1;
      }
      return {
        ...prev,
        questionsAttempted: attempted,
        correctAnswers: correct,
        topicMistakes: mistakes
      };
    });
  };

  return (
    <AppContext.Provider value={{
      chapterData,
      topicsData,
      flashcardsData,
      questionsData,
      revisionData,
      neetPyqsData,
      highYieldData,
      formulaSheetData,
      currentView,
      setCurrentView,
      activeTopicId,
      setActiveTopicId,
      isAIDrawerOpen,
      setIsAIDrawerOpen,
      progressState,
      recordQuizAnswer
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
