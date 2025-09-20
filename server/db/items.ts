import type { iItem, ID } from "../types/index.ts";
import { db } from "./database.ts";

// ===== УНИВЕРСАЛЬНЫЕ CRUD ФУНКЦИИ ДЛЯ ITEMS =====

// Получить items папки (любого типа)
export async function getItemsForFolder(
  folderId: ID,
  userId: number
): Promise<iItem[]> {
  console.log(`📦 Getting items for folder ${folderId}, user ${userId}`);

  const items = db
    .query(
      `
    SELECT 
      id,
      user_id as userId,
      folder_id as folderId,
      type,
      title,
      content,
      created_at as createdAt,
      updated_at as updatedAt
    FROM items 
    WHERE folder_id = ? AND deleted_at IS NULL
    ORDER BY updated_at DESC
  `
    )
    .all(folderId) as iItem[];

  return items;
}

// Получить item по ID
export async function getItemForUser(
  itemId: ID,
  userId: number
): Promise<iItem | null> {
  console.log(`📦 Getting item ${itemId} for user ${userId}`);

  const item = db
    .query(
      `
    SELECT 
      id,
      user_id as userId,
      folder_id as folderId,
      type,
      title,
      content,
      created_at as createdAt,
      updated_at as updatedAt
    FROM items 
    WHERE id = ? AND user_id = ? AND deleted_at IS NULL
  `
    )
    .get(itemId, userId) as iItem | undefined;

  return item || null;
}

// Создать item (универсальная функция для любого типа)
export async function createItemForUser(
  userId: number,
  folderId: ID,
  type: string,
  title: string,
  content: string
): Promise<iItem> {
  console.log(
    `📦 Creating ${type} "${title}" in folder ${folderId} for user ${userId}`
  );

  const result = db
    .query(
      `
    INSERT INTO items (user_id, folder_id, type, title, content) 
    VALUES (?, ?, ?, ?, ?)
  `
    )
    .run(userId, folderId, type.toLowerCase(), title.trim(), content);

  const newItem = db
    .query(
      `
    SELECT 
      id,
      user_id as userId,
      folder_id as folderId,
      type,
      title,
      content,
      created_at as createdAt,
      updated_at as updatedAt
    FROM items 
    WHERE id = ?
  `
    )
    .get(result.lastInsertRowid) as iItem;

  return newItem;
}

// Обновить item (только title и content)
export async function updateItemForUser(
  itemId: ID,
  userId: number,
  title: string,
  content: string
): Promise<iItem | null> {
  console.log(`📦 Updating item ${itemId} for user ${userId}`);

  const result = db
    .query(
      `
    UPDATE items 
    SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ? AND user_id = ? AND deleted_at IS NULL
  `
    )
    .run(title.trim(), content, itemId, userId);

  if (result.changes === 0) {
    return null; // item не найден или не принадлежит пользователю
  }

  // Возвращаем обновленный item
  return await getItemForUser(itemId, userId);
}

// Удалить item (soft delete)
export async function deleteItemForUser(
  itemId: ID,
  userId: number
): Promise<boolean> {
  console.log(`📦 Deleting item ${itemId} for user ${userId}`);

  const result = db
    .query(
      `
    UPDATE items 
    SET deleted_at = CURRENT_TIMESTAMP 
    WHERE id = ? AND user_id = ? AND deleted_at IS NULL
  `
    )
    .run(itemId, userId);

  return result.changes > 0;
}
