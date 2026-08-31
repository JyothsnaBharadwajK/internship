/**
 * Comprehensive Context-aware RAG Semantic Matching Engine for NCERT Class 11 Chemistry Chapter 4
 * Grounded in kech104.pdf (Chemical Bonding & Molecular Structure)
 */

export const MOLECULE_KNOWLEDGE = {
  'becl2': { name:'Beryllium Chloride (BeCl₂)', bp:2, lp:0, geom:'Linear', angle:'180°', hyb:'sp', dipole:'0 D (Non-polar, symmetric vectors cancel)', fc:'Be: 0, Cl: 0', cit:'NCERT Section 4.4 Table 4.6 (Page 114)', exp:'Be forms 2 bond pairs with no lone pairs (Steric No. = 2). Orbitals adopt linear orientation at 180°.' },
  'bf3': { name:'Boron Trifluoride (BF₃)', bp:3, lp:0, geom:'Trigonal Planar', angle:'120°', hyb:'sp²', dipole:'0 D (Non-polar, 3 equal planar vectors sum to 0)', fc:'B: 0, F: 0', cit:'NCERT Section 4.4 Table 4.6 (Page 114)', exp:'Boron forms 3 bond pairs at 120° in a single plane. Incomplete octet on Boron (6 valence electrons).' },
  'ch4': { name:'Methane (CH₄)', bp:4, lp:0, geom:'Tetrahedral', angle:'109.5°', hyb:'sp³', dipole:'0 D (Non-polar, symmetric tetrahedral cancellation)', fc:'C: 0, H: 0', cit:'NCERT Section 4.4 Table 4.6 (Page 114)', exp:'Carbon forms 4 equivalent σ-bonds via sp³ hybrid orbitals directed to the 4 corners of a regular tetrahedron.' },
  'nh3': { name:'Ammonia (NH₃)', bp:3, lp:1, geom:'Trigonal Pyramidal', angle:'107.3° (compressed from 109.5° by 1 lone pair)', hyb:'sp³', dipole:'1.47 D (Polar, lone pair dipole reinforces N-H bond dipoles)', fc:'N: 0, H: 0', cit:'NCERT Section 4.3.6 & 4.4 Table 4.7 (Page 112, 115)', exp:'Nitrogen has 3 bond pairs + 1 lone pair. Repulsion order: lp-bp > bp-bp compresses the H-N-H angle to 107.3°.' },
  'h2o': { name:'Water (H₂O)', bp:2, lp:2, geom:'Bent / V-shaped / Angular', angle:'104.5° (compressed from 109.5° by 2 lone pairs)', hyb:'sp³', dipole:'1.85 D (Polar, vector sum of two O-H bonds & 2 lone pairs)', fc:'O: 0, H: 0', cit:'NCERT Section 4.3.6 & 4.4 Table 4.7 (Page 112, 115)', exp:'Oxygen has 2 bond pairs + 2 lone pairs. Strong lp-lp repulsion compresses the H-O-H bond angle from ideal 109.5° to 104.5°.' },
  'pcl5': { name:'Phosphorus Pentachloride (PCl₅)', bp:5, lp:0, geom:'Trigonal Bipyramidal (TBP)', angle:'Equatorial: 120°, Axial: 90°', hyb:'sp³d (uses 3s, 3px, 3py, 3pz, 3dz²)', dipole:'0 D (Non-polar in gas/vapor phase)', fc:'P: 0, Cl: 0', cit:'NCERT Section 4.6.4 (Page 121)', exp:'The 2 axial P-Cl bonds (240 pm) are longer and weaker than the 3 equatorial P-Cl bonds (202 pm) due to greater repulsion at 90° from equatorial pairs.' },
  'sf6': { name:'Sulfur Hexafluoride (SF₆)', bp:6, lp:0, geom:'Octahedral', angle:'90°', hyb:'sp³d² (uses 3s, 3px, 3py, 3pz, 3dz², 3dx²-y²)', dipole:'0 D (Non-polar, perfectly symmetrical)', fc:'S: 0, F: 0', cit:'NCERT Section 4.6.4 (Page 122)', exp:'Sulfur expands its octet to accommodate 12 valence electrons in 6 equivalent sp³d² hybrid orbitals directed to the corners of an octahedron.' },
  'if7': { name:'Iodine Heptafluoride (IF₇)', bp:7, lp:0, geom:'Pentagonal Bipyramidal', angle:'Planar: 72°, Axial: 90°', hyb:'sp³d³', dipole:'0 D (Non-polar, highly symmetrical)', fc:'I: 0, F: 0', cit:'NCERT Section 4.6 (Page 122)', exp:'Iodine shares 7 electrons with 7 fluorine atoms. 5 equatorial F atoms lie in a pentagon (72°) and 2 axial F atoms lie above and below (90°).' },
  'xef2': { name:'Xenon Difluoride (XeF₂)', bp:2, lp:3, geom:'Linear (Electron geometry: Trigonal Bipyramidal)', angle:'180°', hyb:'sp³d', dipole:'0 D (Non-polar, 3 equatorial lone pairs cancel at 120°)', fc:'Xe: 0, F: 0', cit:'NCERT Section 4.4 Table 4.7 (Page 115)', exp:'Xe has 8 valence e⁻ + 2 from F = 10 e⁻ (5 pairs). The 3 lone pairs occupy equatorial positions to minimize 90° repulsions, leaving the 2 F atoms axial at 180°.' },
  'xef4': { name:'Xenon Tetrafluoride (XeF₄)', bp:4, lp:2, geom:'Square Planar (Electron geometry: Octahedral)', angle:'90°', hyb:'sp³d²', dipole:'0 D (Non-polar, trans lone pairs and bond dipoles cancel)', fc:'Xe: 0, F: 0', cit:'NCERT Section 4.4 Table 4.7 (Page 115)', exp:'Xe has 8 valence e⁻ + 4 from F = 12 e⁻ (6 pairs). The 2 lone pairs occupy opposite axial trans positions (180°), producing a flat square planar shape.' },
  'xef6': { name:'Xenon Hexafluoride (XeF₆)', bp:6, lp:1, geom:'Distorted Octahedral / Capped Octahedral', angle:'< 90°', hyb:'sp³d³', dipole:'Non-zero (Polar)', fc:'Xe: 0, F: 0', cit:'NCERT Section 4.4 Table 4.7 (Page 115)', exp:'Xe has 6 bond pairs + 1 stereochemically active lone pair (Steric No. = 7, sp³d³), distorting the regular octahedral symmetry.' },
  'clf3': { name:'Chlorine Trifluoride (ClF₃)', bp:3, lp:2, geom:'T-shaped (Electron geometry: Trigonal Bipyramidal)', angle:'87.5° (< 90° due to lone pair push)', hyb:'sp³d', dipole:'0.56 D (Polar)', fc:'Cl: 0, F: 0', cit:'NCERT Section 4.4 Table 4.7 (Page 115)', exp:'Central Cl atom has 3 bond pairs + 2 lone pairs. Both lone pairs occupy equatorial positions in TBP, giving a bent T-shape.' },
  'sf4': { name:'Sulfur Tetrafluoride (SF₄)', bp:4, lp:1, geom:'See-saw / Distorted Tetrahedral', angle:'Axial: 173° (< 180°), Equatorial: 102° (< 120°)', hyb:'sp³d', dipole:'0.63 D (Polar)', fc:'S: 0, F: 0', cit:'NCERT Section 4.4 Table 4.7 (Page 115)', exp:'Sulfur has 4 bond pairs + 1 lone pair. The lone pair occupies an equatorial position in TBP to minimize 90° repulsions.' },
  'brf5': { name:'Bromine Pentafluoride (BrF₅)', bp:5, lp:1, geom:'Square Pyramidal', angle:'84.8° (< 90°)', hyb:'sp³d²', dipole:'1.51 D (Polar)', fc:'Br: 0, F: 0', cit:'NCERT Section 4.4 Table 4.7 (Page 115)', exp:'Bromine has 5 bond pairs + 1 lone pair (Steric No. = 6). The single lone pair repels the four basal bonds upward.' },
  'co2': { name:'Carbon Dioxide (CO₂)', bp:4, lp:0, geom:'Linear (O=C=O)', angle:'180°', hyb:'sp', dipole:'0 D (Non-polar, two equal and opposite C=O dipoles cancel)', fc:'C: 0, both O: 0', cit:'NCERT Section 4.3.5 & 4.3.6 (Page 110, 111)', exp:'Carbon forms 2 σ-bonds and 2 π-bonds (sp hybridization). Bond length is 115 pm, intermediate between C=O (121 pm) and C≡O (110 pm) due to resonance.' },
  'o3': { name:'Ozone (O₃)', bp:3, lp:1, geom:'Bent / Angular', angle:'117°', hyb:'sp²', dipole:'0.53 D (Polar)', fc:'Central O(1): +1, Double-bonded O(2): 0, Single-bonded O(3): -1', cit:'NCERT Section 4.1.4 & 4.3.5 (Page 104, 109)', exp:'Ozone is a resonance hybrid of 2 canonical structures with identical O-O bond lengths of 128 pm (between single 148 pm and double 121 pm).' },
  'co3': { name:'Carbonate Ion (CO₃²⁻)', bp:4, lp:0, geom:'Trigonal Planar', angle:'120°', hyb:'sp²', dipole:'0 D', fc:'C: 0, one O: 0, two O: -1 each (Net charge = -2)', cit:'NCERT Section 4.3.5 (Page 110)', exp:'Equal resonance hybrid of 3 canonical structures. All 3 C-O bonds are completely equivalent with a bond order of 4/3 = 1.33.' },
  'no2': { name:'Nitrogen Dioxide / Nitrite (NO₂ / NO₂⁻)', bp:3, lp:1, geom:'Bent / Angular', angle:'NO₂: 134°, NO₂⁻: 115°', hyb:'sp²', dipole:'Polar', fc:'NO₂ has an odd electron (free radical); NO₂⁻ has formal charge N: 0, O: 0 and -1', cit:'NCERT Section 4.1.5 & Problem 4.2 (Page 104, 105)', exp:'NO₂ is an odd-electron molecule (17 valence e⁻). NO₂⁻ has 18 valence electrons with resonance between N=O and N-O.' },
  'o2': { name:'Dioxygen (O₂)', bp:2, lp:4, geom:'Linear', angle:'180°', hyb:'MOT treatment', dipole:'0 D', fc:'Both O: 0', cit:'NCERT Section 4.7.4 (Page 125)', exp:'Total 16 electrons. MO configuration: σ1s² σ*1s² σ2s² σ*2s² σ2pz² (π2px² = π2py²) (π*2px¹ = π*2py¹). 2 unpaired electrons make O₂ Paramagnetic! Bond Order = (10 - 6)/2 = 2.0.' },
  'n2': { name:'Dinitrogen (N₂)', bp:3, lp:2, geom:'Linear (N≡N)', angle:'180°', hyb:'sp', dipole:'0 D', fc:'Both N: 0', cit:'NCERT Section 4.7.4 (Page 125)', exp:'Total 14 electrons. MO configuration: σ1s² σ*1s² σ2s² σ*2s² (π2px² = π2py²) σ2pz². All electrons paired → Diamagnetic! Bond Order = (10 - 4)/2 = 3.0 (Highest bond enthalpy: 946 kJ/mol).' }
};

