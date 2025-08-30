import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../Stores/useAuthStore";
import "../Styles/theme.css";

export default function Navbar() {
  const roommate = useAuthStore((s) => s.roommate); // ✅ updated
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const isLoggedIn = !!roommate;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="app-title">Roommate Management App</h1>
      </div>
      <div className="navbar-right">
        {isLoggedIn ? (
          <>
            {roommate.avatar && (
              <img src={roommate.avatar} alt={roommate.name} className="navbar-avatar" />
            )}
            <span className="navbar-user">Welcome, {roommate.name}</span>
            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <span className="navbar-user">Not logged in</span>
        )}
      </div>
    </nav>
  );
}