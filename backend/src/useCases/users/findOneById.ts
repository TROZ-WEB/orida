import { Repository } from 'typeorm';
import { User } from '../../domain/User';
import { User as UserEntity } from '../../infrastructure/database/entities/User';

interface Context {
    userRepository: Repository<UserEntity>;
}

const findOneById = (id: string) => async ({ userRepository }: Context): Promise<User | null> => {
    const entity = await userRepository.findOne({ where: { id } });

    return entity ? entity.toDomain() : null;
};

export default findOneById;
