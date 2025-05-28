import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { DashboardStats, MonthlyStats } from '../../utilities/types/dashboard/IDashboard';
import dashboardApiService from '../../utilities/types/dashboard/dashboardApi';

export const useDashboard = () => {
    const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
    const [monthlyStats, setMonthlyStats] = useState<MonthlyStats | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    const fetchDashboardStats = useCallback(async (showToast = false) => {
        try {
            setError(null);
            const response = await dashboardApiService.getDashboardStats();

            if (response.status === 'success') {
                setDashboardStats(response.data);
                setLastUpdated(new Date());

                if (showToast) {
                    toast.success('Dashboard data refreshed successfully');
                }
            } else {
                throw new Error('Failed to fetch dashboard statistics');
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch dashboard data';
            setError(errorMessage);

            if (showToast) {
                toast.error(errorMessage);
            }
            console.error('Dashboard stats error:', err);
        }
    }, []);

    const fetchMonthlyStats = useCallback(async (showToast = false) => {
        try {
            const response = await dashboardApiService.getMonthlyStats();

            if (response.status === 'success') {
                setMonthlyStats(response.data);
            } else {
                throw new Error('Failed to fetch monthly statistics');
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch monthly data';

            if (showToast) {
                toast.error(errorMessage);
            }
            console.error('Monthly stats error:', err);
        }
    }, []);

    const fetchAllData = useCallback(
        async (showToast = false) => {
            setIsLoading(true);

            try {
                await Promise.all([fetchDashboardStats(showToast), fetchMonthlyStats(showToast)]);
            } catch (err) {
                console.error('Error fetching all dashboard data:', err);
            } finally {
                setIsLoading(false);
            }
        },
        [fetchDashboardStats, fetchMonthlyStats],
    );

    const refreshData = useCallback(async () => {
        setIsRefreshing(true);
        await fetchAllData(true);
        setIsRefreshing(false);
    }, [fetchAllData]);

    useEffect(() => {
        const interval = setInterval(
            () => {
                if (!isLoading && !isRefreshing) {
                    fetchAllData(false);
                }
            },
            5 * 60 * 1000,
        ); // 5 minutes

        return () => clearInterval(interval);
    }, [fetchAllData, isLoading, isRefreshing]);

    useEffect(() => {
        fetchAllData(false);
    }, [fetchAllData]);

    const getTimeSinceLastUpdate = useCallback((): string => {
        if (!lastUpdated) return 'Never';

        const now = new Date();
        const diffInMinutes = Math.floor((now.getTime() - lastUpdated.getTime()) / (1000 * 60));

        if (diffInMinutes < 1) return 'Just now';
        if (diffInMinutes === 1) return '1 minute ago';
        if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;

        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours === 1) return '1 hour ago';
        if (diffInHours < 24) return `${diffInHours} hours ago`;

        return lastUpdated.toLocaleDateString();
    }, [lastUpdated]);

    return {
        dashboardStats,
        monthlyStats,
        isLoading,
        isRefreshing,
        error,
        refreshData,
        fetchAllData,
        lastUpdated,
        getTimeSinceLastUpdate,
    };
};
