import { Role, RoleConverter } from '@customTypes/role';

export interface User {
    id: string;
    email: string;
    role: Role;
}

export function fromApi(data: any): User {
    return {
        id: data.id,
        email: data.email,
        role: RoleConverter.fromApi(data.role),
    };
}
