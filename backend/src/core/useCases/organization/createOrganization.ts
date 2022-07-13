import OrganizationDomain, { organizationSnapshot, OrganizationType } from '../../domain/Organization';
import ProjectDomain from '../../domain/Project';
import COREOrganizationRepository from '../../ports/repositories/COREOrganizationRepository';

interface Arg {
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

interface Context {
    organizationRepository: COREOrganizationRepository
}

const createOrganization = ({
    name,
    type,
    description,
    site,
    email,
    phone,
    facebook,
    twitter,
    linkedin,
    instagram,
    projects,
    parentOrganizations,
}: Arg) => async ({ organizationRepository }: Context): Promise<OrganizationDomain> => {
    const organization = await organizationRepository.createOrganization({
        name,
        type,
        description,
        site,
        email,
        phone,
        facebook,
        twitter,
        linkedin,
        instagram,
        projects,
        parentOrganizations,
    });

    return organizationSnapshot(organization);
};

export default createOrganization;
