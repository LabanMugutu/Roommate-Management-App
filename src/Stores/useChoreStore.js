// Stores/useChoreStore.js
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const useChoreStore = create(
  devtools((set, get) => ({
    chores: [],
    loading: false,
    error: null,

    initChores: async () => {
      if (get().chores.length) return; // prevent duplicate fetch
      set({ loading: true, error: null });
      try {
        const res = await fetch(`${API_URL}/chores`);
        if (!res.ok) throw new Error("Failed to fetch chores");
        const data = await res.json();
        set({ chores: data, loading: false });
      } catch (err) {
        set({ error: err.message, loading: false });
      }
    },

    addChore: async (chore) => {
      try {
        const res = await fetch(`${API_URL}/chores`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(chore),
        });
        if (!res.ok) throw new Error("Failed to add chore");
        const data = await res.json();
        set({ chores: [...get().chores, data] });
      } catch (err) {
        set({ error: err.message });
      }
    },

    completeChore: async (id) => {
      try {
        const res = await fetch(`${API_URL}/chores/${id}/complete`, {
          method: "PATCH",
        });
        if (!res.ok) throw new Error("Failed to complete chore");
        const updated = await res.json();
        set({
          chores: get().chores.map((c) =>
            c.id === id ? updated : c
          ),
        });
      } catch (err) {
        set({ error: err.message });
      }
    },

    deleteChore: async (id) => {
      try {
        const res = await fetch(`${API_URL}/chores/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete chore");
        set({ chores: get().chores.filter((c) => c.id !== id) });
      } catch (err) {
        set({ error: err.message });
      }
    },
  }))
);

// auto-init
useChoreStore.getState().initChores();