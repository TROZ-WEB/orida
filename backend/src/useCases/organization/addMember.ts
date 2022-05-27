import { Repository } from 'typeorm';
import { OrganizationMembership } from '../../domain/OrganizationMembership';
import { Organization as OrganizationEntity } from '../../infrastructure/database/entities/Organization';
import {
    OrganizationMembership as OrganizationMembershipEntity,
} from '../../infrastructure/database/entities/OrganizationMembership';
import { Role as RoleEntity } from '../../infrastructure/database/entities/Role';
import { User as UserEntity } from '../../infrastructure/database/entities/User';
import RoleError, { RoleErrorType } from '../roles/roleError';
import UserError, { UserErrorType } from '../users/UserError';
import OrganizationError, { OrganizationErrorType } from './organizationError';

interface Arg {
    userId: string;
    organizationId: string;
    roleId?: string;
}

interface Context {
    organizationMembershipRepository: Repository<OrganizationMembershipEntity>;
    organizationRepository: Repository<OrganizationEntity>;
    roleRepository: Repository<RoleEntity>;
    userRepository: Repository<UserEntity>;
}

const addMember = ({
    userId,
    organizationId,
    roleId,
}: Arg) => async ({
    organizationMembershipRepository,
    organizationRepository,
    roleRepository,
    userRepository,
}: Context): Promise<OrganizationMembership> => {
    // check if the user is already member of this organization
    const existingEntity = await organizationMembershipRepository.findOne({
        where: {
            user: { id: userId },
            organization: { id: organizationId },
        },
    });
    if (existingEntity) {
        throw new OrganizationError(OrganizationErrorType.AlreadyExists);
    }

    // gather data
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

    const roleData = roleId
        ? await roleRepository.findOne({ where: { id: roleId } })
        : await roleRepository.findOne({ where: { label: 'CONTRIBUTOR' } }); // by default, contributor
    if (!roleData) {
        throw new RoleError(RoleErrorType.NotFound);
    }

    // create membership
    const membershipEntity = organizationMembershipRepository.create({
        organization: organizationData,
        role: roleData,
        user: userData,
    });
    const savedEntity = await organizationMembershipRepository.save(membershipEntity);

    return savedEntity.toDomain();
};

export default addMember;
