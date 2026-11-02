import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, ArrowLeft, HeartPulse } from 'lucide-react';

export default function NotFoundView() {
  return (
    <div className="not-found-container">
      <div className="not-found-card">
        <div className="not-found-icon-wrap">
          <HeartPulse size={48} className="text-teal-600 pulse-animation" />
        </div>
        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">Clinical Resource Not Found</h2>
        <p className="not-found-desc">
          The ward, patient record, or clinical module URL you requested does not exist or has been relocated within the hospital registry.
        </p>
        <Link to="/" className="btn btn-primary">
          <ArrowLeft size={16} />
          <span>Return to Hospital Dashboard</span>
        </Link>
      </div>
    </div>
  );
}
