import { useAppStore, setSelectedColor } from "../../store";
import { CARD_COLOR_NAMES } from "../../constants/colors";

function ColorPicker() {
  const { selectedColor, isSaving } = useAppStore();

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Цвет папки
      </label>
      <div className="flex flex-wrap gap-3">
        {CARD_COLOR_NAMES.map((color) => (
          <button
            key={color}
            type="button"
            disabled={isSaving}
            className={`w-8 h-8 rounded-full border-2 transition-all ${
              selectedColor === color
                ? "border-gray-900 scale-110"
                : "border-transparent hover:scale-105"
            } ${
              isSaving ? "opacity-50 cursor-not-allowed" : ""
            } bg-${color}-400`}
            onClick={() => setSelectedColor(color)}
          >
            <span className="sr-only">{color}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ColorPicker;
