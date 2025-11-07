import React, { useEffect, useState } from "react";
import FileUpload from "../components/FileUpload";
import SummaryCards from "../components/SeverityCard";
import DateTimeTicker from "../components/DateTimeTicker";
import LogTable from "../components/LogTable";
import { fetchSummary, fetchRecentLogs } from "../api";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [rows, setRows] = useState([]);

  const loadSummary = async () => {
    try {
      setLoading(true);
      const data = await fetchSummary();
      setSummary(data);
    } catch (e) {
      setMsg(e.message || "Failed to fetch summary");
    } finally {
      setLoading(false);
    }
  };

  const loadRecent = async () => {
    try {
      const data = await fetchRecentLogs();
      setRows(data);
    } catch {
      // fallback demo rows if /logs not implemented yet
      setRows([
        {
          timestamp: new Date().toISOString(),
          severity: "INFO",
          message: "Analyzer started",
        },
        {
          timestamp: new Date().toISOString(),
          severity: "WARN",
          message: "High memory usage detected (82%)",
        },
        {
          timestamp: new Date().toISOString(),
          severity: "ERROR",
          message: "Disk I/O timeout on /dev/sda1",
        },
      ]);
    }
  };

  useEffect(() => {
    loadSummary();
    loadRecent();
  }, []);

  return (
    <div className="page">
      <header className="header header-row">
        <div>
          <h1>Automated Log Analyzer</h1>
          <p className="sub">Upload a log and view quick insights</p>
        </div>
        <DateTimeTicker />
      </header>

      <section className="panel">
        <FileUpload
          onUploaded={() => {
            setMsg("Upload successful ✅");
            loadSummary();
            loadRecent();
          }}
          onError={setMsg}
        />
      </section>

      <section className="panel">
        <div className="panel-head">
          <h2>Summary</h2>
          <button className="btn" onClick={loadSummary} disabled={loading}>
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
        {msg && <div className="note">{msg}</div>}
        <SummaryCards summary={summary} />
      </section>

      <section className="panel">
        <div className="panel-head">
          <h2>Recent Log Entries</h2>
        </div>
        <LogTable rows={rows} />
      </section>
    </div>
  );
}
