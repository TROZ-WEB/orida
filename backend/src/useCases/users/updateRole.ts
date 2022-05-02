import { Repository } from 'typeorm';
import Role, { RoleConverter } from '../../domain/Role';
import { User } from '../../domain/User';
import { User as UserEntity } from '../../infrastructure/database/entities/User';

interface Context {
    userRepository: Repository<UserEntity>;
}

const updateUserRole = (userId: string, newRoleStr: string) => async ({ userRepository }: Context): Promise<User> => {
    const newRole = RoleConverter.fromString(newRoleStr);
    await userRepository.update({
        id: userId,
    }, {
        isAdmin: [Role.Admin].includes(newRole),
        isManager: [Role.Admin, Role.Manager].includes(newRole),
    });
    const entity = await userRepository.findOneOrFail({ where: { id: userId } });

    return entity.toDomain();
};

export default updateUserRole;
