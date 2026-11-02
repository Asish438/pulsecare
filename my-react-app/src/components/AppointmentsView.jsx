import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Plus,
  Search,
  CheckCircle,
  XCircle,
  Clock3,
  User,
  Stethoscope,
  X,
  CreditCard,
  FileCheck
} from 'lucide-react';

export default function AppointmentsView({
  appointments,
  setAppointments,
  patients,
  doctors,
  invoices,
  setInvoices,
  setActiveTab,
  selectedDoctorForBooking,
  setSelectedDoctorForBooking,
  showBookModal,
  setShowBookModal,
  addToast
}) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Book Form State
  const [formData, setFormData] = useState({
    patientName: patients[0]?.name || 'Amitav Roy',
    patientId: patients[0]?.id || 'PAT-001',
    doctorName: selectedDoctorForBooking || doctors[0]?.name || 'Dr. Rajesh Sharma',
    date: new Date().toISOString().split('T')[0],
    time: '10:00 AM',
    type: 'Routine Consultation',
    reason: 'Routine outpatient health checkup'
  });

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM',
    '11:30 AM', '12:00 PM', '02:00 PM', '02:30 PM', '03:00 PM',
    '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM'
  ];

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.id.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (statusFilter !== 'ALL' && apt.status !== statusFilter) return false;
    return true;
  });

  const handlePatientSelect = (patientName) => {
    const found = patients.find(p => p.name === patientName);
    setFormData({
      ...formData,
      patientName,
      patientId: found ? found.id : `PAT-TEMP`
    });
  };

  const handleDoctorSelect = (doctorName) => {
    setFormData({
      ...formData,
      doctorName
    });
  };

  const handleBookSubmit = (e) => {
    e.preventDefault();
    const docObj = doctors.find(d => d.name === formData.doctorName) || doctors[0];

    const newApt = {
      id: `APT-2026-${String(appointments.length + 1).padStart(3, '0')}`,
      patientName: formData.patientName,
      patientId: formData.patientId,
      doctorName: docObj.name,
      doctorId: docObj.id,
      department: docObj.department,
      date: formData.date,
      time: formData.time,
      type: formData.type,
      reason: formData.reason,
      status: 'Confirmed',
      room: docObj.room
    };

    setAppointments([newApt, ...appointments]);
    addToast(`Appointment booked with ${docObj.name} for ${formData.date} at ${formData.time}!`, 'success');
    setShowBookModal(false);
  };

  const updateStatus = (aptId, newStatus) => {
    const updated = appointments.map((a) =>
      a.id === aptId ? { ...a, status: newStatus } : a
    );
    setAppointments(updated);
    addToast(`Appointment status updated to ${newStatus}`, 'info');
  };

  const handleGenerateBillForApt = (apt) => {
    const doc = doctors.find(d => d.name === apt.doctorName);
    const feeNum = doc ? parseInt(doc.fee.replace(/[^\d]/g, ''), 10) : 600;

    const newInv = {
      id: `INV-2026-${invoices.length + 1005}`,
      patientId: apt.patientId || 'PAT-001',
      patientName: apt.patientName,
      date: apt.date,
      department: apt.department,
      doctorName: apt.doctorName,
      items: [
        { description: `OPD Consultation (${apt.doctorName} - ${apt.type})`, qty: 1, rate: feeNum, amount: feeNum },
        { description: 'Hospital Registration & Nursing Fee', qty: 1, rate: 100, amount: 100 }
      ],
      subtotal: feeNum + 100,
      discount: 0,
      tax: 0,
      total: feeNum + 100,
      status: 'Paid',
      paymentMethod: 'UPI / Cash'
    };

    setInvoices([newInv, ...invoices]);
    addToast(`Consultation bill ₹${newInv.total} generated for ${apt.patientName}`, 'success');
    navigate('/billing');
  };

  return (
    <div className="view-container">
      {/* Header */}
      <div className="view-header-bar">
        <div>
          <h2 className="view-title">Appointments & OPD Scheduling</h2>
          <p className="view-subtitle">
            Outpatient slot allocation, doctor consultations, queue tracking, and visit completion.
          </p>
        </div>

        <div className="header-actions">
          <button onClick={() => setShowBookModal(true)} className="btn btn-primary">
            <Plus size={16} />
            <span>Book OPD Appointment</span>
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="filter-controls-row">
        <div className="search-input-wrap">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search by patient, doctor, or department..."
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
          {['ALL', 'Confirmed', 'Pending', 'Completed', 'Cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`filter-tab-btn ${statusFilter === st ? 'active' : ''}`}
            >
              {st === 'ALL' ? `All (${appointments.length})` : st}
            </button>
          ))}
        </div>
      </div>

      {/* Appointments List / Table */}
      <div className="dashboard-card no-padding">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Appointment ID</th>
                <th>Patient Details</th>
                <th>Doctor & Dept</th>
                <th>Date & Slot</th>
                <th>Type & Reason</th>
                <th>Chamber / Room</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan="8" className="empty-table-cell">
                    No scheduled appointments match the filter criteria.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((apt) => (
                  <tr key={apt.id}>
                    <td>
                      <span className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-200">
                        {apt.id}
                      </span>
                    </td>
                    <td>
                      <div className="font-semibold text-slate-900 dark:text-slate-100">
                        {apt.patientName}
                      </div>
                      <div className="text-xs text-slate-500">ID: {apt.patientId}</div>
                    </td>
                    <td>
                      <div className="doc-assigned-text">{apt.doctorName}</div>
                      <div className="dept-sub-text">{apt.department}</div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1 font-medium text-slate-800 dark:text-slate-200 text-xs">
                        <Calendar size={13} className="text-teal-600" />
                        <span>{apt.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-500 text-xs mt-0.5">
                        <Clock size={13} />
                        <span>{apt.time}</span>
                      </div>
                    </td>
                    <td>
                      <div className="text-xs font-medium text-slate-700 dark:text-slate-300">{apt.type}</div>
                      <div className="text-xs text-slate-500 max-w-xs truncate" title={apt.reason}>{apt.reason}</div>
                    </td>
                    <td>
                      <span className="room-badge">{apt.room || 'OPD-101'}</span>
                    </td>
                    <td>
                      <span className={`status-badge-chip ${apt.status.toLowerCase()}`}>
                        {apt.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons-flex">
                        {apt.status !== 'Completed' && (
                          <button
                            onClick={() => updateStatus(apt.id, 'Completed')}
                            className="table-action-btn complete"
                            title="Mark Completed"
                          >
                            <CheckCircle size={14} />
                            <span>Done</span>
                          </button>
                        )}
                        {apt.status !== 'Cancelled' && apt.status !== 'Completed' && (
                          <button
                            onClick={() => updateStatus(apt.id, 'Cancelled')}
                            className="table-action-btn cancel"
                            title="Cancel Appointment"
                          >
                            <XCircle size={14} />
                          </button>
                        )}
                        <button
                          onClick={() => handleGenerateBillForApt(apt)}
                          className="table-action-btn bill"
                          title="Generate Consultation Invoice"
                        >
                          <CreditCard size={14} />
                          <span>Bill</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Book Appointment Modal */}
      {showBookModal && (
        <div className="modal-overlay" onClick={() => setShowBookModal(false)}>
          <div className="modal-card wide" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="flex items-center gap-2">
                <Calendar size={20} className="text-teal-600" />
                <h3>Schedule Outpatient (OPD) Appointment</h3>
              </div>
              <button onClick={() => setShowBookModal(false)} className="modal-close-btn">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleBookSubmit}>
              <div className="modal-body form-grid">
                <div className="form-group">
                  <label className="form-label">Select Registered Patient *</label>
                  <select
                    value={formData.patientName}
                    onChange={(e) => handlePatientSelect(e.target.value)}
                    className="form-control"
                  >
                    {patients.map(p => (
                      <option key={p.id} value={p.name}>{p.name} ({p.id} • {p.age}y/{p.gender})</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Consulting Doctor / Specialist *</label>
                  <select
                    value={formData.doctorName}
                    onChange={(e) => handleDoctorSelect(e.target.value)}
                    className="form-control"
                  >
                    {doctors.map(d => (
                      <option key={d.id} value={d.name}>{d.name} — {d.specialty} ({d.fee})</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Appointment Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Available Time Slot *</label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="form-control"
                  >
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Visit Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="form-control"
                  >
                    <option value="Routine Consultation">Routine Consultation</option>
                    <option value="Follow-up">Follow-up Visit</option>
                    <option value="Diagnostic Review">Diagnostic / Report Review</option>
                    <option value="Second Opinion">Second Opinion</option>
                    <option value="Emergency Evaluation">Emergency Evaluation</option>
                  </select>
                </div>

                <div className="form-group col-span-2">
                  <label className="form-label">Chief Complaint / Reason for Appointment *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chest tightness on exertion, migraine headaches, knee pain"
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setShowBookModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Confirm Booking & Issue Slip
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
