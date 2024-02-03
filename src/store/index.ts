import { create } from "zustand";

interface SessionState {
  component: string;
  setComponent: (component: string) => void;
}

export const useComponentStore = create<SessionState>((set) => ({
  component: "Classroom",
  setComponent: (component: string) => set({ component }),
}));
