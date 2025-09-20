import type { Folder, Note } from '../types/index.ts'

// Данные в памяти
let folders: Folder[] = [
  { id: 1, name: 'Личное', notesCount: 2 },
  { id: 2, name: 'Работа', notesCount: 3 },
  { id: 3, name: 'Идеи', notesCount: 1 }
]

let notes: Note[] = [
  { id: 1, folderId: 1, messageId: 'msg_1', title: 'Список покупок', content: 'Молоко\nХлеб\nЯйца\nМасло', updatedAt: new Date().toISOString() },
  { id: 2, folderId: 1, messageId: 'msg_2', title: 'День рождения мамы', content: 'Купить подарок\nЗаказать торт\nПозвонить родственникам', updatedAt: new Date().toISOString() },
  { id: 3, folderId: 2, messageId: 'msg_3', title: 'Встреча с клиентом', content: 'Обсудить требования к проекту\nПоказать прототип\nОбговорить сроки', updatedAt: new Date().toISOString() },
  { id: 4, folderId: 2, messageId: 'msg_4', title: 'Задачи на неделю', content: '- Доделать API\n- Протестировать фронтенд\n- Написать документацию', updatedAt: new Date().toISOString() },
  { id: 5, folderId: 2, messageId: 'msg_5', title: 'Код-ревью', content: 'Проверить PR от коллеги\nОставить комментарии\nОбновить тесты', updatedAt: new Date().toISOString() },
  { id: 6, folderId: 3, messageId: 'msg_6', title: 'Приложение для заметок', content: 'Сделать Telegram Mini App\nИспользовать React + Hono\nХранить данные в чате', updatedAt: new Date().toISOString() }
]

let nextFolderId = 4
let nextNoteId = 7

export const getFolders = (): Folder[] => folders

export const createFolder = (name: string): Folder => {
  const folder: Folder = { id: nextFolderId++, name, notesCount: 0 }
  folders.push(folder)
  return folder
}

export const getFolderNotes = (folderId: number): Note[] => {
  return notes.filter(note => note.folderId === folderId)
}

export const getNote = (messageId: string): Note | undefined => {
  return notes.find(n => n.messageId === messageId)
}

export const createNote = (title: string, content: string, folderId: number): Note => {
  const note: Note = {
    id: nextNoteId++,
    folderId,
    messageId: `msg_${nextNoteId - 1}`,
    title,
    content,
    updatedAt: new Date().toISOString()
  }
  notes.push(note)
  
  // Обновить счетчик заметок в папке
  const folder = folders.find(f => f.id === folderId)
  if (folder) folder.notesCount++
  
  return note
}

export const updateNote = (messageId: string, title: string, content: string): Note | null => {
  const noteIndex = notes.findIndex(n => n.messageId === messageId)
  if (noteIndex === -1) return null
  
  notes[noteIndex] = {
    ...notes[noteIndex],
    title,
    content,
    updatedAt: new Date().toISOString()
  }
  
  return notes[noteIndex]
}

export const deleteNote = (messageId: string): boolean => {
  const noteIndex = notes.findIndex(n => n.messageId === messageId)
  if (noteIndex === -1) return false
  
  const note = notes[noteIndex]
  notes.splice(noteIndex, 1)
  
  // Уменьшить счетчик заметок в папке
  const folder = folders.find(f => f.id === note.folderId)
  if (folder && folder.notesCount > 0) {
    folder.notesCount--
  }
  
  return true
}

export const deleteFolder = (folderId: number): boolean => {
  const folderIndex = folders.findIndex(f => f.id === folderId)
  if (folderIndex === -1) return false
  
  // Удалить все заметки из папки
  notes = notes.filter(note => note.folderId !== folderId)
  
  // Удалить папку
  folders.splice(folderIndex, 1)
  
  return true
}
