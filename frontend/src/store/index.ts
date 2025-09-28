import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { Folder, iView, iDialog, iItem } from "../types";
import { foldersState } from "./slices/foldersSlice";
import { uiState } from "./slices/uiSlice";
import { createFolderState } from "./slices/createFolderSlice";
import { navigationState } from "./slices/navigationSlice";
import { dialogState } from "./slices/dialogSlice";
import { itemsState } from "./slices/itemsSlice";
import { messageDialogState } from "./slices/messageDialogSlice";

// Тип всего состояния
export type AppState = {
  // Folders
  folders: Folder[];
  // Navigation
  currentView: iView;
  currentFolderId: number | null;
  currentItemId: number | null;
  // Dialog
  currentDialog: iDialog | null;
  // UI
  isHighlightMode: boolean;
  highlightedIds: number[];
  // Create folder
  newFolderName: string;
  selectedColor: string;
  isSaving: boolean;
  // Items
  items: iItem[];
  currentItem: number | null;
  // currentFolderItems: iItem[];
  // Message dialog text
  messageText: string | null;
};

// Объединенное состояние
const initialState: AppState = {
  ...foldersState,
  ...navigationState,
  ...uiState,
  ...createFolderState,
  ...dialogState,
  ...itemsState,
  ...messageDialogState,
  // get currentFolderItems() {
  //   console.log("getter: ", get());

  //   return get().items.filter(
  //     (item) => item.folderId === get().currentFolderId
  //   );
  // },
};

export const useAppStore = create<AppState>()(immer(() => initialState));

// Общие алиасы для всех слайсов
export const set = useAppStore.setState;
export const get = useAppStore.getState;

// Реэкспорт всех actions для удобства
// Folders actions
export { loadFolders } from "./slices/foldersSlice";

// Navigation actions
export {
  setCurrentView,
  selectFolder,
  selectItem as selectNote,
  goBack,
  editCurrentNote,
} from "./slices/navigationSlice";

// UI actions
export {
  enterHighlightMode,
  exitHighlightMode,
  toggleHighlight,
  highlightAll,
  highlightAllFolders,
} from "./slices/uiSlice";

// Create folder actions
export {
  setNewFolderName,
  setSelectedColor,
  saveFolder,
  openCreateFolderDialog,
  openEditFolderDialog,
  closeCreateFolderDialog,
} from "./slices/createFolderSlice";

// Items actions
export { loadItems } from "./slices/itemsSlice";

// Message dialog actions
export {
  openMessageDialog,
  closeMessageDialog,
} from "./slices/messageDialogSlice";
