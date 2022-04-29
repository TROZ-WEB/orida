import { Repository } from 'typeorm';
import { User } from '../../domain/User';
import UserError, { UserErrorType } from './UserError';

interface Arg {
    email: string;
    password: string;
}

interface Context {
    userRepository: Repository<User>;
}

const registerUser = ({ email, password }: Arg) => async ({ userRepository }: Context): Promise<User> => {
    const existingUser = await userRepository.findOne({ where: { email } });

    if (existingUser) {
        throw new UserError(UserErrorType.RegisterEmailAlreadyInUse);
    }

    const user = userRepository.create({ email, isAdmin: false });
    await user.updatePassword(password);

    return userRepository.save(user);
};

export default registerUser;
