import { useAppStore } from '../../store'
import type { iItem } from '../../types'
import SelectableItem from './SelectableItem'

interface NoteItemProps {
  item: iItem  // Принимаем Item, но ожидаем что type='note'

}

function iItem({ item }: NoteItemProps) {
  // Показываем только если это заметка
  if (item.type !== 'note') return null
  const { selectNote } = useAppStore()
  
  return (
    <SelectableItem 
      id={item.id}
      onClick={() => selectNote(item)}
      className="flex items-start"
    >
      <div className="text-xl mr-3 mt-1">📝</div>
      <div className="flex-1">
        <h3 className="font-medium mb-1">{item.title || 'Без названия'}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">
          {item.content}
        </p>
        <p className="text-xs text-gray-400 mt-2">
          {item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : ''}
        </p>
      </div>
    </SelectableItem>
  )
}

export default iItem
