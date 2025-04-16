import { useState } from 'react';

type SortOption = {
  label: string;
  value: string;
};

interface SortDropdownProps {
  currentSort: string;
  handleSort: (value: string) => void;
  sortOptions: SortOption[];
}

const SortDropdown = ({ currentSort, handleSort, sortOptions }: SortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel =
    sortOptions.find((option) => option.value === currentSort)?.label || 'Sort By';

  return (
    <div className="relative inline-block text-left ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-zinc-100 w-40 text-left"
      >
        {selectedLabel}
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-40 bg-white rounded-xl shadow z-10 ring-1 ring-black ring-opacity-5">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                handleSort(option.value);
                setIsOpen(false);
              }}
              className="block w-full px-4 py-2 text-sm text-gray-700 text-left hover:bg-zinc-700 hover:text-white transition-all"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
