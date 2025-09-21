import { ReactNode } from "react";
import { useAppStore } from "../../store";

interface HighlightableItemProps {
  id: number;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}

function HighlightableItem({
  id,
  onClick,
  children,
  className = "",
}: HighlightableItemProps) {
  const { isHighlightMode, highlightedIds, toggleHighlight } = useAppStore();
  const isHighlighted = highlightedIds.includes(id);

  const handleClick = () => {
    if (isHighlightMode) {
      toggleHighlight(id);
    } else {
      onClick();
    }
  };

  const containerClasses = [
    // Базовые стили
    "p-4 mb-2 rounded-lg shadow-sm border cursor-pointer transition-all duration-200",
    // Кастомные стили из props
    className,
    // Состояния выделения
    isHighlighted
      ? "bg-blue-100 border-blue-300" // Выделенный элемент
      : isHighlightMode
      ? "bg-gray-50 border-blue-200" // Режим выделения - серый фон + синяя рамка
      : "bg-white border-gray-200 hover:bg-gray-50", // Обычный режим
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div onClick={handleClick} className={containerClasses}>
      {children}
    </div>
  );
}

export default HighlightableItem;
