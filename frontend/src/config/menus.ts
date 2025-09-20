import type { MenuItem, View } from "../types";

// Типы для конфигурации меню
type MenuConfig = {
  [key in View]?: {
    normal?: MenuItem[];
    selection?: MenuItem[];
  };
};

// Функции-заглушки (будут заменены на реальные действия)
const actions = {
  // Folders actions
  enterFolderSelection: () => console.log("Enter folder selection"),
  createFolder: () => console.log("Create folder"),
  settings: () => console.log("Settings"),
  exitSelection: () => console.log("Exit selection"),
  highlightAll: () => console.log("Highlight all"),

  // Items actions
  renameFolder: () => console.log("Rename folder"),
  enterItemSelection: () => console.log("Enter item selection"),
  createNote: () => console.log("Create note"),
  moveSelected: () => console.log("Move selected"),

  // View/Edit actions
  editNote: () => console.log("Edit note"),
  deleteNote: () => console.log("Delete note"),
  shareNote: () => console.log("Share note"),
};

// Конфигурация меню для всех страниц
export const menuConfig: MenuConfig = {
  folders: {
    normal: [
      {
        label: "Выбрать папки",
        icon: "✓",
        onClick: actions.enterFolderSelection,
      },
      {
        label: "Создать папку",
        icon: "➕",
        onClick: actions.createFolder,
      },
      {
        label: "Настройки",
        icon: "⚙️",
        onClick: actions.settings,
      },
    ],
    selection: [
      {
        label: "Отмена",
        icon: "❌",
        onClick: actions.exitSelection,
      },
      {
        label: "Выбрать все",
        icon: "✓",
        onClick: actions.highlightAll,
      },
    ],
  },

  notes: {
    normal: [
      {
        label: "Переименовать папку",
        icon: "✏️",
        onClick: actions.renameFolder,
      },
      {
        label: "Выбрать заметки",
        icon: "✓",
        onClick: actions.enterItemSelection,
      },
      {
        label: "Создать заметку",
        icon: "➕",
        onClick: actions.createNote,
      },
    ],
    selection: [
      {
        label: "Отмена",
        icon: "❌",
        onClick: actions.exitSelection,
      },
      {
        label: "Выбрать все",
        icon: "✓",
        onClick: actions.highlightAll,
      },
      {
        label: "Переместить выбранные",
        icon: "📁",
        onClick: actions.moveSelected,
      },
    ],
  },

  view: {
    normal: [
      {
        label: "Редактировать",
        icon: "✏️",
        onClick: actions.editNote,
      },
      {
        label: "Удалить",
        icon: "🗑️",
        onClick: actions.deleteNote,
      },
      {
        label: "Поделиться",
        icon: "📤",
        onClick: actions.shareNote,
      },
    ],
  },

  // edit и createNote не нуждаются в меню
  edit: {},
  createNote: {},
};

// Функция для получения элементов меню
export function getMenuItems(view: View, isHighlightMode: boolean): MenuItem[] {
  const pageConfig = menuConfig[view];
  if (!pageConfig) return [];

  if (isHighlightMode && pageConfig.selection) {
    return pageConfig.selection;
  }

  return pageConfig.normal || [];
}
