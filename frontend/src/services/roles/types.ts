export type Role = {
    id: string;
    label: string;
};

export const RoleConverter = {
    fromApi(data: any): Role {
        return {
            id: data.id,
            label: data.label,
        };
    },
};
