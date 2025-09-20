
import FolderItem from '../items/FolderItem'
import CreateFolderForm from '../ui/CreateFolderForm'
import PageHeader from '../ui/PageHeader'
import { useAppStore } from '../../store'
import { useFolders } from '../../api'

function FoldersList() {
  const { showCreateForm } = useAppStore()
  const { data: folders = [] } = useFolders()
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        <PageHeader 
          title="Мои папки"
          icon="📁"
        />
        
        {folders.map(folder => (
          <FolderItem key={folder.id} folder={folder} />
        ))}
      </div>

      {showCreateForm && <CreateFolderForm />}
    </div>
  )
}

export default FoldersList