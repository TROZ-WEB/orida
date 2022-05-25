import { OrganizationMembership, OrganizationMembershipConverter } from '@services/organizations';
import { projectContributions, projectContributionsConverter } from '@services/projects';

export interface User {
    email: string;
    fullname: string;
    id: string;
    isAdmin: boolean;
    organizationMemberships: OrganizationMembership[];
    projectContributions: projectContributions[];
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
            projectContributions: data.projectContributions
                ? data.projectContributions.map(projectContributionsConverter.fromApi)
                : [],
        };
    },
};
