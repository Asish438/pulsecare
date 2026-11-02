// Comprehensive Mock Data for PulseCare Hospital Management System (HMS)

export const INITIAL_DOCTORS = [
  {
    id: "DOC-101",
    name: "Dr. Rajesh Sharma",
    specialty: "Cardiology",
    qualification: "MBBS, MD, DM (Cardiology)",
    experience: "14 Years",
    department: "Cardiology",
    room: "OPD-102 (First Floor)",
    phone: "+91 98765 43210",
    email: "rajesh.sharma@pulsecare.org",
    rating: 4.9,
    status: "Available",
    fee: "₹800",
    timing: "09:00 AM - 02:00 PM",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "DOC-102",
    name: "Dr. Ananya Sen",
    specialty: "Neurology",
    qualification: "MBBS, M.Ch (Neuro)",
    experience: "11 Years",
    department: "Neurology",
    room: "OPD-204 (Second Floor)",
    phone: "+91 98234 56789",
    email: "ananya.sen@pulsecare.org",
    rating: 4.8,
    status: "In Surgery",
    fee: "₹1,000",
    timing: "11:00 AM - 04:00 PM",
    image: "https://images.unsplash.com/photo-1594824813680-4966779b5c2a?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "DOC-103",
    name: "Dr. Vikramaditya Patel",
    specialty: "Orthopedics & Joint Replacement",
    qualification: "MBBS, MS (Ortho), Fellowship (Arthroplasty)",
    experience: "16 Years",
    department: "Orthopedics",
    room: "OPD-105 (First Floor)",
    phone: "+91 98111 22334",
    email: "vikram.patel@pulsecare.org",
    rating: 4.9,
    status: "Available",
    fee: "₹750",
    timing: "10:00 AM - 03:00 PM",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "DOC-104",
    name: "Dr. Meera Nambiar",
    specialty: "Pediatrics & Child Care",
    qualification: "MBBS, DCH, DNB (Pediatrics)",
    experience: "9 Years",
    department: "Pediatrics",
    room: "OPD-004 (Ground Floor)",
    phone: "+91 97456 78123",
    email: "meera.nambiar@pulsecare.org",
    rating: 4.9,
    status: "Available",
    fee: "₹600",
    timing: "08:30 AM - 01:30 PM",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "DOC-105",
    name: "Dr. Arindam Mukherjee",
    specialty: "General Medicine & Critical Care",
    qualification: "MBBS, MD (General Medicine)",
    experience: "18 Years",
    department: "General Medicine",
    room: "OPD-101 (First Floor)",
    phone: "+91 98300 12987",
    email: "arindam.m@pulsecare.org",
    rating: 4.7,
    status: "Available",
    fee: "₹500",
    timing: "09:00 AM - 05:00 PM",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "DOC-106",
    name: "Dr. Sneha Kulkarni",
    specialty: "Gynecology & Obstetrics",
    qualification: "MBBS, MS (OBG), FICOG",
    experience: "12 Years",
    department: "Gynecology",
    room: "OPD-201 (Second Floor)",
    phone: "+91 99123 45678",
    email: "sneha.k@pulsecare.org",
    rating: 4.9,
    status: "Off Duty",
    fee: "₹700",
    timing: "02:00 PM - 07:00 PM",
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "DOC-107",
    name: "Dr. Farhan Qureshi",
    specialty: "Emergency & Trauma Head",
    qualification: "MBBS, MD (Emergency Med), FACEE",
    experience: "10 Years",
    department: "Emergency",
    room: "Trauma Bay A (Emergency Wing)",
    phone: "+91 99887 76655",
    email: "farhan.q@pulsecare.org",
    rating: 4.8,
    status: "Available",
    fee: "₹900",
    timing: "24x7 On-call",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "DOC-108",
    name: "Dr. Priya Sundaram",
    specialty: "Dermatology & Cosmetology",
    qualification: "MBBS, MD (Dermatology)",
    experience: "8 Years",
    department: "Dermatology",
    room: "OPD-302 (Third Floor)",
    phone: "+91 98450 67890",
    email: "priya.s@pulsecare.org",
    rating: 4.8,
    status: "Available",
    fee: "₹650",
    timing: "10:00 AM - 02:00 PM",
    image: "https://images.unsplash.com/photo-1594824813715-c89b5321f8a8?w=300&auto=format&fit=crop&q=80"
  }
];

