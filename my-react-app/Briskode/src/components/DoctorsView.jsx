import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Stethoscope,
  Search,
  Plus,
  Star,
  Clock,
  MapPin,
  Phone,
  Mail,
  Calendar,
  X,
  CheckCircle,
  Briefcase
} from 'lucide-react';

export default function DoctorsView({
  doctors,
  setDoctors,
  setActiveTab,
  setSelectedDoctorForBooking,
  addToast
}) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Doctor Form State
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    qualification: '',
    experience: '',
    department: 'General Medicine',
    room: 'OPD-101',
    phone: '',
    email: '',
    fee: '₹600',
    timing: '09:00 AM - 02:00 PM',
    status: 'Available'
  });

  const departments = [
    'ALL',
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'General Medicine',
    'Gynecology',
    'Emergency',
    'Dermatology'
  ];

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.department.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedDept !== 'ALL' && doc.department !== selectedDept) return false;
    return true;
  });

  const handleBookWithDoctor = (doc) => {
    if (setSelectedDoctorForBooking) {
      setSelectedDoctorForBooking(doc.name);
    }
    navigate('/appointments');
    addToast(`Selected ${doc.name} for booking appointment`, 'info');
  };

  const toggleDoctorStatus = (docId) => {
    const updated = doctors.map((d) => {
      if (d.id === docId) {
        let nextStatus = 'Available';
        if (d.status === 'Available') nextStatus = 'In Surgery';
        else if (d.status === 'In Surgery') nextStatus = 'Off Duty';
        else nextStatus = 'Available';
        return { ...d, status: nextStatus };
      }
      return d;
    });
    setDoctors(updated);
    addToast('Doctor schedule/duty status updated', 'info');
  };

  const handleAddDoctor = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.specialty.trim()) {
      addToast('Please enter doctor name and specialty', 'error');
      return;
    }

    const newId = `DOC-${doctors.length + 101}`;
    const newDoc = {
      id: newId,
      name: formData.name.startsWith('Dr.') ? formData.name : `Dr. ${formData.name}`,
      specialty: formData.specialty,
      qualification: formData.qualification || 'MBBS, MD',
      experience: formData.experience || '5 Years',
      department: formData.department,
      room: formData.room,
      phone: formData.phone || '+91 98000 11111',
      email: formData.email || `${formData.name.toLowerCase().replace(/\s+/g, '.')}@pulsecare.org`,
      rating: 4.9,
      status: formData.status,
      fee: formData.fee,
      timing: formData.timing,
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop&q=80'
    };

    setDoctors([newDoc, ...doctors]);
    addToast(`${newDoc.name} registered to medical staff!`, 'success');
    setShowAddModal(false);
    setFormData({
      name: '',
      specialty: '',
      qualification: '',
      experience: '',
      department: 'General Medicine',
      room: 'OPD-101',
      phone: '',
      email: '',
      fee: '₹600',
      timing: '09:00 AM - 02:00 PM',
      status: 'Available'
    });
  };

  return (
    <div className="view-container">
      {/* Header */}
      <div className="view-header-bar">
        <div>
          <h2 className="view-title">Doctors & Medical Specialists</h2>
          <p className="view-subtitle">
            Senior consultants, surgeons, duty physicians, and clinical faculty directory.
          </p>
        </div>

        <div className="header-actions">
          <button onClick={() => setShowAddModal(true)} className="btn btn-primary">
            <Plus size={16} />
            <span>Add Medical Specialist</span>
          </button>
        </div>
      </div>

      {/* Search and Department Filter Chips */}
      <div className="filter-controls-row">
        <div className="search-input-wrap">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search doctor by name, specialty, or department..."
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

        <div className="dept-chips-scroll">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`chip-btn ${selectedDept === dept ? 'active' : ''}`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Doctor Cards Grid */}
      <div className="doctors-card-grid">
        {filteredDoctors.length === 0 ? (
          <div className="empty-state-card col-span-full">
            No doctors found matching "{searchTerm}".
          </div>
        ) : (
          filteredDoctors.map((doc) => (
            <div key={doc.id} className="doctor-profile-card">
              <div className="doc-card-top">
                <div className="doc-avatar-wrap">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="doc-avatar-img"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80';
                    }}
                  />
                  <span
                    className={`status-circle-badge ${doc.status.toLowerCase().replace(/\s+/g, '-')}`}
                    title={`Status: ${doc.status}`}
                  ></span>
                </div>

                <div className="doc-header-info">
                  <div className="flex justify-between items-start">
                    <h3 className="doc-name">{doc.name}</h3>
                    <div className="doc-rating-badge">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span>{doc.rating}</span>
                    </div>
                  </div>
                  <div className="doc-specialty">{doc.specialty}</div>
                  <div className="doc-qualifications">{doc.qualification}</div>
                </div>
              </div>

              <div className="doc-card-details">
                <div className="doc-detail-row">
                  <Briefcase size={14} className="text-slate-400" />
                  <span>{doc.experience} Experience • {doc.department}</span>
                </div>
                <div className="doc-detail-row">
                  <MapPin size={14} className="text-slate-400" />
                  <span>{doc.room}</span>
                </div>
                <div className="doc-detail-row">
                  <Clock size={14} className="text-slate-400" />
                  <span>{doc.timing}</span>
                </div>
                <div className="doc-detail-row">
                  <Phone size={14} className="text-slate-400" />
                  <span>{doc.phone}</span>
                </div>
              </div>

              <div className="doc-card-footer">
                <div className="doc-fee-wrap">
                  <span className="fee-label">Consultation Fee</span>
                  <span className="fee-val">{doc.fee}</span>
                </div>

                <div className="doc-actions-wrap">
                  <button
                    onClick={() => toggleDoctorStatus(doc.id)}
                    className="btn btn-outline btn-xs"
                    title="Click to toggle status for demo"
                  >
                    {doc.status}
                  </button>
                  <button
                    onClick={() => handleBookWithDoctor(doc)}
                    className="btn btn-primary btn-sm"
                  >
                    <Calendar size={13} />
                    <span>Book OPD</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Doctor Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-card wide" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="flex items-center gap-2">
                <Stethoscope size={20} className="text-teal-600" />
                <h3>Add Medical Specialist / Consultant</h3>
              </div>
              <button onClick={() => setShowAddModal(false)} className="modal-close-btn">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddDoctor}>
              <div className="modal-body form-grid">
                <div className="form-group">
                  <label className="form-label">Doctor Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Dr. S. K. Roy"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Specialty *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Interventional Cardiology"
                    value={formData.specialty}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="form-control"
                  >
                    {departments.filter(d => d !== 'ALL').map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Qualifications</label>
                  <input
                    type="text"
                    placeholder="MBBS, MD, DM"
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Experience</label>
                  <input
                    type="text"
                    placeholder="10 Years"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">OPD Room / Chamber</label>
                  <input
                    type="text"
                    placeholder="OPD-205 (Second Floor)"
                    value={formData.room}
                    onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Consultation Fee</label>
                  <input
                    type="text"
                    placeholder="₹700"
                    value={formData.fee}
                    onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">OPD Timings</label>
                  <input
                    type="text"
                    placeholder="10:00 AM - 02:00 PM"
                    value={formData.timing}
                    onChange={(e) => setFormData({ ...formData, timing: e.target.value })}
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
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    placeholder="doctor@pulsecare.org"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Doctor Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
