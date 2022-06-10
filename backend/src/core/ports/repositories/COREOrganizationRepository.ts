import OrganizationDomain from '../../domain/Organization';
import ProjectDomain from '../../domain/Project';
import OrganizationType from '../../types/OrganizationType';

interface createOrganizationProps {
    name: string,
    type: OrganizationType,
    description: string,
    site: string,
    email: string,
    phone: string,
    facebook: string,
    twitter: string,
    linkedin: string,
    instagram: string,
    projects: ProjectDomain[],
    parentOrganizations: OrganizationDomain[],
}

interface updateOrganizationProps {
    id:string;
    name: string,
    type: OrganizationType,
    description: string,
    site: string,
    email: string,
    phone: string,
    facebook: string,
    twitter: string,
    linkedin: string,
    instagram: string,
    parentOrganizations: OrganizationDomain[],
}

interface COREOrganizationRepository {
    createOrganization(organizationData: createOrganizationProps): Promise<OrganizationDomain>;
    getAllOrganizations(): Promise<OrganizationDomain[]>;
    getOrganizationById(id: string): Promise<OrganizationDomain | undefined>;
    updateOrganization(organizationData: updateOrganizationProps): Promise<OrganizationDomain | undefined>;
}

export default COREOrganizationRepository;
