import { useAppStore } from '../../store'
import ActionButton from '../ui/Button'

function NotesButtons() {
  const { goBack, createNote } = useAppStore()
  
  return (
    <>
      <ActionButton onClick={goBack} variant="secondary">
        ← Назад
      </ActionButton>
      <ActionButton onClick={createNote} variant="primary">
        + Новая заметка
      </ActionButton>
    </>
  )
}

export default NotesButtons