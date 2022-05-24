import { Project } from '@services/projects';
import { Role, RoleConverter } from '@services/roles/types';
import { User, UserConverter } from '@services/users';

export type OrganizationMembership = {
    organization: Organization;
    user: User;
    role: Role;
};

export const OrganizationMembershipConverter = {
    fromApi(data: any): OrganizationMembership {
        return {
            // remove rule because functions are exported
            /* eslint-disable-next-line @typescript-eslint/no-use-before-define */
            organization: OrganizationConverter.fromApi(data.organization),
            user: UserConverter.fromApi(data.user),
            role: RoleConverter.fromApi(data.role),
        };
    },
};

export enum OrganizationType {
    collectivity = 'COLLECTIVITY',
    association = 'ASSOCIATION',
    company = 'COMPANY',
}

export type Organization = {
    id: string;
    createdAt: Date;
    modifiedAt: Date;
    name: string;
    type: OrganizationType;
    description: string;
    site: string;
    email: string;
    phone: string;
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
    projects: Project[];
    parentOrganizations: Organization[];
    members: OrganizationMembership[];
};

export const OrganizationConverter = {
    fromApi(data: any): Organization {
        return {
            id: data.id,
            createdAt: data.createdAt,
            modifiedAt: data.modifiedAt,
            name: data.name,
            type: data.type,
            description: data.description,
            site: data.site,
            email: data.email,
            phone: data.phone,
            facebook: data.facebook,
            twitter: data.twitter,
            linkedin: data.linkedin,
            instagram: data.instagram,
            projects: data.projects ?? [],
            parentOrganizations: data.parentOrganizations ?? [],
            // remove rule because functions are exported
            /* eslint-disable-next-line @typescript-eslint/no-use-before-define */
            members: data.members.map(OrganizationMembershipConverter.fromApi),
        };
    },
};

export type CreateProps = {
    name: string;
    type: OrganizationType;
    description?: string;
    site?: string;
    email?: string;
    phone?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    projects?: Project[];
    parentOrganizations?: string[];
};

export type UpdateProps = CreateProps & {
    id: string;
};

export type AddMemberProps = {
    organizationId: string;
    roleId: string;
    userId: string;
};

export type RemoveMemberProps = {
    organizationId: string;
    userId: string;
};
