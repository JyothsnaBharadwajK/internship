import json

with open('bonding_data.json', encoding='utf-8') as f:
    bonding_data = json.load(f)

modules = bonding_data.get("modules", [])

# Map module items to rich topics with analogies, takeaways, and structured breakdowns
topics_list = []
flashcards_list = []
quiz_questions = []
revision_data = {
    "definitions": [],
    "formulas": [],
    "key_differences": [],
    "exam_tips": []
}

# Rich simple analogies and takeaways for each topic
topic_enhancements = {
    "kossel-lewis": {
        "analogy": "Think of atoms as people seeking financial stability (a full bank balance of 8 coins/octet). Some atoms donate coins (metals), some grab coins (halogens), and some enter a joint investment where they share coins (covalent bonds) so both reach complete stability.",
        "takeaway": "Bonding lowers potential energy. Atoms transfer or share valence electrons to reach the stable ns²np⁶ noble gas octet.",
        "key_terms": ["Octet Rule", "Lewis Symbols", "Formal Charge", "Expanded Octet", "Odd-electron species"],
        "diagram_type": "lewis-symbols"
    },
    "ionic-bond": {
        "analogy": "Like two powerful magnets of opposite poles snapping together tightly into a sturdy brick wall. Even if making individual magnets takes some initial effort, the energy released when locking the giant 3D magnetic grid together (lattice energy) holds the entire structure rock solid.",
        "takeaway": "Ionic bonds are electrostatic attractions between cations and anions. Crystal stability is governed by high Lattice Enthalpy overcoming ionization costs.",
        "key_terms": ["Ionization Enthalpy", "Electron Gain Enthalpy", "Lattice Enthalpy", "Coulombic Interaction"],
        "diagram_type": "ionic-lattice"
    },
    "bond-parameters": {
        "analogy": "A chemical bond is like a spring connecting two spheres. A triple bond is like three tight steel springs pulled close together (shorter bond length, harder to snap/higher enthalpy), whereas a single bond is a single looser spring (longer, easier to snap).",
        "takeaway": "Bond Order ∝ Bond Enthalpy ∝ 1 / Bond Length. Resonance averages bond parameters to minimize energy.",
        "key_terms": ["Bond Length", "Bond Angle", "Bond Enthalpy", "Bond Order", "Resonance Hybrid", "Dipole Moment", "Fajans' Rules"],
        "diagram_type": "dipole-vectors"
    },
    "vsepr-theory": {
        "analogy": "Imagine tying inflated balloons to a central knot. The balloon bodies push against each other and automatically spread out as far as possible in 3D space to avoid bumping (lp-lp repulsion is the biggest balloon, pushing bonds closer together).",
        "takeaway": "Electron pair repulsions (lp-lp > lp-bp > bp-bp) determine exact 3D molecular geometry (Linear, Trigonal Planar, Tetrahedral, Trigonal Bipyramidal, Octahedral).",
        "key_terms": ["VSEPR", "Lone Pair Repulsion", "Tetrahedral", "Trigonal Bipyramidal", "See-saw", "Bent Shape"],
        "diagram_type": "vsepr-canvas"
    },
    "valence-bond-theory": {
        "analogy": "Two hands shaking firmly directly along the line of sight form a very strong, tight grip (σ bond). In contrast, two people trying to high-five side-by-side with arms parallel only touch tips lightly above and below (π bond - weaker, easy to break).",
        "takeaway": "Covalent bonds form by overlapping half-filled atomic orbitals with opposite electron spins. Axial overlap gives strong σ bonds; lateral overlap gives π bonds.",
        "key_terms": ["Valence Bond Theory", "Potential Energy Curve", "σ (Sigma) Bond", "π (Pi) Bond", "Orbital Overlap"],
        "diagram_type": "orbital-overlap"
    },
    "hybridisation": {
        "analogy": "Like blending 1 scoop of vanilla ice cream with 3 scoops of chocolate ice cream into a blender to produce 4 perfectly identical, uniform soft-serve swirls of equal taste, size, and shape (sp³ hybrid orbitals).",
        "takeaway": "Atomic orbitals of similar energy intermix to form equivalent hybrid orbitals with directional symmetry and minimal repulsion.",
        "key_terms": ["Hybridisation", "sp (Linear)", "sp² (Trigonal Planar)", "sp³ (Tetrahedral)", "sp³d (Trigonal Bipyramidal)", "sp³d² (Octahedral)"],
        "diagram_type": "hybrid-geometry"
    },
    "mot-theory": {
        "analogy": "When two musical sound waves meet, they can add constructively into a louder harmony (lower energy Bonding MO) or clash destructively into noise cancellation with a dead silence node in the middle (higher energy Antibonding MO).",
        "takeaway": "Atomic orbitals combine into Bonding (σ, π) and Antibonding (σ*, π*) molecular orbitals across the whole molecule. Unpaired electrons in MOs cause Paramagnetism (like O₂).",
        "key_terms": ["LCAO", "Bonding Molecular Orbital", "Antibonding Molecular Orbital", "Bond Order = (Nb - Na)/2", "Paramagnetism vs Diamagnetism"],
        "diagram_type": "mot-diagram"
    },
    "hydrogen-bonding": {
        "analogy": "A tiny, partially exposed positive nucleus (Hydrogen) bonded to a greedy electron hog (Fluorine, Oxygen, Nitrogen) reaches out like a magnetic bridge to grab the lone pair of a neighbor molecule, creating an invisible intermolecular velcro network.",
        "takeaway": "Hydrogen bonding occurs between H bonded to high electronegativity atoms (F, O, N) and neighbor lone pairs. It gives water its anomalously high boiling point and sustains biological DNA helices.",
        "key_terms": ["Hydrogen Bond", "Intermolecular H-Bond", "Intramolecular H-Bond", "Anomalous Water Properties"],
        "diagram_type": "h-bond-network"
    },
    "ncert-solutions": {
        "analogy": "A master workbook containing direct answers, step-by-step calculations, and reasoning for every textbook exercise.",
        "takeaway": "Mastering the 40 NCERT exercises solidifies conceptual understanding across all bonding models.",
        "key_terms": ["NCERT Exercises", "Solved Problems", "Exam Practice"],
        "diagram_type": "solutions-bank"
    }
}

