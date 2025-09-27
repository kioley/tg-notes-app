import { setCurrentView } from "../../../store";
import { ArrowLeft } from "lucide-react";

type ListHeaderProps = {
  title: string;
  showBackButton?: boolean;
};

export function ListHeader({ showBackButton = false, title }: ListHeaderProps) {
  return (
    <div className="h-10 relative flex items-center">
      {/* Кнопка назад с абсолютным позиционированием */}
      {showBackButton && (
        <button
          onClick={() => setCurrentView("folders")}
          className="absolute left-0 p-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 transition-colors z-10"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
      )}

      {/* Заголовок всегда по центру */}
      <h1 className="text-center text-xl font-medium text-gray-900 w-full truncate">
        {title}
      </h1>
    </div>
  );
}
