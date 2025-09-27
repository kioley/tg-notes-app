import { useState } from "react";
import FolderCard from "../cards/FolderCard";
import SearchInput from "../ui/SearchInput";
import FloatingActionButton from "../ui/FloatingActionButton";
import CreateFolderDialog from "../ui/CreateFolderDialog";
import { useAppStore, loadFolders, openCreateFolderDialog } from "../../store";
import { ListHeader } from "./ui/ListHeader";

function FoldersList() {
  // Селекторы для оптимизации ререндеров
  const folders = useAppStore((state) => state.folders);
  const currentForm = useAppStore((state) => state.currentDialog);

  const [searchQuery, setSearchQuery] = useState("");

  // Загружаем папки
  loadFolders();

  // Фильтрация папок
  const filteredFolders = folders.filter((folder) =>
    folder.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    // <div className="w-full relative pb-20">
    <>
      {/* <div> */}
      {/* Заголовок */}
      <ListHeader title="Мои папки" />

      {/* Поиск */}
      <div className="mb-6">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Поиск папок..."
        />
      </div>

      {/* Папки */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        {filteredFolders.length === 0 ? (
          <div className="col-span-2 text-center py-12">
            {searchQuery ? (
              <div>
                <p className="text-gray-500 mb-2">Папки не найдены</p>
                <p className="text-gray-400 text-sm">
                  Попробуйте изменить поисковый запрос
                </p>
              </div>
            ) : (
              <div>
                <p className="text-gray-500 mb-4">У вас пока нет папок</p>
                <p className="text-gray-400 text-sm">
                  Нажмите кнопку ниже, чтобы создать первую папку
                </p>
              </div>
            )}
          </div>
        ) : (
          folders.map((folder) => (
            <FolderCard key={folder.id} folderId={folder.id} />
          ))
        )}
      </div>
      {/* </div> */}
      {/* Плавающая кнопка */}
      <FloatingActionButton
        onClick={openCreateFolderDialog}
        // className="fixed bottom-6"
      />

      {/* Диалог создания папки */}
      {currentForm === "createFolder" && <CreateFolderDialog />}
    </>
  );
}

export default FoldersList;
