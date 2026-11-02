import React, { useState } from 'react';
import {
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  Pill,
  Users,
  Eye,
  EyeOff,
  LogIn,
  CheckCircle2,
  XCircle,
  PhoneCall,
  Building2,
  Mail,
  Lock
} from 'lucide-react';
import { DEMO_USERS, validatePasswordCriteria, validateEmailFormat } from '../data/usersData';

export default function LoginView({ onLogin, addToast }) {
  const [selectedRole, setSelectedRole] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  // Live password metrics & email validation
  const pwdMetrics = validatePasswordCriteria(password);
  const isEmailValid = validateEmailFormat(email);

  const roles = [
    { id: 'Admin', label: 'Admin', icon: ShieldCheck, desc: 'Full Master Access' },
    { id: 'Doctor', label: 'Doctor', icon: Stethoscope, desc: 'Clinical & OPD' },
    { id: 'Pharmacist', label: 'Pharmacist', icon: Pill, desc: 'Pharmacy & Stock' },
    { id: 'Receptionist', label: 'Receptionist', icon: Users, desc: 'Admissions & Billing' },
    { id: 'Patient', label: 'Patient', icon: HeartPulse, desc: 'Health Portal' }
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    // 1. Mandatory Email Validation
    if (!email.trim()) {
      addToast('Email address is mandatory. Please enter your email.', 'error');
      return;
    }

    if (!isEmailValid) {
      addToast('Invalid email format! Please enter a valid email address (e.g. user@pulsecare.org).', 'error');
      return;
    }

    // 2. Strict Password Criteria (a-z, A-Z, 0-9, special char, min 8 chars)
    if (!pwdMetrics.isValid) {
      addToast('Password must contain lowercase (a-z), uppercase (A-Z), digit (0-9), and a special character (!@#$).', 'error');
      return;
    }

    // 3. Authenticate with users database
    const matchedUser = DEMO_USERS.find(
      (u) =>
        u.email.toLowerCase() === email.trim().toLowerCase() &&
        u.role === selectedRole
    );

    if (!matchedUser) {
      addToast(`No registered ${selectedRole} found with email: ${email}`, 'error');
      return;
    }

    if (matchedUser.password !== password) {
      addToast('Incorrect password for this account. Please verify your credentials.', 'error');
      return;
    }

    // Successful Login!
    onLogin(matchedUser);
    addToast(`Signed in successfully as ${matchedUser.name} (${matchedUser.role})`, 'success');
  };

  return (
    <div className="login-page-container">
      {/* Background ambient lighting */}
      <div className="login-ambient-blob blob-1"></div>
      <div className="login-ambient-blob blob-2"></div>

      <div className="login-content-wrapper single-card-layout">
        {/* Dynamic Entry Banner */}
        <div className="login-hero-header">
          <div className="brand-pill-badge">
            <HeartPulse size={18} className="text-teal-400 pulse-animation" />
            <span>PulseCare Hospital Health Portal</span>
          </div>

          <h1 className="login-main-heading">
            Hospital Staff & Patient Login
          </h1>
          <p className="login-sub-heading">
            Select your role, enter your registered email address, and enter your secure password.
          </p>

          <div className="live-status-pills-row">
            <div className="live-stat-pill">
              <span className="dot pulse green"></span>
              <span>Emergency Trauma: <strong>Code Red Active</strong></span>
            </div>
            <div className="live-stat-pill">
              <Building2 size={13} className="text-teal-400" />
              <span>Multi-Ward Registry: <strong>16 Beds Managed</strong></span>
            </div>
            <div className="live-stat-pill">
              <PhoneCall size={13} className="text-rose-400" />
              <span>Helpline: <strong>108 / 1800-PULSE</strong></span>
            </div>
          </div>
        </div>

        {/* Clean Centered Authentication Card */}
        <div className="login-centered-card">
          <div className="login-card-header">
            <div className="login-role-icon-box">
              {selectedRole === 'Admin' && <ShieldCheck size={28} />}
              {selectedRole === 'Doctor' && <Stethoscope size={28} />}
              {selectedRole === 'Pharmacist' && <Pill size={28} />}
              {selectedRole === 'Receptionist' && <Users size={28} />}
              {selectedRole === 'Patient' && <HeartPulse size={28} />}
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Portal Authentication
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Role: <strong className="text-teal-600 dark:text-teal-400">{selectedRole}</strong>
              </p>
            </div>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            {/* 1. SELECT LOGIN AS (ROLE) */}
            <div className="form-group">
              <label className="form-label">
                Select Login As <span className="text-rose-500">*</span>
              </label>
              <div className="role-selector-button-grid">
                {roles.map((r) => {
                  const Icon = r.icon;
                  const isSelected = selectedRole === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setSelectedRole(r.id)}
                      className={`role-select-chip-btn ${isSelected ? 'active' : ''}`}
                    >
                      <Icon size={16} />
                      <span className="role-chip-text">{r.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. MANDATORY EMAIL */}
            <div className="form-group">
              <div className="flex justify-between items-center">
                <label className="form-label">
                  Email Address <span className="text-rose-500">* (Mandatory)</span>
                </label>
                {email && (
                  <span className={`text-[11px] font-semibold ${isEmailValid ? 'text-emerald-600' : 'text-rose-500'}`}>
                    {isEmailValid ? '✓ Valid Email' : '✗ Invalid Email Format'}
                  </span>
                )}
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`form-control pl-10 ${
                    hasAttemptedSubmit && !isEmailValid ? 'border-rose-500 ring-1 ring-rose-500' : ''
                  }`}
                />
              </div>
            </div>

            {/* 3. PASSWORD WITH A-Z, A-Z, 0-9, SPECIAL CHAR CHECKLIST */}
            <div className="form-group">
              <label className="form-label">
                Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock size={16} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* LIVE PASSWORD REQUIREMENTS (a-z, A-Z, 0-9, special char) */}
            <div className="password-checklist-card">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center justify-between">
                <span>Password Requirements:</span>
                <span className={`text-[11px] font-bold ${pwdMetrics.isValid ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {pwdMetrics.isValid ? '✓ Criteria Satisfied' : 'Pending Requirements'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1.5 text-xs">
                <div className={`check-rule-item ${pwdMetrics.hasLower ? 'valid' : ''}`}>
                  {pwdMetrics.hasLower ? <CheckCircle2 size={13} className="text-emerald-500" /> : <XCircle size={13} className="text-slate-300" />}
                  <span>Lowercase letter (a-z)</span>
                </div>

                <div className={`check-rule-item ${pwdMetrics.hasUpper ? 'valid' : ''}`}>
                  {pwdMetrics.hasUpper ? <CheckCircle2 size={13} className="text-emerald-500" /> : <XCircle size={13} className="text-slate-300" />}
                  <span>Uppercase letter (A-Z)</span>
                </div>

                <div className={`check-rule-item ${pwdMetrics.hasDigit ? 'valid' : ''}`}>
                  {pwdMetrics.hasDigit ? <CheckCircle2 size={13} className="text-emerald-500" /> : <XCircle size={13} className="text-slate-300" />}
                  <span>Number / Digit (0-9)</span>
                </div>

                <div className={`check-rule-item ${pwdMetrics.hasSpecial ? 'valid' : ''}`}>
                  {pwdMetrics.hasSpecial ? <CheckCircle2 size={13} className="text-emerald-500" /> : <XCircle size={13} className="text-slate-300" />}
                  <span>Special character (!@#$)</span>
                </div>

                <div className={`check-rule-item col-span-2 ${pwdMetrics.hasLength ? 'valid' : ''}`}>
                  {pwdMetrics.hasLength ? <CheckCircle2 size={13} className="text-emerald-500" /> : <XCircle size={13} className="text-slate-300" />}
                  <span>Minimum 8 characters length</span>
                </div>
              </div>
            </div>

            {/* SIGN IN BUTTON */}
            <button
              type="submit"
              className="btn btn-primary w-full py-2.5 text-sm font-bold shadow-lg mt-2"
            >
              <LogIn size={16} />
              <span>Sign In as {selectedRole}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
