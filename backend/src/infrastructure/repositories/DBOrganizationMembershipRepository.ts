/* eslint-disable max-len */
import OrganizationMembershipDomain from '../../core/domain/OrganizationMembership';
import OrganizationError, { OrganizationErrorType } from '../../core/errors/OrganizationError';
import OrganizationMembershipError, { OrganizationMembershipErrorType } from '../../core/errors/organizationMembershipError';
import RoleError, { RoleErrorType } from '../../core/errors/RoleError';
import UserError, { UserErrorType } from '../../core/errors/UserError';
import COREOrganizationMembershipRepository from '../../core/ports/repositories/COREOrganizationMembershipRepository';
import OrganizationEntity from '../database/entities/Organization.entity';
import OrganizationMembershipEntity from '../database/entities/OrganizationMembership.entity';
import RoleEntity from '../database/entities/Role.entity';
import UserEntity from '../database/entities/User.entity';

const createOrganizationMembership: COREOrganizationMembershipRepository['createOrganizationMembership'] = async ({
    userId,
    organizationId,
    roleId,
}): Promise<OrganizationMembershipDomain> => {
// check if the user is already member of this organization
    const existingEntity = await OrganizationMembershipEntity.findOne({
        where: {
            user: { id: userId },
            organization: { id: organizationId },
        },
    });
    if (existingEntity) {
        throw new OrganizationMembershipError(OrganizationMembershipErrorType.AlreadyExists);
    }

    // gather data
    const userData = await UserEntity.findOne({
        where: {
            id: userId,
        },
    });
    if (!userData) {
        throw new UserError(UserErrorType.NotFound);
    }

    const organizationData = await OrganizationEntity.findOne({
        where: {
            id: organizationId,
        },
    });
    if (!organizationData) {
        throw new OrganizationError(OrganizationErrorType.NotFound);
    }

    const roleData = roleId
        ? await RoleEntity.findOne({ where: { id: roleId } })
        : await RoleEntity.findOne({ where: { label: 'CONTRIBUTOR' } }); // by default, contributor
    if (!roleData) {
        throw new RoleError(RoleErrorType.NotFound);
    }

    // create membership
    const membershipEntity = OrganizationMembershipEntity.create({
        organization: organizationData,
        role: roleData,
        user: userData,
    });
    const savedEntity = await OrganizationMembershipEntity.save(membershipEntity);

    return savedEntity.toDomain();
};

const deleteOrganizationMembership: COREOrganizationMembershipRepository['deleteOrganizationMembership'] = async ({
    userId,
    organizationId,
}): Promise<OrganizationMembershipDomain> => {
    const organizationMembership = await OrganizationMembershipEntity.findOne({
        where: {
            organization: { id: organizationId },
            user: { id: userId },
        },
    });

    if (!organizationMembership) {
        throw new OrganizationMembershipError(OrganizationMembershipErrorType.NotFound);
    }

    await OrganizationMembershipEntity.remove([organizationMembership]);

    return organizationMembership.toDomain();
};

const getAllOrganizationMemberships: COREOrganizationMembershipRepository['getAllOrganizationMemberships'] = async (): Promise<OrganizationMembershipDomain[]> => {
    const organizationMemberships = await OrganizationMembershipEntity.find();

    return organizationMemberships.map((organizationMembership) => organizationMembership.toDomain());
};

export default { createOrganizationMembership, deleteOrganizationMembership, getAllOrganizationMemberships };
