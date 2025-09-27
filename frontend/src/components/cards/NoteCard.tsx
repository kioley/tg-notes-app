import { FileText, Calendar } from "lucide-react";
import type { iItem } from "../../types";

interface NoteCardProps {
  note: iItem;
  // onOpen: () => void;
}

export default function NoteCard({ note }: NoteCardProps) {
  // const handleClick = () => {
  //   if (onToggleHighlight) {
  //     onToggleHighlight();
  //   } else {
  //     onOpen();
  //   }
  // };

  // Получаем preview текста (первые 100 символов)
  const getPreviewText = (content: string) => {
    if (!content) return "Пустая заметка";
    const plainText = content.replace(/<[^>]*>/g, ""); // Удаляем HTML теги
    return plainText.length > 100
      ? plainText.substring(0, 100) + "..."
      : plainText;
  };

  // Форматируем дату
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Сегодня";
    if (diffDays === 2) return "Вчера";
    if (diffDays <= 7) return `${diffDays} дня назад`;

    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-300 cursor-pointer group">
      {/* Заголовок с иконкой */}
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
          <FileText className="w-4 h-4 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 flex-1 leading-tight">
          {note.title}
        </h3>
      </div>

      {/* Дата */}
      <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
        <Calendar className="w-3 h-3" />
        <span>{formatDate(note.updatedAt)}</span>
      </div>

      {/* Контент с ограниченной высотой */}
      <div className="text-gray-700 text-sm leading-relaxed max-h-30 overflow-hidden">
        <p className="line-clamp-4">{note.content}</p>
      </div>
    </div>
  );
}
