import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const useEventStore = create(
  devtools(
    persist(
      (set, get) => ({
        events: [],
        loading: false,
        error: null,

        fetchEvents: async () => {
          set({ loading: true, error: null });
          try {
            const res = await fetch(`${API_URL}/events`);
            if (!res.ok) throw new Error("Failed to fetch events");
            const data = await res.json();
            set({ events: data, loading: false });
          } catch (err) {
            set({ error: err.message, loading: false });
          }
        },

        addEvent: async (event) => {
          try {
            const res = await fetch(`${API_URL}/events`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(event),
            });
            const newEvent = await res.json();
            set({ events: [...get().events, newEvent] });
          } catch (err) {
            set({ error: err.message });
          }
        },

        deleteEvent: async (id) => {
          try {
            await fetch(`${API_URL}/events/${id}`, { method: "DELETE" });
            set({ events: get().events.filter((e) => e.id !== id) });
          } catch (err) {
            set({ error: err.message });
          }
        },
      }),
      { name: "events-storage" }
    )
  )
);

// Auto-init
useEventStore.getState().fetchEvents();