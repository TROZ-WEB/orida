export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';

interface SignIn {
    type: typeof SIGN_IN;
    token: string;
}

interface SignOut {
    type: typeof SIGN_OUT;
}

export type AuthActionTypes = SignIn | SignOut;

export interface AuthState {
    token: string;
}
