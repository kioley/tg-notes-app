import { getItems } from "../../api/itemsApi";
import type { iItem } from "../../types";
import { get, set } from "../index";

// Состояние этого slice
export const itemsState = {
  itemsByFolder: [] as iItem[],
  currentItem: null as number | null,
  loadedFolders: [] as number[],
};

// Actions для этого slice

export const loadItems = async (folderId: number) => {
  if (get().loadedFolders[folderId]) return;
  const items: iItem[] = await getItems(folderId);
  set((state) => {
    state.itemsByFolder = items;
  });
};
