import React, { useState } from "react";
import { calculateInstitutionMetrics } from "../data/staffingData";
import { CloseIcon, PlusIcon, EditIcon, CheckCircleIcon, AlertTriangleIcon } from "./Icons";

export default function InstitutionDetailModal({ inst, onClose, onSave }) {
  const [formData, setFormData] = useState(JSON.parse(JSON.stringify(inst)));

  const handleGlobalChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBreakdownChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      breakdown: prev.breakdown.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleAddSubgroup = () => {
    const newId = `sub_${Date.now()}`;
    setFormData((prev) => ({
      ...prev,
      breakdown: [
        ...prev.breakdown,
        {
          id: newId,
          name: "New Department / Grade",
          students: 100,
          ratio: prev.targetRatio || 30,
          maxPerSec: prev.maxPerSection || 40
        }
      ]
    }));
  };

  const handleRemoveSubgroup = (id) => {
    setFormData((prev) => ({
      ...prev,
      breakdown: prev.breakdown.filter((item) => item.id !== id)
    }));
  };

  const metrics = calculateInstitutionMetrics(formData);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container glass-card modal-lg">
        <div className="modal-header">
          <div>
            <span className="modal-category">{formData.category}</span>
            <h2 className="modal-title">{formData.name}</h2>
          </div>
          <button type="button" className="btn-close" onClick={onClose}>
            <CloseIcon className="icon" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          {/* Institutional Settings */}
          <div className="modal-section">
            <h3 className="section-heading">Institutional Parameters & Staffing Rules</h3>
            <div className="form-grid-3">
              <div className="form-group">
                <label className="form-label">Staffing Rule Model</label>
                <select
                  className="form-input"
                  value={formData.ruleType}
                  onChange={(e) => handleGlobalChange("ruleType", e.target.value)}
                >
                  <option value="per_section">Fixed Teachers per Section (1.5 / Section - Matric/CBSE)</option>
                  <option value="ratio">Student-Teacher Ratio (1:15 Engineering / 1:20 Arts)</option>
                  <option value="nursery_primary">RTE Act & Nursery (1:20 Nursery, 1:30 Primary)</option>
                  <option value="subject_based">Govt Subject Assistants (1:35/1:40 + BT/PG)</option>
                </select>
              </div>

              {formData.ruleType === "per_section" ? (
                <div className="form-group">
                  <label className="form-label">Teachers Per Section</label>
                  <input
                    type="number"
                    step="0.1"
                    className="form-input"
                    value={formData.teachersPerSection || 1.5}
                    onChange={(e) => handleGlobalChange("teachersPerSection", parseFloat(e.target.value) || 1.5)}
                  />
                </div>
              ) : (
                <div className="form-group">
                  <label className="form-label">Target Student-Teacher Ratio</label>
                  <div className="input-prefix-group">
                    <span className="prefix font-mono">1 :</span>
                    <input
                      type="number"
                      className="form-input"
                      value={formData.targetRatio || 30}
                      onChange={(e) => handleGlobalChange("targetRatio", parseInt(e.target.value) || 30)}
                    />
                  </div>
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Max Students Per Section</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.maxPerSection || 40}
                  onChange={(e) => handleGlobalChange("maxPerSection", parseInt(e.target.value) || 40)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Current Faculty On-Roll</label>
                <input
                  type="number"
                  className="form-input font-bold text-cyan"
                  value={formData.currentFaculty}
                  onChange={(e) => handleGlobalChange("currentFaculty", parseInt(e.target.value) || 0)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Location / Campus</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.location}
                  onChange={(e) => handleGlobalChange("location", e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Institution Sub-Type</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.type}
                  onChange={(e) => handleGlobalChange("type", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Department / Grade Breakdown */}
          <div className="modal-section">
            <div className="section-header-row">
              <div>
                <h3 className="section-heading">Department & Grade-Wise Student Distribution</h3>
                <p className="section-subtext">Customize student enrollment per grade or department to auto-calculate required sections & teachers.</p>
              </div>
              <button
                type="button"
                className="btn-secondary btn-sm"
                onClick={handleAddSubgroup}
              >
                <PlusIcon className="icon-sm" /> Add Department / Grade
              </button>
            </div>

            <div className="breakdown-table-wrapper">
              <table className="breakdown-table">
                <thead>
                  <tr>
                    <th>Department / Grade Level</th>
                    <th>Students Enrolled</th>
                    <th>Max / Section</th>
                    <th>Sections</th>
                    <th>Target Ratio</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.breakdown.map((item) => {
                    const maxSec = item.maxPerSec || formData.maxPerSection || 40;
                    const sections = Math.ceil((item.students || 0) / maxSec);
                    return (
                      <tr key={item.id}>
                        <td>
                          <input
                            type="text"
                            className="table-input"
                            value={item.name}
                            onChange={(e) => handleBreakdownChange(item.id, "name", e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="table-input font-mono"
                            value={item.students}
                            onChange={(e) => handleBreakdownChange(item.id, "students", parseInt(e.target.value) || 0)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="table-input font-mono"
                            value={item.maxPerSec || formData.maxPerSection || 40}
                            onChange={(e) => handleBreakdownChange(item.id, "maxPerSec", parseInt(e.target.value) || 40)}
                          />
                        </td>
                        <td className="font-mono text-center font-bold text-amber">
                          {sections}
                        </td>
                        <td>
                          <div className="input-prefix-group sm">
                            <span className="prefix font-mono">1:</span>
                            <input
                              type="number"
                              className="table-input font-mono"
                              value={item.ratio || formData.targetRatio || 30}
                              onChange={(e) => handleBreakdownChange(item.id, "ratio", parseInt(e.target.value) || 30)}
                            />
                          </div>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn-danger-icon"
                            onClick={() => handleRemoveSubgroup(item.id)}
                            disabled={formData.breakdown.length <= 1}
                            title="Remove group"
                          >
                            <CloseIcon className="icon-sm" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Live Preview Summary Bar */}
          <div className="modal-preview-bar glass-card">
            <div className="preview-item">
              <span className="preview-label">Total Students:</span>
              <span className="preview-val">{metrics.totalStudents.toLocaleString()}</span>
            </div>
            <div className="preview-item">
              <span className="preview-label">Total Sections:</span>
              <span className="preview-val">{metrics.totalSections}</span>
            </div>
            <div className="preview-item">
              <span className="preview-label">Required Faculty:</span>
              <span className="preview-val text-cyan">{metrics.calculatedRequiredFaculty}</span>
            </div>
            <div className="preview-item">
              <span className="preview-label">Current Faculty:</span>
              <span className="preview-val text-emerald">{metrics.currentFaculty}</span>
            </div>
            <div className="preview-item highlight">
              <span className="preview-label">Appointments Needed:</span>
              <span className={`preview-val ${metrics.vacancy > 0 ? "text-rose font-bold" : "text-emerald"}`}>
                {metrics.vacancy > 0 ? `+${metrics.vacancy}` : "0 (Compliant)"}
              </span>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <CheckCircleIcon className="icon-sm" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
