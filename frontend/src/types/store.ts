import type { StateCreator } from "zustand";

export type iView = "folders" | "notes" | "view" | "edit" | "createNote";

export type iDialog = "createFolder" | "editFolder" | "errorDialog";

// Тип для StateCreator с Immer middleware
export type ImmerStateCreator<T> = StateCreator<
  T,
  [["zustand/immer", never]],
  [],
  T
>;
