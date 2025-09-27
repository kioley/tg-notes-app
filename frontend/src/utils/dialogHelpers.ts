// Настройка DOM для диалога: блокировка скролла и обработка Escape
export const setDomForDialog = (onClose: () => void) => {
  // Блокируем скролл страницы
  document.body.style.overflow = 'hidden';
  
  // Обрабатываем нажатие Escape
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };
  
  document.addEventListener('keydown', handleKeyDown);
  
  // Возвращаем функцию для восстановления DOM
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'unset';
  };
};