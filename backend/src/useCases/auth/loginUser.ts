import { Repository } from 'typeorm';
import { User } from '../../domain/User';
import { User as UserEntity } from '../../infrastructure/database/entities/User';
import AuthError, { AuthErrorType } from './AuthError';

interface Arg {
    username: string;
    password: string;
}

interface Context {
    userRepository: Repository<UserEntity>;
}

const loginUser = ({ username, password }: Arg) => async ({ userRepository }: Context): Promise<User> => {
    const user = await userRepository.findOne({
        where: { email: username },
        relations: {
            organizations: {
                organization: {
                    projects: true,
                },
            },
            projects: true },
    });

    if (!user) {
        throw new AuthError(AuthErrorType.IncorrectUsername);
    }

    if (!(await user.checkPassword(password))) {
        throw new AuthError(AuthErrorType.IncorrectPassword);
    }

    return user.toDomain();
};

export default loginUser;
