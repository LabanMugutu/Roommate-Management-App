import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const useAuthStore = create(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        token: null,
        loading: false,
        error: null,

        login: async (email) => {
          set({ loading: true, error: null });
          try {
            const res = await fetch(`${API_URL}/roommates`);
            if (!res.ok) throw new Error("Failed to fetch users");

            const data = await res.json();
            const users = data.roommates || []; // ✅ get the array properly
            if (users.length === 0) throw new Error("No users found");

            const user = users.find(u => u.email === email);
            if (!user) throw new Error("Invalid email");

            set({ user, token: "fake-jwt-token", loading: false, error: null });
          } catch (err) {
            set({ error: err.message, loading: false });
            throw err;
          }
        },

        logout: () => {
          set({ user: null, token: null, loading: false, error: null });
          localStorage.removeItem("auth-storage");
        },

        isAuthenticated: () => !!get().user,
      }),
      { name: "auth-storage" }
    )
  )
);