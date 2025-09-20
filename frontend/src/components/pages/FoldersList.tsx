
import FolderItem from '../items/Folder'
import CreateFolderForm from '../ui/CreateFolderForm'
import { useAppStore } from '../../store'
import { useFolders } from '../../hooks'

function FoldersList() {
  const { selectFolder, showCreateForm } = useAppStore()
  const { data: folders = [] } = useFolders()
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {folders.map(folder => (
          <FolderItem key={folder.id} folder={folder} onClick={selectFolder} />
        ))}
      </div>

      {showCreateForm && <CreateFolderForm />}
    </div>
  )
}

export default FoldersList