import React from "react";
import { calculateInstitutionMetrics, CATEGORIES } from "../data/staffingData";
import { ChartBarIcon, AlertTriangleIcon, CheckCircleIcon, UserPlusIcon } from "./Icons";

export default function AnalyticsView({ institutions }) {
  const categoriesList = Object.values(CATEGORIES);

  const instMetricsList = institutions.map((inst) => ({
    inst,
    metrics: calculateInstitutionMetrics(inst)
  }));

  // Sort by highest vacancy (recruitment urgency)
  const sortedByUrgency = [...instMetricsList].sort((a, b) => b.metrics.vacancy - a.metrics.vacancy);

  // Category breakdown calculation
  const categorySummary = categoriesList.map((cat) => {
    const catInsts = instMetricsList.filter((item) => item.inst.category === cat);
    const totalStudents = catInsts.reduce((acc, i) => acc + i.metrics.totalStudents, 0);
    const totalRequired = catInsts.reduce((acc, i) => acc + i.metrics.calculatedRequiredFaculty, 0);
    const totalCurrent = catInsts.reduce((acc, i) => acc + i.metrics.currentFaculty, 0);
    const totalVacancy = catInsts.reduce((acc, i) => acc + i.metrics.vacancy, 0);
    const totalSurplus = catInsts.reduce((acc, i) => acc + i.metrics.surplus, 0);
    return {
      category: cat,
      count: catInsts.length,
      totalStudents,
      totalRequired,
      totalCurrent,
      totalVacancy,
      totalSurplus
    };
  });

  // Calculate max required faculty for chart scaling
  const maxFacultyVal = Math.max(...instMetricsList.map((i) => Math.max(i.metrics.calculatedRequiredFaculty, i.metrics.currentFaculty)), 100);

  return (
    <div className="analytics-container">
      {/* Category Overview Cards */}
      <div className="analytics-grid-3">
        {categorySummary.map((catItem) => (
          <div key={catItem.category} className="analytics-card glass-card">
            <h4 className="analytics-cat-title">{catItem.category}</h4>
            <div className="analytics-cat-meta">{catItem.count} Institutions</div>

            <div className="analytics-stat-row">
              <span className="stat-name">Students</span>
              <span className="stat-val font-mono">{catItem.totalStudents.toLocaleString()}</span>
            </div>
            <div className="analytics-stat-row">
              <span className="stat-name">Required Faculty</span>
              <span className="stat-val text-cyan font-mono">{catItem.totalRequired}</span>
            </div>
            <div className="analytics-stat-row">
              <span className="stat-name">Current Faculty</span>
              <span className="stat-val text-emerald font-mono">{catItem.totalCurrent}</span>
            </div>
            <div className="analytics-stat-row highlight">
              <span className="stat-name">Recruitment Deficit</span>
              <span className={`stat-val font-mono ${catItem.totalVacancy > 0 ? "text-rose font-bold" : "text-emerald"}`}>
                {catItem.totalVacancy > 0 ? `+${catItem.totalVacancy} Posts` : "Fully Staffed"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Faculty Comparison Chart */}
      <div className="analytics-card glass-card chart-section">
        <div className="chart-header">
          <div>
            <h3 className="section-heading flex items-center gap-2">
              <ChartBarIcon className="icon text-indigo-400" /> Faculty Requirement vs Current On-Roll
            </h3>
            <p className="section-subtext">Comparative bar chart across all trust institutions</p>
          </div>
          <div className="chart-legend">
            <span className="legend-item"><span className="legend-box bg-cyan"></span> Required Norm</span>
            <span className="legend-item"><span className="legend-box bg-emerald"></span> Current On-Roll</span>
            <span className="legend-item"><span className="legend-box bg-rose"></span> Vacancy / Deficit</span>
          </div>
        </div>

        <div className="chart-bars-wrapper">
          {instMetricsList.map(({ inst, metrics }) => {
            const requiredPct = Math.min(100, (metrics.calculatedRequiredFaculty / maxFacultyVal) * 100);
            const currentPct = Math.min(100, (metrics.currentFaculty / maxFacultyVal) * 100);

            return (
              <div key={inst.id} className="chart-row">
                <div className="chart-label-col">
                  <span className="chart-inst-name" title={inst.name}>{inst.shortName || inst.name}</span>
                  <span className="chart-inst-sub">{inst.type}</span>
                </div>
                <div className="chart-bars-col">
                  {/* Required Bar */}
                  <div className="bar-group">
                    <div className="bar-bg">
                      <div
                        className="bar-fill bg-cyan"
                        style={{ width: `${requiredPct}%` }}
                        title={`Required: ${metrics.calculatedRequiredFaculty}`}
                      ></div>
                    </div>
                    <span className="bar-num text-cyan">{metrics.calculatedRequiredFaculty}</span>
                  </div>

                  {/* Current Bar */}
                  <div className="bar-group">
                    <div className="bar-bg">
                      <div
                        className={`bar-fill ${metrics.vacancy > 0 ? "bg-amber" : "bg-emerald"}`}
                        style={{ width: `${currentPct}%` }}
                        title={`Current: ${metrics.currentFaculty}`}
                      ></div>
                    </div>
                    <span className="bar-num text-emerald">{metrics.currentFaculty}</span>
                  </div>
                </div>

                <div className="chart-result-col">
                  {metrics.vacancy > 0 ? (
                    <span className="badge badge-deficit">+{metrics.vacancy} Needed</span>
                  ) : (
                    <span className="badge badge-compliant">Fully Staffed</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recruitment Priority Table */}
      <div className="analytics-card glass-card">
        <h3 className="section-heading flex items-center gap-2">
          <UserPlusIcon className="icon text-rose" /> Priority Recruitment & Appointment Roadmap
        </h3>
        <p className="section-subtext">Ranked list of institutions requiring immediate faculty hiring</p>

        <div className="breakdown-table-wrapper margin-top-md">
          <table className="breakdown-table">
            <thead>
              <tr>
                <th>Priority</th>
                <th>Institution</th>
                <th>Category</th>
                <th>Enrolled Students</th>
                <th>Required Faculty</th>
                <th>Current Faculty</th>
                <th>Appointments Needed</th>
                <th>Staffing Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedByUrgency.map(({ inst, metrics }, idx) => (
                <tr key={inst.id} className={metrics.vacancy > 0 ? "highlight-row" : ""}>
                  <td className="font-mono text-center font-bold">#{idx + 1}</td>
                  <td>
                    <span className="font-semibold text-white">{inst.name}</span>
                    <div className="text-xs text-slate-400">{inst.location}</div>
                  </td>
                  <td className="text-xs text-slate-300">{inst.category}</td>
                  <td className="font-mono">{metrics.totalStudents.toLocaleString()}</td>
                  <td className="font-mono text-cyan font-bold">{metrics.calculatedRequiredFaculty}</td>
                  <td className="font-mono text-emerald">{metrics.currentFaculty}</td>
                  <td className="font-mono">
                    {metrics.vacancy > 0 ? (
                      <span className="text-rose font-bold">+{metrics.vacancy}</span>
                    ) : (
                      <span className="text-slate-400">0</span>
                    )}
                  </td>
                  <td>
                    {metrics.vacancy > 0 ? (
                      <span className="badge badge-deficit">
                        <AlertTriangleIcon className="icon-sm" /> Action Needed
                      </span>
                    ) : (
                      <span className="badge badge-compliant">
                        <CheckCircleIcon className="icon-sm" /> Compliant
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
