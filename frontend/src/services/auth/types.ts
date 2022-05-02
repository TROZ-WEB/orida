import { RoleConverter } from '@customTypes/role';
import { User } from '@services/users';

export interface LoginResponse extends User {}

export interface LoginProps {
    email: string;
    password: string;
}

export interface RegisterProps {
    email: string;
    password: string;
}

export enum AuthError {
    RegisterEmailAlreadyInUse = '',
}

export const AuthConverter = {
    fromApi(data: any): User {
        return {
            id: data.id,
            email: data.email,
            role: RoleConverter.fromApi(data.role),
        };
    },
};