for mod in modules:
    t_id = mod.get("id")
    enh = topic_enhancements.get(t_id, {
        "analogy": "Structured understanding of chemical interactions.",
        "takeaway": "Fundamental chemistry concept from NCERT.",
        "key_terms": [],
        "diagram_type": "concept"
    })
    
    topic_obj = {
        "id": t_id,
        "title": mod.get("title"),
        "subtitle": mod.get("subtitle", ""),
        "icon": mod.get("icon", "atom"),
        "summary": mod.get("summary", ""),
        "subsections": mod.get("subsections", []),
        "key_formulas": mod.get("key_formulas", []),
        "table_data": mod.get("table_data", []),
        "vsepr_shapes": mod.get("vsepr_shapes", []),
        "exercises": mod.get("exercises", []),
        "explain_simply": {
            "analogy": enh["analogy"],
            "takeaway": enh["takeaway"],
            "key_terms": enh["key_terms"]
        },
        "diagram_type": enh["diagram_type"]
    }
    topics_list.append(topic_obj)

# Create Comprehensive Flashcards Bank
flashcards_data = [
    {
        "id": "fc-01",
        "topic": "Kössel-Lewis Approach",
        "topic_id": "kossel-lewis",
        "difficulty": "Easy",
        "front": "What is the Octet Rule?",
        "back": "Atoms combine either by transfer of valence electrons (gaining or losing) or by sharing of valence electrons in order to have an octet (eight electrons) in their valence shells to attain noble gas stability."
    },
    {
        "id": "fc-02",
        "topic": "Kössel-Lewis Approach",
        "topic_id": "kossel-lewis",
        "difficulty": "Medium",
        "front": "How is Formal Charge (F.C.) on an atom calculated?",
        "back": "Formal Charge = [Total valence electrons in free atom] - [Total non-bonding lone pair electrons] - (1/2) * [Total bonding shared electrons]. Formula: F.C. = V - N - (1/2)B."
    },
    {
        "id": "fc-03",
        "topic": "Kössel-Lewis Approach",
        "topic_id": "kossel-lewis",
        "difficulty": "Medium",
        "front": "What are three major limitations of the Octet Rule?",
        "back": "1. Incomplete octet of central atom (LiCl, BeH2, BCl3, BF3).\n2. Odd-electron molecules (NO, NO2).\n3. Expanded octet utilizing d-orbitals (PF5, SF6, H2SO4)."
    },
    {
        "id": "fc-04",
        "topic": "Ionic Bonding",
        "topic_id": "ionic-bond",
        "difficulty": "Easy",
        "front": "Define Lattice Enthalpy of an ionic solid.",
        "back": "The energy required to completely separate one mole of a solid ionic compound into its gaseous constituent ions (e.g., NaCl(s) → Na+(g) + Cl-(g); ΔlatticeH = +788 kJ/mol)."
    },
    {
        "id": "fc-05",
        "topic": "Bond Parameters",
        "topic_id": "bond-parameters",
        "difficulty": "Easy",
        "front": "What is the relationship between Bond Order, Bond Enthalpy, and Bond Length?",
        "back": "Higher Bond Order leads to higher Bond Dissociation Enthalpy and shorter Bond Length (Bond Order ∝ Bond Strength ∝ 1 / Bond Length)."
    },
    {
        "id": "fc-06",
        "topic": "Bond Parameters",
        "topic_id": "bond-parameters",
        "difficulty": "Hard",
        "front": "Why does NH3 have a much higher dipole moment (1.47 D) than NF3 (0.23 D)?",
        "back": "In NH3, the orbital dipole of the nitrogen lone pair reinforces the resultant dipole of the three N-H bonds. In NF3, fluorine is more electronegative than nitrogen, so the N-F bond dipoles oppose the lone pair dipole, resulting in a low net dipole."
    },
    {
        "id": "fc-07",
        "topic": "VSEPR Theory",
        "topic_id": "vsepr-theory",
        "difficulty": "Easy",
        "front": "What is the order of repulsive interactions in VSEPR theory?",
        "back": "Lone Pair - Lone Pair (lp - lp) > Lone Pair - Bond Pair (lp - bp) > Bond Pair - Bond Pair (bp - bp)."
    },
    {
        "id": "fc-08",
        "topic": "VSEPR Theory",
        "topic_id": "vsepr-theory",
        "difficulty": "Medium",
        "front": "Why is the bond angle in H2O 104.5° while in NH3 it is 107° (both derived from tetrahedral 109.5°)?",
        "back": "H2O has 2 lone pairs on oxygen causing strong lp-lp repulsion that compresses the bond angle to 104.5°. NH3 has only 1 lone pair, causing less compression (107°)."
    },
    {
        "id": "fc-09",
        "topic": "Valence Bond Theory",
        "topic_id": "valence-bond-theory",
        "difficulty": "Medium",
        "front": "How does a σ (sigma) bond differ from a π (pi) bond?",
        "back": "A σ bond is formed by end-to-end (head-on/axial) overlap of atomic orbitals along the internuclear axis (stronger, cylindrical symmetry). A π bond is formed by lateral (sideways) overlap perpendicular to the internuclear axis (weaker, electron density above and below axis)."
    },
    {
        "id": "fc-10",
        "topic": "Hybridisation",
        "topic_id": "hybridisation",
        "difficulty": "Easy",
        "front": "What is Hybridisation?",
        "back": "The process of intermixing atomic orbitals of slightly different energies to produce an entirely new set of equivalent orbitals with identical energy, shape, and directional properties."
    },
    {
        "id": "fc-11",
        "topic": "Hybridisation",
        "topic_id": "hybridisation",
        "difficulty": "Hard",
        "front": "Why are axial bonds longer and weaker than equatorial bonds in PCl5 (sp3d)?",
        "back": "In trigonal bipyramidal PCl5, the 2 axial P-Cl bonds experience greater repulsive forces at 90° from three equatorial bonds. To minimize repulsion, axial bonds lengthen (240 pm) compared to equatorial bonds (202 pm at 120°)."
    },
    {
        "id": "fc-12",
        "topic": "Molecular Orbital Theory",
        "topic_id": "mot-theory",
        "difficulty": "Medium",
        "front": "How does Molecular Orbital Theory (MOT) explain the paramagnetism of O2?",
        "back": "The electronic configuration of O2 shows two unpaired electrons in the degenerate antibonding π*2px¹ and π*2py¹ orbitals, which causes paramagnetic behavior."
    },
    {
        "id": "fc-13",
        "topic": "Molecular Orbital Theory",
        "topic_id": "mot-theory",
        "difficulty": "Easy",
        "front": "Why does He2 molecule not exist according to MOT?",
        "back": "He2 has 4 electrons: (σ1s)² (σ*1s)². Number of bonding electrons Nb = 2, antibonding Na = 2. Bond Order = (2 - 2)/2 = 0. A bond order of zero means no net binding force, so He2 cannot exist."
    },
    {
        "id": "fc-14",
        "topic": "Hydrogen Bonding",
        "topic_id": "hydrogen-bonding",
        "difficulty": "Medium",
        "front": "Distinguish between Intermolecular and Intramolecular Hydrogen Bonding with examples.",
        "back": "Intermolecular H-bonding occurs between two separate molecules (e.g., HF, H2O, ethanol), causing higher boiling points. Intramolecular H-bonding occurs within the same molecule (e.g., o-nitrophenol, salicylic acid)."
    }
]

