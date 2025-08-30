import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const useAuthStore = create(
  devtools(
    persist(
      (set, get) => ({
        roommate: null, // ✅ changed from user to roommate
        token: null,
        loading: false,
        error: null,

        login: async (email) => {
          set({ loading: true, error: null });
          try {
            const res = await fetch(`${API_URL}/roommates`);
            if (!res.ok) throw new Error("Failed to fetch roommates");

            const roommates = await res.json(); // array of roommates
            if (roommates.length === 0) throw new Error("No roommates found");

            const found = roommates.find((r) => r.email === email);
            if (!found) throw new Error("Invalid email");

            set({ roommate: found, token: "fake-jwt-token", loading: false, error: null });
          } catch (err) {
            set({ error: err.message, loading: false });
            throw err;
          }
        },

        logout: () => {
          set({ roommate: null, token: null, loading: false, error: null });
          localStorage.removeItem("auth-storage"); 
        },

        isAuthenticated: () => !!get().roommate,
      }),
      { name: "auth-storage" }
    )
  )
);
