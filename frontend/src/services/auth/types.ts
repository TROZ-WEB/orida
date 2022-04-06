export interface LoginResponse {
    id: string;
    email: string;
}

export interface LoginProps {
    email: string;
    password: string;
}

export interface RegisterProps {
    email: string;
    password: string;
}
