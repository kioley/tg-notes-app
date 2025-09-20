import EmptyState from '../ui/Empty'
import NoteItem from '../items/Note'
import { useAppStore } from '../../store'
import { useItems } from '../../hooks'
import type { Item } from '../../types'

function ItemsList() {
  const { selectNote, selectedFolder } = useAppStore()
  
  if (!selectedFolder) return null
  
  const { data: items = [] } = useItems(selectedFolder.id)
  
  // Отображение item в зависимости от типа
  const renderItem = (item: Item) => {
    switch (item.type) {
      case 'note':
        return <NoteItem key={item.id} item={item} onClick={selectNote} />
      
      default:
        // Пока остальные типы не обрабатываем
        return null
    }
  }
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {/* Название папки */}
        <h1 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
          📁 {selectedFolder.name}
        </h1>
        
        {/* Список items */}
        {items.length === 0 ? (
          <EmptyState 
            title="Пока нет элементов" 
            subtitle="Создайте первый элемент" 
          />
        ) : (
          items.map(item => renderItem(item))
        )}
      </div>
    </div>
  )
}

export default ItemsList
