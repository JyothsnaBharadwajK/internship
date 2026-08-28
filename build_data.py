import json
import re

# Load existing bonding data and kech104
with open('bonding_data.json', encoding='utf-8') as f:
    bonding_data = json.load(f)

with open('kect401.json', encoding='utf-8') as f:
    kect401 = json.load(f)

# Build comprehensive chapter.json
chapter_data = {
    "id": "chem-ch04",
    "number": 4,
    "title": "Chemical Bonding and Molecular Structure",
    "subject": "Chemistry",
    "grade": "Class 11 (NCERT)",
    "description": "Explore the fundamental forces holding atoms and molecules together, Lewis octet concepts, VSEPR 3D geometry prediction, Valence Bond Theory, Hybridisation, Molecular Orbital Theory (MOT), and Hydrogen Bonding.",
    "learning_objectives": [
        "Understand the Kössel-Lewis approach to chemical bonding and the octet rule.",
        "Draw Lewis dot structures, calculate formal charges, and recognize octet limitations.",
        "Predict 3D molecular geometries and bond angles using VSEPR Theory.",
        "Explain directional bonding, orbital overlaps (σ and π bonds), and hybridisation (sp, sp2, sp3, sp3d, sp3d2).",
        "Construct Molecular Orbital configurations for homonuclear & heteronuclear diatomic species, calculating Bond Order and magnetic behavior.",
        "Distinguish between intermolecular and intramolecular hydrogen bonding and understand their physical consequences."
    ],
    "stats": {
        "total_topics": len(bonding_data.get("modules", [])),
        "total_exercises": len(bonding_data.get("modules", [])[-1].get("exercises", [])) if "exercises" in bonding_data.get("modules", [])[-1] else 40,
        "estimated_reading_time": "120 mins"
    },
    "big_questions": kect401.get("questions", [])
}

with open('chapter.json', 'w', encoding='utf-8') as f:
    json.dump(chapter_data, f, indent=2)

print("Created chapter.json successfully.")
