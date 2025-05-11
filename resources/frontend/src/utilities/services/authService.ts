import axios from 'axios';
import apiConfig from '../apiConfig';

export const UserSignIn = async (email: string, password: string) => {
    try {
        const response = await axios.post(apiConfig.endpoints.signIn, { email, password });

        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId);
            localStorage.setItem('userRole', response.data.userRole);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        }

        return response.data;
    } catch (error: any) {
        if (error.response?.status === 401) {
            throw new Error('Unauthorized');
        }
        throw error;
    }
};

export const logoutUser = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('No authentication token found');
        return;
    }

    try {
        const response = await axios.post(
            apiConfig.endpoints.logout,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            },
        );

        if (response.data.status === 'success') {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('userRole');
            window.location.href = '/signin';
        }
    } catch (error) {
        console.error('Error logging out:', error);
    }
};
