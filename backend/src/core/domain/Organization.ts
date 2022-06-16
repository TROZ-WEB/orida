/* eslint-disable import/no-cycle */
import OrganizationMembership from './OrganizationMembership';
import Project from './Project';

export enum OrganizationType {
    collectivity = 'COLLECTIVITY',
    association = 'ASSOCIATION',
    company = 'COMPANY',
}
interface Organization {
    id: string;
    name: string;
    type:OrganizationType;
    description:string | undefined;
    site:string | undefined;
    email:string | undefined;
    phone: string | undefined;
    facebook:string | undefined;
    twitter:string | undefined;
    linkedin:string | undefined;
    instagram:string | undefined;
    projects : Project[];
    parentOrganizations: Organization[];
    members: OrganizationMembership[];
    // TO ADD : lieu, image
}

export default Organization;
