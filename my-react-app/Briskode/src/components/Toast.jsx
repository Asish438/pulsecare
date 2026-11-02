import React from 'react';
import { CheckCircle, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export default function Toast({ toasts, removeToast }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        let Icon = Info;
        let typeClass = 'toast-info';

        if (toast.type === 'success') {
          Icon = CheckCircle;
          typeClass = 'toast-success';
        } else if (toast.type === 'danger' || toast.type === 'error') {
          Icon = XCircle;
          typeClass = 'toast-danger';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          typeClass = 'toast-warning';
        }

        return (
          <div key={toast.id} className={`toast-card ${typeClass}`}>
            <Icon size={18} className="toast-icon" />
            <div className="toast-body">
              <p className="toast-message">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="toast-close-btn"
              aria-label="Dismiss alert"
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
