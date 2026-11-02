import React, { useState } from 'react';
import {
  HeartPulse,
  Calendar,
  CreditCard,
  FlaskConical,
  Pill,
  User,
  Activity,
  Printer,
  Plus,
  Clock,
  CheckCircle,
  FileText,
  Shield,
  Stethoscope,
  Phone,
  Bed
} from 'lucide-react';

export default function PatientPortalView({
  currentUser,
  patients,
  doctors,
  appointments,
  setAppointments,
  invoices,
  labTests,
  addToast
}) {
  const [activePortalTab, setActivePortalTab] = useState('overview'); // overview, appointments, lab, invoices, book

  // Identify this patient's data
  const myPatientRecord = patients.find(
    (p) => p.id === currentUser.patientId || p.name.toLowerCase().includes(currentUser.name.toLowerCase())
  ) || patients[0];

  const myAppointments = appointments.filter(
    (a) => a.patientName === myPatientRecord.name || a.patientId === myPatientRecord.id
  );

  const myInvoices = invoices.filter(
    (i) => i.patientName === myPatientRecord.name || i.patientId === myPatientRecord.id
  );

  const myLabTests = labTests.filter(
    (l) => l.patientName === myPatientRecord.name || l.patientId === myPatientRecord.id
  );

  // Book appointment form state
  const [bookData, setBookData] = useState({
    doctorName: doctors[0]?.name || 'Dr. Rajesh Sharma',
    date: new Date().toISOString().split('T')[0],
    time: '10:30 AM',
    reason: 'Follow-up cardiology consultation and angina review'
  });

  const handleBookAppointment = (e) => {
    e.preventDefault();
    const docObj = doctors.find((d) => d.name === bookData.doctorName) || doctors[0];

    const newApt = {
      id: `APT-2026-${String(appointments.length + 1).padStart(3, '0')}`,
      patientName: myPatientRecord.name,
      patientId: myPatientRecord.id,
      doctorName: docObj.name,
      doctorId: docObj.id,
      department: docObj.department,
      date: bookData.date,
      time: bookData.time,
      type: 'Patient Portal Booking',
      reason: bookData.reason,
      status: 'Confirmed',
      room: docObj.room
    };

    setAppointments([newApt, ...appointments]);
    addToast(`Consultation appointment booked with ${docObj.name} for ${bookData.date}!`, 'success');
    setActivePortalTab('appointments');
  };

  return (
    <div className="view-container">
      {/* Patient Welcome Banner */}
      <div className="patient-portal-hero">
        <div className="patient-hero-content">
          <div className="flex items-center gap-2 mb-2">
            <span className="badge-pill green">Active Patient Health Portal</span>
            <span className="badge-pill blue">Patient ID: {myPatientRecord.id}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            Welcome, {myPatientRecord.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
            Access your personal clinical records, attending physician notes, live vital telemetry,
            prescribed medicines, and verified diagnostic laboratory results.
          </p>

          <div className="patient-info-chips-row mt-4">
            <div className="info-chip">
              <Bed size={14} className="text-teal-600" />
              <span>Assigned Ward: <strong>{myPatientRecord.bedId || 'OPD / Day Care'}</strong></span>
            </div>
            <div className="info-chip">
              <Stethoscope size={14} className="text-teal-600" />
              <span>Attending Doctor: <strong>{myPatientRecord.doctorAssigned}</strong></span>
            </div>
            <div className="info-chip">
              <HeartPulse size={14} className="text-rose-500" />
              <span>Blood Group: <strong>{myPatientRecord.bloodGroup}</strong></span>
            </div>
          </div>
        </div>

        <div className="patient-portal-action">
          <button
            onClick={() => setActivePortalTab('book')}
            className="btn btn-primary"
          >
            <Calendar size={16} />
            <span>Book Doctor Consultation</span>
          </button>
        </div>
      </div>

      {/* Portal Navigation Tabs */}
      <div className="portal-tabs-bar">
        {[
          { id: 'overview', label: 'My Clinical Summary & Vitals', icon: Activity },
          { id: 'appointments', label: `My Appointments (${myAppointments.length})`, icon: Calendar },
          { id: 'lab', label: `Lab Reports (${myLabTests.length})`, icon: FlaskConical },
          { id: 'invoices', label: `Bills & Receipts (${myInvoices.length})`, icon: CreditCard },
          { id: 'book', label: 'Book New Visit', icon: Plus }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActivePortalTab(tab.id)}
              className={`portal-tab-btn ${activePortalTab === tab.id ? 'active' : ''}`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview & Vitals */}
      {activePortalTab === 'overview' && (
        <div className="space-y-6">
          {/* Vitals Telemetry */}
          <div className="dashboard-card">
            <div className="card-header-row">
              <div className="flex items-center gap-2">
                <Activity size={18} className="text-teal-600" />
                <h3 className="card-title">My Live Physiological Telemetry</h3>
              </div>
              <span className="badge-pill green">Recorded by Nursing Staff</span>
            </div>

            <div className="vitals-grid">
              <div className="vital-box">
                <span className="vital-label">Blood Pressure</span>
                <span className="vital-value">{myPatientRecord.vitals?.bp || '120/80 mmHg'}</span>
                <span className="vital-status normal">Stable Range</span>
              </div>
              <div className="vital-box">
                <span className="vital-label">Heart Pulse</span>
                <span className="vital-value">{myPatientRecord.vitals?.pulse || '74 bpm'}</span>
                <span className="vital-status normal">Regular Rhythm</span>
              </div>
              <div className="vital-box">
                <span className="vital-label">Oxygen SpO2</span>
                <span className="vital-value">{myPatientRecord.vitals?.spo2 || '98%'}</span>
                <span className="vital-status normal">Optimal Saturation</span>
              </div>
              <div className="vital-box">
                <span className="vital-label">Body Temperature</span>
                <span className="vital-value">{myPatientRecord.vitals?.temp || '98.4 °F'}</span>
                <span className="vital-status normal">Normal</span>
              </div>
            </div>
          </div>

          {/* Clinical Details */}
          <div className="analytics-grid">
            <div className="dashboard-card">
              <h3 className="card-title mb-3">Admission & Diagnosis Dossier</h3>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block font-semibold">Primary Diagnosis</span>
                  <p className="text-slate-800 dark:text-slate-100 font-medium text-sm mt-0.5">
                    {myPatientRecord.diagnosis}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Attending Consultant</span>
                  <p className="text-slate-800 dark:text-slate-200 mt-0.5">
                    {myPatientRecord.doctorAssigned} ({myPatientRecord.department})
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Admission Date</span>
                  <p className="text-slate-800 dark:text-slate-200 mt-0.5">{myPatientRecord.admissionDate}</p>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Emergency Next of Kin Contact</span>
                  <p className="text-slate-800 dark:text-slate-200 mt-0.5">{myPatientRecord.emergencyContact}</p>
                </div>
              </div>
            </div>

            <div className="dashboard-card">
              <h3 className="card-title mb-3">Active Inpatient Prescriptions</h3>
              <div className="space-y-2 text-xs">
                {[
                  { name: 'Atorvastatin 20mg', dosage: '1 Tablet at Bedtime', instructions: 'Lipid control / post-dinner' },
                  { name: 'Pantoprazole 40mg', dosage: '1 Tablet Empty Stomach', instructions: 'Morning gastro-protection' },
                  { name: 'Normal Saline 0.9%', dosage: '500ml IV Infusion', instructions: 'Hydration / slowly over 4 hours' }
                ].map((med, i) => (
                  <div key={i} className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-start gap-2.5">
                    <Pill size={16} className="text-teal-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-slate-800 dark:text-slate-100 block">{med.name}</strong>
                      <span className="text-teal-700 dark:text-teal-400 font-medium">{med.dosage}</span>
                      <span className="text-slate-500 block text-[11px]">{med.instructions}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: My Appointments */}
      {activePortalTab === 'appointments' && (
        <div className="dashboard-card">
          <div className="card-header-row">
            <div>
              <h3 className="card-title">My Scheduled OPD Appointments</h3>
              <p className="card-subtitle">Consultation visits booked with hospital specialists</p>
            </div>
            <button onClick={() => setActivePortalTab('book')} className="btn btn-primary btn-sm">
              <Plus size={14} />
              <span>Book Appointment</span>
            </button>
          </div>

          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Appointment ID</th>
                  <th>Specialist Doctor</th>
                  <th>Department</th>
                  <th>Date & Time</th>
                  <th>Reason for Visit</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {myAppointments.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="empty-table-cell">
                      No upcoming appointments scheduled.
                    </td>
                  </tr>
                ) : (
                  myAppointments.map((apt) => (
                    <tr key={apt.id}>
                      <td className="font-mono font-bold text-xs">{apt.id}</td>
                      <td>
                        <div className="font-semibold">{apt.doctorName}</div>
                        <div className="text-xs text-slate-500">{apt.room}</div>
                      </td>
                      <td><span className="type-badge opd">{apt.department}</span></td>
                      <td>
                        <div className="font-medium text-xs">{apt.date}</div>
                        <div className="text-xs text-slate-500">{apt.time}</div>
                      </td>
                      <td className="text-xs text-slate-600 dark:text-slate-300">{apt.reason}</td>
                      <td>
                        <span className={`status-badge-chip ${apt.status.toLowerCase()}`}>
                          {apt.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: My Lab Reports */}
      {activePortalTab === 'lab' && (
        <div className="dashboard-card">
          <div className="card-header-row">
            <div>
              <h3 className="card-title">My Diagnostic & Pathology Reports</h3>
              <p className="card-subtitle">Verified laboratory test results and pathologist impressions</p>
            </div>
          </div>

          <div className="space-y-4">
            {myLabTests.length === 0 ? (
              <div className="empty-table-cell">No diagnostic lab investigations on record.</div>
            ) : (
              myLabTests.map((report) => (
                <div key={report.id} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between items-start flex-wrap gap-2 mb-3">
                    <div>
                      <span className="font-mono text-xs font-semibold text-teal-600 block">Report #{report.id}</span>
                      <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">{report.testName}</h4>
                      <div className="text-xs text-slate-500">
                        {report.department} • Referred by {report.doctorName} • Date: {report.date}
                      </div>
                    </div>
                    <button onClick={() => window.print()} className="btn btn-outline btn-sm">
                      <Printer size={13} />
                      <span>Print Official Report</span>
                    </button>
                  </div>

                  <table className="compact-table w-full mb-3">
                    <thead>
                      <tr>
                        <th>Analyte</th>
                        <th>Observed Result</th>
                        <th>Normal Biological Range</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {report.parameters?.map((p, idx) => (
                        <tr key={idx}>
                          <td className="font-medium">{p.name}</td>
                          <td className="font-bold">{p.result}</td>
                          <td className="text-xs text-slate-500">{p.normal}</td>
                          <td>
                            <span className={`badge-pill ${p.flag === 'NORMAL' ? 'green' : 'red'}`}>
                              {p.flag}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="p-2.5 bg-teal-50 dark:bg-teal-950/20 rounded text-xs text-teal-800 dark:text-teal-300">
                    <strong>Pathologist Note:</strong> {report.summary} ({report.pathologist})
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 4: My Invoices */}
      {activePortalTab === 'invoices' && (
        <div className="dashboard-card">
          <div className="card-header-row">
            <div>
              <h3 className="card-title">My Hospital Invoices & Tax Receipts</h3>
              <p className="card-subtitle">Official GST invoices and cashless insurance claims</p>
            </div>
          </div>

          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Invoice #</th>
                  <th>Date</th>
                  <th>Department</th>
                  <th>Total Amount</th>
                  <th>Payment Method</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {myInvoices.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="empty-table-cell">No hospital invoices found.</td>
                  </tr>
                ) : (
                  myInvoices.map((inv) => (
                    <tr key={inv.id}>
                      <td className="font-mono font-bold text-xs">{inv.id}</td>
                      <td className="text-xs text-slate-500">{inv.date}</td>
                      <td><span className="type-badge opd">{inv.department}</span></td>
                      <td className="font-bold text-slate-900 dark:text-slate-100">
                        ₹{inv.total.toLocaleString('en-IN')}
                      </td>
                      <td className="text-xs text-slate-600 dark:text-slate-300">{inv.paymentMethod}</td>
                      <td>
                        <span className={`status-badge-chip ${inv.status.toLowerCase()}`}>
                          {inv.status}
                        </span>
                      </td>
                      <td>
                        <button onClick={() => window.print()} className="btn btn-outline btn-xs">
                          <Printer size={13} />
                          <span>Print Receipt</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: Book New Consultation */}
      {activePortalTab === 'book' && (
        <div className="dashboard-card max-w-2xl">
          <div className="card-header-row">
            <div>
              <h3 className="card-title">Schedule Doctor Consultation / Health Enquiry</h3>
              <p className="card-subtitle">Select your specialist and preferred clinic timing</p>
            </div>
          </div>

          <form onSubmit={handleBookAppointment} className="space-y-4">
            <div className="form-group">
              <label className="form-label">Consulting Specialist Doctor</label>
              <select
                value={bookData.doctorName}
                onChange={(e) => setBookData({ ...bookData, doctorName: e.target.value })}
                className="form-control"
              >
                {doctors.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name} — {d.specialty} ({d.fee})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Preferred Date</label>
                <input
                  type="date"
                  required
                  value={bookData.date}
                  onChange={(e) => setBookData({ ...bookData, date: e.target.value })}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Preferred Time Slot</label>
                <select
                  value={bookData.time}
                  onChange={(e) => setBookData({ ...bookData, time: e.target.value })}
                  className="form-control"
                >
                  {['09:30 AM', '10:30 AM', '11:15 AM', '02:00 PM', '03:30 PM', '04:30 PM'].map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Symptoms / Enquiry Reason</label>
              <textarea
                rows="3"
                required
                value={bookData.reason}
                onChange={(e) => setBookData({ ...bookData, reason: e.target.value })}
                className="form-control"
                placeholder="Describe your health symptoms or enquiry..."
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-full py-2.5">
              <CheckCircle size={16} />
              <span>Confirm OPD Consultation Booking</span>
            </button>
          </form>
        </div>
      )}

      {/* HIPAA / Privacy Notice */}
      <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500 flex items-center gap-2">
        <Shield size={16} className="text-teal-600 flex-shrink-0" />
        <span>
          <strong>NABH & Digital Personal Data Protected:</strong> You are logged into your confidential Patient Portal.
          Other hospital wards and clinical telemetry are restricted to authorized clinical staff.
        </span>
      </div>
    </div>
  );
}
