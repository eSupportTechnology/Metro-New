import { useState, useMemo } from 'react';
import { MatrimonyProfile } from '../../utilities/types/Matrimony/IAdminMatrimonyView';
import { filterCategories } from '../../constants/matrimony/matrimonyConstants';

export const useProfileFilters = (profiles: MatrimonyProfile[]) => {
    const [searchFilter, setSearchFilter] = useState<string>('');
    const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});

    const toggleFilter = (category: string, value: string) => {
        setActiveFilters((prev) => {
            const currentValues = prev[category] || [];
            const newValues = currentValues.includes(value) ? currentValues.filter((v) => v !== value) : [...currentValues, value];

            return {
                ...prev,
                [category]: newValues.length > 0 ? newValues : [],
            };
        });
    };

    const clearAllFilters = () => {
        setSearchFilter('');
        setActiveFilters({});
    };

    const getActiveFiltersCount = () => {
        return Object.values(activeFilters).reduce((count, values) => count + values.length, 0);
    };

    const filteredProfiles = useMemo(() => {
        let result = [...profiles];

        if (searchFilter) {
            const lowerFilter = searchFilter.toLowerCase();
            result = result.filter(
                (profile) =>
                    profile.display_name?.toLowerCase().includes(lowerFilter) ||
                    profile.gender?.toLowerCase().includes(lowerFilter) ||
                    profile.profession?.toLowerCase().includes(lowerFilter) ||
                    profile.country_of_residence?.toLowerCase().includes(lowerFilter) ||
                    profile.religion?.toLowerCase().includes(lowerFilter) ||
                    profile.email?.toLowerCase().includes(lowerFilter),
            );
        }

        Object.entries(activeFilters).forEach(([category, values]) => {
            if (values.length > 0) {
                const categoryFilters = filterCategories.find((c) => c.name === category);

                if (categoryFilters && !categoryFilters.dynamic) {
                    const filtersToApply = categoryFilters.options.filter((option) => values.includes(option.value)).map((option) => option.filter);

                    if (filtersToApply.length > 0) {
                        result = result.filter((profile) => filtersToApply.some((filterFn) => filterFn(profile)));
                    }
                } else {
                    if (category === 'country') {
                        result = result.filter((profile) => values.includes(profile.country_of_residence || ''));
                    } else if (category === 'religion') {
                        result = result.filter((profile) => values.includes(profile.religion || ''));
                    }
                }
            }
        });

        return result;
    }, [profiles, searchFilter, activeFilters]);

    return {
        searchFilter,
        setSearchFilter,
        activeFilters,
        setActiveFilters,
        toggleFilter,
        clearAllFilters,
        getActiveFiltersCount,
        filteredProfiles,
    };
};
