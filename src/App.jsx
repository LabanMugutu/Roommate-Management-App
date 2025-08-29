// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./Stores/useAuthStore";

// Components
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";

// Pages
import Dashboard from "./Pages/Dashboard";
import Chores from "./Pages/Chores";
import GroceryPage from "./Pages/GroceryPage";
import Login from "./Pages/Login";

export default function App() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated && <Navbar />}
        <div className="app-body">
          {isAuthenticated && <Sidebar />}
          <div className="main-content">
            <Routes>
              {/* Public */}
              <Route path="/login" element={<Login />} />

              {/* Protected */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/chores"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Chores />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/grocery"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <GroceryPage />
                  </ProtectedRoute>
                }
              />

              {/* Root */}
              <Route
                path="/"
                element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
              />

              {/* Catch-all */}
              <Route
                path="*"
                element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}