import OrganizationMembershipDomain from '../../domain/OrganizationMembership';
import COREOrganizationMembershipRepository from '../../ports/repositories/COREOrganizationMembershipRepository';

interface Arg {
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
    const organizationMembership = organizationMembershipRepository.createOrganizationMembership({
        userId,
        organizationId,
        roleId,
    });

    return organizationMembership;
};

export default createOrganizationMembership;
