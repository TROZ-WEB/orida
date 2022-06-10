import { Repository } from 'typeorm';
import { PollResponse } from '../../domain/PollResponse';
import { User } from '../../domain/User';
import { PollResponse as PollResponseEntity } from '../../infrastructure/database/entities/PollResponse';

interface Context {
    pollResponseRepository: Repository<PollResponseEntity>;
}

const getPollAnswersByUser = (user: User) => async ({ pollResponseRepository }: Context): Promise<PollResponse | null> => {
    const entity = await pollResponseRepository.findOne({
        where: {
            user: {
                id: user.id,
            },
        },
    });

    return entity ? entity.toDomain() : undefined;
};

export default getPollAnswersByUser;
