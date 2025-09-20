import { useState } from 'react'
import { useAppStore } from '../../store'
import { useSaveItem } from '../../api'
import ActionButton from '../ui/Button'

function EditButtons() {
  const { goBack, selectedItem: selectedNote, currentView, saveNote: storeSaveNote } = useAppStore()
  const { createItem, updateItem } = useSaveItem()
  const [isSaving, setIsSaving] = useState(false)
  
  const handleSave = async () => {
    if (!selectedNote) return
    
    setIsSaving(true)
    try {
      const isCreating = currentView === 'createNote'
      
      const savedNote = isCreating 
        ? await createItem({
            title: selectedNote.title || 'Без названия',
            content: selectedNote.content,
            folderId: selectedNote.folderId,
            type: selectedNote.type || 'note'  // Добавляем обязательный type
          })
        : await updateItem(selectedNote)
      
      storeSaveNote(savedNote)
    } catch (error) {
      console.error('Ошибка сохранения заметки:', error)
      // TODO: показать пользователю ошибку
    } finally {
      setIsSaving(false)
    }
  }
  
  return (
    <>
      <ActionButton onClick={goBack} variant="secondary">
        Отмена
      </ActionButton>
      <ActionButton 
        onClick={handleSave} 
        variant="primary" 
        disabled={isSaving}
      >
        {isSaving ? 'Сохранение...' : 'Сохранить'}
      </ActionButton>
    </>
  )
}

export default EditButtons