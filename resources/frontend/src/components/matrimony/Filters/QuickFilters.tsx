import React from 'react';
import { ChevronDown } from 'lucide-react';
import { FilterOptions } from '../../../utilities/types/Matrimony/IAdminMatrimonyView';

interface QuickFiltersProps {
    filterOptions: FilterOptions;
    onQuickFilterSelect: (category: string, value: string) => void;
}

const QuickFilters: React.FC<QuickFiltersProps> = ({ filterOptions, onQuickFilterSelect }) => {
    return (
        <>
            {filterOptions.countries.length > 0 && (
                <div className="relative">
                    <select
                        className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent cursor-pointer"
                        onChange={(e) => e.target.value && onQuickFilterSelect('country', e.target.value)}
                        value=""
                    >
                        <option value="">Filter by country</option>
                        {filterOptions.countries.map((country) => (
                            <option key={country} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <ChevronDown size={16} />
                    </div>
                </div>
            )}

            {filterOptions.religions.length > 0 && (
                <div className="relative">
                    <select
                        className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent cursor-pointer"
                        onChange={(e) => e.target.value && onQuickFilterSelect('religion', e.target.value)}
                        value=""
                    >
                        <option value="">Filter by religion</option>
                        {filterOptions.religions.map((religion) => (
                            <option key={religion} value={religion}>
                                {religion}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <ChevronDown size={16} />
                    </div>
                </div>
            )}
        </>
    );
};

export default QuickFilters;
