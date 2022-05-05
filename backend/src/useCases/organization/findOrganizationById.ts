import { Repository } from 'typeorm';
import { Organization } from '../../domain/Organization';
import { Organization as OrganizationEntity } from '../../infrastructure/database/entities/Organization';

interface Context {
    organizationRepository: Repository<OrganizationEntity>;
}

const findOrganizationById = (id: string) => async ({ organizationRepository }: Context): Promise<Organization | null> => {
    const entity = await organizationRepository.findOne({
        where: { id },
        relations: { projects: true, parentOrganizations: true },
    });

    return entity ? entity.toDomain() : null;
};

export default findOrganizationById;
