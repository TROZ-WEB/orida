import OrganizationMembershipDomain from '../../domain/OrganizationMembership';
import OrganizationMembershipError, { OrganizationMembershipErrorType } from '../../errors/organizationMembershipError';
import COREOrganizationMembershipRepository from '../../ports/repositories/COREOrganizationMembershipRepository';

interface Arg {
    userId: string;
    organizationId: string;
}

interface Context {
    organizationMembershipRepository: COREOrganizationMembershipRepository
}

const deleteOrganizationMembership = ({
    userId,
    organizationId,
}: Arg) => async ({
    organizationMembershipRepository,
}: Context): Promise<OrganizationMembershipDomain> => {
    const organizationMembership = await organizationMembershipRepository.deleteOrganizationMembership({
        userId,
        organizationId,
    });

    if (!organizationMembership) {
        throw new OrganizationMembershipError(OrganizationMembershipErrorType.NotFound);
    }

    return organizationMembership;
};

export default deleteOrganizationMembership;
