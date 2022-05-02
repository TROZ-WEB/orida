import { Repository } from 'typeorm';
import { User } from '../../domain/User';
import { User as UserEntity } from '../../infrastructure/database/entities/User';

interface Context {
    userRepository: Repository<UserEntity>;
}

const findAllUsers = () => async ({ userRepository }: Context): Promise<User[]> => {
    const users = await userRepository.find({
        order: {
            email: 'ASC',
        },
    });

    return users.map((user) => user.toDomain());
};

export default findAllUsers;
