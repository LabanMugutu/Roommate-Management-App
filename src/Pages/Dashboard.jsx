import React from "react";
import Card from "../Components/Card";
import "../Styles/theme.css";

// Zustand stores
import { useRoommateStore } from "../Stores/useRoommateStore";
import { useChoreStore } from "../Stores/useChoreStore";

export default function Dashboard() {
  // Fetch state slices from stores
  const roommates = useRoommateStore((s) => s.roommates) || [];
  const chores = useChoreStore((s) => s.chores) || [];

  // Calculate summary
  const totalChores = chores.length;
  const completedChores = chores.filter((c) => c.completed).length;

  return (
    <div className="page-container">
      <h2 className="page-title">Dashboard</h2>

      <div className="dashboard-grid">
        {/* Roommates */}
        <Card className="dashboard-card">
          <h3>Roommates</h3>
          <p>Total: {roommates.length}</p>
        </Card>

        {/* Chores */}
        <Card className="dashboard-card">
          <h3>Chores</h3>
          <p>Total: {totalChores}</p>
          <p>Completed: {completedChores}</p>
        </Card>
      </div>
    </div>
  );
}