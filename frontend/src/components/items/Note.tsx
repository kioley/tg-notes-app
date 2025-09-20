import type { Item } from '../../types'

interface NoteItemProps {
  item: Item  // Принимаем Item, но ожидаем что type='note'
  onClick: (item: Item) => void
}

function NoteItem({ item, onClick }: NoteItemProps) {
  // Показываем только если это заметка
  if (item.type !== 'note') return null
  
  return (
    <div 
      onClick={() => onClick(item)}
      className="p-4 mb-2 bg-white rounded-lg shadow-sm border cursor-pointer hover:bg-gray-50 flex items-start"
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
    </div>
  )
}

export default NoteItem
