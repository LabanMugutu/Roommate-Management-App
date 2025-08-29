import { useBills } from "../context/BillsProvider";

export default function BalanceSummary() {
  const { roommates, balances } = useBills();
  return (
    <div>
      <h2>Balances</h2>
      <ul>
        {roommates.map((r) => {
          const b = balances[r.id] ?? 0;
          const label = b > 0 ? `should receive` : b < 0 ? `owes` : `settled`;
          return (
            <li key={r.id}>
              {r.name}: {label} {b === 0 ? "" : Math.abs(b).toFixed(2)}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
