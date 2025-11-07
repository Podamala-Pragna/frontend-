import React from "react";

function SeverityBadge({ level = "INFO" }) {
  const sev = String(level || "INFO").toUpperCase();
  return <span className={`sev sev-${sev}`}>{sev}</span>;
}

export default function LogTable({ rows = [] }) {
  if (!rows.length) return <div className="muted">No log lines to display.</div>;

  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th style={{width: "220px"}}>Timestamp</th>
            <th style={{width: "120px"}}>Severity</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={`row-${(r.severity || "INFO").toLowerCase()}`}>
              <td>{r.timestamp || "—"}</td>
              <td><SeverityBadge level={r.severity} /></td>
              <td className="mono">{r.message || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
