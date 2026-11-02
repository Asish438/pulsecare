import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Stethoscope,
  Calendar,
  Bed,
  CreditCard,
  AlertTriangle,
  ArrowUpRight,
  PlusCircle,
  Clock,
  CheckCircle2,
  Activity,
  HeartPulse,
  TrendingUp,
  ShieldAlert,
  Ambulance,
  Pill
} from 'lucide-react';

export default function DashboardView({
  patients,
  doctors,
  appointments,
  beds,
  medicines,
  invoices,
  ambulances,
  openAddPatientModal,
  openBookAppointmentModal,
  role
}) {
  const navigate = useNavigate();

  // Compute Key Metrics
  const totalPatients = patients.length;
  const admittedPatients = patients.filter(p => p.status === 'Admitted' || p.status === 'Critical').length;
  const opdPatients = patients.filter(p => p.type === 'Outpatient').length;

  const totalBeds = beds.length;
  const occupiedBeds = beds.filter(b => b.status === 'Occupied').length;
  const availableBeds = beds.filter(b => b.status === 'Available').length;
  const bedOccupancyRate = Math.round((occupiedBeds / totalBeds) * 100);

  const availableDoctors = doctors.filter(d => d.status === 'Available').length;
  const totalAppointments = appointments.length;
  const pendingAppointments = appointments.filter(a => a.status === 'Pending' || a.status === 'Confirmed').length;

  const lowStockMedicines = medicines.filter(m => m.stock <= m.minStock);
  const activeAmbulances = ambulances.filter(a => a.status === 'En Route' || a.status === 'At Scene').length;

  const totalRevenue = invoices.reduce((acc, curr) => acc + (curr.total || 0), 0);

  // Weekly Inflow Sample Data
  const weeklyData = [
    { day: 'Mon', opd: 42, ipd: 14 },
    { day: 'Tue', opd: 58, ipd: 18 },
    { day: 'Wed', opd: 65, ipd: 22 },
    { day: 'Thu', opd: 50, ipd: 15 },
    { day: 'Fri', opd: 72, ipd: 25 },
    { day: 'Sat', opd: 80, ipd: 20 },
    { day: 'Sun', opd: 35, ipd: 12 }
  ];
  const maxWeekly = 100;

  return (
    <div className="view-container">
      {/* Welcome Banner */}
      <div className="dashboard-hero-banner">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="live-pulse-dot"></span>
            Hospital Command Center • Role: <strong>{role}</strong>
          </div>
          <h1 className="hero-title">PulseCare Healthcare Operations</h1>
          <p className="hero-description">
            Real-time multi-department hospital overview, inpatient occupancy monitoring,
            OPD scheduling, and diagnostic telemetry for faculty evaluation & viva demonstration.
          </p>

          <div className="hero-actions-row">
            <button
              onClick={() => {
                navigate('/patients');
                if (openAddPatientModal) openAddPatientModal();
              }}
              className="btn btn-primary"
            >
              <PlusCircle size={16} />
              <span>Admit New Patient</span>
            </button>
            <button
              onClick={() => {
                navigate('/appointments');
                if (openBookAppointmentModal) openBookAppointmentModal();
              }}
              className="btn btn-secondary"
            >
              <Calendar size={16} />
              <span>Schedule OPD Appointment</span>
            </button>
            <button
              onClick={() => navigate('/beds')}
              className="btn btn-secondary"
            >
              <Bed size={16} />
              <span>Bed Availability Matrix</span>
            </button>
            <button
              onClick={() => navigate('/docs')}
              className="btn btn-outline"
            >
              <span>Viva & Project Specs</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        <div className="hero-stat-card">
          <div className="hero-stat-icon">
            <HeartPulse size={30} />
          </div>
          <div className="hero-stat-body">
            <div className="hero-stat-num">{bedOccupancyRate}%</div>
            <div className="hero-stat-label">Bed Occupancy Rate</div>
            <div className="hero-stat-sub">
              {occupiedBeds} occupied of {totalBeds} total beds
            </div>
          </div>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="kpi-grid">
        <div className="kpi-card" onClick={() => navigate('/patients')}>
          <div className="kpi-top">
            <span className="kpi-label">Total Registered Patients</span>
            <div className="kpi-icon-wrap blue">
              <Users size={20} />
            </div>
          </div>
          <div className="kpi-val">{totalPatients}</div>
          <div className="kpi-footer">
            <span className="badge-pill green">{admittedPatients} Inpatient (IPD)</span>
            <span className="badge-pill gray">{opdPatients} OPD</span>
          </div>
        </div>

        <div className="kpi-card" onClick={() => navigate('/beds')}>
          <div className="kpi-top">
            <span className="kpi-label">Available Beds</span>
            <div className="kpi-icon-wrap teal">
              <Bed size={20} />
            </div>
          </div>
          <div className="kpi-val">{availableBeds} <span className="kpi-denom">/ {totalBeds}</span></div>
          <div className="kpi-footer">
            <span className="badge-pill green">{availableBeds} Ready for Admission</span>
          </div>
        </div>

        <div className="kpi-card" onClick={() => navigate('/doctors')}>
          <div className="kpi-top">
            <span className="kpi-label">Doctors on Duty</span>
            <div className="kpi-icon-wrap purple">
              <Stethoscope size={20} />
            </div>
          </div>
          <div className="kpi-val">{availableDoctors} <span className="kpi-denom">/ {doctors.length}</span></div>
          <div className="kpi-footer">
            <span className="badge-pill green">8 Departments Active</span>
          </div>
        </div>

        <div className="kpi-card" onClick={() => navigate('/appointments')}>
          <div className="kpi-top">
            <span className="kpi-label">Today's Appointments</span>
            <div className="kpi-icon-wrap amber">
              <Calendar size={20} />
            </div>
          </div>
          <div className="kpi-val">{totalAppointments}</div>
          <div className="kpi-footer">
            <span className="badge-pill amber">{pendingAppointments} Scheduled / In Queue</span>
          </div>
        </div>

        <div className="kpi-card" onClick={() => navigate('/billing')}>
          <div className="kpi-top">
            <span className="kpi-label">Total Revenue (Demo)</span>
            <div className="kpi-icon-wrap green">
              <CreditCard size={20} />
            </div>
          </div>
          <div className="kpi-val">₹{totalRevenue.toLocaleString('en-IN')}</div>
          <div className="kpi-footer">
            <span className="badge-pill blue">{invoices.length} Invoices Generated</span>
          </div>
        </div>

        <div className="kpi-card" onClick={() => navigate('/emergency')}>
          <div className="kpi-top">
            <span className="kpi-label">Emergency Fleet</span>
            <div className="kpi-icon-wrap red">
              <Ambulance size={20} />
            </div>
          </div>
          <div className="kpi-val">{activeAmbulances} <span className="kpi-denom">En Route</span></div>
          <div className="kpi-footer">
            <span className="badge-pill red">Code Red Triage Active</span>
          </div>
        </div>
      </div>

      {/* Charts & Analytical Section */}
      <div className="analytics-grid">
        {/* Weekly Inflow Visual Chart */}
        <div className="dashboard-card">
          <div className="card-header-row">
            <div>
              <h3 className="card-title">Weekly Patient Inflow (OPD vs IPD)</h3>
              <p className="card-subtitle">Daily footfall pattern across outpatient clinics and emergency triage</p>
            </div>
            <div className="chart-legend">
              <span className="legend-item"><span className="legend-box opd"></span> OPD Visits</span>
              <span className="legend-item"><span className="legend-box ipd"></span> IPD Admissions</span>
            </div>
          </div>

          <div className="chart-bar-container">
            {weeklyData.map((d) => (
              <div key={d.day} className="chart-bar-group">
                <div className="bar-track">
                  <div
                    className="bar-fill opd"
                    style={{ height: `${(d.opd / maxWeekly) * 100}%` }}
                    title={`OPD: ${d.opd}`}
                  ></div>
                  <div
                    className="bar-fill ipd"
                    style={{ height: `${(d.ipd / maxWeekly) * 100}%` }}
                    title={`IPD: ${d.ipd}`}
                  ></div>
                </div>
                <div className="chart-bar-label">{d.day}</div>
                <div className="chart-bar-value">{d.opd + d.ipd}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Wards Occupancy Visual Meter */}
        <div className="dashboard-card">
          <div className="card-header-row">
            <div>
              <h3 className="card-title">Ward Occupancy Breakdown</h3>
              <p className="card-subtitle">Real-time status across critical and general wards</p>
            </div>
            <button onClick={() => navigate('/beds')} className="link-action-btn">
              Manage Beds →
            </button>
          </div>

          <div className="ward-progress-list">
            {[
              { name: 'Intensive Care Unit (ICU)', total: 4, occ: 2, color: 'blue' },
              { name: 'Emergency Trauma Bay', total: 4, occ: 2, color: 'red' },
              { name: 'General Ward (Male / Female)', total: 4, occ: 2, color: 'teal' },
              { name: 'Private Deluxe Suites', total: 4, occ: 2, color: 'purple' }
            ].map(w => {
              const pct = Math.round((w.occ / w.total) * 100);
              return (
                <div key={w.name} className="ward-progress-item">
                  <div className="ward-progress-top">
                    <span className="ward-name">{w.name}</span>
                    <span className="ward-stat">{w.occ}/{w.total} Beds ({pct}%)</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div
                      className={`progress-bar-fill ${w.color}`}
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="ward-status-legend">
            <span className="status-indicator available"><span className="dot"></span> Available ({availableBeds})</span>
            <span className="status-indicator occupied"><span className="dot"></span> Occupied ({occupiedBeds})</span>
            <span className="status-indicator maintenance"><span className="dot"></span> Maintenance/Clean (2)</span>
          </div>
        </div>
      </div>

      {/* Recent Admissions & Quick Queues */}
      <div className="dashboard-tables-grid">
        {/* Admitted Inpatients Table */}
        <div className="dashboard-card">
          <div className="card-header-row">
            <div>
              <h3 className="card-title">Current Inpatient Census (IPD)</h3>
              <p className="card-subtitle">Patients currently occupying beds under monitoring</p>
            </div>
            <button onClick={() => navigate('/patients')} className="link-action-btn">
              View All Patients →
            </button>
          </div>

          <div className="table-responsive">
            <table className="compact-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Diagnosis</th>
                  <th>Assigned Bed</th>
                  <th>Attending Doctor</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {patients.filter(p => p.type === 'Inpatient').slice(0, 5).map(p => (
                  <tr key={p.id}>
                    <td>
                      <div className="font-semibold text-slate-800 dark:text-slate-100">{p.name}</div>
                      <div className="text-xs text-slate-500">{p.id} • {p.age}y / {p.gender}</div>
                    </td>
                    <td className="text-xs text-slate-600 dark:text-slate-300 max-w-xs">{p.diagnosis}</td>
                    <td>
                      <span className="bed-code-badge">{p.bedId}</span>
                    </td>
                    <td className="text-xs">{p.doctorAssigned}</td>
                    <td>
                      <span className={`status-badge-chip ${p.status.toLowerCase()}`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Today's Appointments & Low Stock Watchlist */}
        <div className="dashboard-card">
          <div className="card-header-row">
            <div>
              <h3 className="card-title">OPD Appointments Queue</h3>
              <p className="card-subtitle">Scheduled doctor consultations for today</p>
            </div>
            <button onClick={() => navigate('/appointments')} className="link-action-btn">
              View Schedule →
            </button>
          </div>

          <div className="appointment-queue-list">
            {appointments.slice(0, 4).map(apt => (
              <div key={apt.id} className="queue-item">
                <div className="queue-time-badge">
                  <Clock size={13} />
                  <span>{apt.time}</span>
                </div>
                <div className="queue-body">
                  <div className="queue-patient-name">{apt.patientName}</div>
                  <div className="queue-doc-name">{apt.doctorName} ({apt.department})</div>
                  <div className="queue-reason text-xs text-slate-500">{apt.reason}</div>
                </div>
                <div className="queue-status">
                  <span className={`status-badge-chip ${apt.status.toLowerCase()}`}>
                    {apt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {lowStockMedicines.length > 0 && (
            <div className="low-stock-alert-box">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-medium text-xs mb-1">
                <AlertTriangle size={14} />
                <span>Pharmacy Alert: {lowStockMedicines.length} Item(s) Near Minimum Stock</span>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300">
                {lowStockMedicines.map(m => `${m.name} (${m.stock} ${m.unit}s left)`).join(' • ')}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
