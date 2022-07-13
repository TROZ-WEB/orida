/* eslint-disable import/no-cycle */
import OrganizationMembership, { organizationMembershipSnapshot } from './OrganizationMembership';
import Project, { projectSnapshot } from './Project';

export type OrganizationType = 'COLLECTIVITY' | 'ASSOCIATION' | 'COMPANY'
interface Organization {
    id: string;
    name: string;
    type:OrganizationType;
    description?:string;
    site?:string;
    email?:string;
    phone?: string;
    facebook?:string;
    twitter?:string;
    linkedin?:string;
    instagram?:string;
    projects : Project[];
    parentOrganizations: Organization[];
    members: OrganizationMembership[];
    // TO ADD : lieu, image
}

export const organizationSnapshot = (organization: Organization): Organization => Object.freeze({
    ...organization,
    projects: organization.projects.map(projectSnapshot),
    parentOrganizations: organization.parentOrganizations.map(organizationSnapshot),
    members: organization.members.map(organizationMembershipSnapshot),
});

export default Organization;
