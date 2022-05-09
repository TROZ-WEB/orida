import { Repository } from 'typeorm';
import { Poll } from '../../domain/Poll';
import { Poll as PollEntity } from '../../infrastructure/database/entities/Poll';

interface Context {
    pollRepository: Repository<PollEntity>;
}

const findOneByFormId = (formId: string) => async ({ pollRepository }: Context): Promise<Poll | null> => {
    const entity = await pollRepository.findOne({
        where: {
            externalPollId: formId,
        },
    });

    return entity ? entity.toDomain() : null;
};

export default findOneByFormId;
