import React, { useState } from 'react';
import {
  Bed,
  CheckCircle,
  AlertCircle,
  Clock,
  User,
  Plus,
  Activity,
  Wind,
  Shield,
  X,
  LogOut,
  RotateCw
} from 'lucide-react';

export default function BedsView({
  beds,
  setBeds,
  patients,
  setPatients,
  addToast
}) {
  const [selectedWard, setSelectedWard] = useState('ALL');
  const [admitModalBed, setAdmitModalBed] = useState(null);
  const [selectedPatientId, setSelectedPatientId] = useState('');

  const wards = [
    'ALL',
    'Intensive Care Unit (ICU)',
    'Emergency Trauma Bay',
    'General Ward (Male)',
    'Private Deluxe Suite'
  ];

  const totalBeds = beds.length;
  const occupiedBeds = beds.filter(b => b.status === 'Occupied').length;
  const availableBeds = beds.filter(b => b.status === 'Available').length;
  const maintenanceBeds = beds.filter(b => b.status === 'Maintenance' || b.status === 'Cleaning').length;

  const filteredBeds = beds.filter((b) => {
    if (selectedWard !== 'ALL' && b.ward !== selectedWard) return false;
    return true;
  });

  const handleOpenAdmit = (bed) => {
    setAdmitModalBed(bed);
    // Find first patient without a bed
    const candidate = patients.find(p => !p.bedId || p.bedId.includes('None') || p.bedId === 'N/A');
    if (candidate) {
      setSelectedPatientId(candidate.id);
    } else if (patients.length > 0) {
      setSelectedPatientId(patients[0].id);
    }
  };

  const handleAdmitToBedSubmit = (e) => {
    e.preventDefault();
    if (!admitModalBed || !selectedPatientId) return;

    const patient = patients.find(p => p.id === selectedPatientId);
    if (!patient) return;

    // Update bed
    const updatedBeds = beds.map(b =>
      b.id === admitModalBed.id
        ? { ...b, status: 'Occupied', patientName: patient.name, patientId: patient.id }
        : b
    );
    setBeds(updatedBeds);

    // Update patient
    const updatedPatients = patients.map(p =>
      p.id === patient.id
        ? { ...p, bedId: admitModalBed.id, type: 'Inpatient', status: 'Admitted' }
        : p
    );
    setPatients(updatedPatients);

    addToast(`Patient ${patient.name} successfully admitted to Bed ${admitModalBed.id}!`, 'success');
    setAdmitModalBed(null);
  };

  const handleFreeBed = (bed) => {
    if (window.confirm(`Discharge patient from ${bed.id} and mark bed as available?`)) {
      const patientId = bed.patientId;

      // Update bed
      const updatedBeds = beds.map(b =>
        b.id === bed.id
          ? { ...b, status: 'Available', patientName: null, patientId: null }
          : b
      );
      setBeds(updatedBeds);

      // Update patient status if found
      if (patientId) {
        const updatedPatients = patients.map(p =>
          p.id === patientId ? { ...p, status: 'Discharged' } : p
        );
        setPatients(updatedPatients);
      }

      addToast(`Bed ${bed.id} vacated and ready for housekeeping inspection`, 'info');
    }
  };

  const toggleMaintenance = (bed) => {
    const nextStatus = bed.status === 'Maintenance' ? 'Available' : 'Maintenance';
    const updatedBeds = beds.map(b =>
      b.id === bed.id ? { ...b, status: nextStatus } : b
    );
    setBeds(updatedBeds);
    addToast(`Bed ${bed.id} status set to ${nextStatus}`, 'info');
  };

  return (
    <div className="view-container">
      {/* Header */}
      <div className="view-header-bar">
        <div>
          <h2 className="view-title">Wards & Inpatient Bed Matrix</h2>
          <p className="view-subtitle">
            Visual ward occupancy monitor, ICU ventilator availability, and instantaneous bed allocation.
          </p>
        </div>

        <div className="bed-stat-chips">
          <div className="bed-chip available">
            <span className="dot"></span>
            <span>Available: {availableBeds}</span>
          </div>
          <div className="bed-chip occupied">
            <span className="dot"></span>
            <span>Occupied: {occupiedBeds}</span>
          </div>
          <div className="bed-chip maintenance">
            <span className="dot"></span>
            <span>Maintenance / Cleaning: {maintenanceBeds}</span>
          </div>
        </div>
      </div>

      {/* Ward Filter Tabs */}
      <div className="filter-controls-row">
        <div className="dept-chips-scroll">
          {wards.map((w) => (
            <button
              key={w}
              onClick={() => setSelectedWard(w)}
              className={`chip-btn ${selectedWard === w ? 'active' : ''}`}
            >
              {w === 'ALL' ? `All Wards (${totalBeds})` : w}
            </button>
          ))}
        </div>
      </div>

      {/* Bed Grid Visualizer */}
      <div className="bed-matrix-grid">
        {filteredBeds.map((bed) => {
          const isOccupied = bed.status === 'Occupied';
          const isAvailable = bed.status === 'Available';
          const isMaintenance = bed.status === 'Maintenance' || bed.status === 'Cleaning';
          const isReserved = bed.status === 'Reserved';

          let statusTheme = 'available';
          if (isOccupied) statusTheme = 'occupied';
          if (isMaintenance) statusTheme = 'maintenance';
          if (isReserved) statusTheme = 'reserved';

          return (
            <div key={bed.id} className={`bed-card ${statusTheme}`}>
              <div className="bed-card-header">
                <div className="bed-id-wrap">
                  <Bed size={18} className="bed-icon" />
                  <span className="bed-number">{bed.id}</span>
                </div>
                <span className={`bed-status-pill ${statusTheme}`}>
                  {bed.status}
                </span>
              </div>

              <div className="bed-ward-info">
                <div className="bed-ward-name">{bed.ward}</div>
                <div className="bed-floor-rate">
                  <span>{bed.floor}</span> • <strong>₹{bed.dailyRate.toLocaleString('en-IN')}/day</strong>
                </div>
              </div>

              {/* Equipment badges */}
              <div className="bed-features-row">
                {bed.oxygen && (
                  <span className="feature-badge" title="Central Oxygen Pipeline Connected">
                    <Wind size={12} className="text-teal-500" />
                    <span>O2 Line</span>
                  </span>
                )}
                {bed.ventilator && (
                  <span className="feature-badge critical" title="Advanced Mechanical Ventilator">
                    <Activity size={12} className="text-blue-500" />
                    <span>Ventilator</span>
                  </span>
                )}
              </div>

              {/* Occupancy details */}
              <div className="bed-patient-section">
                {isOccupied ? (
                  <div className="occupied-patient-box">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-100 text-xs">
                      <User size={13} className="text-red-500" />
                      <span>{bed.patientName}</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">ID: {bed.patientId}</div>
                  </div>
                ) : isAvailable ? (
                  <div className="available-bed-prompt">
                    <CheckCircle size={14} className="text-emerald-500" />
                    <span>Sanitized & Ready for Inpatient</span>
                  </div>
                ) : (
                  <div className="maintenance-bed-prompt">
                    <RotateCw size={14} className="text-amber-500" />
                    <span>Scheduled Housekeeping / Sterilization</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="bed-card-actions">
                {isAvailable && (
                  <button
                    onClick={() => handleOpenAdmit(bed)}
                    className="btn btn-primary btn-sm w-full"
                  >
                    <Plus size={13} />
                    <span>Admit Patient Here</span>
                  </button>
                )}

                {isOccupied && (
                  <button
                    onClick={() => handleFreeBed(bed)}
                    className="btn btn-danger btn-sm w-full"
                  >
                    <LogOut size={13} />
                    <span>Discharge / Free Bed</span>
                  </button>
                )}

                {!isOccupied && (
                  <button
                    onClick={() => toggleMaintenance(bed)}
                    className="btn btn-outline btn-xs w-full mt-1.5"
                  >
                    {isMaintenance ? 'Mark as Available' : 'Set to Maintenance'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Admit Patient to Bed Modal */}
      {admitModalBed && (
        <div className="modal-overlay" onClick={() => setAdmitModalBed(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="flex items-center gap-2">
                <Bed size={20} className="text-teal-600" />
                <h3>Admit Inpatient to Bed {admitModalBed.id}</h3>
              </div>
              <button onClick={() => setAdmitModalBed(null)} className="modal-close-btn">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAdmitToBedSubmit}>
              <div className="modal-body">
                <div className="bed-summary-banner mb-4">
                  <div><strong>Ward:</strong> {admitModalBed.ward} ({admitModalBed.floor})</div>
                  <div><strong>Daily Tariff:</strong> ₹{admitModalBed.dailyRate}/day</div>
                  <div><strong>Equipment:</strong> {admitModalBed.ventilator ? 'Ventilator + Oxygen' : 'Standard Pipeline'}</div>
                </div>

                <div className="form-group">
                  <label className="form-label">Select Registered Patient to Admit *</label>
                  <select
                    value={selectedPatientId}
                    onChange={(e) => setSelectedPatientId(e.target.value)}
                    className="form-control"
                    required
                  >
                    {patients.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.id} • {p.age}y/{p.gender} • Current Bed: {p.bedId})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setAdmitModalBed(null)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Confirm Admission to {admitModalBed.id}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
