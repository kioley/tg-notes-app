import type { Folder, ID } from '../types/index.ts'

// ===== ФУНКЦИИ ДЛЯ РАБОТЫ С ПАПКАМИ =====

// Получить все папки пользователя
export async function getFoldersForUser(userId: number): Promise<Folder[]> {
  console.log(`📁 Getting folders for user ${userId}`)
  
  // TODO: заменить на реальный запрос к БД
  return [
    { id: 1, userId, name: 'Личное', notesCount: 2 },
    { id: 2, userId, name: 'Работа', notesCount: 0 },
    { id: 3, userId, name: 'Идеи', notesCount: 1 }
  ]
}

// Создать папку для пользователя
export async function createFolderForUser(userId: number, name: string): Promise<Folder> {
  console.log(`📁 Creating folder "${name}" for user ${userId}`)
  
  // TODO: заменить на реальный запрос к БД
  const newFolder: Folder = {
    id: Math.floor(Math.random() * 1000) + 4, // временный ID
    userId,
    name: name.trim(),
    notesCount: 0
  }
  
  return newFolder
}

// Удалить папку пользователя
export async function deleteFolderForUser(folderId: ID, userId: number): Promise<boolean> {
  console.log(`📁 Deleting folder ${folderId} for user ${userId}`)
  
  // TODO: заменить на реальный запрос к БД
  // Проверяем существование папки и права доступа
  return true // заглушка - всегда успешно
}