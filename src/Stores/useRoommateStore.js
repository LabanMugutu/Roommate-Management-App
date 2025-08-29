// Stores/useRoommateStore.js
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const useRoommateStore = create(
  devtools((set, get) => ({
    roommates: [],
    loading: false,
    error: null,

    initRoommates: async () => {
      if (get().roommates.length) return;
      set({ loading: true, error: null });
      try {
        const res = await fetch(`${API_URL}/roommates`);
        if (!res.ok) throw new Error("Failed to fetch roommates");
        const data = await res.json();
        set({ roommates: data, loading: false });
      } catch (err) {
        set({ error: err.message, loading: false });
      }
    },

    addRoommate: async (rm) => {
      try {
        const res = await fetch(`${API_URL}/roommates`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(rm),
        });
        if (!res.ok) throw new Error("Failed to add roommate");
        const data = await res.json();
        set({ roommates: [...get().roommates, data] });
      } catch (err) {
        set({ error: err.message });
      }
    },

    removeRoommate: async (id) => {
      try {
        const res = await fetch(`${API_URL}/roommates/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to remove roommate");
        set({
          roommates: get().roommates.filter((rm) => rm.id !== id),
        });
      } catch (err) {
        set({ error: err.message });
      }
    },
  }))
);

useRoommateStore.getState().initRoommates();