import { Hono } from 'hono'
import { telegramAuthMiddleware } from './telegram-auth.ts'
import { getFoldersForUser, createFolderForUser, deleteFolderForUser } from '../db/folders.ts'
import { getItemsForFolder, getItemForUser, createItemForUser, updateItemForUser, deleteItemForUser } from '../db/items.ts'

const api = new Hono()

// Применяем аутентификацию ко всем роутам
api.use('*', telegramAuthMiddleware)

// ===== РОУТЫ ДЛЯ ПАПОК =====

// Получить все папки пользователя
api.get('/folders', async (c) => {
  const userId = c.get('userId') as number
  const folders = await getFoldersForUser(userId)
  return c.json(folders)
})

// Создать папку
api.post('/folders', async (c) => {
  const userId = c.get('userId') as number
  const { name } = await c.req.json()
  const folder = await createFolderForUser(userId, name)
  return c.json(folder)
})

// Удалить папку
api.delete('/folders/:id', async (c) => {
  const userId = c.get('userId') as number
  const folderId = parseInt(c.req.param('id'))
  const success = await deleteFolderForUser(folderId, userId)
  
  if (!success) {
    return c.json({ error: 'Folder not found' }, 404)
  }
  
  return c.json({ message: 'Folder deleted successfully' })
})

// ===== РОУТЫ ДЛЯ ITEMS =====

// Получить items папки
api.get('/folders/:id/items', async (c) => {
  const userId = c.get('userId') as number
  const folderId = parseInt(c.req.param('id'))
  const items = await getItemsForFolder(folderId, userId)
  return c.json(items)
})

// Получить item по ID
api.get('/items/:id', async (c) => {
  const userId = c.get('userId') as number
  const itemId = parseInt(c.req.param('id'))
  const item = await getItemForUser(itemId, userId)
  
  if (!item) {
    return c.json({ error: 'Item not found' }, 404)
  }
  
  return c.json(item)
})

// Создать item
api.post('/items', async (c) => {
  const userId = c.get('userId') as number
  const { title, content, folderId, type = 'note' } = await c.req.json()
  
  const item = await createItemForUser(userId, folderId, type, title, content)
  return c.json(item)
})

// Обновить item
api.put('/items/:id', async (c) => {
  const userId = c.get('userId') as number
  const itemId = parseInt(c.req.param('id'))
  const { title, content, type } = await c.req.json()
  
  const item = await updateItemForUser(itemId, userId, title, content, type)
  
  if (!item) {
    return c.json({ error: 'Item not found' }, 404)
  }
  
  return c.json(item)
})

// Удалить item
api.delete('/items/:id', async (c) => {
  const userId = c.get('userId') as number
  const itemId = parseInt(c.req.param('id'))
  const success = await deleteItemForUser(itemId, userId)
  
  if (!success) {
    return c.json({ error: 'Item not found' }, 404)
  }
  
  return c.json({ message: 'Item deleted successfully' })
})

export default api
