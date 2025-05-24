import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { MatrimonyLogData, UseMatrimonyLogsData } from '../../utilities/types/Matrimony/IMatrimonyLogs';
import apiConfig from '../../utilities/apiConfig';

export const useMatrimonyLogsData = (): UseMatrimonyLogsData => {
    const [logsData, setLogsData] = useState<MatrimonyLogData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchLogsData = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            const token = localStorage.getItem('authToken');
            const response = await fetch(apiConfig.endpoints.matrimonyLogs.list, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.status === 'success') {
                setLogsData(result.data || []);
            } else {
                throw new Error(result.message || 'Failed to fetch matrimony logs');
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
            setError(errorMessage);
            toast.error(`Failed to fetch matrimony logs: ${errorMessage}`);
            console.error('Error fetching matrimony logs:', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLogsData();
    }, [fetchLogsData]);

    return {
        logsData,
        setLogsData,
        isLoading,
        error,
        fetchLogsData,
    };
};
