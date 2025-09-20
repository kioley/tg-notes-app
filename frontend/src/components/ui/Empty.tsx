interface EmptyStateProps {
  title: string
  subtitle?: string
}

function EmptyState({ title, subtitle }: EmptyStateProps) {
  return (
    <div className="text-center text-gray-500 mt-8">
      <p>{title}</p>
      {subtitle && <p className="text-sm">{subtitle}</p>}
    </div>
  )
}

export default EmptyState