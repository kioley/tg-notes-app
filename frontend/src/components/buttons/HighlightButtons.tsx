import { useAppStore } from "../../store";
import ActionButton from "../ui/Button";
import { useDeleteFolders } from "../../api/folders/useDeleteFolders";
import { useDeleteItems } from "../../api/items/useDeleteItems";

function HighlightButtons() {
  const { exitHighlightMode, highlightedIds, currentView, selectedFolder } = useAppStore();
  
  const { deleteFolders } = useDeleteFolders();
  const { deleteItems } = useDeleteItems();

  const getItemType = () => {
    return currentView === "folders" ? "папки" : "записи";
  };

  const handleDelete = async () => {
    if (highlightedIds.length === 0) return;
    
    try {
      if (currentView === "folders") {
        await deleteFolders(highlightedIds);
      } else if (currentView === "notes") {
        if (!selectedFolder) {
          console.error('No selected folder for deleting items');
          return;
        }
        await deleteItems(highlightedIds, selectedFolder.id);
      }
      
      // Exit highlight mode after successful deletion
      exitHighlightMode();
    } catch (error) {
      console.error("Error deleting items:", error);
      // TODO: Show error to user
    }
  };

  return (
    <>
      <ActionButton onClick={exitHighlightMode} variant="secondary">
        Отмена
      </ActionButton>
      <ActionButton
        onClick={handleDelete}
        variant="primary"
        disabled={highlightedIds.length === 0}
      >
        Удалить {getItemType()} ({highlightedIds.length})
      </ActionButton>
    </>
  );
}

export default HighlightButtons;
