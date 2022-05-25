import { OrganizationMembershipConverter } from '@services/organizations';
import { projectContributionsConverter } from '@services/projects';
import { User } from '@services/users';

export interface Auth extends User {}

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
            isAdmin: data.isAdmin || false,
            fullname: data.fullname,
            organizationMemberships: data.organizationMemberships
                ? data.organizationMemberships.map(OrganizationMembershipConverter.fromApi)
                : [],
            projectContributions: data.projectContributions
                ? data.projectContributions.map(projectContributionsConverter.fromApi)
                : [],
        };
    },
};
