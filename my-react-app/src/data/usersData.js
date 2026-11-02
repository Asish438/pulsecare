// Pre-configured Role Accounts for PulseCare Hospital Management System

export const DEMO_USERS = [
  {
    id: "USER-ADMIN",
    role: "Admin",
    name: "Dr. Vikram Seth (Director)",
    email: "admin@pulsecare.org",
    password: "Admin@2026!",
    badge: "Hospital Administrator",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    description: "Complete access across all clinical, financial, administrative, and inventory modules.",
    permissions: [
      "dashboard",
      "patients",
      "doctors",
      "appointments",
      "beds",
      "pharmacy",
      "laboratory",
      "emergency",
      "billing",
      "docs"
    ]
  },
  {
    id: "USER-DOCTOR",
    role: "Doctor",
    name: "Dr. Rajesh Sharma",
    email: "doctor@pulsecare.org",
    password: "Doctor@2026!",
    badge: "Head of Cardiology",
    doctorRefId: "DOC-101",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80",
    description: "Clinical workbench: Patient vitals, OPD appointments, pathology orders, and bed rounds.",
    permissions: [
      "dashboard",
      "patients",
      "appointments",
      "beds",
      "laboratory",
      "emergency"
    ]
  },
  {
    id: "USER-PHARMA",
    role: "Pharmacist",
    name: "Pooja Hegde, M.Pharm",
    email: "pharma@pulsecare.org",
    password: "Pharma@2026!",
    badge: "Chief Pharmacist",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    description: "Dispensary desk: Medicine inventory, batch expiry control, and inpatient prescription dispensing.",
    permissions: [
      "pharmacy",
      "patients",
      "emergency"
    ]
  },
  {
    id: "USER-RECEPTION",
    role: "Receptionist",
    name: "Anil Deshmukh",
    email: "reception@pulsecare.org",
    password: "Reception@2026!",
    badge: "Front Desk & Admissions",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    description: "Front office: Patient admission intake, OPD appointment tokens, and room allocation.",
    permissions: [
      "dashboard",
      "patients",
      "appointments",
      "beds",
      "billing"
    ]
  },
  {
    id: "USER-PATIENT",
    role: "Patient",
    name: "Amitav Roy",
    email: "patient@pulsecare.org",
    password: "Patient@2026!",
    patientId: "PAT-001",
    badge: "Registered Inpatient",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    description: "Patient Health Portal: Book appointments, view attending doctor, check lab reports, and download bills.",
    permissions: [
      "portal",
      "appointments"
    ]
  }
];

export const ROLE_PERMISSIONS_MAP = {
  Admin: [
    "dashboard",
    "patients",
    "doctors",
    "appointments",
    "beds",
    "pharmacy",
    "laboratory",
    "emergency",
    "billing",
    "docs"
  ],
  Doctor: [
    "dashboard",
    "patients",
    "appointments",
    "beds",
    "laboratory",
    "emergency"
  ],
  Pharmacist: [
    "pharmacy",
    "patients",
    "emergency"
  ],
  Receptionist: [
    "dashboard",
    "patients",
    "appointments",
    "beds",
    "billing"
  ],
  Patient: [
    "portal",
    "appointments"
  ]
};

// Strict Password Validation: must contain a-z, A-Z, 0-9, special char, min 8 chars
export function validatePasswordCriteria(pwd = '') {
  const hasLower = /[a-z]/.test(pwd);
  const hasUpper = /[A-Z]/.test(pwd);
  const hasDigit = /[0-9]/.test(pwd);
  const hasSpecial = /[^A-Za-z0-9]/.test(pwd);
  const hasLength = pwd.length >= 8;
  const isValid = hasLower && hasUpper && hasDigit && hasSpecial && hasLength;

  return {
    hasLower,
    hasUpper,
    hasDigit,
    hasSpecial,
    hasLength,
    isValid
  };
}

// Mandatory Email Validation
export function validateEmailFormat(email = '') {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}
