import React, { useState } from 'react';
import {
  CreditCard,
  Search,
  Plus,
  Printer,
  Eye,
  CheckCircle,
  Clock,
  Trash2,
  X,
  FileCheck,
  ShieldCheck,
  Building
} from 'lucide-react';

export default function BillingView({
  invoices,
  setInvoices,
  patients,
  doctors,
  addToast
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Invoice Form
  const [formData, setFormData] = useState({
    patientName: patients[0]?.name || 'Amitav Roy',
    patientId: patients[0]?.id || 'PAT-001',
    doctorName: doctors[0]?.name || 'Dr. Rajesh Sharma',
    department: 'General Medicine',
    items: [
      { description: 'Physician Consultation & Clinical Review', qty: 1, rate: 800, amount: 800 },
      { description: 'Nursing Care & Hospital Service Charges', qty: 1, rate: 350, amount: 350 }
    ],
    discount: 0,
    paymentMethod: 'UPI / Net Banking'
  });

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inv.department && inv.department.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;
    if (statusFilter !== 'ALL' && inv.status !== statusFilter) return false;
    return true;
  });

  const totalRevenue = invoices.reduce((acc, curr) => acc + (curr.total || 0), 0);
  const paidCount = invoices.filter(i => i.status === 'Paid').length;
  const pendingCount = invoices.filter(i => i.status === 'Pending').length;

  const toggleInvoiceStatus = (invId) => {
    const updated = invoices.map(i => {
      if (i.id === invId) {
        const nextStatus = i.status === 'Paid' ? 'Pending' : 'Paid';
        return { ...i, status: nextStatus };
      }
      return i;
    });
    setInvoices(updated);
    addToast('Invoice payment status toggled', 'info');
  };

  const handleAddItemRow = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: 'Medication / Procedure', qty: 1, rate: 500, amount: 500 }]
    });
  };

  const handleUpdateItemRow = (index, field, val) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = val;
    if (field === 'qty' || field === 'rate') {
      const q = parseFloat(updatedItems[index].qty) || 1;
      const r = parseFloat(updatedItems[index].rate) || 0;
      updatedItems[index].amount = q * r;
    }
    setFormData({ ...formData, items: updatedItems });
  };

  const handleRemoveItemRow = (index) => {
    if (formData.items.length <= 1) return;
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: updatedItems });
  };

  const handleCreateInvoiceSubmit = (e) => {
    e.preventDefault();
    const subtotal = formData.items.reduce((acc, curr) => acc + (curr.amount || 0), 0);
    const discount = parseFloat(formData.discount) || 0;
    const tax = Math.round(subtotal * 0.05); // 5% GST
    const total = Math.max(0, subtotal - discount + tax);

    const newInv = {
      id: `INV-2026-${1000 + invoices.length + 1}`,
      patientId: formData.patientId,
      patientName: formData.patientName,
      date: new Date().toISOString().split('T')[0],
      department: formData.department,
      doctorName: formData.doctorName,
      items: formData.items,
      subtotal,
      discount,
      tax,
      total,
      status: 'Paid',
      paymentMethod: formData.paymentMethod
    };

    setInvoices([newInv, ...invoices]);
    addToast(`Invoice ${newInv.id} created for ₹${newInv.total}`, 'success');
    setShowCreateModal(false);
  };

  return (
    <div className="view-container">
      {/* Header */}
      <div className="view-header-bar">
        <div>
          <h2 className="view-title">Billing, Invoices & Insurance TPA</h2>
          <p className="view-subtitle">
            Itemized hospital accounts, cashless insurance claims, receipts, and revenue reconciliation.
          </p>
        </div>

        <div className="header-actions">
          <button onClick={() => setShowCreateModal(true)} className="btn btn-primary">
            <Plus size={16} />
            <span>Generate Patient Invoice</span>
          </button>
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="kpi-grid mb-6">
        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Cumulative Revenue</span>
            <div className="kpi-icon-wrap green"><CreditCard size={18} /></div>
          </div>
          <div className="kpi-val">₹{totalRevenue.toLocaleString('en-IN')}</div>
          <div className="kpi-footer">
            <span className="badge-pill green">{invoices.length} Bills Processed</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Paid Invoices</span>
            <div className="kpi-icon-wrap blue"><CheckCircle size={18} /></div>
          </div>
          <div className="kpi-val">{paidCount}</div>
          <div className="kpi-footer">
            <span className="badge-pill blue">Settled via Cash / Card / UPI / TPA</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Pending Invoices</span>
            <div className="kpi-icon-wrap amber"><Clock size={18} /></div>
          </div>
          <div className="kpi-val">{pendingCount}</div>
          <div className="kpi-footer">
            <span className="badge-pill amber">Awaiting Settlement / Insurance Clearance</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="filter-controls-row">
        <div className="search-input-wrap">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search invoice number, patient name, or department..."
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
          {['ALL', 'Paid', 'Pending'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`filter-tab-btn ${statusFilter === st ? 'active' : ''}`}
            >
              {st === 'ALL' ? `All Invoices (${invoices.length})` : st}
            </button>
          ))}
        </div>
      </div>

      {/* Invoices Table */}
      <div className="dashboard-card no-padding">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Patient Name</th>
                <th>Department</th>
                <th>Date</th>
                <th>Amount (₹)</th>
                <th>Payment Mode</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan="8" className="empty-table-cell">
                    No invoices found.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => (
                  <tr key={inv.id}>
                    <td>
                      <span className="font-mono text-xs font-semibold text-slate-800 dark:text-slate-200">
                        {inv.id}
                      </span>
                    </td>
                    <td>
                      <div className="font-semibold text-slate-900 dark:text-slate-100">{inv.patientName}</div>
                      <div className="text-xs text-slate-500">ID: {inv.patientId}</div>
                    </td>
                    <td>
                      <span className="type-badge opd">{inv.department}</span>
                    </td>
                    <td className="text-xs text-slate-500">
                      {inv.date}
                    </td>
                    <td>
                      <div className="font-bold text-slate-900 dark:text-slate-100">
                        ₹{inv.total.toLocaleString('en-IN')}
                      </div>
                      {inv.tax > 0 && (
                        <div className="text-xs text-slate-400">Incl. GST ₹{inv.tax}</div>
                      )}
                    </td>
                    <td className="text-xs text-slate-700 dark:text-slate-300">
                      {inv.paymentMethod}
                    </td>
                    <td>
                      <span className={`status-badge-chip ${inv.status.toLowerCase()}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons-flex">
                        <button
                          onClick={() => setSelectedInvoice(inv)}
                          className="table-action-btn view"
                          title="View & Print Official Receipt"
                        >
                          <Printer size={14} />
                          <span>Receipt</span>
                        </button>
                        <button
                          onClick={() => toggleInvoiceStatus(inv.id)}
                          className="table-action-btn complete"
                          title="Toggle Payment Status"
                        >
                          <CheckCircle size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Tax Invoice Receipt Modal */}
      {selectedInvoice && (
        <div className="modal-overlay" onClick={() => setSelectedInvoice(null)}>
          <div className="modal-card wide" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="flex items-center gap-2">
                <CreditCard size={20} className="text-teal-600" />
                <h3>Official Hospital Tax Invoice & Receipt</h3>
              </div>
              <button onClick={() => setSelectedInvoice(null)} className="modal-close-btn">
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="invoice-printable-sheet">
                {/* Letterhead */}
                <div className="flex justify-between items-start border-b pb-4 mb-4">
                  <div>
                    <h2 className="text-2xl font-black text-teal-800 dark:text-teal-400">PULSECARE MULTISPECIALTY HOSPITAL</h2>
                    <p className="text-xs text-slate-500">
                      Plot 14, Health City, Sector V, Kolkata - 700091 • Phone: 033-2488-9000
                    </p>
                    <p className="text-xs text-slate-400">
                      GSTIN: 19AABCP1234F1Z8 • Hospital Reg: WB-MED-2026-9901
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-mono font-bold text-slate-800 dark:text-slate-100">
                      TAX INVOICE
                    </div>
                    <div className="font-mono text-xs font-semibold text-teal-700 dark:text-teal-400">
                      {selectedInvoice.id}
                    </div>
                    <div className="text-xs text-slate-500">Date: {selectedInvoice.date}</div>
                  </div>
                </div>

                {/* Patient Information Banner */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs mb-4">
                  <div>
                    <span className="text-slate-400 block">Billed To (Patient):</span>
                    <strong className="text-slate-800 dark:text-slate-100">{selectedInvoice.patientName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Patient ID:</span>
                    <strong className="text-slate-800 dark:text-slate-100">{selectedInvoice.patientId}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Department / Doctor:</span>
                    <strong className="text-slate-800 dark:text-slate-100">{selectedInvoice.department} • {selectedInvoice.doctorName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Payment Mode:</span>
                    <strong className="text-slate-800 dark:text-slate-100">{selectedInvoice.paymentMethod}</strong>
                  </div>
                </div>

                {/* Itemized Charge Breakdown */}
                <table className="compact-table w-full mb-4">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Service / Medication Description</th>
                      <th>Qty</th>
                      <th>Tariff Rate (₹)</th>
                      <th>Total Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedInvoice.items?.map((item, idx) => (
                      <tr key={idx}>
                        <td className="text-xs text-slate-400">{idx + 1}</td>
                        <td className="font-medium text-slate-800 dark:text-slate-200">{item.description}</td>
                        <td className="text-slate-600 dark:text-slate-300">{item.qty}</td>
                        <td className="text-slate-600 dark:text-slate-300">₹{item.rate.toLocaleString('en-IN')}</td>
                        <td className="font-semibold text-slate-900 dark:text-slate-100">₹{item.amount.toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Totals Summary */}
                <div className="flex justify-end pt-2">
                  <div className="w-64 space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>Subtotal:</span>
                      <span>₹{selectedInvoice.subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    {selectedInvoice.discount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-medium">
                        <span>Discount / Concession:</span>
                        <span>- ₹{selectedInvoice.discount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    {selectedInvoice.tax > 0 && (
                      <div className="flex justify-between text-slate-600 dark:text-slate-400">
                        <span>Hospital Taxes (GST 5%):</span>
                        <span>+ ₹{selectedInvoice.tax.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-bold text-slate-900 dark:text-slate-100 border-t pt-2">
                      <span>Grand Total:</span>
                      <span>₹{selectedInvoice.total.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs mt-2">
                      <span>Payment Status:</span>
                      <span className={`status-badge-chip ${selectedInvoice.status.toLowerCase()}`}>
                        {selectedInvoice.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer seal */}
                <div className="flex justify-between items-end pt-8 mt-6 border-t border-slate-200 dark:border-slate-800 text-xs">
                  <div className="text-slate-400">
                    <div>* Computer-generated formal invoice. No physical signature required.</div>
                    <div>Thank you for choosing PulseCare Healthcare. Get well soon!</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Accounts & Revenue Desk</div>
                    <div className="text-slate-400">PulseCare Hospital Administration</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => window.print()} className="btn btn-primary">
                <Printer size={15} />
                <span>Print Official Invoice</span>
              </button>
              <button onClick={() => setSelectedInvoice(null)} className="btn btn-secondary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Invoice Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-card wide" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="flex items-center gap-2">
                <CreditCard size={20} className="text-teal-600" />
                <h3>Generate Patient Invoice</h3>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="modal-close-btn">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateInvoiceSubmit}>
              <div className="modal-body form-grid">
                <div className="form-group">
                  <label className="form-label">Select Billed Patient *</label>
                  <select
                    value={formData.patientName}
                    onChange={(e) => {
                      const p = patients.find(pat => pat.name === e.target.value);
                      setFormData({
                        ...formData,
                        patientName: e.target.value,
                        patientId: p ? p.id : 'PAT-001'
                      });
                    }}
                    className="form-control"
                  >
                    {patients.map(p => (
                      <option key={p.id} value={p.name}>{p.name} ({p.id})</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Consulting Doctor</label>
                  <select
                    value={formData.doctorName}
                    onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                    className="form-control"
                  >
                    {doctors.map(d => (
                      <option key={d.id} value={d.name}>{d.name} ({d.department})</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="form-control"
                  >
                    {['General Medicine', 'Cardiology', 'Orthopedics', 'Neurology', 'Pediatrics', 'Emergency', 'Gynecology'].map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Payment Method</label>
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="form-control"
                  >
                    <option value="UPI / Google Pay / PhonePe">UPI / Google Pay / PhonePe</option>
                    <option value="Credit / Debit Card">Credit / Debit Card</option>
                    <option value="Cash Payment">Cash Payment</option>
                    <option value="Star Health Insurance (TPA)">Star Health Insurance (TPA)</option>
                    <option value="HDFC ERGO Cashless TPA">HDFC ERGO Cashless TPA</option>
                  </select>
                </div>

                {/* Line Items Builder */}
                <div className="col-span-2 mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="form-label font-bold">Line Items & Clinical Charges</label>
                    <button
                      type="button"
                      onClick={handleAddItemRow}
                      className="btn btn-outline btn-xs"
                    >
                      <Plus size={13} />
                      <span>Add Item</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {formData.items.map((item, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <input
                          type="text"
                          placeholder="Description (e.g. ICU charges, ultrasound)"
                          value={item.description}
                          onChange={(e) => handleUpdateItemRow(idx, 'description', e.target.value)}
                          className="form-control flex-1 text-xs"
                          required
                        />
                        <input
                          type="number"
                          min="1"
                          placeholder="Qty"
                          value={item.qty}
                          onChange={(e) => handleUpdateItemRow(idx, 'qty', e.target.value)}
                          className="form-control w-20 text-xs"
                          required
                        />
                        <input
                          type="number"
                          min="0"
                          placeholder="Rate ₹"
                          value={item.rate}
                          onChange={(e) => handleUpdateItemRow(idx, 'rate', e.target.value)}
                          className="form-control w-28 text-xs"
                          required
                        />
                        <span className="text-xs font-bold w-24 text-right">
                          ₹{item.amount}
                        </span>
                        {formData.items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveItemRow(idx)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-group mt-2">
                  <label className="form-label">Discount / Concession (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setShowCreateModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Generate & Finalize Bill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
