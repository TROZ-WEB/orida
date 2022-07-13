import UserDomain, { userSnapshot } from '../../domain/User';
import AuthError, { AuthErrorType } from '../../errors/AuthError';
import COREUserRepository from '../../ports/repositories/COREUserRepository';

interface Arg {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
}

interface Context {
    userRepository: COREUserRepository;
}

const registerUser = ({
    email,
    firstname,
    lastname,
    password,
}: Arg) => async ({ userRepository }: Context): Promise<UserDomain> => {
    const existingUser = await userRepository.getUserByEmail(email);

    if (existingUser) {
        throw new AuthError(AuthErrorType.RegisterEmailAlreadyInUse);
    }

    const user = await userRepository.createUser({
        email,
        firstname,
        lastname,
        password,
    });

    return userSnapshot(user);
};

export default registerUser;
