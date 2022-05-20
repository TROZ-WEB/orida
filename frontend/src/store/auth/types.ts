import { User } from '@services/users';
import { GlobalActionTypes } from '@store/_global/types';

export const LOGOUT = 'LOGOUT';
export const SIGN_OUT = 'SIGN_OUT';
export const LOGIN = 'LOGIN';

export interface Login extends User {
    type: typeof LOGIN;
}

interface Logout {
    type: typeof LOGOUT;
}

export type AuthActionTypes = GlobalActionTypes | Logout | Login;

export interface AuthState {
    data: User;
}

export const initialState: AuthState = {
    data: {
        email: '',
        id: '',
        fullname: '',
        isAdmin: false,
        organizationMemberships: [],
    },
};
