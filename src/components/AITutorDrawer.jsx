import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { retrieveTextbookAnswer } from '../services/aiRAG';

export default function AITutorDrawer() {
  const { isAIDrawerOpen, setIsAIDrawerOpen } = useApp();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Hello! I am your <strong>NCERT Chemical Bonding AI Tutor</strong>. I answer questions directly using your textbook material as the single source of truth.<br/><br/>You can ask me to simplify concepts, explain 3D VSEPR shapes, construct MOT configurations, or quiz you on any topic!'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const sendQuery = (queryText) => {
    const text = queryText || inputVal;
    if (!text.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text }]);
    setInputVal('');
    setIsThinking(true);

    setTimeout(() => {
      const response = retrieveTextbookAnswer(text);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: response.answer,
          citation: response.citation
        }
      ]);
      setIsThinking(false);
    }, 400);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendQuery();
    }
  };

  return (
    <div className={`ai-tutor-drawer ${isAIDrawerOpen ? 'open' : ''}`} id="ai-tutor-drawer">
      <div className="ai-drawer-header">
        <div className="ai-header-brand">
          <div className="ai-avatar"><i className="fa-solid fa-robot"></i></div>
          <div className="ai-header-info">
            <h3>Textbook AI Tutor</h3>
            <span className="ai-status-text"><span className="dot-online"></span> Grounded in NCERT Unit 4</span>
          </div>
        </div>
        <button className="ai-drawer-close" onClick={() => setIsAIDrawerOpen(false)} aria-label="Close AI Tutor">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div className="ai-chips-scroll">
        <button className="ai-chip" onClick={() => sendQuery('Explain VSEPR theory with a simple analogy.')}>🎯 Explain VSEPR simply</button>
        <button className="ai-chip" onClick={() => sendQuery('Why is O2 paramagnetic according to MOT?')}>🧲 Why is O2 paramagnetic?</button>
        <button className="ai-chip" onClick={() => sendQuery('What is the difference between sigma and pi bond?')}>⚡ Sigma vs Pi bond</button>
        <button className="ai-chip" onClick={() => sendQuery('Explain why axial bonds in PCl5 are longer than equatorial.')}>📐 Axial vs equatorial PCl5</button>
        <button className="ai-chip" onClick={() => sendQuery('Give me a quick 2-minute revision of Chemical Bonding.')}>⚡ Quick chapter summary</button>
      </div>

      <div className="ai-chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`ai-message ${msg.role}`}>
            {msg.role === 'assistant' && (
              <div className="msg-avatar"><i className="fa-solid fa-robot"></i></div>
            )}
            <div className="msg-content">
              <div dangerouslySetInnerHTML={{ __html: msg.text }} />
              {msg.citation && (
                <span className="citation-tag">
                  <i className="fa-solid fa-bookmark"></i> Cited: {msg.citation}
                </span>
              )}
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="ai-message assistant">
            <div className="msg-avatar"><i className="fa-solid fa-robot"></i></div>
            <div className="msg-content">
              <p><i className="fa-solid fa-spinner fa-spin"></i> Searching NCERT Chapter 4 knowledge base...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="ai-input-area">
        <div className="ai-input-box">
          <input
            type="text"
            placeholder="Ask a chemistry question from the textbook..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
          <button className="btn-ai-send" onClick={() => sendQuery()} aria-label="Send query">
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
        <div className="ai-input-footer">
          <span><i className="fa-solid fa-book"></i> Primary Knowledge: NCERT Class 11 Chapter 4</span>
        </div>
      </div>
    </div>
  );
}
