export const CATEGORIES = {
  COLLEGES: "Colleges & Higher Education",
  MATRIC: "Matriculation Schools",
  AIDED: "Aided Primary & Secondary Schools"
};

export const INITIAL_INSTITUTIONS = [
  // --- COLLEGES & HIGHER EDUCATION ---
  {
    id: "nscet",
    name: "Nadar Saraswathi College of Engineering & Tech",
    shortName: "NSCET",
    category: CATEGORIES.COLLEGES,
    type: "Engineering",
    location: "Vadapudupatti, Theni",
    established: 2010,
    ruleType: "ratio",
    targetRatio: 15,
    maxPerSection: 60,
    teachersPerSection: 2.0,
    currentFaculty: 82,
    breakdown: [
      { id: "b1", name: "Computer Science & Engg", students: 360, ratio: 15 },
      { id: "b2", name: "Electronics & Comm Engg", students: 240, ratio: 15 },
      { id: "b3", name: "Electrical & Electronics Engg", students: 180, ratio: 15 },
      { id: "b4", name: "Mechanical Engineering", students: 180, ratio: 15 },
      { id: "b5", name: "Civil Engineering", students: 120, ratio: 15 },
      { id: "b6", name: "AI & Data Science", students: 180, ratio: 15 },
      { id: "b7", name: "Science & Humanities (1st Year)", students: 300, ratio: 15 }
    ]
  },
  {
    id: "nscas",
    name: "Nadar Saraswathi College of Arts & Science",
    shortName: "NSCAS",
    category: CATEGORIES.COLLEGES,
    type: "Arts & Science",
    location: "Vadapudupatti, Theni",
    established: 1996,
    ruleType: "ratio",
    targetRatio: 20,
    maxPerSection: 60,
    teachersPerSection: 1.8,
    currentFaculty: 98,
    breakdown: [
      { id: "b1", name: "Commerce & Management", students: 520, ratio: 20 },
      { id: "b2", name: "Computer Applications (BCA/B.Sc)", students: 480, ratio: 20 },
      { id: "b3", name: "English & Literature", students: 320, ratio: 20 },
      { id: "b4", name: "Mathematics & Physics", students: 360, ratio: 20 },
      { id: "b5", name: "Chemistry & Microbiology", students: 280, ratio: 20 },
      { id: "b6", name: "Postgraduate & Research", students: 240, ratio: 15 }
    ]
  },
  {
    id: "nsced",
    name: "Nadar Saraswathi College of Education",
    shortName: "NSCED",
    category: CATEGORIES.COLLEGES,
    type: "Teacher Training (B.Ed)",
    location: "Vadapudupatti, Theni",
    established: 2005,
    ruleType: "ratio",
    targetRatio: 15,
    maxPerSection: 50,
    teachersPerSection: 2.0,
    currentFaculty: 18,
    breakdown: [
      { id: "b1", name: "Pedagogy of English & Tamil", students: 80, ratio: 15 },
      { id: "b2", name: "Pedagogy of Mathematics & Science", students: 90, ratio: 15 },
      { id: "b3", name: "Pedagogy of Social Science", students: 50, ratio: 15 },
      { id: "b4", name: "M.Ed & Educational Research", students: 40, ratio: 10 }
    ]
  },
  {
    id: "wits",
    name: "Women's Industrial Training School",
    shortName: "WITS ITI",
    category: CATEGORIES.COLLEGES,
    type: "Vocational / ITI",
    location: "Theni",
    established: 2002,
    ruleType: "ratio",
    targetRatio: 20,
    maxPerSection: 40,
    teachersPerSection: 1.5,
    currentFaculty: 14,
    breakdown: [
      { id: "b1", name: "COPA (Computer Operator)", students: 80, ratio: 20 },
      { id: "b2", name: "Electronics Mechanic", students: 60, ratio: 20 },
      { id: "b3", name: "Fashion Design & Sewing", students: 70, ratio: 20 },
      { id: "b4", name: "Electrician Trade", students: 50, ratio: 20 }
    ]
  },

  // --- MATRICULATION SCHOOLS ---
  {
    id: "nsnps",
    name: "NS Nursery & primary school Theni",
    shortName: "NS Nursery & Primary",
    category: CATEGORIES.MATRIC,
    type: "Nursery & Primary",
    location: "Theni Town",
    established: 1988,
    ruleType: "nursery_primary",
    targetRatio: 25,
    maxPerSection: 30,
    teachersPerSection: 1.5,
    currentFaculty: 22,
    breakdown: [
      { id: "b1", name: "Pre-KG / Nursery", students: 90, ratio: 20, maxPerSec: 30 },
      { id: "b2", name: "LKG & UKG", students: 150, ratio: 20, maxPerSec: 30 },
      { id: "b3", name: "Classes 1 to 3", students: 180, ratio: 30, maxPerSec: 30 },
      { id: "b4", name: "Classes 4 to 5", students: 140, ratio: 30, maxPerSec: 30 }
    ]
  },
  {
    id: "tmhnu_muthu",
    name: "T.M.H.N.U. Matric Hr. Sec. School, Muthuthevanpatti Theni",
    shortName: "TMHNU Matric Muthuthevanpatti",
    category: CATEGORIES.MATRIC,
    type: "Private Matriculation (1-12)",
    location: "Muthuthevanpatti, Theni",
    established: 1994,
    ruleType: "per_section",
    targetRatio: 35,
    maxPerSection: 45,
    teachersPerSection: 1.5,
    currentFaculty: 58,
    breakdown: [
      { id: "b1", name: "Primary (Classes 1-5)", students: 450, ratio: 30, maxPerSec: 40 },
      { id: "b2", name: "Upper Primary (Classes 6-8)", students: 380, ratio: 35, maxPerSec: 45 },
      { id: "b3", name: "High School (Classes 9-10)", students: 310, ratio: 40, maxPerSec: 45 },
      { id: "b4", name: "Higher Sec (Classes 11-12)", students: 280, ratio: 40, maxPerSec: 45 }
    ]
  },
  {
    id: "tmhnu_vidya",
    name: "T.M.H.N.U. Vidyalaya Matric Hr. Sec. School, Theni",
    shortName: "TMHNU Vidyalaya Matric",
    category: CATEGORIES.MATRIC,
    type: "Private Matriculation (Pre-K to 12)",
    location: "Theni Central",
    established: 1990,
    ruleType: "per_section",
    targetRatio: 35,
    maxPerSection: 40,
    teachersPerSection: 1.5,
    currentFaculty: 65,
    breakdown: [
      { id: "b1", name: "Pre-KG & Kindergarten", students: 160, ratio: 20, maxPerSec: 30 },
      { id: "b2", name: "Primary (Classes 1-5)", students: 500, ratio: 30, maxPerSec: 40 },
      { id: "b3", name: "Upper Primary (Classes 6-8)", students: 420, ratio: 35, maxPerSec: 40 },
      { id: "b4", name: "High & Hr Sec (Classes 9-12)", students: 540, ratio: 40, maxPerSec: 45 }
    ]
  },
  {
    id: "tmhnu_girls_vada",
    name: "T.M.H.N.U. Girls Matric Hr. Sec. School, Vadapudupatti",
    shortName: "TMHNU Girls Matric Vadapudupatti",
    category: CATEGORIES.MATRIC,
    type: "Girls Matriculation (1-12)",
    location: "Vadapudupatti, Theni",
    established: 1998,
    ruleType: "per_section",
    targetRatio: 35,
    maxPerSection: 42,
    teachersPerSection: 1.5,
    currentFaculty: 52,
    breakdown: [
      { id: "b1", name: "Primary (Classes 1-5)", students: 380, ratio: 30, maxPerSec: 40 },
      { id: "b2", name: "Upper Primary (Classes 6-8)", students: 340, ratio: 35, maxPerSec: 42 },
      { id: "b3", name: "High & Hr Sec (Classes 9-12)", students: 460, ratio: 40, maxPerSec: 45 }
    ]
  },
  {
    id: "ns_public",
    name: "NS Public school Vadapudhupatti",
    shortName: "NS Public School (CBSE)",
    category: CATEGORIES.MATRIC,
    type: "CBSE School (Pre-K to 12)",
    location: "Vadapudupatti, Theni",
    established: 2015,
    ruleType: "per_section",
    targetRatio: 30,
    maxPerSection: 40,
    teachersPerSection: 1.5,
    currentFaculty: 42,
    breakdown: [
      { id: "b1", name: "Kindergarten (Pre-K to UKG)", students: 140, ratio: 20, maxPerSec: 30 },
      { id: "b2", name: "Primary CBSE (1-5)", students: 360, ratio: 30, maxPerSec: 40 },
      { id: "b3", name: "Middle School CBSE (6-8)", students: 280, ratio: 30, maxPerSec: 40 },
      { id: "b4", name: "Secondary CBSE (9-12)", students: 220, ratio: 30, maxPerSec: 40 }
    ]
  },

  // --- AIDED PRIMARY & SECONDARY SCHOOLS ---
  {
    id: "ns_hr_sec",
    name: "Nadar Saraswathi Hr. Sec. School, Theni",
    shortName: "NS Hr. Sec. School",
    category: CATEGORIES.AIDED,
    type: "Govt / Aided (6-12)",
    location: "Theni Main",
    established: 1965,
    ruleType: "subject_based",
    targetRatio: 37,
    maxPerSection: 40,
    teachersPerSection: 1.4,
    currentFaculty: 46,
    breakdown: [
      { id: "b1", name: "Upper Primary (Classes 6-8)", students: 540, ratio: 35, maxPerSec: 40 },
      { id: "b2", name: "High School (Classes 9-10)", students: 480, ratio: 40, maxPerSec: 40 },
      { id: "b3", name: "Higher Sec (Classes 11-12)", students: 420, ratio: 40, maxPerSec: 40 }
    ]
  },
  {
    id: "ns_girls_hr_sec",
    name: "Nadar Saraswathi Girls Hr. Sec. School, Theni",
    shortName: "NS Girls Hr. Sec. School",
    category: CATEGORIES.AIDED,
    type: "Govt / Aided Girls (6-12)",
    location: "Theni Main",
    established: 1972,
    ruleType: "subject_based",
    targetRatio: 37,
    maxPerSection: 40,
    teachersPerSection: 1.4,
    currentFaculty: 44,
    breakdown: [
      { id: "b1", name: "Upper Primary (Classes 6-8)", students: 510, ratio: 35, maxPerSec: 40 },
      { id: "b2", name: "High School (Classes 9-10)", students: 460, ratio: 40, maxPerSec: 40 },
      { id: "b3", name: "Higher Sec (Classes 11-12)", students: 390, ratio: 40, maxPerSec: 40 }
    ]
  },
  {
    id: "ns_primary",
    name: "Nadar Saraswathi Primary School",
    shortName: "NS Primary School",
    category: CATEGORIES.AIDED,
    type: "Govt / Aided Primary (1-5)",
    location: "Theni Town",
    established: 1958,
    ruleType: "nursery_primary",
    targetRatio: 30,
    maxPerSection: 30,
    teachersPerSection: 1.2,
    currentFaculty: 16,
    breakdown: [
      { id: "b1", name: "Nursery / KG", students: 60, ratio: 20, maxPerSec: 30 },
      { id: "b2", name: "Classes 1 to 3", students: 210, ratio: 30, maxPerSec: 30 },
      { id: "b3", name: "Classes 4 to 5", students: 160, ratio: 30, maxPerSec: 30 }
    ]
  }
];

