import React, { useState, useEffect } from "react";
import { useChoreStore } from "../Stores/useChoreStore";
import Card from "../Components/Card";
import Button from "../Components/Button";
import "../Styles/theme.css";

export default function Chores() {
  const {
    chores,
    loading,
    error,
    fetchChores,
    addChore,
    completeChore,
    deleteChore,
  } = useChoreStore();

  const [name, setName] = useState("");

  // Auto-fetch chores when component mounts
  useEffect(() => {
    fetchChores();
  }, [fetchChores]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    addChore({ title: name });
    setName("");
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Chores</h2>

      {/* Add chore form */}
      <Card className="card-form">
        <form className="form-row" onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="Chore name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
          <Button type="submit" className="btn-purple">
            Add
          </Button>
        </form>
      </Card>

      {/* Loading and error messages */}
      {loading && <p className="info-text">Loading chores...</p>}
      {error && <p className="error-text">{error}</p>}

      {/* Chores list */}
      <ul className="chore-list">
        {chores.length > 0 ? (
          chores.map((chore) => (
            <Card key={chore.id} className="chore-item">
              <span className={chore.completed ? "chore-completed" : ""}>
                {chore.title}
              </span>
              <div className="chore-actions">
                <Button
                  onClick={() => completeChore(chore.id)}
                  className={chore.completed ? "btn-green" : "btn-purple"}
                >
                  {chore.completed ? "Completed" : "Complete"}
                </Button>
                <Button
                  onClick={() => deleteChore(chore.id)}
                  className="btn-red"
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))
        ) : !loading ? (
          <p className="info-text">No chores yet</p>
        ) : null}
      </ul>
    </div>
  );
}