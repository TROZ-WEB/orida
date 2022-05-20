import { Repository } from 'typeorm';
import { Role } from '../../domain/Role';
import { Role as RoleEntity } from '../../infrastructure/database/entities/Role';

interface Context {
    roleRepository: Repository<RoleEntity>
}

const findAllRoles = () => async ({ roleRepository }: Context): Promise<Role[]> => {
    const entities = await roleRepository.find();

    return entities.map((entity) => entity.toDomain());
};

export default findAllRoles;
