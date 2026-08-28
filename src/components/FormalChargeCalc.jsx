import React, { useState } from 'react';

export default function FormalChargeCalc() {
  const [v, setV] = useState(6);
  const [n, setN] = useState(2);
  const [b, setB] = useState(6);

  const fc = v - n - (0.5 * b);
  const fcStr = fc > 0 ? `+${fc}` : `${fc}`;

  return (
    <div className="lab-container">
      <h3 className="lab-title"><i className="fa-solid fa-calculator"></i> Formal Charge Calculator Lab</h3>
      <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginBottom: '16px' }}>
        Formula: <code>F.C. = V - N - (1/2)B</code> (Calculates atom formal charge to determine lowest energy canonical form).
      </p>
      <div className="fc-calc-box">
        <div className="fc-calc-field">
          <label>Valence Electrons in Free Atom (V):</label>
          <input
            type="number"
            value={v}
            min="1"
            max="8"
            onChange={(e) => setV(parseFloat(e.target.value) || 0)}
          />
        </div>
        <div className="fc-calc-field">
          <label>Non-bonding Lone Pair e⁻ (N):</label>
          <input
            type="number"
            value={n}
            min="0"
            max="8"
            onChange={(e) => setN(parseFloat(e.target.value) || 0)}
          />
        </div>
        <div className="fc-calc-field">
          <label>Total Bonding Shared e⁻ (B):</label>
          <input
            type="number"
            value={b}
            min="0"
            max="12"
            onChange={(e) => setB(parseFloat(e.target.value) || 0)}
          />
        </div>
        <div className="fc-result-card">
          <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block' }}>Calculated Formal Charge</span>
          <strong className="fc-result-val">{fcStr}</strong>
        </div>
      </div>
    </div>
  );
}
