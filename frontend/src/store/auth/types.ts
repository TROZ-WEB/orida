import { GlobalActionTypes } from '@store/_global/types';

export const LOGOUT = 'LOGOUT';
export const SIGN_OUT = 'SIGN_OUT';
export const LOGIN = 'LOGIN';

export interface Login {
    type: typeof LOGIN;
    id: string;
    email: string;
    isAdmin: boolean;
}

interface Logout {
    type: typeof LOGOUT;
}

export type AuthActionTypes = GlobalActionTypes | Logout | Login;

export interface AuthState {
    data: {
        email: string;
        id: string;
        isAdmin: boolean;
    };
}
