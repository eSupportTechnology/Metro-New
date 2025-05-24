export interface MatrimonyLogData {
    id: string;
    matrimony_id: string;
    matrimony_display_name: string;
    description: string;
    created_at: string;
}

export interface MatrimonyLogTableRowProps {
    logData: MatrimonyLogData;
    onViewDetails: (log: MatrimonyLogData) => void;
}

export interface UseMatrimonyLogsData {
    logsData: MatrimonyLogData[];
    setLogsData: React.Dispatch<React.SetStateAction<MatrimonyLogData[]>>;
    isLoading: boolean;
    error: string | null;
    fetchLogsData: () => Promise<void>;
}

export interface UseMatrimonyLogsFilters {
    searchFilter: string;
    setSearchFilter: (value: string) => void;
    dateFromFilter: string;
    setDateFromFilter: (value: string) => void;
    dateToFilter: string;
    setDateToFilter: (value: string) => void;
    actionFilter: string;
    setActionFilter: (value: string) => void;
    filteredLogsData: MatrimonyLogData[];
    clearAllFilters: () => void;
    getActiveFiltersCount: () => number;
}

export interface UseMatrimonyLogsSort {
    sortField: string;
    sortDirection: 'asc' | 'desc';
    handleSort: (field: string) => void;
    sortedLogsData: MatrimonyLogData[];
}

export type ActionSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface PackageInfo {
    packageNumber?: string;
    action?: string;
}

export interface LogAnalytics {
    totalLogs: number;
    actionTypes: Record<string, number>;
    severityDistribution: Record<ActionSeverity, number>;
    packageActions: Record<string, number>;
    timeRangeStats: {
        today: number;
        thisWeek: number;
        thisMonth: number;
    };
}
