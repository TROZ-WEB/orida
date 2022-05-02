enum Role {
    Admin = 'ADMIN',
    Manager = 'MANAGER',
    None = 'NONE',
}

export const RoleConverter = {
    fromString(value: string) {
        switch (value) {
            case 'ADMIN':
                return Role.Admin;
            case 'MANAGER':
                return Role.Manager;
            case 'NONE':
            default:
                return Role.None;
        }
    },
};

export default Role;