export function retrieveTextbookAnswer(query) {
  const q = query.toLowerCase().trim();
  const qClean = q.replace(/[^a-z0-9\s]/g, ' ');

  // 1. Molecule Lookup
  for (const [key, mol] of Object.entries(MOLECULE_KNOWLEDGE)) {
    const keyRegex = new RegExp(`\\b${key}\\b`, 'i');
    if (keyRegex.test(qClean) || q.includes(key)) {
      return {
        answer: `<strong>🧪 Structure &amp; Bonding Breakdown: ${mol.name}</strong><br/><br/>
        • <strong>Hybridisation:</strong> ${mol.hyb}<br/>
        • <strong>VSEPR Shape:</strong> ${mol.geom} (${mol.bp} BP + ${mol.lp} LP)<br/>
        • <strong>Bond Angle:</strong> ${mol.angle}<br/>
        • <strong>Dipole Moment:</strong> ${mol.dipole}<br/>
        • <strong>Formal Charges:</strong> ${mol.fc}<br/><br/>
        ${mol.exp}`,
        citation: mol.cit
      };
    }
  }

  // 2. MOT / O2 Paramagnetism
  if (q.includes('paramagnet') || q.includes('paramagnetic') || (q.includes('mot') && q.includes('o2')) || q.includes('oxygen paramagnetic')) {
    return {
      answer: `<strong>Why is O₂ Paramagnetic according to Molecular Orbital Theory (MOT)?</strong><br/><br/>
      1. <strong>Valence Bond Theory Failure:</strong> VBT predicts all electrons in O₂ are paired (O=O double bond), which would make liquid oxygen diamagnetic. However, liquid oxygen is experimentally paramagnetic.<br/><br/>
      2. <strong>MOT Electron Configuration (16 Electrons):</strong><br/>
      <code>σ1s² &lt; σ*1s² &lt; σ2s² &lt; σ*2s² &lt; σ2pz² &lt; (π2px² = π2py²) &lt; (π*2px¹ = π*2py¹)</code><br/><br/>
      3. <strong>Hund's Rule in Degenerate Orbitals:</strong> The last 2 electrons occupy the two degenerate antibonding orbitals <code>π*2px</code> and <code>π*2py</code> singly with parallel spins (1 electron in each).<br/><br/>
      4. <strong>Bond Order:</strong> B.O. = (Nb - Na)/2 = (10 - 6)/2 = <strong>2.0</strong>.<br/>
      Because of the <strong>2 unpaired electrons</strong> in antibonding orbitals, O₂ is strongly <strong>paramagnetic</strong>.`,
      citation: 'NCERT Section 4.7.4 (Page 125) — Molecular Orbital Theory'
    };
  }

  // 3. VSEPR Theory & Repulsion Order
  if (q.includes('vsepr') || (q.includes('repulsion') && q.includes('order')) || q.includes('lone pair repulsion')) {
    return {
      answer: `<strong>Valence Shell Electron Pair Repulsion (VSEPR) Theory (Nyholm &amp; Gillespie, 1957):</strong><br/><br/>
      • <strong>Core Postulate:</strong> The geometry of a molecule depends on total valence shell electron pairs (bonded + non-bonded) around the central atom, orienting to minimize repulsion.<br/><br/>
      • <strong>Repulsion Hierarchy:</strong><br/>
      <code>Lone Pair - Lone Pair (lp-lp) &gt; Lone Pair - Bond Pair (lp-bp) &gt; Bond Pair - Bond Pair (bp-bp)</code><br/><br/>
      • <strong>Angle Compression Examples in sp³:</strong><br/>
      - CH₄ (0 LP) = <strong>109.5°</strong> (Regular Tetrahedral)<br/>
      - NH₃ (1 LP) = <strong>107.3°</strong> (Trigonal Pyramidal)<br/>
      - H₂O (2 LP) = <strong>104.5°</strong> (Bent / Angular)`,
      citation: 'NCERT Section 4.4 (Page 113) — VSEPR Theory'
    };
  }

  // 4. Axial vs Equatorial in PCl5
  if (q.includes('pcl5') || (q.includes('axial') && q.includes('equatorial'))) {
    return {
      answer: `<strong>Why are Axial P-Cl bonds in PCl₅ longer than Equatorial bonds?</strong><br/><br/>
      In <strong>PCl₅ (sp³d hybridisation, Trigonal Bipyramidal)</strong>:<br/><br/>
      • <strong>3 Equatorial P-Cl bonds</strong> (length = <strong>202 pm</strong>) lie in a single plane at <strong>120°</strong>.<br/>
      • <strong>2 Axial P-Cl bonds</strong> (length = <strong>240 pm</strong>) lie perpendicular at <strong>90°</strong> to the equatorial plane.<br/><br/>
      • <strong>Repulsion Cause:</strong> Axial pairs suffer greater repulsive interaction at 90° from 3 equatorial pairs. To minimize repulsion, axial bonds lengthen (240 pm) and become weaker.<br/>
      Hence upon heating: <code>PCl₅(g) → PCl₃(g) + Cl₂(g)</code>.`,
      citation: 'NCERT Section 4.6.4 (Page 121) — Hybridisation in PCl5'
    };
  }

  // 5. Sigma vs Pi Bond Differences
  if ((q.includes('sigma') && q.includes('pi')) || q.includes('difference between sigma and pi') || q.includes('overlap')) {
    return {
      answer: `<strong>Key Differences between σ and π Bonds:</strong><br/><br/>
      • <strong>σ (Sigma) Bond:</strong> Formed by axial (head-on) overlap along internuclear axis. Large extent of overlap → strong bond. Free rotation permitted. Always the first bond.<br/>
      • <strong>π (Pi) Bond:</strong> Formed by lateral (sideways) overlap of parallel p-orbitals perpendicular to axis. Smaller extent of overlap → weaker bond. Restricted rotation. Always forms in addition to a σ bond.`,
      citation: 'NCERT Section 4.5.3 (Page 119) — Types of Overlapping'
    };
  }

  // 6. Dipole Moment: NH3 vs NF3
  if ((q.includes('nh3') && q.includes('nf3')) || (q.includes('dipole') && (q.includes('ammonia') || q.includes('nf3')))) {
    return {
      answer: `<strong>Why is the Dipole Moment of NH₃ (1.47 D) much greater than NF₃ (0.23 D)?</strong><br/><br/>
      Both NH₃ and NF₃ have identical <strong>Trigonal Pyramidal</strong> shapes with 1 lone pair (sp³):<br/><br/>
      • <strong>In NH₃ (μ = 1.47 D):</strong> Nitrogen is more electronegative than Hydrogen (N &gt; H). The 3 N-H bond dipoles point upwards towards nitrogen. The lone pair dipole also points upwards. Thus, <strong>all dipoles reinforce each other</strong>.<br/><br/>
      • <strong>In NF₃ (μ = 0.23 D):</strong> Fluorine is more electronegative than Nitrogen (F &gt; N). The 3 N-F bond dipoles point downwards, while the lone pair dipole points upwards. Thus, <strong>the lone pair dipole opposes and cancels out the resultant N-F bond dipoles</strong>.`,
      citation: 'NCERT Section 4.3.6 (Page 112) — Dipole Moment Comparison'
    };
  }

  // 7. Formal Charge
  if (q.includes('formal charge') || q.includes('calculate formal charge') || q.includes('f.c.')) {
    return {
      answer: `<strong>Formal Charge (F.C.) on an Atom in a Lewis Structure:</strong><br/><br/>
      <code>Formal Charge = V - N - (1/2)B</code><br/>
      • <strong>V:</strong> Total valence electrons in free isolated atom<br/>
      • <strong>N:</strong> Total non-bonding lone pair electrons on atom<br/>
      • <strong>B:</strong> Total bonding (shared) electrons on atom<br/><br/>
      <strong>Ozone (O₃) Example:</strong><br/>
      • Central O: 6 - 2 - (1/2)(6) = <strong>+1</strong><br/>
      • Double-bonded O: 6 - 4 - (1/2)(4) = <strong>0</strong><br/>
      • Single-bonded O: 6 - 6 - (1/2)(2) = <strong>-1</strong>`,
      citation: 'NCERT Section 4.1.4 (Page 104) — Formal Charge'
    };
  }

  // 8. Hydrogen Bonding
  if (q.includes('hydrogen bond') || q.includes('h-bond') || q.includes('nitrophenol') || q.includes('boiling point')) {
    return {
      answer: `<strong>Hydrogen Bonding (NCERT Section 4.9):</strong><br/><br/>
      • <strong>Intermolecular H-Bonding:</strong> Formed between separate molecules (H₂O, HF, NH₃, p-nitrophenol, ethanol). Increases boiling point and viscosity.<br/>
      • <strong>Intramolecular H-Bonding (Chelation):</strong> Formed within the same molecule (o-nitrophenol, salicylaldehyde). Lowers boiling point, making it steam volatile compared to p-nitrophenol.`,
      citation: 'NCERT Section 4.9 (Page 129) — Hydrogen Bonding'
    };
  }

  // 9. Limitations of Octet Rule
  if (q.includes('octet') && (q.includes('exception') || q.includes('limitation') || q.includes('drawback') || q.includes('incomplete') || q.includes('expanded'))) {
    return {
      answer: `<strong>Limitations of the Octet Rule (NCERT Section 4.1.5):</strong><br/><br/>
      1. <strong>Incomplete Octet:</strong> LiCl (2 e⁻), BeCl₂ (4 e⁻), BF₃ / AlCl₃ (6 e⁻).<br/>
      2. <strong>Odd-Electron Molecules:</strong> NO (11 e⁻), NO₂ (17 e⁻).<br/>
      3. <strong>Expanded Octet:</strong> PF₅ (10 e⁻), SF₆ (12 e⁻), IF₇ (14 e⁻), H₂SO₄ (12 e⁻) using vacant 3d orbitals.<br/>
      4. <strong>Noble Gas Compounds:</strong> XeF₂, XeF₄, XeOF₄ form despite noble gas configurations.<br/>
      5. <strong>Shape and Energy Silence:</strong> Cannot predict 3D molecular geometry or bond strengths.`,
      citation: 'NCERT Section 4.1.5 (Page 105) — Limitations of the Octet Rule'
    };
  }

  // 10. General NCERT Chapter 4 RAG Fallback
  return {
    answer: `Based on <strong>NCERT Class 11 Chemistry Chapter 4 (Chemical Bonding &amp; Molecular Structure)</strong>:<br/><br/>
    Chemical bonding represents nature's mechanism of lowering overall potential energy to attain electronic stability. Atoms transfer electrons (forming ionic lattices with high lattice enthalpies) or share electron pairs (forming covalent bonds with directional orbital overlaps and hybridized geometries).`,
    citation: 'NCERT Class 11 Chemistry — Unit 4 (36 Pages)'
  };
}
