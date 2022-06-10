import UserDomain from '../../domain/User';
import UserError, { UserErrorType } from '../../errors/UserError';
import COREUserRepository from '../../ports/repositories/COREUserRepository';

interface Context {
    userRepository: COREUserRepository
}

const getUserById = (id:string) => async ({ userRepository }: Context): Promise<UserDomain> => {
    const user = await userRepository.getUserById(id);

    if (!user) {
        throw new UserError(UserErrorType.NotFound);
    }

    return user;
};

export default getUserById;
