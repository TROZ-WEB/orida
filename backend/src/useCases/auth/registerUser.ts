import { Repository } from 'typeorm';
import { User } from '../../domain/User';
import { User as UserEntity } from '../../infrastructure/database/entities/User';
import AuthError, { AuthErrorType } from './AuthError';

interface Arg {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
}

interface Context {
    userRepository: Repository<UserEntity>;
}

const registerUser = ({
    email,
    firstname,
    lastname,
    password,
}: Arg) => async ({ userRepository }: Context): Promise<User> => {
    const existingUser = await userRepository.findOne({
        where: { email },
        relations: {
            organizations: {
                organization: {
                    projects: true,
                },
            },
            projects: true,
        },
    });

    if (existingUser) {
        throw new AuthError(AuthErrorType.RegisterEmailAlreadyInUse);
    }

    const user = userRepository.create({
        email,
        isAdmin: false,
        firstname,
        lastname,
        fullname: `${firstname} ${lastname}`,
    });
    await user.updatePassword(password);
    const saved = await userRepository.save(user);

    return saved.toDomain();
};

export default registerUser;
