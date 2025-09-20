import { create } from "zustand";
import type { Folder, Note, View, AppState } from "../types";

export const useAppStore = create<AppState>((set, get) => {
  const actions = {
    selectFolder: (folder: Folder) => {
      set({
        selectedFolder: folder,
        currentView: "notes",
      });
    },

    selectNote: (note: Note) => {
      set({
        selectedNote: note,
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
        selectedNote: {
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
      const { currentView, selectedNote } = get();

      if (currentView === "notes") {
        set({
          currentView: "folders",
          selectedFolder: null,
        });
      } else if (currentView === "view") {
        set({
          currentView: "notes",
          selectedNote: null,
        });
      } else if (currentView === "edit") {
        set({
          currentView: "view",
        });
      } else if (currentView === "createNote") {
        set({
          currentView: "notes",
          selectedNote: null,
        });
      }
    },

    updateSelectedNote: (title: string, content: string) => {
      set((state) => ({
        selectedNote: state.selectedNote
          ? {
              ...state.selectedNote,
              title,
              content,
            }
          : null,
      }));
    },

    saveNote: (savedNote: Note) => {
      set({ currentView: "view", selectedNote: savedNote });
    },

    setShowCreateForm: (show: boolean) => {
      set({ showCreateForm: show });
    },

    setNewFolderName: (name: string) => {
      set({ newFolderName: name });
    },


  };

  const store = {
    // Initial state
    currentView: "folders" as View,
    selectedFolder: null,
    selectedNote: null,
    showCreateForm: false,
    newFolderName: '',

    // Actions
    ...actions,
  };

  return store;
});
