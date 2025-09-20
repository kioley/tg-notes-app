import { useSWRConfig } from 'swr'
import { API_BASE_URL } from '../../config'

export const useDeleteItem = () => {
  const { mutate } = useSWRConfig()
  
  const deleteItem = async (itemId: number, folderId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/items/${itemId}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        // Обновляем список items папки
        mutate(`${API_BASE_URL}/folders/${folderId}/items`)
        return true
      }
      
      throw new Error('Failed to delete item')
    } catch (error) {
      console.error('Ошибка удаления item:', error)
      throw error
    }
  }
  
  return { deleteItem }
}
