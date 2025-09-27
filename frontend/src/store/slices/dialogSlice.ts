import type { iDialog } from "../../types";
import { get } from "../index";
import { closeCreateFolderDialog } from "./createFolderSlice";
import { closeMessageDialog } from "./messageDialogSlice";

// Состояние этого slice
export const dialogState = {
  currentDialog: null as iDialog | null,
};

// Actions для этого slice

// Глобальный обработчик клавиш для всех диалогов
const handleDialogKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    const state = get();
    switch (state.currentDialog) {
      case "createFolder":
        closeCreateFolderDialog();
        break;
      case "errorDialog":
        closeMessageDialog();
        break;
      default:
        clearDomSettings();
    }
  }
};

// Общая функция открытия диалога
export const setDomSettings = () => {
  // Настраиваем DOM
  // document.body.style.overflowY = "clip";
  document.body.style.overflow = "hidden";
  // lockScrollWithScrollbar();
  document.addEventListener("keydown", handleDialogKeyDown);
};

export const clearDomSettings = () => {
  // Восстанавливаем DOM
  document.body.style.overflow = "unset";
  // document.body.style.overflowY = "unset";
  // unlockScrollWithScrollbar();
  document.removeEventListener("keydown", handleDialogKeyDown);
};

// function lockScrollWithScrollbar() {
//   const container = document.body;
//   const scrollbarWidth =
//     window.innerWidth - document.documentElement.clientWidth;
//   container.style.overflow = "hidden";
//   container.style.paddingRight = `${scrollbarWidth}px`;
// }
// function unlockScrollWithScrollbar() {
//   const container = document.body;
//   container.style.overflow = "";
//   container.style.paddingRight = "";
// }
