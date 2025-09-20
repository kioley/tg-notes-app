import type { Folder, iItem } from "./index";

export type View = "folders" | "notes" | "view" | "edit" | "createNote";

export interface Button {
  text: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

export interface AppState {
  // ==================== NAVIGATION STATE ====================
  currentView: View;
  selectedFolder: Folder | null;
  selectedItem: iItem | null;

  // ==================== UI STATE ====================
  showCreateForm: boolean;
  newFolderName: string;

  // ==================== HIGHLIGHTING STATE ====================
  isHighlightMode: boolean;
  highlightedIds: number[];

  // ==================== NAVIGATION ACTIONS ====================
  selectFolder: (folder: Folder) => void;
  selectNote: (note: iItem) => void;
  editCurrentNote: () => void;
  createNote: () => void;
  goBack: () => void;

  // ==================== UI ACTIONS ====================
  updateSelectedNote: (title: string, content: string) => void;
  saveNote: (savedNote: iItem) => void;
  setShowCreateForm: (show: boolean) => void;
  setNewFolderName: (name: string) => void;

  // ==================== HIGHLIGHTING ACTIONS ====================
  enterHighlightMode: () => void;
  exitHighlightMode: () => void;
  toggleHighlight: (id: number) => void;
  highlightAll: () => void;
}
