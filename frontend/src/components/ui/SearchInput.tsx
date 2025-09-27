import { Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({ value, onChange, placeholder = "Поиск..." }: SearchInputProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full pl-10 pr-4 py-3 
          bg-gray-100 border-0 rounded-xl 
          text-gray-900 placeholder-gray-500
          focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 
          transition-all duration-200
        "
      />
    </div>
  );
}