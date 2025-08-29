// src/Stores/useGroceryStore.js
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const useGroceryStore = create(
  devtools(
    persist(
      (set, get) => ({
        groceries: [],
        loading: false,
        error: null,

        // load groceries from backend
        fetchGroceries: async () => {
          set({ loading: true, error: null });
          try {
            const res = await fetch(`${API_URL}/groceries`);
            if (!res.ok) throw new Error("Failed to fetch groceries");
            const data = await res.json();
            set({ groceries: Array.isArray(data) ? data : [], loading: false });
          } catch (err) {
            set({ error: err.message || "Unknown error", loading: false });
          }
        },

        // add grocery (POST) — backend assigns id
        addGrocery: async (item) => {
          try {
            const res = await fetch(`${API_URL}/groceries`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(item),
            });
            if (!res.ok) throw new Error("Failed to add grocery");
            const newItem = await res.json();
            set({ groceries: [...get().groceries, newItem] });
          } catch (err) {
            set({ error: err.message || "Failed to add grocery" });
          }
        },

        // toggle purchased (PATCH)
        toggleGrocery: async (id) => {
          try {
            const grocery = get().groceries.find((g) => String(g.id) === String(id));
            if (!grocery) return;
            const updated = { ...grocery, purchased: !grocery.purchased };

            const res = await fetch(`${API_URL}/groceries/${id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ purchased: updated.purchased }),
            });
            if (!res.ok) throw new Error("Failed to update grocery");
            const returned = await res.json();

            set({
              groceries: get().groceries.map((g) =>
                String(g.id) === String(id) ? returned : g
              ),
            });
          } catch (err) {
            set({ error: err.message || "Failed to toggle grocery" });
          }
        },

        // delete grocery (DELETE)
        deleteGrocery: async (id) => {
          try {
            const res = await fetch(`${API_URL}/groceries/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete grocery");
            set({ groceries: get().groceries.filter((g) => String(g.id) !== String(id)) });
          } catch (err) {
            set({ error: err.message || "Failed to delete grocery" });
          }
        },
      }),
      { name: "groceries-storage" }
    )
  )
);

// Auto-init once when store loads
useGroceryStore.getState().fetchGroceries();