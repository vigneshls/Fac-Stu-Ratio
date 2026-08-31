export const SCHOOL_DATA = [
  // Self Financing (Matriculation / CBSE)
  {
    id: "nsnps",
    name: "NS Nursery & Primary School, Theni",
    category: "Self Financing",
    currentStaff: 22,
    specs: {
      "prekg_lkg_ukg": { students: 240, classrooms: 8, workload: 25, current: 12 },
      "primary_1_5": { students: 320, classrooms: 10, workload: 28, current: 10 }
    }
  },
  {
    id: "tmhnu_muthu",
    name: "T.M.H.N.U. Matric Hr. Sec. School, Muthuthevanpatti, Theni",
    category: "Self Financing",
    currentStaff: 58,
    specs: {
      "primary_1_5": { students: 450, classrooms: 12, workload: 28, current: 15 },
      "middle_6_8": { students: 380, classrooms: 9, workload: 28, current: 13 },
      "sec_9_12": { students: 590, classrooms: 14, workload: 28, current: 30 }
    }
  },
  {
    id: "tmhnu_vidya",
    name: "T.M.H.N.U. Vidyalaya Matric Hr. Sec. School, Theni",
    category: "Self Financing",
    currentStaff: 65,
    specs: {
      "prekg_lkg_ukg": { students: 160, classrooms: 5, workload: 25, current: 8 },
      "primary_1_5": { students: 500, classrooms: 13, workload: 28, current: 17 },
      "middle_6_8": { students: 420, classrooms: 10, workload: 28, current: 14 },
      "sec_9_12": { students: 540, classrooms: 13, workload: 28, current: 26 }
    }
  },
  {
    id: "tmhnu_girls_vada",
    name: "T.M.H.N.U. Girls Matric Hr. Sec. School, Vadapudupatti",
    category: "Self Financing",
    currentStaff: 52,
    specs: {
      "primary_1_5": { students: 380, classrooms: 10, workload: 28, current: 13 },
      "middle_6_8": { students: 340, classrooms: 8, workload: 28, current: 11 },
      "sec_9_12": { students: 460, classrooms: 11, workload: 28, current: 28 }
    }
  },
  {
    id: "ns_public",
    name: "NS Public School, Vadapudhupatti (CBSE)",
    category: "Self Financing",
    currentStaff: 42,
    specs: {
      "prekg_lkg_ukg": { students: 140, classrooms: 5, workload: 25, current: 7 },
      "primary_1_5": { students: 360, classrooms: 9, workload: 28, current: 12 },
      "middle_6_8": { students: 280, classrooms: 7, workload: 28, current: 9 },
      "sec_9_12": { students: 220, classrooms: 6, workload: 28, current: 14 }
    }
  },

  // Govt Aided
  {
    id: "ns_hr_sec",
    name: "Nadar Saraswathi Hr. Sec. School, Theni",
    category: "Govt Aided",
    currentStaff: 46,
    specs: {
      "middle_6_8": { students: 540, classrooms: 13, workload: 24, current: 16 },
      "sec_9_12": { students: 900, classrooms: 22, workload: 24, current: 30 }
    }
  },
  {
    id: "ns_girls_hr_sec",
    name: "Nadar Saraswathi Girls Hr. Sec. School, Theni",
    category: "Govt Aided",
    currentStaff: 44,
    specs: {
      "middle_6_8": { students: 510, classrooms: 12, workload: 24, current: 15 },
      "sec_9_12": { students: 850, classrooms: 21, workload: 24, current: 29 }
    }
  },
  {
    id: "ns_primary",
    name: "Nadar Saraswathi Primary School",
    category: "Govt Aided",
    currentStaff: 16,
    specs: {
      "prekg_lkg_ukg": { students: 60, classrooms: 2, workload: 25, current: 3 },
      "primary_1_5": { students: 370, classrooms: 10, workload: 25, current: 13 }
    }
  }
];

export const STANDARD_LABELS = {
  "prekg_lkg_ukg": "Pre-KG, LKG & UKG (Kindergarten)",
  "primary_1_5": "Classes 1 to 5 (Primary)",
  "middle_6_8": "Classes 6, 7 & 8 (Upper Primary / Middle)",
  "sec_9_12": "Classes 9, 10, 11 & 12 (High & Hr Sec)",
  "class_9": "Class 9 (High School)",
  "class_10": "Class 10 (High School)",
  "class_11": "Class 11 (Higher Secondary)",
  "class_12": "Class 12 (Higher Secondary)"
};

export function calculateFormula(category, stdKey, students, classrooms, workload, customRules = {}) {
  students = Number(students) || 0;
  classrooms = Number(classrooms) || 1;
  workload = Number(workload) || 28;

  const kgRatio = customRules.kgRatio || 20;
  const priRatio = customRules.priRatio || 30;
  const midRatio = customRules.midRatio || 35;
  const sfTeachersPerSec = customRules.sfTeachersPerSec || 1.5;

  let ratioText = "1:30";
  let required = 0;

  if (stdKey === "prekg_lkg_ukg") {
    ratioText = `1:${kgRatio}`;
    required = Math.max(1, Math.ceil(students / kgRatio));
  } else if (stdKey === "primary_1_5") {
    ratioText = `1:${priRatio}`;
    if (students <= 60) required = 2;
    else required = Math.ceil(students / priRatio);
  } else if (stdKey === "middle_6_8") {
    ratioText = `1:${midRatio}`;
    required = Math.max(3, Math.ceil(students / midRatio));
  } else {
    // High / Hr Sec
    if (category === "Self Financing") {
      ratioText = `${sfTeachersPerSec}/sec`;
      required = Math.ceil(classrooms * sfTeachersPerSec);
    } else {
      ratioText = "Subject Norm";
      required = Math.max(classrooms, Math.ceil((classrooms * 30) / workload));
    }
  }
  return { ratioText, required };
}