export const INITIAL_PATIENTS = [
  {
    id: "PAT-001",
    name: "Amitav Roy",
    age: 54,
    gender: "Male",
    bloodGroup: "O+",
    phone: "+91 98310 11223",
    address: "Salt Lake Sector II, Kolkata",
    type: "Inpatient",
    department: "Cardiology",
    doctorAssigned: "Dr. Rajesh Sharma",
    bedId: "ICU-02",
    diagnosis: "Acute Coronary Syndrome, Hypertension",
    admissionDate: "2026-10-28",
    status: "Admitted",
    vitals: {
      bp: "135/88 mmHg",
      pulse: "78 bpm",
      spo2: "97%",
      temp: "98.4 °F"
    },
    emergencyContact: "Sunita Roy (Wife) - +91 98310 11224"
  },
  {
    id: "PAT-002",
    name: "Kavita Reddy",
    age: 38,
    gender: "Female",
    bloodGroup: "B+",
    phone: "+91 94401 55667",
    address: "Banjara Hills, Hyderabad",
    type: "Inpatient",
    department: "Orthopedics",
    doctorAssigned: "Dr. Vikramaditya Patel",
    bedId: "GW-104",
    diagnosis: "Right Tibia Fracture post road accident",
    admissionDate: "2026-10-30",
    status: "Admitted",
    vitals: {
      bp: "120/80 mmHg",
      pulse: "72 bpm",
      spo2: "99%",
      temp: "98.6 °F"
    },
    emergencyContact: "Ramesh Reddy (Husband) - +91 94401 55668"
  },
  {
    id: "PAT-003",
    name: "Mohan Lal Gupta",
    age: 67,
    gender: "Male",
    bloodGroup: "A+",
    phone: "+91 91234 88776",
    address: "Civil Lines, Jaipur",
    type: "Inpatient",
    department: "Neurology",
    doctorAssigned: "Dr. Ananya Sen",
    bedId: "PVT-301",
    diagnosis: "Ischemic Stroke (Sub-acute), Left Hemiparesis",
    admissionDate: "2026-10-25",
    status: "Admitted",
    vitals: {
      bp: "142/92 mmHg",
      pulse: "82 bpm",
      spo2: "96%",
      temp: "99.1 °F"
    },
    emergencyContact: "Deepak Gupta (Son) - +91 91234 88779"
  },
  {
    id: "PAT-004",
    name: "Aarav Sharma",
    age: 7,
    gender: "Male",
    bloodGroup: "O+",
    phone: "+91 98760 12345",
    address: "Indiranagar, Bangalore",
    type: "Outpatient",
    department: "Pediatrics",
    doctorAssigned: "Dr. Meera Nambiar",
    bedId: "None (OPD)",
    diagnosis: "Acute Bronchitis & Viral Fever",
    admissionDate: "2026-11-01",
    status: "Under Observation",
    vitals: {
      bp: "105/70 mmHg",
      pulse: "98 bpm",
      spo2: "98%",
      temp: "101.2 °F"
    },
    emergencyContact: "Pooja Sharma (Mother) - +91 98760 12346"
  },
  {
    id: "PAT-005",
    name: "Zoya Fatima",
    age: 29,
    gender: "Female",
    bloodGroup: "AB+",
    phone: "+91 98200 44556",
    address: "Bandra West, Mumbai",
    type: "Outpatient",
    department: "Gynecology",
    doctorAssigned: "Dr. Sneha Kulkarni",
    bedId: "None (OPD)",
    diagnosis: "Antenatal Checkup - Second Trimester (24 Weeks)",
    admissionDate: "2026-11-01",
    status: "Discharged",
    vitals: {
      bp: "115/75 mmHg",
      pulse: "76 bpm",
      spo2: "99%",
      temp: "98.2 °F"
    },
    emergencyContact: "Imran Khan (Husband) - +91 98200 44557"
  },
  {
    id: "PAT-006",
    name: "Gurpreet Singh",
    age: 45,
    gender: "Male",
    bloodGroup: "O-",
    phone: "+91 98140 99887",
    address: "Model Town, Ludhiana",
    type: "Inpatient",
    department: "Emergency",
    doctorAssigned: "Dr. Farhan Qureshi",
    bedId: "ER-01",
    diagnosis: "Severe Acute Pancreatitis, Dehydration",
    admissionDate: "2026-11-01",
    status: "Critical",
    vitals: {
      bp: "98/62 mmHg",
      pulse: "104 bpm",
      spo2: "94%",
      temp: "100.5 °F"
    },
    emergencyContact: "Manjit Kaur (Wife) - +91 98140 99888"
  },
  {
    id: "PAT-007",
    name: "Shalini Nair",
    age: 33,
    gender: "Female",
    bloodGroup: "A-",
    phone: "+91 97471 23456",
    address: "Kadavanthra, Kochi",
    type: "Outpatient",
    department: "Dermatology",
    doctorAssigned: "Dr. Priya Sundaram",
    bedId: "None (OPD)",
    diagnosis: "Severe Contact Dermatitis & Eczema Flare",
    admissionDate: "2026-10-31",
    status: "Under Observation",
    vitals: {
      bp: "118/78 mmHg",
      pulse: "70 bpm",
      spo2: "99%",
      temp: "98.4 °F"
    },
    emergencyContact: "Gopinath Nair (Father) - +91 97471 23459"
  },
  {
    id: "PAT-008",
    name: "Bishnu Prasad Das",
    age: 62,
    gender: "Male",
    bloodGroup: "B-",
    phone: "+91 99370 88221",
    address: "Saheed Nagar, Bhubaneswar",
    type: "Inpatient",
    department: "General Medicine",
    doctorAssigned: "Dr. Arindam Mukherjee",
    bedId: "GW-108",
    diagnosis: "Type 2 Diabetes with Diabetic Foot Ulcer",
    admissionDate: "2026-10-29",
    status: "Admitted",
    vitals: {
      bp: "138/85 mmHg",
      pulse: "74 bpm",
      spo2: "98%",
      temp: "98.8 °F"
    },
    emergencyContact: "Sangeeta Das (Daughter) - +91 99370 88223"
  }
];

