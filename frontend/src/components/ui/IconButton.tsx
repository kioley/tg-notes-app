import { ReactNode } from "react";

interface IconButtonProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
  title?: string;
}

export default function IconButton({
  children,
  onClick,
  className = "",
  title,
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-xl bg-white hover:bg-gray-50 transition-colors ${className}`}
      title={title}
    >
      {children}
    </button>
  );
}
