import { User, UserRepository } from '../../domain/User';
import UserError from '../UserError';

interface Arg {
    email: string,
    password: string,
}

interface Context {
    userRepository: UserRepository;
}

const registerUser = ({ email, password }: Arg) => async ({ userRepository }: Context): Promise<User> => {
    const existingUser = await userRepository.findOne({ email });

    if (existingUser) {
        throw new UserError('Email already in use');
    }

    const user = userRepository.create({ email });
    await user.updatePassword(password);

    return userRepository.save(user);
};

export default registerUser;
