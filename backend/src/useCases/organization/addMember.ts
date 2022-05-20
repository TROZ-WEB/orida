import { Repository } from 'typeorm';
import { OrganizationMembership } from '../../domain/OrganizationMembership';
import { Organization as OrganizationEntity } from '../../infrastructure/database/entities/Organization';
import {
    OrganizationMembership as OrganizationMembershipEntity,
} from '../../infrastructure/database/entities/OrganizationMembership';
import { User as UserEntity } from '../../infrastructure/database/entities/User';
import UserError, { UserErrorType } from '../users/UserError';
import OrganizationError, { OrganizationErrorType } from './organizationError';

interface Arg {
    userId: string;
    organizationId: string;
}

interface Context {
    organizationMembershipRepository: Repository<OrganizationMembershipEntity>;
    organizationRepository: Repository<OrganizationEntity>;
    userRepository: Repository<UserEntity>;
}

const addMember = ({
    userId,
    organizationId,
}: Arg) => async ({
    organizationMembershipRepository,
    organizationRepository,
    userRepository,
}: Context): Promise<OrganizationMembership> => {
    const userData = await userRepository.findOne({
        where: {
            id: userId,
        },
    });
    if (!userData) {
        throw new UserError(UserErrorType.NotFound);
    }

    const organizationData = await organizationRepository.findOne({
        where: {
            id: organizationId,
        },
    });
    if (!organizationData) {
        throw new OrganizationError(OrganizationErrorType.NotFound);
    }

    const membershipEntity = organizationMembershipRepository.create({
        user: userData,
        organization: organizationData,
    });
    const savedEntity = await organizationMembershipRepository.save(membershipEntity);

    return savedEntity.toDomain();
};

export default addMember;
