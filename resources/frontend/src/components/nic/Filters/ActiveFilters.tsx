import React from 'react';
import { X } from 'lucide-react';

interface ActiveFiltersProps {
    searchFilter: string;
    statusFilter: string;
    onClearSearchFilter: () => void;
    onClearStatusFilter: () => void;
    onClearAllFilters: () => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({ searchFilter, statusFilter, onClearSearchFilter, onClearStatusFilter, onClearAllFilters }) => {
    const hasActiveFilters = searchFilter !== '' || statusFilter !== 'all';

    if (!hasActiveFilters) return null;

    const getStatusText = (status: string) => {
        switch (status) {
            case '0':
                return 'Pending';
            case '1':
                return 'Approved';
            case '2':
                return 'Rejected';
            default:
                return status;
        }
    };

    return (
        <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>

            {searchFilter && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Search: "{searchFilter}"
                    <button onClick={onClearSearchFilter} className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200">
                        <X size={12} />
                    </button>
                </span>
            )}

            {statusFilter !== 'all' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Status: {getStatusText(statusFilter)}
                    <button onClick={onClearStatusFilter} className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-green-200">
                        <X size={12} />
                    </button>
                </span>
            )}

            <button onClick={onClearAllFilters} className="text-xs text-gray-500 hover:text-gray-700 underline">
                Clear all
            </button>
        </div>
    );
};

export default ActiveFilters;
