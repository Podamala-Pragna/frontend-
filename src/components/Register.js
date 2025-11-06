import { useState } from "react";
import api from "../api";
import "../App.css";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");

    // simple validations
    if (!form.username || !form.email || !form.password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      // Register API call (no eslint warning)
      await api.post("register/", {
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      setMsg("✅ Registration successful! Redirecting to login…");
      setTimeout(() => (window.location.href = "/login"), 1500);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="auth-page register-page">
      <div className="auth-box">
        <h2>Automated Log File Analyzer</h2>
        <h3>Register</h3>

        {/* Show messages */}
        {error && <p className="error">{error}</p>}
        {msg && <p className="success">{msg}</p>}

        {/* Registration form */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password (Aa1@...)"
            value={form.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>

        <p className="switch">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
