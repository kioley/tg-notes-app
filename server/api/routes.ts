import { Hono } from "hono";
import { telegramAuthMiddleware } from "./telegram-auth.ts";
import {
  getFoldersForUser,
  createFolderForUser,
  updateFolderForUser,
  deleteFolderForUser,
  deleteFoldersForUser,
} from "../db/folders.ts";
import {
  getItemsForFolder,
  getItemForUser,
  createItemForUser,
  updateItemForUser,
  deleteItemForUser,
  deleteItemsForUser,
} from "../db/items.ts";

interface CustomEnv {
  Variables: {
    userId: number;
  };
}

const api = new Hono<CustomEnv>();

// Применяем аутентификацию ко всем роутам
api.use("*", telegramAuthMiddleware);

// ===== РОУТЫ ДЛЯ ПАПОК =====

// Получить все папки пользователя
api.get("/folders", async (c) => {
  const userId = c.get("userId");
  const folders = await getFoldersForUser(userId);
  return c.json(folders);
});

// Создать папку
api.post("/folders", async (c) => {
  const userId = c.get("userId");
  const { name, color } = await c.req.json();
  const folder = await createFolderForUser(userId, name, color);
  return c.json(folder);
});

// Обновить папку
api.put("/folders/:id", async (c) => {
  const userId = c.get("userId");
  const folderId = parseInt(c.req.param("id"));
  const { name, color } = await c.req.json();

  const folder = await updateFolderForUser(folderId, userId, name, color);

  if (!folder) {
    return c.json({ error: "Folder not found" }, 404);
  }

  return c.json(folder);
});

// Удалить папку/папки (поддерживает массовое удаление)
api.delete("/folders/:id", async (c) => {
  const userId = c.get("userId");
  const param = c.req.param("id");

  // Поддерживаем как один ID, так и массив IDов через запятую
  const folderIds = param.includes(",")
    ? param
        .split(",")
        .map((id) => parseInt(id.trim()))
        .filter((id) => !isNaN(id))
    : [parseInt(param)];

  if (folderIds.some((id) => isNaN(id))) {
    return c.json({ error: "Invalid folder ID(s)" }, 400);
  }

  const result = await deleteFoldersForUser(folderIds, userId);

  if (result.deletedCount === 0) {
    return c.json({ error: "No folders found or deleted" }, 404);
  }

  return c.json({
    message: `Deleted ${result.deletedCount} of ${result.totalCount} folders`,
    deletedCount: result.deletedCount,
    totalCount: result.totalCount,
  });
});

// ===== РОУТЫ ДЛЯ ITEMS =====

// Получить items папки
api.get("/folders/:id/items", async (c) => {
  const userId = c.get("userId");
  const folderId = parseInt(c.req.param("id"));
  const items = await getItemsForFolder(folderId, userId);
  return c.json(items);
});

// Получить item по ID
api.get("/items/:id", async (c) => {
  const userId = c.get("userId");
  const itemId = parseInt(c.req.param("id"));
  const item = await getItemForUser(itemId, userId);

  if (!item) {
    return c.json({ error: "Item not found" }, 404);
  }

  return c.json(item);
});

// Создать item
api.post("/items", async (c) => {
  const userId = c.get("userId");
  const { title, content, folderId, type = "note" } = await c.req.json();

  const item = await createItemForUser(userId, folderId, type, title, content);
  return c.json(item);
});

// Обновить item (только title и content)
api.put("/items/:id", async (c) => {
  const userId = c.get("userId");
  const itemId = parseInt(c.req.param("id"));
  const { title, content } = await c.req.json();

  const item = await updateItemForUser(itemId, userId, title, content);

  if (!item) {
    return c.json({ error: "Item not found" }, 404);
  }

  return c.json(item);
});

// Удалить item/items (поддерживает массовое удаление)
api.delete("/items/:id", async (c) => {
  const userId = c.get("userId");
  const param = c.req.param("id");

  // Поддерживаем как один ID, так и массив IDов через запятую
  const itemIds = param.includes(",")
    ? param
        .split(",")
        .map((id) => parseInt(id.trim()))
        .filter((id) => !isNaN(id))
    : [parseInt(param)];

  if (itemIds.some((id) => isNaN(id))) {
    return c.json({ error: "Invalid item ID(s)" }, 400);
  }

  const result = await deleteItemsForUser(itemIds, userId);

  if (result.deletedCount === 0) {
    return c.json({ error: "No items found or deleted" }, 404);
  }

  return c.json({
    message: `Deleted ${result.deletedCount} of ${result.totalCount} items`,
    deletedCount: result.deletedCount,
    totalCount: result.totalCount,
  });
});

export default api;
