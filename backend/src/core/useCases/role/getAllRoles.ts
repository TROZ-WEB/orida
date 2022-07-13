import RoleDomain, { roleSnapshot } from '../../domain/Role';
import CORERoleRepository from '../../ports/repositories/CORERoleRepository';

interface Context {
    roleRepository: CORERoleRepository;
}

const getAllRoles = () => (
    async ({ roleRepository }: Context): Promise<RoleDomain[]> => {
        const roles = await roleRepository.getAllRoles();

        return roles.map(roleSnapshot);
    }
);

export default getAllRoles;
