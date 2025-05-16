import { useState, useMemo } from 'react';
import { BlogPost } from '../../utilities/types/Blog/IBlog';
import { filterCategories } from '../../constants/blog/blogConstants';

interface FilterOption {
    value: string;
    label: string;
    filter: (blog: BlogPost) => boolean;
}

interface FilterCategory {
    name: string;
    label: string;
    options: FilterOption[];
}

export const useBlogFilters = (blogs: BlogPost[]) => {
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

    const filteredBlogs = useMemo(() => {
        let result = [...blogs];
        if (searchFilter) {
            const lowerFilter = searchFilter.toLowerCase();
            result = result.filter(
                (blog) =>
                    blog.title.toLowerCase().includes(lowerFilter) ||
                    blog.description.toLowerCase().includes(lowerFilter) ||
                    blog.writer.toLowerCase().includes(lowerFilter) ||
                    blog.category.toLowerCase().includes(lowerFilter),
            );
        }

        Object.entries(activeFilters).forEach(([category, values]) => {
            if (values.length > 0) {
                const categoryFilters = (filterCategories as FilterCategory[]).find((c) => c.name === category);
                if (categoryFilters && categoryFilters.options) {
                    const filtersToApply = categoryFilters.options.filter((option: FilterOption) => values.includes(option.value)).map((option: FilterOption) => option.filter);

                    if (filtersToApply.length > 0) {
                        result = result.filter((blog) => filtersToApply.some((filterFn: (blog: BlogPost) => boolean) => filterFn(blog)));
                    }
                }
            }
        });

        return result;
    }, [blogs, searchFilter, activeFilters]);

    return {
        searchFilter,
        setSearchFilter,
        activeFilters,
        setActiveFilters,
        toggleFilter,
        clearAllFilters,
        getActiveFiltersCount,
        filteredBlogs,
    };
};
