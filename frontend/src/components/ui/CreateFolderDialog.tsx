import {
  useAppStore,
  setNewFolderName,
  saveFolder,
  closeCreateFolderDialog,
} from "../../store";
import ActionButton from "./ActionButton";
import ColorPicker from "./ColorPicker";
import BaseDialog from "./BaseDialog";

function CreateFolderDialog() {
  const { newFolderName, isSaving, currentDialog } = useAppStore();
  const isEditing = currentDialog === "editFolder";

  return (
    <BaseDialog onClose={closeCreateFolderDialog}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          {isEditing ? "Редактировать папку" : "Новая папка"}
        </h2>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Название папки
          </label>
          <input
            type="text"
            value={newFolderName || ""}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="Введите название..."
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
              isSaving ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSaving}
            autoFocus
          />
        </div>

        <ColorPicker />
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 flex gap-3">
        <ActionButton onClick={closeCreateFolderDialog} variant="secondary">
          Отмена
        </ActionButton>
        <ActionButton
          onClick={saveFolder}
          variant="primary"
          disabled={!newFolderName?.trim() || isSaving}
        >
          {isSaving ? "Сохранение..." : isEditing ? "Сохранить" : "Создать"}
        </ActionButton>
      </div>
    </BaseDialog>
  );
}

export default CreateFolderDialog;
