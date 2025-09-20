import { useAppStore } from '../../store'
import ActionButton from '../ui/Button'

function ViewButtons() {
  const { goBack, editCurrentNote } = useAppStore()
  
  return (
    <>
      <ActionButton onClick={goBack} variant="secondary">
        ← Назад
      </ActionButton>
      <ActionButton onClick={editCurrentNote} variant="primary">
        Редактировать
      </ActionButton>
    </>
  )
}

export default ViewButtons