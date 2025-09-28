import type { Folder } from "../../types";
import {
  fetchFoldersFromAPI,
  removeFoldersFromAPI,
} from "../../api/foldersApi";
import { set, get } from "../index";

// Локальное состояние загрузки
let foldersLoaded = false;

// Состояние этого slice
export const foldersState = {
  folders: [] as Folder[],
};

// Actions для этого slice
export const setFolders = (folders: Folder[]) => {
  set((state) => {
    state.folders = folders;
  });
};

export const addFolder = (folder: Folder) => {
  set((state) => {
    state.folders.push(folder);
  });
};

export const removeFolder = (id: number) => {
  set((state) => {
    const index = state.folders.findIndex((folder) => folder.id === id);
    if (index !== -1) {
      state.folders.splice(index, 1);
    }
  });
};

export const loadFolders = async () => {
  if (foldersLoaded) return;

  try {
    const folders = await fetchFoldersFromAPI();
    set((state) => {
      state.folders = folders;
    });
    foldersLoaded = true;
  } catch (error) {
    console.error("Failed to load folders:", error);
    foldersLoaded = false;
    throw error;
  }
};

export const deleteFolders = async (folderIds: number[]) => {
  // Оптимистично удаляем из UI
  set((state) => {
    folderIds.forEach((id) => {
      const index = state.folders.findIndex((f) => f.id === id);
      if (index !== -1) state.folders.splice(index, 1);
    });
  });

  try {
    await removeFoldersFromAPI(folderIds);
  } catch (error) {
    console.error("Delete failed:", error);
    foldersLoaded = false;
    await loadFolders(); // Перезагружаем при ошибке
    throw error;
  }
};

export const getCurrentFolder = (): Folder | null => {
  const state = get();
  return state.folders.find((f) => f.id === state.currentFolderId) || null;
};

export const updateExistingFolder = (updatedFolder: Folder) => {
  set((state) => {
    const index = state.folders.findIndex((f) => f.id === updatedFolder.id);
    if (index !== -1) {
      state.folders[index] = updatedFolder;
    }
  });
};
