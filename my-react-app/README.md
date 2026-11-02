# 🏥 PulseCare HMS — Smart Hospital Management System
> **College Semester Project & Viva Presentation Ready**  
> Built with **React 19**, **Vite 8.x**, **Lucide Icons**, and **Reactive LocalStorage Engine**

---

## 📌 Project Overview
**PulseCare HMS** is a modern, responsive, full-featured Hospital Management Platform engineered for clinical workflow automation, inpatient bed management, outpatient scheduling, pharmacy stock management, diagnostic investigations, and medical billing.

Designed specifically to meet the evaluation standards of final-year university and college semester project vivas, it runs **100% locally with zero backend configuration** while offering complete state persistence, printable receipts, and rich interactive dashboards.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Installation & Run
Open your terminal in this directory:
```bash
# 1. Install dependencies (if not already installed)
npm install

# 2. Start local development server
npm run dev
```

> **Note for Windows PowerShell users:** If PowerShell execution policy restricts scripts, use `npm.cmd run dev` or run in Command Prompt (CMD).

The application will launch at:  
👉 `http://localhost:5173/`

---

## ✨ Core Modules & Features

### 1. 📊 Executive Dashboard & KPIs
- Real-time stat telemetry: Registered Patients, Available Beds, Active Specialists, Scheduled OPD Visits, Revenue.
- Weekly Patient Inflow comparison chart (OPD visits vs IPD admissions).
- Ward occupancy visual meters (ICU, Trauma Bay, General Ward, Deluxe Suites).
- Emergency Code alerts ticker & quick admission launcher.

### 2. 👥 Inpatient & Outpatient Management (IPD & OPD)
- Searchable patient registry filtered by Inpatient, Outpatient, Critical, and Discharged.
- **Patient Clinical Dossier Modal**: Live vitals (BP, Heart Rate, SpO2, Temperature), attending doctor, medical history, and emergency contact.
- "Admit New Patient" wizard with automatic bed assignment.
- Discharge workflow that automatically frees the assigned hospital bed.

### 3. 👨‍⚕️ Doctors & Medical Specialists Directory
- Multi-department filter: Cardiology, Neurology, Orthopedics, Pediatrics, General Medicine, Gynecology, Emergency, Dermatology.
- Specialist profile cards with qualifications, experience, OPD chamber, consultation fees, and patient ratings.
- Real-time duty toggle (`Available`, `In Surgery`, `Off Duty`).
- One-click OPD appointment booking linked directly to chosen doctor.

### 4. 📅 Outpatient (OPD) Scheduling & Queue
- Interactive appointment booking wizard with slot picker (morning and afternoon clinics).
- Appointment lifecycle tracking (`Confirmed` ➔ `Completed` ➔ `Cancelled`).
- Quick Consultation Bill generator that converts completed appointments into formal invoices.

### 5. 🏥 Interactive Ward & Bed Matrix Visualizer
- Visual grid for **ICU**, **Emergency Trauma Bay**, **General Wards**, and **Private Deluxe Suites**.
- Real-time color-coded indicators: 🟢 Available, 🔴 Occupied, 🟡 Maintenance/Housekeeping, 🔵 Reserved.
- Equipment badges for Central Oxygen Pipeline and Mechanical Ventilators.
- One-click inpatient admission to specific bed numbers and instant bed vacation.

### 6. 💊 Pharmacy & Drug Inventory Control
- Complete formulary tracking (Antibiotics, Analgesics, Antidiabetics, Cardiovascular, IV Fluids).
- Automated safety stock warnings when inventory drops below threshold.
- Interactive **Medicine Dispenser** modal with automatic stock deductions.
- Quick restock button (`+50 units`).

### 7. 🔬 Diagnostics & Clinical Pathology
- Investigation orders across Biochemistry, Hematology, Radiology, and Clinical Pathology.
- Abnormal parameter flagging (NORMAL, HIGH, LOW, CRITICAL).
- **Official Printable Pathology Report**: Standard reference intervals, clinical interpretation, and digital pathologist verification.

