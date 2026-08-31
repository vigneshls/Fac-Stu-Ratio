import React from "react";
import { UsersIcon, UserCheckIcon, UserPlusIcon, AlertTriangleIcon, GraduationCapIcon } from "./Icons";

export default function HeaderSummary({ summary }) {
  const {
    totalInstitutions,
    totalStudents,
    totalRequiredFaculty,
    totalCurrentFaculty,
    totalVacancies,
    totalSurplus,
    overallRatio,
    deficitCount
  } = summary;

  return (
    <div className="header-summary-grid">
      <div className="summary-card glass-card accent-blue">
        <div className="summary-card-header">
          <span className="card-label">Total Institutions</span>
          <div className="icon-wrapper blue">
            <GraduationCapIcon className="icon" />
          </div>
        </div>
        <div className="summary-card-body">
          <div className="big-number">{totalInstitutions}</div>
          <p className="card-subtext">Schools & Colleges</p>
        </div>
      </div>

      <div className="summary-card glass-card accent-purple">
        <div className="summary-card-header">
          <span className="card-label">Total Students Enrolled</span>
          <div className="icon-wrapper purple">
            <UsersIcon className="icon" />
          </div>
        </div>
        <div className="summary-card-body">
          <div className="big-number">{totalStudents.toLocaleString()}</div>
          <p className="card-subtext">Across all campuses</p>
        </div>
      </div>

      <div className="summary-card glass-card accent-cyan">
        <div className="summary-card-header">
          <span className="card-label">Required Faculty Norm</span>
          <div className="icon-wrapper cyan">
            <UserCheckIcon className="icon" />
          </div>
        </div>
        <div className="summary-card-body">
          <div className="big-number">{totalRequiredFaculty}</div>
          <p className="card-subtext">Based on section & ratio rules</p>
        </div>
      </div>

      <div className="summary-card glass-card accent-emerald">
        <div className="summary-card-header">
          <span className="card-label">Current Faculty On-Roll</span>
          <div className="icon-wrapper emerald">
            <UserCheckIcon className="icon" />
          </div>
        </div>
        <div className="summary-card-body">
          <div className="big-number">{totalCurrentFaculty}</div>
          <p className="card-subtext">Effective Ratio: <strong>1:{overallRatio}</strong></p>
        </div>
      </div>

      <div className={`summary-card glass-card ${totalVacancies > 0 ? "accent-rose alert-pulse" : "accent-amber"}`}>
        <div className="summary-card-header">
          <span className="card-label">New Appointments Needed</span>
          <div className="icon-wrapper rose">
            <UserPlusIcon className="icon" />
          </div>
        </div>
        <div className="summary-card-body">
          <div className="big-number rose-text">
            {totalVacancies > 0 ? `+${totalVacancies}` : "0"}
          </div>
          <p className="card-subtext">
            {deficitCount > 0 ? (
              <span className="warning-badge-text">
                <AlertTriangleIcon className="inline-icon" /> {deficitCount} institution{deficitCount > 1 ? "s" : ""} in deficit
              </span>
            ) : (
              "All institutions fully staffed"
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
