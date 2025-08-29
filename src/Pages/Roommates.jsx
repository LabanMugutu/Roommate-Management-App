// Pages/Roommates.js
import React, { useState } from "react";
import { useRoommateStore } from "../Stores/useRoommateStore";
import Card from "../Components/Card";
import Button from "../Components/Button";
import "../Styles/theme.css";

export default function Roommates() {
  const { roommates, loading, error, addRoommate, removeRoommate } =
    useRoommateStore();

  const [name, setName] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    addRoommate({ name });
    setName("");
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Roommates</h2>

      <Card className="card-form">
        <form className="form-row" onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="Roommate name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
          <Button type="submit" className="btn-purple">
            Add
          </Button>
        </form>
      </Card>

      {loading && <p className="info-text">Loading roommates...</p>}
      {error && <p className="error-text">{error}</p>}

      <ul className="roommate-list">
        {roommates.length > 0 ? (
          roommates.map((rm) => (
            <Card key={rm.id} className="roommate-item">
              <span>{rm.name}</span>
              <Button
                onClick={() => removeRoommate(rm.id)}
                className="btn-red"
              >
                Remove
              </Button>
            </Card>
          ))
        ) : !loading ? (
          <p className="info-text">No roommates yet</p>
        ) : null}
      </ul>
    </div>
  );
}