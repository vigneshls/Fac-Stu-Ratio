import React from "react";
import { calculateInstitutionMetrics } from "../data/staffingData";

export default function InstitutionCard({ inst, onUpdateCurrentFaculty, onOpenDetail }) {
  const metrics = calculateInstitutionMetrics(inst);
  const { totalStudents, calculatedRequiredFaculty, currentFaculty, vacancy } = metrics;
  const needsHiring = vacancy > 0;
  const filledPct = calculatedRequiredFaculty > 0 ? Math.min(100, Math.round((currentFaculty / calculatedRequiredFaculty) * 100)) : 100;

  return (
    <div className={`inst-card ${needsHiring ? "needs-staff" : "staffed"}`}>
      <div>
        <div className="card-header">
          <div>
            <div className="inst-name">{inst.name}</div>
            <div className="inst-type">{inst.type}</div>
          </div>
          <div>
            {needsHiring ? (
              <span className="status-badge badge-rose">+{vacancy} Needed</span>
            ) : (
              <span className="status-badge badge-emerald">Fully Staffed</span>
            )}
          </div>
        </div>

        {/* Staffing Progress Bar */}
        <div className="progress-box">
          <div className="progress-text">
            <span>Staffing Progress</span>
            <span className={needsHiring ? "text-rose" : "text-emerald"}>
              {currentFaculty} / {calculatedRequiredFaculty} ({filledPct}%)
            </span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${filledPct}%`,
                background: needsHiring ? "var(--rose-600)" : "var(--emerald-600)"
              }}
            ></div>
          </div>
        </div>

        {/* 3 Metrics Row */}
        <div className="metrics-row">
          <div>
            <div className="metric-head">Students</div>
            <div className="metric-num">{totalStudents.toLocaleString()}</div>
          </div>
          <div>
            <div className="metric-head">Required</div>
            <div className="metric-num text-indigo">{calculatedRequiredFaculty}</div>
          </div>
          <div>
            <div className="metric-head">Current Staff</div>
            <div className="stepper">
              <button
                type="button"
                className="step-btn"
                onClick={() => onUpdateCurrentFaculty(inst.id, Math.max(0, currentFaculty - 1))}
              >
                -
              </button>
              <span className="step-val">{currentFaculty}</span>
              <button
                type="button"
                className="step-btn"
                onClick={() => onUpdateCurrentFaculty(inst.id, currentFaculty + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card-footer">
        <span style={{ color: "var(--text-muted)" }}>
          Rule: {inst.ruleType === "per_section" ? `${inst.teachersPerSection || 1.5}/sec` : `1:${inst.targetRatio}`}
        </span>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => onOpenDetail(inst)}
        >
          Configure
        </button>
      </div>
    </div>
  );
}
