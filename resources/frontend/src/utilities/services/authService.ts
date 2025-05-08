import axios from 'axios';

export const UserSignIn = async (email: string, password: string) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/sign-in', { email, password });

        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
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
    try {
        const response = await axios.post(
            'http://127.0.0.1:8000/api/logout',
            {},
            {
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
