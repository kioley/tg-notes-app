import { useMemo } from 'react'
import { useAppStore, enterHighlightMode, exitHighlightMode, highlightAllFolders, setShowCreateForm } from '../store'
import type { MenuItem } from '../types'

export function usePageMenu() {
  const { 
    currentView, 
    isHighlightMode
  } = useAppStore()
  
  // TODO: Добавить createNote и editCurrentNote в новый store
  const createNote = () => console.log('TODO: createNote');
  const editCurrentNote = () => console.log('TODO: editCurrentNote');
  
  const menuItems = useMemo(() => {
    if (currentView === 'folders') {
      return isHighlightMode ? [
        { label: 'Отмена', icon: '❌', onClick: exitHighlightMode },
        { label: 'Выделить все', icon: '✓', onClick: highlightAllFolders }
      ] : [
        { label: 'Выделить папки', icon: '✓', onClick: enterHighlightMode },
        { label: 'Выделить все', icon: '✅', onClick: highlightAllFolders }
      ]
    }
    
    if (currentView === 'notes') {
      return isHighlightMode ? [
        { label: 'Отмена', icon: '❌', onClick: exitHighlightMode },
        { label: 'Выделить все', icon: '✓', onClick: () => console.log('Highlight all notes') },
        { label: 'Переместить', icon: '📁', onClick: () => console.log('Move highlighted') }
      ] : [
        { label: 'Переименовать папку', icon: '✏️', onClick: () => console.log('Rename folder') },
        { label: 'Выделить заметки', icon: '✓', onClick: enterHighlightMode },
        { label: 'Выделить все', icon: '✅', onClick: () => console.log('Highlight all notes') },
        { label: 'Создать заметку', icon: '➕', onClick: createNote }
      ]
    }
    
    if (currentView === 'view') {
      return [
        { label: 'Редактировать', icon: '✏️', onClick: editCurrentNote },
        { label: 'Удалить', icon: '🗑️', onClick: () => console.log('Delete note') },
        { label: 'Поделиться', icon: '📤', onClick: () => console.log('Share note') }
      ]
    }
    
    return []
  }, [currentView, isHighlightMode])
  
  return menuItems
}