export const INITIAL_APPOINTMENTS = [
  {
    id: "APT-2026-001",
    patientName: "Amitav Roy",
    patientId: "PAT-001",
    doctorName: "Dr. Rajesh Sharma",
    doctorId: "DOC-101",
    department: "Cardiology",
    date: "2026-11-01",
    time: "10:30 AM",
    type: "Follow-up",
    reason: "Post-angina ECG review and lipid check",
    status: "Confirmed",
    room: "OPD-102"
  },
  {
    id: "APT-2026-002",
    patientName: "Aarav Sharma",
    patientId: "PAT-004",
    doctorName: "Dr. Meera Nambiar",
    doctorId: "DOC-104",
    department: "Pediatrics",
    date: "2026-11-01",
    time: "11:15 AM",
    type: "Routine Checkup",
    reason: "Persistent fever and nocturnal cough",
    status: "Confirmed",
    room: "OPD-004"
  },
  {
    id: "APT-2026-003",
    patientName: "Mohan Lal Gupta",
    patientId: "PAT-003",
    doctorName: "Dr. Ananya Sen",
    doctorId: "DOC-102",
    department: "Neurology",
    date: "2026-11-01",
    time: "02:00 PM",
    type: "Consultation",
    reason: "Physiotherapy progress & MRI review",
    status: "Pending",
    room: "OPD-204"
  },
  {
    id: "APT-2026-004",
    patientName: "Zoya Fatima",
    patientId: "PAT-005",
    doctorName: "Dr. Sneha Kulkarni",
    doctorId: "DOC-106",
    department: "Gynecology",
    date: "2026-11-01",
    time: "03:30 PM",
    type: "Routine Checkup",
    reason: "Ultrasound anomaly scan discussion",
    status: "Completed",
    room: "OPD-201"
  },
  {
    id: "APT-2026-005",
    patientName: "Shalini Nair",
    patientId: "PAT-007",
    doctorName: "Dr. Priya Sundaram",
    doctorId: "DOC-108",
    department: "Dermatology",
    date: "2026-11-02",
    time: "10:00 AM",
    type: "Consultation",
    reason: "Allergy patch test evaluation",
    status: "Confirmed",
    room: "OPD-302"
  },
  {
    id: "APT-2026-006",
    patientName: "Kavita Reddy",
    patientId: "PAT-002",
    doctorName: "Dr. Vikramaditya Patel",
    doctorId: "DOC-103",
    department: "Orthopedics",
    date: "2026-11-02",
    time: "12:00 PM",
    type: "Post-op Dressing",
    reason: "Plaster cast inspection and pain assessment",
    status: "Confirmed",
    room: "OPD-105"
  },
  {
    id: "APT-2026-007",
    patientName: "Bishnu Prasad Das",
    patientId: "PAT-008",
    doctorName: "Dr. Arindam Mukherjee",
    doctorId: "DOC-105",
    department: "General Medicine",
    date: "2026-11-02",
    time: "04:15 PM",
    type: "Follow-up",
    reason: "HbA1c & wound healing dressing check",
    status: "Pending",
    room: "OPD-101"
  }
];

