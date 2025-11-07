import React, { useRef, useState } from "react";
import { uploadLog } from "../api";

export default function FileUpload({ onUploaded, onError }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [fileName, setFileName] = useState("");

  const onSelect = (e) => {
    const f = e.target.files?.[0];
    setFileName(f ? f.name : "");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const file = inputRef.current?.files?.[0];
    if (!file) {
      onError?.("Please choose a file first.");
      return;
    }
    if (!/\.(txt|csv)$/i.test(file.name)) {
      onError?.("Only .txt or .csv allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      onError?.("Max 5MB allowed.");
      return;
    }

    try {
      setBusy(true);
      await uploadLog(file);
      onUploaded?.();
      // reset input
      if (inputRef.current) inputRef.current.value = "";
      setFileName("");
    } catch (err) {
      onError?.(err?.message || "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="uploader" onSubmit={onSubmit}>
      <label className="drop">
        <span className="title">Upload Log File</span>
        <span className="hint">Accepted: .txt or .csv (≤5MB)</span>

        <input ref={inputRef} type="file" onChange={onSelect} hidden />

        <div className="actions">
          <button
            type="button"
            className="btn ghost"
            onClick={() => inputRef.current?.click()}
          >
            {fileName || "Choose file"}
          </button>

          <button type="submit" className="btn" disabled={busy}>
            {busy ? "Uploading..." : "Upload"}
          </button>
        </div>
      </label>
    </form>
  );
}
