import { ReactNode } from "react";

interface BaseDialogProps {
  onClose?: () => void;
  className?: string;
  contentClassName?: string;
  children: ReactNode;
}

export default function BaseDialog({
  onClose,
  className = "",
  contentClassName = "",
  children,
}: BaseDialogProps) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${className}`}
    >
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-200"
        onClick={onClose}
      />
      <div
        className={`relative bg-white rounded-lg shadow-xl w-full max-w-sm transform transition-all duration-200 ${contentClassName}`}
      >
        {children}
      </div>
    </div>
  );
}
