import { goBack } from "../../../store";
import { ArrowLeft } from "lucide-react";
import IconButton from "../../ui/IconButton";
import ContextMenuButton from "../../ui/ContextMenuButton";

type ListHeaderProps = {
  title: string;
  showBackButton?: boolean;
  showMenuButton?: boolean;
};

export function Header({ showBackButton = false, showMenuButton = false, title }: ListHeaderProps) {
  return (
    <div className="h-10 relative flex items-center">
      {/* Кнопка назад с абсолютным позиционированием */}
      {showBackButton && (
        <div className="absolute left-0 z-10">
          <IconButton onClick={goBack}>
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </IconButton>
        </div>
      )}

      {/* Кнопка меню с абсолютным позиционированием */}
      {showMenuButton && (
        <div className="absolute right-0 z-10">
          <ContextMenuButton />
        </div>
      )}

      {/* Заголовок всегда по центру */}
      <h1 className="text-center text-xl font-medium text-gray-900 w-full truncate">
        {title}
      </h1>
    </div>
  );
}
