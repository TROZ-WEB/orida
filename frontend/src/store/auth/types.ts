export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const LOGIN = 'LOGIN';

export interface Login {
    type: typeof LOGIN;
    id: string;
    email: string;
}

interface SignIn {
    type: typeof SIGN_IN;
    token: string;
}

interface SignOut {
    type: typeof SIGN_OUT;
}

export type AuthActionTypes = SignIn | SignOut | Login;

export interface AuthState {
    email: string;
    id: string;
    token: string;
}
