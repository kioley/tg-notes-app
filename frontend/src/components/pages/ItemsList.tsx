import EmptyState from '../ui/Empty'
import Item from '../items/Item'
import PageHeader from '../ui/PageHeader'
import { useAppStore } from '../../store'
import { useItems } from '../../api'
import type { iItem } from '../../types'

function ItemsList() {
  const { selectedFolder } = useAppStore()
  
  if (!selectedFolder) return null
  
  const { data: items = [] } = useItems(selectedFolder.id)
  
  // Отображение item в зависимости от типа
  const renderItem = (item: iItem) => {
    switch (item.type) {
      case 'note':
        return <Item key={item.id} item={item}  />
      
      default:
        // Пока остальные типы не обрабатываем
        return null
    }
  }
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        <PageHeader 
          title={selectedFolder.name}
          icon="📁"
        />
        
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
