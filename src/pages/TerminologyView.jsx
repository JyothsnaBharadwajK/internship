import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function TerminologyView() {
  const { setCurrentView } = useApp();

  const terms = [
    {
      id: 'octet',
      title: 'Octet Rule',
      definition: 'Atoms combine either by transfer of valence electrons or by sharing in order to acquire eight electrons in their valence shell and attain noble gas stability.',
      formula: 'ns² np⁶ Configuration',
      example: 'NaCl formation, H2O, Cl2, CH4',
      proHint: 'Expanded octet exists for 3rd period elements (PF5, SF6) because they have vacant 3d orbitals.'
    },
    {
      id: 'fc',
      title: 'Formal Charge',
      definition: 'The difference between the number of valence electrons of that atom in an isolated state and the number of electrons assigned to it in a Lewis structure.',
      formula: 'F.C. = V - N - (1/2)B',
      example: 'In O3: Central O = +1, End O = 0, End O- = -1',
      proHint: 'The structure with the smallest formal charges on the atoms corresponds to the lowest energy state.'
    },
    {
      id: 'lattice',
      title: 'Lattice Enthalpy',
      definition: 'The energy required to completely separate one mole of a solid ionic compound into its gaseous constituent ions.',
      formula: 'NaCl(s) → Na⁺(g) + Cl⁻(g) ; ΔlatticeH = +788 kJ/mol',
      example: 'NaCl, MgO, CaF2 crystals',
      proHint: 'High lattice energy provides the driving force that stabilizes ionic solids over isolated atoms.'
    },
    {
      id: 'dipole',
      title: 'Dipole Moment',
      definition: 'Product of the magnitude of electric charge and distance of separation between the positive and negative centers in a polar molecule.',
      formula: 'μ = Q × r (1 Debye = 3.33564 × 10⁻³⁰ C m)',
      example: 'H2O (1.85 D), NH3 (1.47 D), BF3 (0.00 D)',
      proHint: 'In symmetrical geometries (BF3, CCl4, CO2), individual bond dipoles cancel out resulting in net zero dipole.'
    },
    {
      id: 'bo',
      title: 'Bond Order',
      definition: 'Number of chemical bonds between two atoms in a molecule. Directly proportional to bond strength and inversely to bond length.',
      formula: 'B.O. = (Nb - Na) / 2',
      example: 'N2 (B.O. = 3.0), O2 (B.O. = 2.0), F2 (B.O. = 1.0)',
      proHint: 'Isoelectronic species (N2, CO, NO+) all possess identical bond orders of 3.0.'
    },
    {
      id: 'hbond',
      title: 'Hydrogen Bonding',
      definition: 'Attractive electrostatic force that binds the partially positive hydrogen atom of one molecule with a highly electronegative atom (F, O, N).',
      formula: 'F-H...F > O-H...O > N-H...N',
      example: 'Water, HF, Alcohols, o-Nitrophenol',
      proHint: 'Intermolecular H-bonds raise boiling points, whereas Intramolecular H-bonds lower them.'
    }
  ];

  const [activeTermId, setActiveTermId] = useState('octet');
  const activeTerm = terms.find(t => t.id === activeTermId) || terms[0];

  return (
    <div>
      <div className="section-header-bar">
        <button className="btn-back-dashboard" onClick={() => setCurrentView('dashboard')}>
          &larr; Back to Dashboard
        </button>

        <div className="section-pill-tabs">
          <button className="pill-tab" onClick={() => setCurrentView('intro')}>
            🌟 Intro
          </button>
          <button className="pill-tab active" onClick={() => setCurrentView('terminology')}>
            📖 Terminology
          </button>
          <button className="pill-tab" onClick={() => setCurrentView('skills')}>
            🎯 Skills
          </button>
        </div>
      </div>

      <div className="terminology-layout">
        {/* Left Sidebar List */}
        <div className="terms-sidebar">
          {terms.map((t) => (
            <button
              key={t.id}
              className={`term-list-item ${activeTerm.id === t.id ? 'active' : ''}`}
              onClick={() => setActiveTermId(t.id)}
            >
              <i className="fa-solid fa-book-bookmark"></i>
              <span>{t.title}</span>
            </button>
          ))}
        </div>

        {/* Right Detail Panel */}
        <div className="term-detail-panel">
          <div className="term-detail-title">
            <i className="fa-solid fa-atom" style={{ color: 'var(--color-primary)' }}></i>
            <span>{activeTerm.title}</span>
          </div>

          <p className="term-def-text">{activeTerm.definition}</p>

          <div className="card-sub-lbl">Mathematical Formula / Representation</div>
          <div className="formula-box">{activeTerm.formula}</div>

          <div className="term-bottom-grid">
            <div className="examples-card">
              <div className="card-sub-lbl">Standard Examples</div>
              <p style={{ fontSize: '14px', color: '#334155' }}>{activeTerm.example}</p>
            </div>

            <div className="pro-hint-card">
              <div className="card-sub-lbl" style={{ color: '#1e40af' }}>💡 Exam Pro Hint</div>
              <p style={{ fontSize: '13px', color: '#1e40af', lineHeight: 1.5 }}>{activeTerm.proHint}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
