/* eslint-disable max-len */
import OrganizationDomain, { organizationSnapshot } from '../../domain/Organization';
import COREOrganizationRepository from '../../ports/repositories/COREOrganizationRepository';

interface Context {
    organizationRepository: COREOrganizationRepository
}

const getAllOrganizations = () => async ({ organizationRepository }: Context): Promise<OrganizationDomain[]> => {
    const organizations = await organizationRepository.getAllOrganizations();

    return organizations.map(organizationSnapshot);
};

export default getAllOrganizations;
