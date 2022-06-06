import { Repository } from 'typeorm';
import { User } from '../../domain/User';
import { User as UserEntity } from '../../infrastructure/database/entities/User';

interface Context {
    userRepository: Repository<UserEntity>;
}

const findOneUserById = (id: string) => async ({ userRepository }: Context): Promise<User | null> => {
    const entity = await userRepository.findOne({
        where: { id },
        relations: {
            organizations: {
                organization: {
                    projects: true,
                },
            },
            projects: {
                project: {
                    status: true,
                },
            },
        },
    });

    return entity ? entity.toDomain() : null;
};

export default findOneUserById;
