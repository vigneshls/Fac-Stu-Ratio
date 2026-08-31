import { useState } from "react";
import { INITIAL_INSTITUTIONS, CATEGORIES, calculateInstitutionMetrics } from "./data/staffingData";
import HeaderSummary from "./components/HeaderSummary";
import InstitutionCard from "./components/InstitutionCard";
import InstitutionDetailModal from "./components/InstitutionDetailModal";
import AnalyticsView from "./components/AnalyticsView";
import AddInstitutionModal from "./components/AddInstitutionModal";
import { SearchIcon, PlusIcon, RefreshIcon, DownloadIcon, ChartBarIcon, SchoolIcon, GraduationCapIcon } from "./components/Icons";
import "./App.css";

export default function App() {
  const [institutions, setInstitutions] = useState(INITIAL_INSTITUTIONS);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("cards"); // "cards" | "analytics"

  const [activeDetailInst, setActiveDetailInst] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Update current faculty on-roll for an institution
  const handleUpdateCurrentFaculty = (id, count) => {
    setInstitutions((prev) =>
      prev.map((inst) => (inst.id === id ? { ...inst, currentFaculty: count } : inst))
    );
  };

  // Save changes from detailed institution modal
  const handleSaveInstitutionDetail = (updatedInst) => {
    setInstitutions((prev) =>
      prev.map((inst) => (inst.id === updatedInst.id ? updatedInst : inst))
    );
    setActiveDetailInst(null);
  };

  // Add new institution
  const handleAddInstitution = (newInst) => {
    setInstitutions((prev) => [newInst, ...prev]);
    setShowAddModal(false);
  };

  // Reset data back to default initial values
  const handleResetData = () => {
    if (window.confirm("Are you sure you want to reset all institution counts to initial rules & values?")) {
      setInstitutions(INITIAL_INSTITUTIONS);
    }
  };

  // Export report to CSV
  const handleExportCSV = () => {
    const headers = [
      "Institution Name",
      "Short Name",
      "Category",
      "Type",
      "Location",
      "Enrolled Students",
      "Classroom Sections",
      "Staffing Rule",
      "Required Faculty Norm",
      "Current Faculty On-Roll",
      "New Appointments Needed",
      "Surplus Faculty",
      "Effective Student-Teacher Ratio",
      "Compliance Status"
    ];

    const rows = institutions.map((inst) => {
      const m = calculateInstitutionMetrics(inst);
      return [
        `"${inst.name}"`,
        `"${inst.shortName || ""}"`,
        `"${inst.category}"`,
        `"${inst.type}"`,
        `"${inst.location}"`,
        m.totalStudents,
        m.totalSections,
        `"${inst.ruleType === "per_section" ? `${inst.teachersPerSection || 1.5} per Section` : `Ratio 1:${inst.targetRatio}`}"`,
        m.calculatedRequiredFaculty,
        m.currentFaculty,
        m.vacancy,
        m.surplus,
        `"1:${m.effectiveRatio}"`,
        `"${m.status}"`
      ].join(",");
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Nadar_Saraswathi_Staffing_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtering
  const filteredInstitutions = institutions.filter((inst) => {
    const matchesCat = selectedCategory === "ALL" || inst.category === selectedCategory;
    const m = calculateInstitutionMetrics(inst);
    const matchesStatus =
      selectedStatus === "ALL" ||
      (selectedStatus === "DEFICIT" && m.vacancy > 0) ||
      (selectedStatus === "COMPLIANT" && m.vacancy === 0);

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      inst.name.toLowerCase().includes(q) ||
      inst.shortName.toLowerCase().includes(q) ||
      inst.location.toLowerCase().includes(q) ||
      inst.type.toLowerCase().includes(q);

    return matchesCat && matchesStatus && matchesSearch;
  });

  // Calculate Overall Trust Summary
  const overallSummary = (() => {
    let totalStudents = 0;
    let totalRequiredFaculty = 0;
    let totalCurrentFaculty = 0;
    let totalVacancies = 0;
    let totalSurplus = 0;
    let deficitCount = 0;

    institutions.forEach((inst) => {
      const m = calculateInstitutionMetrics(inst);
      totalStudents += m.totalStudents;
      totalRequiredFaculty += m.calculatedRequiredFaculty;
      totalCurrentFaculty += m.currentFaculty;
      totalVacancies += m.vacancy;
      totalSurplus += m.surplus;
      if (m.vacancy > 0) deficitCount++;
    });

    const overallRatio = totalStudents > 0 && totalCurrentFaculty > 0 ? (totalStudents / totalCurrentFaculty).toFixed(1) : "N/A";

    return {
      totalInstitutions: institutions.length,
      totalStudents,
      totalRequiredFaculty,
      totalCurrentFaculty,
      totalVacancies,
      totalSurplus,
      overallRatio,
      deficitCount
    };
  })();

  return (
    <div className="app-container">
      {/* Top Brand Header */}
      <header className="brand-header">
        <div className="brand-title-group">
          <div className="brand-logo shadow-glow">
            <GraduationCapIcon className="icon-xl text-indigo-400" />
          </div>
          <div>
            <span className="brand-subtitle">THENI MELAPETTAI HINDU NADARGAL URAVINMURAI (T.M.H.N.U.)</span>
            <h1 className="brand-title">Nadar Saraswathi Educational Institutions</h1>
            <p className="brand-tagline">Faculty & Student Staffing Calculator • Recruitment Requirement Planner</p>
          </div>
        </div>

        <div className="top-actions">
          <button type="button" className="btn-secondary" onClick={handleResetData} title="Reset to initial rules">
            <RefreshIcon className="icon-sm" /> Reset Defaults
          </button>
          <button type="button" className="btn-secondary" onClick={handleExportCSV} title="Export CSV Report">
            <DownloadIcon className="icon-sm" /> Export CSV
          </button>
          <button type="button" className="btn-primary" onClick={() => setShowAddModal(true)}>
            <PlusIcon className="icon-sm" /> Add Institution
          </button>
        </div>
      </header>

      {/* Executive Summary Cards */}
      <HeaderSummary summary={overallSummary} />

      {/* Navigation Tabs & Controls Bar */}
      <div className="controls-bar glass-card">
        <div className="tab-switcher">
          <button
            type="button"
            className={`tab-btn ${activeTab === "cards" ? "active" : ""}`}
            onClick={() => setActiveTab("cards")}
          >
            <SchoolIcon className="icon-sm" /> Campus Staffing Cards ({filteredInstitutions.length})
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === "analytics" ? "active" : ""}`}
            onClick={() => setActiveTab("analytics")}
          >
            <ChartBarIcon className="icon-sm" /> Visual Analytics & Priority Roadmap
          </button>
        </div>

        <div className="filters-group">
          {/* Search Box */}
          <div className="search-box">
            <SearchIcon className="search-icon" />
            <input
              type="text"
              placeholder="Search school or college..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Category Filter */}
          <select
            className="filter-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="ALL">All Categories</option>
            {Object.values(CATEGORIES).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            className="filter-select"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="ALL">All Statuses</option>
            <option value="DEFICIT">Recruitment Needed (Deficit)</option>
            <option value="COMPLIANT">Fully Staffed</option>
          </select>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab === "cards" ? (
          <>
            {filteredInstitutions.length === 0 ? (
              <div className="empty-state glass-card">
                <p className="empty-text">No institutions found matching your filter criteria.</p>
                <button
                  type="button"
                  className="btn-secondary margin-top-md"
                  onClick={() => {
                    setSelectedCategory("ALL");
                    setSelectedStatus("ALL");
                    setSearchQuery("");
                  }}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="cards-grid">
                {filteredInstitutions.map((inst) => (
                  <InstitutionCard
                    key={inst.id}
                    inst={inst}
                    onUpdateCurrentFaculty={handleUpdateCurrentFaculty}
                    onOpenDetail={(targetInst) => setActiveDetailInst(targetInst)}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <AnalyticsView institutions={institutions} />
        )}
      </main>

      {/* Modal Dialogs */}
      {activeDetailInst && (
        <InstitutionDetailModal
          inst={activeDetailInst}
          onClose={() => setActiveDetailInst(null)}
          onSave={handleSaveInstitutionDetail}
        />
      )}

      {showAddModal && (
        <AddInstitutionModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddInstitution}
        />
      )}

      {/* Footer */}
      <footer className="app-footer">
        <p>© Nadar Saraswathi Educational Institutions • Staffing & Recruitment Analysis Engine</p>
      </footer>
    </div>
  );
}
