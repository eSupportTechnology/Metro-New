export type AuthState = {
    loading: boolean;
    userId: string;
    userRole: number;
    userToken: string;
    error: string | null;
    isAuthenticated: boolean;
};

export const initialState: AuthState = {
    loading: false,
    userId: '',
    userRole: 0,
    userToken: '',
    error: null,
    isAuthenticated: false,
};
