import React from 'react';
import {
  GraduationCap,
  BookOpen,
  Layers,
  Database,
  Cpu,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Award,
  Code
} from 'lucide-react';

export default function DocumentationView({ onResetData, addToast }) {
  return (
    <div className="view-container">
      {/* Header */}
      <div className="view-header-bar">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="view-title">Semester Project Documentation & Viva Guide</h2>
            <span className="badge-pill blue">Academic & Viva Defense Ready</span>
          </div>
          <p className="view-subtitle">
            Comprehensive system specifications, ER schema, architecture flow, and viva examination cheat-sheet.
          </p>
        </div>

        <div className="header-actions">
          <button
            onClick={() => {
              if (window.confirm("Reset all project data to initial pristine demo state?")) {
                onResetData();
                addToast("Project database restored to original demo data!", "success");
              }
            }}
            className="btn btn-primary"
          >
            <RotateCcw size={15} />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>

      {/* Project Synopsis Banner */}
      <div className="dashboard-card mb-6 bg-gradient-to-r from-teal-500/10 via-sky-500/10 to-indigo-500/10 border-teal-500/20">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-teal-600 text-white rounded-xl">
            <Award size={32} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="badge-pill green">Final Year / Semester Project</span>
              <span className="badge-pill purple">Healthcare Informatics</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
              PulseCare HMS — Smart Hospital & Clinical Management Cloud
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              PulseCare is a comprehensive enterprise hospital management platform designed to automate
              clinical workflows, digitize inpatient bed allocation, streamline outpatient appointments,
              monitor pharmaceutical inventories, report lab telemetry, and generate compliant GST tax invoices.
            </p>
          </div>
        </div>
      </div>

      {/* 2-Column: Modules & Architecture */}
      <div className="analytics-grid mb-6">
        {/* Module Breakdown */}
        <div className="dashboard-card">
          <div className="card-header-row">
            <div className="flex items-center gap-2">
              <Layers size={18} className="text-teal-600" />
              <h3 className="card-title">Core Subsystems & Modules</h3>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <strong className="text-slate-900 dark:text-slate-100 block">1. Patient Inpatient & Outpatient Registry:</strong>
              <span className="text-slate-600 dark:text-slate-400">
                Complete clinical dossier, age, gender, blood group, diagnosis, vital telemetry (BP, SpO2, Pulse, Temp), and discharge workflow.
              </span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <strong className="text-slate-900 dark:text-slate-100 block">2. Inpatient Ward & Bed Matrix:</strong>
              <span className="text-slate-600 dark:text-slate-400">
                Interactive real-time visualizer across ICU, Trauma Bay, General Wards, and Deluxe Suites with ventilator and oxygen support status.
              </span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <strong className="text-slate-900 dark:text-slate-100 block">3. OPD Scheduling & Consultation Queue:</strong>
              <span className="text-slate-600 dark:text-slate-400">
                Time slot allocation, attending specialist linkage, appointment completion, and instant consultation bill generation.
              </span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <strong className="text-slate-900 dark:text-slate-100 block">4. Pharmacy Formulary & Safety Stock:</strong>
              <span className="text-slate-600 dark:text-slate-400">
                Inventory tracking, batch expiration dates, automated low-stock warnings, and safe medicine dispensing module.
              </span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <strong className="text-slate-900 dark:text-slate-100 block">5. Diagnostics & Clinical Pathology:</strong>
              <span className="text-slate-600 dark:text-slate-400">
                Biochemistry, Hematology, and Radiology order workflows with biological reference range validation and electronic printable report cards.
              </span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <strong className="text-slate-900 dark:text-slate-100 block">6. Emergency Trauma & Ambulance Fleet:</strong>
              <span className="text-slate-600 dark:text-slate-400">
                Priority-1 Code Red triage queue and real-time ambulance dispatch telemetry simulator.
              </span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <strong className="text-slate-900 dark:text-slate-100 block">7. Billing, Invoices & Cashless TPA:</strong>
              <span className="text-slate-600 dark:text-slate-400">
                Itemized line items, GST taxation, discount concession, and official print-ready hospital invoice receipt generator.
              </span>
            </div>
          </div>
        </div>

        {/* Architecture & Tech Stack */}
        <div className="dashboard-card">
          <div className="card-header-row">
            <div className="flex items-center gap-2">
              <Cpu size={18} className="text-teal-600" />
              <h3 className="card-title">Technology Stack & Engineering Design</h3>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <span className="text-slate-400 block">Frontend Framework</span>
                <strong className="text-teal-600 font-bold text-sm">React 19 (Hooks)</strong>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <span className="text-slate-400 block">Build System & Bundler</span>
                <strong className="text-teal-600 font-bold text-sm">Vite 8.x (Lightning HMR)</strong>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <span className="text-slate-400 block">State Engine</span>
                <strong className="text-teal-600 font-bold text-sm">LocalStorage Reactive Store</strong>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <span className="text-slate-400 block">Iconography</span>
                <strong className="text-teal-600 font-bold text-sm">Lucide React SVG</strong>
              </div>
            </div>

            <div className="p-3 border border-slate-200 dark:border-slate-800 rounded-lg">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">Architecture Flow Diagram</h4>
              <div className="bg-slate-900 text-teal-400 p-3 rounded font-mono text-[11px] leading-relaxed">
                [User / Faculty Browser] <br />
                &nbsp;&nbsp;&nbsp;&nbsp;│ <br />
                &nbsp;&nbsp;&nbsp;&nbsp;▼ <br />
                [React 19 Single Page Application (SPA)] <br />
                &nbsp;&nbsp;&nbsp;&nbsp;├── Navbar & Role Access Controller <br />
                &nbsp;&nbsp;&nbsp;&nbsp;├── Modular Clinical Views (OPD, IPD, ICU, Pharmacy) <br />
                &nbsp;&nbsp;&nbsp;&nbsp;├── Toast & Notification Bus <br />
                &nbsp;&nbsp;&nbsp;&nbsp;└── Print Subsystem (@media print CSS) <br />
                &nbsp;&nbsp;&nbsp;&nbsp;│ <br />
                &nbsp;&nbsp;&nbsp;&nbsp;▼ <br />
                [Persistent LocalStorage Data Layer]
              </div>
            </div>

            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded-lg">
              <div className="flex items-center gap-2 font-semibold text-emerald-800 dark:text-emerald-300">
                <ShieldCheck size={16} />
                <span>Zero External Backend Dependency</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                The application runs 100% locally out-of-the-box. Any mutation (booking, admission, dispensing, billing)
                persists immediately in the browser storage, surviving reloads and browser restarts without requiring database servers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Viva Voce Questions & Answers Cheat Sheet */}
      <div className="dashboard-card">
        <div className="card-header-row">
          <div className="flex items-center gap-2">
            <HelpCircle size={18} className="text-teal-600" />
            <h3 className="card-title">Viva Voce Preparation — Examiner Questions & Answers</h3>
          </div>
          <span className="badge-pill purple">Top Viva Scoring Points</span>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "Q1. What is the primary objective and real-world significance of this Hospital Management System?",
              a: "PulseCare HMS solves the critical issue of hospital operational fragmentation by unifying patient admission (IPD), outpatient consultation (OPD), ICU bed allocation, pharmacy stock monitoring, and GST billing into a coherent digital interface. It eliminates manual paper friction, prevents bed double-booking, and ensures transparency in medical charges."
            },
            {
              q: "Q2. How does the system handle state persistence and relational integrity between modules without a dedicated SQL backend?",
              a: "The project leverages a centralized Reactive Storage Engine built on top of browser LocalStorage with schema validation. When a patient is admitted to a bed, the system performs an atomic update: Bed status is marked 'Occupied' with patient metadata, while the Patient entity receives the assigned Bed ID. If the patient is discharged, the bed is automatically freed and marked ready for sanitization."
            },
            {
              q: "Q3. What is the advantage of using Vite over Create React App (CRA)?",
              a: "Vite uses native ES modules (ESM) during development, eliminating bundling overhead during dev server startup. Hot Module Replacement (HMR) operates in milliseconds regardless of project scale. In production, Vite uses Rollup with advanced tree-shaking, resulting in an ultra-compact production bundle (<250 KB) that loads instantaneously."
            },
            {
              q: "Q4. How is responsive styling and Dark Mode implemented?",
              a: "Styling is implemented using CSS custom properties (variables) defined at the :root and [data-theme='dark'] levels. When the user toggles dark mode, the document attribute flips, updating all palette tokens (backgrounds, text, borders, glassmorphic shadows) simultaneously with zero component re-render overhead."
            },
            {
              q: "Q5. How can this project be scaled to an enterprise production deployment in future?",
              a: "The modular component architecture cleanly separates the UI layer from the data layer (storageHelper.js). To transition to production, one simply replaces the localStorage API calls in storageHelper.js with REST / GraphQL fetch endpoints connecting to a Node.js/Express or Spring Boot backend with a PostgreSQL or MongoDB database, while adding JWT auth tokens."
            }
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700/60">
              <h4 className="font-bold text-sm text-teal-800 dark:text-teal-300 mb-1.5 flex items-center gap-2">
                <CheckCircle size={15} className="text-teal-600" />
                <span>{item.q}</span>
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pl-6">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
