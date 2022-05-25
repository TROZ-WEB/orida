import { User } from '@services/users';
import { GlobalActionTypes } from '@store/_global/types';

export const LOGOUT = 'LOGOUT';
export const SIGN_OUT = 'SIGN_OUT';
export const GET_AUTH = 'GET_AUTH';

export interface GetAuth extends User {
    type: typeof GET_AUTH;
}

interface Logout {
    type: typeof LOGOUT;
}

export type AuthActionTypes = GlobalActionTypes | Logout | GetAuth;

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
        projectContributions: [],
    },
};
