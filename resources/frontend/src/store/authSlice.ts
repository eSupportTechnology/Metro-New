import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../utilities/types/auth';

const storedUserId = localStorage.getItem('userId') || '';
const storedUserRole = parseInt(localStorage.getItem('userRole') || '0', 10);
const storedToken = localStorage.getItem('token') || '';
const storedFirstName = localStorage.getItem('firstName') || '';
const storedLastName = localStorage.getItem('lastName') || '';
const storedEmail = localStorage.getItem('email') || '';
const isAuthenticated = !!storedToken;

export const initialState: AuthState = {
    loading: false,
    userId: storedUserId,
    userRole: storedUserRole,
    userToken: storedToken,
    firstName: storedFirstName,
    lastName: storedLastName,
    email: storedEmail,
    error: null,
    isAuthenticated,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (
            state,
            action: PayloadAction<{
                userId: string;
                userRole: number;
                token: string;
                firstName: string;
                lastName: string;
                email: string;
            }>,
        ) => {
            const { userId, userRole, token, firstName, lastName, email } = action.payload;

            state.userId = userId;
            state.userRole = userRole;
            state.userToken = token;
            state.firstName = firstName;
            state.lastName = lastName;
            state.email = email;
            state.isAuthenticated = true;

            localStorage.setItem('userId', userId);
            localStorage.setItem('userRole', String(userRole));
            localStorage.setItem('token', token);
            localStorage.setItem('firstName', firstName);
            localStorage.setItem('lastName', lastName);
            localStorage.setItem('email', email);
        },
        logout: (state) => {
            state.userId = '';
            state.userRole = 0;
            state.userToken = '';
            state.firstName = '';
            state.lastName = '';
            state.email = '';
            state.isAuthenticated = false;

            localStorage.removeItem('userId');
            localStorage.removeItem('userRole');
            localStorage.removeItem('token');
            localStorage.removeItem('firstName');
            localStorage.removeItem('lastName');
            localStorage.removeItem('email');
        },
    },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
