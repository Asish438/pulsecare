import React, { useState } from 'react';
import {
  FlaskConical,
  Search,
  Plus,
  Eye,
  FileText,
  Printer,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  Stethoscope
} from 'lucide-react';

export default function LaboratoryView({
  labTests,
  setLabTests,
  patients,
  doctors,
  addToast
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedReport, setSelectedReport] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  // New Test Order Form
  const [formData, setFormData] = useState({
    patientName: patients[0]?.name || 'Amitav Roy',
    patientId: patients[0]?.id || 'PAT-001',
    testName: 'Complete Blood Count (CBC) with ESR',
    department: 'Hematology',
    doctorName: doctors[0]?.name || 'Dr. Rajesh Sharma'
  });

  const filteredTests = labTests.filter((test) => {
    const matchesSearch =
      test.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.id.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (statusFilter !== 'ALL' && test.status !== statusFilter) return false;
    return true;
  });

  const handlePatientSelect = (name) => {
    const found = patients.find(p => p.name === name);
    setFormData({
      ...formData,
      patientName: name,
      patientId: found ? found.id : 'PAT-001'
    });
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    const newTest = {
      id: `LAB-${800 + labTests.length + 1}`,
      patientName: formData.patientName,
      patientId: formData.patientId,
      testName: formData.testName,
      department: formData.department,
      doctorName: formData.doctorName,
      date: new Date().toISOString().split('T')[0],
      status: 'Processing',
      parameters: [
        { name: 'Initial Screen', result: 'Pending Lab Equipment Run', normal: 'Normal Limits', flag: 'NORMAL' }
      ],
      summary: 'Sample received in laboratory triage. Analyzer processing.',
      pathologist: 'Dr. Sumit Sen, MD (Pathology)'
    };

    setLabTests([newTest, ...labTests]);
    addToast(`Diagnostic test ordered for ${newTest.patientName} (${newTest.id})`, 'success');
    setShowOrderModal(false);
  };

  return (
    <div className="view-container">
      {/* Header */}
      <div className="view-header-bar">
        <div>
          <h2 className="view-title">Diagnostics & Clinical Pathology</h2>
          <p className="view-subtitle">
            Pathological investigations, radiology telemetry, biochemical profiles, and digital lab reports.
          </p>
        </div>

        <div className="header-actions">
          <button onClick={() => setShowOrderModal(true)} className="btn btn-primary">
            <Plus size={16} />
            <span>Order Diagnostic Test</span>
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="filter-controls-row">
        <div className="search-input-wrap">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search test name, patient, or lab ID..."
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
          {['ALL', 'Completed', 'Processing', 'Pending'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`filter-tab-btn ${statusFilter === st ? 'active' : ''}`}
            >
              {st === 'ALL' ? `All (${labTests.length})` : st}
            </button>
          ))}
        </div>
      </div>

      {/* Lab Tests Table */}
      <div className="dashboard-card no-padding">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Test ID</th>
                <th>Investigation Title</th>
                <th>Patient Details</th>
                <th>Department</th>
                <th>Referred By</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTests.length === 0 ? (
                <tr>
                  <td colSpan="8" className="empty-table-cell">
                    No diagnostic investigations match this filter.
                  </td>
                </tr>
              ) : (
                filteredTests.map((test) => (
                  <tr key={test.id}>
                    <td>
                      <span className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {test.id}
                      </span>
                    </td>
                    <td>
                      <div className="font-semibold text-slate-900 dark:text-slate-100">{test.testName}</div>
                      <div className="text-xs text-slate-500">{test.department}</div>
                    </td>
                    <td>
                      <div className="font-semibold text-slate-800 dark:text-slate-200">{test.patientName}</div>
                      <div className="text-xs text-slate-500">ID: {test.patientId}</div>
                    </td>
                    <td>
                      <span className="type-badge opd">{test.department}</span>
                    </td>
                    <td className="text-xs text-slate-600 dark:text-slate-300">
                      {test.doctorName}
                    </td>
                    <td className="text-xs text-slate-500">
                      {test.date}
                    </td>
                    <td>
                      <span className={`status-badge-chip ${test.status.toLowerCase()}`}>
                        {test.status}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => setSelectedReport(test)}
                        className="table-action-btn view"
                        title="View Formal Pathology Lab Report"
                      >
                        <FileText size={14} />
                        <span>Report</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Diagnostic Lab Report Modal */}
      {selectedReport && (
        <div className="modal-overlay" onClick={() => setSelectedReport(null)}>
          <div className="modal-card wide" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="flex items-center gap-2">
                <FlaskConical size={20} className="text-teal-600" />
                <h3>Clinical Diagnostic & Pathology Report</h3>
              </div>
              <button onClick={() => setSelectedReport(null)} className="modal-close-btn">
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              {/* Formal Letterhead */}
              <div className="report-letterhead">
                <div className="flex justify-between items-start border-b pb-4 mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-teal-700 dark:text-teal-400">PULSECARE CENTRAL DIAGNOSTIC LAB</h2>
                    <p className="text-xs text-slate-500">NABL & CAP Accredited Laboratory Services • Reg. No. LAB/2026/8940</p>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm font-bold text-slate-700 dark:text-slate-300">Report #{selectedReport.id}</div>
                    <div className="text-xs text-slate-500">Date: {selectedReport.date}</div>
                  </div>
                </div>

                {/* Patient / Referral metadata */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs mb-4">
                  <div>
                    <span className="text-slate-400 block">Patient Name</span>
                    <strong className="text-slate-800 dark:text-slate-100">{selectedReport.patientName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Patient ID</span>
                    <strong className="text-slate-800 dark:text-slate-100">{selectedReport.patientId}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Referred By</span>
                    <strong className="text-slate-800 dark:text-slate-100">{selectedReport.doctorName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Investigation</span>
                    <strong className="text-slate-800 dark:text-slate-100">{selectedReport.testName}</strong>
                  </div>
                </div>

                {/* Parameters Table */}
                <table className="compact-table w-full mb-4">
                  <thead>
                    <tr>
                      <th>Analyte / Parameter</th>
                      <th>Observed Result</th>
                      <th>Biological Reference Interval</th>
                      <th>Flag</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedReport.parameters?.map((p, idx) => {
                      const isHigh = p.flag.includes('HIGH');
                      const isLow = p.flag.includes('LOW');
                      const isAbnormal = p.flag.includes('ABNORMAL');
                      const isNormal = p.flag === 'NORMAL';

                      return (
                        <tr key={idx}>
                          <td className="font-medium text-slate-800 dark:text-slate-200">{p.name}</td>
                          <td className="font-bold text-slate-900 dark:text-slate-100">{p.result}</td>
                          <td className="text-xs text-slate-500">{p.normal}</td>
                          <td>
                            {isNormal ? (
                              <span className="badge-pill green">Normal</span>
                            ) : (
                              <span className="badge-pill red font-semibold">{p.flag}</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Clinical Interpretation */}
                <div className="p-3 bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900 rounded-lg text-xs mb-4">
                  <div className="font-semibold text-teal-800 dark:text-teal-300 mb-1">Pathologist Impression & Clinical Summary:</div>
                  <p className="text-slate-700 dark:text-slate-300">{selectedReport.summary}</p>
                </div>

                {/* Pathologist Signature */}
                <div className="flex justify-between items-end pt-4 border-t border-slate-200 dark:border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-400 block">Status:</span>
                    <span className="font-semibold text-emerald-600">Electronically Verified & Signed</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-slate-800 dark:text-slate-100">{selectedReport.pathologist}</div>
                    <div className="text-slate-400">Consultant Pathologist</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => window.print()} className="btn btn-outline">
                <Printer size={15} />
                <span>Print Lab Report</span>
              </button>
              <button onClick={() => setSelectedReport(null)} className="btn btn-secondary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Test Modal */}
      {showOrderModal && (
        <div className="modal-overlay" onClick={() => setShowOrderModal(false)}>
          <div className="modal-card wide" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="flex items-center gap-2">
                <FlaskConical size={20} className="text-teal-600" />
                <h3>Order Clinical Diagnostic Investigation</h3>
              </div>
              <button onClick={() => setShowOrderModal(false)} className="modal-close-btn">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleOrderSubmit}>
              <div className="modal-body form-grid">
                <div className="form-group">
                  <label className="form-label">Select Patient *</label>
                  <select
                    value={formData.patientName}
                    onChange={(e) => handlePatientSelect(e.target.value)}
                    className="form-control"
                  >
                    {patients.map(p => (
                      <option key={p.id} value={p.name}>{p.name} ({p.id})</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Investigation / Test Name *</label>
                  <select
                    value={formData.testName}
                    onChange={(e) => setFormData({ ...formData, testName: e.target.value })}
                    className="form-control"
                  >
                    <option value="Complete Blood Count (CBC) with ESR">Complete Blood Count (CBC) with ESR</option>
                    <option value="Comprehensive Metabolic & Liver Profile (LFT)">Comprehensive Metabolic & Liver Profile (LFT)</option>
                    <option value="Renal Function Test (KFT / BUN / Creatinine)">Renal Function Test (KFT / BUN / Creatinine)</option>
                    <option value="Complete Lipid Profile">Complete Lipid Profile</option>
                    <option value="Digital Chest X-Ray (PA View)">Digital Chest X-Ray (PA View)</option>
                    <option value="MRI Brain with Contrast">MRI Brain with Contrast</option>
                    <option value="Serum Amylase & Lipase Profile">Serum Amylase & Lipase Profile</option>
                    <option value="Thyroid Profile (T3, T4, TSH)">Thyroid Profile (T3, T4, TSH)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Diagnostic Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="form-control"
                  >
                    <option value="Hematology">Hematology</option>
                    <option value="Biochemistry">Biochemistry</option>
                    <option value="Radiology">Radiology & Imaging</option>
                    <option value="Clinical Pathology">Clinical Pathology</option>
                    <option value="Microbiology">Microbiology</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Referring Clinician</label>
                  <select
                    value={formData.doctorName}
                    onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                    className="form-control"
                  >
                    {doctors.map(d => (
                      <option key={d.id} value={d.name}>{d.name} ({d.specialty})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setShowOrderModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit Lab Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
