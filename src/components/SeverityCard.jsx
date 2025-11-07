import React from "react";

export default function SummaryCards({ summary }) {
  if (!summary) return <div className="muted">No summary yet. Upload a file to generate one.</div>;
  const { errors = 0, warnings = 0, infos = 0, hasError = false } = summary;

  return (
    <div className="grid">
      <Card label="Errors" value={errors} tone={errors > 0 ? "danger" : "ok"} />
      <Card label="Warnings" value={warnings} tone={warnings > 0 ? "warn" : "ok"} />
      <Card label="Info" value={infos} tone="ok" />
      <Card label="Health" value={hasError ? "Issues Found" : "All Good"} tone={hasError ? "warn" : "ok"} />
    </div>
  );
}

function Card({ label, value, tone }) {
  return (
    <div className={`card ${tone}`}>
      <div className="card-label">{label}</div>
      <div className="card-value">{String(value)}</div>
    </div>
  );
}