# Create Comprehensive Adaptive Quiz Bank (MCQs, conceptual, true/false)
quiz_data = [
    {
        "id": "q-01",
        "topic": "Kössel-Lewis Approach",
        "topic_id": "kossel-lewis",
        "difficulty": "easy",
        "type": "mcq",
        "question": "Which of the following molecules violates the octet rule due to an incomplete octet on the central atom?",
        "options": ["CCl4", "BF3", "CH4", "CO2"],
        "answer": "BF3",
        "explanation": "In BF3, Boron has only 3 valence electrons and shares 3 pairs with Fluorine, having only 6 electrons in its valence shell (incomplete octet)."
    },
    {
        "id": "q-02",
        "topic": "Kössel-Lewis Approach",
        "topic_id": "kossel-lewis",
        "difficulty": "medium",
        "type": "mcq",
        "question": "What is the formal charge on the central oxygen atom in the ozone (O3) molecule?",
        "options": ["0", "+1", "-1", "+2"],
        "answer": "+1",
        "explanation": "For central O: Valence electrons = 6, Lone pair electrons = 2, Shared bonding electrons = 6 (one double bond + one single bond). Formal Charge = 6 - 2 - (1/2)(6) = +1."
    },
    {
        "id": "q-03",
        "topic": "Ionic Bonding",
        "topic_id": "ionic-bond",
        "difficulty": "easy",
        "type": "mcq",
        "question": "Which combination of enthalpy factors most strongly favors the formation of a stable ionic compound?",
        "options": [
            "High ionization enthalpy and low lattice enthalpy",
            "Low ionization enthalpy, high negative electron gain enthalpy, and high lattice enthalpy",
            "Positive electron gain enthalpy and low lattice enthalpy",
            "High ionization enthalpy and high electronegativity difference only"
        ],
        "answer": "Low ionization enthalpy, high negative electron gain enthalpy, and high lattice enthalpy",
        "explanation": "Low ionization enthalpy allows easy cation formation, high negative electron gain enthalpy releases energy upon anion formation, and high lattice enthalpy stabilizes the 3D crystal lattice."
    },
    {
        "id": "q-04",
        "topic": "Bond Parameters",
        "topic_id": "bond-parameters",
        "difficulty": "medium",
        "type": "mcq",
        "question": "Which of the following molecules has a net dipole moment of zero (μ = 0 D)?",
        "options": ["H2O", "NH3", "BF3", "SO2"],
        "answer": "BF3",
        "explanation": "BF3 has a symmetrical trigonal planar geometry (120° bond angles). The three equal B-F bond dipoles cancel out completely by vector addition, giving μ = 0 D."
    },
    {
        "id": "q-05",
        "topic": "VSEPR Theory",
        "topic_id": "vsepr-theory",
        "difficulty": "easy",
        "type": "mcq",
        "question": "According to VSEPR theory, what is the shape of a molecule with 4 bonding pairs and 0 lone pairs around the central atom (AB4 type)?",
        "options": ["Square planar", "Tetrahedral", "Trigonal bipyramidal", "See-saw"],
        "answer": "Tetrahedral",
        "explanation": "An AB4 molecule (like CH4, CCl4, SiF4) arranges 4 bond pairs symmetrically in 3D at 109.5° bond angles to give a tetrahedral shape."
    },
    {
        "id": "q-06",
        "topic": "VSEPR Theory",
        "topic_id": "vsepr-theory",
        "difficulty": "medium",
        "type": "mcq",
        "question": "What is the molecular geometry of SF4 (which has 4 bond pairs and 1 lone pair on sulfur)?",
        "options": ["Tetrahedral", "Square planar", "See-saw (Distorted tetrahedron)", "T-shaped"],
        "answer": "See-saw (Distorted tetrahedron)",
        "explanation": "SF4 is an AB4E molecule based on trigonal bipyramidal electron geometry. The lone pair occupies an equatorial position to minimize 90° repulsions, creating a see-saw geometry."
    },
    {
        "id": "q-07",
        "topic": "Valence Bond Theory",
        "topic_id": "valence-bond-theory",
        "difficulty": "medium",
        "type": "mcq",
        "question": "How many σ (sigma) and π (pi) bonds are present in an ethyne (C2H2) molecule?",
        "options": ["2 σ and 3 π", "3 σ and 2 π", "4 σ and 1 π", "5 σ and 0 π"],
        "answer": "3 σ and 2 π",
        "explanation": "In H-C≡C-H: There are 2 C-H single σ bonds, 1 C-C σ bond, and 2 C-C π bonds in the triple bond. Total = 3 σ bonds and 2 π bonds."
    },
    {
        "id": "q-08",
        "topic": "Hybridisation",
        "topic_id": "hybridisation",
        "difficulty": "easy",
        "type": "mcq",
        "question": "What is the type of hybridisation and geometry in a molecule of PCl5?",
        "options": ["sp3, Tetrahedral", "sp3d, Trigonal bipyramidal", "sp3d2, Octahedral", "dsp2, Square planar"],
        "answer": "sp3d, Trigonal bipyramidal",
        "explanation": "In PCl5, phosphorus uses one 3s, three 3p, and one 3d orbital (dz²) to form 5 equivalent sp³d hybrid orbitals arranged in a trigonal bipyramid."
    },
    {
        "id": "q-09",
        "topic": "Hybridisation",
        "topic_id": "hybridisation",
        "difficulty": "hard",
        "type": "mcq",
        "question": "When AlCl3 reacts with Cl- to form [AlCl4]-, the hybridisation of Al changes from:",
        "options": ["sp to sp2", "sp2 to sp3", "sp3 to sp3d", "sp2 to dsp2"],
        "answer": "sp2 to sp3",
        "explanation": "In monomeric AlCl3, Al has 3 bond pairs (sp² trigonal planar). In [AlCl4]-, Al forms 4 single bonds with 4 chlorine atoms, adopting sp³ hybridisation (tetrahedral)."
    },
    {
        "id": "q-10",
        "topic": "Molecular Orbital Theory",
        "topic_id": "mot-theory",
        "difficulty": "medium",
        "type": "mcq",
        "question": "What is the bond order and magnetic nature of the N2 molecule (14 electrons)?",
        "options": ["Bond Order = 2.0, Paramagnetic", "Bond Order = 3.0, Diamagnetic", "Bond Order = 2.5, Paramagnetic", "Bond Order = 3.0, Paramagnetic"],
        "answer": "Bond Order = 3.0, Diamagnetic",
        "explanation": "N2 has 10 bonding electrons and 4 antibonding electrons: B.O. = (10 - 4)/2 = 3.0. All electrons in all molecular orbitals are paired, making N2 diamagnetic."
    },
    {
        "id": "q-11",
        "topic": "Molecular Orbital Theory",
        "topic_id": "mot-theory",
        "difficulty": "hard",
        "type": "mcq",
        "question": "Which of the following diatomic species is paramagnetic with a bond order of 2.0?",
        "options": ["C2", "N2", "O2", "F2"],
        "answer": "O2",
        "explanation": "O2 has 16 electrons: B.O. = (10 - 6)/2 = 2.0. It has 2 unpaired electrons (one in π*2px and one in π*2py), making it paramagnetic."
    },
    {
        "id": "q-12",
        "topic": "Hydrogen Bonding",
        "topic_id": "hydrogen-bonding",
        "difficulty": "easy",
        "type": "mcq",
        "question": "Hydrogen bonding is formed only when hydrogen is covalently attached to elements of:",
        "options": ["High electropositivity and large atomic size", "High electronegativity and small atomic size (F, O, N)", "Low electronegativity and large size (Cl, Br, I)", "Transition metal d-block elements"],
        "answer": "High electronegativity and small atomic size (F, O, N)",
        "explanation": "Strong hydrogen bonding requires very high electronegativity and small atomic size (concentrated partial negative charge), specifically Fluorine, Oxygen, and Nitrogen."
    },
    {
        "id": "q-13",
        "topic": "Hydrogen Bonding",
        "topic_id": "hydrogen-bonding",
        "difficulty": "medium",
        "type": "mcq",
        "question": "Which of the following compounds exhibits intramolecular hydrogen bonding?",
        "options": ["Water (H2O)", "Ethanol (C2H5OH)", "o-Nitrophenol", "p-Nitrophenol"],
        "answer": "o-Nitrophenol",
        "explanation": "In o-nitrophenol, the -NO2 and -OH groups are situated close to each other on adjacent carbon atoms, forming a 6-membered ring via intramolecular hydrogen bonding."
    },
    {
        "id": "q-14",
        "topic": "Bond Parameters",
        "topic_id": "bond-parameters",
        "difficulty": "hard",
        "type": "mcq",
        "question": "According to Fajans' rules, which ionic compound will have the maximum covalent character?",
        "options": ["NaCl", "MgCl2", "AlCl3", "KCl"],
        "answer": "AlCl3",
        "explanation": "Fajans' rules state that smaller cation size and higher positive charge increase polarizing power. Al³⁺ has the highest charge (+3) and smallest ionic radius among these cations, creating maximum covalent character."
    },
    {
        "id": "q-15",
        "topic": "Molecular Orbital Theory",
        "topic_id": "mot-theory",
        "difficulty": "hard",
        "type": "mcq",
        "question": "Arrange the oxygen species in order of increasing bond length: O2, O2+, O2-, O2^2-.",
        "options": [
            "O2+ < O2 < O2- < O2^2-",
            "O2^2- < O2- < O2 < O2+",
            "O2 < O2+ < O2- < O2^2-",
            "O2- < O2^2- < O2 < O2+"
        ],
        "answer": "O2+ < O2 < O2- < O2^2-",
        "explanation": "Bond orders are: O2+ (2.5) > O2 (2.0) > O2- (1.5) > O2^2- (1.0). Since Bond Length is inversely proportional to Bond Order, the bond length order is O2+ < O2 < O2- < O2^2-."
    }
]

