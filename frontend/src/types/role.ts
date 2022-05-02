export enum Role {
    Admin = 'ADMIN',
    Manager = 'MANAGER',
    None = 'NONE',
}

export const RoleConverter = {
    fromApi(data: any) {
        switch (data) {
            case 'ADMIN':
                return Role.Admin;
            case 'MANAGER':
                return Role.Manager;
            case 'NONE':
            case undefined:
            default:
                return Role.None;
        }
    },
};
