import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { NicData } from '../../utilities/types/NIC/INicVerification';
import { nicApiService } from '../../services/nic/nicApiService';

export const useNicData = () => {
    const [nicData, setNicData] = useState<NicData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchNicData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await nicApiService.fetchNicData();
            console.log('API Response:', response);
            setNicData(response.data || response || []);
        } catch (error) {
            console.error('Error fetching NIC data:', error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch NIC data';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNicData();
    }, []);

    return {
        nicData,
        setNicData,
        isLoading,
        error,
        fetchNicData,
    };
};
