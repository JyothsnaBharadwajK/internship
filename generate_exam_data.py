import json

# Comprehensive NEET PYQs for Unit 4 Chemical Bonding & Molecular Structure
neet_pyqs = [
    {
        "id": "pyq-2024",
        "year": "NEET 2024",
        "question": "Which of the following pairs of species have identical bond order and are isoelectronic?",
        "options": ["N2 and O2", "CO and NO+", "O2- and B2", "CN- and NO"],
        "answer": "CO and NO+",
        "solution": "Both CO and NO⁺ have 14 electrons each (Isoelectronic). Electronic configuration gives Bond Order = (10 - 4)/2 = 3.0. Hence, both have an identical bond order of 3."
    },
    {
        "id": "pyq-2023",
        "year": "NEET 2023",
        "question": "Among the following, which one has a see-saw molecular geometry according to VSEPR theory?",
        "options": ["SF4", "XeF4", "CCl4", "NH4+"],
        "answer": "SF4",
        "solution": "In SF4, central sulfur has 6 valence electrons: 4 bond pairs and 1 lone pair (AB4E type). The lone pair occupies an equatorial position in a trigonal bipyramid, yielding a see-saw geometry."
    },
    {
        "id": "pyq-2022",
        "year": "NEET 2022",
        "question": "Which of the following molecules represents the order of hybridisation sp2, sp2, sp, sp from left to right atoms?",
        "options": [
            "CH2=CH-C≡CH",
            "CH2=CH-CH=CH2",
            "CH≡C-C≡CH",
            "CH3-CH=CH-CH3"
        ],
        "answer": "CH2=CH-C≡CH",
        "solution": "In CH2=CH-C≡CH: C1 is sp2 (double bond), C2 is sp2 (double bond), C3 is sp (triple bond), and C4 is sp (triple bond)."
    },
    {
        "id": "pyq-2021",
        "year": "NEET 2021",
        "question": "The correct sequence of increasing bond dissociation enthalpy for halogens is:",
        "options": [
            "I2 < Br2 < F2 < Cl2",
            "I2 < F2 < Br2 < Cl2",
            "Cl2 < Br2 < F2 < I2",
            "F2 < Cl2 < Br2 < I2"
        ],
        "answer": "I2 < F2 < Br2 < Cl2",
        "solution": "Due to very small atomic size and high inter-electronic repulsions between non-bonding lone pairs on adjacent fluorine atoms, the F-F bond is significantly weaker than Cl-Cl and Br-Br. Thus, the order is I2 < F2 < Br2 < Cl2."
    },
    {
        "id": "pyq-2020",
        "year": "NEET 2020",
        "question": "Which of the following diatomic species contains only π (pi) bonds according to Molecular Orbital Theory?",
        "options": ["C2", "N2", "O2", "Be2"],
        "answer": "C2",
        "solution": "C2 has 12 electrons. MO configuration: KK (σ2s)² (σ*2s)² (π2px)² (π2py)². All 4 valence electrons are present in the two degenerate π molecular orbitals, meaning the double bond in C2 consists solely of two π bonds."
    },
    {
        "id": "pyq-2019",
        "year": "NEET 2019",
        "question": "Which of the following molecules has maximum dipole moment?",
        "options": ["NH3", "NF3", "BF3", "CO2"],
        "answer": "NH3",
        "solution": "In NH3 (μ = 1.47 D), the orbital dipole of the nitrogen lone pair points in the same direction as the resultant dipole of the three N-H bonds. In NF3 (μ = 0.23 D), the lone pair opposes the N-F dipoles. BF3 and CO2 have μ = 0 D."
    },
    {
        "id": "pyq-2018",
        "year": "NEET 2018",
        "question": "In PCl5, the hybridization of P is sp3d. Why are the axial bonds longer than the equatorial bonds?",
        "options": [
            "Axial bonds suffer greater repulsion from three equatorial bonds at 90°",
            "Equatorial bonds suffer greater repulsion",
            "Axial bonds are pure p-orbitals",
            "PCl5 is non-polar"
        ],
        "answer": "Axial bonds suffer greater repulsion from three equatorial bonds at 90°",
        "solution": "The two axial P-Cl bonds experience repulsion from three equatorial bonds at 90°, whereas equatorial bonds only have two 90° repulsions. Hence, axial bonds (240 pm) lengthen to reduce repulsion compared to equatorial bonds (202 pm)."
    }
]

