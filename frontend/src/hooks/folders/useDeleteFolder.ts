import { useSWRConfig } from 'swr'
import { API_BASE_URL } from '../../config'

export const useDeleteFolder = () => {
  const { mutate } = useSWRConfig()
  
  const deleteFolder = async (folderId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/folders/${folderId}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        // Обновляем список папок
        mutate(`${API_BASE_URL}/folders`)
        return true
      }
      
      throw new Error('Failed to delete folder')
    } catch (error) {
      console.error('Ошибка удаления папки:', error)
      throw error
    }
  }
  
  return { deleteFolder }
}
