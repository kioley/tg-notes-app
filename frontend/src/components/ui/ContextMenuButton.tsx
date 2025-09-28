import { useState } from "react";
import { MoreVertical, Plus, Pen, Trash2, Share, Settings } from "lucide-react";
import { useAppStore, editCurrentNote } from "../../store";
import IconButton from "./IconButton";

export default function ContextMenuButton() {
  const [isOpen, setIsOpen] = useState(false);
  const currentView = useAppStore((state) => state.currentView);

  const handleEdit = () => {
    editCurrentNote();
    setIsOpen(false);
  };

  const handleDelete = () => {
    console.log("TODO: Удалить элемент");
    setIsOpen(false);
  };

  const handleShare = () => {
    console.log("TODO: Поделиться элементом");
    setIsOpen(false);
  };

  const handleCreateFolder = () => {
    console.log("TODO: Создать папку");
    setIsOpen(false);
  };

  const handleCreateNote = () => {
    console.log("TODO: Создать заметку");
    setIsOpen(false);
  };

  const handleRename = () => {
    console.log("TODO: Переименовать элемент");
    setIsOpen(false);
  };

  const handleSettings = () => {
    console.log("TODO: Открыть настройки");
    setIsOpen(false);
  };

  const getMenuItems = () => {
    const baseItems = [];
    const settingsItem = {
      label: "Настройки",
      icon: Settings,
      action: handleSettings,
    };

    switch (currentView) {
      case "view":
        baseItems.push(
          { label: "Редактировать", icon: Pen, action: handleEdit },
          { label: "Удалить", icon: Trash2, action: handleDelete },
          { label: "Поделиться", icon: Share, action: handleShare }
        );
        break;
      case "folders":
        baseItems.push(
          { label: "Создать папку", icon: Plus, action: handleCreateFolder },
          { label: "Поделиться", icon: Share, action: handleShare }
        );
        break;
      case "notes":
        baseItems.push(
          { label: "Создать заметку", icon: Plus, action: handleCreateNote },
          { label: "Переименовать", icon: Pen, action: handleRename },
          { label: "Удалить", icon: Trash2, action: handleDelete },
          { label: "Поделиться", icon: Share, action: handleShare }
        );
        break;
      default:
        return [settingsItem];
    }

    return [...baseItems, settingsItem];
  };

  const menuItems = getMenuItems();

  return (
    <div className="relative">
      <IconButton onClick={() => setIsOpen(!isOpen)}>
        <MoreVertical className="w-5 h-5 text-gray-600" />
      </IconButton>

      {isOpen && (
        <>
          {/* Overlay для закрытия меню */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Меню */}
          <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-48">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
              >
                <item.icon className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">{item.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
