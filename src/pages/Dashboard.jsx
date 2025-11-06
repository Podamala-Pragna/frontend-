import React from "react";
import DateTime from "../components/DateTime";
import SeverityCard from "../components/SeverityCard";

/**
 * Your part only: layout + date/time + severity colors.
 * This component accepts optional props to show real counts.
 * Example:
 * <Dashboard summary={{ error: 3, warn: 5, info: 12 }} />
 */
export default function Dashboard({ summary }) {
  const data = {
    error: summary?.error ?? 0,
    warn: summary?.warn ?? 0,
    info: summary?.info ?? 0,
  };

  return (
    <div className="shell">
      <header className="dash-top">
        <h1>Automated Log Analyzer</h1>
        <DateTime />
      </header>

      <section className="grid3">
        <SeverityCard title="ERROR" count={data.error} type="error" />
        <SeverityCard title="WARN" count={data.warn} type="warn" />
        <SeverityCard title="INFO" count={data.info} type="info" />
      </section>

      {/* (Optional) simple table shape to satisfy “cards/table” */}
      <section className="panel">
        <div className="table">
          <div className="row head">
            <div>Severity</div><div>Count</div>
          </div>
          <div className="row">
            <div>ERROR</div><div>{data.error}</div>
          </div>
          <div className="row">
            <div>WARN</div><div>{data.warn}</div>
          </div>
          <div className="row">
            <div>INFO</div><div>{data.info}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
