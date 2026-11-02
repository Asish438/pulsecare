import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Bed,
  Pill,
  HeartPulse,
  Menu
} from 'lucide-react';

export default function MobileBottomNav({ currentUser, toggleSidebar, sidebarOpen }) {
  const role = currentUser?.role || 'Admin';

  if (role === 'Patient') {
    return (
      <nav className="mobile-bottom-nav">
        <NavLink
          to="/"
          className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
          end
        >
          <HeartPulse size={20} />
          <span>My Health</span>
        </NavLink>

        <NavLink
          to="/appointments"
          className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
        >
          <Calendar size={20} />
          <span>Book Visit</span>
        </NavLink>

        <button
          type="button"
          onClick={toggleSidebar}
          className={`mobile-nav-item ${sidebarOpen ? 'active' : ''}`}
          aria-label="More modules"
        >
          <Menu size={20} />
          <span>Profile</span>
        </button>
      </nav>
    );
  }

  if (role === 'Pharmacist') {
    return (
      <nav className="mobile-bottom-nav">
        <NavLink
          to="/pharmacy"
          className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
        >
          <Pill size={20} />
          <span>Pharmacy</span>
        </NavLink>

        <NavLink
          to="/patients"
          className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
        >
          <Users size={20} />
          <span>Prescriptions</span>
        </NavLink>

        <button
          type="button"
          onClick={toggleSidebar}
          className={`mobile-nav-item ${sidebarOpen ? 'active' : ''}`}
          aria-label="More modules"
        >
          <Menu size={20} />
          <span>More</span>
        </button>
      </nav>
    );
  }

  return (
    <nav className="mobile-bottom-nav">
      <NavLink
        to="/"
        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
        end
      >
        <LayoutDashboard size={20} />
        <span>Dashboard</span>
      </NavLink>

      <NavLink
        to="/patients"
        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
      >
        <Users size={20} />
        <span>Patients</span>
      </NavLink>

      <NavLink
        to="/appointments"
        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
      >
        <Calendar size={20} />
        <span>OPD</span>
      </NavLink>

      <NavLink
        to="/beds"
        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
      >
        <Bed size={20} />
        <span>Beds</span>
      </NavLink>

      <button
        type="button"
        onClick={toggleSidebar}
        className={`mobile-nav-item ${sidebarOpen ? 'active' : ''}`}
        aria-label="More modules"
      >
        <Menu size={20} />
        <span>More</span>
      </button>
    </nav>
  );
}
