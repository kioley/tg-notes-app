import type { Item, ID } from '../types/index.ts'

// ===== УНИВЕРСАЛЬНЫЕ CRUD ФУНКЦИИ ДЛЯ ITEMS =====

// Получить items папки (любого типа)
export async function getItemsForFolder(folderId: ID, userId: number): Promise<Item[]> {
  console.log(`📦 Getting items for folder ${folderId}, user ${userId}`)
  
  // TODO: заменить на реальный запрос к БД
  if (folderId === 1) {
    return [
      {
        id: 1,
        userId,
        folderId,
        type: 'note',
        title: 'Список покупок',
        content: 'Молоко\nХлеб\nЯйца\nМасло',
        updatedAt: new Date().toISOString()
      },
      {
        id: 2,
        userId,
        folderId,
        type: 'note',
        title: 'День рождения мамы',
        content: 'Купить подарок\nЗаказать торт\nПозвонить родственникам',
        updatedAt: new Date().toISOString()
      }
    ]
  }
  
  if (folderId === 3) {
    return [
      {
        id: 3,
        userId,
        folderId,
        type: 'note',
        title: 'Идея для приложения',
        content: JSON.stringify({
          text: 'Приложение для заметок в Telegram',
          tags: ['разработка', 'идея'],
          priority: 'высокий'
        }),
        updatedAt: new Date().toISOString()
      }
    ]
  }
  
  return [] // пустая папка
}

// Получить item по ID
export async function getItemForUser(itemId: ID, userId: number): Promise<Item | null> {
  console.log(`📦 Getting item ${itemId} for user ${userId}`)
  
  // TODO: заменить на реальный запрос к БД
  const mockItems: Record<number, Item> = {
    1: {
      id: 1,
      userId,
      folderId: 1,
      type: 'note',
      title: 'Список покупок',
      content: 'Молоко\nХлеб\nЯйца\nМасло',
      updatedAt: new Date().toISOString()
    },
    2: {
      id: 2,
      userId,
      folderId: 1,
      type: 'note',
      title: 'День рождения мамы',
      content: 'Купить подарок\nЗаказать торт\nПозвонить родственникам',
      updatedAt: new Date().toISOString()
    },
    3: {
      id: 3,
      userId,
      folderId: 3,
      type: 'note',
      title: 'Идея для приложения',
      content: JSON.stringify({
        text: 'Приложение для заметок в Telegram',
        features: ['Создание папок', 'Заметки с текстом', 'Синхронизация']
      }),
      updatedAt: new Date().toISOString()
    }
  }
  
  const item = mockItems[itemId as number]
  return item || null
}

// Создать item (универсальная функция для любого типа)
export async function createItemForUser(
  userId: number,
  folderId: ID,
  type: string,
  title: string,
  content: string
): Promise<Item> {
  console.log(`📦 Creating ${type} "${title}" in folder ${folderId} for user ${userId}`)
  
  // TODO: заменить на реальный запрос к БД
  const newItem: Item = {
    id: Math.floor(Math.random() * 1000) + 100, // временный ID
    userId,
    folderId,
    type: type.toLowerCase(),
    title: title.trim(),
    content: content, // не обрезаем - может быть JSON
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  return newItem
}

// Обновить item
export async function updateItemForUser(
  itemId: ID,
  userId: number,
  title: string,
  content: string,
  type?: string
): Promise<Item | null> {
  console.log(`📦 Updating item ${itemId} for user ${userId}`)
  
  // TODO: заменить на реальный запрос к БД
  // Проверяем существование item и права доступа
  const existingItem = await getItemForUser(itemId, userId)
  
  if (!existingItem) {
    return null
  }
  
  // Возвращаем обновленный item
  return {
    ...existingItem,
    type: type || existingItem.type, // можно изменить тип
    title: title.trim(),
    content: content, // не обрезаем - может быть JSON
    updatedAt: new Date().toISOString()
  }
}

// Удалить item
export async function deleteItemForUser(itemId: ID, userId: number): Promise<boolean> {
  console.log(`📦 Deleting item ${itemId} for user ${userId}`)
  
  // TODO: заменить на реальный запрос к БД
  // Проверяем существование item и права доступа
  const item = await getItemForUser(itemId, userId)
  
  if (!item) {
    return false // item не найден
  }
  
  return true // заглушка - всегда успешно удаляем
}