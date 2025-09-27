import { set } from "../index";
import { setDomSettings, clearDomSettings } from "./dialogSlice";

export const messageDialogState = {
  messageText: null as string | null,
};

export const openMessageDialog = (message: string) => {
  set((state) => {
    state.currentDialog = "errorDialog";
    state.messageText = message;
  });
  setDomSettings();
};

export const closeMessageDialog = () => {
  //   const state = get();
  // Если есть процесс сохранения/блокировки, можно добавить проверки, сейчас закрываем всегда
  set((state) => {
    state.currentDialog = null;
    state.messageText = null;
  });
  clearDomSettings();
};
