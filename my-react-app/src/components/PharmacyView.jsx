import React, { useState } from 'react';
import {
  Pill,
  Search,
  Plus,
  AlertTriangle,
  CheckCircle,
  PackageCheck,
  ShoppingCart,
  X,
  PlusCircle,
  MinusCircle
} from 'lucide-react';

export default function PharmacyView({
  medicines,
  setMedicines,
  addToast
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [dispenseMed, setDispenseMed] = useState(null);
  const [dispenseQty, setDispenseQty] = useState(1);

  // Add Med Form
  const [formData, setFormData] = useState({
    name: '',
    category: 'Antibiotic',
    stock: 100,
    minStock: 50,
    price: 15.0,
    unit: 'Tablet',
    expiry: '2028-01-01',
    manufacturer: 'Cipla Healthcare'
  });

  const categories = [
    'ALL',
    'Antibiotic',
    'Analgesic / Antipyretic',
    'Cardiovascular',
    'Antidiabetic',
    'Antacid / PPI',
    'Respiratory',
    'IV Fluid'
  ];

  const filteredMeds = medicines.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.id.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedCategory !== 'ALL' && !m.category.includes(selectedCategory)) return false;
    return true;
  });

  const lowStockCount = medicines.filter(m => m.stock <= m.minStock).length;
  const totalStockUnits = medicines.reduce((acc, curr) => acc + curr.stock, 0);

  const handleAddStockQuick = (medId, amount) => {
    const updated = medicines.map((m) =>
      m.id === medId ? { ...m, stock: m.stock + amount } : m
    );
    setMedicines(updated);
    addToast(`Restocked +${amount} units to inventory`, 'success');
  };

  const handleDispenseSubmit = (e) => {
    e.preventDefault();
    if (!dispenseMed) return;

    if (dispenseQty <= 0) {
      addToast('Please enter a valid quantity', 'error');
      return;
    }

    if (dispenseMed.stock < dispenseQty) {
      addToast(`Cannot dispense ${dispenseQty} units. Only ${dispenseMed.stock} units in stock.`, 'error');
      return;
    }

    const updated = medicines.map((m) =>
      m.id === dispenseMed.id ? { ...m, stock: m.stock - dispenseQty } : m
    );
    setMedicines(updated);
    addToast(`Dispensed ${dispenseQty} ${dispenseMed.unit}(s) of ${dispenseMed.name}`, 'success');
    setDispenseMed(null);
    setDispenseQty(1);
  };

  const handleAddMedSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      addToast('Please enter medicine name', 'error');
      return;
    }

    const newMed = {
      id: `MED-${String(medicines.length + 1).padStart(3, '0')}`,
      name: formData.name,
      category: formData.category,
      stock: parseInt(formData.stock, 10) || 50,
      minStock: parseInt(formData.minStock, 10) || 30,
      price: parseFloat(formData.price) || 10,
      unit: formData.unit,
      expiry: formData.expiry,
      manufacturer: formData.manufacturer
    };

    setMedicines([newMed, ...medicines]);
    addToast(`Medicine ${newMed.name} registered to pharmacy inventory!`, 'success');
    setShowAddModal(false);
    setFormData({
      name: '',
      category: 'Antibiotic',
      stock: 100,
      minStock: 50,
      price: 15.0,
      unit: 'Tablet',
      expiry: '2028-01-01',
      manufacturer: 'Cipla Healthcare'
    });
  };

  return (
    <div className="view-container">
      {/* Header */}
      <div className="view-header-bar">
        <div>
          <h2 className="view-title">Pharmacy & Pharmaceutical Inventory</h2>
          <p className="view-subtitle">
            Dispense prescriptions, track batch expirations, monitor safety thresholds, and manage stock.
          </p>
        </div>

        <div className="header-actions">
          <button onClick={() => setShowAddModal(true)} className="btn btn-primary">
            <Plus size={16} />
            <span>Add New Medicine</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="kpi-grid mb-6">
        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Total Formulations</span>
            <div className="kpi-icon-wrap teal"><Pill size={18} /></div>
          </div>
          <div className="kpi-val">{medicines.length}</div>
          <div className="kpi-footer">
            <span className="badge-pill green">Active in Hospital Formulary</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Low Stock Alerts</span>
            <div className="kpi-icon-wrap amber"><AlertTriangle size={18} /></div>
          </div>
          <div className="kpi-val">{lowStockCount}</div>
          <div className="kpi-footer">
            <span className={`badge-pill ${lowStockCount > 0 ? 'amber' : 'green'}`}>
              {lowStockCount > 0 ? 'Reorder Recommended' : 'All Stock Healthy'}
            </span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Total Units in Storage</span>
            <div className="kpi-icon-wrap blue"><PackageCheck size={18} /></div>
          </div>
          <div className="kpi-val">{totalStockUnits.toLocaleString()}</div>
          <div className="kpi-footer">
            <span className="badge-pill blue">Central Hospital Pharmacy</span>
          </div>
        </div>
      </div>

      {/* Controls & Filter */}
      <div className="filter-controls-row">
        <div className="search-input-wrap">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search medicine name, salt, manufacturer, or ID..."
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

        <div className="dept-chips-scroll">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`chip-btn ${selectedCategory === c ? 'active' : ''}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Table */}
      <div className="dashboard-card no-padding">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Medicine & ID</th>
                <th>Category</th>
                <th>Manufacturer</th>
                <th>Current Stock</th>
                <th>Status</th>
                <th>Unit Price</th>
                <th>Expiry Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMeds.length === 0 ? (
                <tr>
                  <td colSpan="8" className="empty-table-cell">
                    No medicines match the search filter.
                  </td>
                </tr>
              ) : (
                filteredMeds.map((med) => {
                  const isLow = med.stock <= med.minStock;
                  return (
                    <tr key={med.id}>
                      <td>
                        <div className="font-semibold text-slate-800 dark:text-slate-100">{med.name}</div>
                        <div className="text-xs text-slate-500">{med.id} • {med.unit}</div>
                      </td>
                      <td>
                        <span className="type-badge opd">{med.category}</span>
                      </td>
                      <td className="text-xs text-slate-600 dark:text-slate-300">
                        {med.manufacturer}
                      </td>
                      <td>
                        <div className="font-bold text-slate-800 dark:text-slate-100">
                          {med.stock} <span className="text-xs font-normal text-slate-500">{med.unit}s</span>
                        </div>
                        <div className="text-xs text-slate-400">Min: {med.minStock}</div>
                      </td>
                      <td>
                        {isLow ? (
                          <span className="status-badge-chip critical">Low Stock</span>
                        ) : (
                          <span className="status-badge-chip admitted">Optimal</span>
                        )}
                      </td>
                      <td className="font-medium text-slate-800 dark:text-slate-200">
                        ₹{med.price.toFixed(2)}
                      </td>
                      <td className="text-xs text-slate-500">
                        {med.expiry}
                      </td>
                      <td>
                        <div className="action-buttons-flex">
                          <button
                            onClick={() => {
                              setDispenseMed(med);
                              setDispenseQty(1);
                            }}
                            className="table-action-btn view"
                            title="Dispense Medicine to Patient"
                          >
                            <ShoppingCart size={14} />
                            <span>Dispense</span>
                          </button>
                          <button
                            onClick={() => handleAddStockQuick(med.id, 50)}
                            className="table-action-btn complete"
                            title="Quick Restock +50 units"
                          >
                            <PlusCircle size={14} />
                            <span>+50</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dispense Modal */}
      {dispenseMed && (
        <div className="modal-overlay" onClick={() => setDispenseMed(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="flex items-center gap-2">
                <ShoppingCart size={20} className="text-teal-600" />
                <h3>Dispense Medicine</h3>
              </div>
              <button onClick={() => setDispenseMed(null)} className="modal-close-btn">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleDispenseSubmit}>
              <div className="modal-body">
                <div className="bed-summary-banner mb-4">
                  <div><strong>Medicine:</strong> {dispenseMed.name}</div>
                  <div><strong>Available Stock:</strong> {dispenseMed.stock} {dispenseMed.unit}s</div>
                  <div><strong>Unit Price:</strong> ₹{dispenseMed.price}</div>
                </div>

                <div className="form-group">
                  <label className="form-label">Quantity to Dispense ({dispenseMed.unit}s) *</label>
                  <input
                    type="number"
                    min="1"
                    max={dispenseMed.stock}
                    required
                    value={dispenseQty}
                    onChange={(e) => setDispenseQty(parseInt(e.target.value, 10) || 1)}
                    className="form-control"
                  />
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm mt-3">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <strong>₹{(dispenseQty * dispenseMed.price).toFixed(2)}</strong>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setDispenseMed(null)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Confirm Dispensation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Medicine Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-card wide" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="flex items-center gap-2">
                <Pill size={20} className="text-teal-600" />
                <h3>Register Pharmaceutical Formulation</h3>
              </div>
              <button onClick={() => setShowAddModal(false)} className="modal-close-btn">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddMedSubmit}>
              <div className="modal-body form-grid">
                <div className="form-group">
                  <label className="form-label">Brand & Formulation Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ciprofloxacin 500mg"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Pharmacological Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="form-control"
                  >
                    {categories.filter(c => c !== 'ALL').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Manufacturer</label>
                  <input
                    type="text"
                    placeholder="e.g. Sun Pharma"
                    value={formData.manufacturer}
                    onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Dosage Unit</label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="form-control"
                  >
                    <option value="Tablet">Tablet</option>
                    <option value="Capsule">Capsule</option>
                    <option value="Vial">Vial (Injection)</option>
                    <option value="Syrup">Syrup Bottle</option>
                    <option value="Inhaler">Inhaler</option>
                    <option value="Tube">Ointment Tube</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Initial Stock Units</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Minimum Safety Threshold</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.minStock}
                    onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Unit Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Batch Expiry Date</label>
                  <input
                    type="date"
                    value={formData.expiry}
                    onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Medicine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
