import React from 'react';
import { X } from 'lucide-react';

interface AppliedFiltersProps {
    appliedFilters: string[];
    removeFilter: (filterName: string) => void;
    clearAllFilters: () => void;
}

const AppliedFilters: React.FC<AppliedFiltersProps> = ({ appliedFilters, removeFilter, clearAllFilters }) => {
    if (appliedFilters.length === 0) {
        return null;
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-700">Applied Filters</h3>
                <button onClick={clearAllFilters} className="text-xs text-yellow-600 hover:text-yellow-800">
                    Clear All
                </button>
            </div>
            <div className="flex flex-wrap gap-2">
                {appliedFilters.map((filter) => (
                    <div key={filter} className="flex items-center bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                        {filter}
                        <button onClick={() => removeFilter(filter)} className="ml-1 text-yellow-600 hover:text-yellow-800">
                            <X className="h-3 w-3" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AppliedFilters;
