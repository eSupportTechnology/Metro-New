import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { filterCategories, packageDetails } from '../../../constants/matrimony/matrimonyConstants';

interface AdvancedFilterDropdownProps {
    activeFilters: Record<string, string[]>;
    onToggleFilter: (category: string, value: string) => void;
    onClearAllFilters: () => void;
    getActiveFiltersCount: () => number;
    filterOptions?: {
        educations: string[];
        genders: string[];
    };
}

const AdvancedFilterDropdown: React.FC<AdvancedFilterDropdownProps> = ({ activeFilters, onToggleFilter, onClearAllFilters, getActiveFiltersCount, filterOptions }) => {
    const [isOpen, setIsOpen] = useState(false);

    const getFilterCategory = (categoryName: string) => {
        const category = filterCategories.find((c) => c.name === categoryName);

        if (!category) return null;
        if (category.dynamic) {
            if (categoryName === 'education' && filterOptions?.educations) {
                return {
                    ...category,
                    options: filterOptions.educations.map((education) => ({
                        value: education,
                        label: education,
                        filter: (profile: any) => profile.education_level === education,
                    })),
                };
            } else if (categoryName === 'gender' && filterOptions?.genders) {
                return {
                    ...category,
                    options: filterOptions.genders.map((gender) => ({
                        value: gender,
                        label: gender,
                        filter: (profile: any) => profile.gender === gender,
                    })),
                };
            }
        }

        return category;
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                    getActiveFiltersCount() > 0 ? 'bg-yellow-400 text-yellow-900' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
            >
                <Filter size={16} className="mr-2" />
                Filters
                {getActiveFiltersCount() > 0 && <span className="ml-2 bg-white text-yellow-800 rounded-full w-5 h-5 flex items-center justify-center text-xs">{getActiveFiltersCount()}</span>}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-10 p-4">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-sm font-medium text-gray-700">Advanced Filters</h3>
                        <button onClick={onClearAllFilters} className="text-xs text-yellow-600 hover:text-yellow-800">
                            Clear all
                        </button>
                    </div>

                    {filterCategories.map((categoryConfig) => {
                        const category = getFilterCategory(categoryConfig.name);

                        if (!category || category.options.length === 0) return null;

                        return (
                            <div key={category.name} className="mb-3">
                                <label className="block text-xs font-medium text-gray-700 mb-1">{category.label}</label>
                                <div className="flex flex-wrap gap-2">
                                    {category.options.map((option) => {
                                        const isActive = (activeFilters[category.name] || []).includes(option.value);
                                        let buttonClasses = 'px-3 py-1 text-xs rounded-full ';

                                        if (isActive) {
                                            if (category.name === 'gender') {
                                                buttonClasses += option.value === 'male' ? 'bg-blue-100 text-blue-800 border border-blue-300' : 'bg-pink-100 text-pink-800 border border-pink-300';
                                            } else if (category.name === 'status') {
                                                buttonClasses += option.value === 'active' ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-100 text-red-800 border border-red-300';
                                            } else if (category.name === 'featured') {
                                                buttonClasses +=
                                                    option.value === 'featured' ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' : 'bg-gray-200 text-gray-800 border border-gray-300';
                                            } else if (category.name === 'package') {
                                                const pkg = packageDetails[parseInt(option.value) as keyof typeof packageDetails];
                                                if (pkg) {
                                                    buttonClasses += `${pkg.color} border ${pkg.borderColor}`;
                                                }
                                            } else {
                                                buttonClasses += 'bg-yellow-100 text-yellow-800 border border-yellow-300';
                                            }
                                        } else {
                                            buttonClasses += 'bg-gray-100 text-gray-700 hover:bg-gray-200';
                                        }

                                        return (
                                            <button key={option.value} onClick={() => onToggleFilter(category.name, option.value)} className={buttonClasses}>
                                                {option.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}

                    <div className="mt-4 pt-2 border-t border-gray-100">
                        <button onClick={() => setIsOpen(false)} className="w-full px-3 py-2 bg-yellow-400 text-gray-800 rounded-md text-xs font-medium hover:bg-yellow-500">
                            Apply Filters
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdvancedFilterDropdown;
