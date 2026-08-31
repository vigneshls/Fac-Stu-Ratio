import React, { useState } from "react";
import { calculateInstitutionMetrics } from "../data/staffingData";

export default function InstitutionDetailModal({ inst, onClose, onSave }) {
  const [editingInst, setEditingInst] = useState(JSON.parse(JSON.stringify(inst)));

  const metrics = calculateInstitutionMetrics(editingInst);

  const handleRuleChange = (field, val) => {
    setEditingInst(prev => ({
      ...prev,
      [field]: val
    }));
  };

  const handleSubGroupChange = (index, field, val) => {
    const newBreakdown = [...editingInst.breakdown];
    newBreakdown[index][field] = field === "name" ? val : (parseInt(val) || 0);
    setEditingInst(prev => ({
      ...prev,
      breakdown: newBreakdown
    }));
  };

  const handleSave = () => {
    onSave(editingInst);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-head">
          <h2 style={{ fontSize: "16px", fontWeight: 800 }}>Customize Rules: {editingInst.name}</h2>
          <button type="button" className="btn btn-secondary" style={{ padding: "3px 8px" }} onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Rule Parameter Customization Form */}
        <div className="rule-form-grid">
          <div className="form-field">
            <label className="form-label">Staffing Rule Model</label>
            <select
              className="form-select"
              value={editingInst.ruleType || "ratio"}
              onChange={e => handleRuleChange("ruleType", e.target.value)}
            >
              <option value="ratio">Student-Teacher Ratio Model (1:X)</option>
              <option value="per_section">Fixed Teachers Per Section Model</option>
              <option value="nursery_primary">RTE Act & Nursery Model</option>
              <option value="subject_based">Govt Subject Assistants Model</option>
            </select>
          </div>

          {editingInst.ruleType === "per_section" ? (
            <div className="form-field">
              <label className="form-label">Teachers Per Section</label>
              <input
                type="number"
                step="0.1"
                className="form-num-input"
                value={editingInst.teachersPerSection || 1.5}
                onChange={e => handleRuleChange("teachersPerSection", parseFloat(e.target.value) || 1.5)}
              />
            </div>
          ) : (
            <div className="form-field">
              <label className="form-label">Target Ratio (1 : X)</label>
              <input
                type="number"
                className="form-num-input"
                value={editingInst.targetRatio || 20}
                onChange={e => handleRuleChange("targetRatio", parseInt(e.target.value) || 20)}
              />
            </div>
          )}

          <div className="form-field">
            <label className="form-label">Max Students / Section</label>
            <input
              type="number"
              className="form-num-input"
              value={editingInst.maxPerSection || 40}
              onChange={e => handleRuleChange("maxPerSection", parseInt(e.target.value) || 40)}
            />
          </div>

          <div className="form-field">
            <label className="form-label">Current Faculty On-Roll</label>
            <input
              type="number"
              className="form-num-input font-mono"
              style={{ color: "var(--brand-600)" }}
              value={editingInst.currentFaculty || 0}
              onChange={e => handleRuleChange("currentFaculty", parseInt(e.target.value) || 0)}
            />
          </div>
        </div>

        <div style={{ background: "var(--brand-50)", padding: "10px 14px", borderRadius: "8px", fontSize: "12px", marginBottom: "14px", display: "flex", justifyContent: "space-between" }}>
          <span>Calculated Required Norm: <strong className="text-indigo">{metrics.calculatedRequiredFaculty} Staff</strong></span>
          <span>Appointments Needed: <strong className={metrics.vacancy > 0 ? "text-rose" : "text-emerald"}>{metrics.vacancy > 0 ? `+${metrics.vacancy}` : "0"}</strong></span>
        </div>

        <h4 style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "6px" }}>
          Department / Grade Student Breakdown
        </h4>
        <table className="ui-table">
          <thead>
            <tr>
              <th>Department / Class</th>
              <th>Students Enrolled</th>
              <th>Max / Sec</th>
            </tr>
          </thead>
          <tbody>
            {editingInst.breakdown.map((b, idx) => (
              <tr key={b.id || idx}>
                <td>
                  <input
                    type="text"
                    className="table-input"
                    value={b.name}
                    onChange={e => handleSubGroupChange(idx, "name", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="table-input font-mono"
                    value={b.students}
                    onChange={e => handleSubGroupChange(idx, "students", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="table-input font-mono"
                    value={b.maxPerSec || editingInst.maxPerSection || 40}
                    onChange={e => handleSubGroupChange(idx, "maxPerSec", e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: "16px", display: "flex", justifyContent: "flex-end", gap: "6px" }}>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="btn btn-primary" onClick={handleSave}>
            Save Rule Changes
          </button>
        </div>
      </div>
    </div>
  );
}
