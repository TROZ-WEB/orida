import UserDomain, { checkPassword, userSnapshot } from '../../domain/User';
import AuthError, { AuthErrorType } from '../../errors/AuthError';
import COREUserRepository from '../../ports/repositories/COREUserRepository';

interface Arg {
    email: string;
    password: string;
}

interface Context {
    userRepository: COREUserRepository;
}

const loginUser = ({ email, password }: Arg) => async ({ userRepository }: Context): Promise<UserDomain> => {
    const user = await userRepository.getUserByEmail(email);

    if (!user) {
        throw new AuthError(AuthErrorType.IncorrectUsername);
    }

    if (!(await checkPassword(user, password))) {
        throw new AuthError(AuthErrorType.IncorrectPassword);
    }

    return userSnapshot(user);
};

export default loginUser;
