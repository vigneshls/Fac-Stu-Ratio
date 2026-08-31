import React, { useState } from "react";
import { CATEGORIES } from "../data/staffingData";
import { CloseIcon, CheckCircleIcon } from "./Icons";

export default function AddInstitutionModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    shortName: "",
    category: CATEGORIES.COLLEGES,
    type: "Engineering",
    location: "Theni",
    ruleType: "ratio",
    targetRatio: 20,
    maxPerSection: 40,
    teachersPerSection: 1.5,
    currentFaculty: 20,
    initialStudents: 300
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const newInst = {
      id: `custom_${Date.now()}`,
      name: formData.name,
      shortName: formData.shortName || formData.name.slice(0, 10),
      category: formData.category,
      type: formData.type,
      location: formData.location,
      established: new Date().getFullYear(),
      ruleType: formData.ruleType,
      targetRatio: Number(formData.targetRatio) || 20,
      maxPerSection: Number(formData.maxPerSection) || 40,
      teachersPerSection: Number(formData.teachersPerSection) || 1.5,
      currentFaculty: Number(formData.currentFaculty) || 0,
      breakdown: [
        {
          id: `b_init_${Date.now()}`,
          name: "Main Department / General Section",
          students: Number(formData.initialStudents) || 300,
          ratio: Number(formData.targetRatio) || 20,
          maxPerSec: Number(formData.maxPerSection) || 40
        }
      ]
    };

    onAdd(newInst);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container glass-card modal-md">
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Add New Institution</h2>
            <p className="modal-subtext">Add a new campus or branch to the Nadar Saraswathi Trust network.</p>
          </div>
          <button type="button" className="btn-close" onClick={onClose}>
            <CloseIcon className="icon" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-grid-2">
            <div className="form-group span-2">
              <label className="form-label">Institution Full Name *</label>
              <input
                type="text"
                required
                className="form-input"
                placeholder="e.g. Nadar Saraswathi College of Pharmacy"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Short Name / Abbreviation</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. NSCP"
                value={formData.shortName}
                onChange={(e) => handleChange("shortName", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-input"
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
              >
                {Object.values(CATEGORIES).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Institution Type</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Pharmacy / CBSE / Higher Sec"
                value={formData.type}
                onChange={(e) => handleChange("type", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Campus Location</label>
              <input
                type="text"
                className="form-input"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Staffing Rule Model</label>
              <select
                className="form-input"
                value={formData.ruleType}
                onChange={(e) => handleChange("ruleType", e.target.value)}
              >
                <option value="ratio">Student-Teacher Ratio Model</option>
                <option value="per_section">Fixed Teachers per Section Model</option>
                <option value="nursery_primary">Nursery & Primary RTE Model</option>
                <option value="subject_based">Govt Subject Assistants Model</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Target Student-Teacher Ratio</label>
              <input
                type="number"
                className="form-input"
                value={formData.targetRatio}
                onChange={(e) => handleChange("targetRatio", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Initial Student Count</label>
              <input
                type="number"
                className="form-input font-mono"
                value={formData.initialStudents}
                onChange={(e) => handleChange("initialStudents", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Current Faculty On-Roll</label>
              <input
                type="number"
                className="form-input font-mono text-emerald"
                value={formData.currentFaculty}
                onChange={(e) => handleChange("currentFaculty", e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <CheckCircleIcon className="icon-sm" /> Add Institution
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
