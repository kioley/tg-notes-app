import { createFolderFromAPI } from "../../api/foldersApi";
import { set, get } from "../index";
import { addFolder } from "./foldersSlice";
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

// Публичная функция - с проверкой isSaving
export const createFolder = async () => {
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
    // API вызов
    const newFolder = await createFolderFromAPI(
      state.newFolderName.trim(),
      state.selectedColor
    );

    // Добавляем новую папку в список
    addFolder(newFolder);

    // Очищаем форму и закрываем
    // resetCreateFolderForm();
    // closeDialog();
    set((state) => {
      state.isSaving = false;
    });
    closeCreateFolderDialog();

    return true;
  } catch (error) {
    console.error("Ошибка создания папки:", error);

    // Сбрасываем isSaving и закрываем форму
    set((state) => {
      state.isSaving = false;
    });
    // Закрываем форму
    closeCreateFolderDialog();
    // Показать диалог ошибки
    openMessageDialog("Не удалось создать папку. Попробуйте ещё раз.");

    return false;
  }
};
