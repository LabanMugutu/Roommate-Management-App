import React, { useState } from "react";
import { useAuthStore } from "../Stores/useAuthStore";
import "../Styles/theme.css";

export default function Login() {
  const [email, setEmail] = useState("");

  // Read login function, loading, and error directly from the store
  const login = useAuthStore((s) => s.login);
  const loading = useAuthStore((s) => s.loading);
  const error = useAuthStore((s) => s.error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email); // store handles setting user & error
      setEmail("");       // optional: clear input on success
    } catch (err) {
      console.error("Login failed:", err.message);
    }
  };

  return (
    <div className="page-container">
      <div className="card login-card">
        <h2 className="card-title">Login</h2>
        <form onSubmit={handleSubmit} className="form login-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />
          <button type="submit" className="button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && <p className="error-text">{error}</p>}
      </div>
    </div>
  );
}