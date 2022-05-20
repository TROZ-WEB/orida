/* eslint-disable import/no-cycle */
import { v4 as uuidv4 } from 'uuid';
import { OrganizationMembership } from './OrganizationMembership';
import { Project } from './Project';

enum OrganizationType {
    collectivity = 'COLLECTIVITY',
    association = 'ASSOCIATION',
    company = 'COMPANY',
}

class Organization {
    id: string;

    name: string;

    type:OrganizationType;

    description:string | null;

    site:string | null;

    email:string | null;

    phone: string | null;

    facebook:string | null;

    twitter:string | null;

    linkedin:string | null;

    instagram:string | null;

    projects : Project[];

    parentOrganizations: Organization[];

    members: OrganizationMembership[];

    // TO ADD : lieu, image

    constructor(
        name: string,
        type: OrganizationType,
        description: string | null,
        site: string | null,
        email: string | null,
        phone: string | null,
        facebook: string | null,
        twitter: string | null,
        linkedin: string | null,
        instagram: string | null,
        projects: Project[],
        parentOrganizations: Organization[],
        members: OrganizationMembership[],
    ) {
        this.id = uuidv4();
        this.name = name;
        this.type = type;
        this.description = description;
        this.site = site;
        this.email = email;
        this.phone = phone;
        this.facebook = facebook;
        this.twitter = twitter;
        this.linkedin = linkedin;
        this.instagram = instagram;
        this.projects = projects;
        this.parentOrganizations = parentOrganizations;
        this.members = members;
    }
}

export { Organization, OrganizationType };
