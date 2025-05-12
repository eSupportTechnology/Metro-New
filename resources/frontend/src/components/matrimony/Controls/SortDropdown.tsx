import React, { useState } from 'react';
import { ArrowDown, CheckCircle } from 'lucide-react';

interface SortOption {
    field: string;
    direction: 'asc' | 'desc';
    label: string;
}

interface SortDropdownProps {
    sortField: string;
    sortDirection: 'asc' | 'desc';
    sortOptions: SortOption[];
    onSort: (field: string, direction?: 'asc' | 'desc') => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ sortField, sortDirection, sortOptions, onSort }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSort = (field: string, direction: 'asc' | 'desc') => {
        onSort(field, direction);
        setIsOpen(false);
    };

    const currentSort = sortOptions.find((option) => option.field === sortField && option.direction === sortDirection);

    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-sm">
                <ArrowDown size={16} className="mr-2" />
                Sort
                {currentSort && <span className="ml-1 px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-xs">{currentSort.label}</span>}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10">
                    <div className="py-1">
                        {sortOptions.map((option, index) => (
                            <button key={index} className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-50" onClick={() => handleSort(option.field, option.direction)}>
                                {option.field === sortField && option.direction === sortDirection ? <CheckCircle size={14} className="mr-2 text-yellow-600" /> : <div className="w-4 h-4 mr-2" />}
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SortDropdown;
