import { createFolderFromAPI, updateFolderFromAPI } from "../../api/foldersApi";
import { set, get } from "../index";
import {
  addFolder,
  getCurrentFolder,
  updateExistingFolder,
} from "./foldersSlice";
import { CARD_COLOR_NAMES } from "../../constants/colors";
import { clearDomSettings, setDomSettings } from "./dialogSlice";
import { openMessageDialog } from "./messageDialogSlice";

// Состояние этого slice
export const createFolderState = {
  newFolderName: "",
  selectedColor: CARD_COLOR_NAMES[0], // Первый цвет по умолчанию
};

// Actions для этого slice
export function openCreateFolderDialog() {
  set((state) => {
    state.currentDialog = "createFolder";
  });
  setDomSettings();
}

export function openEditFolderDialog() {
  const folder = getCurrentFolder();

  if (folder) {
    set((state) => {
      state.newFolderName = folder.name;
      state.selectedColor = folder.color;
      state.currentDialog = "editFolder";
    });
    setDomSettings();
  }
}

export function closeCreateFolderDialog() {
  console.log("closeCreateFolderDialog");
  const state = get();
  if (state.isSaving) {
    return;
  }
  set((state) => {
    state.currentDialog = null;
  });
  clearDomSettings();
  resetCreateFolderForm();
}

export const setNewFolderName = (name: string) => {
  set((state) => {
    state.newFolderName = name;
  });
};

export const setSelectedColor = (color: string) => {
  set((state) => {
    state.selectedColor = color;
  });
};

// Приватная функция - всегда закрывает форму
export const resetCreateFolderForm = () => {
  set((state) => {
    state.newFolderName = "";
    state.selectedColor = CARD_COLOR_NAMES[0];
    // state.isSaving = false;
  });
};

// Вспомогательная функция для создания новой папки
const createNewFolder = async () => {
  const result = await createFolderFromAPI(get().newFolderName.trim(), get().selectedColor);
  addFolder(result);
  return result;
};

// Вспомогательная функция для обновления текущей папки
const updateCurrentFolder = async () => {
  const currentFolder = getCurrentFolder();
  if (!currentFolder) {
    throw new Error("Нет текущей папки для обновления");
  }

  const result = await updateFolderFromAPI(
    currentFolder.id,
    get().newFolderName.trim(),
    get().selectedColor
  );
  updateExistingFolder(result);
  return result;
};

// Единая функция сохранения папки
export const saveFolder = async () => {
  const state = get();

  // Валидация
  if (!state.newFolderName?.trim()) {
    console.warn("Пустое имя папки");
    return false;
  }

  // Начинаем сохранение
  set((state) => {
    state.isSaving = true;
  });

  try {
    // Выбираем логику в зависимости от типа диалога
    if (state.currentDialog === "createFolder") {
      await createNewFolder();
    } else if (state.currentDialog === "editFolder") {
      await updateCurrentFolder();
    } else {
      throw new Error("Неизвестный тип диалога для сохранения");
    }

    // Очищаем форму и закрываем
    set((state) => {
      state.isSaving = false;
    });
    closeCreateFolderDialog();

    return true;
  } catch (error) {
    console.error("Ошибка сохранения папки:", error);

    // Сбрасываем isSaving и закрываем форму
    set((state) => {
      state.isSaving = false;
    });
    // Закрываем форму
    closeCreateFolderDialog();
    // Показать диалог ошибки
    openMessageDialog("Не удалось сохранить папку. Попробуйте ещё раз.");

    return false;
  }
};
