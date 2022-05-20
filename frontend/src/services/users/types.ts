/* eslint-disable import/no-cycle */
import { OrganizationMembership, OrganizationMembershipConverter } from '@services/organizations';

export interface User {
    email: string;
    fullname: string;
    id: string;
    isAdmin: boolean;
    organizationMemberships: OrganizationMembership[];
}

export const UserConverter = {
    fromApi(data: any): User {
        return {
            id: data.id,
            email: data.email,
            fullname: data.fullname,
            isAdmin: data.isAdmin,
            organizationMemberships: data.organizationMemberships
                ? data.organizationMemberships.map(OrganizationMembershipConverter.fromApi)
                : [],
        };
    },
};
