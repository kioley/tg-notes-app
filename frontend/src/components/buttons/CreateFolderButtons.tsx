import { useState } from 'react'
import { useAppStore } from '../../store'
import { useCreateFolder } from '../../hooks'
import ActionButton from '../ui/Button'

function CreateFolderButtons() {
  const { setShowCreateForm, newFolderName, setNewFolderName } = useAppStore()
  const { createFolder } = useCreateFolder()
  const [isSaving, setIsSaving] = useState(false)
  
  const handleSave = async () => {
    setIsSaving(true)
    try {
      await createFolder(newFolderName)
      setNewFolderName('')
      setShowCreateForm(false)
    } catch (error) {
      console.error('Ошибка создания папки:', error)
      // TODO: показать пользователю ошибку
    } finally {
      setIsSaving(false)
    }
  }
  
  const handleCancel = () => {
    setNewFolderName('')
    setShowCreateForm(false)
  }
  
  return (
    <>
      <ActionButton onClick={handleCancel} variant="secondary">
        Отмена
      </ActionButton>
      <ActionButton 
        onClick={handleSave} 
        variant="primary"
        disabled={!newFolderName.trim() || isSaving}
      >
        {isSaving ? 'Создание...' : 'Создать'}
      </ActionButton>
    </>
  )
}

export default CreateFolderButtons