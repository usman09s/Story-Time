import { create } from "zustand";
import { FormEvent } from "react";

interface CategoryState {
  handleSubmit: ((e: FormEvent) => void) | null;
  setHandleSubmit: (fn: (e: FormEvent) => void) => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  handleSubmit: null,
  setHandleSubmit: (fn) => set({ handleSubmit: fn }),
}));
