import React, { useState } from "react";
import axios from "axios";
import "../App.css";// make a dedicated CSS file

const FileUpload = ({ onUploaded }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const token = localStorage.getItem("access");
  const API_URL = "http://127.0.0.1:8000/api";

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first");
      setError(true);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(`${API_URL}/upload/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("Upload successful!");
      setError(false);
      if (onUploaded) onUploaded();
    } catch (err) {
      setMessage(err.response?.data?.error || "Upload failed");
      setError(true);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box upload-box">
        <h2>Automated Log File Analyzer</h2>
        <input
          type="file"
          accept=".txt,.csv"
          onChange={e => setFile(e.target.files[0])}
        />
        <button onClick={handleUpload}>Upload & analyze</button>

        {message && (
          <div className={error ? "error" : "success"}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
