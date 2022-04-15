import { User, UserRepository } from '../../domain/User';
import UserError, { UserErrorType } from './UserError';

interface Arg {
    email: string;
    password: string;
}

interface Context {
    userRepository: UserRepository;
}

const registerUser = ({ email, password }: Arg) => async ({ userRepository }: Context): Promise<User> => {
    const existingUser = await userRepository.findOne({ email });

    if (existingUser) {
        throw new UserError(UserErrorType.RegisterEmailAlreadyInUse);
    }

    const user = userRepository.create({ email, isAdmin: false });
    await user.updatePassword(password);

    return userRepository.save(user);
};

export default registerUser;
