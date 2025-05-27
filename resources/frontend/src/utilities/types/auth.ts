export interface AuthState {
    loading: boolean;
    userId: string;
    userRole: number;
    userToken: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    error: string | null;
    isAuthenticated: boolean;
}

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
