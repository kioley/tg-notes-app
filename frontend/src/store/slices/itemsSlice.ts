import { fetchItems } from "../../api/itemsApi";
import type { iItem } from "../../types";
import { get, set, AppState } from "../index";

// Состояние этого slice
export const itemsState = {
  items: [] as iItem[],
  currentItem: null as number | null,
  currentFolderId: null as number | null,
};

// Actions для этого slice

// Хранилище загруженных папок
const loadedFolders: number[] = [];

export const loadItems = async () => {
  const { currentFolderId } = get();

  if (!currentFolderId || loadedFolders.includes(currentFolderId)) {
    return;
  }
  loadedFolders.push(currentFolderId);

  const items = await fetchItems(currentFolderId);
  if (items.length > 0) {
    set((state) => {
      state.items.push(...items);
    });
  }
};

export function getCurrentFolderItems(state: AppState) {
  const { items, currentFolderId } = state;
  return items.filter((item) => item.folderId === currentFolderId);
}
