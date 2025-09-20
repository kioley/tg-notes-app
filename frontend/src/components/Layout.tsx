import { useAppStore } from '../store'
import FoldersList from './pages/FoldersList'
import ItemsList from './pages/ItemsList'
import NoteView from './pages/View'
import NoteEditor from './pages/Editor'
import FoldersButtons from './buttons/FoldersButtons'
import CreateFolderButtons from './buttons/CreateFolderButtons'
import NotesButtons from './buttons/NotesButtons'
import ViewButtons from './buttons/ViewButtons'
import EditButtons from './buttons/EditButtons'

function Layout() {
  const { currentView, showCreateForm } = useAppStore()
  
  const renderView = () => {
    switch (currentView) {
      case 'folders': return <FoldersList />
      case 'notes': return <ItemsList />
      case 'view': return <NoteView />
      case 'edit': return <NoteEditor />
      case 'createNote': return <NoteEditor />
      default: return <FoldersList />
    }
  }
  
  const renderButtons = () => {
    switch (currentView) {
      case 'folders': 
        return showCreateForm ? <CreateFolderButtons /> : <FoldersButtons />
      case 'notes': return <NotesButtons />
      case 'view': return <ViewButtons />
      case 'edit': return <EditButtons />
      case 'createNote': return <EditButtons />
      default: return null
    }
  }
  
  const buttons = renderButtons()
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex-1 overflow-hidden">
        {renderView()}
      </div>
      
      {buttons && (
        <div className="p-4 bg-white border-t flex gap-2">
          {buttons}
        </div>
      )}
    </div>
  )
}

export default Layout