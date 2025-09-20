import { useAppStore } from '../../store'
import { useItem } from '../../hooks'

function NoteView() {
  const { selectedNote } = useAppStore()
  
  if (!selectedNote || !selectedNote.id) return null
  
  const { data: fullNote } = useItem(selectedNote.id)
  
  const noteData = fullNote || selectedNote
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          {/* Название заметки */}
          <h1 className="text-xl font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-100">
            {noteData.title || 'Без названия'}
          </h1>
          
          {/* Контент заметки */}
          <div className="whitespace-pre-wrap text-gray-800">
            {noteData.content || 'Пустая заметка'}
          </div>
        </div>
        
        {noteData.updatedAt && (
          <p className="text-xs text-gray-400 mt-4 text-center">
            Изменено: {new Date(noteData.updatedAt).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  )
}

export default NoteView