import { Repository } from 'typeorm';
import {
    OrganizationMembership as OrganizationMembershipEntity,
} from '../../infrastructure/database/entities/OrganizationMembership';

interface Arg {
    userId: string;
    organizationId: string;
}

interface Context {
    organizationMembershipRepository: Repository<OrganizationMembershipEntity>;
}

const removeMember = ({
    userId,
    organizationId,
}: Arg) => async ({
    organizationMembershipRepository,
}: Context): Promise<boolean> => {
    const membership = await organizationMembershipRepository.findOne({
        where: {
            user: {
                id: userId,
            },
            organization: {
                id: organizationId,
            },
        },
    });

    if (!membership) {
        return true;
    }

    await organizationMembershipRepository.delete(membership.id);

    return true;
};

export default removeMember;
