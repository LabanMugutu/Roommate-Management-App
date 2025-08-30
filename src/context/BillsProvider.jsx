import { createContext, useContext, useState, useEffect } from "react";

const BillsContext = createContext();

export function BillsProvider({ children }) {
  const [roommates, setRoommates] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // Load data from json-server
  useEffect(() => {
    fetch("http://localhost:5000/roommates")
      .then((res) => res.json())
      .then(setRoommates);

    fetch("http://localhost:5000/expenses")
      .then((res) => res.json())
      .then(setExpenses);
  }, []);

  // Add new expense
  function addExpense(expense) {
    fetch("http://localhost:5000/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense),
    })
      .then((res) => res.json())
      .then((newExp) => setExpenses((prev) => [...prev, newExp]));
  }

  // Remove expense
  function removeExpense(id) {
    fetch(`http://localhost:5000/expenses/${id}`, { method: "DELETE" }).then(() =>
      setExpenses((prev) => prev.filter((e) => e.id !== id))
    );
  }

  // Calculate balances
  const balances = {};
  roommates.forEach((r) => (balances[r.id] = 0));
  if (roommates.length > 0) {
    expenses.forEach((e) => {
      const split = e.amount / roommates.length;
      roommates.forEach((r) => {
        if (r.id === e.paidBy) {
          balances[r.id] += e.amount - split;
        } else {
          balances[r.id] -= split;
        }
      });
    });
  }

  return (
    <BillsContext.Provider
      value={{ roommates, expenses, addExpense, removeExpense, balances }}
    >
      {children}
    </BillsContext.Provider>
  );
}

export function useBills() {
  return useContext(BillsContext);
}
