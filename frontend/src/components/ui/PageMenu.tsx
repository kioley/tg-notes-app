import { useState, useEffect } from 'react'
import { usePageMenu } from '../../hooks/usePageMenu'
import MenuButton from './MenuButton'

function PageMenu() {
  const items = usePageMenu()
  const [isOpen, setIsOpen] = useState(false)
  
  // Закрываем меню при любых событиях
  useEffect(() => {
    if (!isOpen) return
    
    const closeMenu = () => setIsOpen(false)
    
    // События для закрытия меню
    document.addEventListener('scroll', closeMenu, true) // любой скролл
    document.addEventListener('wheel', closeMenu) // колесико мыши
    document.addEventListener('touchmove', closeMenu) // скролл на мобильных
    document.addEventListener('keydown', closeMenu) // любая клавиша
    document.addEventListener('resize', closeMenu) // изменение размера окна
    
    return () => {
      document.removeEventListener('scroll', closeMenu, true)
      document.removeEventListener('wheel', closeMenu)
      document.removeEventListener('touchmove', closeMenu)
      document.removeEventListener('keydown', closeMenu)
      document.removeEventListener('resize', closeMenu)
    }
  }, [isOpen])
  
  // Не показываем меню если нет элементов
  if (!items || items.length === 0) {
    return null
  }
  
  return (
    <div className="relative">
      <MenuButton onClick={() => setIsOpen(!isOpen)} />
      
      {isOpen && (
        <>
          {/* Backdrop to close menu */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)} 
          />
          
          {/* Dropdown menu */}
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            <div className="py-1">
              {items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    item.onClick()
                    setIsOpen(false)
                  }}
                  className="flex items-center w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {item.icon && (
                    <span className="mr-3 text-lg">{item.icon}</span>
                  )}
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default PageMenu