# Quick Revision Knowledge Bank
revision_data = {
    "key_definitions": [
        {"term": "Chemical Bond", "definition": "Attractive force which holds various constituents (atoms, ions, etc.) together in different chemical species to lower potential energy and attain stability."},
        {"term": "Octet Rule", "definition": "Atoms combine either by electron transfer or electron sharing in order to acquire a stable octet (8 valence electrons, ns²np⁶) like noble gases."},
        {"term": "Formal Charge", "definition": "The hypothetical charge assigned to an atom in a molecule: F.C. = V - N - (1/2)B."},
        {"term": "Lattice Enthalpy", "definition": "Energy required to completely separate 1 mole of a solid ionic compound into its isolated gaseous constituent ions (NaCl: 788 kJ/mol)."},
        {"term": "Bond Order", "definition": "Number of chemical bonds between two atoms. For MOT: B.O. = (Nb - Na)/2."},
        {"term": "Resonance Hybrid", "definition": "The single actual structure of a molecule representing the blend of multiple canonical Lewis forms with lowered potential energy."},
        {"term": "Dipole Moment (μ)", "definition": "Product of the magnitude of electric charge (Q) and distance of separation (r): μ = Q × r (1 Debye = 3.33564 × 10⁻³⁰ C m)."},
        {"term": "Hybridisation", "definition": "Quantum mechanical phenomenon of intermixing atomic orbitals of comparable energy to generate equal number of equivalent hybrid orbitals with specific directional geometries."},
        {"term": "Hydrogen Bond", "definition": "Attractive electrostatic force binding the partially positive hydrogen atom of one molecule with a strongly electronegative atom (F, O, N) having lone pairs."}
    ],
    "master_formulas": [
        {"name": "Formal Charge", "formula": "F.C. = V - N - \\frac{1}{2}B", "description": "V = valence e⁻ in free atom, N = non-bonding lone pair e⁻, B = total bonding e⁻"},
        {"name": "Electric Dipole Moment", "formula": "\\mu = Q \\times r", "description": "Q = charge magnitude, r = internuclear distance (1 D = 3.33564 × 10⁻³⁰ C·m)"},
        {"name": "Average Bond Enthalpy", "formula": "\\Delta_{a}H_{avg} = \\frac{\\sum \\Delta H_{dissociation}}{n_{bonds}}", "description": "For polyatomic molecules like H₂O (464.5 kJ/mol)"},
        {"name": "MOT Bond Order", "formula": "B.O. = \\frac{N_b - N_a}{2}", "description": "Nb = bonding electrons, Na = antibonding electrons"},
        {"name": "H-Bond Strength Order", "formula": "F-H\\cdots F > O-H\\cdots O > N-H\\cdots N", "description": "Dictated by electronegativity and small radius"}
    ],
    "key_differences": [
        {
            "topic": "σ (Sigma) Bond vs π (Pi) Bond",
            "points": [
                {"aspect": "Overlap Nature", "a": "Axial / head-on overlap along internuclear axis", "b": "Lateral / sideways overlap perpendicular to axis"},
                {"aspect": "Electron Cloud", "a": "Symmetrical cylindrically along axis", "b": "Two lobes, above and below internuclear axis"},
                {"aspect": "Bond Strength", "a": "Stronger due to larger orbital overlap", "b": "Weaker due to limited lateral overlap"},
                {"aspect": "Free Rotation", "a": "Free rotation about bond is allowed", "b": "Rotation is hindered / restricted"},
                {"aspect": "Independent Existence", "a": "Can exist independently as single bond", "b": "Always formed in addition to an existing σ bond"}
            ]
        },
        {
            "topic": "Intermolecular vs Intramolecular H-Bonding",
            "points": [
                {"aspect": "Location", "a": "Between two different molecules (same or different compound)", "b": "Within the exact same molecule"},
                {"aspect": "Effect on Boiling Point", "a": "Increases boiling point significantly (e.g. H2O, p-nitrophenol)", "b": "Lowers boiling point (e.g. o-nitrophenol)"},
                {"aspect": "Solubility in Water", "a": "Increases water solubility by forming H-bonds with water", "b": "Decreases water solubility due to internal chelation"}
            ]
        },
        {
            "topic": "Bonding MO vs Antibonding MO",
            "points": [
                {"aspect": "Formation", "a": "Constructive addition of wavefunctions: ψA + ψB", "b": "Destructive subtraction of wavefunctions: ψA - ψB"},
                {"aspect": "Energy", "a": "Lower energy than parent atomic orbitals (stabilizing)", "b": "Higher energy than parent atomic orbitals (destabilizing)"},
                {"aspect": "Electron Density", "a": "High electron density concentrated between nuclei", "b": "Zero electron density between nuclei (nodal plane)"}
            ]
        }
    ],
    "exam_tips": [
        "Remember the VSEPR repulsion hierarchy: lp-lp > lp-bp > bp-bp.",
        "In MOT for homonuclear diatomics: If total electrons ≤ 14 (Li2 to N2), π2px=π2py is lower in energy than σ2pz. If electrons > 14 (O2, F2), σ2pz is lower in energy than π2px=π2py.",
        "Isoelectronic species always have identical bond orders (e.g. N2, CO, NO+, CN- all have 14 electrons and Bond Order = 3).",
        "Liquid O2 is paramagnetic due to 2 unpaired electrons in π*2px and π*2py orbitals.",
        "In PCl5 (sp3d), the two axial bonds (240 pm) are longer and weaker than the three equatorial bonds (202 pm) due to stronger 90° repulsions."
    ]
}

# Write out clean modular JSON files
with open('topics.json', 'w', encoding='utf-8') as f:
    json.dump(topics_list, f, indent=2)

with open('flashcards.json', 'w', encoding='utf-8') as f:
    json.dump(flashcards_data, f, indent=2)

with open('questions.json', 'w', encoding='utf-8') as f:
    json.dump(quiz_data, f, indent=2)

with open('revision.json', 'w', encoding='utf-8') as f:
    json.dump(revision_data, f, indent=2)

print("Generated topics.json, flashcards.json, questions.json, and revision.json successfully.")
