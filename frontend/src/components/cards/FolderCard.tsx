import { Folder as FolderIcon } from "lucide-react";
import { useAppStore, selectFolder, toggleHighlight } from "../../store";

function getNotesText(count: number) {
  if (count === 0) return "Нет заметок";
  // Получаем последнюю цифру числа
  const lastDigit = count % 10;
  // Получаем последние две цифры для чисел от 10 до 20
  const lastTwoDigits = count % 100;

  // Если число заканчивается на 11, 12, 13, 14 - используем "заметок"
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${count} заметок`;
  }

  // Для остальных случаев смотрим на последнюю цифру
  if (lastDigit === 1) {
    return `${count} заметка`;
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return `${count} заметки`;
  } else {
    return `${count} заметок`;
  }
}

// const ALLOWED_COLORS = [
//   "blue",
//   "green",
//   "red",
//   "purple",
//   "yellow",
//   "indigo",
//   "pink",
//   "gray",
// ];

// const normalizeColor = (color: string): string => {
//   if (!color) return "blue";
//   let c = String(color).toLowerCase();
//   if (c === "default") c = "blue";
//   if (ALLOWED_COLORS.includes(c)) return c;
//   return "blue";
// };

// const getColorClass = (color: string): string => {
//   return `bg-${normalizeColor(color)}-50`;
// };

// const getIconColorClass = (color: string): string => {
//   return `bg-${normalizeColor(color)}-100`;
// };

// const getTextColorClass = (color: string): string => {
//   return `text-${normalizeColor(color)}-600`;
// };

interface FolderCardProps {
  folderId: number;
}

export default function FolderCard({ folderId }: FolderCardProps) {
  const folder = useAppStore((state) =>
    state.folders.find((f) => f.id === folderId)
  );
  if (!folder) return null;

  const isHighlighted = useAppStore(
    (state) => state.isHighlightMode && state.highlightedIds.includes(folderId)
  );
  const color = folder.color == "default" ? "blue" : folder.color;
  // const colorClass = getColorClass(folder.color);
  // const iconColorClass = getIconColorClass(folder.color);
  // const textColorClass = getTextColorClass(folder.color);
  const notesCount = folder.notesCount || 0;

  const isHighlightMode = useAppStore((state) => state.isHighlightMode);
  const handleClick = () => {
    if (isHighlightMode) {
      toggleHighlight(folder.id);
    } else {
      selectFolder(folder.id);
    }
  };

  return (
    <div className="relative" style={{ aspectRatio: "1.2/1" }}>
      {/* Задний прямоугольник (торчащий из среза) */}
      <div
        className={`absolute bg-${color}-100 shadow-sm`}
        style={{
          top: "5%",
          right: "5%",
          width: "85%",
          height: "85%",
          borderRadius: "12px",
          zIndex: 1,
        }}
      ></div>

      {/* Основная папка */}
      <div
        className={`relative bg-${color}-50 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group overflow-hidden`}
        style={{
          width: "100%",
          height: "100%",
          clipPath:
            "polygon(0% 0%, 60% 0%, 85% 25%, 100% 25%, 100% 100%, 0% 100%)",
          zIndex: 2,
          position: "relative",
        }}
        onClick={handleClick}
      >
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="flex justify-start mb-3">
            <div className={`bg-${color}-100 p-3 rounded-xl`}>
              <FolderIcon
                className={`w-6 h-6 sm:w-7 sm:h-7 text-${color}-600`}
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 truncate">
              {folder.name}
            </h3>
            <p className="text-gray-600 text-sm font-medium">
              {getNotesText(notesCount)}
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl z-20" />
      </div>
      {isHighlighted && (
        <div className="absolute top-2 right-2 z-30">
          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
            <svg
              className="w-3 h-3 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
