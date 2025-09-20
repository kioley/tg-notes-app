import { useAppStore } from '../../store'
import type { Folder } from '../../types'
import SelectableItem from './SelectableItem'

interface FolderItemProps {
  folder: Folder

}

function FolderItem({ folder }: FolderItemProps) {
  const { selectFolder } = useAppStore()
  return (
    <SelectableItem 
      id={folder.id}
      onClick={() => selectFolder(folder)}
      className="flex items-center"
    >
      <div className="text-2xl mr-3">📁</div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium line-clamp-2">{folder.name}</h3>
        <p className="text-sm text-gray-500">{folder.notesCount || 0} заметок</p>
      </div>
    </SelectableItem>
  )
}

export default FolderItem