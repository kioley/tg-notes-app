import { mutate } from 'swr'
import { API_BASE_URL } from '../../config'

interface DeleteItemsResponse {
  message: string
  deletedCount: number
  totalCount: number
}

async function deleteItems(itemIds: number[], folderId: number): Promise<DeleteItemsResponse> {
  const idsParam = itemIds.join(',')
  const response = await fetch(`/api/items/${idsParam}`, {
    method: 'DELETE',
  })
  
  if (!response.ok) {
    throw new Error('Failed to delete items')
  }
  
  const result = await response.json()
  
  // Инвалидируем только то что нужно:
  // 1. Список папок (для обновления счетчиков notesCount)
  mutate(`${API_BASE_URL}/folders`)
  
  // 2. Заметки конкретной папки
  mutate(`${API_BASE_URL}/folders/${folderId}/items`)
  
  return result
}

export function useDeleteItems() {
  return {
    deleteItems: (itemIds: number[], folderId: number) => deleteItems(itemIds, folderId)
  }
}
