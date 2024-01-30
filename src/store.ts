import { create } from "zustand";

type ComponentStore = {
  component: string;
  setComponent: (component: string) => void;
};

export const useComponentStore = create<ComponentStore>((set) => ({
  component: "Classroom",
  setComponent: (component: string) => set({ component }),
}));
