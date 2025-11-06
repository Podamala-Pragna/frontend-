import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard"; // your dashboard with date/time + cards
import "./App.css";

export default function App() {
  // Demo data for now; will later come from API
  const demoSummary = { error: 4, warn: 7, info: 15 };

  return (
    <Router>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Your dashboard (your part) */}
        <Route path="/dashboard" element={<Dashboard summary={demoSummary} />} />
      </Routes>
    </Router>
  );
}
