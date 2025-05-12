export type AuthState = {
    loading: boolean;
    userId: string;
    userRole: number;
    userToken: string;
    error: string | null;
    isAuthenticated: boolean;
};

const storedUserId = localStorage.getItem('userId') || '';
const storedUserRole = parseInt(localStorage.getItem('userRole') || '0', 10);
const storedToken = localStorage.getItem('token') || '';
const isAuthenticated = !!storedToken;

export const initialState: AuthState = {
    loading: false,
    userId: storedUserId,
    userRole: storedUserRole,
    userToken: storedToken,
    error: null,
    isAuthenticated,
};
