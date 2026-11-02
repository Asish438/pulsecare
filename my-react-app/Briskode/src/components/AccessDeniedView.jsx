import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, LogOut } from 'lucide-react';

export default function AccessDeniedView({ currentUser, onLogout }) {
  return (
    <div className="not-found-container">
      <div className="not-found-card">
        <div className="not-found-icon-wrap" style={{ backgroundColor: 'var(--danger-light)' }}>
          <ShieldAlert size={40} className="text-rose-600" />
        </div>
        <h2 className="not-found-title">Role Permission Required</h2>
        <p className="not-found-desc">
          You are currently signed in as <strong>{currentUser?.name}</strong> with the <strong>{currentUser?.role}</strong> role.
          This clinical or administrative subsystem is restricted to authorized roles.
        </p>

        <div className="flex gap-3 justify-center flex-wrap">
          <Link to="/" className="btn btn-secondary">
            <ArrowLeft size={16} />
            <span>Return to My Allowed Workspace</span>
          </Link>
          <button onClick={onLogout} className="btn btn-primary">
            <LogOut size={16} />
            <span>Sign In with Different Role</span>
          </button>
        </div>
      </div>
    </div>
  );
}
