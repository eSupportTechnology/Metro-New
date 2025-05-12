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

            if (aValue == null) aValue = '';
            if (bValue == null) bValue = '';

            if (sortField === 'date') {
                const dateA = aValue ? new Date(aValue as string).getTime() : 0;
                const dateB = bValue ? new Date(bValue as string).getTime() : 0;
                return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
            }

            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
            }

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }

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
