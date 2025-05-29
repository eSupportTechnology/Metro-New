import axios from 'axios';
import apiConfig from '../utilities/apiConfig';
import { NavigateFunction } from 'react-router-dom';

export const UserSignIn = async (email: string, password: string) => {
    try {
        const response = await axios.post(apiConfig.endpoints.signIn, { email, password });

        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId);
            localStorage.setItem('userRole', response.data.userRole);
            if (response.data.religion) {
                localStorage.setItem('religion', response.data.religion);
            }

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

export const sendOtp = async (phone: string, type: 'login' | 'register') => {
    try {
        const response = await axios.post(apiConfig.endpoints.phone.sendOtp, {
            phone,
            type,
        });
        return response.data;
    } catch (error: any) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error('Failed to send OTP. Please try again.');
    }
};

export const verifyOtp = async (phone: string, otp_code: string, type: 'login' | 'register') => {
    try {
        const response = await axios.post(apiConfig.endpoints.phone.verifyOtp, {
            phone,
            otp_code,
            type,
        });

        if (type === 'login' && response.data.access_token) {
            const authData = response.data;
            localStorage.setItem('token', authData.access_token);
            localStorage.setItem('userId', authData.user.id);
            localStorage.setItem('userRole', authData.user.role_as.toString());
            localStorage.setItem('firstName', authData.user.first_name);
            localStorage.setItem('lastName', authData.user.last_name);
            localStorage.setItem('email', authData.user.email);

            if (authData.religion) {
                localStorage.setItem('religion', authData.religion);
            }

            axios.defaults.headers.common['Authorization'] = `Bearer ${authData.access_token}`;
        }

        return response.data;
    } catch (error: any) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error('Invalid or expired OTP code.');
    }
};

export const phoneRegister = async (registrationData: {
    phone: string;
    otp_code: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
    religion: string;
}) => {
    try {
        const response = await axios.post(apiConfig.endpoints.phone.register, registrationData);

        if (response.data.access_token) {
            const authData = response.data;
            localStorage.setItem('token', authData.access_token);
            localStorage.setItem('userId', authData.user.id);
            localStorage.setItem('userRole', authData.user.role_as.toString());
            localStorage.setItem('firstName', authData.user.first_name);
            localStorage.setItem('lastName', authData.user.last_name);
            localStorage.setItem('email', authData.user.email);
            if (authData.religion) {
                localStorage.setItem('religion', authData.religion);
            } else if (registrationData.religion) {
                localStorage.setItem('religion', registrationData.religion);
            }

            axios.defaults.headers.common['Authorization'] = `Bearer ${authData.access_token}`;
        }

        return response.data;
    } catch (error: any) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        if (error.response?.data?.errors) {
            const errors = error.response.data.errors;
            const firstError = Object.values(errors)[0];
            throw new Error(Array.isArray(firstError) ? firstError[0] : firstError);
        }
        throw new Error('Registration failed. Please try again.');
    }
};

export const sendForgotPasswordOtp = async (phone: string) => {
    const response = await fetch(apiConfig.endpoints.forgotPassword.sendOtp, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Failed to send OTP');
    }

    return data;
};

export const verifyForgotPasswordOtp = async (phone: string, otpCode: string) => {
    const response = await fetch(apiConfig.endpoints.forgotPassword.verifyOtp, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            phone,
            otp_code: otpCode,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Failed to verify OTP');
    }

    return data;
};

export const resetForgotPassword = async (phone: string, otpCode: string, password: string, passwordConfirmation: string) => {
    const response = await fetch(apiConfig.endpoints.forgotPassword.reset, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            phone,
            otp_code: otpCode,
            password,
            password_confirmation: passwordConfirmation,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Failed to reset password');
    }

    return data;
};
export const logoutUser = async (navigate: NavigateFunction) => {
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
            localStorage.removeItem('email');
            localStorage.removeItem('firstName');
            localStorage.removeItem('lastName');
            localStorage.removeItem('phone');
            localStorage.removeItem('religion');
            navigate('/signin');
        }
    } catch (error) {
        console.error('Error logging out:', error);
    }
};