export const INITIAL_BEDS = [
  // ICU Beds
  { id: "ICU-01", ward: "Intensive Care Unit (ICU)", floor: "3rd Floor", type: "ICU", status: "Available", patientName: null, patientId: null, dailyRate: 7500, oxygen: true, ventilator: true },
  { id: "ICU-02", ward: "Intensive Care Unit (ICU)", floor: "3rd Floor", type: "ICU", status: "Occupied", patientName: "Amitav Roy", patientId: "PAT-001", dailyRate: 7500, oxygen: true, ventilator: false },
  { id: "ICU-03", ward: "Intensive Care Unit (ICU)", floor: "3rd Floor", type: "ICU", status: "Maintenance", patientName: null, patientId: null, dailyRate: 7500, oxygen: true, ventilator: true },
  { id: "ICU-04", ward: "Intensive Care Unit (ICU)", floor: "3rd Floor", type: "ICU", status: "Available", patientName: null, patientId: null, dailyRate: 7500, oxygen: true, ventilator: false },

  // Emergency / Trauma Bay
  { id: "ER-01", ward: "Emergency Trauma Bay", floor: "Ground Floor", type: "Emergency", status: "Occupied", patientName: "Gurpreet Singh", patientId: "PAT-006", dailyRate: 5000, oxygen: true, ventilator: true },
  { id: "ER-02", ward: "Emergency Trauma Bay", floor: "Ground Floor", type: "Emergency", status: "Available", patientName: null, patientId: null, dailyRate: 5000, oxygen: true, ventilator: false },
  { id: "ER-03", ward: "Emergency Trauma Bay", floor: "Ground Floor", type: "Emergency", status: "Available", patientName: null, patientId: null, dailyRate: 5000, oxygen: true, ventilator: false },
  { id: "ER-04", ward: "Emergency Trauma Bay", floor: "Ground Floor", type: "Emergency", status: "Cleaning", patientName: null, patientId: null, dailyRate: 5000, oxygen: true, ventilator: false },

  // General Ward Male
  { id: "GW-101", ward: "General Ward (Male)", floor: "1st Floor", type: "General", status: "Available", patientName: null, patientId: null, dailyRate: 1500, oxygen: true, ventilator: false },
  { id: "GW-102", ward: "General Ward (Male)", floor: "1st Floor", type: "General", status: "Available", patientName: null, patientId: null, dailyRate: 1500, oxygen: false, ventilator: false },
  { id: "GW-104", ward: "General Ward (Male)", floor: "1st Floor", type: "General", status: "Occupied", patientName: "Kavita Reddy", patientId: "PAT-002", dailyRate: 1500, oxygen: false, ventilator: false },
  { id: "GW-108", ward: "General Ward (Male)", floor: "1st Floor", type: "General", status: "Occupied", patientName: "Bishnu Prasad Das", patientId: "PAT-008", dailyRate: 1500, oxygen: true, ventilator: false },

  // Deluxe Private Suites
  { id: "PVT-301", ward: "Private Deluxe Suite", floor: "4th Floor", type: "Private", status: "Occupied", patientName: "Mohan Lal Gupta", patientId: "PAT-003", dailyRate: 4500, oxygen: true, ventilator: false },
  { id: "PVT-302", ward: "Private Deluxe Suite", floor: "4th Floor", type: "Private", status: "Available", patientName: null, patientId: null, dailyRate: 4500, oxygen: true, ventilator: false },
  { id: "PVT-303", ward: "Private Deluxe Suite", floor: "4th Floor", type: "Private", status: "Reserved", patientName: null, patientId: null, dailyRate: 4500, oxygen: true, ventilator: false },
  { id: "PVT-304", ward: "Private Deluxe Suite", floor: "4th Floor", type: "Private", status: "Available", patientName: null, patientId: null, dailyRate: 4500, oxygen: true, ventilator: false }
];

