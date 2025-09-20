import type { Folder, Note } from './index'

export type View = 'folders' | 'notes' | 'view' | 'edit' | 'createNote'

export interface Button {
  text: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

export interface AppState {
  // State
  currentView: View
  selectedFolder: Folder | null
  selectedNote: Note | null
  showCreateForm: boolean
  newFolderName: string
  
  // Actions
  selectFolder: (folder: Folder) => void
  selectNote: (note: Note) => void
  // editNote: (note: Note) => void
  editCurrentNote: () => void
  createNote: () => void
  goBack: () => void
  updateSelectedNote: (title: string, content: string) => void
  saveNote: (savedNote: Note) => void
  setShowCreateForm: (show: boolean) => void
  setNewFolderName: (name: string) => void
}