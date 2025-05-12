import { useState, useMemo } from 'react';
import { BlogPost } from '../../utilities/types/Blog/IBlog';
import { filterCategories } from '../../constants/blog/blogConstants';

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

        // Apply text search
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

        // Apply category filters
        Object.entries(activeFilters).forEach(([category, values]) => {
            if (values.length > 0) {
                const categoryFilters = filterCategories.find((c) => c.name === category);
                if (categoryFilters) {
                    const filtersToApply = categoryFilters.options.filter((option) => values.includes(option.value)).map((option) => option.filter);

                    if (filtersToApply.length > 0) {
                        result = result.filter((blog) => filtersToApply.some((filterFn) => filterFn(blog)));
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
