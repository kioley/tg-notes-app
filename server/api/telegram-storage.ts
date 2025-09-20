import yaml from 'js-yaml'
import type { Folder, Note } from '../types/index.ts'

// Типы для структур данных после парсинга
interface FoldersListData {
  folders: Array<{
    id: number
    name: string
    notesCount: number
  }>
}

interface NotesListData {
  notes: Array<{
    id: string
    title: string
    updatedAt: string
  }>
}

// Временные данные (пока без реального Telegram API)
let mockMessages: Map<string, string> = new Map()

// Инициализация с тестовыми данными
const initMockData = () => {
  // Список папок
  const foldersData: FoldersListData = {
    folders: [
      { id: 1, name: 'Личное', notesCount: 2 },
      { id: 2, name: 'Работа', notesCount: 3 },
      { id: 3, name: 'Идеи', notesCount: 1 }
    ]
  }
  mockMessages.set('#folders_list', yaml.dump(foldersData))
  
  // Заметки папки "Личное" 
  const folder1Notes: NotesListData = {
    notes: [
      { id: '1', title: 'Список покупок', updatedAt: new Date().toISOString() },
      { id: '2', title: 'День рождения мамы', updatedAt: new Date().toISOString() }
    ]
  }
  mockMessages.set('#folder_1', yaml.dump(folder1Notes))
  
  // Содержимое заметок
  mockMessages.set('#item_1', 'Список покупок\n\nМолоко\nХлеб\nЯйца\nМасло')
  mockMessages.set('#item_2', 'День рождения мамы\n\nКупить подарок\nЗаказать торт\nПозвонить родственникам')
}

// Инициализируем данные при импорте
initMockData()

export const getFolders = async (): Promise<Folder[]> => {
  const message = mockMessages.get('#folders_list')
  if (!message) return []
  
  try {
    const data = yaml.load(message) as FoldersListData
    return data.folders
  } catch (error) {
    console.error('Ошибка парсинга списка папок:', error)
    return []
  }
}

export const createFolder = async (name: string): Promise<Folder> => {
  const folders = await getFolders()
  const newId = Math.max(...folders.map(f => f.id), 0) + 1
  
  const newFolder: Folder = {
    id: newId,
    name: name.trim(),
    notesCount: 0
  }
  
  const updatedData: FoldersListData = {
    folders: [...folders, newFolder]
  }
  
  mockMessages.set('#folders_list', yaml.dump(updatedData))
  return newFolder
}

export const deleteFolder = async (folderId: number): Promise<boolean> => {
  const folders = await getFolders()
  const filteredFolders = folders.filter(f => f.id !== folderId)
  
  if (filteredFolders.length === folders.length) return false
  
  const updatedData: FoldersListData = {
    folders: filteredFolders
  }
  
  mockMessages.set('#folders_list', yaml.dump(updatedData))
  mockMessages.delete(`#folder_${folderId}`)
  
  return true
}

export const getFolderNotes = async (folderId: number): Promise<Note[]> => {
  const message = mockMessages.get(`#folder_${folderId}`)
  if (!message) return []
  
  try {
    const data = yaml.load(message) as NotesListData
    return data.notes.map(note => ({
      id: parseInt(note.id),
      title: note.title,
      content: '',
      updatedAt: note.updatedAt
    }))
  } catch (error) {
    console.error('Ошибка парсинга списка заметок:', error)
    return []
  }
}

export const getNote = async (noteId: string): Promise<Note | null> => {
  const message = mockMessages.get(`#item_${noteId}`)
  if (!message) return null
  
  const lines = message.split('\n')
  const title = lines[0] || 'Без названия'
  const content = lines.slice(2).join('\n')
  
  return {
    id: parseInt(noteId),
    title,
    content,
    updatedAt: new Date().toISOString()
  }
}