// Helper calculations based on school rules
export function calculateInstitutionMetrics(inst) {
  let totalStudents = 0;
  let totalSections = 0;
  let calculatedRequiredFaculty = 0;

  if (inst.breakdown && inst.breakdown.length > 0) {
    inst.breakdown.forEach(sub => {
      const students = Number(sub.students) || 0;
      totalStudents += students;
      
      const maxPerSec = Number(sub.maxPerSec) || Number(inst.maxPerSection) || 40;
      const sections = Math.max(1, Math.ceil(students / maxPerSec));
      totalSections += sections;

      if (inst.ruleType === "per_section") {
        // Private Matric & CBSE: 1.5 teachers per section
        const mult = Number(inst.teachersPerSection) || 1.5;
        calculatedRequiredFaculty += Math.ceil(sections * mult);
      } else if (inst.ruleType === "nursery_primary") {
        // RTE Act & Nursery Rules: Min 2 teachers for < 60; +1 per 30 students
        if (students < 60) {
          calculatedRequiredFaculty += Math.max(2, Math.ceil(students / (Number(sub.ratio) || 20)));
        } else {
          calculatedRequiredFaculty += Math.max(2, Math.ceil(students / (Number(sub.ratio) || 30)));
        }
      } else if (inst.ruleType === "subject_based") {
        // Govt / Aided: BT & PG Assistants per subject + section ratio
        const ratio = Number(sub.ratio) || Number(inst.targetRatio) || 35;
        calculatedRequiredFaculty += Math.ceil(students / ratio);
      } else {
        // Default ratio based (e.g. Colleges AICTE 1:15, UGC 1:20)
        const ratio = Number(sub.ratio) || Number(inst.targetRatio) || 20;
        calculatedRequiredFaculty += Math.ceil(students / ratio);
      }
    });
  } else {
    // Fallback if no breakdown
    totalStudents = Number(inst.totalStudents) || 500;
    const maxPerSec = Number(inst.maxPerSection) || 40;
    totalSections = Math.max(1, Math.ceil(totalStudents / maxPerSec));
    
    if (inst.ruleType === "per_section") {
      calculatedRequiredFaculty = Math.ceil(totalSections * (Number(inst.teachersPerSection) || 1.5));
    } else {
      calculatedRequiredFaculty = Math.ceil(totalStudents / (Number(inst.targetRatio) || 20));
    }
  }

  const currentFaculty = Number(inst.currentFaculty) || 0;
  const vacancy = Math.max(0, calculatedRequiredFaculty - currentFaculty);
  const surplus = Math.max(0, currentFaculty - calculatedRequiredFaculty);
  const effectiveRatio = totalStudents > 0 && currentFaculty > 0 ? (totalStudents / currentFaculty).toFixed(1) : "N/A";

  let status = "compliant";
  if (vacancy > 0) status = "deficit";
  else if (surplus > 0) status = "surplus";

  return {
    totalStudents,
    totalSections,
    calculatedRequiredFaculty,
    currentFaculty,
    vacancy,
    surplus,
    effectiveRatio,
    status
  };
}
