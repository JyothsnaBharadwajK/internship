import React from 'react';
import { useApp } from '../context/AppContext';

export default function FormulaSheetView() {
  const { formulaSheetData, setCurrentView } = useApp();

  return (
    <div>
      <div className="section-header-bar">
        <button className="btn-back-dashboard" onClick={() => setCurrentView('dashboard')}>
          &larr; Back to Dashboard
        </button>

        <div className="section-pill-tabs">
          <button className="pill-tab" onClick={() => setCurrentView('neet-pyq')}>
            🎯 NEET PYQs
          </button>
          <button className="pill-tab" onClick={() => setCurrentView('high-yield')}>
            ⚡ High Yield NCERT
          </button>
          <button className="pill-tab active" onClick={() => setCurrentView('formula-sheet')}>
            📐 Formula Sheet
          </button>
          <button className="pill-tab" onClick={() => setCurrentView('flashcards')}>
            🔄 Quick Revision
          </button>
        </div>
      </div>

      <div className="connectomics-hero" style={{ background: 'var(--color-dark-hero)', marginBottom: '28px' }}>
        <h1 style={{ color: '#fff' }}>
          Chemical Bonding <span>Formula &amp; Equation Sheet</span>
        </h1>
        <p>Mathematical definitions, dipole formulas, formal charge equations, and units.</p>
      </div>

      <div className="formula-table-container">
        <table className="formula-table">
          <thead>
            <tr>
              <th>Physical / Chemical Quantity</th>
              <th>Formula / Mathematical Expression</th>
              <th>Standard Units</th>
            </tr>
          </thead>
          <tbody>
            {formulaSheetData.map((f, idx) => (
              <tr key={idx}>
                <td className="quantity-col">{f.quantity}</td>
                <td className="formula-col">{f.formula}</td>
                <td className="unit-col">{f.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
