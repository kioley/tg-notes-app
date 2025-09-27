import { create } from "zustand";
import type { Folder, iItem, iView, AppState } from "../types";

export const useAppStore = create<AppState>((set, get) => {
  const actions = {
    // ==================== NAVIGATION ACTIONS ====================
    // Actions for opening/navigating to folders and notes
    selectFolder: (folder: Folder) => {
      set({
        selectedFolder: folder,
        currentView: "notes",
      });
    },

    selectNote: (note: iItem) => {
      set({
        selectedItem: note,
        currentView: "view",
      });
    },

    editCurrentNote: () => {
      set({
        currentView: "edit",
      });
    },

    createNote: () => {
      const { selectedFolder } = get();

      set({
        selectedItem: {
          id: 0, // Временный ID для новой заметки
          userId: 0, // Будет установлен на сервере
          title: "",
          content: "",
          type: "note", // По умолчанию создаем заметку
          folderId: selectedFolder!.id,
        },
        currentView: "createNote",
      });
    },

    goBack: () => {
      const { currentView, selectedItem: selectedNote } = get();

      if (currentView === "notes") {
        set({
          currentView: "folders",
          selectedFolder: null,
        });
      } else if (currentView === "view") {
        set({
          currentView: "notes",
          selectedItem: null,
        });
      } else if (currentView === "edit") {
        set({
          currentView: "view",
        });
      } else if (currentView === "createNote") {
        set({
          currentView: "notes",
          selectedItem: null,
        });
      }
    },

    // ==================== UI ACTIONS ====================
    // Actions for managing UI state and forms
    updateSelectedNote: (title: string, content: string) => {
      set((state) => ({
        selectedItem: state.selectedItem
          ? {
              ...state.selectedItem,
              title,
              content,
            }
          : null,
      }));
    },

    saveNote: (savedNote: iItem) => {
      set({ currentView: "view", selectedItem: savedNote });
    },

    setShowCreateForm: (show: boolean) => {
      set({ showCreateForm: show });
    },

    setNewFolderName: (name: string) => {
      set({ newFolderName: name });
    },

    // ==================== HIGHLIGHTING ACTIONS ====================
    // Actions for multi-selection mode and bulk operations
    enterHighlightMode: () => {
      set({ isHighlightMode: true, highlightedIds: [] });
    },

    exitHighlightMode: () => {
      set({ isHighlightMode: false, highlightedIds: [] });
    },

    toggleHighlight: (id: number) => {
      set((state) => {
        const isHighlighted = state.highlightedIds.includes(id);
        const newHighlightedIds = isHighlighted
          ? state.highlightedIds.filter((highlightedId) => highlightedId !== id)
          : [...state.highlightedIds, id];

        return { highlightedIds: newHighlightedIds };
      });
    },

    highlightAll: (allIds: number[]) => {
      // Выделяем все переданные ID
      set({ highlightedIds: allIds });
    },
  };

  const store = {
    // ==================== NAVIGATION STATE ====================
    // Current navigation state and selected items
    currentView: "folders" as View,
    selectedFolder: null,
    selectedItem: null,

    // ==================== UI STATE ====================
    // Form states and UI flags
    showCreateForm: false,
    newFolderName: "",

    // ==================== HIGHLIGHTING STATE ====================
    // Multi-selection state for bulk operations
    isHighlightMode: false,
    highlightedIds: [] as number[],

    // Actions
    ...actions,
  };

  return store;
});
