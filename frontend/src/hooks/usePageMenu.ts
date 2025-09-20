import { useMemo } from 'react'
import { useAppStore } from '../store'
import type { MenuItem } from '../types'

export function usePageMenu() {
  const { 
    currentView, 
    isHighlightMode, 
    enterHighlightMode, 
    exitHighlightMode, 
    setShowCreateForm, 
    createNote, 
    editCurrentNote 
  } = useAppStore()
  
  const menuItems = useMemo(() => {
    if (currentView === 'folders') {
      return isHighlightMode ? [
        { label: 'Отмена', icon: '❌', onClick: exitHighlightMode },
        { label: 'Выделить все', icon: '✓', onClick: () => console.log('Highlight all folders') }
      ] : [
        { label: 'Выделить папки', icon: '✓', onClick: enterHighlightMode },
        { label: 'Создать папку', icon: '➕', onClick: () => setShowCreateForm(true) },
        { label: 'Настройки', icon: '⚙️', onClick: () => console.log('Settings') }
      ]
    }
    
    if (currentView === 'notes') {
      return isHighlightMode ? [
        { label: 'Отмена', icon: '❌', onClick: exitHighlightMode },
        { label: 'Выделить все', icon: '✓', onClick: () => console.log('Highlight all items') },
        { label: 'Переместить', icon: '📁', onClick: () => console.log('Move highlighted') }
      ] : [
        { label: 'Переименовать папку', icon: '✏️', onClick: () => console.log('Rename folder') },
        { label: 'Выделить заметки', icon: '✓', onClick: enterHighlightMode },
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
