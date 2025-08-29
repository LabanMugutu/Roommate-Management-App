// src/App.jsx
import { BillsProvider } from "./context/BillsProvider";
import AddExpenseForm from "./components/AddExpenseForm";
import BalanceSummary from "./components/BalanceSummary";
import ExpenseList from "./components/ExpenseList";

export default function App() {
  return (
    <BillsProvider>
      <h1>Roommate Expense Tracker</h1>
      <AddExpenseForm />
      <BalanceSummary />
      <ExpenseList />
    </BillsProvider>
  );
}
