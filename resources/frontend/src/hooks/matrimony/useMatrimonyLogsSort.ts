import { useState, useMemo } from 'react';
import { MatrimonyLogData, UseMatrimonyLogsSort } from '../../utilities/types/Matrimony/IMatrimonyLogs';

export const useMatrimonyLogsSort = (filteredLogsData: MatrimonyLogData[]): UseMatrimonyLogsSort => {
    const [sortField, setSortField] = useState<string>('created_at');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

    const handleSort = (field: string) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const sortedLogsData = useMemo(() => {
        const sorted = [...filteredLogsData].sort((a, b) => {
            let aValue: any;
            let bValue: any;

            switch (sortField) {
                case 'matrimony_display_name':
                    aValue = a.matrimony_display_name.toLowerCase();
                    bValue = b.matrimony_display_name.toLowerCase();
                    break;
                case 'created_at':
                    aValue = new Date(a.created_at).getTime();
                    bValue = new Date(b.created_at).getTime();
                    break;
                default:
                    aValue = a[sortField as keyof MatrimonyLogData];
                    bValue = b[sortField as keyof MatrimonyLogData];
            }

            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

        return sorted;
    }, [filteredLogsData, sortField, sortDirection]);

    return {
        sortField,
        sortDirection,
        handleSort,
        sortedLogsData,
    };
};
