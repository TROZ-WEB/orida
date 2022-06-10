import RoleDomain from '../../domain/Role';

interface CORERoleRepository {
    getAllRoles(): Promise<RoleDomain[]>;
}

export default CORERoleRepository;
