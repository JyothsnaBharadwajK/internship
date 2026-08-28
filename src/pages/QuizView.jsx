import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function QuizView() {
  const { questionsData, setCurrentView, recordQuizAnswer } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const currentQ = questionsData[currentIndex] || questionsData[0];
  const prefixes = ['A', 'B', 'C', 'D'];

  const handleSelectOption = (opt) => {
    if (hasAnswered) return;
    setSelectedOption(opt);
    setHasAnswered(true);

    const isCorrect = opt.trim().toLowerCase() === currentQ.answer.trim().toLowerCase();
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    recordQuizAnswer(isCorrect, currentQ.topic_id);
  };

  const nextQuestion = () => {
    if (currentIndex + 1 < questionsData.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setHasAnswered(false);
    } else {
      alert(`Quiz Complete! You scored ${score} out of ${questionsData.length}`);
      setCurrentIndex(0);
      setSelectedOption(null);
      setHasAnswered(false);
      setScore(0);
    }
  };

  return (
    <div>
      <div className="section-header-bar">
        <button className="btn-back-dashboard" onClick={() => setCurrentView('dashboard')}>
          &larr; Back to Dashboard
        </button>
      </div>

      <div className="quiz-container">
        <div className="quiz-subhead">
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
            Topic: {currentQ.topic} &bull; Question {currentIndex + 1} of {questionsData.length}
          </span>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#059669' }}>
            Score: {score}/{questionsData.length}
          </span>
        </div>

        <div className="quiz-question-card">
          <div className="question-text">{currentQ.question}</div>

          <div className="options-list">
            {currentQ.options.map((opt, idx) => {
              let optClass = 'option-box';
              if (hasAnswered) {
                if (opt.trim().toLowerCase() === currentQ.answer.trim().toLowerCase()) {
                  optClass += ' correct';
                } else if (selectedOption === opt) {
                  optClass += ' incorrect';
                }
              }
              return (
                <div
                  key={idx}
                  className={optClass}
                  onClick={() => handleSelectOption(opt)}
                >
                  <span className="option-letter">{prefixes[idx] || (idx + 1)}</span>
                  <span>{opt}</span>
                </div>
              );
            })}
          </div>

          {hasAnswered && (
            <div className={`feedback-card ${selectedOption?.trim().toLowerCase() === currentQ.answer.trim().toLowerCase() ? 'correct' : 'incorrect'}`}>
              <div className="feedback-title">
                <i className={`fa-solid ${selectedOption?.trim().toLowerCase() === currentQ.answer.trim().toLowerCase() ? 'fa-circle-check' : 'fa-circle-xmark'}`}></i>
                <span>{selectedOption?.trim().toLowerCase() === currentQ.answer.trim().toLowerCase() ? 'Correct!' : `Incorrect (Correct: ${currentQ.answer})`}</span>
              </div>
              <p>{currentQ.explanation}</p>
            </div>
          )}

          {hasAnswered && (
            <div className="quiz-nav-btns">
              <button
                className="btn-back-dashboard"
                style={{ marginLeft: 'auto', background: 'var(--color-primary)', color: '#fff', borderColor: 'var(--color-primary)' }}
                onClick={nextQuestion}
              >
                {currentIndex + 1 < questionsData.length ? 'Next Question \u2192' : 'Finish Quiz'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
