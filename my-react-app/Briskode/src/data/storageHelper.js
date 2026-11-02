// Storage Helper to handle persistent localStorage operations with fallbacks

import {
  INITIAL_DOCTORS,
  INITIAL_PATIENTS,
  INITIAL_APPOINTMENTS,
  INITIAL_BEDS,
  INITIAL_MEDICINES,
  INITIAL_LAB_TESTS,
  INITIAL_INVOICES,
  INITIAL_AMBULANCES,
  INITIAL_NOTIFICATIONS
} from './mockData';

const STORAGE_KEYS = {
  DOCTORS: 'pulsecare_doctors',
  PATIENTS: 'pulsecare_patients',
  APPOINTMENTS: 'pulsecare_appointments',
  BEDS: 'pulsecare_beds',
  MEDICINES: 'pulsecare_medicines',
  LAB_TESTS: 'pulsecare_lab_tests',
  INVOICES: 'pulsecare_invoices',
  AMBULANCES: 'pulsecare_ambulances',
  NOTIFICATIONS: 'pulsecare_notifications',
  ROLE: 'pulsecare_active_role'
};

export function loadFromStorage(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item);
  } catch (err) {
    console.error(`Error loading key ${key} from localStorage:`, err);
    return fallback;
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving key ${key} to localStorage:`, err);
  }
}

export function initializeDatabase() {
  const doctors = loadFromStorage(STORAGE_KEYS.DOCTORS, INITIAL_DOCTORS);
  const patients = loadFromStorage(STORAGE_KEYS.PATIENTS, INITIAL_PATIENTS);
  const appointments = loadFromStorage(STORAGE_KEYS.APPOINTMENTS, INITIAL_APPOINTMENTS);
  const beds = loadFromStorage(STORAGE_KEYS.BEDS, INITIAL_BEDS);
  const medicines = loadFromStorage(STORAGE_KEYS.MEDICINES, INITIAL_MEDICINES);
  const labTests = loadFromStorage(STORAGE_KEYS.LAB_TESTS, INITIAL_LAB_TESTS);
  const invoices = loadFromStorage(STORAGE_KEYS.INVOICES, INITIAL_INVOICES);
  const ambulances = loadFromStorage(STORAGE_KEYS.AMBULANCES, INITIAL_AMBULANCES);
  const notifications = loadFromStorage(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  const role = loadFromStorage(STORAGE_KEYS.ROLE, 'Admin');

  // Ensure they are stored
  saveToStorage(STORAGE_KEYS.DOCTORS, doctors);
  saveToStorage(STORAGE_KEYS.PATIENTS, patients);
  saveToStorage(STORAGE_KEYS.APPOINTMENTS, appointments);
  saveToStorage(STORAGE_KEYS.BEDS, beds);
  saveToStorage(STORAGE_KEYS.MEDICINES, medicines);
  saveToStorage(STORAGE_KEYS.LAB_TESTS, labTests);
  saveToStorage(STORAGE_KEYS.INVOICES, invoices);
  saveToStorage(STORAGE_KEYS.AMBULANCES, ambulances);
  saveToStorage(STORAGE_KEYS.NOTIFICATIONS, notifications);
  saveToStorage(STORAGE_KEYS.ROLE, role);

  return {
    doctors,
    patients,
    appointments,
    beds,
    medicines,
    labTests,
    invoices,
    ambulances,
    notifications,
    role
  };
}

export function resetDemoDatabase() {
  saveToStorage(STORAGE_KEYS.DOCTORS, INITIAL_DOCTORS);
  saveToStorage(STORAGE_KEYS.PATIENTS, INITIAL_PATIENTS);
  saveToStorage(STORAGE_KEYS.APPOINTMENTS, INITIAL_APPOINTMENTS);
  saveToStorage(STORAGE_KEYS.BEDS, INITIAL_BEDS);
  saveToStorage(STORAGE_KEYS.MEDICINES, INITIAL_MEDICINES);
  saveToStorage(STORAGE_KEYS.LAB_TESTS, INITIAL_LAB_TESTS);
  saveToStorage(STORAGE_KEYS.INVOICES, INITIAL_INVOICES);
  saveToStorage(STORAGE_KEYS.AMBULANCES, INITIAL_AMBULANCES);
  saveToStorage(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  saveToStorage(STORAGE_KEYS.ROLE, 'Admin');
  return {
    doctors: INITIAL_DOCTORS,
    patients: INITIAL_PATIENTS,
    appointments: INITIAL_APPOINTMENTS,
    beds: INITIAL_BEDS,
    medicines: INITIAL_MEDICINES,
    labTests: INITIAL_LAB_TESTS,
    invoices: INITIAL_INVOICES,
    ambulances: INITIAL_AMBULANCES,
    notifications: INITIAL_NOTIFICATIONS,
    role: 'Admin'
  };
}

export { STORAGE_KEYS };
