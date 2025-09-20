import { ReactNode } from 'react'

interface ActionButtonProps {
  onClick?: () => void
  children: ReactNode
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  className?: string
}

function ActionButton({ onClick, children, variant = 'primary', disabled = false, className = '' }: ActionButtonProps) {
  const baseClasses = "w-full p-4 rounded-lg flex items-center justify-center"
  const variants = {
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-200 text-gray-700"
  }
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${disabled ? 'opacity-50' : ''} ${className}`}
    >
      {children}
    </button>
  )
}

export default ActionButton