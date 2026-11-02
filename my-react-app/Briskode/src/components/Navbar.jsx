import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  Bell,
  Sun,
  Moon,
  RotateCcw,
  UserCheck,
  PhoneCall,
  Menu,
  X,
  Clock,
  Shield,
  Stethoscope,
  User,
  HeartPulse,
  LogOut
} from 'lucide-react';

export default function Navbar({
  currentUser,
  onLogout,
  notifications,
  onResetData,
  darkMode,
  setDarkMode,
  toggleSidebar,
  sidebarOpen,
  addToast
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadNotifs, setUnreadNotifs] = useState(notifications);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setUnreadNotifs(notifications);
  }, [notifications]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const clearNotifications = () => {
    setUnreadNotifs([]);
    setShowNotifications(false);
    addToast('All notifications cleared', 'info');
  };

  return (
    <header className="navbar-container">
      <div className="navbar-left">
        <button
          className="mobile-menu-btn"
          onClick={toggleSidebar}
          aria-label="Toggle Navigation Menu"
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link to="/" className="brand-logo">
          <div className="logo-icon-wrapper pulse-animation">
            <HeartPulse size={26} className="logo-svg" />
          </div>
          <div className="brand-text">
            <div className="brand-title">
              <span>PulseCare</span> <span className="hms-badge">HMS</span>
            </div>
            <div className="brand-subtitle">Smart Hospital & Healthcare Cloud</div>
          </div>
        </Link>

        <div className="emergency-hotline-pill">
          <PhoneCall size={14} className="phone-bounce" />
          <span>Emergency 24x7: <strong>108 / 1800-PULSE</strong></span>
        </div>
      </div>

      <div className="navbar-right">
        {/* Clock ticker */}
        <div className="live-clock-pill">
          <Clock size={14} />
          <span>
            {currentTime.toLocaleDateString('en-IN', {
              weekday: 'short',
              day: 'numeric',
              month: 'short'
            })}{' '}
            • {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>

        {/* User Identity & Active Role Badge */}
        {currentUser && (
          <div className="user-profile-nav-pill">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="user-nav-avatar"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
              }}
            />
            <div className="user-nav-details">
              <span className="user-nav-name">{currentUser.name}</span>
              <span className={`user-nav-role-badge role-${currentUser.role.toLowerCase()}`}>
                {currentUser.role}
              </span>
            </div>
          </div>
        )}

        {/* Dark Mode Toggle */}
        <button
          className="icon-action-btn"
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
        </button>

        {/* Notifications Dropdown */}
        <div className="notification-wrapper">
          <button
            className="icon-action-btn relative"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Hospital Alerts & Notifications"
          >
            <Bell size={18} />
            {unreadNotifs.length > 0 && (
              <span className="notification-dot">{unreadNotifs.length}</span>
            )}
          </button>

          {showNotifications && (
            <div className="notifications-flyout">
              <div className="notifications-header">
                <div className="flex items-center gap-2">
                  <Activity size={16} />
                  <h4>Live Alerts ({unreadNotifs.length})</h4>
                </div>
                {unreadNotifs.length > 0 && (
                  <button onClick={clearNotifications} className="clear-btn">
                    Clear All
                  </button>
                )}
              </div>
              <div className="notifications-list">
                {unreadNotifs.length === 0 ? (
                  <div className="empty-notifs">No unread notifications</div>
                ) : (
                  unreadNotifs.map((n) => (
                    <div key={n.id} className={`notif-item notif-${n.type || 'info'}`}>
                      <div className="notif-header-row">
                        <span className="notif-title">{n.title}</span>
                        <span className="notif-time">{n.time}</span>
                      </div>
                      <p className="notif-msg">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Reset Demo Data Button (for Admin) */}
        {currentUser?.role === 'Admin' && (
          <button
            onClick={() => {
              if (window.confirm("Reset all patient records, beds, appointments, and bills to default demo state?")) {
                onResetData();
                addToast("Project database restored to original demo data!", "success");
              }
            }}
            className="reset-demo-btn"
            title="Reset database to pristine demo data for presentation"
          >
            <RotateCcw size={14} />
            <span className="btn-text">Reset Demo</span>
          </button>
        )}

        {/* Sign Out / Switch Role Button */}
        <button
          onClick={onLogout}
          className="btn-logout"
          title="Sign out and switch role"
        >
          <LogOut size={15} />
          <span className="logout-text">Sign Out</span>
        </button>
      </div>
    </header>
  );
}
