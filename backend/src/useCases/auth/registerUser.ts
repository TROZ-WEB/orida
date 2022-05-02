import { Repository } from 'typeorm';
import { User } from '../../domain/User';
import { User as UserEntity } from '../../infrastructure/database/entities/User';
import AuthError, { AuthErrorType } from './AuthError';

interface Arg {
    email: string;
    password: string;
}

interface Context {
    userRepository: Repository<UserEntity>;
}

const registerUser = ({ email, password }: Arg) => async ({ userRepository }: Context): Promise<User> => {
    const existingUser = await userRepository.findOne({ where: { email } });

    if (existingUser) {
        throw new AuthError(AuthErrorType.RegisterEmailAlreadyInUse);
    }

    const user = userRepository.create({ email, isAdmin: false });
    await user.updatePassword(password);
    const saved = await userRepository.save(user);

    return saved.toDomain();
};

export default registerUser;
