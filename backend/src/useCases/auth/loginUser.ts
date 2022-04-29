import { Repository } from 'typeorm';
import { User } from '../../domain/User';
import UserError from './UserError';

interface Arg {
    username: string;
    password: string;
}

interface Context {
    userRepository: Repository<User>;
}

const loginUser = ({ username, password }: Arg) => async ({ userRepository }: Context): Promise<User> => {
    const user = await userRepository.findOne({ where: { email: username } });

    if (!user) {
        throw new UserError('Incorrect username.');
    }

    if (!(await user.checkPassword(password))) {
        throw new UserError('Incorrect password.');
    }

    return user;
};

export default loginUser;
