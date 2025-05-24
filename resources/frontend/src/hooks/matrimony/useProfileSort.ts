import { useState, useMemo } from 'react';
import { MatrimonyProfile } from '../../utilities/types/Matrimony/IAdminMatrimonyView';

export const useProfileSort = (profiles: MatrimonyProfile[]) => {
    const [sortField, setSortField] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const handleSort = (field: string, direction?: 'asc' | 'desc') => {
        if (field === sortField && !direction) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection(direction || 'asc');
        }
    };

    const sortedProfiles = useMemo(() => {
        if (!sortField) return profiles;

        return [...profiles].sort((a, b) => {
            let aValue = a[sortField as keyof MatrimonyProfile];
            let bValue = b[sortField as keyof MatrimonyProfile];

            if (aValue === undefined || bValue === undefined) {
                return 0;
            }

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }

            if (sortField === 'birthdate' || sortField === 'created_at') {
                const dateA = aValue ? new Date(aValue as string).getTime() : 0;
                const dateB = bValue ? new Date(bValue as string).getTime() : 0;
                return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
            }
            if (aValue == null && bValue == null) {
                return 0;
            }
            if (aValue == null) {
                return sortDirection === 'asc' ? -1 : 1;
            }
            if (bValue == null) {
                return sortDirection === 'asc' ? 1 : -1;
            }

            if (sortDirection === 'asc') {
                return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
            } else {
                return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
            }
        });
    }, [profiles, sortField, sortDirection]);

    return {
        sortField,
        sortDirection,
        handleSort,
        sortedProfiles,
    };
};
