import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchFilterProps {
    searchFilter: string;
    onSearchChange: (value: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ searchFilter, onSearchChange }) => {
    return (
        <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
            </div>
            <input
                type="text"
                placeholder="Search..."
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                value={searchFilter}
                onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchFilter && (
                <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600" onClick={() => onSearchChange('')}>
                    <X size={18} />
                </button>
            )}
        </div>
    );
};

export default SearchFilter;
