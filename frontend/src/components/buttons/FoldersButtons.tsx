import { useAppStore } from '../../store'
import ActionButton from '../ui/Button'

function FoldersButtons() {
  const { setShowCreateForm } = useAppStore()
  
  return (
    <ActionButton onClick={() => setShowCreateForm(true)} variant="primary">
      + Новая папка
    </ActionButton>
  )
}

export default FoldersButtons