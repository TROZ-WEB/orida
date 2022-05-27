/* eslint-disable max-len */
import { Repository } from 'typeorm';
import { OrganizationMembership } from '../../domain/OrganizationMembership';
import { OrganizationMembership as OrganizationMembershipEntity } from '../../infrastructure/database/entities/OrganizationMembership';

interface Context {
    organizationMembershipRepository: Repository<OrganizationMembershipEntity>
}

const findAllMemberships = () => async ({ organizationMembershipRepository }: Context): Promise<OrganizationMembership[]> => {
    const entities = await organizationMembershipRepository.find();

    return entities.map((entity) => entity.toDomain());
};

export default findAllMemberships;
