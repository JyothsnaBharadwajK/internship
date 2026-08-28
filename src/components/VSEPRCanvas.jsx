import React, { useState, useEffect, useRef } from 'react';

export default function VSEPRCanvas() {
  const [selectedShape, setSelectedShape] = useState('tetrahedral');
  const canvasRef = useRef(null);

  const shapeData = {
    linear: {
      type: 'AB2 (2 BP, 0 LP)',
      angle: '180°',
      example: 'BeCl2, CO2, HgCl2'
    },
    'trigonal-planar': {
      type: 'AB3 (3 BP, 0 LP)',
      angle: '120°',
      example: 'BF3, BCl3'
    },
    tetrahedral: {
      type: 'AB4 (4 BP, 0 LP)',
      angle: '109.5°',
      example: 'CH4, CCl4, SiF4, NH4+'
    },
    'trigonal-pyramidal': {
      type: 'AB3E (3 BP, 1 LP)',
      angle: '107° (Compressed by LP)',
      example: 'NH3, PCl3'
    },
    bent: {
      type: 'AB2E2 (2 BP, 2 LP)',
      angle: '104.5° (2 LP-LP Repulsions)',
      example: 'H2O, SO2, O3'
    },
    'trigonal-bipyramidal': {
      type: 'AB5 (5 BP, 0 LP)',
      angle: '90° & 120°',
      example: 'PCl5'
    },
    'see-saw': {
      type: 'AB4E (4 BP, 1 LP)',
      angle: 'Distorted (<90°, <120°)',
      example: 'SF4'
    },
    't-shaped': {
      type: 'AB3E2 (3 BP, 2 LP)',
      angle: '<90°',
      example: 'ClF3'
    },
    octahedral: {
      type: 'AB6 (6 BP, 0 LP)',
      angle: '90°',
      example: 'SF6'
    },
    'square-planar': {
      type: 'AB4E2 (4 BP, 2 LP)',
      angle: '90°',
      example: 'XeF4'
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const drawAtom = (x, y, r, color, label) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, x, y);
    };

    const drawBond = (x1, y1, x2, y2, color = '#38bdf8') => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 3.5;
      ctx.lineCap = 'round';
      ctx.stroke();
    };

    if (selectedShape === 'linear') {
      drawBond(cx - 85, cy, cx + 85, cy);
      drawAtom(cx - 85, cy, 14, '#10b981', 'Cl');
      drawAtom(cx + 85, cy, 14, '#10b981', 'Cl');
      drawAtom(cx, cy, 18, '#38bdf8', 'Be');
    } else if (selectedShape === 'trigonal-planar') {
      drawBond(cx, cy, cx, cy - 75);
      drawBond(cx, cy, cx - 65, cy + 45);
      drawBond(cx, cy, cx + 65, cy + 45);
      drawAtom(cx, cy - 75, 14, '#f59e0b', 'F');
      drawAtom(cx - 65, cy + 45, 14, '#f59e0b', 'F');
      drawAtom(cx + 65, cy + 45, 14, '#f59e0b', 'F');
      drawAtom(cx, cy, 18, '#6366f1', 'B');
    } else if (selectedShape === 'tetrahedral') {
      drawBond(cx, cy, cx, cy - 80);
      drawBond(cx, cy, cx - 70, cy + 55);
      drawBond(cx, cy, cx + 70, cy + 55);
      drawBond(cx, cy, cx + 25, cy - 25, 'rgba(56,189,248,0.5)');
      drawAtom(cx, cy - 80, 13, '#fff', 'H');
      drawAtom(cx - 70, cy + 55, 13, '#fff', 'H');
      drawAtom(cx + 70, cy + 55, 13, '#fff', 'H');
      drawAtom(cx + 25, cy - 25, 11, 'rgba(255,255,255,0.7)', 'H');
      drawAtom(cx, cy, 18, '#38bdf8', 'C');
    } else if (selectedShape === 'trigonal-pyramidal') {
      ctx.beginPath();
      ctx.ellipse(cx, cy - 45, 16, 26, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(245, 158, 11, 0.25)';
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);
      ctx.fill();
      ctx.stroke();
      ctx.setLineDash([]);

      drawBond(cx, cy, cx - 65, cy + 60);
      drawBond(cx, cy, cx + 65, cy + 60);
      drawBond(cx, cy, cx, cy + 70);
      drawAtom(cx - 65, cy + 60, 13, '#fff', 'H');
      drawAtom(cx + 65, cy + 60, 13, '#fff', 'H');
      drawAtom(cx, cy + 70, 13, '#fff', 'H');
      drawAtom(cx, cy, 18, '#38bdf8', 'N');
    } else if (selectedShape === 'bent') {
      ctx.beginPath();
      ctx.ellipse(cx - 30, cy - 40, 14, 22, -0.4, 0, Math.PI * 2);
      ctx.ellipse(cx + 30, cy - 40, 14, 22, 0.4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(245, 158, 11, 0.25)';
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.5;
      ctx.fill();
      ctx.stroke();

      drawBond(cx, cy, cx - 65, cy + 55);
      drawBond(cx, cy, cx + 65, cy + 55);
      drawAtom(cx - 65, cy + 55, 13, '#fff', 'H');
      drawAtom(cx + 65, cy + 55, 13, '#fff', 'H');
      drawAtom(cx, cy, 18, '#f43f5e', 'O');
    } else {
      drawBond(cx, cy - 80, cx, cy + 80);
      drawBond(cx - 75, cy, cx + 75, cy);
      drawBond(cx - 45, cy - 35, cx + 45, cy + 35, 'rgba(56,189,248,0.6)');
      drawAtom(cx, cy - 80, 12, '#10b981', 'F');
      drawAtom(cx, cy + 80, 12, '#10b981', 'F');
      drawAtom(cx - 75, cy, 12, '#10b981', 'F');
      drawAtom(cx + 75, cy, 12, '#10b981', 'F');
      drawAtom(cx - 45, cy - 35, 10, '#10b981', 'F');
      drawAtom(cx + 45, cy + 35, 10, '#10b981', 'F');
      drawAtom(cx, cy, 18, '#f59e0b', 'S');
    }
  }, [selectedShape]);

  const currentInfo = shapeData[selectedShape] || shapeData.tetrahedral;

  return (
    <div className="lab-container">
      <h3 className="lab-title"><i className="fa-solid fa-shapes"></i> Interactive 3D VSEPR Geometry Visualizer</h3>
      <div className="vsepr-visualizer-box">
        <div className="vsepr-canvas-wrapper">
          <canvas ref={canvasRef} width="360" height="260" id="vsepr-canvas"></canvas>
        </div>
        <div className="vsepr-ctrls">
          <label className="vsepr-select-label" htmlFor="vsepr-shape-select">Select Molecular Geometry / Molecule:</label>
          <select
            id="vsepr-shape-select"
            className="vsepr-select"
            value={selectedShape}
            onChange={(e) => setSelectedShape(e.target.value)}
          >
            <option value="linear">Linear (BeCl2, CO2 - 180°)</option>
            <option value="trigonal-planar">Trigonal Planar (BF3, BCl3 - 120°)</option>
            <option value="tetrahedral">Tetrahedral (CH4, CCl4 - 109.5°)</option>
            <option value="trigonal-pyramidal">Trigonal Pyramidal (NH3 - 107°)</option>
            <option value="bent">Bent / V-shaped (H2O - 104.5°)</option>
            <option value="trigonal-bipyramidal">Trigonal Bipyramidal (PCl5 - 90° &amp; 120°)</option>
            <option value="see-saw">See-saw (SF4 - Distorted)</option>
            <option value="t-shaped">T-shaped (ClF3)</option>
            <option value="octahedral">Octahedral (SF6 - 90°)</option>
            <option value="square-planar">Square Planar (XeF4 - 90°)</option>
          </select>

          <div className="vsepr-meta-card">
            <div className="vsepr-meta-row">
              <span>Type &amp; Bond Pairs:</span>
              <strong>{currentInfo.type}</strong>
            </div>
            <div className="vsepr-meta-row">
              <span>Ideal Angle:</span>
              <strong>{currentInfo.angle}</strong>
            </div>
            <div className="vsepr-meta-row">
              <span>Textbook Example:</span>
              <strong>{currentInfo.example}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
