const BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000";

export async function uploadLog(file) {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${BASE_URL}/upload`, { method: "POST", body: form });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function fetchSummary() {
  const res = await fetch(`${BASE_URL}/summary`);
  if (!res.ok) throw new Error(await res.text());
  return res.json(); // { errors, warnings, infos, hasError }
}

export async function fetchRecentLogs() {
  const res = await fetch(`${BASE_URL}/logs`);
  if (!res.ok) throw new Error(await res.text());
  return res.json(); // [{ timestamp, severity, message }]
}