export const INITIAL_MEDICINES = [
  { id: "MED-001", name: "Amoxicillin 500mg", category: "Antibiotic", stock: 320, minStock: 100, price: 12.5, unit: "Capsule", expiry: "2027-08-15", manufacturer: "Cipla Healthcare" },
  { id: "MED-002", name: "Paracetamol 650mg (Dolo)", category: "Analgesic / Antipyretic", stock: 45, minStock: 150, price: 3.2, unit: "Tablet", expiry: "2027-11-20", manufacturer: "Micro Labs" },
  { id: "MED-003", name: "Atorvastatin 20mg", category: "Cardiovascular", stock: 240, minStock: 80, price: 18.0, unit: "Tablet", expiry: "2028-02-10", manufacturer: "Sun Pharma" },
  { id: "MED-004", name: "Metformin 500mg SR", category: "Antidiabetic", stock: 520, minStock: 120, price: 6.5, unit: "Tablet", expiry: "2027-09-05", manufacturer: "Lupin Ltd" },
  { id: "MED-005", name: "Pantoprazole 40mg (Pan 40)", category: "Antacid / PPI", stock: 380, minStock: 100, price: 9.8, unit: "Tablet", expiry: "2027-06-30", manufacturer: "Alkem Labs" },
  { id: "MED-006", name: "Ceftriaxone 1g Injection", category: "Antibiotic IV", stock: 18, minStock: 50, price: 110.0, unit: "Vial", expiry: "2026-12-15", manufacturer: "Mankind Pharma" },
  { id: "MED-007", name: "Salbutamol Inhaler (100mcg)", category: "Respiratory", stock: 85, minStock: 30, price: 145.0, unit: "Inhaler", expiry: "2027-04-18", manufacturer: "Cipla" },
  { id: "MED-008", name: "Normal Saline 0.9% (500ml)", category: "IV Fluid", stock: 190, minStock: 80, price: 42.0, unit: "Bottle", expiry: "2028-01-01", manufacturer: "Baxter Healthcare" },
  { id: "MED-009", name: "Enoxaparin 40mg/0.4ml", category: "Anticoagulant", stock: 28, minStock: 40, price: 385.0, unit: "Prefilled Syringe", expiry: "2027-05-12", manufacturer: "Sanofi" },
  { id: "MED-010", name: "Azithromycin 500mg", category: "Antibiotic", stock: 210, minStock: 60, price: 24.0, unit: "Tablet", expiry: "2027-10-25", manufacturer: "Zydus Cadila" }
];

