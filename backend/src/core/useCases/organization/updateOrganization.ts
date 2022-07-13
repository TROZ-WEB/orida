import OrganizationDomain, { organizationSnapshot, OrganizationType } from '../../domain/Organization';
import OrganizationError, { OrganizationErrorType } from '../../errors/OrganizationError';
import COREOrganizationRepository from '../../ports/repositories/COREOrganizationRepository';

interface Arg {
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

interface Context {
    organizationRepository: COREOrganizationRepository
}

const updateOrganization = ({
    id,
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
    parentOrganizations,
}: Arg) => async ({ organizationRepository }: Context): Promise<OrganizationDomain> => {
    const organization = await organizationRepository.updateOrganization({
        id,
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
        parentOrganizations,
    });

    if (!organization) {
        throw new OrganizationError(OrganizationErrorType.NotFound);
    }

    return organizationSnapshot(organization);
};

export default updateOrganization;
