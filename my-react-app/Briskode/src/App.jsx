import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MobileBottomNav from './components/MobileBottomNav';
import Toast from './components/Toast';
import LoginView from './components/LoginView';
import PatientPortalView from './components/PatientPortalView';
import AccessDeniedView from './components/AccessDeniedView';
import DashboardView from './components/DashboardView';
import PatientsView from './components/PatientsView';
import DoctorsView from './components/DoctorsView';
import AppointmentsView from './components/AppointmentsView';
import BedsView from './components/BedsView';
import PharmacyView from './components/PharmacyView';
import LaboratoryView from './components/LaboratoryView';
import EmergencyView from './components/EmergencyView';
import BillingView from './components/BillingView';
import DocumentationView from './components/DocumentationView';
import NotFoundView from './components/NotFoundView';

import {
  initializeDatabase,
  resetDemoDatabase,
  saveToStorage,
  loadFromStorage,
  STORAGE_KEYS
} from './data/storageHelper';
import { DEMO_USERS } from './data/usersData';

import './App.css';

export default function App() {
  const [db, setDb] = useState(() => initializeDatabase());
  const location = useLocation();
  const navigate = useNavigate();

  // Authentication & Current User State
  const [currentUser, setCurrentUser] = useState(() => {
    return loadFromStorage('pulsecare_logged_user', null);
  });

  const [doctors, setDoctors] = useState(db.doctors);
  const [patients, setPatients] = useState(db.patients);
  const [appointments, setAppointments] = useState(db.appointments);
  const [beds, setBeds] = useState(db.beds);
  const [medicines, setMedicines] = useState(db.medicines);
  const [labTests, setLabTests] = useState(db.labTests);
  const [invoices, setInvoices] = useState(db.invoices);
  const [ambulances, setAmbulances] = useState(db.ambulances);
  const [notifications, setNotifications] = useState(db.notifications);

  // UI States
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Shared Modals / Pre-selections
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [showBookAppointmentModal, setShowBookAppointmentModal] = useState(false);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState('');

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSidebarOpen(false);
  }, [location.pathname]);

  // Dark Mode Class Sync
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [darkMode]);

  // Persist State Changes
  useEffect(() => { saveToStorage(STORAGE_KEYS.DOCTORS, doctors); }, [doctors]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.PATIENTS, patients); }, [patients]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.APPOINTMENTS, appointments); }, [appointments]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.BEDS, beds); }, [beds]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.MEDICINES, medicines); }, [medicines]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.LAB_TESTS, labTests); }, [labTests]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.INVOICES, invoices); }, [invoices]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.AMBULANCES, ambulances); }, [ambulances]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.NOTIFICATIONS, notifications); }, [notifications]);

  // Toast Notification System
  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    saveToStorage('pulsecare_logged_user', user);
    navigate('/');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('pulsecare_logged_user');
    addToast('Signed out of PulseCare Hospital System', 'info');
  };

  // Reset Project Data
  const handleResetData = () => {
    const freshDb = resetDemoDatabase();
    setDoctors(freshDb.doctors);
    setPatients(freshDb.patients);
    setAppointments(freshDb.appointments);
    setBeds(freshDb.beds);
    setMedicines(freshDb.medicines);
    setLabTests(freshDb.labTests);
    setInvoices(freshDb.invoices);
    setAmbulances(freshDb.ambulances);
    setNotifications(freshDb.notifications);
  };

  // Helper to verify permissions
  const canAccess = (moduleName) => {
    if (!currentUser) return false;
    if (currentUser.role === 'Admin') return true;
    return currentUser.permissions?.includes(moduleName);
  };

  // Sidebar live counters
  const sidebarCounts = {
    patients: patients.length,
    doctors: doctors.length,
    appointments: appointments.filter(a => a.status === 'Confirmed' || a.status === 'Pending').length,
    occupiedBeds: beds.filter(b => b.status === 'Occupied').length,
    totalBeds: beds.length,
    lowStockMedCount: medicines.filter(m => m.stock <= m.minStock).length,
    labTests: labTests.length
  };

  // If user is not logged in, show the dynamic entry and multi-role login screen!
  if (!currentUser) {
    return (
      <div className={`app-root ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <LoginView onLogin={handleLogin} addToast={addToast} />
        <Toast toasts={toasts} removeToast={removeToast} />
      </div>
    );
  }

  return (
    <div className={`app-root ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <Navbar
        currentUser={currentUser}
        onLogout={handleLogout}
        notifications={notifications}
        onResetData={handleResetData}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
        addToast={addToast}
      />

      <div className="main-layout-container">
        <Sidebar
          currentUser={currentUser}
          sidebarOpen={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
          counts={sidebarCounts}
        />

        <main className="main-content-area">
          <Routes>
            {/* Root Route: Shows PatientPortal for Patients, Dashboard for staff */}
            <Route
              path="/"
              element={
                currentUser.role === 'Patient' ? (
                  <PatientPortalView
                    currentUser={currentUser}
                    patients={patients}
                    doctors={doctors}
                    appointments={appointments}
                    setAppointments={setAppointments}
                    invoices={invoices}
                    labTests={labTests}
                    addToast={addToast}
                  />
                ) : currentUser.role === 'Pharmacist' ? (
                  <PharmacyView
                    medicines={medicines}
                    setMedicines={setMedicines}
                    addToast={addToast}
                  />
                ) : (
                  <DashboardView
                    patients={patients}
                    doctors={doctors}
                    appointments={appointments}
                    beds={beds}
                    medicines={medicines}
                    invoices={invoices}
                    ambulances={ambulances}
                    openAddPatientModal={() => setShowAddPatientModal(true)}
                    openBookAppointmentModal={() => setShowBookAppointmentModal(true)}
                    role={currentUser.role}
                  />
                )
              }
            />

            <Route
              path="/patients"
              element={
                canAccess('patients') ? (
                  <PatientsView
                    patients={patients}
                    setPatients={setPatients}
                    doctors={doctors}
                    beds={beds}
                    setBeds={setBeds}
                    addToast={addToast}
                    showAddModal={showAddPatientModal}
                    setShowAddModal={setShowAddPatientModal}
                  />
                ) : (
                  <AccessDeniedView currentUser={currentUser} onLogout={handleLogout} />
                )
              }
            />

            <Route
              path="/doctors"
              element={
                canAccess('doctors') ? (
                  <DoctorsView
                    doctors={doctors}
                    setDoctors={setDoctors}
                    setSelectedDoctorForBooking={setSelectedDoctorForBooking}
                    addToast={addToast}
                  />
                ) : (
                  <AccessDeniedView currentUser={currentUser} onLogout={handleLogout} />
                )
              }
            />

            <Route
              path="/appointments"
              element={
                canAccess('appointments') ? (
                  <AppointmentsView
                    appointments={appointments}
                    setAppointments={setAppointments}
                    patients={patients}
                    doctors={doctors}
                    invoices={invoices}
                    setInvoices={setInvoices}
                    selectedDoctorForBooking={selectedDoctorForBooking}
                    setSelectedDoctorForBooking={setSelectedDoctorForBooking}
                    showBookModal={showBookAppointmentModal}
                    setShowBookModal={setShowBookAppointmentModal}
                    addToast={addToast}
                  />
                ) : (
                  <AccessDeniedView currentUser={currentUser} onLogout={handleLogout} />
                )
              }
            />

            <Route
              path="/beds"
              element={
                canAccess('beds') ? (
                  <BedsView
                    beds={beds}
                    setBeds={setBeds}
                    patients={patients}
                    setPatients={setPatients}
                    addToast={addToast}
                  />
                ) : (
                  <AccessDeniedView currentUser={currentUser} onLogout={handleLogout} />
                )
              }
            />

            <Route
              path="/pharmacy"
              element={
                canAccess('pharmacy') ? (
                  <PharmacyView
                    medicines={medicines}
                    setMedicines={setMedicines}
                    addToast={addToast}
                  />
                ) : (
                  <AccessDeniedView currentUser={currentUser} onLogout={handleLogout} />
                )
              }
            />

            <Route
              path="/laboratory"
              element={
                canAccess('laboratory') ? (
                  <LaboratoryView
                    labTests={labTests}
                    setLabTests={setLabTests}
                    patients={patients}
                    doctors={doctors}
                    addToast={addToast}
                  />
                ) : (
                  <AccessDeniedView currentUser={currentUser} onLogout={handleLogout} />
                )
              }
            />

            <Route
              path="/emergency"
              element={
                canAccess('emergency') ? (
                  <EmergencyView
                    ambulances={ambulances}
                    setAmbulances={setAmbulances}
                    patients={patients}
                    openAddPatientModal={() => setShowAddPatientModal(true)}
                    addToast={addToast}
                  />
                ) : (
                  <AccessDeniedView currentUser={currentUser} onLogout={handleLogout} />
                )
              }
            />

            <Route
              path="/billing"
              element={
                canAccess('billing') ? (
                  <BillingView
                    invoices={invoices}
                    setInvoices={setInvoices}
                    patients={patients}
                    doctors={doctors}
                    addToast={addToast}
                  />
                ) : (
                  <AccessDeniedView currentUser={currentUser} onLogout={handleLogout} />
                )
              }
            />

            <Route
              path="/docs"
              element={
                canAccess('docs') ? (
                  <DocumentationView
                    onResetData={handleResetData}
                    addToast={addToast}
                  />
                ) : (
                  <AccessDeniedView currentUser={currentUser} onLogout={handleLogout} />
                )
              }
            />

            <Route path="*" element={<NotFoundView />} />
          </Routes>
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        currentUser={currentUser}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />

      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
