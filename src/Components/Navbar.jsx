import React from "react";
import { useAuthStore } from "../Stores/useAuthStore";
import "../Styles/theme.css";

export default function Navbar() {
  // Get user and logout function directly from store
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const isLoggedIn = !!user;

  return (
    <nav className="navbar">
      {/* Left: App name / logo */}
      <div className="navbar-left">
        <h1 className="app-title">My Home App</h1>
      </div>

      {/* Right: User info & actions */}
      <div className="navbar-right">
        {isLoggedIn ? (
          <>
            {user.avatar && (
              <img
                src={user.avatar}
                alt={user.name}
                className="navbar-avatar"
              />
            )}
            <span className="navbar-user">Welcome, {user.name}</span>
            <button className="btn-logout" onClick={logout}>
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