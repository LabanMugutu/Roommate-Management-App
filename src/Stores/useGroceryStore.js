// Stores/useGroceryStore.js
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const useGroceryStore = create(
  devtools((set, get) => ({
    groceries: [],
    loading: false,
    error: null,

    fetchGroceries: async () => {
      set({ loading: true, error: null });
      try {
        const res = await fetch(`${API_URL}/groceries`);
        if (!res.ok) throw new Error("Failed to fetch groceries");
        const data = await res.json();
        set({ groceries: data.groceries || [], loading: false });
      } catch (err) {
        set({ error: err.message, loading: false });
      }
    },

    addGrocery: async (g) => {
      try {
        const res = await fetch(`${API_URL}/groceries`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(g),
        });
        if (!res.ok) throw new Error("Failed to add grocery");
        const data = await res.json();
        set({ groceries: [...get().groceries, data] });
      } catch (err) {
        set({ error: err.message });
      }
    },

    toggleGrocery: async (id) => {
      try {
        const grocery = get().groceries.find((g) => g.id === id);
        if (!grocery) throw new Error("Grocery not found");

        const updated = { ...grocery, purchased: !grocery.purchased };
        const res = await fetch(`${API_URL}/groceries/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated),
        });
        if (!res.ok) throw new Error("Failed to update grocery");

        set({
          groceries: get().groceries.map((g) => (g.id === id ? updated : g)),
        });
      } catch (err) {
        set({ error: err.message });
      }
    },

    deleteGrocery: async (id) => {
      try {
        const res = await fetch(`${API_URL}/groceries/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Failed to delete grocery");
        set({ groceries: get().groceries.filter((g) => g.id !== id) });
      } catch (err) {
        set({ error: err.message });
      }
    },
  }))
);