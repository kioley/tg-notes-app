import { useAppStore, editCurrentNote } from "../../store";
import { Header } from "./ui/Header";
import { Edit, Trash2, Share } from "lucide-react";
import IconButton from "../ui/IconButton";

function NoteView() {
  const { currentItemId: selectedItemId, items } = useAppStore();

  if (!selectedItemId) return null;

  const selectedNote = items.find((item) => item.id === selectedItemId);

  if (!selectedNote) return null;

  const noteData = selectedNote;

  const handleDelete = () => {
    console.log("TODO: Удалить заметку", selectedItemId);
  };

  const handleShare = () => {
    console.log("TODO: Поделиться заметкой", selectedItemId);
  };

  return (
    <div className="flex flex-col h-full">
      <Header
        title={noteData.title || "Без названия"}
        showBackButton={true}
        showMenuButton={true}
      />

      <div className="flex-1 overflow-y-auto p-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          {/* Название заметки */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <h1 className="text-xl font-semibold text-gray-900">
              {noteData.title || "Без названия"}
            </h1>
          </div>

          {/* Контент заметки */}
          <div className="whitespace-pre-wrap text-gray-800">
            {noteData.content || "Пустая заметка"}
          </div>
        </div>

        {noteData.updatedAt && (
          <p className="text-xs text-gray-400 mt-4 text-center">
            Изменено: {new Date(noteData.updatedAt).toLocaleString()}
          </p>
        )}
      </div>

      {/* Панель действий в конце */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex justify-center gap-4">
          <IconButton onClick={editCurrentNote} title="Редактировать">
            <Edit className="w-5 h-5 text-gray-600" />
          </IconButton>
          <IconButton onClick={handleDelete} title="Удалить">
            <Trash2 className="w-5 h-5 text-gray-600" />
          </IconButton>
          <IconButton onClick={handleShare} title="Поделиться">
            <Share className="w-5 h-5 text-gray-600" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default NoteView;
