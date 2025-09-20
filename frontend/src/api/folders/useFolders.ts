import useSWR from 'swr'
import { API_BASE_URL } from '../../config'
import type { Folder } from '../../types'

const fetcher = (url: string): Promise<Folder[]> => fetch(url).then(res => res.json())

export const useFolders = () => {
  return useSWR<Folder[]>(`${API_BASE_URL}/folders`, fetcher)
}