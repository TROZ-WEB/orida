/* eslint-disable max-len */
import RoleDomain from '../../core/domain/Role';
import CORERoleRepository from '../../core/ports/repositories/CORERoleRepository';
import RoleEntity from '../database/entities/Role.entity';

const getAllRoles: CORERoleRepository['getAllRoles'] = async (): Promise<RoleDomain[]> => {
    const roles = await RoleEntity.find();

    return roles.map((role) => role.toDomain());
};

export default { getAllRoles };