export const INITIAL_LAB_TESTS = [
  {
    id: "LAB-801",
    patientName: "Amitav Roy",
    patientId: "PAT-001",
    testName: "Complete Lipid Profile",
    department: "Biochemistry",
    doctorName: "Dr. Rajesh Sharma",
    date: "2026-10-31",
    status: "Completed",
    parameters: [
      { name: "Total Cholesterol", result: "248 mg/dL", normal: "< 200 mg/dL", flag: "HIGH" },
      { name: "Triglycerides", result: "192 mg/dL", normal: "< 150 mg/dL", flag: "HIGH" },
      { name: "HDL (Good) Cholesterol", result: "38 mg/dL", normal: "> 40 mg/dL", flag: "LOW" },
      { name: "LDL (Bad) Cholesterol", result: "165 mg/dL", normal: "< 100 mg/dL", flag: "HIGH" }
    ],
    summary: "Dyslipidemia noted. Suggest statin therapy continuation and low fat diet.",
    pathologist: "Dr. Sumit Sen, MD (Pathology)"
  },
  {
    id: "LAB-802",
    patientName: "Bishnu Prasad Das",
    patientId: "PAT-008",
    testName: "HbA1c & Fasting Blood Sugar",
    department: "Clinical Pathology",
    doctorName: "Dr. Arindam Mukherjee",
    date: "2026-10-30",
    status: "Completed",
    parameters: [
      { name: "HbA1c Glycated Hemoglobin", result: "8.9 %", normal: "< 5.7 %", flag: "HIGH" },
      { name: "Fasting Blood Sugar", result: "186 mg/dL", normal: "70 - 100 mg/dL", flag: "HIGH" },
      { name: "Estimated Avg Glucose (eAG)", result: "208 mg/dL", normal: "< 126 mg/dL", flag: "HIGH" }
    ],
    summary: "Poor glycemic control. Insulin dosage adjustment advised.",
    pathologist: "Dr. Sumit Sen, MD (Pathology)"
  },
  {
    id: "LAB-803",
    patientName: "Gurpreet Singh",
    patientId: "PAT-006",
    testName: "Serum Amylase & Lipase Profile",
    department: "Biochemistry",
    doctorName: "Dr. Farhan Qureshi",
    date: "2026-11-01",
    status: "Completed",
    parameters: [
      { name: "Serum Amylase", result: "420 U/L", normal: "28 - 100 U/L", flag: "CRITICAL HIGH" },
      { name: "Serum Lipase", result: "310 U/L", normal: "13 - 60 U/L", flag: "CRITICAL HIGH" }
    ],
    summary: "Markedly elevated enzymes consistent with acute pancreatic inflammation.",
    pathologist: "Dr. Niharika Bose, MD (Pathology)"
  },
  {
    id: "LAB-804",
    patientName: "Kavita Reddy",
    patientId: "PAT-002",
    testName: "Digital X-Ray Right Leg (AP & Lat)",
    department: "Radiology",
    doctorName: "Dr. Vikramaditya Patel",
    date: "2026-10-31",
    status: "Completed",
    parameters: [
      { name: "Bony Alignment", result: "Transverse fracture lower third tibia", normal: "Intact cortical margins", flag: "ABNORMAL" },
      { name: "Fixation Plate", result: "Anatomical locking compression plate in situ", normal: "Normal alignment", flag: "NORMAL" }
    ],
    summary: "Satisfactory post-operative internal fixation noted. No displacement.",
    pathologist: "Dr. A. K. Verma, DMRD (Radiology)"
  },
  {
    id: "LAB-805",
    patientName: "Aarav Sharma",
    patientId: "PAT-004",
    testName: "Complete Blood Count (CBC) with ESR",
    department: "Hematology",
    doctorName: "Dr. Meera Nambiar",
    date: "2026-11-01",
    status: "Processing",
    parameters: [
      { name: "Hemoglobin", result: "11.8 g/dL", normal: "11.5 - 15.5 g/dL", flag: "NORMAL" },
      { name: "Total Leukocyte Count (TLC)", result: "13,800 /mcL", normal: "4,500 - 11,000 /mcL", flag: "HIGH" },
      { name: "Platelet Count", result: "2.4 Lakh /mcL", normal: "1.5 - 4.5 Lakh /mcL", flag: "NORMAL" }
    ],
    summary: "Mild leukocytosis indicating reactive viral/bacterial bronchial response.",
    pathologist: "Dr. Sumit Sen, MD (Pathology)"
  }
];

