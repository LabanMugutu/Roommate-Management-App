
import { createContext, useContext, useMemo, useReducer } from "react";

const BillsContext = createContext();

const initialState = {
  roommates: [
    { id: "r1", name: "Alice" },
    { id: "r2", name: "Bob" },
    { id: "r3", name: "Charlie" },
  ],
  expenses: [], 
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_EXPENSE": {
      return { ...state, expenses: [action.payload, ...state.expenses] };
    }
    case "REMOVE_EXPENSE": {
      return {
        ...state,
        expenses: state.expenses.filter((e) => e.id !== action.payload),
      };
    }
    default:
      return state;
  }
}

function computeBalances(roommates, expenses) {
  const balances = Object.fromEntries(roommates.map(r => [r.id, 0]));
  const n = roommates.length || 1;

  for (const exp of expenses) {
    const share = exp.amount / n;
    for (const r of roommates) {
      if (r.id === exp.paidBy) {
        balances[r.id] += exp.amount - share;
      } else {
        balances[r.id] -= share;
      }
    }
  }
  return balances;
}

export function BillsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addExpense = (expense) =>
    dispatch({ type: "ADD_EXPENSE", payload: expense });

  const removeExpense = (id) =>
    dispatch({ type: "REMOVE_EXPENSE", payload: id });

  const balances = useMemo(
    () => computeBalances(state.roommates, state.expenses),
    [state.roommates, state.expenses]
  );

  const value = {
    roommates: state.roommates,
    expenses: state.expenses,
    addExpense,
    removeExpense,
    balances,
  };

  return <BillsContext.Provider value={value}>{children}</BillsContext.Provider>;
}

export function useBills() {
  const ctx = useContext(BillsContext);
  if (!ctx) throw new Error("useBills must be used within BillsProvider");
  return ctx;
}
