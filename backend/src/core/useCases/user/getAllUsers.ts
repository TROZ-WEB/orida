import UserDomain, { userSnapshot } from '../../domain/User';
import COREUserRepository from '../../ports/repositories/COREUserRepository';

interface Context {
    userRepository: COREUserRepository
}

const getAllUsers = () => async ({ userRepository }: Context): Promise<UserDomain[]> => {
    const users = await userRepository.getAllUsers();

    return users.map(userSnapshot);
};

export default getAllUsers;