export const INITIAL_INVOICES = [
  {
    id: "INV-2026-1001",
    patientId: "PAT-001",
    patientName: "Amitav Roy",
    date: "2026-11-01",
    department: "Cardiology",
    doctorName: "Dr. Rajesh Sharma",
    items: [
      { description: "ICU Bed Charges (4 Days @ ₹7,500/day)", qty: 4, rate: 7500, amount: 30000 },
      { description: "Cardiologist Specialist Consultation", qty: 3, rate: 800, amount: 2400 },
      { description: "12-Lead Digital ECG & Echocardiogram", qty: 1, rate: 3200, amount: 3200 },
      { description: "Lipid Profile & Cardiac Troponin-I Test", qty: 1, rate: 2100, amount: 2100 },
      { description: "Emergency Pharmacy & IV Infusions", qty: 1, rate: 4500, amount: 4500 }
    ],
    subtotal: 42200,
    discount: 2200,
    tax: 2000,
    total: 42000,
    status: "Paid",
    paymentMethod: "Star Health Insurance (TPA)",
    insuranceClaimId: "SH-CLM-883921"
  },
  {
    id: "INV-2026-1002",
    patientId: "PAT-002",
    patientName: "Kavita Reddy",
    date: "2026-10-31",
    department: "Orthopedics",
    doctorName: "Dr. Vikramaditya Patel",
    items: [
      { description: "General Ward Bed (2 Days @ ₹1,500/day)", qty: 2, rate: 1500, amount: 3000 },
      { description: "Orthopedic Surgical Theater & Fixation", qty: 1, rate: 28000, amount: 28000 },
      { description: "Digital X-Ray Right Leg (Post-Op)", qty: 1, rate: 950, amount: 950 },
      { description: "Surgical Pharmacy & Antibiotics", qty: 1, rate: 3400, amount: 3400 }
    ],
    subtotal: 35350,
    discount: 1350,
    tax: 1500,
    total: 35500,
    status: "Pending",
    paymentMethod: "UPI / Net Banking"
  },
  {
    id: "INV-2026-1003",
    patientId: "PAT-004",
    patientName: "Aarav Sharma",
    date: "2026-11-01",
    department: "Pediatrics",
    doctorName: "Dr. Meera Nambiar",
    items: [
      { description: "Pediatric OPD Consultation", qty: 1, rate: 600, amount: 600 },
      { description: "Complete Blood Count (CBC) with ESR", qty: 1, rate: 450, amount: 450 },
      { description: "Pediatric Nebulization Therapy", qty: 1, rate: 350, amount: 350 },
      { description: "Prescribed Cough Syrup & Paracetamol", qty: 1, rate: 280, amount: 280 }
    ],
    subtotal: 1680,
    discount: 80,
    tax: 0,
    total: 1600,
    status: "Paid",
    paymentMethod: "Google Pay / Cash"
  },
  {
    id: "INV-2026-1004",
    patientId: "PAT-005",
    patientName: "Zoya Fatima",
    date: "2026-11-01",
    department: "Gynecology",
    doctorName: "Dr. Sneha Kulkarni",
    items: [
      { description: "Antenatal Consultation Fee", qty: 1, rate: 700, amount: 700 },
      { description: "Pelvic Obstetric Ultrasound (Anomaly Scan)", qty: 1, rate: 1800, amount: 1800 },
      { description: "Iron & Calcium Prenatal Supplements (2 Months)", qty: 1, rate: 650, amount: 650 }
    ],
    subtotal: 3150,
    discount: 150,
    tax: 0,
    total: 3000,
    status: "Paid",
    paymentMethod: "Credit Card"
  }
];

export const INITIAL_AMBULANCES = [
  { id: "AMB-01", vehicleNo: "WB-02-AK-4411", type: "Advanced Life Support (ALS)", driver: "Sanjay Mondal", phone: "+91 98319 88771", status: "Available", location: "Hospital Base Station", equipment: "Ventilator, Defibrillator, Syringe Pump" },
  { id: "AMB-02", vehicleNo: "WB-02-BR-9923", type: "Basic Life Support (BLS)", driver: "Tapas Haldar", phone: "+91 98319 88772", status: "En Route", location: "EM Bypass Junction (ETA 8 mins)", equipment: "Oxygen Cylinder, Spine Board, First Aid" },
  { id: "AMB-03", vehicleNo: "WB-02-CP-1029", type: "Cardiac Mobile ICU", driver: "Md. Riaz", phone: "+91 98319 88773", status: "At Scene", location: "Salt Lake Sector V Tech Park", equipment: "Cardiac Monitor, Pacemaker, ALS Kit" },
  { id: "AMB-04", vehicleNo: "WB-02-DF-7782", type: "Basic Life Support (BLS)", driver: "Pradip Roy", phone: "+91 98319 88774", status: "Available", location: "Hospital Base Station", equipment: "Oxygen, Stretcher, First Aid" },
  { id: "AMB-05", vehicleNo: "WB-02-EZ-3345", type: "Neonatal & Pediatric Ambulance", driver: "Bikram Das", phone: "+91 98319 88775", status: "Maintenance", location: "Service Workshop", equipment: "Transport Incubator, Micro-ventilator" }
];

export const INITIAL_NOTIFICATIONS = [
  { id: "NOTIF-1", time: "10 mins ago", title: "Emergency Admission", message: "Patient Gurpreet Singh admitted to ER-01 with acute condition.", type: "danger" },
  { id: "NOTIF-2", time: "25 mins ago", title: "Low Stock Alert", message: "Ceftriaxone 1g Injection inventory has reached 18 vials (minimum is 50).", type: "warning" },
  { id: "NOTIF-3", time: "1 hour ago", title: "Lab Report Generated", message: "Lipid Profile results approved for Amitav Roy (PAT-001).", type: "info" },
  { id: "NOTIF-4", time: "2 hours ago", title: "Discharge Processed", message: "Bed GW-102 vacated and ready for housekeeping inspection.", type: "success" }
];
