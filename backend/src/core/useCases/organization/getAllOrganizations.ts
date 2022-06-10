/* eslint-disable max-len */
import OrganizationDomain from '../../domain/Organization';
import COREOrganizationRepository from '../../ports/repositories/COREOrganizationRepository';

interface Context {
    organizationRepository: COREOrganizationRepository
}

const getAllOrganizations = () => async ({ organizationRepository }: Context): Promise<OrganizationDomain[]> => {
    const organizations = await organizationRepository.getAllOrganizations();

    return organizations;
};

export default getAllOrganizations;
