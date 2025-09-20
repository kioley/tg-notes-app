import PageMenu from './PageMenu'

interface PageHeaderProps {
  title: string
  icon?: string
}

function PageHeader({ title, icon }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-200">
      <h1 className="text-xl font-semibold text-gray-900 truncate flex-1 mr-4">
        {icon && <span className="mr-2 flex-shrink-0">{icon}</span>}
        <span className="truncate">{title}</span>
      </h1>
      
      <div className="flex-shrink-0">
        <PageMenu />
      </div>
    </div>
  )
}

export default PageHeader