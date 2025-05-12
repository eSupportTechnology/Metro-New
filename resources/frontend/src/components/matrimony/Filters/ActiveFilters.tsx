import React from 'react';
import { X } from 'lucide-react';
import { filterCategories, packageDetails } from '../../../constants/matrimony/matrimonyConstants';

interface ActiveFiltersProps {
    searchFilter: string;
    activeFilters: Record<string, string[]>;
    onClearSearchFilter: () => void;
    onToggleFilter: (category: string, value: string) => void;
    onClearAllFilters: () => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({ searchFilter, activeFilters, onClearSearchFilter, onToggleFilter, onClearAllFilters }) => {
    if (!searchFilter && !Object.values(activeFilters).some((values) => values.length > 0)) {
        return null;
    }

    return (
        <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>

            {searchFilter && (
                <div className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                    Search: {searchFilter}
                    <button onClick={onClearSearchFilter} className="ml-2 text-yellow-600 hover:text-yellow-800">
                        <X size={14} />
                    </button>
                </div>
            )}

            {Object.entries(activeFilters).map(([category, values]) =>
                values.map((value) => {
                    const categoryConfig = filterCategories.find((c) => c.name === category);
                    const optionConfig = categoryConfig?.options.find((o) => o.value === value);

                    if (!categoryConfig || !optionConfig) return null;

                    let bgColor = 'bg-gray-100';
                    let textColor = 'text-gray-800';

                    if (category === 'gender') {
                        bgColor = value === 'male' ? 'bg-blue-100' : 'bg-pink-100';
                        textColor = value === 'male' ? 'text-blue-800' : 'text-pink-800';
                    } else if (category === 'status') {
                        bgColor = value === 'active' ? 'bg-green-100' : 'bg-red-100';
                        textColor = value === 'active' ? 'text-green-800' : 'text-red-800';
                    } else if (category === 'featured') {
                        bgColor = value === 'featured' ? 'bg-yellow-100' : 'bg-gray-200';
                        textColor = value === 'featured' ? 'text-yellow-800' : 'text-gray-800';
                    } else if (category === 'package') {
                        const pkg = packageDetails[parseInt(value) as keyof typeof packageDetails];
                        if (pkg) {
                            bgColor = pkg.color.split(' ')[0];
                            textColor = pkg.color.split(' ')[1];
                        }
                    }

                    return (
                        <div key={`${category}-${value}`} className={`flex items-center px-3 py-1 rounded-full text-sm ${bgColor} ${textColor}`}>
                            {categoryConfig.label}: {optionConfig.label}
                            <button onClick={() => onToggleFilter(category, value)} className="ml-2 text-yellow-600 hover:text-yellow-800">
                                <X size={14} />
                            </button>
                        </div>
                    );
                }),
            )}

            <button onClick={onClearAllFilters} className="ml-2 text-xs text-yellow-600 hover:text-yellow-800 underline">
                Clear all
            </button>
        </div>
    );
};

export default ActiveFilters;
