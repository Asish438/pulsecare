import React, { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  Filter,
  Eye,
  LogOut,
  Heart,
  Activity,
  Phone,
  MapPin,
  Calendar,
  Stethoscope,
  X,
  CheckCircle,
  FileText,
  Printer
} from 'lucide-react';

export default function PatientsView({
  patients,
  setPatients,
  doctors,
  beds,
  setBeds,
  addToast,
  showAddModal,
  setShowAddModal
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL'); // ALL, INPATIENT, OUTPATIENT, CRITICAL
  const [selectedPatient, setSelectedPatient] = useState(null);

  // New Patient Form State
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    bloodGroup: 'B+',
    phone: '',
    address: '',
    type: 'Inpatient',
    department: 'General Medicine',
    doctorAssigned: doctors[0]?.name || 'Dr. Rajesh Sharma',
    bedId: 'GW-101',
    diagnosis: '',
    emergencyContact: '',
    vitals: {
      bp: '120/80 mmHg',
      pulse: '72 bpm',
      spo2: '98%',
      temp: '98.6 °F'
    }
  });

  // Filter patients
  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phone.includes(searchTerm) ||
      p.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filterType === 'INPATIENT') return p.type === 'Inpatient';
    if (filterType === 'OUTPATIENT') return p.type === 'Outpatient';
    if (filterType === 'CRITICAL') return p.status === 'Critical';
    if (filterType === 'ADMITTED') return p.status === 'Admitted';
    return true;
  });

  const handleCreatePatient = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.age) {
      addToast('Please enter patient name and age', 'error');
      return;
    }

    const newId = `PAT-${String(patients.length + 1).padStart(3, '0')}`;
    const newPatient = {
      id: newId,
      name: formData.name,
      age: parseInt(formData.age, 10),
      gender: formData.gender,
      bloodGroup: formData.bloodGroup,
      phone: formData.phone || '+91 98000 00000',
      address: formData.address || 'Kolkata, WB',
      type: formData.type,
      department: formData.department,
      doctorAssigned: formData.doctorAssigned,
      bedId: formData.type === 'Inpatient' ? (formData.bedId || 'GW-101') : 'None (OPD)',
      diagnosis: formData.diagnosis || 'Routine clinical assessment',
      admissionDate: new Date().toISOString().split('T')[0],
      status: formData.type === 'Inpatient' ? 'Admitted' : 'Under Observation',
      vitals: formData.vitals,
      emergencyContact: formData.emergencyContact || 'Family Member'
    };

    const updatedPatients = [newPatient, ...patients];
    setPatients(updatedPatients);

    // If bed allocated, update bed status
    if (formData.type === 'Inpatient' && formData.bedId && formData.bedId !== 'None (OPD)') {
      const updatedBeds = beds.map((b) =>
        b.id === formData.bedId
          ? { ...b, status: 'Occupied', patientName: newPatient.name, patientId: newPatient.id }
          : b
      );
      setBeds(updatedBeds);
    }

    addToast(`Patient ${newPatient.name} (${newId}) admitted successfully!`, 'success');
    setShowAddModal(false);
    // Reset form
    setFormData({
      name: '',
      age: '',
      gender: 'Male',
      bloodGroup: 'B+',
      phone: '',
      address: '',
      type: 'Inpatient',
      department: 'General Medicine',
      doctorAssigned: doctors[0]?.name || 'Dr. Rajesh Sharma',
      bedId: 'GW-101',
      diagnosis: '',
      emergencyContact: '',
      vitals: {
        bp: '120/80 mmHg',
        pulse: '72 bpm',
        spo2: '98%',
        temp: '98.6 °F'
      }
    });
  };

  const handleDischargePatient = (patient) => {
    if (window.confirm(`Discharge patient ${patient.name} (${patient.id}) and free assigned bed?`)) {
      const updatedPatients = patients.map((p) =>
        p.id === patient.id ? { ...p, status: 'Discharged' } : p
      );
      setPatients(updatedPatients);

      // Free bed if any
      if (patient.bedId && patient.bedId !== 'None (OPD)') {
        const updatedBeds = beds.map((b) =>
          b.id === patient.bedId
            ? { ...b, status: 'Available', patientName: null, patientId: null }
            : b
        );
        setBeds(updatedBeds);
      }

      addToast(`Patient ${patient.name} discharged. Bed ${patient.bedId} is now available.`, 'info');
      if (selectedPatient?.id === patient.id) {
        setSelectedPatient({ ...selectedPatient, status: 'Discharged' });
      }
    }
  };

  return (
    <div className="view-container">
      {/* Top Header & Search Bar */}
      <div className="view-header-bar">
        <div>
          <h2 className="view-title">Patient Records & Admissions</h2>
          <p className="view-subtitle">
            Manage inpatient admissions, outpatient registry, real-time vitals, and medical histories.
          </p>
        </div>

        <div className="header-actions">
          <button onClick={() => setShowAddModal(true)} className="btn btn-primary">
            <Plus size={16} />
            <span>Admit New Patient</span>
          </button>
        </div>
      </div>

      {/* Controls Bar: Search & Filter Tabs */}
      <div className="filter-controls-row">
        <div className="search-input-wrap">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search by Patient Name, ID, Phone, or Diagnosis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-field"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="search-clear">
              <X size={14} />
            </button>
          )}
        </div>

        <div className="filter-tabs">
          {[
            { id: 'ALL', label: `All (${patients.length})` },
            { id: 'INPATIENT', label: `Inpatients (${patients.filter(p => p.type === 'Inpatient').length})` },
            { id: 'OUTPATIENT', label: `Outpatients (${patients.filter(p => p.type === 'Outpatient').length})` },
            { id: 'CRITICAL', label: `Critical (${patients.filter(p => p.status === 'Critical').length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`filter-tab-btn ${filterType === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Patients Table */}
      <div className="dashboard-card no-padding">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Patient Details</th>
                <th>Category</th>
                <th>Blood Group</th>
                <th>Doctor & Dept</th>
                <th>Ward / Bed</th>
                <th>Status</th>
                <th>Admission Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan="8" className="empty-table-cell">
                    No matching patient records found.
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient) => (
                  <tr key={patient.id}>
                    <td>
                      <div className="patient-name-cell">
                        <div className="patient-avatar">
                          {patient.name.charAt(0)}
                        </div>
                        <div>
                          <div className="patient-name-text">{patient.name}</div>
                          <div className="patient-meta-text">
                            {patient.id} • {patient.age} Yrs • {patient.gender}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`type-badge ${patient.type === 'Inpatient' ? 'ipd' : 'opd'}`}>
                        {patient.type}
                      </span>
                    </td>
                    <td>
                      <span className="blood-group-tag">{patient.bloodGroup}</span>
                    </td>
                    <td>
                      <div className="doc-assigned-text">{patient.doctorAssigned}</div>
                      <div className="dept-sub-text">{patient.department}</div>
                    </td>
                    <td>
                      <span className="bed-code-badge">{patient.bedId || 'N/A'}</span>
                    </td>
                    <td>
                      <span className={`status-badge-chip ${patient.status.toLowerCase()}`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="text-xs text-slate-500">
                      {patient.admissionDate}
                    </td>
                    <td>
                      <div className="action-buttons-flex">
                        <button
                          onClick={() => setSelectedPatient(patient)}
                          className="table-action-btn view"
                          title="View Patient Dossier & Vitals"
                        >
                          <Eye size={15} />
                          <span>Dossier</span>
                        </button>
                        {patient.status !== 'Discharged' && patient.type === 'Inpatient' && (
                          <button
                            onClick={() => handleDischargePatient(patient)}
                            className="table-action-btn discharge"
                            title="Discharge Patient"
                          >
                            <LogOut size={15} />
                            <span>Discharge</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Dossier Modal */}
      {selectedPatient && (
        <div className="modal-overlay" onClick={() => setSelectedPatient(null)}>
          <div className="modal-card wide" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-info">
                <h3>Patient Clinical Dossier</h3>
                <span className="text-xs text-slate-500">ID: {selectedPatient.id} • Admission: {selectedPatient.admissionDate}</span>
              </div>
              <button onClick={() => setSelectedPatient(null)} className="modal-close-btn">
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              {/* Patient Top Summary */}
              <div className="patient-dossier-top">
                <div className="dossier-avatar">
                  {selectedPatient.name.charAt(0)}
                </div>
                <div className="dossier-info">
                  <h2 className="dossier-name">{selectedPatient.name}</h2>
                  <div className="dossier-tags">
                    <span className="blood-group-tag">{selectedPatient.bloodGroup}</span>
                    <span className={`type-badge ${selectedPatient.type === 'Inpatient' ? 'ipd' : 'opd'}`}>
                      {selectedPatient.type}
                    </span>
                    <span className={`status-badge-chip ${selectedPatient.status.toLowerCase()}`}>
                      {selectedPatient.status}
                    </span>
                    <span className="bed-code-badge">Bed: {selectedPatient.bedId}</span>
                  </div>
                </div>
                <div className="dossier-print-wrap">
                  <button onClick={() => window.print()} className="btn btn-outline btn-sm">
                    <Printer size={14} />
                    <span>Print Summary</span>
                  </button>
                </div>
              </div>

              {/* Vitals Telemetry Row */}
              <div className="dossier-section-title">
                <Activity size={16} />
                <span>Live Vitals & Physiological Parameters</span>
              </div>
              <div className="vitals-grid">
                <div className="vital-box">
                  <span className="vital-label">Blood Pressure</span>
                  <span className="vital-value">{selectedPatient.vitals?.bp || '120/80 mmHg'}</span>
                  <span className="vital-status normal">Normal Range</span>
                </div>
                <div className="vital-box">
                  <span className="vital-label">Heart / Pulse Rate</span>
                  <span className="vital-value">{selectedPatient.vitals?.pulse || '72 bpm'}</span>
                  <span className="vital-status normal">Resting Rhythm</span>
                </div>
                <div className="vital-box">
                  <span className="vital-label">Oxygen SpO2</span>
                  <span className="vital-value">{selectedPatient.vitals?.spo2 || '98%'}</span>
                  <span className="vital-status normal">Optimal Saturation</span>
                </div>
                <div className="vital-box">
                  <span className="vital-label">Temperature</span>
                  <span className="vital-value">{selectedPatient.vitals?.temp || '98.6 °F'}</span>
                  <span className="vital-status normal">Afebrile</span>
                </div>
              </div>

              {/* Clinical Details */}
              <div className="dossier-details-grid">
                <div className="detail-item">
                  <span className="detail-label">Primary Diagnosis</span>
                  <p className="detail-value">{selectedPatient.diagnosis}</p>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Attending Physician</span>
                  <p className="detail-value">{selectedPatient.doctorAssigned} ({selectedPatient.department})</p>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Patient Contact</span>
                  <p className="detail-value">{selectedPatient.phone}</p>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Emergency Next of Kin</span>
                  <p className="detail-value">{selectedPatient.emergencyContact}</p>
                </div>
                <div className="detail-item col-span-2">
                  <span className="detail-label">Residential Address</span>
                  <p className="detail-value">{selectedPatient.address}</p>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              {selectedPatient.status !== 'Discharged' && selectedPatient.type === 'Inpatient' && (
                <button
                  onClick={() => handleDischargePatient(selectedPatient)}
                  className="btn btn-danger"
                >
                  <LogOut size={15} />
                  <span>Discharge & Vacate Bed</span>
                </button>
              )}
              <button onClick={() => setSelectedPatient(null)} className="btn btn-secondary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Patient Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-card wide" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="flex items-center gap-2">
                <Users size={20} className="text-teal-600" />
                <h3>Admit New Patient to Hospital</h3>
              </div>
              <button onClick={() => setShowAddModal(false)} className="modal-close-btn">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreatePatient}>
              <div className="modal-body form-grid">
                <div className="form-group">
                  <label className="form-label">Full Patient Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Age *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="120"
                    placeholder="e.g. 42"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="form-control"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Blood Group</label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="form-control"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Admission Category</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="form-control"
                  >
                    <option value="Inpatient">Inpatient (IPD - Admit to Bed)</option>
                    <option value="Outpatient">Outpatient (OPD - Consultation Only)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="form-control"
                  >
                    {['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'General Medicine', 'Gynecology', 'Emergency', 'Dermatology'].map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Attending Doctor</label>
                  <select
                    value={formData.doctorAssigned}
                    onChange={(e) => setFormData({ ...formData, doctorAssigned: e.target.value })}
                    className="form-control"
                  >
                    {doctors.map(d => (
                      <option key={d.id} value={d.name}>{d.name} ({d.specialty})</option>
                    ))}
                  </select>
                </div>

                {formData.type === 'Inpatient' && (
                  <div className="form-group">
                    <label className="form-label">Assign Bed / Ward</label>
                    <select
                      value={formData.bedId}
                      onChange={(e) => setFormData({ ...formData, bedId: e.target.value })}
                      className="form-control"
                    >
                      {beds.filter(b => b.status === 'Available').map(b => (
                        <option key={b.id} value={b.id}>{b.id} - {b.ward} (₹{b.dailyRate}/day)</option>
                      ))}
                      {beds.filter(b => b.status === 'Available').length === 0 && (
                        <option value="None">No Beds Available (General Waitlist)</option>
                      )}
                    </select>
                  </div>
                )}

                <div className="form-group col-span-2">
                  <label className="form-label">Primary Diagnosis / Chief Complaint *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acute abdominal pain, high fever, chest discomfort"
                    value={formData.diagnosis}
                    onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Contact Phone</label>
                  <input
                    type="text"
                    placeholder="+91 98300 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Emergency Next of Kin Contact</label>
                  <input
                    type="text"
                    placeholder="Relation & Phone No."
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                    className="form-control"
                  />
                </div>

                <div className="form-group col-span-2">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    placeholder="City, State, Pin Code"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Confirm Admission
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
