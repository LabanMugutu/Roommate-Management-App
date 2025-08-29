// src/Components/GroceryList.jsx
import React, { useState } from "react";
import { useGroceryStore } from "../Stores/useGroceryStore";
import Button from "./Button";
import Card from "./Card";

export default function GroceryList() {
  const groceries = useGroceryStore((s) => s.groceries);
  const addGrocery = useGroceryStore((s) => s.addGrocery);
  const removeGrocery = useGroceryStore((s) => s.removeGrocery);

  const [item, setItem] = useState("");

  const handleAdd = () => {
    if (!item.trim()) return;
    addGrocery({ id: Date.now(), name: item });
    setItem("");
  };

  return (
    <div className="page-container">
      <h2 className="section-title">Grocery List</h2>

      {/* Add item input */}
      <Card className="card-form">
        <div className="form-row">
          <input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="Add a new grocery item"
            className="input-field"
          />
          <Button onClick={handleAdd}>Add</Button>
        </div>
      </Card>

      {/* List of groceries */}
      <div className="list-container">
        {groceries.length === 0 && <p className="empty-state">No groceries added yet.</p>}
        {groceries.map((g) => (
          <Card key={g.id} className="list-item">
            <span>{g.name}</span>
            <Button className="button-danger" onClick={() => removeGrocery(g.id)}>
              Remove
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
