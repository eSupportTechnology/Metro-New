import { useState, useMemo } from 'react';
import { MatrimonyLogData, UseMatrimonyLogsFilters } from '../../utilities/types/Matrimony/IMatrimonyLogs';
import { getActionTypeFromDescription } from '../../utils/matrimonyLogsUtils';

export interface UseMatrimonyLogsFiltersUpdated extends UseMatrimonyLogsFilters {
    actionFilter: string;
    setActionFilter: (value: string) => void;
}

export const useMatrimonyLogsFilters = (logsData: MatrimonyLogData[]): UseMatrimonyLogsFiltersUpdated => {
    const [searchFilter, setSearchFilter] = useState<string>('');
    const [dateFromFilter, setDateFromFilter] = useState<string>('');
    const [dateToFilter, setDateToFilter] = useState<string>('');
    const [actionFilter, setActionFilter] = useState<string>('all');

    const filteredLogsData = useMemo(() => {
        return logsData.filter((log) => {
            const matchesSearch =
                searchFilter === '' ||
                log.matrimony_display_name?.toLowerCase().includes(searchFilter.toLowerCase()) ||
                log.description?.toLowerCase().includes(searchFilter.toLowerCase()) ||
                log.matrimony_id?.toLowerCase().includes(searchFilter.toLowerCase());

            let matchesDateRange = true;
            if (dateFromFilter || dateToFilter) {
                const logDate = new Date(log.created_at);
                const fromDate = dateFromFilter ? new Date(dateFromFilter) : null;
                const toDate = dateToFilter ? new Date(dateToFilter + ' 23:59:59') : null;

                if (fromDate && logDate < fromDate) {
                    matchesDateRange = false;
                }
                if (toDate && logDate > toDate) {
                    matchesDateRange = false;
                }
            }

            const matchesAction = actionFilter === 'all' || getActionTypeFromDescription(log.description) === actionFilter;

            return matchesSearch && matchesDateRange && matchesAction;
        });
    }, [logsData, searchFilter, dateFromFilter, dateToFilter, actionFilter]);

    const clearAllFilters = () => {
        setSearchFilter('');
        setDateFromFilter('');
        setDateToFilter('');
        setActionFilter('all');
    };

    const getActiveFiltersCount = () => {
        let count = 0;
        if (searchFilter !== '') count++;
        if (dateFromFilter !== '') count++;
        if (dateToFilter !== '') count++;
        if (actionFilter !== 'all') count++;
        return count;
    };

    return {
        searchFilter,
        setSearchFilter,
        dateFromFilter,
        setDateFromFilter,
        dateToFilter,
        setDateToFilter,
        actionFilter,
        setActionFilter,
        filteredLogsData,
        clearAllFilters,
        getActiveFiltersCount,
    };
};
