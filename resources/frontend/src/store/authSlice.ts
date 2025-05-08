import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from '../utilities/types/auth';

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<{ userId: string; userRole: number; token: string }>) => {
            state.userId = action.payload.userId;
            state.userRole = action.payload.userRole;
            state.userToken = action.payload.token;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.userId = '';
            state.userRole = 0;
            state.userToken = '';
            state.isAuthenticated = false;
            localStorage.removeItem('token');
        },
    },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
