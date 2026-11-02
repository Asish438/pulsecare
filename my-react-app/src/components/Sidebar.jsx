import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Calendar,
  Bed,
  Pill,
  FlaskConical,
  Ambulance,
  CreditCard,
  GraduationCap,
  HeartPulse,
  X
} from 'lucide-react';

export default function Sidebar({
  currentUser,
  sidebarOpen,
  closeSidebar,
  counts
}) {
  const isPatient = currentUser?.role === 'Patient';

  const allNavItems = [
    {
      to: '/',
      perm: isPatient ? 'portal' : 'dashboard',
      label: isPatient ? 'My Health Portal' : 'Dashboard',
      icon: isPatient ? HeartPulse : LayoutDashboard,
      badge: null,
      end: true
    },
    {
      to: '/patients',
      perm: 'patients',
      label: currentUser?.role === 'Doctor' ? 'My Assigned Patients' : 'Patients & Admissions',
      icon: Users,
      badge: counts.patients
    },
    {
      to: '/doctors',
      perm: 'doctors',
      label: 'Doctors & Specialists',
      icon: Stethoscope,
      badge: counts.doctors
    },
    {
      to: '/appointments',
      perm: 'appointments',
      label: isPatient ? 'Book / My Visits' : 'Appointments (OPD)',
      icon: Calendar,
      badge: counts.appointments
    },
    {
      to: '/beds',
      perm: 'beds',
      label: 'Wards & Bed Matrix',
      icon: Bed,
      badge: `${counts.occupiedBeds}/${counts.totalBeds}`
    },
    {
      to: '/pharmacy',
      perm: 'pharmacy',
      label: 'Pharmacy & Stock',
      icon: Pill,
      badge: counts.lowStockMedCount > 0 ? `${counts.lowStockMedCount} low` : null,
      badgeColor: 'amber'
    },
    {
      to: '/laboratory',
      perm: 'laboratory',
      label: 'Diagnostics & Lab',
      icon: FlaskConical,
      badge: counts.labTests
    },
    {
      to: '/emergency',
      perm: 'emergency',
      label: 'Emergency & Trauma',
      icon: Ambulance,
      badge: '24x7',
      badgeColor: 'red'
    },
    {
      to: '/billing',
      perm: 'billing',
      label: 'Billing & Invoices',
      icon: CreditCard,
      badge: null
    },
    {
      to: '/docs',
      perm: 'docs',
      label: 'Semester Project Viva',
      icon: GraduationCap,
      badge: 'Docs',
      badgeColor: 'blue'
    }
  ];

  // Filter based on user permissions
  const visibleNavItems = allNavItems.filter((item) => {
    if (!currentUser) return true;
    if (currentUser.role === 'Admin') return true;
    return currentUser.permissions?.includes(item.perm);
  });

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div className="sidebar-backdrop" onClick={closeSidebar}></div>
      )}

      <aside className={`sidebar-container ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-inner">
          <div className="sidebar-mobile-header">
            <span className="sidebar-section-title">
              {currentUser?.role?.toUpperCase()} WORKSPACE
            </span>
            <button
              onClick={closeSidebar}
              className="sidebar-close-btn"
              aria-label="Close sidebar"
            >
              <X size={18} />
            </button>
          </div>

          <div className="sidebar-role-indicator">
            <span className={`user-nav-role-badge role-${currentUser?.role?.toLowerCase()}`}>
              {currentUser?.role} Mode
            </span>
            <span className="sidebar-role-subtitle">{currentUser?.badge}</span>
          </div>

          <nav className="sidebar-nav">
            {visibleNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={closeSidebar}
                  className={({ isActive }) => `nav-item-btn ${isActive ? 'active' : ''}`}
                >
                  <div className="nav-item-left">
                    <Icon size={19} className="nav-icon" />
                    <span className="nav-label">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`nav-badge ${item.badgeColor || 'default'}`}>
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          <div className="sidebar-footer-card">
            <div className="system-health-pill">
              <span className="pulse-indicator-dot"></span>
              <span>Role Protected Session</span>
            </div>
            <div className="viva-tip-box">
              <span className="viva-tag">{currentUser?.role} View</span>
              <p>Module permissions strictly isolated by RBAC security</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
