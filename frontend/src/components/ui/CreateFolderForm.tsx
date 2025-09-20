import { useState } from 'react'
import { useAppStore } from '../../store'

function CreateFolderForm() {
  const { newFolderName, setNewFolderName } = useAppStore()
  
  return (
    <div className="p-4 bg-white border-t">
      <input
        type="text"
        value={newFolderName || ''}
        onChange={(e) => setNewFolderName(e.target.value)}
        placeholder="📁 Название папки"
        className="w-full p-3 border rounded-lg"
        autoFocus
      />
    </div>
  )
}

export default CreateFolderForm