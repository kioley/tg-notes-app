import { useSWRConfig } from 'swr'
import { API_BASE_URL } from '../../config'

export const useCreateFolder = () => {
  const { mutate } = useSWRConfig()
  
  const createFolder = async (name: string) => {
    const folderName = name.trim()
    if (!folderName) throw new Error('Folder name is required')
    
    try {
      const response = await fetch(`${API_BASE_URL}/folders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: folderName })
      })
      
      if (response.ok) {
        mutate(`${API_BASE_URL}/folders`)
        return await response.json()
      }
      
      throw new Error('Failed to create folder')
    } catch (error) {
      console.error('Ошибка создания папки:', error)
      throw error
    }
  }
  
  return { createFolder }
}
