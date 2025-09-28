import { useAppStore } from "./store";
import FoldersList from "./components/pages/FoldersList";
import ItemsList from "./components/pages/ItemsList";
import NoteView from './components/pages/View';
// import NoteEditor from './components/pages/Editor';
import MessageDialog from "./components/ui/MessageDialog";

function App() {
  const { currentView, currentDialog, messageText } = useAppStore();

  const renderView = () => {
    switch (currentView) {
      case "folders":
        return <FoldersList />;
      case "notes":
        return <ItemsList />;
      case "view":
        return <NoteView />;
      // case "edit":
      //   return <NoteEditor />;
      // case "createNote":
      //   return <NoteEditor />;
      // default:
      //   return <FoldersList />;
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto bg-white min-h-screen">
      <div className="flex gap-3 flex-col pb-20">
        {renderView()}
        {currentDialog === "errorDialog" && (
          <MessageDialog message={messageText ?? ""} title="Ошибка" />
        )}
      </div>
    </div>
  );
}

export default App;
