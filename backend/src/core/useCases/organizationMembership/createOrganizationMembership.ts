import OrganizationMembershipDomain, { organizationMembershipSnapshot } from '../../domain/OrganizationMembership';
import COREOrganizationMembershipRepository from '../../ports/repositories/COREOrganizationMembershipRepository';

export interface Arg {
    userId: string;
    organizationId: string;
    roleId?: string;
}

interface Context {
    organizationMembershipRepository: COREOrganizationMembershipRepository
}

const createOrganizationMembership = ({
    userId,
    organizationId,
    roleId,
}: Arg) => async ({
    organizationMembershipRepository,
}: Context): Promise<OrganizationMembershipDomain> => {
    const organizationMembership = await organizationMembershipRepository.createOrganizationMembership({
        userId,
        organizationId,
        roleId,
    });

    return organizationMembershipSnapshot(organizationMembership);
};

export default createOrganizationMembership;
