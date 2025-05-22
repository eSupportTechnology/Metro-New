import React from 'react';
import { FileX, Filter, Search } from 'lucide-react';

interface EmptyStateProps {
    hasFilters: boolean;
    onClearFilters: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ hasFilters, onClearFilters }) => {
    return (
        <tr>
            <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                <div className="flex flex-col items-center">
                    <Search size={24} className="text-gray-400 mb-2" />
                    <p className="mb-2">No NICs found</p>
                    {hasFilters && (
                        <button onClick={onClearFilters} className="text-yellow-600 hover:text-yellow-800 text-sm underline">
                            Clear all filters
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );
};

export default EmptyState;
