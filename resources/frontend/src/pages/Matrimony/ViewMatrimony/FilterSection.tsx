import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FilterOption } from '../../../utilities/types/Matrimony/IMatrimonyView';

interface FilterSectionProps {
    filter: FilterOption;
    activeFilters: Record<string, any>;
    setActiveFilters: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

const FilterSection: React.FC<FilterSectionProps> = ({ filter, activeFilters, setActiveFilters }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleFilterChange = (value: string | number | [number, number]) => {
        setActiveFilters((prev) => ({
            ...prev,
            [filter.name]: value,
        }));
    };

    return (
        <div className="border-t border-gray-200 py-3">
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-between w-full text-left">
                <div className="flex items-center">
                    {filter.icon}
                    <span className="text-gray-700 ml-2">{filter.name}</span>
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-500 transform ${isOpen ? 'rotate-180' : ''} transition-transform`} />
            </button>

            {isOpen && (
                <div className="mt-2 pl-6">
                    {filter.options ? (
                        <div className="space-y-1 max-h-40 overflow-y-auto">
                            <div key="empty" className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`${filter.name}-empty`}
                                    checked={activeFilters[filter.name] === ''}
                                    onChange={() => handleFilterChange('')}
                                    className="h-4 w-4 text-yellow-500 rounded"
                                />
                                <label htmlFor={`${filter.name}-empty`} className="ml-2 text-sm text-gray-700">
                                    All
                                </label>
                            </div>
                            {filter.options.map((option) => (
                                <div key={option} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`${filter.name}-${option}`}
                                        checked={activeFilters[filter.name] === option}
                                        onChange={() => handleFilterChange(option)}
                                        className="h-4 w-4 text-yellow-500 rounded"
                                    />
                                    <label htmlFor={`${filter.name}-${option}`} className="ml-2 text-sm text-gray-700">
                                        {option}
                                    </label>
                                </div>
                            ))}
                        </div>
                    ) : filter.min !== undefined && filter.max !== undefined ? (
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-gray-600">
                                <span>{filter.min}</span>
                                <span>{filter.max}</span>
                            </div>
                            <input
                                type="range"
                                min={filter.min}
                                max={filter.max}
                                value={activeFilters[filter.name] || filter.min}
                                onChange={(e) => handleFilterChange(parseInt(e.target.value))}
                                className="w-full accent-yellow-500"
                            />
                            <div className="text-center text-sm font-medium">{activeFilters[filter.name] || filter.min}</div>
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
};

export default FilterSection;
