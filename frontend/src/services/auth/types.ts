import UserType from '@customTypes/userType';

export interface LoginResponse {
    id: string;
    email: string;
    type: UserType;
}

export interface LoginProps {
    email: string;
    password: string;
}

export interface RegisterProps {
    email: string;
    password: string;
    type: UserType;
}

export enum AuthError {
    RegisterEmailAlreadyInUse = ''
}
