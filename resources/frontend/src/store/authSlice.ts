import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from '../utilities/types/auth';

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<{ userId: string; userRole: number; token: string }>) => {
            const { userId, userRole, token } = action.payload;

            state.userId = userId;
            state.userRole = userRole;
            state.userToken = token;
            state.isAuthenticated = true;
            localStorage.setItem('userId', userId);
            localStorage.setItem('userRole', String(userRole));
            localStorage.setItem('token', token);
        },
        logout: (state) => {
            state.userId = '';
            state.userRole = 0;
            state.userToken = '';
            state.isAuthenticated = false;
            localStorage.removeItem('userId');
            localStorage.removeItem('userRole');
            localStorage.removeItem('token');
        },
    },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
