import useSWR from 'swr'
import { API_BASE_URL } from '../../config'
import type { Item } from '../../types'

const fetcher = (url: string): Promise<Item[]> => fetch(url).then(res => res.json())

export const useItems = (folderId: number) => {
  return useSWR<Item[]>(`${API_BASE_URL}/folders/${folderId}/items`, fetcher)
}
