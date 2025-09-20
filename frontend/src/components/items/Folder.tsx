import type { Folder } from '../../types'

interface FolderItemProps {
  folder: Folder
  onClick: (folder: Folder) => void
}

function FolderItem({ folder, onClick }: FolderItemProps) {
  return (
    <div 
      onClick={() => onClick(folder)}
      className="p-4 mb-2 bg-white rounded-lg shadow-sm border cursor-pointer hover:bg-gray-50 flex items-center"
    >
      <div className="text-2xl mr-3">📁</div>
      <div className="flex-1">
        <h3 className="font-medium">{folder.name}</h3>
        <p className="text-sm text-gray-500">{folder.notesCount || 0} заметок</p>
      </div>
    </div>
  )
}

export default FolderItem