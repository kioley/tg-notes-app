import type { iView } from "../../types";
import { set, get } from "../index";

// Состояние этого slice
export const navigationState = {
  currentView: "folders" as iView,
  selectedFolderId: null as number | null,
  selectedItemId: null as number | null,
};

// Actions для этого slice
export const setCurrentView = (view: iView) => {
  set((state) => {
    state.currentView = view;
  });
};

export const selectFolder = (folderId: number) => {
  set((state) => {
    state.selectedFolderId = folderId;
    state.selectedItemId = null; // Сбрасываем выбранную заметку
    state.currentView = "notes"; // Переходим к списку заметок
  });
};

export const selectNote = (noteId: number) => {
  set((state) => {
    state.selectedItemId = noteId;
    state.currentView = "view"; // Переходим к просмотру заметки
  });
};

export const goBack = () => {
  const { currentView } = get();

  set((state) => {
    if (currentView === "notes") {
      state.currentView = "folders";
      state.selectedFolderId = null;
    } else if (currentView === "view") {
      state.currentView = "notes";
      state.selectedItemId = null;
    } else if (currentView === "edit") {
      state.currentView = "view";
    } else if (currentView === "createNote") {
      state.currentView = "notes";
      state.selectedItemId = null;
    }
  });
};

export const createNote = () => {
  set((state) => {
    // state.selectedItemId = 0; // Временный ID для новой заметки
    state.currentView = "createNote";
  });
};

export const editCurrentNote = () => {
  set((state) => {
    state.currentView = "edit";
  });
};

// Глобальный обработчик клавиш для всех диалогов
