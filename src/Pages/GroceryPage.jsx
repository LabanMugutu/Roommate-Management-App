// Pages/GroceryPage.jsx
import React, { useState } from "react";
import { useGroceryStore } from "../Stores/useGroceryStore";
import Card from "../Components/Card";
import Button from "../Components/Button";
import "../Styles/theme.css";

export default function GroceryPage() {
  const { groceries, loading, error, addGrocery, toggleGrocery, deleteGrocery } =
    useGroceryStore();

  const [item, setItem] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!item.trim()) return;
    addGrocery({ name: item });
    setItem("");
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Groceries</h2>

      <Card className="card-form">
        <form className="form-row" onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="Grocery item"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className="input"
          />
          <Button type="submit" className="btn-purple">
            Add
          </Button>
        </form>
      </Card>

      {loading && <p className="info-text">Loading groceries...</p>}
      {error && <p className="error-text">{error}</p>}

      <ul className="grocery-list">
        {groceries.length > 0 ? (
          groceries.map((g) => (
            <Card key={g.id} className="grocery-item">
              <span className={g.purchased ? "grocery-purchased" : ""}>
                {g.name}
              </span>
              <div className="grocery-actions">
                <Button
                  onClick={() => toggleGrocery(g.id)}
                  className={g.purchased ? "btn-green" : "btn-purple"}
                >
                  {g.purchased ? "Purchased" : "Mark as Bought"}
                </Button>
                <Button
                  onClick={() => deleteGrocery(g.id)}
                  className="btn-red"
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))
        ) : !loading ? (
          <p className="info-text">No groceries yet</p>
        ) : null}
      </ul>
    </div>
  );
}