### 8. 🚑 Emergency Trauma & Ambulance Telemetry
- Priority-1 Code Red resuscitation intake queue.
- Emergency cardiac and trauma hotline banner (108 / 1800-PULSE).
- Ambulance fleet tracking board with interactive **Siren Dispatch Simulator**.

### 9. 💳 Billing, Invoices & Cashless Insurance (TPA)
- Comprehensive accounts register with Paid vs Pending filters.
- Dynamic line-item invoice builder with customizable items, fees, and GST tax calculations.
- **Printable Formal Hospital Tax Invoice Receipt**: Hospital letterhead, GSTIN, itemized charges, and authorized signatory.

### 10. 🎓 Semester Project Documentation & Viva Voce Guide
- Dedicated in-app tab containing project objectives, architecture flow diagram, and relational entity models.
- **Top 5 Viva Voce Questions & Answers** for examiners and project defense.
- One-click **"Reset Demo Data"** button to restore the project to a pristine initial state at any time during presentations.

---

## 🛠️ Technology Stack
| Layer | Technology |
|---|---|
| **Frontend Framework** | React 19 (Hooks, Functional Architecture) |
| **Build Tool & Bundler** | Vite 8.x (Lightning-fast HMR) |
| **Icons & Visuals** | Lucide React |
| **State & Persistence** | Browser LocalStorage Reactive Engine |
| **Styling** | Custom CSS3 with CSS Variables & Dark/Light Mode |
| **Printing** | CSS `@media print` Subsystem |

---

## 📁 Project Structure
```
my-react-app/
├── index.html                 # HTML Entry with Title & Favicon
├── package.json               # NPM Dependencies & Scripts
├── vite.config.js             # Vite Configuration
├── public/
│   ├── favicon.svg            # Hospital heartbeat brand icon
│   └── icons.svg
└── src/
    ├── main.jsx               # Application Bootstrap
    ├── App.jsx                # Root Component & State Synchronization
    ├── App.css                # Healthcare UI System & Print CSS
    ├── index.css              # Typography & CSS Custom Properties
    ├── data/
    │   ├── mockData.js        # Seed Database (Doctors, Patients, Beds, etc.)
    │   └── storageHelper.js   # LocalStorage Persistence & Reset Engine
    └── components/
        ├── Navbar.jsx         # Header with Clock, Roles, Alerts & Dark Mode
        ├── Sidebar.jsx        # Navigation Sidebar with Live Badges
        ├── Toast.jsx          # Interactive User Feedback Alerts
        ├── DashboardView.jsx  # Main Operations & Analytics Hub
        ├── PatientsView.jsx   # Inpatient & Outpatient Management
        ├── DoctorsView.jsx    # Specialist Directory & Timings
        ├── AppointmentsView.jsx # OPD Appointment Scheduler
        ├── BedsView.jsx       # Interactive Bed Matrix Visualizer
        ├── PharmacyView.jsx   # Medicine Inventory & Dispenser
        ├── LaboratoryView.jsx # Diagnostics & Printable Lab Reports
        ├── EmergencyView.jsx  # Trauma Queue & Ambulance Dispatch
        ├── BillingView.jsx    # Cashless TPA & Printable Invoices
        └── DocumentationView.jsx # Academic Synopsis & Viva Guide
```

---

## 🎯 Viva Examination Tips
When presenting to the examiner:
1. **Highlight Atomic State Consistency:** Explain how admitting a patient automatically updates both the Patient's status and the Bed's occupancy status across the Dashboard in real time.
2. **Demonstrate Persistence:** Add a patient or change a bed's status, reload the page, and show that all changes remain saved.
3. **Showcase Printability:** Open an invoice or a diagnostic report and click the "Print" button to demonstrate clean paper formatting.
4. **Use Role Switcher:** Demonstrate how changing the active role in the header (Admin, Doctor, Receptionist, Patient) showcases role-based healthcare architecture.
5. **Reset Demo:** Point out the "Reset Demo Data" button in the navigation bar to reset the database back to initial sample records.

---
© 2026 PulseCare Healthcare Cloud. Crafted for Semester Academic Evaluation.
