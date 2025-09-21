import type { Folder, ID } from '../types/index.ts'
import { db } from './database.ts'

// ===== ФУНКЦИИ ДЛЯ РАБОТЫ С ПАПКАМИ =====

// Получить все папки пользователя
export async function getFoldersForUser(userId: number): Promise<Folder[]> {
  console.log(`📁 Getting folders for user ${userId}`)
  
  // Первый запрос: получаем все папки
  const folders = db.query(`
    SELECT id, user_id as userId, name
    FROM folders 
    WHERE user_id = ? AND deleted_at IS NULL
    ORDER BY created_at
  `).all(userId) as Omit<Folder, 'notesCount'>[]
  
  if (folders.length === 0) {
    return []
  }
  
  // Второй запрос: считаем айтемы пользователя по папкам
  const counts = db.query(`
    SELECT folder_id, COUNT(*) as count
    FROM items 
    WHERE user_id = ? AND deleted_at IS NULL
    GROUP BY folder_id
  `).all(userId) as { folder_id: number, count: number }[]
  
  // Объединяем данные
  return folders.map(folder => {
    const foundCount = counts.find(c => c.folder_id === folder.id)
    
    return {
      ...folder,
      notesCount: foundCount ? foundCount.count : 0
    }
  })
}

// Создать папку для пользователя
export async function createFolderForUser(userId: number, name: string): Promise<Folder> {
  console.log(`📁 Creating folder "${name}" for user ${userId}`)
  
  const result = db.query(`
    INSERT INTO folders (user_id, name) 
    VALUES (?, ?)
  `).run(userId, name.trim())
  
  return {
    id: result.lastInsertRowid as number,
    userId,
    name: name.trim(),
    notesCount: 0  // новая папка всегда пустая
  }
}

// Обновить папку пользователя
export async function updateFolderForUser(folderId: ID, userId: number, name: string): Promise<Folder | null> {
  console.log(`📁 Updating folder ${folderId} to "${name}" for user ${userId}`)
  
  const result = db.query(`
    UPDATE folders 
    SET name = ?, updated_at = CURRENT_TIMESTAMP 
    WHERE id = ? AND user_id = ? AND deleted_at IS NULL
  `).run(name.trim(), folderId, userId)
  
  if (result.changes === 0) {
    return null // папка не найдена или не принадлежит пользователю
  }
  
  // Возвращаем обновленную папку
  const folder = db.query(`
    SELECT id, user_id as userId, name
    FROM folders 
    WHERE id = ? AND user_id = ?
  `).get(folderId, userId) as Omit<Folder, 'notesCount'> | undefined
  
  if (!folder) {
    return null
  }
  
  // Получаем текущий count для этой папки
  const count = db.query(`
    SELECT COUNT(*) as count
    FROM items 
    WHERE folder_id = ? AND deleted_at IS NULL
  `).get(folderId) as { count: number }
  
  return {
    ...folder,
    notesCount: count.count
  }
}

// Удалить папки пользователя (soft delete) - поддерживает массовое удаление
export async function deleteFoldersForUser(folderIds: ID[], userId: number): Promise<{ deletedCount: number, totalCount: number }> {
  console.log(`📁 Deleting folders [${folderIds.join(', ')}] for user ${userId}`)
  
  if (folderIds.length === 0) {
    return { deletedCount: 0, totalCount: 0 }
  }
  
  // Создаем плейсхолдеры для IN запроса
  const placeholders = folderIds.map(() => '?').join(', ')
  
  // Каскадно удаляем сначала все заметки в этих папках
  const itemsResult = db.query(`
    UPDATE items 
    SET deleted_at = CURRENT_TIMESTAMP 
    WHERE folder_id IN (${placeholders}) AND user_id = ? AND deleted_at IS NULL
  `).run(...folderIds, userId)
  
  console.log(`📦 Deleted ${itemsResult.changes} items in folders [${folderIds.join(', ')}]`)
  
  // Затем удаляем сами папки
  const foldersResult = db.query(`
    UPDATE folders 
    SET deleted_at = CURRENT_TIMESTAMP 
    WHERE id IN (${placeholders}) AND user_id = ? AND deleted_at IS NULL
  `).run(...folderIds, userId)
  
  return {
    deletedCount: foldersResult.changes,
    totalCount: folderIds.length
  }
}

// Вспомогательная функция для удаления одной папки (обратная совместимость)
export async function deleteFolderForUser(folderId: ID, userId: number): Promise<boolean> {
  const result = await deleteFoldersForUser([folderId], userId)
  return result.deletedCount > 0
}
