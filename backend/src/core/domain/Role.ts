interface Role {
    id: string;
    label: string;
}

export const roleSnapshot = (role: Role): Role => Object.freeze(role);

export default Role;
