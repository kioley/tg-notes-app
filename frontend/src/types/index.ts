// Импортируем типы из сервера (источник истины)
export type {
  Folder,
  iItem,
  ID,
  iItemType,
} from "../../../server/types/index.ts";

// Store types
export type { iView, iDialog, ImmerStateCreator } from "./store";

// UI types
export interface MenuItem {
  label: string;
  onClick: () => void;
  icon?: string;
}
