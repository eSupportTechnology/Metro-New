import axios from 'axios';
import apiConfig from '../../utilities/apiConfig';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No authentication token found');
    }
    return {
        Authorization: `Bearer ${token}`,
    };
};

const handleAuthError = (error: any) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        throw new Error('Authentication expired. Please login again.');
    }
    throw error;
};

export const nicApiService = {
    fetchNicData: async () => {
        try {
            const response = await axios.get(apiConfig.endpoints.nic.list, {
                headers: getAuthHeaders(),
            });
            return response.data;
        } catch (error) {
            handleAuthError(error);
        }
    },

    verifyNic: async (nicNumber: string) => {
        try {
            const response = await axios.post(
                apiConfig.endpoints.nic.verify(nicNumber),
                {},
                {
                    headers: getAuthHeaders(),
                },
            );
            return response.data;
        } catch (error) {
            handleAuthError(error);
        }
    },

    rejectNic: async (nicNumber: string) => {
        try {
            const response = await axios.post(
                apiConfig.endpoints.nic.reject(nicNumber),
                {},
                {
                    headers: getAuthHeaders(),
                },
            );
            return response.data;
        } catch (error) {
            handleAuthError(error);
        }
    },
};
