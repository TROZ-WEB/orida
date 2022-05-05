import { Project } from '@services/projects';

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
};

export function fromApi(data: any): Organization {
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
    };
}

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
    parentOrganizations?: Organization[];
};
