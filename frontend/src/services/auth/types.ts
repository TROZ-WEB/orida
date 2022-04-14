export interface LoginResponse {
    id: string;
    email: string;
    isAdmin: boolean;
}

export interface LoginProps {
    email: string;
    password: string;
}

export interface RegisterProps {
    email: string;
    password: string;
}

export enum AuthError {
    RegisterEmailAlreadyInUse = ''
}
