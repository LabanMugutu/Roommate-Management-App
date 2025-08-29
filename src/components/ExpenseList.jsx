import { useBills } from "../context/BillsProvider";

function ExpenseItem({ e, onRemove, payerName }) {
  return (
    <li>
      <strong>{e.title}</strong> — {e.amount.toFixed(2)} paid by {payerName} on {e.date}
      <button onClick={() => onRemove(e.id)}>Delete</button>
    </li>
  );
}

export default function ExpenseList() {
  const { expenses, roommates, removeExpense } = useBills();
  const nameOf = (id) => roommates.find((r) => r.id === id)?.name ?? "Unknown";

  if (expenses.length === 0) return <p>No expenses yet.</p>;

  return (
    <ul>
      {expenses.map((e) => (
        <ExpenseItem
          key={e.id}
          e={e}
          payerName={nameOf(e.paidBy)}
          onRemove={removeExpense}
        />
      ))}
    </ul>
  );
}