# High Yield NCERT Concepts & Traps
high_yield_ncert = [
    {
        "topic": "MOT Bond Order & Diamagnetic/Paramagnetic Species",
        "core_fact": "Liquid O2 is paramagnetic with 2 unpaired electrons in degenerate (π*2px)¹ (π*2py)¹ orbitals.",
        "neet_trap": "NEET Trap: F2 and O2^2- both have 18 electrons and Bond Order = 1.0 (Diamagnetic). Do not confuse O2 (16 e-, paramagnetic, B.O.=2) with O2^2- (18 e-, diamagnetic, B.O.=1)."
    },
    {
        "topic": "VSEPR Shapes with Lone Pairs",
        "core_fact": "Repulsion hierarchy: lp-lp > lp-bp > bp-bp. Lone pairs occupy equatorial positions in TBP (sp3d) to minimize 90° repulsions.",
        "neet_trap": "NEET Trap: ClF3 has 3 bond pairs and 2 lone pairs -> T-shaped (NOT trigonal planar). XeF4 has 4 bond pairs and 2 lone pairs -> Square planar (NOT tetrahedral)."
    },
    {
        "topic": "Isoelectronic Species Rule",
        "core_fact": "Species with identical total electron counts have identical Bond Orders and similar MO configurations.",
        "neet_trap": "NEET Trap: N2 (14 e-), CO (14 e-), NO+ (14 e-), CN- (14 e-) ALL have Bond Order = 3.0 and are Diamagnetic."
    },
    {
        "topic": "Dipole Moment: NH3 vs NF3",
        "core_fact": "Dipole moment of NH3 (1.47 D) is much greater than NF3 (0.23 D).",
        "neet_trap": "NEET Trap: In NH3, the N lone pair reinforces N-H bond dipoles. In NF3, fluorine is more electronegative than nitrogen, so N-F dipoles oppose the lone pair dipole!"
    },
    {
        "topic": "Hydrogen Bonding Boiling Point Anomalies",
        "core_fact": "Intermolecular H-bonding increases boiling point and water solubility (e.g. H2O, ethanol, p-nitrophenol).",
        "neet_trap": "NEET Trap: o-Nitrophenol has Intramolecular H-bonding (chelation) -> Steam volatile, lower boiling point than p-nitrophenol."
    },
    {
        "topic": "Halogen Bond Dissociation Enthalpy",
        "core_fact": "Order of Bond Enthalpy: Cl2 > Br2 > F2 > I2.",
        "neet_trap": "NEET Trap: F2 does NOT have the highest bond energy. Extreme lone-pair repulsion on tiny Fluorine atoms weakens the F-F bond (158.8 kJ/mol vs 242.6 kJ/mol for Cl2)."
    }
]

# Formula Sheet
formula_sheet = [
    {
        "quantity": "Formal Charge (F.C.)",
        "formula": "F.C. = V - N - (1/2)B",
        "unit": "Dimensionless (Charge units)"
    },
    {
        "quantity": "Electric Dipole Moment (μ)",
        "formula": "μ = Q × r",
        "unit": "Debye (1 D = 3.33564 × 10⁻³⁰ C·m)"
    },
    {
        "quantity": "MOT Bond Order",
        "formula": "B.O. = (Nb - Na) / 2",
        "unit": "Dimensionless"
    },
    {
        "quantity": "Average Bond Enthalpy",
        "formula": "ΔaH_avg = Σ(ΔH_dissoc) / n_bonds",
        "unit": "kJ · mol⁻¹"
    },
    {
        "quantity": "Lattice Enthalpy (Born-Haber)",
        "formula": "Δ_subH + (1/2)Δ_dissH + Δ_iH + Δ_egH + U = 0",
        "unit": "kJ · mol⁻¹"
    },
    {
        "quantity": "Magnetic Moment (Spin-only)",
        "formula": "μ_s = √(n(n + 2))",
        "unit": "Bohr Magneton (BM)"
    },
    {
        "quantity": "Percentage Ionic Character (Hannay-Smith)",
        "formula": "% Ionic = 16|χA - χB| + 3.5(χA - χB)²",
        "unit": "Percentage (%)"
    }
]

with open('neet_pyqs.json', 'w', encoding='utf-8') as f:
    json.dump(neet_pyqs, f, indent=2)

with open('high_yield.json', 'w', encoding='utf-8') as f:
    json.dump(high_yield_ncert, f, indent=2)

with open('formula_sheet.json', 'w', encoding='utf-8') as f:
    json.dump(formula_sheet, f, indent=2)

print("Created neet_pyqs.json, high_yield.json, and formula_sheet.json successfully.")
