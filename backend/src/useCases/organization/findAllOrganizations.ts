/* eslint-disable max-len */
import { Repository } from 'typeorm';
import { Organization } from '../../domain/Organization';
import { Organization as OrganizationEntity } from '../../infrastructure/database/entities/Organization';

interface Context {
    organizationRepository: Repository<OrganizationEntity>
}

const findAllOrganizations = () => async ({ organizationRepository }: Context): Promise<Organization[]> => {
    const entities = await organizationRepository.find({ relations: { parentOrganizations: true } });

    return entities.map((entity) => entity.toDomain());
};

export default findAllOrganizations;
