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

        {/* Grocery */}
        <li className="sidebar-item">
          <NavLink
            to="/grocery"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Grocery
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}