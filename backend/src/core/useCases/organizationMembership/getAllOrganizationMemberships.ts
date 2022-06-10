/* eslint-disable max-len */
import OrganizationMembershipDomain from '../../domain/OrganizationMembership';
import COREOrganizationMembershipRepository from '../../ports/repositories/COREOrganizationMembershipRepository';

interface Context {
    organizationMembershipRepository: COREOrganizationMembershipRepository
}

const getAllOrganizationMemberships = () => async ({ organizationMembershipRepository }: Context): Promise<OrganizationMembershipDomain[]> => {
    const entities = await organizationMembershipRepository.getAllOrganizationMemberships();

    return entities;
};

export default getAllOrganizationMemberships;
