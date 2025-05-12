import { useState, useMemo } from 'react';
import { BlogPost } from '../../utilities/types/Blog/IBlog';

export const useBlogSort = (blogs: BlogPost[]) => {
    const [sortField, setSortField] = useState<string>('date');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

    const handleSort = (field: string, direction: 'asc' | 'desc') => {
        setSortField(field);
        setSortDirection(direction);
    };

    const sortedBlogs = useMemo(() => {
        if (!sortField) return blogs;

        return [...blogs].sort((a, b) => {
            let aValue = a[sortField as keyof BlogPost];
            let bValue = b[sortField as keyof BlogPost];

            // Handle date comparisons
            if (sortField === 'date') {
                const dateA = aValue ? new Date(aValue as string).getTime() : 0;
                const dateB = bValue ? new Date(bValue as string).getTime() : 0;
                return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
            }

            // Handle number comparisons
            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
            }

            // Handle string sorting
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }

            // General comparison
            if (sortDirection === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });
    }, [blogs, sortField, sortDirection]);

    return {
        sortField,
        sortDirection,
        handleSort,
        sortedBlogs,
    };
};
