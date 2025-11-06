import React from "react";

export default function SeverityCard({ title, count = 0, type }) {
  const cls =
    type === "error"
      ? "card sev-error"
      : type === "warn"
      ? "card sev-warn"
      : "card sev-info";

  return (
    <div className={cls}>
      <h3>{title}</h3>
      <div className="count">{count}</div>
    </div>
  );
}
