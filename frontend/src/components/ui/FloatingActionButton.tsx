import { Plus } from "lucide-react";

interface FloatingActionButtonProps {
  onClick: () => void;
}

export default function FloatingActionButton({
  onClick,
}: FloatingActionButtonProps) {
  return (
    <div
      className="fixed bottom-0 z-50 m-5"
      style={{ right: "max(0px, calc(50vw - 28rem))" }}
    >
      <button
        onClick={onClick}
        className="
      w-14 h-14 bg-theme-primary hover:bg-button-hover
      rounded-full shadow-lg hover:shadow-xl
      flex items-center justify-center
      transition-all duration-200 hover:scale-105
    "
      >
        <Plus className="w-6 h-6 text-theme-text" />
      </button>
    </div>
  );
}
