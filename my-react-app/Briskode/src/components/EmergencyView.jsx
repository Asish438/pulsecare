import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Ambulance,
  PhoneCall,
  AlertTriangle,
  Siren,
  MapPin,
  Clock,
  ShieldAlert,
  Send,
  RotateCcw,
  CheckCircle,
  Activity,
  HeartPulse
} from 'lucide-react';

export default function EmergencyView({
  ambulances,
  setAmbulances,
  patients,
  openAddPatientModal,
  addToast
}) {
  const navigate = useNavigate();
  const [dispatchModalAmb, setDispatchModalAmb] = useState(null);
  const [emergencyLocation, setEmergencyLocation] = useState('');

  const criticalPatients = patients.filter(p => p.status === 'Critical' || p.department === 'Emergency');

  const handleDispatch = (amb) => {
    setDispatchModalAmb(amb);
    setEmergencyLocation('');
  };

  const handleConfirmDispatch = (e) => {
    e.preventDefault();
    if (!dispatchModalAmb) return;

    const loc = emergencyLocation.trim() || 'Sector V Tech Park, Kolkata';
    const updated = ambulances.map(a =>
      a.id === dispatchModalAmb.id
        ? { ...a, status: 'En Route', location: `${loc} (ETA 7 mins)` }
        : a
    );
    setAmbulances(updated);
    addToast(`Ambulance ${dispatchModalAmb.vehicleNo} dispatched to ${loc}!`, 'danger');
    setDispatchModalAmb(null);
  };

  const handleReturnToBase = (ambId) => {
    const updated = ambulances.map(a =>
      a.id === ambId
        ? { ...a, status: 'Available', location: 'Hospital Base Station' }
        : a
    );
    setAmbulances(updated);
    addToast('Ambulance returned to base station and sanitized.', 'info');
  };

  return (
    <div className="view-container">
      {/* Header */}
      <div className="view-header-bar">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="view-title">Emergency Trauma & Ambulance Services</h2>
            <span className="badge-pill red">24x7 Emergency Command</span>
          </div>
          <p className="view-subtitle">
            Rapid trauma triage, life-support ambulance telemetry, and disaster response dispatch.
          </p>
        </div>

        <div className="header-actions">
          <button
            onClick={() => {
              navigate('/patients');
              if (openAddPatientModal) openAddPatientModal();
            }}
            className="btn btn-danger"
          >
            <Siren size={16} />
            <span>Admit Trauma / Emergency Patient</span>
          </button>
        </div>
      </div>

      {/* Emergency Hotlines & Triage Banner */}
      <div className="emergency-banner-grid mb-6">
        <div className="emergency-alert-box red">
          <div className="flex items-start gap-3">
            <div className="emergency-icon-wrap red">
              <Siren size={24} />
            </div>
            <div>
              <h4 className="font-bold text-red-800 dark:text-red-300">Code Red Emergency Helpline</h4>
              <p className="text-xs text-red-700 dark:text-red-400 mt-1">
                Direct paramedic hotline: <strong>108 / +91 33 2488 9000</strong>
              </p>
              <div className="text-xs text-red-600 dark:text-red-400 mt-2">
                Trauma Team On Standby • Level-1 Emergency OT Available
              </div>
            </div>
          </div>
        </div>

        <div className="emergency-alert-box amber">
          <div className="flex items-start gap-3">
            <div className="emergency-icon-wrap amber">
              <HeartPulse size={24} />
            </div>
            <div>
              <h4 className="font-bold text-amber-800 dark:text-amber-300">Cardiac Cath Lab Standby</h4>
              <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                Door-to-Balloon protocol active • Interventional Cardiologist on site
              </p>
              <div className="text-xs text-amber-600 dark:text-amber-400 mt-2">
                Cath Lab 1: Primary Angioplasty Ready
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section: Live Trauma Queue */}
      <div className="dashboard-card mb-6">
        <div className="card-header-row">
          <div>
            <h3 className="card-title">Live Triage & Resuscitation Queue</h3>
            <p className="card-subtitle">Patients registered under Emergency & Trauma Bay</p>
          </div>
          <span className="badge-pill red">{criticalPatients.length} Active Trauma Cases</span>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Patient Details</th>
                <th>Triage Priority</th>
                <th>Chief Trauma Complaint</th>
                <th>Assigned ER Bed</th>
                <th>Vitals (BP / SpO2 / Pulse)</th>
                <th>Attending ER Doctor</th>
              </tr>
            </thead>
            <tbody>
              {criticalPatients.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-table-cell">
                    No active trauma patients in triage queue.
                  </td>
                </tr>
              ) : (
                criticalPatients.map(p => (
                  <tr key={p.id}>
                    <td>
                      <div className="font-semibold text-slate-800 dark:text-slate-100">{p.name}</div>
                      <div className="text-xs text-slate-500">{p.id} • {p.age}y/{p.gender} • {p.bloodGroup}</div>
                    </td>
                    <td>
                      <span className="triage-badge red">
                        Priority 1 - Immediate Resuscitation
                      </span>
                    </td>
                    <td className="text-xs text-slate-700 dark:text-slate-300 max-w-xs">
                      {p.diagnosis}
                    </td>
                    <td>
                      <span className="bed-code-badge">{p.bedId}</span>
                    </td>
                    <td>
                      <div className="text-xs font-mono font-medium text-slate-800 dark:text-slate-200">
                        BP: {p.vitals?.bp} • SpO2: {p.vitals?.spo2} • Pulse: {p.vitals?.pulse}
                      </div>
                    </td>
                    <td className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      {p.doctorAssigned}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section: Ambulance Fleet Board */}
      <div className="dashboard-card">
        <div className="card-header-row">
          <div>
            <h3 className="card-title">Hospital Ambulance Fleet Monitor</h3>
            <p className="card-subtitle">Live GPS status and real-time dispatch simulator</p>
          </div>
        </div>

        <div className="ambulance-grid">
          {ambulances.map((amb) => {
            const isAvail = amb.status === 'Available';
            const isEnRoute = amb.status === 'En Route' || amb.status === 'At Scene';

            return (
              <div key={amb.id} className="ambulance-card">
                <div className="amb-header">
                  <div className="amb-title-wrap">
                    <Ambulance size={20} className={isEnRoute ? "text-red-500" : "text-teal-600"} />
                    <span className="font-bold text-slate-900 dark:text-slate-100">{amb.vehicleNo}</span>
                  </div>
                  <span className={`status-badge-chip ${isAvail ? 'admitted' : isEnRoute ? 'critical' : 'discharged'}`}>
                    {amb.status}
                  </span>
                </div>

                <div className="amb-type-tag">{amb.type}</div>

                <div className="amb-details">
                  <div className="amb-detail-row">
                    <span className="label">Driver:</span>
                    <span className="val">{amb.driver} ({amb.phone})</span>
                  </div>
                  <div className="amb-detail-row">
                    <MapPin size={13} className="text-slate-400" />
                    <span className="val font-semibold">{amb.location}</span>
                  </div>
                  <div className="amb-detail-row">
                    <span className="label">Equipment:</span>
                    <span className="val text-xs text-slate-500">{amb.equipment}</span>
                  </div>
                </div>

                <div className="amb-actions">
                  {isAvail && (
                    <button
                      onClick={() => handleDispatch(amb)}
                      className="btn btn-danger btn-sm w-full"
                    >
                      <Send size={13} />
                      <span>Dispatch to Emergency Location</span>
                    </button>
                  )}
                  {isEnRoute && (
                    <button
                      onClick={() => handleReturnToBase(amb.id)}
                      className="btn btn-outline btn-sm w-full"
                    >
                      <RotateCcw size={13} />
                      <span>Return to Base Station</span>
                    </button>
                  )}
                  {amb.status === 'Maintenance' && (
                    <button
                      onClick={() => handleReturnToBase(amb.id)}
                      className="btn btn-secondary btn-sm w-full"
                    >
                      Mark Maintenance Complete
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dispatch Simulator Modal */}
      {dispatchModalAmb && (
        <div className="modal-overlay" onClick={() => setDispatchModalAmb(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="flex items-center gap-2">
                <Siren size={20} className="text-red-600" />
                <h3>Dispatch Emergency Ambulance {dispatchModalAmb.vehicleNo}</h3>
              </div>
              <button onClick={() => setDispatchModalAmb(null)} className="modal-close-btn">
                <RotateCcw size={20} />
              </button>
            </div>

            <form onSubmit={handleConfirmDispatch}>
              <div className="modal-body">
                <div className="bed-summary-banner mb-4">
                  <div><strong>Vehicle:</strong> {dispatchModalAmb.vehicleNo} ({dispatchModalAmb.type})</div>
                  <div><strong>Paramedic Pilot:</strong> {dispatchModalAmb.driver}</div>
                </div>

                <div className="form-group">
                  <label className="form-label">Incident / Pickup Location *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Park Street Metro Station, Kolkata"
                    value={emergencyLocation}
                    onChange={(e) => setEmergencyLocation(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setDispatchModalAmb(null)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-danger">
                  Authorize Immediate Siren Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
