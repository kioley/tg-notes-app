import { useState, useEffect } from "react";
import NoteCard from "../cards/NoteCard";
import SearchInput from "../ui/SearchInput";
import FloatingActionButton from "../ui/FloatingActionButton";
import { useAppStore, loadItems } from "../../store";
import type { iItem } from "../../types";
import Masonry from "react-layout-masonry";
import { Header } from "./ui/Header";
import { getCurrentFolderItems } from "../../store/slices/itemsSlice";
import { useShallow } from "zustand/shallow";

function ItemsList() {
  // const {
  //   isHighlightMode,
  //   highlightedIds,
  //   itemsByFolder,
  //   selectedFolderId,
  //   // folders,
  // } = useAppStore();

  const [searchQuery, setSearchQuery] = useState("");

  const selectedFolderId = useAppStore((state) => state.currentFolderId);
  const items = useAppStore(
    useShallow((state) => getCurrentFolderItems(state))
  );

  useEffect(() => {
    loadItems();
  }, []);

  // const selectedFolder = folders.find((f) => f.id === selectedFolderId) || null;
  const title = useAppStore(
    (state) =>
      state.folders.find((f) => f.id === selectedFolderId)?.name || "Заметки"
  );
  // Фильтрация заметок
  const filteredItems = items.filter(
    (item) =>
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNoteClick = (note: iItem) => {
    console.log("TODO: Открыть заметку", note);
  };

  const handleNoteDelete = (note: iItem) => {
    console.log("TODO: Удалить заметку", note);
  };

  const handleCreateNote = () => {
    console.log("TODO: Создать новую заметку");
  };

  return (
    // <div className="min-h-screen bg-gray-50 p-4">
    // <div className="w-full relative space-y-6 pb-20">
    <>
      {/* Шапка с кнопкой назад и меню */}
      <Header title={title} showBackButton={true} showMenuButton={true} />

      {/* Поиск */}
      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Поиск заметок..."
      />

      {/* Заметки */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            {searchQuery ? (
              <div>
                <p className="text-gray-500 mb-2">Заметки не найдены</p>
                <p className="text-gray-400 text-sm">
                  Попробуйте изменить поисковый запрос
                </p>
              </div>
            ) : (
              <div>
                <p className="text-gray-500 mb-4">
                  В этой папке пока нет заметок
                </p>
                <p className="text-gray-400 text-sm">
                  Нажмите кнопку ниже, чтобы создать первую заметку
                </p>
              </div>
            )}
          </div>
        ) : (
          <Masonry
            columns={{ 10: 1, 400: 2, 1024: 3, 1280: 4 }}
            gap={10}
            columnProps={{
              className: "masonry-column",
              style: { display: "flex", flexDirection: "column" },
            }}
          >
            {filteredItems.map((item) => (
              <NoteCard key={item.id} note={item} />
            ))}
          </Masonry>
        )}
      </div>

      {/* Плавающая кнопка */}
      <FloatingActionButton onClick={handleCreateNote} />
    </>
    // </div>
  );
}

export default ItemsList;

// onOpen={() => handleNoteClick(note)}
// onDelete={() => handleNoteDelete(note)}
// isHighlighted={
//   isHighlightMode && highlightedIds.includes(note.id)
// }
// onToggleHighlight={
//   isHighlightMode
//     ? () => console.log("TODO: toggleHighlight")
//     : undefined
// }
