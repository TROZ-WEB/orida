/* eslint-disable max-len */
import OrganizationMembershipDomain, { organizationMembershipSnapshot } from '../../domain/OrganizationMembership';
import COREOrganizationMembershipRepository from '../../ports/repositories/COREOrganizationMembershipRepository';

interface Context {
    organizationMembershipRepository: COREOrganizationMembershipRepository
}

const getAllOrganizationMemberships = () => async ({ organizationMembershipRepository }: Context): Promise<OrganizationMembershipDomain[]> => {
    const organizationMemberships = await organizationMembershipRepository.getAllOrganizationMemberships();

    return organizationMemberships.map(organizationMembershipSnapshot);
};

export default getAllOrganizationMemberships;
