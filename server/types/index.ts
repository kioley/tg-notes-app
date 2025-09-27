// Алиас для легкой миграции на UUID
export type ID = number; // Потом можно поменять на string
export type iItemType = "note"; // 'note', 'task', 'checklist', 'link', etc.

export interface Folder {
  id: ID;
  userId: number; // Telegram user ID
  name: string;
  notesCount: number;
  color: string;
  icon: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null; // Мягкое удаление
}

export interface iItem {
  id: ID;
  userId: number; // Telegram user ID
  folderId: ID; // ID папки
  type: iItemType;
  title: string;
  content: string; // JSON строка или простой текст
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null; // Мягкое удаление
}

// export type iUser = {
//   id: number;
//   storages: iStorage[];
// };

// export type iStorage = {
//   name: string;
//   folders: Folder[];
// };
