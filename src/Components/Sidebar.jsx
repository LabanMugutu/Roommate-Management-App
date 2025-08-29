// src/Components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import "../styles/theme.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <ul className="sidebar-menu">
        {/* Dashboard */}
        <li className="sidebar-item">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Dashboard
          </NavLink>
        </li>

        {/* Chores */}
        <li className="sidebar-item">
          <NavLink
            to="/chores"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Chores
          </NavLink>
        </li>

        {/* Expenses */}
        <li className="sidebar-item">
          <NavLink
            to="/expenses"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Expenses
          </NavLink>
        </li>

        {/* Grocery */}
        <li className="sidebar-item">
          <NavLink
            to="/grocery"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Grocery
          </NavLink>
        </li>

        {/* Calendar */}
        <li className="sidebar-item">
          <NavLink
            to="/calendar"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Calendar
          </NavLink>
        </li>

        {/* Notifications */}
        <li className="sidebar-item">
          <NavLink
            to="/notifications"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Notifications
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}
