import { useSWRConfig } from 'swr'
import { API_BASE_URL } from '../../config'
import type { Item } from '../../types'

export const useSaveItem = () => {
  const { mutate } = useSWRConfig()
  
  const createItem = async (item: { title: string; content: string; folderId: number; type: string }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      })
      
      if (response.ok) {
        const savedItem = await response.json()
        mutate(`${API_BASE_URL}/folders/${item.folderId}/items`)
        return savedItem
      }
      
      throw new Error('Failed to create item')
    } catch (error) {
      console.error('Ошибка создания item:', error)
      throw error
    }
  }
  
  const updateItem = async (item: Item) => {
    try {
      const response = await fetch(`${API_BASE_URL}/items/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      })
      
      if (response.ok) {
        const updatedItem = await response.json()
        mutate(`${API_BASE_URL}/items/${item.id}`)
        mutate(`${API_BASE_URL}/folders/${item.folderId}/items`)
        return updatedItem
      }
      
      throw new Error('Failed to update item')
    } catch (error) {
      console.error('Ошибка обновления item:', error)
      throw error
    }
  }
  
  return { createItem, updateItem }
}
