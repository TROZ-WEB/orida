import OrganizationDomain from '../../domain/Organization';
import ProjectDomain from '../../domain/Project';
import COREOrganizationRepository from '../../ports/repositories/COREOrganizationRepository';
import OrganizationType from '../../types/OrganizationType';

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
    const organization = organizationRepository.createOrganization({
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

    return organization;
};

export default createOrganization;
