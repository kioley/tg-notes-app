import { useState, useEffect, useRef } from 'react'
import { useAppStore } from '../../store/index.old'

function NoteEditor() {
  const { selectedItem: selectedNote, updateSelectedNote } = useAppStore()
  
  if (!selectedNote) return null
  
  const [title, setTitle] = useState(selectedNote.title)
  const [content, setContent] = useState(selectedNote.content)
  const isNewNote = !selectedNote.id
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setTitle(selectedNote.title)
    setContent(selectedNote.content)
  }, [selectedNote])

  useEffect(() => {
    if (!isNewNote && textareaRef.current) {
      textareaRef.current.focus()
      textareaRef.current.setSelectionRange(content.length, content.length)
    }
  }, [isNewNote])

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="bg-white rounded-lg p-4 shadow-sm h-full flex flex-col">
          {/* Поле для названия */}
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              updateSelectedNote(e.target.value, content)
            }}
            placeholder="Название заметки"
            className="text-xl font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-100 bg-transparent outline-none border-0 border-b-2 focus:border-blue-500"
            autoFocus
          />
          
          {/* Поле для контента */}
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => {
              setContent(e.target.value)
              updateSelectedNote(title, e.target.value)
            }}
            placeholder="Начните писать..."
            className="flex-1 resize-none outline-none bg-transparent text-gray-800"
          />
        </div>
      </div>
    </div>
  )
}

export default NoteEditor