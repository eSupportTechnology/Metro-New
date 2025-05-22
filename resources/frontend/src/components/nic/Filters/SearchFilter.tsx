import React from 'react';
import { Search } from 'lucide-react';

interface SearchFilterProps {
    searchFilter: string;
    onSearchChange: (value: string) => void;
    placeholder?: string;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ searchFilter, onSearchChange, placeholder = 'Search by name, email, or NIC number...' }) => {
    return (
        <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="text"
                placeholder={placeholder}
                value={searchFilter}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
        </div>
    );
};

export default SearchFilter;
