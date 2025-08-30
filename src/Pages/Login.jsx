// Pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../Stores/useAuthStore";
import { useRoommateStore } from "../Stores/useRoommateStore";
import { useGroceryStore } from "../Stores/useGroceryStore";
import { useChoreStore } from "../Stores/useChoreStore";
import "../Styles/theme.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const login = useAuthStore((s) => s.login);
  const loading = useAuthStore((s) => s.loading);
  const error = useAuthStore((s) => s.error);
  const navigate = useNavigate();

  // Stores for fetching data after login
  const fetchRoommates = useRoommateStore((s) => s.fetchRoommates);
  const fetchGroceries = useGroceryStore((s) => s.fetchGroceries);
  const fetchChores = useChoreStore((s) => s.fetchChores);

  const handleSubmit = async (e) => {
  e.preventDefault(); // ✅ prevents the form from reloading the page
  try {
    await login(email); // login from useAuthStore
    setEmail("");       // clear input after login
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